-- +goose Up
-- +goose StatementBegin
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS business_name text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS contact_name text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS phone_whatsapp text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS city text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS salon_type text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS consent boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS chair_count integer,
  ADD COLUMN IF NOT EXISTS specialization text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS current_brands_used text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS monthly_spend_range text NOT NULL DEFAULT '';

-- Helpful indexes for ops/export filtering (lightweight).
CREATE INDEX IF NOT EXISTS leads_created_at_desc_idx ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS leads_phone_whatsapp_idx ON public.leads (phone_whatsapp);
CREATE INDEX IF NOT EXISTS leads_city_idx ON public.leads (city);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP INDEX IF EXISTS public.leads_city_idx;
DROP INDEX IF EXISTS public.leads_phone_whatsapp_idx;
DROP INDEX IF EXISTS public.leads_created_at_desc_idx;

ALTER TABLE public.leads
  DROP COLUMN IF EXISTS monthly_spend_range,
  DROP COLUMN IF EXISTS current_brands_used,
  DROP COLUMN IF EXISTS specialization,
  DROP COLUMN IF EXISTS chair_count,
  DROP COLUMN IF EXISTS consent,
  DROP COLUMN IF EXISTS salon_type,
  DROP COLUMN IF EXISTS city,
  DROP COLUMN IF EXISTS phone_whatsapp,
  DROP COLUMN IF EXISTS contact_name,
  DROP COLUMN IF EXISTS business_name;
-- +goose StatementEnd
