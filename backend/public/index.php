<?php
    require "../src/bootstrap.php";
    require "../src/request.php";

    use \Firebase\JWT\JWT;
    use Firebase\JWT\Key;

    use Src\Controller\ClientController;
    use Src\Controller\VehicleController;
    use Src\Controller\ImageController;
    use Src\Controller\HeadQuarterController;
    use Src\Controller\TransactionController;
    use Src\Controller\OTPController;
    use Src\Controller\GPSController;
    use Src\Controller\FavoriteController;
    use Src\Gateway\ClientGateway;
    use Src\Gateway\TransactionGateway;
    use Src\Gateway\VehicleGateway;
    use Src\Gateway\OTPGateway;
    use Src\Gateway\GPSGateway;
    
    
    
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
            case "transazioni":
                $controller = new TransactionController($requestMethod, array_slice($uri, 0), $data, $database);
                $controller->processRequest();
                break;
            case "preferiti":
                $controller = new FavoriteController($requestMethod, $data, $database);
                $controller->processRequest();
                break;
            case "otp":
                $controller = new OTPController($requestMethod, array_slice($uri, 0), $data, $database);
                $controller->processRequest();
                break;

            case "gps":
                $controller = new GPSController($requestMethod, array_slice($uri, 0), $data, $database);
                $controller->processRequest();
                break;
            case "admin":
                getAdminData($data, $database);
                break;
            default:
                http_response_code(404);
                echo json_encode( array (
                        "message" => "Risorsa non trovata"
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
                "message" => "Account registrato",
                
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
            echo json_encode(["message" => "L'account specificato non esiste"]);
            return;
        }

        $user = $user[0];
    
        if (!password_verify($data['password'], $user['password'])) {
            http_response_code(401);
            echo json_encode(["message" => "E-mail o password incorrette"]);
            return;
        }
    
        $issuedat_claim = time(); 
        $notbefore_claim = $issuedat_claim; 
        $expire_claim = $issuedat_claim + 43200; 
    
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
                "message" => "Login effettuato"
            )
        );
        return;
    }

    function getAdminData ($data, $database) {
        $auth_info = authenticateToken($data);

        if (!$auth_info['status']) {
            $response = $auth_info['obj'];
            sendOutput(array('Content-Type: application/json'), $response['body'], $response['statusCode']);
            return;
        }

        if ($auth_info['obj']['data']['admin'] == 0) {
            $response = $auth_info['obj'];
            sendOutput(array('Content-Type: application/json'), [
                "message" => "Non hai i permessi per accedere a questa risorsa"
            ], 403);
            return;
        }

        $user_gateway = new ClientGateway($database);
        $transaction_gateway = new TransactionGateway($database);
        $vehicle_gateway = new VehicleGateway($database);
        $gps_gateway = new GPSGateway($database);
        $client_gateway = new ClientGateway($database);
    
        $response = $user_gateway->findAll($data);

        if ($response['statusCode'] != 200) {
            sendOutput(array('Content-Type: application/json'), $response['body'], $response['statusCode']);
            return;
        }

        $users = $response['body']['content'];
        
        $admin_result['numero_utenti'] = count($users);

        // Numero degli utenti che hanno noleggiato un veicolo almeno una volta

        $response = $transaction_gateway->findTransactionUsers($data);

        if ($response['statusCode'] != 200) {
            sendOutput(array('Content-Type: application/json'), $response['body'], $response['statusCode']);
            return;
        }

        $users = $response['body']['content'];

        $admin_result['numero_utenti_nol'] = $users[0]['count'];

        // Incassi totali

        $response = $transaction_gateway->findTotalProceeds($data);

        if ($response['statusCode'] != 200) {
            sendOutput(array('Content-Type: application/json'), $response['body'], $response['statusCode']);
            return;
        }

        $total_proceeds = $response['body']['content'][0]['proceeds'];

        $admin_result['incassi_totali'] = $total_proceeds;

        // Numero dei veicoli totali

        $response = $vehicle_gateway->findAll($data);

        if ($response['statusCode'] != 200) {
            sendOutput(array('Content-Type: application/json'), $response['body'], $response['statusCode']);
            return;
        }

        $total_vehicles = $response['body']['content'];


        $total_vehicles = count($total_vehicles);

        // Numero veicoli occupati

        $response = $transaction_gateway->findOccupiedVehicles($data);

        if ($response['statusCode'] != 200) {
            sendOutput(array('Content-Type: application/json'), $response['body'], $response['statusCode']);
            return;
        }

        $occupied_vehicles = $response['body']['content'];

        $occupied_vehicles = $occupied_vehicles[0];

        $available_vehicles = $total_vehicles - $occupied_vehicles['occupied_vehicles'];

        $admin_result['num_macchine_disp'] = $available_vehicles;

        $admin_result['num_macchine_nol'] = $occupied_vehicles['occupied_vehicles'];

        // Incassi raggruppati per mese

        $response = $transaction_gateway->findProceedsGroupedByMonth($data);

        if ($response['statusCode'] != 200) {
            sendOutput(array('Content-Type: application/json'), $response['body'], $response['statusCode']);
            return;
        }

        $proceeds = $response['body']['content'];

        $admin_result['incassi_mensili'] = $proceeds;

        

        // Incassi raggruppati per mese

        $response = $transaction_gateway->findProceedsGroupedByHeadQuarter($data);

        if ($response['statusCode'] != 200) {
            sendOutput(array('Content-Type: application/json'), $response['body'], $response['statusCode']);
            return;
        }

        $proceeds = $response['body']['content'];

        $admin_result['incassi_sedi'] = $proceeds;

        // 

        $response = $gps_gateway->findAll($data);

        if ($response['statusCode'] != 200) {
            sendOutput(array('Content-Type: application/json'), $response['body'], $response['statusCode']);
            return;
        }

        $positions = $response['body']['content'];

        $admin_result['macchina_gps'] = $positions;

        // Lista veicoli

        $response = $vehicle_gateway->findAllAdmin($data);

        if ($response['statusCode'] != 200) {
            sendOutput(array('Content-Type: application/json'), $response['body'], $response['statusCode']);
            return;
        }

        $total_vehicles = $response['body']['content'];

        $admin_result['lista_veicoli'] = $total_vehicles;

        // Lista utenti

        $response = $client_gateway->findAll($data);

        if ($response['statusCode'] != 200) {
            sendOutput(array('Content-Type: application/json'), $response['body'], $response['statusCode']);
            return;
        }

        $users = $response['body']['content'];

        $admin_result['lista_veicoli'] = $users;
    
        sendOutput(array('Content-Type: application/json'), [
            "content" => $admin_result,
        ], 200);
        
        return;
    }

    function authenticateToken ($input)
    {
        $response_obj = [];
        $response_obj['status'] = false;

        if (!isset($input['auth']['jwt']) || $input['auth']['jwt'] == "") {
            
            $response_obj['obj'] = array (
                'statusCode' => 401,
                'body' => array (
                    'message' => "Unauthenticated: Missing JWT."
                )
            );

            return $response_obj;
        } 

        $auth_info = (array) JWT::decode($input['auth']['jwt'], new Key($_ENV["SECRET_KEY"], 'HS256'));
        $auth_info['data'] = (array)$auth_info['data'];
        
        $response_obj['status'] = true;
        $response_obj['obj'] = $auth_info;
        
        return $response_obj;
    }

    function sendOutput($httpHeaders, $data=[], $statusCode=200)
    {

        http_response_code($statusCode);

        if (is_array($httpHeaders) && count($httpHeaders)) {
            foreach ($httpHeaders as $httpHeader) {
                header($httpHeader);
            }
        }
        
        echo json_encode($data);
        exit();
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