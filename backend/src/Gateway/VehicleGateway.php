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

    public function getTypes($input) 
    {
        $statement = "
            SELECT DISTINCT
                tipo_veicolo
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

    public function getYears($input) 
    {
        $statement = "
            SELECT DISTINCT
                anno_immatricolazione
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

    public function getFuelTypes($input) 
    {
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

    public function getOccupiedSlots($request)
    {
        if (!isset($request['id'])) {
            return $this->response(400, message: "Parametro mancante: id");
        }
        
        $statement = "
            SELECT 
                transazionefinanziaria.data_inizio, transazionefinanziaria.data_fine 
            FROM " . $this->tableName . "
            JOIN transazionefinanziaria ON transazionefinanziaria.id_veicolo = veicolo.id_veicolo
            WHERE veicolo.id_veicolo = :id_veicolo
            ";
        
        try {
            $statement = $this->conn->prepare($statement);

            $statement->execute([
                "id_veicolo" => $request['id']
            ]
            );

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
                veicolo.*, sede.*, 
                CASE
                WHEN preferire.id_cliente = " . ($request['user_id'] ?? -1) . " THEN true
                    ELSE false
                END as favorited 
            FROM " . $this->tableName . " JOIN sede on veicolo.id_sede = sede.id_sede LEFT JOIN preferire ON veicolo.id_veicolo = preferire.id_veicolo" .
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

            if ($filter['type'] == "numeric_list") {
                $statement .= "AND (";
                $counter = 0;
                foreach ($filter['params'] as $pair) {
                    if ($counter != 0) {
                        $statement .= " OR ";
                    }
                    $counter++;
                    $statement .= " (" . $filter['name'] . " >= " . $pair[0] . " AND " . $filter['name'] . " <= " . $pair[1] . ") ";
                }
                $statement .= ") ";
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

    public function findRented($request)
    {
        $statement = "
            SELECT 
                veicolo.*, transazionefinanziaria.data_inizio, transazionefinanziaria.data_fine
            FROM " . $this->tableName . " 
            JOIN transazionefinanziaria on veicolo.id_veicolo = transazionefinanziaria.id_veicolo
            WHERE transazionefinanziaria.id_cliente = :user_id";

        try {
            $statement = $this->conn->prepare($statement);
            $statement->execute([
                "user_id" => $request['user_id']
            ]
            );

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

    public function findAll($request)
    {
        $statement = "SELECT v.*, s.*, 
                        CASE
                            WHEN p.id_cliente IS NOT NULL THEN true
                            ELSE false
                        END as favorited
                    FROM veicolo v
                    JOIN sede s ON v.id_sede = s.id_sede
                    LEFT JOIN (
                        SELECT id_veicolo, id_cliente 
                        FROM preferire 
                        WHERE id_cliente = ". ($request['user_id'] ?? -1) . "
                    ) p ON v.id_veicolo = p.id_veicolo";
    
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

    public function findAllAdmin($request)
    {
        $statement = "
            SELECT 
                veicolo.*, sede.*, 
                CASE
                WHEN CURRENT_TIMESTAMP BETWEEN transazionefinanziaria.data_inizio AND transazionefinanziaria.data_fine THEN 'noleggiato'
                    ELSE 'disponibile'
                END as stato 
            FROM " . $this->tableName . " JOIN sede on veicolo.id_sede = sede.id_sede LEFT JOIN transazionefinanziaria ON veicolo.id_veicolo = transazionefinanziaria.id_veicolo";

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
        v.*, 
        s.*, 
        CASE
            WHEN p.id_cliente IS NOT NULL THEN true
            ELSE false
        END as favorited
    FROM veicolo v
    JOIN sede s ON v.id_sede = s.id_sede
    LEFT JOIN (
        SELECT id_veicolo, id_cliente 
        FROM preferire 
        WHERE id_cliente = " . ($request['user_id'] ?? -1) . "
    ) p ON v.id_veicolo = p.id_veicolo
    WHERE v.id_veicolo = :id;";
    
            

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
        $fields = [
            "marca",
            "targa",
            "modello",
            "anno_immatricolazione",
            "numero_posti",
            "tipo_carburazione",
            "tipo_veicolo",
            "colore_veicolo",
            "id_sede",
            "id_dispositivogps",
            "chilometraggio",
            "costo_giornaliero"
        ];

        $insert_response = $this->insertM($input, $fields);

        if ($insert_response["statusCode"] != 201) {
            return $this->response(
                $insert_response["statusCode"],
                message: $insert_response["body"]["message"]
            );
        }

        $latestVehicle = $this->findLatest($input)['body']['content'][0];

        $input['id_veicolo'] = $latestVehicle['id_veicolo'];

        if (isset($input['images']) && !empty($input['images'])) {
            $response = $this->imageGateway->insert($input);

            if ($response['statusCode'] != 201) {
                return $this->response($response['statusCode'], $response['body']['message']);
            }
        }

        return $this->response(201, "Veicolo aggiunto");

        
    }

    private function validateFilterObject(array $input) 
    {
        
        $filters = [
            [
                "name" => "costo_giornaliero",
                "type" => "numeric",
                "keys" => [
                    "upperbound",
                    "lowerbound"
                ]
            ],
            [
                "name" => "chilometraggio",
                "type" => "numeric",
                "keys" => [
                    "upperbound",
                    "lowerbound"
                ]
            ],
            [
                "name" => "anno_immatricolazione",
                "type" => "numeric_list",
            ],
            [
                "name" => "marca",
                "type" => "list",
            ],
            [
                "name" => "tipo_carburazione",
                "type" => "list",
            ],
            [
                "name" => "tipo_veicolo",
                "type" => "list",
            ],
            [
                "name" => "id_sede",
                "type" => "list",
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
                                $response_obj['obj'] = $this->response(400, message: "Invalid request: The '$key' parameter must be numeric");
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
                } else if ($filter['type'] == "numeric_list") {
                    $filter_pairs = [];

                    if (!is_array($input[$filter['name']])) {
                        $response_obj['status'] = false;
                        $response_obj['obj'] = $this->response(400, message: "Invalid request: The '" . $filter['name'] . "' must be an array");
                        return $response_obj;
                    }

                    foreach ($input[$filter['name']] as $pair) {
                        if (!is_string($pair)) {
                            $response_obj['status'] = false;
                            $response_obj['obj'] = $this->response(400, message: "Invalid request: The '" . $filter['name'] . "' filter pairs must strings");
                            return $response_obj;
                        }

                        if (!preg_match('/^\d+-\d+$/', $pair)) {
                            $response_obj['status'] = false;
                            $response_obj['obj'] = $this->response(400, message: "Invalid request: The '" . $filter['name'] . "' filter pairs must be in the format [d+]-[d+]");
                            return $response_obj;
                        }

                        $pairs = explode("-", $pair);
                        array_push($filter_pairs, $pairs);
                    }

                    $filter_obj[] = [
                        "name" => $filter['name'],
                        "type" => $filter['type'],
                        "params" => $filter_pairs
                    ];
                }
                else {
                    /*
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
                    */
                    if (!is_array($input[$filter['name']])) {
                        $response_obj['status'] = false;
                        $response_obj['obj'] = $this->response(400, message: "Invalid request: The 'list' parameter must be an array");
                        return $response_obj;
                    }
                    
                    /*
                    if (isset($input[$filter['name']]["exclude"])) {
                        if (!is_bool($input[$filter['name']]["exclude"])) {
                            $response_obj['status'] = false;
                            $response_obj['obj'] = $this->response(400, message: "Invalid request: The 'exclude' parameter must be a boolean");
                            return $response_obj;
                        }
                    }
                    */

                    $filter_obj[] = [
                        "name" => $filter['name'],
                        "type" => $filter['type'],
                        "params" => [
                            "list" => $input[$filter['name']],
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
            $errors[] = "La targa del veicolo non è nel formato valido";
        }

        if (isset($input['numero_posti']) && !is_numeric($input['numero_posti'])) {
            $errors[] = "Il numero di posti del veicolo dev'essere un numero";
        }

        if (isset($input['chilometraggio']) && !is_numeric($input['chilometraggio'])) {
            $errors[] = "Il chilometraggio del veicolo dev'essere un numero";
        }

        if (isset($input['anno_immatricolazione']) && !is_numeric($input['anno_immatricolazione'])) {
            $errors[] = "L'anno d'immatricolazione del veicolo dev'essere un numero";
        }

        if (isset($input['costo_giornaliero']) && !preg_match('/^([0-9.]+)$/', $input['costo_giornaliero'])) {
            $errors[] = "Il costo del veicolo dev'essere un numero positivo";
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
