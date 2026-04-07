<div align="center">
  <br />
  <h1>LAPORAN PRAKTIKUM <br> APLIKASI BERBASIS PLATFORM </h1>
  <br />
  <h3>MODUL 6 <br> JAVASCRIPT & JQUERY </h3>
  <br />
  <img width="512" height="512" alt="telyu" src="https://github.com/user-attachments/assets/724a3291-bcf9-448d-a395-3886a8659d79" />
  <br />
  <br />
  <br />
  <h3>Disusun Oleh :</h3>
  <p>
    <strong>Rafi Mulya Rizqi</strong>
    <br>
    <strong>2311102108</strong>
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

# Dasar Teori Javascript & JQUERY

## Pengertian Javascript
JavaScript adalah bahasa pemrograman yang digunakan untuk membuat halaman web menjadi interaktif dan dinamis. JavaScript berjalan di sisi client (browser), sehingga dapat memanipulasi elemen HTML dan CSS secara langsung tanpa perlu reload halaman.

## Pengertian JQUERY
jQuery adalah library JavaScript yang dibuat untuk menyederhanakan penulisan kode JavaScript, terutama dalam manipulasi DOM, event handling, dan AJAX.

Dengan jQuery, penulisan kode menjadi lebih singkat dan mudah dibanding JavaScript biasa.

JavaScript adalah bahasa utama untuk membuat web menjadi interaktif, sedangkan jQuery adalah library yang membantu menyederhanakan penggunaan JavaScript. Keduanya sering digunakan bersama dalam pengembangan web untuk meningkatkan efisiensi dan kemudahan dalam coding.

---

# Sistem Inventori Toko Kelontong

## 📋 Deskripsi Project
Aplikasi web untuk mengelola inventori produk toko kelontong dengan menggunakan teknologi **JavaScript, jQuery, Bootstrap, dan JSON storage**. Aplikasi ini menerapkan konsep CRUD (Create, Read, Update, Delete) dengan interface yang responsif dan user-friendly.

---

## 🔧 Teknologi yang Digunakan

| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| **PHP** | 7.4+ | Backend server-side processing |
| **Bootstrap** | 5.1.3 | Framework CSS untuk styling responsif |
| **jQuery** | 3.6.0 | Library JavaScript untuk DOM manipulation |
| **JSON** | Built-in | Format penyimpanan data |
| **HTML5** | Latest | Markup structure |
| **CSS3** | Latest | Custom styling |

---

## 📁 Struktur Project

```
2311102108_Rafimulya_modul6/
├── README.md
├── DOKUM.md
├── public/
│   ├── index.php          # Entry point aplikasi
│   ├── api.php            # API endpoint untuk JSON operations
│   └── data.json          # File penyimpanan data produk
└── resources/views/
    └── index.blade.php    # Template view dengan jQuery & Bootstrap
```

---

## 🚀 Cara Menjalankan

### 1. Navigasi ke folder project
```bash
cd /Users/rafimulya/Desktop/2311102108_Rafimulya_modul6/public
```

### 2. Jalankan PHP built-in server
```bash
php -S localhost:8000
```

### 3. Buka browser dan akses
```
http://localhost:8000
```

---

## 💻 Source Code

### Backend: API Endpoint (api.php)

```php
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
?>
```

🔗 [Klik di sini untuk membuka file lengkap `api.php`](public/api.php)

---

### Frontend: HTML & Bootstrap (index.blade.php - bagian struktur)

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistem Inventori Toko Kelontong</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background-color: #f8f9fa;
        }
        .container-main {
            margin-top: 20px;
        }
        .card {
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .table-hover tbody tr:hover {
            background-color: #f5f5f5;
        }
    </style>
</head>

<body>
    <div class="container container-main">
        <div class="row">
            <div class="col-md-12">
                <h2 class="mb-4">📦 Sistem Inventori Toko Kelontong Pak Cik & Aimar</h2>
            </div>
        </div>

        <!-- Form Tambah Produk -->
        <div class="row mb-4">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header bg-primary text-white">
                        <h5 class="mb-0">Tambah Produk Baru</h5>
                    </div>
                    <div class="card-body">
                        <form id="formTambah">
                            <div class="mb-3">
                                <label class="form-label">Nama Produk</label>
                                <input type="text" class="form-control" id="inputNama" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Harga</label>
                                <input type="number" class="form-control" id="inputHarga" min="0" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Stok</label>
                                <input type="number" class="form-control" id="inputStok" min="0" required>
                            </div>
                            <button type="submit" class="btn btn-primary w-100">Tambah Produk</button>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Statistik -->
            <div class="col-md-6">
                <div class="card bg-info text-white mb-3">
                    <div class="card-body">
                        <h5 class="card-title">Total Produk</h5>
                        <h2 id="totalProduk">0</h2>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tabel Daftar Produk -->
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header bg-success text-white">
                        <h5 class="mb-0">Daftar Produk</h5>
                    </div>
                    <div class="card-body">
                        <table class="table table-hover">
                            <thead class="table-light">
                                <tr>
                                    <th>No</th>
                                    <th>Nama</th>
                                    <th>Harga</th>
                                    <th>Stok</th>
                                    <th>Nilai Stok</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody id="tbody"></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
```

🔗 [Klik di sini untuk membuka file lengkap `index.blade.php`](resources/views/index.blade.php)

---

### Frontend: jQuery DOM Manipulation (index.blade.php - bagian script)

```js
// Load data dari JSON file menggunakan jQuery AJAX
function loadData() {
    $.ajax({
        url: '/api.php',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            produk = Array.isArray(data) ? data : [];
            render();
        }
    });
}

