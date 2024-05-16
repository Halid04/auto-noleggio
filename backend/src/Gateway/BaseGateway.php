<?php
namespace Src\Gateway;

class BaseGateway {

    private $conn = null;
    private $tableName = null;
    private $result = [];

    public function __construct(Database $db, $tableName)
    {
        $this->conn = $db->getConnection();
        $this->tableName = $tableName;
    }

    public function findAll()
    {
        $statement = "
            SELECT 
                *
            FROM
                :tableName;
        ";

        try {
            $statement = $this->conn->prepare($statement);
            $statement->execute(array(
                'tableName' => $this->tableName
            ));
            $result['body'] = $statement->fetchAll(\PDO::FETCH_ASSOC);
            $result['statusCode'] = 200;
            return $result;
        } catch (\PDOException $e) {
            $result['body'] = $e->getMessage();
            $result['statusCode'] = 500;
            return $result;
        }
    }

    public function find($id)
    {
        $statement = "
            SELECT 
                *
            FROM
                :tableName
            WHERE id = :id;
        ";

        try {
            $statement = $this->conn->prepare($statement);
            $statement->execute(array(
                'tableName' => $this->tableName,
                'id' => $id
            ));
            $result['body'] = $statement->fetchAll(\PDO::FETCH_ASSOC);
            $result['statusCode'] = 200;
            return $result;
        } catch (\PDOException $e) {
            $result['body'] = $e->getMessage();
            $result['statusCode'] = 500;
            return $result;
        }    
    }


    public function delete($id)
    {
        $statement = "
            DELETE FROM :tableName
            WHERE id = :id;
        ";

        try {
            $statement = $this->conn->prepare($statement);
            $statement->execute(array(
                'tableName' => $this->tableName,
                'id' => $id
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
}
