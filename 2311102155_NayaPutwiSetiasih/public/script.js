const API = "http://localhost:3000/produk";
let deleteId = null;

// ======================
// LOAD DATA
// ======================
function loadData() {
  $.get(API, function(data) {
    let html = "";

    data.forEach((item, index) => {
      html += `
        <tr>
          <td>${index + 1}</td>
          <td>${item.nama}</td>
          <td>${item.harga}</td>
          <td>${item.stok}</td>
          <td>
            <button class="btn btn-warning btn-sm editBtn"
              data-id="${item.id}"
              data-nama="${item.nama}"
              data-harga="${item.harga}"
              data-stok="${item.stok}">
              Edit
            </button>
            <button class="btn btn-danger btn-sm deleteBtn" data-id="${item.id}">
              Hapus
            </button>
          </td>
        </tr>
      `;
    });

    $("#tableBody").html(html);
  });
}

// ======================
// TAMBAH
// ======================
$("#btnTambah").click(function() {
  $("#modalTitle").text("Tambah Produk");

  $("#produkId").val("");
  $("#nama").val("");
  $("#harga").val("");
  $("#stok").val("");

  new bootstrap.Modal(document.getElementById('modalForm')).show();
});

// ======================
// EDIT
// ======================
$(document).on("click", ".editBtn", function() {
  $("#modalTitle").text("Edit Produk");

  $("#produkId").val($(this).data("id"));
  $("#nama").val($(this).data("nama"));
  $("#harga").val($(this).data("harga"));
  $("#stok").val($(this).data("stok"));

  new bootstrap.Modal(document.getElementById('modalForm')).show();
});

// ======================
// SIMPAN (CREATE / UPDATE)
// ======================
$("#saveBtn").click(function() {
  const id = $("#produkId").val();

  const data = {
    nama: $("#nama").val(),
    harga: $("#harga").val(),
    stok: $("#stok").val()
  };

  if (id) {
    // UPDATE
    $.ajax({
      url: API + "/" + id,
      method: "PUT",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function() {
        loadData();
        $(".modal").modal("hide");
      }
    });
  } else {
    // CREATE
    $.ajax({
      url: API,
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function() {
        loadData();
        $(".modal").modal("hide");
      }
    });
  }
});

// ======================
// DELETE CLICK
// ======================
$(document).on("click", ".deleteBtn", function() {
  deleteId = $(this).data("id");
  new bootstrap.Modal(document.getElementById('modalDelete')).show();
});

// ======================
// CONFIRM DELETE
// ======================
$("#confirmDelete").click(function() {
  $.ajax({
    url: API + "/" + deleteId,
    method: "DELETE",
    success: function() {
      loadData();
      $(".modal").modal("hide");
    }
  });
});

// ======================
// INIT
// ======================
$(document).ready(function() {
  loadData();
});