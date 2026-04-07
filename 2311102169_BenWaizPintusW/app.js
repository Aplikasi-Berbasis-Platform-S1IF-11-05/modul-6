const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static folder
app.use(express.static(path.join(__dirname, 'public')));

const FILE = path.join(__dirname, 'products.json');

// fungsi baca file aman
function readData() {
    try {
        const data = fs.readFileSync(FILE);
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

// fungsi tulis file
function writeData(data) {
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

// ================= CRUD =================

// READ
app.get('/api/products', (req, res) => {
    res.json(readData());
});

// CREATE
app.post('/api/products', (req, res) => {
    let data = readData();

    const newItem = {
        id: Date.now(),
        nama: req.body.nama,
        harga: req.body.harga,
        stok: req.body.stok
    };

    data.push(newItem);
    writeData(data);

    res.json({ message: "Berhasil tambah data" });
});

// UPDATE
app.put('/api/products/:id', (req, res) => {
    let data = readData();
    let id = parseInt(req.params.id);

    data = data.map(item =>
        item.id === id
            ? { ...item, ...req.body }
            : item
    );

    writeData(data);
    res.json({ message: "Berhasil update" });
});

// DELETE
app.delete('/api/products/:id', (req, res) => {
    let data = readData();
    let id = parseInt(req.params.id);

    data = data.filter(item => item.id !== id);

    writeData(data);
    res.json({ message: "Berhasil hapus" });
});

// ROOT TEST
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// START SERVER
app.listen(3000, () => {
    console.log("Server jalan di http://localhost:3000");
});