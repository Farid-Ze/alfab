# FSD/IDD: WEBSITE ALFA BEAUTY (PROFESSIONAL B2B)

> **DEPRECATED:** Konten FSD/IDD Paket A sudah dikonsolidasikan ke dokumen canonical: `docs-paket-a/paket-a.md` (lihat §4).

**Project:** PT Alfa Beauty Cosmetica — Website Paket A  
**Document Type:** Functional Specification (FSD) & Interface Data Definition (IDD)  
**Version:** 1.1  
**Date:** January 09, 2026

## 1. Design Thesis

Website harus terasa **professional B2B**:
- katalog sebagai alat *decision support*, bukan retail entertainment
- CTA jelas: konsultasi + become partner
- tanpa harga publik

## 2. Actors (Simplified)

| Actor | Capabilities |
|---|---|
| Guest | Browse katalog, baca education/events, submit lead, click WhatsApp |
| Internal Admin (content ops) | Update konten (via repo/CMS) — tidak memerlukan RBAC kompleks di Paket A |

> Paket A tidak memiliki Partner/Agent/Admin login flow. Itu Paket B.

## 3. Pages & Functional Requirements

### 3.1 Home

**Components:**
- Hero (value prop)
- CTA buttons
- Brand portfolio logo strip
- 3 pillars section
- Quick categories
- Education/event highlight
- WhatsApp quick access

**Acceptance Notes:** hero + CTA harus terlihat pada fold mobile.

### 3.2 Products Overview

**Components:**
- Category navigation
- Filter panel: Brand, Function, Audience (Salon/Barber)
- Product grid (thumbnail + short descriptor)
- Empty state + no-results guidance

**Functional:**
- filter kombinatif (AND)
- shareable URL querystring (optional)

### 3.3 Product Detail

**Components:**
- Product header + breadcrumbs
- Gallery
- Summary + key benefits
- Recommended for + use cases
- How to use
- Training available (optional)
- CTA block: WhatsApp consult / Become Partner

### 3.4 Education / Events

**Components:**
- Event list + highlight
- Event detail (optional)

**Functional:**
- filter by audience (Salon/Barber) (optional)

### 3.5 Partnership — Become Partner

**Goal:** mengubah minat menjadi lead yang siap ditindak.

**Components:**
- Benefits section
- Form + consent
- Success page + WhatsApp prompt

Profil field detail: lihat `partner_profiling.md`.

## 4. IDD (Data Interfaces)

Paket A bisa diimplementasikan dengan 2 pendekatan:

### Option A — Static/Repo Content (No backend changes)
- Konten product/event disimpan sebagai file JSON/MD di repo.
- Form lead mengirim ke email/Google Sheet/CRM via webhook.

### Option B — Lightweight API
- `GET /api/public/products`
- `GET /api/public/products/{slug}`
- `GET /api/public/brands`
- `GET /api/public/categories`
- `GET /api/public/events`
- `POST /api/public/partner-leads`

#### 4.1 Partner Lead Payload (example)

```json
{
  "meta": {"timestamp": "ISO8601", "source": "website"},
  "lead": {
    "business_name": "Barber X",
    "contact_name": "Andi",
    "phone_whatsapp": "+62812...",
    "city": "Surabaya",
    "salon_type": "BARBER",
    "chair_count": 6,
    "specialization": "coloring, keratin",
    "preferred_contact": "WHATSAPP",
    "consent": true
  }
}
```

## 5. Non-Functional Requirements (Website)

- **Performance:** LCP target < 2.5s on mobile (best effort)
- **Reliability:** 99.9% monthly availability target
- **SEO/Share:** metadata + social metadata (OpenGraph/Twitter) untuk halaman kunci
- **Structured data:** JSON-LD minimum (Organization + Breadcrumb; Product bila feasible)
- **Observability:** analytics events + Core Web Vitals RUM wiring (field data; p75-ready payload; non-blocking; see ADR-0002)
- **Security:** basic hardening (rate-limit lead form, anti-spam, input size/content-type limits) + security headers baseline (canonical: `docs-paket-a/dev/security_headers_baseline.md`)

---

**Created:** January 09, 2026
