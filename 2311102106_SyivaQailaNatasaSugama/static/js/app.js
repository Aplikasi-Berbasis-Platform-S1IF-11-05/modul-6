$(document).ready(function() {
    // Initial Load
    fetchProducts();

    // Helper: Format Rupiah
    function formatRupiah(number) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0
        }).format(number);
    }

    // Load Products Function
    function fetchProducts() {
        $.ajax({
            url: '/api/products',
            method: 'GET',
            success: function(data) {
                renderTable(data);
            }
        });
    }

    function renderTable(products) {
        const tbody = $('#productTableBody');
        tbody.empty();

        if (products.length === 0) {
            tbody.append('<tr><td colspan="6" class="text-center py-5 text-muted">Belum ada produk.</td></tr>');
            return;
        }

        products.forEach((product, index) => {
            const badgeClass = getBadgeClass(product.category);
            const row = `
                <tr>
                    <td class="ps-4 fw-semibold text-muted">${index + 1}</td>
                    <td>
                        <div class="fw-bold text-dark">${product.name}</div>
                        <div class="text-muted small" style="font-size: 0.7rem;">ID: ${product.id}</div>
                    </td>
                    <td>
                        <span class="badge-category ${badgeClass}">${product.category}</span>
                    </td>
                    <td class="fw-semibold text-primary">${formatRupiah(product.price)}</td>
                    <td>
                        <span class="badge ${product.stock > 10 ? 'bg-success' : (product.stock > 0 ? 'bg-warning' : 'bg-danger')} rounded-pill">
                            ${product.stock} pcs
                        </span>
                    </td>
                    <td class="text-end pe-4">
                        <button class="action-btn btn-edit text-primary me-2" 
                                onclick="editProduct(${product.id}, '${product.name}', '${product.category}', ${product.price}, ${product.stock})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn btn-delete text-danger" 
                                onclick="prepareDelete(${product.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
            tbody.append(row);
        });
    }

    function getBadgeClass(category) {
        switch(category) {
            case 'Sembako': return 'badge-sembako';
            case 'Minuman': return 'badge-minuman';
            case 'Makanan Ringan': return 'badge-makanan';
            default: return 'badge-lainnya';
        }
    }

    // Add Product
    $('#addForm').on('submit', function(e) {
        e.preventDefault();
        const formData = {
            name: $('[name="name"]').val(),
            category: $('[name="category"]').val(),
            price: parseInt($('[name="price"]').val()),
            stock: parseInt($('[name="stock"]').val())
        };

        $.ajax({
            url: '/api/products',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function() {
                $('#addModal').modal('hide');
                $('#addForm')[0].reset();
                fetchProducts();
            }
        });
    });

    // Edit Product Submit
    $('#editForm').on('submit', function(e) {
        e.preventDefault();
        const id = $('#edit-id').val();
        const formData = {
            name: $('#edit-name').val(),
            category: $('#edit-category').val(),
            price: parseInt($('#edit-price').val()),
            stock: parseInt($('#edit-stock').val())
        };

        $.ajax({
            url: `/api/products/${id}`,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function() {
                $('#editModal').modal('hide');
                fetchProducts();
            }
        });
    });

    // Global handles for dynamically created buttons
    window.editProduct = function(id, name, category, price, stock) {
        $('#edit-id').val(id);
        $('#edit-name').val(name);
        $('#edit-category').val(category);
        $('#edit-price').val(price);
        $('#edit-stock').val(stock);
        $('#editModal').modal('show');
    };

    let productToDelete = null;
    window.prepareDelete = function(id) {
        productToDelete = id;
        $('#deleteModal').modal('show');
    };

    $('#confirmDelete').on('click', function() {
        if (productToDelete) {
            $.ajax({
                url: `/api/products/${productToDelete}`,
                method: 'DELETE',
                success: function() {
                    $('#deleteModal').modal('hide');
                    productToDelete = null;
                    fetchProducts();
                }
            });
        }
    });
});
