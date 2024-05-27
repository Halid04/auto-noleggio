<?php
    $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
    /*
    if ($contentType !== 'application/json') {
        http_response_code(415);
        echo json_encode(["message" => "Only JSON content is supported"]);
        exit();
    }
    */
    
    
    

    // Allow from any origin
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
        exit(0);
    }

    $requestMethod = $_SERVER['REQUEST_METHOD'];

    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');

    if ($requestMethod == "GET") {
        $data = json_decode($_GET['json'] ?? "", true);
    } else {
        $data = json_decode(file_get_contents('php://input'), true);
    }

    if ($data !== null && !is_array($data)) {
        http_response_code(400);
        
        echo json_encode(["message" => "Invalid JSON data"]);
        exit();
    }

    
    
    /*
    // Access-Control headers are received during OPTIONS requests
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            // may also be using PUT, PATCH, HEAD etc
            header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
       
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    */
    
?>