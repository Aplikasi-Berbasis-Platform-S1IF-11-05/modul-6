<div align="center">
  <br />
  <h1>LAPORAN PRAKTIKUM <br> APLIKASI BERBASIS PLATFORM </h1>
  <br />
  <h3>MODUL 6 <br> CODING ON THE SPOT </h3>
  <br />
  <img width="512" height="512" alt="telyu" src="https://github.com/user-attachments/assets/724a3291-bcf9-448d-a395-3886a8659d79" />
  <br />
  <br />
  <br />
  <h3>Disusun Oleh :</h3>
  <p>
    <strong>Anisah Syifa Mustika Riyanto</strong>
    <br>
    <strong>2311102080</strong>
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
  <h3>LABORATORIUM HIGH PERFORMANCE <br>FAKULTAS INFORMATIKA <br>UNIVERSITAS TELKOM PURWOKERTO <br>2026</h3>
</div>

<hr>

### Dasar Teori

Pada modul COTS (Coding On The Spot), pengembangan aplikasi dilakukan dengan memanfaatkan integrasi antara sisi backend dan frontend yang sama-sama menggunakan JavaScript. Materi yang dipelajari mencakup berbagai aspek penting dalam pengembangan web, seperti konsep dasar pemrograman, penggunaan framework, library, serta pemanfaatan tools pendukung untuk meningkatkan efisiensi dan kualitas pengembangan aplikasi.

1. Aplikasi Berbasis Web

Aplikasi berbasis web merupakan aplikasi yang dapat diakses melalui browser tanpa perlu instalasi di perangkat pengguna. Aplikasi ini terdiri dari dua bagian utama, yaitu frontend (client-side) yang berinteraksi langsung dengan pengguna, dan backend (server-side) yang bertugas mengelola data serta logika aplikasi. Komunikasi antara frontend dan backend biasanya dilakukan melalui HTTP request dan response.

2. CRUD (Create, Read, Update, Delete)

CRUD merupakan konsep dasar dalam pengelolaan data pada sebuah aplikasi. CRUD terdiri dari:

Create: Menambahkan data baru
Read: Menampilkan atau membaca data
Update: Mengubah data yang sudah ada
Delete: Menghapus data

Pada aplikasi ini, konsep CRUD diterapkan untuk mengelola data produk pada toko kelontong, seperti menambah produk baru, melihat daftar produk, mengedit data, dan menghapus produk.

3. JavaScript

JavaScript merupakan bahasa pemrograman yang digunakan untuk membuat halaman web menjadi interaktif. Dalam aplikasi ini, JavaScript digunakan untuk mengatur logika program seperti pengolahan data, pengambilan input dari pengguna, serta komunikasi dengan server.

JavaScript juga mendukung penggunaan asynchronous programming yang memungkinkan pengambilan data dari server tanpa harus memuat ulang halaman.

4. jQuery

jQuery adalah library JavaScript yang digunakan untuk menyederhanakan penulisan kode JavaScript. Dengan jQuery, manipulasi DOM, penanganan event, dan komunikasi dengan server menjadi lebih mudah dan ringkas.

Dalam modul ini, jQuery digunakan untuk:

Mengambil data dari server menggunakan AJAX
Menampilkan data ke dalam tabel secara dinamis
Mengambil nilai input dari form
Mengatur event seperti klik tombol
Mengelola tampilan modal

5. AJAX (Asynchronous JavaScript and XML)

AJAX merupakan teknik yang memungkinkan aplikasi web berkomunikasi dengan server secara asynchronous tanpa harus me-reload halaman. Dengan AJAX, data dapat dikirim dan diterima dalam format seperti JSON.

Pada aplikasi ini, AJAX digunakan untuk:

Mengambil data produk (GET)
Menambahkan data produk (POST)
Mengupdate data produk (PUT)
Menghapus data produk (DELETE)

Sehingga interaksi pengguna menjadi lebih cepat dan efisien.

6. JSON (JavaScript Object Notation)

JSON adalah format pertukaran data yang ringan dan mudah dibaca oleh manusia maupun mesin. JSON digunakan untuk menyimpan dan mengirim data antara client dan server.

Struktur JSON terdiri dari pasangan key dan value, contohnya:

```
{
  "id": 1,
  "name": "Beras",
  "price": 12000
}
```

JSON digunakan sebagai media penyimpanan data produk pada file products.json.

7. ExpressJS

ExpressJS merupakan framework untuk Node.js yang digunakan untuk membangun server dan API dengan lebih mudah. ExpressJS menyediakan fitur routing untuk menangani berbagai request dari client seperti GET, POST, PUT, dan DELETE.

