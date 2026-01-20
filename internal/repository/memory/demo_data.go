package memory

import (
	"time"

	"example.com/alfabeauty-b2b/internal/domain/product"
	"github.com/google/uuid"
)

// Demo data UUIDs (fixed for consistency)
var (
	// Brands
	BrandAlfaPro   = uuid.MustParse("11111111-1111-1111-1111-111111111111")
	BrandGlowMaster = uuid.MustParse("22222222-2222-2222-2222-222222222222")
	BrandBarberElite = uuid.MustParse("33333333-3333-3333-3333-333333333333")
	BrandSalonLux  = uuid.MustParse("44444444-4444-4444-4444-444444444444")
	BrandStylePro  = uuid.MustParse("55555555-5555-5555-5555-555555555555")

	// Categories
	CatHairColor     = uuid.MustParse("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa")
	CatHairTreatment = uuid.MustParse("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb")
	CatStyling       = uuid.MustParse("cccccccc-cccc-cccc-cccc-cccccccccccc")
	CatTools         = uuid.MustParse("dddddddd-dddd-dddd-dddd-dddddddddddd")
	CatEducation     = uuid.MustParse("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee")
)

// DemoBrands returns demo brand data
func DemoBrands() []product.Brand {
	now := time.Now().UTC()
	return []product.Brand{
		{
			ID:          BrandAlfaPro,
			Slug:        "alfapro",
			Name:        "AlfaPro Haircare",
			Description: "Professional haircare solutions for salon excellence. Italian formulations with proven results.",
			LogoURL:     "/images/brands/alfapro-logo.png",
			IsActive:    true,
			SortOrder:   1,
			CreatedAt:   now,
			UpdatedAt:   now,
		},
		{
			ID:          BrandGlowMaster,
			Slug:        "glowmaster",
			Name:        "GlowMaster Color",
			Description: "Premium hair color technology from Europe. Vibrant, long-lasting, ammonia-conscious formulas.",
			LogoURL:     "/images/brands/glowmaster-logo.png",
			IsActive:    true,
			SortOrder:   2,
			CreatedAt:   now,
			UpdatedAt:   now,
		},
		{
			ID:          BrandBarberElite,
			Slug:        "barber-elite",
			Name:        "BarberElite",
			Description: "Classic barbering tools and products. From pomades to precision tools.",
			LogoURL:     "/images/brands/barber-elite-logo.png",
			IsActive:    true,
			SortOrder:   3,
			CreatedAt:   now,
			UpdatedAt:   now,
		},
		{
			ID:          BrandSalonLux,
			Slug:        "salonlux",
			Name:        "SalonLux Treatment",
			Description: "Luxury treatment systems for professional results. Keratin, botox, and repair technologies.",
			LogoURL:     "/images/brands/salonlux-logo.png",
			IsActive:    true,
			SortOrder:   4,
			CreatedAt:   now,
			UpdatedAt:   now,
		},
		{
			ID:          BrandStylePro,
			Slug:        "stylepro",
			Name:        "StylePro Tools",
			Description: "Professional styling tools and equipment. Dryers, irons, and salon essentials.",
			LogoURL:     "/images/brands/stylepro-logo.png",
			IsActive:    true,
			SortOrder:   5,
			CreatedAt:   now,
			UpdatedAt:   now,
		},
	}
}

// DemoCategories returns demo category data
func DemoCategories() []product.Category {
	now := time.Now().UTC()
	return []product.Category{
		{
			ID:          CatHairColor,
			Slug:        "hair-color",
			Name:        "Hair Color",
			Description: "Professional hair coloring solutions including permanent, semi-permanent, and fashion colors.",
			IconURL:     "/images/categories/color-icon.svg",
			IsActive:    true,
			SortOrder:   1,
			CreatedAt:   now,
			UpdatedAt:   now,
		},
		{
			ID:          CatHairTreatment,
			Slug:        "hair-treatment",
			Name:        "Hair Treatment",
			Description: "Repair, keratin, botox, and intensive treatment systems for damaged hair.",
			IconURL:     "/images/categories/treatment-icon.svg",
			IsActive:    true,
			SortOrder:   2,
			CreatedAt:   now,
			UpdatedAt:   now,
		},
		{
			ID:          CatStyling,
			Slug:        "styling",
			Name:        "Styling Products",
			Description: "Pomades, waxes, sprays, and finishing products for professional styling.",
			IconURL:     "/images/categories/styling-icon.svg",
			IsActive:    true,
			SortOrder:   3,
			CreatedAt:   now,
			UpdatedAt:   now,
		},
		{
			ID:          CatTools,
			Slug:        "tools-equipment",
			Name:        "Tools & Equipment",
			Description: "Professional hair tools, dryers, irons, clippers, and salon equipment.",
			IconURL:     "/images/categories/tools-icon.svg",
			IsActive:    true,
			SortOrder:   4,
			CreatedAt:   now,
			UpdatedAt:   now,
		},
		{
			ID:          CatEducation,
			Slug:        "education-kits",
			Name:        "Education Kits",
			Description: "Training materials and education packages for professional development.",
			IconURL:     "/images/categories/education-icon.svg",
			IsActive:    true,
			SortOrder:   5,
			CreatedAt:   now,
			UpdatedAt:   now,
		},
	}
}
