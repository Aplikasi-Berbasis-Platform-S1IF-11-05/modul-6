<div align="center">
  <br />
  <h1>LAPORAN PRAKTIKUM <br> APLIKASI BERBASIS PLATFORM </h1>
  <br />
  <h3>MODUL 6 <br> JAVASCRIPT & JQUERY </h3>
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
## 📚 Dasar Teori

🔹 JavaScript

JavaScript merupakan bahasa pemrograman yang berfungsi untuk mengatur logika dan perilaku pada halaman web. Dengan JavaScript, halaman web dapat berinteraksi secara langsung dengan pengguna, seperti merespon klik tombol, menampilkan notifikasi, serta memproses data secara dinamis.

JavaScript bekerja dengan mengakses struktur halaman melalui DOM, sehingga memungkinkan perubahan elemen secara real-time tanpa perlu memuat ulang halaman.

🔹 jQuery

jQuery adalah pustaka JavaScript yang dirancang untuk menyederhanakan penulisan kode. Dengan jQuery, proses manipulasi elemen HTML, penanganan event, serta animasi dapat dilakukan dengan lebih singkat dan efisien.

Contoh penggunaan jQuery adalah untuk menampilkan efek animasi seperti fadeIn(), fadeOut(), serta menangani event klik menggunakan .click() atau .on().

🔹 Peran Frontend

Dalam pengembangan web, HTML digunakan sebagai struktur, CSS sebagai tampilan, dan JavaScript sebagai pengatur interaksi. jQuery hadir sebagai alat bantu untuk mempercepat implementasi interaksi tersebut.

---

##🧪 Tugas 6
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
---


---

Hasil:
<img width="1920" height="1080" alt="cyber" src="https://github.com/user-attachments/assets/beb627c4-e153-4025-8e7d-8988a2bd2dee" />

---
---

# 📝 Kesimpulan

Berdasarkan praktikum yang telah dilakukan pada Modul 6 mengenai **JavaScript dan jQuery**, dapat disimpulkan bahwa:

* JavaScript merupakan bahasa pemrograman yang berperan penting dalam membuat halaman web menjadi interaktif dan dinamis.
* jQuery sebagai library dari JavaScript mampu menyederhanakan penulisan kode serta mempercepat proses pengembangan fitur pada sisi frontend.
* Penggunaan JavaScript dan jQuery memungkinkan pengolahan data secara real-time tanpa perlu melakukan reload halaman.
* Dalam implementasinya pada aplikasi inventori sederhana, kedua teknologi ini membantu meningkatkan pengalaman pengguna melalui interaksi yang lebih responsif.

Dengan demikian, pemahaman terhadap JavaScript dan jQuery sangat penting dalam pengembangan aplikasi web modern, khususnya pada bagian frontend.
