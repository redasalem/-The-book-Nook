<?php
session_start();
require_once '../config/database.php';
header('Content-Type: application/json');

// Debug session
error_log("Session in getProfile - user_id: " . ($_SESSION['user_id'] ?? 'not set'));
error_log("Session in getProfile - email: " . ($_SESSION['email'] ?? 'not set'));

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'يرجى تسجيل الدخول']);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT username, email FROM users WHERE id = ?");
    $stmt->execute([$_SESSION['user_id']]);
    $user = $stmt->fetch();

    if ($user) {
        echo json_encode([
            'success' => true,
            'data' => [
                'username' => $user['username'],
                'email' => $user['email']
            ]
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'لم يتم العثور على المستخدم']);
    }
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'حدث خطأ في النظام']);
}
?>