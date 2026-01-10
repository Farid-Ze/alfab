# STATEMENT OF WORK (SoW): DIGITAL ECOSYSTEM TRANSFORMATION

**Client:** PT. Alfa Beauty Cosmetica
**Vendor:** [Nama Freelancer]
**Date:** January 08, 2026
**Reference:** Blueprint V3.4, DevOps V2.4, FSD V2.6, WBS V2.5, ERD V2.0
**Version:** 2.5

## 1. EXECUTIVE PREAMBLE

Dokumen ini mendefinisikan ruang lingkup, biaya, dan tata kelola untuk pengembangan **Unified Resilience Model Platform**.
Tujuan strategis proyek ini bukan sekadar membangun *website*, melainkan mengimplementasikan **Sistem Tata Kelola Distribusi Hibrida** yang mengamankan arus kas (Credit Logic), melindungi rantai pasok (SLA Routing), dan meningkatkan retensi mitra (Loyalty Engine).

## 2. SCOPE OF SERVICES (IN-SCOPE)

Berdasarkan *Functional Specification Document (FSD) V2.6*, pekerjaan mencakup:

### A. Core Platform Development

1. **Identity & Access Module:** Pengembangan sistem login bertingkat (Guest, Partner, Agent, SubDist) dengan protokol keamanan *Impersonation* (Shadow Mode).
2. **Commercial Governance Engine:** Implementasi logika *Credit Heuristics* (Limit Check) dan *Tier-Based Pricing* (Silver/Gold/Platinum).
3. **Loyalty Growth Engine:** Implementasi kalkulasi *Point Multiplier* dan katalog penukaran hadiah (Fixed Redemption).
4. **Supply Chain Middleware:** Implementasi algoritma *SLA Routing* (24-Hour Failover) dan logika *Inventory Buffer*.
5. **Partner Profiling Module:** Pengumpulan data profil Salon (Jenis, Ukuran, Spesialisasi, Region) untuk segmentasi.
6. **Agile Configuration Panel:** Admin interface untuk mengubah konfigurasi bisnis (Multiplier, Thresholds, SLA Hours) tanpa deploy.
7. **Impersonation Checkout Notification:** Notifikasi WA/Email ke Owner Toko setiap Salesman checkout via Shadow Mode.
8. **Invoice & Payment Tracking:** Modul untuk track status pembayaran dan trigger pencairan poin.
9. **SLA Escalation Engine:** Modul untuk reminder (18 jam) dan eskalasi (24 jam) order yang tidak direspon.
10. **Sub-Distributor Routing:** Geo-routing order ke Sub-Distributor berdasarkan wilayah Partner.

### B. Interface & Experience

1. **Public Catalog:** *Headless Catalog* dengan fitur *Retail Deflection* ke Shopee.
2. **Partner Dashboard:** *Inquiry Builder* (Keranjang Belanja B2B), Visualisasi Status Kredit, dan Invoice Status.
3. **Agent Assist Interface:** Dashboard khusus Salesman untuk input order atas nama klien.
4. **SubDist Dashboard:** Queue order dan interface update status.

### C. Infrastructure & DevOps

1. **Cloud Provisioning:** Setup Google Cloud Platform (Cloud Run, SQL, VPC) menggunakan Terraform.
2. **CI/CD Pipelines:** Implementasi *Quality Gates* (SonarQube, Contract Tests) sesuai standar PT. Alfa Beauty Cosmetica.

### D. Warranty & Hypercare Period

Periode garansi *bug-fixing* berlaku selama **30 Hari Kalender** setelah tanggal *Go-Live*.

1. **Cakupan:** Perbaikan *Critical* dan *Major Bugs* yang menyimpang dari FSD V2.6.
2. **Respons:** Tim teknis *standby* untuk memastikan stabilitas sistem selama fase adopsi awal.
3. **Pengecualian:** Tidak mencakup penambahan fitur baru atau kesalahan akibat perubahan konfigurasi oleh pihak Klien.

## 3. NEGATIVE SCOPE (OUT-OF-SCOPE)

Untuk mencegah *Scope Creep*, hal-hal berikut **TIDAK** termasuk dalam kontrak ini kecuali melalui *Change Request*:

