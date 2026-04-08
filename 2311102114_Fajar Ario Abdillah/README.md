<div align="center">
  <br />
  <h1>LAPORAN PRAKTIKUM <br> APLIKASI BERBASIS PLATFORM </h1>
  <br />
  <h3>MODUL 6 <br> COTS </h3>
  <br />
  <img width="512" height="512" alt="telyu" src="https://github.com/user-attachments/assets/724a3291-bcf9-448d-a395-3886a8659d79" />
  <br />
  <br />
  <br />
  <h3>Disusun Oleh :</h3>
  <p>
    <strong>Fajar Ario Abdillah</strong>
    <br>
    <strong>2311102114</strong>
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

## Struktur Project

```
2311102114_Fajar Ario Abdillah/
├── app.js           
├── package.json     
├── data/
│   └── products.json
├── public/
│   ├── js/
│   │   └── script.js
├── views/
│   └── index.ejs
└── README.md
```

---

## 1. Buat file `package.json`:

```html
{
  "name": "modul-6-inventori-toko",
  "version": "1.0.0",
  "description": "Web inventori toko Pak Cik dan Aimar menggunakan ExpressJS, Bootstrap, jQuery, dan JSON",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  },
  "author": "Fajar Ario Abdillah",
  "license": "ISC",
  "dependencies": {
    "ejs": "^3.1.10",
    "express": "^4.21.2"
  }
}
```

---

## 2. Buat file `app.js`:

```html
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
```

## 3. Buat folder `data`, lalu file `products.json`:

```html
[
  {
    "id": 1,
    "nama": "Beras 5 Kg",
    "kategori": "Sembako",
    "harga": 75000,
    "stok": 10
  },
  {
    "id": 2,
    "nama": "Minyak Goreng 1L",
    "kategori": "Sembako",
    "harga": 18000,
    "stok": 25
  },
  {
    "id": 3,
    "nama": "Gula Pasir 1 Kg",
    "kategori": "Sembako",
    "harga": 16000,
    "stok": 8
  }
]
```

