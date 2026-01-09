# WORK BREAKDOWN (DETAILED): WEBSITE PAKET A

> **DEPRECATED:** Konten work breakdown detail Paket A sudah dikonsolidasikan ke dokumen canonical: `docs-paket-a/paket-a.md` (lihat §12).
# WORK BREAKDOWN (DETAILED): WEBSITE PAKET A
## PT. Alfa Beauty Cosmetica

**Date:** January 09, 2026  
**Scope:** Paket A only (no login, no pricing, no ERP, no platform workflows).  
**References:** `docs-paket-a/blueprint.md` (BP-A), `docs-paket-a/fsd-idd.md` (FSD-A), `docs-paket-a/uat.md` (UAT-A), `docs-paket-a/governance.md` (GOV-A), `docs-paket-a/SLI_SLO.md` (SLI-A), `docs-paket-a/wbs.md` (WBS-A).

---

## 0) How to read this

- Effort is expressed as **MD** (1 MD = 8 hours focused work).
- Paket A is a website; the main risk is **conversion path reliability** (WhatsApp CTA + lead form) and **professional UX + SEO basics**.
- Content creation (photo/copy/video) is client-provided per SoW; we deliver structure and placeholders.
- **Option B is selected:** lead capture is handled by a **lightweight API** (not just webhook/email). “Selesai” here means production-ready (not MVP-looking): persistence, observability, anti-spam, and runbook are included.

---

## 1) Detailed tasks

