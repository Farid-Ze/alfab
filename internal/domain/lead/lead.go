package lead

import (
	"strings"
	"time"

	"github.com/google/uuid"
)

type Lead struct {
	ID             uuid.UUID
	CreatedAt      time.Time
	// IdempotencyKeyHash is a SHA-256 hex hash of the client-supplied Idempotency-Key.
	// We store only the hash to avoid persisting the raw key.
	IdempotencyKeyHash string
	// Partner profiling fields (Paket A §5).
	BusinessName      string
	ContactName       string
	PhoneWhatsApp     string
	City              string
	SalonType         string
	Consent           bool
	ChairCount        *int
	Specialization    string
	CurrentBrandsUsed string
	MonthlySpendRange string

	// Additional contact/notes.
	Email   string
	Message string
	PageURLInitial string
	PageURLCurrent string
	UserAgent      string
	IPAddress      string
	Honeypot       string // Honeypot field for spam detection - should be empty for legitimate submissions
}

func (l *Lead) Normalize() {
	l.BusinessName = strings.TrimSpace(l.BusinessName)
	l.ContactName = strings.TrimSpace(l.ContactName)
	l.PhoneWhatsApp = normalizePhoneWhatsApp(l.PhoneWhatsApp)
	l.City = strings.TrimSpace(l.City)
	l.SalonType = strings.TrimSpace(strings.ToUpper(l.SalonType))
	if l.ChairCount != nil {
		v := *l.ChairCount
		if v <= 0 {
			// Treat non-positive values as unset.
			l.ChairCount = nil
		}
	}
	l.Specialization = strings.TrimSpace(l.Specialization)
	l.CurrentBrandsUsed = strings.TrimSpace(l.CurrentBrandsUsed)
	l.MonthlySpendRange = strings.TrimSpace(l.MonthlySpendRange)

	l.Email = strings.TrimSpace(strings.ToLower(l.Email))
	l.Message = strings.TrimSpace(l.Message)
	l.IdempotencyKeyHash = strings.TrimSpace(strings.ToLower(l.IdempotencyKeyHash))
	l.PageURLInitial = strings.TrimSpace(l.PageURLInitial)
	l.PageURLCurrent = strings.TrimSpace(l.PageURLCurrent)
	l.UserAgent = strings.TrimSpace(l.UserAgent)
	l.IPAddress = strings.TrimSpace(l.IPAddress)
	l.Honeypot = strings.TrimSpace(l.Honeypot)
}

func (l Lead) Validate() error {
	// Baseline validation aligned to Paket A §5 (Become Partner profiling).
	if l.Honeypot != "" {
		// Treat as bot. Caller may decide to drop silently.
		return ErrSpam
	}
	if l.BusinessName == "" {
		return ErrInvalid("business_name is required")
	}
	if l.ContactName == "" {
		return ErrInvalid("contact_name is required")
	}
	if l.PhoneWhatsApp == "" {
		return ErrInvalid("phone_whatsapp is required")
	}
	if l.City == "" {
		return ErrInvalid("city is required")
	}
	if !l.Consent {
		return ErrInvalid("consent is required")
	}
	if !isValidSalonType(l.SalonType) {
		return ErrInvalid("salon_type is invalid")
	}
	if len(l.Message) > 2000 {
		return ErrInvalid("message too long")
	}
	return nil
}

func isValidSalonType(v string) bool {
	switch strings.ToUpper(strings.TrimSpace(v)) {
	case "SALON", "BARBER", "BRIDAL", "UNISEX", "OTHER":
		return true
	default:
		return false
	}
}

// normalizePhoneWhatsApp normalizes a WhatsApp/phone number to an E.164-like form.
// Spec requirement is lenient: accept +62..., 62..., or 08... and normalize.
func normalizePhoneWhatsApp(input string) string {
	trimmed := strings.TrimSpace(input)
	if trimmed == "" {
		return ""
	}

	// Keep digits only.
	digits := make([]byte, 0, len(trimmed))
	for i := 0; i < len(trimmed); i++ {
		c := trimmed[i]
		if c >= '0' && c <= '9' {
			digits = append(digits, c)
		}
	}
	if len(digits) == 0 {
		return ""
	}

	// Indonesia-friendly normalization.
	if digits[0] == '0' {
		digits = append([]byte{'6', '2'}, digits[1:]...)
	}
	if len(digits) >= 10 && len(digits) <= 15 {
		// Store with '+' prefix.
		return "+" + string(digits)
	}
	return ""
}
