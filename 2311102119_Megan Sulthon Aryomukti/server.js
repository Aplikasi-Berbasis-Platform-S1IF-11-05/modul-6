const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

const DATA_FILE = 'data.json';

// Helper read/write JSON
const readData = () => {
    return JSON.parse(fs.readFileSync(DATA_FILE));
};

const writeData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// GET all products
app.get('/products', (req, res) => {
    res.json(readData());
});

// CREATE
app.post('/products', (req, res) => {
    const data = readData();
    const newItem = {
        id: Date.now(),
        ...req.body
    };
    data.push(newItem);
    writeData(data);
    res.json(newItem);
});

// UPDATE
app.put('/products/:id', (req, res) => {
    let data = readData();
    data = data.map(item =>
        item.id == req.params.id ? { ...item, ...req.body } : item
    );
    writeData(data);
    res.json({ message: 'Updated' });
});

// DELETE
app.delete('/products/:id', (req, res) => {
    let data = readData();
    data = data.filter(item => item.id != req.params.id);
    writeData(data);
    res.json({ message: 'Deleted' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});