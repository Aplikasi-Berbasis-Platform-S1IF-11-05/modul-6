# Project Inventaris Toko Pak Cik & Mas Aimar

Proyek ini adalah aplikasi web berbasis Laravel untuk mengelola inventaris produk di toko Pak Cik dan Mas Aimar. Aplikasi ini menggunakan penyimpanan data dalam format JSON (bukan database SQL) sesuai permintaan, serta memanfaatkan jQuery untuk manipulasi DOM dan Bootstrap untuk styling.

## Fitur Utama
1.  **Dashboard Inventaris**: Tampilan data produk dalam format tabel interaktif (DataTables).
2.  **Tambah Produk**: Form modal Bootstrap untuk menambahkan produk baru.
3.  **Edit Produk**: Fitur perubahan data produk yang sudah ada lewat modal.
4.  **Hapus Produk**: Konfirmasi penghapusan data produk menggunakan modal Bootstrap.
5.  **Penyimpanan JSON**: Seluruh data disimpan secara lokal di file `inventory.json`.

## Teknologi yang Digunakan
-   **Framework**: Laravel 11
-   **Frontend Styling**: Bootstrap 5
-   **DOM Manipulation**: jQuery 3.6
-   **Table Plugin**: DataTables.net
-   **Penyimpanan**: JSON Local File System

## Struktur Proyek
-   `app/Http/Controllers/ProductController.php`: Berisi logika CRUD (Create, Read, Update, Delete) yang berinteraksi dengan file JSON.
-   `routes/web.php`: Definisi rute untuk setiap aksi CRUD.
-   `resources/views/welcome.blade.php`: Tampilan utama aplikasi (UI) yang memuat tabel dan modal-modal interaktif.
-   `storage/app/inventory.json`: File tempat penyimpanan data produk.

## Instruksi Instalasi & Penggunaan
1.  Pastikan PHP dan Composer sudah terinstal di sistem Anda.
2.  Jalankan perintah berikut untuk menginstal dependensi:
    ```bash
    composer install
    ```
3.  Salin file `.env.example` ke `.env`:
    ```bash
    cp .env.example .env
    ```
4.  Gunakan kunci aplikasi baru:
    ```bash
    php artisan key:generate
    ```
5.  Jalankan server pengembangan:
    ```bash
    php artisan serve
    ```
6.  Akses aplikasi melalui browser di `http://localhost:8000`.

## Dokumentasi API (AJAX)
Aplikasi ini menggunakan rute-rute berikut untuk mengelola data secara dinamis via jQuery:
-   `GET /`: Menampilkan halaman utama.
-   `GET /products/data`: Mengambil data produk dalam format JSON untuk tabel.
-   `POST /products`: Menyimpan produk baru.
-   `GET /products/{id}/edit`: Mengambil satu data produk untuk diedit.
-   `PUT /products/{id}`: Memperbarui data produk yang ada.
-   `DELETE /products/{id}`: Menghapus data produk.

---
**Dikembangkan oleh:** Brian Farrel Evandhika (2311102037)
**Untuk:** Praktikum ABP - Modul 6
