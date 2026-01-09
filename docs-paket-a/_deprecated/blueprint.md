# WEBSITE BLUEPRINT: ALFA BEAUTY (PROFESSIONAL B2B)

> **DEPRECATED:** Konten Blueprint Paket A sudah dikonsolidasikan ke dokumen canonical: `docs-paket-a/paket-a.md` (lihat §1–3 + sign-off record).

**Client:** PT Alfa Beauty Cosmetica  
**Document Type:** Blueprint (Paket A)  
**Version:** 1.1  
**Date:** January 09, 2026  

## 1. Executive Intent

Paket A adalah website profesional yang berfungsi sebagai:

1) **Positioning**: memperjelas siapa Alfa Beauty, 3 pilar (Products, Education, Partnership), dan keunggulan kurasi brand.
2) **Discovery**: katalog produk yang mudah dinavigasi untuk salon/barbershop (tanpa harga publik).
3) **Conversion**: jalur cepat ke WhatsApp untuk konsultasi + **Become Partner** (lead capture) dengan profil dasar.

> Prinsip utama: **B2B-first, professional, no retail gimmicks.**

## 2. Company Introduction (Approved Copy)

_PT Alfa Beauty is a professional beauty distribution company dedicated to providing products, education, and technical support for salons and barbershops in Indonesia. We represent carefully selected international brands and work as a strategic partner to professionals, ensuring every product we distribute delivers consistent performance, real-world relevance, and is supported by proper technical knowledge._

## 3. Scope Boundary (What this is / is not)

### 3.1 In Scope (Paket A)

- Homepage (positioning + CTA)
- Product Overview (kategori + filter profesional)
- Product Detail (decision support, ringkas & teknis)
- Education/Event highlight (showcase, bukan LMS)
- Partnership / Become Partner (form + WhatsApp)
- About/Contact, basic legal pages (Privacy/Terms)
- Basic SEO + analytics instrumentation

### 3.2 Out of Scope (Paket A)

Untuk menghindari scope creep, berikut **tidak** termasuk Paket A:

- Harga publik / tier pricing / diskon volume / loyalty
- Login Partner/Agent/Admin (private zone)
- Keranjang/inquiry builder + submit order workflow
- Integrasi ERP (stok, kredit, sinkronisasi), degraded mode
- SLA routing & escalation dashboard
- Invoice & payment tracking

> Semua modul di atas merupakan **Paket B** (lihat `docs-paket-b/`).

## 4. Information Architecture (IA)

### 4.1 Sitemap (Public)

- Home
- Products
  - Overview (filter)
  - Detail
- Education
  - Trainings & Events (listing)
  - Event detail (optional)
- Partnership
  - Become Partner (lead capture)
  - Partnership benefits (value props)
- About
- Contact
- Privacy Policy
- Terms

### 4.2 CTA Strategy

- Primary CTA (Home): **Explore Products** / **Become Partner**
- Persistent CTA: **WhatsApp Consult** (sticky button) + fallback: email

## 5. Page Blueprints (Derived from “Susunan Fitur Website”)

### 5.1 Homepage

**Wajib:**
- Hero statement (value proposition jelas)
- CTA utama: Explore Products / Become Partner
- Brand portfolio (logo principal)
- 3 pilar: Products / Education / Partnership
- Quick product categories
- Highlight training/event
- Contact quick access (WhatsApp)

**Opsional:**
- Short video brand (≤ 30 detik)
- Testimonials (salon/barber)
- Trust KPI (years in market, salons served)

**Tidak perlu:**
- Harga
- Detail produk panjang (retail storytelling)

### 5.2 Products — Overview

**Wajib:**
- Navigasi kategori produk profesional
- Filter: Brand, Fungsi, Untuk siapa (Salon/Barber)
- Thumbnail + short descriptor
- CTA ke product detail
- Intro text singkat (tone profesional)

**Opsional:**
- Tag: New / Training Available
- Compare (advanced; biasanya Phase 2)

**Tidak perlu:**
- Harga publik
- “Best seller ala retail” (boleh diganti framing B2B seperti “Recommended for…”) 

### 5.3 Product Detail Page

**Wajib (Decision Support):**
- Product header: nama, brand, kategori
- Media: foto (1–3), variant/size
- Professional overview (2–3 kalimat)
- Key benefits (3–5 bullets)
- Recommended for: Salon / Barber + use-cases
- How to use (ringkas; steps)
- Technical notes (bila ada): ingredients highlight / safety / certifications (tanpa klaim berlebihan)
- CTA: WhatsApp consult + Become Partner

**Opsional:**
- “Training available” block (link event)
- Download spec sheet (PDF) jika klien menyiapkan

**Tidak perlu:**
- Harga publik
- Promo retail (flash sale, countdown, dsb)

## 6. Data & Content Model (Website-level)

Paket A perlu struktur konten yang rapi agar mudah di-maintain:

- Brand: name, logo, short profile
- Category: name, order
- Product: name, brand_id, category_id, audience (Salon/Barber), function tags, short desc, long desc (optional), media, variant/size, training_available (bool)
- Event/Training: title, date, location/online, audience, CTA link/WA
- Partnership Lead: profile fields (lihat `partner_profiling.md`)

> Catatan: produksi konten (foto, copy, video) adalah tanggung jawab Klien; tim dev menyiapkan struktur & placeholder.

## 7. Non-Functional Requirements (Website)

- **Performance:** cepat di mobile; hindari asset berat.
- **SEO basics:** title/meta, canonical, sitemap.xml, robots.txt.
- **Shareability:** social metadata minimum (OpenGraph/Twitter) untuk halaman kunci.
- **Structured data:** JSON-LD minimum (Organization + Breadcrumb; Product bila feasible) dan valid.
- **Accessibility:** struktur heading, kontras, keyboard navigation.
- **Observability:** error logging + pageview/conversion events.
- **Security baseline:** security headers minimum + hardening endpoint lead (Option B).

## 8. Upgrade Path (Paket A → Paket B)

Agar kerja Paket A tidak terbuang:
- Taksonomi kategori/brand/product di Paket A dibuat kompatibel untuk migrasi ke katalog Paket B.
- Form Become Partner mengumpulkan profil minimal (salon_type, specialization, chair_count) yang bisa menjadi seed untuk onboarding Paket B.

---

## Sign-off record (PASS + Evidence)

Blueprint ini dianggap “approved” hanya bila ada sign-off eksplisit + evidence.

| Field | Value |
|---|---|
| Status | **PENDING** |
| Approved by | _[Nama, jabatan]_ |
| Approval date | _[YYYY-MM-DD]_ |
| Approval method | _Email / WA / Meeting minutes_ |
| Evidence link | _[URL / path ke bukti: email screenshot / minutes / ticket]_ |

---

**Created:** January 09, 2026
