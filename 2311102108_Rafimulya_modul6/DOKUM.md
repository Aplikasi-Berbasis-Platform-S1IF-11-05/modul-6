# Dokumentasi Project: Sistem Inventori Toko Kelontong

## 📋 Daftar Isi
1. [Deskripsi Project](#deskripsi-project)
2. [Tujuan](#tujuan)
3. [Teknologi yang Digunakan](#teknologi-yang-digunakan)
4. [Struktur Project](#struktur-project)
5. [Persyaratan Sistem](#persyaratan-sistem)
6. [Cara Menjalankan](#cara-menjalankan)
7. [Fitur Aplikasi](#fitur-aplikasi)
8. [Keterangan Fitur CRUD](#keterangan-fitur-crud)
9. [Struktur Data JSON](#struktur-data-json)
10. [API Endpoints](#api-endpoints)
11. [Penjelasan Kode](#penjelasan-kode)
12. [Screenshot & Panduan Penggunaan](#screenshot--panduan-penggunaan)

---

## 1. Deskripsi Project

**Sistem Inventori Toko Kelontong Pak Cik & Aimar** adalah aplikasi web responsif yang dirancang untuk mengelola data inventori produk pada toko kelontong. Aplikasi ini menggunakan arsitektur client-side yang ringan dengan penyimpanan data berbasis JSON file, sehingga mudah untuk dideploy tanpa memerlukan database kompleks.

Aplikasi ini cocok untuk:
- Toko kelontong atau warung kecil
- Manajemen stok produk sederhana
- Pembelajaran CRUD operations
- Prototipe sistem inventori

---

## 2. Tujuan

Proyek ini bertujuan untuk:

- ✅ **Mengelola data inventori produk** secara sederhana dan efisien
- ✅ **Menerapkan konsep CRUD** (Create, Read, Update, Delete) dengan baik
- ✅ **Menggunakan jQuery** untuk manipulasi DOM yang dinamis
- ✅ **Menggunakan Bootstrap 5** untuk tampilan UI yang responsif dan professional
- ✅ **Menggunakan JSON** sebagai format penyimpanan data (bukan database)
- ✅ **Menyediakan UX yang intuitif** dengan interface yang user-friendly
- ✅ **Mengimplementasikan validasi data** untuk integritas data
- ✅ **Memberikan feedback visual** kepada pengguna (notifikasi, alert)

---

## 3. Teknologi yang Digunakan

| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| **PHP** | 7.4+ | Backend server-side processing |
| **Bootstrap** | 5.1.3 | Framework CSS untuk styling responsif |
| **jQuery** | 3.6.0 | Library JavaScript untuk DOM manipulation |
| **JSON** | Built-in | Format penyimpanan data |
| **HTML5** | Latest | Markup structure |
| **CSS3** | Latest | Custom styling |

---

## 4. Struktur Project

```
2311102108_Rafimulya_modul6/
│
├── DOKUM.md                              # File dokumentasi project (CURRENT)
├── composer.json                         # Konfigurasi composer (untuk Laravel)
├── .env                                  # File environment configuration
├── artisan                               # Laravel command runner
│
├── bootstrap/
│   └── app.php                           # Bootstrap aplikasi Laravel
│
├── app/                                  # Folder aplikasi (untuk struktur Laravel)
│
├── public/                               # Folder public (akses web)
│   ├── index.php                         # Entry point aplikasi
│   ├── api.php                           # API endpoint untuk JSON operations
│   └── data.json                         # File penyimpanan data produk
│
└── resources/
    └── views/
        └── index.blade.php               # Template view utama (Blade template)
```

---

## 5. Persyaratan Sistem

- **PHP**: 7.4 atau lebih tinggi
- **Server**: Apache, Nginx, atau PHP built-in server
- **Browser**: Modern browser yang support ES6 (Chrome, Firefox, Safari, Edge)
- **Memory**: Minimal 256MB
- **Disk Space**: Minimal 10MB

---

## 6. Cara Menjalankan

### Metode 1: Menggunakan PHP Built-in Server (Recommended untuk development)

```bash
# Navigate ke folder public
cd /path/to/2311102108_Rafimulya_modul6/public

# Jalankan PHP built-in server
php -S localhost:8000

# Buka browser dan akses:
# http://localhost:8000
```

### Metode 2: Menggunakan PHP Artisan (Jika Laravel sudah terinstall)

```bash
# Di folder project root
php artisan serve

# Server akan berjalan di http://127.0.0.1:8000
```

### Metode 3: Menggunakan Apache atau Nginx

1. Set DocumentRoot/root ke folder `public`
2. Ensure PHP modules terinstall
3. Access melalui domain yang dikonfigurasi

---

## 7. Fitur Aplikasi

### 7.1 Dashboard
- 📊 **Statistik Real-time**:
  - Total jumlah produk
  - Total nilai inventori (harga × stok)
- 🎨 **Interface Responsif**: Beradaptasi dengan ukuran layar apapun

### 7.2 Create (Tambah Produk)
- Form input untuk nama, harga, dan stok produk
- Validasi input sebelum ditambahkan
- Feedback visual berupa notifikasi
- Data otomatis tersimpan ke file JSON

### 7.3 Read (Tampil Produk)
- Tabel interaktif yang menampilkan semua produk
- Kolom: No, Nama Produk, Harga, Stok, Nilai Stok
- Sorting dan filtering mudah dilakukan
- Pesan "Belum ada produk" jika tabel kosong

### 7.4 Update (Edit Produk)
- Modal dialog untuk editing data produk
- Validasi input data
- Live update tabel setelah perubahan
- Auto-save ke JSON file

### 7.5 Delete (Hapus Produk)
- Konfirmasi sebelum menghapus (prevent accidental deletion)
- Notifikasi sukses setelah penghapusan
- Data realtime di-update ke file JSON

---

## 8. Keterangan Fitur CRUD

### CREATE
```javascript
// Tambah produk via form
$('#formTambah').submit(function(e) {
    // Validasi input
    // Tambah ke array produk
    // Simpan ke JSON
    // Refresh tampilan
});
```

### READ
```javascript
// Load data dari JSON file
function loadData() {
    $.ajax({
        url: '/api.php',      // Endpoint API
        method: 'GET',
        dataType: 'json'
        // Returns array dari JSON file
    });
}
```

### UPDATE
```javascript
// Edit produk
function editProduk(index) {
    // Buka modal dengan data existing
    // Update array di memory
    // Simpan kembali ke JSON
}
```

### DELETE
```javascript
// Hapus produk
function hapusProduk(index) {
    // Konfirmasi user
    // Remove dari array
    // Simpan ke JSON
    // Refresh display
}
```

---

## 9. Struktur Data JSON

### File: `public/data.json`

Format data JSON yang digunakan:

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

### Skema Data:

| Field | Type | Deskripsi | Validasi |
|-------|------|-----------|----------|
| `nama` | String | Nama produk | Wajib, max 100 karakter |
| `harga` | Integer | Harga per unit (Rp) | Wajib, > 0 |
| `stok` | Integer | Jumlah stok | Wajib, ≥ 0 |

---

## 10. API Endpoints

### GET `/api.php`
**Tujuan**: Mengambil semua data produk dari file JSON

```bash
curl http://localhost:8000/api.php
```

**Response (200 OK)**:
```json
[
  {"nama": "Indomie", "harga": 3000, "stok": 50}
]
```

### POST `/api.php`
**Tujuan**: Menyimpan data produk ke file JSON

```bash
curl -X POST http://localhost:8000/api.php \
  -H "Content-Type: application/json" \
  -d '{"data": [{"nama": "Indomie", "harga": 3000, "stok": 50}]}'
```

**Request Body**:
```json
{
  "data": [
    {"nama": "Indomie", "harga": 3000, "stok": 50}
  ]
}
```

**Response (200 OK)**:
```json
{"status": "success", "message": "Data tersimpan ke JSON"}
```

**Response (500 Error)**:
```json
{"status": "error", "message": "Gagal menyimpan data"}
```

---

## 11. Penjelasan Kode

### 11.1 Frontend - jQuery DOM Manipulation

**File**: `resources/views/index.blade.php`

```javascript
// 1. LOAD DATA (READ)
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

// 2. RENDER TABEL
function render() {
    // Clear tabel
    tbody.empty();
    
    // Iterate produk array
    produk.forEach((item, index) => {
        // Create row HTML
        // Append ke tbody
    });
    
    // Update statistik
}

// 3. FORM SUBMIT (CREATE)
$('#formTambah').submit(function(e) {
    e.preventDefault();
    
    // Get form values
    const nama = $('#inputNama').val().trim();
    const harga = parseInt($('#inputHarga').val());
    const stok = parseInt($('#inputStok').val());
    
    // Validate
    if (!nama || harga <= 0 || stok < 0) {
        showNotification('Data invalid', 'warning');
        return;
    }
    
    // Add to array
    produk.push({ nama, harga, stok });
    
    // Save to JSON
    saveData();
    
    // Reset form & render
    this.reset();
    render();
});

// 4. EDIT MODAL
function editProduk(index) {
    const item = produk[index];
    $('#editNama').val(item.nama);
    $('#editHarga').val(item.harga);
    $('#editStok').val(item.stok);
    modal.show();
}

// 5. SAVE CHANGES (UPDATE)
$('#btnSimpanEdit').click(function() {
    const index = parseInt($('#editIndex').val());
    produk[index] = {
        nama: $('#editNama').val().trim(),
        harga: parseInt($('#editHarga').val()),
        stok: parseInt($('#editStok').val())
    };
    saveData();
    modal.hide();
    render();
});

// 6. DELETE
function hapusProduk(index) {
    if (confirm('Yakin ingin menghapus?')) {
        produk.splice(index, 1);
        saveData();
        render();
    }
}

// 7. SAVE TO JSON
function saveData() {
    $.ajax({
        url: '/api.php',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ data: produk }),
        success: function(response) {
            showNotification('Data tersimpan!', 'success');
        }
    });
}
```

### 11.2 Backend - PHP API

**File**: `public/api.php`

```php
<?php
header('Content-Type: application/json');

$dataFile = __DIR__ . '/data.json';

// GET: Baca data
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($dataFile)) {
        echo file_get_contents($dataFile);
    } else {
        echo json_encode([]);
    }
}

// POST: Simpan data
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (isset($input['data'])) {
        // Validasi & sanitize
        $data = array_map(function($item) {
            return [
                'nama' => sanitize($item['nama']),
                'harga' => (int)$item['harga'],
                'stok' => (int)$item['stok']
            ];
        }, $input['data']);
        
        // Simpan ke file
        if (file_put_contents($dataFile, json_encode($data))) {
            echo json_encode(['status' => 'success']);
        }
    }
}

function sanitize($str) {
    return htmlspecialchars(strip_tags(trim($str)), ENT_QUOTES, 'UTF-8');
}
```

### 11.3 Bootstrap CSS

**Komponen yang digunakan:**
- `.container`: Layout container
- `.card`: Card component
- `.table`: Table styling
- `.btn`: Button styling
- `.modal`: Modal dialog
- `.form-control`: Form input
- `.alert`: Alert/notification
- `.badge`: Status badge
- Responsive grid: `.row`, `.col-md-*`

---

## 12. Screenshot & Panduan Penggunaan

### Panduan Penggunaan Step-by-Step:

#### **Step 1: Menambah Produk Baru**
1. Scroll ke bagian "Tambah Produk Baru" (form sebelah kiri)
2. Masukkan nama produk (contoh: "Indomie")
3. Masukkan harga per unit (contoh: 3000)
4. Masukkan jumlah stok (contoh: 50)
5. Klik tombol **"Tambah Produk"**
6. Notifikasi "Produk berhasil disimpan!" akan tampil
7. Produk langsung muncul di tabel bawah

#### **Step 2: Melihat Daftar Produk**
- Lihat tabel "Daftar Produk" yang menampilkan:
  - Nomor urut
  - Nama produk
  - Harga per unit
  - Jumlah stok
  - Nilai stok (harga × stok)
- Update statistik di sebelah kanan menunjukkan:
  - Total produk
  - Total nilai inventori

#### **Step 3: Mengedit Produk**
1. Di tabel, cari produk yang ingin diubah
2. Klik tombol **"Edit"** (ikon ✏️)
3. Modal dialog "Edit Produk" akan terbuka
4. Ubah data sesuai kebutuhan
5. Klik **"Simpan Perubahan"**
6. Data di tabel akan terupdate secara realtime

#### **Step 4: Menghapus Produk**
1. Di tabel, cari produk yang ingin dihapus
2. Klik tombol **"Hapus"** (ikon 🗑️)
3. Konfirmasi dialog akan muncul: "Yakin ingin menghapus produk ini?"
4. Klik **"OK"** untuk confirm
5. Produk akan dihapus dan tabel terupdate

#### **Step 5: Melihat Statistik**
- Panel statistik di kanan atas menampilkan:
  - 🔵 **Total Produk**: Jumlah jenis produk
  - 🟢 **Total Nilai Stok**: Jumlah uang dalam stok (harga × qty)

#### **Fitur Tambahan:**
- ✅ Data otomatis tersimpan ke file `data.json` setiap kali ada perubahan
- ✅ Reload halaman/browser, data tetap ada (persistent)
- ✅ Responsif di mobile, tablet, dan desktop
- ✅ Validasi input mencegah data invalid
- ✅ Notifikasi real-time untuk feedback user

---

## 📝 Kesimpulan

Aplikasi **Sistem Inventori Toko Kelontong** ini adalah solusi sederhana namun efektif untuk mengelola stok produk. Dengan menggunakan:

- ✅ **jQuery** untuk manipulasi DOM yang dinamis dan responsif
- ✅ **Bootstrap 5** untuk UI/UX professional dan responsive
- ✅ **JSON** untuk penyimpanan data yang fleksibel
- ✅ **PHP API** untuk komunikasi data client-server

Aplikasi ini mudah dipahami, mudah digunakan, dan mudah untuk dikembangkan lebih lanjut.

### Pengembangan Lebih Lanjut (Future Enhancement):
- Tambah fitur filter/search produk
- Implementasi database (MySQL/PostgreSQL)
- Authentication/login system
- Export data ke Excel/PDF
- Chart & analytics
- Multi-category products
- Barcode scanner integration

---

**Dibuat oleh**: Rafimulya (2311102108)  
**Tanggal**: April 2026  
**Status**: Completed ✅