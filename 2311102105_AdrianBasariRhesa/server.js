const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve file HTML statis dari folder public

const dataPath = path.join(__dirname, 'data', 'products.json');

// Fungsi Helper untuk baca/tulis JSON
const readData = () => JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const writeData = (data) => fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

// API: Dapatkan semua produk
app.get('/api/products', (req, res) => {
    res.json(readData());
});

// API: Tambah produk baru
app.post('/api/products', (req, res) => {
    const data = readData();
    const newProduct = {
        id: Date.now().toString(), // Generate ID unik
        nama: req.body.nama,
        kategori: req.body.kategori,
        harga: Number(req.body.harga),
        stok: Number(req.body.stok)
    };
    data.push(newProduct);
    writeData(data);
    res.status(201).json({ message: 'Produk berhasil ditambah!', data: newProduct });
});

// API: Update produk
app.put('/api/products/:id', (req, res) => {
    const data = readData();
    const index = data.findIndex(p => p.id === req.params.id);
    if (index !== -1) {
        data[index] = { ...data[index], ...req.body };
        writeData(data);
        res.json({ message: 'Produk berhasil diupdate!', data: data[index] });
    } else {
        res.status(404).json({ message: 'Produk tidak ditemukan' });
    }
});

// API: Hapus produk
app.delete('/api/products/:id', (req, res) => {
    const data = readData();
    const filteredData = data.filter(p => p.id !== req.params.id);
    writeData(filteredData);
    res.json({ message: 'Produk berhasil dihapus!' });
});

app.listen(PORT, () => {
    console.log(`Toko Pak Cik & Aimar berjalan di http://localhost:${PORT}`);
});