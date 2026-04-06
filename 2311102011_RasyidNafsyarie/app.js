const express = require('express');
const app = express();
const productRoutes = require('./routes/productRoutes');

// ✅ WAJIB (FIX UTAMA)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use('/products', productRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});