## 4. Buat folder `views`, lalu file `index.ejs`:

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Inventori Toko Pak Cik dan Aimar</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
</head>
<body class="bg-light">

  <!-- Watermark -->
  <!-- Nama: Fajar Ario Abdillah -->
  <!-- NIM: 2311102114 -->

  <nav class="navbar navbar-expand-lg navbar-dark bg-success shadow-sm">
    <div class="container">
      <a class="navbar-brand fw-bold" href="#">Toko Pak Cik & Aimar</a>
      <span class="navbar-text text-white">Web Inventori Produk</span>
    </div>
  </nav>

  <div class="container py-5">
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
      <div>
        <h1 class="fw-bold text-success mb-1">Data Inventori Produk</h1>
        <p class="text-secondary mb-0">Kelola produk toko dengan fitur CRUD berbasis JSON.</p>
      </div>
      <button class="btn btn-success btn-lg" data-bs-toggle="modal" data-bs-target="#createModal">
        + Tambah Produk
      </button>
    </div>

    <% if (success) { %>
      <div class="alert alert-success alert-dismissible fade show" role="alert">
        <%= success %>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    <% } %>

    <div class="card border-0 shadow-sm mb-4">
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-6">
            <input type="text" id="searchInput" class="form-control" placeholder="Cari nama atau kategori produk...">
          </div>
          <div class="col-md-6">
            <div class="alert alert-info mb-0 text-center">
              Total Produk: <strong><%= products.length %></strong>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card border-0 shadow-sm">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-bordered table-hover table-striped align-middle mb-0" id="productsTable">
            <thead class="table-success text-center">
              <tr>
                <th>No</th>
                <th>Nama Produk</th>
                <th>Kategori</th>
                <th>Harga</th>
                <th>Stok</th>
                <th width="180">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <% if (products.length === 0) { %>
                <tr>
                  <td colspan="6" class="text-center text-muted">Belum ada data produk.</td>
                </tr>
              <% } %>

              <% products.forEach((product, index) => { %>
                <tr>
                  <td class="text-center"><%= index + 1 %></td>
                  <td class="product-name"><%= product.nama %></td>
                  <td class="product-category"><%= product.kategori %></td>
                  <td>Rp <%= Number(product.harga).toLocaleString('id-ID') %></td>
                  <td class="text-center">
                    <% if (product.stok <= 5) { %>
                      <span class="badge bg-danger"><%= product.stok %></span>
                    <% } else if (product.stok <= 10) { %>
                      <span class="badge bg-warning text-dark"><%= product.stok %></span>
                    <% } else { %>
                      <span class="badge bg-success"><%= product.stok %></span>
                    <% } %>
                  </td>
                  <td class="text-center">
                    <button
                      class="btn btn-warning btn-sm btn-edit"
                      data-id="<%= product.id %>"
                      data-nama="<%= product.nama %>"
                      data-kategori="<%= product.kategori %>"
                      data-harga="<%= product.harga %>"
                      data-stok="<%= product.stok %>">
                      Edit
                    </button>

                    <button
                      class="btn btn-danger btn-sm btn-delete"
                      data-id="<%= product.id %>"
                      data-nama="<%= product.nama %>">
                      Hapus
                    </button>
                  </td>
                </tr>
              <% }) %>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Create -->
  <div class="modal fade" id="createModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <form action="/products" method="POST">
          <div class="modal-header bg-success text-white">
            <h5 class="modal-title">Tambah Produk</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Nama Produk</label>
              <input type="text" name="nama" class="form-control" required>
            </div>
            <div class="mb-3">
              <label class="form-label">Kategori</label>
              <input type="text" name="kategori" class="form-control" required>
            </div>
            <div class="mb-3">
              <label class="form-label">Harga</label>
              <input type="number" name="harga" class="form-control" min="0" required>
            </div>
            <div class="mb-3">
              <label class="form-label">Stok</label>
              <input type="number" name="stok" class="form-control" min="0" required>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
            <button type="submit" class="btn btn-success">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- Modal Edit -->
  <div class="modal fade" id="editModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <form id="editForm" method="POST">
          <div class="modal-header bg-warning">
            <h5 class="modal-title">Edit Produk</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <input type="hidden" id="editId">

            <div class="mb-3">
              <label class="form-label">Nama Produk</label>
              <input type="text" name="nama" id="editNama" class="form-control" required>
            </div>
            <div class="mb-3">
              <label class="form-label">Kategori</label>
              <input type="text" name="kategori" id="editKategori" class="form-control" required>
            </div>
            <div class="mb-3">
              <label class="form-label">Harga</label>
              <input type="number" name="harga" id="editHarga" class="form-control" min="0" required>
            </div>
            <div class="mb-3">
              <label class="form-label">Stok</label>
              <input type="number" name="stok" id="editStok" class="form-control" min="0" required>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
            <button type="submit" class="btn btn-warning">Update</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- Modal Delete -->
  <div class="modal fade" id="deleteModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <form id="deleteForm" method="POST">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title">Konfirmasi Hapus</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <p class="mb-0">
              Apakah Anda yakin ingin menghapus produk
              <strong id="deleteProductName"></strong>?
            </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
            <button type="submit" class="btn btn-danger">Ya, Hapus</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="/js/script.js"></script>
</body>
</html>
```

## 5. Buat folder `public/js`, lalu file `script.js`:

```html
$(document).ready(function () {
  $('.btn-edit').on('click', function () {
    const id = $(this).data('id');
    const nama = $(this).data('nama');
    const kategori = $(this).data('kategori');
    const harga = $(this).data('harga');
    const stok = $(this).data('stok');

    $('#editId').val(id);
    $('#editNama').val(nama);
    $('#editKategori').val(kategori);
    $('#editHarga').val(harga);
    $('#editStok').val(stok);
    $('#editForm').attr('action', '/products/edit/' + id);

    const editModal = new bootstrap.Modal(document.getElementById('editModal'));
    editModal.show();
  });

  $('.btn-delete').on('click', function () {
    const id = $(this).data('id');
    const nama = $(this).data('nama');

    $('#deleteProductName').text(nama);
    $('#deleteForm').attr('action', '/products/delete/' + id);

    const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    deleteModal.show();
  });

  $('#searchInput').on('keyup', function () {
    const value = $(this).val().toLowerCase();

    $('#productsTable tbody tr').filter(function () {
      const nama = $(this).find('.product-name').text().toLowerCase();
      const kategori = $(this).find('.product-category').text().toLowerCase();
      $(this).toggle(nama.includes(value) || kategori.includes(value));
    });
  });
});
```

---

## 6. Jalankan server:

```bash
npm start
```

## 7. Buka Browser:

```html
http://localhost:3000
```

---

## Output / Screenshot

> Screenshot tersedia di folder `assets/`

![Bukti](assets/Screenshot%202026-04-07%20234007.png)