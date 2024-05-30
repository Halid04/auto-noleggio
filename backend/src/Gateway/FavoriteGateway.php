<?php
namespace Src\Gateway;
use Src\Database;
use Src\Gateway\BaseGateway;

class FavoriteGateway extends BaseGateway
{
    public function __construct(Database $db)
    {
        $this->tableName = "preferire";
        parent::__construct($db);
    }

    public function insert(array $input)
    {
        $fields = ["id_cliente", "id_veicolo"];

        $input['id_cliente'] = $input['user_id'];
        
        $input['id_veicolo'] = $input['id'];  

        $insert_response = $this->insertM($input, $fields);

        if ($insert_response["statusCode"] != 201) {
            return $this->response(
                $insert_response["statusCode"],
                message: $insert_response["body"]["message"]
            );
        }

        return $this->response(
            201,
            message: "Veicolo aggiunto ai preferiti"
        );
    }

    public function find($input)
    {
        $required_parameters = ['user_id'];

        $missing_keys = $this->validateRequiredParameters($input, $required_parameters);
        
        if (!empty($missing_keys)) {
            return $this->response(400, "Missing parameters: " . implode(", ", $missing_keys));
        }
        
        $statement = "
            SELECT 
                *
            FROM " . $this->tableName .
            " WHERE id_cliente = :user_id;
            ";

        try {
            $statement = $this->conn->prepare($statement);
            $statement->execute(array(
                'user_id' => (int) $input["user_id"]
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
        $required_parameters = ['id', 'user_id'];

        $missing_keys = $this->validateRequiredParameters($input, $required_parameters);
        
        if (!empty($missing_keys)) {
            return $this->response(400, "Missing parameters: " . implode(", ", $missing_keys));
        }
        
        $statement = "
            DELETE FROM " . $this->tableName .
             " WHERE id_veicolo = :id AND id_cliente = :user_id;
        ";

        try {
            $statement = $this->conn->prepare($statement);
            $statement->execute(array(
                'id' => (int) $input["id"],
                'user_id' => (int) $input["user_id"]
            ));

            return $this->response(200, content: $statement->rowCount());

        } catch (\PDOException $e) {
            error_log("Database error: " . $e->getMessage());
            return $this->response(500, message: "Internal Server Error");
        }    
    }

    
}
