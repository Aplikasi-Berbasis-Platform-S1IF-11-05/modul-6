let produkList = [];

// Fitri Kusumaningtyas 2311102068
$.getJSON('data.json', function(data){
    produkList = data;
    renderTable();
});

function renderTable(){
    let tbody = $("#tableProduk");
    tbody.empty();
    produkList.forEach((p,index)=>{
        let stokClass = p.stok>0?'badge-ada':'badge-habis';
        tbody.append(`
            <tr data-id="${p.id}">
                <td>${index+1}</td>
                <td>${p.nama}</td>
                <td>${p.harga}</td>
                <td><span class="badge ${stokClass}">${p.stok}</span></td>
                <td>
                    <button class="btn btn-edit btnEdit"><i class="fa fa-edit"></i> Edit</button>
                    <button class="btn btn-delete btnDelete"><i class="fa fa-trash"></i> Delete</button>
                </td>
            </tr>
        `);
    });
}

$("#simpan").click(function(){
    let nama = $("#nama").val();
    let harga = parseInt($("#harga").val());
    let stok = parseInt($("#stok").val());
    if(nama && !isNaN(harga) && !isNaN(stok)){
        let newId = produkList.length? produkList[produkList.length-1].id+1 :1;
        produkList.push({id:newId, nama:nama, harga:harga, stok:stok});
        renderTable();
        $("#modalTambah").modal('hide');
        $("#nama,#harga,#stok").val('');
    }
});

$(document).on('click','.btnEdit',function(){
    let tr = $(this).closest('tr');
    let id = tr.data('id');
    let produk = produkList.find(p=>p.id==id);
    if(produk){
        $("#editId").val(produk.id);
        $("#editNama").val(produk.nama);
        $("#editHarga").val(produk.harga);
        $("#editStok").val(produk.stok);
        $("#modalEdit").modal('show');
    }
});

$("#update").click(function(){
    let id = parseInt($("#editId").val());
    let produk = produkList.find(p=>p.id==id);
    if(produk){
        produk.nama = $("#editNama").val();
        produk.harga = parseInt($("#editHarga").val());
        produk.stok = parseInt($("#editStok").val());
        renderTable();
        $("#modalEdit").modal('hide');
    }
});

$(document).on('click','.btnDelete',function(){
    if(confirm("Yakin hapus?")){
        let tr = $(this).closest('tr');
        let id = tr.data('id');
        produkList = produkList.filter(p=>p.id!=id);
        renderTable();
        var toastEl = document.getElementById('toastDelete');
        var toast = new bootstrap.Toast(toastEl);
        toast.show();
    }
});