// Simpan data ke JSON file (via API)
function saveData() {
    $.ajax({
        url: '/api.php',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ data: produk }),
        success: function(response) {
            console.log('Data tersimpan ke JSON:', response);
        }
    });
}

// Render tabel dengan jQuery
function render() {
    const tbody = $('#tbody');
    tbody.empty();

    let no = 1;
    let totalNilai = 0;

    produk.forEach((item, index) => {
        const nilaiStok = item.harga * item.stok;
        totalNilai += nilaiStok;

        const row = `
            <tr>
                <td>${no++}</td>
                <td><strong>${item.nama}</strong></td>
                <td>Rp ${parseInt(item.harga).toLocaleString('id-ID')}</td>
                <td><span class="badge bg-info">${item.stok}</span></td>
                <td>Rp ${parseInt(nilaiStok).toLocaleString('id-ID')}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editProduk(${index})">✏️ Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="hapusProduk(${index})">🗑️ Hapus</button>
                </td>
            </tr>
        `;
        tbody.append(row);
    });

    $('#totalProduk').text(produk.length);
}

// Tambah produk dengan form submit
$('#formTambah').submit(function(e) {
    e.preventDefault();

    const nama = $('#inputNama').val().trim();
    const harga = parseInt($('#inputHarga').val());
    const stok = parseInt($('#inputStok').val());

    if (!nama || harga <= 0 || stok < 0) {
        alert('Masukkan data yang valid!');
        return;
    }

    produk.push({ nama, harga, stok });
    saveData();
    this.reset();
    render();
});

// Edit produk
function editProduk(index) {
    const item = produk[index];
    const nama = prompt('Nama Produk:', item.nama);
    const harga = prompt('Harga:', item.harga);
    const stok = prompt('Stok:', item.stok);

    if (nama && harga && stok) {
        produk[index] = { nama, harga: parseInt(harga), stok: parseInt(stok) };
        saveData();
        render();
    }
}

// Hapus produk
function hapusProduk(index) {
    if (confirm('Yakin ingin menghapus?')) {
        produk.splice(index, 1);
        saveData();
        render();
    }
}

// Load data saat halaman terbuka
$(document).ready(function() {
    loadData();
});
```

🔗 [Klik di sini untuk membuka file lengkap `index.blade.php`](resources/views/index.blade.php)

---

## 📊 Data JSON Format (data.json)

```json
[
  {
    "nama": "Indomie",
    "harga": 3000,
    "stok": 50
  },
  {
    "nama": "Mie Sedaap",
    "harga": 3500,
    "stok": 30
  },
  {
    "nama": "Teh Pucuk",
    "harga": 5000,
    "stok": 25
  }
]
```

🔗 [Klik di sini untuk membuka file `data.json`](public/data.json)

---

## ✨ Fitur Aplikasi

### CREATE (Tambah Produk)
- Form input untuk nama, harga, dan stok
- Validasi input data sebelum ditambahkan
- Data otomatis tersimpan ke file JSON

### READ (Tampil Produk)
- Tabel interaktif menampilkan semua produk
- Kolom: No, Nama, Harga, Stok, Nilai Stok, Aksi
- Statistik real-time (Total Produk)

### UPDATE (Edit Produk)
- Edit data produk dengan prompt dialog
- Validasi input sebelum menyimpan
- Live update tabel setelah perubahan

### DELETE (Hapus Produk)
- Konfirmasi dialog sebelum menghapus
- Realtime update ke file JSON

---

## 🎯 API Endpoints

### GET `/api.php`
Mengambil semua data produk dari file JSON

```bash
curl http://localhost:8000/api.php
```

### POST `/api.php`
Menyimpan data produk ke file JSON

```bash
curl -X POST http://localhost:8000/api.php \
  -H "Content-Type: application/json" \
  -d '{"data": [{"nama": "Indomie", "harga": 3000, "stok": 50}]}'
```

---

## 📝 Penjelasan Teknis

Project ini menggunakan **PHP sebagai backend** untuk mengelola operasi data pada file JSON, serta **jQuery dan Bootstrap di frontend** untuk menampilkan dan memanipulasi data secara dinamis dan responsif.

### Implementasi jQuery untuk DOM Manipulation:
✅ `$.ajax()` - komunikasi dengan backend API
✅ `$('#selector')` - DOM element selection
✅ `.val()` - get/set input values
✅ `.empty()` - clear table content
✅ `.append()` - add rows to table
✅ `.submit()` - form submission handling
✅ `$(document).ready()` - page ready event

### Implementasi Bootstrap untuk Styling:
✅ Grid system (`.row`, `.col-md-*`)
✅ Card component (`.card`, `.card-header`, `.card-body`)
✅ Table styling (`.table`, `.table-hover`, `.table-light`)
✅ Form controls (`.form-control`, `.form-label`, `.form-select`)
✅ Buttons (`.btn`, `.btn-primary`, `.btn-danger`)
✅ Badges (`.badge`, `.bg-info`, `.bg-success`)
✅ Responsive utilities (`.text-center`, `.mb-3`, etc)

### Penyimpanan Data JSON:
✅ File `data.json` di folder `public/`
✅ AJAX POST untuk save data
✅ AJAX GET untuk load data
✅ PHP sanitasi input untuk keamanan
✅ Pretty-printed JSON untuk readability

---

## 📚 Dokumentasi Lengkap

Untuk dokumentasi lebih detail tentang project ini, silakan baca file [DOKUM.md](DOKUM.md)

---

## 📄 Lisensi

Copyright © 2026 - Rafi Mulya Rizqi | Universitas Telkom Purwokerto

---

**Status**: ✅ Completed
**Versi**: 1.0
**Update Terakhir**: April 2026