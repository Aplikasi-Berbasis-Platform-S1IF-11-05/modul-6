const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data', 'products.json');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

function readProducts() {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data || '[]');
    } catch (error) {
        return [];
    }
}

function writeProducts(products) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2), 'utf8');
}

function getNextId(products) {
    if (products.length === 0) return 1;
    return Math.max(...products.map((item) => item.id)) + 1;
}

app.get('/', (req, res) => {
    const products = readProducts();
    const success = req.query.success || '';
    res.render('index', { products, success });
});

app.post('/products', (req, res) => {
    const products = readProducts();
    const { nama, kategori, harga, stok } = req.body;

    const newProduct = {
        id: getNextId(products),
        nama: nama.trim(),
        kategori: kategori.trim(),
        harga: Number(harga),
        stok: Number(stok)
    };

    products.push(newProduct);
    writeProducts(products);

    res.redirect('/?success=Produk berhasil ditambahkan');
});

app.post('/products/edit/:id', (req, res) => {
    const products = readProducts();
    const id = Number(req.params.id);
    const { nama, kategori, harga, stok } = req.body;

    const updatedProducts = products.map((product) => {
        if (product.id === id) {
            return {
                ...product,
                nama: nama.trim(),
                kategori: kategori.trim(),
                harga: Number(harga),
                stok: Number(stok)
            };
        }
        return product;
    });

    writeProducts(updatedProducts);
    res.redirect('/?success=Produk berhasil diperbarui');
});

app.post('/products/delete/:id', (req, res) => {
    const products = readProducts();
    const id = Number(req.params.id);

    const filteredProducts = products.filter((product) => product.id !== id);
    writeProducts(filteredProducts);

    res.redirect('/?success=Produk berhasil dihapus');
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});