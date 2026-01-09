# AI WORKFLOW PRODUCTIVITY (MATHEMATICAL, GOVERNED)
## PT. Alfa Beauty Cosmetica B2B Digital Hub

**Date:** January 09, 2026  
**Scope:** Non-MVP completion; aligned to UAT acceptance + DevOps/Governance + SLI/SLO.  
**Audience:** PM/Architect, Engineering Leads, QA, DevOps.

---

## 0) Why this document exists

Your planning problem is *not* “AI makes developers 2× faster”. The real question is:

> **How do we convert AI usage into measurable throughput** *without increasing rework, defect escapes, or integration instability*, under the explicit obligations in `docs-paket-b/`?

This document provides:
- a **math model** for productivity impact (and how it interacts with stabilization tax),
- a **workflow** that makes AI output reviewable and testable,
- a **measurement plan** (so we can recalibrate ECF/APF using evidence, not vibes),
- a **controlled rollout** (low maturity → medium maturity) that reduces risk.

---

## 1) Definitions

### 1.1 Man-Day (MD)
- **1 MD = 8 hours focused engineering work**.

### 1.2 Two different “efforts” we track
We must separate sizing from execution reality:

1) **Base Effort Units (BEU)**: per-task Effort column in `docs-paket-b/dev/work_breakdown_complete.md`.
2) **Recalibrated MD**: BEU × ECF (Engineering Calibration Factor).

### 1.3 Why AI needs its own factor (APF)
ECF captures *integration/governance reality* of the system. 
AI changes productivity unevenly by task type and team maturity.

So we model AI as **APF (AI Productivity Factor)** that modifies the recalibrated MD **per task class**, not globally.

---

## 2) Task classes (cost behavior)

Use the same buckets we used in recalibration, but now with explicit AI sensitivity.

- **Class A — Integration / Resilience / Operations truth**
  - ERP degraded mode, jobs & retries, idempotency, RLS/authz correctness, observability, CI/CD hardening.
  - Dominant cost drivers: debugging, environment variance, edge cases, reliability.
  - AI helps **least**.

- **Class B — Business logic & workflows**
  - pricing/credit/invoice/payments/points rules, state machines.
  - AI helps somewhat (implementation speed), but tests and validation still dominate.

- **Class C — Boilerplate / CRUD / UI composition**
  - repetitive components, basic CRUD, simple wiring.
  - AI helps **most**.

> Rule of thumb: AI accelerates *typing* far more than it accelerates *truth-finding*.

---

## 3) The productivity model

### 3.1 Core equation (per-task)
For a task $t$:

$$
\textbf{MD\_noAI}(t) = \textbf{BEU}(t) \times \textbf{ECF}
$$

With AI workflow, we model net effect as:

$$
\textbf{MD\_AI}(t) = \textbf{MD\_noAI}(t) \times (1 - s_{c}(m)) + o_{c}(m)
$$

Where:
- $c \in \{A,B,C\}$ is task class.
- $m \in [0,1]$ is **AI workflow maturity** (0 = chaotic, 1 = disciplined and measured).
- $s_{c}(m)$ is the **savings rate** (fractional reduction) for class $c$ at maturity $m$.
- $o_{c}(m)$ is **overhead MD** added by AI usage (review load, prompt iteration, integration fixes, regression reruns) for class $c$.

### 3.2 Why overhead is explicit
At low maturity, AI frequently increases:
- PR churn (rewrite/refactor after review),
- test flakiness debugging,
- integration surprises,
- security/edge-case misses.

So we do **not** assume $o_{c}(m)=0$.

---

## 3.3 Maximizing correctness probability (not “speed”)

When the team is not mature with AI workflow, the dominant failure mode is:

> AI produces **placeholder / skeleton / MVP-looking artifacts** that *compile* but are not *true*.

So the objective function must be framed as:

$$
	extbf{maximize } P(\text{Correct} \mid \text{AI-assisted process})
$$

### A simple (usable) risk model
Let a change have a baseline probability of being wrong (defect, missing edge case, wrong invariant):

$$
p_0 = P(\text{Wrong before gates})
$$

We then apply multiple **independent gates** (spec review, tests, negative tests, integration checks, review checklist, etc.).
If gate $i$ detects the defect with probability $d_i$, then the probability the defect escapes *all* gates is:

$$
P(\text{Wrong after gates}) = p_0 \times \prod_{i=1}^{k} (1-d_i)
$$

So the fastest way to reduce escapes is not “more AI code”, but:
- increase $k$ (number of independent checks), and/or
- increase $d_i$ for the checks that matter (integration tests for Class A, invariant/property tests for Class B).

