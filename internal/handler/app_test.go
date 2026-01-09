package handler

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"example.com/alfabeauty-b2b/internal/config"
	"example.com/alfabeauty-b2b/internal/repository/memory"
	"example.com/alfabeauty-b2b/internal/service"
)

func TestHealth(t *testing.T) {
	cfg := config.Config{MaxBodyBytes: 1024, RateLimitRPS: 5, AdminToken: "__CHANGE_ME__"}
	leadSvc := service.NewLeadService(memory.NewLeadRepository())
	app := NewApp(cfg, leadSvc)

	req := httptest.NewRequest(http.MethodGet, "/health", nil)
	resp, err := app.Test(req)
	if err != nil {
		t.Fatalf("app.Test: %v", err)
	}
	if resp.StatusCode != http.StatusOK {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}
}
