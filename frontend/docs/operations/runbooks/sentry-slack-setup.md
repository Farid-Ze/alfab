# Runbook: Sentry to Slack Integration

**ITIL Process**: Event Management / Incident Management
**Task ID**: 6
**Severity Target**: Sev 1 (Critical) to `#alerts-critical`, Sev 2 (High) to `#alerts-prod`

---

## 1. Prerequisites

- **Sentry Admin Access** for `alfabeauty` organization.
- **Slack Workspace Admin Access**.

## 2. Configuration Steps

### A. Install Integration

1. Go to **Sentry > Settings > Integrations**.
2. Search for **Slack** and click **Install**.
3. Authenticate with your Workspace.
4. Link the Sentry Project (`frontend`) to a specific Slack Channel (Recommended: `#monitoring-prod`).

### B. Configure Alert Rules (Sev 1)

To satisfy ITIL "Incident Management" triggers:

1. Navigate to **Alerts > Create Alert**.
2. Select **"Issues"** as the trigger type.
3. **Conditions**:
    - `WHEN` an event is captured.
    - `IF` Level is `Equal to` **Fatal** OR **Error**.
    - `AND` Environment is `Production`.
4. **Actions**:
    - Send a Slack notification to `#alerts-critical`.
    - Text: `🚨 Sev 1 Incident: ${issue.title} - ${issue.shortId}`.
5. **Throttle**:
    - Set action to trigger "At most once every 30 minutes" for specific issues to avoid noise fatigue.

### C. Configure Rate Limit Alerts

1. Create a separate alert for metric-based events.
2. `WHEN` "Transaction Rate" > 100 req/min (or matching our implementation).
3. Send to `#alerts-warning`.

## 3. Verification

1. Trigger a test error in Staging.
    - Use the "Generate Sample Event" button in Sentry Settings
    - OR navigate to `/global-error` (if route enabled for testing).
2. Verify the message appears in Slack.

---

> **Note**: This setup ensures that we move from "Passive Logging" to "Proactive Alerting", reducing MTTR (Mean Time To Resolution).
