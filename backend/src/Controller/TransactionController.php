<?php
namespace Src\Controller;

use \Src\Gateway\TransactionGateway;
use \Src\Gateway\OTPGateway;
use \Src\Gateway\ClientGateway;
use \Src\Controller\BaseController;

use \Src\Mail;

class TransactionController extends BaseController {

    private $otpGateway;
    private $clientGateway;
    private $uri;
    private $mail;

    public function __construct($requestMethod, $uri, $data, $db)
    {
        $this->otpGateway = new OTPGateway ($db);
        $this->clientGateway = new ClientGateway ($db);
        $this->uri = $uri;

        $this->transactionGateway = new TransactionGateway($db);
        
        $this->mail = new Mail (
            $_ENV['SMTP_HOST'],
            $_ENV['SMTP_USERNAME'],
            $_ENV['SMTP_PASSWORD'],
        ); 

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
                        if (isset($this->uri[1])) {
                            switch ($this->uri[1]){
                                case "noleggiPassati":
                                    $response = $this->gateway->findPastRentals($this->data);
                                    break;
                                case "noleggiFuturi":
                                    $response = $this->gateway->findUpcomingRentals($this->data);
                                    break;
                                default:
                                    $this->sendOutput(array('Content-Type: application/json'), statusCode: 404, data: ["message" => "Risorsa non trovata"]);
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
                        $this->sendOutput(array('Content-Type: application/json'), statusCode: 404, data: ["message" => "Risorsa non trovata"]);
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
                    'message' => "Parametri mancanti: " . implode(",", $missing_keys)
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

        

        if ($otp_challenge['stato'] == "successful" || true) {
            $result = $this->gateway->insert($request);

            if ($result['statusCode'] != 201) {
               return $result;
            }

            $result = $this->otpGateway->update([
                'id' => $request['otp_challenge_id'],
                'stato' => 5
            ]);

            if ($result['statusCode'] != 200) {
                return $result;
            }

            $transaction = $this->gateway->findLatest(["user_id" => $auth_info["user_id"]]);

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

            if (!$user['statusCode'] = 200) {
                return $transaction;
            }

            

            $transaction = $transaction['body']['content'][0];

            try {

                $search = [
                    "{transaction_id}", 
                    "{confirmation_date}",
                    "{car_model}",
                    "{rent_duration}",
                    "{headquarter_location}",
                    "{day_rate}",
                    "{total_duration}",
                    "{taxes}",
                    "{grand_total}",
                    "{subtotal}"  
                ];

                $timestamp_prima_data = strtotime($transaction['data_inizio']);
                $timestamp_seconda_data = strtotime($transaction['data_fine']);

                $differenza_in_secondi = $timestamp_seconda_data - $timestamp_prima_data;

                $differenza_in_giorni = $differenza_in_secondi / 86400; 

                $differenza_in_giorni = bcdiv($differenza_in_giorni, 1, 2);

                $replace = [
                    $transaction['id_transazionefinanziaria'],
                    date('d F Y', time()),
                    $transaction['marca'] . " " . $transaction["modello"],
                    date('d F', strtotime($transaction['data_inizio'])) . " - " . date('d F, Y', strtotime($transaction['data_fine'])),
                    $transaction['indirizzo'] . ", " . $transaction['città'] . ", " . $transaction['cap'],
                    $transaction['costo_giornaliero'],
                    $differenza_in_giorni,
                    bcdiv($transaction['importo'] * 0.19, 1, 2),
                    bcdiv($transaction['importo'] * 1.19, 1, 2),
                    bcdiv($transaction['importo'], 1, 2),
                ];
            

                

                $this->mail->sendMail(
                [
                    "address" => $user['email'],
                    "name" => $user['nome'] . " " . $user['cognome']
                ],
                [
                    "subject" => "Congratulazioni",
                    "body" => str_replace($search, $replace, file_get_contents(dirname(__DIR__)  . '/confirmationTemplate.html')),
                    "altBody" => "Later"
                ]);
                
            } catch (Exception $e) {

                return array (
                    'statusCode' => 500,
                    'body' => array (
                        'message' => "Impossibile inviare l'email: {$this->mail->ErrorInfo}"
                    )
                );
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

        
        if (isset($request['id'])) {
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

            $transaction = $transaction[0];

            

            

            if ($transaction['id_cliente'] != $auth_info['data']['user_id'] && $auth_info['data']['admin'] == 0) {
                $response_obj['obj'] =  array (
                    'statusCode' => 403,
                    'body' => array (
                        'message' => "Accesso negato: Non hai i permessi per accedere a questa risorsa"
                    )
                );

                return $response_obj;
            }
        }
        

        $response_obj['status'] = true;
        $response_obj['obj'] = $auth_info;

        return $response_obj;
    }

}