package main

import (
	"log"
	"os"

	"github.com/joho/godotenv"

	"example.com/alfabeauty-b2b/internal/config"
	"example.com/alfabeauty-b2b/internal/handler"
	"example.com/alfabeauty-b2b/internal/repository/memory"
	"example.com/alfabeauty-b2b/internal/service"
)

func main() {
	// Best-effort local dev convenience. In containers/CI, env should be injected.
	_, _ = os.Stat(".env")
	_ = godotenv.Load()

	cfg, err := config.LoadFromEnv()
	if err != nil {
		log.Fatalf("config error: %v", err)
	}

	leadRepo := memory.NewLeadRepository()
	leadSvc := service.NewLeadService(leadRepo)

	app := handler.NewApp(cfg, leadSvc)

	log.Printf("listening on %s", cfg.Addr())
	if err := app.Listen(cfg.Addr()); err != nil {
		log.Fatalf("server stopped: %v", err)
	}
}
