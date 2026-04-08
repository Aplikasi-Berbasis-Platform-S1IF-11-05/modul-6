let selectedId = null;

function loadData() {
  $.get("/api/products", function (data) {
    let html = "";

    data.forEach((p) => {
      html += `
        <tr>
          <td>${p.name}</td>
          <td>${p.price}</td>
          <td>${p.stock}</td>
          <td>
            <button class="btn btn-warning btn-sm edit" data-id="${p.id}">Edit</button>
            <button class="btn btn-danger btn-sm delete" data-id="${p.id}">Hapus</button>
          </td>
        </tr>
      `;
    });

    $("#productTable").html(html);
  });
}

// CREATE / UPDATE
$("#saveBtn").click(function () {
  const id = $("#id").val();

  const data = {
    name: $("#name").val(),
    price: $("#price").val(),
    stock: $("#stock").val(),
  };

  if (id) {
    $.ajax({
      url: `/api/products/${id}`,
      method: "PUT",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: () => location.reload(),
    });
  } else {
    $.ajax({
      url: "/api/products",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: () => location.reload(),
    });
  }
});

// OPEN CREATE
$("#addBtn").click(function () {
  $("#id").val("");
  $("#productModal").modal("show");
});

// EDIT
$(document).on("click", ".edit", function () {
  selectedId = $(this).data("id");

  $.get("/api/products", function (data) {
    const item = data.find((p) => p.id == selectedId);

    $("#id").val(item.id);
    $("#name").val(item.name);
    $("#price").val(item.price);
    $("#stock").val(item.stock);

    $("#productModal").modal("show");
  });
});

// DELETE
$(document).on("click", ".delete", function () {
  selectedId = $(this).data("id");
  $("#deleteModal").modal("show");
});

$("#confirmDelete").click(function () {
  $.ajax({
    url: `/api/products/${selectedId}`,
    method: "DELETE",
    success: () => location.reload(),
  });
});

// SEARCH
$("#search").on("keyup", function () {
  const value = $(this).val().toLowerCase();

  $("#productTable tr").filter(function () {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
  });
});

// INIT
loadData();
