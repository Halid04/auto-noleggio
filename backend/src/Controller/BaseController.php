<?php
namespace Src\Controller;

use \Src\Gateway\BaseGateway;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;


class BaseController {
    private $requestMethod;
    private $data;
    private BaseGateway $gateway;
    private $dotenv;
    public function __call($name, $arguments)
    {
        $this->sendOutput(statusCode: 404);
    }

    public function __construct($requestMethod, $data, $gateway)
    {
        $this->requestMethod = $requestMethod;
        $this->data = $data;
        $this->gateway = $gateway; 
        $this->dotenv = \Dotenv\Dotenv::createImmutable("../");
        $this->dotenv->load();
    
    }

    public function processRequest()
    {
        $response = [];
        try {
            if (!isset($this->data['auth']['jwt'])) {
                $response = array (
                    'statusCode' => 401,
                    'body' => array (
                        'message' => "Missing JWT."
                    )
                );
            } else {
                //$this->authenticateJWTToken($this->data['auth']['jwt']);
                switch ($this->requestMethod) {
                    case 'GET':
                        if (!isset($this->data['id'])) {
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
                        $this->sendOutput(statusCode: 404);
                        return;
                }
            }
            
        } catch (Exception $e) {
            $response = array (
                'statusCode' => 401,
                'body' => array (
                    'message' => $e->getMessage()
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

    public function authenticateJWTToken($jwt_token)
        {
            return JWT::decode($jwt_token, new Key($_ENV["SECRET_KEY"], 'HS256'));
        }
}