
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
    <strong>Naya Putwi Setiasih</strong>
    <br>
    <strong>2311102155</strong>
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

COTS adalah perangkat lunak atau sistem yang sudah jadi dan dijual secara umum, sehingga bisa langsung digunakan tanpa perlu membuat dari nol.

JavaScript merupakan bahasa pemrograman yang digunakan untuk membuat halaman web menjadi interaktif dan dinamis. Dengan JavaScript, pengguna dapat melakukan manipulasi terhadap elemen halaman melalui DOM (Document Object Model), seperti menampilkan data, menangani input pengguna, serta mengubah tampilan secara langsung tanpa perlu melakukan reload halaman.

jQuery adalah library JavaScript yang mempermudah proses manipulasi DOM, event handling, dan komunikasi dengan server menggunakan AJAX. Dengan sintaks yang lebih sederhana, jQuery memungkinkan pengembangan fitur interaktif seperti pengambilan data, penambahan data, pengeditan, dan penghapusan data (CRUD) secara lebih efisien.

Bootstrap merupakan framework CSS yang digunakan untuk membangun tampilan web yang responsif dan modern. Bootstrap menyediakan berbagai komponen siap pakai seperti tombol, tabel, card, dan modal, sehingga mempermudah pembuatan antarmuka yang rapi tanpa harus menulis CSS secara manual.

Express JS adalah framework backend berbasis Node.js yang digunakan untuk membuat server sederhana. Dalam praktikum ini, Express digunakan untuk menangani request dari client seperti mengambil data (GET), menambah data (POST), mengubah data (PUT), dan menghapus data (DELETE). Data disimpan dalam bentuk file JSON sehingga tidak memerlukan database.

Konsep CRUD (Create, Read, Update, Delete) merupakan dasar dalam pengelolaan data pada aplikasi. Pada praktikum ini, CRUD diimplementasikan dengan jQuery sebagai penghubung antara frontend dan backend melalui AJAX, serta Express JS sebagai server yang mengelola data JSON.

# Tugas 6
## 1. Source Kode index.html

```
//2311102155
//Naya Putwi Setiasih

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Toko Pak Cik & Aimar</title>

  <!-- Bootstrap -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

  <!-- jQuery -->
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>

<body class="bg-light">

<div class="container mt-5">
  <h2 class="text-center mb-4">🛒 Inventaris Toko Pak Cik & Aimar</h2>

  <button class="btn btn-primary mb-3" id="btnTambah">+ Tambah Produk</button>

  <table class="table table-bordered table-striped">
    <thead class="table-dark">
      <tr>
        <th>No</th>
        <th>Nama</th>
        <th>Harga</th>
        <th>Stok</th>
        <th>Aksi</th>
      </tr>
    </thead>
    <tbody id="tableBody"></tbody>
  </table>
</div>

<!-- Modal Form -->
<div class="modal fade" id="modalForm">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 id="modalTitle">Tambah Produk</h5>
        <button class="btn-close" data-bs-dismiss="modal"></button>
      </div>

      <div class="modal-body">
        <input type="hidden" id="produkId">

        <div class="mb-2">
          <label>Nama</label>
          <input type="text" id="nama" class="form-control">
        </div>

        <div class="mb-2">
          <label>Harga</label>
          <input type="number" id="harga" class="form-control">
        </div>

        <div class="mb-2">
          <label>Stok</label>
          <input type="number" id="stok" class="form-control">
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn btn-success" id="saveBtn">Simpan</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal Delete -->
<div class="modal fade" id="modalDelete">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body text-center">
        <h5>Yakin mau hapus produk ini?</h5>
        <button class="btn btn-danger" id="confirmDelete">Hapus</button>
      </div>
    </div>
  </div>
</div>

<!-- Bootstrap JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

<!-- External JS -->
<script src="script.js"></script>

</body>
</html>
```

## 2. Source Kode server.js

```
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs-extra");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const DATA_FILE = "./data.json";

// Helper baca data
const readData = async () => {
  return await fs.readJson(DATA_FILE);
};

// Helper tulis data
const writeData = async (data) => {
  await fs.writeJson(DATA_FILE, data, { spaces: 2 });
};

// ======================
// GET semua produk
// ======================
app.get("/produk", async (req, res) => {
  const data = await readData();
  res.json(data);
});

// ======================
// CREATE produk
// ======================
app.post("/produk", async (req, res) => {
  const data = await readData();

  const newProduk = {
    id: Date.now(),
    nama: req.body.nama,
    harga: req.body.harga,
    stok: req.body.stok
  };

  data.push(newProduk);
  await writeData(data);

  res.json({ message: "Produk ditambahkan", data: newProduk });
});

// ======================
// UPDATE produk
// ======================
app.put("/produk/:id", async (req, res) => {
  let data = await readData();

  const id = parseInt(req.params.id);
  const index = data.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Produk tidak ditemukan" });
  }

  data[index] = {
    ...data[index],
    nama: req.body.nama,
    harga: req.body.harga,
    stok: req.body.stok
  };

  await writeData(data);

  res.json({ message: "Produk diupdate", data: data[index] });
});

// ======================
// DELETE produk
// ======================
app.delete("/produk/:id", async (req, res) => {
  let data = await readData();

  const id = parseInt(req.params.id);
  data = data.filter((p) => p.id !== id);

  await writeData(data);

  res.json({ message: "Produk dihapus" });
});

// ======================
app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
```
## 3. Source Kode script.js

