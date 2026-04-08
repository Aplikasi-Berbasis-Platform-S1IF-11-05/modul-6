$(document).ready(function () {
    $('.btn-edit').on('click', function () {
        const id = $(this).data('id');
        const nama = $(this).data('nama');
        const kategori = $(this).data('kategori');
        const harga = $(this).data('harga');
        const stok = $(this).data('stok');

        $('#editId').val(id);
        $('#editNama').val(nama);
        $('#editKategori').val(kategori);
        $('#editHarga').val(harga);
        $('#editStok').val(stok);
        $('#editForm').attr('action', '/products/edit/' + id);

        const editModal = new bootstrap.Modal(document.getElementById('editModal'));
        editModal.show();
    });

    $('.btn-delete').on('click', function () {
        const id = $(this).data('id');
        const nama = $(this).data('nama');

        $('#deleteProductName').text(nama);
        $('#deleteForm').attr('action', '/products/delete/' + id);

        const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
        deleteModal.show();
    });

    $('#searchInput').on('keyup', function () {
        const value = $(this).val().toLowerCase();

        $('#productsTable tbody tr').filter(function () {
            const nama = $(this).find('.product-name').text().toLowerCase();
            const kategori = $(this).find('.product-category').text().toLowerCase();
            $(this).toggle(nama.includes(value) || kategori.includes(value));
        });
    });
});