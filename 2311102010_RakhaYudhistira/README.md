<div align="center">
  <br />
  <h1>LAPORAN PRAKTIKUM <br> APLIKASI BERBASIS PLATFORM </h1>
  <br />
  <h3>MODUL 6 <br> JAVASCRIPT & JQUERY </h3>
  <br />
  <img width="512" height="512" alt="telyu" src="https://github.com/user-attachments/assets/724a3291-bcf9-448d-a395-3886a8659d79" />
  <br />
  <br />
  <br />
  <h3>Disusun Oleh :</h3>
  <p>
    <strong>Rakha Yudhistira</strong>
    <br>
    <strong>2311102010</strong>
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
  <h3>LABORATORIUM HIGH PERFORMANCE <br>FAKULTAS INFORMATIKA <br>UNIVERSITAS TELKOM PURWOKERTO <br>2026 </h3>
</div>

<hr>

# Dasar Teori

<p align="justify">
JavaScript adalah bahasa pemrograman client-side yang berfungsi untuk menciptakan interaktivitas pada halaman web. Dengan memanipulasi Document Object Model (DOM), JavaScript memungkinkan perubahan konten, struktur, dan gaya secara dinamis langsung di browser pengguna. Dalam pengembangan modern, JavaScript juga digunakan di sisi server melalui Node.js untuk menangani logika aplikasi dan pengolahan data.

jQuery merupakan pustaka JavaScript yang menyederhanakan penulisan kode melalui sintaks yang lebih ringkas. Dengan prinsip "write less, do more", jQuery mempermudah seleksi elemen DOM, penanganan event (seperti klik tombol), dan eksekusi AJAX. jQuery memastikan konsistensi kode di berbagai browser dan mempercepat proses pengembangan antarmuka yang responsif.

Integrasi JSON dan AJAX memungkinkan aplikasi mengelola data secara efisien tanpa refresh halaman. JSON digunakan sebagai format pertukaran data yang ringan dan mudah dibaca, menggantikan peran database dalam skema sederhana. Melalui fungsi AJAX pada jQuery, aplikasi dapat mengirim dan mengambil data dari server Express.js secara asinkron, sehingga operasional CRUD dapat berjalan secara real-time dan interaktif.
</p>


# Source Code index.html
```
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Inventori Pak Cik & Aimar</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/dataTables.bootstrap5.min.css">
</head>
<body class="bg-light p-4">

    <div class="container card shadow-sm p-0">
        <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
            <h5 class="m-0">📦 Toko Pak Cik & Aimar</h5>
            <button class="btn btn-primary btn-sm" onclick="showModal()">+ Barang Baru</button>
        </div>
        <div class="card-body">
            <table id="myTable" class="table table-striped w-100">
                <thead>
                    <tr>
                        <th>Nama</th>
                        <th>Harga</th>
                        <th>Stok</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody id="isiTabel"></tbody>
            </table>
        </div>
    </div>

    <div class="modal fade" id="formModal" tabindex="-1">
        <div class="modal-dialog">
            <form id="productForm" class="modal-content">
                <div class="modal-header"><h5>Input Data Barang</h5></div>
                <div class="modal-body">
                    <input type="hidden" id="prodId">
                    <input type="text" id="nama" class="form-control mb-2" placeholder="Nama Produk" required>
                    <input type="number" id="harga" class="form-control mb-2" placeholder="Harga" required>
                    <input type="number" id="stok" class="form-control mb-2" placeholder="Stok" required>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-success w-100">Simpan</button>
                </div>
            </form>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.6/js/dataTables.bootstrap5.min.js"></script>

    <script>
        let table;

        function refreshData() {
            $.get('/api/produk', function(data) {
                if (table) table.destroy();
                let rows = '';
                data.forEach(p => {
                    rows += `<tr>
                        <td>${p.nama}</td>
                        <td>Rp ${Number(p.harga).toLocaleString()}</td>
                        <td>${p.stok}</td>
                        <td>
                            <button class="btn btn-sm btn-warning" onclick="editData(${p.id}, '${p.nama}', ${p.harga}, ${p.stok})">Edit</button>
                            <button class="btn btn-sm btn-danger" onclick="deleteData(${p.id})">Hapus</button>
                        </td>
                    </tr>`;
                });
                $('#isiTabel').html(rows);
                table = $('#myTable').DataTable();
            });
        }

        function showModal() {
            $('#prodId').val('');
            $('#productForm')[0].reset();
            $('#formModal').modal('show');
        }

        function editData(id, n, h, s) {
            $('#prodId').val(id); $('#nama').val(n); $('#harga').val(h); $('#stok').val(s);
            $('#formModal').modal('show');
        }

        function deleteData(id) {
            if(confirm('Hapus barang ini, Mas Aimar?')) {
                $.ajax({ url: '/api/produk/'+id, type: 'DELETE', success: refreshData });
            }
        }

        $('#productForm').submit(function(e) {
            e.preventDefault();
            const id = $('#prodId').val();
            $.ajax({
                url: id ? '/api/produk/'+id : '/api/produk',
                type: id ? 'PUT' : 'POST',
                data: JSON.stringify({ nama: $('#nama').val(), harga: $('#harga').val(), stok: $('#stok').val() }),
                contentType: 'application/json',
                success: function() { $('#formModal').modal('hide'); refreshData(); }
            });
        });

        $(document).ready(refreshData);
    </script>
</body>
</html>
```