```
const API = "http://localhost:3000/produk";
let deleteId = null;

// ======================
// LOAD DATA
// ======================
function loadData() {
  $.get(API, function(data) {
    let html = "";

    data.forEach((item, index) => {
      html += `
        <tr>
          <td>${index + 1}</td>
          <td>${item.nama}</td>
          <td>${item.harga}</td>
          <td>${item.stok}</td>
          <td>
            <button class="btn btn-warning btn-sm editBtn"
              data-id="${item.id}"
              data-nama="${item.nama}"
              data-harga="${item.harga}"
              data-stok="${item.stok}">
              Edit
            </button>
            <button class="btn btn-danger btn-sm deleteBtn" data-id="${item.id}">
              Hapus
            </button>
          </td>
        </tr>
      `;
    });

    $("#tableBody").html(html);
  });
}

// ======================
// TAMBAH
// ======================
$("#btnTambah").click(function() {
  $("#modalTitle").text("Tambah Produk");

  $("#produkId").val("");
  $("#nama").val("");
  $("#harga").val("");
  $("#stok").val("");

  new bootstrap.Modal(document.getElementById('modalForm')).show();
});

// ======================
// EDIT
// ======================
$(document).on("click", ".editBtn", function() {
  $("#modalTitle").text("Edit Produk");

  $("#produkId").val($(this).data("id"));
  $("#nama").val($(this).data("nama"));
  $("#harga").val($(this).data("harga"));
  $("#stok").val($(this).data("stok"));

  new bootstrap.Modal(document.getElementById('modalForm')).show();
});

// ======================
// SIMPAN (CREATE / UPDATE)
// ======================
$("#saveBtn").click(function() {
  const id = $("#produkId").val();

  const data = {
    nama: $("#nama").val(),
    harga: $("#harga").val(),
    stok: $("#stok").val()
  };

  if (id) {
    // UPDATE
    $.ajax({
      url: API + "/" + id,
      method: "PUT",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function() {
        loadData();
        $(".modal").modal("hide");
      }
    });
  } else {
    // CREATE
    $.ajax({
      url: API,
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function() {
        loadData();
        $(".modal").modal("hide");
      }
    });
  }
});

// ======================
// DELETE CLICK
// ======================
$(document).on("click", ".deleteBtn", function() {
  deleteId = $(this).data("id");
  new bootstrap.Modal(document.getElementById('modalDelete')).show();
});

// ======================
// CONFIRM DELETE
// ======================
$("#confirmDelete").click(function() {
  $.ajax({
    url: API + "/" + deleteId,
    method: "DELETE",
    success: function() {
      loadData();
      $(".modal").modal("hide");
    }
  });
});

// ======================
// INIT
// ======================
$(document).ready(function() {
  loadData();
});
```
## 4. Source Kode data.json

```
[
  {
    "id": 1,
    "nama": "Indomie Goreng",
    "harga": 3000,
    "stok": 50
  },
  {
    "id": 2,
    "nama": "Teh Botol",
    "harga": 5000,
    "stok": 30
  }
]
```

Output:
<br>
<img src="toko kelontong.png" width="100%">

# Penjelasan
Kode pada praktikum ini terdiri dari tiga bagian utama, yaitu server (Express JS), frontend (HTML + Bootstrap), dan interaksi (jQuery). Pada bagian server (server.js), digunakan framework Express untuk menangani request dari client seperti mengambil data (GET), menambahkan data (POST), mengubah data (PUT), dan menghapus data (DELETE). Data disimpan dalam file data.json sehingga tidak memerlukan database.

Pada bagian frontend (index.html), digunakan Bootstrap untuk membangun tampilan yang responsif dan modern, seperti penggunaan komponen container, table, button, dan card untuk menampilkan data produk secara rapi. Struktur tabel digunakan untuk menampilkan daftar produk beserta aksi yang dapat dilakukan.

Selanjutnya, pada bagian script.js, digunakan jQuery untuk melakukan manipulasi DOM dan komunikasi dengan server melalui AJAX. Fungsi load() digunakan untuk mengambil data dari server dan menampilkannya ke dalam tabel. Event seperti klik tombol tambah, edit, dan hapus akan mengirim request ke server untuk melakukan operasi CRUD. Setelah data diubah, tampilan akan diperbarui secara otomatis tanpa perlu reload halaman.

Output dari program ini berupa halaman web inventaris toko kelontong yang interaktif, dimana pengguna dapat menambahkan, mengedit, dan menghapus data produk dengan tampilan yang modern dan responsif.
