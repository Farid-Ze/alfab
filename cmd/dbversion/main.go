package main

import (
	"context"
	"database/sql"
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/joho/godotenv"

	"example.com/alfabeauty-b2b/internal/obs"

	_ "github.com/jackc/pgx/v5/stdlib"
)

func main() {
	obs.Init()

	// Best-effort local dev convenience. In containers/CI, env should be injected.
	_ = godotenv.Load()

	dbURL := strings.TrimSpace(os.Getenv("DATABASE_URL"))
	if dbURL == "" || dbURL == "__CHANGE_ME__" {
		_ = godotenv.Overload()
		dbURL = strings.TrimSpace(os.Getenv("DATABASE_URL"))
	}
	if dbURL == "" || dbURL == "__CHANGE_ME__" {
		obs.Fatal("dbversion_invalid_config", obs.Fields{"reason": "DATABASE_URL_required"})
	}

	db, err := sql.Open("pgx", dbURL)
	if err != nil {
		obs.Fatal("dbversion_db_open_failed", obs.Fields{"error": err.Error()})
	}
	defer db.Close()

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var v string
	if err := db.QueryRowContext(ctx, `select version();`).Scan(&v); err != nil {
		obs.Fatal("dbversion_query_failed", obs.Fields{"query": "version", "error": err.Error()})
	}
	fmt.Println(v)
}
