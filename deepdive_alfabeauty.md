# DEEP-DIVE ANALYSIS: PT. ALFA BEAUTY COSMETICA DIGITAL HUB
## Panduan Komprehensif untuk Memahami Seluruh Dokumen Pra-Eksekusi

**Tanggal:** 8 Januari 2026  
**Terakhir Diupdate:** 8 Januari 2026 (Post-Audit)  
**Tujuan:** Dokumen ini adalah **ensiklopedia lengkap** untuk memahami seluruh konteks bisnis, arsitektur teknis, dan terminologi proyek B2B Digital Hub PT. Alfa Beauty Cosmetica.

> ⚠️ **CATATAN PENTING:** Dokumen ini telah diaudit dan ditemukan beberapa inkonsistensi antar dokumen sumber. Lihat **Bagian 7: Catatan Inkonsistensi** untuk detail dan klarifikasi yang diperlukan sebelum development dimulai.

---

# BAGIAN 1: KONTEKS BISNIS

## 1.1 Tentang PT. Alfa Beauty Cosmetica

PT. Alfa Beauty Cosmetica adalah perusahaan distribusi produk perawatan rambut profesional (hair treatment) yang telah beroperasi selama **15 tahun**. Perusahaan ini menyuplai produk ke salon-salon kecantikan di seluruh Indonesia.

### Model Bisnis Sebelum Digital

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   PRINCIPAL     │────▶│ SUB-DISTRIBUTOR │────▶│     SALON       │
│   (PT. Alfa)    │     │   (per Wilayah) │     │   (End User)    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │                       │
        ▼                       ▼                       ▼
   Produksi &              Distribusi              Layanan ke
   Stok Pusat              ke Daerah              Konsumen Akhir
```

**Cara Kerja Lama:**
1. Salon menghubungi Sub-Distributor via WhatsApp/Telepon
2. Negosiasi harga terjadi secara personal
3. Sub-Distributor input order ke ERP manual
4. Tidak ada data terpusat tentang transaksi

### Masalah yang Dihadapi

| Masalah | Dampak Bisnis |
|---------|---------------|
| **Dark Social** | Transaksi via WA tidak tercatat, manajemen "buta" |
| **Inkonsistensi Harga** | Setiap sales negosiasi sendiri, margin tidak terkontrol |
| **Kredit Macet** | Tidak ada sistem cek limit sebelum kirim barang |
| **SLA Tidak Terukur** | Tidak tahu berapa lama Sub-Dist merespon order |
| **Loyalitas Manual** | Poin/reward dihitung manual via Excel, rawan error |

---

## 1.2 Visi Proyek: "Invisible Governance, Frictionless Commerce"

Tagline ini bermakna:
- **Invisible Governance:** Sistem mengatur aturan bisnis di belakang layar (kredit, SLA, poin) tanpa terasa oleh pengguna
- **Frictionless Commerce:** Pengalaman belanja tetap mulus, tidak ribet, mirip WA seperti biasa

### Filosofi "Hybrid Governance"

Proyek ini **BUKAN** membuat e-commerce konvensional. Ini adalah **"Logic Layer"** atau **Smart Middleware** yang:

1. **TIDAK menggantikan** negosiasi personal via WhatsApp
2. **TIDAK memproses** pembayaran online (no payment gateway)
3. **MENAMBAHKAN** lapisan validasi dan tracking di belakang layar

```
┌────────────────────────────────────────────────────────────────┐
│                    ARSITEKTUR HYBRID                           │
│                                                                │
│   ┌────────────┐    ┌────────────────┐    ┌────────────────┐  │
│   │  WEBSITE   │───▶│  LOGIC LAYER   │───▶│  WHATSAPP      │  │
│   │  (Catalog) │    │  (Validasi)    │    │  (Finalisasi)  │  │
│   └────────────┘    └────────────────┘    └────────────────┘  │
│                             │                                  │
│                             ▼                                  │
│                     ┌────────────────┐                         │
│                     │  ERP LEGACY    │                         │
│                     │  (Data Master) │                         │
│                     └────────────────┘                         │
└────────────────────────────────────────────────────────────────┘
```

---

## 1.3 Profil Skala Proyek

Proyek dikategorikan sebagai **"Low Volume, High Value/Complexity"**:

| Parameter | Nilai | Implikasi Teknis |
|-----------|-------|------------------|
| **Jumlah SKU** | 500-2.000 item | Small data, muat di Redis (~10MB) |
| **Partner Aktif** | 5.000-10.000 salon | Stabil, bukan viral growth |
| **Transaksi Harian** | 500-1.000 inquiry | ~1.6 tx/menit, low throughput |
| **Rasio Read:Write** | 20:1 | Read heavy (banyak browsing, sedikit checkout) |

**Kesimpulan Teknis:**
- Tantangan bukan pada **concurrency** (banyak request bersamaan)
- Tantangan pada **reliability** (data harus konsisten) dan **latency** (harus cepat)

---

# BAGIAN 2: GLOSARIUM ISTILAH

## 2.1 Istilah Bisnis (Business Terms)

### Aktor/Pengguna

| Istilah | Definisi | Akses Sistem |
|---------|----------|--------------|
| **Partner** | Salon/toko yang menjadi pelanggan B2B | Login, lihat harga khusus, buat order |
| **Agent/Salesman** | Karyawan PT. Alfa yang melayani salon | Login, Shadow Mode, lihat semua klien |
| **Sub-Distributor (SubDist)** | Mitra distribusi regional yang kirim barang | ⚠️ **PERLU KLARIFIKASI** (lihat catatan di bawah) |
| **Admin** | Staff pusat PT. Alfa | Full access, kelola konfigurasi |
| **Guest** | Pengunjung belum login | Hanya lihat katalog tanpa harga |

> ⚠️ **INKONSISTENSI DITEMUKAN - Sub-Distributor:**
> - **FSD Section 2:** SubDist "No Login" (WA-only contact)
> - **FSD Section 3.1:** Ada "SubDist Zone: Order Queue, Response Interface"
> - **UAT-21:** Menyebutkan langkah "Login SubDist Surabaya"
> - **WBS 3.8:** Alokasi effort "SubDist Dashboard (1 MD)"
> 
> **Diperlukan keputusan:** Apakah SubDist perlu login atau hanya via WA?

### Tier System (Level Mitra)

| System Enum | Nama Marketing | Aturan Pembayaran | Multiplier Poin |
|-------------|----------------|-------------------|-----------------|
| `TIER_SILVER` | New Partner | **CBD** (Cash Before Delivery) | 1.0x (baseline) |
| `TIER_GOLD` | Verified Partner | **TOP-14** (Term of Payment 14 hari) | 1.2x |
| `TIER_PLATINUM` | Priority Partner | **TOP-30** (Term of Payment 30 hari) | 1.5x |

**Penjelasan:**
- **CBD:** Barang baru dikirim setelah bayar lunas
- **TOP-14/30:** Barang dikirim dulu, tagihan dibayar dalam 14/30 hari

### Terminologi Keuangan

| Istilah | Definisi |
|---------|----------|
| **Credit Limit (Plafon Kredit)** | Maksimum hutang yang boleh dimiliki partner |
| **Credit Used (Kredit Terpakai)** | Total tagihan belum lunas saat ini |
| **Exposure Gap** | Selisih = Credit Limit - Credit Used. Negatif = over limit |
| **Invoice** | Dokumen tagihan yang diterbitkan setelah order approved |
| **Due Date** | Tanggal jatuh tempo pembayaran invoice |

### Terminologi Loyalitas

| Istilah | Definisi |
|---------|----------|
| **Point Multiplier** | Pengali poin berdasarkan tier (1.0x, 1.2x, 1.5x) |
| **Point Balance** | Saldo poin yang dimiliki partner |
| **Threshold** | Minimum nilai order untuk dapat poin (default Rp 500.000) |
| **Redemption** | Penukaran poin menjadi hadiah/voucher |
| **Fixed Redemption** | Katalog hadiah dengan nilai poin tetap (tidak nego) |

**Formula Perhitungan Poin (Eksplisit):**
```
points_earned = FLOOR(order_total / 10000) × tier_multiplier

