# RAB & Procurement Plan — Paket A (Option B Lead API)
## PT. Alfa Beauty Cosmetica

**Status:** DRAFT (auditable template)  
**Date:** 2026-01-10  
**Canonical scope reference:** `docs-paket-a/paket-a.md` (v2.1)

Dokumen ini menyusun **RAB (budget)** dan **procurement plan** untuk Paket A, dengan prinsip **Done = PASS + Evidence**.

> **Non-assumption rule:** Angka yang tidak bisa dibuktikan dari sumber resmi/quote vendor **tidak** akan “diarang”. Semua komponen yang belum punya angka akan berbentuk **parameter** + checklist evidence.

---

## 1) Output yang harus dihasilkan (agar bisa disebut “RAB siap dipakai”)

RAB dianggap siap jika memenuhi **PASS + Evidence**:

- **PASS**: ada angka final untuk tiap line item (CapEx/OpEx) + alasan pemilihan opsi (arsitektur/vendornya) + risiko & contingency diputuskan.
- **Evidence**: ada bukti:
  - link pricing resmi (atau PDF quotation) untuk komponen infra/SaaS
  - kurs konversi USD→IDR yang dipakai (screenshot/URL sumber kurs pada tanggal approval)
  - approval CIO/CTO + Finance/Owner (email/WA/minutes) disimpan di evidence pack.

**Lokasi evidence yang disarankan:**
- `artifacts/paket-a/evidence-pack/01-signoff/` → approval RAB
- `artifacts/paket-a/evidence-pack/06-ops/` → bukti kontrak/SLA/DPA/vendor onboarding

---

## 2) Input yang wajib diputuskan (tanpa ini RAB tidak boleh “final”)

### 2.1 Keputusan teknis (mengunci BoM)

- [ ] Opsi hosting Website (Next.js):
  - [ ] Opsi 1: VPS (IaaS) 
  - [x] Opsi 2: PaaS (mis. Vercel)  
    _Decision (user): Hybrid PaaS dipilih._
  - [ ] Opsi 3: Enterprise (quote)
- [ ] Opsi persistence untuk Lead API (durable):
  - [x] Postgres managed (Supabase **Free** — selected; upgrade path to Pro if needed)
  - [ ] Alternatif: Postgres managed (Neon) 
  - [ ] Postgres self-hosted (di VPS)
- [ ] Kebutuhan WAF/CDN (jika ya, vendor & paket harus jelas)
- [ ] Kebutuhan observability (minimal error logging + uptime/alerting)
- [x] Primary domain (public): `alfabeautycosmetica.com` (.com)
- [x] Redirect/defensive domain (bundle): `alfabeautycosmetica.co` (redirect ke .com)

### 2.2 Asumsi operasional (mempengaruhi sizing & biaya)

> Jika belum ada angka traffic, gunakan skenario (Low/Med/High) dengan parameter, bukan “nebak”.

- [ ] Target traffic bulanan (pageviews, atau request) → **Low/Med/High**
- [ ] Target retensi lead (default di spec: 12 bulan) → final/diubah?
- [ ] SLA follow-up internal lead (spec menyarankan <24 jam) → final?
- [ ] Kebutuhan data residency / compliance (jika ada)

### 2.3 Keputusan finansial

- [x] **Day rate** (IDR/MD) untuk menghitung biaya delivery (CapEx jasa)  
  _Decision (user): pekerjaan “mudah/junior” = **Rp200.000/MD**._
- [ ] **Contingency** (%) yang disetujui (berbasis risiko, bukan angka asal)
- [ ] Mata uang pembayaran vendor (USD/IDR) + mekanisme konversi

---

## 3) Rate card (day rate IDR) — dipisah per kompleksitas

Tujuan pemisahan day rate: memaksa biaya mengikuti **risk + ownership**, bukan “rata satu harga”. Ini selaras dengan DoD yang memasukkan keamanan, reliability, testing, dan evidence.

