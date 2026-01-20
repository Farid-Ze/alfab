## PROPOSAL PEKERJAAN
## Paket A — Website Professional B2B + Lead Capture (WhatsApp + Become Partner)

**Ditujukan kepada:** Bapak Edy (Owner) — PT. Alfa Beauty Cosmetica  
**Disusun oleh:** **Farid & Danan** (Vendor)  
**Tanggal:** 20 Januari 2026  
**Status:** Final (penawaran; berlaku setelah persetujuan tertulis)  
**Masa berlaku penawaran:** 14 hari kalender sejak tanggal dokumen

Dokumen ini adalah acuan komersial untuk: **scope**, **deliverables**, **UAT (checklist penerimaan)**, **timeline**, **biaya**, dan **termin pembayaran**.

---

## 0) Ringkasnya
Bapak Edy akan mendapatkan website B2B yang:
1) **Terlihat profesional** (positioning jelas, brand portfolio rapi)  
2) **Mudah dipakai calon partner** untuk melihat produk (tanpa harga publik)  
3) **Menghasilkan leads** lewat WhatsApp dan jalur Become Partner

Di proposal ini Vendor menawarkan **1 paket eksekusi** (lihat bagian 3 & 9):
- **Paket A (Final / production-ready):** jalur Become Partner **terkirim ke email internal Perusahaan** (tanpa database di sistem Vendor).

**Yang perlu disetujui (Owner):** scope halaman, UAT (checklist penerimaan), biaya, dan termin pembayaran.

**Keputusan yang sudah ditetapkan pada proposal ini (agar tidak ambigu):**
- Hosting: Vercel Pro
- Jalur Become Partner: **email internal Perusahaan**

**Cara membaca:**
- Bagian 3–5: scope & UAT (definisi “selesai”)
- Bagian 8–11: timeline, biaya, OpEx, maintenance, pembayaran

---

## 0A) Tim pelaksana (Vendor)
Untuk memastikan pekerjaan berjalan rapi (delivery + komunikasi + keputusan cepat), pelaksana proyek adalah:
- **Farid**
- **Danan**

---

## 1) Latar belakang & tujuan
Website ini bukan “sekadar profil perusahaan”, tapi alat bantu sales/BD untuk:
- mengurangi pertanyaan berulang,
- mempercepat calon partner memahami produk/brand,
- mengarahkan prospek ke **jalur kontak yang cepat** (WhatsApp) atau **jalur follow-up yang rapi** (Become Partner).

**Target hasil (outcome):**
- Pengunjung paham value Alfa Beauty dalam hitungan detik.
- Pengunjung bisa melihat produk dengan struktur yang jelas.
- Pengunjung “tidak bingung harus kontak kemana”: CTA WhatsApp selalu tersedia.
- Lead dari Become Partner bisa diproses tim internal (email masuk ke inbox internal, ada proteksi spam minimum).

---

## 2) Nilai bisnis (bahasa Owner)
Yang “Bapak beli” dari Paket A:
- **Brand trust:** tampilan dan struktur B2B yang tegas.
- **Katalog tanpa perang harga:** produk bisa ditemukan tanpa menampilkan harga.
- **Konversi terukur:** klik WhatsApp dan submit lead bisa dipantau.
- **Jalur follow-up rapi:** lead dianggap sukses hanya jika **submit tervalidasi** dan **email masuk ke inbox internal** (divalidasi pada UAT).

Jalur WhatsApp tetap menjadi CTA utama; Paket A menambahkan jalur Become Partner yang tervalidasi dan terkirim ke inbox internal agar follow-up B2B lebih rapi tanpa menambah beban sistem.

---

## 3) Ruang lingkup (jelas & anti-salah paham)
### 3.1 In-scope (Paket A — Final / production-ready)
- Halaman publik: **Home**, **Products (overview + detail)**, **Education/Events (listing)**, **Partnership/Become Partner**, **About**, **Contact**, **Privacy Policy**, **Terms**, **404**.
- Responsive (mobile–desktop) + baseline accessibility.
- SEO dasar (meta, robots, sitemap) + social metadata minimal.
- Event tracking konversi (klik WhatsApp, submit lead).
- Lead capture Become Partner yang:
  - ada validasi (server-side),
  - ada anti-spam minimum,
  - **terkirim ke email internal Perusahaan**.
