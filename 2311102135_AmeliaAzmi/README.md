<div align="center">
  <br />
  <h1>LAPORAN PRAKTIKUM <br> APLIKASI BERBASIS PLATFORM </h1>
  <br />
  <h3>MODUL 6 <br> JS & Query</h3>
  <br />
  <img width="512" height="512" alt="telyu" src="https://github.com/user-attachments/assets/724a3291-bcf9-448d-a395-3886a8659d79" />
  <br />
  <br />
  <br />
  <h3>Disusun Oleh :</h3>
  <p>
    <strong>Amelia Azmi</strong>
    <br>
    <strong>2311102135</strong>
    <br>
    <strong>S1 IF-11-REG05</strong>
  </p>
  <br />
  <h3>Dosen Pengampu :</h3>
  <p>
    <strong>Dedi Agung Prabowo, S.Kom., M.Kom</strong>
  </p>
  <br />
  <br />
  <h4>Asisten Praktikum :</h4>
  <strong>Apri Pandu Wicaksono </strong>
  <br>
  <strong>Hamka Zaenul Ardi</strong>
  <br />
  <h3>LABORATORIUM HIGH PERFORMANCE <br>FAKULTAS INFORMATIKA <br>UNIVERSITAS TELKOM PURWOKERTO <br>2026 </h3>
</div>

<hr>

# Dasar Teori

Laravel adalah sebuah framework berbasis PHP yang digunakan untuk mengembangkan aplikasi web secara cepat, efisien, dan terstruktur. Laravel dirancang dengan konsep MVC (Model-View-Controller) yang memisahkan antara logika aplikasi, tampilan, dan pengelolaan data, sehingga kode menjadi lebih rapi dan mudah dikelola.

Dalam arsitektur MVC, Model berfungsi untuk mengelola data serta berinteraksi langsung dengan database, View digunakan untuk menampilkan antarmuka pengguna (user interface), sedangkan Controller bertugas sebagai penghubung antara Model dan View serta mengatur alur logika aplikasi. Dengan pemisahan ini, pengembangan aplikasi menjadi lebih sistematis dan mudah dipahami.

Laravel juga memiliki struktur folder yang terorganisir dengan baik, seperti folder app untuk logika aplikasi, routes untuk pengaturan URL, resources/views untuk tampilan, serta database untuk pengelolaan struktur basis data. Hal ini membantu developer dalam mengelola proyek secara lebih efisien.

Salah satu fitur penting dalam Laravel adalah routing, yaitu mekanisme untuk mengatur jalur URL agar dapat mengarah ke fungsi tertentu dalam aplikasi. Selain itu, Laravel menyediakan Blade Template Engine yang memudahkan pembuatan tampilan dengan sintaks yang sederhana namun powerful.

# 🧪 Tugas 6

## 🎨 VIEW (index.blade.php)
```
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>Cyber Store</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

<style>
body {
    background: linear-gradient(135deg, #0f172a, #1e3a8a);
    color: white;
}
</style>
</head>

<body>

<h2>Cyber Store</h2>

<form method="POST" action="/store">
@csrf
<input name="nama">
<button>Tambah</button>
</form>

@foreach($items as $i)
<p>{{ $i['nama'] }}</p>
@endforeach

</body>
</html>

```

Output:
<img width="1920" height="1080" alt="cyber" src="https://github.com/user-attachments/assets/e551cb89-50a2-4625-ad42-3f2c2a9a6bdb" />



# Penjelasan
Program ini merupakan aplikasi web sederhana berbasis Laravel yang digunakan untuk mengelola produk digital pada sebuah Cyber Store. Produk yang dikelola meliputi pulsa, paket data, voucher game, serta layanan digital lainnya.

Berbeda dengan aplikasi inventori konvensional, sistem ini tidak menggunakan database, melainkan memanfaatkan file JSON sebagai media penyimpanan data. Hal ini membuat aplikasi lebih ringan dan mudah dikembangkan untuk kebutuhan pembelajaran.

Tujuan utama dari program ini adalah untuk memahami konsep dasar pengembangan aplikasi web, khususnya dalam mengelola data menggunakan metode CRUD (Create, Read, Update, Delete).

Selain itu, program ini juga bertujuan untuk mengimplementasikan penggunaan Laravel sebagai backend framework, Bootstrap sebagai tampilan antarmuka, serta JavaScript dan jQuery untuk menangani interaksi pengguna.
