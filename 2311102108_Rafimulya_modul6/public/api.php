<?php

// API endpoint untuk handle data JSON
header('Content-Type: application/json');

$dataFile = __DIR__ . '/data.json';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (isset($input['data']) && is_array($input['data'])) {
        // Validasi data
        $data = [];
        foreach ($input['data'] as $item) {
            if (isset($item['nama'], $item['harga'], $item['stok'])) {
                $data[] = [
                    'nama' => sanitize($item['nama']),
                    'harga' => (int)$item['harga'],
                    'stok' => (int)$item['stok']
                ];
            }
        }
        
        if (file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
            echo json_encode(['status' => 'success', 'message' => 'Data tersimpan ke JSON']);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Gagal menyimpan data']);
        }
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($dataFile)) {
        echo file_get_contents($dataFile);
    } else {
        echo json_encode([]);
    }
}

function sanitize($str) {
    return htmlspecialchars(strip_tags(trim($str)), ENT_QUOTES, 'UTF-8');
}
