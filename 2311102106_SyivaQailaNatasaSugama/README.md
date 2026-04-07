<div align="center">
  <br />
  <h1>LAPORAN PRAKTIKUM <br> APLIKASI BERBASIS PLATFORM </h1>
  <br />
  <h3>MODUL 6 <br> JAVASCRIPT & JQUERY </h3>
  <br />
  <img width="512" height="512" alt="telyu" src="https://github.com/user-attachments/assets/724a3291-bcf9-448d-a395-3886a8659d79" />
  <br />
  <br />
  <br />
  <h3>Disusun Oleh :</h3>
  <p>
    <strong>Syiva Qaila Natasa Sugama</strong>
    <br>
    <strong>2311102106</strong>
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
  <strong>Apri Pandu Wicaksono </strong>
  <br>
  <strong>Hamka Zaenul Ardi</strong>
  <br />
  <h3>LABORATORIUM HIGH PERFORMANCE <br>FAKULTAS INFORMATIKA <br>UNIVERSITAS TELKOM PURWOKERTO <br>2026 </h3>
</div>

<hr>

# Dasar Teori JavaScript dan jQuery

## 1. JavaScript (JS)
JavaScript adalah bahasa pemrograman *high-level*, *scripting*, *untyped*, dan *interpreted* yang menjadi standar untuk pengembangan web interaktif. JavaScript memungkinkan pengembang untuk mengimplementasikan fitur-fitur kompleks pada halaman web, seperti pembaruan konten secara dinamis, peta interaktif, animasi grafis 2D/3D, dan banyak lagi.

### Karakteristik Utama JavaScript:
- **Client-Side Scripting**: Kode JavaScript dieksekusi di browser pengguna (client), bukan di server. Ini mengurangi beban server dan memberikan respon yang lebih cepat.
- **Interpreted**: JavaScript tidak memerlukan proses kompilasi sebelum dijalankan. Browser membaca dan mengeksekusi kode secara langsung.
- **Event-Driven**: JavaScript dapat merespons berbagai kejadian (event) yang dilakukan oleh pengguna, seperti klik mouse, input keyboard, atau pengambilan data dari server.
- **DOM Manipulation**: JavaScript memiliki kemampuan untuk mengakses dan memodifikasi *Document Object Model* (DOM), yang memungkinkan perubahan struktur, gaya, dan konten HTML secara dinamis.

---

## 2. jQuery
jQuery adalah sebuah *library* atau pustaka JavaScript yang cepat, kecil, dan kaya akan fitur. jQuery dirancang untuk menyederhanakan penulisan JavaScript dengan moto utamanya: **"Write Less, Do More"**. jQuery menangani banyak hal yang rumit dalam JavaScript biasa, seperti manipulasi DOM, penanganan event, animasi, dan AJAX, dengan sintaks yang jauh lebih sederhana.

### Fitur dan Keuntungan jQuery:
- **Selektor yang Mudah**: Menggunakan sintaks CSS untuk memilih elemen DOM (contoh: `$('.btn')` untuk memilih kelas, `$('#id')` untuk memilih ID).
- **Cross-Browser Compatibility**: jQuery menangani perbedaan cara kerja JavaScript di berbagai browser secara otomatis, sehingga pengembang tidak perlu menulis kode berbeda untuk setiap browser.
- **Manipulasi DOM**: Menyediakan metode intuitif untuk menambah, menghapus, atau mengubah elemen dan atribut HTML.
- **Handling AJAX**: Menyederhanakan proses pengiriman permintaan HTTP asinkron ke server untuk mengambil data tanpa harus memuat ulang halaman secara keseluruhan.
- **Efek dan Animasi**: Menyediakan fungsi bawaan untuk membuat efek transisi yang mulus seperti `.fadeIn()`, `.slideUp()`, dan `.toggle()`.

---

## 3. AJAX (Asynchronous JavaScript and XML)
AJAX adalah teknik pengembangan web yang memungkinkan halaman web untuk berkomunikasi dengan server di latar belakang secara asinkron. Dengan AJAX, aplikasi web dapat mengirim dan menerima data dari server tanpa mengganggu tampilan atau perilaku halaman yang sedang aktif (tanpa *full page reload*).

---

## 4. JSON (JavaScript Object Notation)
JSON adalah format pertukaran data yang ringan, mudah dibaca manusia, dan mudah diproses oleh mesin. JSON sering digunakan dalam pengembangan web untuk mengirim data antara server dan aplikasi web sebagai alternatif XML. Dalam proyek ini, JSON digunakan sebagai *database flat-file* untuk menyimpan informasi produk.



### Source code 
```py
# app.py
from flask import Flask, render_template, request, jsonify
import json
import os

app = Flask(__name__)

# Data storage path
DATA_FILE = os.path.join('data', 'products.json')

def load_products():
    """Load products from JSON file."""
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, 'r') as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return []

def save_products(products):
    """Save products to JSON file."""
    with open(DATA_FILE, 'w') as f:
        json.dump(products, f, indent=2)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/products', methods=['GET'])
def get_products():
    return jsonify(load_products())

@app.route('/api/products', methods=['POST'])
def add_product():
    products = load_products()
    data = request.json
    
    # Simple ID increment
    new_id = 1
    if products:
        new_id = max(p['id'] for p in products) + 1
    
    new_product = {
        'id': new_id,
        'name': data.get('name'),
        'price': int(data.get('price')),
        'stock': int(data.get('stock')),
        'category': data.get('category')
    }
    products.append(new_product)
    save_products(products)
    return jsonify(new_product), 201

@app.route('/api/products/<int:id>', methods=['PUT'])
def update_product(id):
    data = request.json
    products = load_products()
    for product in products:
        if product['id'] == id:
            product.update({
                'name': data.get('name'),
                'price': int(data.get('price')),
                'stock': int(data.get('stock')),
                'category': data.get('category')
            })
            save_products(products)
            return jsonify(product)
    return jsonify({'error': 'Product not found'}), 404

# Selebihnya dapat cek pada file "app.py"
```
🔗 [Klik di sini untuk membuka file `app.py`](app.py)

