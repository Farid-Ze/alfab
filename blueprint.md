# DIGITAL ECOSYSTEM ARCHITECTURE: THE UNIFIED RESILIENCE MODEL

**Client:** PT. Alfa Beauty Cosmetica
**Strategic Vision:** "Invisible Governance, Frictionless Commerce"
**Architecture Level:** Enterprise B2B Custom Solution (Hybrid Model)
**Version:** 3.4 (Partner Profiling & Agile Config)

## 1. RINGKASAN EKSEKUTIF: MENYELESAIKAN PARADOKS B2B

### Tantangan Bisnis

PT. Alfa Beauty Cosmetica menghadapi dilema: Bagaimana cara memodernisasi operasional agar **Lebih Cepat & Skalabel**, namun tetap menghormati **Budaya Hubungan Personal** dan **Struktur Distribusi Wilayah** yang sudah berjalan selama 15 tahun?

Solusi *E-commerce* biasa (toko online standar) tidak cocok karena terlalu kaku, berisiko memotong jalur Sub-Distributor, dan tidak bisa mengakomodasi seni negosiasi harga yang luwes.

### Solusi Arsitektur: "Kendali Hibrida" (Hybrid Governance)

Kami membangun sistem yang cerdas di belakang, namun sederhana di depan.

- **Sistem Belakang (Backend):** Bekerja ketat menjaga aturan keuangan dan stok (seperti auditor digital).
    - **Strategi Data (Memory-First):** Mengingat jumlah SKU < 2.000, seluruh Katalog Produk & Tier Pricing **WAJIB** disimpan di Memory (Redis) untuk akses *Zero-Latency*. Database disk (SQL) hanya untuk Final Write.
- **Sistem Depan (Frontend):** Berfungsi sebagai **Katalog Digital Canggih** yang memudahkan Salon membuat daftar pesanan, namun membiarkan **Negosiasi & Finalisasi** tetap terjadi di WhatsApp secara manusiawi.

### Profil Skala Proyek (Scale Validation)

Proyek ini dikategorikan sebagai **"Low Volume, High Value/Complexity"**:

| Parameter | Nilai | Validasi |
| :--- | :--- | :--- |
| **SKU Count** | 500 - 2.000 Items | Small Data (< 10MB in-memory) |
| **Active Partners** | 5.000 - 10.000 User | Stable B2B base, non-fluctuating |
| **Daily Transactions** | 500 - 1.000 Inquiries | ~1.6 tx/menit (Low Throughput) |
| **Read:Write Ratio** | 20:1 | Read Heavy (Research before Order) |

**Implikasi:** Tantangan teknis bukan pada *concurrency*, melainkan pada **reliabilitas transaksi**, **konsistensi data**, dan **latency**.

## 2. ARSITEKTUR KEUANGAN: MONITOR KREDIT OTOMATIS

**Tujuan:** Menjaga disiplin pembayaran tanpa membuat user tersinggung dengan sistem yang kaku.

Karena website tidak memproses pembayaran langsung (No Payment Gateway), sistem ini bertindak sebagai **"Lampu Lalu Lintas"** bagi Admin Sales.

### A. Protokol Peringatan Dini (The Soft-Lock)

Sistem secara otomatis mengecek kesehatan utang piutang Salon sebelum mereka mengirim pesanan baru.

- **Logika Bisnis:**
Setiap kali Salon Login, sistem mengecek ke database Keuangan:
`Sisa Limit Kredit` = `Plafon Kredit` - `Total Tagihan Belum Lunas`
- **Tampilan Visual ke User (Salon):**
    - **Lampu Hijau (Aman):** Jika pesanan masih di bawah limit, tombol "Kirim Order via WhatsApp" muncul normal.
    - **Lampu Kuning (Over Limit):** Jika pesanan melebihi limit, tombol berubah menjadi **"Ajukan Approval Limit"**. User tetap bisa kirim order, tapi sadar bahwa mereka sedang "meminta tolong".
