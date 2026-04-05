/**
 * Mendefinisikan rute REST untuk resource produk.
 *
 * Seluruh endpoint di bawah prefix ini terhubung ke controller produk
 * untuk operasi baca, tambah, ubah, dan hapus data.
 *
 * @module productRoutes
 */
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;