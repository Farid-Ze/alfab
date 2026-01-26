# Alfa Beauty Cosmetica - Frontend (Enterprise Edition)

This is the **Next.js Hybrid** frontend for Alfa Beauty Cosmetica.  
It follows **Enterprise Framework Standards** (ITIL, COBIT, TOGAF, Jamstack).

## 🏗 Architecture (TOGAF)

### Hybrid Rendering
- **Static**: Marketing pages (`/about`, `/products`) are statically optimized.
- **Dynamic**: Lead API (`/api/leads`) runs on Node.js/Edge.
- **Routing**: **Sub-path Strategy** (`/en/`, `/id/`) for maximum SEO compatibility.

### Deployment (Portability)
- **Container**: `Dockerfile` included for Kubernetes/ECS.
- **Vercel**: Optimized for Vercel Edge.

## 🛡 Resiliency Patterns (ITIL)

### 1. Database Fallback ("Fail-Open")
If Supabase is down, the Lead API **automatically switches** to Email-Only mode.
- **Normal**: Database Insert -> 202 Accepted.
- **Failure**: Database Error -> Send Email -> 202 Accepted (with Warning log).
- **Catastrophic**: Both Fail -> 500 Error.

### 2. Observability
- All logs are **Structured JSON** (`src/lib/logger.ts`).
- Ready for Splunk/Datadog ingestion.
- **Privacy**: PII (Names, Emails) is **Automatically Redacted** in logs.

### 3. Crash Safety
- `global-error.tsx`: Catches Root Layout failures (Fonts, Metadata) to prevent White Screen of Death.

## 🔒 Security (COBIT)

- **Rate Limiting**: Abstraction ready for Redis (currently In-Memory).
- **CAPTCHA**: Stub available in `route.ts`.
- **Strict Auth**: Export API requires High-Entropy Admin Token.

## 🚀 Development

### Run Locally
```bash
npm install
npm run dev
```

### Run Tests (Reliability)
```bash
npm run test:unit  # Vitest (Business Logic)
npm run test:e2e   # Playwright (User Flows)
```

### Build Docker
```bash
docker build -t alfa-frontend .
```

