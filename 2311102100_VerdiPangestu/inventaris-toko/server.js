const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const dataPath = path.join(__dirname, 'data.json');

app.use(cors());
app.use(express.json());
app.use(express.static('public')); 

const getProducts = () => JSON.parse(fs.readFileSync(dataPath));
const saveProducts = (data) => fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

app.get('/api/products', (req, res) => res.json(getProducts()));

app.post('/api/products', (req, res) => {
    const products = getProducts();
    const newProduct = { id: Date.now().toString(), ...req.body };
    products.push(newProduct);
    saveProducts(products);
    res.status(201).json(newProduct);
});

app.put('/api/products/:id', (req, res) => {
    const products = getProducts();
    const index = products.findIndex(p => p.id === req.params.id);
    if (index !== -1) {
        products[index] = { ...products[index], ...req.body };
        saveProducts(products);
        res.json(products[index]);
    }
});

app.delete('/api/products/:id', (req, res) => {
    let products = getProducts();
    products = products.filter(p => p.id !== req.params.id);
    saveProducts(products);
    res.json({ message: 'Dihapus' });
});

app.listen(PORT, () => console.log(`Server nyala di http://localhost:${PORT}`));