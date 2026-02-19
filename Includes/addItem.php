<?php


$host = "localhost";  
$user = "amitsp2_noamamitmoran";
$pass = "w]+0bTr8pa}(QSL)";
$db = "amitsp2_Final_Project";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$item_name = $_POST['itemName'] ?? '';
$category = $_POST['category'] ?? '';
$price = $_POST['price'] ?? 0;
$available_until = $_POST['availableUntil'] ?? '';

$sql = "INSERT INTO items (item_name, category, price, available_until) VALUES (?, ?, ?, ?)";
$STMT = $conn->prepare($sql);
$STMT->bind_param("ssds", $item_name, $category, $price, $available_until);

if ($STMT->execute() === TRUE) {
    echo "success"; 
} 
else {
    echo "Error: " . $STMT->error;
}

$STMT->close();
$conn->close();
?>



