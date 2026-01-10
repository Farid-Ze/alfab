# LAPORAN AUDIT KONSISTENSI ANTAR DOKUMEN
## PT. Alfa Beauty Cosmetica - B2B Digital Hub

**Tanggal Audit:** 8 Januari 2026  
**Auditor:** AI Assistant  
**Trigger:** User menemukan inkonsistensi pada definisi aktor Sub-Distributor

---

# BAGIAN 1: INKONSISTENSI YANG DITEMUKAN

## 🔴 INKONSISTENSI KRITIS (Perlu Perbaikan Segera)

### 1.1 Sub-Distributor: Login vs No Login

| Dokumen | Pernyataan | Lokasi |
|---------|------------|--------|
| `fsd-idd.md` | SubDist **"No Login"** (WA-only contact) | Section 2, Line 26 |
| `fsd-idd.md` | "SubDist Zone: Order Queue, Response Interface" | Section 3.1, Line 36 |
| `wbs.md` | "SubDist Dashboard: Queue order, update status (1 MD)" | Section 4, Line 75 |
| `uat.md` | "**Login** SubDist Surabaya" (UAT-21) | Section 3, Line 41 |
| `uat.md` | "SubDist klik 'Proses Order'" (UAT-22) | Section 3, Line 42 |
| `sow.md` | "SubDist Dashboard: Queue order dan interface update status" | Section 2.B.4, Line 36 |
| `database_erd.md` | Tidak ada tabel `SUBDIST_USERS` atau auth untuk SubDist | Section 2 |

**Analisis:**
- FSD Section 2 secara eksplisit menyatakan SubDist **TIDAK memiliki login**
- Namun FSD Section 3.1 menyebutkan "SubDist Zone" dengan "Order Queue, Response Interface"
- UAT-21 menyebutkan langkah "Login SubDist Surabaya"
- WBS dan SoW mengalokasikan effort untuk "SubDist Dashboard"
- Tabel `SUB_DISTRIBUTORS` di ERD tidak memiliki `password_hash` atau field auth

**Dampak:** Tim development akan bingung: Apakah SubDist perlu login atau tidak?

**Rekomendasi:** Klarifikasi salah satu:
1. **Opsi A (No Login):** 
   - Hapus "SubDist Zone" dari FSD
   - Update UAT-21/22 menjadi skenario Admin
   - SubDist hanya terima WA Deep Link
   
2. **Opsi B (With Login):**
   - Tambah kolom `email` dan `password_hash` di tabel `SUB_DISTRIBUTORS`
   - Update FSD Section 2: SubDist memiliki login terbatas
   - Pastikan UAT-21/22 valid

---

### 1.2 SoW Client Dependencies: WhatsApp BSP vs Deep Link

| Dokumen | Pernyataan | Lokasi |
|---------|------------|--------|
| `sow.md` | "Klien telah mendaftarkan akun **WhatsApp Business API (WABA)** sebelum Minggu ke-4" | Section 6.2, Line 132 |
| `sow.md` | "Sistem menggunakan **WhatsApp Deep Link**, bukan WhatsApp Business API. Tidak ada biaya per-message." | Section 3, Line 58 |
| `fsd-idd.md` | "**BUKAN** WhatsApp Business API. Tidak ada integrasi bot, tidak ada biaya per-message" | Section 1, Line 14 |
| `governance.md` | "WhatsApp Deep Link, bukan WhatsApp Business API" | Section 6 |

**Analisis:**
- Di Section 6 SoW, ada persyaratan klien harus daftar WABA
- Tapi di Section 3 SoW dan semua dokumen lain, jelas dinyatakan sistem pakai Deep Link (gratis)
- Ini kontradiksi dalam satu dokumen yang sama!

**Dampak:** Klien mungkin keluar biaya registrasi WhatsApp BSP yang sebenarnya tidak perlu.

**Rekomendasi:** Hapus persyaratan WABA dari SoW Section 6.2.

---

### 1.3 Agent Role: SALESMAN vs ADMIN vs SUPERADMIN

| Dokumen | Role yang Disebutkan | Lokasi |
|---------|---------------------|--------|
| `database_erd.md` | `AGENTS.role`: "SALESMAN\|ADMIN\|SUPERADMIN" | Line 53 |
| `fsd-idd.md` | Actor: AGENT, ADMIN (terpisah) | Section 2 |
| `blueprint.md` | Tidak ada definisi role Agent | - |

**Analisis:**
- ERD menggabungkan Salesman, Admin, dan Superadmin dalam satu tabel `AGENTS`
- FSD memisahkan AGENT dan ADMIN sebagai aktor berbeda
- Tidak jelas apakah ADMIN juga bisa impersonation atau hanya SALESMAN

**Dampak:** Kebingungan pada implementasi RBAC.

**Rekomendasi:** Sinkronkan definisi role:
- SALESMAN: Shadow Mode, lihat klien di regionnya
- ADMIN: Full access SLA Dashboard, Config Management
- SUPERADMIN: Akses ke semua region + system settings

---

