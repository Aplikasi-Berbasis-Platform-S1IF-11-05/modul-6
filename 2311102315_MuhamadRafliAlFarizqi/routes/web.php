<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

// Halaman utama redirect ke produk
Route::get('/', function () {
    return redirect()->route('products.index');
});

// Halaman daftar produk
Route::get('/products', [ProductController::class, 'index'])->name('products.index');

// API endpoints untuk CRUD (JSON)
Route::get('/products/data', [ProductController::class, 'data'])->name('products.data');
Route::post('/products', [ProductController::class, 'store'])->name('products.store');
Route::get('/products/{id}', [ProductController::class, 'show'])->name('products.show');
Route::put('/products/{id}', [ProductController::class, 'update'])->name('products.update');
Route::delete('/products/{id}', [ProductController::class, 'destroy'])->name('products.destroy');
