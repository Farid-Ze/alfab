import { z } from "zod";
import type { Product } from "@/lib/types";
import { logger } from "@/lib/logger";
import productsRaw from "@/content/products.json";

// Validation Schema (Runtime Safety)
const productSchema = z.object({
  slug: z.string(),
  name: z.string(),
  brand: z.string(),
  audience: z.array(z.enum(["SALON", "BARBER"])),
  functions: z.array(z.string()),
  categories: z.array(z.string()).optional(),
  summary: z.string(),
  benefits: z.array(z.string()),
  howToUse: z.string(),
  // Allow extra fields from JSON but don't require them in Type unless we update Type
}).passthrough(); // Allow images etc to pass through if they exist in JSON, casting to Product will hide them but they are there at runtime if needed by "any" consumers. Better: update Type later.

// Memoize valid products to avoid re-parsing on every request
let _validProducts: Product[] | null = null;

/**
 * Retrieves the full list of products from the static JSON catalog.
 * 
 * Strategy:
 * - Uses `zod` for runtime validation against `Product` schema.
 * - Memoizes the result (`_validProducts`) to minimize parsing overhead on repeated calls.
 * - Returns an empty array (and logs error) if validation fails, ensuring fail-safe behavior.
 * 
 * @returns {Product[]} Array of validated Product objects.
 */
export function listProducts(): Product[] {
  if (_validProducts) return _validProducts;

  const results = z.array(productSchema).safeParse(productsRaw);

  if (!results.success) {
    logger.error("[Catalog] Invalid products.json structure", { errors: results.error.format() });
    // Fallback? Return empty or try to return raw as best effort? 
    // Best effort: filter invalid ones if possible, but schema validates array.
    // For now, return empty to prevent crash, but logs will alert ops.
    return [];
  }

  _validProducts = results.data as Product[];
  return _validProducts;
}

export function allProductSlugs(): string[] {
  return listProducts().map((p) => p.slug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return listProducts().find((p) => p.slug === slug);
}
