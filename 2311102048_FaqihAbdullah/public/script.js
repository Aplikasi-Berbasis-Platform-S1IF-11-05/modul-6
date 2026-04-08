let selectedId = null;

// LOAD DATA
function loadData() {
  $.get('/products', function(data) {
    $('#table').html('');

    data.forEach(p => {
      $('#table').append(`
        <tr>
          <td>${p.nama}</td>
          <td>${p.stok}</td>
          <td>
            <button class="btn btn-warning btn-sm" onclick="openEdit(${p.id}, '${p.nama}', ${p.stok})">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="openDelete(${p.id})">Hapus</button>
          </td>
        </tr>
      `);
    });
  });
}

// CREATE
$('#formTambah').submit(function(e) {
  e.preventDefault();

  $.ajax({
    url: '/products',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      nama: $('#nama').val(),
      stok: Number($('#stok').val())
    }),
    success: function() {
      $('#nama').val('');
      $('#stok').val('');
      loadData();
    }
  });
});

// OPEN EDIT MODAL
function openEdit(id, nama, stok) {
  $('#editId').val(id);
  $('#editNama').val(nama);
  $('#editStok').val(stok);

  new bootstrap.Modal(document.getElementById('editModal')).show();
}

// UPDATE
$('#btnUpdate').click(function() {
  const id = $('#editId').val();

  $.ajax({
    url: '/products/' + id,
    type: 'PUT',
    contentType: 'application/json',
    data: JSON.stringify({
      nama: $('#editNama').val(),
      stok: Number($('#editStok').val())
    }),
    success: function() {
      loadData();
      $('.modal').modal('hide');
    }
  });
});

// OPEN DELETE MODAL
function openDelete(id) {
  selectedId = id;
  new bootstrap.Modal(document.getElementById('deleteModal')).show();
}

// DELETE
$('#confirmDelete').click(function() {
  $.ajax({
    url: '/products/' + selectedId,
    type: 'DELETE',
    success: function() {
      loadData();
      $('.modal').modal('hide');
    }
  });
});

// INIT
$(document).ready(function() {
  loadData();
});