<div align="center">

# LAPORAN PRAKTIKUM  
## APLIKASI BERBASIS PLATFORM  

### MODUL 6  
### JAVASCRIPT & JQUERY  

<br>

<img width="250" src="https://github.com/user-attachments/assets/724a3291-bcf9-448d-a395-3886a8659d79" />

<br><br>

### Disusun Oleh :
**Amelia Azmi**  
**2311102135**  
**S1 IF-11-REG05**

<br>

### Dosen Pengampu :
**Dedi Agung Prabowo, S.Kom., M.Kom**

<br>

### Asisten Praktikum :
Apri Pandu Wicaksono  
Hamka Zaenul Ardi  

<br>

### LABORATORIUM HIGH PERFORMANCE  
FAKULTAS INFORMATIKA  
UNIVERSITAS TELKOM PURWOKERTO  
2026  

</div>

---

# 📚 Dasar Teori

### 🔹 JavaScript
JavaScript merupakan bahasa pemrograman yang berfungsi untuk mengatur logika dan perilaku pada halaman web. JavaScript memungkinkan halaman web menjadi interaktif dan dinamis.

---

### 🔹 jQuery
jQuery adalah pustaka JavaScript yang menyederhanakan penulisan kode seperti event handling dan animasi.

---

# 🧪 Tugas 6

## 🎨 VIEW (index.blade.php)

```html
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

```html

### Output :

### Pnjelasan :

Program ini merupakan aplikasi web sederhana berbasis Laravel yang digunakan untuk mengelola produk digital pada sebuah Cyber Store. Produk yang dikelola meliputi pulsa, paket data, voucher game, serta layanan digital lainnya.

Berbeda dengan aplikasi inventori konvensional, sistem ini tidak menggunakan database, melainkan memanfaatkan file JSON sebagai media penyimpanan data. Hal ini membuat aplikasi lebih ringan dan mudah dikembangkan untuk kebutuhan pembelajaran.

Tujuan utama dari program ini adalah untuk memahami konsep dasar pengembangan aplikasi web, khususnya dalam mengelola data menggunakan metode CRUD (Create, Read, Update, Delete).

Selain itu, program ini juga bertujuan untuk mengimplementasikan penggunaan Laravel sebagai backend framework, Bootstrap sebagai tampilan antarmuka, serta JavaScript dan jQuery untuk menangani interaksi pengguna.
