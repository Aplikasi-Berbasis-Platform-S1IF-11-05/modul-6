$(document).ready(function () {

    let data = JSON.parse(localStorage.getItem("produk")) || [];
    let deleteIndex = null;

    function render() {
        let html = "";
        data.forEach((item, i) => {
            html += `
                <tr>
                    <td>${item.nama}</td>
                    <td>${item.harga}</td>
                    <td>${item.stok}</td>
                    <td>
                        <button class="btn btn-warning btn-sm edit" data-id="${i}">Edit</button>
                        <button class="btn btn-danger btn-sm delete" data-id="${i}">Delete</button>
                    </td>
                </tr>
            `;
        });
        $("#tableBody").html(html);
        localStorage.setItem("produk", JSON.stringify(data));
    }

    render();

    // SAVE (CREATE + UPDATE)
    $("#saveBtn").click(function () {
        let nama = $("#nama").val();
        let harga = $("#harga").val();
        let stok = $("#stok").val();
        let index = $("#index").val();

        if (index === "") {
            data.push({ nama, harga, stok });
        } else {
            data[index] = { nama, harga, stok };
        }

        $("#formModal").modal("hide");
        $("#nama, #harga, #stok, #index").val("");
        render();
    });

    // EDIT
    $(document).on("click", ".edit", function () {
        let i = $(this).data("id");
        $("#nama").val(data[i].nama);
        $("#harga").val(data[i].harga);
        $("#stok").val(data[i].stok);
        $("#index").val(i);

        $("#formModal").modal("show");
    });

    // DELETE BUTTON
    $(document).on("click", ".delete", function () {
        deleteIndex = $(this).data("id");
        $("#deleteModal").modal("show");
    });

    // CONFIRM DELETE
    $("#confirmDelete").click(function () {
        data.splice(deleteIndex, 1);
        $("#deleteModal").modal("hide");
        render();
    });

});