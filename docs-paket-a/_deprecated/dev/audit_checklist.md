# Audit Checklist — Paket A (Website)

> **DEPRECATED:** Konten audit checklist Paket A sudah dikonsolidasikan ke dokumen canonical: `docs-paket-a/paket-a.md` (lihat §10).
# Audit Checklist — Paket A (Website)
## PT. Alfa Beauty Cosmetica

**Date:** January 09, 2026  
**Scope:** Paket A (Website) + Option B Lightweight Lead API  
**Goal:** Checklist ini menerjemahkan best-practice (2025–2026) menjadi item verifikasi yang bisa diuji, dikumpulkan evidencenya, dan dipetakan ke WBS/UAT.

---

## 0) Sign-off & Traceability (hard gates)

| ID | Check | How to verify (acceptance) | Evidence | Notes |
|---|---|---|---|---|
| SIGNOFF-01 | Blueprint sign-off recorded | `docs-paket-a/blueprint.md` bagian **Sign-off record** terisi (nama, tanggal, metode) dan status bukan PENDING | Link/screenshot approval | Tidak boleh “approved by chat tanpa bukti” |
| SIGNOFF-02 | UAT sign-off recorded | `docs-paket-a/uat.md` bagian **Sign-off record** terisi dan status bukan PENDING | Link/screenshot approval | Gate untuk klaim “DONE” |
| TRACE-01 | DoD/UAT/Audit coverage lengkap | Audit mapping (`audit_wbs_mapping.md`) menutup semua item audit; UAT PASS punya evidence pack | Link evidence pack | Menghindari requirement “menggantung” |

## 1) UX & Content Structure

| ID | Check | How to verify (acceptance) | Evidence | Notes |
|---|---|---|---|---|
| UX-01 | Navigation & IA jelas | Header/footer konsisten, semua link utama tidak broken | Screenshot + link list | Termasuk footer legal links |
| UX-02 | Conversion path “WA + Become Partner” aman | CTA WA tersedia di titik yang disepakati + fallback; Form bisa submit valid/invalid | Video/screenshot + UAT PASS | Ini jalur kritikal |
| UX-03 | Static pages tersedia | About/Contact/Privacy/Terms bisa diakses dan rapi | Screenshot | Copy placeholder boleh |
| UX-04 | 404 & error fallback | URL invalid menampilkan 404 ramah; error boundary aman | Screenshot | Jangan “blank page” |

## 2) Accessibility (baseline)

| ID | Check | How to verify (acceptance) | Evidence | Notes |
|---|---|---|---|---|
| A11Y-01 | Keyboard navigation | Menu + fokus bisa dipakai tanpa mouse; fokus terlihat | Screen recording | Minimal: tab order wajar |
| A11Y-02 | Forms usable | Label/placeholder jelas; error state terbaca; consent checkbox accessible | Screenshot | Hindari error hanya warna |
| A11Y-03 | Focus not obscured (WCAG 2.2) | Saat tabbing/shift+tab, indikator fokus **tidak tertutup** sticky header/CTA (termasuk sticky WhatsApp) pada breakpoint utama | Screen recording (mobile+desktop) | Refer WCAG 2.2 SC 2.4.11 (AA) |
| A11Y-04 | Target size minimum (WCAG 2.2) | Target interaktif utama (CTA, tombol, ikon) memenuhi target size minimum atau memenuhi pengecualian yang valid | Screenshot + note pengecualian | Refer WCAG 2.2 SC 2.5.8 (AA) |
| A11Y-05 | No drag-only interactions (WCAG 2.2) | Jika ada carousel/slider yang bisa drag, harus ada kontrol alternatif (buttons) untuk operasi tanpa dragging | Screen recording | Refer WCAG 2.2 SC 2.5.7 (AA) |

## 3) SEO & Shareability

| ID | Check | How to verify (acceptance) | Evidence | Notes |
|---|---|---|---|---|
| SEO-01 | Metadata per halaman | Title/description sesuai page; canonical bila perlu | View-source | Hindari empty/duplicate |
| SEO-02 | robots.txt + sitemap.xml | Endpoint dapat diakses | URL evidence | Ikuti konvensi Next.js |
| SEO-03 | Social metadata | OG/Twitter tags ada + reasonable defaults | View-source | Minimal: title/desc/image |
| SEO-04 | Structured data (JSON-LD) | Organization + Breadcrumb valid (Product optional) | Validator screenshot | Jangan klaim palsu |

## 4) Performance & Core Web Vitals

| ID | Check | How to verify (acceptance) | Evidence | Notes |
|---|---|---|---|---|
| PERF-01 | Image/font policy | next/image + next/font (atau setara); CLS tidak “liar” | Lighthouse screenshot | Fokus ke LCP/CLS |
| PERF-02 | CWV RUM wiring | Metric set minimal (LCP/CLS/INP bila tersedia) terkirim via analytics endpoint | Network screenshot | Non-blocking (sendBeacon/fetch) |
| PERF-03 | CWV methodology + attribution | Pelaporan internal memakai **p75** (bukan rata-rata), minimal breakdown mobile/desktop; payload menyertakan `metric_id` untuk dedupe serta `page_url_initial` + `page_url_current` untuk diagnosis | Screenshot dashboard/query + contoh payload | Refer ke ADR-0002 |
| PERF-04 | Lifecycle-safe analytics + bfcache-friendly | Tidak ada penggunaan `unload` sebagai session-end; flush di `visibilitychange`→`hidden`; hasil test bfcache di DevTools tidak blocked oleh `unload` listener | DevTools bfcache panel screenshot | bfcache penting untuk navigasi back/forward cepat |
| PERF-05 | (Opsional) bfcache blocking telemetry | Jika bfcache tidak digunakan, alasan dapat diinspeksi via DevTools dan/atau `PerformanceNavigationTiming.notRestoredReasons` (Chrome) untuk debugging | Screenshot/console snippet | Jangan bergantung pada string reason yang spesifik |

