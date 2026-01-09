# ADR-0001 — Lead API Hosting Strategy (Paket A)

> **DEPRECATED:** Ringkasan ADR Paket A sudah digabung ke `docs-paket-a/paket-a.md` (lihat §13).
# ADR-0001 — Lead API hosting target (Option B)

**Status:** Proposed  
**Date:** January 09, 2026  
**Scope:** Paket A (Website) — Option B Lead API

---

## Context
Paket A memilih Option B: lead capture tidak boleh “best effort”. Harus ada server-side validation, persistence, anti-spam, observability, admin export, dan runbook.

Workspace dokumentasi ini belum berisi source code backend/frontend. Implementasi bisa ditempatkan di:
1) Backend service (mis. Go/Fiber di repo platform), atau
2) Next.js route handler (API routes) di repo website.

## Decision drivers
- Durability/persistence + idempotency
- Rate limiting + input hardening
- Observability + metrics
- Admin export access control
- Deployment simplicity (staging/prod)

## Options
### Option 1 — Host Lead API in dedicated backend service (recommended)
**Pros:**
- Paling natural untuk persistence/outbox/retry, rate limiting, auth export
- Observability lebih matang (logs/metrics)
- Bisa reuse standar security platform

**Cons:**
- Butuh service deployment terpisah

### Option 2 — Host Lead API in Next.js route handlers
**Pros:**
- Satu repo dengan website; cepat untuk mulai
- Cocok jika hosting mendukung storage yang reliable

**Cons:**
- Durability & ops bergantung hosting; bisa jadi perlu adaptasi (queue/db)

## Recommendation
Default: **Option 1** (backend service) untuk menurunkan risiko rework dan memenuhi “selesai = production-ready”.

Jika constraint organisasi mengharuskan satu repo/one deployment unit, Option 2 boleh dipilih, tetapi **persistence non-lossy** dan **admin export protected** harus tetap terpenuhi.

## Consequences
- Repo implementasi harus menyediakan `.env.example` dan secret store untuk `LEAD_API_ADMIN_TOKEN`.
- Definition of Done dan UAT tetap sama: UAT-11/12 harus PASS dengan evidence.

## Follow-ups
- Buat spec endpoint: request/response, status codes, idempotency key strategy.
- Putuskan storage target: Postgres vs managed inbox.
