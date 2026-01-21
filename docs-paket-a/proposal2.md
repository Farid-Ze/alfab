## PROPOSAL PEKERJAAN
## Paket A — Website B2B + Lead Capture (WhatsApp + Become Partner)

**Ditujukan kepada:** Bapak Edy (Owner) — PT. Alfa Beauty Cosmetica  
**Disusun oleh:** Farid & Danan (Vendor)  
**Tanggal:** 20 Januari 2026  
**Masa berlaku penawaran:** 14 hari kalender  

Dokumen ini memuat ruang lingkup, deliverables, kriteria penerimaan (UAT), jadwal kerja, biaya, biaya operasional, maintenance, dan termin pembayaran.

---

## 1) Ringkasan untuk persetujuan

| Item | Nilai |
|---|---|
| Paket | **Paket A** — Website B2B + Lead Capture |
| Timeline delivery | **3 minggu kalender** |
| Fixed Price (tanpa PPN) | **Rp 11.850.000** |
| Total effort | **39,50 MD** (316 jam; 1 MD = 8 jam) |
| Hosting | **Vercel Free/Hobby (Rp 0)** |
| Penyimpanan lead | **Supabase (database)** |
| Notifikasi lead | **Email internal Perusahaan** |
| Deliverability email notifikasi | **SPF/DKIM/DMARC** (setup DNS) |
| Export data | **Download CSV** |
| CMS | **Headless CMS (free tier)** |
| Analytics & Search | **GA4 + Google Search Console** |
| Garansi bug fix | **90 hari kalender (3 bulan)** |

---

## 2) Tujuan & hasil
Website ini berfungsi sebagai alat bantu sales/BD untuk meningkatkan trust, memperjelas katalog produk tanpa harga publik, dan menghasilkan leads melalui WhatsApp dan Become Partner.

Hasil yang diterima Perusahaan:
- struktur halaman rapi dan konsisten (mobile–desktop),
- CTA WhatsApp selalu tersedia dan berfungsi,
- lead Become Partner tersimpan di database dan dapat diproses tim internal (notifikasi email + export CSV).

---

## 3) Ruang lingkup

### 3.1 In-scope
- Halaman publik: Home, Products (overview + detail), Education/Events (listing), Education detail (event & article), Partnership landing, Become Partner, About, Contact, Legal bundle (Privacy + Terms), dan 404.
- Responsive dan accessibility dasar.
- SEO dasar: meta, robots, sitemap, social metadata minimal.
- Tracking konversi: klik WhatsApp dan submit lead.
- Become Partner lead capture: validasi server-side, anti-spam minimum, tersimpan di Supabase, notifikasi email internal, export CSV.
- Integrasi CMS (free tier) untuk konten teks/gambar yang disepakati.
- Setup GA4 (event konversi dasar) dan Google Search Console (verifikasi + submit sitemap).
- CTA WhatsApp (nomor Indonesia + pesan prefill).
- Bilingual (ID/EN) untuk seluruh halaman in-scope, termasuk terjemahan EN oleh Vendor.
- Handover: dokumentasi teknis + 1 sesi pelatihan (± 60 menit).

### 3.2 Out-of-scope
- Harga publik, tier pricing, diskon volume, loyalty.
- Login partner/admin (dashboard) selain mekanisme export CSV.
- Cart/inquiry builder + workflow order.
- Integrasi ERP/CRM.
- Pengadaan domain dan email perusahaan.
- CMS workflow kompleks (multi-level approvals, role-based editorial workflow).

### 3.3 Perubahan ruang lingkup
Perubahan fitur/halaman di luar in-scope diproses sebagai Change Request (estimasi waktu/biaya dan persetujuan tertulis sebelum dikerjakan).

---

## 4) Deliverables (yang diterima Perusahaan)
1) Website B2B siap rilis sesuai ruang lingkup.
2) Katalog produk: rapi, dapat difilter, tanpa harga publik.
3) Jalur konversi: WhatsApp CTA dan form Become Partner.
4) Lead pipeline: validasi + anti-spam, tersimpan di Supabase, notifikasi email internal, export CSV.
	- Deliverability email notifikasi: Vendor menyiapkan panduan dan melakukan verifikasi konfigurasi DNS domain pengirim (**SPF/DKIM/DMARC**) bersama PIC IT Perusahaan.
	- Backup data Supabase: Vendor menyiapkan skrip backup terjadwal (atau instruksi manual yang jelas) dan langkah restore yang terdokumentasi.
5) Integrasi CMS (free tier) untuk konten yang disepakati.
6) GA4 + Search Console terpasang dan tervalidasi.
7) Dokumentasi handover + 1 sesi pelatihan (± 60 menit).

### 4.1 Kepemilikan aset digital
- Kepemilikan kode sumber: seluruh kode implementasi yang dibuat Vendor untuk proyek ini diserahkan kepada Perusahaan pada saat handover (akses repositori, struktur proyek, dan cara build/deploy).
- Aset desain: file desain editable (Figma) diserahkan kepada Perusahaan.
- Kepemilikan akun: akun/akses Vercel, Supabase, CMS, GA4/GSC, dan Figma berada di pihak Perusahaan; Vendor sebagai collaborator selama implementasi.

