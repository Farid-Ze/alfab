# Runbook: Key Rotation Drill (DSS05)

**Framework**: COBIT 2019 (DSS05 - Managed Security Services)
**Frequency**: Quarterly or upon compromised credentials.

## Procedure

1. **Generate New Key**:
    - Go to Supabase Dashboard > Settings > API.
    - Generate new `service_role` key.
2. **Update Environment**:
    - Update `SUPABASE_SERVICE_ROLE_KEY` in Vercel Environment Variables (Production & Preview).
    - Update local `.env` (distribute to team securely).
3. **Deploy**:
    - Trigger redeploy to propagate new env vars: `git commit --allow-empty -m "chore: rotate keys"`.
4. **Verify**:
    - Test critical path: `submit-lead` (which uses `supabaseAdmin`).
5. **Revoke**:
    - Revoke the OLD key in Supabase Dashboard.

## Drill Logs

| Drill ID | Date | Target | Outcome |
| :--- | :--- | :--- | :--- |
| **SEC-DRILL-2026-001** | 2026-01-28 | `SUPABASE_SERVICE_ROLE_KEY` | Success (Simulated) |
