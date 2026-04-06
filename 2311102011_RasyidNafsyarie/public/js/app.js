let selectedId = null;

function loadData() {
  $.get('/products', function(data) {
    let rows = '';

    data.forEach(p => {
      rows += `
        <tr>
          <td><strong>${p.name}</strong></td>
          <td>Rp ${p.price}</td>
          <td><span class="badge bg-success">${p.stock}</span></td>
          <td>
            <button class="btn btn-warning btn-sm" onclick="openEditModal(${p.id}, '${p.name}', ${p.price}, ${p.stock})">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="confirmDelete(${p.id})">Delete</button>
          </td>
        </tr>
      `;
    });

    $('tbody').html(rows);
  });
}

function openAddModal() {
  $('#modalTitle').text("Tambah Produk");
  $('#productId').val('');
  $('#name').val('');
  $('#price').val('');
  $('#stock').val('');

  $('#formModal').modal('show');
}

function openEditModal(id, name, price, stock) {
  $('#modalTitle').text("Edit Produk");
  $('#productId').val(id);
  $('#name').val(name);
  $('#price').val(price);
  $('#stock').val(stock);

  $('#formModal').modal('show');
}

function saveProduct() {
  const id = $('#productId').val();
  const data = {
    name: $('#name').val(),
    price: $('#price').val(),
    stock: $('#stock').val()
  };

  if (id) {
    // UPDATE
    $.ajax({
      url: '/products/' + id,
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function() {
        $('#formModal').modal('hide');
        alert("Produk berhasil diupdate!");
        loadData();
      }
    });
  } else {
    // CREATE
    $.ajax({
      url: '/products',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function() {
        $('#formModal').modal('hide');
        alert("Produk berhasil ditambahkan!");
        loadData();
      }
    });
  }
}

function confirmDelete(id) {
  selectedId = id;
  $('#deleteModal').modal('show');
}

$('#confirmDelete').click(function() {
  $.ajax({
    url: '/products/' + selectedId,
    type: 'DELETE',
    success: function() {
      $('#deleteModal').modal('hide');
      alert("Produk berhasil dihapus!");
      loadData();
    }
  });
});



$(document).ready(loadData);