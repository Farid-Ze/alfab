# PRODUCT ARCHITECTURE SPECIFICATION: B2B ORDER FACILITATION LAYER

**Project:** PT. Alfa Beauty Cosmetica Digital Hub
**Document Type:** Functional Specification Document (FSD) & Interface Data Definition (IDD)
**Version:** 2.6

## 1. SYSTEM DESIGN THESIS: THE "HEADLESS CATALOG" PATTERN

**Architectural Decision:** Headless Catalog with Decoupled Execution.

- **The Catalog (Head):** Product Discovery & Validation.
- **The Execution (Tail):** WhatsApp Deep Link / Shopee Deep Link.

> **PENTING:** Sistem ini menggunakan **WhatsApp Deep Link** (`wa.me/62xxx?text=...`), **BUKAN** WhatsApp Business API. Tidak ada integrasi bot, tidak ada biaya per-message, dan tidak perlu registrasi WhatsApp BSP. Finalisasi order tetap terjadi secara manual di WhatsApp antara Partner dan Sub-Distributor.

## 2. ACTOR DEFINITION & RBAC SCOPE

Sistem menerapkan *Role-Based Access Control (RBAC)*.

| Actor Role | Access Scope | Auth Method |
| --- | --- | --- |
| **GUEST** | Read Only Catalog. | None |
| **PARTNER** | Read/Write Inquiry. Access to Credit Module. | Email/Password |
| **AGENT** | Impersonate Partner. Access Sales Attribution. | Email/Password |
| **ADMIN** | Full Access SLA Dashboard. Config Management. | Email/Password |
| **SUBDIST** | Receive routed orders via WhatsApp. | **No Login** (WA-only contact) |

> **Note:** Sub-Distributor **TIDAK** memiliki akun login di sistem. Mereka menerima order via WhatsApp Deep Link dan merespon secara manual. Data SubDist (nama, WA number, region) disimpan di sistem untuk keperluan routing.

## 3. EXPERIENCE LAYER ARCHITECTURE (IA)

### 3.1. State-Driven Sitemap

- **Public Zone:** Home, Catalog (No Price), Auth Gate.
- **Private Zone:** Dashboard (Credit Monitor), Catalog (Pro Price), Inquiry Builder.
- **Admin Zone:** SLA Dashboard, Config Management, Order Monitoring.

> **Note:** Sub-Distributor **TIDAK** memiliki akses ke sistem web. Mereka menerima order **HANYA** melalui WhatsApp Deep Link (`wa.me/...?text=...`) yang dikirim oleh Partner. Tidak ada dashboard SubDist.

## 4. MODULE SPECIFICATIONS

### 4.1. Module: Credit Risk Heuristics

**Component:** `DynamicInquiryButton`

- **Logic:** Fetch `GET /api/credit/status`.
    - **Fail-Safe Mechanism:** Jika API Timeout/Error > 3000ms, Default State = **`AMBER`** (Safety First).
    - **Degraded Mode:** Saat ERP Down, gunakan Cache Redis terakhir. Jika Cache expired > 1 jam, block order (Red) atau minta Approval manual.
- **State:**
    - `GREEN`: Gap >= 0 → "Kirim Order".
    - `AMBER`: Gap < 0 (atau System Error) → "Ajukan Approval".
- **Region Validation:**
    - Jika Partner tidak memiliki `region_id`, return Error Code `REGION_NOT_ASSIGNED`.
    - Frontend menampilkan: *"Wilayah Anda belum terdaftar. Hubungi Admin untuk aktivasi."*

### 4.2. Module: Agent Impersonation

**Component:** `AgentSessionManager`

- **Logic:** Header Injection `x-agent-id` pada setiap request.
- **Security & Audit:**
    - Wajib mencatat **`original_actor`** (Salesman) dan **`target_actor`** (Toko) dalam setiap log transaksi.
    - Format Log: `[AUDIT_IMPERSONATION] Agent:SALES_001 acted_as Partner:USR_SBY_099 action:SUBMIT_ORDER`
- **Tier 1 Support Priority (CIO Directive):**
    - Dengan "hanya" 1.000 transaksi/hari, setiap tiket support dari Partner adalah **prioritas tinggi**.
    - Fitur Impersonation/Shadow Mode harus sempurna agar tim support bisa melihat **apa yang dilihat partner detik itu juga**.
