$(document).ready(function () {
    const API_URL = '/api/products';
    let deleteTargetId = null;
    function renderTable(products) {
        const tbody = $('#productTableBody');
        tbody.empty();
        if (products.length === 0) {
            $('#emptyState').show();
            return;
        }
        $('#emptyState').hide();
        products.forEach(function (p) {
            const row = `
            <tr data-id="${p.id}">
                <td class="td-id">#${p.id}</td>
                <td class="td-name">${p.name}</td>
                <td><span class="badge-stock">${p.stock}</span></td>
                <td class="td-price">Rp ${Number(p.price).toLocaleString('id-ID')}</td>
                <td>
                    <div class="td-actions">
                        <button class="btn-edit edit-btn"
                                data-id="${p.id}"
                                data-name="${p.name}"
                                data-stock="${p.stock}"
                                data-price="${p.price}">Edit</button>
                        <button class="btn-del delete-btn"
                                data-id="${p.id}">Hapus</button>
                    </div>
                </td>
            </tr>`;
            tbody.append(row);
        });
    }

    function fetchProducts() {
        $.get(API_URL, function (data) {
            renderTable(data);
        });
    }

    fetchProducts();
    $('#addBtn').click(function () {
        $('#modalTitle').text('Tambah Produk');
        $('#productId, #name, #stock, #price').val('');
        $('#productForm').removeData('editId');
    });

    // Edit Produk: isi form dengan data baris
    $(document).on('click', '.edit-btn', function () {
        $('#modalTitle').text('Edit Produk');
        const id = $(this).data('id');
        $('#productId').val(id);
        $('#name').val($(this).data('name'));
        $('#stock').val($(this).data('stock'));
        $('#price').val($(this).data('price'));
        $('#productForm').data('editId', id);
        $('#productModal').modal('show');
    });

    // Submit form: Tambah atau Edit
    $('#productForm').on('submit', function (e) {
        e.preventDefault();
        const editId = $('#productForm').data('editId');
        const payload = {
            name:  $('#name').val().trim(),
            stock: $('#stock').val(),
            price: $('#price').val()
        };
        if (editId) {
            // PUT - Update
            $.ajax({
                url:         `${API_URL}/${editId}`,
                method:      'PUT',
                contentType: 'application/json',
                data:        JSON.stringify(payload),
                success: function () {
                    $('#productModal').modal('hide');
                    fetchProducts();
                },
                error: function (xhr) {
                    alert('Gagal memperbarui produk: ' + xhr.responseJSON?.error);
                }
            });
        } else {
            // POST - Create
            $.ajax({
                url:         API_URL,
                method:      'POST',
                contentType: 'application/json',
                data:        JSON.stringify(payload),
                success: function () {
                    $('#productModal').modal('hide');
                    fetchProducts();
                },
                error: function (xhr) {
                    alert('Gagal menambah produk: ' + xhr.responseJSON?.error);
                }
            });
        }
    });

    // Hapus Produk: tampilkan modal konfirmasi 
    $(document).on('click', '.delete-btn', function () {
        deleteTargetId = $(this).data('id');
        $('#deleteModal').modal('show');
    });

    // Konfirmasi hapus 
    $('#confirmDelete').click(function () {
        if (!deleteTargetId) return;
        $.ajax({
            url:    `${API_URL}/${deleteTargetId}`,
            method: 'DELETE',
            success: function () {
                $('#deleteModal').modal('hide');
                deleteTargetId = null;
                fetchProducts();
            },
            error: function (xhr) {
                alert('Gagal menghapus produk: ' + xhr.responseJSON?.error);
            }
        });
    });
});