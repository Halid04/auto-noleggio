<?php
namespace Src\Gateway;
use \Src\Database;

class BaseGateway {

    private $conn = null;
    private $tableName = null;
    private $result = [];

    public function __construct($db, $tableName)
    {
        $this->conn = $db->getConnection();
        $this->tableName = $tableName;
    }

    public function findAll()
    {
        $statement = "
            SELECT 
                *
            FROM " . $this->tableName . ";";
        

        try {
            $statement = $this->conn->prepare($statement);
            $statement->execute();
            
            return array (
                "statusCode" => 200,
                "body" => array (
                    "content" => $statement->fetchAll(\PDO::FETCH_ASSOC)
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

    public function find($input)
    {
        $statement = "
            SELECT 
                *
            FROM " . $this->tableName .
            " WHERE id = :id;
        ";

        try {
            $statement = $this->conn->prepare($statement);
            $statement->execute(array(
                'tableName' => $this->tableName,
                'id' => (int) $input["id"]
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


    public function delete($input)
    {
        $statement = "
            DELETE FROM " . $this->tableName .
             " WHERE id = :id;
        ";

        if (!isset($input["id"])) {
            return array (
                'statusCode' => 400,
                'body' => array (
                    'message' => "Missing parameters: id"
                )
            );
        }

        try {
            $statement = $this->conn->prepare($statement);
            $statement->execute(array(
                'tableName' => $this->tableName,
                'id' => (int) $input["id"]
            ));

            return array (
                "statusCode" => 500,
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
}
