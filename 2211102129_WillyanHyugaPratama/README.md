<div align="center">
  <br />
  <h1>LAPORAN PRAKTIKUM <br> APLIKASI BERBASIS PLATFORM </h1>
  <br />
  <h3>MODUL 6 <br> COTS </h3>
  <br />
  <img width="512" height="512" alt="telyu" src="https://github.com/user-attachments/assets/724a3291-bcf9-448d-a395-3886a8659d79" />
  <br />
  <br />
  <br />
  <h3>Disusun Oleh :</h3>
  <p>
    <strong>Willyan Hyuga Pratama</strong>
    <br>
    <strong>2211102129</strong>
    <br>
    <strong>S1 IF-11-REG05</strong>
  </p>
  <br />
  <h3>Dosen Pengampu :</h3>
  <p>
    <strong>Dedi Agung Prabowo, S.Kom., M.Kom</strong>
  </p>
  <br />
  <br />
  <h4>Asisten Praktikum :</h4>
  <strong>Apri Pandu Wicaksono </strong>
  <br>
  <strong>Hamka Zaenul Ardi</strong>
  <br />
  <h3>LABORATORIUM HIGH PERFORMANCE <br>FAKULTAS INFORMATIKA <br>UNIVERSITAS TELKOM PURWOKERTO <br>2026 </h3>
</div>

<hr>

## Dasar Teori COTS

COTS (Commercial Off-The-Shelf) merupakan pendekatan dalam pengembangan perangkat lunak yang memanfaatkan produk atau komponen yang sudah tersedia di pasaran. Alih-alih membangun seluruh sistem dari awal, pengembang dapat langsung menggunakan solusi yang telah dibuat oleh vendor untuk memenuhi kebutuhan tertentu. Pendekatan ini banyak digunakan dalam pengembangan aplikasi modern karena dinilai lebih praktis dan efisien, terutama untuk fitur-fitur umum yang tidak memerlukan logika khusus.

Dalam penggunaannya, COTS membantu mempercepat proses pengembangan karena sebagian besar fungsi dasar sudah tersedia dan siap digunakan. Hal ini memungkinkan tim pengembang untuk lebih fokus pada pengembangan fitur utama yang menjadi nilai unik dari aplikasi yang dibuat. Namun demikian, penggunaan COTS juga perlu dipertimbangkan secara matang, karena tidak semua solusi yang tersedia dapat sepenuhnya menyesuaikan kebutuhan sistem. Selain itu, adanya ketergantungan terhadap vendor juga dapat menjadi kendala jika terjadi perubahan kebijakan atau dukungan terhadap produk tersebut.

Oleh karena itu, pemanfaatan COTS biasanya tidak berdiri sendiri, melainkan dikombinasikan dengan pengembangan kustom agar sistem tetap fleksibel dan sesuai kebutuhan. Dengan strategi ini, pengembang dapat mengambil keuntungan dari kemudahan penggunaan COTS sekaligus menjaga kontrol terhadap bagian sistem yang bersifat kritis. Pendekatan yang seimbang ini menjadi kunci dalam membangun aplikasi yang efisien namun tetap adaptif terhadap perubahan di masa depan.

### Source code 
```py
# app.py
from flask import Flask, render_template, request, jsonify
import json
import os
from datetime import datetime

app = Flask(__name__)

# Path ke file JSON untuk menyimpan data produk
DATA_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data', 'products.json')


def ensure_data_file():
    """Memastikan file JSON dan direktori data ada."""
    os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
    if not os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'w', encoding='utf-8') as f:
            json.dump([], f, indent=2, ensure_ascii=False)


def load_products():
    """Membaca data produk dari file JSON."""
    ensure_data_file()
    try:
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except (json.JSONDecodeError, FileNotFoundError):
        return []


def save_products(products):
    """Menyimpan data produk ke file JSON."""
    ensure_data_file()
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(products, f, indent=2, ensure_ascii=False)


def generate_id(products):
    """Generate ID unik untuk produk baru."""
    if not products:
        return 1
    return max(p['id'] for p in products) + 1

# Selebihnya dapat cek pada file "app.py"
```
🔗 [Klik di sini untuk membuka file `app.py`](app.py)

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Sistem Inventori Toko Kelontong Pak Cik dan Aimar - Kelola produk toko dengan mudah">
    <title>Toko Kelontong Pak Cik & Aimar - Sistem Inventori</title>

    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- DataTables CSS -->
    <link href="https://cdn.datatables.net/1.13.8/css/dataTables.bootstrap5.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <!-- Custom CSS -->
    <link href="{{ url_for('static', filename='css/style.css') }}" rel="stylesheet">
</head>
<body>

    <!-- ============ NAVBAR ============ -->
    <nav class="navbar navbar-expand-lg navbar-dark sticky-top" id="mainNavbar">
        <div class="container">
            <a class="navbar-brand d-flex align-items-center" href="/">
                <div class="brand-icon me-2">
                    <i class="bi bi-shop"></i>
                </div>
                <div>
                    <span class="fw-bold">Toko Kelontong</span>
                    <small class="d-block text-light opacity-75" style="font-size: 0.7rem; margin-top: -3px;">Pak Cik & Aimar</small>
                </div>
            </a>
            <div class="d-flex align-items-center">
                <span class="badge bg-light text-dark px-3 py-2">
                    <i class="bi bi-clock me-1"></i>
                    <span id="currentTime"></span>
                </span>
            </div>
        </div>
    </nav>

    <!-- Selebihnya dapat cek pada file "templates/index.html" -->
```
🔗 [Klik di sini untuk membuka file `index.html`](templates/index.html)


```js
// static/js/app.js
/** @type {string} Base URL untuk API endpoint */
const API_URL = '/api/products';

/** @type {object|null} Instance DataTable */
let dataTable = null;

/** @type {boolean} Flag untuk mode edit */
let isEditMode = false;


// ============================================================
// Document Ready - Inisialisasi Aplikasi
// ============================================================

$(document).ready(function () {
    // Inisialisasi jam real-time
    updateClock();
    setInterval(updateClock, 1000);

    // Muat data produk dan inisialisasi DataTable
    loadProducts();

    // ========================================
    // Event Handlers
    // ========================================

    /**
     * Event: Klik tombol Tambah Produk
     * Menampilkan modal form dalam mode CREATE
     */
    $('#btnAddProduct').on('click', function () {
        isEditMode = false;
        resetForm();
        $('#productModalLabel').html('<i class="bi bi-plus-circle me-2"></i>Tambah Produk Baru');
        $('#btnSaveProduct').html('<i class="bi bi-check-lg me-1"></i>Simpan Produk');
        $('#productModal').modal('show');
    });

    // Selebihnya dapat cek pada file "static/js/app.js"
```
🔗 [Klik di sini untuk membuka file `app.js`](static/js/app.js)

Output:
<img src="toko.png" alt="preview" style="width:100%; max-width:900px;">
<img src="tambahproduk.png" alt="preview" style="width:100%; max-width:900px;">


## Penjelasan
Website ini merupakan sistem inventaris berbasis web untuk Toko Kelontong Pak Cik & Aimar yang dibangun menggunakan Flask sebagai backend, dengan penyimpanan data produk dalam file JSON dan antarmuka CRUD (Create, Read, Update, Delete) yang interaktif. Seluruh operasi data dilakukan secara asinkron menggunakan jQuery AJAX sehingga halaman tidak perlu di-reload, sementara tampilan dibangun responsif dengan Bootstrap dan DataTables untuk pengalaman pengguna yang modern.