- **Info untuk Admin (Intelligence):**
Pesan WA yang masuk ke Admin Sales otomatis memiliki tanda peringatan:
**`[PERINGATAN SISTEM: KREDIT MELEBIHI LIMIT | SELISIH: Rp -2.500.000]`**
    - *Manfaat Bisnis:* Sales Admin tidak perlu telepon bagian Keuangan (yang memakan waktu) untuk tanya status salon. Keputusan bisa diambil detik itu juga berdasarkan data valid.

### B. Aturan Pembayaran Berdasarkan Status (Tier Dictionary)

*Revisi V3.2: Standardisasi Nomenklatur (Mapping Business vs System)*

Untuk menghilangkan kebingungan antara istilah Marketing dan Kode Sistem, berikut adalah pemetaan bakunya:

| Business Name (Marketing) | System Enum Code | Payment Term Rule |
| --- | --- | --- |
| **New Partner** | `TIER_SILVER` | **CBD (Cash Before Delivery)**. Wajib lunas sebelum kirim. |
| **Verified Partner** | `TIER_GOLD` | **TOP-14 (Net 14 Days)**. Pengiriman langsung, tagihan menyusul. |
| **Priority Partner** | `TIER_PLATINUM` | **TOP-30 (Net 30 Days)**. Pengiriman prioritas + Limit Fleksibel. |

## 3. TATA KELOLA DISTRIBUSI: MANAJEMEN SLA & WILAYAH

**Tujuan:** Melindungi Sub-Distributor Daerah sekaligus menjaga Nama Baik Brand Pusat.

### A. Pelacakan Lead (Jejak Digital Order)

Masalah utama transaksi via WhatsApp adalah datanya sering hilang atau tidak tercatat ("Dark Social"). Sistem ini mengubahnya:

- **Pencatatan Waktu (T-Zero):** Saat tombol "Kirim WA" ditekan, sistem mencatat detik itu sebagai waktu masuknya order. Manajemen Pusat bisa melihat: *"Ada 50 order masuk ke Distributor Surabaya hari ini, tapi baru 10 yang direspon."*

### B. Protokol Eskalasi Bertahap (The Soft-Failover)

Alih-alih langsung mengambil alih order (yang bisa membuat Sub-Distributor marah), sistem menerapkan mekanisme **"Teguran Bertingkat"**.

- **Fase 1 - Penugasan Wilayah:**
Jika User dari Surabaya -> Order diteruskan ke WA Sub-Distributor Surabaya.
- **Fase 2 - Peringatan (Jam ke-18):**
Jika status order di dashboard belum berubah menjadi "Sedang Proses", sistem mengirim **Notifikasi Pengingat** ke Manajer Sub-Distributor.
- **Fase 3 - Intervensi Supervisi (Jam ke-24):**
Jika 24 jam tidak ada respon, sistem **TIDAK** langsung mengambil alih, melainkan mengirim notifikasi ke **Admin Pusat (HQ)**: *"Order #123 di Surabaya macet 24 jam. Mohon hubungi Distributor atau ambil alih."*

### C. Integritas Stok & Resilience (Degraded Mode)
*Revisi V3.3: Protokol Anti-Mati (High Availability)*

1.  **Strategi Safety Buffer:**
    - `Display_Stock` = `ERP_Stock` - `Safety_Buffer`.
    - Perhitungan ini dilakukan di **Backend** (Server-side enforcement).

2.  **Degraded Mode (ERP Heartattack Protocol):**
    - Jika koneksi ERP putus, sistem **TIDAK BOLEH MATI**.
    - Sistem otomatis beralih ke Cache Terakhir.
    - Tombol Order tetap aktif, namun dengan flag `PENDING_SYNC`.

3.  **SLA Sinkronisasi Stok (Service Level Agreement):**
    - **Sync Interval:** Setiap **15 menit** (scheduled job).
    - **Maximum Acceptable Delay:** 30 menit.
    - **User Communication:** Jika delay > 30 menit, tampilkan banner: *"Data stok terakhir diperbarui X menit lalu"*.

4.  **KPI Integritas Data (Weekly Reconciliation):**
    - Audit otomatis mingguan antara Stok Fisik (ERP) dan Stok Digital (Web).
    - **Target:** Selisih < 1%.
    - **Escalation:** Jika selisih > 5%, trigger notifikasi ke Admin untuk investigasi.

