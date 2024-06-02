<?php
namespace Src\Controller;

use \Src\Gateway\GPSGateway;
use \Src\Controller\BaseController;

class GPSController extends BaseController {

    public function __construct($requestMethod, $data, $db)
    {
        parent::__construct($requestMethod, $data, new GPSGateway($db));
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
                        if ($this->data['all'] ?? false || (!isset($this->data['id']))) {
                            $response = $this->gateway->findAll($this->data);
                        } else {
                            $response = $this->gateway->find($this->data);
                        };
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


        if ((int) $auth_info['data']['admin'] == 0) {
            $response_obj['obj'] =  array (
                'statusCode' => 403,
                'body' => array (
                    'message' => "Accesso negato: Non hai i permessi per accedere a questa risorsa"
                )
            );

            return $response_obj;
        }
        

        return $response_obj;
    }

}