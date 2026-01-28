# Governance & Standards

This document outlines the engineering standards for the **Paket A B2B Platform**. We enforce these rules to maintain a professional, consistent, and maintainable codebase.

## 1. Design System Governance

We adhere to a strict **B2B Professional** aesthetic. This is enforced via automated linting scripts.

### Typography (`lint:typography`)

* **Rule**: No raw Tailwind text classes (e.g., `text-lg`, `font-bold`, `tracking-wide`) are allowed in source code.
* **Solution**: You MUST use semantic tokens defined in `globals.css`.
  * **Headings**: `.type-hero`, `.type-h1`, `.type-h2`, `.type-h3`
  * **Body**: `.type-body`, `.type-body-compact`
  * **UI**: `.type-ui`, `.type-ui-sm`
  * **Special**: `.type-kicker`, `.type-data`, `.type-legal`
* **Rationale**: Ensures consistent hierarchy and readability across the platform.

### Colors & Tokens (`lint:tokens`)

* **Rule**: No hardcoded hex values or arbitrary Tailwind colors (e.g., `bg-zinc-900`) outside of `globals.css`.
* **Solution**: Use semantic variables.
  * `bg-background`, `bg-panel`, `bg-foreground`
  * `text-foreground`, `text-muted`
  * `border-border`, `border-strong`
* **Rationale**: Enables easy theming (Dark Mode) and maintains the "Zinc/Neutral" B2B palette.

## 2. Code Quality Gates

Every Pull Request (and build) must pass the following checks:

| Gate | Command | Description |
| :--- | :--- | :--- |
| **Linting** | `npm run lint` | Runs ESLint and all custom governance scripts (typography, tokens, etc.). |
| **Type Check** | `npm run type-check` | Validates TypeScript types (no `any` leaks). |
| **Unit Tests** | `npm run test:unit` | Runs Vitest for logic (hooks, utils). |
| **E2E Smoke** | `npm run test:e2e` | Runs Playwright smoke tests (critical flows). |

## 3. Incident Management (ITIL 4)

* **Sentry**: All runtime errors are captured in Sentry.
* **Logging**: Use `logger.error()` instead of `console.error()` to ensure structured logging.

## 4. COBIT 2019 Access Control Audit Checklist

**Process**: DSS05.04 (Manage User Identity and Logical Access)
**Frequency**: Quarterly (Each Trimester / Q)

### A. Supabase (Database & Auth)

* [ ] **Project Owner Verification**
  * [ ] Confirm only the current CTO/Lead has "Owner" role.
  * [ ] Review all accounts with "Administrator" role.
* [ ] **Table Policies (RLS)**
  * [ ] Verify `leads` table has RLS enabled.
  * [ ] Confirm `anon` role (public) can only `INSERT` and NEVER `SELECT` or `DELETE`.
  * [ ] Confirm `service_role` (admin) is only used in Server Actions (`src/actions`).
* [ ] **API Keys**
  * [ ] Verify `NEXT_PUBLIC_SUPABASE_ANON_KEY` is restricted (if Row Level Security is configured).
  * [ ] Rotate `SUPABASE_SERVICE_ROLE_KEY` if a developer leaves the team.

### B. Vercel (Deployment & Environment)

* [ ] **Team Members**
  * [ ] Remove access for inactive developers/contractors.
    * [ ] Ensure "Production" deployment permissions are restricted to Senior Devs.
* [ ] **Environment Variables**
  * [ ] Audit `Production` Environment Variables.
  * [ ] Ensure no Secrets (Service Keys, SMTP Passwords) are exposed in `Development` or `Preview` environments unless necessary.
* [ ] **Logs**
  * [ ] Check "Runtime Logs" for any unusual access patterns or massive 403 errors (Brute force attempts).

### C. GitHub (Source Code)

* [ ] **Collaborators**
  * [ ] Audit "Collaborators" list in Repository Settings.
  * [ ] Ensure "Main" branch protection rules are active (Require PR, Require CI Pass).
* [ ] **Secrets**
  * [ ] Review `Actions Secrets` (Ensure keys are current and valid).

### D. Color Token Governance (Design System)

We enforce semantic tokens over primitives.

| Token | Scoped Use Case | Do NOT Use |
| :--- | :--- | :--- |
| `bg-background` | Page background (white/zinc-950) | `bg-white`, `bg-black` |
| `bg-panel` | Cards, Modals, Dropdowns | `bg-zinc-50` |
| `bg-subtle` | Secondary sections, Hover states | `bg-gray-100` |
| `text-foreground`| Primary text | `text-black` |
| `text-muted` | Secondary text, meta data | `text-gray-500` |
| `border-border` | Default hairline borders | `border-gray-200` |
| `ui-btn-primary`| Main Call to Action | `bg-blue-600` |
