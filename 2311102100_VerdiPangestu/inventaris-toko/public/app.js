$(document).ready(function() {
    const API_URL = '/api/products';
    let editMode = false;

    function loadData() {
        $.get(API_URL, function(data) {
            let rows = '';
            data.forEach(p => {
                rows += `<tr>
                    <td>${p.nama}</td><td>${p.kategori}</td><td>${p.stok}</td><td>${p.harga}</td>
                    <td>
                        <button class="btn btn-sm btn-warning btn-edit" data-id="${p.id}" data-nama="${p.nama}" data-kategori="${p.kategori}" data-stok="${p.stok}" data-harga="${p.harga}">Edit</button>
                        <button class="btn btn-sm btn-danger btn-delete" data-id="${p.id}">Hapus</button>
                    </td>
                </tr>`;
            });
            $('#tableBody').html(rows);
        });
    }

    loadData();

    $('#btnTambahData').click(() => {
        editMode = false;
        $('#productForm')[0].reset();
        $('#productId').val('');
        $('#formModal').modal('show');
    });

    $('#tableBody').on('click', '.btn-edit', function() {
        editMode = true;
        $('#productId').val($(this).data('id'));
        $('#nama').val($(this).data('nama'));
        $('#kategori').val($(this).data('kategori'));
        $('#stok').val($(this).data('stok'));
        $('#harga').val($(this).data('harga'));
        $('#formModal').modal('show');
    });

    $('#btnSimpan').click(() => {
        const payload = {
            nama: $('#nama').val(), kategori: $('#kategori').val(),
            stok: $('#stok').val(), harga: $('#harga').val()
        };
        const method = editMode ? 'PUT' : 'POST';
        const url = editMode ? `${API_URL}/${$('#productId').val()}` : API_URL;

        $.ajax({
            url: url, type: method, contentType: 'application/json',
            data: JSON.stringify(payload),
            success: () => { $('#formModal').modal('hide'); loadData(); }
        });
    });

    $('#tableBody').on('click', '.btn-delete', function() {
        $('#deleteId').val($(this).data('id'));
        $('#deleteModal').modal('show');
    });

    $('#btnKonfirmasiHapus').click(() => {
        $.ajax({
            url: `${API_URL}/${$('#deleteId').val()}`, type: 'DELETE',
            success: () => { $('#deleteModal').modal('hide'); loadData(); }
        });
    });
});