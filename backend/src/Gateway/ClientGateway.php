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
            $result['body'] = $statement->rowCount();
            $result['statusCode'] = 200;
            return $result;
        } catch (\PDOException $e) {
            $result['body'] = $e->getMessage();
            $result['statusCode'] = 500;
            return $result;
        }    
    }

    public function update($id, Array $input)
    {
        $update_name_statement = "
            UPDATE Cliente
            SET 
                nome = :nome
            WHERE id = :id;
        ";

        $update_name_statement = "
            UPDATE Cliente
            SET 
                nome = :nome
            WHERE id = :id;
        ";

        $update_name_statement = "
            UPDATE Cliente
            SET 
                nome = :nome
            WHERE id = :id;
        ";
        $update_name_statement = "
            UPDATE Cliente
            SET 
                nome = :nome
            WHERE id = :id;
        ";
        $update_name_statement = "
            UPDATE Cliente
            SET 
                nome = :nome
            WHERE id = :id;
        ";
        $update_name_statement = "
            UPDATE Cliente
            SET 
                nome = :nome
            WHERE id = :id;
        ";
        $update_name_statement = "
            UPDATE Cliente
            SET 
                nome = :nome
            WHERE id = :id;
        ";
        $update_name_statement = "
            UPDATE Cliente
            SET 
                nome = :nome
            WHERE id = :id;
        ";

        try {
            $statement = $this->conn->prepare($statement);
            $statement->execute(array(
                'id' => (int) $id,
                'nome' => $input['nome'],
            ));
            return $statement->rowCount();
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }    
    }
}
