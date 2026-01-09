# AI-ADJUSTED PLAN (MD TOTALS)
## PT. Alfa Beauty Cosmetica B2B Digital Hub

**Date:** January 09, 2026  
**Purpose:** Convert the WBS baseline into an AI-adjusted delivery plan **without** assuming the team is already mature with AI workflow.

**Inputs (source of truth):**
- Baseline WBS: `docs-paket-b/dev/work_breakdown_complete.md` (Base Effort 103.50; **ECF=1.9010**; Engineering **196.75 MD**; Likely total **252.25 MD**)
- Classification:
  - Reviewed overrides: `docs-paket-b/dev/task_classification.md`
  - Auto first-pass (starting point): `docs-paket-b/dev/task_classification_auto.md`
- AI workflow / gates: `docs-paket-b/dev/ai_workflow_productivity.md`

---

## 1) What we are (and are not) assuming

We explicitly assume the current state:
- **Team not mature with AI workflow**.
- AI tends to produce **placeholder/skeleton/MVP-looking artifacts** unless constrained.

Therefore:
- We **do not** treat AI as a blanket multiplier that reduces MD globally.
- We model AI effect by **task class** (A/B/C) and we keep stabilization buffer conservative until metrics justify reduction.

---

## 2) Baseline: engineering split by task class

Using `work_breakdown_complete.md` Effort × ECF and the current reviewed overrides in `task_classification.md`, we get:

| Class | Meaning | Base Effort | Engineering MD (no-AI) |
|---|---|---:|---:|
| A | Integration / resilience / operational truth | 31.50 | 59.88 |
| B | Business logic & workflows | 34.25 | 65.11 |
| C | Boilerplate / CRUD / UI composition | 37.75 | 71.76 |
| **Total** |  | **103.50** | **196.75** |

Non-itemized program work (fixed):
- PM/Architect: **20 MD**
- Partner profiling: **6 MD**
- Program subtotal: **26 MD**

---

## 3) AI-adjusted scenarios (planning totals)

Notation:
- $MD_{AI} = \sum_c MD_{noAI,c} \times m_c$ where $m_c$ is the class multiplier.
- Total = Engineering + Buffer + Program.

### 3.1 Scenario S1 — Low maturity (m≈0.25) — conservative
**Interpretation:** AI helps some on Class C, neutral on B, and adds overhead on A.

Multipliers:
- A: **1.05** (net slower)
- B: **1.00** (neutral)
- C: **0.92** (modest savings)

Results:
- Engineering: **194.01 MD**
- Total with **15%** buffer: **249.11 MD**

**Recommendation:** keep buffer **15%** until reopen/flake/escape rates prove otherwise.

### 3.2 Scenario S2 — Medium maturity (m≈0.60) — credible target
Multipliers:
- A: **0.95**
- B: **0.90**
- C: **0.80**

Results:
- Engineering: **172.90 MD**
- Total with **15%** buffer: **224.83 MD**
- Total with **12%** buffer (only if metrics improve): **219.64 MD**

### 3.3 Scenario S3 — High maturity (m≈0.85) — aspirational
Multipliers:
- A: **0.90**
- B: **0.80**
- C: **0.65**

Results:
- Engineering: **152.63 MD**
- Total with **15%** buffer: **201.52 MD**
- Total with **12%** buffer: **196.94 MD**

---

## 4) How to operationalize (what to do next)

### 4.1 Review the classification quickly (highest ROI)
1) Review **Class A** tasks first (jobs, degraded-mode, authz/RLS, observability).
2) Review **Class B** next (credit/invoice/payment/points invariants).
3) Leave Class C for later.

**Rule:** If a task touches retries/timeouts/idempotency/observability → bump to **A**.

### 4.2 Keep classification separate (recommended)
Decision: **Keep A/B/C in mapping files**, not embedded in the big WBS tables.

Rationale:
- Embedding into 292-row tables is error-prone and creates formatting churn.
- A mapping file can be reviewed like a config (diffable, auditable, easier to iterate).

You can embed later once the mapping stabilizes.

### 4.3 When to reduce stabilization buffer
Only reduce 15% → 12% → 10% if (for 2–4 weeks):
- reopen rate does not increase,
- CI flake rate is controlled,
- defect escapes decrease,
- UAT pass rate remains stable.

---

## 5) What number should we use right now?

Given the stated AI-workflow maturity risk, the defensible plan is:
- **Use baseline 252.25 MD** as the committed “Likely” planning total.
- Treat Scenario S1 (≈249 MD) as *possible but not guaranteed*.
- Treat Scenario S2/S3 as targets unlocked by measured maturity.
