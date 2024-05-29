<?php
namespace Src\Controller;

use \Src\Gateway\TransactionGateway;
use \Src\Controller\BaseController;

class TransactionController extends BaseController {

    public function __construct($requestMethod, $data, $db)
    {
        parent::__construct($requestMethod, $data, new TransactionGateway($db));
    }

}