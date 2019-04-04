<?php 
require_once './vendor/autoload.php';
$recaptcha = new \ReCaptcha\ReCaptcha('6LdoJJwUAAAAAEyDzE1qTAGJ8jl8y52ezaOivCxX');

$check = $recaptcha
            ->setExpectedHostname($_SERVER['SERVER_NAME'])
            ->verify($_POST['g-recaptcha-response'], $_SERVER['REMOTE_ADDR']);



if(!$check->isSuccess()){
	echo json_encode([
		'type' => 0,
		'message' => 'Captcha is not valid.'
		]);
	exit();
}

	

$headers = 'Content-type: text/html';

$name = htmlspecialchars($_POST['name']);
$email = htmlspecialchars($_POST['email']);
$message = htmlspecialchars($_POST['message']);
	

$html = '<table style="width: 100%;">
	<tr style="background-color: #f8f8f8;">
		<th style="padding: 10px; border: #e9e9e9 1px solid;"><b>Name</b></th>
		<th style="padding: 10px; border: #e9e9e9 1px solid;"><b>Email</b></th>
		<th style="padding: 10px; border: #e9e9e9 1px solid;"><b>Message</b></th>
	</tr>
';

$html .= '<tr>
		<td style="padding: 10px; border: #e9e9e9 1px solid;">'.$name.'</td>
		<td style="padding: 10px; border: #e9e9e9 1px solid;">'.$email.'</td>
		<td style="padding: 10px; border: #e9e9e9 1px solid;">'.$message.'</td>
</tr>';


$html .= '</table>';

$mail = mail('info@claroads.com', 'Claro contact form', $html, $headers);

if($mail){
	echo json_encode([
			'type' => 200,
			'message' => 'Thanks for the request, we will contact you.'
		]);
}


?>