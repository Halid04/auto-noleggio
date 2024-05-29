<?php
namespace Src\Controller;

use \Src\Gateway\OTPGateway;
use \Src\Controller\BaseController;

class OTPController extends BaseController {

    public function __construct($requestMethod, $data, $db)
    {
        parent::__construct($requestMethod, $data, new OTPGateway($db));
    }

}