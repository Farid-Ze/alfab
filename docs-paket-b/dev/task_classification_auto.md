# TASK CLASSIFICATION (AUTO-GENERATED)
## PT. Alfa Beauty Cosmetica B2B Digital Hub

**Date:** January 09, 2026  
**Source:** Heuristic classification from `docs-paket-b/dev/work_breakdown_complete.md`.  
**Status:** First-pass; MUST be reviewed by leads before using for commitments.

This file is generated to quickly enable the AI productivity model in `docs-paket-b/dev/ai_workflow_productivity.md`.

### Classification rules used
- DO → A
- QA → A if integration/perf/security keywords, else B
- BE/FE → A if integration/resilience/security/observability keywords, else B if business-logic keywords, else C

| Task ID | Discipline | Task | Suggested Class | Reason |
|---|---|---|---|---|
| BE-001 | BE | JWT token generation (RS256) | A | Integration/resilience/security/observability keyword match |
| BE-002 | BE | Refresh token rotation | A | Integration/resilience/security/observability keyword match |
| BE-003 | BE | `/api/auth/login` Partner | C | Boilerplate/CRUD/wiring |
| BE-004 | BE | `/api/auth/login` Agent | C | Boilerplate/CRUD/wiring |
| BE-005 | BE | `/api/auth/login` Admin | C | Boilerplate/CRUD/wiring |
| BE-006 | BE | Password hashing bcrypt | C | Boilerplate/CRUD/wiring |
| BE-007 | BE | Logout + token blacklist | A | Integration/resilience/security/observability keyword match |
| BE-008 | BE | Rate limiting auth | A | Integration/resilience/security/observability keyword match |
| BE-009 | BE | RBAC middleware | A | Integration/resilience/security/observability keyword match |
| BE-010 | BE | Permission checks | C | Boilerplate/CRUD/wiring |
| BE-011 | BE | Row-Level Security | C | Boilerplate/CRUD/wiring |
| BE-012 | BE | AGENT_SESSIONS table | A | Integration/resilience/security/observability keyword match |
| BE-013 | BE | x-agent-id header | C | Boilerplate/CRUD/wiring |
| BE-014 | BE | Impersonation audit log | A | Integration/resilience/security/observability keyword match |
| BE-015 | BE | Checkout notification WA + Email | C | Boilerplate/CRUD/wiring |
| BE-016 | BE | PRODUCTS CRUD API | C | Boilerplate/CRUD/wiring |
| BE-017 | BE | BRANDS CRUD API | C | Boilerplate/CRUD/wiring |
| BE-018 | BE | CATEGORIES CRUD API | C | Boilerplate/CRUD/wiring |
| BE-019 | BE | Product search FTS | C | Boilerplate/CRUD/wiring |
| BE-020 | BE | Image upload handler | C | Boilerplate/CRUD/wiring |
| BE-021 | BE | TIER_PRICES table | B | Business logic keyword match |
| BE-022 | BE | Tier price resolution | B | Business logic keyword match |
| BE-023 | BE | Volume discount logic | B | Business logic keyword match |
| BE-024 | BE | Redis tier price cache | A | Integration/resilience/security/observability keyword match |
| BE-025 | BE | Price effective date | C | Boilerplate/CRUD/wiring |
| BE-026 | BE | INVENTORY table | C | Boilerplate/CRUD/wiring |
| BE-027 | BE | Safety Buffer algo | C | Boilerplate/CRUD/wiring |
| BE-028 | BE | Stock status enum | B | Business logic keyword match |
| BE-029 | BE | ERP stock sync job | A | Integration/resilience/security/observability keyword match |
| BE-029B | BE | Stock sync status API | A | Integration/resilience/security/observability keyword match |
| BE-030 | BE | Weekly reconciliation job | A | Integration/resilience/security/observability keyword match |
| BE-031 | BE | `/api/credit/status` | B | Business logic keyword match |
| BE-032 | BE | Credit limit calc | B | Business logic keyword match |
| BE-033 | BE | GREEN/AMBER status | C | Boilerplate/CRUD/wiring |
| BE-034 | BE | Over-limit flag | B | Business logic keyword match |
| BE-035 | BE | Credit exposure track | B | Business logic keyword match |
| BE-036 | BE | Tier payment terms | B | Business logic keyword match |
| BE-037 | BE | Auto due_date calc | B | Business logic keyword match |
| BE-038 | BE | Credit used on APPROVED | B | Business logic keyword match |
| BE-039 | BE | Credit release on PAID | B | Business logic keyword match |
| BE-040 | BE | ERP timeout handling | A | Integration/resilience/security/observability keyword match |
| BE-041 | BE | Redis fallback cache | A | Integration/resilience/security/observability keyword match |
| BE-042 | BE | Bypass mode AMBER | C | Boilerplate/CRUD/wiring |
| BE-043 | BE | ORDERS table | C | Boilerplate/CRUD/wiring |
| BE-044 | BE | ORDER_ITEMS table | C | Boilerplate/CRUD/wiring |
| BE-045 | BE | Order number gen | C | Boilerplate/CRUD/wiring |
| BE-046 | BE | POST `/api/orders` + PENDING_SYNC | A | Integration/resilience/security/observability keyword match |
| BE-047 | BE | GET `/api/orders/{id}` | C | Boilerplate/CRUD/wiring |
| BE-048 | BE | GET `/api/orders` list | C | Boilerplate/CRUD/wiring |
| BE-049 | BE | Order state machine | B | Business logic keyword match |
| BE-050 | BE | Order cancellation | C | Boilerplate/CRUD/wiring |
| BE-051 | BE | Stock validation | C | Boilerplate/CRUD/wiring |
| BE-052 | BE | Min threshold check | B | Business logic keyword match |
| BE-053 | BE | Region validation | C | Boilerplate/CRUD/wiring |
| BE-054 | BE | Order total calc | C | Boilerplate/CRUD/wiring |
| BE-055 | BE | Point redemption deduction | B | Business logic keyword match |
| BE-056 | BE | session_mode tag | A | Integration/resilience/security/observability keyword match |
| BE-057 | BE | agent_id on order | C | Boilerplate/CRUD/wiring |
| BE-058 | BE | INVOICES table | B | Business logic keyword match |
| BE-059 | BE | Auto invoice on APPROVED | B | Business logic keyword match |
| BE-060 | BE | Invoice number gen | B | Business logic keyword match |
| BE-061 | BE | GET `/api/invoices` | B | Business logic keyword match |
| BE-062 | BE | GET `/api/invoices/{id}` | B | Business logic keyword match |
| BE-063 | BE | INVOICE_PAYMENTS table | B | Business logic keyword match |
| BE-064 | BE | POST payments | B | Business logic keyword match |
| BE-065 | BE | Partial payment logic | B | Business logic keyword match |
| BE-066 | BE | PAID status update | B | Business logic keyword match |
| BE-067 | BE | Point credit on PAID | B | Business logic keyword match |
| BE-068 | BE | POINT_TRANSACTIONS table | B | Business logic keyword match |
| BE-069 | BE | Base point calc | B | Business logic keyword match |
| BE-070 | BE | Tier multiplier logic | B | Business logic keyword match |
| BE-071 | BE | Estimated points API | B | Business logic keyword match |
| BE-072 | BE | Point eligibility check | B | Business logic keyword match |
| BE-073 | BE | EARNED on invoice PAID | B | Business logic keyword match |
| BE-074 | BE | point_balance trigger | B | Business logic keyword match |
| BE-075 | BE | GET `/api/points/balance` | B | Business logic keyword match |
| BE-076 | BE | GET `/api/points/history` | B | Business logic keyword match |
| BE-077 | BE | REDEMPTION_CATALOG | C | Boilerplate/CRUD/wiring |
| BE-078 | BE | POST `/api/redemptions` | C | Boilerplate/CRUD/wiring |
| BE-079 | BE | REDEEMED transaction | B | Business logic keyword match |
| BE-080 | BE | SUB_DISTRIBUTORS table | C | Boilerplate/CRUD/wiring |
| BE-081 | BE | REGIONS table | C | Boilerplate/CRUD/wiring |
| BE-082 | BE | Region→SubDist lookup | C | Boilerplate/CRUD/wiring |
| BE-083 | BE | GET `/api/subdistributors` | C | Boilerplate/CRUD/wiring |
| BE-084 | BE | WA Deep Link gen | C | Boilerplate/CRUD/wiring |
| BE-084B | BE | Credit warning in WA msg | B | Business logic keyword match |
| BE-085 | BE | routed_at timestamp | C | Boilerplate/CRUD/wiring |
| BE-086 | BE | SLA_ESCALATION_LOGS | C | Boilerplate/CRUD/wiring |
| BE-087 | BE | SLA check job (15min) | A | Integration/resilience/security/observability keyword match |
| BE-088 | BE | 18h reminder logic | C | Boilerplate/CRUD/wiring |
| BE-089 | BE | 24h escalation logic | C | Boilerplate/CRUD/wiring |
| BE-090 | BE | GET `/api/orders/sla/pending` | C | Boilerplate/CRUD/wiring |
| BE-091 | BE | Fallback to HQ | A | Integration/resilience/security/observability keyword match |
| BE-092 | BE | SYSTEM_CONFIGS table | C | Boilerplate/CRUD/wiring |
| BE-093 | BE | CRUD `/api/admin/config` | C | Boilerplate/CRUD/wiring |
| BE-094 | BE | Config Redis cache | A | Integration/resilience/security/observability keyword match |
| BE-095 | BE | Cache invalidation | C | Boilerplate/CRUD/wiring |
| BE-096 | BE | Config versioning | C | Boilerplate/CRUD/wiring |
| BE-097 | BE | AUDIT_LOGS table | A | Integration/resilience/security/observability keyword match |
| BE-098 | BE | Auto audit logging | A | Integration/resilience/security/observability keyword match |
| BE-099 | BE | GET `/api/admin/audit` | A | Integration/resilience/security/observability keyword match |
| BE-100 | BE | PII masking logs | C | Boilerplate/CRUD/wiring |
| FE-001 | FE | React 18 + Vite setup | C | UI composition/CRUD/wiring |
| FE-002 | FE | Tailwind CSS config | C | UI composition/CRUD/wiring |
| FE-003 | FE | React Query setup | C | UI composition/CRUD/wiring |
| FE-004 | FE | react-i18next (ID/EN) | C | UI composition/CRUD/wiring |
| FE-005 | FE | React Router setup | C | UI composition/CRUD/wiring |
| FE-006 | FE | API client + errors | C | UI composition/CRUD/wiring |
| FE-007 | FE | Button component | C | UI composition/CRUD/wiring |
| FE-008 | FE | Input/Form components | C | UI composition/CRUD/wiring |
| FE-009 | FE | Modal component | C | UI composition/CRUD/wiring |
| FE-010 | FE | Table + pagination | C | UI composition/CRUD/wiring |
| FE-011 | FE | Toast notifications | C | UI composition/CRUD/wiring |
| FE-012 | FE | Loading skeletons | C | UI composition/CRUD/wiring |
| FE-013 | FE | Login page | C | UI composition/CRUD/wiring |
| FE-014 | FE | Login form validation | C | UI composition/CRUD/wiring |
| FE-015 | FE | Role-based redirect | C | UI composition/CRUD/wiring |
| FE-016 | FE | Token storage | A | Integration/resilience/security/observability keyword match |
| FE-017 | FE | Logout functionality | C | UI composition/CRUD/wiring |
| FE-018 | FE | AuthGuard HOC | C | UI composition/CRUD/wiring |
| FE-019 | FE | Role-based guards | C | UI composition/CRUD/wiring |
| FE-020 | FE | Token refresh | A | Integration/resilience/security/observability keyword match |
| FE-021 | FE | Homepage hero | C | UI composition/CRUD/wiring |
| FE-022 | FE | Product grid | C | UI composition/CRUD/wiring |
| FE-022B | FE | Stock sync delay banner | A | Integration/resilience/security/observability keyword match |
| FE-023 | FE | Product card | C | UI composition/CRUD/wiring |
| FE-024 | FE | Category sidebar | C | UI composition/CRUD/wiring |
| FE-025 | FE | Brand filter | C | UI composition/CRUD/wiring |
| FE-026 | FE | Search bar | C | UI composition/CRUD/wiring |
| FE-027 | FE | Product detail page | C | UI composition/CRUD/wiring |
| FE-028 | FE | Price hidden for Guest | C | UI composition/CRUD/wiring |
| FE-029 | FE | Tier price (Partner) | C | UI composition/CRUD/wiring |
| FE-030 | FE | "Login for price" CTA | C | UI composition/CRUD/wiring |
| FE-031 | FE | Dashboard layout | C | UI composition/CRUD/wiring |
| FE-032 | FE | Credit status widget | B | UI for domain correctness (finance/credit/points/SLA) |
| FE-033 | FE | Point balance widget | B | UI for domain correctness (finance/credit/points/SLA) |
| FE-034 | FE | Recent orders widget | C | UI composition/CRUD/wiring |
| FE-035 | FE | Tier status display | C | UI composition/CRUD/wiring |
| FE-036 | FE | Order history page | C | UI composition/CRUD/wiring |
| FE-037 | FE | Order detail modal | C | UI composition/CRUD/wiring |
| FE-038 | FE | Order status badge | C | UI composition/CRUD/wiring |
| FE-038B | FE | PENDING_SYNC badge | A | Integration/resilience/security/observability keyword match |
| FE-039 | FE | Invoice status badge | B | UI for domain correctness (finance/credit/points/SLA) |
| FE-040 | FE | Pending points msg | B | UI for domain correctness (finance/credit/points/SLA) |
| FE-041 | FE | Profile page | C | UI composition/CRUD/wiring |
| FE-042 | FE | Salon type selector | C | UI composition/CRUD/wiring |
| FE-043 | FE | Region dropdown | C | UI composition/CRUD/wiring |
| FE-044 | FE | Chair count input | C | UI composition/CRUD/wiring |
| FE-045 | FE | Specialization input | C | UI composition/CRUD/wiring |
| FE-046 | FE | Cart context/store | C | UI composition/CRUD/wiring |
| FE-047 | FE | Add to Cart button | C | UI composition/CRUD/wiring |
| FE-048 | FE | Cart drawer | C | UI composition/CRUD/wiring |
| FE-049 | FE | Quantity selector | C | UI composition/CRUD/wiring |
| FE-050 | FE | Remove item | C | UI composition/CRUD/wiring |
| FE-051 | FE | Cart total calc | C | UI composition/CRUD/wiring |
| FE-052 | FE | Checkout page | C | UI composition/CRUD/wiring |
| FE-053 | FE | Savings visual | C | UI composition/CRUD/wiring |
| FE-054 | FE | Estimated points | B | UI for domain correctness (finance/credit/points/SLA) |
| FE-055 | FE | Point redemption | B | UI for domain correctness (finance/credit/points/SLA) |
| FE-056 | FE | DynamicButton GREEN/AMBER | C | UI composition/CRUD/wiring |
| FE-057 | FE | Order notes | C | UI composition/CRUD/wiring |
| FE-058 | FE | WA message formatter | C | UI composition/CRUD/wiring |
| FE-059 | FE | "Kirim via WA" button | C | UI composition/CRUD/wiring |
| FE-060 | FE | Copy fallback | A | Integration/resilience/security/observability keyword match |
| FE-061 | FE | SubDist info display | C | UI composition/CRUD/wiring |
| FE-062 | FE | Order confirmation | C | UI composition/CRUD/wiring |
| FE-064 | FE | Agent dashboard | C | UI composition/CRUD/wiring |
| FE-065 | FE | "Kelola Klien" page | C | UI composition/CRUD/wiring |
| FE-066 | FE | Partner search | C | UI composition/CRUD/wiring |
| FE-067 | FE | "Masuk sebagai" button | C | UI composition/CRUD/wiring |
| FE-068 | FE | Impersonation banner | A | Integration/resilience/security/observability keyword match |
| FE-069 | FE | Exit impersonation | A | Integration/resilience/security/observability keyword match |
| FE-070 | FE | Shared cart flow | C | UI composition/CRUD/wiring |
| FE-074 | FE | Admin dashboard | C | UI composition/CRUD/wiring |
| FE-077 | FE | SLA alert widget | B | UI for domain correctness (finance/credit/points/SLA) |
| FE-078 | FE | Admin order list | C | UI composition/CRUD/wiring |
| FE-079 | FE | Status update controls | C | UI composition/CRUD/wiring |
| FE-080 | FE | Order filters | C | UI composition/CRUD/wiring |
| FE-081 | FE | SLA monitoring page | B | UI for domain correctness (finance/credit/points/SLA) |
| FE-082 | FE | SLA status badges | B | UI for domain correctness (finance/credit/points/SLA) |
| FE-083 | FE | Escalation actions | B | UI for domain correctness (finance/credit/points/SLA) |
| FE-084 | FE | Invoice list page | B | UI for domain correctness (finance/credit/points/SLA) |
| FE-085 | FE | Payment recording | B | UI for domain correctness (finance/credit/points/SLA) |
| FE-086 | FE | Payment history | B | UI for domain correctness (finance/credit/points/SLA) |
| FE-087 | FE | Config list page | C | UI composition/CRUD/wiring |
| FE-088 | FE | Config edit modal | C | UI composition/CRUD/wiring |
| FE-089 | FE | Config audit log | A | Integration/resilience/security/observability keyword match |
| FE-092 | FE | Point balance card | B | UI for domain correctness (finance/credit/points/SLA) |
| FE-093 | FE | Point history page | B | UI for domain correctness (finance/credit/points/SLA) |
| FE-094 | FE | Point tx detail | B | UI for domain correctness (finance/credit/points/SLA) |
| FE-095 | FE | Redemption catalog | C | UI composition/CRUD/wiring |
| FE-096 | FE | Redemption item card | C | UI composition/CRUD/wiring |
| FE-097 | FE | Redeem confirm modal | C | UI composition/CRUD/wiring |
| FE-098 | FE | Language switcher | C | UI composition/CRUD/wiring |
| FE-099 | FE | Responsive mobile | C | UI composition/CRUD/wiring |
| FE-100 | FE | Error boundary + 404 | C | UI composition/CRUD/wiring |
| DO-001 | DO | Terraform project init | A | DevOps/infrastructure/governance work |
| DO-002 | DO | VPC/Network config | A | DevOps/infrastructure/governance work |
| DO-003 | DO | VPS provisioning | A | DevOps/infrastructure/governance work |
| DO-004 | DO | Managed DB setup | A | DevOps/infrastructure/governance work |
| DO-005 | DO | Redis Cloud Flex | A | DevOps/infrastructure/governance work |
| DO-006 | DO | Cloudflare DNS + CDN | A | DevOps/infrastructure/governance work |
| DO-007 | DO | SSL certificate | A | DevOps/infrastructure/governance work |
| DO-008 | DO | Environment variables | A | DevOps/infrastructure/governance work |
| DO-009 | DO | Secret management | A | DevOps/infrastructure/governance work |
| DO-010 | DO | Backup strategy | A | DevOps/infrastructure/governance work |
| DO-011 | DO | Terraform remote state | A | DevOps/infrastructure/governance work |
| DO-012 | DO | Dev environment | A | DevOps/infrastructure/governance work |
| DO-013 | DO | Staging environment | A | DevOps/infrastructure/governance work |
| DO-014 | DO | Production environment | A | DevOps/infrastructure/governance work |
| DO-015 | DO | Firewall rules | A | DevOps/infrastructure/governance work |
| DO-016 | DO | GitHub Actions setup | A | DevOps/infrastructure/governance work |
| DO-017 | DO | Lint stage | A | DevOps/infrastructure/governance work |
| DO-018 | DO | Secret scanning | A | DevOps/infrastructure/governance work |
| DO-019 | DO | Unit test stage | A | DevOps/infrastructure/governance work |
| DO-020 | DO | Integration test stage | A | DevOps/infrastructure/governance work |
| DO-021 | DO | SonarQube SAST | A | DevOps/infrastructure/governance work |
| DO-022 | DO | Docker build BE | A | DevOps/infrastructure/governance work |
| DO-023 | DO | Docker build FE | A | DevOps/infrastructure/governance work |
| DO-024 | DO | Container registry | A | DevOps/infrastructure/governance work |
| DO-025 | DO | Deploy to staging | A | DevOps/infrastructure/governance work |
| DO-026 | DO | Deploy to production | A | DevOps/infrastructure/governance work |
| DO-027 | DO | Rollback procedure | A | DevOps/infrastructure/governance work |
| DO-028 | DO | Database migrations | A | DevOps/infrastructure/governance work |
| DO-029 | DO | Zero-downtime deploy | A | DevOps/infrastructure/governance work |
| DO-030 | DO | ERP VPN/tunnel config | A | DevOps/infrastructure/governance work |
| DO-031 | DO | OpenTelemetry setup | A | DevOps/infrastructure/governance work |
| DO-032 | DO | Trace-ID injection | A | DevOps/infrastructure/governance work |
| DO-033 | DO | Grafana dashboard | A | DevOps/infrastructure/governance work |
| DO-034 | DO | Error rate alerts | A | DevOps/infrastructure/governance work |
| DO-035 | DO | Latency alerts | A | DevOps/infrastructure/governance work |
| DO-036 | DO | Health check endpoint | A | DevOps/infrastructure/governance work |
| DO-037 | DO | Warm-up pinger | A | DevOps/infrastructure/governance work |
| DO-038 | DO | Business metric: orders | A | DevOps/infrastructure/governance work |
| DO-039 | DO | Business metric: SLA | A | DevOps/infrastructure/governance work |
| DO-040 | DO | Log aggregation | A | DevOps/infrastructure/governance work |
| DO-043 | DO | Rate limiting infra | A | DevOps/infrastructure/governance work |
| DO-044 | DO | DB connection pooling | A | DevOps/infrastructure/governance work |
| DO-045 | DO | Circuit breaker config | A | DevOps/infrastructure/governance work |
| DO-046 | DO | Min-instances=1 | A | DevOps/infrastructure/governance work |
| DO-047 | DO | Graceful shutdown | A | DevOps/infrastructure/governance work |
| DO-048 | DO | Idempotency header | A | DevOps/infrastructure/governance work |
| QA-001 | QA | Test framework setup | B | QA work validating domain scenarios |
| QA-002 | QA | E2E framework (Playwright) | A | QA work focused on integration/perf/security |
| QA-003 | QA | Test database seeding | B | QA work validating domain scenarios |
| QA-004 | QA | Mock server for ERP | B | QA work validating domain scenarios |
| QA-005 | QA | CI test integration | A | QA work focused on integration/perf/security |
| QA-006 | QA | Test coverage reports | B | QA work validating domain scenarios |
| QA-007 | QA | API test collection | B | QA work validating domain scenarios |
| QA-008 | QA | Load test setup | A | QA work focused on integration/perf/security |
| QA-009 | QA | Security test checklist | A | QA work focused on integration/perf/security |
| QA-010 | QA | UAT environment prep | B | QA work validating domain scenarios |
| QA-011 | QA | Test UAT-01: Login Partner | B | QA work validating domain scenarios |
| QA-012 | QA | Test UAT-02: Tier Pricing | A | QA work focused on integration/perf/security |
| QA-013 | QA | Test UAT-03: Agent Masquerade | B | QA work validating domain scenarios |
| QA-014 | QA | Test UAT-03B: Audit Trail | B | QA work validating domain scenarios |
| QA-015 | QA | Test UAT-03C: Checkout Notif | B | QA work validating domain scenarios |
| QA-016 | QA | Test UAT-04: Order Normal | B | QA work validating domain scenarios |
| QA-017 | QA | Test UAT-05: Over Limit | B | QA work validating domain scenarios |
| QA-018 | QA | Test UAT-06: Volume Discount | B | QA work validating domain scenarios |
| QA-019 | QA | Test UAT-06B: Region Error | B | QA work validating domain scenarios |
| QA-020 | QA | Credit unit tests | B | QA work validating domain scenarios |
| QA-021 | QA | Test UAT-20: Geo-Routing | B | QA work validating domain scenarios |
| QA-022 | QA | Test UAT-21: Admin Monitor | B | QA work validating domain scenarios |
| QA-023 | QA | Test UAT-22: Status Update | B | QA work validating domain scenarios |
| QA-024 | QA | Test UAT-23: SLA Reminder | B | QA work validating domain scenarios |
| QA-025 | QA | Test UAT-24: SLA Escalation | B | QA work validating domain scenarios |
| QA-026 | QA | Test UAT-25: No SubDist | B | QA work validating domain scenarios |
| QA-027 | QA | Test UAT-30: Invoice Gen | B | QA work validating domain scenarios |
| QA-028 | QA | Test UAT-31: Invoice Display | B | QA work validating domain scenarios |
| QA-029 | QA | Test UAT-32: Partial Payment | B | QA work validating domain scenarios |
| QA-030 | QA | Test UAT-33: Full Payment | B | QA work validating domain scenarios |
| QA-031 | QA | Test UAT-07: Estimated Poin | B | QA work validating domain scenarios |
| QA-032 | QA | Test UAT-08: Redeem Poin | B | QA work validating domain scenarios |
| QA-033 | QA | Test UAT-40: Below Threshold | B | QA work validating domain scenarios |
| QA-034 | QA | Test UAT-41: Pending Points | B | QA work validating domain scenarios |
| QA-035 | QA | Test UAT-42: Points Credited | B | QA work validating domain scenarios |
| QA-036 | QA | Test UAT-43: Gold 1.2x | B | QA work validating domain scenarios |
| QA-037 | QA | Test UAT-44: Platinum 1.5x | B | QA work validating domain scenarios |
| QA-038 | QA | Point calc unit tests | B | QA work validating domain scenarios |
| QA-039 | QA | Redemption unit tests | B | QA work validating domain scenarios |
| QA-040 | QA | Point trigger tests | B | QA work validating domain scenarios |
| QA-041 | QA | Test UAT-09: ERP Down | B | QA work validating domain scenarios |
| QA-042 | QA | Test UAT-10: Cold Start | B | QA work validating domain scenarios |
| QA-043 | QA | Test UAT-11: Profile Form | B | QA work validating domain scenarios |
| QA-044 | QA | Test UAT-12: Config Edit | B | QA work validating domain scenarios |
| QA-045 | QA | Test UAT-13: Config Audit | B | QA work validating domain scenarios |
| QA-046 | QA | Test UAT-13B: SLA Config | B | QA work validating domain scenarios |
| QA-047 | QA | Test UAT-14: Language | B | QA work validating domain scenarios |
| QA-048 | QA | Regression suite | B | QA work validating domain scenarios |
| QA-049 | QA | Performance baseline | A | QA work focused on integration/perf/security |
| QA-050 | QA | Final UAT sign-off | B | QA work validating domain scenarios |