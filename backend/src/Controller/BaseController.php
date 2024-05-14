<?php
namespace Src\Controller;

class BaseController {

    private $db;
    private $requestMethod;
    private $id;

    public function __call($name, $arguments)
    {
        $this->sendOutput('', array('HTTP/1.1 404 Not Found'));
    }


    public function __construct($db, $requestMethod, $id)
    {
        $this->db = $db;
        $this->requestMethod = $requestMethod;
        $this->id = $id;
    }

    public function processRequest()
    {
        switch ($this->requestMethod) {
            case 'GET':
                if ($this->id) {
                    $response = $this->get($this->id);
                } else {
                    $response = $this->getAll();
                };
                break;
            case 'POST':
                $response = $this->create();
                break;
            case 'PUT':
                $response = $this->update($this->id);
                break;
            case 'DELETE':
                $response = $this->delete($this->id);
                break;
            default:
                $this->sendOutput('', array(), 404);
                break;
        }
        $this->sendOutput($response['body'], array('Content-Type: application/json'), $response['statusCode']);
    }

    private function getAll()
    {
        
    }

    private function get($id)
    {
        
    }

    private function create()
    {
        
    }

    private function update($id)
    {
        
    }

    private function delete($id)
    {
        
    }

    protected function sendOutput($data, $httpHeaders=array(), $statusCode)
    {

        if(isset($statusCode)) {
            http_response_code($statusCode);
        }

        if (is_array($httpHeaders) && count($httpHeaders)) {

            foreach ($httpHeaders as $httpHeader) {

                header($httpHeader);

            }

        }

        echo json_encode($data);

        exit;

    }
}