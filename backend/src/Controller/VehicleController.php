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
                                default:
                                    $this->sendOutput(array('Content-Type: application/json'), statusCode: 404);
                                    break;
                                    return;
                            }
                        } else {
                            if (!isset($this->data['id'])) {
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
                        $this->sendOutput(array('Content-Type: application/json'), statusCode: 404);
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

}