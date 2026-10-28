# Katalog Web App — Google Apps Script

Proyek katalog produk sederhana dengan halaman katalog, harga, foto/video melalui URL, pencarian, kategori, panel admin dan data di Google Sheets.

## Penting
- Website yang berjalan tetap di-host oleh **Google Apps Script**.
- File `Code_Katalog.gs` adalah salinan sumber/backup. Mengunggah file `.gs` ke GitHub **tidak** membuatnya berjalan sebagai website di GitHub Pages.
- Untuk membuka katalog sebagai aplikasi/ikon di HP, gunakan URL Web App Apps Script yang berakhiran `/exec`, lalu tambahkan ke layar utama dari browser.
- Versi ini menanam HTML di dalam `Code_Katalog.gs`, sehingga tidak membutuhkan file `index.html` terpisah.

## File
- `Code_Katalog.gs` — seluruh kode Apps Script dan antarmuka web dalam satu file.
- `PANDUAN_GITHUB_DAN_HP.txt` — langkah pemula untuk mengunggah backup ke GitHub dan memasang shortcut katalog di HP.

## Memperbarui website
1. Edit kode di proyek Apps Script, bukan di GitHub.
2. Simpan.
3. Di Apps Script pilih **Deploy > Manage deployments > Edit > New version > Deploy**.
4. Setelah diuji, salin kode baru dari Apps Script ke file `Code_Katalog.gs` di GitHub agar backup ikut diperbarui.

## Keamanan
- Jadikan repository **Private** untuk pemula agar kode tidak langsung terbuka bagi umum.
- Jangan masukkan spreadsheet ID rahasia, kata sandi, token, data pelanggan, atau kredensial ke repository.
- Ubah PIN admin awal `1234` dari menu Pengaturan situs setelah masuk.
