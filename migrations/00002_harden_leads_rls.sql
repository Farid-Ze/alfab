-- +goose Up
-- +goose StatementBegin
-- Harden lead data against accidental exposure via Supabase Data API.
-- Strategy: enable RLS and remove common grants for anon/authenticated.

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.leads FROM anon;
REVOKE ALL ON TABLE public.leads FROM authenticated;
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE public.leads DISABLE ROW LEVEL SECURITY;
-- Note: we intentionally do NOT GRANT privileges back in down migration.
-- +goose StatementEnd