## 5) Security (minimum)

| ID | Check | How to verify (acceptance) | Evidence | Notes |
|---|---|---|---|---|
| SEC-01 | Server-side validation | Allowlist + length limits; invalid payload ditolak | Test log | Jangan percaya client |
| SEC-02 | Input validation hardening | Content-Type check, max body size, reject logging | Log snippet | Prevent abuse/DoS kecil |
| SEC-03 | Anti-spam + rate limit | Honeypot + throttle; 429 on abuse | Test evidence | Protect lead endpoint |
| SEC-04 | Admin/export protected | Endpoint export/inbox butuh kredensial | UAT evidence | Jangan public |
| SEC-05 | Secrets management | Token/secret di env/secret store | Repo scan note | No secrets in repo |
| SEC-06 | Security headers baseline | Header snapshot sesuai baseline policy (CSP/anti-clickjacking, nosniff, referrer-policy, dll) | Response headers snapshot | Canonical: `docs-paket-a/dev/security_headers_baseline.md` |
| SEC-07 | OWASP ASVS traceability (v5.0.0) | Ada tabel ringkas “ASVS requirement → implementasi/test evidence” untuk scope yang relevan (minimal subset untuk lead API + admin/export) | `docs-paket-a/dev/asvs_v5_traceability.md` + evidence links | Gunakan format referensi `v5.0.0-...` (lihat guidance ASVS) |

## 6) Observability & Ops

| ID | Check | How to verify (acceptance) | Evidence | Notes |
|---|---|---|---|---|
| OPS-01 | Error logging lead pipeline | Error lead tidak silent; ada log/trace minimal | Screenshot/log | Fokus ke drop lead |
| OPS-02 | Metric “lead success rate” | Ada indikator sukses/gagal per periode | Dashboard/metrics | Minimal cukup |
| OPS-03 | Runbook deploy/rollback | Ada langkah deploy, rollback, incident (SEV-1/2) | Doc link | Handover-ready |

## 7) Quality Gates

| ID | Check | How to verify (acceptance) | Evidence | Notes |
|---|---|---|---|---|
| QA-01 | Playwright smoke | WA CTA + lead form smoke stabil | CI log / report | Prevent regressions |
| QA-02 | API integration tests | Contract + rate limit test PASS | Test log | Coverage minimal |
| QA-03 | UAT PASS | UAT-01..16 PASS dengan evidence | UAT evidence pack | Definition of Done |

## 8) Engineering Governance (versioning + UI/CSS)

| ID | Check | How to verify (acceptance) | Evidence | Notes |
|---|---|---|---|---|
| ENG-01 | Supported versions + pinning | Runtime & dependency versions dipin; lockfile committed; policy mengikuti ADR-0003 | Screenshot file (`package.json` engines / `go.mod` toolchain) + CI log `npm ci`/`go mod tidy` | Production hanya di supported lifecycle window |
| ENG-02 | UI tokens + styling discipline | Token-first (CSS variables) dipakai; tidak ada style ad-hoc yang melanggar arsitektur; fokus terlihat | Screenshot UI + cuplikan config tokens (`globals.css`/theme) | Refer ADR-0004 |

---

## References (non-exhaustive)
- Next.js documentation: metadata, robots/sitemap conventions, production checklist
- web.dev: Web Vitals (p75 framing, thresholds): https://web.dev/articles/vitals
- web.dev: CWV field measurement best practices: https://web.dev/articles/vitals-field-measurement-best-practices
- web.dev: Getting started measuring Web Vitals (RUM vs lab; web-vitals lib): https://web.dev/articles/vitals-measurement-getting-started
- web.dev: SPA & CWV limitations: https://web.dev/articles/vitals-spa-faq
- web.dev: Debug performance in the field (attribution): https://web.dev/articles/debug-performance-in-the-field
- GoogleChrome/web-vitals library: RUM collection patterns: https://github.com/GoogleChrome/web-vitals
- developer.chrome.com: Page Lifecycle API (avoid unload; hidden is last reliable): https://developer.chrome.com/docs/web-platform/page-lifecycle-api
- developer.chrome.com: Deprecating unload (unreliable; bfcache impact): https://developer.chrome.com/docs/web-platform/deprecating-unload
- developer.chrome.com: Test bfcache in DevTools: https://developer.chrome.com/docs/devtools/application/back-forward-cache
- developer.chrome.com: bfcache notRestoredReasons API: https://developer.chrome.com/docs/web-platform/bfcache-notrestoredreasons
- W3C: WCAG 2.2 Recommendation: https://www.w3.org/TR/WCAG22/
- OWASP: Application Security Verification Standard (ASVS) v5.0.0: https://owasp.org/www-project-application-security-verification-standard/
- OWASP: Input Validation guidance (server-side, allowlist-first)
