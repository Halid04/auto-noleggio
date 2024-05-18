<?php
    require "../src/bootstrap.php";
    require "../src/request.php";
    use Src\Controller\ClientController;

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
    header("Access-Control-Max-Age: 3600");
    //header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $uri = array_slice(explode( '/', $uri ), 4);
    $requestMethod = $_SERVER['REQUEST_METHOD'];
    switch ($uri[0]) {
        case "cliente":
            $controller = new ClientController($requestMethod, $data, $database);
            $controller->processRequest();
            break;
        case "persona":
            echo json_encode( array (
                "message" => "Asked for persona"
            ));
            break;
        default:
            http_response_code(404);
            echo json_encode( array (
                    "message" => "Not found"
                )
            );
            break;
    }
    exit;

    

    if (preg_match('#^/cliente$#', $requestUri)) {
        $controller = new \App\Controller\ClientController();
        if ($requestMethod === 'POST') {
            $controller->createClient();
        } else if ($requestMethod === 'GET') {
            $controller->getClients();
        }
        // Aggiungi altri metodi HTTP come PUT, DELETE, ecc.
    } else {
        http_response_code(404);
        echo json_encode(['message' => 'Not Found']);
    }
    


    // all of our endpoints start with /person
    // everything else results in a 404 Not Found
    if ($uri[1] !== 'person') {
        header("HTTP/1.1 404 Not Found");
        exit();
    }

    // the user id is, of course, optional and must be a number:
    $userId = null;
    if (isset($uri[2])) {
        $userId = (int) $uri[2];
    }

    $requestMethod = $_SERVER["REQUEST_METHOD"];

    // pass the request method and user ID to the PersonController and process the HTTP request:
    $controller = new PersonController($dbConnection, $requestMethod, $userId);
    $controller->processRequest();