- CTA WhatsApp ke **nomor WhatsApp Indonesia** + **pesan prefill**.
- **Bilingual (ID/EN) / i18n** untuk **semua halaman in-scope**.
  - **Terjemahan Bahasa Inggris (EN) menjadi tanggung jawab Vendor** (Farid & Danan) agar konsisten dan mendukung **SEO basic**.
  - Konten Bahasa Indonesia (ID) tetap bersumber dari materi/pernyataan resmi perusahaan (bagian 12).

### 3.2 Out-of-scope (tidak termasuk)
- Harga publik, tier pricing, diskon volume, loyalty.
- Login partner/admin (private dashboard).
- Cart/inquiry builder + workflow order.
- Integrasi ERP/CRM (kecuali nanti ada change request).
- Pengadaan domain/email perusahaan (tidak diperlukan pada proposal ini).

### 3.3 Kontrol perubahan (Change Request)
Setelah **Scope Freeze**, penambahan fitur di luar scope diproses sebagai Change Request:
- kami jelaskan dampak waktu/biaya,
- Bapak Edy approve dulu,
- baru dikerjakan.

**Ketentuan:**
- Setelah Scope Freeze, UAT (bagian 5) menjadi acuan penerimaan.
- Perubahan pada jalur kritikal (lead delivery, security, operasional) wajib melalui Change Request karena berdampak pada risiko dan verifikasi.

---

## 4) Deliverables (yang Bapak terima)
1) **Website siap rilis** sesuai halaman in-scope.  
2) **Katalog produk** rapi, bisa difilter, tanpa harga publik.  
3) **Jalur konversi:**
   - WhatsApp CTA (nomor + prefill),
   - Become Partner form (valid/invalid state jelas).  
4) **Lead pipeline**:
  - lead tervalidasi, spam ditekan, dan terkirim ke email internal Perusahaan.
5) **Dokumentasi operasional singkat**: checklist go-live dan prosedur triage bila ada kendala jalur lead.

**Bukti verifikasi (diserahkan saat UAT):**
- Evidence UAT (screenshot/log/test output) untuk jalur kritikal: WhatsApp CTA dan submit lead (termasuk bukti email masuk ke inbox internal).

**Prasyarat konten:** go-live mengikuti kesiapan materi final Perusahaan.

---

## 5) Kriteria penerimaan (UAT) — inilah yang perlu Bapak approve
Bagian ini adalah checklist penerimaan agar jelas apa yang disebut “selesai”.

- **UAT-01 — Homepage positioning**: hero value proposition terlihat; CTA “Explore Products” & “Become Partner” dapat diklik; logo brand tampil (mobile & desktop).
- **UAT-02 — Products overview navigation**: kategori tampil; grid produk tampil; tidak ada harga.
- **UAT-03 — Filter brand/fungsi/audience**: hasil berubah sesuai filter; reset filter bekerja; empty-state jelas.
- **UAT-04 — Product detail decision support**: header+brand+kategori tampil; benefits/use-cases/how-to-use ringkas; CTA WhatsApp tersedia.
- **UAT-05 — WhatsApp contact**: klik CTA membuka WA/deep link; fallback contact tersedia jika device tidak support.
- **UAT-06 — Become Partner lead form**: submit valid sukses + success state; submit tanpa consent ditolak; nomor WA invalid ditolak dengan pesan jelas.
- **UAT-07 — Education/events**: listing rapi; CTA register/WA berfungsi.
- **UAT-08 — Responsive & basic accessibility**: layout tidak pecah di mobile/tablet/desktop; fokus keyboard terlihat; **pilihan bahasa (ID/EN) tersedia dan seluruh halaman in-scope dapat diakses di kedua bahasa tanpa merusak navigasi**.
- **UAT-09 — SEO basics**: title/meta sesuai; `sitemap.xml` & `robots.txt` dapat diakses.
- **UAT-10 — Performance sanity**: home tetap ringan pada simulasi koneksi lambat; gambar teroptimasi.
- **UAT-11 — Lead delivery reliability (email internal)**: submit valid sukses + email masuk; throttle/rate limit bekerja; payload invalid ditolak server-side.
- **UAT-12 — Tracking events**: event klik WhatsApp dan submit lead tercatat sesuai naming yang disepakati.
- **UAT-13 — Legal & static pages**: About/Contact/Privacy/Terms dapat diakses; link tidak broken.
- **UAT-14 — 404**: URL tidak ada menampilkan 404 user-friendly + navigasi kembali.
- **UAT-15 — Social metadata**: OpenGraph + Twitter card ada (Home + Product detail), tidak kosong/invalid.

