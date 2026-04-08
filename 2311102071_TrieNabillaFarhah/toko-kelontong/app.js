let deleteId = null;

// LOAD DATA
function load() {
    $.get('/products', function (res) {

        let html = '';

        // total data
        $('#totalData').text(res.length + ' Produk');

        // empty state
        if (res.length === 0) {
            $('#emptyState').removeClass('d-none');
        } else {
            $('#emptyState').addClass('d-none');
        }

        res.forEach(p => {
            html += `
        <tr>
          <td class="fw-semibold">${p.nama}</td>
          <td>
            <span class="badge bg-success">
              Rp ${parseInt(p.harga).toLocaleString('id-ID')}
            </span>
          </td>
          <td>
            <span class="badge bg-warning text-dark">
              ${p.stok}
            </span>
          </td>
          <td>
            <button class="btn btn-warning btn-sm me-1 edit" data-id="${p.id}">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-danger btn-sm del" data-id="${p.id}">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      `;
        });

        $('#data').html(html);
    });
}

$(document).ready(function () {

    load();

    // SEARCH
    $('#search').on('keyup', function () {
        const value = $(this).val().toLowerCase();
        $('#data tr').filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });

    // ADD
    $('#add').click(() => {
        $('#id').val('');
        $('#nama,#harga,#stok').val('');
        new bootstrap.Modal('#modal').show();
    });

    // SAVE
    $('#save').click(() => {
        const id = $('#id').val();

        const data = {
            nama: $('#nama').val(),
            harga: $('#harga').val(),
            stok: $('#stok').val()
        };

        if (id) {
            $.ajax({
                url: '/products/' + id,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: load
            });
        } else {
            $.ajax({
                url: '/products',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: load
            });
        }

        bootstrap.Modal.getInstance(document.getElementById('modal')).hide();
    });

    // EDIT
    $(document).on('click', '.edit', function () {
        const id = $(this).data('id');

        $.get('/products', function (res) {
            const p = res.find(x => x.id == id);

            $('#id').val(p.id);
            $('#nama').val(p.nama);
            $('#harga').val(p.harga);
            $('#stok').val(p.stok);

            new bootstrap.Modal('#modal').show();
        });
    });

    // DELETE
    $(document).on('click', '.del', function () {
        deleteId = $(this).data('id');
        new bootstrap.Modal('#delModal').show();
    });

    $('#yesDelete').click(() => {
        $.ajax({
            url: '/products/' + deleteId,
            method: 'DELETE',
            success: load
        });

        bootstrap.Modal.getInstance(document.getElementById('delModal')).hide();
    });

});