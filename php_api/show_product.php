<?php
require 'condb.php';

try {
    // เตรียมคำสั่ง SQL ดึงข้อมูลทั้งหมดจากตาราง products
    $stmt = $pdo->query("SELECT * FROM products");
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // ส่งข้อมูลกลับในรูปแบบ JSON
    echo json_encode($products);
    
} catch (PDOException $e) {
    // ส่งข้อผิดพลาดกลับในรูปแบบ JSON
    echo json_encode(["error" => $e->getMessage()]);
}
?>