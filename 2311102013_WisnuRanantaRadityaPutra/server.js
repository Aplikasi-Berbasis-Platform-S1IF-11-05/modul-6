const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

const dataPath = path.join(__dirname, 'data.json');

// Helper function untuk membaca dan menulis JSON
const readData = () => JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const writeData = (data) => fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

// API: Get All Products
app.get('/api/products', (req, res) => {
    res.json(readData());
});

// API: Create Product
app.post('/api/products', (req, res) => {
    const products = readData();
    const newProduct = {
        id: Date.now().toString(), // ID pake timestamp
        nama: req.body.nama,
        harga: req.body.harga,
        stok: req.body.stok
    };
    products.push(newProduct);
    writeData(products);
    res.json({ message: 'Produk berhasil ditambahkan!', data: newProduct });
});

// API: Update Product
app.put('/api/products/:id', (req, res) => {
    const products = readData();
    const index = products.findIndex(p => p.id === req.params.id);
    if (index !== -1) {
        products[index] = { ...products[index], ...req.body };
        writeData(products);
        res.json({ message: 'Produk berhasil diupdate!' });
    } else {
        res.status(404).json({ message: 'Produk tidak ditemukan' });
    }
});

// API: Delete Product
app.delete('/api/products/:id', (req, res) => {
    let products = readData();
    products = products.filter(p => p.id !== req.params.id);
    writeData(products);
    res.json({ message: 'Produk berhasil dihapus!' });
});


app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});