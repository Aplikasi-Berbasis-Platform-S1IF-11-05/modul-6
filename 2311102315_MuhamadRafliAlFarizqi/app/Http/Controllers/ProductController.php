<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    private string $jsonFile = 'products.json';

    /**
     * Membaca semua data produk dari file JSON.
     */
    private function readProducts(): array
    {
        if (!Storage::exists($this->jsonFile)) {
            Storage::put($this->jsonFile, json_encode([]));
            return [];
        }

        $content = Storage::get($this->jsonFile);
        return json_decode($content, true) ?? [];
    }

    /**
     * Menyimpan data produk ke file JSON.
     */
    private function saveProducts(array $products): void
    {
        Storage::put($this->jsonFile, json_encode(array_values($products), JSON_PRETTY_PRINT));
    }

    /**
     * Generate ID unik untuk produk baru.
     */
    private function generateId(array $products): int
    {
        if (empty($products)) {
            return 1;
        }
        return max(array_column($products, 'id')) + 1;
    }

    /**
     * Halaman utama - menampilkan daftar produk.
     */
    public function index()
    {
        return view('products.index');
    }

    /**
     * API: Mengambil semua data produk (untuk DataTables).
     */
    public function data()
    {
        $products = $this->readProducts();
        return response()->json(['data' => $products]);
    }

    /**
     * API: Menyimpan produk baru.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama_produk' => 'required|string|max:255',
            'kategori'    => 'required|string|max:100',
            'harga'       => 'required|numeric|min:0',
            'stok'        => 'required|integer|min:0',
        ]);

        $products = $this->readProducts();

        $product = [
            'id'          => $this->generateId($products),
            'nama_produk' => $request->nama_produk,
            'kategori'    => $request->kategori,
            'harga'       => (float) $request->harga,
            'stok'        => (int) $request->stok,
            'created_at'  => now()->toDateTimeString(),
            'updated_at'  => now()->toDateTimeString(),
        ];

        $products[] = $product;
        $this->saveProducts($products);

        return response()->json([
            'success' => true,
            'message' => 'Produk berhasil ditambahkan!',
            'data'    => $product,
        ]);
    }

    /**
     * API: Mengambil data satu produk berdasarkan ID.
     */
    public function show(int $id)
    {
        $products = $this->readProducts();
        $product = collect($products)->firstWhere('id', $id);

        if (!$product) {
            return response()->json(['success' => false, 'message' => 'Produk tidak ditemukan.'], 404);
        }

        return response()->json(['success' => true, 'data' => $product]);
    }

    /**
     * API: Mengupdate data produk.
     */
    public function update(Request $request, int $id)
    {
        $request->validate([
            'nama_produk' => 'required|string|max:255',
            'kategori'    => 'required|string|max:100',
            'harga'       => 'required|numeric|min:0',
            'stok'        => 'required|integer|min:0',
        ]);

        $products = $this->readProducts();
        $index = collect($products)->search(fn($p) => $p['id'] === $id);

        if ($index === false) {
            return response()->json(['success' => false, 'message' => 'Produk tidak ditemukan.'], 404);
        }

        $products[$index] = array_merge($products[$index], [
            'nama_produk' => $request->nama_produk,
            'kategori'    => $request->kategori,
            'harga'       => (float) $request->harga,
            'stok'        => (int) $request->stok,
            'updated_at'  => now()->toDateTimeString(),
        ]);

        $this->saveProducts($products);

        return response()->json([
            'success' => true,
            'message' => 'Produk berhasil diperbarui!',
            'data'    => $products[$index],
        ]);
    }

    /**
     * API: Menghapus produk.
     */
    public function destroy(int $id)
    {
        $products = $this->readProducts();
        $index = collect($products)->search(fn($p) => $p['id'] === $id);

        if ($index === false) {
            return response()->json(['success' => false, 'message' => 'Produk tidak ditemukan.'], 404);
        }

        $deletedProduct = $products[$index];
        unset($products[$index]);
        $this->saveProducts($products);

        return response()->json([
            'success' => true,
            'message' => 'Produk "' . $deletedProduct['nama_produk'] . '" berhasil dihapus!',
        ]);
    }
}
