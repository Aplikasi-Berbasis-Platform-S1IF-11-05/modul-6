<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductController extends Controller
{
    private $file = 'products.json';

    private function getData()
    {
        $path = storage_path($this->file);

        if (!file_exists($path)) {
            file_put_contents($path, json_encode([]));
        }

        return json_decode(file_get_contents($path), true);
    }

    private function saveData($data)
    {
        file_put_contents(storage_path($this->file), json_encode($data, JSON_PRETTY_PRINT));
    }

    public function index()
    {
        $products = $this->getData();
        return view('index', compact('products'));
    }

    public function create()
    {
        return view('create');
    }

    public function store(Request $request)
    {
        $data = $this->getData();
        $id = count($data) + 1;

        $data[] = [
            'id' => $id,
            'name' => $request->name,
            'price' => $request->price,
            'stock' => $request->stock
        ];

        $this->saveData($data);
        return redirect('/');
    }

    public function edit($id)
    {
        $data = $this->getData();
        $product = collect($data)->firstWhere('id', $id);

        return view('edit', compact('product'));
    }

    public function update(Request $request, $id)
    {
        $data = $this->getData();

        foreach ($data as &$item) {
            if ($item['id'] == $id) {
                $item['name'] = $request->name;
                $item['price'] = $request->price;
                $item['stock'] = $request->stock;
            }
        }

        $this->saveData($data);
        return redirect('/');
    }

    public function destroy($id)
    {
        $data = $this->getData();

        $data = array_filter($data, function ($item) use ($id) {
            return $item['id'] != $id;
        });

        $this->saveData(array_values($data));

        return redirect('/');
    }
}