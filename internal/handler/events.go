package handler

import (
	"errors"

	"github.com/gofiber/fiber/v2"

	"example.com/alfabeauty-b2b/internal/domain/event"
	"example.com/alfabeauty-b2b/internal/repository"
)

// listEventsHandler handles GET /api/public/events
func listEventsHandler(eventRepo repository.EventRepository) fiber.Handler {
	return func(c *fiber.Ctx) error {
		filter := event.EventFilter{
			Limit:  c.QueryInt("limit", 20),
			Offset: c.QueryInt("offset", 0),
		}

		// Event type filter
		if eventType := c.Query("type"); eventType != "" {
			et := event.EventType(eventType)
			if et.IsValid() {
				filter.EventType = &et
			}
		}

		// Audience filter
		if audience := c.Query("audience"); audience != "" {
			aud := event.Audience(audience)
			if aud.IsValid() {
				filter.Audience = &aud
			}
		}

		// Highlight filter
		if c.Query("highlight") == "true" {
			highlight := true
			filter.IsHighlight = &highlight
		}

		events, err := eventRepo.List(c.Context(), filter)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Could not fetch events",
			})
		}

		return c.JSON(fiber.Map{
			"events": events,
			"total":  len(events),
		})
	}
}

// getEventHandler handles GET /api/public/events/:slug
func getEventHandler(eventRepo repository.EventRepository) fiber.Handler {
	return func(c *fiber.Ctx) error {
		slug := c.Params("slug")
		if slug == "" {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "Event slug is required",
			})
		}

		e, err := eventRepo.GetBySlug(c.Context(), slug)
		if err != nil {
			if errors.Is(err, event.ErrNotFound) {
				return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
					"error": "Event not found",
				})
			}
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Could not fetch event",
			})
		}

		return c.JSON(e)
	}
}
