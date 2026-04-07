# 📦 Toko Kelontong Pak Cik & Aimar — Sistem Inventori

Aplikasi web inventori toko kelontong menggunakan **Flask** (Python). Menyediakan fitur CRUD (Create, Read, Update, Delete) untuk mengelola data produk, dengan data disimpan dalam format **JSON** (tanpa database).

## 🛠 Tech Stack

| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| **Python** | 3.x | Bahasa pemrograman backend |
| **Flask** | 3.0+ | Web framework untuk backend & routing |
| **jQuery** | 3.7.1 | DOM manipulation & AJAX requests |
| **Bootstrap** | 5.3.3 | CSS framework untuk styling responsif |
| **DataTables** | 1.13.8 | Plugin jQuery untuk tabel interaktif |
| **Bootstrap Icons** | 1.11.3 | Icon library |
| **JSON** | - | Format penyimpanan data (bukan database) |

---

## 📁 Struktur Project

```
Modul6/
├── app.py                      # File utama aplikasi Flask
├── requirements.txt            # Daftar dependency Python
├── README.md                   # Dokumentasi project
├── data/
│   └── products.json           # File penyimpanan data produk (JSON)
├── templates/
│   └── index.html              # Template HTML utama (Jinja2)
└── static/
    ├── css/
    │   └── style.css           # Custom stylesheet
    └── js/
        └── app.js              # Script jQuery untuk DOM manipulation
```

### Penjelasan Struktur:

- **`app.py`** — Entry point aplikasi. Berisi konfigurasi Flask, fungsi helper untuk baca/tulis JSON, serta semua route (halaman & API endpoint).
- **`data/products.json`** — File JSON yang berfungsi sebagai "database". Menyimpan array objek produk.
- **`templates/index.html`** — Template Jinja2 yang menjadi halaman utama. Berisi layout Bootstrap, tabel DataTable, modal form CRUD, dan modal delete.
- **`static/css/style.css`** — Custom CSS dengan dark theme, animasi, dan responsive design.
- **`static/js/app.js`** — Seluruh logika frontend menggunakan jQuery: AJAX request, DataTable initialization, form handling, validasi, dan notifikasi.

---

## 🚀 Instalasi & Menjalankan

### Prasyarat

- Python 3.x sudah terinstal
- pip (Python package manager)

### Langkah Instalasi

1. **Buka terminal** dan masuk ke direktori project:
   ```bash
   cd Modul6
   ```

2. **Install dependency**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Jalankan aplikasi**:
   ```bash
   python app.py
   ```

4. **Buka browser** dan akses:
   ```
   http://localhost:5000
   ```

---

