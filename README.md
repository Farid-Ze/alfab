# PT. Alfa Beauty Cosmetica B2B Platform

Website B2B + Lead Capture untuk PT. Alfa Beauty Cosmetica

## Tech Stack

- **Frontend:** Next.js 16.x + React + TypeScript 5.9
- **Runtime:** Node.js 24.x (Active LTS; fallback 22.x)
- **Database:** Supabase (lead persistence)
- **CMS:** Headless CMS (free tier)
- **Analytics:** GA4 + Google Search Console
- **Hosting:** Vercel Free/Hobby

## Quick Start

### Prerequisites

- Node.js 24.x (atau 22.x)
- npm

### Development

```bash
cd frontend
npm install
npm run dev      # Start development server
npm run build    # Build production
npm run lint     # Run linting
npm run test:unit # Run unit tests
npm run type-check # Run TypeScript check
```

## Contributing
Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

**Domain:**
- Primary: `alfabeautycosmetica.com`
- Redirect: `alfabeautycosmetica.co` → `.com`

## Project Structure

```
├── frontend/           # Next.js frontend app
│   ├── src/            # Source code
│   ├── public/         # Static assets
│   ├── e2e/            # End-to-end tests (Playwright)
│   └── scripts/        # Build/utility scripts
├── docs-paket-a/       # Documentation
│   ├── paket-a.md      # Technical spec
│   └── proposal.md     # Commercial proposal
└── scripts/            # Root-level scripts
```

## Features

- **Katalog Produk:** Filter by brand/fungsi/audience, tanpa harga publik
- **Lead Capture:** Form "Become Partner" dengan validasi + anti-spam
- **WhatsApp CTA:** Deep link + fallback
- **Bilingual:** ID/EN untuk semua halaman
- **SEO:** Meta, sitemap, robots, OpenGraph/Twitter, JSON-LD
- **Analytics:** Event tracking (klik WA, submit lead)

## Lead Pipeline

```
Form Submit → Server Validation → Supabase (DB) → Email Notification
                                      ↓
                              Export CSV (Owner/PIC)
```

## Environment Variables

Lihat `frontend/.env.example` untuk konfigurasi yang dibutuhkan.

## Documentation

- [Paket A (technical spec)](docs-paket-a/paket-a.md) — acuan teknis implementasi
- [Proposal (commercial)](docs-paket-a/proposal.md) — acuan komersial (scope, UAT, biaya)
- [Docs entry](docs-paket-a/README.md)

## License

Proprietary - PT. Alfa Beauty Cosmetica
