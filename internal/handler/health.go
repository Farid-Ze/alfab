package handler

import (
	"github.com/gofiber/fiber/v2"

	"example.com/alfabeauty-b2b/internal/config"
)

// healthHandler returns server health status
func healthHandler() fiber.Handler {
	return func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"status":  "healthy",
			"service": "alfabeauty-b2b-api",
		})
	}
}

// siteConfigHandler returns public site configuration for frontend
// Based on Paket A spec - CTA strategy configuration
func siteConfigHandler(cfg config.Config) fiber.Handler {
	return func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"whatsapp": fiber.Map{
				"number":  cfg.WhatsAppNumber,
				"message": cfg.WhatsAppMessage,
				"link":    buildWhatsAppLink(cfg.WhatsAppNumber, cfg.WhatsAppMessage),
			},
			"contact": fiber.Map{
				"email": cfg.FallbackEmail,
			},
			"company": fiber.Map{
				"name":        "PT. Alfa Beauty Cosmetica",
				"tagline":     "Professional Beauty Distribution",
				"description": "Professional beauty distribution company dedicated to providing products, education, and technical support for salons and barbershops in Indonesia.",
			},
		})
	}
}

// buildWhatsAppLink creates a WhatsApp deep link
func buildWhatsAppLink(number, message string) string {
	// Remove + from number for wa.me link
	cleanNumber := ""
	for _, c := range number {
		if c >= '0' && c <= '9' {
			cleanNumber += string(c)
		}
	}
	
	if message == "" {
		return "https://wa.me/" + cleanNumber
	}
	
	// URL encode message
	encoded := ""
	for _, c := range message {
		if (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9') || c == '-' || c == '_' || c == '.' || c == '~' {
			encoded += string(c)
		} else if c == ' ' {
			encoded += "%20"
		} else {
			// Simple encoding for common chars
			encoded += "%" + string("0123456789ABCDEF"[c/16]) + string("0123456789ABCDEF"[c%16])
		}
	}
	
	return "https://wa.me/" + cleanNumber + "?text=" + encoded
}