**Tujuan:** Mencegah Salon kecewa karena memesan barang yang fisiknya sudah habis (akibat jeda update stok).

Kami tidak menampilkan stok "mentah" dari gudang, melainkan stok yang sudah dikurangi **Stok Pengaman (Buffer)**.

- **Logika Dasar:** `Display_Stock` = `ERP_Stock` - `Safety_Buffer`.
- **Algoritma Safety Buffer (Per SKU):**
    1. **Fast Moving SKU (Shampoo/Oxidant):**
        - *Definisi:* Produk dengan frekuensi penjualan > 50 transaksi/bulan.
        - *Rumus:* `Buffer = CEILING(Average_Daily_Sales_Last_30_Days * 3)`.
        - *Penjelasan:* Kami menahan stok setara **3 hari penjualan rata-rata** (berdasarkan data 30 hari terakhir rolling window) untuk mengantisipasi lonjakan mendadak saat jeda sinkronisasi.
    2. **Slow Moving SKU (Fashion Color):**
        - *Definisi:* Produk dengan frekuensi penjualan < 10 transaksi/bulan.
        - *Rumus:* `Buffer = Fixed Value (2 Units)`.
        - *Penjelasan:* Buffer statis cukup untuk barang lambat.

## 4. PROGRAM LOYALITAS: MESIN PERTUMBUHAN PARTNER

**Tujuan:** Mengunci kesetiaan Salon bukan dengan diskon murah, tapi dengan penghargaan eksklusif yang terhitung otomatis.

### A. Mekanisme "Multiplier" (Pengali Poin)

Memberikan alasan matematis bagi salon untuk mengejar status Tier Platinum (yang kewenangannya dipegang Owner).

| Level Tier (System Enum) | Kecepatan Poin (Multiplier) | Simulasi Belanja Rp 1 Juta |
| --- | --- | --- |
| **TIER_SILVER** | **1.0x (Baseline)** | Dapat 100 Poin |
| **TIER_GOLD** | **1.2x (Accelerated)** | Dapat 120 Poin |
| **TIER_PLATINUM** | **1.5x (Max Velocity)** | Dapat 150 Poin |
- *Dampak:* Partner Platinum merasa jauh lebih dihargai karena reward mereka terkumpul 50% lebih cepat dibanding salon biasa.

### B. Aturan Main yang Ketat (Strict Earning Rules)

Poin bukan bagi-bagi hadiah cuma-cuma, tapi insentif perilaku.

1. **Syarat Invoice:** Poin hanya cair jika status Invoice **LUNAS (Paid)**.
2. **Minimum Belanja:** Poin hanya dihitung jika nilai transaksi per nota > **Rp X (Threshold)**. Ini mencegah salon memecah order menjadi kecil-kecil yang merepotkan logistik.

### C. Menu Penukaran Tetap (Fixed Redemption)

Menghapus negosiasi hadiah yang membingungkan. Katalog penukaran bersifat pasti:

1. **Potongan Tagihan:** 1.000 Poin = Voucher Rp 100.000.
2. **Aset Bisnis:** Hairdryer, Apron, Trolley (Barang yang mendukung produktivitas salon).
3. **Edukasi:** Tiket Seminar/Workshop Gratis.

## 5. STRATEGI ADOPSI: PENDAMPINGAN DIGITAL

**Tujuan:** Mengatasi gaptek pada pemilik salon konvensional tanpa memaksa mereka belajar sendiri.

### A. Fitur Pendampingan Sales (Agent Assist / Shadow Mode)

Fitur ini mengubah Salesman lapangan menjadi "Mentor Digital".

- **Cara Kerja:**
Salesman Login di Tablet mereka -> Masuk ke menu "Kelola Klien" -> Pilih Salon Budi -> Tampilan layar berubah seolah-olah Salesman adalah Pemilik Salon Budi.
- **Skenario Lapangan:**
Salesman duduk bersama Owner Salon, input order bersama-sama di tablet.
    - *Hasil 1:* Order masuk secara digital (rapi, tercatat sistem).
    - *Hasil 2:* Owner Salon belajar cara pakai aplikasi secara langsung.
    - *Hasil 3:* Salesman tetap dapat komisi (Sistem mencatat: Order Salon Budi, *Assisted by* Salesman A).

