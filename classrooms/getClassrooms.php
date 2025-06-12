<?php
require_once '../config/database.php';
header('Content-Type: application/json');

try {
    $stmt = $pdo->query("SELECT * FROM classrooms");
    $classrooms = $stmt->fetchAll();

    echo json_encode([
        'success' => true,
        'data' => $classrooms
    ]);
} catch(PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'حدث خطأ في النظام'
    ]);
}
?> 