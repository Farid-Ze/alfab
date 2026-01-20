package lead

import (
	"regexp"
	"strings"
	"time"

	"github.com/google/uuid"
)

// SalonType enum for business categorization
type SalonType string

const (
	SalonTypeSalon  SalonType = "SALON"
	SalonTypeBarber SalonType = "BARBER"
	SalonTypeBridal SalonType = "BRIDAL"
	SalonTypeUnisex SalonType = "UNISEX"
	SalonTypeOther  SalonType = "OTHER"
)

func (st SalonType) IsValid() bool {
	switch st {
	case SalonTypeSalon, SalonTypeBarber, SalonTypeBridal, SalonTypeUnisex, SalonTypeOther:
		return true
	}
	return false
}

// Lead represents a partner lead submission from the Become Partner form
// Based on Paket A spec section 5
type Lead struct {
	ID        uuid.UUID `json:"id"`
	CreatedAt time.Time `json:"created_at"`

	// Required fields (Paket A spec)
	BusinessName  string    `json:"business_name"`
	ContactName   string    `json:"contact_name"`
	PhoneWhatsApp string    `json:"phone_whatsapp"`
	City          string    `json:"city"`
	SalonType     SalonType `json:"salon_type"`
	Consent       bool      `json:"consent"`

	// Optional fields (progressive profiling)
	ChairCount        *int   `json:"chair_count,omitempty"`
	Specialization    string `json:"specialization,omitempty"`
	CurrentBrandsUsed string `json:"current_brands_used,omitempty"`
	MonthlySpendRange string `json:"monthly_spend_range,omitempty"`

	// Tracking metadata
	Source         string `json:"source"`
	PageURLInitial string `json:"page_url_initial,omitempty"`
	PageURLCurrent string `json:"page_url_current,omitempty"`
	UserAgent      string `json:"user_agent,omitempty"`
	IPAddress      string `json:"ip_address,omitempty"`

	// Anti-spam honeypot (should be empty for legitimate submissions)
	Honeypot string `json:"-"`
}

// Normalize trims and cleans input fields
func (l *Lead) Normalize() {
	l.BusinessName = strings.TrimSpace(l.BusinessName)
	l.ContactName = strings.TrimSpace(l.ContactName)
	l.PhoneWhatsApp = normalizePhone(strings.TrimSpace(l.PhoneWhatsApp))
	l.City = strings.TrimSpace(l.City)
	l.Specialization = strings.TrimSpace(l.Specialization)
	l.CurrentBrandsUsed = strings.TrimSpace(l.CurrentBrandsUsed)
	l.MonthlySpendRange = strings.TrimSpace(l.MonthlySpendRange)
	l.PageURLInitial = strings.TrimSpace(l.PageURLInitial)
	l.PageURLCurrent = strings.TrimSpace(l.PageURLCurrent)
	l.UserAgent = strings.TrimSpace(l.UserAgent)
	l.IPAddress = strings.TrimSpace(l.IPAddress)
	l.Honeypot = strings.TrimSpace(l.Honeypot)
	l.Source = strings.TrimSpace(l.Source)
	if l.Source == "" {
		l.Source = "website"
	}
}

// Validate checks all required fields and business rules
func (l Lead) Validate() error {
	// Honeypot check (spam detection)
	if l.Honeypot != "" {
		return ErrSpam
	}

	// Required fields validation
	if l.BusinessName == "" {
		return ErrInvalid("business_name is required")
	}
	if len(l.BusinessName) > 255 {
		return ErrInvalid("business_name too long (max 255)")
	}

	if l.ContactName == "" {
		return ErrInvalid("contact_name is required")
	}
	if len(l.ContactName) > 255 {
		return ErrInvalid("contact_name too long (max 255)")
	}

	if l.PhoneWhatsApp == "" {
		return ErrInvalid("phone_whatsapp is required")
	}
	if !isValidPhoneNumber(l.PhoneWhatsApp) {
		return ErrInvalid("phone_whatsapp must be a valid phone number")
	}

	if l.City == "" {
		return ErrInvalid("city is required")
	}
	if len(l.City) > 100 {
		return ErrInvalid("city too long (max 100)")
	}

	if !l.SalonType.IsValid() {
		return ErrInvalid("salon_type must be SALON, BARBER, BRIDAL, UNISEX, or OTHER")
	}

	if !l.Consent {
		return ErrInvalid("consent is required")
	}

	// Optional field validation
	if l.ChairCount != nil && (*l.ChairCount < 1 || *l.ChairCount > 100) {
		return ErrInvalid("chair_count must be between 1 and 100")
	}

	if len(l.Specialization) > 500 {
		return ErrInvalid("specialization too long (max 500)")
	}

	if len(l.CurrentBrandsUsed) > 500 {
		return ErrInvalid("current_brands_used too long (max 500)")
	}

	return nil
}

// normalizePhone attempts to normalize phone to E.164-like format
func normalizePhone(phone string) string {
	// Remove common separators
	phone = regexp.MustCompile(`[\s\-\.\(\)]+`).ReplaceAllString(phone, "")
	
	// Convert 08xx to +628xx for Indonesian numbers
	if strings.HasPrefix(phone, "08") {
		phone = "+62" + phone[1:]
	}
	
	// Ensure + prefix for international
	if !strings.HasPrefix(phone, "+") && len(phone) > 10 {
		phone = "+" + phone
	}
	
	return phone
}

// isValidPhoneNumber checks if phone number looks valid (lenient E.164-like)
func isValidPhoneNumber(phone string) bool {
	// Must start with + and contain 10-15 digits
	if !strings.HasPrefix(phone, "+") {
		return false
	}
	digits := regexp.MustCompile(`\D`).ReplaceAllString(phone, "")
	return len(digits) >= 10 && len(digits) <= 15
}
