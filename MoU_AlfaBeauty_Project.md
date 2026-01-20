# MEMORANDUM OF UNDERSTANDING (MoU)
## KESEPAKATAN PENGEMBANGAN SISTEM DIGITAL
### PT. ALFA BEAUTY COSMETICA

---

**Nomor Dokumen:** MoU/ABC/2026/001  
**Tanggal:** 20 Januari 2026  
**Status:** DRAFT - Menunggu Audit

---

## PARA PIHAK

### PIHAK PERTAMA (Developer/Pengembang)
| Field | Isi |
|-------|-----|
| Nama | _________________________ |
| Alamat | _________________________ |
| No. Telepon | _________________________ |
| Email | _________________________ |
| NPWP | _________________________ |

Selanjutnya disebut sebagai **"PIHAK PERTAMA"** atau **"PENGEMBANG"**

### PIHAK KEDUA (Client/Pengguna Jasa)
| Field | Isi |
|-------|-----|
| Nama Perusahaan | PT. Alfa Beauty Cosmetica |
| Alamat | _________________________ |
| No. Telepon | _________________________ |
| Email | _________________________ |
| NPWP | _________________________ |
| Nama Perwakilan | _________________________ |
| Jabatan | _________________________ |

Selanjutnya disebut sebagai **"PIHAK KEDUA"** atau **"CLIENT"**

---

## PASAL 1: LATAR BELAKANG

1.1. PIHAK KEDUA adalah perusahaan yang bergerak di bidang distribusi produk kecantikan profesional untuk salon dan barbershop di Indonesia.

1.2. PIHAK KEDUA membutuhkan sistem digital untuk mendukung operasional bisnis yang meliputi website B2B, sistem manajemen, dan integrasi digital.

1.3. PIHAK PERTAMA adalah pengembang independen yang memiliki keahlian dalam pengembangan aplikasi web dan sistem digital.

1.4. Para Pihak sepakat untuk menjalin kerjasama dalam pengembangan sistem digital sebagaimana diatur dalam MoU ini.

---

## PASAL 2: RUANG LINGKUP PROYEK

### 2.1. Deliverables Utama

| No | Komponen | Deskripsi |
|----|----------|-----------|
| 1 | **Frontend Website** | Website B2B dengan design editorial magazine style, responsive, multi-page |
| 2 | **Backend API** | REST API dengan Go/Golang untuk manajemen data |
| 3 | **Database** | Sistem penyimpanan data terstruktur |
| 4 | **Admin Panel** | Dashboard untuk manajemen konten dan operasional |
| 5 | **Dokumentasi** | Technical documentation dan user guide |

### 2.2. Fitur Platform (Berdasarkan Paket A - Website Professional B2B)

#### A. Public Pages (In-Scope)

| No | Halaman | Deskripsi | Komponen |
|----|---------|-----------|----------|
| 1 | **Homepage** | Positioning + CTA utama | Hero, Brand Logo Strip, 3 Pillars, Quick Categories, Education Highlight, Sticky WA |
| 2 | **Products Overview** | Katalog produk profesional (tanpa harga publik) | Category Nav, Filter Panel, Product Grid, Empty State |
| 3 | **Product Detail** | Decision support untuk profesional | Header, Gallery, Benefits, Use Cases, How-to-Use, Training Link |
| 4 | **Education/Events** | Showcase training & events | Event List, Highlight Cards, Register CTA |
| 5 | **Partnership** | Become Partner lead capture | Benefits Section, Lead Form, Consent |
| 6 | **About** | Company story, team, values | Company Story, Team, Values, Contact CTA |
| 7 | **Contact** | Info kontak dan WhatsApp | Contact Info, Map, WA Button |
| 8 | **Legal Pages** | Privacy Policy, Terms of Service | Static content pages |

#### B. Lead Pipeline System (Option B)

| No | Komponen | Deskripsi |
|----|----------|-----------|
| 1 | **Lead API** | Endpoint untuk Become Partner form |
| 2 | **Server-side Validation** | Validasi payload |
| 3 | **Anti-Spam** | Honeypot + Rate Limit (3 req/IP/min) |
| 4 | **Durable Persistence** | PostgreSQL/Supabase storage |
| 5 | **Notification Fanout** | Email/Webhook notification |
| 6 | **Admin Export** | Access-controlled export untuk leads |

