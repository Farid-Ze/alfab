package handler

import (
	"errors"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"

	"example.com/alfabeauty-b2b/internal/domain/product"
	"example.com/alfabeauty-b2b/internal/repository"
)

// ProductResponse includes brand and category details
type ProductResponse struct {
	product.Product
	Brand    *product.Brand    `json:"brand,omitempty"`
	Category *product.Category `json:"category,omitempty"`
}

// listProductsHandler handles GET /api/public/products
func listProductsHandler(productRepo repository.ProductRepository, brandRepo repository.BrandRepository, categoryRepo repository.CategoryRepository) fiber.Handler {
	return func(c *fiber.Ctx) error {
		// Parse filter parameters
		filter := product.ProductFilter{
			Limit:  c.QueryInt("limit", 20),
			Offset: c.QueryInt("offset", 0),
		}

		// Brand filter
		if brandSlug := c.Query("brand"); brandSlug != "" {
			brand, err := brandRepo.GetBySlug(c.Context(), brandSlug)
			if err == nil {
				filter.BrandID = &brand.ID
			}
		}
		if brandID := c.Query("brand_id"); brandID != "" {
			if id, err := uuid.Parse(brandID); err == nil {
				filter.BrandID = &id
			}
		}

		// Category filter
		if catSlug := c.Query("category"); catSlug != "" {
			cat, err := categoryRepo.GetBySlug(c.Context(), catSlug)
			if err == nil {
				filter.CategoryID = &cat.ID
			}
		}
		if catID := c.Query("category_id"); catID != "" {
			if id, err := uuid.Parse(catID); err == nil {
				filter.CategoryID = &id
			}
		}

		// Audience filter
		if audience := c.Query("audience"); audience != "" {
			aud := product.Audience(audience)
			if aud.IsValid() {
				filter.Audience = &aud
			}
		}

		// Get products
		result, err := productRepo.List(c.Context(), filter)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Could not fetch products",
			})
		}

		// Enrich with brand/category names
		var enriched []ProductResponse
		for _, p := range result.Products {
			resp := ProductResponse{Product: p}
			if brand, err := brandRepo.GetByID(c.Context(), p.BrandID); err == nil {
				resp.Brand = &brand
			}
			if cat, err := categoryRepo.GetByID(c.Context(), p.CategoryID); err == nil {
				resp.Category = &cat
			}
			enriched = append(enriched, resp)
		}

		return c.JSON(fiber.Map{
			"products": enriched,
			"total":    result.Total,
			"limit":    result.Limit,
			"offset":   result.Offset,
		})
	}
}

// getProductHandler handles GET /api/public/products/:slug
func getProductHandler(productRepo repository.ProductRepository, brandRepo repository.BrandRepository, categoryRepo repository.CategoryRepository) fiber.Handler {
	return func(c *fiber.Ctx) error {
		slug := c.Params("slug")
		if slug == "" {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "Product slug is required",
			})
		}

		p, err := productRepo.GetBySlug(c.Context(), slug)
		if err != nil {
			if errors.Is(err, product.ErrNotFound) {
				return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
					"error": "Product not found",
				})
			}
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Could not fetch product",
			})
		}

		// Enrich with brand/category
		resp := ProductResponse{Product: p}
		if brand, err := brandRepo.GetByID(c.Context(), p.BrandID); err == nil {
			resp.Brand = &brand
		}
		if cat, err := categoryRepo.GetByID(c.Context(), p.CategoryID); err == nil {
			resp.Category = &cat
		}

		return c.JSON(resp)
	}
}

// listBrandsHandler handles GET /api/public/brands
func listBrandsHandler(brandRepo repository.BrandRepository) fiber.Handler {
	return func(c *fiber.Ctx) error {
		brands, err := brandRepo.List(c.Context())
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Could not fetch brands",
			})
		}

		return c.JSON(fiber.Map{
			"brands": brands,
			"total":  len(brands),
		})
	}
}

// listCategoriesHandler handles GET /api/public/categories
func listCategoriesHandler(categoryRepo repository.CategoryRepository) fiber.Handler {
	return func(c *fiber.Ctx) error {
		categories, err := categoryRepo.List(c.Context())
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Could not fetch categories",
			})
		}

		return c.JSON(fiber.Map{
			"categories": categories,
			"total":      len(categories),
		})
	}
}
