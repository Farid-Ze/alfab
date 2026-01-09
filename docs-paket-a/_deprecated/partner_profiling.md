# PARTNER PROFILING (PAKET A) — LEAD CAPTURE SPEC

> **DEPRECATED:** Konten partner profiling/lead capture spec Paket A sudah dikonsolidasikan ke dokumen canonical: `docs-paket-a/paket-a.md` (lihat §5).
# PARTNER PROFILING (PAKET A) — LEAD CAPTURE SPEC

**Project:** PT Alfa Beauty Cosmetica — Website Paket A  
**Version:** 1.0  
**Date:** January 09, 2026

## 1. Purpose

Walau Paket A tidak membangun platform transaksi, website tetap perlu **profiling ringan** untuk:
- mengkualifikasi lead (salon/barber, skala bisnis, minat)
- mempercepat follow-up tim sales/BD
- menjadi seed data bila upgrade ke Paket B

## 2. Form Placement

- Page: **Partnership → Become Partner**
- CTA entry points:
  - Home hero CTA “Become Partner”
  - Product detail CTA (secondary)

## 3. Field Spec

### 3.1 Required

- `business_name` (Nama Salon/Barber)
- `contact_name`
- `phone_whatsapp`
- `city`
- `salon_type` (Enum): `SALON | BARBER | BRIDAL | UNISEX | OTHER`
- `consent` (checkbox): persetujuan dihubungi

### 3.2 Optional (Progressive Profiling)

- `chair_count` (integer)
- `specialization` (text)
- `current_brands_used` (text)
- `monthly_spend_range` (enum; optional jika owner setuju)

## 4. Validation Rules

- WhatsApp number must be E.164-like (lenient) + normalize
- Consent must be true before submit
- Basic anti-spam: honeypot field + rate limit

## 5. Routing & Follow-up

Minimal viable:
- Submit → masuk ke inbox email tim (atau Google Sheets) + notifikasi WhatsApp internal (opsional).

## 6. Privacy Notes

- tampilkan ringkas: data dipakai untuk kontak bisnis dan tidak dijual
- retensi: default 12 bulan (atau sesuai kebijakan internal)

## 7. Paket A → Paket B mapping

Field `salon_type`, `chair_count`, `specialization` dipertahankan agar kompatibel dengan Paket B profiling yang lebih lengkap.

---

**Created:** January 09, 2026
