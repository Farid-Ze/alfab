# PRODUCTION CHECKLIST: PT. ALFA BEAUTY COSMETICA B2B PLATFORM
**For: Development Team, DevOps, QA & Operations**

**Date:** January 09, 2026
**Version:** 1.0
**Reference:** Blueprint V3.4, DevOps V2.4, FSD V2.6, Governance V1.0, SLI/SLO V1.0

---

## 1. PREAMBLE: PRODUCTION READINESS FRAMEWORK

Checklist ini disiapkan berdasarkan standar **Vercel Production Readiness** yang diadaptasi untuk arsitektur **Cloud-Native Modular Monolith** proyek ini. Sistem dinyatakan siap Go-Live jika seluruh item checklist berstatus **PASS**.

**5 Pilar Validasi:**
- [Operational Excellence](#2-operational-excellence)
- [Security](#3-security)
- [Reliability](#4-reliability)
- [Performance](#5-performance)
- [Cost Optimization](#6-cost-optimization)

---

## 2. OPERATIONAL EXCELLENCE

Memastikan sistem dapat dioperasikan, di-monitor, dan di-rollback dengan aman.

### A. Incident Response

| # | Item | Reference | Status |
|---|------|-----------|--------|
| 2.1 | **Define Incident Response Plan** | Governance §2 | ☐ |
| | SEV-1 (Critical): Response < 15 menit, Escalation ke CTO | | |
| | SEV-2 (High): Response < 1 jam | | |
| | SEV-3 (Medium): Response < 24 jam | | |
| | SEV-4 (Low): Response < 48 jam | | |
| 2.2 | **Configure Communication Channels** | | ☐ |
| | Slack/WA Group untuk incident alerts | | |
| | Status page URL untuk customer communication | | |
| | On-call rotation schedule | | |
| 2.3 | **Prepare Rollback Strategy** | DevOps §3.2 | ☐ |
| | Docker image tagging dengan SHA | | |
| | Database migration rollback scripts ready | | |
| | Feature flags untuk gradual rollout | | |

### B. Deployment Management

| # | Item | Reference | Status |
|---|------|-----------|--------|
| 2.4 | **Staging Environment Ready** | | ☐ |
| | Staging DB dengan data sanitized | | |
| | Staging Redis instance | | |
| | Environment variables configured | | |
| 2.5 | **Zero-Downtime Deployment** | | ☐ |
| | Blue-Green atau Rolling deployment configured | | |
| | Health check endpoints verified (`/api/health`) | | |
| | Graceful shutdown handlers in `cmd/server/main.go` | | |
| 2.6 | **CI/CD Pipeline Verified** | DevOps §3 | ☐ |
| | Linting (golangci-lint, ESLint) | | |
| | Unit tests (70% coverage target) | | |
| | Security scan (gosec, npm audit) | | |
| | Docker build & push | | |

### C. Monitoring & Observability

| # | Item | Verification | Status |
|---|------|--------------|--------|
| 2.7 | **Structured Logging Enabled** | `pkg/logger/zap.go` | ☐ |
| 2.8 | **Metrics Endpoint Active** | `pkg/metrics/prometheus.go` → `/metrics` | ☐ |
| 2.9 | **Tracing Configured** | `pkg/tracing/otel.go` (OpenTelemetry) | ☐ |
| 2.10 | **Alerting Rules Defined** | SLI_SLO.md | ☐ |
| | Error rate > 1% for 5 min → Critical | | |
| | P99 latency > 2s for 5 min → Critical | | |
| | Error rate > 0.5% for 10 min → Warning | | |

---

## 3. SECURITY

Memastikan sistem aman dari ancaman internal dan eksternal.

### A. Authentication & Authorization

| # | Item | Verification | Status |
|---|------|--------------|--------|
| 3.1 | **Password Hashing (bcrypt cost 12)** | `internal/service/auth/auth.go` L97 | ☐ |
| 3.2 | **JWT dengan Expiry Reasonable** | `pkg/jwt/jwt.go` | ☐ |
| | Access Token: 15 menit | | |
| | Refresh Token: 7 hari | | |
| 3.3 | **httpOnly Cookies untuk JWT** *(Recommended)* | `pkg/jwt/cookie.go` | ☐ |
| | `httpOnly: true`, `Secure: true`, `SameSite: Strict` | | |
| 3.4 | **RBAC Implementation Verified** | FSD §2 | ☐ |
| | GUEST: Read catalog only | | |
| | PARTNER: Orders, credit, loyalty | | |
| | AGENT: Impersonation | | |
| | ADMIN: Full access | | |

### B. Input Validation & Injection Prevention

| # | Item | Verification | Status |
|---|------|--------------|--------|
| 3.5 | **Parameterized Queries (SQL Injection)** | GORM digunakan di semua repository | ☐ |
| 3.6 | **Zod Validation di Frontend** | `frontend/src/lib/validations.ts` | ☐ |
| 3.7 | **Request Validation di Backend** | `internal/handler/v1/*.go` struct tags | ☐ |

### C. Rate Limiting & Abuse Prevention

| # | Item | Verification | Status |
|---|------|--------------|--------|
| 3.8 | **Rate Limiter Configured** | `internal/handler/middleware/rate_limiter.go` | ☐ |
| | Auth endpoints: 5 req/menit | | |
| | API endpoints: 100 req/menit | | |
| 3.9 | **CORS Properly Configured** | `cmd/server/main.go` | ☐ |

### D. Audit & Compliance

| # | Item | Reference | Status |
|---|------|-----------|--------|
| 3.10 | **Impersonation Audit Trail** | FSD §4.2 | ☐ |
| | Every shadow mode action logged | | |
| | Owner notification on checkout | | |
| 3.11 | **Config Change Audit** | UAT-13 | ☐ |
| | WHO changed WHAT, WHEN | | |
| 3.12 | **PII Masking in Logs** | | ☐ |
| | Email, phone masked in production logs | | |

### E. SSL & Encryption

| # | Item | Status |
|---|------|--------|
| 3.13 | **HTTPS Enforced** (SSL valid, HTTP → HTTPS redirect) | ☐ |
| 3.14 | **Database Connection Encrypted** (`sslmode=require`) | ☐ |

---

## 4. RELIABILITY

Memastikan sistem tahan terhadap kegagalan dan dapat pulih dengan cepat.

### A. High Availability

| # | Item | Reference | Status |
|---|------|-----------|--------|
| 4.1 | **Managed Database dengan HA** | RAB Infra §3.B | ☐ |
| | IDCloudHost Managed DB atau DigitalOcean | | |
| | Automated backups enabled | | |
| 4.2 | **Redis Cloud Flex Configured** | | ☐ |
| | 99.99% SLA | | |
| | Connection pooling di `pkg/cache/redis.go` | | |
| 4.3 | **Cold Start Mitigation** | DevOps §5 | ☐ |
| | min-instances=1 (jika serverless) | | |
| | Warm-up endpoint di `/api/health` | | |
| | DB connection pooling | | |

### B. Degraded Mode & Resilience

| # | Item | Verification | Status |
|---|------|--------------|--------|
| 4.4 | **ERP Down Handler Ready** | Governance §3.A | ☐ |
| | Circuit breaker di `internal/adapter/erp/client.go` | | |
| | Cache fallback untuk stok | | |
| | `PENDING_SYNC` flag untuk orders | | |
| 4.5 | **Credit Check Degraded Mode** | `internal/service/credit/credit.go` L128-150 | ☐ |
| | 3000ms timeout | | |
| | AMBER status jika timeout/error | | |
| | Cache fallback dengan 1-hour TTL | | |

### C. Error Handling

| # | Item | Verification | Status |
|---|------|--------------|--------|
| 4.6 | **Global Error Boundary (Frontend)** | `frontend/src/components/ui/error-boundary.tsx` | ☐ |
| 4.7 | **Structured Error Responses (Backend)** | FSD §5.3 (RFC 7807) | ☐ |

### D. Backup & Recovery

| # | Item | Reference | Status |
|---|------|-----------|--------|
| 4.8 | **Database Backup Schedule** | Governance §5 | ☐ |
| | Daily automated backups | | |
| | RPO: 24 jam, RTO: 4 jam | | |
| 4.9 | **Disaster Recovery Plan Documented** | Governance §5 (BCP) | ☐ |

---

## 5. PERFORMANCE

Memastikan sistem responsif dan memenuhi SLO targets.

### A. SLO Targets

Sesuai SLI_SLO.md:

| Endpoint | P50 | P95 | P99 | Status |
|----------|-----|-----|-----|--------|
| Health Check | < 5ms | < 20ms | < 50ms | ☐ |
| Auth (Login) | < 100ms | < 300ms | < 500ms | ☐ |
| Credit Check | < 50ms | < 150ms | < 300ms | ☐ |
| Product List | < 100ms | < 300ms | < 500ms | ☐ |
| Order Submit | < 200ms | < 500ms | < 1s | ☐ |

### B. Caching Strategy

| # | Item | Reference | Status |
|---|------|-----------|--------|
| 5.1 | **Memory-First untuk Catalog** | Blueprint §1 | ☐ |
| | Produk < 2000 SKU → Redis | | |
| | Tier prices cached | | |
| 5.2 | **Config Cache TTL (5 menit)** | `internal/service/config/config.go` L36 | ☐ |

### C. Frontend Optimization

| # | Item | Status |
|---|------|--------|
| 5.3 | **Image Optimization** (Next.js Image, WebP) | ☐ |
| 5.4 | **Code Splitting** (Lazy loading per route) | ☐ |
| 5.5 | **Bundle Size < 500KB** (initial load) | ☐ |

### D. Database Optimization

| # | Item | Reference | Status |
|---|------|-----------|--------|
| 5.6 | **Indexes Created** | database_erd.md | ☐ |
| | `idx_orders_partner_id` | | |
| | `idx_orders_status` | | |
| | `idx_invoices_partner_status` | | |
| 5.7 | **No N+1 Queries** | Code review | ☐ |

---

## 6. COST OPTIMIZATION

Memastikan biaya infrastruktur terkendali dan efisien.

### A. Infrastructure Sizing

Sesuai RAB Infrastruktur (Skenario B - Seimbang):

| Component | Provider | Monthly Cost | Status |
|-----------|----------|--------------|--------|
| App Server | IDCloudHost VPS eXtreme | Rp 149.000 | ☐ |
| Database | IDCloudHost Managed DB | Rp 150.000 | ☐ |
| Cache | Redis Cloud Flex | Rp 80.000 | ☐ |
| CDN | Cloudflare Free | Rp 0 | ☐ |
| **TOTAL** | | **Rp 454.000/bulan** | |

### B. Resource Optimization

| # | Item | Status |
|---|------|--------|
| 6.1 | **Connection Pooling Configured** (DB: 10, Redis: 5) | ☐ |
| 6.2 | **Graceful Shutdown** (30s timeout) | ☐ |
| 6.3 | **Log Retention Policy** (7d hot, 30d cold) | ☐ |

### C. Error Budget Tracking

Sesuai SLI_SLO.md §5:
- 99.9% SLA = 43.2 min/month allowed downtime
- \> 50% consumed → Freeze non-critical deploys
- \> 80% consumed → Focus on reliability

---

## 7. UAT SIGN-OFF

### A. Test Case Execution

Sesuai UAT.md (33 Test Cases):

| Category | Cases | Status |
|----------|-------|--------|
| Identity & Access | 5 | ☐ |
| Commercial (Credit) | 4 | ☐ |
| Routing & SLA | 6 | ☐ |
| Invoice & Payment | 4 | ☐ |
| Loyalty | 7 | ☐ |
| Resilience | 2 | ☐ |
| Config & Profile | 4 | ☐ |
| Multi-Language | 1 | ☐ |
| **TOTAL** | **33** | |

### B. Critical Path Verification

| Test ID | Description | Status |
|---------|-------------|--------|
| UAT-01 | Login Partner | ☐ |
| UAT-04 | Order Normal (Limit Aman) | ☐ |
| UAT-20 | Geo-Routing ke SubDist | ☐ |
| UAT-30 | Invoice Auto-Generated | ☐ |
| UAT-42 | Poin Cair saat PAID | ☐ |

---

## 8. GO-LIVE CHECKLIST

### A. D-1 (Satu Hari Sebelum)

| # | Item | Status |
|---|------|--------|
| 8.1 | Final staging test passed | ☐ |
| 8.2 | Production environment variables set | ☐ |
| 8.3 | DNS propagation verified (Cloudflare) | ☐ |
| 8.4 | SSL certificate active | ☐ |
| 8.5 | Monitoring alerts configured | ☐ |
| 8.6 | On-call schedule confirmed | ☐ |

### B. D-0 (Hari Peluncuran)

| # | Item | Status |
|---|------|--------|
| 8.7 | Database migration executed | ☐ |
| 8.8 | Application deployed | ☐ |
| 8.9 | Health check passing | ☐ |
| 8.10 | Smoke test: Login → Order → WA Link | ☐ |
| 8.11 | Monitoring dashboard open | ☐ |
| 8.12 | War room active | ☐ |

### C. D+1 (Sehari Setelah)

| # | Item | Status |
|---|------|--------|
| 8.13 | No critical errors in logs | ☐ |
| 8.14 | SLO targets met | ☐ |
| 8.15 | User feedback collected | ☐ |
| 8.16 | Performance baseline established | ☐ |

---

## 9. APPROVAL SIGN-OFF

| Role | Name | Date | Signature |
|------|------|------|-----------|
| **CTO/Tech Lead** | | | |
| **QA Lead** | | | |
| **Product Owner** | | | |
| **Client Representative** | | | |

---

**Prepared By:** Solutions Architect  
**Based On:** Vercel Production Readiness Framework  
**Approved By:** _________________________ (VP of Operations)
