# PRODUCTION CHECKLIST — WEBSITE PAKET A

> **DEPRECATED:** Konten production checklist Paket A sudah dikonsolidasikan ke dokumen canonical: `docs-paket-a/paket-a.md` (lihat §14).
# PRODUCTION CHECKLIST — WEBSITE PAKET A

## Pre-launch
- Domain/DNS configured
- SSL active (HTTPS)
- WhatsApp CTA number verified
- Robots.txt & sitemap.xml verified
- Analytics configured (pageview + CTA click + lead submit)
- Social metadata verified (OG/Twitter)
- Structured data (JSON-LD) validated for key pages
- Core Web Vitals RUM wiring verified (event delivered, non-blocking; includes `metric_id` + URL dimensions; no `unload` dependency)

## Pre-launch (Option B — Lead API)
- Server-side validation verified (allowlist + length limits)
- Anti-spam verified (honeypot + rate limiting)
- Admin export/inbox verified and **access-controlled**
- Error logging + minimal metric for lead success rate verified
- Security headers baseline verified (response header snapshot; refer baseline: `docs-paket-a/dev/security_headers_baseline.md`)
- Secrets are **not** committed (use env/secret store)

## Launch day
- Smoke test UAT-A critical flows: Home, Products, Product detail, WA CTA, Lead form
- Monitor error logs
- Monitor lead submit success rate (first 1–2 hours)

## Post-launch (Week 1)
- Review top pages & CTA conversion
- Fix content gaps (missing photos/copy)
- Review CWV p75 from RUM (trend, not just lab)
- Rate limit tuning if abuse/noise observed
