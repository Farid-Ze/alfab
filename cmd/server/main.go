package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/joho/godotenv"

	"example.com/alfabeauty-b2b/internal/config"
	"example.com/alfabeauty-b2b/internal/database"
	"example.com/alfabeauty-b2b/internal/handler"
	"example.com/alfabeauty-b2b/internal/notify"
	"example.com/alfabeauty-b2b/internal/repository/memory"
	"example.com/alfabeauty-b2b/internal/repository/postgres"
	"example.com/alfabeauty-b2b/internal/service"
	"example.com/alfabeauty-b2b/pkg/metrics"
)

func main() {
	// Load .env file for local development
	_ = godotenv.Load()

	cfg, err := config.LoadFromEnv()
	if err != nil {
		log.Fatalf("config error: %v", err)
	}

	// Initialize metrics
	appMetrics := metrics.NewMetrics()

	// Initialize notifier
	notifier := notify.NewNotifier(cfg)

	// Initialize repositories
	var repos handler.Repositories

	if cfg.DatabaseURL != "" {
		// Production mode: use PostgreSQL
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		db, err := database.Connect(ctx, cfg.DatabaseURL)
		if err != nil {
			log.Fatalf("database connection failed: %v", err)
		}
		defer db.Close()

		repos = handler.Repositories{
			Lead: postgres.NewLeadRepository(db.Pool()),
			// Product, Brand, Category, Event repos would be added here
		}
		log.Println("✓ Connected to PostgreSQL database")
	} else {
		// Demo mode: use in-memory repositories
		repos = handler.Repositories{
			Lead:     memory.NewLeadRepository(),
			Product:  memory.NewProductRepository(),
			Brand:    memory.NewBrandRepository(),
			Category: memory.NewCategoryRepository(),
			Event:    memory.NewEventRepository(),
		}
		log.Println("⚠ Running in demo mode with in-memory storage")
	}

	// Initialize services
	leadService := service.NewLeadService(repos.Lead, notifier)
	_ = leadService // Will be used by handlers

	// Create HTTP server
	app := handler.NewApp(cfg, repos, appMetrics)

	// Start server in goroutine
	go func() {
		log.Println("=================================================")
		log.Println("  PT. Alfa Beauty Cosmetica - B2B API Server")
		log.Println("=================================================")
		log.Printf("  Environment: %s", cfg.Env)
		log.Printf("  Listening on: http://localhost%s", cfg.Addr())
		log.Println("")
		log.Println("  API Endpoints:")
		log.Println("    GET  /health")
		log.Println("    GET  /metrics")
		log.Println("    GET  /api/public/config")
		log.Println("    GET  /api/public/products")
		log.Println("    GET  /api/public/products/:slug")
		log.Println("    GET  /api/public/brands")
		log.Println("    GET  /api/public/categories")
		log.Println("    GET  /api/public/events")
		log.Println("    GET  /api/public/events/:slug")
		log.Println("    POST /api/public/partner-leads")
		log.Println("")
		log.Println("  Admin Endpoints (requires Authorization header):")
		log.Println("    GET  /api/admin/leads")
		log.Println("    GET  /api/admin/leads/export")
		log.Println("=================================================")

		if err := app.Listen(cfg.Addr()); err != nil {
			log.Fatalf("server error: %v", err)
		}
	}()

	// Graceful shutdown
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Println("Shutting down server...")

	if err := app.ShutdownWithTimeout(30 * time.Second); err != nil {
		log.Printf("Server shutdown error: %v", err)
	}

	log.Println("Server stopped")
}
