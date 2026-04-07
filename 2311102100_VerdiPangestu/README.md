<div align="center">
  <br />
  <h1>LAPORAN PRAKTIKUM <br> APLIKASI BERBASIS PLATFORM </h1>
  <br />
  <h3>MODUL 6 <br> Web Inventari dengan ExpressJS, jQuery & Bootstrap </h3>
  <br />
  <img width="512" height="512" alt="telyu" src="https://github.com/user-attachments/assets/724a3291-bcf9-448d-a395-3886a8659d79" />
  <br />
  <br />
  <br />
  <h3>Disusun Oleh :</h3>
  <p>
    <strong>Verdi Pangestu</strong>
    <br>
    <strong>2311102100</strong>
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
  <strong>Apri Pandu Wicaksono</strong>
  <br>
  <strong>Hamka Zaenul Ardi</strong>
  <br />
  <h3>LABORATORIUM HIGH PERFORMANCE <br>FAKULTAS INFORMATIKA <br>UNIVERSITAS TELKOM PURWOKERTO <br>2026 </h3>
</div>

<hr>

# Dasar Teori

## 📦 Sistem Inventaris Toko Pak Cik & Mas Aimar

Aplikasi berbasis web sederhana untuk mengelola produk inventaris toko. Aplikasi ini dibangun dengan mengimplementasikan operasi CRUD (Create, Read, Update, Delete) tanpa menggunakan database relasional, melainkan menggunakan sistem penyimpanan berbasis file JSON.

## 🛠️ Tech Stack & Library
* **Backend:** Node.js dengan framework ExpressJS.
* **Database:** Local JSON File (`data.json`).
* **Frontend UI:** HTML5 & Bootstrap 5 (CSS framework).
* **DOM Manipulation & AJAX:** jQuery.

## ✨ Fitur Utama
1.  **Tampilan Datatable Dinamis:** Menampilkan seluruh daftar produk yang ditarik secara asinkron dari backend menggunakan `$.ajax` jQuery.
2.  **Formulir Create & Edit (Modal):** Pengelolaan data dilakukan secara *Single Page Application* menggunakan komponen Modal bawaan Bootstrap.
3.  **Hapus dengan Konfirmasi:** Terdapat modal konfirmasi (peringatan) sebelum produk benar-benar dihapus dari `data.json` untuk mencegah *human error*.

