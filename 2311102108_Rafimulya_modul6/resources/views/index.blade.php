<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistem Inventori Toko Kelontong</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background-color: #f8f9fa;
        }
        .container-main {
            margin-top: 20px;
        }
        .card {
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .table-hover tbody tr:hover {
            background-color: #f5f5f5;
        }
        .btn-action {
            margin: 2px;
        }
    </style>
</head>
<body>
    <div class="container container-main">
        <div class="row">
            <div class="col-md-12">
                <h2 class="mb-4">📦 Sistem Inventori Toko Kelontong Pak Cik & Aimar</h2>
            </div>
        </div>

        <!-- Form Tambah Produk -->
        <div class="row mb-4">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header bg-primary text-white">
                        <h5 class="mb-0">Tambah Produk Baru</h5>
                    </div>
                    <div class="card-body">
                        <form id="formTambah">
                            <div class="mb-3">
                                <label class="form-label">Nama Produk</label>
                                <input type="text" class="form-control" id="inputNama" placeholder="Masukkan nama produk" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Harga</label>
                                <input type="number" class="form-control" id="inputHarga" placeholder="Masukkan harga" min="0" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Stok</label>
                                <input type="number" class="form-control" id="inputStok" placeholder="Masukkan jumlah stok" min="0" required>
                            </div>
                            <button type="submit" class="btn btn-primary w-100">Tambah Produk</button>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Statistik -->
            <div class="col-md-6">
                <div class="card bg-info text-white mb-3">
                    <div class="card-body">
                        <h5 class="card-title">Total Produk</h5>
                        <h2 id="totalProduk">0</h2>
                    </div>
                </div>
                <div class="card bg-success text-white">
                    <div class="card-body">
                        <h5 class="card-title">Total Nilai Stok</h5>
                        <h2 id="totalNilai">Rp 0</h2>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tabel Daftar Produk -->
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header bg-success text-white">
                        <h5 class="mb-0">Daftar Produk</h5>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover" id="tabelProduk">
                                <thead class="table-light">
                                    <tr>
                                        <th>No</th>
                                        <th>Nama Produk</th>
                                        <th>Harga</th>
                                        <th>Stok</th>
                                        <th>Nilai Stok</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody id="tbody">
                                </tbody>
                            </table>
                        </div>
                        <div id="kosong" class="alert alert-warning" role="alert">
                            Belum ada produk. Tambahkan produk terlebih dahulu.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Edit -->
    <div class="modal fade" id="modalEdit" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-warning">
                    <h5 class="modal-title">Edit Produk</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form id="formEdit">
                        <input type="hidden" id="editIndex">
                        <div class="mb-3">
                            <label class="form-label">Nama Produk</label>
                            <input type="text" class="form-control" id="editNama" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Harga</label>
                            <input type="number" class="form-control" id="editHarga" min="0" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Stok</label>
                            <input type="number" class="form-control" id="editStok" min="0" required>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                    <button type="button" class="btn btn-primary" id="btnSimpanEdit">Simpan Perubahan</button>
                </div>
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    
    <script>
        const apiUrl = '/api.php';
        let produk = [];

        // Load data dari JSON file
        function loadData() {
            $.ajax({
                url: apiUrl,
                method: 'GET',
                dataType: 'json',
                success: function(data) {
                    produk = Array.isArray(data) ? data : [];
                    render();
                },
                error: function() {
                    console.log('Error loading data');
                    produk = [];
                    render();
                }
            });
        }

        // Simpan data ke JSON file (via API)
        function saveData() {
            $.ajax({
                url: apiUrl,
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ data: produk }),
                success: function(response) {
                    console.log('Data tersimpan ke JSON:', response);
                    showNotification('Produk berhasil disimpan!', 'success');
                },
                error: function() {
                    console.error('Gagal menyimpan data');
                    showNotification('Gagal menyimpan data', 'danger');
                }
            });
        }

        // Tampilkan notifikasi
        function showNotification(message, type = 'info') {
            const alertClass = `alert-${type}`;
            const notification = `
                <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
                    ${message}
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            `;
            
            // Inject ke awal container
            $('.container-main').prepend(notification);
            
            // Auto-hide setelah 3 detik
            setTimeout(() => {
                $('.container-main > .alert').fadeOut(function() { $(this).remove(); });
            }, 3000);
        }

        // Render tabel
        function render() {
            const tbody = $('#tbody');
            tbody.empty();

            if (produk.length === 0) {
                $('#kosong').show();
                $('#totalProduk').text('0');
                $('#totalNilai').text('Rp 0');
                return;
            }

            $('#kosong').hide();

            let no = 1;
            let totalNilai = 0;

            produk.forEach((item, index) => {
                const nilaiStok = item.harga * item.stok;
                totalNilai += nilaiStok;

                const row = `
                    <tr>
                        <td>${no++}</td>
                        <td><strong>${item.nama}</strong></td>
                        <td>Rp ${parseInt(item.harga).toLocaleString('id-ID')}</td>
                        <td><span class="badge bg-info">${item.stok}</span></td>
                        <td>Rp ${parseInt(nilaiStok).toLocaleString('id-ID')}</td>
                        <td>
                            <button class="btn btn-sm btn-warning btn-action" onclick="editProduk(${index})" title="Edit">
                                ✏️ Edit
                            </button>
                            <button class="btn btn-sm btn-danger btn-action" onclick="hapusProduk(${index})" title="Hapus">
                                🗑️ Hapus
                            </button>
                        </td>
                    </tr>
                `;
                tbody.append(row);
            });

            $('#totalProduk').text(produk.length);
            $('#totalNilai').text('Rp ' + parseInt(totalNilai).toLocaleString('id-ID'));
        }

        // Tambah produk
        $('#formTambah').submit(function(e) {
            e.preventDefault();

            const nama = $('#inputNama').val().trim();
            const harga = parseInt($('#inputHarga').val());
            const stok = parseInt($('#inputStok').val());

            // Validasi
            if (!nama || harga <= 0 || stok < 0) {
                showNotification('Masukkan data yang valid!', 'warning');
                return;
            }

            produk.push({ nama, harga, stok });
            saveData();

            this.reset();
            render();
        });

        // Edit produk
        function editProduk(index) {
            const item = produk[index];
            $('#editIndex').val(index);
            $('#editNama').val(item.nama);
            $('#editHarga').val(item.harga);
            $('#editStok').val(item.stok);
            new bootstrap.Modal(document.getElementById('modalEdit')).show();
        }

        // Simpan edit
        $('#btnSimpanEdit').click(function() {
            const index = parseInt($('#editIndex').val());
            const nama = $('#editNama').val().trim();
            const harga = parseInt($('#editHarga').val());
            const stok = parseInt($('#editStok').val());

            if (!nama || harga <= 0 || stok < 0) {
                showNotification('Masukkan data yang valid!', 'warning');
                return;
            }

            produk[index] = { nama, harga, stok };
            saveData();
            bootstrap.Modal.getInstance(document.getElementById('modalEdit')).hide();
            render();
        });

        // Hapus produk
        function hapusProduk(index) {
            if (confirm('Yakin ingin menghapus produk ini?')) {
                const nama = produk[index].nama;
                produk.splice(index, 1);
                saveData();
                render();
            }
        }

        // Load data saat halaman terbuka
        $(document).ready(function() {
            loadData();
        });
    </script>
</body>
</html>