#### C. Non-Functional Requirements

| Kategori | Requirement |
|----------|-------------|
| **Core Web Vitals (p75)** | LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 |
| **SEO** | Title/meta, canonical, sitemap.xml, robots.txt, OpenGraph, JSON-LD |
| **Security Headers** | CSP, X-Content-Type-Options, HSTS, Permissions-Policy |
| **Availability SLO** | 99.9% monthly |

#### D. Out-of-Scope (→ Paket B)

| Item | Keterangan |
|------|------------|
| ❌ Harga publik / tier pricing | Tidak ada harga tampil |
| ❌ Login Partner/Agent/Admin | Tidak ada private zone |
| ❌ Keranjang/inquiry builder | Tidak ada order workflow |
| ❌ Integrasi ERP | Tidak ada sync stok/kredit |
| ❌ SLA routing & escalation | Tidak ada dashboard SubDist |
| ❌ Invoice & payment tracking | Tidak ada modul invoice |
| ❌ Loyalty points | Tidak ada sistem poin |

### 2.3. Kriteria Penerimaan - UAT Scenarios (16 Test Cases)

Sistem dinyatakan selesai apabila seluruh **16 skenario UAT Paket A** berstatus **PASS**:

#### Priority 0 — Critical (8 Test Cases)
- [ ] UAT-01: Homepage positioning dan CTA berfungsi
- [ ] UAT-02: Products overview navigation berfungsi
- [ ] UAT-03: Filter brand/fungsi/audience berfungsi
- [ ] UAT-04: Product detail decision support lengkap
- [ ] UAT-05: WhatsApp contact (deep link) berfungsi
- [ ] UAT-06: Become Partner lead form submission berhasil
- [ ] UAT-08: Responsive design & accessibility standar
- [ ] UAT-11: Lead pipeline reliability (anti-spam, persistence)
- [ ] UAT-12: Lead admin export berfungsi

#### Priority 1 — Important (6 Test Cases)
- [ ] UAT-07: Education/events page lengkap
- [ ] UAT-09: SEO basics (sitemap, robots, meta)
- [ ] UAT-10: Performance sanity check
- [ ] UAT-13: Legal & static pages (Privacy, Terms)
- [ ] UAT-14: 404 & error fallback pages
- [ ] UAT-15: Social metadata (OpenGraph, Twitter Cards)

#### Priority 2 — Nice-to-Have (1 Test Case)
- [ ] UAT-16: Core Web Vitals reporting (RUM)

### 2.4. Teknologi yang Digunakan

| Layer | Teknologi |
|-------|-----------|
| Frontend | Next.js 16.x, React, TypeScript, TailwindCSS |
| Backend | Go (Fiber v2) atau Node.js Route Handler |
| Database | Supabase (PostgreSQL) |
| Rate Limit | Upstash |
| Hosting | Vercel (Edge + Functions) |
| Observability | Sentry (Error), Google Analytics (Events) |
| RUM | web-vitals library |





---

## PASAL 3: JADWAL PELAKSANAAN

### 3.1. Estimasi Effort (Man-Days)

Berdasarkan WBS Paket A, estimasi effort adalah sebagai berikut:

| Estimasi | Man-Days | Rate/MD | Total (IDR) |
|----------|----------|---------|-------------|
| **Best Case** | **36.9 MD** | **Rp 375.000** | **Rp 13.837.500** |
| Likely | 40.25 MD | Rp 375.000 | Rp 15.093.750 |
| Worst Case | 50.8 MD | Rp 375.000 | Rp 19.050.000 |

### 3.2. Timeline Proyek

| Fase | Aktivitas | Durasi | Target Selesai |
|------|-----------|--------|----------------|
| 1 | Discovery & Planning | __ minggu | ___/___/2026 |
| 2 | Design & Prototyping | __ minggu | ___/___/2026 |
| 3 | Frontend Development | __ minggu | ___/___/2026 |
| 4 | Backend Development | __ minggu | ___/___/2026 |
| 5 | Integration & Testing | __ minggu | ___/___/2026 |
| 6 | UAT & Revisi | __ minggu | ___/___/2026 |
| 7 | Deployment & Go-Live | __ minggu | ___/___/2026 |

### 3.3. Milestone Pembayaran

