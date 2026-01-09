# Evidence Pack — Paket A (PASS + Evidence)

**Canonical spec:** `docs-paket-a/paket-a.md`

Folder ini adalah tempat menyimpan bukti (evidence) agar status **DONE** bisa diaudit tanpa “cari-cari di chat”.

## Prinsip

- **No evidence = not done.**
- Evidence harus **reproducible** dan punya konteks: tanggal, environment, versi/commit, siapa yang menjalankan.
- Simpan bukti paling dekat dengan sumbernya (contoh: screenshot DevTools headers untuk Security Headers Baseline).

## Struktur

- `01-signoff/` — bukti approval (email/WA screenshot/minutes/ticket)
- `02-uat/` — evidence UAT-A 01–16 (screenshot + catatan PASS/FAIL)
- `03-security/` — headers snapshot, ASVS evidence links, export protection proof
- `04-performance-rum/` — payload verification, contoh event, p75 summary/export
- `05-accessibility/` — hasil cek (manual + tooling), screenshot fokus/keyboard, dll
- `06-ops/` — runbook proof, alert/log sample, smoke test proof
- `07-release-notes/` — ringkasan rilis per deployment

## Template index (wajib diisi)

Buat satu file index per folder (contoh: `02-uat/index.md`) berisi:

- Date
- Environment (staging/prod)
- Version/commit
- Runner
- Checklist + link ke artefak (gambar/log)

> Catatan: repo ini tidak memaksakan format file bukti (png/pdf/md). Yang dipaksa adalah **keterlacakan**.