Contoh:
- Order Rp 1.000.000 oleh Partner Silver (1.0x)
  = FLOOR(1.000.000 / 10.000) × 1.0 = 100 poin
  
- Order Rp 1.000.000 oleh Partner Gold (1.2x)
  = FLOOR(1.000.000 / 10.000) × 1.2 = 120 poin
  
- Order Rp 1.000.000 oleh Partner Platinum (1.5x)
  = FLOOR(1.000.000 / 10.000) × 1.5 = 150 poin
```

### Terminologi Distribusi

| Istilah | Definisi |
|---------|----------|
| **Region** | Wilayah geografis (Jawa Timur, Jabodetabek, dll) |
| **Geo-Routing** | Otomatis arahkan order ke SubDist sesuai wilayah partner |
| **SLA (Service Level Agreement)** | Standar waktu respon yang harus dipenuhi SubDist |
| **Escalation** | Proses naikkan masalah ke level lebih tinggi jika SLA tidak terpenuhi |
| **Lead** | Permintaan/inquiry dari partner yang masuk |

---

## 2.2 Istilah Teknis (Technical Terms)

### Arsitektur & Pattern

| Istilah | Definisi | Konteks di Proyek |
|---------|----------|-------------------|
| **Modular Monolith** | Satu aplikasi tapi terorganisir dalam modul terpisah | Lebih simple dari microservices |
| **Headless Catalog** | Website hanya untuk browsing, transaksi di channel lain | Order final via WhatsApp |
| **ACL (Anti-Corruption Layer)** | Lapisan penerjemah antara sistem baru dan legacy | Menghubungkan ke ERP lama |
| **Circuit Breaker** | Mekanisme "putus" koneksi jika sistem tujuan error | Mencegah cascade failure ke ERP |
| **Degraded Mode** | Mode operasi terbatas saat ada gangguan | Tetap jalan walau ERP mati |

### Database & Data

| Istilah | Definisi | Penggunaan |
|---------|----------|------------|
| **UUID** | Universal Unique Identifier, ID unik 128-bit | Primary key semua tabel |
| **Soft Delete** | Data tidak dihapus permanen, hanya ditandai `deleted_at` | Untuk audit trail |
| **DECIMAL** | Tipe data untuk nilai moneter (bukan FLOAT) | Mencegah error pembulatan |
| **Normalisasi 3NF** | Standar desain database agar tidak redundan | Integritas data |
| **JSONB** | JSON Binary, tipe data PostgreSQL untuk JSON | Menyimpan konfigurasi fleksibel |
| **ERD** | Entity Relationship Diagram | Diagram hubungan antar tabel |

### Caching & Performance

| Istilah | Definisi | Penggunaan |
|---------|----------|------------|
| **Redis** | In-memory database, sangat cepat | Cache katalog & harga |
| **Memory-First Strategy** | Data utama disimpan di RAM dulu | Zero-latency access |
| **TTL (Time To Live)** | Berapa lama cache valid sebelum refresh | 5 menit untuk config |
| **Cache Invalidation** | Menghapus cache yang sudah tidak valid | Saat config berubah |

### API & Integration

| Istilah | Definisi | Penggunaan |
|---------|----------|------------|
| **REST API** | Standar komunikasi antar sistem via HTTP | Semua endpoint backend |
| **JWT (JSON Web Token)** | Token untuk autentikasi | Login & session management |
| **RBAC (Role-Based Access Control)** | Akses diatur berdasarkan role user | Partner vs Agent vs Admin |
| **Idempotency Key** | ID unik untuk mencegah duplikat request | Setiap POST request |
| **WhatsApp Deep Link** | URL `wa.me/xxx?text=...` untuk buka WA dengan pesan | Bukan WA Business API! |

### DevOps & Infrastructure

| Istilah | Definisi | Penggunaan |
|---------|----------|------------|
| **IaC (Infrastructure as Code)** | Server di-setup via kode, bukan manual | Terraform |
| **CI/CD** | Continuous Integration/Delivery | Otomatis test & deploy |
| **Cold Start** | Delay saat container "bangun" dari tidur | Mitigasi dengan min-instances=1 |
| **Warm-up Pinger** | Scheduled job yang "bangunkan" server | Hit /health tiap 5 menit |
| **VPS** | Virtual Private Server | Server cloud untuk hosting |

### Quality & Testing

| Istilah | Definisi |
|---------|----------|
| **UAT (User Acceptance Test)** | Pengujian oleh user sebelum go-live |
| **SAST** | Static Application Security Testing |
| **E2E Test** | End-to-End Test, tes alur lengkap |
| **Contract Test** | Tes kompatibilitas antara API producer & consumer |

---

# BAGIAN 3: ANALISIS MENDALAM PER DOKUMEN

## 3.1 Blueprint V3.4 - Arsitektur Bisnis

> ⚠️ **CATATAN AUDIT:** Blueprint V3.4 Section 8 tidak mencantumkan config keys untuk SLA (`sla.reminder_hours`, `sla.escalation_hours`). Padahal fitur SLA Escalation adalah fitur utama. Lihat Bagian 7 untuk detail.


### Konsep Utama: "Lampu Lalu Lintas Kredit"

Sistem tidak memblokir order, tapi **memberi sinyal** ke sales admin:

```
┌─────────────────────────────────────────────────────────────┐
│                    CREDIT CHECK FLOW                        │
│                                                             │
│   Partner Login ──▶ Sistem Cek Database Keuangan           │
│                            │                                │
│           ┌────────────────┼────────────────┐               │
│           ▼                ▼                ▼               │
│       🟢 GREEN         🟡 AMBER         🔴 RED              │
│       Gap >= 0         Gap < 0       System Error          │
│    "Kirim Order"   "Ajukan Approval"   "Default Aman"      │
│                                                             │
│   Pesan WA yang keluar otomatis diberi tag:                │
│   [PERINGATAN: KREDIT MELEBIHI LIMIT | SELISIH: Rp -X]     │
└─────────────────────────────────────────────────────────────┘
```

### Protokol Eskalasi SLA (Soft-Failover)

Sistem **TIDAK** langsung ambil alih order dari SubDist yang lambat. Prosesnya bertahap:

| Fase | Waktu | Aksi |
|------|-------|------|
| **Fase 1** | 0 jam | Order di-route ke SubDist sesuai wilayah |
| **Fase 2** | 18 jam | Sistem kirim **reminder** ke Manager SubDist |
| **Fase 3** | 24 jam | Notifikasi ke **Admin Pusat** untuk intervensi manual |

**Mengapa tidak otomatis ambil alih?**
- Menghormati hubungan dengan SubDist yang sudah 15 tahun
- Mencegah konflik teritorial

### Algoritma Safety Buffer Stok

Stok yang ditampilkan BUKAN stok asli dari gudang, tapi sudah dikurangi buffer:

```
Display_Stock = ERP_Stock - Safety_Buffer
```

| Kategori SKU | Definisi | Rumus Buffer |
|--------------|----------|--------------|
| **Fast Moving** | >50 transaksi/bulan (Shampoo, Oxidant) | `CEILING(Avg Daily Sales × 3)` |
| **Slow Moving** | <10 transaksi/bulan (Fashion Color) | Fixed 2 unit |

**Tujuan:** Mencegah overselling saat ada delay sinkronisasi dengan ERP.

---

## 3.2 Database ERD V2.0 - Struktur Data

### Domain Model Overview

Database dibagi menjadi 6 domain:

```
┌─────────────────────────────────────────────────────────────┐
│                     DATABASE DOMAINS                        │
│                                                             │
│   ┌───────────────┐    ┌───────────────┐                   │
│   │   IDENTITY    │    │    CATALOG    │                   │
│   │ • Partners    │    │ • Products    │                   │
│   │ • Agents      │    │ • Brands      │                   │
│   │ • Regions     │    │ • Categories  │                   │
│   │ • SubDist     │    │ • TierPrices  │                   │
│   └───────────────┘    │ • Inventory   │                   │
│                        └───────────────┘                   │
│   ┌───────────────┐    ┌───────────────┐                   │
│   │  COMMERCIAL   │    │   LOYALTY     │                   │
│   │ • Orders      │    │ • PointTx     │                   │
│   │ • OrderItems  │    │ • Redemptions │                   │
│   │ • Invoices    │    │ • RedemptCat  │                   │
│   │ • InvPayments │    └───────────────┘                   │
│   └───────────────┘                                        │
│   ┌───────────────┐    ┌───────────────┐                   │
│   │     AUDIT     │    │    CONFIG     │                   │
│   │ • AuditLogs   │    │ • SysConfigs  │                   │
│   │ • AgentSess   │    └───────────────┘                   │
│   │ • ImpersoNotf │                                        │
│   │ • SLAEscLogs  │                                        │
│   └───────────────┘                                        │
└─────────────────────────────────────────────────────────────┘
```

### Relasi Kunci

**Order Lifecycle:**
```
PARTNER ──creates──▶ ORDER ──routes_to──▶ SUB_DISTRIBUTOR
                        │
                        ├──contains──▶ ORDER_ITEMS ──references──▶ PRODUCTS
                        │
                        └──generates──▶ INVOICE ──triggers──▶ POINT_TRANSACTION
