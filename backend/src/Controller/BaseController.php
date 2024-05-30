<?php
namespace Src\Controller;

use \Src\Gateway\BaseGateway;
use \Src\Gateway\ClientGateway;
use \Src\Database;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;


class BaseController {
    public $requestMethod;
    public $data;
    public BaseGateway $gateway;
    public ClientGateway $userGateway;
    private $dotenv;
    public function __call($name, $arguments)
    {
        $this->sendOutput(array('Content-Type: application/json'), statusCode: 404);
    }

    public function __construct($requestMethod, $data, $gateway)
    {
        $this->requestMethod = $requestMethod;
        $this->data = $data;
        $this->gateway = $gateway; 
        
        $this->dotenv = \Dotenv\Dotenv::createImmutable("../");
        $this->dotenv->load();

        $this->userGateway = new ClientGateway(new Database(
            $_ENV["DB_HOST"],
            $_ENV["DB_NAME"],
            $_ENV["DB_USER"],
            $_ENV["DB_PASS"]
        ));
    
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
                        if ($this->data['all'] ?? false || (!isset($this->data['id']))) {
                            $response = $this->gateway->findAll($this->data);
                        } else {
                            $response = $this->gateway->find($this->data);
                        };
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
                'statusCode' => 403,
                'body' => array (
                    'message' => "Access forbidden: " . $e->getMessage()
                )
            );
        }
        $this->sendOutput(array('Content-Type: application/json'), $response['body'], $response['statusCode']);

    }

    protected function sendOutput($httpHeaders, $data=[], $statusCode=200)
    {

        http_response_code($statusCode);

        if (is_array($httpHeaders) && count($httpHeaders)) {
            foreach ($httpHeaders as $httpHeader) {
                header($httpHeader);
            }
        }
        
        echo json_encode($data);
        exit();
    }

    

    public function authenticateToken ($input)
    {
        $response_obj = [];
        $response_obj['status'] = false;

        if (!isset($input['auth']['jwt'])) {
            
            $response_obj['obj'] = array (
                'statusCode' => 401,
                'body' => array (
                    'message' => "Unauthenticated: Missing JWT."
                )
            );

            return $response_obj;
        } 

        $auth_info = (array) JWT::decode($input['auth']['jwt'], new Key($_ENV["SECRET_KEY"], 'HS256'));
        $auth_info['data'] = (array)$auth_info['data'];
        
        $response_obj['status'] = true;
        $response_obj['obj'] = $auth_info;
        
        return $response_obj;
    }

    public function authenticateRequest (&$request)
    {
        $response_obj = [];
        $response_obj['status'] = false;

        $auth_info;
        $user_id;

        if ($this->requestMethod != "GET") {
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
                        'message' => "Access forbidden: You do not have permission to edit this resource"
                    )
                );

                return $response_obj;
            }

            $response_obj['status'] = true;
            $response_obj['obj'] = $auth_info;
        } else {

            if ($this->data['auth']['jwt'] != "" ) {
                $auth_info = $this->authenticateToken($request);

                if ($auth_info['status']) {
                $user_id = $auth_info['obj']['data']['user_id'];
                }
            }

            
        }

        if (isset($user_id)) {
            $request['user_id'] = $user_id;
         }

        $response_obj['status'] = true;
        

        return $response_obj;
    }
}