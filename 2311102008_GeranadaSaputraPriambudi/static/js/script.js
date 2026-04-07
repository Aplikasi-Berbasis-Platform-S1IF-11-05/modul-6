$(document).ready(function() {
    let currentDeleteId = null;

    // Load products on page load
    fetchProducts();

    /**
     * Fetch products from the backend and render the table
     */
    function fetchProducts() {
        $.ajax({
            url: '/api/products',
            method: 'GET',
            success: function(data) {
                renderTable(data);
            },
            error: function(err) {
                console.error("Error fetching products:", err);
            }
        });
    }

    /**
     * Render the product table rows
     * @param {Array} products 
     */
    function renderTable(products) {
        const tableBody = $('#productTableBody');
        tableBody.empty();

        if (products.length === 0) {
            tableBody.append('<tr><td colspan="6" class="text-center py-5">Belum ada produk.</td></tr>');
            return;
        }

        products.forEach((product, index) => {
            const categoryClass = getCategoryClass(product.category);
            const row = `
                <tr>
                    <td class="fw-semibold text-muted">${index + 1}</td>
                    <td><span class="fw-bold">${product.name}</span></td>
                    <td><span class="badge badge-category ${categoryClass}">${product.category}</span></td>
                    <td class="fw-semibold text-indigo">Rp ${formatNumber(product.price)}</td>
                    <td class="${product.stock < 5 ? 'text-danger fw-bold' : ''}">${product.stock} pcs</td>
                    <td class="text-end">
                        <button class="btn-action btn-edit" onclick="editProduct(${product.id})" data-bs-toggle="tooltip" title="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.121l8.145-8.145z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>
                        </button>
                        <button class="btn-action btn-delete" onclick="prepareDelete(${product.id})" data-bs-toggle="tooltip" title="Hapus">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16"><path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/></svg>
                        </button>
                    </td>
                </tr>
            `;
            tableBody.append(row);
        });

        // Initialize tooltips
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    /**
     * Handle product form submission (Add/Edit)
     */
    $('#productForm').on('submit', function(e) {
        e.preventDefault();

        const productId = $('#productId').val();
        const productData = {
            name: $('#productName').val(),
            category: $('#productCategory').val(),
            price: parseInt($('#productPrice').val()),
            stock: parseInt($('#productStock').val())
        };

        if (productId) {
            // Update existing product
            $.ajax({
                url: `/api/products/${productId}`,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(productData),
                success: function() {
                    $('#modalProduct').modal('hide');
                    resetForm();
                    fetchProducts();
                }
            });
        } else {
            // Add new product
            $.ajax({
                url: '/api/products',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(productData),
                success: function() {
                    $('#modalProduct').modal('hide');
                    resetForm();
                    fetchProducts();
                }
            });
        }
    });

    /**
     * Global function to edit a product
     * Maps to onclick in the table
     */
    window.editProduct = function(id) {
        $.ajax({
            url: '/api/products',
            method: 'GET',
            success: function(products) {
                const product = products.find(p => p.id === id);
                if (product) {
                    $('#productId').val(product.id);
                    $('#productName').val(product.name);
                    $('#productCategory').val(product.category);
                    $('#productPrice').val(product.price);
                    $('#productStock').val(product.stock);
                    
                    $('#modalProductLabel').text('Edit Produk');
                    $('#btnSubmit').text('Simpan Perubahan');
                    $('#modalProduct').modal('show');
                }
            }
        });
    };

    /**
     * Prepare delete modal
     * Maps to onclick in the table
     */
    window.prepareDelete = function(id) {
        currentDeleteId = id;
        $('#modalDelete').modal('show');
    };

    /**
     * Confirm delete action
     */
    $('#btnConfirmDelete').on('click', function() {
        if (currentDeleteId) {
            $.ajax({
                url: `/api/products/${currentDeleteId}`,
                method: 'DELETE',
                success: function() {
                    $('#modalDelete').modal('hide');
                    currentDeleteId = null;
                    fetchProducts();
                }
            });
        }
    });

    /**
     * Search functionality
     */
    $('#searchInput').on('keyup', function() {
        const value = $(this).val().toLowerCase();
        $("#productTableBody tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });

    /**
     * Reset form and labels when modal closes
     */
    $('#modalProduct').on('hidden.bs.modal', function() {
        resetForm();
    });

    function resetForm() {
        $('#productForm')[0].reset();
        $('#productId').val('');
        $('#modalProductLabel').text('Tambah Produk Baru');
        $('#btnSubmit').text('Simpan Produk');
    }

    /**
     * Helper to format numbers with separators
     */
    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }

    /**
     * Helper to get category badge class
     */
    function getCategoryClass(category) {
        switch(category) {
            case 'Sembako': return 'cat-sembako';
            case 'Minuman': return 'cat-minuman';
            case 'Makanan Ringan': return 'cat-makanan';
            case 'Kebutuhan Rumah Tangga': return 'cat-rumah';
            default: return '';
        }
    }
});