```

**Point Earning Flow:**
```
1. Order COMPLETED
2. Invoice CREATED (status: UNPAID)
3. Admin records payment
4. Invoice status = PAID
5. Trigger: INSERT into POINT_TRANSACTIONS
6. Partner.point_balance += earned_points (via DB Trigger)
```

### Security: Row-Level Security (RLS)

PostgreSQL RLS memastikan setiap aktor hanya lihat data mereka:

| Actor | Bisa Akses |
|-------|------------|
| Partner | Order & Invoice miliknya sendiri |
| Agent | Order di region yang dia tangani |
| SubDist | Order yang di-route ke dia |
| Admin | Semua data |

---

## 3.3 DevOps V2.4 - Infrastruktur

### Strategi Hybrid Provider

Berbeda dengan startup tech yang pakai AWS/GCP full, proyek ini menggunakan **hybrid**:

| Komponen | Provider | Alasan |
|----------|----------|--------|
| Application Server | IDCloudHost VPS | 5-10x lebih murah dari GCP |
| Database | IDCloudHost Managed DB | Auto backup, aman |
| Cache | Redis Cloud Flex | $5/bulan, managed, 99.99% uptime |
| CDN + SSL | Cloudflare Free | Gratis, cukup untuk skala ini |

**Total: Rp 454.000/bulan** (vs ~$100+ jika pakai GCP penuh)

### Cold Start Mitigation

Cloud container bisa "tidur" jika tidak ada traffic. Saat bangun, bisa lambat 5-8 detik. Mitigasi:

1. **Min Instances = 1** selama jam kerja (07:00-19:00)
2. **Warm-up Pinger:** Cloud Scheduler hit `/health` tiap 5 menit
3. **DB Connection Pooling:** Koneksi database sudah siap, tidak perlu handshake ulang
4. **Secret Caching:** API keys di-load saat build, bukan saat request

### Config-as-Data Pattern

Konfigurasi bisnis disimpan di database + cache, BUKAN di-hardcode:

```sql
-- Contoh tabel SYSTEM_CONFIGS
INSERT INTO system_configs (config_key, config_value) VALUES
('loyalty.multiplier.silver', '1.00'),
('loyalty.multiplier.gold', '1.20'),
('loyalty.multiplier.platinum', '1.50'),
('order.minimum_threshold', '500000'),
('sla.reminder_hours', '18'),
('sla.escalation_hours', '24');
```

**Manfaat:** Marketing bisa ubah multiplier saat campaign tanpa tunggu developer deploy ulang.

---

## 3.4 FSD-IDD V2.6 - Spesifikasi Fitur

### Modul Kritis: Shadow Mode (Agent Impersonation)

Fitur ini memungkinkan Salesman "menjadi" salon untuk membantu order:

```
┌────────────────────────────────────────────────────────────┐
│                    SHADOW MODE FLOW                        │
│                                                            │
│   1. Salesman Login                                        │
│   2. Pilih menu "Kelola Klien"                             │
│   3. Pilih "Salon Budi"                                    │
│   4. Tampilan berubah → melihat sebagai Salon Budi         │
│   5. Salesman input order bersama Owner Salon              │
│   6. Checkout → Order masuk atas nama Salon Budi           │
│   7. WAJIB: Notifikasi WA/Email ke Owner Salon             │
│      "Salesman X baru membuat order atas nama Anda"        │
│                                                            │
│   AUDIT LOG FORMAT:                                        │
│   [AUDIT_IMPERSONATION] Agent:SALES_001 acted_as           │
│   Partner:USR_SBY_099 action:SUBMIT_ORDER                  │
└────────────────────────────────────────────────────────────┘
```

**Manfaat:**
1. Order tetap digital (tercatat sistem)
2. Owner salon belajar pakai app
3. Salesman tetap dapat atribusi

**Keamanan:**
- Setiap checkout via Shadow Mode → notifikasi ke owner
- CIO wajib review "Top 10 Agents by Impersonation Count" tiap bulan

### Status Machine: Order Lifecycle

```
                              ┌──────────────┐
                              │    DRAFT     │ (Keranjang belum kirim)
                              └──────┬───────┘
                                     │ [Submit via WA]
                                     ▼
                              ┌──────────────┐
        ┌────────────────────▶│  SUBMITTED   │ (Menunggu SubDist)
        │                     └──────┬───────┘
        │                            │ [SubDist respon]
        │                            ▼
        │                     ┌──────────────┐
        │                     │  PROCESSING  │ (Sedang diproses)
        │                     └──────┬───────┘
        │                            │ [SubDist approve]
        │         ┌──────────────────┼──────────────────┐
        │         ▼                  ▼                  ▼
        │  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
        │  │   APPROVED   │   │   REJECTED   │   │  CANCELLED   │
        │  └──────┬───────┘   └──────────────┘   └──────────────┘
        │         │ [Kirim barang]
        │         ▼
        │  ┌──────────────┐
        │  │   SHIPPED    │ (Dalam pengiriman)
        │  └──────┬───────┘
        │         │ [Barang sampai]
        │         ▼
        │  ┌──────────────┐
        └──│  COMPLETED   │ (Selesai)
           └──────────────┘
