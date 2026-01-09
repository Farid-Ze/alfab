# STATEMENT OF WORK (SoW): WEBSITE PAKET A

> **DEPRECATED:** Konten SoW Paket A sudah dikonsolidasikan ke dokumen canonical: `docs-paket-a/paket-a.md` (lihat §2, §8–12). Gunakan dokumen canonical untuk scope/acceptance “Done = PASS + Evidence”.
# STATEMENT OF WORK (SoW): WEBSITE PAKET A

**Client:** PT Alfa Beauty Cosmetica  
**Vendor:** [Nama Freelancer]  
**Date:** January 09, 2026  
**Reference:** BP-A v1.1, FSD-A v1.1, WBS-A v1.2, UAT-A v1.1  
**Version:** 1.2

## 1. Objective

Membangun website profesional B2B untuk positioning, katalog, dan lead generation.

## 2. Scope (In-Scope)

### A. Pages
- Home
- Products (overview + detail)
- Education/Events (listing; detail optional)
- Partnership (benefits + Become Partner form)
- About, Contact, Privacy Policy, Terms

### B. Functional
- Filter katalog: brand, fungsi, audience (Salon/Barber)
- CTA WhatsApp: contact quick access (sticky)
- Lead capture: Become Partner form (profiling ringan)
- Lead capture: Become Partner form + **lead pipeline via lightweight API (Option B)**
- Basic SEO setup (metadata + sitemap + robots)
- Social metadata (OpenGraph/Twitter) + structured data minimum (JSON-LD)
- Analytics events (pageview + CTA click + lead submit)
- Core Web Vitals RUM wiring (LCP/CLS/INP bila tersedia; p75-ready schema + non-blocking delivery; lihat ADR-0002)
- Security headers baseline (safe-by-default; canonical: `docs-paket-a/dev/security_headers_baseline.md`)

**Lead pipeline (Option B) minimum includes:**
- API contract + server-side validation
- Durable persistence (no-loss)
- Anti-spam + rate limiting
- Delivery fanout (notification) + retry/outbox
- Admin export (CSV) atau mekanisme inbox yang setara (access-controlled)
- Error logging + basic metrics for lead success rate

### C. Delivery
- Source code + deployment instructions
- Content placeholders + struktur konten

## 3. Out-of-Scope (Explicit)

- Produksi konten kreatif: foto produk, video, penulisan artikel SEO panjang
- Pricing public / ecommerce checkout / payment gateway
- Login & modul platform Paket B (credit, tier pricing, ERP, SLA, invoice, loyalty)

## 4. Acceptance

Proyek dinyatakan selesai apabila:
- seluruh skenario pada `docs-paket-a/uat.md` berstatus **PASS** (termasuk lead pipeline checks), dan
- tidak ada bug severity tinggi yang memblokir penggunaan, dan
- jalur lead memenuhi standar operasional minimum (anti-spam, observability, runbook) sesuai `docs-paket-a/governance.md`.

Selain itu, audit checklist `docs-paket-a/dev/audit_checklist.md` harus ter-cover (evidence bisa berupa UAT PASS + header snapshot + validator screenshot).

## 5. Timeline

Mengikuti `docs-paket-a/wbs.md`.

## 6. Effort envelope (anti-underestimate)

Untuk mencegah implementasi dimulai dengan asumsi yang terlalu optimistis, envelope estimasi Paket A adalah:
- Likely: **40.25 MD**
- Worst: **~50.8 MD**

**Keputusan planning saat ini:** gunakan **Worst = ~50.8 MD** sebagai baseline estimasi delivery (SSoT: `docs-paket-a/dev/implementation_pack.md`).

Opsional (jika ingin extra buffer P95-ish):
- Maximal planning cap: **~58.5 MD**

Referensi: `docs-paket-a/dev/work_breakdown_complete.md` dan `docs-paket-a/dev/estimation_ranges.md`.

> Catatan anti-fragmentation: bila ada perbedaan angka antara dokumen, maka `docs-paket-a/dev/implementation_pack.md` adalah sumber canonical untuk envelope dan keputusan planning.

## 7. Client Dependencies

- Daftar brand + logo (format PNG/SVG)
- Data produk minimum: nama, brand, kategori, 1 foto, short descriptor
- Data event/training (jika ingin ditampilkan)
- Nomor WhatsApp yang dipakai untuk CTA

---

**Created:** January 09, 2026
