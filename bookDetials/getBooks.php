<?php
require_once '../config/database.php';

header('Content-Type: application/json');

try {
    $category = $_GET['category'] ?? null;
    $author = $_GET['author'] ?? null;
    $search = $_GET['search'] ?? null;
    $isNew = $_GET['is_new'] ?? null;

    $query = "SELECT * FROM books WHERE 1=1";
    $params = [];

    if ($category) {
        $query .= " AND category = ?";
        $params[] = $category;
    }

    if ($author) {
        $query .= " AND author = ?";
        $params[] = $author;
    }

    if ($search) {
        $query .= " AND (title LIKE ? OR description LIKE ?)";
        $searchTerm = "%$search%";
        $params[] = $searchTerm;
        $params[] = $searchTerm;
    }

    if ($isNew === 'true') {
        $query .= " AND is_new = TRUE";
    }

    $stmt = $pdo->prepare($query);
    $stmt->execute($params);
    $books = $stmt->fetchAll();

    echo json_encode([
        'success' => true,
        'data' => $books
    ]);
} catch(PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'حدث خطأ في النظام'
    ]);
}
?> 