> **Prinsip penting:** di `paket-a.md`, **Class (A/B/C)** dipakai untuk *planning multiplier* (range Best/Likely/Worst), bukan otomatis “tier billing”. Tier billing di bawah ini ditentukan oleh rubric risiko/ownership.

### 3.1 Kategori kompleksitas

**T1 — Mudah (Junior web dev)**: **Rp200.000/MD** _(ditetapkan user)_

Contoh ruang lingkup:
- halaman statis sederhana (About/Contact/Privacy/Terms) setelah pattern siap
- perubahan copy/layout minor
- komponen UI sederhana yang tidak menyentuh jalur konversi/lead

**T2 — Standar (delivery + verifikasi)**: **Rp350.000/MD** _(final draft; butuh approval owner/finance)_

Contoh ruang lingkup:
- SEO basics, social metadata, JSON-LD minimum
- accessibility pass (yang sifatnya sistematis, bukan sekadar “rapihin CSS”)
- CWV wiring, analytics event plumbing (non-blocking)
- test automation (Playwright smoke) untuk jalur kritikal

**T3 — Kritis (lead/security/ops ownership)**: **Rp600.000/MD** _(final draft; butuh approval owner/finance)_

Contoh ruang lingkup:
- Lead API durability (persistence), idempotency, export protected
- input hardening, rate limiting, anti-spam, auditability
- integration tests untuk contract + rate limit
- release readiness yang mempengaruhi “lead tidak boleh putus”

> Catatan audit: angka T2/T3 menjadi PASS hanya jika disetujui Owner/Finance (evidence di `evidence-pack/01-signoff/`).

### 3.2 Rubric penentuan tier (audit-friendly)

Tier tidak ditentukan oleh “susah ngoding”, tetapi oleh **risiko + ownership**. Gunakan skor 0–2 per dimensi (maks 10):

| Dimensi | 0 | 1 | 2 |
|---|---|---|---|
| Blast radius (BR) | dampak kecil (UI/copy) | fitur penting | konversi/lead/security/availability |
| Uncertainty (U) | jelas/pattern ada | beberapa edge case | banyak unknown/iterasi |
| Integration surface (IS) | 1 komponen | 2 komponen | multi-sistem (DB/auth/export/rate-limit) |
| Verification burden (VB) | screenshot cukup | test + evidence | integration test + evidence + observability |
| Ops ownership (OO) | tidak berdampak ops | monitoring ringan | berpotensi SEV-1 / abuse |

Total skor → Tier:
- **T1:** 0–3
- **T2:** 4–6
- **T3:** 7–10

### 3.3 Mapping tier untuk Paket A (berdasarkan rubric)

Mapping ini dipakai untuk menghitung CapEx delivery Paket A (Likely) dari daftar task di `paket-a.md` §12.1.

**Ringkasan MD per tier (Likely):**
- T1: **5.25 MD**
- T2: **27.75 MD**
- T3: **7.25 MD**

**Rationale ringkas:**
- **T3** dibatasi ke jalur **lead/security/ops** (A6.*) dan **form lead** (A2-12).
- **T1** untuk halaman/komponen yang straightforward setelah pattern jadi.
- Sisanya **T2** (delivery standar + verifikasi).

---

## 4) Model biaya (CapEx delivery + OpEx running)

### 4.1 CapEx — biaya delivery (jasa implementasi)

Sumber effort baseline: `docs-paket-a/paket-a.md` §12.

#### Metode hitung (tier-based; lebih presisi daripada Class→tier)

Karena **Class A/B/C** di spec adalah band risiko untuk *multiplier*, biaya delivery dihitung dari **tier T1/T2/T3** berdasarkan rubric (§3.2), bukan mapping langsung dari Class.

**Rumus (tier-based):**

$$\text{CapEx} = (\text{MD}_{T1}\times\text{rate}_{T1}) + (\text{MD}_{T2}\times\text{rate}_{T2}) + (\text{MD}_{T3}\times\text{rate}_{T3})$$