| Milestone | Deliverable | % Pembayaran |
|-----------|-------------|--------------|
| M1 | Penandatanganan MoU | __% |
| M2 | Approval Design | __% |
| M3 | Frontend Complete | __% |
| M4 | Backend Complete | __% |
| M5 | UAT Approval | __% |
| M6 | Go-Live | __% |

---

## PASAL 4: NILAI PROYEK DAN PEMBAYARAN

### 4.1. Nilai Kontrak

| Komponen | Nilai (IDR) |
|----------|-------------|
| Pengembangan Sistem (36.9 MD × Rp 375.000) | Rp 13.837.500 |
| Lisensi & Tools | Rp ______________ |
| Infrastruktur (jika ada) | Rp ______________ |
| **TOTAL** | **Rp ______________** |

*Terbilang: ________________________________________________*

### 4.2. Biaya Operasional Bulanan (OpEx)

| Komponen | Perkiraan/Bulan |
|----------|-----------------|
| Hosting | Rp ______________ |
| Database | Rp ______________ |
| Monitoring | Rp ______________ |
| Lainnya | Rp ______________ |
| **Total OpEx/Bulan** | **Rp ______________** |

### 4.3. Metode Pembayaran

Pembayaran dilakukan melalui transfer bank ke rekening PIHAK PERTAMA:

| Field | Isi |
|-------|-----|
| Nama Bank | _________________________ |
| No. Rekening | _________________________ |
| Atas Nama | _________________________ |

### 4.4. Ketentuan Pembayaran

- Pembayaran dilakukan dalam **___ hari kerja** setelah invoice diterima
- Keterlambatan pembayaran dikenakan denda **___% per bulan**
- Semua pembayaran sudah termasuk/belum termasuk PPN (**pilih salah satu**)


---

## PASAL 5: HAK KEKAYAAN INTELEKTUAL

### 5.1. Kepemilikan Kode Sumber

- [ ] **Opsi A:** Kode sumber sepenuhnya menjadi milik PIHAK KEDUA setelah pembayaran lunas
- [ ] **Opsi B:** PIHAK PERTAMA mempertahankan kepemilikan kode sumber, PIHAK KEDUA mendapat lisensi penggunaan
- [ ] **Opsi C:** Kepemilikan bersama dengan ketentuan khusus

### 5.2. Lisensi

Setelah pembayaran lunas, PIHAK KEDUA berhak untuk:
- Menggunakan sistem untuk keperluan bisnis internal
- Memodifikasi sistem (jika memiliki source code)
- _________________________ (ketentuan tambahan)

### 5.3. Komponen Pihak Ketiga

Sistem menggunakan library/framework open source dengan lisensi masing-masing. PIHAK PERTAMA menjamin penggunaan sesuai dengan lisensi yang berlaku.

---

## PASAL 6: GARANSI DAN DUKUNGAN

### 6.1. Masa Garansi

PIHAK PERTAMA memberikan garansi selama **___ bulan** setelah Go-Live yang mencakup:
- Perbaikan bug/error yang ditemukan
- Penyesuaian minor yang tidak mengubah arsitektur
- Dukungan teknis melalui [email/WhatsApp/telepon]

### 6.2. Batasan Garansi

Garansi TIDAK mencakup:
- Kerusakan akibat modifikasi oleh pihak selain PIHAK PERTAMA
- Perubahan requirement di luar scope awal
- Masalah infrastruktur hosting yang tidak dikelola PIHAK PERTAMA
- Force majeure

### 6.3. Maintenance Agreement (Opsional)

Setelah masa garansi berakhir, Para Pihak dapat menyepakati kontrak maintenance terpisah dengan biaya:
- Retainer bulanan: Rp ______________ /bulan
- Atau, per-request basis dengan rate: Rp ______________ /jam

---

## PASAL 7: PERUBAHAN REQUIREMENT (CHANGE REQUEST)

### 7.1. Prosedur Change Request

1. PIHAK KEDUA mengajukan perubahan secara tertulis
2. PIHAK PERTAMA melakukan analisis dampak dalam __ hari kerja
3. PIHAK PERTAMA menyampaikan estimasi biaya dan waktu tambahan
4. Perubahan dilakukan setelah ada persetujuan tertulis

### 7.2. Biaya Change Request

