$(document).ready(function () {
    const modalForm = new bootstrap.Modal(document.getElementById('modalForm'));
    const modalHapus = new bootstrap.Modal(document.getElementById('modalHapus'));

    // Fungsi Render Data ke Tabel
    // Ganti bagian muatData() di app.js kamu menjadi seperti ini:
    function muatData() {
        $.ajax({
            url: '/api/products',
            method: 'GET',
            success: function (data) {
                let html = '';
                if (data.length === 0) {
                    html = `<tr><td colspan="6" class="text-center py-4 text-muted"><i class="bi bi-inbox fs-1 d-block mb-2"></i>Belum ada data produk.</td></tr>`;
                } else {
                    $.each(data, function (index, item) {
                        // Warna stok merah jika barang habis/sedikit
                        let stokClass = item.stok < 10 ? 'text-danger fw-bold' : 'text-success fw-bold';

                        html += `
                        <tr>
                            <td class="text-center text-muted fw-bold">${index + 1}</td>
                            <td class="fw-bold text-dark">${item.nama}</td>
                            <td><span class="badge-kategori">${item.kategori}</span></td>
                            <td class="fw-semibold">Rp ${item.harga.toLocaleString('id-ID')}</td>
                            <td class="text-center ${stokClass}">${item.stok}</td>
                            <td class="text-center">
                                <button class="btn btn-sm btn-warning action-btn btn-edit text-dark fw-semibold me-1" 
                                    data-id="${item.id}" 
                                    data-nama="${item.nama}" 
                                    data-kategori="${item.kategori}" 
                                    data-harga="${item.harga}" 
                                    data-stok="${item.stok}">
                                    <i class="bi bi-pencil-fill"></i>
                                </button>
                                <button class="btn btn-sm btn-outline-danger action-btn btn-hapus" data-id="${item.id}">
                                    <i class="bi bi-trash-fill"></i>
                                </button>
                            </td>
                        </tr>
                    `;
                    });
                }
                $('#tabelProduk').html(html);
            }
        });
    }

    // Panggil saat halaman pertama kali diload
    muatData();

    // Tampilkan Modal Tambah
    $('#btnTambah').click(function () {
        $('#modalTitle').text('Tambah Produk Baru');
        $('#formProduk')[0].reset();
        $('#idProduk').val('');
        modalForm.show();
    });

    // Event Delegation untuk Tombol Edit
    $('#tabelProduk').on('click', '.btn-edit', function () {
        $('#modalTitle').text('Edit Produk');
        $('#idProduk').val($(this).data('id'));
        $('#nama').val($(this).data('nama'));
        $('#kategori').val($(this).data('kategori'));
        $('#harga').val($(this).data('harga'));
        $('#stok').val($(this).data('stok'));
        modalForm.show();
    });

    // Proses Simpan (Tambah / Edit)
    $('#btnSimpan').click(function () {
        const id = $('#idProduk').val();
        const payload = {
            nama: $('#nama').val(),
            kategori: $('#kategori').val(),
            harga: $('#harga').val(),
            stok: $('#stok').val()
        };

        const method = id ? 'PUT' : 'POST';
        const url = id ? `/api/products/${id}` : '/api/products';

        $.ajax({
            url: url,
            method: method,
            data: payload,
            success: function () {
                modalForm.hide();
                muatData();
            }
        });
    });

    // Event Delegation untuk Tombol Hapus (Munculkan Konfirmasi)
    $('#tabelProduk').on('click', '.btn-hapus', function () {
        const id = $(this).data('id');
        $('#idHapus').val(id);
        modalHapus.show();
    });

    // Proses Hapus setelah Konfirmasi
    $('#btnKonfirmasiHapus').click(function () {
        const id = $('#idHapus').val();
        $.ajax({
            url: `/api/products/${id}`,
            method: 'DELETE',
            success: function () {
                modalHapus.hide();
                muatData();
            }
        });
    });
});