Dengan:
- $\text{rate}_{T1}=200{,}000$ (IDR/MD)
- $\text{rate}_{T2}=350{,}000$ (IDR/MD)
- $\text{rate}_{T3}=600{,}000$ (IDR/MD)

#### Perhitungan CapEx (Likely)

- T1: $5.25\times 200{,}000 = 1{,}050{,}000$
- T2: $27.75\times 350{,}000 = 9{,}712{,}500$
- T3: $7.25\times 600{,}000 = 4{,}350{,}000$

**Total Likely CapEx:** **Rp15.112.500**

#### Perhitungan CapEx (Best/Worst) — memakai multiplier kelas dari §12.2

Untuk range Best/Worst, spec menyediakan total MD Best/Likely/Worst (berbasis multiplier Class). Karena tier mapping dibuat per-task, kita gunakan pendekatan audit-friendly berikut:

- ambil total MD dari spec:
  - Best: **36.86 MD**
  - Likely: **40.25 MD**
  - Worst: **50.81 MD**
- proporsi tier dari Likely dianggap stabil (sementara) untuk envelope:
  - proporsi T1/T2/T3 = $\frac{5.25}{40.25}$ / $\frac{27.75}{40.25}$ / $\frac{7.25}{40.25}$

Hasil envelope (rounded):

- **Best:** ~**Rp13.017.000**
- **Likely:** **Rp15.112.500**
- **Worst (baseline planning):** ~**Rp19.071.000**

> Jika nanti kita memindahkan beberapa task antar-tier, angka Best/Worst tinggal dihitung ulang dari MD per tier tanpa menyentuh asumsi lain.

> Catatan: effort di spec sudah memasukkan QA gates (Playwright smoke, integration tests) + ops minimum. Jangan “dipotong” tanpa change request, karena DoD = PASS+Evidence.

### 4.2 OpEx — biaya bulanan/tahunan (infra + SaaS)

OpEx dibagi menjadi:
- **Compute/hosting** (website + lead API)
- **Database/persistence**
- **Observability** (error logging/monitoring)
- **Anti-spam/rate-limit** (jika pakai layanan khusus)
- **Domain/DNS/Email** (jika diperlukan)

Semua biaya vendor yang diambil dari internet harus punya **evidence link** (lihat Lampiran Pricing).

### 4.3 Kurs (IDR) untuk konversi vendor USD (audit gate)

Vendor mayoritas menampilkan USD. Gunakan kurs pada tanggal approval RAB.

- `usd_to_idr = 16851.60` (evidence: screenshot/URL kurs pada tanggal approval; simpan di `artifacts/paket-a/evidence-pack/01-signoff/`)
- $\text{Biaya IDR} = \text{Biaya USD} \times \text{usd\_to\_idr}$

Catatan penting:
- Saya mencoba mengambil kurs BI (JISDOR) dari website BI, namun di environment ini konten tidak bisa diekstrak (kemungkinan dynamic/anti-scrape). Karena itu, **kita tetap audit-friendly** dengan cara: tempel **screenshot/URL** kurs yang dipakai pada hari approval, lalu simpan di evidence pack.

---

## 5) Bill of Materials (BoM) — opsi arsitektur dan komponen biaya

> Prinsip: Paket A butuh jalur lead yang **durable + protected export** (lihat UAT-11/12 dan DoD). BoM harus memfasilitasi itu.

### Opsi 1 — “Single VPS” (IaaS sederhana, tanggung jawab ops lebih tinggi)

**Kapan cocok:** traffic rendah–menengah, tim siap mengelola patching/backup/monitoring.

**Komponen minimal:**
- 1× VM/VPS untuk menjalankan:
  - Website (Next.js) 
  - Lead API (Go/Next route) 
  - Postgres (self-hosted) **atau** DB managed (campuran)
