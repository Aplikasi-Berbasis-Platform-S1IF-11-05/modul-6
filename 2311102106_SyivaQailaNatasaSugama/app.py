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

@app.route('/api/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    products = load_products()
    products = [p for p in products if p['id'] != id]
    save_products(products)
    return jsonify({'message': 'Product deleted'})

if __name__ == '__main__':
    app.run(debug=True)
