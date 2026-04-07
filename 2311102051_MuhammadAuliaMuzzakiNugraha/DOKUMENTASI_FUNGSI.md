# Dokumentasi Fungsi

Dokumen ini menjelaskan fungsi-fungsi utama pada aplikasi inventori toko kelontong modern.

## 1. Backend (`app.js`)

### 1.1 `readData()`
- **Tujuan**: Membaca seluruh data produk dari file JSON.
- **Parameter**: Tidak ada.
- **Return**: `Array<Object>` data produk.
- **Alur singkat**:
  1. Baca file di `DATA_PATH` dengan `fs.readFileSync`.
  2. Parse hasil baca dengan `JSON.parse`.
  3. Jika kosong, fallback ke array kosong (`[]`).

### 1.2 `writeData(data)`
- **Tujuan**: Menyimpan data produk ke file JSON.
- **Parameter**:
  - `data` (`Array<Object>`): daftar produk yang akan disimpan.
- **Return**: Tidak ada.
- **Alur singkat**:
  1. Konversi `data` menjadi JSON terformat (`JSON.stringify(..., null, 2)`).
  2. Tulis ke file `DATA_PATH` dengan `fs.writeFileSync`.

### 1.3 Handler `GET /`
- **Tujuan**: Menampilkan halaman utama aplikasi.
- **Parameter**:
  - `req`: object request Express.
  - `res`: object response Express.
- **Return**: Render view `index`.

### 1.4 Handler `GET /api/products`
- **Tujuan**: Mengambil semua data produk untuk frontend.
- **Parameter**:
  - `req`: object request Express.
  - `res`: object response Express.
- **Return**: JSON array produk (`res.json(readData())`).

### 1.5 Handler `POST /api/products`
- **Tujuan**: Menambahkan produk baru.
- **Parameter**:
  - `req.body.name` (`string`): nama produk.
  - `req.body.price` (`number|string`): harga produk.
  - `req.body.stock` (`number|string`): stok produk.
- **Return**: JSON status `{ success: true }`.
- **Alur singkat**:
  1. Ambil semua produk lama (`readData()`).
  2. Bentuk object produk baru dengan `id: Date.now()`.
  3. Tambah ke array, lalu simpan menggunakan `writeData(products)`.

### 1.6 Handler `PUT /api/products/:id`
- **Tujuan**: Memperbarui data produk berdasarkan ID.
- **Parameter**:
  - `req.params.id` (`number|string`): ID produk target.
  - `req.body`: field yang ingin diubah (misalnya `name`, `price`, `stock`).
- **Return**: JSON status `{ success: true }`.
- **Alur singkat**:
  1. Cari index produk berdasarkan `id`.
  2. Jika ditemukan, gabungkan data lama dan data baru (`spread operator`).
  3. Simpan ulang ke file JSON.

### 1.7 Handler `DELETE /api/products/:id`
- **Tujuan**: Menghapus produk berdasarkan ID.
- **Parameter**:
  - `req.params.id` (`number|string`): ID produk target.
- **Return**: JSON status `{ success: true }`.
- **Alur singkat**:
  1. Ambil data produk saat ini.
  2. Filter produk yang ID-nya tidak sama dengan target.
  3. Simpan hasil filter ke file JSON.

### 1.8 Callback `app.listen(PORT, callback)`
- **Tujuan**: Menjalankan server dan menampilkan URL akses di console.
- **Parameter**:
  - `PORT` (`number`): port server.
  - `callback` (`Function`): fungsi yang dipanggil saat server sukses berjalan.
- **Return**: Instance server (dikelola oleh Express/Node).

---

## 2. Frontend (`views/index.ejs`, bagian `<script>`)

### 2.1 `toNumber(value)`
- **Tujuan**: Konversi nilai ke angka dengan fallback aman.
- **Parameter**:
  - `value` (`any`): nilai input.
- **Return**: `number` (0 jika bukan angka valid).

### 2.2 `formatCurrency(value)`
- **Tujuan**: Format angka menjadi mata uang Rupiah (`IDR`).
- **Parameter**:
  - `value` (`number|string`): nominal yang ingin diformat.
- **Return**: `string` format Rupiah (contoh: `Rp10.000`).

### 2.3 `escapeHtml(text)`
- **Tujuan**: Mencegah HTML injection/XSS pada teks yang dirender.
- **Parameter**:
  - `text` (`string`): teks mentah.
- **Return**: `string` yang sudah di-escape (`&`, `<`, `>`, `"`, `'`).

### 2.4 `showToast(message, type)`
- **Tujuan**: Menampilkan notifikasi toast Bootstrap.
- **Parameter**:
  - `message` (`string`): isi notifikasi.
  - `type` (`"success"|"danger"|"warning"|"info"`): varian warna.
- **Return**: Tidak ada.

### 2.5 `renderStats(products)`
- **Tujuan**: Menghitung dan menampilkan statistik ringkas inventori.
- **Parameter**:
  - `products` (`Array<Object>`): daftar produk.
