/**
 * Menyiapkan aplikasi Express utama untuk layanan API dan aset statis.
 *
 * Konfigurasi ini mencakup middleware umum, penyajian file publik,
 * pengaitan rute produk, serta penanganan respons untuk endpoint yang tidak ditemukan.
 *
 * @module server
 */
const express = require('express');
const cors = require('cors');
const path = require('path');
const productRoutes = require('./routes/productRoutes');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware Setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Folder Public (HTML/CSS/JS)
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api/products', productRoutes);

/**
 * Menangani permintaan ke endpoint yang tidak terdaftar.
 *
 * @param {import('express').Request} req - Objek permintaan HTTP.
 * @param {import('express').Response} res - Objek respons HTTP.
 * @returns {void}
 */
app.use((req, res) => {
    res.status(404).json({ status: 'error', message: 'Endpoint tidak ditemukan' });
});

/**
 * Memulai server HTTP pada port yang telah dikonfigurasi.
 *
 * @returns {void}
 */
app.listen(PORT, () => {
    console.log(`[SERVER] Berjalan di http://localhost:${PORT}`);
});