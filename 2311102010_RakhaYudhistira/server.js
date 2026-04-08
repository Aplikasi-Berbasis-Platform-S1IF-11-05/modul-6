const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Memberitahu Express bahwa file statis (HTML, JS, CSS) ada di folder 'public'

app.use(express.static('public'));


const DATA_FILE = path.join(__dirname, 'data.json');

// Helper Baca/Tulis
const readData = () => JSON.parse(fs.readFileSync(DATA_FILE, 'utf8') || "[]");
const writeData = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

// Endpoint Utama: Kirim file HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API CRUD
app.get('/api/produk', (req, res) => res.json(readData()));

app.post('/api/produk', (req, res) => {
    const data = readData();
    data.push({ id: Date.now(), ...req.body });
    writeData(data);
    res.sendStatus(201);
});

app.put('/api/produk/:id', (req, res) => {
    let data = readData();
    const idx = data.findIndex(p => p.id == req.params.id);
    if (idx !== -1) {
        data[idx] = { id: Number(req.params.id), ...req.body };
        writeData(data);
    }
    res.sendStatus(200);
});

app.delete('/api/produk/:id', (req, res) => {
    writeData(readData().filter(p => p.id != req.params.id));
    res.sendStatus(200);
});

app.listen(3000, () => console.log('Server: http://localhost:3000'));