- **Impersonation Checkout Notification:**
    - Setiap kali Salesman melakukan **CHECKOUT** atas nama Toko via Shadow Mode, sistem **WAJIB** mengirim notifikasi ke Owner Toko.
    - **Channel:** WhatsApp (Primary) atau Email (Fallback).
    - **Message Template:** *"Halo [Nama Toko], Salesman [Nama Sales] baru saja membuat order [Order ID] atas nama Anda senilai Rp [Total]. Hubungi kami jika ini tidak sah."*
    - **Rationale:** Pencegahan penyalahgunaan akun dan audit trail real-time.

### 4.3. Module: Inventory Confidence

**Component:** `StockAvailabilityBadge`

- **Logic:**
    - Kalkulasi `Real_Stock - Safety_Buffer` **WAJIB** dilakukan di Backend (API Level), bukan Frontend.
    - Frontend hanya menerima status Enum final, tidak boleh menerima angka mentah untuk menghindari manipulasi client-side.
    - Status Mapping:
        - `HIGH` (>10): Ready.
        - `LOW` (1-10): Limited.
        - `ZERO`: Pre-Order.

**Component:** `StockSyncDelayBanner`

- **Logic:**
    - Backend menyediakan `last_sync_at` timestamp via API `/api/inventory/sync-status`.
    - Jika `now() - last_sync_at > 30 menit`, tampilkan banner warning:
        - *"Data stok terakhir diperbarui X menit lalu."*
    - Banner berwarna kuning (warning) dan sticky di bagian atas halaman katalog.

**Flag:** `sync_status` pada Order

- **Values:** `SYNCED` | `PENDING_SYNC`
- **Logic:**
    - Jika order dibuat saat ERP down (Degraded Mode), set `sync_status = PENDING_SYNC`.
    - Frontend menampilkan badge "Menunggu Sinkronisasi" pada order history.
    - Background job akan update ke `SYNCED` setelah ERP kembali online dan order berhasil di-push.


### 4.4. Module: Partner Profile Builder

**Component:** `ProfileBuilderForm`

- **Logic:** Progressive profiling form untuk mengumpulkan data Salon.
- **Fields:**
    - `salon_type`: Required. Enum `BARBER | BRIDAL | UNISEX | OTHER`.
    - `chair_count`: Optional. Integer 1-50.
    - `specialization`: Optional. Free text.
    - `region_id`: Required. Dropdown dari API `/api/regions`.
- **Trigger:** Ditampilkan saat registrasi dan dapat diedit di Profile Page.

### 4.5. Module: Admin Configuration

**Component:** `AdminConfigPanel`

- **Logic:** CRUD interface untuk System Config.
- **Access:** ADMIN role only.
- **Features:**
    - View all configs in table format.
    - Edit config value with validation.
    - Audit log: WHO changed WHAT, WHEN.
- **Cache Strategy:** Config disimpan di Redis dengan TTL 5 menit. Perubahan di-invalidate immediately.

### 4.6. Module: Invoice & Payment Tracking

**Component:** `InvoiceManager`

- **Logic:** Track status pembayaran per order.
- **Endpoints:**
    - `GET /api/invoices?order_id={id}` - List invoices untuk order
    - `GET /api/invoices/{id}` - Detail invoice
    - `POST /api/invoices/{id}/payments` - Record pembayaran (Admin only)
- **Business Rules:**
    - Invoice dibuat otomatis saat Order status = `APPROVED`.
    - `due_date` dihitung dari Tier: SILVER = 0 hari (CBD), GOLD = 14 hari, PLATINUM = 30 hari.
    - Poin **HANYA CAIR** saat Invoice `status = 'PAID'`.
- **Frontend Display:**
    - Di Order History, tampilkan badge Invoice Status.
    - Jika UNPAID: *"Poin Anda (X poin) akan cair setelah pembayaran lunas."*

### 4.7. Module: SLA Routing & Escalation

**Component:** `SLARoutingEngine`

