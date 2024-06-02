<?php
namespace Src\Controller;

use \Src\Gateway\TransactionGateway;
use \Src\Gateway\OTPGateway;
use \Src\Controller\BaseController;

class TransactionController extends BaseController {

    private $otpGateway;
    private $uri;

    public function __construct($requestMethod, $uri, $data, $db)
    {
        $this->otpGateway = new OTPGateway ($db);
        $this->uri = $uri;
        parent::__construct($requestMethod, $data, new TransactionGateway($db));
    }

    public function processRequest()
    {
        
        try {

            $auth = $this->authenticateRequest($this->data);
            
            if (!$auth['status']) {
                $response = $auth['obj'];
            } else {

                $this->data['user_id'] = $auth['obj']['data']['user_id'];
                
                switch ($this->requestMethod) {
                    case 'GET':
                        echo var_dump($this->requestMethod);
                        if (isset($this->uri[1])) {
                            switch ($this->uri[1]){
                                case "noleggiPassati":
                                    $response = $this->gateway->findPastRentals($this->data);
                                    break;
                                case "noleggiFuturi":
                                    $response = $this->gateway->findUpcomingRentals($this->data);
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
                        $response = $this->insert($this->data, $auth['obj']);
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

    function insert($request, $auth_info)
    {
        $required_parameters = ["otp_challenge_id"];

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
        
        $auth_info = $auth_info['data'];

        $request['id_cliente'] = $auth_info['user_id'];

        $otp_result = $this->otpGateway->find(["id" => $request['otp_challenge_id']]);

        $otp_result = $otp_result['body']['content'];

        if (empty($otp_result)) {
            return [
                'statusCode' => 404,
                'body' => [
                    'message' => "Challenge non trovata"
                ]
            ];
        }

        $otp_challenge = $otp_result[0];

        if ($otp_challenge['stato'] == "void") {
            return [
                'statusCode' => 400,
                'body' => [
                    'message' => "Challenge invalida"
                ]
            ];
        }

        if ($otp_challenge['id_cliente'] != $auth_info['user_id']) {

            $result = $this->otpGateway->update([
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

        if (time() >= strtotime($otp_challenge['data_scadenza'])) {

            $result = $this->otpGateway->update([
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

        if ($otp_challenge['stato'] == "failed") {
            return [
                'statusCode' => 400,
                'body' => [
                    'message' => "Challenge già utilizzata: Esito negativo"
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

        if ($otp_challenge['stato'] == "used") {
            return [
                'statusCode' => 400,
                'body' => [
                    'message' => "Challenge già utilizzata: Transazione già eseguita"
                ]
            ];
        }

        if ($otp_challenge['stato'] == "successful") {
            $result = $this->gateway->insert($request);

            if ($result['statusCode'] != 200) {
               return $result;
            }

            $result = $this->otpGateway->update([
                'id' => $request['otp_challenge_id'],
                'stato' => 5
            ]);

            if ($result['statusCode'] != 200) {
                return $result;
             }

            return [
                'statusCode' => 200,
                'body' => [
                    'message' => "Transazione eseguita"
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

    public function authenticateRequest (&$request) {
        $response_obj = [];
        $response_obj['status'] = false;
        
        $auth_info = $this->authenticateToken($request);

        if (!$auth_info['status']) {
            $response_obj['obj'] = $auth_info['obj'];
            return $response_obj;
        }

        $auth_info = $auth_info['obj'];

        /*

        $transaction = $this->gateway->find($request);

        if ($transaction['statusCode'] != 200) {
            $response_obj['obj'] = $transaction;

            return $response_obj;
        }

        $transaction = $transaction['body']['content'];

        if (empty($transaction)) {
            $response_obj['obj'] = [
                'statusCode' => 404,
                'body' => [
                    'message' => "Transazione non trovata"
                ]
            ];
            return $response_obj;
        }

        */

        $transaction = $transaction[0];

        if ($transaction['id_cliente'] != $auth_inf['data']['user_id'] && $auth_info['data']['admin'] == 0) {
            $response_obj['obj'] =  array (
                'statusCode' => 403,
                'body' => array (
                    'message' => "Accesso negato: Non hai i permessi per accedere a questa risorsa"
                )
            );

            return $response_obj;
        }

        $response_obj['status'] = true;
        $response_obj['obj'] = $auth_info;

        return $response_obj;
    }

}