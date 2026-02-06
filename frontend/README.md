# Alfa Beauty Frontend

Next.js 16 + React 19 + Tailwind v4 + Supabase

## Quick Start

```bash
npm install
npm run dev    # Uses Turbopack
```

## Stack

| Package | Version |
|---------|---------|
| Next.js | 16.1.6 |
| React | 19.2.3 |
| Tailwind | 4.x |
| Node.js | ≥20.9.0 |

## Project Structure

```
src/
├── app/           # Routing (App Router)
│   └── [locale]/  # i18n routes (en/id)
├── components/    # UI components
│   ├── site/      # Header, Footer
│   └── ui/        # Primitives
├── lib/           # Utilities
└── styles/        # Design tokens
```

## Deployment

Configured for Vercel (Singapore region).

```bash
npm run build
```
