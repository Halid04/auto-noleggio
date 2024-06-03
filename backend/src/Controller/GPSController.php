<?php
namespace Src\Controller;

use \Src\Gateway\GPSGateway;
use \Src\Controller\BaseController;

class GPSController extends BaseController {

    private $uri;

    public function __construct($requestMethod, $uri, $data, $db)
    {
        $this->uri = $uri;
        parent::__construct($requestMethod, $data, new GPSGateway($db));
    }

    public function processRequest()
    {

        try {

            $auth = $this->authenticateRequest($this->data);

            if (!$auth['status']) {
                $response = $auth['obj'];
            } else {
                switch ($this->requestMethod) {
                    case 'GET':

                        if (isset($this->uri[1])) {
                            switch ($this->uri[1]){
                                case "dispositivi":
                                    $response = $this->gateway->findDevices($this->data);
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
                        $response = $this->gateway->insert($this->data);
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

    public function authenticateRequest (&$request)
    {
        $response_obj = [];
        $response_obj['status'] = false;

        echo var_dump($uri);

        $auth_info = $this->authenticateToken($request);
            
        if (!$auth_info['status']) {
            $response_obj['obj'] = $auth_info['obj'];
            return $response_obj;
        }

        $auth_info = $auth_info['obj'];


        if ((int) $auth_info['data']['admin'] == 0) {
            $response_obj['obj'] =  array (
                'statusCode' => 403,
                'body' => array (
                    'message' => "Accesso negato: Non hai i permessi per accedere a questa risorsa"
                )
            );

            return $response_obj;
        }
        

        $response_obj['obj'] = $auth_info;
        $response_obj['status'] = true;

        return $response_obj;
    }

}