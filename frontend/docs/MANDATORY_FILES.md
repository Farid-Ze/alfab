# Next.js 16 Mandatory Files

> Files that MUST exist for this project to function correctly.
> Playwright tests verify these files exist.

---

## App Router (Required)

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout shell |
| `src/app/[locale]/layout.tsx` | Locale layout with font, header, footer |
| `src/app/[locale]/page.tsx` | Homepage |
| `src/app/[locale]/error.tsx` | Error boundary |
| `src/app/[locale]/not-found.tsx` | 404 page |
| `src/app/[locale]/loading.tsx` | Loading state |
| `src/app/global-error.tsx` | Root error handler |
| `src/app/globals.css` | Global styles |

## SEO (Required)

| File | Purpose |
|------|---------|
| `src/app/sitemap.ts` | Dynamic sitemap |
| `src/app/robots.ts` | Robots.txt |

## API Routes (Required)

| File | Purpose |
|------|---------|
| `src/app/api/health/route.ts` | Health check endpoint |

## Core Infrastructure

| File | Purpose |
|------|---------|
| `src/middleware.ts` | Locale routing + CSP headers |
| `src/instrumentation.ts` | Server initialization |

## Lib Utilities (Required)

| File | Purpose |
|------|---------|
| `src/lib/env.ts` | Environment validation (Zod) |
| `src/lib/config.ts` | App configuration |
| `src/lib/i18n.ts` | Translation utilities |
| `src/lib/utils.ts` | Common utilities |
| `src/lib/logger.ts` | Pino logger |

## Configuration Files

| File | Purpose |
|------|---------|
| `next.config.ts` | Next.js configuration |
| `tsconfig.json` | TypeScript config |
| `package.json` | Dependencies |
| `vercel.json` | Vercel deployment |

## i18n Messages

| File | Purpose |
|------|---------|
| `messages/en.json` | English translations |
| `messages/id.json` | Indonesian translations |

---

**Total: 22 mandatory files**
