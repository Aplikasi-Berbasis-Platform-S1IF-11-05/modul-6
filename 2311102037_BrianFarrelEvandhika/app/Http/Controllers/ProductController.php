<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    private $jsonFile = 'inventory.json';

    public function index()
    {
        return view('welcome');
    }

    public function getData()
    {
        $data = $this->readJson();
        return response()->json(['data' => $data]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'stock' => 'required|integer|min:0',
            'price' => 'required|numeric|min:0',
        ]);

        $data = $this->readJson();
        $id = count($data) > 0 ? max(array_column($data, 'id')) + 1 : 1;
        
        $newProduct = [
            'id' => $id,
            'name' => $validated['name'],
            'stock' => $validated['stock'],
            'price' => $validated['price'],
        ];

        $data[] = $newProduct;
        $this->saveJson($data);

        return response()->json(['success' => true, 'message' => 'Produk berhasil ditambahkan!', 'product' => $newProduct]);
    }

    public function edit($id)
    {
        $data = $this->readJson();
        $product = collect($data)->firstWhere('id', (int) $id);

        if (!$product) {
            return response()->json(['success' => false, 'message' => 'Produk tidak ditemukan!'], 404);
        }

        return response()->json($product);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'stock' => 'required|integer|min:0',
            'price' => 'required|numeric|min:0',
        ]);

        $data = $this->readJson();
        $index = array_search((int) $id, array_column($data, 'id'));

        if ($index === false) {
            return response()->json(['success' => false, 'message' => 'Produk tidak ditemukan!'], 404);
        }

        $data[$index] = array_merge($data[$index], $validated);
        $this->saveJson($data);

        return response()->json(['success' => true, 'message' => 'Produk berhasil diperbarui!']);
    }

    public function destroy($id)
    {
        $data = $this->readJson();
        $index = array_search((int) $id, array_column($data, 'id'));

        if ($index === false) {
            return response()->json(['success' => false, 'message' => 'Produk tidak ditemukan!'], 404);
        }

        array_splice($data, $index, 1);
        $this->saveJson($data);

        return response()->json(['success' => true, 'message' => 'Produk berhasil dihapus!']);
    }

    private function readJson()
    {
        if (!Storage::exists($this->jsonFile)) {
            Storage::put($this->jsonFile, json_encode([]));
            return [];
        }

        $json = Storage::get($this->jsonFile);
        return json_decode($json, true) ?? [];
    }

    private function saveJson($data)
    {
        Storage::put($this->jsonFile, json_encode($data, JSON_PRETTY_PRINT));
    }
}