1. **Perbaikan ERP Legacy:** Kami bertanggung jawab menghubungkan API ke ERP (Integrasi), namun **TIDAK** bertanggung jawab memperbaiki bug/kinerja software ERP/Accounting internal PT. Alfa Beauty.
2. **Konten Kreatif:** Fotografi produk, penulisan artikel SEO, dan pembuatan video edukasi adalah tanggung jawab Klien. Kami hanya menyediakan *placeholder*.
3. **Manajemen Gudang Fisik:** Sistem kami mencatat data stok digital, tidak mengelola operasi fisik gudang (Barcode scanning, Stock opname).
4. **Biaya Pihak Ketiga:** Biaya Server Cloud (GCP/AWS/IDCloudHost), Redis Cloud, dan Domain adalah beban langsung Klien.\r\n\r\n> **Catatan WhatsApp:** Sistem menggunakan **WhatsApp Deep Link** (`wa.me/...`), bukan WhatsApp Business API. Tidak ada biaya per-message dan tidak perlu registrasi WhatsApp BSP.

## 4. PROJECT TIMELINE & MILESTONES

Durasi total proyek diestimasi **16 Minggu** (4 Bulan), dengan *Critical Path* pada integrasi ERP.

| Phase | Activity | Duration | Deliverable |
| --- | --- | --- | --- |
| **Phase 1** | **Discovery & Infra** | Weeks 1-2 | Cloud Setup, ERP Connectivity POC. |
| **Phase 2** | **Backend Core** | Weeks 3-7 | API Swagger, Credit, Pricing, Invoice, SLA Logic. |
| **Phase 3** | **Frontend & Exp.** | Weeks 6-11 | UI Components, Agent Mode, Catalog, SubDist Dashboard. |
| **Phase 4** | **UAT & Launch** | Weeks 12-16 | Security Test, UAT Sign-off (33 Test Cases), Go-Live. |

**Proyeksi Timeline:**
- **Kick-off:** Januari 2026
- **Go-Live:** Mei 2026
- **Akhir Garansi Gratis:** Juni 2026
- **Maintenance Berbayar:** Juli - Desember 2026 (Opsional)

## 5. COMMERCIAL INVESTMENT (RAB)

Investasi dihitung berdasarkan *Resource Loading* dari WBS V2.5 (Total Effort: **162.5 Man-Days**).
Rate dihitung berdasarkan standar **Junior Freelancer Indonesia** dengan rate **Rp 135.000/Man-Day**.

### A. Professional Services Cost

| Component | Resource Allocation | Unit Cost (Rate/Day) | Total Investment |
| --- | --- | --- | --- |
| **Backend Engineering** | 60.5 Man-Days | Rp 135.000 | Rp 8.167.500 |
| **Frontend Engineering** | 41 Man-Days | Rp 135.000 | Rp 5.535.000 |
| **DevOps & Infra** | 14 Man-Days | Rp 135.000 | Rp 1.890.000 |
| **QA & Testing** | 21 Man-Days | Rp 135.000 | Rp 2.835.000 |
| **Project Mgmt & Arch.** | 20 Man-Days | Rp 135.000 | Rp 2.700.000 |
| **Partner Profiling** | 6 Man-Days | Rp 135.000 | Rp 810.000 |
| **Subtotal Services** | **162.5 Man-Days** |  | **Rp 21.937.500** |

**Pembulatan Final:** **Rp 23.500.000** (Dua Puluh Tiga Juta Lima Ratus Ribu Rupiah)

### B. Change Request (CR) Rate Card

Apabila terdapat permintaan fitur di luar lingkup (Out-of-Scope), biaya akan dihitung berdasarkan *Time & Material* dengan tarif berikut:

| Rate Type | Tarif |
| --- | --- |
| **Engineering Rate** | Rp 35.000/Jam |
| **Consultant/Architect Rate** | Rp 50.000/Jam |

Setiap CR akan dituangkan dalam *Addendum* terpisah sebelum pengerjaan dimulai.

### C. Managed Services (Opsional - Post Launch)

*Biaya Retainer bulanan untuk maintenance setelah periode garansi berakhir.*

| Scope | Investment |
| --- | --- |
| Server Monitoring, Bug Fixing (Non-Feature), WhatsApp API Maintenance | **Rp 1.000.000/Bulan** |