Pada modul ini, ExpressJS digunakan untuk:

Membuat API endpoint /api/products
Mengelola request dari frontend
Menghubungkan aplikasi dengan file JSON sebagai database sederhana

8. Node.js

Node.js adalah runtime environment yang memungkinkan JavaScript dijalankan di sisi server. Dengan Node.js, pengembang dapat menggunakan JavaScript tidak hanya di browser, tetapi juga untuk membangun backend aplikasi.

Node.js digunakan dalam modul ini untuk menjalankan server ExpressJS.

9. Bootstrap

Bootstrap merupakan framework CSS yang digunakan untuk mempercepat pembuatan tampilan web yang responsif dan menarik. Bootstrap menyediakan berbagai komponen siap pakai seperti navbar, tabel, tombol, dan modal.

Pada aplikasi ini, Bootstrap digunakan untuk:

Membuat tampilan tabel produk
Mendesain form input dalam modal
Membuat tampilan lebih responsif dan user-friendly

### Tugas 6 - Toko Kelontong Pak Cik dan Aimar

#### Source Code - index.html

```
<!-- Anisah Syifa Mustika Riyanto -->

<!doctype html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <title>Toko Kelontong Pak Cik & Aimar</title>

    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
  </head>

  <body class="bg-warning-subtle">
    <div class="container py-5">
      <!-- Header -->
      <div class="text-center mb-4 p-4 bg-white rounded shadow-sm">
        <h1 class="fw-bold text-success">
          🛒 Toko Kelontong
          <span class="badge bg-success fs-10">Pak Cik & Aimar</span>
        </h1>
        <p class="text-muted">Termurah Sepanjang Usia</p>
      </div>

      <!-- Table -->
      <div class="card shadow-sm">
        <div class="card-body">
          <table class="table table-bordered table-striped text-center">
            <thead class="table-success">
              <tr>
                <th>Nama Produk</th>
                <th>Harga</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody id="table"></tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- Button -->
    <div class="text-center mb-3">
      <button
        class="btn btn-success px-4"
        data-bs-toggle="modal"
        data-bs-target="#formModal"
      >
        + Tambah Produk
      </button>
    </div>
    <!-- Modal Form -->
    <div class="modal fade" id="formModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-success text-white">
            <h5 class="modal-title">Form Produk</h5>
            <button
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div class="modal-body">
            <input id="id" type="hidden" />
            <input
              id="name"
              class="form-control mb-3"
              placeholder="Nama Produk"
            />
            <input
              id="price"
              type="number"
              class="form-control"
              placeholder="Harga"
            />
          </div>

          <div class="modal-footer">
            <button class="btn btn-success w-100" onclick="save()">
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Delete -->
    <div class="modal fade" id="deleteModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content text-center p-3">
          <h5>⚠️ Hapus Produk?</h5>
          <p class="text-muted">Data tidak bisa dikembalikan</p>

          <div>
            <button class="btn btn-secondary me-2" data-bs-dismiss="modal">
              Batal
            </button>
            <button class="btn btn-danger" id="confirmDelete">Hapus</button>
          </div>
        </div>
      </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="script.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  </body>
</html>

```

#### Source Code - script.js

```
// Anisah Syifa Mustika Riyanto

let deleteId = null;

$(document).ready(function () {
  load();
});

function load() {
  $.get('/api/products', data => {
    let html = '';

    if (data.length === 0) {
      html = `
        <tr>
          <td colspan="3" class="text-muted">Belum ada produk</td>
        </tr>
      `;
    } else {
      data.forEach(d => {
        html += `
          <tr>
            <td class="fw-semibold">${d.name}</td>
            <td>Rp ${d.price}</td>
            <td>
              <button class="btn btn-warning btn-sm" onclick="edit(${d.id}, '${d.name}', ${d.price})">Edit</button>
              <button class="btn btn-danger btn-sm" onclick="showDelete(${d.id})">Hapus</button>
            </td>
          </tr>
        `;
      });
    }

    $('#table').html(html);
  });
}

function save() {
  const id = $('#id').val();
  const data = {
    name: $('#name').val(),
    price: $('#price').val()
  };

  if (!data.name || !data.price) {
    alert("Isi semua field!");
    return;
  }

  const method = id ? 'PUT' : 'POST';
  const url = id ? '/api/products/' + id : '/api/products';

  $.ajax({
    url: url,
    method: method,
    contentType: 'application/json',
    data: JSON.stringify(data),
    success: () => {
      load();
      $('.modal').modal('hide');
    }
  });
}

function edit(id, name, price) {
  $('#id').val(id);
  $('#name').val(name);
  $('#price').val(price);
  $('#formModal').modal('show');
}

function showDelete(id) {
  deleteId = id;
  $('#deleteModal').modal('show');
}

$('#confirmDelete').click(function () {
  $.ajax({
    url: '/api/products/' + deleteId,
    method: 'DELETE',
    success: () => {
      load();
      $('#deleteModal').modal('hide');
    }
  });
});

```