---

## 5) Kriteria penerimaan (UAT)
Pekerjaan dinyatakan selesai jika seluruh item UAT berikut dinyatakan PASS.

- UAT-01 — Homepage: value proposition terlihat, CTA dapat diklik, logo/brand tampil di mobile & desktop.
- UAT-02 — Products overview: kategori & grid produk tampil; tidak ada harga.
- UAT-03 — Filter: hasil berubah sesuai filter; reset filter bekerja; empty-state jelas.
- UAT-04 — Product detail: struktur konten rapi; CTA WhatsApp tersedia.
- UAT-05 — WhatsApp contact: klik CTA membuka WA/deep link; fallback tersedia bila device tidak mendukung.
- UAT-06 — Become Partner: submit valid sukses; consent wajib; validasi nomor WA bekerja.
- UAT-07 — Education/Events: listing rapi; CTA register/WA berfungsi.
- UAT-08 — Bilingual: ID/EN tersedia dan seluruh halaman in-scope dapat diakses di kedua bahasa.
- UAT-09 — SEO: title/meta sesuai; sitemap.xml dan robots.txt dapat diakses.
- UAT-10 — Performance: halaman utama tetap ringan pada simulasi koneksi lambat; gambar teroptimasi.
- UAT-11 — Lead persistence + email: submit valid sukses; record tersimpan di database; notifikasi email masuk.
- UAT-12 — Lead export: Owner/PIC dapat mengunduh data lead sebagai file CSV.
- UAT-13 — Tracking + GA4: event klik WA dan submit lead terlihat di GA4 (Realtime/DebugView).
- UAT-14 — Search Console: situs terverifikasi dan sitemap tersubmit.
- UAT-15 — Static pages: About/Contact/Privacy/Terms dapat diakses; link tidak broken.
- UAT-16 — 404: URL tidak ada menampilkan halaman 404 user-friendly.
- UAT-17 — CMS editing: perubahan teks/gambar yang disepakati dapat dilakukan melalui CMS dan tampil di produksi.
- UAT-18 — Handover & training: dokumentasi diserahkan dan sesi pelatihan dilakukan.
- UAT-19 — Social metadata: OpenGraph + Twitter card ada (Home + Product detail), tidak kosong/invalid.

---

## 6) Jadwal kerja
Timeline delivery: 3 minggu kalender.

- Minggu 1: finalisasi ruang lingkup & UAT, setup Supabase/CMS/GA4/GSC, implementasi struktur halaman inti.
- Minggu 2: Products overview + detail, Partnership/Become Partner, export CSV, bilingual ID/EN.
- Minggu 3: UAT end-to-end, perbaikan minor, go-live, handover (dokumen + training).

### 6.1 Garansi
- 90 hari kalender sejak go-live: bug fix untuk defect yang terverifikasi berasal dari implementasi Vendor pada scope Paket A.
- Garansi tidak mencakup penambahan fitur/halaman baru, perubahan konten besar, atau perubahan akibat kebijakan/platform pihak ketiga.

---

# 7) Biaya (Fixed Price)

## 7.1 Ringkasan harga
| Paket | Fixed Price (tanpa PPN) | Timeline |
|---|---:|---|
| Paket A | **Rp 11.850.000** | 3 minggu |

## 7.2 Base rate & effort
- Base rate: Rp 300.000/MD (1 MD = 8 jam = Rp 37.500/jam)
- Total effort: 39,50 MD = 316 jam

**Baseline yang digunakan di dokumen ini:** **Baseline (Likely)** (estimasi realistis untuk delivery in-scope + verifikasi UAT).

## 7.3 Rincian effort (Baseline — Likely)
Asumsi (Baseline — Likely):
- 12 template halaman publik untuk delivery (Home, Products Overview, Product Detail, Education Listing, Education Event Detail, Education Article Detail, Partnership Landing, Become Partner, About, Contact, Legal bundle, 404).
- Bilingual (ID/EN) berlaku untuk seluruh halaman in-scope.
- Jalur kritikal yang diverifikasi pada UAT: WA CTA, submit lead (DB + email), export CSV, tracking events/GA4, i18n, SEO dasar.

| Workstream | MD | Subtotal |
|---|---:|---:|
| Setup proyek & scaffolding | 1,25 | 375.000 |
| UI/halaman publik (Home, About, Contact, legal bundle, 404) | 5,50 | 1.650.000 |
| Products overview (listing + filter + state) | 5,25 | 1.575.000 |
| Product detail (struktur, CTA, blocks) | 4,25 | 1.275.000 |
| Education/Events listing | 2,00 | 600.000 |
| i18n/bilingual (ID/EN) | 3,00 | 900.000 |
| SEO dasar (meta, sitemap, robots, social metadata) | 1,75 | 525.000 |
| Tracking konversi + setup GA4/GSC | 1,25 | 375.000 |
| Lead pipeline (Supabase + email notif + export CSV + anti-spam) | 4,00 | 1.200.000 |
| QA/UAT (evidence + bugfix minor) | 3,00 | 900.000 |
| PM, koordinasi, handover & pelatihan | 3,00 | 900.000 |
| Kontinjensi risiko & iterasi UAT (Likely) | 5,25 | 1.575.000 |
| **TOTAL** | **39,50** | **11.850.000** |

