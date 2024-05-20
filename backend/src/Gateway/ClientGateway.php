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
            return array (
                'statusCode' => 400,
                'body' => array (
                    'message' => "Missing parameters: email"
                )
            );
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

            return array (
                "statusCode" => 200,
                "body" => array (
                    "content" => $statement->fetch(\PDO::FETCH_ASSOC)
                )
            );
        } catch (\PDOException $e) {
            return array (
                "statusCode" => 500,
                "body" => array (
                    "message" => $e->getMessage()
                )
            );
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
    
        $request_keys = array_keys($input);
    
        $missing_keys = array_diff($required_parameters, $request_keys);
    
        if (count($missing_keys) !== 0) {
            return array (
                "statusCode" => 400,
                "body" => array (
                    "message" => "Missing parameters: " . implode(",", $missing_keys)
                )
            );
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

            return array (
                "statusCode" => 201,
                "body" => array (
                    "content" => $statement->rowCount()
                )
            );
        } catch (\PDOException $e) {
            return array (
                "statusCode" => 500,
                "body" => array (
                    "message" => $e->getMessage()
                )
            );
        }    
    }

    public function update(Array $input)
    {
        if (!isset($input["id"])) {
            return array (
                'statusCode' => 400,
                'body' => array (
                    'message' => "Missing parameters: id"
                )
            );
        }

        $update_name_statement = "
            UPDATE Cliente
            SET 
                nome = :nome
            WHERE id_". $this->tableName. " = :id;
        ";

        $update_cognome_statement = "
            UPDATE Cliente
            SET 
                cognome = :cognome
            WHERE id_". $this->tableName. " = :id;
        ";

        $update_name_statement = "
            UPDATE Cliente
            SET 
                nome = :nome
            WHERE id_". $this->tableName. " = :id;
        ";

        $update_telefono_statement = "
            UPDATE Cliente
            SET 
                telefono = :telefono
            WHERE id_". $this->tableName. " = :id;
        ";

        $update_dob_statement = "
            UPDATE Cliente
            SET 
                data_di_nascita = :data_di_nascita
            WHERE id_". $this->tableName. " = :id;
        ";

        $update_password_statement = "
            UPDATE Cliente
            SET 
                password = :password
            WHERE id_". $this->tableName. " = :id;
        ";

        $get_current_password_statement = "
            SELECT password
            FROM Cliente
            WHERE id_". $this->tableName. " = :id;
        ";

        if (isset($input["nome"])) {
            try {
                $statement = $this->conn->prepare($update_nome_statement);
                $statement->execute(array(
                    'id' => (int) $input["id"],
                    'nome' => $input['nome'],
                ));
            } catch (\PDOException $e) {
                $result['body']['message'] = $e->getMessage();
                $result['statusCode'] = 500;
                return $result;
            }    
        }

        if (isset($input["cognome"])) {
            try {
                $statement = $this->conn->prepare($update_cognome_statement);
                $statement->execute(array(
                    'id' => (int) $id,
                    'cognome' => $input['cognome'],
                ));

            } catch (\PDOException $e) {
                return array (
                    "statusCode" => 500,
                    "body" => array (
                        "message" => $e->getMessage()
                    )
                );
            }    
        }

        if (isset($input["telefono"])) {
            try {
                $statement = $this->conn->prepare($update_telefono_statement);
                $statement->execute(array(
                    'id' => (int) $id,
                    'telefono' => $input['telefono'],
                ));

            } catch (\PDOException $e) {
                return array (
                    "statusCode" => 500,
                    "body" => array (
                        "message" => $e->getMessage()
                    )
                );
            }    
        }

        if (isset($input["dob"])) {
            try {
                $statement = $this->conn->prepare($update_dob_statement);
                $statement->execute(array(
                    'id' => (int) $id,
                    'data_di_nascita' => $input['dob'],
                ));

            } catch (\PDOException $e) {
                return array (
                    "statusCode" => 500,
                    "body" => array (
                        "message" => $e->getMessage()
                    )
                );
            }    
        }

        if (isset($input["new_password"])) {

            if (!isset($input['password'])) {
                return array (
                    "statusCode" => 400,
                    "body" => array (
                        "message" => "Enter current password."
                    )
                );
            }
        
    
            try {
                $get_current_password_statement = $this->conn->prepare($get_current_password_statement);
                $get_current_password_statement->execute(array(
                    'id' => (int) $id,
                ));

                $current_password = $statement->fetch(\PDO::FETCH_ASSOC)["password"];

                if (password_verify($current_password, $input['password'])) {

                    $statement = $this->conn->prepare($update_password_statement);
                    $statement->execute(array(
                        'id' => (int) $id,
                        'password' => password_hash($input['new_password'], PASSWORD_DEFAULT),
                    ));

                } else {
                    return array (
                        "statusCode" => 401,
                        "body" => array (
                            "message" => "Current password does not match."
                        )
                    );
                }

            } catch (\PDOException $e) {
                return array (
                    "statusCode" => 500,
                    "body" => array (
                        "message" => $e->getMessage()
                    )
                );
            }    
        }

        return array (
            "statusCode" => 200,
            "body" => array (
                "message" => "Successfully updated information"
            )
        );
        
    }
}