- **Return**: Tidak ada.
- **Output UI**:
  - Total produk.
  - Total stok.
  - Estimasi nilai inventori.

### 2.6 `renderHighlight(products)`
- **Tujuan**: Menampilkan produk dengan stok tertinggi pada panel trend.
- **Parameter**:
  - `products` (`Array<Object>`): daftar produk.
- **Return**: Tidak ada.

### 2.7 `renderMeta(totalFiltered, keyword)`
- **Tujuan**: Menampilkan jumlah hasil produk berdasarkan pencarian.
- **Parameter**:
  - `totalFiltered` (`number`): jumlah produk setelah filter.
  - `keyword` (`string`): kata kunci pencarian.
- **Return**: Tidak ada.

### 2.8 `renderProducts(products)`
- **Tujuan**: Render daftar produk ke dalam grid card Bootstrap.
- **Parameter**:
  - `products` (`Array<Object>`): daftar produk yang akan ditampilkan.
- **Return**: Tidak ada.
- **Catatan**:
  - Menampilkan state kosong saat data tidak ditemukan.
  - Menyesuaikan badge stok (`Stok Menipis` / `Stok Aman`).

### 2.9 `renderDashboard()`
- **Tujuan**: Fungsi orkestrasi render seluruh dashboard.
- **Parameter**: Tidak ada.
- **Return**: Tidak ada.
- **Alur singkat**:
  1. Ambil nilai pencarian.
  2. Filter `appState.products`.
  3. Panggil `renderStats`, `renderHighlight`, `renderMeta`, dan `renderProducts`.

### 2.10 `loadData()`
- **Tujuan**: Mengambil data produk dari API, lalu render dashboard.
- **Parameter**: Tidak ada.
- **Return**: Tidak ada.
- **Catatan**:
  - `GET /api/products`.
  - Jika gagal, tampilkan toast error.

### 2.11 `openModal()`
- **Tujuan**: Menyiapkan form untuk mode tambah produk.
- **Parameter**: Tidak ada.
- **Return**: Tidak ada.
- **Aksi**:
  - Reset form.
  - Kosongkan ID tersembunyi.
  - Ganti judul/subjudul modal.
  - Tampilkan modal.

### 2.12 `fillModalByProduct(product)`
- **Tujuan**: Mengisi form modal untuk mode edit.
- **Parameter**:
  - `product` (`Object`): data produk terpilih.
- **Return**: Tidak ada.

### 2.13 Handler submit `#productForm`
- **Tujuan**: Menyimpan data produk (create/update).
- **Parameter event**:
  - `event`: event submit form.
- **Return**: Tidak ada.
- **Alur singkat**:
  1. Cegah reload halaman (`preventDefault`).
  2. Ambil nilai form lalu validasi nama.
  3. Tentukan method (`POST`/`PUT`) dan URL.
  4. Kirim AJAX JSON.
  5. Jika sukses: tutup modal, reload data, tampilkan toast.

### 2.14 Handler click `.js-edit`
- **Tujuan**: Membuka modal edit untuk produk yang dipilih.
- **Parameter event**: event klik tombol edit.
- **Return**: Tidak ada.

### 2.15 Handler click `.js-delete`
- **Tujuan**: Menyiapkan proses hapus dan menampilkan modal konfirmasi.
- **Parameter event**: event klik tombol hapus.
- **Return**: Tidak ada.

### 2.16 Handler click `#confirmDeleteBtn`
- **Tujuan**: Menjalankan delete produk setelah konfirmasi.
- **Parameter event**: event klik tombol konfirmasi hapus.
- **Return**: Tidak ada.
- **Catatan**:
  - `DELETE /api/products/:id`.
  - Jika sukses: tutup modal, reload data, tampilkan toast.

### 2.17 Handler input `#searchInput`
- **Tujuan**: Menyaring produk secara real-time saat user mengetik.
- **Parameter event**: event input.
- **Return**: Tidak ada.

### 2.18 Handler click `#clearSearchBtn`
- **Tujuan**: Mengosongkan pencarian dan render ulang daftar produk.
- **Parameter event**: event klik.
- **Return**: Tidak ada.

### 2.19 Handler `$(document).ready(...)`
- **Tujuan**: Inisialisasi awal saat halaman selesai dimuat.
- **Parameter event**: event ready DOM.
- **Return**: Tidak ada.
- **Aksi**:
  - Memanggil `loadData()` pertama kali.

---

## 3. Ringkasan Alur Utama

1. Halaman dibuka -> `loadData()` dipanggil.
2. Data produk diambil dari backend (`GET /api/products`).
3. Dashboard dirender (`renderDashboard()`).
4. User bisa:
   - Menambah produk (`openModal` + submit form `POST`).
   - Mengedit produk (klik `.js-edit` + submit form `PUT`).
   - Menghapus produk (klik `.js-delete` + `confirmDeleteBtn` -> `DELETE`).
5. Setiap perubahan data akan reload daftar produk dan update statistik.
