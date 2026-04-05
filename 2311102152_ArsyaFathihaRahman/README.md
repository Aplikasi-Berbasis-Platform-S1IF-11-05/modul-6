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
    <strong>Arsya Fathiha Rahman</strong>
    <br>
    <strong>2311102152</strong>
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

# Dasar Teori
## 📚 Dasar Teori

### 🔹 Laravel
Laravel adalah framework PHP yang menggunakan konsep MVC (Model-View-Controller).  
Framework ini mempermudah pengembangan aplikasi web dengan struktur kode yang rapi dan terorganisir.

Dalam project ini, Laravel digunakan untuk:
- Mengatur routing
- Mengelola data melalui controller
- Menampilkan data melalui view (Blade)

---

### 🔹 JavaScript
JavaScript adalah bahasa pemrograman yang digunakan untuk membuat website menjadi interaktif.  
Dalam aplikasi ini, JavaScript digunakan untuk menangani event seperti klik tombol dan interaksi user.

---

### 🔹 jQuery
jQuery adalah library JavaScript yang mempermudah manipulasi DOM dan event handling.

Contoh penggunaan:
```javascript
$('.editBtn').click(function(){
    // aksi edit
});


---


# Tugas 6
## 1. Source Kode (Menggunakan Laravel)


# 📘 Aplikasi Inventori Toko Kelontong Pak Cik dan Aimar

## 📌 Deskripsi

Aplikasi ini merupakan sistem inventori sederhana berbasis web yang digunakan untuk mengelola data produk pada toko kelontong Pak Cik dan Aimar.
Aplikasi dibangun menggunakan Laravel dengan penyimpanan data berbasis JSON (tanpa database).

---

## ⚙️ Teknologi

* Laravel
* JavaScript
* jQuery
* Bootstrap
* JSON

---

## 📂 Struktur Folder

```
toko-kelontong/
├── app/Http/Controllers/ProductController.php
├── resources/views/products/index.blade.php
├── routes/web.php
├── storage/products.json
```

---

## 🚀 ROUTES (routes/web.php)

```php
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

Route::get('/', [ProductController::class, 'index']);
Route::post('/store', [ProductController::class, 'store']);
Route::post('/update/{id}', [ProductController::class, 'update']);
Route::delete('/delete/{id}', [ProductController::class, 'delete']);
```

---

## 🎮 CONTROLLER (app/Http/Controllers/ProductController.php)

```php
<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;

class ProductController extends Controller
{
    private $file = 'products.json';

    private function getData() {
        if (!file_exists(storage_path($this->file))) {
            file_put_contents(storage_path($this->file), '[]');
        }
        return json_decode(file_get_contents(storage_path($this->file)), true);
    }

    private function saveData($data) {
        file_put_contents(storage_path($this->file), json_encode($data, JSON_PRETTY_PRINT));
    }

    public function index() {
        return view('products.index', ['products' => $this->getData()]);
    }

    public function store(Request $r) {
        $data = $this->getData();

        $data[] = [
            'id' => time(),
            'nama' => $r->nama,
            'harga' => $r->harga,
            'stok' => $r->stok
        ];

        $this->saveData($data);
        return back();
    }

    public function update(Request $r, $id) {
        $data = $this->getData();

        foreach ($data as &$d) {
            if ($d['id'] == $id) {
                $d['nama'] = $r->nama;
                $d['harga'] = $r->harga;
                $d['stok'] = $r->stok;
            }
        }

        $this->saveData($data);
        return back();
    }

    public function delete($id) {
        $data = array_filter($this->getData(), fn($d) => $d['id'] != $id);
        $this->saveData(array_values($data));
        return back();
    }
}
```

---

## 📄 JSON (storage/products.json)

```json
[]
```

---

## 🎨 VIEW (resources/views/products/index.blade.php)

```html
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>Toko Pak Cik & Aimar</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

