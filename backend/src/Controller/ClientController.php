<?php
namespace Src\Controller;

use \Src\Gateway\ClientGateway;
use \Src\Controller\BaseController;

class ClientController extends BaseController {

    public function __construct($requestMethod, $data, $db)
    {
        parent::__construct($requestMethod, $data, new ClientGateway($db));
    }

    public function authenticateRequest ($request) {
        $response_obj = [];
        $response_obj['status'] = false;
        
        $auth_info = $this->authenticateToken($request);

        

        if (!$auth_info['status']) {
            $response_obj['obj'] = $auth_info['obj'];
            return $response_obj;
        }

        $auth_info = $auth_info['obj'];

        if ($auth_info['data']['user_id'] != ($request['id'] ?? -1) && $auth_info['data']['admin'] == 0) {

            $response_obj['obj'] =  array (
                'statusCode' => 401,
                'body' => array (
                    'message' => "You do not have permission to access this resource"
                )
            );

            return $response_obj;
        }

        $response_obj['status'] = true;

        return $response_obj;
    }

}