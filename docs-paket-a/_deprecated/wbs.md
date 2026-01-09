# WORK BREAKDOWN STRUCTURE (WBS): WEBSITE PAKET A

> **DEPRECATED:** Konten WBS Paket A sudah dikonsolidasikan ke dokumen canonical: `docs-paket-a/paket-a.md` (lihat §11–12).
# WORK BREAKDOWN STRUCTURE (WBS): WEBSITE PAKET A

**Project:** PT Alfa Beauty Cosmetica — Website Paket A  
**Version:** 1.2  
**Date:** January 09, 2026

## 1. Assumptions

- Konten kreatif (foto/copy/video) disediakan klien; tim dev menyediakan placeholder dan struktur.
- Tidak ada login, tidak ada harga publik.
- Fokus: UX cepat, profesional, mudah di-maintain.
- **Option B dipilih:** lead capture menggunakan **lightweight API** (persisted + observable), bukan sekadar webhook/email.
- “Selesai” = **production-ready**, bukan “MVP feels like”: ada acceptance evidence, anti-spam, observability, dan runbook minimum.

Dokumen eksekusi terpusat (anti-fragmentation):
- `docs-paket-a/dev/implementation_pack.md`

## 2. Workstreams

### Epic A1 — Discovery & IA (PM/Architect)
- A1.1 Alignment scope Paket A vs Paket B (dokumen + sign-off)
- A1.2 Sitemap + content inventory
- A1.3 Copy guideline (tone B2B)
- A1.4 Blueprint sign-off (client approval + evidence)

### Epic A2 — UI/Frontend
- A2.1 Layout shell + navigation + footer
- A2.2 Homepage sections
- A2.3 Products overview (filter + grid)
- A2.4 Product detail template
- A2.5 Education/events pages
- A2.6 Partnership + lead form + success state
- A2.7 Responsive + accessibility pass
- A2.8 Static pages: About, Contact, Privacy, Terms
- A2.9 Global 404 + error fallback UI

### Epic A3 — Content System
- A3.1 Define content schema (brand/category/product/event)
- A3.2 Seed content pipeline (JSON/MD)

### Epic A4 — SEO / Analytics / Ops
- A4.1 SEO basics: metadata, sitemap, robots
- A4.2 Social metadata (OpenGraph/Twitter) + JSON-LD (minimum)
- A4.3 Analytics events: CTA click + lead submit
- A4.4 Core Web Vitals (RUM) reporting wiring (p75-ready + lifecycle-safe; see ADR-0002)
- A4.5 Error logging + basic monitoring

### Epic A5 — QA & UAT
- A5.1 Test cases execution (UAT-A)
- A5.2 Bug fix & polish
- A5.3 Client UAT sign-off + evidence

### Epic A6 — Lead API (Option B)
- A6.1 Lead API contract + validation
- A6.2 Lead persistence + idempotency
- A6.3 Delivery fanout (notification) + retry/outbox
- A6.4 Admin export (CSV) + access control
- A6.5 Anti-spam + rate limiting
- A6.6 Input validation hardening (limits + reject logging)

### Epic A7 — Production Readiness
- A7.1 Secrets/config management
- A7.2 Security headers baseline (lihat definisi canonical: `docs-paket-a/dev/security_headers_baseline.md`)
- A7.3 Deployment wiring (staging/prod) + rollback
- A7.4 Runbook + handover checklist

## 3. Delivery Plan (Indicative)

- Week 1: A1 + A2.1–A2.3 (Home + Products overview)
- Week 2: A2.4–A2.7 + A3 + A4
- Week 3 (buffer): A6 + A7 + A5 + polish + content finalization

> Estimasi detail effort tersedia di `docs-paket-a/dev/work_breakdown_complete.md`.

---

**Created:** January 09, 2026