## 🟡 INKONSISTENSI MINOR (Perlu Perhatian)

### 1.4 Point Calculation Formula

| Dokumen | Formula | Lokasi |
|---------|---------|--------|
| `blueprint.md` | Belanja Rp 1 Juta → 100 Poin (Silver 1.0x) | Section 4.A |
| `uat.md` | Rp 1.000.000 / 10.000 * 1.2 = **120 poin** (Gold) | UAT-43 |

**Analisis:**
- Blueprint: 1 Juta = 100 poin baseline (1 poin per Rp 10.000)
- UAT-43: Formula `1.000.000 / 10.000 * 1.2`
- Formula di UAT sesuai dengan Blueprint, tapi **tidak ada dokumen yang secara eksplisit menulis formula lengkap**

**Dampak:** Developer harus menebak formula dari simulasi.

**Rekomendasi:** Tambahkan formula eksplisit di FSD atau Blueprint:
```
points_earned = FLOOR(order_total / 10000) × tier_multiplier
```

---

### 1.5 Managed Services Scope: "WhatsApp API Maintenance"

| Dokumen | Pernyataan | Lokasi |
|---------|------------|--------|
| `sow.md` | Managed Services scope: "**WhatsApp API Maintenance**" | Section 5.C, Line 113 |
| Semua dokumen lain | Sistem pakai Deep Link, bukan API | Multiple |

**Analisis:**
- Managed Services menyebut "WhatsApp API Maintenance"
- Tapi sistem tidak pakai WhatsApp API (pakai Deep Link)
- Ini mungkin typo atau copy-paste dari template

**Rekomendasi:** Ubah menjadi "WhatsApp Deep Link Monitoring" atau hapus.

---

### 1.6 Config Keys: Tidak Ada di Blueprint

| Dokumen | Config Keys | Lokasi |
|---------|-------------|--------|
| `blueprint.md` | 5 config keys | Section 8 |
| `database_erd.md` | 8 config keys (termasuk SLA) | Section 3.8 |
| `devops.md` | 3 config keys disebutkan (Loyalty, Threshold, Stock Sync) | Section 4.3 |

**Analisis:**
- Blueprint V3.4 tidak menyebutkan `sla.reminder_hours` dan `sla.escalation_hours`
- Padahal SLA Escalation adalah fitur utama (ada di FSD, UAT, WBS)

**Rekomendasi:** Update Blueprint Section 8 untuk menambahkan:
```
| `sla.reminder_hours` | 18 | Jam kirim reminder ke SubDist |
| `sla.escalation_hours` | 24 | Jam eskalasi ke HQ |
```

---

## 🟢 KONSISTENSI YANG SUDAH BAIK

| Item | Dokumen yang Konsisten |
|------|------------------------|
| Tier Enum (SILVER/GOLD/PLATINUM) | Blueprint, FSD, ERD, UAT ✅ |
| Order Status Enum (8 states) | FSD, ERD, UAT ✅ |
| Invoice Status Enum | FSD, ERD, UAT ✅ |
| Point cair saat Invoice PAID | Blueprint, FSD, ERD, UAT ✅ |
| SLA Timing (18h/24h) | FSD, ERD, UAT, Governance ✅ |
| Payment Terms Tier | Blueprint, FSD, ERD ✅ |
| Safety Buffer Logic | Blueprint, FSD ✅ |
| Total WBS Effort (162.5 MD) | WBS, SoW ✅ |

---

# BAGIAN 2: GAP YANG DITEMUKAN (FITUR BELUM DIDOKUMENTASIKAN)

## 2.1 Fitur yang Disebutkan tapi Tidak Detail

| Fitur | Disebutkan Di | Tapi Tidak Ada Detail Di |
|-------|---------------|--------------------------|
| **Retail Deflection ke Shopee** | Blueprint §6, SoW §2.B.1 | FSD, WBS, UAT |
| **QR Code Garansi** | Blueprint §6.A | FSD, WBS, UAT, ERD |
| **Multi-Language (i18n)** | WBS §3.5, UAT-14 | FSD (tidak ada spesifikasi bahasa apa saja) |
| **Diskon Volume** | UAT-06 | Blueprint, FSD (tidak ada formula) |

**Rekomendasi:**
1. **Retail Deflection:** Jika ini di-scope, tambahkan di FSD dan alokasi WBS
2. **QR Code:** Ini sepertinya out-of-scope atau Phase 2. Klarifikasi dengan klien
3. **i18n:** Tambahkan list bahasa yang didukung (ID, EN)
4. **Diskon Volume:** Tambahkan logic di FSD (mungkin via `min_qty_discount` di `TIER_PRICES`)

---

## 2.2 Tabel Database yang Mungkin Kurang

| Kebutuhan | Tabel yang Ada | Gap |
|-----------|----------------|-----|
| SubDist Authentication | `SUB_DISTRIBUTORS` | Tidak ada `password_hash` jika perlu login |
| Diskon Volume | `TIER_PRICES.min_qty_discount` | Formula tidak didokumentasikan |
| Notification Queue | `IMPERSONATION_NOTIFICATIONS` | Bagaimana dengan notifikasi lain (SLA reminder)? |
| User Session/Token | - | Tidak ada tabel untuk JWT refresh token |