**Ketentuan penerimaan:**
- UAT adalah definisi “DONE”. Jika UAT belum PASS, deliverable belum boleh diklaim selesai.
- Evidence UAT diserahkan sebagai bagian dari penerimaan.

**Persetujuan UAT (Owner):**
| Field | Value |
|---|---|
| Status | PENDING / APPROVED |
| Approved by | Bapak Edy |
| Approval date |  |
| Approval method |  |
| Notes |  |

---

## 6) Metode kerja (tahapan delivery)
**Pendekatan:** staging-first dan berbasis checklist UAT.

### Tahap 1 — Scope Freeze (mulai pekerjaan)
- Finalisasi halaman in-scope/out-of-scope.
- Finalisasi UAT (bagian 5).
- Finalisasi CTA WhatsApp (nomor + prefill).
- Konfirmasi hosting (bagian 9.8).

### Tahap 2 — Implementasi bertahap (Staging)
- Kami bangun halaman dan fitur sesuai urutan prioritas (Home → Products → Detail → Partnership).
- Setiap progres ditunjukkan di staging untuk review cepat.

### Tahap 3 — UAT & perbaikan
- Eksekusi UAT sesuai paket yang dipilih.
- Perbaikan bug minor dan polishing.

### Tahap 4 — Go-live
- Rilis produksi.
- Verifikasi jalur WA + 1 submit jalur konversi sesuai paket.
- Monitoring awal pasca rilis.

**Garansi bug fix pasca go-live (tertulis):**
- **30 hari kalender** sejak tanggal go-live: Vendor melakukan **bug fix** untuk defect yang terverifikasi berasal dari implementasi Vendor pada scope Paket A.
- Garansi ini **tidak** mencakup perubahan scope/fitur baru, perubahan konten besar, atau perubahan akibat kebijakan/platform pihak ketiga (mis. perubahan kebijakan WhatsApp, perubahan layanan hosting/vendor).

**Gate penerimaan:**
- **Gate 0 — Scope Freeze**: scope & UAT final.
- **Gate 1 — Staging readiness**: jalur WA + lead submit bisa dites.
- **Gate 2 — UAT PASS**: UAT lulus sesuai paket yang dipilih.
- **Gate 3 — Go-live**: rilis + verifikasi jalur WA + 1 submit jalur konversi (submit valid + verifikasi email masuk ke inbox internal).

---

## 7) Kesiapan teknis saat ini
Persiapan teknis sudah ada untuk mempercepat eksekusi (tanpa membebani Owner dengan detail teknis):
- Frontend modern (Next.js) untuk website publik.
- Jalur lead (untuk Paket A) dirancang dengan validasi server-side, anti-spam minimum, pengiriman ke email internal, dan verifikasi UAT.
- Tersedia prosedur smoke check untuk memastikan jalur kritikal (WA + submit lead) terverifikasi sebelum go-live.

---

## 8) Jadwal kerja (ditetapkan saat mulai pekerjaan)
Jadwal final ditetapkan setelah Scope Freeze dan kesiapan materi minimum dari perusahaan.
Output rilis mengikuti aturan: **Go-live setelah UAT PASS**.

**Timeline yang diajukan (final) sejak mulai pekerjaan + materi minimum tersedia:**
- **Paket A (Final): 3 minggu kalender**
  - Minggu 1: struktur halaman, Home + Products overview + CTA WhatsApp (staging)
  - Minggu 2: Product detail, Partnership/Become Partner + lead delivery (email internal) (staging)
  - Minggu 3: UAT (full), perbaikan minor, hardening, go-live

---

# 9) Biaya (Fixed Price + OpEx yang jelas)
## 9.1 Ringkasan harga (untuk persetujuan)
| Paket | Cocok untuk | Fixed Price (tanpa PPN) | Timeline | Pembeda utama |
|---|---|---:|---|---|
| **Paket A (Final)** | ingin lead tervalidasi dan **terkirim ke email internal** | **Rp 10.275.000** | 3 minggu | lead delivery email internal + bilingual + tracking events |

Harga di atas **tidak termasuk PPN** (sesuai arahan).

