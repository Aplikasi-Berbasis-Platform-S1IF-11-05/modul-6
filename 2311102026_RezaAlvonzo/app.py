from flask import Flask, render_template, request, jsonify
import json
import os

app = Flask(__name__)
DATA_FILE = 'data.json'

def load_data():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, 'r') as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return []

def save_data(data):
    with open(DATA_FILE, 'w') as f:
        json.dump(data, f, indent=4)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/products', methods=['GET'])
def get_products():
    return jsonify(load_data())

@app.route('/api/products', methods=['POST'])
def add_product():
    data = load_data()
    new_product = request.json
    # Generate new ID
    new_id = 1 if not data else max(p['id'] for p in data) + 1
    new_product['id'] = new_id
    data.append(new_product)
    save_data(data)
    return jsonify(new_product), 201

@app.route('/api/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    data = load_data()
    updated_product = request.json
    for i, product in enumerate(data):
        if product['id'] == product_id:
            updated_product['id'] = product_id
            data[i] = updated_product
            save_data(data)
            return jsonify(updated_product)
    return jsonify({'error': 'Product not found'}), 404

@app.route('/api/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    data = load_data()
    new_data = [p for p in data if p['id'] != product_id]
    if len(new_data) < len(data):
        save_data(new_data)
        return jsonify({'message': 'Product deleted'})
    return jsonify({'error': 'Product not found'}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)