**Proyeksi Maintenance Juli - Desember 2026:**
- 6 bulan × Rp 1.000.000 = **Rp 6.000.000**

### D. Total Project Value (Jika Kontrak Sampai Desember)

| Item | Nilai |
| --- | --- |
| Development (162.5 MD) | Rp 23.500.000 |
| Free Warranty (30 hari) | Rp 0 |
| Paid Maintenance (6 bulan) | Rp 6.000.000 |
| **GRAND TOTAL** | **Rp 29.500.000** |

## 6. CLIENT DEPENDENCIES & ASSUMPTIONS

Keberhasilan proyek bergantung pada pemenuhan syarat berikut oleh Klien:

1. **ERP Access:** Tim IT PT. Alfa Beauty wajib menyediakan dokumentasi API atau akses Database ERP selambat-lambatnya pada **Minggu ke-1**. Keterlambatan >3 hari akan berdampak pada pergeseran *Go-Live*.
2. **WhatsApp BSP:** Klien telah mendaftarkan akun WhatsApp Business API (WABA) sebelum Minggu ke-4.
3. **Data Cleaning:** Klien bertanggung jawab menyediakan data produk (SKU, Harga, Foto) yang bersih dan terstruktur dalam format CSV/Excel.
4. **Sub-Distributor Data:** Klien menyediakan daftar Sub-Distributor beserta region dan nomor WhatsApp.

## 7. PAYMENT TERMS

Pembayaran dilakukan berdasarkan progres termin (Progress-Based):

| Termin | Milestone | Persentase | Nominal |
| --- | --- | --- | --- |
| **Down Payment** | Saat penandatanganan SoW | 30% | Rp 7.050.000 |
| **Milestone 1** | Backend Core & API Integrasi selesai (Akhir Phase 2) | 30% | Rp 7.050.000 |
| **Milestone 2** | Frontend selesai & Siap UAT (Akhir Phase 3) | 30% | Rp 7.050.000 |
| **Retention** | 30 Hari setelah Go-Live atau UAT Sign-off | 10% | Rp 2.350.000 |
| **TOTAL** |  | **100%** | **Rp 23.500.000** |

*Catatan: Pembayaran Maintenance (jika ada) akan ditagihkan terpisah secara bulanan.*

## 8. INTELLECTUAL PROPERTY & CONFIDENTIALITY

1. **Kepemilikan Kode:** Setelah pembayaran lunas (100%), Hak Kekayaan Intelektual (IP) atas *Source Code* aplikasi menjadi milik PT. Alfa Beauty Cosmetica. Vendor berhak menyimpan *generic libraries* atau *framework* yang digunakan.
2. **Kerahasiaan Data:** Vendor wajib menjaga kerahasiaan seluruh data bisnis Klien (termasuk Data Sub-Distributor, Harga Tiering, dan Data Pelanggan) dan tidak akan membagikannya ke pihak ketiga tanpa persetujuan tertulis.

## 9. ACCEPTANCE & SIGN-OFF

Definisi "Project Complete" tercapai apabila:

1. Seluruh fitur pada *Scope of Services* telah berfungsi sesuai FSD V2.6.
2. Seluruh 33 skenario UAT V2.0 berstatus **PASS**.
3. Tidak terdapat *Critical* atau *High Severity Bugs* yang menghalangi operasional utama.
4. Dokumen teknis (API Documentation & User Manual) telah diserahkan.

---

Dengan menandatangani dokumen ini, kedua belah pihak menyetujui ruang lingkup dan biaya di atas.

---

**PT. Alfa Beauty Cosmetica**

Nama: __________________

Jabatan: __________________

Tanggal: __________________

---

**[Nama Freelancer]**

Nama: __________________

Jabatan: Freelance Developer

Tanggal: __________________

---

## APPENDIX A: RASIONALISASI PENETAPAN RATE

### Dasar Penetapan Rate Rp 135.000/Man-Day

Rate ditetapkan berdasarkan evaluasi **8 Parameter Utama** dengan konteks pasar freelancer Indonesia tahun 2025-2026. Rate **Rp 135.000/hari** berada di **batas bawah** range junior, sebagai strategi *aggressive pricing* untuk membangun portofolio enterprise.

---

