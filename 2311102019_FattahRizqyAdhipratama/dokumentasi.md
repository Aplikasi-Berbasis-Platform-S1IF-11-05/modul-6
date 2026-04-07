# Dokumentasi Project

## Deskripsi Singkat
Project ini merupakan aplikasi **web inventaris toko kelontong Pak Cik dan Mas Aimar** yang dibangun menggunakan **Python Flask** sebagai backend, **jQuery** untuk manipulasi DOM dan AJAX, serta **Bootstrap 5** untuk tampilan antarmuka. Aplikasi ini menyediakan fitur **CRUD (Create, Read, Update, Delete)** untuk mengelola data produk berupa nama produk, stok, dan harga. Seluruh data disimpan ke dalam file **JSON** sehingga tidak memerlukan database.

## Teknologi yang Digunakan
- **Python Flask** → backend dan REST API
- **jQuery** → DOM manipulation dan AJAX request
- **Bootstrap 5** → modal dan komponen UI
- **JSON File** → penyimpanan data produk
- **Custom CSS** → mempercantik tampilan dashboard inventaris

## Fitur Utama
- Menampilkan daftar produk secara dinamis
- Menambah produk baru melalui modal form
- Mengedit data produk langsung dari tabel
- Menghapus produk dengan konfirmasi modal
- Data tersimpan permanen pada `products.json`
- Tampilan responsive dan user friendly

## Alur Sistem
1. User membuka halaman utama inventaris.
2. jQuery mengambil data dari endpoint `/api/products`.
3. Data ditampilkan secara dinamis ke dalam tabel produk.
4. Tambah dan edit produk dilakukan melalui modal popup.
5. Data dikirim ke Flask menggunakan AJAX (`POST` / `PUT`).
6. Saat produk dihapus, sistem mengirim request `DELETE`.
7. File JSON diperbarui lalu tabel otomatis refresh.

## Endpoint API
- `GET /api/products` → mengambil semua data produk
- `POST /api/products` → menambahkan produk baru
- `PUT /api/products/<id>` → mengubah data produk
- `DELETE /api/products/<id>` → menghapus produk

## Cara Menjalankan
```bash
pip install flask
python app.py
```

Buka browser:
```bash
http://127.0.0.1:5000
```