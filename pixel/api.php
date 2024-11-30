<?php
header('Content-Type: application/json');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "pixelgrid";
$port = 3307;

try {
    $conn = new mysqli($servername, $username, $password, $dbname, $port);
    if ($conn->connect_error) {
        throw new Exception("Database connection failed: " . $conn->connect_error);
    }

    $action = $_GET['action'] ?? '';
    if ($action === 'getCanvas') {
        $result = $conn->query("SELECT * FROM pixels");
        echo json_encode($result->fetch_all(MYSQLI_ASSOC));
    } elseif ($action === 'updatePixel') {
        $position = $_POST['position'] ?? '';
        $color = $_POST['color'] ?? '';

        if (!$position || !$color) {
            throw new Exception("Invalid input data");
        }

        // Check if a different color already exists at the position
        $stmtCheck = $conn->prepare("SELECT color FROM pixels WHERE position = ?");
        $stmtCheck->bind_param("s", $position);
        $stmtCheck->execute();
        $resultCheck = $stmtCheck->get_result();
        $existingPixel = $resultCheck->fetch_assoc();

        if ($existingPixel && $existingPixel['color'] !== $color) {
            // Delete the old entry to save space
            $stmtDelete = $conn->prepare("DELETE FROM pixels WHERE position = ?");
            $stmtDelete->bind_param("s", $position);
            $stmtDelete->execute();
        }

        // Insert or update the new pixel color
        $stmt = $conn->prepare("INSERT INTO pixels (position, color) VALUES (?, ?) ON DUPLICATE KEY UPDATE color = ?");
        $stmt->bind_param("sss", $position, $color, $color);
        $stmt->execute();

        echo json_encode(['success' => 'Pixel updated']);
    } else {
        throw new Exception("Invalid action");
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
