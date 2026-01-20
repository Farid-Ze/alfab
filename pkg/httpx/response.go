// Package httpx provides HTTP utilities and middleware.
package httpx

import (
	"time"

	"github.com/gofiber/fiber/v2"
)

// Response is a standard API response structure
type Response struct {
	Success   bool        `json:"success"`
	Data      interface{} `json:"data,omitempty"`
	Error     *ErrorInfo  `json:"error,omitempty"`
	Timestamp string      `json:"timestamp"`
}

// ErrorInfo contains error details
type ErrorInfo struct {
	Code    string `json:"code"`
	Message string `json:"message"`
}

// Success returns a success response
func Success(data interface{}) Response {
	return Response{
		Success:   true,
		Data:      data,
		Timestamp: time.Now().UTC().Format(time.RFC3339),
	}
}

// Error returns an error response
func Error(code, message string) Response {
	return Response{
		Success: false,
		Error: &ErrorInfo{
			Code:    code,
			Message: message,
		},
		Timestamp: time.Now().UTC().Format(time.RFC3339),
	}
}

// SendSuccess sends a success JSON response
func SendSuccess(c *fiber.Ctx, data interface{}) error {
	return c.JSON(Success(data))
}

// SendCreated sends a 201 Created response
func SendCreated(c *fiber.Ctx, data interface{}) error {
	return c.Status(fiber.StatusCreated).JSON(Success(data))
}

// SendError sends an error JSON response
func SendError(c *fiber.Ctx, status int, code, message string) error {
	return c.Status(status).JSON(Error(code, message))
}

// SendBadRequest sends a 400 Bad Request response
func SendBadRequest(c *fiber.Ctx, message string) error {
	return SendError(c, fiber.StatusBadRequest, "bad_request", message)
}

// SendUnauthorized sends a 401 Unauthorized response
func SendUnauthorized(c *fiber.Ctx, message string) error {
	return SendError(c, fiber.StatusUnauthorized, "unauthorized", message)
}

// SendForbidden sends a 403 Forbidden response
func SendForbidden(c *fiber.Ctx, message string) error {
	return SendError(c, fiber.StatusForbidden, "forbidden", message)
}

// SendNotFound sends a 404 Not Found response
func SendNotFound(c *fiber.Ctx, message string) error {
	return SendError(c, fiber.StatusNotFound, "not_found", message)
}

// SendTooManyRequests sends a 429 Too Many Requests response
func SendTooManyRequests(c *fiber.Ctx, message string) error {
	return SendError(c, fiber.StatusTooManyRequests, "rate_limit_exceeded", message)
}

// SendInternalError sends a 500 Internal Server Error response
func SendInternalError(c *fiber.Ctx, message string) error {
	return SendError(c, fiber.StatusInternalServerError, "internal_error", message)
}
