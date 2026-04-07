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
    <strong>Fattah Rizqy Adhipratama</strong>
    <br>
    <strong>2311102019</strong>
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


# Dasar Teori

<p align="justify">
JavaScript merupakan bahasa pemrograman tingkat tinggi yang bersifat interpreted dan digunakan untuk membuat halaman web menjadi interaktif dan dinamis. JavaScript berjalan di sisi client (browser) dan memungkinkan pengembang untuk memanipulasi elemen HTML, CSS, serta merespons berbagai event seperti klik tombol, input form, animasi, validasi data, hingga komunikasi asynchronous menggunakan AJAX. Bahasa ini menjadi salah satu teknologi utama dalam pengembangan web bersama HTML dan CSS. JavaScript juga mendukung berbagai paradigma pemrograman seperti prosedural, berorientasi objek, dan fungsional, sehingga fleksibel digunakan dalam berbagai kebutuhan pengembangan aplikasi web modern.
</p>

<p align="justify">
jQuery adalah library JavaScript yang dirancang untuk menyederhanakan penulisan kode JavaScript, terutama dalam manipulasi DOM, penanganan event, efek animasi, dan AJAX. jQuery memiliki filosofi “write less, do more”, yang berarti developer dapat menulis kode lebih singkat namun tetap menghasilkan fungsi yang kompleks. Dengan menggunakan selector yang mirip CSS, jQuery memudahkan proses pemilihan elemen HTML dan pemberian aksi pada elemen tersebut.
</p>

# Tugas 6 - Toko Kelontong Pak Cik dan Aimar Loh yaa
## 1. Source code index.html
```
<!-- 2311102019
Fattah Rizqy Adhipratama
S1IF-11-05 -->
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inventaris Toko Kelontong Pak Cik</title>
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="/static/css/style.css">
</head>
<body>

<div class="page-wrapper">
    <div class="inv-card">
        <!-- Header -->
        <div class="inv-header">
            <div>
                <h3>Inventaris Toko Pak Cik &amp; Mas Aimar</h3>
                <small>Kelola stok dan harga produk</small>
            </div>
            <button class="btn-add" data-bs-toggle="modal" data-bs-target="#productModal" id="addBtn">
                + Tambah Produk
            </button>
        </div>

        <!-- Tabel Produk -->
        <div style="overflow-x: auto;">
            <table class="inv-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nama Produk</th>
                        <th>Stok</th>
                        <th>Harga</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody id="productTableBody">
                </tbody>
            </table>
            <!-- Empty state -->
            <div class="empty-state" id="emptyState" style="display:none;">
                <svg width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M20.25 7.5l-.625 10.632A2.25 2.25 0 0117.378 20H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5
                             M10 11.25h4
                             M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5
                             c0-.621-.504-1.125-1.125-1.125H3.375
                             c-.621 0-1.125.504-1.125 1.125v1.5
                             c0 .621.504 1.125 1.125 1.125z"/>
                </svg>
                <p>Belum ada produk. Klik <strong>+ Tambah Produk</strong> untuk mulai.</p>
            </div>
        </div>
    </div>
</div>

<!-- Modal Tambah / Edit Produk -->
<div class="modal fade" id="productModal" tabindex="-1"
     aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalTitle">Tambah Produk</h5>
                <button type="button" class="btn-close"
                        data-bs-dismiss="modal" aria-label="Tutup"></button>
            </div>
            <form id="productForm">
                <div class="modal-body">
                    <input type="hidden" id="productId">
                    <div class="mb-3">
                        <label class="form-label">Nama Produk</label>
                        <input type="text" id="name"
                               class="form-control"
                               placeholder="Contoh: Indomie Goreng" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Stok</label>
                        <input type="number" id="stock"
                               class="form-control"
                               placeholder="0" min="0" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Harga (Rp)</label>
                        <input type="number" id="price"
                               class="form-control"
                               placeholder="0" min="0" required>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-cancel"
                            data-bs-dismiss="modal">Batal</button>
                    <button type="submit" class="btn-save">Simpan</button>
                </div>
            </form>
        </div>
    </div>
</div>
```
**Source Code Lengkap:** [index.html](./templates/index.html)

