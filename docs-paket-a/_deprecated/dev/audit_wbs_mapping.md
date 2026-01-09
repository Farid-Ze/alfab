# Audit → WBS Mapping — Paket A

> **DEPRECATED:** Konten audit→WBS mapping Paket A sudah dikonsolidasikan ke dokumen canonical: `docs-paket-a/paket-a.md` (lihat §10.2).
# Audit → WBS Mapping — Paket A
## PT. Alfa Beauty Cosmetica

**Date:** January 09, 2026

Dokumen ini memetakan item audit checklist ke WBS dan task detail, supaya tidak ada requirement yang “menggantung” tanpa owner.

---

| Audit ID | Covered by WBS epic | Covered by detailed task IDs | Covered by UAT | Notes |
|---|---|---|---|---|
| SIGNOFF-01 | A1 | A1-04 | (gate) | Blueprint sign-off + evidence link required |
| SIGNOFF-02 | A5 | A5-07 | (gate) | Client UAT approval + evidence link required |
| TRACE-01 | A5 | A5-03 | UAT-01..16 | Evidence pack + mapping completeness |
| UX-01 | A2 | A2-01 | UAT-01/02 | Navigation + footer links |
| UX-02 | A2, A4, A6 | A2-03, A2-08, A2-12–A2-13, A4-06, A6-01..A6-07 | UAT-05/06/11/12 | Conversion path end-to-end |
| UX-03 | A2 | A2-16..A2-18 | UAT-13 | Static/legal pages |
| UX-04 | A2 | A2-19 | UAT-14 | 404 + error fallback |
| A11Y-01 | A2 | A2-14, A2-15 | UAT-08 | Keyboard + focus |
| A11Y-02 | A2 | A2-12..A2-14 | UAT-06/08 | Form error states |
| A11Y-03 | A2 | A2-14, A2-15 | UAT-08 | Focus not obscured (WCAG 2.2) |
| A11Y-04 | A2 | A2-14, A2-15 | UAT-08 | Target size minimum (WCAG 2.2) |
| A11Y-05 | A2 | A2-14, A2-15 | UAT-08 | Dragging alternatives (WCAG 2.2) |
| SEO-01 | A4 | A4-01 | UAT-09 | Title/desc/canonical |
| SEO-02 | A4 | A4-02 | UAT-09 | robots + sitemap |
| SEO-03 | A4 | A4-03 | UAT-15 | OG/Twitter |
| SEO-04 | A4 | A4-04 | (can be added to UAT-15 or UAT-09) | JSON-LD validation evidence |
| PERF-01 | A4 | A4-05 | UAT-10 | Image/font policy |
| PERF-02 | A4 | A4-07 | UAT-16 | CWV RUM wiring |
| PERF-03 | A4, A5 | A4-07, A5-03 | (partial: UAT-16) | p75-ready schema + URL attribution + dedupe evidence (ADR-0002) |
| PERF-04 | A4, A5 | A4-07, A5-03 | (audit only) | Lifecycle-safe sending; bfcache not blocked by unload listener |
| PERF-05 | A4 | A4-07 | (optional) | bfcache notRestoredReasons diagnostics (Chrome) |
| SEC-01 | A6 | A6-01 | UAT-11 | Server-side allowlist validation |
| SEC-02 | A6 | A6-06 | UAT-11 | Content-type/body limits + reject logging |
| SEC-03 | A6 | A6-05 | UAT-11 | Honeypot + rate limit |
| SEC-04 | A6 | A6-04 | UAT-12 | Access control export |
| SEC-05 | A7 | A7-01 | (doc review) | No secrets in repo |
| SEC-06 | A7 | A7-02 | (header check) | Security headers baseline (canonical: `docs-paket-a/dev/security_headers_baseline.md`) |
| SEC-07 | A7 | A7-05 | (audit only) | ASVS v5.0.0 minimal traceability + evidence links |
| OPS-01 | A4/A6 | A6-07 | UAT-11 (indirect) | Logging for lead failures |
| OPS-02 | A4/A6 | A6-07 | (ops check) | Lead success rate metric |
| OPS-03 | A7 | A7-03, A5-05 | (handover) | Runbook + rollback |
| QA-01 | A5 | A5-01 | (CI evidence) | Playwright smoke |
| QA-02 | A5 | A5-02 | UAT-11 | API integration tests |
| QA-03 | A5 | A5-03 | UAT-01..16 | Evidence pack |
| ENG-01 | A7, A5 | A7-04, A5-06 | (CI evidence) | Version pinning + supported lifecycle compliance (ADR-0003) |
| ENG-02 | A2 | A2-20 | UAT-08 (indirect) | UI tokens + styling discipline (ADR-0004) |

---

If you want, I can also enforce this mapping by adding a small “coverage” section in `work_breakdown_complete.md` that links each new audit item to its IDs so reviewers can audit quickly.
