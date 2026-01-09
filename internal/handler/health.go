package handler

import "github.com/gofiber/fiber/v2"

func healthHandler() fiber.Handler {
	return func(c *fiber.Ctx) error {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "ok"})
	}
}
