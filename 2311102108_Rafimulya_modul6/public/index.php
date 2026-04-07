<?php

// Simple Laravel-like router
function view($view) {
    $viewPath = __DIR__ . '/../resources/views/' . $view . '.blade.php';
    if (file_exists($viewPath)) {
        return file_get_contents($viewPath);
    }
    return "View not found: $view";
}

// Simple routing
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

if ($uri === '/' || $uri === '') {
    echo view('index');
} else {
    http_response_code(404);
    echo "Page not found";
}