- **Logic:** Route order ke Sub-Distributor berdasarkan region Partner.
- **Output:** Generate **WhatsApp Deep Link** (`wa.me/{subdist_wa}?text={order_summary}`) yang dibuka oleh Partner untuk mengirim order ke SubDist yang tepat.
- **Endpoints:**
    - `GET /api/subdistributors?region_id={id}` - Get SubDist by region
    - `POST /api/orders/{id}/route` - Route order to SubDist (Auto on submit)
    - `GET /api/orders/sla/pending` - Orders pending SLA action (Admin)
- **SLA Tracking:**
    - Sistem mencatat `routed_at` saat Partner klik "Kirim via WA".
    - Admin dapat memonitor order yang belum direspon dari dashboard.
    - `sla.reminder_hours`: 18 jam → Admin manually follow up ke SubDist
    - `sla.escalation_hours`: 24 jam → Notifikasi ke HQ Admin untuk intervensi
- **Escalation Log:**
    - Setiap eskalasi dicatat di `SLA_ESCALATION_LOGS` untuk audit.

> **Note:** Karena menggunakan WA Deep Link (bukan WA API), reminder dan eskalasi adalah **notifikasi internal** ke Admin, bukan pesan otomatis ke SubDist.

## 5. INTERFACE DATA DEFINITION (IDD) - JSON SCHEMA

### 5.1. Payload: Inquiry Submission

```json
{
  "meta": {
    "timestamp": "ISO8601_UTC",
    "version": "v1.1",
    "trace_id": "UUID-V4"
  },
  "actor_context": {
    "user_id": "USR_SBY_099",
    "region_id": "REG_EAST_JAVA",
    "session_mode": "AGENT_IMPERSONATION",
    "agent_id": "SALES_001"
  },
  "financial_context": {
    "tier_snapshot": "TIER_GOLD",
    "tier_multiplier": 1.20,
    "pricelist_id": "PL_GOLD_2025Q4",
    "credit_check": {
      "is_override_required": true,
      "exposure_gap": 1500000.00
    },
    "savings_visualized": 150000.00,
    "silver_price_total": 1500000.00,
    "is_eligible_for_points": true
  },
  "routing_intent": {
    "geo_region": "EAST_JAVA",
    "target_subdist_id": "SUBDIST_SBY_ALPHA",
    "target_whatsapp": "+6281234567890"
  },
  "inquiry_payload": {
    "items": [
      { "sku": "ALF-SHP-01", "qty": 12, "unit_price_snapshot": 120000 },
      { "sku": "MTB-CLR-55", "qty": 24, "unit_price_snapshot": 85000 }
    ],
    "total_estimated_value": 3480000.00,
    "estimated_points": 348
  }
}
```

### 5.2. Payload: Order History Response

```json
{
  "order": {
    "id": "ORD_2026_001234",
    "order_number": "INV-2026-001234",
    "status": "COMPLETED",
    "grand_total": 3480000.00,
    "submitted_at": "2026-01-08T10:00:00Z",
    "completed_at": "2026-01-10T14:30:00Z"
  },
  "invoice": {
    "id": "INV_001234",
    "invoice_number": "FA-2026-001234",
    "amount": 3480000.00,
    "status": "PAID",
    "due_date": "2026-01-22T00:00:00Z",
    "paid_at": "2026-01-15T09:00:00Z"
  },
  "loyalty": {
    "points_earned": 418,
    "points_status": "CREDITED",
    "multiplier_applied": 1.20,
    "message": "Poin Anda sudah ditambahkan ke saldo."
  },
  "routing": {
    "routed_to": "CV. Distributor Surabaya Jaya",
    "routed_at": "2026-01-08T10:01:00Z",
    "sla_status": "ON_TIME"
  }
}
```

### 5.3. Payload: Error Responses (Standardized Problem Details)

Backend wajib mengembalikan error terstruktur agar Frontend bisa me-render UI yang tepat.

**Example: Credit Limit Blocked (402 Payment Required)**

- `type`: https://api.alfabeauty.com/errors/credit-blocked
- `title`: Credit Limit Exceeded
- `status`: 402
- `detail`: Your order exceeds the available credit limit by IDR 1,500,000.
- `instance`: /inquiry/submit/TXN-998877
- `extensions`:
    - `current_limit`: 5000000
    - `current_exposure`: 6500000
    - `gap`: 1500000
    - `suggested_action`: REQUEST_OVERRIDE

