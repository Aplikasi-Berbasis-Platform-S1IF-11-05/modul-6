/**
 * ============================================================
 * Toko Kelontong Pak Cik & Aimar - Frontend Application
 * ============================================================
 * 
 * File ini mengelola semua interaksi DOM menggunakan jQuery,
 * termasuk operasi CRUD, DataTable, dan notifikasi.
 * 
 * Dependencies:
 * - jQuery 3.7.1
 * - Bootstrap 5.3.3
 * - DataTables 1.13.8
 * 
 * Author: Willy
 * ============================================================
 */

// ============================================================
// Global Variables & Configuration
// ============================================================

/** @type {string} Base URL untuk API endpoint */
const API_URL = '/api/products';

/** @type {object|null} Instance DataTable */
let dataTable = null;

/** @type {boolean} Flag untuk mode edit */
let isEditMode = false;


// ============================================================
// Document Ready - Inisialisasi Aplikasi
// ============================================================

$(document).ready(function () {
    // Inisialisasi jam real-time
    updateClock();
    setInterval(updateClock, 1000);

    // Muat data produk dan inisialisasi DataTable
    loadProducts();

    // ========================================
    // Event Handlers
    // ========================================

    /**
     * Event: Klik tombol Tambah Produk
     * Menampilkan modal form dalam mode CREATE
     */
    $('#btnAddProduct').on('click', function () {
        isEditMode = false;
        resetForm();
        $('#productModalLabel').html('<i class="bi bi-plus-circle me-2"></i>Tambah Produk Baru');
        $('#btnSaveProduct').html('<i class="bi bi-check-lg me-1"></i>Simpan Produk');
        $('#productModal').modal('show');
    });

    /**
     * Event: Klik tombol Simpan di modal form
     * Menjalankan CREATE atau UPDATE berdasarkan mode
     */
    $('#btnSaveProduct').on('click', function () {
        if (validateForm()) {
            if (isEditMode) {
                updateProduct();
            } else {
                createProduct();
            }
        }
    });

    /**
     * Event: Klik tombol Konfirmasi Hapus
     * Menjalankan operasi DELETE
     */
    $('#btnConfirmDelete').on('click', function () {
        const productId = $('#deleteProductId').val();
        deleteProduct(productId);
    });

    /**
     * Event: Submit form (mencegah reload halaman)
     */
    $('#productForm').on('submit', function (e) {
        e.preventDefault();
        $('#btnSaveProduct').trigger('click');
    });

    /**
     * Event Delegation: Klik tombol Edit pada tabel
     * Mengambil data produk dan menampilkan form edit
     */
    $(document).on('click', '.btn-edit', function () {
        const productId = $(this).data('id');
        editProduct(productId);
    });

    /**
     * Event Delegation: Klik tombol Hapus pada tabel
     * Menampilkan modal konfirmasi delete
     */
    $(document).on('click', '.btn-delete', function () {
        const productId = $(this).data('id');
        const productName = $(this).data('name');
        $('#deleteProductId').val(productId);
        $('#deleteProductName').text(productName);
        $('#deleteModal').modal('show');
    });

    /**
     * Event: Modal ditutup - reset form
     */
    $('#productModal').on('hidden.bs.modal', function () {
        resetForm();
    });
});


// ============================================================
// CRUD Functions
// ============================================================

/**
 * READ - Memuat semua produk dari API dan render ke DataTable
 */
function loadProducts() {
    $.ajax({
        url: API_URL,
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            if (response.success) {
                renderTable(response.data);
                updateStats(response.data);
            }
        },
        error: function (xhr) {
            showToast('Gagal memuat data produk', 'error');
            console.error('Load Products Error:', xhr);
        }
    });
}

/**
 * CREATE - Menambahkan produk baru via API
 */
