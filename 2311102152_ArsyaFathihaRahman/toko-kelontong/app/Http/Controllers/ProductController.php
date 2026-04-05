<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductController extends Controller
{
    private $file = 'products.json';

    private function getData() {
        if (!file_exists(storage_path($this->file))) {
            file_put_contents(storage_path($this->file), '[]');
        }
        return json_decode(file_get_contents(storage_path($this->file)), true);
    }

    private function saveData($data) {
        file_put_contents(storage_path($this->file), json_encode($data, JSON_PRETTY_PRINT));
    }

    public function index() {
        return view('products.index', ['products' => $this->getData()]);
    }

    public function store(Request $r) {
        $data = $this->getData();

        $data[] = [
            'id' => time(),
            'nama' => $r->nama,
            'harga' => $r->harga,
            'stok' => $r->stok
        ];

        $this->saveData($data);
        return back();
    }

    public function update(Request $r, $id) {
        $data = $this->getData();

        foreach ($data as &$d) {
            if ($d['id'] == $id) {
                $d['nama'] = $r->nama;
                $d['harga'] = $r->harga;
                $d['stok'] = $r->stok;
            }
        }

        $this->saveData($data);
        return back();
    }

    public function delete($id) {
        $data = array_filter($this->getData(), fn($d) => $d['id'] != $id);
        $this->saveData(array_values($data));

        return back();
    }
}