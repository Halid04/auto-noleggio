<?php
    $db_host = "localhost";
    $db_name = "auto_noleggio";
    $db_user = "root";
    $db_password = "";

    $conn;
    try {
        $conn = new PDO("mysql:host=" . $db_host . ";dbname=" . $db_name, $db_user, $db_password);
    } catch(PDOException $exception){
        header($_SERVER['SERVER_PROTOCOL'] . '500 Internal Server Error: ' . "Connection failed: " . $exception->getMessage(), true, 500);
        die();
    }
?>