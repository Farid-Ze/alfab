-- +goose Up
-- +goose StatementBegin
-- Trace correlation for async worker:
-- store request-origin traceparent on outbox rows so send attempts can attach exemplars
-- and downstream integrations can receive trace context.

ALTER TABLE public.lead_notifications
  ADD COLUMN IF NOT EXISTS traceparent text;

-- Guardrail: keep size bounded (W3C traceparent is ~55 chars).
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint c
    JOIN pg_class t ON t.oid = c.conrelid
    JOIN pg_namespace n ON n.oid = t.relnamespace
    WHERE n.nspname = 'public'
      AND t.relname = 'lead_notifications'
      AND c.conname = 'lead_notifications_traceparent_len_chk'
  ) THEN
    ALTER TABLE public.lead_notifications
      ADD CONSTRAINT lead_notifications_traceparent_len_chk
      CHECK (traceparent IS NULL OR length(traceparent) <= 256);
  END IF;
END
$$;
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE public.lead_notifications
  DROP CONSTRAINT IF EXISTS lead_notifications_traceparent_len_chk;

ALTER TABLE public.lead_notifications
  DROP COLUMN IF EXISTS traceparent;
-- +goose StatementEnd
