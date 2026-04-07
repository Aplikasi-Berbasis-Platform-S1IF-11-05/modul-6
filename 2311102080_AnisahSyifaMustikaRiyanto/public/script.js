$(document).ready(load);

function load() {
  $.get('/api/products', data => {
    let html = '';
    data.forEach(d => {
      html += `
        <tr>
          <td>${d.name}</td>
          <td>${d.price}</td>
          <td>
            <button onclick="edit(${d.id}, '${d.name}', ${d.price})">Edit</button>
            <button onclick="del(${d.id})">Hapus</button>
          </td>
        </tr>
      `;
    });
    $('#table').html(html);
  });
}

function save() {
  const id = $('#id').val();
  const data = {
    name: $('#name').val(),
    price: $('#price').val()
  };

  if (id) {
    $.ajax({
      url: '/api/products/' + id,
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: load
    });
  } else {
    $.ajax({
      url: '/api/products',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: load
    });
  }

  $('.modal').modal('hide');
}

function edit(id, name, price) {
  $('#id').val(id);
  $('#name').val(name);
  $('#price').val(price);
  $('#formModal').modal('show');
}

function del(id) {
  $.ajax({
    url: '/api/products/' + id,
    method: 'DELETE',
    success: load
  });
}