const express = require('express');
const fs = require('fs');
const app = express();

const file = './products.json';

// middleware (PENTING)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// GET
app.get('/products', (req, res) => {
    const data = JSON.parse(fs.readFileSync(file));
    res.json(data);
});

// POST
app.post('/products', (req, res) => {
    const data = JSON.parse(fs.readFileSync(file));

    const newData = {
        id: Date.now(),
        nama: req.body.nama,
        harga: req.body.harga,
        stok: req.body.stok
    };

    data.push(newData);
    fs.writeFileSync(file, JSON.stringify(data, null, 2));

    res.json(newData);
});

// PUT
app.put('/products/:id', (req, res) => {
    let data = JSON.parse(fs.readFileSync(file));

    data = data.map(p =>
        p.id == req.params.id
            ? { ...p, ...req.body }
            : p
    );

    fs.writeFileSync(file, JSON.stringify(data, null, 2));
    res.json({ message: 'updated' });
});

// DELETE
app.delete('/products/:id', (req, res) => {
    let data = JSON.parse(fs.readFileSync(file));

    data = data.filter(p => p.id != req.params.id);

    fs.writeFileSync(file, JSON.stringify(data, null, 2));
    res.json({ message: 'deleted' });
});

app.listen(3000, () => {
    console.log('Server jalan di http://localhost:3000');
});