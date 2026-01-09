# Service Level Indicators (SLIs) & Objectives (SLOs)

**Project:** PT. Alfa Beauty Cosmetica B2B Platform
**Version:** 1.0
**Date:** January 08, 2026

---

## Overview

Dokumen ini mendefinisikan SLIs dan SLOs untuk platform B2B sesuai SRE best practices.

---

## 1. Availability SLIs/SLOs

### API Availability

| Metric | SLI | SLO | Measurement |
|--------|-----|-----|-------------|
| **Uptime** | Successful responses / Total requests | **99.9%** per month | Prometheus: `http_requests_total{status!~"5xx"}` |
| **Error Rate** | 5xx errors / Total requests | **< 0.1%** per month | Prometheus: `http_errors_total{status="5xx"}` |

### Calculation
```promql
# Availability
sum(rate(http_requests_total{status!~"5xx"}[30d])) 
/ sum(rate(http_requests_total[30d])) * 100
```

---

## 2. Latency SLIs/SLOs

### Response Time

| Endpoint Category | P50 | P95 | P99 |
|-------------------|-----|-----|-----|
| **Health Checks** | < 5ms | < 20ms | < 50ms |
| **Auth (Login)** | < 100ms | < 300ms | < 500ms |
| **Credit Check** | < 50ms | < 150ms | < 300ms |
| **Product List** | < 100ms | < 300ms | < 500ms |
| **Order Submit** | < 200ms | < 500ms | < 1s |

### Calculation
```promql
# P95 Latency
histogram_quantile(0.95, 
  sum(rate(http_request_duration_seconds_bucket[5m])) by (le, path)
)
```

---

## 3. Throughput SLIs/SLOs

| Metric | Target |
|--------|--------|
| **Peak RPS** | 100 requests/second |
| **Concurrent Connections** | 500 |
| **Order Processing** | 10 orders/minute sustained |

---

## 4. Business SLIs/SLOs

| Metric | SLI | SLO |
|--------|-----|-----|
| **Credit Check Accuracy** | Correct status returned | 100% |
| **Order Success Rate** | Successful orders / Submitted orders | > 95% |
| **WA Routing Success** | Routed orders / Total orders | > 99% |

---

## 5. Error Budget

### Monthly Error Budget

| SLO | Allowed Downtime/Errors |
|-----|-------------------------|
| 99.9% availability | 43.2 minutes/month |
| 99.95% availability | 21.6 minutes/month |
| 99.99% availability | 4.32 minutes/month |

### Policy
- **> 50% budget consumed:** Freeze non-critical deployments
- **> 80% budget consumed:** Focus on reliability
- **Budget exhausted:** Stop all deployments except hotfixes

---

## 6. Alerting Thresholds

### Critical (Page immediately)
- Error rate > 1% for 5 minutes
- P99 latency > 2s for 5 minutes
- Database unavailable
- Redis unavailable

### Warning (Notify in Slack)
- Error rate > 0.5% for 10 minutes
- P95 latency > 500ms for 10 minutes
- Error budget > 50% consumed

---

## 7. Monitoring Dashboard

### Key Metrics to Display

1. **Request Rate** — `rate(http_requests_total[1m])`
2. **Error Rate** — `rate(http_errors_total[1m]) / rate(http_requests_total[1m])`
3. **P95 Latency** — `histogram_quantile(0.95, ...)`
4. **Active Connections** — `http_requests_in_flight`
5. **Order Value** — `business_orders_value_total`

---

## 8. Review Schedule

- **Weekly:** Review error budget consumption
- **Monthly:** Review SLO achievement, adjust thresholds if needed
- **Quarterly:** Review SLO targets, update based on capacity

---

**Approved By:** CTO/CIO
**Date:** January 08, 2026
