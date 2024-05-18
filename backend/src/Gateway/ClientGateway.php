<?php
namespace Src\Gateway;

class ClientGateway extends BaseGateway {

    private $conn = null;
    private $tableName = null;
    private $result = [];

    public function insert(Array $input)
    {
        $statement = "
            INSERT INTO Cliente 
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
                'password' => $input['password'],
                'telefono' => $input['telefono'],
                'data_di_nascita' => $input['data_di_nascita'],
                'amministratore' => $input['amministratore'],
            ));
            $result['body']['content'] = $statement->rowCount();
            $result['statusCode'] = 200;
            return $result;
        } catch (\PDOException $e) {
            $result['body'] = $e->getMessage();
            $result['statusCode'] = 500;
            return $result;
        }    
    }

    public function update(Array $input, $id)
    {
        $update_name_statement = "
            UPDATE Cliente
            SET 
                nome = :nome
            WHERE id = :id;
        ";

        $update_cognome_statement = "
            UPDATE Cliente
            SET 
                cognome = :cognome
            WHERE id = :id;
        ";

        $update_name_statement = "
            UPDATE Cliente
            SET 
                nome = :nome
            WHERE id = :id;
        ";

        $update_telefono_statement = "
            UPDATE Cliente
            SET 
                telefono = :telefono
            WHERE id = :id;
        ";

        $update_dob_statement = "
            UPDATE Cliente
            SET 
                data_di_nascita = :data_di_nascita
            WHERE id = :id;
        ";

        $update_password_statement = "
            UPDATE Cliente
            SET 
                password = :password
            WHERE id = :id;
        ";

        $get_current_password_statement = "
            SELECT password
            FROM Cliente
            WHERE id = :id;
        ";

        if (isset($input["nome"])) {
            try {
                $statement = $this->conn->prepare($update_nome_statement);
                $statement->execute(array(
                    'id' => (int) $id,
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
                $result['body']['message'] = $e->getMessage();
                $result['statusCode'] = 500;
                return $result;
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
                $result['body']['message'] = $e->getMessage();
                $result['statusCode'] = 500;
                return $result;
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
                $result['body']['message'] = $e->getMessage();
                $result['statusCode'] = 500;
                return $result;
            }    
        }

        if (isset($input["new_password"])) {

            if (!isset($input['password'])) {
                $result['body']['message'] = "Enter current password.";
                $result['statusCode'] = 400;
                return $result;
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
                    $result['body']['message'] = "Current password does not match.";
                    $result['statusCode'] = 401;
                    return $result;
                }

            } catch (\PDOException $e) {
                $result['body']['message'] = $e->getMessage();
                $result['statusCode'] = 500;
                return $result;
            }    
        }

        $result['statusCode'] = 200;
        return $result;
        
    }
}
