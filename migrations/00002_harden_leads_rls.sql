-- +goose Up
-- +goose StatementBegin
-- Harden lead data against accidental exposure via Supabase Data API.
-- Strategy: enable RLS and remove common grants for anon/authenticated.

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
	IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN
		REVOKE ALL ON TABLE public.leads FROM anon;
	END IF;
	IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') THEN
		REVOKE ALL ON TABLE public.leads FROM authenticated;
	END IF;
END
$$;
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE public.leads DISABLE ROW LEVEL SECURITY;
-- Note: we intentionally do NOT GRANT privileges back in down migration.
-- +goose StatementEnd