function createProduct() {
    const productData = getFormData();

    // Tampilkan loading state
    const $btn = $('#btnSaveProduct');
    const originalText = $btn.html();
    $btn.html('<span class="loading-spinner me-2"></span>Menyimpan...').prop('disabled', true);

    $.ajax({
        url: API_URL,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(productData),
        success: function (response) {
            if (response.success) {
                $('#productModal').modal('hide');
                loadProducts();
                showToast('Produk "' + response.data.nama + '" berhasil ditambahkan!', 'success');
            } else {
                showToast(response.message, 'error');
            }
        },
        error: function (xhr) {
            const msg = xhr.responseJSON ? xhr.responseJSON.message : 'Gagal menambahkan produk';
            showToast(msg, 'error');
        },
        complete: function () {
            $btn.html(originalText).prop('disabled', false);
        }
    });
}

/**
 * READ (Single) + EDIT - Mengambil data produk untuk di-edit
 * @param {number} productId - ID produk yang akan di-edit
 */
function editProduct(productId) {
    $.ajax({
        url: API_URL + '/' + productId,
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            if (response.success) {
                isEditMode = true;
                const product = response.data;

                // Isi form dengan data produk
                $('#productId').val(product.id);
                $('#productName').val(product.nama);
                $('#productCategory').val(product.kategori);
                $('#productPrice').val(product.harga);
                $('#productStock').val(product.stok);
                $('#productDescription').val(product.deskripsi);

                // Update tampilan modal untuk mode edit
                $('#productModalLabel').html('<i class="bi bi-pencil-square me-2"></i>Edit Produk');
                $('#btnSaveProduct').html('<i class="bi bi-check-lg me-1"></i>Update Produk');

                $('#productModal').modal('show');
            }
        },
        error: function () {
            showToast('Gagal memuat data produk', 'error');
        }
    });
}

/**
 * UPDATE - Mengupdate data produk via API
 */
function updateProduct() {
    const productId = $('#productId').val();
    const productData = getFormData();

    // Tampilkan loading state
    const $btn = $('#btnSaveProduct');
    const originalText = $btn.html();
    $btn.html('<span class="loading-spinner me-2"></span>Mengupdate...').prop('disabled', true);

    $.ajax({
        url: API_URL + '/' + productId,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(productData),
        success: function (response) {
            if (response.success) {
                $('#productModal').modal('hide');
                loadProducts();
                showToast('Produk "' + response.data.nama + '" berhasil diupdate!', 'success');
            } else {
                showToast(response.message, 'error');
            }
        },
        error: function (xhr) {
            const msg = xhr.responseJSON ? xhr.responseJSON.message : 'Gagal mengupdate produk';
            showToast(msg, 'error');
        },
        complete: function () {
            $btn.html(originalText).prop('disabled', false);
        }
    });
}

/**
 * DELETE - Menghapus produk via API
 * @param {number} productId - ID produk yang akan dihapus
 */
function deleteProduct(productId) {
    const $btn = $('#btnConfirmDelete');
    const originalText = $btn.html();
    $btn.html('<span class="loading-spinner me-2"></span>Menghapus...').prop('disabled', true);

    $.ajax({
        url: API_URL + '/' + productId,
        method: 'DELETE',
        success: function (response) {
            if (response.success) {
                $('#deleteModal').modal('hide');
                loadProducts();
                showToast('Produk "' + response.data.nama + '" berhasil dihapus!', 'success');
            }
        },
        error: function () {
            showToast('Gagal menghapus produk', 'error');
        },
        complete: function () {
            $btn.html(originalText).prop('disabled', false);
        }
    });
}


// ============================================================
// Table Rendering
// ============================================================

/**
 * Render data produk ke DataTable
 * Menggunakan jQuery untuk DOM manipulation
 * @param {Array} products - Array data produk
 */
