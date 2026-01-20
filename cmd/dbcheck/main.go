// Package dbcheck provides a health check utility for database connectivity.
package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"

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
		fmt.Println("DATABASE_URL not set, skipping database check")
		os.Exit(0)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	db, err := database.Connect(ctx, cfg.DatabaseURL)
	if err != nil {
		log.Fatalf("database connection failed: %v", err)
	}
	defer db.Close()

	if err := db.Ping(ctx); err != nil {
		log.Fatalf("database ping failed: %v", err)
	}

	fmt.Println("✓ Database connection successful")
}
