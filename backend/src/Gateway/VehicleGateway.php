<?php
namespace Src\Gateway;
use \Src\Database;
use \Src\Gateway\BaseGateway;

class VehicleGateway extends BaseGateway {


    public function __construct(Database $db)
    {
        $this->tableName = "Veicolo";
        parent::__construct($db);
    }

    public function insert(array $input)
    {
        $required_parameters = [
            "ma"
            "targa",
            "modello",
            "anno_immatricolazione",
            "numero_posti",
            "tipo_carburazione"
        ];

        $missing_keys = $this->validateRequiredParameters($input, $required_parameters);
        if (!empty($missing_keys)) {
            return $this->response(400, "Missing parameters: " . implode(", ", $missing_keys));
        }

        $validationErrors = $this->validateInput($input);
        if (!empty($validationErrors)) {
            return $this->response(400, $validationErrors);
        }

        $statement = "
            INSERT INTO " . $this->tableName . "
                (targa, modello, anno_immatricolazione, numero_posti, tipo_carburazione)
            VALUES (
                :targa,
                :modello, 
                :anno_immatricolazione, 
                :numero_posti, 
                :tipo_carburazione
            )";

        try {
            $statement = $this->conn->prepare($statement);
            $statement->execute([
                'targa' => $input['targa'],
                'modello' => $input['modello'],
                'anno_immatricolazione' => $input['anno_immatricolazione'],
                'numero_posti' => $input['numero_posti'],
                'tipo_carburazione' => $input['tipo_carburazione'],
            ]);

            return $this->response(201, "Vehicle added successfully");
        } catch (\PDOException $e) {
            error_log("Database error: " . $e->getMessage());
            return $this->response(500, "Internal Server Error");
        }
    }

    private function validateInput(array $input)
    {
        $errors = [];

        if (!preg_match('/^[A-Z]{2}[0-9]{3}[A-Z]{2}$/', $input['targa'])) {
            $errors[] = "The number plate provided is in an invalid format";
        }

        if (!is_numeric($input['numero_posti'])) {
            $errors[] = "The number of seats must be numeric";
        }

        return $errors;
    }


    public function update(array $input)
    {
        
        $fields = [
            "targa",
            "modello",
            "anno_immatricolazione",
            "telefono",
            "numero_posti",
            "tipo_carburazione"
        ];

        $superfluous_keys = array_diff(array_keys($input), $fields);

        if (!empty($superfluous_keys)) {
            return $this->response(400, message: "Superfluous parameters: " . implode(", ", $superfluous_keys));
        }
        
        $this->updateM($input, $fields);
    }
}
