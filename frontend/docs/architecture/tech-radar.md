# Technology Radar

**Framework**: TOGAF (Technology Architecture)
**Last Updated**: 2026-01-29

This radar tracks the lifecycle of technologies used in the **Alfa Beauty B2B Platform**.

## Rings Definition

1. **ADOPT**: Proven, stable, and recommended for production use.
2. **TRIAL**: Worth using on a trial basis to decide whether to keep it.
3. **ASSESS**: Worth exploring with the goal of understanding how it will affect you.
4. **HOLD**: Proceed with caution.

## 1. Techniques & Architecture

| Quadrant | Ring | Blip | Description |
| :--- | :--- | :--- | :--- |
| **Techniques** | **ADOPT** | **Jamstack 2.0** | Decoupled frontend/backend with heavy edge caching. |
| **Techniques** | **ADOPT** | **Server Actions** | For all mutations (no API routes unless external). |
| **Techniques** | **TRIAL** | **React Server Components** | Used for data fetching, but patterns still evolving. |
| **Techniques** | **HOLD** | **Client-Side Fetching** | Avoid `useEffect` for data. Use RSC. |

## 2. Tools & Frameworks

| Quadrant | Ring | Blip | Description |
| :--- | :--- | :--- | :--- |
| **Platform** | **ADOPT** | **Next.js 16** | Core Application Framework. |
| **Platform** | **ADOPT** | **Supabase** | Backend-as-a-Service (PostgreSQL). |
| **Platform** | **ADOPT** | **Vercel** | Hosting & CI/CD. |
| **Languages**| **ADOPT** | **TypeScript 5** | Strict mode enabled. |

## 3. Tools (DevOps)

| Quadrant | Ring | Blip | Description |
| :--- | :--- | :--- | :--- |
| **Tools** | **ADOPT** | **Vitest** | Unit Testing (Replacing Jest). |
| **Tools** | **ADOPT** | **Playwright** | E2E Testing. |
| **Tools** | **ADOPT** | **GitHub Actions** | CI Pipelines. |
| **Tools** | **ASSESS**| **Changesets** | For automated versioning (Phase 2). |

## 4. UI & Design

| Quadrant | Ring | Blip | Description |
| :--- | :--- | :--- | :--- |
| **UI** | **ADOPT** | **Tailwind CSS 4** | Utility-first styling. |
| **UI** | **ADOPT** | **Radix UI** | Headless primitives. |
| **UI** | **TRIAL** | **Framer Motion** | Animation (Use sparingly). |
| **UI** | **HOLD** | **CSS Modules** | Use Tailwind for consistency. |
