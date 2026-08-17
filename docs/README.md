# Dokumentasi Teknis & Rekayasa Perangkat Lunak: PT Alfa Beauty Cosmetica

Direktori ini memuat dokumen spesifikasi teknis, analisis kebutuhan, dan pemodelan arsitektur sistem perangkat lunak berstandar akademis (IEEE 830, ISO/IEC/IEEE 29148, OMG UML 2.5, OWASP ASVS v5.0).

---

## Indeks Dokumen

| No | Dokumen | Deskripsi & Standar | Tautan Berkas |
| :---: | :--- | :--- | :---: |
| 1 | **Dokumentasi UML PT Alfa Beauty Cosmetica** | Kerangka perancangan arsitektur dan pemodelan sistem berbasis Next.js 16 App Router (IEEE 830, OMG UML 2.5, OWASP ASVS v5.0). | [uml-system-documentation.md](./uml-system-documentation.md) |
| 2 | **Dokumentasi UML Yucca Packaging (Benchmark)** | Dokumentasi lengkap sistem benchmark ([https://yucca.co.za/](https://yucca.co.za/)) hasil audit empiris langsung via Chrome DevTools MCP mencakup arsitektur WordPress/WooCommerce, Contact Form 7 (SWV Schema 2024-10), PayFast Gateway, Class, Sequence, MySQL EAV ERD, telemetri performa, dan analisis ancaman STRIDE. | [yucca-uml-system-documentation.md](./yucca-uml-system-documentation.md) |
| 3 | **Proposal & Strategi Bisnis** | Berkas proposal penawaran paket kerja sama dan strategi digital 2026. | [proposal/](./proposal/) |

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
│   ├── uml-system-documentation.md            # Kerangka Dokumen UML PT Alfa Beauty Cosmetica
│   └── yucca-uml-system-documentation.md      # Dokumen UML Sistem Yucca Packaging (Benchmark)
├── frontend/                                  # Implementasi aplikasi Next.js (TypeScript)
│   ├── public/                                # Aset statis & gambar
│   └── src/
│       ├── app/                               # Next.js App Router Pages & API Routes
│       ├── components/                        # UI, Site, Home, & Analytics Components
│       ├── hooks/                             # Custom React Hooks
│       ├── lib/                               # Konfigurasi, Skema, Logger, & Helper
│       └── types/                             # Definisi Tipe TypeScript
└── README.md                                  # Dokumentasi root repository
```
