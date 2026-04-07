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