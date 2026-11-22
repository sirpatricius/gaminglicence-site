<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

// Honeypot: bots fill the hidden "website" field
if (!empty($_POST['website'])) {
    echo json_encode(['ok' => true]);
    exit;
}

$to = 'info@gaminglicence.uk'; // change to your inbox

$clean = fn($v) => trim(str_replace(["\r", "\n"], ' ', strip_tags($v ?? '')));
$name     = $clean($_POST['name'] ?? '');
$company  = $clean($_POST['company'] ?? '');
$email    = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
$interest = $clean($_POST['interest'] ?? '');
$message  = trim(strip_tags($_POST['message'] ?? ''));

if (!$name || !$email || !$message) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Please fill in your name, a valid email and a message.']);
    exit;
}

$subject = "New enquiry from $name";
$body = "Name: $name\nCompany: $company\nEmail: $email\nInterested in: $interest\n\n$message\n";
$headers = "From: GamingLicence Website <no-reply@gaminglicence.uk>\r\nReply-To: $email\r\nContent-Type: text/plain; charset=UTF-8";

if (mail($to, $subject, $body, $headers)) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Mail could not be sent. Please email info@gaminglicence.uk.']);
}
