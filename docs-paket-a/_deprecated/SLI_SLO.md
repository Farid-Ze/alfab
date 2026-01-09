# SLIs & SLOs — WEBSITE PAKET A

> **DEPRECATED:** Konten SLI/SLO Paket A sudah dikonsolidasikan ke dokumen canonical: `docs-paket-a/paket-a.md` (lihat §7).
# SLIs & SLOs — WEBSITE PAKET A

**Project:** PT Alfa Beauty Cosmetica — Website Paket A  
**Version:** 1.1  
**Date:** January 09, 2026

## 1. Availability

- **SLO:** 99.9% monthly availability (best effort)
- **SLI:** successful HTTP responses / total requests

## 2. Web Performance (User-centric)

Target (best effort, tergantung hosting & asset):
- LCP p75 < 2.5s (mobile)
- CLS p75 < 0.1
- INP p75 < 200ms (best effort)

Catatan:
- Angka p75 idealnya diambil dari **RUM** (field data) — bukan hanya Lighthouse.
- Paket A memasukkan wiring Core Web Vitals reporting (RUM) agar metrik bisa dipantau secara realistis (lihat ADR-0002).

## 3. Conversion SLIs

- WA CTA click success rate (event logged)
- Lead form submission success rate

## 4. Alerting (Minimal)

- SEV-1: error rate > 1% for 5 minutes
- SEV-1: lead submit endpoint failing continuously

---

**Created:** January 09, 2026
