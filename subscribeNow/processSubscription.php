<?php
session_start();
require_once '../config/database.php'; // Adjust path if necessary

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'يرجى تسجيل الدخول للاشتراك.']);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $userId = $_SESSION['user_id'];
    $plan = $data['plan'] ?? '';
    $paymentMethod = $data['payment'] ?? '';
    $serviceNumber = $data['service_number'] ?? null; // New field

    if (empty($plan) || empty($paymentMethod)) {
        echo json_encode(['success' => false, 'message' => 'الرجاء اختيار الباقة وطريقة الدفع.']);
        exit();
    }

    // Validate plan and payment method (add more robust validation as needed)
    $allowedPlans = ['basic', 'pro', 'premium'];
    $allowedPaymentMethods = ['credit', 'fawry', 'vodafone'];

    if (!in_array($plan, $allowedPlans) || !in_array($paymentMethod, $allowedPaymentMethods)) {
        echo json_encode(['success' => false, 'message' => 'بيانات الباقة أو طريقة الدفع غير صالحة.']);
        exit();
    }

    // Validate service number based on payment method
    if (($paymentMethod === 'fawry' || $paymentMethod === 'vodafone') && empty($serviceNumber)) {
        echo json_encode(['success' => false, 'message' => 'الرجاء إدخال رقم الخدمة.']);
        exit();
    }

    // Calculate end date based on plan (example: 1 month for all plans for simplicity)
    $startDate = date('Y-m-d H:i:s');
    $endDate = date('Y-m-d H:i:s', strtotime('+1 month', strtotime($startDate)));

    try {
        // Commented out to allow multiple active subscriptions
        // $stmt = $pdo->prepare("SELECT id FROM subscriptions WHERE user_id = ? AND status = 'active'");
        // $stmt->execute([$userId]);
        // if ($stmt->fetch()) {
        //     echo json_encode(['success' => false, 'message' => 'لديك بالفعل اشتراك مفعل.']);
        //     exit();
        // }

        $stmt = $pdo->prepare("INSERT INTO subscriptions (user_id, plan, payment_method, service_number, start_date, end_date, status) VALUES (?, ?, ?, ?, ?, ?, 'active')");
        $stmt->execute([$userId, $plan, $paymentMethod, $serviceNumber, $startDate, $endDate]);

        echo json_encode(['success' => true, 'message' => 'تم الاشتراك بنجاح!']);

    } catch (PDOException $e) {
        // Log the error for debugging
        error_log("Subscription Error: " . $e->getMessage());
        echo json_encode(['success' => false, 'message' => 'حدث خطأ في النظام. الرجاء المحاولة لاحقاً.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'طريقة طلب غير صالحة.']);
}
?> 