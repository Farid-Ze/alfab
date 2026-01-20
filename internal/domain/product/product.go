package product

import (
	"time"

	"github.com/google/uuid"
)

// Product represents a professional beauty product in the catalog
type Product struct {
	ID          uuid.UUID `json:"id"`
	Slug        string    `json:"slug"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	
	// Categorization
	BrandID    uuid.UUID `json:"brand_id"`
	CategoryID uuid.UUID `json:"category_id"`
	
	// Decision support content (Paket A spec)
	Benefits    []string `json:"benefits"`
	UseCases    []string `json:"use_cases"`
	HowToUse    string   `json:"how_to_use"`
	Audience    Audience `json:"audience"` // SALON, BARBER, BOTH
	
	// Media
	ImageURL    string   `json:"image_url"`
	GalleryURLs []string `json:"gallery_urls,omitempty"`
	
	// Training link (optional)
	TrainingURL string `json:"training_url,omitempty"`
	
	// Metadata
	IsActive  bool      `json:"is_active"`
	SortOrder int       `json:"sort_order"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// Audience enum for product targeting
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

// ProductFilter for querying products
type ProductFilter struct {
	BrandID    *uuid.UUID
	CategoryID *uuid.UUID
	Audience   *Audience
	IsActive   *bool
	Limit      int
	Offset     int
}

// ProductListResponse for paginated product list
type ProductListResponse struct {
	Products []Product `json:"products"`
	Total    int       `json:"total"`
	Limit    int       `json:"limit"`
	Offset   int       `json:"offset"`
}