## 2. Source code style.css
```
:root {
    --bg: #f4f6f9;
    --card-bg: #ffffff;
    --primary: #2563eb;
    --primary-dark: #1d4ed8;
    --danger: #dc2626;
    --warning: #d97706;
    --success: #16a34a;
    --text: #1e293b;
    --muted: #64748b;
    --border: #e2e8f0;
    --header-bg: #1e293b;
    --row-hover: #f8fafc;
}

* { box-sizing: border-box; }

body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    padding: 40px 16px;
}

.page-wrapper {
    max-width: 900px;
    margin: 0 auto;
}

/* Card */
.inv-card {
    background: var(--card-bg);
    border-radius: 16px;
    box-shadow: 0 2px 12px rgba(0,0,0,.08);
    overflow: hidden;
}

/* Card Header */
.inv-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 28px;
    border-bottom: 1px solid var(--border);
}

.inv-header h3 {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0;
    color: var(--text);
}

.inv-header small {
    display: block;
    font-size: .8rem;
    color: var(--muted);
    font-weight: 400;
    margin-top: 2px;
}

/* Buttons */
.btn-add {
    background: var(--primary);
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 9px 18px;
    font-size: .875rem;
    font-weight: 600;
    cursor: pointer;
    transition: background .15s;
    white-space: nowrap;
}
.btn-add:hover { background: var(--primary-dark); }

.btn-edit {
    background: #fef3c7;
    color: var(--warning);
    border: none;
    border-radius: 6px;
    padding: 5px 12px;
    font-size: .78rem;
    font-weight: 600;
    cursor: pointer;
    transition: background .15s;
}
.btn-edit:hover { background: #fde68a; }

.btn-del {
    background: #fee2e2;
    color: var(--danger);
    border: none;
    border-radius: 6px;
    padding: 5px 12px;
    font-size: .78rem;
    font-weight: 600;
    cursor: pointer;
    transition: background .15s;
}
.btn-del:hover { background: #fecaca; }
```
**Source Code Lengkap:** [style.css](./static/css/style.css)

## 3. Source code main.js
```
$(document).ready(function () {
    const API_URL = '/api/products';
    let deleteTargetId = null;
    function renderTable(products) {
        const tbody = $('#productTableBody');
        tbody.empty();
        if (products.length === 0) {
            $('#emptyState').show();
            return;
        }
        $('#emptyState').hide();
        products.forEach(function (p) {
            const row = `
            <tr data-id="${p.id}">
                <td class="td-id">#${p.id}</td>
                <td class="td-name">${p.name}</td>
                <td><span class="badge-stock">${p.stock}</span></td>
                <td class="td-price">Rp ${Number(p.price).toLocaleString('id-ID')}</td>
                <td>
                    <div class="td-actions">
                        <button class="btn-edit edit-btn"
                                data-id="${p.id}"
                                data-name="${p.name}"
                                data-stock="${p.stock}"
                                data-price="${p.price}">Edit</button>
                        <button class="btn-del delete-btn"
                                data-id="${p.id}">Hapus</button>
                    </div>
                </td>
            </tr>`;
            tbody.append(row);
        });
    }

    function fetchProducts() {
        $.get(API_URL, function (data) {
            renderTable(data);
        });
    }

    fetchProducts();
    $('#addBtn').click(function () {
        $('#modalTitle').text('Tambah Produk');
        $('#productId, #name, #stock, #price').val('');
        $('#productForm').removeData('editId');
    });

    // Edit Produk: isi form dengan data baris
    $(document).on('click', '.edit-btn', function () {
        $('#modalTitle').text('Edit Produk');
        const id = $(this).data('id');
        $('#productId').val(id);
        $('#name').val($(this).data('name'));
        $('#stock').val($(this).data('stock'));
        $('#price').val($(this).data('price'));
        $('#productForm').data('editId', id);
        $('#productModal').modal('show');
    });

    // Submit form: Tambah atau Edit
    $('#productForm').on('submit', function (e) {
        e.preventDefault();
        const editId = $('#productForm').data('editId');
        const payload = {
            name:  $('#name').val().trim(),
            stock: $('#stock').val(),
            price: $('#price').val()
        };
        if (editId) {
            // PUT - Update
            $.ajax({
                url:         `${API_URL}/${editId}`,
                method:      'PUT',
                contentType: 'application/json',
                data:        JSON.stringify(payload),
                success: function () {
                    $('#productModal').modal('hide');
                    fetchProducts();
                },
                error: function (xhr) {
                    alert('Gagal memperbarui produk: ' + xhr.responseJSON?.error);
                }
            });
        } else {
            // POST - Create
            $.ajax({
                url:         API_URL,
                method:      'POST',
                contentType: 'application/json',
                data:        JSON.stringify(payload),
                success: function () {
                    $('#productModal').modal('hide');
                    fetchProducts();
                },
                error: function (xhr) {
                    alert('Gagal menambah produk: ' + xhr.responseJSON?.error);
                }
            });
        }
    });

    // Hapus Produk: tampilkan modal konfirmasi 
    $(document).on('click', '.delete-btn', function () {
        deleteTargetId = $(this).data('id');
        $('#deleteModal').modal('show');
    });

    // Konfirmasi hapus 
    $('#confirmDelete').click(function () {
        if (!deleteTargetId) return;
        $.ajax({
            url:    `${API_URL}/${deleteTargetId}`,
            method: 'DELETE',
            success: function () {
                $('#deleteModal').modal('hide');
                deleteTargetId = null;
                fetchProducts();
            },
            error: function (xhr) {
                alert('Gagal menghapus produk: ' + xhr.responseJSON?.error);
            }
        });
    });
});
```

