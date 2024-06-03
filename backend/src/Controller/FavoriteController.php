<?php
namespace Src\Controller;

use \Src\Gateway\FavoriteGateway;
use \Src\Controller\BaseController;

class FavoriteController extends BaseController {

    public function __construct($requestMethod, $data, $db)
    {
        parent::__construct($requestMethod, $data, new FavoriteGateway($db));
    }

    public function processRequest()
    {
        $response = [];
        try {
            $auth = $this->authenticateRequest($this->data);
            
            if (!$auth['status']) {
                $response = $auth['obj'];
            } else {
                switch ($this->requestMethod) {
                    case 'GET':
                        $response = $this->gateway->find($this->data);
                        break;
                    case 'POST':
                        $response = $this->gateway->insert($this->data);
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
                'statusCode' => 403,
                'body' => array (
                    'message' => "Permesso negato: " . $e->getMessage()
                )
            );
        }
        $this->sendOutput(array('Content-Type: application/json'), $response['body'], $response['statusCode']);

    }

    public function authenticateRequest (&$request)
    {
        $response_obj = [];
        $response_obj['status'] = false;

        $user_id;

        $auth_info = $this->authenticateToken($request);
            
        if (!$auth_info['status']) {
            $response_obj['obj'] = $auth_info['obj'];
            return $response_obj;
        }

        $auth_info = $auth_info['obj'];

        $user_id = $auth_info['data']['user_id'];

        $request['user_id'] = $user_id;

        /*

        if ((int) $auth_info['data']['admin'] != 1 && $this->requestMethod != "GET") {
            $response_obj['obj'] =  array (
                'statusCode' => 403,
                'body' => array (
                    'message' => "Accesso negato: Non hai permesssi necessari per modificare questa risorsa"
                )
            );

            return $response_obj;
        }

        */

        $response_obj['status'] = true;
        $response_obj['obj'] = $auth_info;

        return $response_obj;
    }

}