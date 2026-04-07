# Sistem Inventori Toko Kelontong Pak Cik & Aimar

Sistem manajemen inventori produk sederhana yang dibangun menggunakan **Flask**, **jQuery**, dan **Bootstrap 5**. Proyek ini memungkinkan pengelolaan stok barang (CRUD) dengan antarmuka yang modern dan responsif.

## Fitur Utama

- **Tampilan Dashboard Modern**: Menggunakan desain dark-mode yang premium dengan orientasi visual yang bersih.
- **Manajemen Produk (CRUD)**:
    - **Tambah Produk**: Form modal untuk menambahkan produk baru.
    - **Lihat Produk**: Tabel interaktif yang menampilkan daftar produk, kategori, stok, dan harga.
    - **Edit Produk**: Form modal untuk memperbarui data produk yang sudah ada.
    - **Hapus Produk**: Konfirmasi modal sebelum menghapus data untuk mencegah kesalahan.
- **Penyimpanan JSON**: Seluruh data disimpan dalam file `data/products.json`, tidak memerlukan database eksternal.
- **Interaksi Real-time**: Menggunakan jQuery AJAX untuk operasi data tanpa memuat ulang halaman (Single Page Application feel).

## Teknologi yang Digunakan

1. **Backend**: Flask (Python)
2. **Frontend Styling**: Bootstrap 5, Custom CSS3
3. **DOM Manipulation & AJAX**: jQuery 3.7.1
4. **Icons**: Bootstrap Icons
5. **Data Storage**: JSON File Handling

## Cara Menjalankan Proyek

1. **Pastikan Python Terinstal**: Proyek ini membutuhkan Python 3.x.
2. **Instal Flask**:
   ```bash
   pip install flask
   ```
3. **Jelajahi Direktori Proyek**:
   ```bash
   cd path/to/project
   ```
4. **Jalankan Aplikasi**:
   ```bash
   python app.py
   ```
5. **Akses di Browser**: Buka `http://127.0.0.1:5000` di browser Anda.

## Struktur Folder

```text
├── app.py              # Logika backend Flask & API
├── data/
│   └── products.json    # File penyimpanan data produk
├── static/
│   ├── css/
│   │   └── style.css    # Styling kustom (Premium Dark Mode)
│   └── js/
│       └── main.js      # Logika jQuery & AJAX
├── templates/
│   └── index.html       # Antarmuka pengguna utama
└── README.md           # Dokumentasi proyek
```

---
*Dibuat untuk keperluan praktikum Aplikasi Berbasis Platform - Modul 6.*
