# Incident Post-Mortem (RCA)

**Date**: [YYYY-MM-DD]
**Incident ID**: [INC-00X]
**Authors**: [Name]
**Status**: [Draft/Review/Published]

## 1. Executive Summary

*Briefly describe what happened, the impact, and the root cause. (TL;DR for management)*

- **Impact**: [e.g., Lead Submission API down for 45 mins]
- **Root Cause**: [e.g., Expired Supabase Service Key]

## 2. Impact Analysis

- **Duration**: [HH:MM] to [HH:MM] (Total: X mins)
- **Affected Services**: [List Services]
- **User Impact**: [e.g., 5 users failed to submit leads]
- **SLA Breach**: [Yes/No]

## 3. Timeline

| Time (UTC) | Event | Owner |
| :--- | :--- | :--- |
| 10:00 | Alert fired in Slack `#alerts-critical` | Bot |
| 10:05 | Engineer acknowledged alert | User A |
| 10:15 | Rollback initiated | User A |
| 10:17 | Service recovered | User A |

## 4. Root Cause Analysis (5 Whys)

1. **Why did the API fail?** -> 500 Error from Supabase.
2. **Why 500 Error?** -> Authentication failed.
3. **Why Auth failed?** -> Service Key was invalid.
4. **Why invalid?** -> Key rotated but Env Var not updated in Vercel.
5. **Why not updated?** -> Manual process failed; no automated sync.

## 5. Corrective Actions (Preventative)

| Action Item | Owner | Priority | Ticket |
| :--- | :--- | :--- | :--- |
| [Immediate] Rotate Key in Vercel | DevOps | P0 | TKT-123 |
| [Prevent] Automate Env Sync via CLI | DevOps | P2 | TKT-124 |
| [Detect] Add "Key Expiry" alert | Sec | P3 | TKT-125 |

## 6. Lessons Learned

- *What went well?*
- *What went wrong?*
- *Where did we get lucky?*
