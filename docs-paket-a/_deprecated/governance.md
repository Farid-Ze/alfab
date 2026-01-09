# OPERATIONAL GOVERNANCE (PAKET A) — WEBSITE

> **DEPRECATED:** Konten governance/ops Paket A sudah dikonsolidasikan ke dokumen canonical: `docs-paket-a/paket-a.md` (lihat §14).
# OPERATIONAL GOVERNANCE (PAKET A) — WEBSITE

**Client:** PT Alfa Beauty Cosmetica  
**Version:** 1.1  
**Date:** January 09, 2026

## 1. Operating Principle

Walau Paket A adalah website, kita tetap butuh disiplin operasional minimum:
- perubahan konten harus terkontrol
- error harus terlihat
- jalur lead (Become Partner) tidak boleh putus

## 2. Incident Severity (Website)

| Level | Definition | Example | Target Response |
|---|---|---|---|
| SEV-1 | Website down / lead form down | 5xx mass, deployment broken | < 30 min |
| SEV-2 | Major feature degraded | filter rusak, WA CTA broken | < 4 hours |
| SEV-3 | Content issue | typo, gambar missing | < 24 hours |

## 3. Change Management

- Perubahan konten besar: melalui PR/review (atau CMS approval)
- Rilis: gunakan tag/release notes singkat

### 3.1 Client sign-off (hard gate)

Untuk menghindari “sudah oke secara lisan”, Paket A memakai aturan:
- Blueprint dianggap approved hanya jika **Sign-off record** di `docs-paket-a/blueprint.md` terisi (nama, tanggal, metode) dan ada **evidence link**.
- UAT dianggap complete hanya jika **Sign-off record** di `docs-paket-a/uat.md` terisi dan evidence link tersedia.

Evidence yang diterima (pilih salah satu):
- email approval,
- notulen meeting + daftar hadir/rekaman singkat,
- ticket approval (Jira/ClickUp/Notion/Asana) yang menyebut versi dokumen.

Catatan: perubahan requirement setelah sign-off dianggap **change request** dan harus meng-update dokumen canonical (Blueprint/FSD/UAT/WBS/SoW) + release note.

## 4. Lead Handling SOP

- Lead masuk harus memiliki owner (tim sales/BD)
- SLA follow-up internal (disarankan): < 24 jam
- Jika jalur integrasi lead gagal: fallback manual (export inbox)

Operational minimum untuk lead pipeline (Option B):
- Lead **wajib persisted** (durable), tidak boleh “best effort”.
- Harus ada mekanisme **admin export/inbox** yang access-controlled.
- Harus ada catatan error (logging) dan indikator sederhana (success rate) untuk mendeteksi lead drop.

## 5. Security Basics

- Rate limiting untuk endpoint lead form
- Anti-spam (honeypot + throttling)
- Jangan publish nomor internal sensitif selain WA resmi

- Security headers baseline (canonical policy: `docs-paket-a/dev/security_headers_baseline.md`)
- Input validation hardening untuk endpoint lead (content-type check, max body size)
- Reject logging untuk input invalid/abuse (agar bisa investigasi jika ada drop/attack)

Tambahan (untuk Option B — Lead API):
- **Access control** untuk endpoint admin/export (token/Basic Auth/allowlist) dan tidak diekspos publik tanpa proteksi.
- **Secrets management**: token/API keys disimpan di environment/secret store, bukan di repo.
- **Audit minimum**: log siapa/apa/berapa kali export dilakukan (minimal timestamp + source).

Tambahan (verifikasi, supaya audit-able):
- Gunakan baseline verifikasi berbasis **OWASP ASVS v5.0.0** untuk endpoint lead (minimal subset yang relevan untuk web service sederhana).

---

**Created:** January 09, 2026