<style>
body {
    background: linear-gradient(135deg, #ffe4ec, #ffc2d1);
}
.card {
    border-radius: 20px;
}
.btn-custom {
    background: linear-gradient(135deg, #f472b6, #fb7185);
    color: white;
}
</style>
</head>

<body class="p-4">

<div class="container">

<h2 class="text-center mb-4">🛒 Toko Pak Cik & Aimar</h2>

<!-- FORM -->
<div class="card p-4 mb-4">
<form method="POST" action="/store">
@csrf
<input name="nama" class="form-control mb-2" placeholder="Nama Produk">
<input name="harga" class="form-control mb-2" placeholder="Harga">
<input name="stok" class="form-control mb-2" placeholder="Stok">
<button class="btn btn-custom w-100">Tambah Produk</button>
</form>
</div>

<!-- TABLE -->
<div class="card p-4">
<table class="table table-bordered text-center">
<thead>
<tr>
<th>Nama</th>
<th>Harga</th>
<th>Stok</th>
<th>Aksi</th>
</tr>
</thead>

<tbody>
@foreach($products as $p)
<tr>
<td>{{ $p['nama'] }}</td>
<td>Rp {{ number_format($p['harga']) }}</td>
<td>{{ $p['stok'] }}</td>
<td>

<button class="btn btn-warning editBtn"
data-id="{{ $p['id'] }}"
data-nama="{{ $p['nama'] }}"
data-harga="{{ $p['harga'] }}"
data-stok="{{ $p['stok'] }}">
Edit
</button>

<button class="btn btn-danger deleteBtn"
data-id="{{ $p['id'] }}">
Hapus
</button>

</td>
</tr>
@endforeach
</tbody>
</table>
</div>

</div>

<!-- MODAL EDIT -->
<div class="modal fade" id="editModal">
<div class="modal-dialog">
<div class="modal-content p-3">
<form method="POST" id="editForm">
@csrf
<input name="nama" id="editNama" class="form-control mb-2">
<input name="harga" id="editHarga" class="form-control mb-2">
<input name="stok" id="editStok" class="form-control mb-2">
<button class="btn btn-primary w-100">Update</button>
</form>
</div>
</div>
</div>

<!-- MODAL DELETE -->
<div class="modal fade" id="deleteModal">
<div class="modal-dialog">
<div class="modal-content p-3 text-center">
<h5>Yakin hapus?</h5>
<form method="POST" id="deleteForm">
@csrf
@method('DELETE')
<button class="btn btn-danger w-100 mt-2">Hapus</button>
</form>
</div>
</div>
</div>

<script>
$(document).ready(function(){

$('.editBtn').click(function(){
$('#editNama').val($(this).data('nama'));
$('#editHarga').val($(this).data('harga'));
$('#editStok').val($(this).data('stok'));

$('#editForm').attr('action','/update/'+$(this).data('id'));
$('#editModal').modal('show');
});

$('.deleteBtn').click(function(){
$('#deleteForm').attr('action','/delete/'+$(this).data('id'));
$('#deleteModal').modal('show');
});

});
</script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

</body>
</html>
```

---

## ▶️ Cara Menjalankan

```bash
php artisan serve
```

Buka:

```
http://127.0.0.1:8000
```

---



Output:

# Penjelasan

## 📌 Deskripsi Project
Project ini merupakan aplikasi web inventori sederhana yang dibuat menggunakan **Laravel**.  
Fungsinya untuk mengelola data produk pada toko kelontong milik Pak Cik dan Aimar.

Berbeda dengan aplikasi pada umumnya, project ini **tidak menggunakan database**, melainkan menyimpan data dalam bentuk **file JSON**. Hal ini dilakukan untuk menyesuaikan dengan kebutuhan tugas sekaligus memahami konsep dasar penyimpanan data secara sederhana.

Selain itu, project ini juga mengimplementasikan **jQuery** untuk manipulasi DOM dan **Bootstrap** untuk tampilan agar lebih rapi dan profesional.

---

## 🎯 Tujuan
- Memahami konsep CRUD (Create, Read, Update, Delete)
- Menggunakan Laravel sebagai backend framework
- Mengimplementasikan jQuery untuk interaksi user
- Menggunakan Bootstrap untuk styling
- Mengelola data tanpa database (menggunakan JSON)

---

## ⚙️ Fitur Utama

### 1. Tambah Produk (Create)
User dapat menambahkan produk baru dengan mengisi:
- Nama produk
- Harga
- Stok

Data akan langsung disimpan ke file JSON.

---

### 2. Tampilkan Produk (Read)
Semua data produk ditampilkan dalam bentuk tabel.

Tabel ini berisi:
- Nama produk
- Harga
- Stok
- Aksi (Edit & Delete)

---

### 3. Edit Produk (Update)
- User klik tombol **Edit**
- Muncul modal form
- Data lama otomatis muncul (menggunakan jQuery)
- Setelah diubah, data akan diperbarui di file JSON

---

### 4. Hapus Produk (Delete)
- User klik tombol **Delete**
- Muncul konfirmasi modal
- Jika disetujui, data akan dihapus dari JSON

---

## 🧠 Cara Kerja Sistem

1. Saat halaman dibuka, Laravel membaca file `products.json`
2. Data JSON diubah menjadi array
3. Data ditampilkan ke tabel (Blade)
4. Saat user melakukan aksi:
   - Tambah → data ditambahkan ke JSON
   - Edit → data diperbarui
   - Delete → data dihapus
5. File JSON akan diupdate setiap ada perubahan

---

