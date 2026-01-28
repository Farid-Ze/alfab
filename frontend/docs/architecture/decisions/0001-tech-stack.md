# 1. Use Next.js App Router, Supabase, and Tailwind CSS

Date: 2026-01-28
Status: Accepted

## Context

Alfa Beauty requires a high-performance, SEO-optimized B2B e-commerce platform.
The system must support:

- Server-side rendering for SEO (Leads/Products).
- Dynamic personalization for B2B pricing (Future).
- Rapid UI iteration (`design-system.md`).
- Secure data handling (Leads).

## Decision

We will use the **Next.js 16 App Router** framework with **React Server Components (RSC)**.
Data persistence will be handled by **Supabase (PostgreSQL)**.
Styling will use **Tailwind CSS v4** with CSS Variables.

## Consequences

### Positive

- **Performance**: RSC allows zero-bundle-size data fetching on the server.
- **Security**: Database logic (`submit-lead.ts`) stays on the server, never exposed to the client.
- **Maintainability**: Tailwind colocation reduces "dead CSS" (verified by `lint:hero-freeze`).
- **Scalability**: Supabase handles Auth/DB scaling without managing infrastructure.

### Negative

- **Complexity**: RSC requires strict separation of "Client" vs "Server" components (addressed by Task 57 Audit).
- **Lock-in**: High coupling to Vercel/Next.js primitives (Image, Fonts, Headers).

## Compliance

- **TOGAF**: Aligns with "Buy vs Build" (Supabase) and "Standardization" (React).
- **ITIL**: Changes to this stack require "Major Change" approval.
