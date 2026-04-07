const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Setting View Engine & Middleware
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const DATA_PATH = path.join(__dirname, 'data', 'products.json');

// Fungsi pembantu baca/tulis JSON
const readData = () => {
    const data = fs.readFileSync(DATA_PATH, 'utf-8');
    return JSON.parse(data || '[]');
};
const writeData = (data) => fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));

// --- ROUTES ---

// Halaman Utama
app.get('/', (req, res) => {
    res.render('index');
});

// API Get All Products
app.get('/api/products', (req, res) => {
    res.json(readData());
});

// API Create
app.post('/api/products', (req, res) => {
    const products = readData();
    const newProduct = { 
        id: Date.now(), 
        name: req.body.name, 
        price: req.body.price, 
        stock: req.body.stock 
    };
    products.push(newProduct);
    writeData(products);
    res.json({ success: true });
});

// API Update
app.put('/api/products/:id', (req, res) => {
    let products = readData();
    const index = products.findIndex(p => p.id == req.params.id);
    if (index !== -1) {
        products[index] = { ...products[index], ...req.body };
        writeData(products);
    }
    res.json({ success: true });
});

// API Delete
app.delete('/api/products/:id', (req, res) => {
    let products = readData();
    products = products.filter(p => p.id != req.params.id);
    writeData(products);
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Server Pak Cik & Aimar sudah jalan di: http://localhost:${PORT}`);
});