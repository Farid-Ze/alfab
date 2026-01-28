# Service Level Management & Monitoring Policy

**Framework**: ITIL 4 (Service Level Management) + Google SRE (SLO/SLI)
**Status**: DRAFT
**Owner**: DevOps Lead

---

## 1. Service Level Agreements (SLAs)

These serve as the external commitment to stakeholders.

| Metric | Target | Definition | Measured By |
| :--- | :--- | :--- | :--- |
| **Availability** | **99.9%** | Uptime of the `www` and `api` subdomains. (< 43m downtime/month) | UptimeRobot (Task 5) |
| **API Latency** | **< 500ms** | P95 Response time for `/api/*` endpoints. | Vercel Analytics |
| **Core Web Vitals** | **Pass** | LCP < 2.5s, CLS < 0.1, INP < 200ms. | Pagespeed Insights |

---

## 2. Service Level Objectives (SLOs)

These are stricter internal targets to trigger alerts BEFORE we breach SLA.

| Metric | SLO Target | Alert Threshold | Action |
| :--- | :--- | :--- | :--- |
| **API Error Rate** | < 0.1% | > 1% over 5m | Sentry Alert (Sev 2) |
| **API Latency** | < 200ms | > 400ms (P95) | Vercel Warning |
| **Lead Submission** | 100% | Any Failure | Sentry Alert (Sev 1) |

---

## 3. Monitoring Strategy

### A. Synthetic Monitoring (Outside-In)

- **Tool**: UptimeRobot
- **Interval**: 5 minutes
- **Target**: `/api/health`
- **Expectation**: Status 200, JSON `{ status: 'ok' }`

### B. Real User Monitoring (RUM) (Inside-Out)

- **Tool**: Vercel Analytics / Speed Insights
- **Scope**: All Production Deployments
- **Key Metric**: Interaction to Next Paint (INP)

### C. Application Performance Monitoring (APM)

- **Tool**: Sentry
- **Scope**: Uncaught Exceptions, UI Crashes
- **Integration**:
  - `global-error.tsx`: Catch Root Layout crashes.
  - `error.tsx`: Catch Route Shell crashes.
  - `ErrorBoundary.tsx`: Catch Component crashes.

---

## 4. Incident Response Plan

### Severity Levels

- **Sev 1 (Critical)**: Site Down, or Lead Form Broken. (Wake up call).
- **Sev 2 (High)**: Performance degradation, Non-critical API fail. (Fix within 4h).
- **Sev 3 (Low)**: Aesthetic bugs, Typo. (Next Sprint).

### Response Workflow (ITIL)

1. **Detect**: Alert fires (Slack/Email).
2. **Categorize**: Assign Severity.
3. **Investigate**: Check Sentry Logs / Vercel Logs.
4. **Resolve**: Hotfix or Rollback (`git revert`).
5. **Review**: Post-Mortem (Why did it happen?).
