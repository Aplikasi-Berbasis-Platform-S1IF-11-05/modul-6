const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data', 'produk.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ensure data directory & file exist
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'));
}
if (!fs.existsSync(DATA_FILE)) {
  const seed = [
    { id: 1, nama: "Indomie Goreng", kategori: "Makanan", stok: 150, harga: 3500, satuan: "pcs", keterangan: "Mie instan goreng original" },
    { id: 2, nama: "Aqua 600ml",    kategori: "Minuman",  stok: 200, harga: 4000, satuan: "botol", keterangan: "Air mineral kemasan 600ml" },
    { id: 3, nama: "Beras Premium", kategori: "Sembako",  stok: 50,  harga: 75000, satuan: "kg", keterangan: "Beras premium pulen wangi" },
    { id: 4, nama: "Minyak Goreng Bimoli 1L", kategori: "Sembako", stok: 40, harga: 21000, satuan: "liter", keterangan: "Minyak goreng premium" },
    { id: 5, nama: "Gula Pasir 1kg", kategori: "Sembako", stok: 60, harga: 14000, satuan: "kg", keterangan: "Gula pasir putih bersih" },
    { id: 6, nama: "Kopi Kapal Api", kategori: "Minuman", stok: 80, harga: 2500, satuan: "sachet", keterangan: "Kopi bubuk aromatis" },
    { id: 7, nama: "Sabun Lifebuoy", kategori: "Toiletries", stok: 100, harga: 5500, satuan: "pcs", keterangan: "Sabun mandi antiseptik" },
    { id: 8, nama: "Susu Ultra 250ml", kategori: "Minuman", stok: 90, harga: 6500, satuan: "pcs", keterangan: "Susu UHT full cream" },
  ];
  fs.writeFileSync(DATA_FILE, JSON.stringify(seed, null, 2));
}

// Helper
const readData = () => JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
const writeData = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
const nextId = (data) => data.length > 0 ? Math.max(...data.map(d => d.id)) + 1 : 1;

// ===== ROUTES =====

// GET all produk
app.get('/api/produk', (req, res) => {
  const data = readData();
  res.json({ success: true, data });
});

// GET produk by ID
app.get('/api/produk/:id', (req, res) => {
  const data = readData();
  const item = data.find(d => d.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });
  res.json({ success: true, data: item });
});

// POST create produk
app.post('/api/produk', (req, res) => {
  const { nama, kategori, stok, harga, satuan, keterangan } = req.body;
  if (!nama || !kategori || stok === undefined || harga === undefined) {
    return res.status(400).json({ success: false, message: 'Data tidak lengkap' });
  }
  const data = readData();
  const newItem = {
    id: nextId(data),
    nama, kategori,
    stok: parseInt(stok),
    harga: parseInt(harga),
    satuan: satuan || 'pcs',
    keterangan: keterangan || '',
  };
  data.push(newItem);
  writeData(data);
  res.status(201).json({ success: true, data: newItem, message: 'Produk berhasil ditambahkan' });
});

// PUT update produk
app.put('/api/produk/:id', (req, res) => {
  const data = readData();
  const idx = data.findIndex(d => d.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });
  const { nama, kategori, stok, harga, satuan, keterangan } = req.body;
  data[idx] = { ...data[idx], nama, kategori, stok: parseInt(stok), harga: parseInt(harga), satuan, keterangan };
  writeData(data);
  res.json({ success: true, data: data[idx], message: 'Produk berhasil diupdate' });
});

// DELETE produk
app.delete('/api/produk/:id', (req, res) => {
  const data = readData();
  const idx = data.findIndex(d => d.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });
  const deleted = data.splice(idx, 1)[0];
  writeData(data);
  res.json({ success: true, data: deleted, message: 'Produk berhasil dihapus' });
});

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n✅ Toko Kelontong Pak Cik & Aimar`);
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📦 Data tersimpan di: ${DATA_FILE}\n`);
});
