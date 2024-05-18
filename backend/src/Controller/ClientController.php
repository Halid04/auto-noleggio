<?php
namespace Src\Controller;

class ClientController extends BaseController {

    private $clientGateway;

    public function __construct($db, $requestMethod, $id, $data)
    {
        parent::__construct($db, $requestMethod, $id, $data);

        $this->clientGateway = new ClientGateway($db);
    }

    private function getAll($data)
    {
        try {
            if (!isset($data["jwt"])) {
                return array (
                    'statusCode' => 401,
                    'body' => array (
                        'message' => "Missing JWT."
                    )
                );
            }
            $this->authenticateJWTToken($data["jwt"]);
            return $this->clientGateway->findAll($data);
        } catch (Exception $e) {
            return array (
                'statusCode' => 401,
                'body' => array (
                    'message' => $e->getMessage()
                )
            );
        }
    }

    private function get($data, $id)
    {
        try {
            if (!isset($data["jwt"])) {
                return array (
                    'statusCode' => 401,
                    'body' => array (
                        'message' => "Missing JWT."
                    )
                );
            }
            $this->authenticateJWTToken($data["jwt"]);
            return $this->clientGateway->find($id);
        } catch (Exception $e) {
            return array (
                'statusCode' => 401,
                'body' => array (
                    'message' => $e->getMessage()
                )
            );
        }
    }

    private function create($data)
    {
        try {
            if (!isset($data["jwt"])) {
                return array (
                    'statusCode' => 401,
                    'body' => array (
                        'message' => "Missing JWT."
                    )
                );
            }
            $this->authenticateJWTToken($data["jwt"]);
            return $this->clientGateway->insert($data, $id);
        } catch (Exception $e) {
            return array (
                'statusCode' => 401,
                'body' => array (
                    'message' => $e->getMessage()
                )
            );
        }
    }

    private function update($data, $id)
    {
        try {
            if (!isset($data["jwt"])) {
                return array (
                    'statusCode' => 401,
                    'body' => array (
                        'message' => "Missing JWT."
                    )
                );
            }
            $this->authenticateJWTToken($data["jwt"]);
            return $this->clientGateway->findAll();
        } catch (Exception $e) {
            return array (
                'statusCode' => 401,
                'body' => array (
                    'message' => $e->getMessage()
                )
            );
        }
    }

    private function delete($data, $id)
    {
        try {
            if (!isset($data["jwt"])) {
                return array (
                    'statusCode' => 401,
                    'body' => array (
                        'message' => "Missing JWT."
                    )
                );
            }
            $this->authenticateJWTToken($data["jwt"]);
            return $this->clientGateway->findAll();
        } catch (Exception $e) {
            return array (
                'statusCode' => 401,
                'body' => array (
                    'message' => $e->getMessage()
                )
            );
        }
    }

}