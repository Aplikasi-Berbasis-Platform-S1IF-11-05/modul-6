# Sistem Inventori Toko Kelontong Pak Cik & Aimar

<hr>

## Deskrupsi Umum
Project ini adalah aplikasi manajemen inventori sederhana untuk Toko Kelontong Pak Cik dan Mas Aimar. Aplikasi ini memungkinkan pengguna untuk melakukan operasi CRUD (Create, Read, Update, Delete) pada data barang stok toko. Sistem ini dibangun dengan arsitektur Client-Server sederhana tanpa database SQL, melainkan menggunakan file JSON sebagai media penyimpanan data tetap (persisten).

## Fitur Aplikasi
1. Read Data: Menampilkan seluruh daftar barang dari data.json ke dalam tabel secara otomatis saat halaman dimuat.
2. Create Data: Menambah produk baru (Nama, Harga, Stok) melalui modal pop-up.
3. Update Data: Mengubah informasi produk yang sudah ada tanpa harus menghapus data lama.
4. Delete Data: Menghapus produk dari daftar dengan konfirmasi modal/alert untuk keamanan data.
5. Smart Table: Fitur pencarian barang secara real-time menggunakan DataTables.


## Teknologi yang Digunakan

* Backend: Node.js & Express.js (Framework server-side).
* Frontend: HTML5, CSS3, & Bootstrap 5 (Styling UI).
* Library Utama:  jQuery: Digunakan untuk manipulasi DOM dan pengiriman data via AJAX.
* DataTables: Plugin untuk fitur pencarian, sortir, dan penomoran otomatis pada tabel.
* Penyimpanan Data: File sistem (data.json) menggunakan modul fs Node.js.

## Struktur Berkas
```
2311102013_RakhaYudhistira/
│
├── server.js           # Konfigurasi server API
├── data.json           # File penyimpanan data
├── package.json        # Dependensi project
└── public/             # Folder aset frontend
    └── index.html      # UI & Logika jQuery
```

## Daftar API Endpoints
* `GET /api/produk` - Mengambil seluruh data produk.

* `POST /api/produk` - Menambahkan produk baru.

* `PUT /api/produk/:id` - Memperbarui data produk berdasarkan ID.

* `DELETE /api/produk/:id` - Menghapus produk berdasarkan ID.
<hr>

## Instalasi & Menjalankan Aplikasi
1. Clone folder modul-6
```
git clone nama-file
```
2. Pastikan Sudah menginstall node.js. pada terminal ketik
```
node -v
```
3. install modul
```
npm init -y
npm install express
```
4. Jalankan server
```
node server.js
```
5. buka browser menggunakan url: `http://localhost:3000`

<hr>

**Dikerjakan oleh: Rakha Yudhistira - 2311102010**