### Practical implication by class
- **Class A:** raise $d_i$ via integration tests + observability assertions + idempotency checks + failure injection.
- **Class B:** raise $d_i$ via invariant lists + table-driven tests + boundary/rounding tests.
- **Class C:** raise $d_i$ via lint/typecheck + snapshot/UI tests.

---

## 4) Practical parameterization (usable numbers)

You need numbers you can actually plan with. Start conservative, then update using measurements (Section 7).

### 4.1 Suggested initial maturity baseline (2026 start)
Given “low AI workflow maturity” described so far:
- set **$m = 0.25$** initially.

### 4.2 Initial savings functions (simple piecewise)
Use this simple mapping to avoid false precision:

| Class | Savings at low maturity ($m=0.25$) | Savings at medium maturity ($m=0.60$) | Savings at high maturity ($m=0.85$) |
|---|---:|---:|---:|
| A | 0–5% | 5–10% | 10–15% |
| B | 5–12% | 12–20% | 20–28% |
| C | 10–20% | 20–35% | 35–45% |

### 4.3 Overhead model (guardrails matter)
At low maturity, overhead can cancel savings. Use:

| Class | Overhead at low maturity | Overhead at medium maturity | Overhead at high maturity |
|---|---:|---:|---:|
| A | +5–15% of MD\_noAI | +3–8% | +1–5% |
| B | +3–10% | +2–6% | +1–4% |
| C | +2–8% | +1–4% | +0–2% |

So a *net* savings rate is roughly:

$$
\textbf{netSavings}_c \approx s_c - \textbf{overhead}_c
$$

This is why a governed workflow is non-negotiable.

---

## 5) Converting this into a schedule (capacity math)

### 5.1 Capacity equation
Let:
- $N$ = number of contributors (effective FTE)
- $D$ = working days in the period
- $f$ = focus factor (meetings, context switching, ops interruptions), typically **0.55–0.70**

Then:

$$
\textbf{CapacityMD} = N \times \frac{D}{1} \times \frac{8f}{8} = N \times D \times f
$$

Because $1\,MD=8h$, the $8$ cancels: capacity in MD is simply *days × focus*.

### 5.2 Example (useful sanity check)
If 3 engineers, 20 working days/month, $f=0.65$:

$$
\textbf{CapacityMD/month} = 3 \times 20 \times 0.65 = 39\,MD
$$

This is the correct place to model meeting load, not by redefining MD.

---

## 6) The AI workflow (governed, repeatable)

This workflow is designed to preserve the obligations from UAT + Governance + SLI/SLO.

### 6.1 Roles in an AI-assisted PR
- **Author (human)**: owns correctness, writes acceptance criteria, chooses test strategy.
- **AI assistant**: drafts code/tests/docs, proposes edge cases.
- **Reviewer**: enforces DoD, blocks “MVP-looking” merges.
- **QA/DevOps** (as needed): validates UAT mapping, pipeline, observability.

### 6.2 PR contract (Definition of Done for AI-generated code)
A PR is mergeable only if:
1) **Acceptance criteria present** (one or more UAT refs or explicit conditions).
2) **Tests exist** proportional to risk (unit for B/C, integration for A, E2E for critical flows).
3) **Observability exists** for Class A jobs:
   - log lines with correlation IDs,
   - metrics counters/timers,
   - trace spans (where applicable).
4) **Idempotency** is addressed for retried actions (jobs, payments, points credit).
5) **Security checks** (authz, RLS boundaries) are explicitly tested for Class A.

### 6.3 The “AI prompt packet” (what we feed to AI)
Every AI-assisted task must include:
- scope: what endpoint/component/job
- invariants: what must never happen
- edge cases: at least 5 (AI can propose, human must approve)
- UAT mapping: which UAT IDs are covered
- data contracts: request/response + DB tables touched

And two anti-MVP guardrails:
- **No placeholders policy:** AI output must contain *no* TODOs like “implement later”, *no* mock returns, *no* “happy path only” stubs.
- **Explicit failure semantics:** for any external dependency (ERP, Redis, WA/Email), specify retries, timeouts, idempotency keying, and error responses.

This reduces hallucinated assumptions and rework.

---

## 6.4 Prompt patterns that maximize correctness probability

These prompts are designed to increase $k$ and $d_i$ in the model above.

### Pattern P1 — Spec-first (forces truth before code)
Ask AI to produce, in order:
1) acceptance criteria + UAT mapping,
2) invariants,
3) state machine (if applicable),
4) failure modes + handling,
5) test plan (unit/integration/E2E),
6) only then code.

### Pattern P2 — Counterexample generator (kills happy-path bias)
After the spec, ask:
"Generate 10 counterexamples that would violate the invariants or break the workflow; for each, propose a test."

