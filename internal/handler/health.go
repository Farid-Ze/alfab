package handler

import "github.com/gofiber/fiber/v2"

func healthHandler() fiber.Handler {
	return func(c *fiber.Ctx) error {
		return writeJSON(c, fiber.StatusOK, fiber.Map{"status": "ok"})
	}
}
