<?php
    $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
    
    if ($contentType !== 'application/json') {
        http_response_code(415);
        echo json_encode(["message" => "Only JSON content is supported"]);
        exit();
    }
    
    
    $requestMethod = $_SERVER['REQUEST_METHOD'];
    
    if ($requestMethod == "GET") {
        $data = json_decode($_GET['json'], true);
    } else {
        $data = json_decode(file_get_contents('php://input'), true);
    }

    if ($data === null) {
        http_response_code(400);
        echo $data;
        echo json_encode(["message" => "Invalid JSON data"]);
        exit();
    }
    
?>