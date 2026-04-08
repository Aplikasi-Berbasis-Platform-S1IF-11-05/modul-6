<div align="center">
  <br />
  <h1>LAPORAN PRAKTIKUM <br> APLIKASI BERBASIS PLATFORM </h1>
  <br />
  <h3>MODUL 6 <br> CODING ON THE SPOT </h3>
  <br />
  <img width="512" height="512" alt="telyu" src="https://github.com/user-attachments/assets/724a3291-bcf9-448d-a395-3886a8659d79" />
  <br />
  <br />
  <br />
  <h3>Disusun Oleh :</h3>
  <p>
    <strong>Zahra Tsuroyya Poetri</strong>
    <br>
    <strong>2311102127</strong>
    <br>
    <strong>S1 IF-11-REG05</strong>
  </p>
  <br />
  <h3>Dosen Pengampu :</h3>
  <p>
    <strong>Dedi Agung Prabowo, S.Kom., M.Kom</strong>
  </p>
  <br />
  <br />
  <h4>Asisten Praktikum :</h4>
  <strong>Apri Pandu Wicaksono </strong>
  <br>
  <strong>Hamka Zaenul Ardi</strong>
  <br />
  <h3>LABORATORIUM HIGH PERFORMANCE <br>FAKULTAS INFORMATIKA <br>UNIVERSITAS TELKOM PURWOKERTO <br>2026</h3>
</div>

<hr>

### Dasar Teori

Coding on the spot adalah cara menguji kemampuan coding secara langsung dalam waktu yang terbatas. Dalam kegiatan ini, seseorang dituntut untuk bisa memahami soal, menyusun logika, dan menuliskan kode dengan cepat dan tepat. Kemampuan dasar seperti membuat algoritma sederhana, memahami sintaks, dan memperbaiki error sangat penting agar program bisa berjalan dengan baik.

Selain itu, penggunaan framework seperti Laravel juga membantu dalam coding karena sudah menyediakan fitur siap pakai, seperti routing dan pengelolaan database. Dengan Laravel, penulisan kode jadi lebih rapi, terstruktur, dan bisa lebih cepat diselesaikan meskipun waktunya terbatas

### Tugas 6 - Toko Kelontong Pak Cik dan Aimar

#### Source Code - ProdukController.php

```
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

```

#### Source Code - produk.blade.php

