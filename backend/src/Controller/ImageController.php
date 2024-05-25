<?php
namespace Src\Controller;

use \Src\Gateway\ImageGateway;
use \Src\Controller\BaseController;

class ImageController extends BaseController {

    public function __construct($requestMethod, $data, $db)
    {
        parent::__construct($requestMethod, $data, new ImageGateway($db));
    }

}