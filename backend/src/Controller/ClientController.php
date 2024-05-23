<?php
namespace Src\Controller;

use \Src\Gateway\ClientGateway;
use \Src\Controller\BaseController;

class ClientController extends BaseController {

    public function __construct($requestMethod, $data, $db)
    {
        parent::__construct($requestMethod, $data, new ClientGateway($db));
    }

}