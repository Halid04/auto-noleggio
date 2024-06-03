<?php
namespace Src\Gateway;
use Src\Database;
use Src\Gateway\BaseGateway;

class GPSGateway extends BaseGateway
{
    public function __construct(Database $db)
    {
        $this->tableName = "dispositivogps";
        parent::__construct($db);
    }

    public function find($input)
    {
        $statement = "
            SELECT 
                *
            FROM " . $this->tableName .
            " WHERE id_". $this->tableName. " = :id
            JOIN veicolo on veicolo.id_dispositivogps = dispositivogps.id_dispositivogps;
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

    public function findAll($request)
    {
        $statement = "
            SELECT 
                *
            FROM " . $this->tableName . "
            JOIN veicolo on veicolo.id_dispositivogps = dispositivogps.id_dispositivogps";
        
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

    public function findDevices($request)
    {
        $statement = "
            SELECT 
                id_$this->tableName
            FROM " . $this->tableName . "
            ";
        
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

    public function insert(array $input)
    {
        $fields = ["latitudine", "longitudine", "timestamp"];

        $insert_response = $this->insertM($input, $fields);

        if ($insert_response["statusCode"] != 201) {
            return $this->response(
                $insert_response["statusCode"],
                message: $insert_response["body"]["message"]
            );
        }

        return $this->response(
            201,
            message: "Posizione GPS inserita"
        );
    }

    public function validateInput(array $input)
    {
        $errors = [];
        
        if (isset($input['latitudine']) && !preg_match('/^([0-9.]+)$/', $input['latitudine'])) {
            $errors[] = "La latitudine deve essere un numero decimale";
        }

        if (isset($input['longitudine']) && !preg_match('/^([0-9.]+)$/', $input['longitudine'])) {
            $errors[] = "La longitudine deve essere un numero decimale";
        }

        return $errors;
    }
}
