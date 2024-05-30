<?php
namespace Src\Controller;

use \Src\Gateway\OTPGateway;
use \Src\Controller\BaseController;

class OTPController extends BaseController {

    public function __construct($requestMethod, $data, $db)
    {
        parent::__construct($requestMethod, $data, new OTPGateway($db));
    }

    public function processRequest()
    {

        try {

            $auth = $this->authenticateRequest($this->data);

            if (!$auth['status']) {
                $response = $auth['response_obj'];
            } else {
                switch ($this->requestMethod) {
                    case 'GET':
                        if (isset($this->uri[1])) {
                            switch ($this->uri[1]){
                                case "getChallenge":
                                    $response = $this->gateway->generateChallenge($this->data, $auth_info);
                                    break;
                                default:
                                    $this->sendOutput(array('Content-Type: application/json'), statusCode: 404, data: ["message" => "Resource not found"]);
                                    break;
                                    return;
                            }
                        } else {
                            if ($this->data['all'] ?? false || (!isset($this->data['id']))) {
                                $response = $this->gateway->findAll($this->data);
                            } else {
                                $response = $this->gateway->find($this->data);
                            };
                        }      
                        break;
                    case 'POST':
                        if (isset($this->uri[1])) {
                            switch ($this->uri[1]){
                                case "solveChallenge":
                                    $response = $this->gateway->verifyChallenge($this->data, $auth_info);
                                    break;
                                default:
                                    $this->sendOutput(array('Content-Type: application/json'), statusCode: 404, data: ["message" => "Resource not found"]);
                                    break;
                                    return;
                            }
                        } else {
                            if ($this->data['all'] ?? false || (!isset($this->data['id']))) {
                                $response = $this->gateway->findAll($this->data);
                            } else {
                                $response = $this->gateway->find($this->data);
                            };
                        }      
                        break;
                    case 'PUT':
                        $response = $this->gateway->update($this->data);
                        break;
                    case 'DELETE':
                        $response = $this->gateway->delete($this->data);
                        break;
                    default:
                        $this->sendOutput(array('Content-Type: application/json'), statusCode: 404, data: ["message" => "Resource not found"]);
                        return;
                }
            }
            
        } catch (\Exception $e) {
            $response = array (
                'statusCode' => 401,
                'body' => array (
                    'message' => $e->getMessage()
                )
            );
        }
        $this->sendOutput(array('Content-Type: application/json'), $response['body'], $response['statusCode']);

    }

    public function authenticateRequest (&$request) {
        $response_obj = [];
        $response_obj['status'] = false;
        
        $auth_info = $this->authenticateToken($request);

        if (!$auth_info['status']) {
            $response_obj['obj'] = $auth_info['obj'];
            return $response_obj;
        }

        $auth_info = $auth_info['obj'];

        if (!isset($request['id'])) {
            $request['id'] = $auth_info['data']['user_id'];
        }

        if ($request['all'] ?? false && $auth_info['data']['admin'] === 0) {
            $response_obj['obj'] =  array (
                'statusCode' => 403,
                'body' => array (
                    'message' => "Access forbidden: You do not have permission to access this resource"
                )
            );
            return $response_obj;
        }

        if ($auth_info['data']['user_id'] != ($request['id'] ?? -1) && $auth_info['data']['admin'] == 0) {

            $response_obj['obj'] =  array (
                'statusCode' => 403,
                'body' => array (
                    'message' => "Access forbidden: You do not have permission to access this resource"
                )
            );

            return $response_obj;
        }

        $response_obj['status'] = true;
        $response_obj['obj'] = $auth_info;

        return $response_obj;
    }

    private function generateChallenge($request, $auth_info)
    {
        $otp_code = generateOTP($_ENV['SECRET_KEY']);

        $date = date('Y-m-d H:i:s', time());

        $expiry_date = date('Y-m-d H:i:s', time() + 2 * 60);
        
        $status = 1;

        $result = $this->gateway->insert([
            "codice" => password_hash($otp_code, PASSWORD_DEFAULT),
            "data_generazione" => $date,
            "data_scadenza" => $expiry_date,
            "stato" => $status,
            "id_cliente" => $auth_info['user_id']
        ]);

        if ($result['statusCode'] != 201) {
            return result;
        }

        $result = $this->gateway->findLatest();

        if ($result['statusCode'] != 200) {
            return result;
        }

        $result = $result['body']['content'];

        if (empty($result)) {
            return [
                'statusCode' => 500,
                'body' => [
                    'message' => 'Internal Server Error'
                ]
            ];
        }

        $challenge_id = $result[0]['id_codiceotp'];

        return [
            'statusCode' => 200,
            'body' => [
                'content' => [
                    'challenge_id' => $challenge_id
                ]
            ]
        ];
    }

