<?php
session_start();
require_once '../config/database.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';
    
    if (empty($email) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'جميع الحقول مطلوبة']);
        exit;
    }
    
    try {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        
        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['email'] = $user['email'];
            
            // Debug session
            error_log("Session after login - user_id: " . $_SESSION['user_id']);
            error_log("Session after login - email: " . $_SESSION['email']);
            
            echo json_encode(['success' => true, 'message' => 'تم تسجيل الدخول بنجاح']);
        } else {
            echo json_encode(['success' => false, 'message' => 'البريد الإلكتروني أو كلمة المرور غير صحيحة']);
        }
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'حدث خطأ في النظام']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'طريقة طلب غير صحيحة']);
}
?> 