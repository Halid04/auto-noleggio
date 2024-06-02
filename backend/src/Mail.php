<?php
namespace Src;

use League\OAuth2\Client\Provider\Google;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require dirname(__DIR__)  . '/vendor/autoload.php';

class Mail
{
    private $mail;

    public function __construct(string $host, string $username, string $password)
    {
        $this->mail = new PHPMailer(true);

        //$this->mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
        $this->mail->isSMTP();                                            //Send using SMTP
        $this->mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
        $this->mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $this->mail->Username   = $username;                     //SMTP username
        $this->mail->Password   = $password;                               //SMTP password

        $this->mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption

        $this->mail->Port       = 465;
        
    }

    public function sendMail ($user, $mail) 
    {
        $this->mail->setFrom($this->mail->Username, 'Autonoleggio.ITIS');
        $this->mail->addAddress($this->mail->Username/*$user['address']*/, $user['name']);
        
        $this->mail->isHTML(true);                                  //Set email format to HTML
        $this->mail->Subject = $mail['subject'];
        $this->mail->Body    = $mail['body'];
        $this->mail->AltBody = $mail['altBody'];

        $this->mail->send();
    }
}
?>