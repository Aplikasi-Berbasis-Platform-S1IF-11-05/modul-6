const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'products.json');

// ============================================================
// MIDDLEWARE
// ============================================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ============================================================
// HELPER: Baca & Tulis JSON
// ============================================================
function readProducts() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeProducts(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// ============================================================
// ROUTES — Halaman Utama
// ============================================================
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ============================================================
// API — GET semua produk
// GET /api/products
// ============================================================
app.get('/api/products', (req, res) => {
  try {
    const products = readProducts();

    // Optional: filter by search query
    const { search, kategori } = req.query;
    let result = products;

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.nama.toLowerCase().includes(q) ||
        p.kategori.toLowerCase().includes(q) ||
        (p.keterangan && p.keterangan.toLowerCase().includes(q))
      );
    }

    if (kategori && kategori !== 'all') {
      result = result.filter(p => p.kategori === kategori);
    }

    res.json({ success: true, data: result, total: result.length });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal membaca data produk', error: err.message });
  }
});

// ============================================================
// API — GET satu produk by ID
// GET /api/products/:id
// ============================================================
app.get('/api/products/:id', (req, res) => {
  try {
    const products = readProducts();
    const product = products.find(p => p.id === req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });
    }

    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Terjadi kesalahan', error: err.message });
  }
});

// ============================================================
// API — CREATE produk baru
// POST /api/products
// ============================================================
app.post('/api/products', (req, res) => {
  try {
    const { nama, kategori, stok, harga, satuan, keterangan } = req.body;

    // Validasi field wajib
    if (!nama || !kategori || stok === undefined || harga === undefined || !satuan) {
      return res.status(400).json({
        success: false,
        message: 'Field nama, kategori, stok, harga, dan satuan wajib diisi'
      });
    }

    const products = readProducts();

    const newProduct = {
      id: 'prod-' + uuidv4().slice(0, 8),
      nama: nama.trim(),
      kategori: kategori.trim(),
      stok: parseInt(stok),
      harga: parseFloat(harga),
      satuan: satuan.trim(),
      keterangan: keterangan ? keterangan.trim() : '',
      createdAt: new Date().toISOString()
    };

    products.push(newProduct);
    writeProducts(products);

    res.status(201).json({
      success: true,
      message: `Produk "${newProduct.nama}" berhasil ditambahkan`,
      data: newProduct
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal menambahkan produk', error: err.message });
  }
});

// ============================================================
// API — UPDATE produk
// PUT /api/products/:id
// ============================================================
app.put('/api/products/:id', (req, res) => {
  try {
    const products = readProducts();
    const index = products.findIndex(p => p.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });
    }

    const { nama, kategori, stok, harga, satuan, keterangan } = req.body;

    if (!nama || !kategori || stok === undefined || harga === undefined || !satuan) {
      return res.status(400).json({
        success: false,
        message: 'Field nama, kategori, stok, harga, dan satuan wajib diisi'
      });
    }

    const updatedProduct = {
      ...products[index],
      nama: nama.trim(),
      kategori: kategori.trim(),
      stok: parseInt(stok),
      harga: parseFloat(harga),
      satuan: satuan.trim(),
      keterangan: keterangan ? keterangan.trim() : '',
      updatedAt: new Date().toISOString()
    };

    products[index] = updatedProduct;
    writeProducts(products);

    res.json({
      success: true,
      message: `Produk "${updatedProduct.nama}" berhasil diperbarui`,
      data: updatedProduct
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal memperbarui produk', error: err.message });
  }
});

// ============================================================
// API — DELETE produk
// DELETE /api/products/:id
// ============================================================
app.delete('/api/products/:id', (req, res) => {
  try {
    const products = readProducts();
    const index = products.findIndex(p => p.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });
    }

    const deleted = products.splice(index, 1)[0];
    writeProducts(products);

    res.json({
      success: true,
      message: `Produk "${deleted.nama}" berhasil dihapus`,
      data: deleted
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal menghapus produk', error: err.message });
  }
});

// ============================================================
// API — GET daftar kategori unik
// GET /api/categories
// ============================================================
app.get('/api/categories', (req, res) => {
  try {
    const products = readProducts();
    const categories = [...new Set(products.map(p => p.kategori))].sort();
    res.json({ success: true, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal mengambil kategori' });
  }
});

// ============================================================
// API — GET statistik ringkas
// GET /api/stats
// ============================================================
app.get('/api/stats', (req, res) => {
  try {
    const products = readProducts();
    const totalProduk = products.length;
    const totalStok = products.reduce((sum, p) => sum + p.stok, 0);
    const totalNilai = products.reduce((sum, p) => sum + (p.stok * p.harga), 0);
    const stokRendah = products.filter(p => p.stok <= 10).length;

    res.json({
      success: true,
      data: { totalProduk, totalStok, totalNilai, stokRendah }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal mengambil statistik' });
  }
});

// ============================================================
// 404 Handler
// ============================================================
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route tidak ditemukan' });
});

// ============================================================
// START SERVER
// ============================================================
app.listen(PORT, () => {
  console.log('╔══════════════════════════════════════════╗');
  console.log('║   🏪  Toko Pak Cik & Aimar Inventari    ║');
  console.log('╠══════════════════════════════════════════╣');
  console.log(`║   Server running on http://localhost:${PORT}  ║`);
  console.log('║   Press Ctrl+C to stop                   ║');
  console.log('╚══════════════════════════════════════════╝');
});
