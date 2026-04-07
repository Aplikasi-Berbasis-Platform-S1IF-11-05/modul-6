/**
 * Toko Pak Cik & Aimar — Inventari App
 * jQuery-powered CRUD client dengan DataTables
 * Author: Ahmad Tegar Kahfi Asyngarinanto
 */

$(function () {
  'use strict';

  /* ============================================================
     STATE
     ============================================================ */
  let dataTable = null;
  let currentSection = 'dashboard';
  let deleteTargetId = null;

  /* ============================================================
     HELPERS: Format
     ============================================================ */
  const rupiah = (n) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);

  const shortRupiah = (n) => {
    if (n >= 1e9) return 'Rp ' + (n / 1e9).toFixed(1) + 'M';
    if (n >= 1e6) return 'Rp ' + (n / 1e6).toFixed(1) + 'jt';
    if (n >= 1e3) return 'Rp ' + (n / 1e3).toFixed(0) + 'rb';
    return 'Rp ' + n;
  };

  const stokBadge = (stok) => {
    if (stok > 20) return `<span class="stok-badge stok-ok">${stok}</span>`;
    if (stok > 10) return `<span class="stok-badge stok-low">⚠ ${stok}</span>`;
    return `<span class="stok-badge stok-critical">🔴 ${stok}</span>`;
  };

  const clearErrors = () => {
    ['Nama', 'Kategori', 'Stok', 'Harga', 'Satuan'].forEach(f => {
      $(`#err${f}`).text('');
      $(`#input${f}`).removeClass('is-invalid');
    });
  };

  const setError = (field, msg) => {
    $(`#err${field}`).text(msg);
    $(`#input${field}`).addClass('is-invalid');
  };

  /* ============================================================
     TOAST NOTIFIKASI
     ============================================================ */
  function showToast(msg, type = 'success') {
    const $toast = $('#toastNotif');
    $toast.removeClass('toast-success toast-error').addClass(`toast-${type}`);
    const icon = type === 'success' ? 'bi-check-circle-fill' : 'bi-x-circle-fill';
    $('#toastBody').html(`<i class="bi ${icon} me-2 toast-icon"></i><span>${msg}</span>`);
    const bsToast = bootstrap.Toast.getOrCreateInstance($toast[0], { delay: 3500 });
    bsToast.show();
  }

  /* ============================================================
     LOADING OVERLAY
     ============================================================ */
  function showLoading() { $('#loadingOverlay').removeClass('d-none'); }
  function hideLoading() { $('#loadingOverlay').addClass('d-none'); }

  /* ============================================================
     TOPBAR DATE
     ============================================================ */
  function updateDate() {
    const now = new Date();
    const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    $('#topbarDate').text(now.toLocaleDateString('id-ID', opts));
  }
  updateDate();

  /* ============================================================
     NAVIGATION
     ============================================================ */
  function showSection(name) {
    currentSection = name;
    $('.content-section').addClass('d-none');
    $(`#section${name.charAt(0).toUpperCase() + name.slice(1)}`).removeClass('d-none');

    $('.nav-link-side').removeClass('active');
    $(`#nav${name.charAt(0).toUpperCase() + name.slice(1)}`).addClass('active');

    const titles = { dashboard: 'Dashboard', produk: 'Manajemen Produk' };
    const subs = {
      dashboard: 'Ringkasan inventaris toko',
      produk: 'Kelola produk — tambah, edit, hapus'
    };
    $('#pageTitle').text(titles[name] || name);
    $('#pageBreadcrumb').text(subs[name] || '');

    if (name === 'dashboard') loadDashboard();
    if (name === 'produk') loadProduk();
  }

  $('#navDashboard').on('click', function (e) { e.preventDefault(); showSection('dashboard'); });
  $('#navProduk').on('click', function (e) { e.preventDefault(); showSection('produk'); });

  /* ============================================================
     SIDEBAR TOGGLE
     ============================================================ */
  $('#sidebarToggle').on('click', function () {
    const $sidebar = $('#sidebar');
    if ($(window).width() <= 768) {
      $sidebar.toggleClass('mobile-open');
    } else {
      $sidebar.toggleClass('collapsed');
      $('#mainContent').toggleClass('expanded');
    }
  });

  /* ============================================================
     LOAD DASHBOARD
     ============================================================ */
  function loadDashboard() {
    // Stats
    $.get('/api/stats')
      .done(function (res) {
        if (!res.success) return;
        const d = res.data;
        $('#statProduk').text(d.totalProduk);
        $('#statStok').text(d.totalStok.toLocaleString('id-ID'));
        $('#statNilai').text(shortRupiah(d.totalNilai));
        $('#statRendah').text(d.stokRendah);
      });

    // Produk terbaru (5)
    $.get('/api/products')
      .done(function (res) {
        if (!res.success) return;
        const products = res.data.slice(-5).reverse();
        const $body = $('#bodyRecent').empty();

        if (!products.length) {
          $body.html('<tr><td colspan="4" class="text-center text-muted py-3">Belum ada produk</td></tr>');
          return;
        }

        products.forEach(p => {
          $body.append(`
            <tr>
              <td><strong>${escHtml(p.nama)}</strong></td>
              <td><span class="badge-kategori">${escHtml(p.kategori)}</span></td>
              <td>${stokBadge(p.stok)} <small class="text-muted">${escHtml(p.satuan)}</small></td>
              <td>${rupiah(p.harga)}</td>
            </tr>
          `);
        });

        // Category distribution
        const categories = {};
        res.data.forEach(p => {
          categories[p.kategori] = (categories[p.kategori] || 0) + 1;
        });
        const $catList = $('#categoryList').empty();
        if (!Object.keys(categories).length) {
          $catList.html('<p class="text-muted text-center small">Belum ada data</p>');
          return;
        }
        Object.entries(categories).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
          $catList.append(`
            <div class="cat-item">
              <span class="cat-name">${escHtml(cat)}</span>
              <span class="cat-count">${count} produk</span>
            </div>
          `);
        });
      });
  }

  /* ============================================================
     LOAD PRODUK — DataTable
     ============================================================ */
  function loadProduk() {
    showLoading();

    // Populate kategori filter
    $.get('/api/categories').done(function (res) {
      if (!res.success) return;
      const $sel = $('#filterKategori').empty().append('<option value="all">Semua Kategori</option>');
      res.data.forEach(c => $sel.append(`<option value="${escHtml(c)}">${escHtml(c)}</option>`));
    });

    $.get('/api/products')
      .done(function (res) {
        hideLoading();
        if (!res.success) {
          showToast('Gagal memuat data produk', 'error');
          return;
        }

        // Destroy old DataTable instance if exists
        if (dataTable) { dataTable.destroy(); dataTable = null; }

        const $body = $('#bodyProduk').empty();

        res.data.forEach((p, i) => {
          const nilaiTotal = p.stok * p.harga;
          $body.append(`
            <tr data-id="${escHtml(p.id)}">
              <td class="text-muted" style="font-size:0.8rem;">${i + 1}</td>
              <td><strong>${escHtml(p.nama)}</strong></td>
              <td><span class="badge-kategori">${escHtml(p.kategori)}</span></td>
              <td>${stokBadge(p.stok)} <small class="text-muted">${escHtml(p.satuan)}</small></td>
              <td>${rupiah(p.harga)}</td>
              <td style="color:var(--accent-green); font-weight:600;">${rupiah(nilaiTotal)}</td>
              <td style="color:var(--text-muted); font-size:0.8rem; max-width:160px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                ${p.keterangan ? escHtml(p.keterangan) : '—'}
              </td>
              <td class="text-center">
                <div class="d-flex gap-1 justify-content-center">
                  <button class="btn-edit-row" data-id="${escHtml(p.id)}">
                    <i class="bi bi-pencil me-1"></i>Edit
                  </button>
                  <button class="btn-delete-row" data-id="${escHtml(p.id)}" data-nama="${escHtml(p.nama)}">
                    <i class="bi bi-trash3 me-1"></i>Hapus
                  </button>
                </div>
              </td>
            </tr>
          `);
        });

        // Init DataTable
        dataTable = $('#tableProduk').DataTable({
          language: {
            search: 'Cari:',
            lengthMenu: 'Tampilkan _MENU_ data',
            info: 'Menampilkan _START_–_END_ dari _TOTAL_ produk',
            infoEmpty: 'Tidak ada data',
            infoFiltered: '(filter dari _MAX_ total)',
            zeroRecords: 'Produk tidak ditemukan',
            paginate: { previous: '‹', next: '›' }
          },
          order: [[0, 'asc']],
          pageLength: 10,
          responsive: true,
          columnDefs: [{ orderable: false, targets: 7 }]
        });
      })
      .fail(function () {
        hideLoading();
        showToast('Koneksi ke server gagal', 'error');
      });
  }

  /* ============================================================
     FILTER KATEGORI
     ============================================================ */
  $('#filterKategori').on('change', function () {
    const val = $(this).val();
    if (dataTable) {
      if (val === 'all') {
        dataTable.column(2).search('').draw();
      } else {
        dataTable.column(2).search(val, false, false).draw();
      }
    }
  });

  /* ============================================================
     MODAL FORM — OPEN CREATE
     ============================================================ */
  $('#btnAddProduk').on('click', function () {
    openModalForm(null);
  });

  function openModalForm(product) {
    clearErrors();
    $('#editId').val('');
    $('#inputNama').val('');
    $('#inputKategori').val('');
    $('#inputStok').val('');
    $('#inputHarga').val('');
    $('#inputSatuan').val('');
    $('#inputKeterangan').val('');
    $('#previewTotalVal').text('Rp 0');

    if (product) {
      $('#modalProdukTitle').html('<i class="bi bi-pencil-square me-2"></i>Edit Produk');
      $('#editId').val(product.id);
      $('#inputNama').val(product.nama);
      $('#inputKategori').val(product.kategori);
      $('#inputStok').val(product.stok);
      $('#inputHarga').val(product.harga);
      $('#inputSatuan').val(product.satuan);
      $('#inputKeterangan').val(product.keterangan || '');
      updatePreviewTotal();
    } else {
      $('#modalProdukTitle').html('<i class="bi bi-plus-circle me-2"></i>Tambah Produk Baru');
    }

    // Populate datalist kategori
    $.get('/api/categories').done(function (res) {
      if (!res.success) return;
      const $dl = $('#listKategori').empty();
      res.data.forEach(c => $dl.append(`<option value="${escHtml(c)}">`));
    });

    new bootstrap.Modal($('#modalProduk')[0]).show();
  }

  /* ============================================================
     OPEN EDIT — Delegasi ke tabel
     ============================================================ */
  $(document).on('click', '.btn-edit-row', function () {
    const id = $(this).data('id');
    showLoading();
    $.get(`/api/products/${id}`)
      .done(function (res) {
        hideLoading();
        if (res.success) openModalForm(res.data);
        else showToast('Produk tidak ditemukan', 'error');
      })
      .fail(function () {
        hideLoading();
        showToast('Gagal memuat data produk', 'error');
      });
  });

  /* ============================================================
     PREVIEW TOTAL di form
     ============================================================ */
  function updatePreviewTotal() {
    const stok = parseFloat($('#inputStok').val()) || 0;
    const harga = parseFloat($('#inputHarga').val()) || 0;
    $('#previewTotalVal').text(rupiah(stok * harga));
  }

  $('#inputStok, #inputHarga').on('input', updatePreviewTotal);

  /* ============================================================
     VALIDASI FORM
     ============================================================ */
  function validateForm() {
    clearErrors();
    let valid = true;

    const nama = $('#inputNama').val().trim();
    const kategori = $('#inputKategori').val().trim();
    const stok = $('#inputStok').val();
    const harga = $('#inputHarga').val();
    const satuan = $('#inputSatuan').val().trim();

    if (!nama) { setError('Nama', 'Nama produk wajib diisi'); valid = false; }
    else if (nama.length < 2) { setError('Nama', 'Nama minimal 2 karakter'); valid = false; }

    if (!kategori) { setError('Kategori', 'Kategori wajib diisi'); valid = false; }

    if (stok === '' || stok === null) { setError('Stok', 'Stok wajib diisi'); valid = false; }
    else if (parseInt(stok) < 0) { setError('Stok', 'Stok tidak boleh negatif'); valid = false; }

    if (harga === '' || harga === null) { setError('Harga', 'Harga wajib diisi'); valid = false; }
    else if (parseFloat(harga) < 0) { setError('Harga', 'Harga tidak boleh negatif'); valid = false; }

    if (!satuan) { setError('Satuan', 'Satuan wajib diisi'); valid = false; }

    return valid;
  }

  /* ============================================================
     SIMPAN PRODUK (Create / Update)
     ============================================================ */
  $('#btnSaveProduk').on('click', function () {
    if (!validateForm()) return;

    const id = $('#editId').val();
    const payload = {
      nama: $('#inputNama').val().trim(),
      kategori: $('#inputKategori').val().trim(),
      stok: $('#inputStok').val(),
      harga: $('#inputHarga').val(),
      satuan: $('#inputSatuan').val().trim(),
      keterangan: $('#inputKeterangan').val().trim()
    };

    const isEdit = !!id;
    const url = isEdit ? `/api/products/${id}` : '/api/products';
    const method = isEdit ? 'PUT' : 'POST';

    showLoading();

    $.ajax({
      url,
      method,
      contentType: 'application/json',
      data: JSON.stringify(payload)
    })
      .done(function (res) {
        hideLoading();
        if (res.success) {
          bootstrap.Modal.getInstance($('#modalProduk')[0]).hide();
          showToast(res.message, 'success');
          loadProduk();
          if (currentSection === 'dashboard') loadDashboard();
        } else {
          showToast(res.message || 'Terjadi kesalahan', 'error');
        }
      })
      .fail(function (xhr) {
        hideLoading();
        const msg = xhr.responseJSON?.message || 'Gagal menyimpan produk';
        showToast(msg, 'error');
      });
  });

  /* ============================================================
     OPEN DELETE MODAL
     ============================================================ */
  $(document).on('click', '.btn-delete-row', function () {
    const id = $(this).data('id');
    const nama = $(this).data('nama');
    deleteTargetId = id;
    $('#deleteNama').text(`"${nama}"`);
    $('#deleteId').val(id);
    new bootstrap.Modal($('#modalDelete')[0]).show();
  });

  /* ============================================================
     KONFIRMASI DELETE
     ============================================================ */
  $('#btnConfirmDelete').on('click', function () {
    if (!deleteTargetId) return;

    showLoading();

    $.ajax({
      url: `/api/products/${deleteTargetId}`,
      method: 'DELETE'
    })
      .done(function (res) {
        hideLoading();
        bootstrap.Modal.getInstance($('#modalDelete')[0]).hide();
        deleteTargetId = null;
        if (res.success) {
          showToast(res.message, 'success');
          loadProduk();
          loadDashboard();
        } else {
          showToast(res.message || 'Gagal menghapus', 'error');
        }
      })
      .fail(function () {
        hideLoading();
        showToast('Gagal menghapus produk', 'error');
      });
  });

  /* ============================================================
     ESCAPE HTML — XSS Prevention
     ============================================================ */
  function escHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* ============================================================
     INIT — Load dashboard on start
     ============================================================ */
  showSection('dashboard');

  console.log('%c🏪 Toko Pak Cik & Aimar — Inventari', 'font-size:16px; font-weight:bold; color:#4f8ef7;');
  console.log('%cjQuery CRUD + DataTables + ExpressJS', 'font-size:12px; color:#8892a8;');
});