## 9.2 Metodologi harga (jelas, tidak mengandalkan “feels”)
Vendor menggunakan pendekatan **cost-based + risk-based** (audit-friendly) karena mencakup jalur kritikal (lead delivery + anti-spam + verifikasi UAT).

## 9.3 Harga Paket A (Final) — rasionalisasi cost/risk-based
### 9.3.1 Base rate (final)
Untuk menghindari perdebatan “tier” dan menjaga perhitungan mudah diaudit, proyek ini memakai **1 base rate**:

- **Rp 300.000 / MD (man-day)**
- Definisi 1 MD = **8 jam kerja**
- Setara **Rp 37.500 / jam**

### 9.3.2 Rekap effort & total biaya (baseline)
Total effort baseline pada proyek ini mengikuti rincian workstream di 9.3.5.

| Item | Nilai |
|---|---:|
| Total effort baseline | **34,25 MD** |
| Konversi jam kerja (34,25 × 8) | **274 jam** |
| Base rate | **Rp 300.000/MD** (Rp 37.500/jam) |
| **Total biaya baseline (CapEx)** | **Rp 10.275.000** |

### 9.3.3 Prinsip Fixed Price
Proposal ini memakai **Fixed Price**.

**Ketentuan:**
- Nilai yang dibayar Owner mengacu ke Fixed Price (bagian 9.3.4).
- Selama Scope Freeze dan UAT (bagian 5) tidak berubah, risiko deviasi effort berada di pihak Vendor.

### 9.3.4 Ringkasan harga yang dibayar Owner (Fixed Price)
Bagian ini menutup pertanyaan paling penting: “Owner membayar berapa, dan angka itu terbentuk dari mana?”

| Item | Nilai (IDR) | Keterangan |
|---|---:|---|
| Biaya baseline (hasil perhitungan 9.3.5) | **Rp 10.275.000** | 34,25 MD × Rp 300.000/MD |
| **Fixed Price — yang dibayar Owner** | **Rp 10.275.000** | scope & UAT tetap |

### 9.3.5 Rincian perhitungan (final untuk proyek ini)
Tabel ini memfinalisasi rincian perhitungan **untuk proyek ini** agar audit-friendly.

**Asumsi hitung (jelas & bisa diaudit):**
- Definisi 1 MD = 8 jam kerja.
- Jumlah template/halaman publik in-scope yang dihitung untuk delivery: **12 template** (Home, Products Overview, Product Detail, Education Hub/Listing, Education Event Detail, Education Article Detail, Partnership Landing, Become Partner Form, About, Contact, Legal/Policy bundle, 404).
- Bilingual (ID/EN) berlaku untuk seluruh halaman in-scope.
- Jalur kritikal yang wajib diverifikasi dan dibuat evidence-nya mengikuti UAT: **WA CTA, submit lead (email internal), tracking events, i18n, SEO basic**.

**Aturan perhitungan (supaya tidak sekadar “feels”):**
- Untuk workstream UI/halaman: MD = (foundation/layout) + (jumlah template/halaman × effort per template) + (responsive+a11y baseline).
- Untuk fitur teknis (i18n/SEO/tracking/lead delivery): MD = (setup plumbing) + (implementasi) + (verifikasi/evidence).
- QA/UAT readiness adalah effort terpisah untuk menjalankan checklist UAT, mengumpulkan evidence, dan menutup bug minor.

