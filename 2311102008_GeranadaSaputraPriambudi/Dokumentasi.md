# Toko Kelontong Pak Cik & Aimar - Inventory System

Sistem manajemen inventori modern berbasis web yang dirancang untuk membantu Pak Cik dan Aimar mengelola stok barang di Toko Kelontong mereka dengan mudah, cepat, dan elegan.

## ✨ Fitur Utama

- **Premium UI/UX**: Tampilan modern dengan estetika *glassmorphism* dan palet warna yang harmonis.
- **CRUD Operations**: Tambah, Lihat, Edit, dan Hapus produk secara *real-time* tanpa memuat ulang halaman (AJAX).
- **DataTable Style**: Tabel produk yang responsif dilengkapi dengan fitur pencarian instan.
- **JSON Storage**: Penyimpanan data yang efisien menggunakan file `.json`, tidak memerlukan konfigurasi database yang rumit.
- **Form Validation**: Memastikan data yang dimasukkan valid sebelum disimpan ke sistem.
- **Confirmation Modal**: Fitur keamanan untuk mencegah penghapusan data secara tidak sengaja.

## 🛠️ Teknologi yang Digunakan

- **Backend**: Python-Flask
- **Frontend**: HTML5, CSS3 (Custom styles), JavaScript
- **Styling**: Bootstrap 5
- **Interactivity**: jQuery (AJAX & DOM Manipulation)
- **Data Persistence**: JSON File (`data/products.json`)
- **Typography**: Google Fonts (Outfit)

## 📁 Struktur Project

```
Modul6/
├── app.py              # Entry point Flask server & API
├── data/
│   └── products.json   # File penyimpanan data produk
├── static/
│   ├── css/
│   │   └── style.css   # Custom premium styling
│   └── js/
│   │   └── script.js  # Frontend logic (jQuery)
├── templates/
│   └── index.html      # Struktur halaman utama (Bootstrap)
└── README.md           # Dokumentasi project
```

## 🚀 Cara Menjalankan

1. **Pastikan Python Terpasang**:
   Cek dengan menjalankan `python --version` di terminal Anda.

2. **Install Dependensi**:
   Pastikan library Flask sudah terinstall:
   ```bash
   pip install flask
   ```

3. **Jalankan Aplikasi**:
   Masuk ke direktori project dan jalankan perintah:
   ```bash
   python app.py
   ```

4. **Akses di Browser**:
   Buka browser Anda dan kunjungi `http://127.0.0.1:5000/`.

## 📝 Catatan Teknis

- Aplikasi ini menggunakan pendekatan **Single Page Application (SPA)** sederhana di mana semua operasi CRUD dilakukan melalui API Flask yang dipanggil menggunakan jQuery `$.ajax`.
- Data produk secara otomatis disimpan di `data/products.json` setiap kali ada perubahan (Add/Edit/Delete).
- Styling dikustomisasi secara khusus di `style.css` untuk memberikan kesan premium yang lebih kuat dibandingkan gaya bawaan Bootstrap.

---
*Dibuat dengan ❤️ untuk Toko Kelontong Pak Cik dan Aimar.*
