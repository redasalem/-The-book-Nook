<?php
session_start();
require_once '../config/database.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'يرجى تسجيل الدخول']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$username = trim($data['username'] ?? '');
$email = trim($data['email'] ?? '');

if (!$username || !$email) {
    echo json_encode(['success' => false, 'message' => 'جميع الحقول مطلوبة']);
    exit;
}

try {
    // تحقق من عدم وجود بريد إلكتروني آخر لنفس المستخدم
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ? AND id != ?");
    $stmt->execute([$email, $_SESSION['user_id']]);
    if ($stmt->fetch()) {
        echo json_encode(['success' => false, 'message' => 'البريد الإلكتروني مستخدم بالفعل.']);
        exit;
    }

    $stmt = $pdo->prepare("UPDATE users SET username = ?, email = ? WHERE id = ?");
    $stmt->execute([$username, $email, $_SESSION['user_id']]);
    echo json_encode(['success' => true]);
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'حدث خطأ في النظام']);
}
?>