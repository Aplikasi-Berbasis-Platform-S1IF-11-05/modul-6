$(document).ready(function () {

    let table = $('#table').DataTable();
    let deleteId = null;

    function loadData() {
        $.get('/api/products', function(data){

            table.clear();

            data.forEach(item => {
                table.row.add([
                    item.nama,
                    item.harga,
                    item.stok,
                    `
                    <a href="edit.html?id=${item.id}" class="btn btn-warning btn-sm">Edit</a>
                    <button class="btn btn-danger btn-sm btn-delete" data-id="${item.id}">Hapus</button>
                    `
                ]);
            });

            table.draw();
        });
    }

    loadData();

    // DELETE BUTTON
    $(document).on('click', '.btn-delete', function(){
        deleteId = $(this).data('id');
        $('#deleteModal').modal('show');
    });

    // CONFIRM DELETE
    $('#confirmDelete').click(function(){
        $.ajax({
            url: '/api/products/' + deleteId,
            type: 'DELETE',
            success: function(){
                alert('Berhasil hapus');
                loadData(); // reload data TANPA refresh
            }
        });
    });

});