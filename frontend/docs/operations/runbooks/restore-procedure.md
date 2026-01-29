# Restore & Rollback Procedure (ITIL 4)

**Scope**: Production Environment Recovery.
**Framework**: ITIL 4 Incident Management (Recovery Phase).
**Roles**: DevOps Lead, CTO.

## 1. Frontend Rollback (Vercel)

**Scenario**: Bad deployment caused UI crash or critical bug.
**RTO (Recovery Time Objective)**: < 2 minutes.

### Procedure (Instant Rollback)

1. **Login** to [Vercel Dashboard](https://vercel.com).
2. Go to **Deployments** tab.
3. Identify the **last known good deployment** (Green checkmark).
4. Click the **three dots menu (...)** -> **"Instant Rollback"**.
5. **Confirm**. Vercel will immediately route traffic to the old immutable deployment.
6. **Verify**: Check production URL to ensure stability.

*Note: This does not revert the Git `main` branch. You must follow up with a `git revert` PR.*

## 2. Database Restore (Supabase)

**Scenario**: Data corruption, accidental deletion, or bad migration.
**RTO**: < 60 minutes.

### Option A: Point-In-Time Recovery (PITR) - Enterprise/Pro

*Use for granular recovery to a specific timestamp.*

1. Login to **Supabase Dashboard** > **Database** > **Backups**.
2. Select **PITR**.
3. Choose the specific **Timezone** and **Timestamp** (e.g., 5 minutes before the incident).
4. **Initiate Restore**. (Note: This may restart the project).

### Option B: Daily Backup (Free Tier)

1. Login to **Supabase Dashboard** > **Database** > **Backups**.
2. Select the latest **Daily Backup**.
3. Click **Restore**.
4. **Warning**: Any data written *after* the backup time will be lost.

### Option C: Manual Row Restore (Minor Incidents)

1. If only a few rows were deleted, check **Table Editor**.
2. Use the `deleted_at` column if Soft Deletes are implemented.
3. Manually re-insert data from local CSV exports (if available from `admin/export`).

## 3. Post-Restore Communication

**Channel**: Slack `#alerts-critical`

```text
🚨 **INCIDENT RESOLVED - ROLLBACK COMPLETE**

**Service**: Frontend / Database
**Action**: Rolled back to version [commit-hash] / Backup [timestamp]
**Status**: Operational
**Next Steps**: Post-mortem investigation in progress.
```
