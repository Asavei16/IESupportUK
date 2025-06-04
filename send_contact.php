<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Preia datele din formular
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

    // Verifică dacă datele sunt valide
    if (empty($name) || !filter_var($email, FILTER_VALIDATE_EMAIL) || empty($message)) {
        // Date invalide, redirecționează înapoi sau afișează mesaj de eroare
        http_response_code(400);
        echo "Te rog completează toate câmpurile corect.";
        exit;
    }

    // Destinatarul emailului (schimbă cu adresa ta)
    $recipient = "asaveiflo@gmail.com";

    // Subiectul emailului
    $subject = "Mesaj nou de pe site de la $name";

    // Conținutul emailului
    $email_content = "Nume: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Mesaj:\n$message\n";

    // Antetele emailului
    $email_headers = "From: $name <$email>";

    // Trimite emailul
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        // Succes
        http_response_code(200);
        echo "Mesajul a fost trimis cu succes!";
    } else {
        // Eroare la trimitere
        http_response_code(500);
        echo "Ne pare rău, a apărut o problemă la trimiterea mesajului.";
    }
} else {
    // Nu este POST
    http_response_code(403);
    echo "Metoda nu este permisă.";
}
?>
