# RECALIBRATED WORK BREAKDOWN (RISK-BASED)
## PT. Alfa Beauty Cosmetica B2B Digital Hub

**Date:** January 09, 2026  
**Based on:** Blueprint V3.4, FSD-IDD V2.6, DevOps V2.4, Governance V1.0, SLI/SLO V1.0, UAT V2.0, WBS V2.5, `docs-paket-b/dev/work_breakdown_complete.md` (**292 tasks**, Base Effort **103.50**, Engineering recalibrated **196.75 MD**, Likely total **252.25 MD**)


## 0) Executive conclusion

**Recalibration is required.** Earlier drafts referenced **161.5 MD / 297 tasks**. After validating against the actual task tables in `docs-paket-b/dev/work_breakdown_complete.md`, the correct inventory is **292 tasks** with Base Effort sum **103.50**. Treating that Base Effort as “real MD” would be **mathematically fragile** for this scope; it must be calibrated to execution reality (UAT + Governance + SLI/SLO + ERP degraded mode).  

With **low AI workflow maturity** (prompting discipline, code review rigor, test automation), AI tools do **not** reduce the dominant costs (integration truth-finding, debugging, stabilization, CI/CD, observability). The realistic plan must price **integration & stabilization** explicitly.

**Result (recommended “Likely” total): 252.25 MD** (as documented in `work_breakdown_complete.md`).  
This is presented as a range below.


## 1) Assumptions used in recalibration

### 1.1 Man-day definition

### 1.2 Definition of Done (DoD) implied by your docs
This recalibration assumes DoD aligned to the documents:

### 1.3 AI maturity factor
Per your statement: *team not mature with AI workflow, AI often produces placeholder/skeleton/MVP-looking artifacts.*

Therefore, AI is modeled as **small savings only** on boilerplate, and **near-zero savings** on integration/stabilization.


## 2) Why the original 161.5 MD is mathematically fragile

Two math signals here:

1) Earlier drafts referenced: **161.5 MD** across **297 tasks** → average:

\[
\frac{161.5}{297} \approx 0.543\,MD \approx 4.35\,hours/task
\]

2) The actual tables in `work_breakdown_complete.md` sum to Base Effort **103.50** across **292 tasks**. If someone mistakenly interprets Base Effort as MD, that implies:

\[
\frac{103.5}{292} \approx 0.354\,MD \approx 2.83\,hours/task
\]

For this system (integration-heavy + governance-heavy), a large portion of tasks are not “4-hour tasks” once you include:

Also note a planning alignment risk: if any task list items drift from the agreed architecture assumptions, rework will rise. This recalibration prices that risk explicitly via stabilization buffer rather than pretending it is “free”.


## 3) Recalibration method (simple, defensible)

### 3.1 Classify work into 3 cost-behavior buckets
  AI savings: **0–5%**.
  AI savings: **5–15%**.
  AI savings: **10–25%**.

### 3.2 Add explicit stabilization tax
Because UAT and SLOs are explicit, stabilization cannot be hidden. We add:
  (excludes PM/Arch where the buffer is typically handled as scheduling flexibility).

### 3.3 Apply targeted corrections rather than rewriting all 297 tasks
We correct the tasks that are mathematically inconsistent with the `docs-paket-b/` obligations (A/B heavy tasks currently priced like C tasks).


## 4) Recalibrated totals (3 scenarios)

### 4.1 Baseline (validated tables)
This is what is verifiably in `docs-paket-b/dev/work_breakdown_complete.md`:

| Group | Base Effort (sum in file) | Recalibrated MD (= Base × ECF) |
|---|---:|---:|
| Backend (BE) | 34.25 | 65.10 |
| Frontend (FE) | 33.00 | 62.72 |
| DevOps (DO) | 16.50 | 31.36 |
| QA | 19.75 | 37.54 |
| **Engineering Subtotal** | **103.50** | **196.75** |

Non-itemized (required for “selesai” scope):

| Non-itemized / Program Work | MD |
|---|---:|
| PM/Architect (WBS V2.5) | 20.00 |
| Partner Profiling program work (WBS V2.5) | 6.00 |
| Integration & Stabilization Buffer (15% × Engineering Subtotal) | 29.50 |
| **TOTAL (Likely)** | **252.25 MD** |

### 4.3 Range


## 5) Targeted task-level corrections (high-impact deltas)

This section lists **the most underpriced tasks** in `work_breakdown_complete.md` when measured against Blueprint/FSD/UAT/DevOps/Governance.

> Legend: **Δ** = (Recommended − Original)

### 5.1 Backend — Identity, authz, audit, impersonation (Blueprint §5, FSD §2/4.2, Governance)
| ID | Task | Original | Recommended | Δ | Why |
|---|---|---:|---:|---:|---|
| BE-009 | RBAC middleware | 0.50 | 1.50 | +1.00 | Multi-role + impersonation + admin-only zones needs hardening & tests |
| BE-010 | Permission checks | 0.25 | 0.75 | +0.50 | Fine-grained permissions usually spread across handlers |
| BE-011 | Row-Level Security | 0.50 | 2.00 | +1.50 | RLS policies + query debugging + migration iteration |
| BE-012 | AGENT_SESSIONS table | 0.50 | 1.00 | +0.50 | Session lifecycle + retention + audit tie-in |
| BE-014 | Impersonation audit log | 0.50 | 1.00 | +0.50 | Required format + coverage across actions |
| BE-015 | Checkout notification WA+Email | 0.75 | 1.50 | +0.75 | Reliability, retry semantics, auditability |

