# Inventory System Toko Kelontong Pak Cik & Aimar

Sistem manajemen inventaris berbasis web yang dikembangkan menggunakan Flask, Bootstrap 5, dan jQuery. Projek ini menggunakan penyimpanan file JSON untuk persistensi data produk.

## Fitur Utama

- **Dashboard Inventaris**: Menampilkan daftar produk dalam bentuk datatable yang bersih dan modern.
- **CRUD Operasional**:
  - **Create**: Tambah produk baru melalui modal form.
  - **Read**: Tampilan data produk secara real-time dari file JSON.
  - **Update**: Edit informasi produk yang sudah ada.
  - **Delete**: Hapus produk dengan konfirmasi modal untuk mencegah kesalahan.
- **Modern UI/UX**: Desain premium menggunakan Bootstrap 5 dengan sentuhan gradient dan typography yang elegan.
- **AJAX Driven**: Manipulasi DOM dan operasi data dilakukan secara asinkron menggunakan jQuery untuk pengalaman pengguna yang mulus.

## Teknologi yang Digunakan

- **Backend**: Flask (Python)
- **Frontend**: Bootstrap 5, jQuery
- **Penyimpanan**: JSON (`data/products.json`)
- **Icon**: Font Awesome 6

## Struktur Projek

```text
.
├── app.py                # File utama Flask backend
├── data/
│   └── products.json     # Penyimpanan data produk (JSON)
├── static/
│   ├── css/
│   │   └── style.css     # Styling custom premium
│   └── js/
│       └── script.js     # Logika jQuery dan AJAX
├── templates/
│   ├── base.html         # Layout utama
│   └── index.html        # Halaman inventory (Dashboard)
└── README.md             # Dokumentasi projek
```

## Cara Menjalankan

1. Pastikan Python sudah terinstall.
2. Install Flask jika belum: `pip install flask`
3. Jalankan aplikasi: `python app.py`
4. Buka browser di `http://127.0.0.1:5000`

## Author
**Syiva Qaila Natasa Sugama** - 2311102106
