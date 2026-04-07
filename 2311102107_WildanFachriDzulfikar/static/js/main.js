$(document).ready(function() {
    // Initial fetch of products
    fetchProducts();

    // Manual trigger for Add Product modal (fallback)
    $('#addBtn').on('click', function() {
        $('#modalAddProduct').modal('show');
    });

    // Variable to store ID for deletion
    let deleteId = null;

    // --- CRUD: READ ---
    function fetchProducts() {
        $.ajax({
            url: '/api/products',
            method: 'GET',
            success: function(products) {
                renderTable(products);
            },
            error: function(err) {
                console.error('Error fetching products:', err);
                alert('Gagal mengambil data produk.');
            }
        });
    }

    function renderTable(products) {
        const $tbody = $('#productTableBody');
        $tbody.empty();

        if (products.length === 0) {
            $tbody.append('<tr><td colspan="6" class="text-center py-4 text-muted small">Belum ada produk. Klik "Tambah Produk" untuk memulai.</td></tr>');
            return;
        }

        products.forEach(product => {
            const priceFormatted = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(product.price);
            const stockBadge = product.stock <= 5 ? 'bg-danger' : 
                               product.stock <= 20 ? 'bg-warning text-dark' : 'bg-success';

            const row = `
                <tr data-id="${product.id}">
                    <td class="ps-4 text-muted small">#${product.id}</td>
                    <td class="fw-medium">${product.name}</td>
                    <td><span class="badge bg-secondary bg-opacity-10 text-main border border-secondary border-opacity-25 small">${product.category}</span></td>
                    <td><span class="badge ${stockBadge} badge-stock">${product.stock}</span></td>
                    <td class="fw-semibold">${priceFormatted}</td>
                    <td class="text-center pe-4">
                        <div class="d-flex justify-content-center gap-2">
                            <button class="btn btn-icon btn-outline-primary edit-btn" data-id="${product.id}" title="Edit">
                                <i class="bi bi-pencil-square"></i>
                            </button>
                            <button class="btn btn-icon btn-outline-danger delete-btn" data-id="${product.id}" data-name="${product.name}" title="Hapus">
                                <i class="bi bi-trash3"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
            $tbody.append(row);
        });
    }

    // --- CRUD: CREATE ---
    $('#formAddProduct').on('submit', function(e) {
        e.preventDefault();
        const productData = {
            name: $('#addName').val(),
            category: $('#addCategory').val(),
            stock: $('#addStock').val(),
            price: $('#addPrice').val()
        };

        $.ajax({
            url: '/api/products',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(productData),
            success: function(response) {
                if (response.success) {
                    $('#modalAddProduct').modal('hide');
                    $('#formAddProduct')[0].reset();
                    fetchProducts();
                }
            },
            error: function(err) {
                console.error('Error adding product:', err);
                alert('Gagal menambah produk.');
            }
        });
    });

    // --- CRUD: UPDATE (Preparation) ---
    $(document).on('click', '.edit-btn', function() {
        const id = $(this).data('id');
        // Fetch current product data to populate modal
        $.ajax({
            url: '/api/products',
            method: 'GET',
            success: function(products) {
                const product = products.find(p => p.id === id);
                if (product) {
                    $('#editId').val(product.id);
                    $('#editName').val(product.name);
                    $('#editCategory').val(product.category);
                    $('#editStock').val(product.stock);
                    $('#editPrice').val(product.price);
                    $('#modalEditProduct').modal('show');
                }
            }
        });
    });

    // --- CRUD: UPDATE (Execution) ---
    $('#formEditProduct').on('submit', function(e) {
        e.preventDefault();
        const id = $('#editId').val();
        const productData = {
            name: $('#editName').val(),
            category: $('#editCategory').val(),
            stock: $('#editStock').val(),
            price: $('#editPrice').val()
        };

        $.ajax({
            url: `/api/products/${id}`,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(productData),
            success: function(response) {
                if (response.success) {
                    $('#modalEditProduct').modal('hide');
                    fetchProducts();
                }
            },
            error: function(err) {
                console.error('Error updating product:', err);
                alert('Gagal memperbarui produk.');
            }
        });
    });

    // --- CRUD: DELETE (Preparation) ---
    $(document).on('click', '.delete-btn', function() {
        deleteId = $(this).data('id');
        const name = $(this).data('name');
        $('#deleteProductName').text(name);
        $('#modalDeleteConfirm').modal('show');
    });

    // --- CRUD: DELETE (Execution) ---
    $('#confirmDeleteBtn').on('click', function() {
        if (deleteId) {
            $.ajax({
                url: `/api/products/${deleteId}`,
                method: 'DELETE',
                success: function(response) {
                    if (response.success) {
                        $('#modalDeleteConfirm').modal('hide');
                        fetchProducts();
                    }
                },
                error: function(err) {
                    console.error('Error deleting product:', err);
                    alert('Gagal menghapus produk.');
                }
            });
        }
    });
});
