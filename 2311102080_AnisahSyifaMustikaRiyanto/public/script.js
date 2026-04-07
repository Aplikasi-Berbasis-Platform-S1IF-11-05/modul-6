let deleteId = null;

$(document).ready(function () {
  load();
});

function load() {
  $.get('/api/products', data => {
    let html = '';

    if (data.length === 0) {
      html = `
        <tr>
          <td colspan="3" class="text-muted">Belum ada produk</td>
        </tr>
      `;
    } else {
      data.forEach(d => {
        html += `
          <tr>
            <td class="fw-semibold">${d.name}</td>
            <td>Rp ${d.price}</td>
            <td>
              <button class="btn btn-warning btn-sm" onclick="edit(${d.id}, '${d.name}', ${d.price})">Edit</button>
              <button class="btn btn-danger btn-sm" onclick="showDelete(${d.id})">Hapus</button>
            </td>
          </tr>
        `;
      });
    }

    $('#table').html(html);
  });
}

function save() {
  const id = $('#id').val();
  const data = {
    name: $('#name').val(),
    price: $('#price').val()
  };

  if (!data.name || !data.price) {
    alert("Isi semua field!");
    return;
  }

  const method = id ? 'PUT' : 'POST';
  const url = id ? '/api/products/' + id : '/api/products';

  $.ajax({
    url: url,
    method: method,
    contentType: 'application/json',
    data: JSON.stringify(data),
    success: () => {
      load();
      $('.modal').modal('hide');
    }
  });
}

function edit(id, name, price) {
  $('#id').val(id);
  $('#name').val(name);
  $('#price').val(price);
  $('#formModal').modal('show');
}

function showDelete(id) {
  deleteId = id;
  $('#deleteModal').modal('show');
}

$('#confirmDelete').click(function () {
  $.ajax({
    url: '/api/products/' + deleteId,
    method: 'DELETE',
    success: () => {
      load();
      $('#deleteModal').modal('hide');
    }
  });
});