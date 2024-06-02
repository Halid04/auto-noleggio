<?php
namespace Src\Gateway;
use Src\Database;
use Src\Gateway\BaseGateway;

class TransactionGateway extends BaseGateway
{
    public function __construct(Database $db)
    {
        $this->tableName = "transazionefinanziaria";
        parent::__construct($db);
    }

    public function findPastRentals($request)
    {
        $statement = "
            SELECT 
                $this->tableName.*, veicolo.*
            FROM " . $this->tableName . "
            JOIN veicolo ON $this->tableName.id_veicolo = veicolo.id_veicolo
            WHERE data_fine < CURRENT_TIMESTAMP AND id_cliente = :user_id;";
        
        try {
            $statement = $this->conn->prepare($statement);

            $statement->execute([
                "user_id" => $request['user_id']
            ]);

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

    public function findUpcomingRentals($request)
    {
        $statement = "
            SELECT 
                $this->tableName.*, veicolo.*
            FROM " . $this->tableName . "
            JOIN veicolo ON $this->tableName.id_veicolo = veicolo.id_veicolo
            WHERE data_inizio > CURRENT_TIMESTAMP AND id_cliente = :user_id;";
        
        try {
            $statement = $this->conn->prepare($statement);

            $statement->execute([
                "user_id" => $request['user_id']
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

    public function findOccupiedVehicles($request)
    {
        $statement = "
            SELECT 
                COUNT(*) as occupied_vehicles
            FROM " . $this->tableName . "
            WHERE CURRENT_TIMESTAMP BETWEEN data_inizio AND data_fine;";
        
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

    public function findTotalProceeds($request)
    {
        $statement = "
            SELECT 
                SUM(importo) as proceeds
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

    

    public function findProceedsGroupedByMonth($request)
    {
        $statement = "
            SELECT 
                MONTHNAME(data_transazione) as mese, SUM(importo) as incassi
            FROM " . $this->tableName . "
            GROUP BY (MONTH(data_transazione));";
        
        try {
            $statement = $this->conn->query($statement);

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

    public function findProceedsGroupedByHeadQuarter($request)
    {
        $statement = "
            SELECT 
                sede.nome, sede.id_sede, SUM(importo) as proceeds
            FROM " . $this->tableName . "
            JOIN veicolo ON transazionefinanziaria.id_veicolo = veicolo.id_veicolo
            JOIN sede ON veicolo.id_sede = sede.id_sede
            GROUP BY (sede.id_sede);";
        
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

    public function findTransactionUsers($request)
    {
        $statement = "
            SELECT 
                COUNT(*) as count
            FROM " . $this->tableName . "
            GROUP BY (id_cliente);";
        
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

    public function findAll($request)
    {
        $statement = "
            SELECT 
                *
            FROM " . $this->tableName . "
            WHERE id_cliente = :user_id;";
        
        try {
            $statement = $this->conn->prepare($statement);

            $statement->execute([
                'user_id' => (int) $input['user_id']
            ]);

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

    public function findLatest($request)
    {
        $statement = "
            SELECT 
                *
            FROM $this->tableName 
            JOIN veicolo ON $this->tableName.id_veicolo = veicolo.id_veicolo
            JOIN sede on veicolo.id_sede = sede.id_sede
            WHERE id_cliente = :user_id ORDER BY id_" . $this->tableName . " DESC LIMIT 1;";

        try {
            $statement = $this->conn->prepare($statement);

            $statement->execute([
                'user_id' => (int) $request['user_id']
            ]);

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
            " WHERE id_". $this->tableName. " = :id AND id_cliente = :user_id;
            ";

        try {
            $statement = $this->conn->prepare($statement);
            $statement->execute(array(
                'id' => (int) $input["id"],
                'user_id' => (int) $input['user_id']
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

    public function insert(array $input)
    {
        $fields = ["numero_carta", "ccv", "scadenza", "importo", "data_transazione", "id_cliente", "id_veicolo", "data_inizio", "data_fine"];

        $missing_keys = $this->validateRequiredParameters($input, $fields);
        
        if (!empty($missing_keys)) {
            return $this->response(400, "Missing parameters: " . implode(", ", $missing_keys));
        }
        
        $result = $this->conn->prepare("SELECT * FROM transazionefinanziaria
        WHERE
            id_veicolo = :id_veicolo AND
            (data_inizio <= :data_fine AND data_fine >= :data_inizio) 
        ");

        $result->execute([
            'id_veicolo' => $input['id_veicolo'],
            'data_inizio' => $input['data_inizio'],
            'data_fine' => $input['data_fine']
        ]);

        if ($result->fetchColumn() > 0) {
            return $this->response(400, message: "Impossibile effettuare la prenotazione. Date già prenotate");
        }

        $insert_response = $this->insertM($input, $fields);

        if ($insert_response["statusCode"] != 201) {
            return $this->response(
                $insert_response["statusCode"],
                message: $insert_response["body"]["message"]
            );
        }

        return $this->response(
            201,
            message: "Transazione effettuata"
        );
    }

    public function validateInput(array $input)
    {
        $errors = [];
        /*
        if (isset($input['targa']) && !preg_match('/^[A-Z]{2}[0-9]{3}[A-Z]{2}$/', $input['targa'])) {
            $errors[] = "The number plate provided is in an invalid format";
        }

        if (isset($input['numero_posti']) && !is_numeric($input['numero_posti'])) {
            $errors[] = "The number of seats must be numeric";
        }
        */

        return $errors;
    }

    public function update(array $input)
    {
        $fields = ["id_veicolo", "percorso_foto"];

        //$validationErrors = $this->validateInput($input);
        if (!empty($validationErrors)) {
            return $this->response(400, $validationErrors);
        }

        return $this->updateM($input, $fields);
    }
}