#### Source Code - product.json

```
sebelumnya hanya "[]"
sesudah run:
[
  {
    "id": 1775582025707,
    "name": "Beras kiloan",
    "price": "12000"
  },
  {
    "id": 1775582041294,
    "name": "Minyak Goreng 1 L",
    "price": "24000"
  }
]

```

#### Source Code - server.js

```
// Anisah Syifa Mustika Riyanto

sebelumnya hanya "[]"
sesudah run:
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

const DATA_FILE = 'products.json';

const readData = () => JSON.parse(fs.readFileSync(DATA_FILE));
const writeData = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

app.get('/api/products', (req, res) => {
  res.json(readData());
});

app.post('/api/products', (req, res) => {
  const data = readData();
  const newData = { id: Date.now(), ...req.body };
  data.push(newData);
  writeData(data);
  res.json(newData);
});

app.put('/api/products/:id', (req, res) => {
  let data = readData();
  const id = parseInt(req.params.id);
  data = data.map(d => d.id === id ? { ...d, ...req.body } : d);
  writeData(data);
  res.json({ message: 'updated' });
});

app.delete('/api/products/:id', (req, res) => {
  let data = readData();
  const id = parseInt(req.params.id);
  data = data.filter(d => d.id !== id);
  writeData(data);
  res.json({ message: 'deleted' });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
```

### Hasil Output

Sebelum Aktivitas
![Hasil Output](assets/image1.png)
Penambahan
![Hasil Output](assets/image2.png)
Pengeditan
![Hasil Output](assets/image3.png)
Konfirmasi Penghapusan
![Hasil Output](assets/image4.png)
Penghapusan
![Hasil Output](assets/image5.png)

### Deskripsi Kode

Project Toko Kelontong Pak Cik dan Aimar ini merupakan aplikasi web sederhana yang digunakan untuk mengelola data produk dengan fitur CRUD (Create, Read, Update, Delete). Aplikasi ini dibangun menggunakan ExpressJS sebagai backend, Bootstrap sebagai framework CSS untuk tampilan, serta jQuery untuk manipulasi DOM dan komunikasi dengan server menggunakan AJAX. Data produk tidak disimpan dalam database, melainkan menggunakan file JSON (products.json) sebagai media penyimpanan, sehingga implementasinya lebih sederhana dan ringan.

Pada bagian backend, file server.js berfungsi sebagai server yang menangani seluruh proses pengolahan data. ExpressJS digunakan untuk membuat endpoint API seperti GET untuk mengambil seluruh data produk, POST untuk menambahkan data baru, PUT untuk memperbarui data, serta DELETE untuk menghapus data. Server juga menggunakan middleware express.json() untuk membaca data dalam format JSON yang dikirim dari frontend, serta express.static() untuk menyajikan file frontend dari folder public. Modul fs digunakan untuk membaca dan menulis data ke dalam file products.json, sehingga setiap perubahan data akan langsung tersimpan secara permanen.

Pada bagian frontend, file index.html digunakan untuk membangun tampilan antarmuka dengan memanfaatkan class bawaan Bootstrap tanpa menggunakan CSS tambahan. Tampilan dibuat lebih menarik dengan penggunaan background berwarna cerah (bg-warning-subtle), serta penekanan pada nama toko “Pak Cik & Aimar” menggunakan komponen badge. Halaman utama menampilkan tombol untuk menambahkan produk, tabel untuk menampilkan data produk, serta modal form untuk input dan edit data. Selain itu, terdapat juga modal konfirmasi untuk proses penghapusan data agar lebih aman dan interaktif.

Interaksi pengguna diatur melalui file script.js menggunakan jQuery. Saat halaman pertama kali dimuat, fungsi akan mengambil data produk dari server menggunakan metode GET dan menampilkannya ke dalam tabel secara dinamis. Proses penambahan dan pengeditan data dilakukan melalui form yang dikirim ke server menggunakan metode POST atau PUT dalam format JSON, sedangkan proses penghapusan dilakukan menggunakan metode DELETE yang dipicu setelah konfirmasi pada modal. jQuery juga digunakan untuk memanipulasi elemen HTML seperti menampilkan data ke tabel, mengisi form saat edit, serta membuka dan menutup modal.
