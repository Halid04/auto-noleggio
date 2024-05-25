<?php
namespace Src\Gateway;
use \Src\Database;
use \Src\Gateway\BaseGateway;

class ImageGateway extends BaseGateway {


    public function __construct(Database $db)
    {
        $this->tableName = "fotoveicolo";
        parent::__construct($db);
    }

    public function find($input)
    {
        $statement = "
            SELECT 
                *
            FROM " . $this->tableName .
            " WHERE id_foto = :id;
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

        } catch (\PDOException $e) {
            error_log("Database error: " . $e->getMessage());
            return $this->response(500, message: "Internal Server Error");
        }    
    }

    public function findVehicleImages($input)
    {
        if (!isset($input["id"])) {
            return $this->response(400, message: "Invalid request: Missing parameters: id");
        }

        $statement = "
            SELECT 
                *
            FROM " . $this->tableName .
            " WHERE id_veicolo = :id_veicolo;
            ";

        try {
            $statement = $this->conn->prepare($statement);
            $statement->execute(array(
                'id_veicolo' => (int) $input["id"]
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

    public function insert(array $input)
    {
        if (!isset($input["images"])) {
            return $this->response(400, message: "Invalid request: Missing parameters: images");
        }

        $image_statement = "
            INSERT INTO FotoVeicolo
            (id_veicolo, nome_foto) VALUES ";

        if (!empty($input['images'])) {

            foreach ($input['images'] as $image) {

                $required_parameters = [
                    "nome_foto",
                    "id_veicolo"
                ];
        
                $missing_keys = $this->validateRequiredParameters($image, $required_parameters);
    
                if (!empty($missing_keys)) {
                    return $this->response(400, "Invalid request: Invalid image array: Missing parameters: " . implode(", ", $missing_keys));
                }
    
                $image_statement .= "('" . $image['id_veicolo'] . "', '" . $image['nome_foto'] ."'), ";
            }

            try {   
                $image_statement = substr($image_statement, 0, -2);
                $this->conn->query($image_statement);
            } catch (\PDOException $e) {
                if ($e->getCode() == "23000") {
                    return $this->response(400, "Invalid request: Vehicle ID is not valid");
                }
                error_log("Database error: " . $e->getMessage());
                return $this->response(500, "Internal Server Error");
            }

            return $this->response(201, "Images added successfully");
        }

        return $this->response(400, "Invalid request: Empty image array");
    }

    private function validateInput(array $input)
    {
        $errors = [];

        if (isset($input['targa']) && !preg_match('/^[A-Z]{2}[0-9]{3}[A-Z]{2}$/', $input['targa'])) {
            $errors[] = "The number plate provided is in an invalid format";
        }

        if (isset($input['numero_posti']) && !is_numeric($input['numero_posti'])) {
            $errors[] = "The number of seats must be numeric";
        }

        return $errors;
    }


    public function update(array $input)
    {
        
        $fields = [
            "id_veicolo",
            "percorso_foto"
        ];

        //$validationErrors = $this->validateInput($input);
        if (!empty($validationErrors)) {
            return $this->response(400, $validationErrors);
        }
        
        return $this->updateM($input, $fields);
    }
}
