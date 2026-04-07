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
    <strong>Kartika Pringgo Hutomo</strong>
    <br>
    <strong>2311102195</strong>
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
Dasar teori pada pengembangan aplikasi toko kelontong ini mengacu pada konsep aplikasi web berbasis arsitektur client-server, di mana frontend dan backend memiliki peran yang berbeda namun saling terhubung melalui API. Frontend dibangun menggunakan HTML, Bootstrap, dan JavaScript (jQuery) yang bertugas menampilkan antarmuka pengguna serta menangani interaksi seperti input data, menampilkan tabel, dan aksi tombol. Sementara itu, backend dikembangkan menggunakan Express.js, yaitu framework berbasis Node.js yang digunakan untuk membangun RESTful API guna mengelola data produk seperti menambah, menampilkan, mengubah, dan menghapus data.

Dalam implementasinya, sistem ini menerapkan konsep CRUD (Create, Read, Update, Delete) sebagai operasi dasar dalam pengolahan data. Komunikasi antara frontend dan backend dilakukan menggunakan teknik AJAX, yaitu metode asynchronous yang memungkinkan pertukaran data tanpa perlu me-reload halaman. Data dikirim dalam format JSON karena ringan dan mudah diproses baik oleh client maupun server. Pada sisi backend, Express.js menangani routing seperti endpoint api products untuk setiap operasi CRUD, serta memproses request dan response yang masuk.

Selain itu, digunakan juga konsep modularisasi struktur folder untuk memisahkan antara frontend dan backend agar kode lebih terorganisir dan mudah dikembangkan. Framework Bootstrap digunakan untuk mempercepat pembuatan tampilan yang responsif dan konsisten, sedangkan plugin DataTables membantu dalam menampilkan data dalam bentuk tabel yang interaktif dengan fitur seperti pencarian dan pagination. Dengan menggabungkan teknologi tersebut, aplikasi ini mampu memberikan pengalaman pengguna yang dinamis, responsif, serta mudah digunakan, sekaligus menunjukkan implementasi dasar dari pengembangan aplikasi web modern berbasis fullstack.


### Source code 

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Toko Kelontong</title>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.4/css/jquery.dataTables.min.css">
</head>

<body class="bg-light">

<div class="container mt-5">
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h3>Data Produk</h3>
        <a href="create.html" class="btn btn-primary">+ Tambah</a>
    </div>

    <div class="card shadow">
        <div class="card-body">
            <table id="table" class="table table-striped table-hover">
                <thead class="table-dark">
                    <tr>
                        <th>Nama</th>
                        <th>Harga</th>
                        <th>Stok</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>
</div>

<!-- Modal Delete -->
<div class="modal fade" id="deleteModal">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content text-center p-4">
        <h5>Yakin hapus data ini?</h5>
        <p class="text-muted">Tidak bisa dikembalikan</p>

        <div class="mt-3">
            <button class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
            <button id="confirmDelete" class="btn btn-danger">Hapus</button>
        </div>
    </div>
  </div>
</div>

<!-- JS -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

<script>
let selectedId = null;

// LOAD DATA
function loadData() {
    $.get('/api/products', function(data) {
        let rows = '';
        data.forEach(item => {
            rows += `
                <tr>
                    <td>${item.nama}</td>
                    <td>Rp ${item.harga}</td>
                    <td>${item.stok}</td>
                    <td>
                        <a href="edit.html?id=${item.id}" class="btn btn-sm btn-warning">Edit</a>
                        <button class="btn btn-sm btn-danger btn-delete" data-id="${item.id}">Hapus</button>
                    </td>
                </tr>
            `;
        });

        $('#table tbody').html(rows);
        $('#table').DataTable();
    });
}

loadData();

// DELETE BUTTON
$(document).on('click', '.btn-delete', function(){
    selectedId = $(this).data('id');
    new bootstrap.Modal('#deleteModal').show();
});

// CONFIRM DELETE
$('#confirmDelete').click(function(){
    $.ajax({
        url: '/api/products/' + selectedId,
        type: 'DELETE',
        success: function(){
            location.reload();
        }
    });
});
</script>

</body>
</html>
```
```html
<!-- edit.html -->
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Edit Produk</title>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
</head>

<body class="bg-light">

<div class="container mt-5">
    <div class="card shadow">
        <div class="card-body">
            <h3 class="text-center mb-4">Edit Produk</h3>

            <form id="formEdit">
                <input type="hidden" id="id">
                <input class="form-control mb-3" id="nama" placeholder="Nama Produk">
                <input class="form-control mb-3" id="harga" placeholder="Harga">
                <input class="form-control mb-3" id="stok" placeholder="Stok">

                <div class="d-grid">
                    <button class="btn btn-warning">Update</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<script>
