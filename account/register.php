<?php
session_start();
require_once '../config/database.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $username = $data['username'] ?? '';
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';
    
    if (empty($username) || empty($email) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'جميع الحقول مطلوبة']);
        exit;
    }
    
    try {
        // Check if email already exists
        $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->execute([$email]);
        if ($stmt->fetch()) {
            echo json_encode(['success' => false, 'message' => 'البريد الإلكتروني مستخدم بالفعل']);
            exit;
        }
        
        // Hash password
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        
        // Insert new user
        $stmt = $pdo->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
        $stmt->execute([$username, $email, $hashedPassword]);
        
        // Get the new user's ID
        $userId = $pdo->lastInsertId();
        
        // Set session
        $_SESSION['user_id'] = $userId;
        $_SESSION['email'] = $email;
        
        echo json_encode(['success' => true, 'message' => 'تم إنشاء الحساب بنجاح']);
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'حدث خطأ في النظام']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'طريقة طلب غير صحيحة']);
}
?> 