### B. Visualisasi Penghematan (Kunci Psikologis)

Untuk mencegah tawar-menawar di WhatsApp, sistem menampilkan "Bukti Keuntungan" di ringkasan order.

- **Tampilan:***"Harga Pasar: Rp 1.500.000""Harga Spesial Partner: Rp 1.350.000"***"ANDA HEMAT: Rp 150.000 (Benefit Gold)"**
- *Dampak:* Salon merasa sudah mendapatkan "Best Price" sehingga sungkan untuk menawar lagi.

### C. Data Profil Mitra (Partner Profiling)

*Revisi V3.4: Holistic View - Inspired by Annex Cloud*

**Tujuan:** Mengumpulkan data profil Salon secara bertahap untuk segmentasi dan personalisasi.

**Data yang Dikumpulkan:**

| Field | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| `salon_type` | Enum | BARBER, BRIDAL, UNISEX, OTHER |
| `chair_count` | Integer | Jumlah kursi (ukuran bisnis) |
| `specialization` | Text | Spesialisasi (Coloring, Keratin, dll) |

**Mekanisme Pengumpulan:**
1. **Saat Registrasi:** Form wajib isi Jenis Salon.
2. **Progressive:** Field opsional bisa diisi kemudian di Profile Page.

## 6. STRATEGI DATA RITEL: DATABASE PELANGGAN

Meskipun penjualan ritel (eceran) dibuang ke Shopee demi efisiensi, kita tetap butuh data siapa pembeli produk kita.

### A. Loop Garansi QR Code

- **Taktik:** Tempel stiker QR Code pada kemasan produk: *"Scan untuk Pastikan Keaslian & Menangkan Hadiah Bulanan"*.
- **Hasil:** Konsumen scan -> Masuk Landing Page -> Isi Data (Nama, No HP, Jenis Rambut).
- **Aset:** PT. Alfa memiliki database ribuan pemakai akhir (End-User) yang bisa dipakai untuk riset produk baru, tanpa perlu pusing kirim barang satu per satu.

## 7. PENUTUP STRATEGIS

Dokumen Versi 3.4 ini adalah cetak biru yang **Siap Eksekusi**, **Resilient**, dan **Agile**.

Arsitektur ini:

1. **Aman secara Politik:** Tidak melangkahi Sub-Distributor (via Protokol Eskalasi).
2. **Aman secara Finansial:** Memfilter risiko kredit di awal (via Sistem Lampu Merah/Hijau).
3. **Kuat secara Retensi:** Mengikat partner dengan Poin Multiplier.
4. **Mudah Diadopsi:** Didukung fitur pendampingan oleh Salesman.

Ini adalah solusi teknologi yang tunduk pada kearifan bisnis PT. Alfa Beauty Cosmetica.

## 8. KONFIGURASI AGILE (ADMIN PANEL)

*Revisi V3.4: Agile Deployment - Inspired by Annex Cloud*

**Tujuan:** Memungkinkan perubahan konfigurasi bisnis tanpa deploy ulang aplikasi.

**Konfigurasi yang Dapat Diubah via Admin Panel:**

| Config Key | Default | Deskripsi |
| :--- | :--- | :--- |
| `loyalty.multiplier.silver` | 1.00 | Point multiplier Tier Silver |
| `loyalty.multiplier.gold` | 1.20 | Point multiplier Tier Gold |
| `loyalty.multiplier.platinum` | 1.50 | Point multiplier Tier Platinum |
| `order.minimum_threshold` | 500.000 | Minimum order untuk dapat poin (IDR) |
| `stock.sync_interval_minutes` | 15 | Interval sync stok dari ERP |

**Manfaat:**
- Marketing bisa adjust multiplier saat kampanye tanpa menunggu IT.
- Perubahan berlaku dalam hitungan menit, bukan hari.