@extends('layouts.app')

@section('title', 'Edit Produk - Toko Pak Cik & Aimar')

@section('content')
<div class="row justify-content-center">
    <div class="col-md-8">
        <div class="card">
            <div class="card-header bg-warning text-dark">
                <i class="fas fa-edit me-2"></i>Edit Produk: {{ $product['nama'] }}
            </div>
            <div class="card-body">
                {{-- Tampilkan error validasi --}}
                @if($errors->any())
                <div class="alert alert-danger" id="validation-alert">
                    <i class="fas fa-exclamation-circle me-2"></i><strong>Terjadi Kesalahan:</strong>
                    <ul class="mb-0 mt-2">
                        @foreach($errors->all() as $error)
                        <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
                @endif

                <form action="{{ route('products.update', $product['id']) }}" method="POST" id="editForm">
                    @csrf
                    @method('PUT')

                    <div class="mb-3">
                        <label for="nama" class="form-label">Nama Produk <span class="text-danger">*</span></label>
                        <input type="text" class="form-control @error('nama') is-invalid @enderror"
                            id="nama" name="nama" value="{{ old('nama', $product['nama']) }}"
                            placeholder="Masukkan nama produk" required>
                        @error('nama')
                        <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="kategori" class="form-label">Kategori <span class="text-danger">*</span></label>
                        <select class="form-select @error('kategori') is-invalid @enderror"
                            id="kategori" name="kategori" required>
                            <option value="">-- Pilih Kategori --</option>
                            @php $kat = old('kategori', $product['kategori']); @endphp
                            <option value="Makanan" {{ $kat == 'Makanan' ? 'selected' : '' }}>Makanan</option>
                            <option value="Minuman" {{ $kat == 'Minuman' ? 'selected' : '' }}>Minuman</option>
                            <option value="Sembako" {{ $kat == 'Sembako' ? 'selected' : '' }}>Sembako</option>
                            <option value="Kebersihan" {{ $kat == 'Kebersihan' ? 'selected' : '' }}>Kebersihan</option>
                            <option value="Peralatan" {{ $kat == 'Peralatan' ? 'selected' : '' }}>Peralatan</option>
                            <option value="Lainnya" {{ $kat == 'Lainnya' ? 'selected' : '' }}>Lainnya</option>
                        </select>
                        @error('kategori')
                        <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="harga" class="form-label">Harga (Rp) <span class="text-danger">*</span></label>
                            <input type="number" class="form-control @error('harga') is-invalid @enderror"
                                id="harga" name="harga" value="{{ old('harga', $product['harga']) }}"
                                placeholder="0" min="0" required>
                            @error('harga')
                            <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="col-md-6 mb-3">
                            <label for="stok" class="form-label">Stok <span class="text-danger">*</span></label>
                            <input type="number" class="form-control @error('stok') is-invalid @enderror"
                                id="stok" name="stok" value="{{ old('stok', $product['stok']) }}"
                                placeholder="0" min="0" required>
                            @error('stok')
                            <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>
                    </div>

                    {{-- Preview harga yang diformat --}}
                    <div class="mb-3" id="hargaPreview">
                        <small class="text-muted">Harga: <strong id="hargaFormatted"></strong></small>
                    </div>

                    <div class="d-flex justify-content-between">
                        <a href="{{ route('products.index') }}" class="btn btn-secondary">
                            <i class="fas fa-arrow-left me-1"></i>Kembali
                        </a>
                        <button type="submit" class="btn btn-warning">
                            <i class="fas fa-save me-1"></i>Update Produk
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script>
$(document).ready(function() {
    // jQuery: Format harga function
    function formatHarga(val) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(val);
    }

    // Tampilkan preview harga saat halaman dimuat
    var initialHarga = $('#harga').val();
    if (initialHarga && initialHarga > 0) {
        $('#hargaFormatted').text(formatHarga(initialHarga));
    }

    // jQuery: Format preview harga saat user mengetik
    $('#harga').on('input', function() {
        var val = $(this).val();
        if (val && val > 0) {
            $('#hargaFormatted').text(formatHarga(val));
            $('#hargaPreview').fadeIn();
        } else {
            $('#hargaPreview').fadeOut();
        }
    });

    // jQuery: Validasi form sebelum submit
    $('#editForm').on('submit', function(e) {
        var isValid = true;

        $(this).find('[required]').each(function() {
            if (!$(this).val()) {
                $(this).addClass('is-invalid');
                isValid = false;
            } else {
                $(this).removeClass('is-invalid');
            }
        });

        if (!isValid) {
            e.preventDefault();
        }
    });

    // jQuery: Hapus class is-invalid saat user mengetik
    $('input, select').on('input change', function() {
        $(this).removeClass('is-invalid');
    });
});
</script>
@endpush
