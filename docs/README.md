# Dokumentasi Teknis & Rekayasa Perangkat Lunak: PT Alfa Beauty Cosmetica

Direktori ini memuat dokumen spesifikasi teknis, analisis kebutuhan, dan pemodelan arsitektur sistem perangkat lunak berstandar akademis (IEEE 830, ISO/IEC/IEEE 29148, OMG UML 2.5, OWASP ASVS v5.0).

---

## Indeks Dokumen

| No | Dokumen | Deskripsi & Standar | Tautan Berkas |
| :---: | :--- | :--- | :---: |
| 1 | **Dokumentasi UML Yucca Packaging (Benchmark)** | Dokumentasi lengkap sistem benchmark ([https://yucca.co.za/](https://yucca.co.za/)) hasil audit empiris langsung via Chrome DevTools MCP mencakup arsitektur WordPress/WooCommerce, Contact Form 7 (SWV Schema 2024-10), PayFast Gateway, Class, Sequence, MySQL EAV ERD, dan evaluasi keamanan. | [yucca-uml-system-documentation.md](./yucca-uml-system-documentation.md) |
| 2 | **Proposal & Strategi Bisnis** | Berkas proposal penawaran paket kerja sama dan strategi digital 2026. | [proposal/](./proposal/) |

---

## Struktur Direktori Proyek

```text
alfab/
├── docs/
│   ├── README.md                              # Indeks navigasi dokumen
│   ├── proposal/                              # Berkas proposal dan strategi bisnis
│   │   ├── paket-a.md
│   │   ├── proposal.md
│   │   └── strategy-2026.md
│   └── yucca-uml-system-documentation.md      # Dokumen UML Sistem Yucca Packaging (Benchmark)
├── frontend/                                  # Implementasi aplikasi Next.js (TypeScript)
│   ├── public/images/products/                # Aset gambar produk
│   └── src/
│       ├── actions/                           # Server Actions (submit-lead, submit-contact)
│       ├── app/                               # App Router Pages & API Routes
│       ├── components/                        # UI Components & Data Models
│       └── lib/                               # Security, Rate Limiter, Supabase, Email
└── README.md                                  # Dokumentasi root repository
```
