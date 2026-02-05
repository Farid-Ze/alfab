# Governance Manual (2026 Edition)

**Scope**: Engineering, Operations, and Compliance for **PT. Alfa Beauty Cosmetica** (B2B Platform).
**Framework Alignment**: ITIL 4, COBIT 2019, TOGAF, Jamstack.

---

## 1. Strategic Alignment (TOGAF)

We implement frameworks to ensure reliability without over-engineering.

| Category | Framework | Rationale |
| :--- | :--- | :--- |
| **Strategy** | **Scrum** | Iterative B2B feature release cycle. |
| **Architecture** | **Jamstack 2.0** | Decoupled Next.js + Supabase for max uptime. |
| **Operations** | **DevOps** | Automated Quality Gates and Deployments. |
| **Compliance** | **COBIT 2019** | Data Protection (UU PDP) and Access Control. |

---

## 2. Engineering Standards

### Design System (Linting)

We enforce a **B2B Professional** aesthetic via automated scripts (`npm run lint`):

* **Typography**: Use semantic tokens (`.type-h1`, `.type-body`) NOT raw Tailwind (`text-xl`).
* **Colors**: Use tokens (`bg-background`, `text-foreground`) NOT raw hexes.
* **Robots.txt**: Strictly disallow `/api/` crawling to prevent excessive load.

### Quality Gates

Every Pull Request must pass:

1. **Linting**: `npm run lint` (Style & Governance).
2. **Type Check**: `npm run type-check` (Zero `any`).
3. **Unit Tests**: `npm run test:unit`.
4. **License Check**: `npm run license-check` (No GPL allowed).

---

## 3. Security & Risk (COBIT APO12 / DSS05 / OWASP API Top 10)

### Risk Register

| ID | Risk | Mitigation | Owner |
| :--- | :--- | :--- | :--- |
| **R01** | **Key Leak** | `env.ts` validation + CI checks. | DevOps |
| **R02** | **Email Outage** | Fail-Open architecture (DB persist first). | Tech Lead |
| **R03** | **DDoS** | Rate Limiting (5 req/hr/IP) in `submit-lead.ts`. | DevOps |
| **R04** | **Third-Party Dependency** | Dependabot + license-check + vendor assessment. | Tech Lead |
| **R05** | **Availability (Tier Limits)** | Vercel Pro upgrade path + Upstash Redis fallback. | DevOps |
| **R06** | **PDP Violation** | Data Retention Policy (3 Years). | Legal |

### Access Control Matrix

*Principle: Least Privilege.*

| Role | Vercel (Hosting) | Supabase (DB) | GitHub (Code) |
| :--- | :--- | :--- | :--- |
| **CTO** | Admin | Owner | Admin |
| **DevOps** | Member | Admin | Maintainer |
| **Frontend** | Viewer | Developer | Write |

**Emergency**: Root credentials stored in 1Password Executive Vault.

---

## 4. Data Compliance (UU PDP)

### Retention Schedule

* **Lead Data**: Kept for **3 Years** (Sales Cycle).
* **Logs**: Kept for **90 Days** (Incident Analysis).
* **Action**: Anonymize or Delete after expiry.

### Right to Erasure

Upon request (`privacy@alfabeauty.co.id`), verify identity and execute `DELETE` in Supabase within 72 hours.

---

## 5. Change Management (COBIT BAI06 / ITIL 4 Change Enablement)

### Change Log Policy

* **Source**: `CHANGELOG.md` in root.
* **Format**: [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
* **Workflow**: Add entries to `[Unreleased]` during dev. Promote to `[vX.Y.Z]` on release.

### License Compliance

* **Allowed**: MIT, Apache-2.0, BSD, ISC.
* **Forbidden**: GPL, AGPL (Viral).
* **Audit**: Run `license-checker` before every major release.

---

## Related Documents

| Document | Framework | Path |
| :--- | :--- | :--- |
| Definition of Done | Scrum/ITIL 4 | [`../../../docs/governance/definition-of-done.md`](../../../docs/governance/definition-of-done.md) |
| Data Retention Policy | COBIT/GDPR | [`../../../docs/governance/data-retention-policy.md`](../../../docs/governance/data-retention-policy.md) |
| Strategy 2026 | TOGAF | [`../../../docs/strategy-2026.md`](../../../docs/strategy-2026.md) |

---

**Version**: 2.1 | **Last Updated**: 2026-02-04 | **Owner**: CTO
