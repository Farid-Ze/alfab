package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/jackc/pgx/v5/stdlib"
)

func main() {
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		log.Fatalf("DATABASE_URL is required")
	}

	db, err := sql.Open("pgx", dbURL)
	if err != nil {
		log.Fatalf("open db: %v", err)
	}
	defer db.Close()

	if err := db.Ping(); err != nil {
		log.Fatalf("ping db: %v", err)
	}

	fmt.Println("== leads RLS flags ==")
	var rls, force bool
	if err := db.QueryRow(`
		SELECT c.relrowsecurity, c.relforcerowsecurity
		FROM pg_class c
		JOIN pg_namespace n ON n.oid = c.relnamespace
		WHERE n.nspname = 'public' AND c.relname = 'leads'
	`).Scan(&rls, &force); err != nil {
		log.Fatalf("query rls flags: %v", err)
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
		log.Fatalf("query policies: %v", err)
	}
	defer rows.Close()

	count := 0
	for rows.Next() {
		var name, cmd string
		if err := rows.Scan(&name, &cmd); err != nil {
			log.Fatalf("scan policy: %v", err)
		}
		count++
		fmt.Printf("- %s (%s)\n", name, cmd)
	}
	if err := rows.Err(); err != nil {
		log.Fatalf("rows: %v", err)
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
		log.Fatalf("query grants: %v", err)
	}
	defer grows.Close()

	gcount := 0
	for grows.Next() {
		var grantee, priv string
		if err := grows.Scan(&grantee, &priv); err != nil {
			log.Fatalf("scan grant: %v", err)
		}
		gcount++
		fmt.Printf("- %s: %s\n", grantee, priv)
	}
	if err := grows.Err(); err != nil {
		log.Fatalf("rows: %v", err)
	}
	if gcount == 0 {
		fmt.Println("(no grants)")
	}
}
