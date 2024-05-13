<?php

    require __DIR__ . '/bootstrap.php';
    require __DIR__ . '/request.php';
    
    use \Firebase\JWT\JWT;

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
        exit();
    }

    $conn = $database->getConnection();

    $existing_users_sql = "
                        SELECT COUNT(*) as count 
                        FROM Cliente 
                        WHERE email = :email";

    $existing_users_stmt = $conn->prepare($existing_users_sql);
    $existing_users_stmt->bindValue(":email", $data["email"]);
    $existing_users_stmt->execute();

    $existing_users_count = $existing_users_stmt->fetch(PDO::FETCH_ASSOC)["count"];

    if ($existing_users_count > 0) {
        http_response_code(400);
        echo json_encode (
            array (
                "message" => "E-mail has already been registered."
            )
        );
        exit();
    }

    $sql = "INSERT INTO Cliente (nome, cognome, email, password, telefono, data_di_nascita, amministratore)
            VALUES (
                :nome,
                :cognome, 
                :email, 
                :password, 
                :telefono, 
                :data_di_nascita,
                :amministratore
            )";

    $stmt = $conn->prepare($sql);

    $password_hash = password_hash($data["password"], PASSWORD_DEFAULT);

    $stmt->bindValue(":nome", $data["nome"], PDO::PARAM_STR);
    $stmt->bindValue(":cognome", $data["cognome"], PDO::PARAM_STR);
    $stmt->bindValue(":email", $data["email"], PDO::PARAM_STR);
    $stmt->bindValue(":password", $password_hash, PDO::PARAM_STR);
    $stmt->bindValue(":telefono", $data["telefono"], PDO::PARAM_STR);
    $stmt->bindValue(":data_di_nascita", $data["data_di_nascita"], PDO::PARAM_STR);
    $stmt->bindValue(":amministratore",  $contentType = isset($data["amministratore"]) ? $data["amministratore"] : false, PDO::PARAM_BOOL);

    $stmt->execute();
    
    $issuedat_claim = time(); 
    $notbefore_claim = $issuedat_claim + 2; 
    $expire_claim = $issuedat_claim + 60 * 60;

    $user_gateway = new UserGateway($database);

    $user = $user_gateway->getByEmail($data['email']);

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
            "message" => "Account registered succesfully.",
            "jwt" => $token,
            "expireAt" => $expire_claim
        )
    );

    exit();

?>
