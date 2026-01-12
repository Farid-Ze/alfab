# Design Language Freeze — Paket A (Frontend)

**Status:** FROZEN (Jan 12, 2026)

Dokumen ini mengunci keputusan visual & UI behavior untuk implementasi frontend Paket A.

## Reference sites (frozen)

1) Calvin Klein (primary): https://www.calvinklein.us/en
2) Lekker Home: https://lekkerhome.com/
3) Saint Jane Beauty: https://saintjanebeauty.com/

Catatan:
- Beberapa halaman Calvin Klein / e-commerce lain dapat melakukan redirect ke pixel/identity endpoints (tracking). Referensi yang digunakan adalah *visual language* (layout density, typographic hierarchy, minimalism), bukan implementasi teknis e-commerce.

## Core principles

### 1) Monochrome, flat, high-contrast
- Dominan: hitam/putih/abu-abu.
- Hindari drop shadow yang lembut/tebal.
- Kedalaman visual diciptakan lewat **kontras**, **ruang kosong**, dan **garis/border**.

### 2) Sharp corners
- Tombol, input, kartu produk: radius **0px–2px**.
- Hindari bentuk pill/rounded-full.

### 3) Mobile-first, clean grid
- Layout harus nyaman dibaca di mobile, tanpa terasa “ramai”.
- Grid/listing padat tapi tetap breathable (space ditentukan oleh rhythm konsisten).

### 4) Typography system: Fluid headings, fixed for data
- Heading menggunakan `clamp()` (fluid) untuk menjaga scale antar device.
- Body/data text menggunakan ukuran fixed per breakpoint (mis. `text-sm` → `text-base`).

### 5) Bilingual (ID/EN)
- UI copy harus tersedia dalam **Bahasa Indonesia** dan **English**.
- Mekanisme toggle minimal harus ada (tanpa mengubah scope Paket A menjadi platform i18n kompleks).

## Education/Events (Paket A)

- Scope: **showcase**, bukan LMS.
- Harus ada:
  - Listing Education (artikel ringan) + listing Events.
  - **Event detail page** (konsisten).
- Data source best-practice untuk Paket A: **repo-based JSON** (audit-able, simple, no CMS dependency).

## Component rules (pragmatic)

- Button:
  - Primary: black fill, white text.
  - Secondary: white fill, black text, visible border.
- Links: underline on hover, underline-offset konsisten.
- Cards:
  - border 1px, background putih.
  - tidak ada shadow.

## Non-goals (untuk menjaga scope)

- Tidak membangun cart/checkout.
- Tidak menampilkan harga publik.
- Tidak membangun loyalty/rewards UI di Paket A (hanya referensi gaya bila diperlukan nanti).
