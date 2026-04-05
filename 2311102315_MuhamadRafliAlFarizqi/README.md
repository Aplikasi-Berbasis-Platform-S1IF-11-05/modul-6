# Inventori Toko Kelontong Pak Cik & Aimar

**Modul 6 - Aplikasi Berbasis Platform**
Muhamad Rafli Al Farizqi — 2311102315

---

## Deskripsi Project

Aplikasi web inventori untuk mengelola produk Toko Kelontong milik Pak Cik & Aimar. Dibangun menggunakan **Laravel 13** sebagai backend framework, dengan data disimpan dalam format **JSON** (tanpa database). Frontend menggunakan **Bootstrap 5** untuk styling, **jQuery** untuk DOM manipulation, dan **DataTables** untuk menampilkan data produk secara interaktif.

## Fitur

- **CRUD Produk** — Create, Read, Update, Delete produk toko
- **DataTables** — Tabel interaktif dengan fitur pencarian, sorting, dan pagination
- **Form Tambah Produk** — Modal form untuk menambahkan produk baru
- **Form Edit Produk** — Modal form untuk mengedit produk yang sudah ada
- **Konfirmasi Hapus** — Modal konfirmasi sebelum menghapus produk
- **Dashboard Statistik** — Ringkasan total produk, total stok, jumlah kategori, dan peringatan stok rendah
- **Indikator Stok** — Badge warna untuk status stok (Rendah/Sedang/Aman)
- **Notifikasi Toast** — Feedback visual setelah setiap operasi CRUD
- **Validasi Form** — Validasi input di sisi server (Laravel) dengan feedback error
- **Penyimpanan JSON** — Data produk disimpan di file `storage/app/products.json`

## Tech Stack

| Komponen    | Teknologi                     |
|-------------|-------------------------------|
| Backend     | Laravel 13 (PHP 8.3+)        |
| Frontend    | Bootstrap 5.3, jQuery 3.7    |
| Tabel Data  | DataTables 1.13               |
| Ikon        | Bootstrap Icons               |
| Penyimpanan | JSON File (`products.json`)   |
| DOM         | jQuery (AJAX, event handling) |

## Struktur Project (File Utama)

```
├── app/Http/Controllers/
│   └── ProductController.php       # Controller CRUD dengan JSON storage
├── resources/views/products/
│   └── index.blade.php             # Halaman utama (DataTable + Modal)
├── routes/
│   └── web.php                     # Routing aplikasi
├── storage/app/
│   └── products.json               # Data produk (JSON)
└── README.md                       # Dokumentasi project
```

## Instalasi & Menjalankan

### Prasyarat
- PHP >= 8.3
- Composer

### Langkah-langkah

```bash
# 1. Clone repository / masuk ke direktori project
cd 2311102315_MuhamadRafliAlFarizqi

# 2. Install dependencies
composer install

# 3. Copy file environment
cp .env.example .env

# 4. Generate application key
php artisan key:generate

# 5. Jalankan server
php artisan serve
```

Buka browser di **http://localhost:8000**

## API Endpoints

| Method   | URL               | Deskripsi                          |
|----------|-------------------|------------------------------------|
| `GET`    | `/products`       | Halaman utama daftar produk        |
| `GET`    | `/products/data`  | API: Ambil semua data produk (JSON)|
| `POST`   | `/products`       | API: Tambah produk baru            |
| `GET`    | `/products/{id}`  | API: Detail satu produk            |
| `PUT`    | `/products/{id}`  | API: Update produk                 |
| `DELETE` | `/products/{id}`  | API: Hapus produk                  |

## Kategori Produk

Makanan, Minuman, Snack, Bumbu Dapur, Peralatan Rumah, Kebersihan, Rokok, Obat-obatan, Lainnya

## Screenshot

Setelah menjalankan server, halaman utama akan menampilkan:
1. **Navbar** — Header dengan nama toko
2. **Kartu Statistik** — 4 kartu ringkasan (Total Produk, Total Stok, Kategori, Stok Rendah)
3. **Tabel DataTables** — Daftar produk dengan tombol Edit & Hapus
4. **Modal Tambah/Edit** — Form input produk
5. **Modal Hapus** — Konfirmasi penghapusan produk

## Cara Penggunaan

1. **Tambah Produk**: Klik tombol "Tambah Produk" > Isi form > Klik "Simpan"
2. **Edit Produk**: Klik ikon pensil (kuning) pada baris produk > Ubah data > Klik "Simpan"
3. **Hapus Produk**: Klik ikon tempat sampah (merah) pada baris produk > Konfirmasi "Ya, Hapus!"
4. **Cari Produk**: Gunakan kotak pencarian di DataTable
5. **Sorting**: Klik header kolom untuk mengurutkan data