| Workstream | MD | Dasar hitung (ringkas) | Rate (IDR/MD) | Subtotal |
|---|---:|---|---:|---:|
| Setup proyek & scaffolding (repo, env, routing dasar) | 1,25 | 0,75 (setup Next.js + struktur) + 0,50 (routing dasar + shared layout) | 300.000 | 375.000 |
| UI/halaman publik (Home, About, Contact, legal bundle, 404) | 6,50 | 2,00 (design system + section components) + 0,75 × 5 template halaman | 300.000 | 1.950.000 |
| Products overview (listing + filter + empty-state) | 5,25 | 2,00 (listing + data model) + 1,50 (filter UX/state) + 0,75 (empty/loading) + 1,00 (polish/responsive) | 300.000 | 1.575.000 |
| Product detail (struktur, CTA, content blocks) | 4,25 | 1,50 (template + blocks) + 1,25 (struktur konten) + 0,75 (CTA + link/route) + 0,75 (polish) | 300.000 | 1.275.000 |
| Education/Events listing (baseline) | 2,00 | 1,25 (listing template) + 0,75 (polish + empty-state) | 300.000 | 600.000 |
| i18n/bilingual (ID/EN) untuk semua halaman in-scope | 3,00 | 1,50 (setup i18n + routing) + 1,00 (implement per template) + 0,50 (QA bahasa + edge cases prioritas) | 300.000 | 900.000 |
| SEO basic (meta, sitemap, robots, social metadata) | 1,75 | 0,75 (meta per template) + 0,50 (sitemap/robots) + 0,50 (OG/Twitter + verifikasi) | 300.000 | 525.000 |
| Tracking konversi (WA click, submit lead) | 1,00 | 0,50 (event tracking) + 0,50 (verifikasi/evidence) | 300.000 | 300.000 |
| Lead form (validasi server-side + anti-spam minimum) | 3,25 | 1,50 (endpoint + validation) + 1,00 (anti-spam/rate limit) + 0,75 (UX success/error states) | 300.000 | 975.000 |
| QA/UAT readiness (regresi dasar + evidence jalur kritikal) | 3,00 | 1,50 (jalankan UAT + evidence) + 1,50 (bugfix minor/polish) | 300.000 | 900.000 |
| PM & koordinasi (scope freeze, review staging, release gate) | 3,00 | komunikasi dipadatkan (asinkron) + gate approval tetap dijaga | 300.000 | 900.000 |
| **TOTAL baseline** | **34,25** |  |  | **10.275.000** |

**Referensi singkat (untuk transparansi):**
- Workstream di atas mencakup delivery + verifikasi (UAT evidence) untuk jalur kritikal (WA + lead delivery + tracking events).
- Jika ada change request setelah Scope Freeze, effort tambahan dihitung terpisah.

### 9.3.6 Validasi harga — konsisten dengan base rate
Tujuan bagian ini: memvalidasi bahwa Fixed Price selaras dengan base rate yang disepakati.

**Basis yang dipakai di proposal ini:**
- 1 MD = 8 jam
- Rp 300.000/MD = Rp 37.500/jam

**Perhitungan (berdasarkan baseline 9.3.5):**
- Total jam kerja: **274 jam**
- 274 jam × Rp 37.500/jam = **Rp 10.275.000**

**Referensi singkat pembanding (untuk konteks):**
- Jika memakai Rp 50.000/jam: 274 × 50.000 = **Rp 13.700.000**
- Jika memakai Rp 75.000/jam: 274 × 75.000 = **Rp 20.550.000**

## 9.5 Jika Perusahaan membutuhkan lead tersimpan + export admin + RUM (scope tambahan)
Jika requirement Perusahaan adalah:
- lead harus **tersimpan durably** (database),
- ada **export admin** (access-controlled),
- dan ada **RUM CWV** (field metrics),

maka scope Paket A pada proposal ini harus ditambah sebagai Change Request (CR) karena dampaknya menyentuh jalur kritikal dan verifikasi.

Rangkuman effort tambahan (mengacu struktur workstream 9.3.5):
- Persist lead + retensi + purge: **+2,00 MD**
- Admin/export endpoint (access-controlled): **+2,00 MD**
- RUM plumbing (CWV): **+2,75 MD**
- Pengetatan i18n edge cases + QA tambahan: **+1,00 MD**
- PM/koordinasi + gate tambahan: **+2,25 MD**

Total tambahan: **+10,00 MD** → **+Rp 3.000.000** (base rate Rp 300.000/MD).

## 9.6 Jika Perusahaan membutuhkan SEO (Standard) sebagai scope tambahan
SEO basic (meta, robots, sitemap, social metadata) sudah termasuk pada Paket A baseline.

Jika requirement Perusahaan adalah SEO yang dikelola secara rutin (bukan hanya setup teknis), yaitu:
- ada **target keyword prioritas** dan mapping ke halaman,
- ada **perbaikan on-page** yang berjalan (title/meta/heading/internal linking/schema bila relevan),
- ada **content guidance** agar tim internal bisa memproduksi konten dengan arah yang benar,
- ada **reporting bulanan** berbasis data (mis. GSC),

maka scope Paket A pada proposal ini harus ditambah sebagai layanan berulang (monthly) karena sifatnya operasional dan iteratif.