### 1. LOKASI GEOGRAFIS

| Faktor | Kondisi | Dampak Rate |
| --- | --- | --- |
| **Tier Kota** | Tier-2/3 (Non-Jakarta) | Rate lebih rendah 30-50% dari Jakarta |
| **Cost of Living** | UMR Daerah ~Rp 2-3 Juta | Baseline lebih rendah |
| **Remote Work** | Full Remote | Tidak ada biaya transport/kantor |

**Data Riset:**
- Menurut **JobStreet Indonesia (2025)**, gaji Software Developer di Jakarta rata-rata Rp 6.350.000 - Rp 9.350.000/bulan, sedangkan di Surabaya Rp 7.300.000 dan Yogyakarta Rp 7.000.000.
- **SalaryExpert (2025)** melaporkan gaji tahunan developer Jakarta 12% lebih tinggi dari rata-rata nasional (Rp 540 juta vs Rp 484 juta/tahun).
- Kota-kota tier-2 seperti Bandung dan Bekasi memiliki rate Rp 6.000.000 - Rp 7.000.000/bulan.

**Kesimpulan:** Lokasi di luar Jakarta memungkinkan rate kompetitif di Rp 100-200k/hari untuk pemula.

> **Sumber:**
> - JobStreet Indonesia. "Software Developer Salary." https://jobstreet.com (Diakses Januari 2026)
> - SalaryExpert. "Software Developer Salary Jakarta." https://salaryexpert.com (2025)
> - 9cv9. "Software Developers Salary in Indonesia 2025." https://9cv9.com (2025)

---

### 2. PENGALAMAN (EXPERIENCE)

| Level | Tahun Pengalaman | Range Rate/Day |
| --- | --- | --- |
| Fresh Graduate | 0-1 tahun | Rp 100.000 - 150.000 |
| **Junior** | **1-2 tahun** | **Rp 135.000 - 250.000** ✓ |
| Mid-Level | 3-5 tahun | Rp 400.000 - 700.000 |
| Senior | 5+ tahun | Rp 800.000 - 1.500.000 |

**Data Riset:**
- **Dealls.com (2025)** menyatakan gaji freelance programmer pemula Rp 3.000.000 - Rp 5.000.000/bulan, setara Rp 136.000 - Rp 250.000/hari.
- **Codepolitan (2025)** melaporkan Junior Software Engineer (0-2 tahun) menghasilkan Rp 7.000.000 - Rp 12.000.000/bulan.
- **Kodingakademi.id** mencatat freelance fullstack web developer pemula Rp 3.000.000 - Rp 5.000.000/bulan.
- **SoftwareSeni.co.id** melaporkan rata-rata Junior Web Developer Rp 4.779.944/bulan (~Rp 217.000 - Rp 239.000/hari).

**Posisi Saat Ini:** Junior Freelancer (1-2 tahun) → Rate Rp 135.000 berada di **batas bawah range** untuk memaksimalkan daya saing.

> **Sumber:**
> - Dealls. "Gaji Programmer di Indonesia 2025." https://dealls.com (2025)
> - Codepolitan. "Gaji Software Engineer Indonesia." https://codepolitan.com (2025)
> - Kodingakademi. "Gaji Freelance Web Developer." https://kodingakademi.id (2025)
> - SoftwareSeni. "Gaji Web Developer." https://softwareseni.co.id (2025)

---

### 3. INDUSTRI (INDUSTRY)

| Industri | Complexity | Rate Multiplier |
| --- | --- | --- |
| Consumer App (ToC) | Low | 0.8x |
| **B2B Commerce** | **Medium-High** | **1.0x - 1.2x** ✓ |
| Fintech/Banking | Very High | 1.5x - 2.0x |
| Healthcare/Regulated | High | 1.3x - 1.5x |

**Data Riset:**
- **Mordor Intelligence (2025)** memproyeksikan pasar B2B e-commerce Indonesia mencapai $628.7 juta pada 2031, didorong digitalisasi UMKM.
- **Webplan24** melaporkan biaya pengembangan e-commerce B2B di Indonesia berkisar Rp 80 juta - Rp 500 juta untuk platform standar, dan hingga Rp 5 miliar untuk platform kompleks dengan integrasi ERP.
- Kompleksitas B2B (credit-based payment, tiered pricing, ERP integration) menambah 20-30% effort dibanding B2C standar.

