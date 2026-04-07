const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs-extra");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const DATA_FILE = "./data.json";

// Helper baca data
const readData = async () => {
  return await fs.readJson(DATA_FILE);
};

// Helper tulis data
const writeData = async (data) => {
  await fs.writeJson(DATA_FILE, data, { spaces: 2 });
};

// ======================
// GET semua produk
// ======================
app.get("/produk", async (req, res) => {
  const data = await readData();
  res.json(data);
});

// ======================
// CREATE produk
// ======================
app.post("/produk", async (req, res) => {
  const data = await readData();

  const newProduk = {
    id: Date.now(),
    nama: req.body.nama,
    harga: req.body.harga,
    stok: req.body.stok
  };

  data.push(newProduk);
  await writeData(data);

  res.json({ message: "Produk ditambahkan", data: newProduk });
});

// ======================
// UPDATE produk
// ======================
app.put("/produk/:id", async (req, res) => {
  let data = await readData();

  const id = parseInt(req.params.id);
  const index = data.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Produk tidak ditemukan" });
  }

  data[index] = {
    ...data[index],
    nama: req.body.nama,
    harga: req.body.harga,
    stok: req.body.stok
  };

  await writeData(data);

  res.json({ message: "Produk diupdate", data: data[index] });
});

// ======================
// DELETE produk
// ======================
app.delete("/produk/:id", async (req, res) => {
  let data = await readData();

  const id = parseInt(req.params.id);
  data = data.filter((p) => p.id !== id);

  await writeData(data);

  res.json({ message: "Produk dihapus" });
});

// ======================
app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});