| ID | Task | Effort (MD) | Class | Doc Ref | Acceptance / Notes |
|---|---|---:|:---:|---|---|
| A1-01 | Scope alignment Paket A vs B (sign-off) | 0.5 | A | WBS-A A1.1 | Signed boundary (no platform modules) |
| A1-02 | Sitemap + content inventory | 0.75 | B | BP-A §4 | Covers Home/Products/Detail/Edu/Partnership |
| A1-03 | Copy guideline (tone B2B) | 0.5 | B | WBS-A A1.3 | Tone rules for headings/CTA |
| A1-04 | Blueprint sign-off (client approval) + evidence capture | 0.25 | B | BP-A | Fill sign-off record + evidence link in `docs-paket-a/blueprint.md` |
| A2-01 | Layout shell (header/nav/footer) | 0.75 | C | FSD-A §3 | Responsive header + footer |
| A2-20 | Design tokens + UI/CSS architecture scaffolding | 0.75 | B | ADR-0004 | Token-first CSS variables; Tailwind/theme mapping (if used); minimal base components aligned with architecture |
| A2-02 | Homepage sections (hero, pillars, portfolio, categories) | 1.0 | C | FSD-A §3.1, UAT-A-01 | Mobile fold CTA visible |
| A2-03 | Sticky WhatsApp CTA component + fallback | 0.75 | A | FSD-A §3.1, UAT-A-05 | WA deep link + fallback copy |
| A2-04 | Products overview page (grid + empty state) | 1.25 | C | FSD-A §3.2, UAT-A-02 | No public pricing |
| A2-05 | Filter panel (brand/function/audience) | 1.25 | B | FSD-A §3.2, UAT-A-03 | AND filters; reset works |
| A2-06 | Shareable filter URL (querystring) | 0.5 | B | FSD-A §3.2 | Querystring stable; share works |
| A2-07 | Product detail template (breadcrumbs, gallery, benefits) | 1.25 | C | FSD-A §3.3, UAT-A-04 | Decision support blocks |
| A2-08 | Product CTA block (WA consult + Become Partner) | 0.75 | A | FSD-A §3.3, UAT-A-05/06 | Consistent placement |
| A2-09 | Education/events listing page | 0.75 | C | FSD-A §3.4, UAT-A-07 | Listing clean |
| A2-10 | Event detail page | 0.5 | C | FSD-A §3.4 | Detail route works |
| A2-11 | Partnership page (benefits + form intro) | 0.75 | C | FSD-A §3.5 | Value props clear |
| A2-12 | Become Partner form (fields + consent) | 1.5 | A | FSD-A §3.5, UAT-A-06 | Valid/invalid states |
| A2-13 | Success state + WhatsApp prompt | 0.5 | A | UAT-A-06 | Confirmation & next step |
| A2-14 | Basic accessibility pass (keyboard nav, focus, forms) | 1.25 | B | UAT-A-08 | Focus visible; labels + error states usable |
| A2-15 | Responsive QA pass (mobile/tablet/desktop) | 0.75 | B | UAT-A-08 | No layout break |
| A2-16 | About page | 0.25 | C | BP-A §4.1 | Copy + layout aligned with B2B tone |
| A2-17 | Contact page | 0.25 | C | BP-A §4.1 | WhatsApp + fallback contact visible |
| A2-18 | Privacy Policy + Terms pages (static) | 0.25 | B | SOW-A §2.A | Links accessible; placeholder text allowed |
| A2-19 | Global 404 + error fallback UI (Next.js) | 0.5 | B | GOV-A §2 | User-friendly 404; safe error boundary |
| A3-01 | Content schema definition (brand/category/product/event) | 1.0 | B | WBS-A A3.1 | JSON/MD structure |
| A3-02 | Content seeding pipeline (JSON/MD loader) | 1.0 | C | WBS-A A3.2 | Repo-based content |
| A4-01 | SEO basics: metadata per page (title/description/canonical) | 1.0 | B | UAT-A-09 | Titles/description; canonical where applicable |
| A4-02 | sitemap.xml + robots.txt (Next.js file conventions) | 0.5 | B | UAT-A-09 | Accessible endpoints |
| A4-03 | Social metadata (OpenGraph + Twitter image defaults) | 0.75 | B | BP-A §1, Next.js metadata | Share cards look professional |
| A4-04 | Structured data (JSON-LD: Organization + Breadcrumb; Product if feasible) | 0.75 | B | BP-A §7 | No bogus claims; validates on test tool |
| A4-05 | Image + font optimization policy (next/image + next/font) | 0.75 | B | UAT-A-10, SLI-A §2 | Prevent CLS; avoid heavy assets |
| A4-06 | Analytics: pageview + CTA click + lead submit events | 0.75 | A | SOW-A §2.B, SLI-A §3 | Event names fixed |
| A4-07 | Core Web Vitals RUM wiring (useReportWebVitals / web-vitals) | 0.75 | B | SLI-A §2, ADR-0002 | p75-ready payload; `metric_id` dedupe; lifecycle-safe send (visibilitychange→hidden, no unload); include URL dimensions (initial/current) for SPA diagnosis |
| A6-01 | Lead API contract + endpoint (Option B) | 1.0 | A | FSD-A §4 | Server-side validation (allowlist + lengths) |
| A6-02 | Lead persistence + idempotency | 1.0 | A | GOV-A §4 | Durable storage; duplicate submit safe |
| A6-03 | Lead delivery fanout (notification) + retry/outbox | 1.0 | A | GOV-A §4 | At-least-once delivery; retry/backoff |
| A6-04 | Admin export (CSV) + access protection | 0.75 | A | GOV-A §4 | Export works; access controlled |
| A6-05 | Anti-spam: honeypot + throttle/rate limit | 0.75 | A | FSD-A §5, GOV-A §5 | Reject bots; 429 on abuse |
| A6-06 | Input validation hardening (max body, content-type, logging rejects) | 0.5 | A | OWASP Input Validation | Prevent malformed/excessive input early |
| A6-07 | Error logging + metrics for lead pipeline | 0.75 | A | SLI-A §4 | Success rate visible; alerts defined |
| A7-01 | Secrets/config management for lead API | 0.5 | A | GOV-A §5 | No secrets in repo; rotation note |
| A7-02 | Security headers baseline (CSP, clickjacking, etc.) | 0.75 | B | `docs-paket-a/dev/security_headers_baseline.md` | Safe-by-default headers policy |
| A7-05 | OWASP ASVS v5.0.0 minimal traceability (lead API + export) | 0.5 | B | ASVS v5.0.0 | Fill `docs-paket-a/dev/asvs_v5_traceability.md` + collect evidence links |
| A7-03 | Deployment wiring (staging/prod) + runbook | 1.0 | B | GOV-A §3 | Deploy procedure + rollback steps |
| A7-04 | Version pinning + supported lifecycle compliance | 0.5 | B | ADR-0003 | Lockfile committed; runtime versions pinned; CI enforces reproducible builds; align with supported Node/Next/Go/TS windows |
| A5-01 | Playwright smoke tests: WA CTA + lead form | 1.0 | A | UAT-A-05/06 | Prevent regressions |
| A5-02 | API integration tests (contract + rate limit) | 0.75 | A | UAT-A-11 | Verifies API behavior |
| A5-06 | CI quality gates: lint + typecheck + smoke | 0.5 | B | DoD + GOV-A | CI fails on lint/typecheck/test; evidence via CI logs |
| A5-03 | UAT-A execution (UAT-01..16) + evidence | 1.25 | B | UAT-A | PASS evidence |
| A5-07 | Client UAT sign-off + evidence capture | 0.25 | B | UAT-A | Fill sign-off record + evidence link in `docs-paket-a/uat.md` |
| A5-04 | Bugfix & polish wave | 2.0 | B | WBS-A A5.2 | Includes retest |
| A5-05 | Production readiness review + handover | 0.75 | B | GOV-A, SLI-A | Checklist + owner handoff |

---

## 2) Totals (likely) + ranges

Total effort (likely, sum): **40.25 MD**

Planning ranges (see `docs-paket-a/dev/estimation_ranges.md`):
- Best: ~36.9 MD
- Likely: 40.25 MD
- Worst: ~50.8 MD

Planning decision (current): recorded in `docs-paket-a/dev/implementation_pack.md` (§4).

Optional contingency cap (only if you want extra protection): **~58.5 MD** (see `docs-paket-a/dev/estimation_ranges.md`)

Notes:
- This includes a priced **polish wave** and **production readiness** work (observability + runbook). Website projects fail when these are treated as “nanti aja”.
- If hosting constraints force simplification (e.g., no DB), effort can shift from persistence to alternate durable inbox (still must be non-lossy).