**Example: Stock Exhausted (409 Conflict)**

- `type`: https://api.alfabeauty.com/errors/stock-exhausted
- `title`: Inventory Allocation Failed
- `status`: 409
- `detail`: Some items are no longer available in the requested quantity.
- `extensions.conflicted_items`:
    - SKU: ALF-SHP-01, Requested: 12, Available: 5

**Example: Region Not Assigned (422 Unprocessable Entity)**

- `type`: https://api.alfabeauty.com/errors/region-not-assigned
- `title`: Partner Region Not Configured
- `status`: 422
- `detail`: Your account does not have a region assigned. Please contact Admin.
- `extensions`:
    - `partner_id`: USR_SBY_099
    - `suggested_action`: CONTACT_ADMIN

**Example: SubDistributor Unavailable (503 Service Unavailable)**

- `type`: https://api.alfabeauty.com/errors/subdist-unavailable
- `title`: No Active Sub-Distributor in Region
- `status`: 503
- `detail`: No active sub-distributor available in your region.
- `extensions`:
    - `region_id`: REG_EAST_JAVA
    - `suggested_action`: CONTACT_HQ

### 5.4. Enum Mapping Reference

Frontend wajib memetakan kode sistem ke Label UI sesuai tabel ini:

**Tier Enum:**

| System Enum (JSON) | UI Label (Bahasa) | Blueprint Term |
| --- | --- | --- |
| `TIER_SILVER` | "Mitra Baru (Cash)" | New Partner |
| `TIER_GOLD` | "Mitra Terverifikasi (Net 14)" | Verified Partner |
| `TIER_PLATINUM` | "Mitra Prioritas (Net 30)" | Priority Partner |

**Order Status Enum:**

| System Enum (JSON) | UI Label (Bahasa) | Description |
| --- | --- | --- |
| `DRAFT` | "Draft" | Order belum disubmit |
| `SUBMITTED` | "Menunggu Proses" | Sudah kirim, menunggu SubDist |
| `PROCESSING` | "Sedang Diproses" | SubDist sedang memproses |
| `APPROVED` | "Disetujui" | Order confirmed, invoice issued |
| `SHIPPED` | "Dalam Pengiriman" | Barang sudah dikirim |
| `COMPLETED` | "Selesai" | Barang diterima |
| `REJECTED` | "Ditolak" | Order ditolak (stok/kredit) |
| `CANCELLED` | "Dibatalkan" | Dibatalkan oleh Partner/Admin |

**Invoice Status Enum:**

| System Enum (JSON) | UI Label (Bahasa) | Point Impact |
| --- | --- | --- |
| `UNPAID` | "Belum Dibayar" | Poin pending |
| `PARTIAL` | "Dibayar Sebagian" | Poin pending |
| `PAID` | "Lunas" | Poin cair |
| `CANCELLED` | "Dibatalkan" | Poin hangus |

**SLA Status Enum:**

| System Enum (JSON) | UI Label (Bahasa) | Action |
| --- | --- | --- |
| `ON_TIME` | "Tepat Waktu" | Normal flow |
| `REMINDER_SENT` | "Pengingat Terkirim" | 18h passed |
| `ESCALATED` | "Dieskalasi" | 24h passed, HQ notified |

### 5.5. Data Type Standards

- **Monetary Values (Harga, Limit):** `DECIMAL(19, 2)` atau `BigInt` (smallest unit). **JANGAN** gunakan Float.
- **Multipliers (Poin):** `DECIMAL(10, 2)` (e.g. 1.20, 1.50).

## 6. NON-FUNCTIONAL REQUIREMENTS

- **Latency:** Inquiry Gen < 200ms.
- **Security:** PII Masking & Impersonation Audit.
- **SLA Monitoring:** Scheduled job setiap 15 menit untuk cek orders pending escalation.

## 7. ROADMAP

1. Frontend Engineering.
2. Backend API Setup.
3. Invoice Module Implementation.
4. SLA Routing Implementation.
5. QA Validation (Scenario: Credit Block, Agent Login, Invoice Flow, SLA Escalation).