## 🚀 Cara Menjalankan Project
1. Pastikan Anda sudah menginstal [Node.js](https://nodejs.org/).
2. Buka terminal di direktori project ini.
3. Jalankan perintah `npm install` untuk menginstal *dependencies* (Express.js).
4. Jalankan server dengan perintah `node server.js`.
5. Buka browser dan akses URL: `http://localhost:3000`
---

## REST API dan CRUD

REST (Representational State Transfer) adalah arsitektur desain API yang menggunakan HTTP method untuk merepresentasikan operasi:

| Operasi | HTTP Method | Contoh |
|---------|-------------|--------|
| Create  | `POST`      | Tambah produk baru |
| Read    | `GET`       | Ambil semua/satu produk |
| Update  | `PUT`       | Perbarui data produk |
| Delete  | `DELETE`    | Hapus produk |

---
## 1. Struktur Project

```
inventari-toko/
├── data.json
├── server.js
└── public/
    ├── index.html
    └── app.js
```

## 2. ExpressJS (server.js)

File ini berfungsi sebagai API server yang akan membaca dan menulis ke file data.json.
```js
// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const dataPath = path.join(__dirname, 'data.json');

// Middleware
app.use(cors());
app.use(express.json()); // Untuk parsing application/json
app.use(express.static('public')); // Serve file statis frontend

// Helper function untuk baca/tulis JSON
const getProducts = () => JSON.parse(fs.readFileSync(dataPath));
const saveProducts = (data) => fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

// API: Get All Products
app.get('/api/products', (req, res) => {
    res.json(getProducts());
});

// API: Create Product
app.post('/api/products', (req, res) => {
    const products = getProducts();
    const newProduct = {
        id: Date.now().toString(), // Generate ID unik simpel
        nama: req.body.nama,
        kategori: req.body.kategori,
        stok: req.body.stok,
        harga: req.body.harga
    };
    products.push(newProduct);
    saveProducts(products);
    res.status(201).json(newProduct);
});

// API: Update Product
app.put('/api/products/:id', (req, res) => {
    const products = getProducts();
    const index = products.findIndex(p => p.id === req.params.id);
    if (index !== -1) {
        products[index] = { ...products[index], ...req.body };
        saveProducts(products);
        res.json(products[index]);
    } else {
        res.status(404).json({ message: 'Produk tidak ditemukan' });
    }
});

// API: Delete Product
app.delete('/api/products/:id', (req, res) => {
    let products = getProducts();
    products = products.filter(p => p.id !== req.params.id);
    saveProducts(products);
    res.json({ message: 'Produk berhasil dihapus' });
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
```
### 3. Database JSON (data.json)

Buat file data.json di root folder dan isi dengan array kosong atau data dummy awal (termasuk "Suki").

```json
[
    {
        "id": "1",
        "nama": "Paket Suki Spesial",
        "kategori": "Makanan",
        "stok": "15",
        "harga": "55000"
        },
        {
        "id": "1775571903363",
        "nama": "Indomie",
        "kategori": "Makanan",
        "stok": "200",
        "harga": "35000"
    }
]
```
## 4. HTML & Bootstrap (public/index.html)
Ini adalah antarmuka utamanya. Kita memuat Bootstrap 5 untuk styling dan jQuery untuk DOM manipulation.
```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inventaris Toko Pak Cik & Mas Aimar</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">

<div class="container mt-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>📦 Inventaris Toko Pak Cik & Mas Aimar</h2>
        <button class="btn btn-primary" id="btnTambahData">Tambah Produk</button>
    </div>

    <div class="card shadow-sm">
        <div class="card-body">
            <table class="table table-striped table-hover table-bordered mb-0">
                <thead class="table-dark">
                    <tr>
                        <th>No</th>
                        <th>Nama Produk</th>
                        <th>Kategori</th>
                        <th>Stok</th>
                        <th>Harga (Rp)</th>
                        <th width="150px">Aksi</th>
                    </tr>
                </thead>
                <tbody id="tableBody">
                    </tbody>
            </table>
        </div>
    </div>
</div>

<div class="modal fade" id="formModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalTitle">Tambah Produk</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <form id="productForm">
            <input type="hidden" id="productId">
            <div class="mb-3">
                <label>Nama Produk</label>
                <input type="text" class="form-control" id="nama" required>
            </div>
            <div class="mb-3">
                <label>Kategori</label>
                <input type="text" class="form-control" id="kategori" required>
            </div>
            <div class="mb-3">
                <label>Stok</label>
                <input type="number" class="form-control" id="stok" required>
            </div>
            <div class="mb-3">
                <label>Harga</label>
                <input type="number" class="form-control" id="harga" required>
            </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
        <button type="button" class="btn btn-success" id="btnSimpan">Simpan</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="deleteModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header bg-danger text-white">
        <h5 class="modal-title">Konfirmasi Hapus</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        Apakah Anda yakin ingin menghapus produk ini?
        <input type="hidden" id="deleteId">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
        <button type="button" class="btn btn-danger" id="btnKonfirmasiHapus">Hapus</button>
      </div>
    </div>
  </div>
</div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="app.js"></script>

</body>
</html>
```

## 5. jQuery (public/app.js)

File ini menangani semua DOM manipulation (menampilkan tabel, membuka modal) dan AJAX requests ke API ExpressJS.

```js
$(document).ready(function() {
    const API_URL = '/api/products';
    let editMode = false;

    // Fungsi Load Data ke Tabel
    function loadData() {
        $.ajax({
            url: API_URL,
            method: 'GET',
            success: function(data) {
                let rows = '';
                if(data.length === 0) {
                    rows = '<tr><td colspan="6" class="text-center">Belum ada data produk</td></tr>';
                } else {
                    $.each(data, function(index, product) {
                        rows += `
                            <tr>
                                <td>${index + 1}</td>
                                <td>${product.nama}</td>
                                <td>${product.kategori}</td>
                                <td>${product.stok}</td>
                                <td>Rp ${parseInt(product.harga).toLocaleString('id-ID')}</td>
                                <td>
                                    <button class="btn btn-sm btn-warning btn-edit" data-id="${product.id}" data-nama="${product.nama}" data-kategori="${product.kategori}" data-stok="${product.stok}" data-harga="${product.harga}">Edit</button>
                                    <button class="btn btn-sm btn-danger btn-delete" data-id="${product.id}">Hapus</button>
                                </td>
                            </tr>
                        `;
                    });
                }
                $('#tableBody').html(rows);
            }
        });
    }

    // Panggil saat halaman pertama kali diload
    loadData();

    // Trigger Modal Tambah Data
    $('#btnTambahData').click(function() {
        editMode = false;
        $('#productForm')[0].reset();
        $('#productId').val('');
        $('#modalTitle').text('Tambah Produk Baru');
        $('#formModal').modal('show');
    });

    // Trigger Modal Edit Data (Delegation event untuk tombol dinamis)
    $('#tableBody').on('click', '.btn-edit', function() {
        editMode = true;
        $('#modalTitle').text('Edit Produk');
        $('#productId').val($(this).data('id'));
        $('#nama').val($(this).data('nama'));
        $('#kategori').val($(this).data('kategori'));
        $('#stok').val($(this).data('stok'));
        $('#harga').val($(this).data('harga'));
        $('#formModal').modal('show');
    });

    // Aksi Simpan (Bisa Create atau Update)
    $('#btnSimpan').click(function() {
        const productData = {
            nama: $('#nama').val(),
            kategori: $('#kategori').val(),
            stok: $('#stok').val(),
            harga: $('#harga').val()
        };

        if (editMode) {
            // Update via PUT
            const id = $('#productId').val();
            $.ajax({
                url: `${API_URL}/${id}`,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(productData),
                success: function() {
                    $('#formModal').modal('hide');
                    loadData();
                }
            });
        } else {
            // Create via POST
            $.ajax({
                url: API_URL,
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(productData),
                success: function() {
                    $('#formModal').modal('hide');
                    loadData();
                }
            });
        }
    });

    // Trigger Modal Konfirmasi Hapus
    $('#tableBody').on('click', '.btn-delete', function() {
        const id = $(this).data('id');
        $('#deleteId').val(id);
        $('#deleteModal').modal('show');
    });

    // Aksi Konfirmasi Hapus
    $('#btnKonfirmasiHapus').click(function() {
        const id = $('#deleteId').val();
        $.ajax({
            url: `${API_URL}/${id}`,
            method: 'DELETE',
            success: function() {
                $('#deleteModal').modal('hide');
                loadData();
            }
        });
    });
});
```

## Output / Screenshot

<img width="1919" height="1079" alt="Cuplikan layar 2026-04-07 213007" src="https://github.com/user-attachments/assets/25ba6626-9c1b-4933-800e-002c4851fae5" />
