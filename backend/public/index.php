<?php
    require "../src/bootstrap.php";
    require "../src/request.php";

    use \Firebase\JWT\JWT;

    use Src\Controller\ClientController;
    use Src\Controller\VehicleController;
    use Src\Controller\ImageController;
    use Src\Controller\HeadQuarterController;
    use Src\Gateway\ClientGateway;
    
    
    header("Content-Type: application/json; charset=UTF-8");
    //header("Access-Control-Max-Age: 3600");

    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $uri = array_slice(explode( '/', $uri ), 4);
    
    if ($uri[0] == "register" || $uri[0] == "login") {
        switch ($uri[0]) {
            case "register":
                registerUser($data, $database);
                break;
            case "login":
                authenticateUser($data, $database);
                break;
        }
    } else {
        $data['auth']['jwt'] = getBearerToken();

        switch ($uri[0]) {

            case "clienti":
                $controller = new ClientController($requestMethod, $data, $database);
                $controller->processRequest();
                break;
            case "veicoli":
                $controller = new VehicleController($requestMethod, array_slice($uri, 0), $data, $database);
                $controller->processRequest();
                break;
            case "immagini":
                $controller = new ImageController($requestMethod, $data, $database);
                $controller->processRequest();
            case "sedi":
                $controller = new HeadQuarterController($requestMethod, $data, $database);
                $controller->processRequest();
                break;
            default:
                http_response_code(404);
                echo json_encode( array (
                        "message" => "Not found"
                    )
                );
                break;
        }
    }

    exit();

    function registerUser ($data, $database) {
        $required_parameters = [
            "nome", 
            "cognome", 
            "email", 
            "password", 
            "telefono", 
            "data_di_nascita"
        ];
    
        $request_keys = array_keys($data);
    
        $missing_keys = array_diff($required_parameters, $request_keys);
    
        if (count($missing_keys) !== 0) {
            http_response_code(400);
            echo json_encode(["message" => "Missing credentials: " . implode(",", $missing_keys)]);
            return;
        }
    
        $conn = $database->getConnection();

        $user_gateway = new ClientGateway($database);
    
        $result = $user_gateway->insert($data);

        if ($result['statusCode'] != 201) {
            header('Content-Type: application/json');
            http_response_code($result['statusCode']);
            echo json_encode($result['body']);
            return;
        }

        $result = $user_gateway->findByEmail($data);

        if ($result['statusCode'] != 200) {
            header('Content-Type: application/json');
            http_response_code($result['statusCode']);
            echo json_encode($result['body']);
            return;
        }

        $user = $result['body']['content'][0];
        
        $issuedat_claim = time(); 
        $notbefore_claim = $issuedat_claim; 
        $expire_claim = $issuedat_claim + 60 * 60;
    
        $payload = array (
            "iat" => $issuedat_claim,
            "nbf" => $notbefore_claim,
            "exp" => $expire_claim,
            "data" => array (
                "user_id" => $user["id_cliente"],
                "email" => $user["email"],
                "admin" => $user["admin"]
                )
            );

        header('Content-Type: application/json');
        http_response_code(201);
    
        $token = JWT::encode($payload, $_ENV["SECRET_KEY"], 'HS256');
    
        echo json_encode(
            array (
                "auth" => array (
                    "jwt" => $token,
                    "expireAt" => $expire_claim
                ),
                "message" => "Account registered succesfully.",
                
            )
        );
        return;
    }

    function authenticateUser ($data, $database) {
        $required_parameters = [
            "email", 
            "password"
        ];
    
        $request_keys = array_keys($data);
    
        $missing_keys = array_diff($required_parameters, $request_keys);
    
        if (count($missing_keys) !== 0) {
            http_response_code(400);
            echo json_encode(["message" => "Missing parameters: " . implode(",", $missing_keys)]);
            return;
        }
    
        $user_gateway = new ClientGateway($database);
    
        $result = $user_gateway->findByEmail($data);

        if ($result['statusCode'] != 200) {
            header('Content-Type: application/json');
            http_response_code($result['statusCode']);
            echo json_encode($result['body']);
            return;
        }

        $user = $result['body']['content'];
        
    
        if (empty($user)) {
            http_response_code(401);
            echo json_encode(["message" => "User account does not exist."]);
            return;
        }

        $user = $user[0];
    
        if (!password_verify($data['password'], $user['password'])) {
            http_response_code(401);
            echo json_encode(["message" => "Password is incorrect."]);
            return;
        }
    
        $issuedat_claim = time(); 
        $notbefore_claim = $issuedat_claim; 
        $expire_claim = $issuedat_claim + 60 * 60; 
    
        $payload = array (
            "iat" => $issuedat_claim,
            "nbf" => $notbefore_claim,
            "exp" => $expire_claim,
            "data" => array (
                "user_id" => $user["id_cliente"],
                "email" => $user["email"],
                "admin" => $user["admin"]
                    )
            );
    
        http_response_code(200);
    
        $token = JWT::encode($payload, $_ENV["SECRET_KEY"], 'HS256');
    
        echo json_encode(
            array (
                "auth" => array (
                    "jwt" => $token,
                    "expireAt" => $expire_claim
                ),
                "message" => "Successful login."
            )
        );
        return;
    }

    function getAuthorizationHeader(){
        $headers = null;
        if (isset($_SERVER['Authorization'])) {
            $headers = trim($_SERVER["Authorization"]);
        }
        else if (isset($_SERVER['HTTP_AUTHORIZATION'])) { //Nginx or fast CGI
            $headers = trim($_SERVER["HTTP_AUTHORIZATION"]);
        } elseif (function_exists('apache_request_headers')) {
            $requestHeaders = apache_request_headers();
            // Server-side fix for bug in old Android versions (a nice side-effect of this fix means we don't care about capitalization for Authorization)
            $requestHeaders = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));
            //print_r($requestHeaders);
            if (isset($requestHeaders['Authorization'])) {
                $headers = trim($requestHeaders['Authorization']);
            }
        }
        return $headers;
    }
    /**
     * get access token from header
     * */
    function getBearerToken() {
        $headers = getAuthorizationHeader();
        // HEADER: Get the access token from the header
        if (!empty($headers)) {
            if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
                return $matches[1];
            }
        }
        return "";
    }