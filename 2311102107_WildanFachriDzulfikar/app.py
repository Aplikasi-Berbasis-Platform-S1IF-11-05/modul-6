from flask import Flask, render_template, request, jsonify
import json
import os

app = Flask(__name__)

# Path to the JSON data file
DATA_FILE = os.path.join(os.path.dirname(__file__), 'data', 'products.json')

def load_products():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, 'r') as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return []

def save_products(products):
    with open(DATA_FILE, 'w') as f:
        json.dump(products, f, indent=4)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/products', methods=['GET'])
def get_products():
    return jsonify(load_products())

@app.route('/api/products', methods=['POST'])
def add_product():
    data = request.get_json()
    products = load_products()
    
    new_id = 1
    if products:
        new_id = max(p['id'] for p in products) + 1
        
    new_product = {
        'id': new_id,
        'name': data.get('name'),
        'category': data.get('category'),
        'stock': int(data.get('stock')),
        'price': int(data.get('price'))
    }
    
    products.append(new_product)
    save_products(products)
    return jsonify({'success': True, 'product': new_product})

@app.route('/api/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    data = request.get_json()
    products = load_products()
    
    product_found = False
    for p in products:
        if p['id'] == product_id:
            p['name'] = data.get('name', p['name'])
            p['category'] = data.get('category', p['category'])
            p['stock'] = int(data.get('stock', p['stock']))
            p['price'] = int(data.get('price', p['price']))
            product_found = True
            break
            
    if product_found:
        save_products(products)
        return jsonify({'success': True})
    return jsonify({'success': False, 'message': 'Product not found'}), 404

@app.route('/api/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    products = load_products()
    new_products = [p for p in products if p['id'] != product_id]
    
    if len(new_products) < len(products):
        save_products(new_products)
        return jsonify({'success': True})
    return jsonify({'success': False, 'message': 'Product not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