---

## 2.3 API Endpoint yang Belum Didefinisikan

Berdasarkan FSD, berikut endpoint yang disebutkan tapi perlu detail lebih lanjut:

| Endpoint | Status |
|----------|--------|
| `GET /api/credit/status` | ✅ Disebutkan |
| `GET /api/invoices` | ✅ Disebutkan |
| `POST /api/invoices/{id}/payments` | ✅ Disebutkan |
| `GET /api/subdistributors?region_id={id}` | ✅ Disebutkan |
| `POST /api/orders/{id}/route` | ✅ Disebutkan |
| `GET /api/regions` | ⚠️ Disebutkan di FSD §4.4 tapi tidak ada detail |
| `GET /api/products` | ⚠️ Tidak disebutkan tapi pasti ada |
| `POST /api/auth/login` | ⚠️ Tidak disebutkan tapi pasti ada |
| `GET /api/orders` | ⚠️ Tidak disebutkan tapi pasti ada |
| `GET /api/loyalty/balance` | ⚠️ Tidak disebutkan |
| `POST /api/loyalty/redeem` | ⚠️ Tidak disebutkan |

---

# BAGIAN 3: RINGKASAN & REKOMENDASI PRIORITAS

## 3.1 Prioritas Tinggi (Harus Diperbaiki Sebelum Development)

| # | Issue | Dokumen | Fix |
|---|-------|---------|-----|
| 1 | SubDist Login vs No Login | FSD, UAT, WBS, SoW | Pilih satu, update semua dokumen |
| 2 | WABA Requirement di SoW | SoW | Hapus dari Client Dependencies |
| 3 | SLA Config di Blueprint | Blueprint | Tambahkan `sla.*` config keys |

## 3.2 Prioritas Sedang (Perbaiki Saat Sprint Zero)

| # | Issue | Dokumen | Fix |
|---|-------|---------|-----|
| 4 | Agent Role Clarity | FSD, ERD | Sinkronkan definisi SALESMAN/ADMIN/SUPERADMIN |
| 5 | Point Formula Eksplisit | FSD atau Blueprint | Dokumentasikan formula lengkap |
| 6 | Diskon Volume Logic | FSD | Tambahkan business rule |

## 3.3 Prioritas Rendah (Nice to Have)

| # | Issue | Dokumen | Fix |
|---|-------|---------|-----|
| 7 | QR Code Garansi | Blueprint | Klarifikasi apakah in-scope |
| 8 | Retail Deflection | Blueprint, SoW | Tambahkan detail atau move to Phase 2 |
| 9 | API Endpoint List | FSD | Buat konsolidasi lengkap |

---

# BAGIAN 4: MATRIKS CROSS-REFERENCE

## 4.1 Fitur vs Dokumen Coverage

| Fitur | Blueprint | FSD | ERD | WBS | UAT | SoW | Governance |
|-------|:---------:|:---:|:---:|:---:|:---:|:---:|:----------:|
| Credit Limit Check | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Tier Pricing | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | - |
| Loyalty Points | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | - |
| Shadow Mode | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| SLA Routing | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ |
| Invoice Tracking | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | - |
| SubDist Dashboard | - | ⚠️ | - | ✅ | ✅ | ✅ | - |
| Partner Profiling | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | - |
| Admin Config | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | - |
| Degraded Mode | ✅ | ✅ | - | - | ✅ | - | ✅ |
| QR Code Garansi | ✅ | - | - | - | - | - | - |
| Retail Deflection | ⚠️ | - | - | - | - | ✅ | - |

**Legend:**
- ✅ = Documented with detail
- ⚠️ = Mentioned but lacks detail
- `-` = Not mentioned

---

# BAGIAN 5: KESIMPULAN

## Status Keseluruhan

| Kategori | Status |
|----------|--------|
| **Inkonsistensi Kritis** | 🔴 3 ditemukan |
| **Inkonsistensi Minor** | 🟡 3 ditemukan |
| **Gap Dokumentasi** | 🟠 4 fitur perlu detail |
| **Konsistensi Baik** | 🟢 10+ item |

## Rekomendasi Tindakan

1. **Sebelum Development Mulai:**
   - Adakan meeting klarifikasi SubDist Login requirement
   - Fix SoW untuk hapus WABA dependency
   - Update Blueprint dengan SLA config keys

2. **Saat Sprint Zero:**
   - Konsolidasi API endpoint list
   - Dokumentasikan formula poin dan diskon volume
   - Klarifikasi scope QR Code dan Retail Deflection

3. **Follow-up:**
   - Buat dokumen API Specification (Swagger/OpenAPI)
   - Update FSD dengan semua endpoint

---

**Laporan ini dihasilkan dari audit mendalam terhadap 10 dokumen pra-eksekusi.**

*Terima kasih kepada user yang menemukan inkonsistensi SubDist yang memicu audit ini.*
