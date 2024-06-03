<?php
namespace Src\Controller;

use \Src\Gateway\VehicleGateway;
use \Src\Controller\BaseController;

class VehicleController extends BaseController {

    private $uri;

    public function __construct($requestMethod, $uri, $data, $db)
    {
        $this->uri = $uri;
        parent::__construct($requestMethod, $data, new VehicleGateway($db));
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
                                case "filtra":
                                    $response = $this->gateway->filter($this->data);
                                    break;
                                case "marche":
                                    $response = $this->gateway->getMakes($this->data);
                                    break;
                                case "anni":
                                    $response = $this->gateway->getYears($this->data);
                                    break;
                                case "date":
                                    $response = $this->gateway->getOccupiedSlots($this->data);
                                    break;
                                case "tipi":
                                    $response = $this->gateway->getTypes($this->data);
                                    break;
                                case "carburazioni":
                                    $response = $this->gateway->getFuelTypes($this->data);
                                    break;
                                case "noleggiati":
                                    $response = $this->gateway->findRented($this->data);
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

    public function authenticateRequest (&$request)
    {
        $response_obj = [];
        $response_obj['status'] = false;

        $auth_info;
        $user_id;

        if ($this->requestMethod == "GET") {
            
            if ($this->data['auth']['jwt'] != "" ) {
                $auth_info = $this->authenticateToken($request);
    
                if ($auth_info['status']) {
                    $user_id = $auth_info['obj']['data']['user_id'];
                } else {
                    if ($this->uri[1] = "noleggiati") {
                        $response_obj['obj'] = $auth_info['obj'];
                        return $response_obj;
                    }
                }
            }

        } else {
            $auth_info = $this->authenticateToken($request);

            if (!$auth_info['status']) {
                $response_obj['obj'] = $auth_info['obj'];
                return $response_obj;
            }

            $auth_info = $auth_info['obj'];

            $user_id = $auth_info['data']['user_id'];

            if ((int) $auth_info['data']['admin'] != 1 && $this->requestMethod != "GET") {
                $response_obj['obj'] =  array (
                    'statusCode' => 403,
                    'body' => array (
                        'message' => "Accesso negato: Non hai i permessi per modificare questa risorsa"
                    )
                );

                return $response_obj;
            }

            $response_obj['status'] = true;
            $response_obj['obj'] = $auth_info;

        }

        if (isset($user_id)) {
            $request['user_id'] = $user_id;
         }

        $response_obj['status'] = true;
        
        return $response_obj;
    }



}