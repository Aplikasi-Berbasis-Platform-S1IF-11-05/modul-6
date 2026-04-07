let deleteIndex = null;

function showAlert(message) {
  $("#alertBox")
    .removeClass("d-none")
    .text(message);

  setTimeout(() => {
    $("#alertBox").addClass("d-none");
  }, 2000);
}

function loadProducts() {
  $.get("/products", function (data) {

    if ($.fn.DataTable.isDataTable('#productTable')) {
      $('#productTable').DataTable().destroy();
    }

    let table = $("#productTable tbody");
    table.html("");

    data.forEach((p, i) => {
      table.append(`
        <tr>
          <td>${p.nama}</td>
          <td>${p.harga}</td>
          <td>${p.stok}</td>
          <td>
            <button class="btn btn-warning btn-sm editBtn" data-id="${i}">Edit</button>
            <button class="btn btn-danger btn-sm deleteBtn" data-id="${i}">Delete</button>
          </td>
        </tr>
      `);
    });

    $('#productTable').DataTable({
      destroy: true
    });

  });
}

$(document).ready(function () {

  loadProducts();

  $("#btnTambah").click(function () {
    $("#productForm")[0].reset();
    $("#editIndex").val("");
    $("#modalTitle").text("Tambah Produk");
    $("#submitBtn").text("Simpan");
  });

  $("#productForm").submit(function (e) {
    e.preventDefault();

    const product = {
      nama: $("#nama").val(),
      harga: $("#harga").val(),
      stok: $("#stok").val()
    };

    const id = $("#editIndex").val();

    if (id === "") {
      $.ajax({
        url: "/products",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(product),
        success: function () {
          loadProducts();
          $("#productForm")[0].reset();
          bootstrap.Modal.getInstance(document.getElementById('productModal')).hide();
          showAlert("Data berhasil ditambahkan");
        }
      });
    } else {
      $.ajax({
        url: "/products/" + id,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(product),
        success: function () {
          loadProducts();
          $("#productForm")[0].reset();
          $("#editIndex").val("");
          bootstrap.Modal.getInstance(document.getElementById('productModal')).hide();
          showAlert("Data berhasil diupdate");
        }
      });
    }
  });

  $(document).on("click", ".editBtn", function () {
    const id = $(this).data("id");

    $.get("/products", function (data) {
      $("#nama").val(data[id].nama);
      $("#harga").val(data[id].harga);
      $("#stok").val(data[id].stok);
      $("#editIndex").val(id);

      $("#modalTitle").text("Edit Produk");
      $("#submitBtn").text("Update");

      new bootstrap.Modal(document.getElementById('productModal')).show();
    });
  });

  $(document).on("click", ".deleteBtn", function () {
    deleteIndex = $(this).data("id");
    new bootstrap.Modal(document.getElementById('deleteModal')).show();
  });

  $("#confirmDelete").click(function () {
    $.ajax({
      url: "/products/" + deleteIndex,
      method: "DELETE",
      success: function () {
        loadProducts();
        bootstrap.Modal.getInstance(document.getElementById('deleteModal')).hide();
        showAlert("Data berhasil dihapus");
      }
    });
  });

});