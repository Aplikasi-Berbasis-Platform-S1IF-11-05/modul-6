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
        return json.load(f)

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
    new_product = request.json
    
    # Simple ID increment
    new_id = 1
    if products:
        new_id = max(p['id'] for p in products) + 1
    
    new_product['id'] = new_id
    products.append(new_product)
    save_products(products)
    return jsonify(new_product), 201

@app.route('/api/products/<int:product_id>', methods=['PUT', 'DELETE'])
def handle_product(product_id):
    products = load_products()
    product_index = next((i for i, p in enumerate(products) if p['id'] == product_id), None)
    
    if product_index is None:
        return jsonify({'error': 'Product not found'}), 404
    
    if request.method == 'PUT':
        updated_data = request.json
        # Maintain the original ID
        updated_data['id'] = product_id
        products[product_index] = updated_data
        save_products(products)
        return jsonify(updated_data)
    
    elif request.method == 'DELETE':
        deleted_product = products.pop(product_index)
        save_products(products)
        return jsonify(deleted_product)

if __name__ == '__main__':
    app.run(debug=True)
