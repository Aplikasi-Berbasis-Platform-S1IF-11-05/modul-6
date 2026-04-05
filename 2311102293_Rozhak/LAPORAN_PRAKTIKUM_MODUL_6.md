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
        <strong>Rozhak</strong>
        <br>
        <strong>2311102293</strong>
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

## Dasar Teori

JavaScript merupakan bahasa pemrograman yang digunakan untuk menambahkan interaktivitas pada halaman web. JavaScript berjalan di sisi client (browser) dan memungkinkan halaman web merespons aksi pengguna seperti klik, input, maupun perubahan elemen secara dinamis.

Dalam pengembangan web, JavaScript bekerja bersama HTML dan CSS dengan peran yang berbeda, yaitu HTML sebagai struktur, CSS sebagai pengendali logika serta interaksi. Dengan JavaScript, elemen HTML dapat dimanipulasi secara langsung melalui DOM (Document Object Model), seperti mengubah isi, atribut, maupun gaya satu elemen.

Salah satu konsep penting dalam JavaScript adalah **event handling**, yaitu kemampuan untuk menangani berbagai aksi pengguna seperti `click`, `submit`, dan `hover`. Event ini digunakan untuk menjalankan fungsi tertentu sehingga halaman web menjadi lebih responsif dan interaktif.

Selain JavaScript, terdapat library bernama **jQuery** yang dikembangkan oleh Resig pada tahun 2006 untuk menyederhanakan penulisan kode JavaScript. jQuery memungkinkan manipulasi elemen HTML dilakukan dengan sintaks yang lebih ringkas dan efisien.

Beberapa fitur utama jQuery meliputi kemampuan untuk melakukan manipulasi DOM dengan selector yang sederhana, menangani event dengan lebih mudah, mendukung teknologi AJAX untuk komunikasi data secara asynchronous, serta menyediakan berbagai animasi bawaan yang dapat digunakan untuk halaman web. Selain itu, jQuery memiliki ukuran file yang relatif ringan sehingga tetap efisien untuk digunakan dalam pengembangan aplikasi web.

Dengan kombinasi JavaScript dan jQuery, proses pengembangan halaman web menjadi lebih cepat, terstruktur, dan mampu menghasilkan interaksi yang lebih dinamis serta meningkatkan pengalaman pengguna.

## Penjelasan Source Code

Aplikasi inventaris toko kelontong ini diimplementasikan menggunakan pola arsitektur _Model-View-Control_ (MVC) sederhana untuk memisahkan antara logika penyimpanan, pengelolaan bisnis, dan antarmuka interaksi pengguna secara modular.

### 1. Implementasi Backend dan Penyimpanan Data

Sisi peladen dibangun menggunakan Node.js dan Express.js yang dipecah ke dalam beberapa modul spesifik. Operasi penyimpanan data difokuskan pada modul konfigurasi `fileDb.js` yang memanfaatkan modul bawaan `fs` untuk membaca dan menulis berkas `products.json`. Logika pemrosesan bisnis dikelola di dalam `productController.js` yang membuat sekumpulan fungsi untuk menangani operasi penambahan, pembacaan, pembaruan, dan penghapusan data (CRUD).

Ketika fungsi ini menerima data masukan dari klien, sistem akan memvalidasi _payload_ tersebut, melakukan mutasi terhadap struktur larik (_array_) produk, dan menyimpannya kembali ke dalam berkas JSON.

Pemanggilan fungsi-fungsi kontroler ini diatur oleh modul sistem perutean (`productRoutes.js`) yang memetakan setiap aksi HTTP (GET, POST, PUT, DELETE) ke _endpoint_ antarmuka program aplikasi (API) `/api/products`. Seluruh modul tersebut kemudian digabungkan ke dalam konfigurasi utama pada berkas `server.js` yang juga memuat pengaturan _Cross-Origin Resource Sharing_ (CORS) agar API dapat diakses dengan aman oleh sisi klien.

### 2. Implementasi Frontend dan Interaktivitas

Antarmuka pengguna direpresentasikan melalui berkas tunggal HTML yang diintegrasikan dengan _stylesheet_ Bootstrap 5. Konfigurasi ini menghasilkan tata letah halaman yang bersih (_clean design_) dengan komponen interaktif utama berupa tabel data dan formulir _modal_ mengambang. Komunikasi antara perambanan dan peladen diatur sepenuhnya melalui skrip jQuery. Saat halaman pertama kali dimuat, fungsi inisialisasi AJAX mengirimkan permintaan GET ke _endpoint_ API untuk mengambil data JSON produk dan menyuapkannya langsung ke instansi DataTables. Proses penambahan dan pengubahan data ditangani oleh kejadian pendengar (_event listener_) yang akan mencegat perilaku pengiriman bawaan formulir, mengonversi masukan pengguna menjadi format objek, dan mengirimkannya melalui permintaan AJAX (POST/PUT). Jika peladen merespons dengan status keberhasilan, antarmuka akan secara otomatis menutup _modal_, menampilkan notifikasi visual berbasis komponen _Toast_, dan memuat ulang tabel data secara asinkron untuk memastikan status inventaris selalu sinkron dengan basis data.

## Output

![Task 6: Toko Kelontong Pak Cik dan Aimar](docs/screenshots/01-dashboard.png)

## Kesimpulan

Praktikum implementasi Modul 6 membuktikan bahwa integrasi antara Node.js, Express.js, Bootstrap, dan jQuery mampu menghasilkan arsitektur aplikasi web yang tangguh dan interaktif. Penggunaan kerangka kerja pada sisi peladen menyederhanakan pembuatan layanan REST API, sementara pemanfaatan plugin antarmuka pada sisi klien secara signifikan meningkatkan pengalaman pengguna dalam melakukan operasi CRUD tanpa perlu melakukan konfigurasi basis data relasional yang rumit.