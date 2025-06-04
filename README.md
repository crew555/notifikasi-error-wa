# WhatsApp Error Notifier

Program ini akan mengirimkan notifikasi ke WhatsApp ketika terjadi error pada aplikasi Node.js Anda.

## Persyaratan
- Node.js versi 12 atau lebih tinggi
- NPM (Node Package Manager)
- WhatsApp yang terinstall di HP

## Instalasi

1. Clone atau download repository ini
2. Buka terminal dan masuk ke direktori project
3. Install dependencies yang diperlukan:
```bash
npm install whatsapp-web.js qrcode-terminal
```

## Konfigurasi

1. Buka file `test-error.js`
2. Ganti nomor WhatsApp tujuan pada baris yang berisi `setTargetNumber` dengan nomor WhatsApp yang akan menerima notifikasi
   - Format: "62xxxxxxxxxxx" (gunakan kode negara 62 untuk Indonesia, tanpa tanda + atau 0 di depan)
   - Contoh: "6282119172702"

## Cara Menggunakan

1. Jalankan program dengan perintah:
```bash
node test-error.js
```

2. Saat pertama kali menjalankan, akan muncul QR code di terminal
   - Buka WhatsApp di HP yang akan digunakan untuk mengirim notifikasi
   - Buka Menu (3 titik) -> Perangkat Tertaut -> Tautkan Perangkat
   - Scan QR code yang muncul di terminal

3. Setelah scan QR code berhasil:
   - Program akan menunggu beberapa detik
   - Kemudian akan membuat error percobaan
   - Notifikasi error akan dikirim ke nomor WhatsApp yang sudah dikonfigurasi

## Catatan Penting

- Nomor WhatsApp yang digunakan untuk scan QR code (pengirim) harus BERBEDA dengan nomor WhatsApp yang akan menerima notifikasi
- Pastikan kedua nomor WhatsApp aktif
- Program akan menyimpan sesi login di folder `.wwebjs_auth`, jadi tidak perlu scan QR code setiap kali menjalankan program
- Jika terjadi masalah autentikasi, hapus folder `.wwebjs_auth` dan coba scan ulang QR code

## Troubleshooting

1. Jika pesan tidak terkirim:
   - Pastikan nomor tujuan benar dan aktif menggunakan WhatsApp
   - Pastikan format nomor benar (dengan kode negara, tanpa + atau 0 di depan)
   - Pastikan menggunakan dua nomor WhatsApp yang berbeda untuk pengirim dan penerima

2. Jika QR code tidak muncul:
   - Hapus folder `.wwebjs_auth` jika ada
   - Jalankan ulang program

3. Jika terjadi error "Error: Evaluation failed":
   - Pastikan Chrome/Chromium terinstall di komputer
   - Coba jalankan ulang program
