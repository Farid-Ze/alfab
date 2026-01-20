// Package migrate runs database migrations.
package main

import (
	"context"
	"flag"
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

	var (
		direction = flag.String("dir", "up", "migration direction: up, down, status")
		steps     = flag.Int("steps", 0, "number of migrations to run (0 = all)")
	)
	flag.Parse()

	cfg, err := config.LoadFromEnv()
	if err != nil {
		log.Fatalf("config error: %v", err)
	}

	if cfg.DatabaseURL == "" {
		fmt.Println("DATABASE_URL not set")
		os.Exit(1)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Minute)
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

	goose.SetDialect("postgres")
	migrationsDir := "./migrations"

	switch *direction {
	case "up":
		if *steps > 0 {
			for i := 0; i < *steps; i++ {
				if err := goose.UpByOne(sqlDB, migrationsDir); err != nil {
					log.Fatalf("migration up failed: %v", err)
				}
			}
		} else {
			if err := goose.Up(sqlDB, migrationsDir); err != nil {
				log.Fatalf("migration up failed: %v", err)
			}
		}
		fmt.Println("✓ Migrations applied successfully")

	case "down":
		count := 1
		if *steps > 0 {
			count = *steps
		}
		for i := 0; i < count; i++ {
			if err := goose.Down(sqlDB, migrationsDir); err != nil {
				log.Fatalf("migration down failed: %v", err)
			}
		}
		fmt.Println("✓ Migrations rolled back successfully")

	case "status":
		if err := goose.Status(sqlDB, migrationsDir); err != nil {
			log.Fatalf("failed to get migration status: %v", err)
		}

	default:
		log.Fatalf("unknown direction: %s (use up, down, or status)", *direction)
	}
}
