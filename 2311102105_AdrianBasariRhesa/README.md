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
    <strong>Adrian Basari Rhesa</strong>
    <br>
    <strong>2311102105</strong>
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

## Deskripsi Project

Toko Pak Cik & Aimar adalah aplikasi web inventari berbasis ExpressJS untuk mengelola stok produk toko kelontong. Aplikasi ini mendukung operasi CRUD (Create, Read, Update, Delete) lengkap dengan tampilan tabel responsif, form produk create/edit, dan konfirmasi hapus menggunakan modal.

Data disimpan secara lokal dalam file JSON (tanpa database SQL), sehingga sangat ringan, mudah dipahami, dan cepat untuk dijalankan.

---

## Struktur Project

```
toko-pak-cik/
│
├── data/
│   └── products.json       <-- Database JSON kita
├── public/
│   ├── index.html          <-- Tampilan Utama (Bootstrap)
│   └── app.js              <-- Logika jQuery & AJAX
├── server.js               <-- Backend Express.js
└── package.json            <-- Konfigurasi Node.js
```

---

## Tech Stack

| Teknologi | Peran |
|-----------|-------|
| **Node.js + ExpressJS** | Backend server & REST API |
| **JSON File** | Penyimpanan data (pengganti database) |
| **jQuery 3.7** | DOM manipulation & AJAX request |
| **Bootstrap 5.3** | CSS framework & komponen UI |
| **Bootstrap Icons** | Kumpulan Icon |
| Timestamp JS | Generate ID unik otomatis (Date.now()) |

---

# 🏪 Inventori Toko Kelontong Pak Cik & Mas Aimar
Sebuah aplikasi web berbasis CRUD (Create, Read, Update, Delete) sederhana untuk mengelola inventori produk toko kelontong. Project ini merupakan penyelesaian dari **Task 6**.

## 🛠 Teknologi yang Digunakan
* **Backend:** Node.js dengan Express.js (Dipilih karena ringan dan mudah memproses JSON).
* **Frontend:** HTML5, Bootstrap 5 (Styling).
* **DOM Manipulation:** jQuery & AJAX (Sesuai dengan requirement *task*).
* **Database:** Flat file `products.json` (Tanpa database SQL).

