<?php

    require __DIR__ . '/bootstrap.php';
    require __DIR__ . '/request.php';

    use Firebase\JWT\ExpiredException;
    use Firebase\JWT\SignatureInvalidException;
    use Firebase\JWT\BeforeValidException;
    use Firebase\JWT\JWT;

    class Auth
    {



        public function __construct(private UserGateway $user_gateway, private Jwt $JwtCtrl)
        {
        }



        public function authenticateJWTToken(): bool
        {
            try {
                return JWT::decode($jwt_token, $secret_key, array('HS256'));
            } catch (ExpiredException $e) {
                throw new Exception('Token expired');
            } catch (SignatureInvalidException $e) {
                throw new Exception('Invalid token signature');
            } catch (BeforeValidException $e) {
                throw new Exception('Token not valid yet');
            } catch (Exception $e) {
                throw new Exception('Invalid token');
            }
        }
    }
?>