- Backup + log rotation + hardening
- Minimal monitoring/error logging

**Referensi pricing VPS (DigitalOcean Droplets — contoh Basic):**
- 1 GiB / 1 vCPU: **$6.00 / month**
- 2 GiB / 1 vCPU: **$12.00 / month**
- 4 GiB / 2 vCPU: **$24.00 / month**
- 8 GiB / 4 vCPU: **$48.00 / month**

Evidence link: https://www.digitalocean.com/pricing/droplets

**Backup (DigitalOcean):**
- “Percentage-based Backups” disebut **20% (Weekly) atau 30% (Daily) dari biaya droplet** (opsi lain usage-based tersedia)

Evidence link: https://www.digitalocean.com/pricing/droplets

**Risiko/konsekuensi (harus tercermin di contingency):**
- patching OS, hardening, backup restore drill, DB tuning = effort ops
- SLA & HA tidak “gratis”; jika butuh HA, biaya naik (LB, multi-node, managed DB)

**Line items (isi angka setelah sizing diputuskan):**
- Compute VPS: `droplet_usd_per_month = ____`
- Backup: `backup_multiplier = 0.2 (weekly) atau 0.3 (daily)` (atau usage-based)
- Monitoring/error logging: (lihat opsi Sentry di §4.3)

### Opsi 2 — “Hybrid PaaS” (operasional lebih ringan, biaya lebih predictable) — **SELECTED**

**Kapan cocok:** tim ingin delivery cepat, ops minimal, dan scaling lebih mudah.

**Komponen minimal (baseline untuk RAB):**
- Website hosting: Vercel (Next.js)
- DB managed: **Supabase (Free — selected)** atau Neon _(pilih 1 untuk angka final; Pro dianggap upgrade option)_
- Rate limiting: Upstash (opsional; bisa juga self-managed)
- Error logging: Sentry (atau alternatif)

#### 4.2.1 Website hosting (Vercel)

Dari halaman pricing Vercel:
- **Pro:** **$20/mo + additional usage**

Evidence link: https://vercel.com/pricing

**Parameter yang harus diputuskan (tidak diasumsikan):**
- `vercel_seats = ____` (berapa developer seat)
- kebutuhan add-on (analytics, observability, dll.) jika dipakai

#### 4.2.2 Database managed — Supabase (Postgres)

Dari pricing Supabase (ringkasan yang relevan untuk budgeting):
- **Free:** **$0 / month**
  - **500 MB database size**
  - **Shared CPU • 500 MB RAM**
  - **Free projects are paused after 1 week of inactivity**
  - **Automatic backups: not included (Free)**
  - **Log retention (API & Database) lebih pendek pada Free**

- **Pro (upgrade option): From $25 / month**
  - termasuk **$10/month compute credits**

Evidence link: https://supabase.com/pricing

Catatan: Supabase juga punya pricing compute add-on per size (billed hourly) di halaman yang sama.

#### 4.2.3 Database managed — Neon (Postgres)

Dari pricing Neon:
- **Free:** $0
- **Launch (usage-based, no monthly minimum):**
  - **$0.106 per CU-hour compute**
  - **$0.35 per GB-month storage**
- **Scale (usage-based, no monthly minimum):**
  - **$0.222 per CU-hour compute**
  - **$0.35 per GB-month storage**

Evidence link: https://neon.com/pricing

**Parameter yang wajib diisi (karena Neon usage-based):**
- `avg_cu = ____` (rata-rata CU berjalan)
- `hours_per_month = ____` (biasanya 720 jika selalu on; bisa lebih kecil jika scale-to-zero)
- `storage_gb = ____`

Rumus:
- $\text{db\_compute\_usd} = 0.106 \times \text{avg\_cu} \times \text{hours\_per\_month}$ (Launch)
- $\text{db\_storage\_usd} = 0.35 \times \text{storage\_gb}$

#### 4.2.4 Rate limiting / Redis (Upstash)

