<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"] ?? '';
    $email = $_POST["email"] ?? '';
    $phone = $_POST["phone"] ?? '';
    $earliestStartDate = $_POST["earliestStartDate"] ?? '';
    $preferredInterviewDate = $_POST["preferredInterviewDate"] ?? '';
    $settleStatus = $_POST["settleStatus"] ?? '';
    $englishLevel = $_POST["englishLevel"] ?? '';
    $employed = $_POST["employed"] ?? '';
    $nationality = $_POST["nationality"] ?? '';
    $notes = $_POST["notes"] ?? '';

    // Validare minimă
    if (empty($name) || empty($email) || empty($phone)) {
        http_response_code(400);
        echo "Te rog completează toate câmpurile obligatorii.";
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        // Setări SMTP Hostico
        $mail->isSMTP();
        $mail->Host       = 'mail.iesupportuk.co.uk';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'office@iesupportuk.co.uk';
        $mail->Password   = 'PAROLA_TA';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        $mail->setFrom('office@iesupportuk.co.uk', 'IE Support UK');
        $mail->addAddress('office@iesupportuk.co.uk');
        $mail->addReplyTo($email, $name);

        $mail->isHTML(false);
        $mail->Subject = "Aplicare nouă de la $name";
        $mail->Body =
            "Nume: $name\nEmail: $email\nTelefon: $phone\n\n" .
            "Earliest Start Date: $earliestStartDate\n" .
            "Preferred Interview Date: $preferredInterviewDate\n" .
            "Settle Status: $settleStatus\n" .
            "English Level: $englishLevel\n" .
            "Employed: $employed\n" .
            "Nationality: $nationality\n" .
            "Notes: $notes\n";

        $mail->send();
        http_response_code(200);
        echo "Aplicarea a fost trimisă cu succes!";
    } catch (Exception $e) {
        http_response_code(500);
        echo "Eroare la trimiterea aplicării: {$mail->ErrorInfo}";
    }
} else {
    http_response_code(403);
    echo "Metoda nu este permisă.";
}
?>
