
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
    <strong>Amanda Windhu Gustyas</strong>
    <br>
    <strong>2311102121</strong>
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

1. JavaScript merupakan bahasa pemrograman yang digunakan untuk membuat halaman web menjadi interaktif dan dinamis. Dengan JavaScript, pengguna dapat melakukan manipulasi terhadap elemen halaman melalui DOM (Document Object Model), seperti menampilkan data, menangani input pengguna, serta mengubah tampilan secara langsung tanpa perlu melakukan reload halaman.

2. COTS (Commercial Off-The-Shelf) adalah perangkat lunak atau produk teknologi yang sudah jadi dan dijual secara umum di pasaran, sehingga dapat langsung digunakan tanpa perlu dikembangkan dari awal. COTS biasanya dibuat oleh perusahaan dan dirancang untuk memenuhi kebutuhan umum banyak pengguna, seperti aplikasi perkantoran, sistem manajemen, atau software akuntansi. Keunggulan utama COTS adalah waktu implementasi yang cepat, biaya pengembangan yang lebih rendah, serta dukungan dan pembaruan dari vendor. Namun, COTS juga memiliki keterbatasan seperti kurang fleksibel untuk kebutuhan khusus dan ketergantungan pada penyedia produk. Dalam pengembangan sistem, penggunaan COTS sering menjadi alternatif dibandingkan membangun sistem dari nol (custom development), terutama jika kebutuhan sistem tidak terlalu spesifik. Contoh penggunaan COTS antara lain software seperti Microsoft Office untuk produktivitas, sistem ERP siap pakai, atau platform CMS. Secara umum, pemilihan COTS harus mempertimbangkan kesesuaian fitur, biaya lisensi, kemudahan integrasi, serta dukungan teknis agar dapat memberikan manfaat maksimal bagi organisasi atau pengguna.
   
3. Express JS adalah framework backend berbasis Node.js yang digunakan untuk membuat server sederhana. Dalam praktikum ini, Express digunakan untuk menangani request dari client seperti mengambil data (GET), menambah data (POST), mengubah data (PUT), dan menghapus data (DELETE). Data disimpan dalam bentuk file JSON sehingga tidak memerlukan database.

# Tugas 6
## 1. Source Kode index.html

```
//2311102121
//Amanda Windhu Gustyas

<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>Toko Kelontong</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

</head>

<body class="bg-light">

<div class="container mt-5">

    <!-- HEADER -->
    <div class="text-center mb-5">
        <h2 class="fw-bold text-danger display-6">🛒 Toko Kelontong</h2>
        <p class="text-muted">Pak Cik & Aimar Store</p>
    </div>

    <!-- BUTTON -->
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="fw-semibold">Daftar Produk</h5>
        <button class="btn btn-danger rounded-pill px-4 shadow" id="addBtn">
            + Tambah Produk
        </button>
    </div>

    <!-- CARD -->
    <div class="card border-0 shadow-lg rounded-4">
        <div class="card-body">

            <table class="table table-hover align-middle text-center">
                <thead class="table-danger">
                    <tr>
                        <th>Nama</th>
                        <th>Harga</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody id="table"></tbody>
            </table>

        </div>
    </div>
</div>

<script src="script.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

</body>
</html>
```

## 2. Source Kode server.js

```
const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// ambil data
app.get('/data', (req, res) => {
    const data = JSON.parse(fs.readFileSync('data.json'));
    res.json(data);
});

// tambah data
app.post('/data', (req, res) => {
    let data = JSON.parse(fs.readFileSync('data.json'));
    data.push(req.body);
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    res.json({message: "success"});
});

// edit data
app.put('/data/:id', (req, res) => {
    let data = JSON.parse(fs.readFileSync('data.json'));
    data[req.params.id] = req.body;
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    res.json({message: "updated"});
});

// delete data
app.delete('/data/:id', (req, res) => {
    let data = JSON.parse(fs.readFileSync('data.json'));
    data.splice(req.params.id, 1);
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    res.json({message: "deleted"});
});

app.listen(3000, () => console.log("Server jalan di http://localhost:3000"));
```
## 3. Source Kode script.js

```
let editIndex = null;

// load data
function load(){
    $.get('/data', function(res){
        let html = "";
        res.forEach((item, i)=>{
            html += `
            <tr>
                <td>${item.nama}</td>
                <td class="fw-semibold text-success">Rp ${parseInt(item.harga).toLocaleString()}</td>
                <td>
                    <button class="btn btn-warning btn-sm rounded-pill px-3 shadow-sm me-1" onclick="edit(${i})">Edit</button>
                    <button class="btn btn-danger btn-sm rounded-pill px-3 shadow-sm" onclick="hapus(${i})">Hapus</button>
                </td>
            </tr>`;
        });
        $("#table").html(html);
    });
}

// tambah
$("#addBtn").click(()=>{
    editIndex = null;
    showForm();
});

// form modal
function showForm(nama="", harga=""){
    let modal = `
    <div class="modal fade" id="formModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content rounded-4 shadow">

          <div class="modal-header bg-danger text-white">
            <h5>${editIndex === null ? "Tambah Produk" : "Edit Produk"}</h5>
          </div>

          <div class="modal-body">
            <input id="nama" class="form-control mb-3" placeholder="Nama Produk" value="${nama}">
            <input id="harga" type="number" class="form-control" placeholder="Harga" value="${harga}">
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
            <button class="btn btn-danger" onclick="save()">Simpan</button>
          </div>

        </div>
      </div>
    </div>`;

    $("body").append(modal);
    let m = new bootstrap.Modal(document.getElementById('formModal'));
    m.show();
}

// simpan
function save(){
    let nama = $("#nama").val();
    let harga = $("#harga").val();

    if(editIndex === null){
        $.post('/data', {nama, harga}, reload);
    } else {
        $.ajax({
            url: '/data/' + editIndex,
            type: 'PUT',
            data: JSON.stringify({nama, harga}),
            contentType: 'application/json',
            success: reload
        });
    }
}

// edit
function edit(i){
    editIndex = i;
    $.get('/data', function(res){
        showForm(res[i].nama, res[i].harga);
    });
}

// hapus
function hapus(i){
    if(confirm("Yakin mau hapus?")){
        $.ajax({
            url: '/data/' + i,
            type: 'DELETE',
            success: reload
        });
    }
}

// reload
function reload(){
    $(".modal").remove();
    load();
}

// initial
load();
```
## 4. Source Kode data.json

```
[
  { "nama": "Gula", "harga": 10000 },
  { "nama": "Tepung Terigu", "harga": 20000 }
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