**Industri Proyek:** B2B Distribution Platform (Beauty Industry) — kompleksitas menengah-tinggi karena:
- Integrasi ERP Legacy
- Multi-tier pricing logic
- Credit governance system

> **Sumber:**
> - Mordor Intelligence. "Indonesia B2B E-commerce Market." https://mordorintelligence.com (2025)
> - Webplan24. "E-commerce Development Cost Indonesia." https://webplan24.com (2025)
> - Dreamertechnoland. "B2B Platform Cost." https://dreamertechnoland.com (2025)

---

### 4. TECH STACK

| Kategori | Teknologi | Skill Demand | Market Rate/Hour |
| --- | --- | --- | --- |
| Backend | Laravel/PHP, Node.js, Go | Medium-High | $15-$50/jam (Upwork) |
| Frontend | React, Tailwind CSS | High | $15-$50/jam (Upwork) |
| DevOps | Terraform, GCP Cloud Run | High (Langka) | +25-35% premium |
| Integration | REST API, WhatsApp BSP | Medium | Standard rate |

**Data Riset:**
- **NodeFlair (2025)** melaporkan Front-End Developer Indonesia rata-rata Rp 9.000.000/bulan.
- **Ruul.io** mencatat rate web developer di Upwork $15-$50/jam, mobile app developer $18-$39/jam.
- **FastlaneRecruit** menyatakan DevOps dengan skill cloud platform (GCP/AWS) dan IaC (Terraform) mendapat premium 25-35% lebih tinggi dari developer biasa.
- **JobStreet** melaporkan DevOps Engineer Indonesia rata-rata Rp 8.500.000 - Rp 11.500.000/bulan.

**Evaluasi:**
- Stack yang digunakan adalah **mainstream** di Indonesia
- Junior dengan kemampuan full-stack + Basic DevOps sudah **above average**
- Rate Rp 200k masih di bawah market untuk skill ini, namun wajar untuk membangun portofolio

> **Sumber:**
> - NodeFlair. "Front-End Developer Salary Indonesia." https://nodeflair.com (2025)
> - Ruul.io. "Freelance Developer Rates 2025." https://ruul.io (2025)
> - FastlaneRecruit. "DevOps Salary Trends." https://fastlanerecruit.com (2025)
> - JobStreet. "DevOps Engineer Salary." https://jobstreet.com (2025)

---

### 5. SOFT SKILL & PRODUCT MINDSET

| Skill | Level | Nilai Tambah |
| --- | --- | --- |
| Komunikasi Klien | Basic-Intermediate | Bisa handle meeting langsung |
| Problem Solving | Intermediate | Mampu breakdown requirement |
| Documentation | Intermediate | Bisa buat FSD/SoW sendiri |
| Product Thinking | Basic | Memahami business logic, bukan hanya coding |

**Data Riset:**
- **Nucamp (2025)** melaporkan developer dengan kemampuan dokumentasi dan komunikasi dapat bernegosiasi **10-20% lebih tinggi** dari rate standar.
- **DigitalCrafts** menyatakan portfolio yang menunjukkan kemampuan problem-solving dan project ownership meningkatkan posisi negosiasi.
- Kemampuan membuat dokumen teknis (Blueprint, FSD, SoW) dihargai setara skill Consultant/Architect di level agency.

**Nilai Plus:** Kemampuan membuat dokumen teknis merupakan skill yang jarang di level junior dan meningkatkan **perceived value** signifikan.

> **Sumber:**
> - Nucamp. "Web Developer Salary Negotiation." https://nucamp.co (2025)
> - DigitalCrafts. "Developer Portfolio Impact." https://digitalcrafts.com (2025)

---

### 6. PORTOFOLIO & SERTIFIKASI

| Item | Status | Impact pada Rate |
| --- | --- | --- |
| Proyek Live/Production | ≤3 proyek | Standar Junior |
| GitHub Portfolio | Available | +10-15% perceived value |
| Sertifikasi Cloud (GCP/AWS) | Tidak ada | Tidak menambah rate |
| Sertifikasi Framework | Tidak ada | Tidak menambah rate |