Dari pricing Upstash Redis:
- Free: $0 (256 MB, 500K monthly commands)
- Pay-as-you-go: **$0.2 per 100K commands**, data size sampai 100 GB
- Fixed plan: **$10 / month** (+ $5 × read regions), 250 MB
- “Prod Pack” add-on: **+$200/month per database**

Evidence link: https://upstash.com/pricing

**Parameter:**
- `commands_per_month = ____`
- `plan = free | payg | fixed`

> Catatan: Rate limiting juga bisa diimplementasi tanpa Redis (token bucket in-memory) tapi konsekuensinya berbeda pada multi-instance dan reliability. Keputusan ini harus dicatat sebagai ADR/budget note, bukan asumsi.

### Opsi 3 — “Enterprise / SLA-driven” (butuh quotation)

**Kapan cocok:** butuh SLA kuat, support 24/7, compliance, atau vendor policy tertentu.

- Cloudflare Enterprise/Externa packages: pricing berbasis **contact sales** (di environment ini, halaman Pro/Business publik tidak bisa diambil karena redirect tracking; Enterprise page accessible namun tidak menampilkan angka publik).

Evidence link (Enterprise packages page): https://www.cloudflare.com/plans/enterprise/

- Vercel Enterprise: juga berbasis sales/quotation.

Evidence link: https://vercel.com/pricing

**Output procurement wajib:** lampirkan PDF quotation + SLA + DPA.

---

## 5) Observability & monitoring (minimal untuk DoD)

### 5.1 Error logging (Sentry — contoh)

Dari pricing Sentry:
- Developer: $0 (1 user)
- Team: **$26/mo** (annual billing) 
- Business: **$80/mo** (annual billing)

Evidence link: https://sentry.io/pricing/

**Parameter:**
- `sentry_plan = developer | team | business`
- `billing = annual | monthly` (sesuai kebijakan procurement)

> Minimal DoD membutuhkan error logging untuk lead pipeline agar “drop lead” tidak silent.

---

## 6) Tabel RAB (template siap isi)

> Isi “USD” dulu (jika vendor USD), lalu konversi ke IDR menggunakan kurs evidence.

### 6.1 CapEx (delivery)

| Item | Basis | Subtotal (IDR) | Evidence |
|---|---|---:|---|
| Delivery Best | Tier-based (T1/T2/T3) envelope | ~13.017.000 | approval rate card + rubric + tier mapping |
| Delivery Likely | Tier-based (T1/T2/T3) | 15.112.500 | approval rate card + rubric + tier mapping |
| Delivery Worst (baseline) | Tier-based (T1/T2/T3) envelope | ~19.071.000 | approval rate card + rubric + tier mapping |
| Contingency | % × (baseline) | ___ | approval |

> Pilih salah satu baseline (biasanya Worst) sebagai dasar PO/kontrak.

### 6.2 OpEx (bulanan)

