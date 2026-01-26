# Infrastructure Decisions

**Status:** Live (Paket A)

## 1. Rate Limiting Strategy (ISO 27001 - Resiliency)

### Current Implementation (Phase 1)
- **Mechanism:** In-Memory Map (`Map<string, count>`).
- **Scope:** Per-instance (serverless function).
- **Pros:** Zero dependency, zero cost, extremely fast.
- **Cons:** Not shared across instances (loose limit), resets on cold start.
- **Risk Acceptance:** Acceptable for Paket A traffic (< 100 leads/day). Vercel DDoS protection acts as outer shield.

### Future Upgrade Path (Phase 2 / Paket B)
- **Trigger:** > 1000 leads/day or evidence of distributed abuse.
- **Solution:** Upstash Redis (Serverless).
- **Implementation:** Replace `checkRateLimit` stub with `redis.incr`.

## 2. Secrets Management
- **Local:** `.env.local` (git-ignored).
- **Production:** Vercel Environment Variables (Encrypted).
- **Policy:** Secrets rotated if leakage suspected.

## 3. Observability
- **Logs:** Structured JSON → Vercel Logs → Datadog (Future).
- **Errors:** Sentry (Client + Server).
- **Metrics:** GA4 + Vercel Web Vitals.