```

### Standardized Error Response (RFC 7807)

Semua error API mengikuti format yang konsisten:

```json
{
  "type": "https://api.alfabeauty.com/errors/credit-blocked",
  "title": "Credit Limit Exceeded",
  "status": 402,
  "detail": "Your order exceeds the available credit limit by IDR 1,500,000.",
  "extensions": {
    "current_limit": 5000000,
    "current_exposure": 6500000,
    "gap": -1500000,
    "suggested_action": "REQUEST_OVERRIDE"
  }
}
```

**Kode Error Khusus:**
| HTTP Code | Meaning | Situasi |
|-----------|---------|---------|
| 402 | Payment Required | Kredit melebihi limit |
| 409 | Conflict | Stok tidak cukup |
| 422 | Unprocessable | Region tidak terdaftar |
| 503 | Service Unavailable | Tidak ada SubDist aktif di wilayah |

---

## 3.5 Governance V1.1 - Prosedur Operasional

### Severity Matrix untuk Incident Response

| Level | Definisi | SLA Respons | Eskalasi Ke |
|-------|----------|-------------|-------------|
| **SEV-1** | Bisnis berhenti total | < 15 menit | CTO, CIO, VP Sales |
| **SEV-2** | Fungsi utama terganggu | < 1 jam | Eng Lead, Ops Manager |
| **SEV-3** | Isu minor/kosmetik | < 24 jam | Support Team |
| **SEV-4** | Request/pertanyaan | < 48 jam | Helpdesk |

### Playbook: ERP Down

```
GEJALA: API Sync Stok/Limit error