# Source Code server.js
```
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Memberitahu Express bahwa file statis (HTML, JS, CSS) ada di folder 'public'
app.use(express.static('public'));

const DATA_FILE = path.join(__dirname, 'data.json');

// Helper Baca/Tulis
const readData = () => JSON.parse(fs.readFileSync(DATA_FILE, 'utf8') || "[]");
const writeData = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

// Endpoint Utama: Kirim file HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API CRUD
app.get('/api/produk', (req, res) => res.json(readData()));

app.post('/api/produk', (req, res) => {
    const data = readData();
    data.push({ id: Date.now(), ...req.body });
    writeData(data);
    res.sendStatus(201);
});

app.put('/api/produk/:id', (req, res) => {
    let data = readData();
    const idx = data.findIndex(p => p.id == req.params.id);
    if (idx !== -1) {
        data[idx] = { id: Number(req.params.id), ...req.body };
        writeData(data);
    }
    res.sendStatus(200);
});

app.delete('/api/produk/:id', (req, res) => {
    writeData(readData().filter(p => p.id != req.params.id));
    res.sendStatus(200);
});

app.listen(3000, () => console.log('Server: http://localhost:3000'));

```

# Source Code data.json
```
[
  {
    "id": 1712534400000,
    "nama": "Kopi Sachet",
    "harga": "3000",
    "stok": "20"
  },
  {
    "id": 1712534400001,
    "nama": "Batre ABC",
    "harga": "5000",
    "stok": "20"
  }
]

```


# Screenshoot Program
![alt text](<assets/Screenshot (712).png>)
![alt text](<assets/Screenshot (713).png>)
![alt text](<assets/Screenshot (714).png>)



# Penjelasan
<p align="justify">

Aplikasi ini bekerja dengan mengintegrasikan Express.js sebagai server yang mengelola database berbasis data.json melalui modul fs (File System). Di sisi depan, HTML dan Bootstrap menyediakan antarmuka responsif dengan DataTables untuk fitur pencarian otomatis, sementara jQuery bertindak sebagai penghubung melalui teknik AJAX. Saat pengguna berinteraksi dengan form atau tombol hapus, jQuery mengirimkan permintaan ke API server di latar belakang tanpa memuat ulang halaman (non-refresh), kemudian server memperbarui file JSON dan jQuery secara dinamis mengubah tampilan tabel melalui manipulasi DOM.
</p>