const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));
app.use(express.static('views'));

const dataPath = path.join(__dirname, 'data', 'produk.json');

const bacaData = () => {
    const rawData = fs.readFileSync(dataPath);
    return JSON.parse(rawData);
};

const tulisData = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

app.get('/api/produk', (req, res) => {
    res.json(bacaData());
});

app.post('/api/produk', (req, res) => {
    const listProduk = bacaData();
    const baru = { id: Date.now(), ...req.body };
    listProduk.push(baru);
    tulisData(listProduk);
    res.status(201).json(baru);
});

app.put('/api/produk/:id', (req, res) => {
    let listProduk = bacaData();
    const index = listProduk.findIndex(p => p.id == req.params.id);
    if (index !== -1) {
        listProduk[index] = { id: parseInt(req.params.id), ...req.body };
        tulisData(listProduk);
        res.json(listProduk[index]);
    }
});

app.delete('/api/produk/:id', (req, res) => {
    let listProduk = bacaData();
    listProduk = listProduk.filter(p => p.id != req.params.id);
    tulisData(listProduk);
    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Server nyala di http://localhost:${port}`);
});