function renderTable(products) {
    // Hapus DataTable instance yang sudah ada
    if (dataTable) {
        dataTable.destroy();
    }

    // Kosongkan tbody
    const $tbody = $('#productsTableBody');
    $tbody.empty();

    if (products.length === 0) {
        // Tampilkan empty state
        $tbody.html(`
            <tr>
                <td colspan="7">
                    <div class="empty-state">
                        <i class="bi bi-inbox"></i>
                        <h6>Belum ada produk</h6>
                        <p>Klik tombol "Tambah Produk" untuk menambahkan produk pertama</p>
                    </div>
                </td>
            </tr>
        `);
    }

    // Render setiap baris produk menggunakan jQuery
    $.each(products, function (index, product) {
        const $row = $('<tr>');

        // Kolom nomor
        $row.append(
            $('<td>').addClass('text-center').html(
                '<span class="row-number">' + (index + 1) + '</span>'
            )
        );

        // Kolom nama produk
        $row.append(
            $('<td>').html(
                '<span class="fw-semibold">' + escapeHtml(product.nama) + '</span>'
            )
        );

        // Kolom kategori dengan badge berwarna
        const categoryClass = product.kategori.toLowerCase().replace(/\s+/g, '-');
        $row.append(
            $('<td>').html(
                '<span class="category-badge ' + categoryClass + '">' +
                '<i class="bi bi-tag-fill"></i>' + escapeHtml(product.kategori) +
                '</span>'
            )
        );

        // Kolom harga
        $row.append(
            $('<td>').addClass('text-end').html(
                '<span class="price-text">Rp ' + formatNumber(product.harga) + '</span>'
            )
        );

        // Kolom stok dengan badge status
        const stockClass = product.stok > 50 ? 'stock-high' : (product.stok > 10 ? 'stock-medium' : 'stock-low');
        $row.append(
            $('<td>').addClass('text-center').html(
                '<span class="stock-badge ' + stockClass + '">' + product.stok + '</span>'
            )
        );

        // Kolom deskripsi
        $row.append(
            $('<td>').html(
                '<span class="desc-text" title="' + escapeHtml(product.deskripsi || '-') + '">' +
                escapeHtml(product.deskripsi || '-') + '</span>'
            )
        );

        // Kolom aksi (Edit & Delete)
        const $actions = $('<td>').addClass('text-center');
        const $actionGroup = $('<div>').addClass('d-flex gap-2 justify-content-center');

        // Tombol Edit
        const $editBtn = $('<button>')
            .addClass('btn btn-action btn-edit')
            .attr({
                'data-id': product.id,
                'title': 'Edit Produk'
            })
            .html('<i class="bi bi-pencil-fill"></i>');

        // Tombol Delete
        const $deleteBtn = $('<button>')
            .addClass('btn btn-action btn-delete')
            .attr({
                'data-id': product.id,
                'data-name': product.nama,
                'title': 'Hapus Produk'
            })
            .html('<i class="bi bi-trash-fill"></i>');

        $actionGroup.append($editBtn, $deleteBtn);
        $actions.append($actionGroup);
        $row.append($actions);

        $tbody.append($row);
    });

    // Inisialisasi DataTable dengan konfigurasi
    dataTable = $('#productsTable').DataTable({
        paging: true,
        pageLength: 10,
        lengthMenu: [[5, 10, 25, 50], [5, 10, 25, 50]],
        searching: true,
        ordering: true,
        info: true,
        responsive: true,
        language: {
            search: "Cari:",
            lengthMenu: "Tampilkan _MENU_ data",
            info: "Menampilkan _START_ - _END_ dari _TOTAL_ produk",
            infoEmpty: "Tidak ada data",
            infoFiltered: "(disaring dari _MAX_ total data)",
            zeroRecords: "Tidak ada produk yang cocok",
            paginate: {
                first: "Awal",
                last: "Akhir",
                next: '<i class="bi bi-chevron-right"></i>',
                previous: '<i class="bi bi-chevron-left"></i>'
            }
        },
        columnDefs: [
            { orderable: false, targets: [0, 6] },
            { searchable: false, targets: [0, 6] }
        ],
        drawCallback: function () {
            // Animasi baris yang baru di-render
            $('#productsTable tbody tr').each(function (i) {
                $(this).css({
                    'opacity': 0,
                    'transform': 'translateY(10px)'
                }).delay(i * 30).animate({
                    'opacity': 1
                }, 200).css('transform', 'translateY(0)');
            });
        }
    });
}


// ============================================================
// Statistics Update
// ============================================================

/**
 * Memperbarui statistik di dashboard
 * @param {Array} products - Array data produk
 */
