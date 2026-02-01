# Alfa Beauty Cosmetica - B2B Platform (Enterprise Edition)

**Status**: 🟢 **Platinum / Golden Build** (Ready for Production)
**Version**: 1.0.0

This is the **Next.js Hybrid** frontend for Alfa Beauty Cosmetica, engineered to **Enterprise Framework Standards** (ITIL 4, COBIT 2019, TOGAF, ISO 22301).

---

## 📚 Service Catalogue (Documentation)

The following documents govern the operation and maintenance of this platform:

| Category | Document | Framework / Standard |
| :--- | :--- | :--- |
| **Operations** | **[Runbooks](./docs/operations/runbooks)** | ITIL v4 (Service Operation) |
| **Continuity** | **[Disaster Recovery](./docs/operations/drp.md)** | ISO 22301 (Business Continuity) |
| **Observability**| **[Monitoring Guide](./docs/operations/monitoring.md)** | ITIL v4 (Event Management) |
| **Governance** | **[Code Standards](./docs/governance/governance.md)** | COBIT 2019 (DSS06) |
| **Quality** | **[Testing Strategy](./docs/development/testing.md)** | ISO 29119 |
| **Community** | **[Contributing](./docs/development/component-guide.md)** | Scrum / Trunk-Based Dev |

---

## 🏗 Architecture (TOGAF)

### Technology Stack

- **Framework**: Next.js 15 (App Router, Hybrid Rendering).
- **Styling**: Tailwind CSS v4 + "Zinc" Design Tokens (`globals.css`).
- **Backend**: Supabase (PostgreSQL 15, Auth, Row Level Security).
- **Edge**: Vercel Edge Runtime (Middleware, Headers).

### Resilience Patterns

1. **Fail-Open Lead Capture**: If Database fails, leads are routed via SMTP (Email Fallback).
2. **Rate Limiting**: Distributed (Upstash Redis) or In-Memory Token Bucket prevents DDoS/Spam.
3. **Crash Safety**: `global-error.tsx` catches React hydration failures with Error Correlation IDs.

### Security (OWASP / ISO 27001)

| Endpoint | Auth | Description |
| :--- | :--- | :--- |
| `GET /api/health` | None | Minimal 200 OK (no infra details) |
| `GET /api/health?deep=true` | `Bearer $HEALTH_CHECK_TOKEN` | Full DB/service status |
| `GET /api/leads/export` | `Bearer $LEAD_API_ADMIN_TOKEN` | Admin CSV export |

**Token Requirements**:

- `LEAD_API_ADMIN_TOKEN`: Min 32 chars, rotate monthly
- `HEALTH_CHECK_TOKEN`: Min 16 chars, for ops monitoring

**Distributed Rate Limiting** (Optional):
Set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` for multi-instance deployments.

---

## ⚖️ Legal & Compliance (UU PDP)

This platform adheres to **Indonesian Law** and International Privacy Standards:

- **Privacy Policy**: Compliant with **UU No. 27 Tahun 2022 (PDP)**. Bilingual (ID/EN).
- **Terms of Service**: Explicit B2B clauses ("No Public Pricing", "Professional Use Only").
- **Consent**: GDPR-compliant Cookie Banner with `localStorage` preference saving.
- **Reporting**: `security.txt` (RFC 9116) available at `/.well-known/security.txt`.

---

## 🚀 Operations

### Quick Start

```bash
# 1. Install
npm ci

# 2. Environment
cp .env.example .env.local

# 3. Dev
npm run dev
```

### Environment Configuration

| Variable | Description | Required | Source |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL (e.g. <https://alfabeauty.co.id>) | Yes | Vercel |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase API URL | Yes | Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public Client Key | Yes | Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Admin Key (Server Actions only) | No (Admin) | Supabase |
| `SMTP_HOST` | Mail Server for Lead Fallback | No | Mailtrap |

### Key Scripts

| Command | Description | Phase |
| :--- | :--- | :--- |
| `npm run analyze` | Visualize JS bundle topology | Phase 11 (DevX) |
| `npm run test:all`| Run Lint, Types, Unit, and E2E tests | Phase 8 (CI/CD) |
| `npm run lint` | Run **Unified Governance** (8+ Architecture Checks) | Phase 2 (Structure) |
| `node scripts/governance.mjs` | Manual Trigger for Governance Suite | Phase 2 (Modularity) |

### Automation

- **Dependabot**: Checks for `npm` and `github-actions` updates daily (`.github/dependabot.yml`).
- **CI/CD**: GitHub Actions pipeline for Quality, Security, and E2E Testing.

---

**Copyright © 2026 PT. Alfa Beauty Cosmetica. All Rights Reserved.**
