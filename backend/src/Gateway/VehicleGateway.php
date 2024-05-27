<?php
namespace Src\Gateway;
use \Src\Database;
use \Src\Gateway\BaseGateway;
use \Src\Gateway\ImageGateway;

class VehicleGateway extends BaseGateway {

    private $imageGateway;

    public function __construct(Database $db)
    {
        $this->tableName = "veicolo";
        $this->imageGateway = new ImageGateway($db);
        parent::__construct($db);
    }

    public function getFuelTypes($input) {
        $statement = "
            SELECT DISTINCT
                tipo_carburazione
            FROM " . $this->tableName;
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

    public function getMakes($input) {
        $statement = "
            SELECT DISTINCT
                marca
            FROM " . $this->tableName;
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

    public function filter($input)
    {
        if (!isset($input["filters"])) {
            return $this->response(400, message: "Invalid request: Missing parameters: filters");
        }
        
        $response = $this->validateFilterObject($input);

        if (!$response['status']) {
            return $this->response($response['obj']['statusCode'], message: $response['obj']['body']['message']);
        }

        $statement = "
            SELECT 
                veicolo.*, sede.nome
            FROM " . $this->tableName . " JOIN sede on veicolo.id_sede = sede.id_sede " .
            " WHERE 1 
            ";

        $params = [];

        foreach ($response['obj'] as $filter) {
            if ($filter['type'] == "numeric") {
                if (isset($filter['params']['lowerbound'])) {
                    $statement .= " AND " . $filter['name'] . " >= " . $filter['params']['lowerbound'] . " ";
                }
                if (isset($filter['params']['upperbound'])) {
                    $statement .= " AND " . $filter['name'] . " <= " . $filter['params']['upperbound'] . " ";
                }
            }

            if ($filter['type'] == "list") {
                $statement .= " AND " . $filter['name'] . ($filter['params']['exclude'] ? " NOT" : "") ." IN (" . str_repeat('?,', count($filter['params']['list']) - 1) . '?)';
                $params = array_merge($params, $filter['params']['list']);
            }
        }

        try {
            $statement = $this->conn->prepare($statement);
            $statement->execute($params);

            $response = $statement->fetchAll(\PDO::FETCH_ASSOC);

            if (!$response) {
                $response = [];
            } else {

                foreach($response as &$vehicle) {
                    $image_response = $this->imageGateway->findVehicleImages(["id" => $vehicle['id_veicolo']]);

                    if ($image_response['statusCode'] != 200) {
                        return $this->response($image_response['statusCode'], message: $image_response['body']['message']);
                    }

                    $vehicle['images'] = $image_response['body']['content'];
                }

            }
            

            return $this->response(200, content: $response);

        } catch (\PDOException $e) {
            error_log("Database error: " . $e->getMessage());
            return $this->response(500, message: "Internal Server Error");
        }    
    }

    public function findAll()
    {
        $statement = "
            SELECT 
                veicolo.*, sede.*
            FROM " . $this->tableName . " JOIN sede on veicolo.id_sede = sede.id_sede";

        try {
            $statement = $this->conn->prepare($statement);
            $statement->execute();

            $response = $statement->fetchAll(\PDO::FETCH_ASSOC);

            if (!$response) {
                $response = [];
            } else {

                foreach($response as &$vehicle) {
                    $image_response = $this->imageGateway->findVehicleImages(['id' => $vehicle['id_veicolo']]);

                    if ($image_response['statusCode'] != 200) {
                        return $this->response($image_response['statusCode'], message: $image_response['body']['message']);
                    }

                    $vehicle['images'] = $image_response['body']['content'];
                }
     
            }
            
            return $this->response(200, content: $response);

        } catch (\PDOException $e) {
            error_log("Database error: " . $e->getMessage());
            return $this->response(500, message: "Internal Server Error");
        }    
    }

    public function find($input)
    {
        $statement = "
            SELECT 
                veicolo.*, sede.nome as nome_sede
            FROM " . $this->tableName .
            " JOIN sede on veicolo.id_sede = sede.id_sede
             WHERE id_". $this->tableName. " = :id;
            ";

        try {
            $statement = $this->conn->prepare($statement);
            $statement->execute(array(
                'id' => (int) $input["id"]
            ));

            $response = $statement->fetchAll(\PDO::FETCH_ASSOC);

            if (!$response) {
                $response = [];
            } else {

                foreach($response as &$vehicle) {
                    $image_response = $this->imageGateway->findVehicleImages($input);

                    if ($image_response['statusCode'] != 200) {
                        return $this->response($image_response['statusCode'], message: $image_response['body']['message']);
                    }

                    $vehicle['images'] = $image_response['body']['content'];
                }

                
            }
            

            return $this->response(200, content: $response);

        } catch (\PDOException $e) {
            error_log("Database error: " . $e->getMessage());
            return $this->response(500, message: "Internal Server Error");
        }    
    }

    public function insert(array $input)
    {
        $required_parameters = [
            "marca",
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
                (targa, marca, modello, anno_immatricolazione, numero_posti, tipo_carburazione)
            VALUES (
                :targa,
                :marca,
                :modello, 
                :anno_immatricolazione, 
                :numero_posti, 
                :tipo_carburazione
            )";

        try {
            $statement = $this->conn->prepare($statement);
            $statement->execute([
                'targa' => $input['targa'],
                'marca' => $input['marca'],
                'modello' => $input['modello'],
                'anno_immatricolazione' => $input['anno_immatricolazione'],
                'numero_posti' => $input['numero_posti'],
                'tipo_carburazione' => $input['tipo_carburazione'],
            ]);

        } catch (\PDOException $e) {
            if ($e->getCode() == "23000") {
                return $this->response(400, "Invalid request: Duplicate number plate");
            }
            error_log("Database error: " . $e->getMessage());
            return $this->response(500, "Internal Server Error");
        }

        if (isset($input['images']) && !empty($input['images'])) {
            $response = $this->imageGateway->insert($input);

            if ($response['statusCode'] != 201) {
                return $this->response($response['statusCode'], $response['body']['message']);
            }
        }

        return $this->response(201, "Vehicle added successfully");

        
    }

    private function validateFilterObject(array $input) 
    {
        $filters = [
            [
                "name" => "prezzo",
                "type" => "numeric",
                "keys" => [
                    "lowerbound",
                    "upperbound"
                ]
            ],
            [
                "name" => "chilometraggio",
                "type" => "numeric",
                "keys" => [
                    "lowerbound",
                    "upperbound"
                ]
            ],
            [
                "name" => "anno",
                "type" => "numeric",
                "keys" => [
                    "lowerbound",
                    "upperbound"
                ]
            ],
            [
                "name" => "marca",
                "type" => "list",
                "keys" => [
                    "list",
                    "exclude"
                ]
            ],
            [
                "name" => "tipocarburante",
                "type" => "list",
                "keys" => [
                    "list",
                    "exclude"
                ]
            ]
                ];

        $input = $input['filters'];

        $counter = 0;
        $filter_obj = [];

        foreach ($filters as $filter) {
            if (isset($input[$filter['name']])) {
                if ($filter['type'] == "numeric") {
                    $missing_params = array_diff(array_keys($input[$filter['name']]), $filter['keys']);
                    if (count($missing_params) < 2) {
                        foreach ($input[$filter['name']] as $key => $value){
                            if (!is_numeric($value)) {
                                $response_obj['status'] = false;
                                $response_obj['obj'] = $this->response(400, message: "Invalid request: The 'key' parameter must be numeric");
                            return $response_obj;
                            }
                        }
                    } else {
                        $response_obj['status'] = false;
                        $response_obj['obj'] = $this->response(400, message: "Invalid request: You must specify a bound");
                        return $response_obj;
                    }
                    $filter_obj[] = [
                        "name" => $filter['name'],
                        "type" => $filter['type'],
                        "params" => $input[$filter['name']]
                    ];
                } else {

                    if (!isset($input[$filter['name']]["list"])) {
                        $response_obj['status'] = false;
                        $response_obj['obj'] = $this->response(400, message: "Invalid request: The 'list' parameter must be defined");
                        return $response_obj;
                    }

                    if (!is_array($input[$filter['name']]["list"])) {
                        $response_obj['status'] = false;
                        $response_obj['obj'] = $this->response(400, message: "Invalid request: The 'list' parameter must be an array");
                        return $response_obj;
                    }

                    if (isset($input[$filter['name']]["exclude"])) {
                        if (!is_bool($input[$filter['name']]["exclude"])) {
                            $response_obj['status'] = false;
                            $response_obj['obj'] = $this->response(400, message: "Invalid request: The 'exclude' parameter must be a boolean");
                            return $response_obj;
                        }
                    }

                    $filter_obj[] = [
                        "name" => $filter['name'],
                        "type" => $filter['type'],
                        "params" => [
                            "list" => $input[$filter['name']]['list'],
                            "exclude" => $input[$filter['name']]['exclude'] ?? false
                            ]
                    ];
                }
                
            }
        }

        $response_obj['status'] = true;
        $response_obj['obj'] = $filter_obj;

        return $response_obj;
    }

    public function validateInput(array $input)
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
            "marca",
            "targa",
            "modello",
            "anno_immatricolazione",
            "numero_posti",
            "tipo_carburazione"
        ];

        $validationErrors = $this->validateInput($input);
        if (!empty($validationErrors)) {
            return $this->response(400, $validationErrors);
        }
        
        return $this->updateM($input, $fields);
    }
}
