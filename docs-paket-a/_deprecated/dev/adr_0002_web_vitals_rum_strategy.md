# ADR-0002 — Web Vitals (RUM) Strategy (Paket A)

> **DEPRECATED:** Ringkasan ADR Paket A sudah digabung ke `docs-paket-a/paket-a.md` (lihat §13).
# ADR-0002 — Core Web Vitals (CWV) RUM strategy (p75, lifecycle-safe, SPA attribution)

**Status:** Proposed  
**Date:** January 09, 2026  
**Scope:** Paket A (Website) — performance observability (CWV RUM)

---

## Context
Paket A mendefinisikan “selesai” sebagai production-ready. Itu artinya kita tidak hanya menambahkan “analytics event”, tapi juga memastikan:
- pengukuran Core Web Vitals dilakukan dengan metodologi yang benar (field/RUM),
- pengiriman data tidak merusak performa (non-blocking, lifecycle-safe), dan
- data bisa dipakai untuk diagnosis (attribution), termasuk pada aplikasi yang punya navigasi client-side.

Core Web Vitals pada tooling Google (CrUX/Search Console/PSI) dinilai dengan pendekatan **distribusi** dan **percentile** (umumnya **p75**), bukan rata-rata. Implementasi RUM kita harus konsisten supaya angka tidak “menipu”.

---

## Decision drivers
- Metodologi CWV yang konsisten dengan tooling Google (p75 framing).
- Reliabilitas pengiriman data (hindari kehilangan data akibat lifecycle mobile).
- Tidak mengganggu UX (beacon non-blocking).
- Data bisa di-dedupe/di-aggregate dengan benar.
- SPA/client-side navigations: minimalkan salah atribusi URL.

---

## Decision
1) **Library:** gunakan `web-vitals` untuk mengukur dan mengirim CWV (LCP/CLS/INP) ke endpoint analytics internal.
2) **Aggregation standard:** pelaporan internal mengikuti target “PASS” berdasarkan **p75** dan segmentasi minimal **mobile vs desktop**.
3) **Transport:** kirim payload menggunakan `navigator.sendBeacon()` dengan fallback `fetch(..., {keepalive: true})`.
4) **Lifecycle policy:** flushing analytics dilakukan pada transisi `visibilitychange` → `hidden` (dan event lifecycle terkait), **bukan** pada `unload`.
5) **Dedupe & updates:** simpan `metric_id` dari `web-vitals` untuk deduplication, karena callback metric dapat dipanggil lebih dari sekali.
6) **URL attribution (SPA-safe):** setiap event menyertakan:
   - `page_url_initial` (URL pada hard navigation), dan
   - `page_url_current` (URL/route saat event dikirim),
   sehingga kita bisa mendiagnosis isu yang muncul setelah route transition tanpa mengubah metodologi “hard navigation” CWV.
7) **Optional (experimental):** pengukuran “soft navigations” diperlakukan sebagai eksperimen terpisah (feature-detected) dan **tidak** menjadi acceptance gate Paket A.

---

## Consequences
- Kita wajib menyediakan endpoint penerima metric (bisa di FE analytics route atau BE service; mengikuti ADR-0001 untuk hosting decision).
- Dashboard/report internal minimal harus bisa menampilkan:
  - p75 LCP/CLS/INP,
  - jumlah sample,
  - breakdown mobile/desktop,
  - serta dimensi URL (initial vs current) untuk diagnosis.
- Kode tidak boleh memasang handler `unload` sebagai “end-of-session”.
- Untuk SPA-like routing, kita tidak “reset CWV” (karena tidak sejalan dengan definisi CWV saat ini); kita hanya memperkaya dimensi diagnosis.

---

## Implementation notes (high level)
- Payload event minimal:
  - `name` (CLS/LCP/INP), `value`, `id` (`metric_id`), `rating` (jika tersedia), `navigationType`,
  - `page_url_initial`, `page_url_current`,
  - `app_version` / `deploy_sha` (untuk before/after analysis).
- Jika memakai `web-vitals/attribution`, tambahkan debug signals (mis. element/target) untuk diagnosis.
- Pastikan batching + flush tidak memblok UI thread.

---

## References (authoritative)
- web.dev — Web Vitals (p75 framing; segment mobile/desktop): https://web.dev/articles/vitals
- web.dev — Best practices for measuring Web Vitals in the field (lifecycle-safe sending): https://web.dev/articles/vitals-field-measurement-best-practices
- web.dev — Getting started measuring Web Vitals: https://web.dev/articles/vitals-measurement-getting-started
- GoogleChrome/web-vitals (library behavior; multiple callbacks; metric_id; batching guidance): https://github.com/GoogleChrome/web-vitals
- web.dev — How SPA architectures affect Core Web Vitals (URL attribution; no reset on route transitions): https://web.dev/articles/vitals-spa-faq
- web.dev — Debug performance in the field (attribution signals; SPA URL note): https://web.dev/articles/debug-performance-in-the-field
- developer.chrome.com — Page Lifecycle API (hidden = last reliable; avoid unload): https://developer.chrome.com/docs/web-platform/page-lifecycle-api
- developer.chrome.com — Deprecating the unload event (unreliable; bfcache impact): https://developer.chrome.com/docs/web-platform/deprecating-unload
- developer.chrome.com — Soft navigations experiment / origin trial (experimental track): https://developer.chrome.com/docs/web-platform/soft-navigations-experiment