Rangkuman effort SEO (Standard) per bulan (mengacu prinsip workstream 9.3.5):
- Setup & baseline measurement (GSC/analytics access, baseline snapshot, KPI) : **1,00 MD** (bulan pertama)
- Keyword set & mapping (15 keyword prioritas → halaman) : **1,50 MD** (bulan pertama)
- On-page implementation (prioritas Home/Products/Partnership + perbaikan bertahap) : **2,00 MD/bulan**
- Technical SEO check ringan (crawlability, canonical, index coverage, broken link) : **1,00 MD/bulan**
- Content guidance (2–4 topik/bulan + outline) : **1,00 MD/bulan**
- Reporting (audit-friendly: apa yang diubah + metrik GSC ringkas) : **0,50 MD/bulan**

Estimasi total effort:
- Bulan pertama: **7,00 MD** → **Rp 2.100.000**
- Bulan berikutnya: **4,50 MD/bulan** → **Rp 1.350.000/bulan**

**Ketentuan:**
- Vendor tidak menjamin peringkat #1 untuk keyword tertentu.
- Kompetitor utama (3–5) ditentukan oleh Perusahaan.
- Akses Google Search Console (dan Analytics bila ada) disediakan oleh Perusahaan.

## 9.7 Biaya operasional (OpEx) — domain/email tidak dihitung
Sesuai arahan:
- **Domain/email tidak dihitung** dalam proposal ini (diasumsikan sudah tersedia/ditangani internal).
- Jika dibutuhkan pengaturan DNS/SSL untuk domain yang sudah ada, akan dikoordinasikan dengan tim IT PT Alfa Beauty Cosmetica pada tahap go-live.

OpEx yang relevan:
1) Hosting website (Vercel)
2) Lead delivery email: memakai email internal Perusahaan (tanpa OpEx layanan pihak ketiga)
3) Monitoring/error logging: default **Rp 0**

**Kebijakan OpEx (Owner):**
- Vercel Pro mengenakan biaya bulanan + kemungkinan biaya pemakaian (usage).
- **Aturan sederhana (disepakati):** invoice OpEx dicek **bulanan** oleh **Owner**.
- Jika ada lonjakan (mis. tagihan naik signifikan dibanding bulan sebelumnya), Vendor membantu investigasi penyebab (traffic, build frequency, misconfiguration) dan memberikan rekomendasi mitigasi.

---

## 9.8 Hosting (final): Vercel Pro (managed)
**Hosting yang digunakan (final): Vercel Pro.**

**Alasan pemilihan:**
- **Time-to-market cepat:** workflow deploy modern (preview/staging → production) mempercepat review dan mengurangi risiko “baru kelihatan di akhir”.
- **Approval Owner lebih cepat & aman:** setiap perubahan dapat dipreview lewat URL staging/preview sebelum masuk production, sehingga keputusan konten/struktur (Home/Products/Partnership) tidak menunggu go-live.
- **Rilis tanpa mengganggu jalur konversi:** perubahan konten/landing dapat dirilis bertahap sambil menjaga jalur kritikal (CTA WhatsApp + submit Become Partner) tetap stabil, sesuai gate UAT di proposal.
- **Mendukung bilingual (ID/EN) dengan risiko rendah:** perubahan bahasa/konten dapat diverifikasi di preview agar tidak merusak navigasi/SEO basic (robots/sitemap/meta).
- **Minim beban IT internal:** setup SSL, deploy, dan rollback sudah menjadi bagian operasional platform, sehingga tim internal fokus ke konten, bukan infrastruktur.
- **Cocok untuk website publik yang mengandalkan trust:** performa delivery yang baik membantu halaman terasa “ringan” dan profesional di perangkat mobile (penting untuk audience B2B di Indonesia).
- **Performa & delivery global:** infrastruktur CDN/edge yang matang untuk website publik.
- **Operasional sederhana:** SSL/HTTPS, deploy, dan rollback dapat dikelola dengan proses yang rapi tanpa menambah beban tim internal.
- **Biaya dasar jelas dan transparan:** model seat-based (1 seat) memudahkan budgeting.
- **Biaya variabel berbasis pemakaian:** additional usage mengikuti pemakaian aktual dan tercermin di invoice vendor (menghindari asumsi biaya “perkiraan vendor proyek”).
- **Kontrol biaya:** OpEx ditinjau bulanan oleh Owner (lihat kebijakan OpEx di 9.7).

