<?php
    require "../src/bootstrap.php";
    require "../src/request.php";

    use \Firebase\JWT\JWT;

    use Src\Controller\ClientController;
    use Src\Controller\VehicleController;
    use Src\Gateway\ClientGateway;

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    header("Access-Control-Max-Age: 3600");
    //header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $uri = array_slice(explode( '/', $uri ), 4);
    $requestMethod = $_SERVER['REQUEST_METHOD'];

    switch ($uri[0]) {
        case "register":
            registerUser($data, $database);
            break;
        case "login":
            authenticateUser($data, $database);
            break;
        case "clienti":
            $controller = new ClientController($requestMethod, $data, $database);
            $controller->processRequest();
            break;
        case "veicoli":
            $controller = new VehicleController($requestMethod, array_slice($uri, 0), $data, $database);
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
        /*
        $existing_users_sql = "
                            SELECT COUNT(*) as count 
                            FROM Cliente 
                            WHERE email = :email";

        try {
            $existing_users_stmt = $conn->prepare($existing_users_sql);
            $existing_users_stmt->bindValue(":email", $data["email"]);
            $existing_users_stmt->execute();
        } catch (PDOException $e) {
            header('Content-Type: application/json');
            http_response_code(500);
            echo json_encode (
                array (
                    "message" => $e->getMessage()
                )
            );
            return;
        }
    
        $existing_users_count = $existing_users_stmt->fetch(PDO::FETCH_ASSOC)["count"];
    
        if ($existing_users_count > 0) {
            http_response_code(400);
            echo json_encode (
                array (
                    "message" => "E-mail has already been registered."
                )
            );
            return;
        }
        */

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
                "admin" => $user["amministratore"]
                )
            );

        header('Content-Type: application/json');
        http_response_code(200);
    
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
                "admin" => $user["amministratore"]
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