<?php
    include_once 'connect.php';
    require 'vendor/autoload.php';

    use \Firebase\JWT\JWT;

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        header('ALLOW: POST');
        exit();
    }

    $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';


    if ($contentType !== 'application/json') {
        http_response_code(415);
        echo json_encode(["message" => "Only JSON content is supported"]);
        exit();
    }

    $data = json_decode(file_get_contents('php://input'), true);

    if ($data === null) {
        http_response_code(400);
        echo json_encode(["message" => "Invalid JSON data"]);
        exit();
    }


    if (!array_key_exists('username', $data) || !array_key_exists('password', $data)) {
        http_response_code(400);
        echo json_encode(["message" => "Missing login credentials"]);
        exit();
    }

    $data = json_decode(file_get_contents("php://input"));

    $email = $data->email;
    $password = $data->password;

    $query = "SELECT id, first_name, last_name, password FROM users WHERE email = ? LIMIT 0,1";

    $payload = [
    'data' => ['field1' => 1, 'field2' => 'string data'],
    "iss" => "http://example.org",
    "aud" => "http://example.com",
    "iat" => 1531498466,
    "eat" => 1557000000
    ];

    $token = JWT::encode($payload, $privateKey, 'RS256');
    echo "Token:\n" . print_r($token, true) . "\n";


    $decoded = JWT::decode($token, $publicKey, ['RS256']);
    $decoded_array = (array) $decoded;

    echo "Decoded:\n" . print_r($decoded_array, true) . "\n";