IMMEDIATE ACTION (< 5 Menit):
1. System otomatis masuk Degraded Mode
2. Toggle CREDIT_CHECK_BYPASS = TRUE di Admin Panel
3. Stok tampil dari Last Known Cache

USER COMMUNICATION:
- Banner: "Sistem sedang maintenance. Order diproses manual."

RECOVERY:
1. Restart Bridge Service / VPN Tunnel
2. Jalankan script Reconcile_Orders
```

### Business Continuity Plan

| Metrik | Target |
|--------|--------|
| **RPO (Recovery Point Objective)** | Max 1 jam kehilangan data |
| **RTO (Recovery Time Objective)** | Sistem UP dalam 4 jam |

**Manual Fallback:**
- Tim sales punya **Katalog PDF Offline** di tablet
- Jika sistem mati >4 jam → Tulis nota manual → Foto → Kirim ke admin pusat

---

## 3.6 RAB Infrastruktur V1.1 - Budget Cloud

### Perbandingan 3 Skenario

| Metrik | Ultra-Hemat | Seimbang ✓ | Enterprise-Lite |
|--------|-------------|------------|-----------------|
| **Biaya/Bulan** | Rp 84k | Rp 454k | Rp 673k |
| **Managed Services** | 0% | 50% | 100% |
| **DevOps Skill Needed** | Tinggi | Sedang | Rendah |
| **Uptime SLA** | Best-effort | 99.99% | 99.99%+ |

### Provider Recommendation Stack

```
┌─────────────────────────────────────────────────────────┐
│                 RECOMMENDED STACK                       │
│                                                         │
│  ┌─────────────────────────────────────────────┐       │
│  │ CDN + SSL: Cloudflare Free                  │ Rp 0  │
│  └─────────────────────────────────────────────┘       │
│                       │                                 │
│                       ▼                                 │
│  ┌─────────────────────────────────────────────┐       │
│  │ VPS: IDCloudHost eXtreme                    │ Rp149k│
│  │ (2 vCPU, 4GB RAM, 80GB NVMe)                │       │
│  └─────────────────────────────────────────────┘       │
│          │                          │                   │
│          ▼                          ▼                   │
│  ┌──────────────────┐    ┌──────────────────┐          │
│  │ Database:        │    │ Cache:           │          │
│  │ IDCloudHost      │    │ Redis Cloud Flex │          │
│  │ Managed DB       │    │ ($5/bulan)       │          │
│  │ Rp 150k          │    │ Rp 80k           │          │
│  └──────────────────┘    └──────────────────┘          │
│                                                         │
│  TOTAL: Rp 454.000/bulan                               │
└─────────────────────────────────────────────────────────┘
```

---

## 3.7 SoW V2.5 - Statement of Work

> ⚠️ **INKONSISTENSI DITEMUKAN:**
> - **SoW Section 6.2:** Menyebutkan klien harus daftar "WhatsApp Business API (WABA)" sebelum Minggu ke-4
> - **SoW Section 3 & semua dokumen lain:** Sistem pakai WhatsApp Deep Link (gratis, tidak perlu registrasi)
> 
> **Rekomendasi:** Hapus persyaratan WABA dari SoW Section 6.2

### Scope Summary

**10 Modul In-Scope:**
1. Identity & Access (Login, RBAC, Shadow Mode)
2. Commercial Governance (Credit, Tier Pricing)
3. Loyalty Engine (Point Multiplier, Redemption)
4. Supply Chain (SLA Routing, Inventory Buffer)
5. Partner Profiling
6. Agile Config Panel
7. Impersonation Notification
8. Invoice & Payment Tracking
9. SLA Escalation Engine
10. Sub-Distributor Routing

**Out-of-Scope (Tidak Termasuk):**
- Perbaikan bug ERP lama
- Foto produk, artikel SEO
- Operasi gudang fisik
- Biaya server/domain

### Payment Schedule

```
┌────────────────────────────────────────────────────────────┐
│                   PAYMENT MILESTONES                       │
│                                                            │
│   ┌───────────┐   ┌───────────┐   ┌───────────┐           │
│   │    DP     │   │ Milestone │   │ Milestone │           │
│   │   30%     │──▶│    1      │──▶│    2      │           │
│   │ Rp 7.05jt │   │   30%     │   │   30%     │           │
│   │ (Sign)    │   │ Rp 7.05jt │   │ Rp 7.05jt │           │
│   └───────────┘   │(Backend OK)│   │(Frontend) │           │
│                   └───────────┘   └─────┬─────┘           │
│                                         │                  │
│                                         ▼                  │
│                                   ┌───────────┐            │
│                                   │ Retention │            │
│                                   │   10%     │            │
│                                   │ Rp 2.35jt │            │
│                                   │(30 hr post│            │
│                                   │ Go-Live)  │            │
│                                   └───────────┘            │
│                                                            │
│   TOTAL DEVELOPMENT: Rp 23.500.000                        │
└────────────────────────────────────────────────────────────┘
```

### Rate Justification

Rate Rp 135.000/Man-Day dipilih berdasarkan 8 parameter:

| Parameter | Kondisi | Dampak |
|-----------|---------|--------|
| Lokasi | Non-Jakarta (Tier 2/3) | Rate 30-50% lebih rendah |
| Pengalaman | Junior (1-2 tahun) | Range Rp 135k-250k |
| Industri | B2B Commerce | Kompleksitas menengah |
| Tech Stack | Laravel/React (mainstream) | Standard rate |
| Soft Skills | Bisa buat dokumentasi | +10-20% value |
| Portfolio | Membangun flagship | Investasi jangka panjang |
| Freelance | Solo, no agency overhead | Hemat 80-85% vs agency |
| Complexity | 3.7/5 (Medium-High) | Kompensasi = pengalaman |

---

## 3.8 UAT V2.0 - Test Scenarios

### Test Case Categories

| Kategori | Jumlah | Priority |
|----------|--------|----------|
| Identity & Access | 5 | P0 (Critical) |
| Commercial (Credit) | 4 | P0 |
| Routing & SLA | 6 | P0 |
| Invoice & Payment | 4 | P0 |
| Loyalty | 7 | P0 |
| Resilience | 2 | P1 |
| Config & Profile | 4 | P1 |
| Multi-Language | 1 | P2 |
| **TOTAL** | **33** | |

### Critical Test Cases (Must Pass)

| ID | Skenario | Yang Diuji |
|----|----------|------------|
| UAT-03C | Impersonation Checkout Notification | Owner terima WA saat Salesman checkout via Shadow Mode |
| UAT-05 | Order Over Limit | Tombol berubah jadi "Ajukan Approval", bukan error |
| UAT-24 | SLA Escalation 24 Jam | Admin HQ terima notifikasi, log tercatat |
| UAT-42 | Poin Cair Saat Invoice PAID | Point balance bertambah setelah invoice lunas |
| UAT-09 | ERP Down (Degraded Mode) | Produk tetap tampil dari cache |

---

## 3.9 Validation Report - Status Kesiapan

### Checklist Industri yang Terpenuhi

| Kriteria (Best Practice) | Status |
|--------------------------|--------|
| Project Goals & Objectives | ✅ |
| Stakeholder Analysis | ✅ |
| System Architecture Design | ✅ |
| Integration Dependencies | ✅ |
| Timeline & Milestones | ✅ |
| Budget & Resources | ✅ |
| Risk Analysis | ✅ |
| Incident Playbooks | ✅ |
| UAT Scenarios | ✅ |
| Acceptance Criteria | ✅ |

**Kesimpulan:** Dokumen **MELEBIHI STANDAR** untuk proyek B2B skala ini.

---

## 3.10 WBS V2.5 - Work Breakdown Structure

### Epic Distribution

```
┌─────────────────────────────────────────────────────────────┐
│                 TOTAL EFFORT: 162.5 MAN-DAYS               │
│                                                             │
│   Backend (60.5 MD) ████████████████████████████░░░░░  37%  │
│   Frontend (41 MD)  ███████████████░░░░░░░░░░░░░░░░░  25%  │
│   QA (21 MD)        ████████░░░░░░░░░░░░░░░░░░░░░░░░  13%  │
│   PM/Arch (20 MD)   ███████░░░░░░░░░░░░░░░░░░░░░░░░░  12%  │
│   DevOps (14 MD)    █████░░░░░░░░░░░░░░░░░░░░░░░░░░░   9%  │
│   Profiling (6 MD)  ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   4%  │
└─────────────────────────────────────────────────────────────┘
```

### Critical Path

```
AUTH ──▶ COMMERCIAL ──▶ INVOICE ──▶ LOYALTY
  │          │             │
  │          └──▶ ERP ──▶ ROUTING ──▶ SLA
  │
  └──────────────────────────────────▶ FRONTEND ──▶ QA
