package memory

import (
	"context"
	"sync"
	"time"

	"github.com/google/uuid"

	"example.com/alfabeauty-b2b/internal/domain/lead"
)

const defaultLeadCapacity = 64

type LeadRepository struct {
	mu    sync.Mutex
	leads []lead.Lead
}

func NewLeadRepository() *LeadRepository {
	return &LeadRepository{leads: make([]lead.Lead, 0, defaultLeadCapacity)}
}

func (r *LeadRepository) Create(_ context.Context, l lead.Lead) (lead.Lead, error) {
	r.mu.Lock()
	defer r.mu.Unlock()

	l.ID = uuid.New()
	l.CreatedAt = time.Now().UTC()
	l.Normalize()

	r.leads = append(r.leads, l)
	return l, nil
}
