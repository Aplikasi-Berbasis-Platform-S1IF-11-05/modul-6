<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>Toko Pak Cik & Aimar</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

<style>
body {
    background: linear-gradient(135deg, #ffe4ec, #ffc2d1);
    font-family: 'Poppins';
}

.card {
    border-radius: 20px;
    background: rgba(255,255,255,0.8);
    backdrop-filter: blur(10px);
}

.btn-custom {
    background: linear-gradient(135deg, #f472b6, #fb7185);
    color: white;
    border: none;
}

.table tbody tr:hover {
    background: #ffe4ec;
}
</style>
</head>

<body class="p-4">

<div class="container">

<h2 class="text-center mb-4">🛒 Toko Pak Cik & Aimar</h2>

<div class="card p-4 mb-4">
<form method="POST" action="/store">
@csrf
<input name="nama" class="form-control mb-2" placeholder="Nama Produk">
<input name="harga" class="form-control mb-2" placeholder="Harga">
<input name="stok" class="form-control mb-2" placeholder="Stok">
<button class="btn btn-custom w-100">Tambah Produk</button>
</form>
</div>

<div class="card p-4">
<table class="table table-bordered text-center">
<thead>
<tr>
<th>Nama</th>
<th>Harga</th>
<th>Stok</th>
<th>Aksi</th>
</tr>
</thead>

<tbody>
@foreach($products as $p)
<tr>
<td>{{ $p['nama'] }}</td>
<td>Rp {{ number_format($p['harga']) }}</td>
<td>{{ $p['stok'] }}</td>
<td>
<button class="btn btn-warning editBtn"
data-id="{{ $p['id'] }}"
data-nama="{{ $p['nama'] }}"
data-harga="{{ $p['harga'] }}"
data-stok="{{ $p['stok'] }}">
Edit
</button>

<button class="btn btn-danger deleteBtn"
data-id="{{ $p['id'] }}">
Hapus
</button>
</td>
</tr>
@endforeach
</tbody>
</table>
</div>

</div>

<!-- MODAL EDIT -->
<div class="modal fade" id="editModal">
<div class="modal-dialog">
<div class="modal-content p-3">

<form method="POST" id="editForm">
@csrf
<input name="nama" id="editNama" class="form-control mb-2">
<input name="harga" id="editHarga" class="form-control mb-2">
<input name="stok" id="editStok" class="form-control mb-2">
<button class="btn btn-primary w-100">Update</button>
</form>

</div>
</div>
</div>

<!-- MODAL DELETE -->
<div class="modal fade" id="deleteModal">
<div class="modal-dialog">
<div class="modal-content p-3 text-center">

<h5>Yakin hapus?</h5>

<form method="POST" id="deleteForm">
@csrf
@method('DELETE')
<button class="btn btn-danger w-100 mt-2">Hapus</button>
</form>

</div>
</div>
</div>

<script>
$(document).ready(function(){

$('.editBtn').click(function(){
$('#editNama').val($(this).data('nama'));
$('#editHarga').val($(this).data('harga'));
$('#editStok').val($(this).data('stok'));

$('#editForm').attr('action','/update/'+$(this).data('id'));
$('#editModal').modal('show');
});

$('.deleteBtn').click(function(){
$('#deleteForm').attr('action','/delete/'+$(this).data('id'));
$('#deleteModal').modal('show');
});

});
</script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

</body>
</html>