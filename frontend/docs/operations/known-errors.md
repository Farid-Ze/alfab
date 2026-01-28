# Known Errors Database (KEDB)

**Framework**: ITIL 4 Problem Management
**Status**: Live

| Error ID | Symptom | Workaround | Root Cause | Perm Fix Status |
| :--- | :--- | :--- | :--- | :--- |
| **KE-001** | `429 Too Many Requests` on Leads API | Wait 1 minute | Rate Limiting (Map-based) reset time. | **Monitoring** |
| **KE-002** | "Offline" Banner flashes on navigate | Ignore | Service Worker re-validation latency. | **Backlog** |
| **KE-003** | `BLD-04` Font Timeout | Manual refresh | Google Fonts generic timeout during build. | **Wontfix** |
