<?php
namespace Src\Gateway;
use \Src\Database;
use \Src\Gateway\BaseGateway;

class ClientGateway extends BaseGateway {


    public function __construct(Database $db)
    {
        $this->tableName = "Cliente";
        parent::__construct($db);
    }

    public function findByEmail($input)
    {
        if (!isset($input["email"])) {
            return $this->response(400, message: "Missing parameters: email");
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

            return $this->response(200, content: $statement->fetch(\PDO::FETCH_ASSOC));

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
            "amministratore"
        ];
    
        $missing_keys = $this->validateRequiredParameters($input, $required_parameters);

        if (!empty($missing_keys)) {
            return $this->response(400, "Missing parameters: " . implode(", ", $missing_keys));
        }

        $existing_users_sql = "
                            SELECT COUNT(*) as count 
                            FROM ". $this->tableName . " 
                            WHERE email = :email";

        try {
            $existing_users_stmt = $this->conn->prepare($existing_users_sql);
            $existing_users_stmt->bindValue(":email", $input["email"]);
            $existing_users_stmt->execute();
        } catch (PDOException $e) {
            error_log("Database error: " . $e->getMessage());
            return $this->response(500, message: "Internal Server Error");
        }
    
        $existing_users_count = $existing_users_stmt->fetch(\PDO::FETCH_ASSOC)["count"];
    
        if ($existing_users_count > 0) {
            return $this->response(400, "E-mail has already been registered.");
        }

        $statement = "
            INSERT INTO " . $this->tableName . "
                (nome, cognome, email, password, telefono, data_di_nascita, amministratore)
            VALUES (
                :nome,
                :cognome, 
                :email, 
                :password, 
                :telefono, 
                :data_di_nascita,
                :amministratore
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
                'amministratore' => $input['amministratore'],
            ));

            return $this->response(201, "Vehicle added successfully");

        } catch (\PDOException $e) {
            error_log("Database error: " . $e->getMessage());
            return $this->response(500, "Internal Server Error");
        }    
    }

    public function update(array $input) {

        $fields = [
            "nome",
            "cognome",
            "telefono",
            "amministratore",
            "data_di_nascita",
        ];

        //$superfluous_keys = array_diff(array_keys($input), $fields);

        if (!empty($superfluous_keys)) {
            return $this->response(400, message: "Superfluous parameters: " . implode(", ", $superfluous_keys));
        }
        
        return $this->updateM($input, $fields);
    }
}
