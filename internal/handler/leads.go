package handler

import (
	"errors"

	"github.com/gofiber/fiber/v2"

	"example.com/alfabeauty-b2b/internal/domain/lead"
	"example.com/alfabeauty-b2b/internal/repository"
	"example.com/alfabeauty-b2b/pkg/httpx"
	"example.com/alfabeauty-b2b/pkg/metrics"
)

// createLeadRequest matches Paket A spec section 5 - Partner profiling
type createLeadRequest struct {
	// Required fields
	BusinessName  string `json:"business_name"`
	ContactName   string `json:"contact_name"`
	PhoneWhatsApp string `json:"phone_whatsapp"`
	City          string `json:"city"`
	SalonType     string `json:"salon_type"`
	Consent       bool   `json:"consent"`

	// Optional fields (progressive profiling)
	ChairCount        *int   `json:"chair_count,omitempty"`
	Specialization    string `json:"specialization,omitempty"`
	CurrentBrandsUsed string `json:"current_brands_used,omitempty"`
	MonthlySpendRange string `json:"monthly_spend_range,omitempty"`

	// Tracking
	PageURLInitial string `json:"page_url_initial,omitempty"`
	PageURLCurrent string `json:"page_url_current,omitempty"`
	Source         string `json:"source,omitempty"`

	// Honeypot (anti-spam) - hidden field named innocuously
	Website string `json:"website"` // Honeypot - should be empty
}

// createLeadHandler handles POST /api/public/partner-leads
func createLeadHandler(repo repository.LeadRepository, appMetrics *metrics.Metrics) fiber.Handler {
	return func(c *fiber.Ctx) error {
		// Verify content type
		if c.Get("Content-Type") != "application/json" {
			appMetrics.LeadsFailedTotal.Inc()
			return httpx.SendBadRequest(c, "Content-Type must be application/json")
		}

		var req createLeadRequest
		if err := c.BodyParser(&req); err != nil {
			appMetrics.LeadsFailedTotal.Inc()
			return httpx.SendBadRequest(c, "Could not parse request body")
		}

		// Map request to domain model
		l := lead.Lead{
			BusinessName:      req.BusinessName,
			ContactName:       req.ContactName,
			PhoneWhatsApp:     req.PhoneWhatsApp,
			City:              req.City,
			SalonType:         lead.SalonType(req.SalonType),
			Consent:           req.Consent,
			ChairCount:        req.ChairCount,
			Specialization:    req.Specialization,
			CurrentBrandsUsed: req.CurrentBrandsUsed,
			MonthlySpendRange: req.MonthlySpendRange,
			Source:            req.Source,
			PageURLInitial:    req.PageURLInitial,
			PageURLCurrent:    req.PageURLCurrent,
			UserAgent:         c.Get("User-Agent"),
			IPAddress:         c.IP(),
			Honeypot:          req.Website, // Map hidden field
		}

		// Normalize and validate
		l.Normalize()
		if err := l.Validate(); err != nil {
			if errors.Is(err, lead.ErrSpam) {
				// Silent accept for bots - don't give signal
				return httpx.SendSuccess(c, fiber.Map{
					"status":  "accepted",
					"message": "Thank you for your submission",
				})
			}
			if lead.IsInvalid(err) {
				appMetrics.LeadsFailedTotal.Inc()
				return httpx.SendBadRequest(c, err.Error())
			}
			appMetrics.LeadsFailedTotal.Inc()
			return httpx.SendInternalError(c, "Validation error")
		}

		// Create lead
		created, err := repo.Create(c.Context(), l)
		if err != nil {
			appMetrics.LeadsFailedTotal.Inc()
			return httpx.SendInternalError(c, "Could not process your submission. Please try again.")
		}

		appMetrics.LeadsCreatedTotal.Inc()

		return httpx.SendCreated(c, fiber.Map{
			"status":  "success",
			"message": "Thank you! We will contact you soon via WhatsApp.",
			"id":      created.ID.String(),
		})
	}
}

// listLeadsHandler handles GET /api/admin/leads (protected)
func listLeadsHandler(repo repository.LeadRepository) fiber.Handler {
	return func(c *fiber.Ctx) error {
		limit := c.QueryInt("limit", 50)
		offset := c.QueryInt("offset", 0)

		if limit > 100 {
			limit = 100
		}

		leads, total, err := repo.List(c.Context(), limit, offset)
		if err != nil {
			return httpx.SendInternalError(c, "Could not fetch leads")
		}

		return httpx.SendSuccess(c, fiber.Map{
			"leads":  leads,
			"total":  total,
			"limit":  limit,
			"offset": offset,
		})
	}
}

// exportLeadsHandler handles GET /api/admin/leads/export (protected)
// Returns leads in CSV format for download
func exportLeadsHandler(repo repository.LeadRepository) fiber.Handler {
	return func(c *fiber.Ctx) error {
		leads, _, err := repo.List(c.Context(), 1000, 0)
		if err != nil {
			return httpx.SendInternalError(c, "Could not fetch leads")
		}

		// Build CSV
		csv := "ID,Created At,Business Name,Contact Name,Phone WhatsApp,City,Salon Type,Chair Count,Specialization,Consent\n"
		for _, l := range leads {
			chairCount := ""
			if l.ChairCount != nil {
				chairCount = intToString(*l.ChairCount)
			}
			csv += l.ID.String() + "," +
				l.CreatedAt.Format("2006-01-02 15:04:05") + "," +
				escapeCSV(l.BusinessName) + "," +
				escapeCSV(l.ContactName) + "," +
				escapeCSV(l.PhoneWhatsApp) + "," +
				escapeCSV(l.City) + "," +
				string(l.SalonType) + "," +
				chairCount + "," +
				escapeCSV(l.Specialization) + "," +
				boolToString(l.Consent) + "\n"
		}

		c.Set("Content-Type", "text/csv")
		c.Set("Content-Disposition", "attachment; filename=leads-export.csv")
		return c.SendString(csv)
	}
}

func escapeCSV(s string) string {
	if len(s) == 0 {
		return ""
	}
	needsQuote := false
	for _, c := range s {
		if c == ',' || c == '"' || c == '\n' {
			needsQuote = true
			break
		}
	}
	if needsQuote {
		escaped := ""
		for _, c := range s {
			if c == '"' {
				escaped += "\"\""
			} else {
				escaped += string(c)
			}
		}
		return "\"" + escaped + "\""
	}
	return s
}

func boolToString(b bool) string {
	if b {
		return "true"
	}
	return "false"
}

func intToString(n int) string {
	if n == 0 {
		return "0"
	}
	result := ""
	negative := n < 0
	if negative {
		n = -n
	}
	for n > 0 {
		result = string(rune('0'+n%10)) + result
		n /= 10
	}
	if negative {
		result = "-" + result
	}
	return result
}
