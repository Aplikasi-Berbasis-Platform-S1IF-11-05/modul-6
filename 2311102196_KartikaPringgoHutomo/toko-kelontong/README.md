# 🛒 Toko Kelontong — CRUD App

Aplikasi manajemen produk toko kelontong sederhana menggunakan **Express.js** sebagai backend dengan **JSON file** sebagai database, dan **jQuery + AJAX** di frontend.

---

## 📁 Struktur Proyek

```
toko-kelontong/
├── server.js          # Backend Express.js (REST API)
├── db.json            # Database JSON (otomatis dibuat)
├── package.json
├── public/
│   ├── index.html     # Halaman daftar produk
│   ├── create.html    # Halaman tambah produk
│   └── edit.html      # Halaman edit produk
└── README.md
```

---

## 🚀 Cara Menjalankan

### 1. Install Dependencies
```bash
npm install
```

### 2. Jalankan Server
```bash
# Mode normal
npm start

# Mode development (auto-restart)
npm run dev
```

### 3. Buka Browser
```
http://localhost:3000
```

---

## 🔌 REST API Endpoints

| Method | Endpoint             | Deskripsi           |
|--------|----------------------|---------------------|
| GET    | `/api/products`      | Ambil semua produk  |
| GET    | `/api/products/:id`  | Ambil produk by ID  |
| POST   | `/api/products`      | Tambah produk baru  |
| PUT    | `/api/products/:id`  | Update produk       |
| DELETE | `/api/products/:id`  | Hapus produk        |

### Contoh Request Body (POST / PUT)
```json
{
  "nama": "Beras 5kg",
  "harga": 65000,
  "stok": 50
}
```

---

## ⚙️ Teknologi

- **Backend**: Node.js + Express.js
- **Database**: JSON file (`db.json`)
- **Frontend**: HTML + Bootstrap 5 + jQuery + AJAX + DataTables
