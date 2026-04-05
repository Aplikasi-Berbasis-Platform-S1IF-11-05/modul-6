<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductController extends Controller
{
    private function getJsonPath()
    {
        return storage_path('app/products.json');
    }

    private function readProducts()
    {
        $path = $this->getJsonPath();
        if (!file_exists($path)) {
            return [];
        }
        $json = file_get_contents($path);
        return json_decode($json, true) ?: [];
    }

    private function writeProducts(array $products)
    {
        file_put_contents($this->getJsonPath(), json_encode(array_values($products), JSON_PRETTY_PRINT));
    }

    public function index()
    {
        $products = $this->readProducts();
        return view('products.index', compact('products'));
    }

    public function create()
    {
        return view('products.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'kategori' => 'required|string|max:255',
            'harga' => 'required|numeric|min:0',
            'stok' => 'required|integer|min:0',
        ]);

        $products = $this->readProducts();

        $id = count($products) > 0 ? max(array_column($products, 'id')) + 1 : 1;

        $products[] = [
            'id' => $id,
            'nama' => $request->nama,
            'kategori' => $request->kategori,
            'harga' => (float) $request->harga,
            'stok' => (int) $request->stok,
            'created_at' => now()->toDateTimeString(),
            'updated_at' => now()->toDateTimeString(),
        ];

        $this->writeProducts($products);

        return redirect()->route('products.index')->with('success', 'Produk berhasil ditambahkan!');
    }

    public function edit($id)
    {
        $products = $this->readProducts();
        $product = collect($products)->firstWhere('id', (int) $id);

        if (!$product) {
            return redirect()->route('products.index')->with('error', 'Produk tidak ditemukan!');
        }

        return view('products.edit', compact('product'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'kategori' => 'required|string|max:255',
            'harga' => 'required|numeric|min:0',
            'stok' => 'required|integer|min:0',
        ]);

        $products = $this->readProducts();

        foreach ($products as &$product) {
            if ($product['id'] == (int) $id) {
                $product['nama'] = $request->nama;
                $product['kategori'] = $request->kategori;
                $product['harga'] = (float) $request->harga;
                $product['stok'] = (int) $request->stok;
                $product['updated_at'] = now()->toDateTimeString();
                break;
            }
        }

        $this->writeProducts($products);

        return redirect()->route('products.index')->with('success', 'Produk berhasil diperbarui!');
    }

    public function destroy($id)
    {
        $products = $this->readProducts();
        $products = array_filter($products, fn($p) => $p['id'] != (int) $id);
        $this->writeProducts($products);

        return redirect()->route('products.index')->with('success', 'Produk berhasil dihapus!');
    }
}
