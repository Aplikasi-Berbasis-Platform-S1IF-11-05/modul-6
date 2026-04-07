<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>Cyber Store</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

<style>
body {
    background: linear-gradient(135deg, #0f172a, #1e3a8a);
    color: white;
}
.card {
    background: rgba(0, 0, 0, 0.6);
    border: 1px solid #3b82f6;
    border-radius: 20px;
}
.btn-main {
    background: linear-gradient(135deg, #3b82f6, #06b6d4);
    color: white;
}
</style>
</head>

<body class="p-4">

<div class="container">

<h2 class="text-center mb-4">⚡ Cyber Store</h2>

<!-- FORM TAMBAH -->
<div class="card p-4 mb-4">
<form method="POST" action="/store">
@csrf
<input name="nama" class="form-control mb-2" placeholder="Produk">
<input name="harga" class="form-control mb-2" placeholder="Harga">
<input name="stok" class="form-control mb-2" placeholder="Stok">
<button class="btn btn-main w-100">Tambah</button>
</form>
</div>

<!-- TABLE -->
<div class="card p-4">
<table class="table table-dark text-center align-middle">
<thead>
<tr>
<th>Nama</th>
<th>Harga</th>
<th>Stok</th>
<th>Aksi</th>
</tr>
</thead>

<tbody>
@foreach($items as $i)
<tr>
<td>{{ $i['nama'] }}</td>
<td>{{ $i['harga'] }}</td>
<td>{{ $i['stok'] }}</td>
<td>

<button 
class="btn btn-info editBtn"
data-id="{{ $i['id'] }}"
data-nama="{{ $i['nama'] }}"
data-harga="{{ $i['harga'] }}"
data-stok="{{ $i['stok'] }}">
Edit
</button>

<form method="POST" action="/delete/{{ $i['id'] }}" style="display:inline;">
@csrf
@method('DELETE')
<button class="btn btn-danger">Hapus</button>
</form>

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

<button class="btn btn-main w-100">Update</button>
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

});
</script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

</body>
</html>