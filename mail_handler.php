<?php
require_once('emailconfig.php');
require('phpmailer/PHPMailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->SMTPDebug = 3;                               // Enable verbose debug output

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

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

$name = $surname = $email = $phone = $message = "";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = test_input($_POST['name']);
    $surname = test_input($_POST['surname']);
    $email = test_input($_POST['email']);
    $phone = test_input($_POST['phone']);
    $message = test_input($_POST['message']);
}



$mail->smtpConnect($options);
$mail->From = $_POST['email'];
$mail->FromName = $_POST['name'];
$mail->addAddress('erik.nuber@yahoo.com');     // Add a recipient
$mail->addReplyTo($_POST['email']);
$mail->isHTML(true);                           // Set email format to HTML

$mail->Subject = 'Contact From Your Portfolio';
$mail->Body    = $name.' '.$surname.' '.$email.' '.$phone.' '.$message;
$mail->AltBody = htmlentities($_POST['message']);

if(!$mail->Send()){
    echo "Mailer Error: " . $mail->ErrorInfo;
} else {
    echo "Message has been sent";
}

?>
