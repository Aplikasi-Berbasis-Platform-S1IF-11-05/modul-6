$(document).ready(function() {
    // Initial load
    loadProducts();

    // Form submission (Create/Edit)
    $('#productForm').on('submit', function(e) {
        e.preventDefault();
        
        const productId = $('#productId').val();
        const productData = {
            name: $('#productName').val(),
            category: $('#productCategory').val(),
            price: parseFloat($('#productPrice').val()),
            stock: parseInt($('#productStock').val())
        };

        if (productId) {
            // Update
            $.ajax({
                url: `/api/products/${productId}`,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(productData),
                success: function() {
                    $('#productModal').modal('hide');
                    loadProducts();
                    showAlert('Produk berhasil diperbarui.');
                }
            });
        } else {
            // Create
            $.ajax({
                url: '/api/products',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(productData),
                success: function() {
                    $('#productModal').modal('hide');
                    loadProducts();
                    showAlert('Produk berhasil ditambahkan.');
                }
            });
        }
    });

    // Delete confirmation
    let idToDelete = null;
    $(document).on('click', '.btn-delete', function() {
        idToDelete = $(this).data('id');
        $('#deleteConfirmModal').modal('show');
    });

    $('#btnConfirmDelete').on('click', function() {
        if (idToDelete) {
            $.ajax({
                url: `/api/products/${idToDelete}`,
                type: 'DELETE',
                success: function() {
                    $('#deleteConfirmModal').modal('hide');
                    loadProducts();
                    showAlert('Produk berhasil dihapus.', 'danger');
                }
            });
        }
    });
});

function loadProducts() {
    $.get('/api/products', function(data) {
        let rows = '';
        if (data.length === 0) {
            rows = '<tr><td colspan="6" class="text-center text-muted py-4">Belum ada produk.</td></tr>';
        } else {
            data.forEach((product, index) => {
                rows += `
                <tr>
                    <td>${index + 1}</td>
                    <td><span class="fw-bold">${product.name}</span></td>
                    <td><span class="badge bg-light text-dark border">${product.category}</span></td>
                    <td>Rp ${product.price.toLocaleString('id-ID')}</td>
                    <td>${product.stock}</td>
                    <td class="text-end">
                        <button class="action-btn edit" onclick="editProduct(${product.id})" title="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                        </button>
                        <button class="action-btn delete btn-delete" data-id="${product.id}" title="Hapus">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm3.054 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                            </svg>
                        </button>
                    </td>
                </tr>
                `;
            });
        }
        $('#productTableBody').html(rows);
    });
}

function clearModal() {
    $('#productForm')[0].reset();
    $('#productId').val('');
    $('#productModalLabel').text('Tambah Produk');
    $('#btnSave').text('Simpan');
}

function editProduct(id) {
    $.get('/api/products', function(data) {
        const product = data.find(p => p.id === id);
        if (product) {
            $('#productId').val(product.id);
            $('#productName').val(product.name);
            $('#productCategory').val(product.category);
            $('#productPrice').val(product.price);
            $('#productStock').val(product.stock);
            
            $('#productModalLabel').text('Edit Produk');
            $('#btnSave').text('Simpan Perubahan');
            $('#productModal').modal('show');
        }
    });
}

function showAlert(message, type = 'success') {
    // Simple toast or alert notification
    const alertHtml = `
        <div class="alert alert-${type} alert-dismissible fade show shadow-sm" role="alert" style="position: fixed; top: 20px; right: 20px; z-index: 1060; min-width: 250px;">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    $('body').append(alertHtml);
    setTimeout(() => {
        $('.alert').alert('close');
    }, 3000);
}
