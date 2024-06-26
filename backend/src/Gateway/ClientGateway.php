<?php
namespace Src\Gateway;
use \Src\Database;
use \Src\Gateway\BaseGateway;

class ClientGateway extends BaseGateway {


    public function __construct(Database $db)
    {
        $this->tableName = "cliente";
        parent::__construct($db);
    }

    public function findByEmail($input)
    {
        if (!isset($input["email"])) {
            return $this->response(400, message: "Parametro mancante: email");
        }
        
        $statement = "
            SELECT 
                *
            FROM " . $this->tableName . "
            WHERE email = :email;";

        try {
            $statement = $this->conn->prepare($statement);
            $statement->execute(array(
                'email' => $input["email"]
            ));

            $response = $statement->fetchAll(\PDO::FETCH_ASSOC);

            if (!$response) {
                $response = [];
            }

            return $this->response(200, content: $response);

        } catch (\PDOException $e) {
            error_log("Database error: " . $e->getMessage());
            return $this->response(500, message: "Internal Server Error");
        }    
    }

    public function insert(Array $input)
    {
        $required_parameters = [
            "nome", 
            "cognome",
            "email",
            "password",
            "telefono",
            "data_di_nascita",
            "admin"
        ];
    
        $missing_keys = $this->validateRequiredParameters($input, $required_parameters);

        if (!empty($missing_keys)) {
            return $this->response(400, "Parametro mancante: " . implode(", ", $missing_keys));
        }

        $statement = "
            INSERT INTO " . $this->tableName . "
                (nome, cognome, email, password, telefono, data_di_nascita, admin)
            VALUES (
                :nome,
                :cognome, 
                :email, 
                :password, 
                :telefono, 
                :data_di_nascita,
                :admin
            )";
        
        try {
            $statement = $this->conn->prepare($statement);
            $statement->execute(array(
                'nome' => $input['nome'],
                'cognome'  => $input['cognome'],
                'email' => $input['email'],
                'password' => password_hash($input['password'], PASSWORD_DEFAULT),
                'telefono' => $input['telefono'],
                'data_di_nascita' => $input['data_di_nascita'],
                'admin' => $input['admin'],
            ));

            return $this->response(201, "Cliente aggiunto");

        } catch (\PDOException $e) {
            if ($e->getCode() == "23000") {
                return $this->response(400, "Richiesta invalida: è stato gia registrato un utente con questo indirizzo email");
            }
            error_log("Database error: " . $e->getMessage());
            return $this->response(500, "Internal Server Error");
        }    
    }

    public function update(array $input) {

        if (!isset($input["id"])) {
            return $this->response(400, "Parametro mancante: id");
        }

        $fields = [
            "nome",
            "cognome",
            "telefono",
            "amministratore",
            "data_di_nascita",
        ];
        


        $response = $this->updateM($input, $fields);

        $update_password_statement = "
            UPDATE cliente
            SET 
                password = :password
            WHERE id_cliente = :id;
        ";

        $get_current_password_statement = "
            SELECT password
            FROM cliente
            WHERE id_cliente = :id;
        ";

        if ($response['statusCode'] != 200) {
            $this->response($response['statusCode'], message: $response['body']['message']);
        }

        if (isset($input["new_password"])) {

            if (!isset($input['password'])) {
                return $this->response(400, "Richiesta non valida: Inserire la password corrente");
            }

            try {

                $get_current_password_statement = $this->conn->prepare($get_current_password_statement);
                $get_current_password_statement->execute(array(
                    'id' => (int) $input['id'],
                ));

                $current_password = $get_current_password_statement->fetch(\PDO::FETCH_ASSOC)["password"];

                if (password_verify($input['password'], $current_password)) {

                    $statement = $this->conn->prepare($update_password_statement);
                    $statement->execute(array(
                        'id' => (int) $input['id'],
                        'password' => password_hash($input['new_password'], PASSWORD_DEFAULT),
                    ));

                } else {
                    return $this->response(400, "Richiesta non valida: La password inserita non è corretta");
                }

            } catch (\PDOException $e) {
                error_log("Database error: " . $e->getMessage());
                return $this->response(500, "Internal Server Error");
            }    
        }

        return $this->response(200, "Informazioni aggiornate");
    }
}
