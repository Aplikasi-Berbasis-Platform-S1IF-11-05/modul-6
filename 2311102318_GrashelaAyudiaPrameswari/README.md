# Inventari Toko Pak Cik & Aimar

**Modul 6 - Aplikasi Berbasis Platform**
**NIM:** 2311102318
**Nama:** Grashela Ayudia Prameswari

---

## Deskripsi Project

Aplikasi web inventari untuk mengelola produk di Toko Kelontong Pak Cik dan Aimar. Aplikasi ini menyediakan fitur CRUD (Create, Read, Update, Delete) untuk pengelolaan data produk dengan penyimpanan berbasis file JSON.

## Tech Stack

| Komponen       | Teknologi                     |
| -------------- | ----------------------------- |
| Framework      | Laravel 12                    |
| Styling        | Bootstrap 5.3                 |
| DOM Manipulation | jQuery 3.7                  |
| DataTable      | DataTables 1.13               |
| Icon           | Font Awesome 6.5              |
| Data Storage   | JSON File (`products.json`)   |

## Struktur Project

```
├── app/
│   └── Http/Controllers/
│       └── ProductController.php     # Controller CRUD produk
├── resources/views/
│   ├── layouts/
│   │   └── app.blade.php             # Layout utama (Bootstrap + jQuery)
│   └── products/
│       ├── index.blade.php           # Halaman daftar produk (DataTable)
│       ├── create.blade.php          # Form tambah produk
│       └── edit.blade.php            # Form edit produk
├── routes/
│   └── web.php                       # Definisi route resource
├── storage/app/
│   └── products.json                 # Data produk (JSON)
└── README.md
```

## Fitur

1. **Daftar Produk (DataTable)** - Menampilkan semua produk dalam tabel interaktif dengan fitur pencarian, pengurutan, dan paginasi
2. **Tambah Produk** - Form untuk menambahkan produk baru dengan validasi
3. **Edit Produk** - Form untuk mengubah data produk yang sudah ada
4. **Hapus Produk** - Konfirmasi modal sebelum menghapus produk
5. **Preview Harga** - Format harga Rupiah secara real-time saat mengisi form
6. **Indikator Stok** - Badge berwarna berdasarkan jumlah stok (merah/kuning/hijau)

## Penggunaan jQuery

jQuery digunakan untuk DOM manipulation pada:

- **DataTable initialization** - `$('#productsTable').DataTable({...})`
- **Event handling** - `$('.btn-delete').on('click', ...)` untuk tombol hapus
- **DOM manipulation** - `$('#deleteProductName').text(...)` untuk mengisi modal
- **Form validation** - `$('#createForm').on('submit', ...)` validasi client-side
- **Animasi** - `$('#flash-alert').fadeOut(...)` dan `$('#hargaPreview').fadeIn()`
- **Input formatting** - Preview harga real-time saat mengetik

## Cara Menjalankan

### Prasyarat
- PHP >= 8.2
- Composer

### Langkah Instalasi

```bash
# 1. Install dependencies
composer install

# 2. Copy file environment
cp .env.example .env

# 3. Generate application key
php artisan key:generate

# 4. Jalankan server
php artisan serve
```

### Akses Aplikasi
Buka browser dan akses: `http://localhost:8000`

## API Routes

| Method | URI                | Action  | Keterangan        |
| ------ | ------------------ | ------- | ----------------- |
| GET    | `/products`        | index   | Daftar produk     |
| GET    | `/products/create` | create  | Form tambah       |
| POST   | `/products`        | store   | Simpan produk     |
| GET    | `/products/{id}/edit` | edit | Form edit         |
| PUT    | `/products/{id}`   | update  | Update produk     |
| DELETE | `/products/{id}`   | destroy | Hapus produk      |

## Format Data JSON

Data produk disimpan di `storage/app/products.json`:

```json
{
    "id": 1,
    "nama": "Indomie Goreng",
    "kategori": "Makanan",
    "harga": 3500,
    "stok": 150,
    "created_at": "2026-04-05 10:00:00",
    "updated_at": "2026-04-05 10:00:00"
}
```

## Screenshot

### Halaman Daftar Produk
Menampilkan DataTable dengan fitur search, sort, dan pagination. Setiap produk memiliki tombol Edit dan Hapus.

### Form Tambah/Edit Produk
Form dengan validasi server-side dan client-side, dropdown kategori, dan preview harga real-time.

### Modal Konfirmasi Hapus
Modal Bootstrap yang muncul saat tombol hapus ditekan, menampilkan nama produk yang akan dihapus.
