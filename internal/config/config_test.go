package config

import (
	"os"
	"testing"
)

func TestLoadFromEnv_Minimum(t *testing.T) {
	t.Setenv("LEAD_API_ADMIN_TOKEN", "dev-secret")
	t.Setenv("LEAD_API_RATE_LIMIT_RPS", "5")
	t.Setenv("LEAD_API_MAX_BODY_BYTES", "123")
	t.Setenv("PORT", "9999")

	cfg, err := LoadFromEnv()
	if err != nil {
		t.Fatalf("expected no error, got %v", err)
	}
	if cfg.Port != "9999" {
		t.Fatalf("expected port 9999, got %q", cfg.Port)
	}
	if cfg.MaxBodyBytes != 123 {
		t.Fatalf("expected max body 123, got %d", cfg.MaxBodyBytes)
	}
	if cfg.RateLimitRPS != 5 {
		t.Fatalf("expected rps 5, got %d", cfg.RateLimitRPS)
	}
}

func TestLoadFromEnv_MissingAdminToken(t *testing.T) {
	_ = os.Unsetenv("LEAD_API_ADMIN_TOKEN")
	_, err := LoadFromEnv()
	if err == nil {
		t.Fatalf("expected error")
	}
}
