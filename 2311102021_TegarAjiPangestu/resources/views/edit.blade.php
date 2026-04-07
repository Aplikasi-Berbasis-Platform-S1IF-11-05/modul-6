?>

<!DOCTYPE html>
<html>
<head>
    <title>Edit Produk</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
</head>
<body class="p-4">

<div class="container">
    <h2>Edit Produk</h2>
    <form method="POST" action="/update/<?= $product['id'] ?>">
        <?php echo csrf_field(); ?>
        <input class="form-control mb-2" name="name" value="<?= $product['name'] ?>">
        <input class="form-control mb-2" name="price" value="<?= $product['price'] ?>">
        <input class="form-control mb-2" name="stock" value="<?= $product['stock'] ?>">
        <button class="btn btn-primary">Update</button>
    </form>
</div>

</body>
</html>