| Item | Opsi | Biaya (USD/mo) | Kurs (IDR/USD) | Biaya (IDR/mo) | Evidence |
|---|---|---:|---:|---:|---|
| Website hosting | Vercel Pro | `20 * vercel_seats` | `usd_to_idr` | `20 * vercel_seats * usd_to_idr` | vercel pricing link + seat count |
| Compute VPS | (tidak dipakai di Hybrid baseline) | - | - | - | - |
| Database | Supabase Free (**selected**) | `0` | `usd_to_idr` | `0` | https://supabase.com/pricing (Free plan + pause/backup notes) |
| Database (upgrade option) | Supabase Pro | `25 + supabase_pro_usage_usd` | `usd_to_idr` | `(25 + supabase_pro_usage_usd) * usd_to_idr` | https://supabase.com/pricing + invoice/usage jika upgrade |
| Database | Neon Launch (usage) | `0.106*avg_cu*hours_per_month + 0.35*storage_gb` | `usd_to_idr` | `(0.106*avg_cu*hours_per_month + 0.35*storage_gb) * usd_to_idr` | neon pricing link + input parameter |
| Rate limiting | Upstash | `upstash_usd` | `usd_to_idr` | `upstash_usd * usd_to_idr` | upstash pricing link + plan/commands |
| Error logging | Sentry | `sentry_usd` | `usd_to_idr` | `sentry_usd * usd_to_idr` | sentry pricing link + plan/billing |
| Domain/DNS/Privacy | Name.com (Year-1 quote) | `(domain_bundle_usd_per_year + domain_privacy_usd_per_year + icann_fee_usd_per_year) / 12` | `usd_to_idr` | `((domain_bundle_usd_per_year + domain_privacy_usd_per_year + icann_fee_usd_per_year)/12) * usd_to_idr` | `artifacts/paket-a/evidence-pack/01-signoff/domain_email_quote_2026-01-10.md` |
| Email | Google Workspace (Yearly) | `google_workspace_usd_per_year / 12` | `usd_to_idr` | `(google_workspace_usd_per_year/12) * usd_to_idr` | `artifacts/paket-a/evidence-pack/01-signoff/domain_email_quote_2026-01-10.md` |

**Catatan input (wajib diisi agar angka bisa “final”):**

- `usd_to_idr` = kurs pada tanggal approval (evidence screenshot/URL)
- Vercel: `vercel_seats` (jumlah seat yang benar-benar dibayar)
- Supabase Free: biaya $0; namun punya konsekuensi operasional (paused after inactivity, tanpa automatic backups, log retention pendek) — keputusan ini wajib tercatat sebagai risk acceptance.
- Supabase Pro (jika upgrade): `supabase_pro_usage_usd` (0 jika hanya base fee; jika exceed credits/compute add-on, isi sesuai invoice/estimator)
- Neon: `avg_cu`, `hours_per_month`, `storage_gb`
- Upstash: `upstash_usd` (mis. fixed $10/mo, atau PAYG berdasarkan `commands_per_month`)
- Sentry: `sentry_usd` (mis. Team $26/mo annual; jika monthly beda—isi sesuai plan yang dipilih)
- Domain/DNS/Privacy (Year-1):
  - `domain_bundle_usd_per_year` (mis. bundle .com + defensive/redirect .co)
  - `domain_privacy_usd_per_year`
  - `icann_fee_usd_per_year`
- Email (Year-1): `google_workspace_usd_per_year`

**Baseline contoh (evidence-backed) untuk Domain/DNS/Email (Year-1 purchase):**
- `domain_bundle_usd_per_year = 15.99`
- `domain_privacy_usd_per_year = 9.98`
- `icann_fee_usd_per_year = 0.20`
- `google_workspace_usd_per_year = 42.00`

Evidence: `artifacts/paket-a/evidence-pack/01-signoff/domain_email_quote_2026-01-10.md`

Catatan: harga renewal tahun berikutnya bisa berbeda (promo vs renewal). Untuk budgeting konservatif, gunakan angka renewal/invoice terbaru pada saat perpanjangan.

**Minimal baseline (contoh struktur, bukan asumsi angka):**
- Pilih **satu** database: Supabase (Free **atau** Pro upgrade) **atau** Neon (jangan dihitung ganda).
- Jika Anda ingin baseline “serendah mungkin”: gunakan Supabase Free, pilih Upstash free/PAYG kecil, Sentry plan minimal yang disetujui.

#### 6.2.1 Skenario OpEx (Low / Medium / High) — Hybrid PaaS

Skenario di bawah ini adalah **paket parameter** untuk membantu budgeting. Angka final tetap memerlukan evidence (kurs + invoice/plan). Setiap skenario memilih **satu** database (tidak dihitung ganda).

**Scenario L (Low — baseline minimal)**

- `vercel_seats = 1`
- Database: **Supabase Free**
- Rate limiting: Upstash
  - `upstash_usd = 0` (plan free / PAYG sangat kecil)
