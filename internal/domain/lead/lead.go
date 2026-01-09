package lead

import (
	"strings"
	"time"

	"github.com/google/uuid"
)

type Lead struct {
	ID             uuid.UUID
	CreatedAt      time.Time
	Name           string
	Email          string
	Phone          string
	Message        string
	PageURLInitial string
	PageURLCurrent string
	UserAgent      string
	IPAddress      string
	Honeypot       string // Honeypot field for spam detection - should be empty for legitimate submissions
}

func (l *Lead) Normalize() {
	l.Name = strings.TrimSpace(l.Name)
	l.Email = strings.TrimSpace(strings.ToLower(l.Email))
	l.Phone = strings.TrimSpace(l.Phone)
	l.Message = strings.TrimSpace(l.Message)
	l.PageURLInitial = strings.TrimSpace(l.PageURLInitial)
	l.PageURLCurrent = strings.TrimSpace(l.PageURLCurrent)
	l.UserAgent = strings.TrimSpace(l.UserAgent)
	l.IPAddress = strings.TrimSpace(l.IPAddress)
	l.Honeypot = strings.TrimSpace(l.Honeypot)
}

func (l Lead) Validate() error {
	// Very small baseline validation. Business rules can evolve, but avoid accepting empty spam.
	if l.Honeypot != "" {
		// Treat as bot. Caller may decide to drop silently.
		return ErrSpam
	}
	if l.Name == "" {
		return ErrInvalid("name is required")
	}
	if l.Email == "" && l.Phone == "" {
		return ErrInvalid("email or phone is required")
	}
	if len(l.Message) > 2000 {
		return ErrInvalid("message too long")
	}
	return nil
}
