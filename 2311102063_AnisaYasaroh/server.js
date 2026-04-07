const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

function readProducts() {
  try {
    const data = fs.readFileSync("products.json", "utf8");
    return JSON.parse(data || "[]");
  } catch {
    return [];
  }
}

function saveProducts(data) {
  fs.writeFileSync("products.json", JSON.stringify(data, null, 2));
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/products", (req, res) => {
  res.json(readProducts());
});

app.post("/products", (req, res) => {
  let products = readProducts();

  const newProduct = {
    nama: req.body.nama,
    harga: req.body.harga,
    stok: req.body.stok
  };

  products.push(newProduct);
  saveProducts(products);

  res.json({ message: "Produk berhasil ditambahkan" });
});

app.put("/products/:id", (req, res) => {
  let products = readProducts();

  products[req.params.id] = req.body;

  saveProducts(products);

  res.json({ message: "Produk diupdate" });
});

app.delete("/products/:id", (req, res) => {
  let products = readProducts();

  products.splice(req.params.id, 1);

  saveProducts(products);

  res.json({ message: "Produk dihapus" });
});

app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});