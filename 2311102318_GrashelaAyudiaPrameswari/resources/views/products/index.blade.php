@extends('layouts.app')

@section('title', 'Daftar Produk - Toko Pak Cik & Aimar')

@section('content')
<div class="row">
    <div class="col-12">
        {{-- Flash Messages --}}
        @if(session('success'))
        <div class="alert alert-success alert-dismissible fade show" role="alert" id="flash-alert">
            <i class="fas fa-check-circle me-2"></i>{{ session('success') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
        @endif

        @if(session('error'))
        <div class="alert alert-danger alert-dismissible fade show" role="alert" id="flash-alert">
            <i class="fas fa-exclamation-circle me-2"></i>{{ session('error') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
        @endif

        <div class="card">
            <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <span><i class="fas fa-boxes-stacked me-2"></i>Daftar Produk Inventari</span>
                <a href="{{ route('products.create') }}" class="btn btn-light btn-sm">
                    <i class="fas fa-plus me-1"></i>Tambah Produk
                </a>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table id="productsTable" class="table table-striped table-hover" style="width:100%">
                        <thead class="table-dark">
                            <tr>
                                <th>No</th>
                                <th>Nama Produk</th>
                                <th>Kategori</th>
                                <th>Harga</th>
                                <th>Stok</th>
                                <th>Terakhir Diubah</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse($products as $index => $product)
                            <tr>
                                <td>{{ $index + 1 }}</td>
                                <td>{{ $product['nama'] }}</td>
                                <td>
                                    <span class="badge bg-info text-dark">{{ $product['kategori'] }}</span>
                                </td>
                                <td>Rp {{ number_format($product['harga'], 0, ',', '.') }}</td>
                                <td>
                                    @if($product['stok'] <= 10)
                                        <span class="badge bg-danger">{{ $product['stok'] }}</span>
                                    @elseif($product['stok'] <= 30)
                                        <span class="badge bg-warning text-dark">{{ $product['stok'] }}</span>
                                    @else
                                        <span class="badge bg-success">{{ $product['stok'] }}</span>
                                    @endif
                                </td>
                                <td>{{ $product['updated_at'] }}</td>
                                <td>
                                    <a href="{{ route('products.edit', $product['id']) }}" class="btn btn-warning btn-action me-1">
                                        <i class="fas fa-edit"></i>
                                    </a>
                                    <button type="button" class="btn btn-danger btn-action btn-delete"
                                        data-id="{{ $product['id'] }}"
                                        data-nama="{{ $product['nama'] }}">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                            @empty
                            <tr>
                                <td colspan="7" class="text-center text-muted">Belum ada produk.</td>
                            </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

{{-- Delete Confirmation Modal --}}
<div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header bg-danger text-white">
                <h5 class="modal-title" id="deleteModalLabel">
                    <i class="fas fa-exclamation-triangle me-2"></i>Konfirmasi Hapus
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <p>Apakah Anda yakin ingin menghapus produk <strong id="deleteProductName"></strong>?</p>
                <p class="text-muted mb-0">Tindakan ini tidak dapat dibatalkan.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    <i class="fas fa-times me-1"></i>Batal
                </button>
                <form id="deleteForm" method="POST" style="display:inline;">
                    @csrf
                    @method('DELETE')
                    <button type="submit" class="btn btn-danger">
                        <i class="fas fa-trash me-1"></i>Hapus
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script>
$(document).ready(function() {
    // Inisialisasi DataTable dengan jQuery
    $('#productsTable').DataTable({
        language: {
            search: "Cari:",
            lengthMenu: "Tampilkan _MENU_ data",
            info: "Menampilkan _START_ sampai _END_ dari _TOTAL_ produk",
            infoEmpty: "Tidak ada data",
            infoFiltered: "(disaring dari _MAX_ total data)",
            zeroRecords: "Tidak ada produk yang cocok",
            paginate: {
                first: "Pertama",
                last: "Terakhir",
                next: "Berikutnya",
                previous: "Sebelumnya"
            }
        },
        order: [[0, 'asc']],
        columnDefs: [
            { orderable: false, targets: 6 }
        ]
    });

    // Auto-dismiss flash alert setelah 3 detik menggunakan jQuery
    setTimeout(function() {
        $('#flash-alert').fadeOut('slow');
    }, 3000);

    // jQuery event handler untuk tombol delete - menampilkan modal konfirmasi
    $('.btn-delete').on('click', function() {
        var productId = $(this).data('id');
        var productName = $(this).data('nama');

        // Manipulasi DOM dengan jQuery
        $('#deleteProductName').text(productName);
        $('#deleteForm').attr('action', '/products/' + productId);

        // Tampilkan modal menggunakan Bootstrap via jQuery
        var deleteModal = new bootstrap.Modal($('#deleteModal')[0]);
        deleteModal.show();
    });
});
</script>
@endpush
