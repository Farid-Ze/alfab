# Runbook: Incident Response

**Framework**: ITIL 4 (Incident Management)
**Severity Levels**: Defined in `monitoring.md`.

## Response Workflow

1. **Detect**: Alert fires (Slack `#alerts-critical`) or User Report.
2. **Categorize**: Assign Severity (Sev 1 - Sev 4).
3. **Investigate**: Check Sentry / Vercel Logs.
4. **Resolve**: Apply Fix.
5. **Review**: Post-Mortem.

## Common Scenarios & Playbooks

### Scenario A: Site Offline / "You are offline" Banner Persists

- **Trigger**: User reports Red/Yellow banner is stuck.
- **Cause**: Client network down or flaky connection.
- **Resolution**: Ask user to check internet. If widespread, check CDN status.

### Scenario B: Lead/Newsletter Submission Fails

- **Trigger**: User sees "Something went wrong" toast.
- **Diagnosis**: Check Logs for `[ERROR]`.
- **Fix**: Verify Supabase connection string. If Mock mode, verify `logger.info` is outputting.

### Scenario C: Rate Limit Triggered (429)

- **Trigger**: User reports "Too Many Requests" or `api/health` monitoring fails.
- **Cause**: IP Address has exceeded 100 requests/minute (Token Bucket).
- **Resolution**:
    1. Check `x-forwarded-for` in logs.
    2. If legitimate traffic (NAT/Office), consider whitelisting in `src/app/api/health/route.ts`.

### Scenario D: API/Database Outage (Supabase)

- **Trigger**: Sentry alerts `500` on `submit-lead` or users report "Cannot submit form".
- **Diagnosis**:
    1. Check [Supabase Status](https://status.supabase.com/).
    2. Attempt to log in to Supabase Dashboard.
- **Resolution**:
  - **Step 1**: Enable "Maintenance Mode" (Variable `MAINTENANCE_MODE=true`).
  - **Step 2**: If `leads` table is locked, check Disk/CPU limits.
  - **Step 3**: Activate Email-only fallback (which is automatic in `submit-lead.ts`).

### Scenario E: CMS Content Outage

- **Trigger**: Build fails with `Cannot read properties of undefined` (processing `products.json`).
- **Diagnosis**: Corrupted JSON or Merge Conflict markers.
- **Resolution**: Revert last commit to `src/content`.

### Scenario F: System Error with Correlation ID

- **Trigger**: User reports error code `digest: <ID>`.
- **Diagnosis**: Search logs for `requestId: <ID>`.
- **Action**: Use ID to pinpoint stack trace in Vercel Logs.

### Scenario G: CI/CD Build Failure

- **Trigger**: GitHub Action fails.
- **Fix**:
    1. Check `eslint` in Quality Gate.
    2. Check `sentry-upload` auth token.