**Data Riset:**
- **Nucamp (2025)** menyatakan portfolio yang kuat dapat membantu junior developer mencapai rate 10-20% lebih tinggi.
- Developer dengan 3-5 proyek real yang bisa di-demo memiliki posisi negosiasi lebih baik.
- Untuk senior remote roles, portfolio yang kuat + in-demand skills bisa mencapai six-figure salary (USD).

**Rekomendasi:** Proyek ini akan menjadi **portofolio flagship** yang bisa menaikkan rate ke Rp 400-500k di proyek berikutnya.

> **Sumber:**
> - Nucamp. "Developer Portfolio and Salary." https://nucamp.co (2025)
> - DevCamp. "Portfolio Impact on Career." https://devcamp.com (2025)

---

### 7. KONTEKS FREELANCE

| Faktor | Kondisi | Dampak |
| --- | --- | --- |
| **Engagement Type** | Solo Freelancer | Tidak ada overhead agency (markup 30-50%) |
| **Contract Type** | Project-Based | Rate lebih rendah dari hourly |
| **Payment Security** | Progress-Based (Termin) | Risiko lebih rendah |
| **Timeline Flexibility** | 16 Minggu | Tidak urgent, tidak ada rush fee |

**Data Riset - Perbandingan Rate Agency vs Freelancer:**

| Sumber | Agency Rate/Hour (USD) | Freelancer Rate/Hour (USD) |
| --- | --- | --- |
| Synodus | $20 | N/A |
| Mitrais | $25 | N/A |
| Lizard Global | $50 | N/A |
| GITS ID | $100 | N/A |
| Average Upwork (Indonesia) | N/A | $10-$20 |

- **Synodus (2025)** melaporkan agency rates di Indonesia berkisar $20-$100/jam.
- **Index.dev** mencatat freelancer di Asia Tenggara rate $20-$33/jam, lebih rendah 20-30% dari agency.
- **Volpis** menyatakan agency memiliki overhead lebih tinggi (PM, QA, infra) yang menjustifikasi markup.

**Kalkulasi Perbandingan (162.5 Man-Days):**
- Agency Rate (mid-tier): Rp 800.000/hari → Total: Rp 130.000.000
- Senior Freelancer Rate: Rp 600.000/hari → Total: Rp 97.500.000
- **Junior Freelancer Rate: Rp 135.000/hari → Total: Rp 21.937.500** ✓

Klien mendapat **penghematan 80-85%** dengan trade-off:
- Timeline mungkin lebih fleksibel jika ada learning curve
- Revisi mungkin lebih banyak di fase awal

> **Sumber:**
> - Synodus. "Software Development Companies Indonesia." https://synodus.com (2025)
> - Index.dev. "Freelance Developer Rates 2025." https://index.dev (2025)
> - Volpis. "Freelancer vs Agency." https://volpis.com (2025)
> - Thrive.co.id. "Software Development Indonesia." https://thrive.co.id (2025)

---

### 8. KOMPLEKSITAS SISTEM ENTERPRISE

| Komponen | Complexity Score (1-5) | Referensi |
| --- | --- | --- |
| Multi-Role RBAC + Impersonation | 4/5 | FSD V2.6 Actor Definition |
| Credit Limit Heuristics | 4/5 | Blueprint V3.4 Section 2 |
| Tier-Based Pricing Engine | 3/5 | Blueprint V3.4 Section 2.B |
| Loyalty Point Multiplier | 3/5 | Blueprint V3.4 Section 4 |
| ERP Integration (Legacy) | 5/5 | WBS V2.5 Epic 2.4 (14 MD) |
| WhatsApp SLA Routing | 4/5 | WBS V2.5 Epic 2.5 (11 MD) |
| Cloud Infrastructure (Terraform) | 4/5 | DevOps V2.4 Section 2 |
| Invoice & Payment Tracking | 3/5 | FSD V2.6 Section 4.6 |
| SLA Escalation Engine | 3/5 | FSD V2.6 Section 4.7 |

**Data Riset:**
- **Webplan24** melaporkan platform B2B dengan ERP integration dan custom pricing bisa mencapai Rp 500 juta - Rp 5 miliar di agency.
- **Mordor Intelligence** mencatat enterprise B2B platform membutuhkan fitur khusus: bulk orders, credit-based payment, negotiated pricing.
- Integrasi ERP merupakan komponen paling kompleks dengan estimasi **14 Man-Days** (WBS V2.5).

