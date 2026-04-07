# Sistem Inventori Toko Kelontong Pak Cik & Aimar

<hr>

## Fitur Aplikasi
1. CRUD : Pengguna dapat menambah, melihat, mengedit, dan menghapus data barang.
2. Interaksi Tanpa Loading (SPA) : Menggunakan teknologi AJAX sehingga halaman tidak perlu dimuat ulang (*refresh*) saat melakukan aksi simpan, ubah, atau hapus data.
3. Indikator Stok Otomatis: Terdapat *badge* indikator warna untuk memantau sisa stok:
   * Merah : Stok kritis (≤ 10)
   * Kuning : Stok menipis (11 - 30)
   * Hijau: Stok aman (> 30)
4. Keamanan Hapus Data: Dilengkapi dengan *Pop-up Modal* konfirmasi sebelum menghapus barang untuk mencegah kesalahan klik (*human error*).
5. JSON Local Storage: Data persisten disimpan langsung dalam file `data.json`, sangat ringan dan portabel.


## Teknologi yang Digunakan

* Backend : Node.js, ExpressJS
* Frontend : HTML, CSS, Bootstrap
* DOM & Fetching: jQuery (AJAX)
* Database: File JSON (`data.json`)

## Struktur Berkas
```text
2311102013_WisnuRanantaRadityaPutra/
│
├── public 
│   └── index.html        # UI web 
│
├── data.json             # Database
├── server.js             # backend
├── package.json          # Berkas konfigurasi module/dependensi Node.js
└── README.md             # Laprak
```

## Daftar API Endpoints
* `GET /api/products` - Mengambil seluruh data produk.

* `POST /api/products` - Menambahkan produk baru.

* `PUT /api/products/:id` - Memperbarui data produk berdasarkan ID.

* `DELETE /api/products/:id` - Menghapus produk berdasarkan ID.
<hr>

## Instalasi & Menjalankan Aplikasi
1. Pastikan Sudah menginstall node.js. pada terminal ketik
```text
node -v
```
2. Clone repositori ini
```
git clone nama-file
```
3. install modul
```text
npm init -y
npm install express
```
4. Jalankan server
```
node server.js
```
5. buka browser menggunakan url: `http://localhost:3000`

<hr>

**Dikerjakan oleh: Wisnu Rananta Raditya Putra - 2311102013**
