# COPILOT INSTRUCTIONS: PT. ALFA BEAUTY COSMETICA

**Scope:** **Paket A — Website Professional B2B**  
**Stack:** Next.js 16.1.6, React 19.2.3, Tailwind CSS v4, Vercel

---

## 1. PROJECT IDENTITY

### Visi
> "Professional B2B Beauty Distribution Partner"

Website company profile untuk **PT. Alfa Beauty Cosmetica** — distributor produk kecantikan profesional untuk salon dan barbershop di Indonesia.

### Karakteristik
| Parameter | Nilai |
|-----------|-------|
| Type | Company Profile + Lead Generation |
| Target | B2B (Salon, Barbershop, Spa) |
| Languages | Indonesian (ID), English (EN) |
| CTA | WhatsApp + Lead Form |

### Karakteristik Skala
| Parameter | Nilai |
|-----------|-------|
| SKU Count | 500 - 2.000 Items |
| Active Partners | 5.000 - 10.000 User |
| Daily Transactions | 500 - 1.000 Inquiries |
| Read:Write Ratio | 20:1 (Read Heavy) |

> **Implikasi:** Tantangan bukan pada concurrency, melainkan pada **reliabilitas**, **konsistensi data**, dan **latency**.

## 2. DOCUMENT HIERARCHY

### Source of Truth
```
Paket A Spec: docs/paket-a.md
```

### Reference Files
```
reference.md      → Brand content, copy
docs/paket-a.md   → Full specifications
```

---

## 3. TECHNOLOGY STACK

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 16.1.6 (App Router) |
| **React** | 19.2.3 |
| **Styling** | Tailwind CSS v4 |
| **Fonts** | Montserrat (next/font) |
| **i18n** | Manual JSON (en.json, id.json) |
| **Validation** | Zod |
| **Logging** | Pino |
| **Deployment** | Vercel (sin1 region) |

---

## 4. PROJECT STRUCTURE

```
frontend/
├── src/
│   ├── app/                    # App Router
│   │   ├── [locale]/           # Dynamic locale (en/id)
│   │   │   ├── layout.tsx      # generateStaticParams + generateMetadata
│   │   │   ├── page.tsx        # Homepage
│   │   │   ├── error.tsx       # Error boundary
│   │   │   ├── not-found.tsx   # 404 page
│   │   │   └── loading.tsx     # Loading skeleton
│   │   ├── api/health/         # Health check
│   │   ├── layout.tsx          # Root layout (shell)
│   │   ├── sitemap.ts          # Dynamic sitemap
│   │   ├── robots.ts           # Dynamic robots.txt
│   │   └── global-error.tsx    # Root error handler
│   │
│   ├── components/             # React Components
│   │   ├── analytics/          # WebVitals
│   │   ├── seo/                # JsonLd
│   │   ├── site/               # Header, Footer
│   │   └── ui/                 # Primitives
│   │
│   ├── lib/                    # Utilities
│   │   ├── api.ts              # API helpers
│   │   ├── config.ts           # Site config
│   │   ├── constants.ts        # Routes, URLs
│   │   ├── env.ts              # Zod validation
│   │   ├── i18n.ts             # Translations
│   │   ├── logger.ts           # Pino
│   │   ├── schemas.ts          # Form schemas
│   │   └── utils.ts            # Formatters
│   │
│   ├── hooks/                  # Custom hooks
│   ├── types/                  # TypeScript types
│   ├── providers/              # Context providers
│   ├── middleware.ts           # Locale + CSP
│   └── instrumentation.ts      # Server hooks
│
├── messages/                   # i18n JSON
│   ├── en.json
│   └── id.json
│
├── next.config.ts
├── vercel.json
└── package.json
```

---

## 5. KEY PATTERNS

### Server Components (Default)
```tsx
// ✅ All components in app/ are Server Components
// Use "use client" ONLY when needed (hooks, events, browser APIs)
```

### Client Components
```tsx
"use client";
import { useState } from "react";
// Required for: useState, useEffect, onClick, browser APIs
```

### generateStaticParams
```tsx
export async function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}
```

### generateMetadata
```tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = getTranslations(locale as Locale);
    return { title: t.home.hero.title };
}
```

### Data Fetching (Server)
```tsx
// ✅ Fetch on server - direct, secure
export default async function Page() {
    const data = await fetch('https://api.example.com/data');
    return <div>{data}</div>;
}

// ✅ Parallel fetching
const [products, categories] = await Promise.all([
    fetchProducts(),
    fetchCategories()
]);
```

### Caching Options
```tsx
// Static (default) - cached at build
export default async function Page() { ... }

// ISR - revalidate every 60s
export const revalidate = 60;

// Dynamic - no cache
export const dynamic = 'force-dynamic';
```

### Streaming with Suspense
```tsx
import { Suspense } from 'react';

<Suspense fallback={<Skeleton />}>
    <AsyncComponent />
</Suspense>
```

### Import via Barrel Exports
```tsx
// ✅ Good
import { cn, formatCurrency } from "@/lib";
import { useMediaQuery } from "@/hooks";

// ❌ Avoid
import { cn } from "@/lib/utils";
```

---

## 6. BUSINESS RULES (Paket A)

### Critical Requirements
- ❌ **No public pricing** — Prices hanya via WhatsApp
- ✅ **WhatsApp CTA must work** — Primary conversion
- ✅ **Lead form must not break** — Capture business inquiries
- ✅ **SEO basics required** — Sitemap, robots, meta tags
- ✅ **Bilingual** — ID (default) + EN

### Performance Targets
| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| CLS | < 0.1 |
| FID/INP | < 100ms |

---

## 7. CODING STANDARDS

### General
- TypeScript strict mode
- Consistent formatting (Prettier)
- Error handling (no silent failures)
- Comments for complex logic only

### Naming
| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `SiteHeader.tsx` |
| Hooks | camelCase + use | `useMediaQuery.ts` |
| Utils | camelCase | `utils.ts` |
| Routes | kebab-case | `about-us/page.tsx` |

### File Structure
- Components: colocate styles + tests
- Feature folders when scaling

---

## 8. SECURITY

### Required Headers (middleware.ts)
- Content-Security-Policy
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- Referrer-Policy: strict-origin-when-cross-origin

### Environment
- `NEXT_PUBLIC_*` for client-exposed vars
- Zod validation in `lib/env.ts`

---

## 9. VERIFICATION

```bash
# Type check
npx tsc --noEmit

# Lint
npm run lint

# Build
npm run build

# Health check
curl http://localhost:3000/api/health
```

---

## 10. FORBIDDEN PRACTICES

❌ Jangan hardcode config (gunakan lib/config.ts)  
❌ Jangan skip error handling  
❌ Jangan buat fitur di luar scope tanpa konfirmasi  
❌ Jangan sebut "MVP" — ini produk final  
❌ Jangan over-engineer  
❌ Jangan gunakan `any` type  

---

## 11. COMMUNICATION STYLE

1. **Langsung dan actionable**
2. **Konteks bisnis** — B2B distribusi kosmetik
3. **Proporsional** — solusi sesuai skala
4. **Rujuk dokumen** — cite paket-a.md saat relevan
5. **Production mindset** — bukan prototype

---

**Document Version:** 2.0 (Paket A Website Focus)  
**Last Updated:** February 06, 2026  
**Maintainer:** Solutions Architect
