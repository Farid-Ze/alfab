package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"
	"strings"
	"time"

	"github.com/joho/godotenv"

	"example.com/alfabeauty-b2b/internal/obs"
)

type leadRequest struct {
	BusinessName  string `json:"business_name"`
	ContactName   string `json:"contact_name"`
	PhoneWhatsApp string `json:"phone_whatsapp"`
	City          string `json:"city"`
	SalonType     string `json:"salon_type"`
	Consent       bool   `json:"consent"`

	// Honeypot field: when set, the API should treat submission as spam and accept it
	// without persisting any user data.
	Honeypot string `json:"company"`
}

func main() {
	obs.Init()

	// Best-effort local dev convenience. In containers/CI, env should be injected.
	_ = godotenv.Load()

	baseURL := strings.TrimSpace(os.Getenv("SMOKE_BASE_URL"))
	if baseURL == "" || baseURL == "__CHANGE_ME__" {
		_ = godotenv.Overload()
		baseURL = strings.TrimSpace(os.Getenv("SMOKE_BASE_URL"))
	}
	if baseURL == "" || baseURL == "__CHANGE_ME__" {
		obs.Fatal("smoke_http_invalid_config", obs.Fields{"reason": "SMOKE_BASE_URL_required"})
	}
	baseURL = normalizeBaseURL(baseURL)

	adminToken := strings.TrimSpace(os.Getenv("SMOKE_ADMIN_TOKEN"))
	if adminToken == "" || adminToken == "__CHANGE_ME__" {
		// Fallback: reuse configured admin token if present.
		adminToken = strings.TrimSpace(os.Getenv("LEAD_API_ADMIN_TOKEN"))
	}
	if adminToken == "" || adminToken == "__CHANGE_ME__" {
		obs.Fatal("smoke_http_invalid_config", obs.Fields{"reason": "SMOKE_ADMIN_TOKEN_or_LEAD_API_ADMIN_TOKEN_required"})
	}

	if strings.HasPrefix(strings.ToLower(baseURL), "http://") {
		allowInsecure := strings.TrimSpace(strings.ToLower(os.Getenv("SMOKE_ALLOW_INSECURE")))
		if allowInsecure != "true" {
			obs.Fatal("smoke_http_guard_blocked", obs.Fields{"reason": "refusing_http_without_SMOKE_ALLOW_INSECURE_true"})
		}
	}

	client := &http.Client{Timeout: 8 * time.Second}

	// 1) /health
	if err := expectStatus(client, http.MethodGet, baseURL+"/health", nil, nil, http.StatusOK); err != nil {
		obs.Fatal("smoke_http_health_failed", obs.Fields{"error": err.Error()})
	}
	obs.Log("smoke_http_health_ok", obs.Fields{"url": baseURL + "/health"})

	// 2) /api/v1/leads (spam/honeypot path) — should not persist anything
	payload := leadRequest{
		BusinessName:  "SMOKE-HTTP",
		ContactName:   "Smoke",
		PhoneWhatsApp: "+6281111111111",
		City:          "Jakarta",
		SalonType:     "OTHER",
		Consent:       true,
		Honeypot:      "bot",
	}
	b, _ := json.Marshal(payload)

	headers := map[string]string{"Content-Type": "application/json; charset=utf-8"}
	if err := expectStatus(client, http.MethodPost, baseURL+"/api/v1/leads", bytes.NewReader(b), headers, http.StatusAccepted); err != nil {
		obs.Fatal("smoke_http_leads_honeypot_failed", obs.Fields{"error": err.Error()})
	}
	obs.Log("smoke_http_leads_honeypot_ok", obs.Fields{"route": "/api/v1/leads"})

	// 3) admin stats (read-only)
	authHeaders := map[string]string{
		"Authorization": "Bearer " + adminToken,
	}
	if err := expectStatus(client, http.MethodGet, baseURL+"/api/v1/admin/lead-notifications/stats", nil, authHeaders, http.StatusOK); err != nil {
		obs.Fatal("smoke_http_admin_stats_failed", obs.Fields{"error": err.Error()})
	}
	obs.Log("smoke_http_admin_stats_ok", obs.Fields{"route": "/api/v1/admin/lead-notifications/stats"})

	// 4) /metrics (admin-only, read-only)
	if err := expectStatus(client, http.MethodGet, baseURL+"/metrics", nil, authHeaders, http.StatusOK); err != nil {
		obs.Fatal("smoke_http_metrics_failed", obs.Fields{"error": err.Error()})
	}
	obs.Log("smoke_http_metrics_ok", obs.Fields{"route": "/metrics"})

	obs.Log("smoke_http_pass", obs.Fields{"result": "ok"})
	fmt.Println("SMOKE PASS: http endpoints OK (health + honeypot lead + admin stats + metrics)")
}

func normalizeBaseURL(raw string) string {
	s := strings.TrimSpace(raw)
	s = strings.TrimRight(s, "/")

	u, err := url.Parse(s)
	if err != nil || u.Scheme == "" || u.Host == "" {
		obs.Fatal("smoke_http_invalid_config", obs.Fields{"reason": "SMOKE_BASE_URL_must_be_absolute_url", "value": raw})
		return "" // unreachable
	}

	// On Windows, "localhost" commonly resolves to IPv6 ::1 first. Our dev server binds to
	// 0.0.0.0 (IPv4), so connecting to ::1 can fail with "actively refused".
	// Prefer IPv4 loopback for localhost URLs.
	if strings.EqualFold(u.Hostname(), "localhost") {
		from := s
		host := "127.0.0.1"
		if port := u.Port(); port != "" {
			host = host + ":" + port
		}
		u.Host = host
		s = strings.TrimRight(u.String(), "/")
		obs.Log("smoke_http_base_url_rewritten", obs.Fields{"from": from, "to": s, "reason": "prefer_ipv4_for_localhost"})
	}

	return s
}

func expectStatus(client *http.Client, method, url string, body io.Reader, headers map[string]string, want int) error {
	req, err := http.NewRequest(method, url, body)
	if err != nil {
		return fmt.Errorf("new request: %w", err)
	}
	for k, v := range headers {
		req.Header.Set(k, v)
	}

	resp, err := client.Do(req)
	if err != nil {
		return fmt.Errorf("do request: %w", err)
	}
	defer resp.Body.Close()

	// Read a small snippet for debugging if needed.
	snippet, _ := io.ReadAll(io.LimitReader(resp.Body, 1024))
	if resp.StatusCode != want {
		return fmt.Errorf("unexpected status %d (want %d); body=%q", resp.StatusCode, want, string(snippet))
	}
	return nil
}
