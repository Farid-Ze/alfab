package main

import (
	"database/sql"
	"fmt"
	"os"

	"github.com/joho/godotenv"

	"example.com/alfabeauty-b2b/internal/obs"

	_ "github.com/jackc/pgx/v5/stdlib"
)

func main() {
	obs.Init()

	// Best-effort local dev convenience. In containers/CI, env should be injected.
	_ = godotenv.Load()

	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" || dbURL == "__CHANGE_ME__" {
		_ = godotenv.Overload()
		dbURL = os.Getenv("DATABASE_URL")
	}
	if dbURL == "" || dbURL == "__CHANGE_ME__" {
		obs.Fatal("dbcheck_invalid_config", obs.Fields{"reason": "DATABASE_URL_required"})
	}

	db, err := sql.Open("pgx", dbURL)
	if err != nil {
		obs.Fatal("dbcheck_db_open_failed", obs.Fields{"error": err.Error()})
	}
	defer db.Close()

	if err := db.Ping(); err != nil {
		obs.Fatal("dbcheck_db_ping_failed", obs.Fields{"error": err.Error()})
	}

	fmt.Println("== leads RLS flags ==")
	var rls, force bool
	if err := db.QueryRow(`
		SELECT c.relrowsecurity, c.relforcerowsecurity
		FROM pg_class c
		JOIN pg_namespace n ON n.oid = c.relnamespace
		WHERE n.nspname = 'public' AND c.relname = 'leads'
	`).Scan(&rls, &force); err != nil {
		obs.Fatal("dbcheck_query_failed", obs.Fields{"query": "leads_rls_flags", "error": err.Error()})
	}
	fmt.Printf("RLS enabled: %v\n", rls)
	fmt.Printf("RLS forced:  %v\n", force)

	fmt.Println("\n== leads policies ==")
	rows, err := db.Query(`
		SELECT policyname, cmd
		FROM pg_policies
		WHERE schemaname = 'public' AND tablename = 'leads'
		ORDER BY policyname
	`)
	if err != nil {
		obs.Fatal("dbcheck_query_failed", obs.Fields{"query": "leads_policies", "error": err.Error()})
	}
	defer rows.Close()

	count := 0
	for rows.Next() {
		var name, cmd string
		if err := rows.Scan(&name, &cmd); err != nil {
			obs.Fatal("dbcheck_scan_failed", obs.Fields{"row": "leads_policy", "error": err.Error()})
		}
		count++
		fmt.Printf("- %s (%s)\n", name, cmd)
	}
	if err := rows.Err(); err != nil {
		obs.Fatal("dbcheck_rows_failed", obs.Fields{"rows": "leads_policies", "error": err.Error()})
	}
	if count == 0 {
		fmt.Println("(no policies)")
	}

	fmt.Println("\n== grants to anon/authenticated ==")
	grows, err := db.Query(`
		SELECT grantee, privilege_type
		FROM information_schema.role_table_grants
		WHERE table_schema = 'public'
		  AND table_name = 'leads'
		  AND grantee IN ('anon','authenticated')
		ORDER BY grantee, privilege_type
	`)
	if err != nil {
		obs.Fatal("dbcheck_query_failed", obs.Fields{"query": "leads_grants", "error": err.Error()})
	}
	defer grows.Close()

	gcount := 0
	for grows.Next() {
		var grantee, priv string
		if err := grows.Scan(&grantee, &priv); err != nil {
			obs.Fatal("dbcheck_scan_failed", obs.Fields{"row": "leads_grant", "error": err.Error()})
		}
		gcount++
		fmt.Printf("- %s: %s\n", grantee, priv)
	}
	if err := grows.Err(); err != nil {
		obs.Fatal("dbcheck_rows_failed", obs.Fields{"rows": "leads_grants", "error": err.Error()})
	}
	if gcount == 0 {
		fmt.Println("(no grants)")
	}

	fmt.Println("\n== leads idempotency schema ==")
	var hasColumn bool
	if err := db.QueryRow(`
		SELECT EXISTS(
			SELECT 1
			FROM information_schema.columns
			WHERE table_schema = 'public'
			  AND table_name = 'leads'
			  AND column_name = 'idempotency_key_hash'
		)
	`).Scan(&hasColumn); err != nil {
		obs.Fatal("dbcheck_query_failed", obs.Fields{"query": "leads_idempotency_column", "error": err.Error()})
	}
	if !hasColumn {
		fmt.Println("idempotency_key_hash column: MISSING")
	} else {
		fmt.Println("idempotency_key_hash column: OK")
	}

	var idxDef sql.NullString
	if err := db.QueryRow(`
		SELECT indexdef
		FROM pg_indexes
		WHERE schemaname = 'public'
		  AND tablename = 'leads'
		  AND indexname = 'leads_idempotency_key_hash_uidx'
	`).Scan(&idxDef); err != nil {
		// If not found, Scan returns sql.ErrNoRows.
		if err == sql.ErrNoRows {
			fmt.Println("leads_idempotency_key_hash_uidx: MISSING")
			return
		}
		obs.Fatal("dbcheck_query_failed", obs.Fields{"query": "leads_idempotency_index", "error": err.Error()})
	}
	if idxDef.Valid {
		fmt.Println("leads_idempotency_key_hash_uidx: OK")
		fmt.Printf("indexdef: %s\n", idxDef.String)
	}

	fmt.Println("\n==============================")
	fmt.Println("== lead_notifications checks ==")

	fmt.Println("\n== lead_notifications RLS flags ==")
	var nRLS, nForce bool
	if err := db.QueryRow(`
		SELECT c.relrowsecurity, c.relforcerowsecurity
		FROM pg_class c
		JOIN pg_namespace n ON n.oid = c.relnamespace
		WHERE n.nspname = 'public' AND c.relname = 'lead_notifications'
	`).Scan(&nRLS, &nForce); err != nil {
		obs.Fatal("dbcheck_query_failed", obs.Fields{"query": "lead_notifications_rls_flags", "error": err.Error()})
	}
	fmt.Printf("RLS enabled: %v\n", nRLS)
	fmt.Printf("RLS forced:  %v\n", nForce)

	fmt.Println("\n== lead_notifications policies ==")
	nrows, err := db.Query(`
		SELECT policyname, cmd
		FROM pg_policies
		WHERE schemaname = 'public' AND tablename = 'lead_notifications'
		ORDER BY policyname
	`)
	if err != nil {
		obs.Fatal("dbcheck_query_failed", obs.Fields{"query": "lead_notifications_policies", "error": err.Error()})
	}
	defer nrows.Close()

	ncount := 0
	for nrows.Next() {
		var name, cmd string
		if err := nrows.Scan(&name, &cmd); err != nil {
			obs.Fatal("dbcheck_scan_failed", obs.Fields{"row": "lead_notifications_policy", "error": err.Error()})
		}
		ncount++
		fmt.Printf("- %s (%s)\n", name, cmd)
	}
	if err := nrows.Err(); err != nil {
		obs.Fatal("dbcheck_rows_failed", obs.Fields{"rows": "lead_notifications_policies", "error": err.Error()})
	}
	if ncount == 0 {
		fmt.Println("(no policies)")
	}

	fmt.Println("\n== lead_notifications grants to anon/authenticated ==")
	ngrows, err := db.Query(`
		SELECT grantee, privilege_type
		FROM information_schema.role_table_grants
		WHERE table_schema = 'public'
		  AND table_name = 'lead_notifications'
		  AND grantee IN ('anon','authenticated')
		ORDER BY grantee, privilege_type
	`)
	if err != nil {
		obs.Fatal("dbcheck_query_failed", obs.Fields{"query": "lead_notifications_grants", "error": err.Error()})
	}
	defer ngrows.Close()

	ngcount := 0
	for ngrows.Next() {
		var grantee, priv string
		if err := ngrows.Scan(&grantee, &priv); err != nil {
			obs.Fatal("dbcheck_scan_failed", obs.Fields{"row": "lead_notifications_grant", "error": err.Error()})
		}
		ngcount++
		fmt.Printf("- %s: %s\n", grantee, priv)
	}
	if err := ngrows.Err(); err != nil {
		obs.Fatal("dbcheck_rows_failed", obs.Fields{"rows": "lead_notifications_grants", "error": err.Error()})
	}
	if ngcount == 0 {
		fmt.Println("(no grants)")
	}

	fmt.Println("\n== lead_notifications indexes ==")
	idxNames := []string{
		"lead_notifications_lead_channel_uidx",
		"lead_notifications_pending_idx",
		"lead_notifications_lead_id_idx",
		"lead_notifications_status_updated_at_idx",
	}
	for _, idx := range idxNames {
		var def sql.NullString
		err := db.QueryRow(`
			SELECT indexdef
			FROM pg_indexes
			WHERE schemaname = 'public'
			  AND tablename = 'lead_notifications'
			  AND indexname = $1
		`, idx).Scan(&def)
		if err != nil {
			if err == sql.ErrNoRows {
				fmt.Printf("%s: MISSING\n", idx)
				continue
			}
			obs.Fatal("dbcheck_query_failed", obs.Fields{"query": "lead_notifications_index", "index": idx, "error": err.Error()})
		}
		fmt.Printf("%s: OK\n", idx)
		if def.Valid {
			fmt.Printf("indexdef: %s\n", def.String)
		}
	}

	fmt.Println("\n== lead_notifications traceparent schema ==")
	var hasTraceparentCol bool
	if err := db.QueryRow(`
		SELECT EXISTS(
			SELECT 1
			FROM information_schema.columns
			WHERE table_schema = 'public'
			  AND table_name = 'lead_notifications'
			  AND column_name = 'traceparent'
		)
	`).Scan(&hasTraceparentCol); err != nil {
		obs.Fatal("dbcheck_query_failed", obs.Fields{"query": "lead_notifications_traceparent_column", "error": err.Error()})
	}
	if !hasTraceparentCol {
		fmt.Println("traceparent column: MISSING")
		return
	}
	fmt.Println("traceparent column: OK")

	var conValidated sql.NullBool
	err = db.QueryRow(`
		SELECT c.convalidated
		FROM pg_constraint c
		JOIN pg_class t ON t.oid = c.conrelid
		JOIN pg_namespace n ON n.oid = t.relnamespace
		WHERE n.nspname = 'public'
		  AND t.relname = 'lead_notifications'
		  AND c.conname = 'lead_notifications_traceparent_len_chk'
	`).Scan(&conValidated)
	if err != nil {
		if err == sql.ErrNoRows {
			fmt.Println("lead_notifications_traceparent_len_chk: MISSING")
			return
		}
		obs.Fatal("dbcheck_query_failed", obs.Fields{"query": "lead_notifications_traceparent_constraint", "error": err.Error()})
	}
	if conValidated.Valid {
		fmt.Printf("lead_notifications_traceparent_len_chk: OK (validated=%v)\n", conValidated.Bool)
	} else {
		fmt.Println("lead_notifications_traceparent_len_chk: OK")
	}

	var violations int
	if err := db.QueryRow(`
		SELECT COUNT(*)
		FROM public.lead_notifications
		WHERE traceparent IS NOT NULL
		  AND length(traceparent) > 256
	`).Scan(&violations); err != nil {
		obs.Fatal("dbcheck_query_failed", obs.Fields{"query": "lead_notifications_traceparent_violations", "error": err.Error()})
	}
	if violations != 0 {
		fmt.Printf("traceparent length violations: %d (EXPECTED 0)\n", violations)
	} else {
		fmt.Println("traceparent length violations: 0")
	}
}