- Error logging: Sentry
  - `sentry_usd = 0` (plan Developer)

Total (USD/mo) (tanpa domain/DNS/email):

`opex_usd = (20*1) + 0 + 0`

**Scenario M (Medium — recommended baseline operasi) — SELECTED (untuk RAB clean)**

- `vercel_seats = 2`
- Database: **Supabase Free**
- Rate limiting: Upstash
  - `upstash_usd = 10` (fixed plan)
- Error logging: Sentry
  - `sentry_usd = 26` (Team; annual billing equivalent; final via plan yang dipilih)

Total (USD/mo) (tanpa domain/DNS/email):

`opex_usd = (20*2) + 10 + 26`

**Scenario H (High — konservatif untuk usage lebih tinggi)**

- `vercel_seats = 3`
- Database: **Supabase Free**
- Rate limiting: Upstash
  - `upstash_usd = 10` (fixed plan) atau `upstash_usd = (0.2/100000)*commands_per_month`
- Error logging: Sentry
  - `sentry_usd = 80` (Business; annual billing equivalent; final via plan yang dipilih)

Total (USD/mo) (tanpa domain/DNS/email):

`opex_usd = (20*3) + upstash_usd + 80`

> Catatan: Domain/DNS sering dibayar tahunan dan bisa dalam IDR. Masukkan dari invoice/quote pada baris Domain/DNS.

### 6.3 OpEx (tahunan)

| Item | Biaya (IDR/year) | Evidence |
|---|---:|---|
| Domain/DNS/Email (Year-1 purchase) | `(domain_bundle_usd_per_year + domain_privacy_usd_per_year + icann_fee_usd_per_year + google_workspace_usd_per_year) * usd_to_idr` | `artifacts/paket-a/evidence-pack/01-signoff/domain_email_quote_2026-01-10.md` + kurs |
| Domain/DNS (renewal, Year-2+) | `domain_renewal_usd_per_year * usd_to_idr` | registrar invoice/renewal quote + kurs |
| Email (renewal, Year-2+) | `google_workspace_renewal_usd_per_year * usd_to_idr` | Google Workspace invoice/price + kurs |
| Total OpEx tahun 1 | `12 * total_opex_idr_per_month` (atau kombinasi monthly+annual billing) | breakdown + kurs + invoice/vendor billing |

Catatan:
- `domain_renewal_usd_per_year` dan `google_workspace_renewal_usd_per_year` sengaja **parameter**, karena harga renewal bisa berubah (promo vs renewal, perubahan pricing vendor). Isi hanya jika sudah ada invoice/quote renewal.

### 6.4 Maintenance retainer terms (post-launch)

Tujuan retainer: menjaga **jalur lead tetap sehat** (ops minimum) + perubahan minor tanpa membuat scope creep “gratis”.

#### Service window & komunikasi

| Item | Terms |
|---|---|
| Jam kerja (work window) | **15:00–24:00 WIB**, **Senin–Jumat** |
| Weekend | Tidak termasuk (kecuali ada addendum) |
| Intake laporan | Boleh kapan saja (WA/email/ticket), tetapi dikerjakan di work window |
| Emergency override | **Tidak ada** (SEV-1 di luar jam kerja masuk antrean jam kerja berikutnya) |

#### Ruang lingkup maintenance (included)

Termasuk (selama masih Paket A scope):
- bugfix minor
- patch dependency minor/patch (sesuai kebijakan lifecycle)
- monitoring ringan (cek error log, health lead submit)
- perubahan konten minor (copy/image) dan penyesuaian UI kecil
- tuning kecil (rate limit parameter, message copy, dll.)

Tidak termasuk (change request):
- fitur baru di luar Paket A (mis. login, pricing, ERP integration, loyalty, dsb.)
- perubahan besar desain/IA
- migrasi besar stack/hosting tanpa incident-driven reason

#### Paket retainer (pilih 1)

