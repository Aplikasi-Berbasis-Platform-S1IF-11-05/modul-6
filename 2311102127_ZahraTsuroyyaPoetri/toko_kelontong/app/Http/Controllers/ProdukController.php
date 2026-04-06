<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProdukController extends Controller
{
    private $file;

    public function __construct()
    {
        $this->file = storage_path('app/produk.json');

        if (!file_exists($this->file)) {
            file_put_contents($this->file, json_encode([], JSON_PRETTY_PRINT));
        }
    }

    // Index
    public function index()
    {
        $data = json_decode(file_get_contents($this->file), true);

        if (!$data) {
            $data = [];
        }

        return view('produk', [
            'produk' => $data
        ]);
    }

    // Tambah
    public function tambah(Request $request)
    {
        $data = json_decode(file_get_contents($this->file), true);

        if (!$data) {
            $data = [];
        }

        $id = count($data) > 0 ? max(array_column($data, 'id')) + 1 : 1;

        $data[] = [
            "id" => $id,
            "nama" => $request->nama,
            "harga" => (int) $request->harga,
            "stok" => (int) $request->stok
        ];

        file_put_contents($this->file, json_encode($data, JSON_PRETTY_PRINT));

        return redirect('/')->with('success', 'Data berhasil ditambahkan');
    }

    // Edit
    public function edit(Request $request)
    {
        $data = json_decode(file_get_contents($this->file), true);

        if (!$data) {
            $data = [];
        }

        foreach ($data as &$p) {
            if ($p['id'] == $request->id) {
                $p['nama'] = $request->nama;
                $p['harga'] = (int) $request->harga;
                $p['stok'] = (int) $request->stok;
            }
        }

        file_put_contents($this->file, json_encode($data, JSON_PRETTY_PRINT));

        return redirect('/')->with('success', 'Data berhasil diupdate');
    }

    // Hapus
    public function hapus(Request $request)
    {
        $data = json_decode(file_get_contents($this->file), true);

        if (!$data) {
            $data = [];
        }

        $data = array_filter($data, function ($p) use ($request) {
            return $p['id'] != $request->id;
        });

        // reset index array
        $data = array_values($data);

        file_put_contents($this->file, json_encode($data, JSON_PRETTY_PRINT));

        return redirect('/')->with('success', 'Data berhasil dihapus');
    }
}