```html
{% extends 'base.html' %}

{% block content %}
<div class="container">
    <div class="row mb-4 align-items-center">
        <div class="col">
            <h2 class="fw-bold text-dark m-0">Inventaris Produk</h2>
            <p class="text-secondary small">Kelola stok barang Pak Cik dan Aimar</p>
        </div>
        <div class="col-auto">
            <button class="btn btn-primary-premium px-4 py-2 rounded-pill" data-bs-toggle="modal" data-bs-target="#addModal">
                <i class="fas fa-plus me-2"></i> Tambah Produk
            </button>
        </div>
    </div>

    <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div class="card-body p-0">
            <div class="table-responsive">
                <table class="table table-hover align-middle mb-0" id="productTable">
                    <thead class="bg-light text-secondary small text-uppercase fw-semibold">
                        <tr>
                            <th class="ps-4 py-3" style="width: 60px;">No</th>
                            <th class="py-3">Nama Produk</th>
                            <th class="py-3">Kategori</th>
                            <th class="py-3">Harga</th>
                            <th class="py-3">Stok</th>
                            <th class="text-end pe-4 py-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody id="productTableBody">
                        <!-- Data will be loaded via jQuery -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

    <!-- Selebihnya dapat cek pada file "templates/index.html" -->
```
🔗 [Klik di sini untuk membuka file `index.html`](templates/index.html)
```html
{% extends 'base.html' %}

{% block content %}
<div class="container">
    <div class="row mb-4 align-items-center">
        <div class="col">
            <h2 class="fw-bold text-dark m-0">Inventaris Produk</h2>
            <p class="text-secondary small">Kelola stok barang Pak Cik dan Aimar</p>
        </div>
        <div class="col-auto">
            <button class="btn btn-primary-premium px-4 py-2 rounded-pill" data-bs-toggle="modal" data-bs-target="#addModal">
                <i class="fas fa-plus me-2"></i> Tambah Produk
            </button>
        </div>
    </div>

    <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div class="card-body p-0">
            <div class="table-responsive">
                <table class="table table-hover align-middle mb-0" id="productTable">
                    <thead class="bg-light text-secondary small text-uppercase fw-semibold">
                        <tr>
                            <th class="ps-4 py-3" style="width: 60px;">No</th>
                            <th class="py-3">Nama Produk</th>
                            <th class="py-3">Kategori</th>
                            <th class="py-3">Harga</th>
                            <th class="py-3">Stok</th>
                            <th class="text-end pe-4 py-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody id="productTableBody">
                        <!-- Data will be loaded via jQuery -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

    <!-- Selebihnya dapat cek pada file "templates/base.html" -->
```
🔗 [Klik di sini untuk membuka file `base.html`](templates/base.html)


```js
// static/js/app.js
$(document).ready(function() {
    // Initial Load
    fetchProducts();

    // Helper: Format Rupiah
    function formatRupiah(number) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0
        }).format(number);
    }

    // Load Products Function
    function fetchProducts() {
        $.ajax({
            url: '/api/products',
            method: 'GET',
            success: function(data) {
                renderTable(data);
            }
        });
    }

    function renderTable(products) {
        const tbody = $('#productTableBody');
        tbody.empty();

        if (products.length === 0) {
            tbody.append('<tr><td colspan="6" class="text-center py-5 text-muted">Belum ada produk.</td></tr>');
            return;
        }

        products.forEach((product, index) => {
            const badgeClass = getBadgeClass(product.category);
            const row = `
                <tr>
                    <td class="ps-4 fw-semibold text-muted">${index + 1}</td>
                    <td>
                        <div class="fw-bold text-dark">${product.name}</div>
                        <div class="text-muted small" style="font-size: 0.7rem;">ID: ${product.id}</div>
                    </td>
                    <td>
                        <span class="badge-category ${badgeClass}">${product.category}</span>
                    </td>
                    <td class="fw-semibold text-primary">${formatRupiah(product.price)}</td>
                    <td>
                        <span class="badge ${product.stock > 10 ? 'bg-success' : (product.stock > 0 ? 'bg-warning' : 'bg-danger')} rounded-pill">
                            ${product.stock} pcs
                        </span>
                    </td>
                    <td class="text-end pe-4">
                        <button class="action-btn btn-edit text-primary me-2" 
                                onclick="editProduct(${product.id}, '${product.name}', '${product.category}', ${product.price}, ${product.stock})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn btn-delete text-danger" 
                                onclick="prepareDelete(${product.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
            tbody.append(row);
        });
    }

    // Selebihnya dapat cek pada file "static/js/app.js"
```
🔗 [Klik di sini untuk membuka file `app.js`](static/js/app.js)

Output:
<img src="home.png" alt="preview" style="width:100%; max-width:900px;">
<img src="popup.png" alt="preview" style="width:100%; max-width:900px;">


## Penjelasan
Sistem Inventaris Toko Kelontong Pak Cik & Aimar adalah aplikasi web berbasis Flask yang memungkinkan pengelolaan stok produk secara efisien melalui fitur CRUD interaktif. Website ini menggunakan jQuery dan Bootstrap untuk menghadirkan antarmuka modern yang responsif dan beroperasi secara asinkron tanpa reload halaman.