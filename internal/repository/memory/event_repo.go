package memory

import (
	"context"
	"strings"
	"sync"
	"time"

	"example.com/alfabeauty-b2b/internal/domain/event"
	"github.com/google/uuid"
)

// EventRepository is an in-memory implementation for demo
type EventRepository struct {
	mu     sync.RWMutex
	events []event.Event
}

// NewEventRepository creates a new in-memory event repository with demo data
func NewEventRepository() *EventRepository {
	return &EventRepository{
		events: DemoEvents(),
	}
}

// GetByID retrieves an event by ID
func (r *EventRepository) GetByID(ctx context.Context, id uuid.UUID) (event.Event, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	for _, e := range r.events {
		if e.ID == id && e.IsActive {
			return e, nil
		}
	}
	return event.Event{}, event.ErrNotFound
}

// GetBySlug retrieves an event by slug
func (r *EventRepository) GetBySlug(ctx context.Context, slug string) (event.Event, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	slug = strings.ToLower(strings.TrimSpace(slug))
	for _, e := range r.events {
		if strings.ToLower(e.Slug) == slug && e.IsActive {
			return e, nil
		}
	}
	return event.Event{}, event.ErrNotFound
}

// List returns events with optional filtering
func (r *EventRepository) List(ctx context.Context, filter event.EventFilter) ([]event.Event, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	var filtered []event.Event
	now := time.Now().UTC()

	for _, e := range r.events {
		// Apply filters
		if filter.IsActive != nil && e.IsActive != *filter.IsActive {
			continue
		}
		if filter.IsActive == nil && !e.IsActive {
			continue // Default to active only
		}
		if filter.IsHighlight != nil && e.IsHighlight != *filter.IsHighlight {
			continue
		}
		if filter.EventType != nil && e.EventType != *filter.EventType {
			continue
		}
		if filter.Audience != nil && e.Audience != *filter.Audience && e.Audience != event.AudienceBoth {
			continue
		}
		if filter.FromDate != nil && e.EventDate.Before(*filter.FromDate) {
			continue
		}
		// By default, only show upcoming events
		if filter.FromDate == nil && e.EventDate.Before(now) {
			continue
		}
		filtered = append(filtered, e)
	}

	// Apply pagination
	limit := filter.Limit
	if limit <= 0 {
		limit = 20
	}
	offset := filter.Offset
	if offset < 0 {
		offset = 0
	}

	if offset >= len(filtered) {
		return []event.Event{}, nil
	}

	end := offset + limit
	if end > len(filtered) {
		end = len(filtered)
	}

	return filtered[offset:end], nil
}
