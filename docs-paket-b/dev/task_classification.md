# TASK CLASSIFICATION (A/B/C)
## PT. Alfa Beauty Cosmetica B2B Digital Hub

**Date:** January 09, 2026  
**Purpose:** Provide a lightweight, auditable mapping of WBS task IDs to classes A/B/C so AI impact can be modeled without rewriting the big task tables.

This file is intended to work with:
- `docs-paket-b/dev/work_breakdown_complete.md` (task IDs + Base Effort + Recalibrated MD)
- `docs-paket-b/dev/ai_workflow_productivity.md` (MD_AI model)
- `docs-paket-b/dev/task_classification_auto.md` (auto-generated first pass; use only as a starting point)

---

## 1) Classes (cost behavior)

- **Class A — Integration / Resilience / Operational truth**
  - External dependencies (ERP, WA/Email), background jobs/schedulers, idempotency, RLS/authz hardening, observability, CI/CD governance.
  - Typical “unknown unknowns”; correctness is proven via integration and failure-mode testing.

- **Class B — Business logic & workflows**
  - Domain rules (credit/invoice/payment/points), state machines, validation & invariants.
  - Correctness is proven via invariant-focused unit tests and domain scenario coverage.

- **Class C — Boilerplate / CRUD / UI composition**
  - UI composition, simple CRUD endpoints, repetitive wiring.
  - Correctness is proven via lint/typecheck, basic unit tests, and smoke/E2E where applicable.

---

## 2) Default classification rules (fast, consistent)

Use these rules to keep classification consistent across people:

1) If it involves **jobs/retries/timeouts/idempotency/observability** → **A**
2) Else if it changes **financial correctness / points / credit / status transitions** → **B**
3) Else if it is mostly **UI/CRUD/wiring** → **C**

If a task spans multiple, choose the **highest risk class** (A > B > C).

---

## 3) Mapping table (fill incrementally)

> Notes:
> - You can fill this gradually; start with the highest-risk tasks (A, then B).
> - One task ID per line.

| Task ID | Class (A/B/C) | Reason (1-liner) |
|---|---|---|
| BE-001 | A | Auth/security-critical (JWT); correctness + abuse resistance |
| BE-002 | A | Auth/session integrity (refresh rotation) |
| BE-007 | A | Session invalidation / blacklist correctness |
| BE-008 | A | Rate limiting is an ops/security control |
| BE-009 | A | RBAC/authz boundary correctness |
| BE-011 | A | RLS/authz correctness hardening (multi-tenant data isolation) |
| BE-012 | A | Session tracking (Shadow/Impersonation) + auditability |
| BE-014 | A | Audit trail integrity (impersonation) |
| BE-015 | A | External notification reliability (WA primary, email fallback, retries) |
| BE-024 | A | Redis cache correctness (TTL/invalidation) affects pricing truth |
| BE-029 | A | 15-min ERP stock sync job (retries/observability) |
| BE-029B | A | Sync status endpoint drives FE banners + incident awareness |
| BE-030 | A | Weekly reconciliation job (diff logic + reporting) |
| BE-040 | A | ERP degraded mode / timeout behavior (operational truth) |
| BE-041 | A | Fallback cache semantics (last-known-good, TTL strategy) |
| BE-046 | A | Critical write path + degraded-mode semantics (PENDING_SYNC) |
| BE-087 | A | SLA check job (time math + idempotency + observability) |
| BE-088 | A | Time-based reminder logic (dedupe/idempotency) |
| BE-089 | A | Time-based escalation logic (dedupe/idempotency) |
| BE-091 | A | Fallback routing behavior affects operational continuity |
| BE-094 | A | Config caching affects runtime behavior system-wide |
| BE-097 | A | Audit log persistence + queryability |
| BE-098 | A | Auto-audit instrumentation across handlers |
| BE-099 | A | Audit access endpoint touches sensitive data |
| BE-031 | B | Credit correctness (financial rule enforcement) |
| BE-035 | B | Credit exposure correctness (coupled to invoices) |
| BE-059 | B | Invoice generation correctness (coupled to order states) |
| BE-064 | B | Payments workflow correctness |
| BE-065 | B | Partial payment state transitions + rounding |
| BE-067 | B | Points credited only on invoice PAID |
| BE-073 | B | Points earn logic coupled to PAID invariant |

---

## 4) Optional: compute net AI savings by class

Once you have enough history (2–4 weeks), compute actual vs expected per class:

$$
\hat{r}_c = \frac{\sum \text{actualMD for class }c}{\sum \text{MD\_noAI}(t) \text{ for class }c}
$$

- If $\hat{r}_c < 1$, you are getting net savings.
- If $\hat{r}_c > 1$, AI is adding net overhead (tighten gates / reduce AI scope for that class).
