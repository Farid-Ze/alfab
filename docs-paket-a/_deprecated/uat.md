# USER ACCEPTANCE TEST (UAT): WEBSITE PAKET A

> **DEPRECATED:** Konten UAT Paket A sudah dikonsolidasikan ke dokumen canonical: `docs-paket-a/paket-a.md` (lihat §8). Jangan edit file ini; edit di canonical.
# USER ACCEPTANCE TEST (UAT): WEBSITE PAKET A

**Project:** PT Alfa Beauty Cosmetica — Website Paket A  
**Version:** 1.1  
**Date:** January 09, 2026

## Purpose

Dokumen ini menjadi kontrak acceptance untuk Paket A. Jika seluruh skenario PASS, maka deliverable dianggap selesai.

---

## UAT-01 — Homepage positioning
**Steps:** buka home di mobile dan desktop  
**Expected:** hero value proposition terlihat, CTA “Explore Products” dan “Become Partner” dapat diklik, logo brand tampil.

## UAT-02 — Products overview navigation
**Steps:** buka Products overview  
**Expected:** kategori tampil, grid produk tampil, tidak ada harga.

## UAT-03 — Filter brand/fungsi/audience
**Steps:** pilih Brand; tambah filter Audience; reset filter  
**Expected:** hasil berubah sesuai filter, empty-state jelas jika tidak ada hasil.

## UAT-04 — Product detail decision support
**Steps:** buka 3 product detail  
**Expected:** header + brand + kategori tampil, benefits/use-cases/how-to-use tampil ringkas, CTA WhatsApp tersedia.

## UAT-05 — WhatsApp contact
**Steps:** klik WhatsApp CTA dari Home + Product detail  
**Expected:** membuka WA (atau deep link), fallback contact tersedia bila device tidak support.

## UAT-06 — Become Partner lead form
**Steps:** submit form valid; coba submit tanpa consent; coba nomor WA invalid  
**Expected:** valid submit sukses + success state; invalid ditolak dengan pesan jelas.

## UAT-07 — Education/events
**Steps:** buka halaman education/events  
**Expected:** listing tampil rapi, CTA register/WA (jika ada) berfungsi.

## UAT-08 — Responsive & basic accessibility
**Steps:** cek breakpoint mobile, tablet, desktop; navigasi keyboard untuk menu  
**Expected:** layout tidak pecah, fokus terlihat.

## UAT-09 — SEO basics
**Steps:** cek title/meta; cek sitemap.xml & robots.txt  
**Expected:** metadata sesuai, sitemap dapat diakses.

## UAT-10 — Performance sanity
**Steps:** load home di koneksi lambat (simulasi)  
**Expected:** tidak ada asset blocking berlebihan; gambar ter-optimized.

## UAT-11 — Lead pipeline (Option B) reliability
**Steps:** submit form valid; lakukan 3x submit cepat; lakukan 1x submit dengan payload invalid (misalnya consent false / format WA salah)  
**Expected:**
- submit valid sukses dan tidak hilang (persisted)
- spam/throttle bekerja (request berlebihan ditolak dengan state yang jelas)
- invalid payload ditolak oleh server-side validation

## UAT-12 — Lead admin export (access-controlled)
**Steps:** akses endpoint export/inbox tanpa kredensial; lalu akses dengan kredensial yang benar; download/export leads  
**Expected:**
- tanpa kredensial ditolak
- dengan kredensial berhasil export (CSV/format lain yang disepakati)
- data minimal sesuai kebutuhan follow-up (nama, kontak, timestamp, metadata penting)

## UAT-13 — Legal & static pages
**Steps:** buka About, Contact, Privacy Policy, Terms dari navigasi/footer
**Expected:** semua halaman dapat diakses, copy placeholder diperbolehkan tetapi struktur rapi dan link tidak broken.

## UAT-14 — 404 & error fallback
**Steps:** akses URL yang tidak ada (mis. `/this-page-does-not-exist`)
**Expected:** tampil halaman 404 yang user-friendly dan ada navigasi kembali ke Home.

## UAT-15 — Social metadata
**Steps:** inspeksi `<head>` pada Home + Product detail (view-source atau devtools)
**Expected:** ada OpenGraph metadata minimal (title/description/image) dan Twitter card metadata; tidak ada metadata kosong/invalid.

## UAT-16 — Core Web Vitals reporting (RUM)
**Steps:** buka Home, lakukan interaksi ringan (scroll/click), lalu cek bahwa event Web Vitals terkirim (via network tab / analytics debug view)
**Expected:** metric set minimal (LCP/CLS/INP atau yang disupport) ter-report tanpa mem-blok UI.

Catatan verifikasi payload (minimum):
- ada identifier untuk dedupe (mis. `metric_id`),
- ada dimensi URL untuk diagnosis SPA (mis. `page_url_initial` dan `page_url_current`),
- pengiriman non-blocking (mis. `sendBeacon` / `fetch` keepalive) dan tidak bergantung pada event `unload`.

---

## Sign-off record (PASS + Evidence)

Status UAT ini **bukan** sekadar “dibaca”. Ia dianggap selesai jika ada approval eksplisit + evidence.

| Field | Value |
|---|---|
| Status | **PENDING** |
| Approved by | _[Nama, jabatan]_ |
| Approval date | _[YYYY-MM-DD]_ |
| Approval method | _Email / WA / Meeting minutes_ |
| Evidence link | _[URL / path ke bukti: email screenshot / minutes / ticket]_ |

