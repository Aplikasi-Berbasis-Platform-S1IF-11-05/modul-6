/**
 * Inisialisasi seluruh perilaku antarmuka halaman inventaris.
 *
 * Bagian ini menangani koneksi ke API produk, pemuatan data ke tabel,
 * pembaruan statistik ringkas, notifikasi pengguna, dan interaksi modal.
 */
$(document).ready(function() {
    const API_URL = '/api/products';

    let deleteTargetId = null;

    let isEditMode = false;

    const currencyFormatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    });

    const table = $('#productTable').DataTable({
        responsive: true,
        dom: '<"d-flex justify-content-between align-items-center p-4 border-bottom"<"search-wrapper"f><"small"l>>rt<"d-flex justify-content-between align-items-center p-4 border-top"ip>',
        language: {
            search: "",
            searchPlaceholder: "Cari nama barang...",
            lengthMenu: "Tampilkan _MENU_",
            info: "Data _START_–_END_ dari _TOTAL_",
            paginate: {
                next: '<i class="bi bi-chevron-right"></i>',
                previous: '<i class="bi bi-chevron-left"></i>'
            }
        },
        columns: [{
                data: 'id',
                width: '5%',
                className: 'text-muted small'
            },
            {
                data: 'name',
                width: '35%',
                className: 'fw-semibold'
            },
            {
                data: 'category',
                width: '15%',
                render: d => `<span class="badge-custom">${d}</span>`
            },
            {
                data: 'price',
                width: '15%',
                render: d => currencyFormatter.format(d)
            },
            {
                data: 'stock',
                width: '15%',
                render: d => {
                    const color = d < 10 ? 'text-danger fw-bold' : 'text-success';
                    return `<span class="${color}">${d} pcs</span>`;
                }
            },
            {
                data: null,
                width: '15%',
                className: 'text-end',
                orderable: false,
                render: (d, t, row) => `
                <div class="d-flex justify-content-end gap-1">
                    <button class="btn btn-action btn-edit" data-id="${row.id}" title="Ubah">
                    <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-action btn-delete text-danger" data-id="${row.id}" title="Hapus">
                    <i class="bi bi-trash"></i>
                    </button>
                </div>
                `
            }
        ]
    });

    /**
     * Memperbarui ringkasan dashboard berdasarkan data produk yang sedang ditampilkan.
     *
     * @param {Array<{stock:number, price:number}>} data - Daftar produk hasil pengambilan dari server.
     * @returns {void}
     */
    const updateDashboardStats = (data) => {
        $('#statTotalItems').text(data.length);

        const lowStock = data.filter(item => item.stock < 10).length;
        $('#statLowStock').text(lowStock);

        const totalValue = data.reduce((acc, curr) => acc + (curr.price * curr.stock), 0);
        $('#statTotalValue').text(currencyFormatter.format(totalValue));
    };

    /**
     * Menampilkan notifikasi toast dengan gaya sukses atau galat.
     *
     * @param {string} message - Pesan yang akan ditampilkan kepada pengguna.
     * @param {boolean} [isError=false] - Menentukan apakah toast ditampilkan sebagai galat.
     * @returns {void}
     */
    const showToast = (message, isError = false) => {
        const toastEl = $('#liveToast');
        toastEl.removeClass('bg-success bg-danger text-white');
        toastEl.addClass(isError ? 'bg-danger text-white' : 'bg-success text-white');
        $('#toastMessage').text(message);
        const toast = new bootstrap.Toast(toastEl[0]);
        toast.show();
    };

    /**
     * Memuat data produk terbaru dari server ke tabel dan ringkasan dashboard.
     *
     * Jika proses gagal, indikator status sistem akan diperbarui ke kondisi tidak aktif.
     *
     * @returns {void}
     */
    const loadData = () => {
        $.get(API_URL)
            .done(res => {
                table.clear().rows.add(res.data).draw();
                updateDashboardStats(res.data);

                $('#systemStatusDot').addClass('online');
                $('#systemStatusText').text('System Online');
            })
            .fail(() => {
                showToast('Gagal terhubung ke server.', true);
                $('#systemStatusDot').removeClass('online');
                $('#systemStatusText').text('Server Connection Failed');
            });
    };

    /**
     * Membuka modal tambah data dan mereset seluruh field form ke kondisi awal.
     *
     * @returns {void}
     */
    $('#btnTambahData').click(() => {
        isEditMode = false;
        $('#productForm')[0].reset();
        $('#productId').val('');
        $('#formModalLabel').text('Produk Baru');
        $('#formModal').modal('show');
    });

    /**
     * Mengisi form dengan data baris yang dipilih untuk proses pembaruan.
     *
     * @returns {void}
     */
    $('#productTable').on('click', '.btn-edit', function() {
        const data = table.row($(this).closest('tr')).data();
        isEditMode = true;
        $('#formModalLabel').text('Ubah Produk');
        $('#productId').val(data.id);
        $('#name').val(data.name);
        $('#category').val(data.category);
        $('#price').val(data.price);
        $('#stock').val(data.stock);
        $('#formModal').modal('show');
    });

    /**
     * Mengirim data form ke server untuk proses tambah atau ubah produk.
     *
     * @param {Event} e - Objek event submit dari form.
     * @returns {void}
     */
    $('#productForm').submit(function(e) {
        e.preventDefault();
        const payload = {
            name: $('#name').val(),
            category: $('#category').val(),
            price: parseInt($('#price').val()),
            stock: parseInt($('#stock').val())
        };

        const btn = $('#btnSave');
        const originalText = btn.text();
        btn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm me-2"></span>Menyimpan...');

        const method = isEditMode ? 'PUT' : 'POST';
        const url = isEditMode ? `${API_URL}/${$('#productId').val()}` : API_URL;

        $.ajax({
                url,
                type: method,
                contentType: 'application/json',
                data: JSON.stringify(payload)
            })
            .done(res => {
                $('#formModal').modal('hide');
                showToast(res.message);
                loadData();
            })
            .fail(xhr => {
                const msg = xhr.responseJSON ? xhr.responseJSON.message : 'Terjadi kesalahan.';
                showToast(msg, true);
            })
            .always(() => {
                btn.prop('disabled', false).text(originalText);
            });
    });

    /**
     * Menyimpan ID produk yang akan dihapus dan menampilkan dialog konfirmasi.
     *
     * @returns {void}
     */
    $('#productTable').on('click', '.btn-delete', function() {
        deleteTargetId = $(this).data('id');
        $('#deleteModal').modal('show');
    });

    /**
     * Menjalankan proses penghapusan data produk untuk ID yang telah dipilih.
     *
     * @returns {void}
     */
    $('#btnConfirmDelete').click(function() {
        const btn = $(this);
        btn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm me-2"></span>Hapus...');

        $.ajax({
                url: `${API_URL}/${deleteTargetId}`,
                type: 'DELETE'
            })
            .done(res => {
                $('#deleteModal').modal('hide');
                showToast(res.message);
                loadData();
            })
            .fail(() => showToast('Gagal menghapus data.', true))
            .always(() => {
                btn.prop('disabled', false).text('Hapus');
            });
    });

    /**
     * Memuat data awal saat antarmuka selesai diinisialisasi.
     *
     * @returns {void}
     */
    loadData();
});