**Biaya dasar Vercel Pro (final):**
- **Jumlah seat:** 1
- **Harga dasar:** **USD 20/seat/bulan × 1 = USD 20/bulan** *(di luar additional usage sesuai tagihan Vercel)*

**Konversi IDR (untuk budgeting, kurs referensi 16.851,60):**
- **USD 20/bulan ≈ Rp 337.032/bulan**

**Model penagihan:** biaya dasar bulanan + additional usage (jika ada), mengikuti invoice Vercel.

---

## 9.9 Referensi biaya OpEx (sumber vendor, snapshot 20 Jan 2026)
Bagian ini disertakan agar Owner/Finance/IT bisa **meng-audit** komponen OpEx yang disebut di proposal.

> Prinsip: angka OpEx pada proposal ini **mengacu ke halaman pricing resmi vendor** (bukan asumsi vendor proyek). Vendor dapat mengubah harga sewaktu-waktu; gunakan invoice resmi sebagai rujukan final.

| Komponen | Keputusan pada proposal | Angka kunci (ringkas) | Sumber (diakses 20 Jan 2026) |
|---|---|---|---|
| Hosting web | Vercel Pro (1 seat) | Pro: **USD 20/seat/bulan** + additional usage | https://vercel.com/pricing |
| Mekanisme biaya compute (informasi untuk budgeting) | Mengikuti model Vercel | Fluid compute (Active CPU) menjelaskan 3 metrik (Active CPU, Provisioned Memory, Invocations). Contoh rate publik: Active CPU mulai **$0.128/jam**, Provisioned Memory mulai **$0.0106/GB-hour** | https://vercel.com/blog/introducing-active-cpu-pricing-for-fluid-compute |
| Monitoring/error logging (tidak dipakai default) | Default Rp 0 | Jika diaktifkan, Sentry memiliki tier (Team, Business, Enterprise) + PAYG (mis. Logs **$0.50/GB**) | https://sentry.io/pricing/ |

---

## 9.10 Keamanan jalur lead (email internal)
### 9.10.1 Prinsip keamanan
Karena lead dikirim ke email internal Perusahaan, maka keamanan fokus pada:
- server-side validation (allowlist + batas panjang field),
- anti-spam minimum (honeypot + rate limit),
- pencatatan error (agar drop lead tidak silent),
- dan kebijakan internal Perusahaan untuk pengelolaan mailbox (akses, spam/quarantine, retensi).

### 9.10.2 Notifikasi internal lead (tanpa OpEx pihak ketiga)
Notifikasi email adalah jalur utama pada Paket A (lead delivery via email). Agar tidak menambah OpEx layanan pihak ketiga:
- Perusahaan menyediakan email internal tujuan dan SMTP internal yang diizinkan (bila dibutuhkan).

Jika Perusahaan hanya bisa memakai layanan email pihak ketiga berbayar, maka biaya tersebut berada di luar proposal ini dan perlu persetujuan Owner (bagian 9.7).

---

## 10) Maintenance & support (M1 & M2)
Paket maintenance adalah layanan bulanan (di luar Fixed Price) untuk menjaga jalur konversi (WA/lead) tetap sehat dan aman saat ada perubahan.

### Paket M1 — Light (Rp 300.000/bulan)
Paket M1 untuk perubahan konten ringan dan perbaikan minor.

**Cakupan:**
- **hingga 4× perubahan konten kecil per bulan** (lihat definisi “1×” di bawah),
- perbaikan bug minor yang jelas (bila ada),
- koordinasi singkat bila ada kebutuhan update.

**Definisi “1× perubahan konten kecil” (contoh yang termasuk):**
- ganti teks singkat (mis. profil perusahaan, benefit, CTA label),
- ganti 1–2 gambar/asset kecil (mis. logo/brand image),
- update link/nomor WhatsApp/pesan prefill,
- koreksi minor data produk (mis. deskripsi singkat yang salah ketik).

**Aturan kuota (agar tidak rancu):**
- Kuota M1 **tidak rollover**.
- Jika dalam bulan berjalan tidak digunakan, kuota **hangus di akhir bulan**.
- Alasan: menjaga biaya tetap rendah dan kapasitas Vendor tetap terprediksi.

**Batasan agar fair (supaya tidak berubah menjadi proyek baru):**
- Kuota kerja total: hingga **1 jam/bulan**.
- Tidak termasuk pekerjaan desain/struktur besar, penambahan fitur, atau perubahan yang memerlukan UAT ulang; hal tersebut diproses sebagai pekerjaan terpisah.

