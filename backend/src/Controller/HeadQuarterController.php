<?php
namespace Src\Controller;

use \Src\Gateway\HeadQuarterGateway;
use \Src\Controller\BaseController;

class HeadQuarterController extends BaseController {

    public function __construct($requestMethod, $data, $db)
    {
        parent::__construct($requestMethod, $data, new HeadQuarterGateway($db));
    }

}