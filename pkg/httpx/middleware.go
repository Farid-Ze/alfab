// Package httpx provides HTTP middleware.
package httpx

import (
	"github.com/gofiber/fiber/v2"
)

// SecurityHeaders adds security headers to all responses
func SecurityHeaders() fiber.Handler {
	return func(c *fiber.Ctx) error {
		c.Set("X-Content-Type-Options", "nosniff")
		c.Set("X-Frame-Options", "DENY")
		c.Set("Referrer-Policy", "strict-origin-when-cross-origin")
		c.Set("Permissions-Policy", "geolocation=(), microphone=(), camera=()")
		c.Set("X-XSS-Protection", "1; mode=block")
		
		// CSP - adjust based on your frontend needs
		c.Set("Content-Security-Policy", 
			"default-src 'self'; "+
			"img-src 'self' data: https:; "+
			"style-src 'self' 'unsafe-inline'; "+
			"script-src 'self' 'unsafe-inline' 'unsafe-eval'; "+
			"connect-src 'self' https:; "+
			"font-src 'self' https: data:; "+
			"object-src 'none'; "+
			"base-uri 'self'; "+
			"form-action 'self'")
		
		return c.Next()
	}
}

// RequestID adds a unique request ID to each request
func RequestID() fiber.Handler {
	return func(c *fiber.Ctx) error {
		// Check for existing request ID from upstream proxy
		reqID := c.Get("X-Request-ID")
		if reqID == "" {
			reqID = c.GetRespHeader("X-Request-ID")
		}
		if reqID == "" {
			// Generate a simple request ID (use UUID in production)
			reqID = generateRequestID()
		}
		
		c.Set("X-Request-ID", reqID)
		c.Locals("request_id", reqID)
		
		return c.Next()
	}
}

// generateRequestID generates a simple request ID
func generateRequestID() string {
	// Simple implementation - use UUID in production
	return "req_" + randomString(16)
}

// randomString generates a random string of given length
func randomString(length int) string {
	const charset = "abcdefghijklmnopqrstuvwxyz0123456789"
	result := make([]byte, length)
	for i := range result {
		result[i] = charset[i%len(charset)]
	}
	return string(result)
}
