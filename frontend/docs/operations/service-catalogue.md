# Service Catalogue

**Owner**: IT Operations
**Last Updated**: 2026-01-28
**Framework**: ITIL 4 (Service Request Management)

## 1. Core Services (Internal)

| Service Name | Endpoint | Criticality | Owner | SLA | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Lead Submission** | `/api/leads` | **High** | Sales | 99.9% | Handles B2B partner applications from the frontend form. |
| **Health Check** | `/api/health` | **Critical** | DevOps | 99.99% | Deep diagnostic heartbeat for UptimeRobot and K8s liveness probes. |
| **Product API** | `/api/products` | Medium | Product | 99.0% | JSON-based product catalog distribution. |
| **Admin Export** | `/api/leads/export` | Medium | Sales | 99.0% | CSV export of lead data for CRM import. |
| **Telemetry (Events)** | `/api/events` | Low | Analytics | 95.0% | Custom event tracking for business logic (e.g., Click-Throughs). |
| **RUM** | `/api/rum` | Low | DevOps | 95.0% | Real User Monitoring vitals collection (Manual). |

## 2. External Dependencies (Third-Party)

| Service | Category | Usage | Failure Impact | Fallback |
| :--- | :--- | :--- | :--- | :--- |
| **Supabase** | Database | Main DB (Leads) | **Critical** (No leads) | Email Fallback |
| **Vercel** | Hosting | Edge Network, ISR | **Critical** (Site Down) | None (Static Maintenance Page) |
| **Google Analytics** | Analytics | `G-XXXXXXXX` | Low (Loss of data) | None |
| **Sentry** | Observability | Error Tracking | Low (Blindness) | Local Logs |
| **Google Fonts** | Assets | Typography | Low (System fonts) | `sans-serif` system stack |

## 3. Support & Incident Response

| Priority | Response Time | Contact |
| :--- | :--- | :--- |
| **Sev1 (Critical)** | 15 mins | DevOps Pager + CTO |
| **Sev2 (High)** | 1 hour | DevOps Lead |
| **Sev3 (Normal)** | 4 hours | Support Ticket |
| **Sev4 (Low)** | 24 hours | Backlog |
