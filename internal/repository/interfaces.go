package repository

import (
	"context"

	"example.com/alfabeauty-b2b/internal/domain/event"
	"example.com/alfabeauty-b2b/internal/domain/lead"
	"example.com/alfabeauty-b2b/internal/domain/product"
	"github.com/google/uuid"
)

// LeadRepository interface for lead persistence
type LeadRepository interface {
	Create(ctx context.Context, l lead.Lead) (lead.Lead, error)
	GetByID(ctx context.Context, id uuid.UUID) (lead.Lead, error)
	List(ctx context.Context, limit, offset int) ([]lead.Lead, int, error)
}

// ProductRepository interface for product catalog
type ProductRepository interface {
	GetByID(ctx context.Context, id uuid.UUID) (product.Product, error)
	GetBySlug(ctx context.Context, slug string) (product.Product, error)
	List(ctx context.Context, filter product.ProductFilter) (product.ProductListResponse, error)
}

// BrandRepository interface for brands
type BrandRepository interface {
	GetByID(ctx context.Context, id uuid.UUID) (product.Brand, error)
	GetBySlug(ctx context.Context, slug string) (product.Brand, error)
	List(ctx context.Context) ([]product.Brand, error)
}

// CategoryRepository interface for categories
type CategoryRepository interface {
	GetByID(ctx context.Context, id uuid.UUID) (product.Category, error)
	GetBySlug(ctx context.Context, slug string) (product.Category, error)
	List(ctx context.Context) ([]product.Category, error)
}

// EventRepository interface for events
type EventRepository interface {
	GetByID(ctx context.Context, id uuid.UUID) (event.Event, error)
	GetBySlug(ctx context.Context, slug string) (event.Event, error)
	List(ctx context.Context, filter event.EventFilter) ([]event.Event, error)
}
