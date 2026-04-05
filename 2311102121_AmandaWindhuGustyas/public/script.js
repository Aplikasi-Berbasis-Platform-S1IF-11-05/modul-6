let editIndex = null;

// load data
function load(){
    $.get('/data', function(res){
        let html = "";
        res.forEach((item, i)=>{
            html += `
            <tr>
                <td>${item.nama}</td>
                <td class="fw-semibold text-success">Rp ${parseInt(item.harga).toLocaleString()}</td>
                <td>
                    <button class="btn btn-warning btn-sm rounded-pill px-3 shadow-sm me-1" onclick="edit(${i})">Edit</button>
                    <button class="btn btn-danger btn-sm rounded-pill px-3 shadow-sm" onclick="hapus(${i})">Hapus</button>
                </td>
            </tr>`;
        });
        $("#table").html(html);
    });
}

// tambah
$("#addBtn").click(()=>{
    editIndex = null;
    showForm();
});

// form modal
function showForm(nama="", harga=""){
    let modal = `
    <div class="modal fade" id="formModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content rounded-4 shadow">

          <div class="modal-header bg-danger text-white">
            <h5>${editIndex === null ? "Tambah Produk" : "Edit Produk"}</h5>
          </div>

          <div class="modal-body">
            <input id="nama" class="form-control mb-3" placeholder="Nama Produk" value="${nama}">
            <input id="harga" type="number" class="form-control" placeholder="Harga" value="${harga}">
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
            <button class="btn btn-danger" onclick="save()">Simpan</button>
          </div>

        </div>
      </div>
    </div>`;

    $("body").append(modal);
    let m = new bootstrap.Modal(document.getElementById('formModal'));
    m.show();
}

// simpan
function save(){
    let nama = $("#nama").val();
    let harga = $("#harga").val();

    if(editIndex === null){
        $.post('/data', {nama, harga}, reload);
    } else {
        $.ajax({
            url: '/data/' + editIndex,
            type: 'PUT',
            data: JSON.stringify({nama, harga}),
            contentType: 'application/json',
            success: reload
        });
    }
}

// edit
function edit(i){
    editIndex = i;
    $.get('/data', function(res){
        showForm(res[i].nama, res[i].harga);
    });
}

// hapus
function hapus(i){
    if(confirm("Yakin mau hapus?")){
        $.ajax({
            url: '/data/' + i,
            type: 'DELETE',
            success: reload
        });
    }
}

// reload
function reload(){
    $(".modal").remove();
    load();
}

// initial
load();