```
<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <title>Toko Kelontong</title>

    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">
    <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/3081/3081559.png">

    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

    <style>
        .table-wrapper {
            border-radius: 16px;
            overflow: hidden;
        }

        tbody tr {
            transition: all 0.2s ease;
        }

        tbody tr:hover {
            background-color: #eef2ff;
            transform: scale(1.01);
        }

        .btn {
            transition: all 0.2s ease;
        }

        .btn:hover {
            transform: translateY(-2px);
        }

        .btn:active {
            transform: scale(0.95);
        }
    </style>
</head>

<body class="bg-body-tertiary">

<div class="container py-5">

    <!-- JUDUL -->
    <div class="text-center mb-5">
        <h1 class="fw-bold text-primary">
            <i class="bi bi-shop"></i> Toko Kelontong 
        </h1>
        <p class="text-muted">Pak Cik & Aimar</p>
    </div>

    <!-- Alert -->
    @if(session('success'))
        <div class="alert alert-success alert-dismissible fade show shadow-sm">
            {{ session('success') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    @endif

    <div class="card border-0 shadow-lg rounded-4">

        <!-- HEADER -->
        <div class="card-header bg-white border-0 d-flex justify-content-between align-items-center px-4 py-3">
            <h5 class="mb-0 fw-semibold">
                <i class="bi bi-box-seam"></i> Data Produk
            </h5>

            <button class="btn btn-primary-subtle text-primary fw-semibold"
                    data-bs-toggle="modal"
                    data-bs-target="#modalTambah">
                <i class="bi bi-plus-circle"></i> Tambah
            </button>
        </div>

        <!-- TABLE -->
        <div class="card-body p-3">
            <div class="table-wrapper shadow-sm">

                <table class="table table-hover align-middle text-center mb-0">

                    <thead class="table-light">
                    <tr>
                        <th>ID</th>
                        <th class="text-start ps-4">Nama Produk</th>
                        <th>Harga</th>
                        <th>Stok</th>
                        <th>Aksi</th>
                    </tr>
                    </thead>

                    <tbody>
                    @foreach($produk as $p)
                        <tr>
                            <td>{{ $p['id'] }}</td>

                            <td class="text-start ps-4 fw-medium">
                                {{ $p['nama'] }}
                            </td>

                            <td class="text-primary fw-semibold">
                                Rp {{ number_format($p['harga'],0,',','.') }}
                            </td>

                            <td>
                                @if($p['stok'] <= 5)
                                    <span class="badge bg-danger-subtle text-danger">
                                        {{ $p['stok'] }}
                                    </span>
                                @else
                                    <span class="badge bg-success-subtle text-success">
                                        {{ $p['stok'] }}
                                    </span>
                                @endif
                            </td>

                            <td>
                                <button class="btn btn-sm btn-warning-subtle text-warning border-0 editBtn"
                                        data-id="{{ $p['id'] }}"
                                        data-nama="{{ $p['nama'] }}"
                                        data-harga="{{ $p['harga'] }}"
                                        data-stok="{{ $p['stok'] }}">
                                    <i class="bi bi-pencil"></i>
                                </button>

                                <button class="btn btn-sm btn-danger-subtle text-danger border-0 deleteBtn"
                                        data-id="{{ $p['id'] }}">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    @endforeach
                    </tbody>

                </table>

            </div>
        </div>
    </div>
</div>

<!-- MODAL TAMBAH -->
<div class="modal fade" id="modalTambah">
    <div class="modal-dialog">
        <div class="modal-content rounded-4 border-0 shadow">

            <form method="POST" action="/tambah">
                @csrf

                <div class="modal-header bg-primary-subtle">
                    <h5 class="text-primary">Tambah Produk</h5>
                </div>

                <div class="modal-body">
                    <input type="text" name="nama" class="form-control mb-3" placeholder="Nama Produk" required>
                    <input type="number" name="harga" class="form-control mb-3" placeholder="Harga" required>
                    <input type="number" name="stok" class="form-control" placeholder="Stok" required>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                    <button type="submit" class="btn btn-primary">Simpan</button>
                </div>

            </form>

        </div>
    </div>
</div>

<!-- MODAL EDIT -->
<div class="modal fade" id="modalEdit">
    <div class="modal-dialog">
        <div class="modal-content rounded-4 border-0 shadow">

            <form method="POST" action="/edit">
                @csrf

                <input type="hidden" name="id" id="editId">

                <div class="modal-header bg-warning-subtle">
                    <h5 class="text-warning">Edit Produk</h5>
                </div>

                <div class="modal-body">
                    <input type="text" name="nama" id="editNama" class="form-control mb-3" required>
                    <input type="number" name="harga" id="editHarga" class="form-control mb-3" required>
                    <input type="number" name="stok" id="editStok" class="form-control" required>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                    <button type="submit" class="btn btn-warning">Update</button>
                </div>

            </form>

        </div>
    </div>
</div>

<!-- MODAL DELETE -->
<div class="modal fade" id="modalDelete">
    <div class="modal-dialog">
        <div class="modal-content rounded-4 border-0 shadow">

            <form method="POST" action="/hapus">
                @csrf

                <input type="hidden" name="id" id="deleteId">

                <div class="modal-header bg-danger-subtle">
                    <h5 class="text-danger">Hapus Produk</h5>
                </div>

                <div class="modal-body text-center">
                    Yakin mau hapus produk ini?
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                    <button type="submit" class="btn btn-danger">Hapus</button>
                </div>

            </form>

        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

<script>
$(document).ready(function(){

    $(".editBtn").click(function(){
        $("#editId").val($(this).data("id"));
        $("#editNama").val($(this).data("nama"));
        $("#editHarga").val($(this).data("harga"));
        $("#editStok").val($(this).data("stok"));
        $("#modalEdit").modal("show");
    });

    $(".deleteBtn").click(function(){
        $("#deleteId").val($(this).data("id"));
        $("#modalDelete").modal("show");
    });

});
</script>

</body>
</html>

```

#### Source Code - produk.json

```
[
    {
        "id": 1,
        "nama": "Rokok LA",
        "harga": 35000,
        "stok": 15
    },
    {
        "id": 2,
        "nama": "Kopi Nescafe",
        "harga": 3000,
        "stok": 20
    },
    {
        "id": 3,
        "nama": "Mie Sedaap Korean Hot Spicy",
        "harga": 4500,
        "stok": 26
    }
]

```

### Hasil Output

![Hasil Output](modul6(1).png)

![Hasil Output](modul6(2).png)

![Hasil Output](modul6(3).png)

![Hasil Output](modul6(4).png)

### Deskripsi Kode

Kode tersebut merupakan halaman web inventori untuk Toko Kelontong Pak Cik & Aimar yang dibuat menggunakan Laravel dengan tampilan Bootstrap dan interaksi jQuery. Halaman ini menampilkan data produk dalam bentuk tabel (seperti datatable) yang berisi ID, nama, harga, dan stok. Data produk diambil dari file JSON (produk.json), sehingga tidak menggunakan database sesuai dengan ketentuan tugas.

Fungsi utama kode ini adalah untuk melakukan CRUD (Create, Read, Update, Delete) terhadap data produk. Pengguna dapat menambah produk melalui modal tambah, mengedit melalui modal edit, dan menghapus melalui modal konfirmasi. Data ditampilkan menggunakan Blade (@foreach) sehingga bersifat dinamis sesuai isi JSON.

Cara kerjanya adalah controller membaca data dari file JSON, lalu mengirimkannya ke view untuk ditampilkan dalam tabel. Saat tombol edit atau hapus diklik, jQuery akan mengambil data dari tombol dan mengisinya ke dalam form modal. Setelah form disubmit, data akan diproses dan disimpan kembali ke file JSON.

Output dari kode ini adalah halaman inventori yang interaktif, di mana pengguna dapat melihat, menambah, mengubah, dan menghapus data produk dengan tampilan yang rapi dan responsif. 
