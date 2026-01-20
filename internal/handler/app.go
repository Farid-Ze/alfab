package handler

import (
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/limiter"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"

	"example.com/alfabeauty-b2b/internal/config"
	"example.com/alfabeauty-b2b/internal/repository"
	"example.com/alfabeauty-b2b/pkg/httpx"
	"example.com/alfabeauty-b2b/pkg/metrics"
)

// Repositories holds all repository dependencies
type Repositories struct {
	Lead     repository.LeadRepository
	Product  repository.ProductRepository
	Brand    repository.BrandRepository
	Category repository.CategoryRepository
	Event    repository.EventRepository
}

// NewApp creates and configures the Fiber application
func NewApp(cfg config.Config, repos Repositories, appMetrics *metrics.Metrics) *fiber.App {
	app := fiber.New(fiber.Config{
		DisableStartupMessage: true,
		BodyLimit:             cfg.MaxBodyBytes,
		ErrorHandler:          customErrorHandler,
		ReadTimeout:           30 * time.Second,
		WriteTimeout:          30 * time.Second,
		IdleTimeout:           120 * time.Second,
	})

	// Middleware
	app.Use(recover.New())
	
	// Request tracking middleware
	app.Use(func(c *fiber.Ctx) error {
		appMetrics.HTTPRequestsTotal.Inc()
		appMetrics.ActiveConnections.Inc()
		defer appMetrics.ActiveConnections.Dec()
		
		start := time.Now()
		err := c.Next()
		duration := time.Since(start).Seconds()
		appMetrics.HTTPRequestDuration.Observe(duration)
		
		return err
	})

	if cfg.IsDevelopment() {
		app.Use(logger.New())
	}

	// CORS for frontend
	app.Use(cors.New(cors.Config{
		AllowOrigins:     joinOrigins(cfg.AllowedOrigins),
		AllowMethods:     "GET,POST,OPTIONS",
		AllowHeaders:     "Content-Type,Authorization",
		AllowCredentials: false,
	}))

	// Security headers
	app.Use(httpx.SecurityHeaders())
	app.Use(httpx.RequestID())

	// Health check
	app.Get("/health", healthHandler())

	// Metrics endpoint
	app.Get("/metrics", metricsHandler(appMetrics))

	// API routes
	api := app.Group("/api")

	// Public API (no auth required) - Paket A IDD spec
	public := api.Group("/public")

	// Rate limit for lead submissions (anti-spam)
	leadLimiter := limiter.New(limiter.Config{
		Max:        cfg.RateLimitRPS,
		Expiration: time.Minute,
		KeyGenerator: func(c *fiber.Ctx) string {
			return c.IP()
		},
		LimitReached: func(c *fiber.Ctx) error {
			return httpx.SendTooManyRequests(c, "Too many requests. Please wait a moment before trying again.")
		},
	})

	// Product catalog endpoints
	if repos.Product != nil {
		public.Get("/products", listProductsHandler(repos.Product, repos.Brand, repos.Category))
		public.Get("/products/:slug", getProductHandler(repos.Product, repos.Brand, repos.Category))
	}
	if repos.Brand != nil {
		public.Get("/brands", listBrandsHandler(repos.Brand))
	}
	if repos.Category != nil {
		public.Get("/categories", listCategoriesHandler(repos.Category))
	}

	// Events/Education endpoints
	if repos.Event != nil {
		public.Get("/events", listEventsHandler(repos.Event))
		public.Get("/events/:slug", getEventHandler(repos.Event))
	}

	// Lead API (Option B - Paket A spec section 5)
	if repos.Lead != nil {
		public.Post("/partner-leads", leadLimiter, createLeadHandler(repos.Lead, appMetrics))
	}

	// Site config (for frontend)
	public.Get("/config", siteConfigHandler(cfg))

	// Admin API (protected)
	admin := api.Group("/admin")
	admin.Use(adminAuth(cfg.AdminToken))
	if repos.Lead != nil {
		admin.Get("/leads", listLeadsHandler(repos.Lead))
		admin.Get("/leads/export", exportLeadsHandler(repos.Lead))
	}

	return app
}

// customErrorHandler provides consistent error responses
func customErrorHandler(c *fiber.Ctx, err error) error {
	code := fiber.StatusInternalServerError
	message := "Internal Server Error"

	if e, ok := err.(*fiber.Error); ok {
		code = e.Code
		message = e.Message
	}

	return c.Status(code).JSON(fiber.Map{
		"error":   message,
		"code":    code,
	})
}

// adminAuth middleware for protected endpoints
func adminAuth(token string) fiber.Handler {
	return func(c *fiber.Ctx) error {
		auth := c.Get("Authorization")
		if auth == "" {
			return httpx.SendUnauthorized(c, "Authorization header required")
		}

		// Expect "Bearer <token>"
		if len(auth) < 7 || auth[:7] != "Bearer " {
			return httpx.SendUnauthorized(c, "Invalid authorization format")
		}

		if auth[7:] != token {
			return httpx.SendForbidden(c, "Invalid token")
		}

		return c.Next()
	}
}

// metricsHandler returns application metrics
func metricsHandler(m *metrics.Metrics) fiber.Handler {
	return func(c *fiber.Ctx) error {
		return c.JSON(m.Snapshot())
	}
}

func joinOrigins(origins []string) string {
	result := ""
	for i, o := range origins {
		if i > 0 {
			result += ","
		}
		result += o
	}
	return result
}
