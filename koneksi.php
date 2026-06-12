<?php
// Deklarasi variabel konfigurasi database
$host     = "localhost";
$username = "root";        
$password = "";             
$database = "data warga setempat";   

// Membuat koneksi menggunakan mysqli
$conn = new mysqli($host, $username, $password, $database);

// Memeriksa apakah koneksi berhasil atau error
if ($conn->connect_error) {
    // Jika gagal, proses akan dihentikan dan menampilkan pesan error
    die("Koneksi ke database gagal: " . $conn->connect_error);
}

// Opsional: Hapus atau comment baris echo di bawah ini jika aplikasi sudah berjalan
// echo "Koneksi berhasil terhubung ke database: " . $database;
?>
