# Integrasi Midtrans — Sayfiddinovna Sport

Aplikasi awal adalah situs statis yang menyimpan akun dan keranjang di browser. Integrasi pembayaran ini menambahkan backend PHP + MySQL untuk membuat transaksi Snap, menerima notifikasi Midtrans, dan memeriksa status transaksi. Pembayaran belum dapat digunakan sampai merchant mengisi kredensial, menyiapkan database, dan menjalankan aplikasi melalui Apache/PHP (bukan Live Server/file://).

## 1. Persyaratan
- XAMPP dengan Apache, PHP 8.0+ (disarankan), MySQL/MariaDB, ekstensi `curl` dan `pdo_mysql` aktif.
- Akun merchant Midtrans dan Access Keys dari Dashboard Midtrans.
- Untuk transaksi sungguhan: akun/merchant telah disetujui, metode pembayaran yang dibutuhkan telah diaktifkan, domain publik dengan HTTPS.

## 2. Pasang di XAMPP
1. Ekstrak seluruh folder aplikasi ke `C:\xampp\htdocs\sayfiddinovna-sport` (atau nama folder lain).
2. Jalankan Apache dan MySQL dari XAMPP.
3. Buka `http://localhost/phpmyadmin`, pilih tab Import, lalu impor `api/database.sql`.
4. Salin `api/config.local.php.example` menjadi `api/config.local.php`.
5. Isi database host/name/user/password dan Client Key + Server Key Midtrans pada `api/config.local.php`.
6. Awali dengan `MIDTRANS_IS_PRODUCTION` bernilai `false` dan gunakan Sandbox Client Key/Server Key.
7. Buka `http://localhost/sayfiddinovna-sport/`.

## 3. Konfigurasi Midtrans Sandbox
- Ambil Sandbox Client Key dan Server Key di Midtrans Dashboard > Settings > Access Keys.
- Pastikan metode kartu, VA/transfer bank, dan QRIS diaktifkan pada pengaturan metode pembayaran akun Sandbox.
- Atur Payment Notification URL ke `https://ALAMAT-PUBLIK/api/notification.php`.
- Midtrans tidak dapat mengirim webhook ke `localhost`. Untuk pengujian lokal, expose server lokal menggunakan tunnel HTTPS (misalnya ngrok) dan gunakan URL tunnel sebagai Notification URL.
- Uji transaksi dengan instrumen uji yang disediakan Midtrans; jangan gunakan kartu/rekening asli di Sandbox.

## 4. Beralih ke Production
1. Selesaikan aktivasi/validasi merchant dan aktifkan metode pembayaran yang dibutuhkan pada akun Production.
2. Pasang aplikasi pada hosting/domain publik dengan HTTPS dan database MySQL produksi.
3. Ganti Client Key dan Server Key dengan Production keys pada `config.local.php`.
4. Ubah `MIDTRANS_IS_PRODUCTION` menjadi `true`.
5. Atur Notification URL di Dashboard Production ke `https://DOMAIN-ANDA/api/notification.php`.
6. Jalankan satu transaksi nominal kecil dan pastikan status berubah menjadi `paid` setelah webhook/status check.

## 5. Catatan keamanan dan cakupan
- Server Key hanya berada di PHP (`config.local.php`), jangan pernah menaruhnya di JavaScript, HTML, atau mengirimkannya lewat chat.
- Data nomor kartu dan CVV tidak diminta atau disimpan di website ini. Pelanggan memasukkannya pada halaman pembayaran aman Midtrans.
- Harga, ongkir, dan kode promo HOCKEY10 dihitung ulang di server; nominal dari browser tidak dipercaya.
- Webhook memeriksa signature SHA-512, mencocokkan nominal, dan tidak menurunkan status transaksi yang sudah paid.
- Akun/login pelanggan aplikasi lama masih tersimpan di browser (localStorage). Database baru ini menyimpan transaksi pembayaran/pesanan, bukan migrasi penuh sistem akun atau dashboard admin.
- Untuk mengoperasikan pembayaran sungguhan, gunakan hosting publik HTTPS. XAMPP localhost hanya untuk pengembangan/pengujian.
