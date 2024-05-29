<?php
namespace Src\Gateway;
use Src\Database;
use Src\Gateway\BaseGateway;

class OTPGateway extends BaseGateway
{
    public function __construct(Database $db)
    {
        $this->tableName = "transazionefinanziaria";
        parent::__construct($db);
    }

    public function insert(array $input)
    {
        $fields = ["id_cartadicredito", "importo", "stato", "data_transazione", "telefono"];

        $insert_response = $this->insertM($input, $fields);

        if ($insert_response["statusCode"] != 201) {
            return $this->response(
                $insert_response["statusCode"],
                message: $insert_response["body"]["message"]
            );
        }

        return $this->response(
            201,
            message: "Transaction inserted successfully"
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
