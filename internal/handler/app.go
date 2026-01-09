package handler

import (
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/limiter"

	"example.com/alfabeauty-b2b/internal/config"
	"example.com/alfabeauty-b2b/internal/service"
)

func NewApp(cfg config.Config, leadSvc *service.LeadService) *fiber.App {
	app := fiber.New(fiber.Config{
		DisableStartupMessage: true,
		BodyLimit:            cfg.MaxBodyBytes,
	})

	app.Get("/health", healthHandler())

	api := app.Group("/api")
	v1 := api.Group("/v1")

	// Rate limit lead intake endpoints.
	leadLimiter := limiter.New(limiter.Config{
		Max:        cfg.RateLimitRPS,
		Expiration: time.Second,
		KeyGenerator: func(c *fiber.Ctx) string {
			// Prefer client IP; with trusted proxies this can be upgraded later.
			return c.IP()
		},
	})

	v1.Post("/leads", leadLimiter, createLeadHandler(leadSvc))

	return app
}
