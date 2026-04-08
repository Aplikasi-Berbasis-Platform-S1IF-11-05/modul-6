<div align="center">
  <br />
  <h1>LAPORAN PRAKTIKUM <br> APLIKASI BERBASIS PLATFORM </h1>
  <br />
  <h3>MODUL 7 & 8 <br> Inventory Toko Pak Cik dan Aimar </h3>
  <br />
  <img width="512" height="512" alt="telyu" src="https://github.com/user-attachments/assets/724a3291-bcf9-448d-a395-3886a8659d79" />
  <br />
  <br />
  <br />
  <h3>Disusun Oleh :</h3>
  <p>
    <strong>Faqih Abdullah</strong>
    <br>
    <strong>2311102048</strong>
    <br>
    <strong>S1 IF-11-REG05</strong>
  </p>
  <br />
  <h3>Dosen Pengampu :</h3>
  <p>
    <strong>Dedi Agung Prabowo, S.Kom., M.Kom</strong>
  </p>
  <br />
  <br />
  <h4>Asisten Praktikum :</h4>
  <strong>Apri Pandu Wicaksono</strong>
  <br>
  <strong>Hamka Zaenul Ardi</strong>
  <br />
  <h3>LABORATORIUM HIGH PERFORMANCE <br>FAKULTAS INFORMATIKA <br>UNIVERSITAS TELKOM PURWOKERTO <br>2026 </h3>
</div>

<hr>

# 📚 Dasar Teori

Aplikasi inventory merupakan sistem yang digunakan untuk mengelola data barang seperti penambahan, pengubahan, penghapusan, dan penampilan data produk.

Pada modul ini digunakan pendekatan berbasis **client-server**, dimana:
- Backend menggunakan **ExpressJS** untuk menangani request HTTP (GET, POST, PUT, DELETE)
- Frontend menggunakan **jQuery** untuk manipulasi DOM dan AJAX
- Tampilan menggunakan **Bootstrap**
- Data disimpan dalam **file JSON** sebagai alternatif database

AJAX memungkinkan pertukaran data tanpa reload halaman, sehingga aplikasi menjadi lebih interaktif.

---

# 🧩 Tugas - Toko Kelontong Pak Cik dan Aimar

## Source Code server.js

```js
// 2311102048
// Faqih Abdullah

const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.get('/products', (req, res) => {
  const data = JSON.parse(fs.readFileSync('data.json'));
  res.json(data);
});

app.post('/products', (req, res) => {
  const data = JSON.parse(fs.readFileSync('data.json'));
  const newData = { id: Date.now(), ...req.body };
  data.push(newData);
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
  res.json(newData);
});

app.put('/products/:id', (req, res) => {
  let data = JSON.parse(fs.readFileSync('data.json'));
  data = data.map(p => p.id == req.params.id ? { ...p, ...req.body } : p);
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
  res.json({ message: 'Updated' });
});

app.delete('/products/:id', (req, res) => {
  let data = JSON.parse(fs.readFileSync('data.json'));
  data = data.filter(p => p.id != req.params.id);
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
  res.json({ message: 'Deleted' });
});

app.listen(3000, () => console.log('Server jalan di http://localhost:3000'));