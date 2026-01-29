# Operations Manual (ITIL 4)

**Status**: Active
**Scope**: Runbooks, Disaster Recovery, and Maintenance for Alfa Beauty B2B.

---

## 1. Core Operating Procedures

| Document | Purpose |
| :--- | :--- |
| **[Disaster Recovery Plan (DRP)](drp.md)** | Strategies for handling outages (RTO/RPO). |
| **[Service Catalogue](service-catalogue.md)** | List of all technical services and their SLAs. |
| **[Monitoring Guide](monitoring.md)** | Sentry, Vercel, and Alerting setup. |
| **[Email Deliverability](email-deliverability.md)** | SPF/DKIM and Fallback mechanisms. |

---

## 2. Standard Operating Procedures (Runbooks)

Detailed step-by-step guides for specific tasks:

- **[Incident Response](runbooks/incident-response.md)**: How to handle P1/P2 incidents.
- **[Restore Procedure](runbooks/restore-procedure.md)**: Rollback and DB Restore.
- **[Data Deletion](runbooks/data-deletion.md)**: Handling GDPR/privacy requests.
- **[Key Rotation](runbooks/key-rotation.md)**: Security maintenance.
- **[Sentry Setup](runbooks/sentry-slack-setup.md)**: Configuring observability.

---

## 3. Known Errors Database (KEDB)

**Framework**: ITIL 4 Problem Management

| Error ID | Symptom | Workaround | Root Cause | Status |
| :--- | :--- | :--- | :--- | :--- |
| **KE-001** | `429 Too Many Requests` on Leads API | Wait 1 minute | Rate Limiting (Map-based) reset time. | **Monitoring** |
| **KE-002** | "Offline" Banner flashes on navigate | Ignore | Service Worker re-validation latency. | **Backlog** |
| **KE-003** | `BLD-04` Font Timeout | Manual refresh | Google Fonts generic timeout during build. | **Wontfix** |

---

## 4. Reports & Templates

- **[Post-Mortem Template](templates/post-mortem.md)**: For incident reviews.
- **[Reports Archive](reports/)**: Historical test reports.
