const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DB_FILE = path.join(__dirname, 'db.json');

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ─── Helper: Baca & Tulis JSON Database ──────────────────────────────────────
function readDB() {
    if (!fs.existsSync(DB_FILE)) {
        fs.writeFileSync(DB_FILE, JSON.stringify({ products: [], nextId: 1 }, null, 2));
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
}

function writeDB(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// ─── API Routes ───────────────────────────────────────────────────────────────

// GET semua produk
app.get('/api/products', (req, res) => {
    const db = readDB();
    res.json(db.products);
});

// GET produk by ID
app.get('/api/products/:id', (req, res) => {
    const db = readDB();
    const id = parseInt(req.params.id);
    const product = db.products.find(p => p.id === id);
    if (!product) return res.status(404).json({ message: 'Produk tidak ditemukan' });
    res.json(product);
});

// POST tambah produk
app.post('/api/products', (req, res) => {
    const { nama, harga, stok } = req.body;
    if (!nama || !harga || !stok) {
        return res.status(400).json({ message: 'Semua field wajib diisi' });
    }
    const db = readDB();
    const newProduct = {
        id: db.nextId++,
        nama: nama.trim(),
        harga: parseFloat(harga),
        stok: parseInt(stok),
        createdAt: new Date().toISOString()
    };
    db.products.push(newProduct);
    writeDB(db);
    res.status(201).json({ message: 'Produk berhasil ditambahkan', data: newProduct });
});

// PUT update produk
app.put('/api/products/:id', (req, res) => {
    const db = readDB();
    const id = parseInt(req.params.id);
    const index = db.products.findIndex(p => p.id === id);
    if (index === -1) return res.status(404).json({ message: 'Produk tidak ditemukan' });

    const { nama, harga, stok } = req.body;
    if (!nama || !harga || !stok) {
        return res.status(400).json({ message: 'Semua field wajib diisi' });
    }

    db.products[index] = {
        ...db.products[index],
        nama: nama.trim(),
        harga: parseFloat(harga),
        stok: parseInt(stok),
        updatedAt: new Date().toISOString()
    };
    writeDB(db);
    res.json({ message: 'Produk berhasil diupdate', data: db.products[index] });
});

// DELETE hapus produk
app.delete('/api/products/:id', (req, res) => {
    const db = readDB();
    const id = parseInt(req.params.id);
    const index = db.products.findIndex(p => p.id === id);
    if (index === -1) return res.status(404).json({ message: 'Produk tidak ditemukan' });

    db.products.splice(index, 1);
    writeDB(db);
    res.json({ message: 'Produk berhasil dihapus' });
});

// ─── Fallback ke index.html ───────────────────────────────────────────────────
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`✅ Server berjalan di http://localhost:${PORT}`);
    console.log(`📦 Database: ${DB_FILE}`);
});
