"""
Toko Kelontong Pak Cik dan Aimar
================================
Aplikasi web inventori toko kelontong menggunakan Flask.
Data disimpan dalam format JSON (tanpa database).
Menggunakan Bootstrap untuk styling dan jQuery untuk DOM manipulation.

Fitur:
- CRUD (Create, Read, Update, Delete) produk
- DataTable untuk menampilkan daftar produk
- Form create & edit produk
- Modal konfirmasi untuk delete
- Pencarian dan sorting produk

Author: Willy
Framework: Flask (Python)
"""

from flask import Flask, render_template, request, jsonify
import json
import os
from datetime import datetime

app = Flask(__name__)

# Path ke file JSON untuk menyimpan data produk
DATA_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data', 'products.json')


def ensure_data_file():
    """Memastikan file JSON dan direktori data ada."""
    os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
    if not os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'w', encoding='utf-8') as f:
            json.dump([], f, indent=2, ensure_ascii=False)


def load_products():
    """Membaca data produk dari file JSON."""
    ensure_data_file()
    try:
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except (json.JSONDecodeError, FileNotFoundError):
        return []


def save_products(products):
    """Menyimpan data produk ke file JSON."""
    ensure_data_file()
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(products, f, indent=2, ensure_ascii=False)


def generate_id(products):
    """Generate ID unik untuk produk baru."""
    if not products:
        return 1
    return max(p['id'] for p in products) + 1


# =====================
# Routes - Halaman Web
# =====================

@app.route('/')
def index():
    """Halaman utama - menampilkan daftar produk."""
    return render_template('index.html')


# =====================
# API Routes - CRUD
# =====================

@app.route('/api/products', methods=['GET'])
def get_products():
    """API: Mengambil semua data produk."""
    products = load_products()
    return jsonify({
        'success': True,
        'data': products,
        'total': len(products)
    })


@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    """API: Mengambil data produk berdasarkan ID."""
    products = load_products()
    product = next((p for p in products if p['id'] == product_id), None)
    if product:
        return jsonify({'success': True, 'data': product})
    return jsonify({'success': False, 'message': 'Produk tidak ditemukan'}), 404


@app.route('/api/products', methods=['POST'])
def create_product():
    """API: Menambahkan produk baru."""
    data = request.get_json()

    # Validasi input
    required_fields = ['nama', 'kategori', 'harga', 'stok']
    for field in required_fields:
        if field not in data or not str(data[field]).strip():
            return jsonify({
                'success': False,
                'message': f'Field "{field}" wajib diisi'
            }), 400

    try:
        harga = float(data['harga'])
        stok = int(data['stok'])
        if harga < 0 or stok < 0:
            raise ValueError
    except (ValueError, TypeError):
        return jsonify({
            'success': False,
            'message': 'Harga dan stok harus berupa angka positif'
        }), 400

    products = load_products()

    new_product = {
        'id': generate_id(products),
        'nama': data['nama'].strip(),
        'kategori': data['kategori'].strip(),
        'harga': harga,
        'stok': stok,
        'deskripsi': data.get('deskripsi', '').strip(),
        'created_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        'updated_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }

    products.append(new_product)
    save_products(products)

    return jsonify({
        'success': True,
        'message': 'Produk berhasil ditambahkan',
        'data': new_product
    }), 201


@app.route('/api/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    """API: Mengupdate data produk."""
    data = request.get_json()
    products = load_products()

    product_index = next((i for i, p in enumerate(products) if p['id'] == product_id), None)
    if product_index is None:
        return jsonify({'success': False, 'message': 'Produk tidak ditemukan'}), 404

    # Validasi input
    required_fields = ['nama', 'kategori', 'harga', 'stok']
    for field in required_fields:
        if field not in data or not str(data[field]).strip():
            return jsonify({
                'success': False,
                'message': f'Field "{field}" wajib diisi'
            }), 400

    try:
        harga = float(data['harga'])
        stok = int(data['stok'])
        if harga < 0 or stok < 0:
            raise ValueError
    except (ValueError, TypeError):
        return jsonify({
            'success': False,
            'message': 'Harga dan stok harus berupa angka positif'
        }), 400

    products[product_index].update({
        'nama': data['nama'].strip(),
        'kategori': data['kategori'].strip(),
        'harga': harga,
        'stok': stok,
        'deskripsi': data.get('deskripsi', '').strip(),
        'updated_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    })

    save_products(products)

    return jsonify({
        'success': True,
        'message': 'Produk berhasil diupdate',
        'data': products[product_index]
    })


@app.route('/api/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    """API: Menghapus produk."""
    products = load_products()

    product_index = next((i for i, p in enumerate(products) if p['id'] == product_id), None)
    if product_index is None:
        return jsonify({'success': False, 'message': 'Produk tidak ditemukan'}), 404

    deleted_product = products.pop(product_index)
    save_products(products)

    return jsonify({
        'success': True,
        'message': 'Produk berhasil dihapus',
        'data': deleted_product
    })


# =====================
# Main Entry Point
# =====================

if __name__ == '__main__':
    ensure_data_file()
    app.run(debug=True, port=5000)
