# Arsitektur toko

Toko berjalan sebagai situs statis di browser.

- `products.js` menyimpan katalog produk.
- `script.js` menangani katalog, keranjang, dan navigasi checkout.
- `account-page.js` membuat akun lokal dan memeriksa kata sandi yang di-hash sebelum checkout.
- `checkout-flow.js` menangani formulir checkout dan menyimpan pesanan pada `localStorage` browser.
- `support-page.js` melacak pesanan dan menyimpan permintaan retur pada browser yang sama.
- Pembayaran QRIS dilakukan manual dan dikonfirmasi langsung dengan toko melalui WhatsApp.

Login wajib sebelum checkout. Akun dan data browser bersifat lokal: akun maupun pesanan tidak tersinkron dengan perangkat lain atau panel admin, dan status pembayaran tidak berubah otomatis. Jalankan melalui Live Server atau hosting statis.
