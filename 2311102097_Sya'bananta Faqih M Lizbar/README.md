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
    <strong>Sya'bananta faqih M lizbar</strong>
    <br>
    <strong>2311102097</strong>
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
$(document).ready(function () {

    let data = JSON.parse(localStorage.getItem("produk")) || [];
    let deleteIndex = null;

    function render() {
        let html = "";
        data.forEach((item, i) => {
            html += `
                <tr>
                    <td>${item.nama}</td>
                    <td>${item.harga}</td>
                    <td>${item.stok}</td>
                    <td>
                        <button class="btn btn-warning btn-sm edit" data-id="${i}">Edit</button>
                        <button class="btn btn-danger btn-sm delete" data-id="${i}">Delete</button>
                    </td>
                </tr>
            `;
        });
        $("#tableBody").html(html);
        localStorage.setItem("produk", JSON.stringify(data));
    }

    render();

    // SAVE (CREATE + UPDATE)
    $("#saveBtn").click(function () {
        let nama = $("#nama").val();
        let harga = $("#harga").val();
        let stok = $("#stok").val();
        let index = $("#index").val();

        if (index === "") {
            data.push({ nama, harga, stok });
        } else {
            data[index] = { nama, harga, stok };
        }

        $("#formModal").modal("hide");
        $("#nama, #harga, #stok, #index").val("");
        render();
    });

    // EDIT
    $(document).on("click", ".edit", function () {
        let i = $(this).data("id");
        $("#nama").val(data[i].nama);
        $("#harga").val(data[i].harga);
        $("#stok").val(data[i].stok);
        $("#index").val(i);

        $("#formModal").modal("show");
    });

    // DELETE BUTTON
    $(document).on("click", ".delete", function () {
        deleteIndex = $(this).data("id");
        $("#deleteModal").modal("show");
    });

    // CONFIRM DELETE
    $("#confirmDelete").click(function () {
        data.splice(deleteIndex, 1);
        $("#deleteModal").modal("hide");
        render();
    });

});
```

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Toko Pak Cik & Aimar</title>

    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
</head>

<body class="bg-light">

<div class="container mt-5">
    <h2 class="mb-4">🛒 Inventaris Toko Kelontong</h2>

    <!-- BUTTON TAMBAH -->
    <button class="btn btn-success mb-3" data-bs-toggle="modal" data-bs-target="#formModal">
        + Tambah Produk
    </button>

    <!-- TABLE -->
    <table class="table table-bordered table-striped">
        <thead class="table-dark">
            <tr>
                <th>Nama</th>
                <th>Harga</th>
                <th>Stok</th>
                <th>Aksi</th>
            </tr>
        </thead>
        <tbody id="tableBody"></tbody>
    </table>
</div>

<!-- MODAL FORM -->
<div class="modal fade" id="formModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h5 class="modal-title">Form Produk</h5>
        <button class="btn-close" data-bs-dismiss="modal"></button>
      </div>

      <div class="modal-body">
        <input type="hidden" id="index">

        <input type="text" id="nama" class="form-control mb-2" placeholder="Nama Produk">
        <input type="number" id="harga" class="form-control mb-2" placeholder="Harga">
        <input type="number" id="stok" class="form-control" placeholder="Stok">
      </div>

      <div class="modal-footer">
        <button class="btn btn-success" id="saveBtn">Simpan</button>
      </div>
    </div>
  </div>
</div>

<!-- MODAL DELETE -->
<div class="modal fade" id="deleteModal">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content text-center">
      <div class="modal-body">
        <p>Yakin mau hapus produk ini? 😢</p>
        <button class="btn btn-danger" id="confirmDelete">Hapus</button>
      </div>
    </div>
  </div>
</div>

<!-- Bootstrap JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

<!-- JS -->
<script src="app.js"></script>

</body>
</html>
```

Output:
<img src="output 1.png" alt="preview" style="width:100%; max-width:900px;">
<img src="output 2.png" alt="preview" style="width:100%; max-width:900px;">
<img src="output 3.png" alt="preview" style="width:100%; max-width:900px;">
<img src="output 4.png" alt="preview" style="width:100%; max-width:900px;">
<img src="output 5.png" alt="preview" style="width:100%; max-width:900px;">
<img src="output 6.png" alt="preview" style="width:100%; max-width:900px;">
<img src="output 7.png" alt="preview" style="width:100%; max-width:900px;">

## Penjelasan
Project ini menggunakan Express.js sebagai backend untuk mengelola data produk melalui API, serta frontend JavaScript untuk menampilkan dan memanipulasi data secara dinamis. Sistem terhubung dengan database MySQL sehingga data produk dapat disimpan, ditampilkan, dan dihapus secara real-time.