---

## 8) Biaya operasional (OpEx)
| Komponen | Estimasi |
|---|---:|
| Hosting website (Vercel Free/Hobby) | Rp 0 |
| Supabase (Free tier) | Rp 0* |
| Headless CMS (Free tier) | Rp 0* |
| GA4 & Google Search Console | Rp 0 |

\* Mengikuti batas penggunaan Free tier. Jika kebutuhan meningkat, Perusahaan dapat melakukan upgrade plan sesuai kebutuhan.

---

## 9) Hosting
Hosting yang digunakan: Vercel Free/Hobby.

---

## 10) Kepatuhan hukum & keamanan data — UU PDP
Pengamanan data calon partner pada jalur Become Partner:
1) Enkripsi in-transit melalui HTTPS (TLS).
2) Validasi server-side & minimisasi data; consent diwajibkan.
3) Anti-spam & rate limit.
4) Penyimpanan terpusat di Supabase.
5) Email sebagai notifikasi operasional, bukan satu-satunya penyimpanan data.
6) Kontrol akses: akses admin dibatasi pada PIC; secret tidak disimpan di repositori.
7) Deliverability email notifikasi: konfigurasi DNS domain pengirim (SPF/DKIM/DMARC) disiapkan agar notifikasi lead tidak mudah masuk Spam/Junk.
8) Backup & pemulihan data: prosedur backup Supabase disiapkan (jadwal backup + lokasi penyimpanan + instruksi restore) untuk mitigasi risiko kesalahan manusia (mis. data terhapus tidak sengaja).

---

## 11) Maintenance & support
Maintenance adalah layanan bulanan terpisah (di luar Fixed Price) untuk perubahan ringan dan menjaga jalur konversi (WA/lead) tetap sehat.

### Paket M2 — Light (Rp 100.000/bulan)
**Cakupan:**
- hingga 4× perubahan konten kecil per bulan,
- perbaikan bug minor yang jelas (bila ada),
- koordinasi singkat.

**Definisi perubahan konten kecil (contoh):**
- ganti teks singkat,
- ganti 1–2 gambar kecil,
- update link/nomor WhatsApp/pesan prefill,
- koreksi minor data produk.

**Batasan:** kuota kerja total hingga 1 jam/bulan; kuota tidak rollover.

**SLA respon:** next business day (hari kerja)

### Paket M3 — Managed (Rp 1.200.000/bulan)
**Cakupan:**
- seluruh cakupan M2,
- prioritas perbaikan jalur lead/WA (bug yang berdampak konversi),
- 1× minor release/bulan bila ada perubahan yang menyentuh jalur konversi,
- review ringan stabilitas dan pengecekan deliverability email bila ada indikasi gangguan.

**Batasan:** kuota kerja total hingga 4 MD/bulan (32 jam); kuota tidak rollover.

**SLA respon:** ≤ 8 jam kerja (business hours)

---

## 12) Pembayaran
- 40% saat ruang lingkup dan UAT disepakati,
- 40% saat staging siap untuk UAT,
- 20% saat go-live.

---

## 13) Data yang dibutuhkan dari Perusahaan

### A) Identitas brand & aset
1) Logo (SVG/PNG)
2) Warna brand/brand guideline (bila ada)
3) Daftar foto/asset yang boleh dipublikasikan

### B) Konten perusahaan
4) Profil singkat perusahaan
5) Daftar brand + deskripsi singkat per brand

### C) Katalog produk (minimum)
6) Kategori produk
7) Data minimum per produk: nama, deskripsi singkat, foto

### D) Education/Events
8) Data minimal event/article: judul, tanggal (jika event), ringkasan, CTA/link

### E) Partnership / Become Partner
9) Kriteria partner
10) Field form yang disepakati

### F) WhatsApp CTA
11) Nomor WhatsApp (+62…)
12) Pesan prefill

### G) Domain & koordinasi go-live
13) Domain publik: `alfabeautycosmetica.com`
14) PIC IT yang memegang akses DNS/SSL saat go-live
15) PIC IT yang memegang akses DNS untuk setup record email (**SPF/DKIM/DMARC**) pada domain pengirim notifikasi

### H) Akses teknis
16) Akses Supabase (PIC owner)
17) Akses Google (GA4 & Search Console) (PIC owner)
18) Akses CMS (PIC owner)

### I) Bilingual (ID/EN)
19) Daftar istilah yang wajib dipertahankan
20) Preferensi gaya bahasa EN (formal B2B)

---

## 14) Persetujuan
Dengan menandatangani bagian ini, Perusahaan menyetujui ruang lingkup, UAT, jadwal, biaya, dan termin pembayaran pada dokumen ini.

| Field | Value |
|---|---|
| Status | APPROVED / PENDING |
| Approved by | Bapak Edy |
| Approval date |  |
| Approval method |  |
| Keterangan |  |
