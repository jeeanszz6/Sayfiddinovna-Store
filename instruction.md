# Petunjuk pengoperasian

1. Buka `index.html` menggunakan ekstensi Live Server atau hosting statis.
2. Pilih produk, varian, dan jumlah, lalu tambahkan ke keranjang.
3. Masuk atau buat akun pada browser ini sebelum checkout.
4. Isi email, alamat, dan metode pengiriman, lalu simpan pesanan.
5. Bayar QRIS, lalu kirim bukti pembayaran dan nomor pesanan ke toko melalui tombol WhatsApp.

Akun, sesi, keranjang, pesanan, dan retur hanya tersimpan di browser/perangkat yang sama. Tidak ada sinkronisasi admin, database, atau konfirmasi pembayaran otomatis. Visa otomatis tidak tersedia.


## Pengaturan pembayaran Midtrans
Lihat file `MIDTRANS-INTEGRATION.md` untuk menyiapkan PHP/MySQL di XAMPP, mengimpor database, memasukkan Access Keys Sandbox, menguji transaksi, dan mengaktifkan webhook. Jangan gunakan Live Server atau membuka file HTML langsung untuk checkout; jalankan melalui Apache XAMPP. Pembayaran sungguhan baru aktif setelah merchant Production disetujui, kredensial Production dipasang, dan website tersedia melalui domain HTTPS.
