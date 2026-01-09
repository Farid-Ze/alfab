package config

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

type Config struct {
	Env            string
	Port           string
	AdminToken     string
	RateLimitRPS   int
	MaxBodyBytes   int
	AnalyticsURL   string
	SentryDSN      string
	DatabaseURL    string
	TrustedProxies string
}

func (c Config) Addr() string {
	port := strings.TrimSpace(c.Port)
	if port == "" {
		port = "8080"
	}
	return ":" + port
}

func LoadFromEnv() (Config, error) {
	cfg := Config{}

	cfg.Env = strings.TrimSpace(getenvDefault("APP_ENV", "development"))
	cfg.Port = strings.TrimSpace(getenvDefault("PORT", "8080"))

	cfg.AdminToken = strings.TrimSpace(os.Getenv("LEAD_API_ADMIN_TOKEN"))

	var err error
	cfg.RateLimitRPS, err = intFromEnv("LEAD_API_RATE_LIMIT_RPS", 5)
	if err != nil {
		return Config{}, err
	}
	cfg.MaxBodyBytes, err = intFromEnv("LEAD_API_MAX_BODY_BYTES", 65536)
	if err != nil {
		return Config{}, err
	}

	cfg.AnalyticsURL = strings.TrimSpace(os.Getenv("ANALYTICS_ENDPOINT_URL"))
	cfg.SentryDSN = strings.TrimSpace(os.Getenv("SENTRY_DSN"))

	cfg.DatabaseURL = strings.TrimSpace(os.Getenv("DATABASE_URL"))
	cfg.TrustedProxies = strings.TrimSpace(os.Getenv("TRUSTED_PROXIES"))

	// Minimal safety checks.
	if cfg.MaxBodyBytes <= 0 {
		return Config{}, fmt.Errorf("LEAD_API_MAX_BODY_BYTES must be > 0")
	}
	if cfg.RateLimitRPS <= 0 {
		return Config{}, fmt.Errorf("LEAD_API_RATE_LIMIT_RPS must be > 0")
	}
	if cfg.AdminToken == "" {
		return Config{}, fmt.Errorf("LEAD_API_ADMIN_TOKEN is required")
	}
	if isPlaceholder(cfg.AdminToken) {
		// Allow running in dev, but fail fast elsewhere.
		if cfg.Env != "development" {
			return Config{}, fmt.Errorf("LEAD_API_ADMIN_TOKEN must be set to a real secret (got placeholder)")
		}
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
	return s == "__CHANGE_ME__" || strings.Contains(s, "CHANGE_ME")
}
