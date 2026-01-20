// Package service provides business logic services.
package service

import (
	"context"

	"github.com/google/uuid"

	"example.com/alfabeauty-b2b/internal/domain/lead"
	"example.com/alfabeauty-b2b/internal/notify"
	"example.com/alfabeauty-b2b/internal/repository"
)

// LeadService handles lead business logic
type LeadService struct {
	repo     repository.LeadRepository
	notifier *notify.Notifier
}

// NewLeadService creates a new LeadService
func NewLeadService(repo repository.LeadRepository, notifier *notify.Notifier) *LeadService {
	return &LeadService{
		repo:     repo,
		notifier: notifier,
	}
}

// Create validates and creates a new lead, then sends notification
func (s *LeadService) Create(ctx context.Context, l lead.Lead) (lead.Lead, error) {
	// Normalize input
	l.Normalize()

	// Validate
	if err := l.Validate(); err != nil {
		return lead.Lead{}, err
	}

	// Persist
	created, err := s.repo.Create(ctx, l)
	if err != nil {
		return lead.Lead{}, err
	}

	// Send notification (fire and forget, don't block on failure)
	if s.notifier != nil {
		go func() {
			_ = s.notifier.SendLeadNotification(
				context.Background(),
				created.BusinessName,
				created.ContactName,
				created.PhoneWhatsApp,
				created.City,
			)
		}()
	}

	return created, nil
}

// GetByID retrieves a lead by ID
func (s *LeadService) GetByID(ctx context.Context, id string) (lead.Lead, error) {
	parsedID, err := uuid.Parse(id)
	if err != nil {
		return lead.Lead{}, lead.ErrNotFound
	}
	return s.repo.GetByID(ctx, parsedID)
}

// List returns all leads with pagination
func (s *LeadService) List(ctx context.Context, limit, offset int) ([]lead.Lead, int, error) {
	return s.repo.List(ctx, limit, offset)
}