Billing dilakukan **mingguan** (in arrears), tetapi ada **minimum commitment** per bulan.

| Paket | Kuota | Estimasi biaya / bulan (IDR) | Notes |
|---:|---:|---:|---|
| S | 4 MD | 4 × rate T2 = **1.400.000** | cocok jika perubahan jarang |
| M (recommended) | 8 MD | 8 × rate T2 = **2.800.000** | ~1 hari/minggu |
| L | 12 MD | 12 × rate T2 = **4.200.000** | cocok jika iterasi sering |

Ketentuan penggunaan kuota:
- Kuota dipakai untuk pekerjaan **T1/T2/T3** sesuai tier.
- Jika kuota habis, excess ditagih mingguan sesuai rate tier.

#### Evidence & audit

- Semua aktivitas maintenance harus tercatat (ticket/log) dan, jika menyentuh gate DoD (lead/security/ops), sertakan evidence singkat.

---

## 7) Procurement plan (agency-grade, audit-friendly)

### 7.1 Prinsip

- Procurement mengikuti scope freeze (§14 di `paket-a.md`). Perubahan scope = change request.
- Vendor dipilih berdasarkan **fit terhadap DoD** (lead durability, access-controlled export, security headers, observability).

### 7.2 Paket yang perlu diprocure (minimal)

1) Website hosting (atau compute) 
2) Database/persistence 
3) Observability/error logging
4) (Opsional) Rate limiting/WAF

### 7.3 Kriteria evaluasi vendor (wajib dicatat)

| Kriteria | Pertanyaan | Evidence yang diminta |
|---|---|---|
| SLA/Support | Ada SLA? jam support? escalation? | SLA doc / contract |
| Security | dukung header/WAF? audit logs? | security page / doc |
| Cost control | spend cap, alert, invoice detail | billing docs |
| Data location | region tersedia? data residency? | region list / DPA |
| Exit strategy | export data mudah? lock-in rendah? | docs + test export |

### 7.4 Proses (ringkas tapi lengkap)

- RFQ/RFP ringan (1–2 hari): kirim kebutuhan Paket A + NFR + DoD gate.
- Shortlist (1 hari): pilih 2 opsi.
- Decision record: 1 halaman “why this vendor” + risiko.
- Purchase/Onboarding (sesuai vendor): buat akun org, SSO (jika ada), billing owner.

**Evidence wajib disimpan:**
- Quotation/Invoice/receipt
- SLA + DPA
- Screenshot konfigurasi billing owner dan spend alert

---

## 8) Approval & sign-off (PASS + Evidence)

RAB dianggap “approved” hanya jika record berikut terisi dan ada bukti:

| Field | Value |
|---|---|
| Status | **PENDING** |
| Approved by | _[Nama, jabatan]_ |
| Approval date | _[YYYY-MM-DD]_ |
| Approval method | _Email / WA / Meeting minutes_ |
| Evidence link | _[path: artifacts/paket-a/evidence-pack/01-signoff/...]_ |

---

## Lampiran A — Pricing sources (evidence links)

> Link berikut adalah sumber yang berhasil diambil dari environment ini (2026-01-10). Jika vendor mengubah pricing, refresh link + simpan snapshot.

- DigitalOcean Droplets pricing: https://www.digitalocean.com/pricing/droplets
- Vercel pricing: https://vercel.com/pricing
- Supabase pricing: https://supabase.com/pricing
- Neon pricing: https://neon.com/pricing
- Upstash pricing: https://upstash.com/pricing
- Sentry pricing: https://sentry.io/pricing/

**Catatan Cloudflare:** Halaman Free/Pro/Business publik tidak dapat diambil dari environment ini karena redirect tracking. Untuk audit, lakukan verifikasi manual dari jaringan/agent lain dan simpan screenshot/URL final. Enterprise packages page yang accessible (tanpa angka publik): https://www.cloudflare.com/plans/enterprise/
