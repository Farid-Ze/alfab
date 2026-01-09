# Paket A — Implementation Pack (Single Source of Truth)

> **DEPRECATED:** Dokumen ini sudah disupersede oleh `docs-paket-a/paket-a.md` (single canonical). Jangan edit file ini; edit di canonical.
# Paket A — Implementation Pack (Single Source of Truth)
## PT. Alfa Beauty Cosmetica

**Date:** January 09, 2026  
**Scope:** Website Paket A + Option B (Lightweight Lead API)  
**Goal:** Mencegah informasi pra-implementasi terfragmentasi. Dokumen ini adalah “one stop” untuk eksekusi.

---

## 1) Definition of “Selesai” (non‑MVP)
Paket A dianggap selesai bila:
- **UAT-A (01–16) PASS** + evidence (screenshot/log/test report), dan
- memenuhi **Definition of Done** (conversion path, ops, security baseline), dan
- audit checklist ter-cover (minimal evidence untuk item non-UAT).

**Referensi:**
- DoD: `docs-paket-a/dev/definition_of_done.md`
- UAT: `docs-paket-a/uat.md`
- Audit checklist: `docs-paket-a/dev/audit_checklist.md`
- Audit mapping: `docs-paket-a/dev/audit_wbs_mapping.md`

---

## 2) Scope boundary (anti scope creep)
**In-scope:** Home, Products (overview+detail), Education/Events, Partnership + Become Partner, About/Contact/Privacy/Terms, SEO basics + social metadata + JSON-LD minimum, analytics events, CWV RUM, Option B lead pipeline (persisted, anti-spam, export protected), runbook + production checklist.

**Out-of-scope:** semua modul Paket B (login, tier pricing, credit, ERP, SLA routing, invoice, loyalty, dsb).

**Referensi:**
- Blueprint: `docs-paket-a/blueprint.md`
- SoW: `docs-paket-a/sow.md`

---

## 3) Architecture decisions that must be locked before coding
1) **Lead API hosting target** (backend service vs Next.js route handler). Default rekomendasi: backend service.

**Referensi:** `docs-paket-a/dev/adr_0001_lead_api_hosting.md`

2) **Core Web Vitals (CWV) RUM strategy** (p75-ready, lifecycle-safe sending, SPA attribution, dedupe).

**Referensi:** `docs-paket-a/dev/adr_0002_web_vitals_rum_strategy.md`

3) **Tech stack & versioning policy** (supported versions + pinning + upgrade cadence).

**Referensi:** `docs-paket-a/dev/adr_0003_stack_versioning_policy.md`

4) **UI system + CSS strategy + FE architecture** (tokens, styling rules, performance guardrails).

**Referensi:** `docs-paket-a/dev/adr_0004_ui_css_architecture.md`

---

## 4) Effort (MD) — maximal planning (anti underestimation)

**Baseline (likely):** 40.25 MD (sum dari tabel detail).  
**Worst (P80–P90):** ~50.8 MD.  
**Maximal planning cap (P95-ish):** ~58.5 MD (worst + contingency).

**Planning decision (current):** gunakan **Worst = ~50.8 MD** sebagai baseline planning/delivery.

> Prinsip: kita tidak mulai implementasi sebelum envelope effort disepakati, supaya tidak “kehabisan napas” tepat di area paling penting (ops/security/UAT evidence).

**Referensi:**
- Detail WBS (per task): `docs-paket-a/dev/work_breakdown_complete.md`
- Range model: `docs-paket-a/dev/estimation_ranges.md`

---

## 5) Execution order (gates)
1) Finalize scope sign-off (A1-01) + Blueprint sign-off evidence (A1-04) + lock Lead API hosting decision (ADR-0001).
2) Build frontend core flow (Home → Products → Detail → Partnership → Form).
3) Implement Lead API Option B (validation → persistence → outbox/fanout → export protected).
4) Wire analytics + CWV RUM.
5) Tests (Playwright smoke + API integration).
6) Staging deploy + UAT evidence pack.
7) Client UAT sign-off evidence (A5-07) + ASVS traceability evidence (A7-05).
8) Prod deploy + post-launch monitoring.

---

## 6) Ops & security baseline (non-negotiable)
- Server-side validation + input hardening (content-type, max body, reject logging)
- Anti-spam + rate limiting
- Admin export access control
- Error logging + minimal lead success-rate metric
- Security headers baseline (canonical: `docs-paket-a/dev/security_headers_baseline.md`)
- Runbook deploy/rollback + production checklist

**Referensi:**
- Governance: `docs-paket-a/governance.md`
- SLI/SLO: `docs-paket-a/SLI_SLO.md`
- Runbook: `docs-paket-a/prod/runbook.md`
- Production checklist: `docs-paket-a/prod/production_checklist.md`

---

## 7) “No fragmentation” rule
Jika ada perubahan requirement atau acceptance:
- Update **satu** dari dokumen inti (Blueprint/FSD/SoW/WBS/UAT/DoD), lalu
- pastikan link di bawah ini tetap konsisten.

### Canonical core docs
- Blueprint: `docs-paket-a/blueprint.md`
- FSD/IDD: `docs-paket-a/fsd-idd.md`
- SoW: `docs-paket-a/sow.md`
- WBS structure: `docs-paket-a/wbs.md`
- Detailed WBS (MD): `docs-paket-a/dev/work_breakdown_complete.md`
- DoD: `docs-paket-a/dev/definition_of_done.md`
- UAT: `docs-paket-a/uat.md`

### Appendices (must stay in sync)
- Audit checklist + mapping: `docs-paket-a/dev/audit_checklist.md`, `docs-paket-a/dev/audit_wbs_mapping.md`
- Estimation envelope: `docs-paket-a/dev/estimation_ranges.md`
- Security headers baseline policy: `docs-paket-a/dev/security_headers_baseline.md`
- ADR decisions: `docs-paket-a/dev/adr_0001_lead_api_hosting.md`, `docs-paket-a/dev/adr_0002_web_vitals_rum_strategy.md`, `docs-paket-a/dev/adr_0003_stack_versioning_policy.md`, `docs-paket-a/dev/adr_0004_ui_css_architecture.md`
- Ops pack: `docs-paket-a/prod/runbook.md`, `docs-paket-a/prod/production_checklist.md`