    function verifyChallenge($request, $auth_info)
    {
        
        $required_parameters = ["otp_code", "otp_challenge_id"];

        $request_keys = array_keys($request);
    
        $missing_keys = array_diff($required_parameters, $request_keys);
    
        if (count($missing_keys) !== 0) {
            return [
                'statusCode' => 400,
                'body' => [
                    'message' => "Missing parameters: " . implode(",", $missing_keys)
                ]
            ];
        }

        $result = $this->gatewat->find(["id" => $request['otp_challenge_id']]);

        $result = $result['body']['content'];

        if (empty($result)) {
            return [
                'statusCode' => 404,
                'body' => [
                    'message' => "Challenge non trovata"
                ]
            ];
            header('Content-Type: application/json');
            http_response_code(404);
            echo json_encode(["message" => "Challenge non trovata"]);
            return;
        }

        $otp_challenge = $result[0];

        if ($otp_challenge['id_cliente'] != $auth_info['user_id']) {
            header('Content-Type: application/json');
            http_response_code(403);
            echo json_encode(["message" => "Non hai il permesso di risolvere questa challenge"]);
            return;
        }

        if ($otp_challenge['stato'] == "failed") {
            header('Content-Type: application/json');
            http_response_code(400);
            echo json_encode(["message" => "Challenge già utilizzata: Esito negativo"]);
            return;
        }

        if ($otp_challenge['stato'] == "successful") {
            header('Content-Type: application/json');
            http_response_code(400);
            echo json_encode(["message" => "Challenge già utilizzata: Esito positivo"]);
            return;
        }

        if ($otp_challenge['stato'] == "expired") {
            header('Content-Type: application/json');
            http_response_code(400);
            echo json_encode(["message" => "Challenge scaduta"]);
            return;
        }

        if (time() >= strtotime($otp_challenge['data_scadenza'])) {

            $result = $otp_gateway->update([
                'id' => $request['otp_challenge_id'],
                'stato' => 4
            ]);

            if ($result['statusCode'] != 200) {
                header('Content-Type: application/json');
                http_response_code($result['statusCode']);
                echo json_encode($result['body']);
                return;
            }

            header('Content-Type: application/json');
            http_response_code(400);
            echo json_encode(["message" => "Challenge scaduta"]);
            return;
        }

        if ($otp_challenge['used'] == "used") {
            header('Content-Type: application/json');
            http_response_code(400);
            echo json_encode(["message" => "Challenge già utilizzata: Transazione già eseguita"]);
            return;
        }

        if (!password_verify($request['otp_code'], $otp_challenge['codice'])) {


            $result = $otp_gateway->update([
                'id' => $request['otp_challenge_id'],
                'stato' => 2
            ]);

            if ($result['statusCode'] != 200) {
                header('Content-Type: application/json');
                http_response_code($result['statusCode']);
                echo json_encode($result['body']);
                return;
            }

            header('Content-Type: application/json');
            http_response_code(403);
            echo json_encode(["message" => "Codice OTP errato"]);
            return;
        } else {
            $result = $otp_gateway->update([
                'id' => $request['otp_challenge_id'],
                'stato' => 3
            ]);

            if ($result['statusCode'] != 200) {
                header('Content-Type: application/json');
                http_response_code($result['statusCode']);
                echo json_encode($result['body']);
                return;
            }

            header('Content-Type: application/json');
            http_response_code(200);
            echo json_encode(["message" => "Challenge risolta"]);
            return;
        }

        header('Content-Type: application/json');
        http_response_code(500);
        echo json_encode(["message" => "Internal Server Error"]);
        return;
    }

    function generateOTP(string $secret_key, int $time_step = 60, int $length = 6): string
    {
        $counter = floor(time() / $time_step);
        $data = pack("NN", 0, $counter);
        $hash = hash_hmac('sha1', $data, $secret_key, true);
        $offset = ord(substr($hash, -1)) & 0x0F;
        $value = unpack("N", substr($hash, $offset, 4));
        $otp = ($value[1] & 0x7FFFFFFF) % pow(10, $length);

        return str_pad(strval($otp), $length, '0', STR_PAD_LEFT);
    }

}