**Average Complexity: 3.7/5 (Medium-High)**

Untuk proyek dengan kompleksitas ini, rate senior normalnya Rp 1.000.000+/hari. Rate Rp 135.000/hari adalah **ultra-aggressive investment pricing** dimana junior mendapat pengalaman enterprise-grade sebagai kompensasi utama.

> **Sumber:**
> - Webplan24. "B2B E-commerce Development Cost." https://webplan24.com (2025)
> - Mordor Intelligence. "Indonesia B2B E-commerce Features." https://mordorintelligence.com (2025)
> - Internal Reference: Blueprint V3.4, DevOps V2.4, WBS V2.5

---

### SUMMARY: MATRIKS JUSTIFIKASI RATE

| Parameter | Score | Justifikasi | Sumber Utama |
| --- | --- | --- | --- |
| Lokasi | ✓ | Non-Jakarta, cost efficiency | JobStreet, SalaryExpert |
| Pengalaman | ✓ | Junior 1-2 tahun, rate sesuai | Dealls, Codepolitan, Kodingakademi |
| Industri | ✓ | B2B mid-complexity, learning value | Mordor Intelligence, Webplan24 |
| Tech Stack | ✓ | Mainstream stack, achievable | NodeFlair, Ruul.io, JobStreet |
| Soft Skills | ✓ | Documentation ability (+10-20%) | Nucamp, DigitalCrafts |
| Portofolio | ✓ | Building flagship project | Nucamp, DevCamp |
| Freelance | ✓ | No agency overhead (save 80-85%) | Synodus, Index.dev, Volpis |
| Enterprise System | ⚠️ | Complex, compensated by experience | Webplan24, Internal WBS |

**FINAL RATE: Rp 135.000/Man-Day — AGGRESSIVE INVESTMENT PRICING**

---

### CATATAN UNTUK NEGOSIASI

Jika klien mempertanyakan rate yang rendah, jawab dengan:

> *"Rate Rp 135.000/hari ini adalah strategi aggressive pricing. Berdasarkan data pasar (Dealls, JobStreet), rate junior freelancer berkisar Rp 136.000 - Rp 250.000/hari. Saya menawarkan rate di batas bawah karena: (1) Proyek ini menjadi portofolio flagship saya, (2) Klien mendapat penghematan 80-85% dibanding agency. Ini adalah investasi jangka panjang untuk membangun relationship dan reputasi."*

---

### DAFTAR PUSTAKA (REFERENCES)

1. Dealls. (2025). "Gaji Programmer di Indonesia." https://dealls.com
2. Codepolitan. (2025). "Gaji Software Engineer Indonesia." https://codepolitan.com
3. Kodingakademi. (2025). "Gaji Freelance Web Developer." https://kodingakademi.id
4. SoftwareSeni. (2025). "Gaji Web Developer Indonesia." https://softwareseni.co.id
5. JobStreet Indonesia. (2025). "Software Developer Salary." https://jobstreet.com
6. SalaryExpert. (2025). "Software Developer Salary Jakarta." https://salaryexpert.com
7. NodeFlair. (2025). "Front-End Developer Salary Indonesia." https://nodeflair.com
8. 9cv9. (2025). "Software Developers Salary in Indonesia." https://9cv9.com
9. Mordor Intelligence. (2025). "Indonesia B2B E-commerce Market." https://mordorintelligence.com
10. Webplan24. (2025). "E-commerce Development Cost Indonesia." https://webplan24.com
11. Synodus. (2025). "Software Development Companies Indonesia." https://synodus.com
12. Index.dev. (2025). "Freelance Developer Rates." https://index.dev
13. Ruul.io. (2025). "Freelance Developer Rates 2025." https://ruul.io
14. FastlaneRecruit. (2025). "DevOps Salary Trends." https://fastlanerecruit.com
15. Volpis. (2025). "Freelancer vs Agency." https://volpis.com
16. Nucamp. (2025). "Web Developer Salary and Portfolio Impact." https://nucamp.co
17. DigitalCrafts. (2025). "Developer Portfolio Impact." https://digitalcrafts.com
