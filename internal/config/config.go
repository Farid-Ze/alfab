package config

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

// Config holds application configuration
type Config struct {
	// Environment
	Env  string
	Port string

	// Security
	AdminToken     string
	AllowedOrigins []string

	// Rate limiting
	RateLimitRPS int
	MaxBodyBytes int

	// Database
	DatabaseURL string

	// External services
	AnalyticsURL  string
	SentryDSN     string
	WebhookURL    string
	WebhookSecret string

	// WhatsApp config (Paket A spec)
	WhatsAppNumber  string
	WhatsAppMessage string
	FallbackEmail   string

	// Proxy config
	TrustedProxies string
}

// Addr returns the server address
func (c Config) Addr() string {
	port := strings.TrimSpace(c.Port)
	if port == "" {
		port = "8080"
	}
	return ":" + port
}

// IsDevelopment returns true if running in development mode
func (c Config) IsDevelopment() bool {
	return c.Env == "development" || c.Env == "dev" || c.Env == ""
}

// IsProduction returns true if running in production mode
func (c Config) IsProduction() bool {
	return c.Env == "production" || c.Env == "prod"
}

// LoadFromEnv loads configuration from environment variables
func LoadFromEnv() (Config, error) {
	cfg := Config{}

	// Environment
	cfg.Env = strings.TrimSpace(getenvDefault("APP_ENV", "development"))
	cfg.Port = strings.TrimSpace(getenvDefault("PORT", "8080"))

	// Security
	cfg.AdminToken = strings.TrimSpace(os.Getenv("LEAD_API_ADMIN_TOKEN"))
	if cfg.AdminToken == "" {
		cfg.AdminToken = "demo-admin-token" // Default for demo mode
	}

	// CORS origins
	originsStr := strings.TrimSpace(getenvDefault("ALLOWED_ORIGINS", "http://localhost:3000"))
	cfg.AllowedOrigins = strings.Split(originsStr, ",")
	for i, origin := range cfg.AllowedOrigins {
		cfg.AllowedOrigins[i] = strings.TrimSpace(origin)
	}

	// Rate limiting
	var err error
	cfg.RateLimitRPS, err = intFromEnv("LEAD_API_RATE_LIMIT_RPS", 5)
	if err != nil {
		return Config{}, err
	}
	cfg.MaxBodyBytes, err = intFromEnv("LEAD_API_MAX_BODY_BYTES", 65536)
	if err != nil {
		return Config{}, err
	}

	// Database
	cfg.DatabaseURL = strings.TrimSpace(os.Getenv("DATABASE_URL"))

	// External services
	cfg.AnalyticsURL = strings.TrimSpace(os.Getenv("ANALYTICS_ENDPOINT_URL"))
	cfg.SentryDSN = strings.TrimSpace(os.Getenv("SENTRY_DSN"))
	cfg.WebhookURL = strings.TrimSpace(os.Getenv("WEBHOOK_URL"))
	cfg.WebhookSecret = strings.TrimSpace(os.Getenv("WEBHOOK_SECRET"))

	// WhatsApp config (Paket A spec - CTA strategy)
	cfg.WhatsAppNumber = strings.TrimSpace(getenvDefault("WHATSAPP_NUMBER", "+6281234567890"))
	cfg.WhatsAppMessage = strings.TrimSpace(getenvDefault("WHATSAPP_MESSAGE", "Halo, saya tertarik dengan produk Alfa Beauty"))
	cfg.FallbackEmail = strings.TrimSpace(getenvDefault("FALLBACK_EMAIL", "info@alfabeauty.co.id"))

	// Proxy config
	cfg.TrustedProxies = strings.TrimSpace(os.Getenv("TRUSTED_PROXIES"))

	// Validation
	if cfg.MaxBodyBytes <= 0 {
		return Config{}, fmt.Errorf("LEAD_API_MAX_BODY_BYTES must be > 0")
	}
	if cfg.RateLimitRPS <= 0 {
		return Config{}, fmt.Errorf("LEAD_API_RATE_LIMIT_RPS must be > 0")
	}

	// In production, require real admin token
	if cfg.IsProduction() && isPlaceholder(cfg.AdminToken) {
		return Config{}, fmt.Errorf("LEAD_API_ADMIN_TOKEN must be set to a real secret in production")
	}

	return cfg, nil
}

func getenvDefault(key, def string) string {
	v := strings.TrimSpace(os.Getenv(key))
	if v == "" {
		return def
	}
	return v
}

func intFromEnv(key string, def int) (int, error) {
	raw := strings.TrimSpace(os.Getenv(key))
	if raw == "" {
		return def, nil
	}
	v, err := strconv.Atoi(raw)
	if err != nil {
		return 0, fmt.Errorf("invalid %s: %w", key, err)
	}
	return v, nil
}

func isPlaceholder(s string) bool {
	s = strings.TrimSpace(strings.ToUpper(s))
	return s == "__CHANGE_ME__" || strings.Contains(s, "CHANGE_ME") || s == "DEMO-ADMIN-TOKEN"
}
