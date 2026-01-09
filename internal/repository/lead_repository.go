package repository

import (
	"context"

	"example.com/alfabeauty-b2b/internal/domain/lead"
)

type LeadRepository interface {
	Create(ctx context.Context, l lead.Lead) (lead.Lead, error)
}
