<?php
require_once('emailconfig.php');
require('phpmailer/PHPMailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->SMTPDebug = 0;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';     // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication


$mail->Username = EMAIL_USER;                 // SMTP username
$mail->Password = EMAIL_PASS;                 // SMTP password
$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 587;                                    // TCP port to connect to
$options = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
    )
);

$mail->smtpConnect($options);
$mail->From = $_POST['email'];
$mail->FromName = $_POST['name'];
$mail->addAddress('erik.nuber@yahoo.com');     // Add a recipient
$mail->addReplyTo($_POST['email']);
$mail->isHTML(true);                           // Set email format to HTML

$mail->Subject = 'Contact From Your Portfolio';
$mail->Body    = $_POST['name'].' '.$_POST['surname'].' '.$_POST['email'].' '.$_POST['phone'].' '.$_POST['message'];
$mail->AltBody = htmlentities($_POST['body']);

?>
