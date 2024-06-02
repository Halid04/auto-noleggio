<?php
namespace Src\Controller;

use \Src\Gateway\OTPGateway;
use \Src\Gateway\ClientGateway;
use \Src\Gateway\TransactionGateway;
use \Src\Controller\BaseController;
use \Src\Mail;

class OTPController extends BaseController {

    private $uri;
    private $transactionGateway;
    private $clientGateway;
    private $mail;

    public function __construct($requestMethod, $uri, $data, $db)
    {
        $this->uri = $uri;

        $this->transactionGateway = new TransactionGateway($db);
        $this->clientGateway = new ClientGateway($db);
        
        $this->mail = new Mail (
            $_ENV['SMTP_HOST'],
            $_ENV['SMTP_USERNAME'],
            $_ENV['SMTP_PASSWORD'],
        ); 
        
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
                        switch ($this->uri[1] ?? null){
                            case "getChallenge":
                                $response = $this->generateChallenge($this->data, $auth['obj']);
                                break;
                            default:
                                $this->sendOutput(array('Content-Type: application/json'), statusCode: 404, data: ["message" => "Resource not found"]);
                                break;
                                return;
                        }   
                        break;
                    case 'POST':
                        switch ($this->uri[1] ?? null){
                            case "solveChallenge":
                                $response = $this->verifyChallenge($this->data, $auth['obj']);
                                break;
                            default:
                                $this->sendOutput(array('Content-Type: application/json'), statusCode: 404, data: ["message" => "Resource not found"]);
                                break;
                                return;
                        }  
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

    public function authenticateRequest (&$request)
    {
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
        $auth_info = $auth_info['data'];

        $otp_code = $this->generateOTP($_ENV["SECRET_KEY"]);

        $user = $this->clientGateway->find(["id" => $auth_info["user_id"]]);

        if (!$user['statusCode'] = 200) {
            return $user;
        }

        $user = $user['body']['content'];

        if (empty($user)) {
            return array (
                'statusCode' => 404,
                'body' => array (
                    'message' => "Utente non trovato"
                )
            );
        }

        $user = $user[0];

        try {
            
            $this->mail->sendMail(
            [
                "address" => $user['email'],
                "name" => $user['nome'] . " " . $user['cognome']
            ],
            [
                "subject" => "Ecco il tuo codice OTP",
                "body" => str_replace("650050", $otp_code, file_get_contents(dirname(__DIR__)  . '/otpTemplate.html')),
                "altBody" => "Ecco il codice OTP per verificare la tua identità: {$otp_code}"
            ]);
        } catch (Exception $e) {

            return array (
                'statusCode' => 500,
                'body' => array (
                    'message' => "Impossibile inviare l'email: {$this->mail->ErrorInfo}"
                )
            );
        }

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

        $result = $this->gateway->findLatest($request);

        if ($result['statusCode'] != 200) {
            return $result;
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
        $auth_info = $auth_info['data'];

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

        $result = $this->gateway->find(["id" => $request['otp_challenge_id']]);

        $result = $result['body']['content'];

        if (empty($result)) {
            return [
                'statusCode' => 404,
                'body' => [
                    'message' => "Challenge non trovata"
                ]
            ];
        }

        $otp_challenge = $result[0];

        if ($otp_challenge['stato'] == "void") {
            return [
                'statusCode' => 400,
                'body' => [
                    'message' => "Challenge invalida"
                ]
            ];
        }

        if ($otp_challenge['id_cliente'] != $auth_info['user_id']) {
            $result = $this->gateway->update([
                'id' => $request['otp_challenge_id'],
                'stato' => 6
            ]);

            if ($result['statusCode'] != 200) {
                return $result;
            }

            return [
                'statusCode' => 403,
                'body' => [
                    'message' => "Non hai il permesso di risolvere questa challenge"
                ]
            ];
        }

        if ($otp_challenge['stato'] == "failed") {
            return [
                'statusCode' => 400,
                'body' => [
                    'message' => "Challenge già utilizzata: Esito negativo"
                ]
            ];
        }

        if ($otp_challenge['stato'] == "successful") {
            return [
                'statusCode' => 400,
                'body' => [
                    'message' => "Challenge già utilizzata: Esito positivo"
                ]
            ];
        }

        if ($otp_challenge['stato'] == "expired") {
            return [
                'statusCode' => 400,
                'body' => [
                    'message' => "Challenge scaduta"
                ]
            ];
        }

        if (time() >= strtotime($otp_challenge['data_scadenza'])) {

            $result = $this->gateway->update([
                'id' => $request['otp_challenge_id'],
                'stato' => 4
            ]);

            if ($result['statusCode'] != 200) {
               return $result;
            }

            return [
                'statusCode' => 400,
                'body' => [
                    'message' => "Challenge scaduta"
                ]
            ];
        }

        if ($otp_challenge['stato'] == "used") {
            return [
                'statusCode' => 400,
                'body' => [
                    'message' => "Challenge già utilizzata: Transazione già eseguita"
                ]
            ];
        }

        if (!password_verify($request['otp_code'], $otp_challenge['codice'])) {


            $result = $this->gateway->update([
                'id' => $request['otp_challenge_id'],
                'stato' => 2
            ]);

            if ($result['statusCode'] != 200) {
                return $result;
            }

            return [
                'statusCode' => 403,
                'body' => [
                    'message' => "Codice OTP Errato"
                ]
            ];
        } else {
            $result = $this->gateway->update([
                'id' => $request['otp_challenge_id'],
                'stato' => 3
            ]);

            if ($result['statusCode'] != 200) {
                return $result;
            }

            return [
                'statusCode' => 200,
                'body' => [
                    'message' => "Challenge risolta"
                ]
            ];
        }

        return [
            'statusCode' => 500,
            'body' => [
                'message' => "Internal Server Error"
            ]
        ];
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