package handler

import (
	"strings"

	"github.com/gofiber/fiber/v2"

	"example.com/alfabeauty-b2b/pkg/metrics"
)

type websiteEventPayload struct {
	EventName      string `json:"event_name"`
	PageURLInitial string `json:"page_url_initial"`
	PageURLCurrent string `json:"page_url_current"`
	DeviceType     string `json:"device_type"`
	// Optional fields for debugging/analysis (do not label metrics by these).
	Target string `json:"target"`
	Href   string `json:"href"`
}

// ingestWebsiteEventHandler accepts low-cardinality website analytics events.
//
// Paket A (DoD):
// - at minimum, record event "cta_whatsapp_click".
func ingestWebsiteEventHandler() fiber.Handler {
	return func(c *fiber.Ctx) error {
		var p websiteEventPayload
		if err := c.BodyParser(&p); err != nil {
			return writeJSON(c, fiber.StatusBadRequest, fiber.Map{"error": "invalid_json"})
		}

		name := strings.TrimSpace(p.EventName)
		if name == "" {
			return writeJSON(c, fiber.StatusBadRequest, fiber.Map{"error": "event_name is required"})
		}

		metrics.IncWebsiteEvent(name, p.DeviceType)
		return c.SendStatus(fiber.StatusNoContent)
	}
}
