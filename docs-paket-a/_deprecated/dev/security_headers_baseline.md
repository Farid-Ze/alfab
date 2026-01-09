# Security Headers Baseline — Paket A (Website + Option B Lead API)

> **DEPRECATED:** Konten security headers baseline Paket A sudah dikonsolidasikan ke dokumen canonical: `docs-paket-a/paket-a.md` (lihat §15).
# Security Headers Baseline — Paket A (Website + Option B Lead API)
## PT. Alfa Beauty Cosmetica

**Date:** January 09, 2026  
**Scope:** Paket A (website) + Option B Lead API (termasuk admin/export)  
**Status:** Proposed (becomes PASS when evidence snapshot is attached)

Dokumen ini menjadi **sumber canonical** untuk definisi “security headers baseline” yang dirujuk oleh:
- DoD (`docs-paket-a/dev/definition_of_done.md`)
- Audit checklist (`docs-paket-a/dev/audit_checklist.md`)
- Governance (`docs-paket-a/governance.md`)
- Production checklist & runbook (`docs-paket-a/prod/*`)

Tujuannya mengurangi informasi yang terfragmentasi: ketika baseline berubah, kita update **di sini**, lalu semua dokumen lain cukup merujuk.

---

## 1) Baseline headers (recommended)

> Catatan: ini baseline “safe-by-default”. Jika ada constraint hosting/CDN yang membuat sebagian header tidak bisa dipasang, buat *exception note* + bukti (screenshot konfigurasi / provider doc) dan pastikan mitigasi alternatif.

### A) Website responses (HTML)
Minimum yang disarankan:

1) **Content Security Policy (CSP)**
- Header: `Content-Security-Policy`
- Baseline policy (contoh awal yang aman dan sederhana; perlu disesuaikan untuk Next.js/script inline):
  - `base-uri 'none'`
  - `object-src 'none'`
  - `frame-ancestors 'none'`
  - `upgrade-insecure-requests`

> Untuk aplikasi modern (Next.js), CSP sering perlu nonce/hash untuk `script-src`/`style-src`. Prinsip audit-nya: **punya CSP yang eksplisit**, bukan “default kosong”.

2) **Anti MIME sniffing**
- `X-Content-Type-Options: nosniff`

3) **Referrer policy**
- `Referrer-Policy: strict-origin-when-cross-origin`

4) **HTTPS enforcement (jika domain sudah HTTPS)**
- `Strict-Transport-Security: max-age=31536000; includeSubDomains`  
  (tambahkan `preload` hanya setelah siap dan paham konsekuensinya)

5) **Permissions policy (privacy by default)**
- `Permissions-Policy: geolocation=(), microphone=(), camera=()`  
  (tambahkan allowlist hanya bila ada fitur yang butuh)

6) **Clickjacking protection**
- Utamakan `frame-ancestors` pada CSP.
- `X-Frame-Options: DENY` boleh dipakai sebagai kompatibilitas legacy (opsional jika CSP sudah ada dan konsisten).

### B) Lead API responses (JSON)
Minimum yang disarankan:

1) `Content-Type: application/json; charset=utf-8`
2) `X-Content-Type-Options: nosniff`
3) `Cache-Control: no-store` (khususnya untuk response yang berisi detail admin/export)
4) `Referrer-Policy: no-referrer` (opsional; lebih relevan untuk HTML, tapi aman untuk API)
5) Proteksi framing tidak relevan untuk JSON, tapi `frame-ancestors` (CSP) biasanya tidak dipakai pada API.

---

## 2) Verification & evidence (what counts as proof)

Evidence yang diterima untuk audit/DoD:
- Screenshot DevTools (Network → Headers) untuk halaman utama (Home) + endpoint lead API.
- Atau output header snapshot dari tooling (mis. curl/HTTP client) yang menampilkan response headers.
- Jika ada CDN/WAF config: screenshot konfigurasi + contoh HTTP response.

Minimal evidence set:
- 1 snapshot untuk **Home (HTML)**
- 1 snapshot untuk **Lead API submit (JSON)**
- 1 snapshot untuk **Admin/export endpoint** (jika ada)

---

## 3) Exception policy

Jika baseline tidak bisa dipenuhi 100%:
- Catat **header mana** yang tidak bisa dipasang.
- Jelaskan **alasan** (constraint hosting/CDN/framework).
- Tambahkan **mitigasi** (mis. CSP disederhanakan tapi tetap ada `frame-ancestors`; atau header dipasang di edge layer).
- Lampirkan evidence.
