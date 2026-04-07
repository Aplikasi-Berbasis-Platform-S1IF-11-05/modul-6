let data = [];

function render() {
    let html = "";
    data.forEach((item, index) => {
        html += `
        <tr>
            <td>${item.nama}</td>
            <td>${item.harga}</td>
            <td>
                <button class="btn btn-warning btn-sm edit" data-id="${index}">Edit</button>
                <button class="btn btn-danger btn-sm delete" data-id="${index}">Hapus</button>
            </td>
        </tr>
        `;
    });
    $("#tableBody").html(html);
}

$(document).ready(function () {

    // Load JSON
    $.getJSON("data.json", function (res) {
        data = res;
        render();
    });

    // Tambah
    $("#tambah").click(function () {
        let nama = prompt("Nama produk:");
        let harga = prompt("Harga:");

        data.push({ nama, harga });
        render();
    });

    // Delete
    $(document).on("click", ".delete", function () {
        let id = $(this).data("id");

        if (confirm("Yakin hapus?")) {
            data.splice(id, 1);
            render();
        }
    });

    // Edit
    $(document).on("click", ".edit", function () {
        let id = $(this).data("id");

        let nama = prompt("Edit nama:", data[id].nama);
        let harga = prompt("Edit harga:", data[id].harga);

        data[id].nama = nama;
        data[id].harga = harga;

        render();
    });

});