## 4. Source code app.py
```
from flask import Flask, render_template, request, jsonify
import json
import os

app = Flask(__name__, static_folder='static', template_folder='templates')

# Path ke file data produk
DATA_FILE = os.path.join(os.path.dirname(__file__), 'data', 'products.json')

def load_products():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, 'r') as f:
        return json.load(f)

def save_products(products):
    with open(DATA_FILE, 'w') as f:
        json.dump(products, f, indent=4)

# Halaman utama
@app.route('/')
def index():
    return render_template('index.html')

# API: Ambil semua produk
@app.route('/api/products', methods=['GET'])
def api_get_products():
    products = load_products()
    return jsonify(products), 200

# API: Tambah produk baru
@app.route('/api/products', methods=['POST'])
def api_create_product():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Data tidak valid'}), 400
    products = load_products()
    # Generate ID baru (max id + 1, aman jika list kosong)
    new_id = max((p['id'] for p in products), default=0) + 1
    new_product = {
        'id':    new_id,
        'name':  data.get('name', '').strip(),
        'stock': int(data.get('stock', 0)),
        'price': int(data.get('price', 0))
    }
    if not new_product['name']:
        return jsonify({'error': 'Nama produk wajib diisi'}), 400
    products.append(new_product)
    save_products(products)
    return jsonify(new_product), 201

# API: Update produk
@app.route('/api/products/<int:id>', methods=['PUT'])
def api_update_product(id):
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Data tidak valid'}), 400
    products = load_products()
    product = next((p for p in products if p['id'] == id), None)
    if product is None:
        return jsonify({'error': 'Produk tidak ditemukan'}), 404
    product['name']  = data.get('name', product['name']).strip()
    product['stock'] = int(data.get('stock', product['stock']))
    product['price'] = int(data.get('price', product['price']))
    save_products(products)
    return jsonify(product), 200

# API: Hapus produk
@app.route('/api/products/<int:id>', methods=['DELETE'])
def api_delete_product(id):
    products = load_products()
    new_list = [p for p in products if p['id'] != id]
    if len(new_list) == len(products):
        return jsonify({'error': 'Produk tidak ditemukan'}), 404
    save_products(new_list)
    return jsonify({'message': f'Produk #{id} berhasil dihapus'}), 200

if __name__ == '__main__':
    app.run(debug=True)
```

# Output
![alt text](<Screenshot (1175).png>)
![alt text](<Screenshot (1176).png>)

# Penjelasan
<p align="justify">
Program ini merupakan aplikasi web inventaris toko kelontong Pak Cik dan Mas Aimar yang dibangun menggunakan framework Flask sebagai backend, Bootstrap untuk tampilan antarmuka, serta jQuery untuk manipulasi DOM dan komunikasi AJAX. Sistem ini menyediakan fitur CRUD (Create, Read, Update, Delete) untuk mengelola data produk seperti nama, stok, dan harga, dengan data yang disimpan ke dalam file JSON tanpa menggunakan database. Seluruh data produk ditampilkan secara dinamis pada tabel, sementara proses tambah, edit, dan hapus dilakukan melalui modal interaktif sehingga penggunaan aplikasi menjadi lebih praktis, responsif, dan memberikan pengalaman pengguna yang lebih modern.
</p>