### Pattern P3 — Red-team review (AI as adversary)
Give AI the diff and ask:
"Assume this code is wrong. Find the most likely 5 correctness failures. Provide minimal repro steps and fixes."

### Pattern P4 — Diff-limited implementation (reduces blast radius)
Instruct:
"Only change the smallest set of files required. If you want to add a new abstraction, justify why it reduces defects."

### Pattern P5 — No-placeholder enforcement
Instruct:
"Any TODO / stub / placeholder is a failing output. If information is missing, ask clarifying questions instead of inventing."

---

## 7) Measurement: how we make AI impact real

You cannot manage what you don’t measure.

### 7.1 Metrics to track weekly
**Throughput & flow**
- PRs merged/week
- Cycle time (open → merge)
- Lead time (ticket start → done)

**Quality / rework**
- Reopen rate (% of tickets reopened)
- Defect escape rate (bugs found after “done”)
- Test flake rate (CI reruns / failed runs)
- Review churn (files changed after first review round)

**Reliability alignment**
- UAT pass rate per run
- SLI/SLO dashboards coverage (exists? alerts configured?)

### 7.2 Updating the parameters with evidence
Every 2–4 weeks:
1) Tag each completed task as A/B/C.
2) Record actual MD spent (or hours) for the task.
3) Fit a simple ratio:

$$
\hat{r}_c = \frac{\text{actualMD}_c}{\sum \text{MD\_noAI}(t)}
$$

If $\hat{r}_c < 1$, you achieved savings. If $\hat{r}_c > 1$, AI introduced net overhead.

Then update $s_c$ and $o_c$ (or simpler: update netSavings).

### 7.3 “Stop-loss rule” (prevents AI making you slower)
If, for 2 consecutive weeks:
- reopen rate increases by > X (e.g., 30%), or
- CI flakes exceed threshold, or
- defect escapes rise,

Then:
- reduce AI usage for Class A,
- enforce stricter PR gates (tests/observability),
- focus on stabilizing test infrastructure.

---

## 8) How this plugs into your WBS numbers

You already have:
- per-task BEU (Effort)
- per-task Recalibrated MD (BEU × ECF)

Next step for planning is to add **one more lightweight column** (optional):
- `Task Class` = A/B/C

If you don’t want to edit the big WBS tables immediately, keep the classification in a separate mapping file and treat it as the source of truth:
- `docs-paket-b/dev/task_classification.md`
- `docs-paket-b/dev/task_classification_auto.md` (auto-generated first pass; requires review)

Then compute:

$$
\textbf{TotalMD\_AI} = \sum_{t} \textbf{MD\_AI}(t) + \textbf{StabilizationBuffer}(\cdot)
$$

### 8.1 Stabilization buffer under AI
Do not assume AI reduces stabilization buffer immediately.
- At low maturity, buffer can **stay 15%** or even increase.
- At medium/high maturity with stable tests and strong PR DoD, you can **consider reducing** buffer gradually (e.g., 15% → 12% → 10%) based on defect/flake metrics.

---

## 9) 30/60/90 day adoption roadmap

### 0–30 days: Make AI safe
- Standardize the “prompt packet”.
- Enforce DoD gates.
- Add task classification A/B/C.
- Measure baseline metrics weekly.

### 31–60 days: Make AI fast
- Expand AI usage in Class C and lower-risk Class B.
- Build test scaffolds and fixtures to reduce overhead.
- Reduce review churn with better upfront specs.

### 61–90 days: Make AI measurable
- Update $s_c$ and $o_c$ from real data.
- Consider reducing stabilization buffer if metrics improve.
- Codify best prompts and anti-patterns.

---

## 10) Quick decision table (what to do now)

If maturity is low (current state):
- **Use AI heavily for Class C** (UI/CRUD scaffolding).
- **Use AI cautiously for Class B** (logic + tests required).
- **Use AI sparingly for Class A** (AI as reviewer/checklist generator, not primary author).

Target outcome: **net positive throughput** without violating UAT/Governance/SLI.

---

## Appendix A — Minimal templates

### A.1 Ticket template (AI-ready)
- Goal:
- UAT mapping:
- Invariants:
- Edge cases:
- Tables/endpoints touched:
- Observability needs:
- Tests required:

### A.2 PR checklist (copy/paste)
- [ ] Acceptance criteria present
- [ ] Tests added/updated (unit/integration/E2E as needed)
- [ ] Observability added (logs/metrics/traces)
- [ ] Idempotency considered for retries/jobs
- [ ] Authz/RLS boundaries validated
- [ ] CI green; no new flake introduced