**SLA respon:** next business day (hari kerja)  
**Term:** bulanan  
**Biaya:**
- **Rp 300.000 / bulan**

### Paket M2 — Managed (Standard)
Paket M2 adalah support terkelola untuk menjaga jalur konversi tetap sehat (WA + lead delivery email).

**Cakupan:**
- seluruh cakupan M1,
- prioritas perbaikan jalur lead/WA (bug yang berdampak konversi),
- 1× minor release/bulan (jika ada perubahan konten/konfigurasi yang menyentuh jalur konversi),
- review ringan stabilitas dan pengecekan deliverability email jika ada indikasi gangguan.

**Batasan agar terukur (audit-friendly):**
- Kuota kerja total: hingga **4 MD/bulan** (32 jam) untuk aktivitas di atas.
- Jika dalam bulan berjalan kuota tidak digunakan, kuota hangus di akhir bulan.
- Perubahan fitur baru, perubahan struktur besar, atau pekerjaan di luar scope diproses sebagai pekerjaan terpisah.

**SLA respon:** ≤ 8 jam kerja (business hours)  
**Term:** bulanan  
**Biaya:**
- **Rp 1.200.000 / bulan** (4 MD × Rp 300.000/MD)

---

## 11) Pembayaran (final)
- **40%** saat Scope Freeze disepakati,
- **40%** saat staging siap UAT,
- **20%** saat go-live.

---

## 12) Data yang dibutuhkan dari Perusahaan (prasyarat)
Agar delivery berjalan sesuai timeline, Perusahaan menyiapkan data berikut.

### A) Identitas brand & aset
1) Logo final (SVG/PNG) yang dipakai untuk website?  
2) Apakah ada warna brand/brand guideline singkat?  
3) Foto/asset mana yang **boleh dipublikasikan**?

### B) Konten perusahaan
4) Profil singkat perusahaan (1–2 paragraf) versi final?  
5) Daftar brand yang dipegang + deskripsi singkat per brand.

### C) Katalog produk (minimum)
6) Kategori produk yang ingin ditampilkan?  
7) Data minimum per produk: nama, deskripsi singkat, foto (PIC penyedia materi).

### D) Education/Events
8) Data minimal trainings/events (judul, tanggal, ringkasan, CTA/link bila ada). Jika belum tersedia, Perusahaan menyetujui tampilan empty-state yang rapi.

### E) Partnership / Become Partner
9) Kriteria partner (siapa yang boleh daftar)?  
10) Field form yang diinginkan (baseline / penambahan melalui Change Request).

### F) WhatsApp CTA
11) Nomor WhatsApp final (format +62…)?  
12) Pesan prefill final (teks persis) yang disetujui Bapak Edy?

### G) Domain & koordinasi go-live (ditangani Tim IT perusahaan)
13) Domain yang akan dipakai untuk publikasi (konfirmasi): `alfabeautycosmetica.com`  
14) Siapa PIC tim IT yang memegang akses DNS/SSL saat hari go-live?

### H) Bilingual (ID/EN) — persetujuan istilah & nama brand (untuk konsistensi)
15) Apakah ada **istilah yang wajib dipertahankan** (contoh: nama brand, istilah teknis produk, klaim yang tidak boleh diubah)?  
16) Preferensi gaya bahasa EN (mis. formal B2B, singkat-tegas).

---

## 13) Persetujuan & penunjukan PIC
1) Setuju scope (bagian 3) dan UAT (bagian 5).  
2) Setuju CTA WhatsApp (nomor + pesan prefill).  
3) Menyetujui biaya (bagian 9) dan skema pembayaran (bagian 11).  

Penunjukan PIC:
- PIC OpEx bulanan (Vercel): **Owner**.
- PIC email tujuan lead (inbox internal): ditunjuk oleh Owner.

Ringkasan harga untuk persetujuan:
- Paket A (Final): **Rp 10.275.000** (tanpa PPN)

Hosting ditetapkan: Vercel Pro. Jalur lead: email internal (tanpa database pada scope Paket A ini).

---

## 14) Next step
1) Bapak Edy menunjuk PIC konten + memberi nomor WA & pesan prefill.  
2) Scope Freeze (konfirmasi scope + UAT).  
3) Staging → UAT PASS → Go-live.

---

