# RUNBOOK — Website Paket A

> **DEPRECATED:** Konten ops/runbook Paket A sudah dikonsolidasikan ke dokumen canonical: `docs-paket-a/paket-a.md` (lihat §14).
# RUNBOOK — Website Paket A
## PT. Alfa Beauty Cosmetica

**Date:** January 09, 2026

Dokumen ini adalah panduan operasi minimum untuk Paket A (website) + Option B Lead API.

---

## 1) Deploy

### Staging
- Deploy staging via pipeline/hosting yang disepakati.
- Smoke test minimal: Home, Products, Product detail, WA CTA, Lead form.

### Production
- Deploy di jam low-traffic.
- Pastikan env/secrets sudah terpasang di secret store.
- Setelah deploy: jalankan smoke test yang sama + 1 submit lead valid.

## 2) Rollback

Rollback dilakukan jika ada:
- SEV-1 (website down / lead submit gagal terus)
- Error rate tinggi setelah deploy

Langkah minimum:
- Rollback ke release sebelumnya (tag/commit yang known-good).
- Verifikasi smoke test + lead submit valid.
- Catat incident singkat (waktu, dampak, root cause sementara).

## 3) Incident triage (SEV-1/2)

### SEV-1 — Website down / lead form down
Checklist:
- Apakah CDN/hosting sehat?
- Apakah API lead endpoint sehat?
- Apakah ada spike 429/5xx?
- Cek error logs (frontend + lead API) untuk pola.

Target: mitigasi < 30 menit (rollback bila perlu).

### SEV-2 — Major feature degraded
Contoh: filter rusak, WA CTA broken.
- Repro cepat.
- Hotfix atau rollback tergantung impact.

## 4) Lead pipeline health checks

Minimal health signals:
- Lead submit success rate (per jam/hari)
- Error count (4xx invalid, 429 abuse, 5xx failure)

Jika lead drop dicurigai:
- Coba submit lead test.
- Cek persistence (apakah data tersimpan).
- Cek notification/fanout status.
- Jika perlu, gunakan admin export untuk memastikan data tidak hilang.

## 5) Security quick checks

- Admin export/inbox harus tetap protected.
- Rate limit aktif.
- Security headers baseline aktif (cek response headers snapshot; refer baseline: `docs-paket-a/dev/security_headers_baseline.md`).
- Tidak ada secret di repo.

---

**Related docs:**
- `docs-paket-a/governance.md`
- `docs-paket-a/prod/production_checklist.md`
- `docs-paket-a/dev/audit_checklist.md`
