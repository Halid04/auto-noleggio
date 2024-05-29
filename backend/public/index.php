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
    use Src\Gateway\ClientGateway;
    use Src\Gateway\OTPGateway;
    
    
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
                $controller = new TransactionController($requestMethod, $data, $database);
                $controller->processRequest();
                break;
            case "new_transaction":
                $controller = new TransactionController($requestMethod, $data, $database);
                $controller->processRequest();
                break;
            case "getChallenge":
                generateChallenge($data, $database);
                break;
            case "solveChallenge":
                verifyChallenge($data, $database);
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

    function verifyChallenge($request, $database)
    {

        $required_parameters = ["otp_code", "otp_challenge_id"];

        $request_keys = array_keys($request);
    
        $missing_keys = array_diff($required_parameters, $request_keys);
    
        if (count($missing_keys) !== 0) {
            header('Content-Type: application/json');
            http_response_code(400);
            echo json_encode(["message" => "Missing parameters: " . implode(",", $missing_keys)]);
            return;
        }

        if ($request['auth']['jwt'] == "") {
            header('Content-Type: application/json');
            http_response_code(401);
            echo json_encode(["message" => "Unauthenticated: Missing JWT."]);
            return;
        }

        try {
            $auth_info = (array) JWT::decode($request['auth']['jwt'], new Key($_ENV["SECRET_KEY"], 'HS256'));
        } catch (\Exception $e) {
            header('Content-Type: application/json');
            http_response_code(403);
            echo json_encode(["message" => "Access forbidden: " . $e->getMessage()]);
            return;
        } 

        $auth_info['data'] = (array)$auth_info['data'];
        $auth_info = $auth_info['data'];

        $otp_gateway = new OTPGateway($database);

        $otp_code = generateOTP($_ENV['SECRET_KEY']);

        $date = date('Y-m-d H:i:s', time());

        $expiry_date = date('Y-m-d H:i:s', time() + 2 * 60);
        
        $status = 1;

        $result = $otp_gateway->find(["id" => $request['otp_challenge_id']]);

        $result = $result['body']['content'];

        if (empty($result)) {
            header('Content-Type: application/json');
            http_response_code(500);
            echo json_encode(["message" => "Internal Server Error"]);
            return;
        }

        $otp_challenge = $result[0];

        if ($otp_challenge['stato'] == "failed") {
            header('Content-Type: application/json');
            http_response_code(400);
            echo json_encode(["message" => "Challenge già utilizzata: Esito negativo"]);
            return;
        }

        if ($otp_challenge['stato'] == "successful") {
            header('Content-Type: application/json');
            http_response_code(400);
            echo json_encode(["message" => "Challenge già utilizzata: Esito postivo"]);
            return;
        }

        if (time() >= strtotime($otp_challenge['data_scadenza'])) {

            $result = $otp_gateway->update([
                'id' => $request['otp_challenge_id'],
                'stato' => 4
            ]);

            if ($result['statusCode'] != 200) {
                header('Content-Type: application/json');
                http_response_code($result['statusCode']);
                echo json_encode($result['body']);
                return;
            }

            header('Content-Type: application/json');
            http_response_code(400);
            echo json_encode(["message" => "Challenge scaduta"]);
            return;
        }

        if ($otp_challenge['used'] == "used") {
            header('Content-Type: application/json');
            http_response_code(400);
            echo json_encode(["message" => "Challenge già utilizzata: Transazione già eseguita"]);
            return;
        }

        if ($otp_challenge['id_cliente'] != $auth_info['user_id']) {
            echo var_dump($auth_info);
            header('Content-Type: application/json');
            http_response_code(403);
            echo json_encode(["message" => "Non hai il permesso di risolvere questa challenge"]);
            return;
        }

        if ($otp_challenge['codice'] != $request['otp_code']) {


            $result = $otp_gateway->update([
                'id' => $request['otp_challenge_id'],
                'stato' => 2
            ]);

            if ($result['statusCode'] != 200) {
                header('Content-Type: application/json');
                http_response_code($result['statusCode']);
                echo json_encode($result['body']);
                return;
            }

            header('Content-Type: application/json');
            http_response_code(403);
            echo json_encode(["message" => "Codice OTP errato"]);
            return;
        } else {
            $result = $otp_gateway->update([
                'id' => $request['otp_challenge_id'],
                'stato' => 3
            ]);

            if ($result['statusCode'] != 200) {
                header('Content-Type: application/json');
                http_response_code($result['statusCode']);
                echo json_encode($result['body']);
                return;
            }

            header('Content-Type: application/json');
            http_response_code(200);
            echo json_encode(["message" => "Challenge risolta"]);
            return;
        }

        header('Content-Type: application/json');
        http_response_code(500);
        echo json_encode(["message" => "Internal Server Error"]);
        return;
    }


    function generateChallenge($request, $database)
    {

        if ($request['auth']['jwt'] == "") {
            header('Content-Type: application/json');
            http_response_code(401);
            echo json_encode(["message" => "Unauthenticated: Missing JWT."]);
            return;
        }

        try {
            $auth_info = (array) JWT::decode($request['auth']['jwt'], new Key($_ENV["SECRET_KEY"], 'HS256'));
        } catch (\Exception $e) {
            header('Content-Type: application/json');
            http_response_code(403);
            echo json_encode(["message" => "Access forbidden: " . $e->getMessage()]);
            return;
        } 

        $auth_info['data'] = (array)$auth_info['data'];
        $auth_info = $auth_info['data'];

        $otp_gateway = new OTPGateway($database);

        $otp_code = generateOTP($_ENV['SECRET_KEY']);

        $date = date('Y-m-d H:i:s', time());

        $expiry_date = date('Y-m-d H:i:s', time() + 2 * 60);
        
        $status = 1;

        $result = $otp_gateway->insert([
            "codice" => $otp_code,
            "data_generazione" => $date,
            "data_scadenza" => $expiry_date,
            "stato" => $status,
            "id_cliente" => $auth_info['user_id']
        ]);

        if ($result['statusCode'] != 201) {
            header('Content-Type: application/json');
            http_response_code($result['statusCode']);
            echo json_encode($result['body']);
            return;
        }

        $result = $otp_gateway->findLatest();

        if ($result['statusCode'] != 200) {
            header('Content-Type: application/json');
            http_response_code($result['statusCode']);
            echo json_encode($result['body']);
            return;
        }

        $result = $result['body']['content'];

        if (empty($result)) {
            header('Content-Type: application/json');
            http_response_code(500);
            echo json_encode(["message" => "Internal Server Error"]);
            return;
        }

        $challenge_id = $result[0]['id_codiceotp'];

        header('Content-Type: application/json');
        http_response_code($result['statusCode']);
        echo json_encode(["challenge_id" => $challenge_id]);
        return;
    }

    function generateOTP(string $secret_key, int $time_step = 60, int $length = 6): string
    {
        $counter = floor(time() / $time_step);
        $data = pack("NN", 0, $counter);
        $hash = hash_hmac('sha1', $data, $secret_key, true);
        $offset = ord(substr($hash, -1)) & 0x0F;
        $value = unpack("N", substr($hash, $offset, 4));
        $otp = ($value[1] & 0x7FFFFFFF) % pow(10, $length);

        return str_pad(strval($otp), $length, '0', STR_PAD_LEFT);
    }

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
                "message" => "Login effettuato"
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