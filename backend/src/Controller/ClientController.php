<?php
namespace Src\Controller;

use \Src\Gateway\ClientGateway;
use \Src\Controller\BaseController;

class ClientController extends BaseController {

    public function __construct($requestMethod, $data, $db)
    {
        parent::__construct($requestMethod, $data, new ClientGateway($db));
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
                    'message' => "Accesso negato: Non hai i permessi per accedere a questa risorsa"
                )
            );
            return $response_obj;
        }

        if ($auth_info['data']['user_id'] != ($request['id'] ?? -1) && $auth_info['data']['admin'] == 0) {

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