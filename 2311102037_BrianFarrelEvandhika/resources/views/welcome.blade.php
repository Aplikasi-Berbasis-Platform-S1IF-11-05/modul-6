<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Inventaris Toko Pak Cik & Mas Aimar</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- DataTables CSS -->
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.13.4/css/dataTables.bootstrap5.min.css"/>
</head>
<body class="bg-light">
<div class="container mt-5">
    <div class="row mb-4">
        <div class="col-12">
            <h2 class="mb-0 text-center text-primary fw-bold">Manajemen Inventaris Toko</h2>
            <p class="text-center text-secondary">Toko Pak Cik & Mas Aimar</p>
        </div>
    </div>

    <!-- Alert Success -->
    <div class="alert alert-success d-none" id="success-alert" role="alert"></div>

    <div class="card shadow-sm">
        <div class="card-header bg-white d-flex justify-content-between align-items-center py-3">
            <h5 class="mb-0 fw-bold">Daftar Produk</h5>
            <button type="button" class="btn btn-primary" id="btn-create" data-bs-toggle="modal" data-bs-target="#productModal">
                + Tambah Produk
            </button>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table id="productTable" class="table table-bordered table-striped table-hover w-100 align-middle">
                    <thead class="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Nama Produk</th>
                            <th>Stok</th>
                            <th>Harga (Rp)</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- DataTable Content -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<!-- Modal Form Create & Edit -->
<div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form id="productForm">
                <div class="modal-header">
                    <h5 class="modal-title" id="productModalLabel">Tambah Produk</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="product_id" name="id">
                    
                    <div class="mb-3">
                        <label for="name" class="form-label">Nama Produk</label>
                        <input type="text" class="form-control" id="name" name="name" required>
                    </div>
                    
                    <div class="mb-3">
                        <label for="stock" class="form-label">Stok</label>
                        <input type="number" class="form-control" id="stock" name="stock" min="0" required>
                    </div>
                    
                    <div class="mb-3">
                        <label for="price" class="form-label">Harga (Rp)</label>
                        <input type="number" class="form-control" id="price" name="price" min="0" required>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                    <button type="submit" class="btn btn-primary" id="btn-save">Simpan</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Modal Confirmation Delete -->
<div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header bg-danger text-white">
                <h5 class="modal-title" id="deleteModalLabel">Konfirmasi Hapus</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                Apakah Anda yakin ingin menghapus produk ini?
                <input type="hidden" id="delete_product_id">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                <button type="button" class="btn btn-danger" id="btn-confirm-delete">Hapus</button>
            </div>
        </div>
    </div>
</div>

<!-- jQuery (Required) -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<!-- Bootstrap JS Bundle -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
<!-- DataTables JS -->
<script type="text/javascript" src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/1.13.4/js/dataTables.bootstrap5.min.js"></script>

<script>
$(document).ready(function () {
    // Setup CSRF token for AJAX
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    // Initialize DataTable
    var table = $('#productTable').DataTable({
        processing: true,
        ajax: '{{ route('products.data') }}',
        columns: [
            { data: 'id', name: 'id' },
            { data: 'name', name: 'name' },
            { data: 'stock', name: 'stock' },
            { data: 'price', name: 'price', render: $.fn.dataTable.render.number('.', ',', 0, 'Rp ') },
            { 
                data: null, 
                orderable: false, 
                searchable: false,
                render: function (data, type, row) {
                    return `
                        <button class="btn btn-sm btn-warning btn-edit" data-id="${row.id}"><i class="bi bi-pencil"></i> Edit</button>
                        <button class="btn btn-sm btn-danger btn-delete" data-id="${row.id}"><i class="bi bi-trash"></i> Hapus</button>
                    `;
                }
            }
        ],
        language: {
            url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/id.json'
        }
    });

    // Show Create form modal
    $('#btn-create').click(function () {
        $('#productForm').trigger('reset');
        $('#product_id').val('');
        $('#productModalLabel').text('Tambah Produk Baru');
    });

    // Save Data (Create or Update)
    $('#productForm').submit(function (e) {
        e.preventDefault();
        
        let id = $('#product_id').val();
        let url = id ? '/products/' + id : '{{ route("products.store") }}';
        let method = id ? 'PUT' : 'POST';

        $.ajax({
            url: url,
            type: method,
            data: $(this).serialize(),
            success: function (response) {
                $('#productModal').modal('hide');
                showAlert(response.message);
                table.ajax.reload();
            },
            error: function (xhr) {
                alert('Terjadi kesalahan: ' + xhr.responseJSON.message);
            }
        });
    });

    // Show Edit form modal
    $(document).on('click', '.btn-edit', function () {
        let id = $(this).data('id');
        $.get('/products/' + id + '/edit', function (data) {
            $('#productModalLabel').text('Edit Produk');
            $('#product_id').val(data.id);
            $('#name').val(data.name);
            $('#stock').val(data.stock);
            $('#price').val(data.price);
            $('#productModal').modal('show');
        }).fail(function () {
            alert('Data produk gagal dimuat!');
        });
    });

    // Show Delete confirmation modal
    $(document).on('click', '.btn-delete', function () {
        let id = $(this).data('id');
        $('#delete_product_id').val(id);
        $('#deleteModal').modal('show');
    });

    // Confirm Delete Data
    $('#btn-confirm-delete').click(function () {
        let id = $('#delete_product_id').val();
        $.ajax({
            url: '/products/' + id,
            type: 'DELETE',
            success: function (response) {
                $('#deleteModal').modal('hide');
                showAlert(response.message);
                table.ajax.reload();
            },
            error: function (xhr) {
                alert('Terjadi kesalahan: ' + xhr.responseJSON.message);
            }
        });
    });

    // Function to show alert message
    function showAlert(message) {
        $('#success-alert').removeClass('d-none').text(message);
        setTimeout(function() {
            $('#success-alert').addClass('d-none');
        }, 3000);
    }
});
</script>
</body>
</html>
