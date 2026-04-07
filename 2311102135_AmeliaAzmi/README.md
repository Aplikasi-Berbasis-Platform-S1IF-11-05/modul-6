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
    <strong>Amelia Azmi</strong>
    <br>
    <strong>2311102135</strong>
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

🔹 JavaScript

JavaScript merupakan bahasa pemrograman yang berfungsi untuk mengatur logika dan perilaku pada halaman web. Dengan JavaScript, halaman web dapat berinteraksi secara langsung dengan pengguna, seperti merespon klik tombol, menampilkan notifikasi, serta memproses data secara dinamis.

JavaScript bekerja dengan mengakses struktur halaman melalui DOM, sehingga memungkinkan perubahan elemen secara real-time tanpa perlu memuat ulang halaman.

🔹 jQuery

jQuery adalah pustaka JavaScript yang dirancang untuk menyederhanakan penulisan kode. Dengan jQuery, proses manipulasi elemen HTML, penanganan event, serta animasi dapat dilakukan dengan lebih singkat dan efisien.

Contoh penggunaan jQuery adalah untuk menampilkan efek animasi seperti fadeIn(), fadeOut(), serta menangani event klik menggunakan .click() atau .on().

🔹 Peran Frontend

Dalam pengembangan web, HTML digunakan sebagai struktur, CSS sebagai tampilan, dan JavaScript sebagai pengatur interaksi. jQuery hadir sebagai alat bantu untuk mempercepat implementasi interaksi tersebut.

---


# Tugas 6
## 1. Source Kode (Menggunakan Laravel)


# 📘 Aplikasi Inventori Toko Kelontong 



## ROUTES (routes/web.php)

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

---

## VIEW (resources/views/products/index.blade.php)

```html
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>Cyber Store</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

<style>
body {
    background: linear-gradient(135deg, #0f172a, #1e3a8a);
    color: white;
}
.card {
    background: rgba(0, 0, 0, 0.6);
    border: 1px solid #3b82f6;
    border-radius: 20px;
}
.btn-main {
    background: linear-gradient(135deg, #3b82f6, #06b6d4);
    color: white;
}
</style>
</head>

<body class="p-4">

<div class="container">

<h2 class="text-center mb-4">⚡ Cyber Store</h2>

<!-- FORM TAMBAH -->
<div class="card p-4 mb-4">
<form method="POST" action="/store">
@csrf
<input name="nama" class="form-control mb-2" placeholder="Produk">
<input name="harga" class="form-control mb-2" placeholder="Harga">
<input name="stok" class="form-control mb-2" placeholder="Stok">
<button class="btn btn-main w-100">Tambah</button>
</form>
</div>

<!-- TABLE -->
<div class="card p-4">
<table class="table table-dark text-center align-middle">
<thead>
<tr>
<th>Nama</th>
<th>Harga</th>
<th>Stok</th>
<th>Aksi</th>
</tr>
</thead>

<tbody>
@foreach($items as $i)
<tr>
<td>{{ $i['nama'] }}</td>
<td>{{ $i['harga'] }}</td>
<td>{{ $i['stok'] }}</td>
<td>

<button 
class="btn btn-info editBtn"
data-id="{{ $i['id'] }}"
data-nama="{{ $i['nama'] }}"
data-harga="{{ $i['harga'] }}"
data-stok="{{ $i['stok'] }}">
Edit
</button>

<form method="POST" action="/delete/{{ $i['id'] }}" style="display:inline;">
@csrf
@method('DELETE')
<button class="btn btn-danger">Hapus</button>
</form>

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

<button class="btn btn-main w-100">Update</button>
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

});
</script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

</body>
</html>

---

## 3. Source Kode (ProductController)

---
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductController extends Controller
{
    private $file = 'products.json';

    // READ JSON
    private function read()
    {
        $path = storage_path('app/' . $this->file);

        if (!file_exists($path)) {
            file_put_contents($path, '[]');
        }

        return json_decode(file_get_contents($path), true);
    }

    // WRITE JSON
    private function write($data)
    {
        $path = storage_path('app/' . $this->file);

        file_put_contents($path, json_encode($data, JSON_PRETTY_PRINT));
    }

    // TAMPIL DATA
    public function index()
    {
        return view('products.index', [
            'items' => $this->read()
        ]);
    }

    // TAMBAH DATA
    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required',
            'harga' => 'required|numeric',
            'stok' => 'required|numeric'
        ]);

        $data = $this->read();

        $data[] = [
            'id'    => uniqid(),
            'nama'  => $request->nama,
            'harga' => $request->harga,
            'stok'  => $request->stok
        ];

        $this->write($data);

        return back();
    }

    // UPDATE DATA
    public function update(Request $request, $id)
    {
        $request->validate([
            'nama' => 'required',
            'harga' => 'required|numeric',
            'stok' => 'required|numeric'
        ]);

        $data = $this->read();

        foreach ($data as &$item) {
            if ($item['id'] == $id) {
                $item['nama']  = $request->nama;
                $item['harga'] = $request->harga;
                $item['stok']  = $request->stok;
            }
        }

        $this->write($data);

        return back();
    }

    // DELETE DATA
    public function delete($id)
    {
        $data = array_filter($this->read(), function ($item) use ($id) {
            return $item['id'] != $id;
        });

        $this->write(array_values($data));

        return back();
    }
}
---

Output:
Tampilan Hasil


# Penjelasan

## 📌 Deskripsi Project

Program ini merupakan aplikasi web sederhana berbasis Laravel yang digunakan untuk mengelola produk digital pada sebuah Cyber Store. Produk yang dikelola meliputi pulsa, paket data, voucher game, serta layanan digital lainnya.

Berbeda dengan aplikasi inventori konvensional, sistem ini tidak menggunakan database, melainkan memanfaatkan file JSON sebagai media penyimpanan data. Hal ini membuat aplikasi lebih ringan dan mudah dikembangkan untuk kebutuhan pembelajaran.

Tujuan utama dari program ini adalah untuk memahami konsep dasar pengembangan aplikasi web, khususnya dalam mengelola data menggunakan metode CRUD (Create, Read, Update, Delete).

Selain itu, program ini juga bertujuan untuk mengimplementasikan penggunaan Laravel sebagai backend framework, Bootstrap sebagai tampilan antarmuka, serta JavaScript dan jQuery untuk menangani interaksi pengguna.