const urlParams = new URLSearchParams(window.location.search);
const id = parseInt(urlParams.get('id'));

$.get('/api/products', function(data){
    let item = data.find(i => i.id === id);

    if (!item) {
        alert('Data tidak ditemukan!');
        window.location.href = 'index.html';
        return;
    }

    $('#nama').val(item.nama);
    $('#harga').val(item.harga);
    $('#stok').val(item.stok);
});

$('#formEdit').submit(function(e){
    e.preventDefault();

    $.ajax({
        url: '/api/products/' + id,
        type: 'PUT',
        data: JSON.stringify({
            nama: $('#nama').val(),
            harga: $('#harga').val(),
            stok: $('#stok').val()
        }),
        contentType: 'application/json',
        success: function(){
            alert('Berhasil update');
            window.location.href = 'index.html';
        }
    });
});
</script>

</body>
</html>
<!-- create.html -->
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Tambah Produk</title>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
</head>

<body class="bg-light">

<div class="container mt-5">
    <div class="card shadow">
        <div class="card-body">
            <h3 class="text-center mb-4">Tambah Produk</h3>

            <form id="formCreate">
                <input class="form-control mb-3" name="nama" placeholder="Nama Produk" required>
                <input class="form-control mb-3" name="harga" placeholder="Harga" required>
                <input class="form-control mb-3" name="stok" placeholder="Stok" required>

                <div class="d-grid">
                    <button class="btn btn-success">Simpan</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<script>
$('#formCreate').submit(function(e){
    e.preventDefault();

    let data = {
        nama: $('[name=nama]').val(),
        harga: $('[name=harga]').val(),
        stok: $('[name=stok]').val()
    };

    $.ajax({
        url: '/api/products',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function(){
            alert('Berhasil tambah');
            window.location.href = 'index.html';
        }
    });
});
</script>

</body>
</html>![alt text](image.png)
```
Output:
<![alt text](image.png)>
<![alt text](image-1.png)>
<![alt text](image-2.png)>
<![alt text](image-3.png)>

## Penjelasan
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
    <strong>Kartika Pringgo Hutomo</strong>
    <br>
    <strong>2311102195</strong>
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
Dasar teori pada pengembangan aplikasi toko kelontong ini mengacu pada konsep aplikasi web berbasis arsitektur client-server, di mana frontend dan backend memiliki peran yang berbeda namun saling terhubung melalui API. Frontend dibangun menggunakan HTML, Bootstrap, dan JavaScript (jQuery) yang bertugas menampilkan antarmuka pengguna serta menangani interaksi seperti input data, menampilkan tabel, dan aksi tombol. Sementara itu, backend dikembangkan menggunakan Express.js, yaitu framework berbasis Node.js yang digunakan untuk membangun RESTful API guna mengelola data produk seperti menambah, menampilkan, mengubah, dan menghapus data.

Dalam implementasinya, sistem ini menerapkan konsep CRUD (Create, Read, Update, Delete) sebagai operasi dasar dalam pengolahan data. Komunikasi antara frontend dan backend dilakukan menggunakan teknik AJAX, yaitu metode asynchronous yang memungkinkan pertukaran data tanpa perlu me-reload halaman. Data dikirim dalam format JSON karena ringan dan mudah diproses baik oleh client maupun server. Pada sisi backend, Express.js menangani routing seperti endpoint api products untuk setiap operasi CRUD, serta memproses request dan response yang masuk.

Selain itu, digunakan juga konsep modularisasi struktur folder untuk memisahkan antara frontend dan backend agar kode lebih terorganisir dan mudah dikembangkan. Framework Bootstrap digunakan untuk mempercepat pembuatan tampilan yang responsif dan konsisten, sedangkan plugin DataTables membantu dalam menampilkan data dalam bentuk tabel yang interaktif dengan fitur seperti pencarian dan pagination. Dengan menggabungkan teknologi tersebut, aplikasi ini mampu memberikan pengalaman pengguna yang dinamis, responsif, serta mudah digunakan, sekaligus menunjukkan implementasi dasar dari pengembangan aplikasi web modern berbasis fullstack.


### Source code 
```js
//app.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static folder
app.use(express.static(path.join(__dirname, 'public')));

const FILE = path.join(__dirname, 'products.json');