### 5.2 Backend — Inventory, Degraded Mode, weekly reconciliation (Blueprint §3.C)
| ID | Task | Original | Recommended | Δ | Why |
|---|---|---:|---:|---:|---|
| BE-019 | Product search FTS | 0.50 | 2.00 | +1.50 | Indexing, ranking, edge cases, performance |
| BE-020 | Image upload handler | 0.25 | 1.00 | +0.75 | Storage choice, validation, security, CDN paths |
| BE-024 | Redis tier price cache | 0.50 | 1.00 | +0.50 | Warming strategy + invalidation + TTL correctness |
| BE-027 | Safety Buffer algo | 0.50 | 2.00 | +1.50 | Fast/slow classification requires historical data source decisions |
| BE-029 | ERP stock sync job | 0.50 | 2.50 | +2.00 | Scheduling, retries, backoff, partial failures, observability |
| BE-029B | Stock sync status API | 0.25 | 1.00 | +0.75 | Must support FE banner, delay calculation, error states |
| BE-030 | Weekly reconciliation job | 0.75 | 2.00 | +1.25 | Diff logic + thresholding + notification + reporting |

### 5.3 Backend — Credit (Blueprint §2, FSD §4.1, Governance “ERP Heartattack”)
| ID | Task | Original | Recommended | Δ | Why |
|---|---|---:|---:|---:|---|
| BE-031 | /api/credit/status | 0.50 | 1.50 | +1.00 | Timeout→AMBER behavior + fallback + correctness |
| BE-035 | Credit exposure track | 0.50 | 1.25 | +0.75 | Outstanding invoices coupling + reconciliation |
| BE-040 | ERP timeout handling | 0.50 | 2.00 | +1.50 | Degraded mode rules + safety defaults |
| BE-041 | Redis fallback cache | 0.50 | 1.50 | +1.00 | Last-known-good snapshot + TTL strategy |
| BE-042 | Bypass mode AMBER | 0.50 | 1.00 | +0.50 | Must interlock with PENDING_SYNC and audit |

### 5.4 Backend — Orders + Invoice + Points coupling (Blueprint §4.B, UAT-30..33, UAT-41..42)
| ID | Task | Original | Recommended | Δ | Why |
|---|---|---:|---:|---:|---|
| BE-046 | POST /api/orders + PENDING_SYNC | 0.50 | 1.50 | +1.00 | Critical write-path + degraded mode semantics |
| BE-049 | Order state machine | 0.50 | 2.00 | +1.50 | State transitions + invariants + audit |
| BE-051 | Stock validation | 0.50 | 1.50 | +1.00 | Uses Display_Stock; edge cases and race conditions |
| BE-059 | Auto invoice on APPROVED | 0.50 | 1.50 | +1.00 | Coupling with order transitions + due_date rules |
| BE-064 | POST payments | 0.50 | 1.50 | +1.00 | Admin-only + validation + partial payments |
| BE-065 | Partial payment logic | 0.25 | 1.00 | +0.75 | Non-trivial state transitions and rounding |
| BE-067 | Point credit on PAID | 0.50 | 1.00 | +0.50 | Must match UAT-42 precisely |
| BE-073 | EARNED on invoice PAID | 0.50 | 1.50 | +1.00 | Ledger correctness + idempotency |

### 5.5 Backend — Routing & SLA (Blueprint §3.A/B, UAT-20..25)
| ID | Task | Original | Recommended | Δ | Why |
|---|---|---:|---:|---:|---|
| BE-082 | Region→SubDist lookup | 0.50 | 1.00 | +0.50 | Fallback rules and data correctness |
| BE-084 | WA deep link gen | 0.50 | 1.00 | +0.50 | Encoding, templates, credit warning, correctness |
| BE-087 | SLA check job (15min) | 0.50 | 1.50 | +1.00 | Job reliability, dedupe, time math, observability |
| BE-088 | 18h reminder logic | 0.25 | 1.00 | +0.75 | Scheduling edge cases, idempotency |
| BE-089 | 24h escalation logic | 0.25 | 1.00 | +0.75 | Same + escalation audit logging |

### 5.6 DevOps — Governance Gauntlet & Observability (DevOps V2.4, SLI/SLO)
The DevOps tasks are systematically underpriced (0.25–0.5 MD) relative to the responsibilities described.

Recommended **DevOps total: 32 MD** includes:

### 5.7 QA — UAT acceptance reality (UAT V2.0)
UAT is not “a checkmark”; it is an acceptance contract. The original QA 21 MD assumes near-zero re-test cycles.

Recommended **QA total: 34 MD** accounts for:


## 6) Timeline impact (calendar weeks)

Your SoW/WBS targets **16 weeks**. With a realistic **~255 MD** total, calendar duration depends on effective team size.

Approximation using **~20 MD/month per full-time person**:

Examples:

If you must keep 16 weeks, then one (or more) must be true:


## 7) “Upaya tepat lainnya” (recommended immediate actions)

### 7.1 Fix planning/stack mismatches

### 7.2 Make buffers explicit (stop hiding them)

### 7.3 Introduce a Minimum Delivery Contract (MDC)
Define what “Go-Live” means in two levels:

### 7.4 Establish DoD checklist per PR
Even without heavy AI workflow, a simple PR DoD reduces rework:


## 8) Recommendation

Use this recalibrated plan (**~255 MD**) as the budgetary truth for schedule/contract planning, while preserving the original breakdown as a *feature inventory*.

Next best step: create a **re-scoped 16-week plan** by selecting which UAT scenarios are mandatory for Go-Live vs post-launch.
