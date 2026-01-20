// Package dbversion prints the current database migration version.
package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
	"github.com/pressly/goose/v3"

	"example.com/alfabeauty-b2b/internal/config"
	"example.com/alfabeauty-b2b/internal/database"
)

func main() {
	_ = godotenv.Load()

	cfg, err := config.LoadFromEnv()
	if err != nil {
		log.Fatalf("config error: %v", err)
	}

	if cfg.DatabaseURL == "" {
		fmt.Println("DATABASE_URL not set")
		os.Exit(1)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	db, err := database.Connect(ctx, cfg.DatabaseURL)
	if err != nil {
		log.Fatalf("database connection failed: %v", err)
	}
	defer db.Close()

	sqlDB, err := db.DB()
	if err != nil {
		log.Fatalf("failed to get sql.DB: %v", err)
	}

	version, err := goose.GetDBVersion(sqlDB)
	if err != nil {
		log.Fatalf("failed to get db version: %v", err)
	}

	fmt.Printf("Current database version: %d\n", version)
}
