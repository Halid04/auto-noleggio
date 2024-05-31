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

    public function findAll($request)
    {
        $statement = "
            SELECT 
                *
            FROM " . $this->tableName . ";";
        
        try {
            $statement = $this->conn->prepare($statement);
            $statement->execute();

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

    public function findLatest()
    {
        $statement = "
            SELECT 
                *
            FROM " . $this->tableName .
            " ORDER BY id_" . $this->tableName . " DESC LIMIT 1;";

        try {
            $statement = $this->conn->query($statement);

            $response = $statement->fetchAll(\PDO::FETCH_ASSOC);

            if (!$response) {
                $response = [];
            }

            return $this->response(200, content: $response);

            return $this->response(200, content: $statement->fetch(\PDO::FETCH_ASSOC));

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

            $response = $statement->fetchAll(\PDO::FETCH_ASSOC);

            if (!$response) {
                $response = [];
            }

            return $this->response(200, content: $response);

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

    public function insertM(array $input, $fields)
    {
        $missing_keys = $this->validateRequiredParameters($input, $fields);
        if (!empty($missing_keys)) {
            return $this->response(400, "Parametri mancanti: " . implode(", ", $missing_keys));
        }

        $validationErrors = $this->validateInput($input);
        if (!empty($validationErrors)) {
            return $this->response(400, $validationErrors);
        }

        $insertValues = "(" . implode(", ", $fields) . ")";
        $insertClause = "(" . str_repeat('?,', count($fields) - 1) . "?)";
    
        $params = [];

        foreach ($fields as $field) {
            $params[] = $input[$field];
        }

        $statementStr = "
            INSERT INTO " . $this->tableName . " " . $insertValues .
           " VALUES  " . $insertClause . ";"
        ;

        try {
            $statement = $this->conn->prepare($statementStr);
            $statement->execute($params);

            return $this->response(201, "$this->tableName inserted");
        } catch (\PDOException $e) {
            if ($e->getCode() == "23000") {
                return $this->response(400, "Invalid request: Constraint not valid");
            }
            error_log("Database error: " . $e->getMessage());
            return $this->response(500, "Internal Server Error");
        }
    }
    
    public function updateM(array $input, $fields)
    {
        if (!isset($input["id"])) {
            return $this->response(400, "Parametro mancante: id");
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
            return $this->response(400, "Nessun campo da aggiornare");
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

            return $this->response(200, "Informazioni aggiornate");
        } catch (\PDOException $e) {
            error_log("Database error: " . $e->getMessage());
            return $this->response(500, "Internal Server Error");
        }
    }

    public function validateInput(array $input)
    {
        return [];
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
