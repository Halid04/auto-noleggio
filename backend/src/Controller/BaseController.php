<?php
namespace Src\Controller;

use \Firebase\JWT\JWT;

class BaseController {

    private $db;
    private $requestMethod;
    private $id;
    private $data;

    public function __call($name, $arguments)
    {
        $this->sendOutput(statusCode: 404);
    }


    public function __construct($db, $requestMethod, $data, $id)
    {
        $this->db = $db;
        $this->requestMethod = $requestMethod;
        $this->id = $id;
        $this->data = $data;
    }

    public function processRequest()
    {
        switch ($this->requestMethod) {
            case 'GET':
                if ($this->id) {
                    $response = $this->get($this->data, $this->id);
                } else {
                    $response = $this->getAll($this->data);
                };
                break;
            case 'POST':
                $response = $this->create($this->data);
                break;
            case 'PUT':
                $response = $this->update($this->data, $this->id);
                break;
            case 'DELETE':
                $response = $this->delete($this->data, $this->id);
                break;
            default:
                $this->sendOutput(statusCode: 404);
                break;
        }
        $this->sendOutput($response['body'], array('Content-Type: application/json'), $response['statusCode']);
    }

    private function get($data, $id)
    {
        
    }

    private function create($data)
    {
        
    }

    private function update($data, $id)
    {
        
    }

    private function delete($data, $id)
    {
        
    }

    protected function sendOutput($data=[], $httpHeaders, $statusCode=200)
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
            return JWT::decode($jwt_token, $secret_key, array('HS256'));
        }
}