| Kategori | Rate |
|----------|------|
| Perubahan Minor (< 4 jam) | Rp ______________ |
| Perubahan Medium (4-16 jam) | Rp ______________ |
| Perubahan Major (> 16 jam) | Quotation terpisah |

---

## PASAL 8: KERAHASIAAN

### 8.1. Definisi Informasi Rahasia

Meliputi namun tidak terbatas pada:
- Data bisnis dan keuangan
- Strategi pemasaran
- Daftar pelanggan dan partner
- Informasi teknis sistem
- Kode sumber dan dokumentasi

### 8.2. Kewajiban Kerahasiaan

- Kedua belah pihak wajib menjaga kerahasiaan informasi
- Tidak boleh mengungkapkan kepada pihak ketiga tanpa persetujuan tertulis
- Kewajiban berlaku selama **___ tahun** setelah MoU berakhir

---

## PASAL 9: PENYELESAIAN SENGKETA

### 9.1. Musyawarah

Para Pihak sepakat menyelesaikan perselisihan secara musyawarah untuk mufakat.

### 9.2. Mediasi

Jika musyawarah tidak tercapai dalam **30 hari**, akan dilakukan mediasi oleh pihak ketiga yang disepakati.

### 9.3. Arbitrase/Pengadilan

Jika mediasi gagal, sengketa diselesaikan melalui:
- [ ] Badan Arbitrase Nasional Indonesia (BANI)
- [ ] Pengadilan Negeri _______________

---

## PASAL 10: FORCE MAJEURE

### 10.1. Definisi

Keadaan di luar kendali yang tidak dapat dihindari:
- Bencana alam
- Pandemi
- Perang atau kerusuhan
- Kebijakan pemerintah yang menghambat pelaksanaan

### 10.2. Ketentuan

- Pihak yang terkena force majeure wajib memberitahu pihak lain dalam **7 hari**
- Kewajiban ditangguhkan selama force majeure berlangsung
- Jika berlangsung lebih dari **90 hari**, Para Pihak dapat mengakhiri MoU

---

## PASAL 11: KETENTUAN LAIN-LAIN

### 11.1. Amandemen

Perubahan MoU hanya berlaku jika dibuat secara tertulis dan ditandatangani kedua pihak.

### 11.2. Hubungan Para Pihak

Hubungan Para Pihak adalah sebagai kontraktor independen, bukan hubungan kerja/ketenagakerjaan.

### 11.3. Bahasa dan Hukum yang Berlaku

MoU ini dibuat dalam Bahasa Indonesia dan tunduk pada hukum Republik Indonesia.

### 11.4. Masa Berlaku

MoU ini berlaku sejak ditandatangani sampai dengan:
- [ ] Semua kewajiban terpenuhi
- [ ] Tanggal ___/___/2026
- [ ] Diakhiri oleh salah satu pihak dengan pemberitahuan __ hari sebelumnya

---

## PASAL 12: PENUTUP

MoU ini dibuat dalam **2 (dua) rangkap** asli yang bermaterai cukup dan memiliki kekuatan hukum yang sama.

---

## TANDA TANGAN

### PIHAK PERTAMA (PENGEMBANG)

```
Tanda Tangan: ___________________________

Nama Lengkap: ___________________________

Tanggal: ___________________________
```

### PIHAK KEDUA (CLIENT)

```
Tanda Tangan: ___________________________

Nama Lengkap: ___________________________

Jabatan: ___________________________

Tanggal: ___________________________

Cap Perusahaan:
```

---

## LAMPIRAN

### Lampiran A: Spesifikasi Teknis Detail
*[Akan dilampirkan terpisah]*

### Lampiran B: Wireframe/Mockup Design
*[Akan dilampirkan terpisah]*

### Lampiran C: Timeline Detail
*[Akan dilampirkan terpisah]*

### Lampiran D: Rincian Biaya
*[Akan dilampirkan terpisah]*

---

## CATATAN AUDIT

| Tanggal | Auditor | Catatan | Status |
|---------|---------|---------|--------|
| ___/___/2026 | | | Pending |
| | | | |
| | | | |

---

*Dokumen ini adalah DRAFT dan memerlukan review dari ahli hukum sebelum penggunaan resmi.*

**[END OF DOCUMENT]**
