package memory

import (
	"context"
	"sync"
	"time"

	"example.com/alfabeauty-b2b/internal/domain/lead"
	"github.com/google/uuid"
)

// LeadRepository is an in-memory implementation for demo/testing
type LeadRepository struct {
	mu    sync.RWMutex
	leads map[uuid.UUID]lead.Lead
}

// NewLeadRepository creates a new in-memory lead repository
func NewLeadRepository() *LeadRepository {
	return &LeadRepository{
		leads: make(map[uuid.UUID]lead.Lead),
	}
}

// Create stores a new lead
func (r *LeadRepository) Create(ctx context.Context, l lead.Lead) (lead.Lead, error) {
	r.mu.Lock()
	defer r.mu.Unlock()

	l.Normalize()

	l.ID = uuid.New()
	l.CreatedAt = time.Now().UTC()

	r.leads[l.ID] = l
	return l, nil
}

// GetByID retrieves a lead by ID
func (r *LeadRepository) GetByID(ctx context.Context, id uuid.UUID) (lead.Lead, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	l, ok := r.leads[id]
	if !ok {
		return lead.Lead{}, lead.ErrNotFound
	}
	return l, nil
}

// List returns all leads with pagination
func (r *LeadRepository) List(ctx context.Context, limit, offset int) ([]lead.Lead, int, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	// Collect all leads
	all := make([]lead.Lead, 0, len(r.leads))
	for _, l := range r.leads {
		all = append(all, l)
	}

	total := len(all)

	// Apply pagination
	if offset >= len(all) {
		return []lead.Lead{}, total, nil
	}

	end := offset + limit
	if end > len(all) {
		end = len(all)
	}

	return all[offset:end], total, nil
}
