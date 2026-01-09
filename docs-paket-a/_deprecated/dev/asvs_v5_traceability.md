# OWASP ASVS v5.0.0 — Minimal Traceability (Paket A / Option B Lead API)

> **DEPRECATED:** Konten ASVS traceability Paket A sudah dikonsolidasikan ke dokumen canonical: `docs-paket-a/paket-a.md` (lihat §16).
# OWASP ASVS v5.0.0 — Minimal Traceability (Paket A / Option B Lead API)
## PT. Alfa Beauty Cosmetica

**Status:** PENDING (becomes PASS when evidence links are filled)  
**Date:** January 09, 2026  
**Scope:** Option B Lead API + any admin/export endpoint  
**Standard:** OWASP Application Security Verification Standard (ASVS) **v5.0.0**

Dokumen ini membuat verifikasi security menjadi **audit-able**: setiap requirement yang dipilih punya bukti implementasi/test.

> Catatan referensi: ASVS menyarankan penulisan requirement ID dengan format `v<version>-<chapter>.<section>.<requirement>`, misalnya `v5.0.0-V2.2.2`.

---

## Minimum set (recommended for this scope)

| ASVS ID | Requirement (excerpt/summary) | Applies to | Implementation notes (what we must do) | Evidence link (fill with actual proof) |
|---|---|---|---|---|
| v5.0.0-V2.2.1 | Input validation uses positive validation (allowlist/expected structure) at least for inputs used for business/security decisions (L1) | `POST` lead submit | Define field constraints (type/length/pattern/range); reject invalid payload with clear error; log rejects safely | _link_ |
| v5.0.0-V2.2.2 | Input validation enforced at trusted service layer; client-side validation not relied on as security control (L1) | lead submit | Server-side schema validation; treat all client fields untrusted | _link_ |
| v5.0.0-V1.2.4 | Parameterized queries / ORM protections against SQL & DB injection (L1) | persistence layer | Use parameterized queries/ORM; never concatenate SQL with user input | _link_ |
| v5.0.0-V2.4.1 | Anti-automation controls to protect against excessive calls / DoS / garbage-data (L2) | lead submit | Rate limiting/throttling; honeypot; abuse response 429; optional IP/device heuristics | _link_ |
| v5.0.0-V8.3.1 | Authorization enforced at trusted service layer; not client-side (L1) | admin/export | Protect admin endpoint with auth (token/basic auth/allowlist); enforce server-side checks | _link_ |
| v5.0.0-V1.2.10 | Protect against CSV/Formula Injection; escape dangerous leading characters when exporting CSV (L3) | export CSV | Escape values starting with `=`, `+`, `-`, `@`, tab, null; follow RFC 4180 escaping rules | _link_ |
| v5.0.0-V4.1.1 | HTTP responses with bodies contain correct `Content-Type` incl. charset (L1) | all API responses | Ensure JSON responses set `application/json; charset=utf-8` | _link_ |
| v5.0.0-V3.4.4 | `X-Content-Type-Options: nosniff` on responses (L2) | website/API | Enable header at edge/app | _link_ |
| v5.0.0-V3.4.6 | CSP `frame-ancestors` directive prevents embedding by default (L2) | website | Configure CSP with `frame-ancestors 'none'` (or allowlist if required) | _link_ |
| v5.0.0-V3.4.3 | CSP baseline includes `object-src 'none'` and `base-uri 'none'` (L2) | website | Configure CSP baseline; move to nonce/hash approach if needed | _link_ |

---

## How we prove it (acceptable evidence)

- Automated tests (integration tests) showing expected HTTP responses (status codes, errors).
- Header snapshot (curl/DevTools) for security headers.
- Code pointers (file path + line range) for validation and persistence logic.
- For CSV export: sample exported CSV + proof of escaping for dangerous prefixes.

---

## References

- OWASP ASVS Project page: https://owasp.org/www-project-application-security-verification-standard/
- ASVS v5.0.0 sources (CSV/PDF): https://github.com/OWASP/ASVS/tree/v5.0.0
