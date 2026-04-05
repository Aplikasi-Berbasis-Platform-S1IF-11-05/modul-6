const fileDb = require('../config/fileDb');

/**
 * Mengambil seluruh data produk dari penyimpanan lokal.
 *
 * Respons dikirim dalam format JSON dengan status operasi dan daftar produk.
 *
 * @param {import('express').Request} req - Objek permintaan HTTP.
 * @param {import('express').Response} res - Objek respons HTTP.
 * @returns {void}
 */
const getAllProducts = (req, res) => {
    try {
        const products = fileDb.readData();
        res.status(200).json({
            status: 'success',
            data: products
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

/**
 * Membuat data produk baru lalu menyimpannya ke file JSON.
 *
 * Validasi dilakukan untuk memastikan seluruh field wajib tersedia sebelum data dipersist.
 *
 * @param {import('express').Request} req - Objek permintaan HTTP yang memuat payload produk.
 * @param {import('express').Response} res - Objek respons HTTP.
 * @returns {void}
 */
const createProduct = (req, res) => {
    try {
        const products = fileDb.readData();
        const { name, category, price, stock } = req.body;

        if (!name || !category || price === undefined || stock === undefined) {
            return res.status(400).json({ status: 'error', message: 'Input tidak valid. Semua field wajib diisi.' });
        }

        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        const newProduct = {
            id: newId,
            name,
            category,
            price: Number(price),
            stock: Number(stock)
        };

        products.push(newProduct);
        fileDb.writeData(products);

        res.status(201).json({
            status: 'success',
            message: 'Produk berhasil ditambahkan',
            data: newProduct
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

/**
 * Memperbarui data produk berdasarkan ID yang diterima pada parameter rute.
 *
 * Field yang tidak dikirim akan mempertahankan nilai lama dari data yang sudah tersimpan.
 *
 * @param {import('express').Request} req - Objek permintaan HTTP yang memuat ID produk dan payload pembaruan.
 * @param {import('express').Response} res - Objek respons HTTP.
 * @returns {void}
 */
const updateProduct = (req, res) => {
    try {
        const products = fileDb.readData();
        const productId = parseInt(req.params.id);
        const { name, category, price, stock } = req.body;

        const index = products.findIndex(p => p.id === productId);
        if (index === -1) {
            return res.status(404).json({ status: 'error', message: 'Produk tidak ditemukan' });
        }

        products[index] = {
            ...products[index],
            name: name || products[index].name,
            category: category || products[index].category,
            price: price !== undefined ? Number(price) : products[index].price,
            stock: stock !== undefined ? Number(stock) : products[index].stock
        };

        fileDb.writeData(products);

        res.status(200).json({
            status: 'success',
            message: 'Produk berhasil diperbarui',
            data: products[index]
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

/**
 * Menghapus data produk berdasarkan ID yang diterima pada parameter rute.
 *
 * Jika ID tidak ditemukan, respons kesalahan 404 akan dikembalikan.
 *
 * @param {import('express').Request} req - Objek permintaan HTTP yang memuat ID produk.
 * @param {import('express').Response} res - Objek respons HTTP.
 * @returns {void}
 */
const deleteProduct = (req, res) => {
    try {
        const products = fileDb.readData();
        const productId = parseInt(req.params.id);

        const filteredProducts = products.filter(p => p.id !== productId);

        if (products.length === filteredProducts.length) {
            return res.status(404).json({ status: 'error', message: 'Produk tidak ditemukan' });
        }

        fileDb.writeData(filteredProducts);

        res.status(200).json({
            status: 'success',
            message: 'Produk berhasil dihapus'
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
};