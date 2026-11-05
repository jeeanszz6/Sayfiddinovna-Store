# Panduan UI/UX — Sayfiddinovna Sport

## Arah desain

- **Karakter:** aktif, hangat, editorial, dan inklusif; olahraga ditampilkan sebagai kebiasaan sehari-hari.
- **Warna:** hijau gelap `#18342E` untuk teks/aksi utama, latar hangat `#F5F5F0`, lime `#D8F36A` untuk aksen, dan koral `#ED7950` untuk penanda.
- **Tipografi:** Manrope untuk judul dan identitas, DM Sans untuk teks antarmuka, Georgia sebagai aksen serif.
- **Layout:** whitespace luas, grid fleksibel, kartu kategori dan produk konsisten. Di ponsel seluruh katalog memakai dua kolom.
- **Visual:** ilustrasi CSS editorial pada hero dan panel cerita. Ganti dengan fotografi produk terkurasi saat aset resmi tersedia.

## User journey utama

1. Pengunjung tiba di beranda dan memahami nilai toko melalui judul serta CTA.
2. Pengunjung memilih kategori dari kartu kategori atau filter katalog.
3. Pengunjung membaca kategori, harga, dan label produk.
4. Pengunjung menambah barang ke keranjang, mendapat umpan balik, lalu membuka drawer.
5. Pengunjung meninjau subtotal dan dapat menghapus barang. Checkout saat ini ditandai belum tersedia.

## Wireframe beranda

```text
+------------------------------------------------------+
| Promo singkat                                        |
| Logo              Navigasi              Keranjang    |
+----------------------------+-------------------------+
| Judul + deskripsi + CTA    | Ilustrasi hero          |
| Bukti komunitas            |                         |
+------------------------------------------------------+
| Ticker pesan merek                                    |
| Judul kategori                                        |
| [Lari]            [Training]          [Lifestyle]     |
| Judul pilihan minggu ini + filter                     |
| [Produk]          [Produk]            [Produk] [..]  |
| Cerita merek / ajakan bergerak                        |
| Newsletter                                            |
| Footer                                                 |
+------------------------------------------------------+
```

## Komponen UI

- Announcement bar dan header navigasi.
- Tombol utama, tautan teks, tombol ikon, dan menu mobile.
- Kartu kategori dan kartu produk dengan badge serta aksi tambah.
- Filter kategori yang menunjukkan state aktif.
- Drawer keranjang dengan item, subtotal, keadaan kosong, dan umpan balik toast.
- Form newsletter dan footer.

## Aksesibilitas

- Gunakan landmark semantik, hierarki heading teratur, dan bahasa halaman `id`.
- Semua kontrol interaktif berupa elemen button/link dengan label yang dapat dibaca screen reader.
- Skip link tersedia; fokus keyboard terlihat dan urutan tab mengikuti alur visual.
- Status keranjang/newsletter diumumkan melalui live region.
- Kontras teks normal ditargetkan minimal 4.5:1; verifikasi warna aksen pada ukuran kecil sebelum produksi.
- Hormati `prefers-reduced-motion`; jangan menyampaikan informasi hanya melalui warna atau animasi.
- Pastikan breakpoint mobile dan target sentuh nyaman; uji pembesaran teks dan navigasi keyboard.

## Responsif

Desktop: navigasi sejajar, kategori tiga kolom, produk empat kolom. Tablet: grid produk dua/empat kolom sesuai ruang. Ponsel: menu navigasi lipat, kategori satu kolom, produk dua kolom, CTA mudah dijangkau.

## UX toko hoki

- Katalog menampilkan 20 perlengkapan hoki. Pencarian dan filter kategori, ukuran, warna, material, serta harga maksimum tersedia sebelum grid.
- Detail produk dibuka sebagai dialog untuk memilih ukuran, warna, dan kuantitas sebelum menambah ke keranjang.
- Checkout memerlukan akun lokal yang sudah masuk, lalu memakai empat langkah: email, alamat/pengiriman, QRIS, dan ringkasan konfirmasi.
- Keranjang menerima kode `HOCKEY10`; kartu membership menyampaikan diskon demo, poin, dan akses awal.
- Halaman layanan menyediakan pelacakan pesanan terakhir lokal, formulir pengajuan retur, dan tautan bantuan email.
- Dialog harus dapat ditutup lewat tombol tutup, backdrop, dan Escape. Fokus awal diarahkan ke kontrol dialog; sebelum produksi tambahkan focus trap dan pemulihan fokus ke pemicu.

Foto produk, kondisi retur final, pembayaran, akun, dan chat real-time belum tersedia. UI harus memberi label yang jelas bahwa checkout dan layanan saat ini merupakan simulasi.