// fungsi baca file aman
function readData() {
    try {
        const data = fs.readFileSync(FILE);
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

// fungsi tulis file
function writeData(data) {
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

// ================= CRUD =================

// READ
app.get('/api/products', (req, res) => {
    res.json(readData());
});

// CREATE
app.post('/api/products', (req, res) => {
    let data = readData();

    const newItem = {
        id: Date.now(),
        nama: req.body.nama,
        harga: req.body.harga,
        stok: req.body.stok
    };

    data.push(newItem);
    writeData(data);

    res.json({ message: "Berhasil tambah data" });
});

// UPDATE
app.put('/api/products/:id', (req, res) => {
    let data = readData();
    let id = parseInt(req.params.id);

    data = data.map(item =>
        item.id === id
            ? { ...item, ...req.body }
            : item
    );

    writeData(data);
    res.json({ message: "Berhasil update" });
});

// DELETE
app.delete('/api/products/:id', (req, res) => {
    let data = readData();
    let id = parseInt(req.params.id);

    data = data.filter(item => item.id !== id);

    writeData(data);
    res.json({ message: "Berhasil hapus" });
});

// ROOT TEST
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// START SERVER
app.listen(3000, () => {
    console.log("Server jalan di http://localhost:3000");
});

```

```js
//script.js
$(document).ready(function () {

    let table = $('#table').DataTable();
    let deleteId = null;

    function loadData() {
        $.get('/api/products', function(data){

            table.clear();

            data.forEach(item => {
                table.row.add([
                    item.nama,
                    item.harga,
                    item.stok,
                    `
                    <a href="edit.html?id=${item.id}" class="btn btn-warning btn-sm">Edit</a>
                    <button class="btn btn-danger btn-sm btn-delete" data-id="${item.id}">Hapus</button>
                    `
                ]);
            });

            table.draw();
        });
    }

    loadData();

    // DELETE BUTTON
    $(document).on('click', '.btn-delete', function(){
        deleteId = $(this).data('id');
        $('#deleteModal').modal('show');
    });

    // CONFIRM DELETE
    $('#confirmDelete').click(function(){
        $.ajax({
            url: '/api/products/' + deleteId,
            type: 'DELETE',
            success: function(){
                alert('Berhasil hapus');
                loadData(); // reload data TANPA refresh
            }
        });
    });

});
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Toko Kelontong</title>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.4/css/jquery.dataTables.min.css">
</head>

<body class="bg-light">

<div class="container mt-5">
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h3>Data Produk</h3>
        <a href="create.html" class="btn btn-primary">+ Tambah</a>
    </div>

    <div class="card shadow">
        <div class="card-body">
            <table id="table" class="table table-striped table-hover">
                <thead class="table-dark">
                    <tr>
                        <th>Nama</th>
                        <th>Harga</th>
                        <th>Stok</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>
</div>

<!-- Modal Delete -->
<div class="modal fade" id="deleteModal">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content text-center p-4">
        <h5>Yakin hapus data ini?</h5>
        <p class="text-muted">Tidak bisa dikembalikan</p>

        <div class="mt-3">
            <button class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
            <button id="confirmDelete" class="btn btn-danger">Hapus</button>
        </div>
    </div>
  </div>
</div>

<!-- JS -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

<script>
let selectedId = null;

// LOAD DATA
function loadData() {
    $.get('/api/products', function(data) {
        let rows = '';
        data.forEach(item => {
            rows += `
                <tr>
                    <td>${item.nama}</td>
                    <td>Rp ${item.harga}</td>
                    <td>${item.stok}</td>
                    <td>
                        <a href="edit.html?id=${item.id}" class="btn btn-sm btn-warning">Edit</a>
                        <button class="btn btn-sm btn-danger btn-delete" data-id="${item.id}">Hapus</button>
                    </td>
                </tr>
            `;
        });

        $('#table tbody').html(rows);
        $('#table').DataTable();
    });
}

loadData();

// DELETE BUTTON
$(document).on('click', '.btn-delete', function(){
    selectedId = $(this).data('id');
    new bootstrap.Modal('#deleteModal').show();
});

// CONFIRM DELETE
$('#confirmDelete').click(function(){
    $.ajax({
        url: '/api/products/' + selectedId,
        type: 'DELETE',
        success: function(){
            location.reload();
        }
    });
});
</script>

</body>
</html>
```
```html
<!-- edit.html -->
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Edit Produk</title>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
</head>

<body class="bg-light">

<div class="container mt-5">
    <div class="card shadow">
        <div class="card-body">
            <h3 class="text-center mb-4">Edit Produk</h3>

            <form id="formEdit">
                <input type="hidden" id="id">
                <input class="form-control mb-3" id="nama" placeholder="Nama Produk">
                <input class="form-control mb-3" id="harga" placeholder="Harga">
                <input class="form-control mb-3" id="stok" placeholder="Stok">

                <div class="d-grid">
                    <button class="btn btn-warning">Update</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<script>
const urlParams = new URLSearchParams(window.location.search);
const id = parseInt(urlParams.get('id'));

$.get('/api/products', function(data){
    let item = data.find(i => i.id === id);

    if (!item) {
        alert('Data tidak ditemukan!');
        window.location.href = 'index.html';
        return;
    }

    $('#nama').val(item.nama);
    $('#harga').val(item.harga);
    $('#stok').val(item.stok);
});

$('#formEdit').submit(function(e){
    e.preventDefault();

    $.ajax({
        url: '/api/products/' + id,
        type: 'PUT',
        data: JSON.stringify({
            nama: $('#nama').val(),
            harga: $('#harga').val(),
            stok: $('#stok').val()
        }),
        contentType: 'application/json',
        success: function(){
            alert('Berhasil update');
            window.location.href = 'index.html';
        }
    });
});
</script>

</body>
</html>
<!-- create.html -->
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Tambah Produk</title>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
</head>

<body class="bg-light">

<div class="container mt-5">
    <div class="card shadow">
        <div class="card-body">
            <h3 class="text-center mb-4">Tambah Produk</h3>

            <form id="formCreate">
                <input class="form-control mb-3" name="nama" placeholder="Nama Produk" required>
                <input class="form-control mb-3" name="harga" placeholder="Harga" required>
                <input class="form-control mb-3" name="stok" placeholder="Stok" required>

                <div class="d-grid">
                    <button class="btn btn-success">Simpan</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<script>
$('#formCreate').submit(function(e){
    e.preventDefault();

    let data = {
        nama: $('[name=nama]').val(),
        harga: $('[name=harga]').val(),
        stok: $('[name=stok]').val()
    };

    $.ajax({
        url: '/api/products',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function(){
            alert('Berhasil tambah');
            window.location.href = 'index.html';
        }
    });
});
</script>

</body>
</html>![alt text](image.png)
```
Output:
<![alt text](image.png)>
<![alt text](image-1.png)>
<![alt text](image-2.png)>
<![alt text](image-3.png)>

## Penjelasan
Berikut **penjelasan dari dasar teori tersebut dalam bentuk paragraf**:

Aplikasi toko kelontong ini bekerja dengan konsep client-server, yaitu membagi sistem menjadi dua bagian utama: frontend sebagai tampilan yang dilihat pengguna dan backend sebagai pengolah data. Frontend dibuat menggunakan HTML untuk struktur halaman, Bootstrap untuk tampilan agar lebih rapi dan responsif, serta JavaScript dengan bantuan jQuery untuk menangani interaksi pengguna seperti klik tombol, input data, dan pengiriman data ke server. Di sisi lain, backend menggunakan Express.js yang berjalan di Node.js untuk mengelola data produk dan menyediakan API yang dapat diakses oleh frontend.

Alur kerjanya dimulai ketika pengguna melakukan aksi, misalnya menambahkan produk melalui form. Data yang diinput akan dikirim ke backend menggunakan AJAX dalam format JSON tanpa perlu memuat ulang halaman. Backend kemudian menerima data tersebut melalui endpoint API, memprosesnya (misalnya menyimpan ke dalam array atau database), lalu mengirimkan response kembali ke frontend. Proses yang sama juga berlaku untuk menampilkan data (read), mengubah data (update), dan menghapus data (delete), yang semuanya termasuk dalam konsep CRUD.

Selain itu, penggunaan Bootstrap mempermudah pembuatan tampilan karena sudah menyediakan berbagai class siap pakai untuk layout, tombol, dan komponen lainnya sehingga tidak perlu membuat CSS dari nol. DataTables digunakan untuk meningkatkan tampilan tabel agar lebih interaktif dengan fitur seperti pencarian, pengurutan, dan pagination. Struktur folder yang dipisahkan antara frontend dan backend juga membantu dalam pengelolaan kode agar lebih terorganisir dan mudah dikembangkan. Dengan kombinasi teknologi ini, aplikasi menjadi lebih dinamis, efisien, dan memberikan pengalaman pengguna yang lebih baik.

