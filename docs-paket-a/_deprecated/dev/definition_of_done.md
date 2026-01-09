# DEFINITION OF DONE (DoD) — PAKET A (WEBSITE)

> **DEPRECATED:** Konten DoD Paket A sudah dikonsolidasikan ke dokumen canonical: `docs-paket-a/paket-a.md` (lihat §9).
# DEFINITION OF DONE (DoD) — PAKET A (WEBSITE)
## PT. Alfa Beauty Cosmetica

**Date:** January 09, 2026  
**Scope:** Paket A only (Website) + **Option B: Lightweight Lead API**.

Dokumen ini memperjelas arti “selesai” agar tidak jatuh ke *MVP feels like*.

---

## 1) Done = PASS + Evidence
Sebuah item dianggap DONE jika:
- memenuhi acceptance criteria (termasuk edge cases), dan
- ada evidence (link, screenshot, log, atau hasil test) di PR atau catatan rilis.

---

## 2) Functional DoD (Conversion Path)
### WhatsApp CTA
- Deep link benar (format nomor + pesan prefill bila ada)
- Ada fallback bila device tidak support deep link
- Event analytics “cta_whatsapp_click” terkirim

### Become Partner Form
- Client-side validation jelas
- Server-side validation ada (tidak percaya input client)
- Success state + error state jelas
- Anti-spam minimum: honeypot + rate limit/throttle

---

## 3) Lead Pipeline DoD (Option B)
- Lead **persisted** (durable) sebelum dianggap sukses
- Ada idempotency / duplicate handling (submit ulang tidak bikin data kacau)
- Ada mekanisme notifikasi (fanout) + retry/outbox (minimal at-least-once)
- Ada admin export/inbox yang **access-controlled**

---

## 4) SEO + Performance DoD
- Title/meta per page sesuai UAT
- `sitemap.xml` + `robots.txt` tersedia
- Social metadata (OpenGraph + Twitter) tersedia untuk halaman kunci
- Structured data (JSON-LD minimum) tersedia dan valid untuk halaman kunci
- Gambar ter-optimized (ukuran/format) sesuai policy
- Core Web Vitals RUM wiring aktif (metric terkirim, non-blocking)
	- Pengukuran mengikuti metodologi **field/RUM** dan pelaporan memakai **p75** (bukan rata-rata)
	- Target threshold CWV (untuk pelaporan internal):
		- LCP: $\le 2.5s$ (good)
		- INP: $\le 200ms$ (good)
		- CLS: $\le 0.1$ (good)
	- Reporting minimal bisa di-breakdown **mobile vs desktop**
	- Pengiriman data lifecycle-safe: flush di `visibilitychange` → `hidden` (bukan `unload`)
	- Dedupe menggunakan `metric_id` (callback bisa terpanggil >1x)
	- Untuk diagnosis SPA/client routing: kirim `page_url_initial` (hard nav) + `page_url_current`
	- Referensi keputusan: `docs-paket-a/dev/adr_0002_web_vitals_rum_strategy.md`

### Accessibility DoD (minimum, aligned with WCAG 2.2 AA where relevant)
- Fokus keyboard terlihat dan **tidak tertutup** oleh sticky header/CTA (termasuk sticky WhatsApp) pada breakpoint utama.
- Target interaktif utama cukup besar untuk tap di mobile (atau memenuhi pengecualian yang valid).
- Tidak ada interaksi yang *wajib* drag-only tanpa kontrol alternatif (mis. tombol untuk carousel).

---

## 5) Observability & Ops DoD
- Error logging untuk failure di lead pipeline
- Minimal metric/indikator: lead submit success rate (per periode)
- Runbook: cara deploy, rollback, dan langkah incident (SEV-1/2)

---

## 6) Quality Gates DoD
- Playwright smoke untuk: WA CTA + lead form
- Integration test untuk lead API (contract + rate limit)
- UAT-A (01–16) PASS dengan evidence

### Engineering excellence (baseline)
- Versi runtime & dependency **dipin** (lockfile) dan berada pada **supported lifecycle** (lihat ADR-0003)
- Aturan UI/CSS konsisten (token-first; fokus terlihat; tidak ada styling ad-hoc yang menyulitkan maintenance) (lihat ADR-0004)
- Ada lint/typecheck gate di CI (minimal: lint + typecheck + test smoke)

---

## 7) Security/Privacy DoD (minimum)
- Secrets tidak ada di repo (env/secret store)
- Endpoint admin/export tidak terbuka publik tanpa proteksi
- Consent text jelas di form (privacy policy tersedia)
- Security headers baseline diterapkan (lihat: `docs-paket-a/dev/security_headers_baseline.md`)
- Ada dokumen traceability minimum berbasis **OWASP ASVS v5.0.0** untuk scope lead API + admin/export: `docs-paket-a/dev/asvs_v5_traceability.md`

---

## 8) Audit coverage note
- Checklist audit terstruktur: `docs-paket-a/dev/audit_checklist.md`
- Mapping audit → WBS/UAT: `docs-paket-a/dev/audit_wbs_mapping.md`
