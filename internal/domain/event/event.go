package event

import (
	"time"

	"github.com/google/uuid"
)

// Event represents a training/education event
type Event struct {
	ID          uuid.UUID `json:"id"`
	Slug        string    `json:"slug"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	
	// Event details
	EventDate   time.Time `json:"event_date"`
	Location    string    `json:"location"`
	EventType   EventType `json:"event_type"`
	Audience    Audience  `json:"audience"`
	
	// Media
	ImageURL string `json:"image_url"`
	
	// Registration
	RegisterURL  string `json:"register_url,omitempty"`
	WhatsAppLink string `json:"whatsapp_link,omitempty"`
	
	// Metadata
	IsHighlight bool      `json:"is_highlight"`
	IsActive    bool      `json:"is_active"`
	SortOrder   int       `json:"sort_order"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

// EventType categorizes the event
type EventType string

const (
	EventTypeTraining      EventType = "TRAINING"
	EventTypeWorkshop      EventType = "WORKSHOP"
	EventTypeCertification EventType = "CERTIFICATION"
	EventTypeProductLaunch EventType = "PRODUCT_LAUNCH"
	EventTypeOther         EventType = "OTHER"
)

func (et EventType) IsValid() bool {
	switch et {
	case EventTypeTraining, EventTypeWorkshop, EventTypeCertification, EventTypeProductLaunch, EventTypeOther:
		return true
	}
	return false
}

// Audience for event targeting
type Audience string

const (
	AudienceSalon  Audience = "SALON"
	AudienceBarber Audience = "BARBER"
	AudienceBoth   Audience = "BOTH"
)

func (a Audience) IsValid() bool {
	switch a {
	case AudienceSalon, AudienceBarber, AudienceBoth:
		return true
	}
	return false
}

// EventFilter for querying events
type EventFilter struct {
	EventType   *EventType
	Audience    *Audience
	IsHighlight *bool
	IsActive    *bool
	FromDate    *time.Time
	Limit       int
	Offset      int
}
