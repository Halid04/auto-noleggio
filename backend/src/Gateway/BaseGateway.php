<?php
namespace Src\Gateway;
use \Src\Database;

class BaseGateway {

    public $conn = null;
    public $tableName = null;

    public function __construct($db)
    {
        $this->conn = $db->getConnection();
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

            return $this->response(200, content: $statement->fetchAll(\PDO::FETCH_ASSOC));

        } catch (\PDOException $e) {
            error_log("Database error: " . $e->getMessage());

            return $this->response(500, message: "Internal Server Error");
        }
    }

    public function find($input)
    {
        $statement = "
            SELECT 
                *
            FROM " . $this->tableName .
            " WHERE id_". $this->tableName. " = :id;
            ";

        try {
            $statement = $this->conn->prepare($statement);
            $statement->execute(array(
                'id' => (int) $input["id"]
            ));

            return $this->response(200, content: $statement->fetch(\PDO::FETCH_ASSOC));

        } catch (\PDOException $e) {
            error_log("Database error: " . $e->getMessage());
            return $this->response(500, message: "Internal Server Error");
        }    
    }


    public function delete($input)
    {
        $statement = "
            DELETE FROM " . $this->tableName .
             " WHERE id_". $this->tableName. " = :id;
        ";

        if (!isset($input["id"])) {
            return $this->response(400, message: "Missing parameters:  id");
        }

        try {
            $statement = $this->conn->prepare($statement);
            $statement->execute(array(
                'id' => (int) $input["id"]
            ));

            return $this->response(200, content: $statement->rowCount());

        } catch (\PDOException $e) {
            error_log("Database error: " . $e->getMessage());
            return $this->response(500, message: "Internal Server Error");
        }    
    }
    
    public function updateM(array $input, $fields)
    {
        if (!isset($input["id"])) {
            return $this->response(400, "Missing parameter: id");
        }

        $id = (int) $input["id"];
        
        $setClause = [];
        $params = ['id' => $id];

        foreach ($fields as $field) {
            if (isset($input[$field])) {
                $setClause[] = "$field = :$field";
                $params[$field] = $input[$field];
            }
        }

        if (empty($setClause)) {
            return $this->response(400, "No fields to update");
        }

        $setClauseStr = implode(", ", $setClause);
        $statementStr = "
            UPDATE " . $this->tableName . "
            SET $setClauseStr
            WHERE id_" . $this->tableName . " = :id;
        ";

        try {
            $statement = $this->conn->prepare($statementStr);
            $statement->execute($params);

            return $this->response(200, "Information successfully updated");
        } catch (\PDOException $e) {
            error_log("Database error: " . $e->getMessage());
            return $this->response(500, "Internal Server Error");
        }
    }

    public function validateRequiredParameters(array $input, array $required_parameters)
    {
        return array_diff($required_parameters, array_keys($input));
    }

    public function response($statusCode, $message = "", $content = [])
    {
        return array (
            "statusCode" => $statusCode,
            "body" => array (
                "message" => $message,
                "content" => $content
            )
        );
    }
}