function updateStats(products) {
    // Total produk
    animateNumber($('#totalProducts'), products.length);

    // Total kategori unik
    const categories = [...new Set(products.map(p => p.kategori))];
    animateNumber($('#totalCategories'), categories.length);

    // Total stok
    const totalStock = products.reduce((sum, p) => sum + p.stok, 0);
    animateNumber($('#totalStock'), totalStock);

    // Total nilai inventori (harga x stok)
    const totalValue = products.reduce((sum, p) => sum + (p.harga * p.stok), 0);
    $('#totalValue').text('Rp ' + formatNumber(totalValue));
}

/**
 * Animasi counter number
 * @param {jQuery} $element - Elemen jQuery target
 * @param {number} target - Angka tujuan
 */
function animateNumber($element, target) {
    const current = parseInt($element.text().replace(/\D/g, '')) || 0;
    $({ val: current }).animate({ val: target }, {
        duration: 500,
        easing: 'swing',
        step: function () {
            $element.text(Math.floor(this.val));
        },
        complete: function () {
            $element.text(target);
        }
    });
}


// ============================================================
// Form Utilities
// ============================================================

/**
 * Mengambil data dari form
 * @returns {Object} Data produk dari input form
 */
function getFormData() {
    return {
        nama: $.trim($('#productName').val()),
        kategori: $('#productCategory').val(),
        harga: parseFloat($('#productPrice').val()) || 0,
        stok: parseInt($('#productStock').val()) || 0,
        deskripsi: $.trim($('#productDescription').val())
    };
}

/**
 * Validasi form input
 * @returns {boolean} True jika form valid
 */
function validateForm() {
    const nama = $.trim($('#productName').val());
    const kategori = $('#productCategory').val();
    const harga = $('#productPrice').val();
    const stok = $('#productStock').val();

    // Reset validasi 
    $('.form-control, .form-select').removeClass('is-invalid');

    let isValid = true;

    if (!nama) {
        $('#productName').addClass('is-invalid');
        isValid = false;
    }

    if (!kategori) {
        $('#productCategory').addClass('is-invalid');
        isValid = false;
    }

    if (!harga || parseFloat(harga) < 0) {
        $('#productPrice').addClass('is-invalid');
        isValid = false;
    }

    if (stok === '' || parseInt(stok) < 0) {
        $('#productStock').addClass('is-invalid');
        isValid = false;
    }

    if (!isValid) {
        showToast('Mohon lengkapi semua field yang wajib diisi', 'warning');
    }

    return isValid;
}

/**
 * Reset form ke kondisi awal
 */
function resetForm() {
    $('#productForm')[0].reset();
    $('#productId').val('');
    $('.form-control, .form-select').removeClass('is-invalid');
    isEditMode = false;
}


// ============================================================
// Helper Functions
// ============================================================

/**
 * Format angka dengan pemisah ribuan
 * @param {number} num - Angka yang akan diformat
 * @returns {string} Angka yang sudah diformat
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/**
 * Escape HTML untuk mencegah XSS
 * @param {string} text - Teks yang akan di-escape
 * @returns {string} Teks yang sudah di-escape
 */
function escapeHtml(text) {
    if (!text) return '';
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function (m) { return map[m]; });
}

/**
 * Menampilkan toast notification
 * @param {string} message - Pesan yang akan ditampilkan
 * @param {string} type - Tipe notifikasi: 'success', 'error', 'warning', 'info'
 */
function showToast(message, type = 'info') {
    const $toast = $('#notifToast');
    const $icon = $('#toastIcon');
    const $message = $('#toastMessage');

    // Hapus class sebelumnya
    $toast.removeClass('toast-success toast-error toast-warning toast-info');
    $toast.addClass('toast-' + type);

    // Set icon berdasarkan tipe
    const icons = {
        success: 'bi-check-circle-fill',
        error: 'bi-x-circle-fill',
        warning: 'bi-exclamation-triangle-fill',
        info: 'bi-info-circle-fill'
    };

    $icon.removeClass().addClass('bi ' + (icons[type] || icons.info));
    $message.text(message);

    // Tampilkan toast menggunakan Bootstrap Toast API
    const toast = new bootstrap.Toast($toast[0], {
        autohide: true,
        delay: 3500
    });
    toast.show();
}

/**
 * Update jam real-time di navbar
 */
function updateClock() {
    const now = new Date();
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    $('#currentTime').text(now.toLocaleTimeString('id-ID', options));
}