```

**Bottleneck:** Integrasi ERP (11 MD + 3 MD buffer) adalah risiko tertinggi karena bergantung pada tim IT klien.

---

# BAGIAN 4: HUBUNGAN ANTAR DOKUMEN

## 4.1 Dependency Map

```
                    ┌─────────────┐
                    │  BLUEPRINT  │ (Visi & Fitur)
                    │    V3.4     │
                    └──────┬──────┘
                           │
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
    ┌──────────────┐ ┌──────────┐ ┌──────────────┐
    │  DATABASE    │ │ FSD-IDD  │ │   DEVOPS     │
    │  ERD V2.0    │ │  V2.6    │ │    V2.4      │
    └──────┬───────┘ └────┬─────┘ └──────┬───────┘
           │              │              │
           └──────────────┼──────────────┘
                          ▼
                   ┌──────────────┐
                   │    WBS       │ (Breakdown Kerja)
                   │    V2.5      │
                   └──────┬───────┘
                          │
           ┌──────────────┼──────────────┐
           ▼              ▼              ▼
    ┌──────────────┐ ┌──────────┐ ┌──────────────┐
    │     SOW      │ │   UAT    │ │  GOVERNANCE  │
    │    V2.5      │ │   V2.0   │ │    V1.1      │
    └──────────────┘ └──────────┘ └──────────────┘
           │              │              │
           └──────────────┼──────────────┘
                          ▼
                   ┌──────────────┐
                   │  VALIDATION  │ (Audit Kesiapan)
                   │   REPORT     │
                   └──────┬───────┘
                          ▼
                   ┌──────────────┐
                   │    RAB       │ (Budget)
                   │ INFRASTRUKTUR│
                   └──────────────┘
