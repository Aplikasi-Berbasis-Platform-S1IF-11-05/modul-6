<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProdukController;

Route::get('/', [ProdukController::class, 'index']);
Route::post('/tambah', [ProdukController::class, 'tambah']);
Route::post('/edit', [ProdukController::class, 'edit']);
Route::post('/hapus', [ProdukController::class, 'hapus']);