## 🚀 Cara Menjalankan Project
1. Pastikan Anda sudah menginstal [Node.js](https://nodejs.org/).
2. Buka terminal di direktori project ini.
3. Jalankan perintah `npm install` untuk menginstal *dependencies* (Express.js).
4. Jalankan server dengan perintah `node server.js`.
5. Buka browser dan akses URL: `http://localhost:3000`

## 📁 Struktur API Endpoint
| HTTP Method | Endpoint            | Keterangan                           |
|-------------|---------------------|--------------------------------------|
| GET         | `/api/products`     | Mengambil semua data produk (Array)  |
| POST        | `/api/products`     | Menyimpan produk baru                |
| PUT         | `/api/products/:id` | Mengupdate data produk berdasarkan ID|
| DELETE      | `/api/products/:id` | Menghapus produk berdasarkan ID      |

---

### Contoh Request Body (POST/PUT)

```json
[
  {
    "id": "1712496000000",
    "nama": "Beras Maknyus 5kg",
    "kategori": "Sembako",
    "harga": 75000,
    "stok": 20
  },
  {
    "id": "1712496100000",
    "nama": "Indomie Goreng Suki (Special)",
    "kategori": "Makanan",
    "harga": 3500,
    "stok": 150
  },
  {
    "id": "1712496200000",
    "nama": "Minyak Goreng Bimoli 2L",
    "kategori": "Sembako",
    "harga": 34000,
    "stok": 12
  },
  {
    "id": "1712496300000",
    "nama": "Kopi Kapal Api Renceng",
    "kategori": "Minuman",
    "harga": 12500,
    "stok": 45
  },
  {
    "id": "1712496400000",
    "nama": "Sabun Mandi Lifebuoy",
    "kategori": "Kebutuhan Harian",
    "harga": 4500,
    "stok": 30
  },
  {
    "id": "1775571176072",
    "nama": "Odol",
    "kategori": "Kebutuhan Harian",
    "harga": 79.9,
    "stok": 50
  }
]
```
---

# Dasar Teori

## 1. ExpressJS

ExpressJS adalah framework Node.js yang minimalis dan fleksibel untuk membangun aplikasi web dan REST API. Express menyediakan lapisan abstraksi di atas Node.js HTTP module, sehingga lebih mudah mendefinisikan route, middleware, dan handler.

```js
$(document).ready(function () {
    const modalForm = new bootstrap.Modal(document.getElementById('modalForm'));
    const modalHapus = new bootstrap.Modal(document.getElementById('modalHapus'));

    // Fungsi Render Data ke Tabel
    // Ganti bagian muatData() di app.js kamu menjadi seperti ini:
    function muatData() {
        $.ajax({
            url: '/api/products',
            method: 'GET',
            success: function (data) {
                let html = '';
                if (data.length === 0) {
                    html = `<tr><td colspan="6" class="text-center py-4 text-muted"><i class="bi bi-inbox fs-1 d-block mb-2"></i>Belum ada data produk.</td></tr>`;
                } else {
                    $.each(data, function (index, item) {
                        // Warna stok merah jika barang habis/sedikit
                        let stokClass = item.stok < 10 ? 'text-danger fw-bold' : 'text-success fw-bold';

                        html += `
                        <tr>
                            <td class="text-center text-muted fw-bold">${index + 1}</td>
                            <td class="fw-bold text-dark">${item.nama}</td>
                            <td><span class="badge-kategori">${item.kategori}</span></td>
                            <td class="fw-semibold">Rp ${item.harga.toLocaleString('id-ID')}</td>
                            <td class="text-center ${stokClass}">${item.stok}</td>
                            <td class="text-center">
                                <button class="btn btn-sm btn-warning action-btn btn-edit text-dark fw-semibold me-1" 
                                    data-id="${item.id}" 
                                    data-nama="${item.nama}" 
                                    data-kategori="${item.kategori}" 
                                    data-harga="${item.harga}" 
                                    data-stok="${item.stok}">
                                    <i class="bi bi-pencil-fill"></i>
                                </button>
                                <button class="btn btn-sm btn-outline-danger action-btn btn-hapus" data-id="${item.id}">
                                    <i class="bi bi-trash-fill"></i>
                                </button>
                            </td>
                        </tr>
                    `;
                    });
                }
                $('#tabelProduk').html(html);
            }
        });
    }

    // Panggil saat halaman pertama kali diload
    muatData();

    // Tampilkan Modal Tambah
    $('#btnTambah').click(function () {
        $('#modalTitle').text('Tambah Produk Baru');
        $('#formProduk')[0].reset();
        $('#idProduk').val('');
        modalForm.show();
    });

    // Event Delegation untuk Tombol Edit
    $('#tabelProduk').on('click', '.btn-edit', function () {
        $('#modalTitle').text('Edit Produk');
        $('#idProduk').val($(this).data('id'));
        $('#nama').val($(this).data('nama'));
        $('#kategori').val($(this).data('kategori'));
        $('#harga').val($(this).data('harga'));
        $('#stok').val($(this).data('stok'));
        modalForm.show();
    });

    // Proses Simpan (Tambah / Edit)
    $('#btnSimpan').click(function () {
        const id = $('#idProduk').val();
        const payload = {
            nama: $('#nama').val(),
            kategori: $('#kategori').val(),
            harga: $('#harga').val(),
            stok: $('#stok').val()
        };

        const method = id ? 'PUT' : 'POST';
        const url = id ? `/api/products/${id}` : '/api/products';

        $.ajax({
            url: url,
            method: method,
            data: payload,
            success: function () {
                modalForm.hide();
                muatData();
            }
        });
    });

    // Event Delegation untuk Tombol Hapus (Munculkan Konfirmasi)
    $('#tabelProduk').on('click', '.btn-hapus', function () {
        const id = $(this).data('id');
        $('#idHapus').val(id);
        modalHapus.show();
    });

    // Proses Hapus setelah Konfirmasi
    $('#btnKonfirmasiHapus').click(function () {
        const id = $('#idHapus').val();
        $.ajax({
            url: `/api/products/${id}`,
            method: 'DELETE',
            success: function () {
                modalHapus.hide();
                muatData();
            }
        });
    });
});
```


## 2. REST API dan CRUD

REST (Representational State Transfer) adalah arsitektur desain API yang menggunakan HTTP method untuk merepresentasikan operasi:

| Operasi | HTTP Method | Contoh |
|---------|-------------|--------|
| Create  | `POST`      | Tambah produk baru |
| Read    | `GET`       | Ambil semua/satu produk |
| Update  | `PUT`       | Perbarui data produk |
| Delete  | `DELETE`    | Hapus produk |

---

## 3. Penyimpanan Data JSON

Data disimpan di file `data/products.json` menggunakan `fs` (File System) bawaan Node.js. Pendekatan ini cocok untuk aplikasi skala kecil atau prototyping karena tidak memerlukan database.

```js
const fs = require('fs');
const dataPath = './data/products.json';

// Fungsi Helper
const readData = () => JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const writeData = (data) => fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
```

---

## 4. jQuery AJAX

jQuery digunakan untuk melakukan DOM manipulation dan request HTTP ke backend secara asinkron (AJAX) tanpa perlu refresh halaman.

```js
// Contoh AJAX GET — Ambil data dan render ke tabel
$.ajax({
    url: '/api/products',
    method: 'GET',
    success: function (data) {
        let html = '';
        $.each(data, function (index, item) {
            html += `<tr><td>${item.nama}</td><td>${item.harga}</td></tr>`;
        });
        $('#tabelProduk').html(html);
    }
});
```

---

## 5. Bootstrap Modal

Bootstrap Modal digunakan untuk menampilkan pop-up dialog yang menginterupsi layar secara elegan. Dalam project ini terdapat 2 jenis modal:

Modal Form (Create & Edit) — Digunakan secara bergantian. Saat klik "Tambah", form dikosongkan. Saat klik "Edit", form diisi otomatis sesuai data baris yang dipilih.

Modal Konfirmasi Delete — Pop-up peringatan sebelum data benar-benar dihapus dari JSON

```js
// Inisialisasi Modal di JavaScript
const modalForm = new bootstrap.Modal(document.getElementById('modalForm'));

// Menampilkan Modal
modalForm.show();

// Menyembunyikan Modal setelah sukses simpan data
modalForm.hide();
```


## Fitur Aplikasi

1.Tabel Inventaris Dinamis — Data di-render menggunakan jQuery dari file JSON secara real-time (AJAX).

2.Form Terpadu (Create & Edit) — Satu komponen modal cerdas yang bisa mengenali aksi Tambah Data Baru vs Update Data Lama berdasarkan ID.

3.Peringatan Hapus (Delete Confirmation) — Mencegah terhapusnya data secara tidak sengaja melalui klik tombol.

4.Indikator Stok Cerdas — Warna teks pada kolom stok berubah secara dinamis (warna merah jika stok menipis < 10, dan warna hijau jika stok aman).

5.Modern UI/UX — Menggunakan styling Bootstrap 5 dengan penambahan efek shadow, hover state, dan font eksternal untuk tampilan yang bersih dan profesional.

---

## Output / Screenshot

> Screenshot tersedia di folder `Assets/`

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/1b6fed87-b016-4fe9-af21-6bcdf2be0e01" />
