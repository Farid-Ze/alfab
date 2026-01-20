package memory

import (
	"time"

	"example.com/alfabeauty-b2b/internal/domain/event"
	"github.com/google/uuid"
)

// DemoEvents returns demo event/training data
func DemoEvents() []event.Event {
	now := time.Now().UTC()

	return []event.Event{
		{
			ID:          uuid.MustParse("e0000001-0000-0000-0000-000000000001"),
			Slug:        "glowmaster-color-masterclass-2026",
			Title:       "GlowMaster Color Masterclass 2026",
			Description: "Intensive 2-day color certification program. Learn advanced color theory, correction techniques, and creative coloring. Includes hands-on practice and certification exam.",
			EventDate:   now.AddDate(0, 1, 0), // 1 month from now
			Location:    "Jakarta Training Center",
			EventType:   event.EventTypeCertification,
			Audience:    event.AudienceSalon,
			ImageURL:    "/images/events/color-masterclass.jpg",
			RegisterURL: "",
			WhatsAppLink: "https://wa.me/6281234567890?text=Saya%20tertarik%20dengan%20GlowMaster%20Color%20Masterclass",
			IsHighlight: true,
			IsActive:    true,
			SortOrder:   1,
			CreatedAt:   now,
			UpdatedAt:   now,
		},
		{
			ID:          uuid.MustParse("e0000001-0000-0000-0000-000000000002"),
			Slug:        "keratin-treatment-workshop",
			Title:       "SalonLux Keratin Treatment Workshop",
			Description: "Hands-on workshop mastering keratin smoothing techniques. Learn proper application, troubleshooting, and aftercare consultation. Lunch and materials included.",
			EventDate:   now.AddDate(0, 0, 14), // 2 weeks from now
			Location:    "Surabaya Beauty Academy",
			EventType:   event.EventTypeWorkshop,
			Audience:    event.AudienceSalon,
			ImageURL:    "/images/events/keratin-workshop.jpg",
			RegisterURL: "",
			WhatsAppLink: "https://wa.me/6281234567890?text=Saya%20tertarik%20dengan%20Keratin%20Workshop",
			IsHighlight: true,
			IsActive:    true,
			SortOrder:   2,
			CreatedAt:   now,
			UpdatedAt:   now,
		},
		{
			ID:          uuid.MustParse("e0000001-0000-0000-0000-000000000003"),
			Slug:        "barber-elite-fade-masterclass",
			Title:       "BarberElite Fade Masterclass",
			Description: "Master the art of fade haircuts. From skin fades to mid fades, learn the techniques used by top barbers. Includes clipper techniques and blending secrets.",
			EventDate:   now.AddDate(0, 0, 21), // 3 weeks from now
			Location:    "Bandung Barber Academy",
			EventType:   event.EventTypeTraining,
			Audience:    event.AudienceBarber,
			ImageURL:    "/images/events/fade-masterclass.jpg",
			RegisterURL: "",
			WhatsAppLink: "https://wa.me/6281234567890?text=Saya%20tertarik%20dengan%20Fade%20Masterclass",
			IsHighlight: true,
			IsActive:    true,
			SortOrder:   3,
			CreatedAt:   now,
			UpdatedAt:   now,
		},
		{
			ID:          uuid.MustParse("e0000001-0000-0000-0000-000000000004"),
			Slug:        "alfapro-new-product-launch",
			Title:       "AlfaPro 2026 Product Launch Event",
			Description: "Be the first to discover AlfaPro's new product line. Exclusive preview, special launch pricing, and networking opportunity with industry professionals.",
			EventDate:   now.AddDate(0, 2, 0), // 2 months from now
			Location:    "Jakarta Convention Center",
			EventType:   event.EventTypeProductLaunch,
			Audience:    event.AudienceBoth,
			ImageURL:    "/images/events/alfapro-launch.jpg",
			RegisterURL: "",
			WhatsAppLink: "https://wa.me/6281234567890?text=Saya%20tertarik%20dengan%20AlfaPro%20Launch%20Event",
			IsHighlight: false,
			IsActive:    true,
			SortOrder:   4,
			CreatedAt:   now,
			UpdatedAt:   now,
		},
		{
			ID:          uuid.MustParse("e0000001-0000-0000-0000-000000000005"),
			Slug:        "basic-coloring-for-beginners",
			Title:       "Basic Coloring for Beginners",
			Description: "Entry-level training for aspiring colorists. Learn color wheel theory, application techniques, and safety protocols. Perfect for salon assistants looking to advance.",
			EventDate:   now.AddDate(0, 1, 15), // 1.5 months from now
			Location:    "Online (Zoom)",
			EventType:   event.EventTypeTraining,
			Audience:    event.AudienceSalon,
			ImageURL:    "/images/events/basic-coloring.jpg",
			RegisterURL: "",
			WhatsAppLink: "https://wa.me/6281234567890?text=Saya%20tertarik%20dengan%20Basic%20Coloring%20Training",
			IsHighlight: false,
			IsActive:    true,
			SortOrder:   5,
			CreatedAt:   now,
			UpdatedAt:   now,
		},
	}
}
