
<!DOCTYPE html>
<html>
<head>
    <title>Tambah Produk</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
</head>
<body class="p-4">

<div class="container">
    <h2>Tambah Produk</h2>
    <form method="POST" action="/store">
        <?php echo csrf_field(); ?>
        <input class="form-control mb-2" name="name" placeholder="Nama">
        <input class="form-control mb-2" name="price" placeholder="Harga">
        <input class="form-control mb-2" name="stock" placeholder="Stok">
        <button class="btn btn-success">Simpan</button>
    </form>
</div>

</body>
</html>


<?php
 ?><?php /**PATH C:\Users\HP\tokopakcik\resources\views/create.blade.php ENDPATH**/ ?>