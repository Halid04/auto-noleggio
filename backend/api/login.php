<?php

    require __DIR__ . '/bootstrap.php';
    require __DIR__ . '/request.php';

    use \Firebase\JWT\JWT;

    $required_parameters = [
        "email", 
        "password"
    ];

    $request_keys = array_keys($data);

    $missing_keys = array_diff($required_parameters, $request_keys);

    if (count($missing_keys) !== 0) {
        http_response_code(400);
        echo json_encode(["message" => "Missing credentials: " . implode(",", $missing_keys)]);
        exit();
    }

    $user_gateway = new UserGateway($database);

    $user = $user_gateway->getByEmail($data['email']);

    if ($user === false) {
        http_response_code(401);
        echo json_encode(["message" => "User account does not exist."]);
        exit();
    }

    if (!password_verify($data['password'], $user['password'])) {
        http_response_code(401);
        echo json_encode(["message" => "Password is incorrect."]);
        exit();
    }

    $issuedat_claim = time(); 
    $notbefore_claim = $issuedat_claim + 2; 
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
            "message" => "Successful login.",
            "jwt" => $token,
            "expireAt" => $expire_claim
        )
    );
    /*

    
    $token = JWT::encode($payload, $privateKey, 'RS256');
    echo "Token:\n" . print_r($token, true) . "\n";


    $decoded = JWT::decode($token, $publicKey, ['RS256']);
    $decoded_array = (array) $decoded;
    

    echo "Decoded:\n" . print_r($decoded_array, true) . "\n";
    */

?>
