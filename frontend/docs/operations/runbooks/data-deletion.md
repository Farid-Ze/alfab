# Runbook: Data Deletion (Right to Erasure)

**Regulation**: UU PDP (Indonesia) / GDPR (Article 17).
**Processor**: IT Operations

## 1. Request Receipt

- **Channel**: Email to `alfabeautycosmeticaa@gmail.com` or Support Ticket.
- **Verification**: Verify identity via Email Confirmation loop.

## 2. Execution (Supabase)

### A. Via Dashboard

1. Go to `leads` table.
2. Filter by `email` or `phone`.
3. Select row -> `Delete 1 row`.

### B. Via SQL (Bulk)

```sql
DELETE FROM leads WHERE email = 'target@example.com';
```

## 3. Confirmation

- Reply to user confirming deletion within 72 hours.
- Log the deletion event (without PII) in the Privacy Log.