```

## 4.2 Version Synchronization

Semua dokumen menggunakan referensi yang konsisten:

| Dokumen | Version | Referensi |
|---------|---------|-----------|
| Blueprint | V3.4 | - |
| Database ERD | V2.0 | Blueprint V3.4 |
| DevOps | V2.4 | RAB V1.1 |
| FSD-IDD | V2.6 | Blueprint V3.4, DevOps V2.4 |
| Governance | V1.1 | Blueprint V3.4, DevOps V2.4, FSD V2.6 |
| RAB | V1.1 | DevOps V2.4 |
| SoW | V2.5 | Blueprint V3.4, DevOps V2.4, FSD V2.6, WBS V2.5 |
| UAT | V2.0 | FSD V2.6 |
| WBS | V2.5 | Blueprint V3.4, FSD V2.6 |
| Validation | - | Semua dokumen |

---

# BAGIAN 5: QUICK REFERENCE CARDS

## 5.1 Enum Quick Reference

### Tier Enum
| Enum | Marketing Name | Payment | Multiplier |
|------|----------------|---------|------------|
| `TIER_SILVER` | New Partner | CBD | 1.0x |
| `TIER_GOLD` | Verified Partner | NET-14 | 1.2x |
| `TIER_PLATINUM` | Priority Partner | NET-30 | 1.5x |

### Order Status Enum
| Enum | UI Label | Next Valid States |
|------|----------|-------------------|
| `DRAFT` | Draft | SUBMITTED |
| `SUBMITTED` | Menunggu Proses | PROCESSING, REJECTED, CANCELLED |
| `PROCESSING` | Sedang Diproses | APPROVED, REJECTED, CANCELLED |
| `APPROVED` | Disetujui | SHIPPED, CANCELLED |
| `SHIPPED` | Dalam Pengiriman | COMPLETED |
| `COMPLETED` | Selesai | - |
| `REJECTED` | Ditolak | - |
| `CANCELLED` | Dibatalkan | - |

### Invoice Status Enum
| Enum | UI Label | Point Impact |
|------|----------|--------------|
| `UNPAID` | Belum Dibayar | Poin pending |
| `PARTIAL` | Dibayar Sebagian | Poin pending |
| `PAID` | Lunas | Poin cair |
| `CANCELLED` | Dibatalkan | Poin hangus |

## 5.2 API Endpoint Quick Reference

| Endpoint | Method | Fungsi |
|----------|--------|--------|
| `/api/auth/login` | POST | Login partner/agent |
| `/api/credit/status` | GET | Cek status kredit |
| `/api/products` | GET | List produk (dengan tier price) |
| `/api/orders` | POST | Submit order |
| `/api/orders/{id}/route` | POST | Route order ke SubDist |
| `/api/invoices/{id}/payments` | POST | Record pembayaran |
| `/api/admin/config` | GET/PUT | Kelola konfigurasi |

## 5.3 Config Keys Quick Reference

| Key | Default | Deskripsi |
|-----|---------|-----------|
| `loyalty.multiplier.silver` | 1.00 | Multiplier Tier Silver |
| `loyalty.multiplier.gold` | 1.20 | Multiplier Tier Gold |
| `loyalty.multiplier.platinum` | 1.50 | Multiplier Tier Platinum |
| `order.minimum_threshold` | 500000 | Min order untuk dapat poin |
| `stock.sync_interval_minutes` | 15 | Interval sync stok ERP |
| `sla.reminder_hours` | 18 | Jam kirim reminder |
| `sla.escalation_hours` | 24 | Jam eskalasi ke HQ |

---

# BAGIAN 6: FAQ - PERTANYAAN UMUM

## Q1: Mengapa tidak pakai WhatsApp Business API?

**Jawab:** Sistem menggunakan **WhatsApp Deep Link** (`wa.me/xxx?text=...`), bukan WhatsApp Business API karena:
- **Biaya:** Rp 0 (gratis) vs Rp 500-1000 per message
- **Registrasi:** Tidak perlu daftar BSP (Business Solution Provider)
- **Filosofi:** Finalisasi order tetap terjadi secara manusiawi, bukan bot

## Q2: Bagaimana jika ERP mati?

**Jawab:** Sistem masuk **Degraded Mode**:
1. Data stok diambil dari cache Redis terakhir
2. Credit check di-bypass (semua jadi Amber/Approval)
3. Order tetap bisa masuk dengan flag `PENDING_SYNC`
4. Setelah ERP pulih, jalankan Reconcile_Orders

## Q3: Mengapa rate freelancer sangat murah?

**Jawab:** Rp 135.000/hari adalah **aggressive pricing** karena:
- Junior freelancer membangun portofolio enterprise
- Klien hemat 80-85% dibanding agency
- Non-Jakarta (cost of living rendah)
- Proyek ini jadi flagship untuk rate naik ke Rp 400k+ di proyek berikutnya

## Q4: Apa yang terjadi jika Partner tidak punya region?

**Jawab:** 
- API return error `REGION_NOT_ASSIGNED` (HTTP 422)
- UI tampil: "Wilayah Anda belum terdaftar. Hubungi Admin untuk aktivasi."
- Order tidak bisa disubmit sampai Admin assign region

## Q5: Kapan poin bisa dicairkan?

**Jawab:** Poin **HANYA CAIR** setelah Invoice status = `PAID`. Flow:
1. Order complete → Invoice created (UNPAID)
2. Admin record pembayaran → Invoice = PAID
3. Database trigger → Insert POINT_TRANSACTIONS
4. Partner.point_balance bertambah

---

# BAGIAN 7: CATATAN INKONSISTENSI ANTAR DOKUMEN

Berdasarkan audit konsistensi yang dilakukan pada 8 Januari 2026, ditemukan beberapa inkonsistensi antar dokumen yang **PERLU DIKLARIFIKASI** sebelum development dimulai.

## 7.1 Inkonsistensi Kritis (Harus Diperbaiki)

### 🔴 1. Sub-Distributor: Login atau Tidak?

| Dokumen | Pernyataan |
|---------|------------|
| FSD Section 2 | SubDist "**No Login**" (WA-only contact) |
| FSD Section 3.1 | Ada "SubDist Zone: Order Queue, Response Interface" |
| UAT-21 | "1. **Login** SubDist Surabaya" |
| WBS 3.8 | "SubDist Dashboard (1 MD)" |
| ERD | Tabel `SUB_DISTRIBUTORS` tidak ada `password_hash` |

**Opsi Resolusi:**
- **Opsi A (No Login):** SubDist hanya terima WA, update via Admin dashboard
- **Opsi B (With Login):** SubDist punya login terbatas untuk update status order

### 🔴 2. SoW: WABA Requirement vs Deep Link

| Dokumen | Pernyataan |
|---------|------------|
| SoW Section 6.2 | "Klien telah mendaftarkan **WhatsApp Business API (WABA)**" |
| SoW Section 3 | "Sistem menggunakan **WhatsApp Deep Link**, bukan WA Business API" |
| FSD, Governance | Konfirmasi pakai Deep Link (gratis) |

**Rekomendasi:** Hapus persyaratan WABA dari SoW Section 6.2

### 🔴 3. Blueprint: SLA Config Keys Tidak Ada

| Dokumen | Status |
|---------|--------|
| Blueprint Section 8 | Hanya 5 config keys, tidak ada SLA |
| ERD Section 3.8 | Ada 8 config keys termasuk `sla.*` |
| FSD Section 4.7 | Menyebutkan `sla.reminder_hours` dan `sla.escalation_hours` |

**Rekomendasi:** Update Blueprint untuk menambahkan SLA config keys

## 7.2 Inkonsistensi Minor

| # | Issue | Lokasi | Rekomendasi |
|---|-------|--------|-------------|
| 4 | Agent Role (SALESMAN/ADMIN/SUPERADMIN) belum sinkron | FSD vs ERD | Klarifikasi hak akses per role |
| 5 | Managed Services menyebut "WA API Maintenance" | SoW Section 5.C | Ubah ke "WA Deep Link Monitoring" |
| 6 | Diskon Volume tidak ada formula | UAT-06 vs FSD | Dokumentasikan logic di FSD |

## 7.3 Gap Dokumentasi

| Fitur | Disebutkan Di | Belum Ada Detail Di |
|-------|---------------|---------------------|
| Retail Deflection ke Shopee | Blueprint §6, SoW | FSD, WBS, UAT |
| QR Code Garansi | Blueprint §6.A | FSD, WBS, UAT, ERD |
| i18n (Multi-Language) | WBS 3.5, UAT-14 | FSD (bahasa apa saja?) |

## 7.4 Tindak Lanjut

Sebelum development dimulai, lakukan:

1. ✅ Meeting klarifikasi dengan klien untuk SubDist Login requirement
2. ✅ Update SoW untuk hapus WABA dependency
3. ✅ Update Blueprint dengan SLA config keys
4. ✅ Tentukan apakah QR Code & Retail Deflection masuk scope

**Referensi Detail:** Lihat file `AUDIT_KONSISTENSI.md`

---

**Dokumen ini disiapkan sebagai panduan lengkap untuk memahami proyek PT. Alfa Beauty Cosmetica Digital Hub.**

*Terakhir diperbarui: 8 Januari 2026 (Post-Audit Update)*
