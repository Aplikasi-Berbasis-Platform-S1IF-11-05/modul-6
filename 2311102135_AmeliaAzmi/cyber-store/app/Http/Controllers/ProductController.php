<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductController extends Controller
{
    private $file = 'products.json';

    // READ JSON
    private function read()
    {
        $path = storage_path('app/' . $this->file);

        if (!file_exists($path)) {
            file_put_contents($path, '[]');
        }

        return json_decode(file_get_contents($path), true);
    }

    // WRITE JSON
    private function write($data)
    {
        $path = storage_path('app/' . $this->file);

        file_put_contents($path, json_encode($data, JSON_PRETTY_PRINT));
    }

    // TAMPIL DATA
    public function index()
    {
        return view('products.index', [
            'items' => $this->read()
        ]);
    }

    // TAMBAH DATA
    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required',
            'harga' => 'required|numeric',
            'stok' => 'required|numeric'
        ]);

        $data = $this->read();

        $data[] = [
            'id'    => uniqid(),
            'nama'  => $request->nama,
            'harga' => $request->harga,
            'stok'  => $request->stok
        ];

        $this->write($data);

        return back();
    }

    // UPDATE DATA
    public function update(Request $request, $id)
    {
        $request->validate([
            'nama' => 'required',
            'harga' => 'required|numeric',
            'stok' => 'required|numeric'
        ]);

        $data = $this->read();

        foreach ($data as &$item) {
            if ($item['id'] == $id) {
                $item['nama']  = $request->nama;
                $item['harga'] = $request->harga;
                $item['stok']  = $request->stok;
            }
        }

        $this->write($data);

        return back();
    }

    // DELETE DATA
    public function delete($id)
    {
        $data = array_filter($this->read(), function ($item) use ($id) {
            return $item['id'] != $id;
        });

        $this->write(array_values($data));

        return back();
    }
}