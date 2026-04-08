$(document).ready(function() {
    loadTabel();

    $('#btnTambah').click(function() {
        $('#modalTitle').text('Tambah Barang Baru');
        $('#idProduk').val('');
        $('#produkForm')[0].reset();
    });

    $('#produkForm').submit(function(e) {
        e.preventDefault();
        const id = $('#idProduk').val();
        const payload = {
            nama: $('#nama').val(),
            harga: $('#harga').val(),
            stok: $('#stok').val()
        };

        const method = id ? 'PUT' : 'POST';
        const url = id ? `/api/produk/${id}` : '/api/produk';

        $.ajax({
            url: url,
            type: method,
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function() {
                $('#formModal').modal('hide');
                loadTabel();
            }
        });
    });
});

function loadTabel() {
    $.get('/api/produk', function(data) {
        let baris = '';
        if (data.length === 0) {
            baris = '<tr><td colspan="4" class="text-center py-4">Data masih kosong.</td></tr>';
        } else {
            data.forEach(p => {
                baris += `
                    <tr>
                        <td class="ps-4 fw-medium">${p.nama}</td>
                        <td>Rp ${parseInt(p.harga).toLocaleString('id-ID')}</td>
                        <td><span class="badge bg-light text-primary border">${p.stok}</span></td>
                        <td class="text-center">
                            <button class="btn btn-warning btn-sm" onclick="editData(${p.id}, '${p.nama}', ${p.harga}, ${p.stok})"><i class='bx bx-edit-alt'></i></button>
                            <button class="btn btn-danger btn-sm" onclick="modalHapus(${p.id})"><i class='bx bx-trash'></i></button>
                        </td>
                    </tr>`;
            });
        }
        $('#tabelProduk').html(baris);
    });
}

function editData(id, nama, harga, stok) {
    $('#modalTitle').text('Edit Data Barang');
    $('#idProduk').val(id);
    $('#nama').val(nama);
    $('#harga').val(harga);
    $('#stok').val(stok);
    $('#formModal').modal('show');
}

let idTarget = null;
function modalHapus(id) {
    idTarget = id;
    $('#deleteModal').modal('show');
}

$('#btnKonfirmasiHapus').click(function() {
    $.ajax({
        url: `/api/produk/${idTarget}`,
        type: 'DELETE',
        success: function() {
            $('#deleteModal').modal('hide');
            loadTabel();
        }
    });
});