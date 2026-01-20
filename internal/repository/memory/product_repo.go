package memory

import (
	"context"
	"strings"
	"sync"

	"example.com/alfabeauty-b2b/internal/domain/product"
	"github.com/google/uuid"
)

// ProductRepository is an in-memory implementation for demo
type ProductRepository struct {
	mu       sync.RWMutex
	products []product.Product
}

// NewProductRepository creates a new in-memory product repository with demo data
func NewProductRepository() *ProductRepository {
	return &ProductRepository{
		products: DemoProducts(),
	}
}

// GetByID retrieves a product by ID
func (r *ProductRepository) GetByID(ctx context.Context, id uuid.UUID) (product.Product, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	for _, p := range r.products {
		if p.ID == id && p.IsActive {
			return p, nil
		}
	}
	return product.Product{}, product.ErrNotFound
}

// GetBySlug retrieves a product by slug
func (r *ProductRepository) GetBySlug(ctx context.Context, slug string) (product.Product, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	slug = strings.ToLower(strings.TrimSpace(slug))
	for _, p := range r.products {
		if strings.ToLower(p.Slug) == slug && p.IsActive {
			return p, nil
		}
	}
	return product.Product{}, product.ErrNotFound
}

// List returns products with optional filtering
func (r *ProductRepository) List(ctx context.Context, filter product.ProductFilter) (product.ProductListResponse, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	var filtered []product.Product

	for _, p := range r.products {
		// Apply filters
		if filter.IsActive != nil && p.IsActive != *filter.IsActive {
			continue
		}
		if filter.IsActive == nil && !p.IsActive {
			continue // Default to active only
		}
		if filter.BrandID != nil && p.BrandID != *filter.BrandID {
			continue
		}
		if filter.CategoryID != nil && p.CategoryID != *filter.CategoryID {
			continue
		}
		if filter.Audience != nil && p.Audience != *filter.Audience && p.Audience != product.AudienceBoth {
			continue
		}
		filtered = append(filtered, p)
	}

	total := len(filtered)

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
		return product.ProductListResponse{
			Products: []product.Product{},
			Total:    total,
			Limit:    limit,
			Offset:   offset,
		}, nil
	}

	end := offset + limit
	if end > len(filtered) {
		end = len(filtered)
	}

	return product.ProductListResponse{
		Products: filtered[offset:end],
		Total:    total,
		Limit:    limit,
		Offset:   offset,
	}, nil
}

// BrandRepository is an in-memory implementation for demo
type BrandRepository struct {
	mu     sync.RWMutex
	brands []product.Brand
}

// NewBrandRepository creates a new in-memory brand repository with demo data
func NewBrandRepository() *BrandRepository {
	return &BrandRepository{
		brands: DemoBrands(),
	}
}

// GetByID retrieves a brand by ID
func (r *BrandRepository) GetByID(ctx context.Context, id uuid.UUID) (product.Brand, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	for _, b := range r.brands {
		if b.ID == id && b.IsActive {
			return b, nil
		}
	}
	return product.Brand{}, product.ErrNotFound
}

// GetBySlug retrieves a brand by slug
func (r *BrandRepository) GetBySlug(ctx context.Context, slug string) (product.Brand, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	slug = strings.ToLower(strings.TrimSpace(slug))
	for _, b := range r.brands {
		if strings.ToLower(b.Slug) == slug && b.IsActive {
			return b, nil
		}
	}
	return product.Brand{}, product.ErrNotFound
}

// List returns all active brands
func (r *BrandRepository) List(ctx context.Context) ([]product.Brand, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	var active []product.Brand
	for _, b := range r.brands {
		if b.IsActive {
			active = append(active, b)
		}
	}
	return active, nil
}

// CategoryRepository is an in-memory implementation for demo
type CategoryRepository struct {
	mu         sync.RWMutex
	categories []product.Category
}

// NewCategoryRepository creates a new in-memory category repository with demo data
func NewCategoryRepository() *CategoryRepository {
	return &CategoryRepository{
		categories: DemoCategories(),
	}
}

// GetByID retrieves a category by ID
func (r *CategoryRepository) GetByID(ctx context.Context, id uuid.UUID) (product.Category, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	for _, c := range r.categories {
		if c.ID == id && c.IsActive {
			return c, nil
		}
	}
	return product.Category{}, product.ErrNotFound
}

// GetBySlug retrieves a category by slug
func (r *CategoryRepository) GetBySlug(ctx context.Context, slug string) (product.Category, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	slug = strings.ToLower(strings.TrimSpace(slug))
	for _, c := range r.categories {
		if strings.ToLower(c.Slug) == slug && c.IsActive {
			return c, nil
		}
	}
	return product.Category{}, product.ErrNotFound
}

// List returns all active categories
func (r *CategoryRepository) List(ctx context.Context) ([]product.Category, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	var active []product.Category
	for _, c := range r.categories {
		if c.IsActive {
			active = append(active, c)
		}
	}
	return active, nil
}
