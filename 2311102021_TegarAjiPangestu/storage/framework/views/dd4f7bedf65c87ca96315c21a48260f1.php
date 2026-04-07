<!DOCTYPE html>
<html>
<head>
    <title>Inventori Pak Cik</title>

    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    <!-- Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

    <style>
        body {
            background: #f4f6f9;
        }
        .card-custom {
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        .header-custom {
            background: #2c3e50;
            color: white;
            border-radius: 15px 15px 0 0;
        }
        .btn-rounded {
            border-radius: 20px;
        }
    </style>
</head>

<body class="p-4">

<div class="container">
    <div class="card card-custom">
        
        <!-- Header -->
        <div class="d-flex justify-content-between align-items-center p-3 header-custom">
            <h5 class="mb-0">
                <i class="fa fa-box"></i> Inventori Pak Cik
            </h5>
            <a href="/create" class="btn btn-light btn-sm btn-rounded">
                <i class="fa fa-plus"></i> Produk
            </a>
        </div>

        <!-- Table -->
        <div class="p-3">
            <table class="table table-hover table-striped align-middle">
                <thead class="table-dark">
                    <tr>
                        <th>Nama Produk</th>
                        <th>Harga</th>
                        <th>Stok</th>
                        <th class="text-center">Aksi</th>
                    </tr>
                </thead>

                <tbody>
                    <?php foreach($products as $p): ?>
                    <tr>
                        <td><strong><?= $p['name'] ?></strong></td>

                        <td class="text-success">
                            Rp <?= number_format($p['price']) ?>
                        </td>

                        <td>
                            <?php if($p['stock'] > 5): ?>
                                <span class="badge bg-success"><?= $p['stock'] ?></span>
                            <?php elseif($p['stock'] > 0): ?>
                                <span class="badge bg-warning text-dark"><?= $p['stock'] ?></span>
                            <?php else: ?>
                                <span class="badge bg-danger">Habis</span>
                            <?php endif; ?>
                        </td>

                        <td class="text-center">
                            <a href="/edit/<?= $p['id'] ?>" class="btn btn-warning btn-sm btn-rounded">
                                <i class="fa fa-edit"></i>
                            </a>

                            <button class="btn btn-danger btn-sm btn-rounded btn-delete" data-id="<?= $p['id'] ?>">
                                <i class="fa fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>

            </table>
        </div>
    </div>
</div>

<!-- Modal Delete -->
<div class="modal fade" id="deleteModal">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      
      <div class="modal-header bg-danger text-white">
        <h5 class="modal-title">Konfirmasi Hapus</h5>
      </div>

      <div class="modal-body text-center">
        <i class="fa fa-exclamation-triangle fa-2x text-danger mb-2"></i>
        <p>Yakin ingin menghapus produk ini?</p>
      </div>

      <div class="modal-footer">
        <form id="deleteForm" method="POST">
            <?php echo csrf_field(); ?>
            <button type="submit" class="btn btn-danger">Ya, Hapus</button>
        </form>
        <button class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
      </div>

    </div>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

<script>
$(function(){
    let id;

    $('.btn-delete').click(function(){
        id = $(this).data('id');
        $('#deleteModal').modal('show');
    });

    $('#deleteForm').submit(function(){
        $(this).attr('action', '/delete/' + id);
    });
});
</script>

</body>
</html><?php /**PATH C:\Users\HP\tokopakcik\resources\views/index.blade.php ENDPATH**/ ?>