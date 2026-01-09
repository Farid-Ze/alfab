package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/jackc/pgx/v5/stdlib"
	"github.com/pressly/goose/v3"
)

func main() {
	if len(os.Args) < 2 {
		log.Fatalf("usage: %s <up|down|status>", os.Args[0])
	}

	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" || dbURL == "__CHANGE_ME__" {
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

	if err := goose.SetDialect("postgres"); err != nil {
		log.Fatalf("set dialect: %v", err)
	}

	cmd := os.Args[1]
	migrationsDir := "migrations"

	switch cmd {
	case "up":
		if err := goose.Up(db, migrationsDir); err != nil {
			log.Fatalf("migrate up: %v", err)
		}
		fmt.Println("migrations applied")
	case "down":
		if err := goose.Down(db, migrationsDir); err != nil {
			log.Fatalf("migrate down: %v", err)
		}
		fmt.Println("migration rolled back")
	case "status":
		if err := goose.Status(db, migrationsDir); err != nil {
			log.Fatalf("migrate status: %v", err)
		}
	default:
		log.Fatalf("unknown command: %s", cmd)
	}
}
