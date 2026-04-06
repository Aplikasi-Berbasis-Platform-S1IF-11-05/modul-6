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
    <strong>Rasyid Nafsyarie</strong>
    <br>
    <strong>2311102011</strong>
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


### Source code 
```js
//app.js
const express = require('express');
const app = express();
const productRoutes = require('./routes/productRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use('/products', productRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

```

```js
//productController.js
const fs = require('fs');
const path = './data/products.json';

const getAll = (req, res) => {
  const data = JSON.parse(fs.readFileSync(path));
  res.json(data);
};

const create = (req, res) => {
  const data = JSON.parse(fs.readFileSync(path));

  console.log("BODY:", req.body);

  const newProduct = {
    id: Date.now(),
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock
  };

// Selebihnya dapat cek pada file "productController.js"
```
🔗 [Klik di sini untuk membuka file `productController.js`](controllers/productController.js)

```js
//productRoutes.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/productController');

router.get('/', ctrl.getAll);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
  };
```

```html
<!DOCTYPE html>
<html>
<head>
  <title>Toko Pak Cik</title>

  <!-- Bootstrap -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

  <style>
    body {
      background: #f5f7fa;
    }

    .card {
      border-radius: 15px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }

    .btn {
      border-radius: 10px;
    }

    table tbody tr:hover {
      background: #f1f1f1;
      transition: 0.3s;
    }
  </style>
</head>

<body class="container mt-5">

<div class="card p-4">
  <div class="d-flex justify-content-between align-items-center mb-3">
    <h3>🛒 Inventori Toko Pak Cik</h3>
    <button class="btn btn-primary" onclick="openAddModal()">+ Tambah Produk</button>
  </div>

  <table class="table table-striped text-center">
    <thead class="table-dark">
      <tr>
        <th>Nama</th>
        <th>Harga</th>
        <th>Stock</th>
        <th>Aksi</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>
</div>
<!-- Selebihnya dapat cek pada file "index.html" -->
```
🔗 [Klik di sini untuk membuka file `index.html`](public/index.html)

```js
let selectedId = null;

function loadData() {
  $.get('/products', function(data) {
    let rows = '';

    data.forEach(p => {
      rows += `
        <tr>
          <td><strong>${p.name}</strong></td>
          <td>Rp ${p.price}</td>
          <td><span class="badge bg-success">${p.stock}</span></td>
          <td>
            <button class="btn btn-warning btn-sm" onclick="openEditModal(${p.id}, '${p.name}', ${p.price}, ${p.stock})">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="confirmDelete(${p.id})">Delete</button>
          </td>
        </tr>
      `;
    });

    $('tbody').html(rows);
  });
}
//Selebihnya dapat cek pada file "public/js/app.js"
```
🔗 [Klik di sini untuk membuka file `app.js`](public/js/app.js)

Output:
<img src="Screenshot (1092).png" alt="preview" style="width:100%; max-width:900px;">
<img src="Screenshot (1093).png" alt="preview" style="width:100%; max-width:900px;">


## Penjelasan
Project ini menggunakan Express.js sebagai backend untuk mengelola data produk melalui API, serta frontend JavaScript untuk menampilkan dan memanipulasi data secara dinamis. Sistem terhubung dengan database MySQL sehingga data produk dapat disimpan, ditampilkan, dan dihapus secara real-time.