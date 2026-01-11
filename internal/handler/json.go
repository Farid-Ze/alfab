package handler

import (
	"encoding/json"

	"github.com/gofiber/fiber/v2"
)

const jsonUTF8 = "application/json; charset=utf-8"

// writeJSON writes a JSON response with an explicit UTF-8 charset.
// Fiber's c.JSON uses "application/json" by default; Paket A §15 expects charset.
func writeJSON(c *fiber.Ctx, status int, v any) error {
	b, err := json.Marshal(v)
	if err != nil {
		// Avoid leaking internal errors.
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	c.Status(status)
	c.Set(fiber.HeaderContentType, jsonUTF8)
	return c.Send(b)
}
