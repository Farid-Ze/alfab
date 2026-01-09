# Implementation Backlog — Paket A

**Canonical spec:** `docs-paket-a/paket-a.md`

Tujuan backlog ini: membuat eksekusi *agency-grade* (jelas owner, jelas acceptance, jelas evidence).

## Cara pakai

- Satu baris = satu unit delivery (idealnya 0.25–1.5 MD).
- Definition of Done untuk item ini adalah: **PASS + Evidence** (evidence simpan di `artifacts/paket-a/evidence-pack/`).
- Jika ada konflik, rujukan utama tetap `docs-paket-a/paket-a.md`.

## Backlog (seed)

| ID | Area | Item | Acceptance (ringkas) | Evidence (minimal) | Owner | Status |
|---|---|---|---|---|---|---|
| A-01 | FE | Shell layout + nav | Pages terakses; mobile/desktop OK | Screenshot |  | TODO |
| A-02 | FE | Home (positioning + CTA) | UAT-A-01 PASS | UAT evidence |  | TODO |
| A-03 | FE | Products overview | UAT-A-02 PASS | UAT evidence |  | TODO |
| A-04 | FE | Product detail | UAT-A-03 PASS | UAT evidence |  | TODO |
| A-05 | FE | Education/events | UAT-A-04 PASS | UAT evidence |  | TODO |
| A-06 | FE | Become Partner form UI | UAT-A-06/07 PASS | UAT evidence |  | TODO |
| A-07 | Lead API | Persist lead (Option B) | UAT-A-11 PASS | Logs + DB record screenshot |  | TODO |
| A-08 | Lead API | Rate limit + anti-spam | UAT-A-12 PASS | Test notes + logs |  | TODO |
| A-09 | Lead API | Admin/export protected | UAT-A-12 PASS | Auth proof + export sample |  | TODO |
| A-10 | Observability | Lead pipeline monitoring | Success-rate visible | Screenshot dashboard/logs |  | TODO |
| A-11 | Performance | CWV RUM wiring | UAT-A-16 PASS | RUM payload evidence |  | TODO |
| A-12 | Security | Headers baseline applied | §15 PASS | Headers snapshot |  | TODO |
| A-13 | A11y | WCAG risk checks | Audit items PASS | Screenshot/video |  | TODO |
| A-14 | Ops | Runbook + prod checklist validated | §14 PASS | Ops evidence |  | TODO |
| A-15 | Release | Staging UAT run | UAT-A PASS | `02-uat/index.md` filled |  | TODO |
| A-16 | Release | Production launch | Smoke test + monitor | `07-release-notes` entry |  | TODO |

> Catatan: tabel ini sengaja seed-level. Saat implementasi dimulai, tiap item boleh dipecah lebih kecil bila PR terlalu besar.
