import { z } from "zod";
import type { Product } from "@/lib/types";
import { logger } from "@/lib/logger";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import productsRaw from "@/content/data/products.json";

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
}).passthrough();

// Memoize valid products to avoid re-parsing on every request
let _validProducts: Product[] | null = null;
let _supabaseProducts: Product[] | null = null;

/**
 * Fetch products from Supabase (if configured)
 */
async function fetchProductsFromSupabase(): Promise<Product[] | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  try {
    const { data, error } = await supabase()
      .from("products")
      .select("*")
      .order("name");

    if (error) {
      logger.error("[Catalog] Supabase fetch error", { error });
      return null;
    }

    if (!data || data.length === 0) {
      return null; // No data in DB, fallback to JSON
    }

    // Map Supabase columns to Product type
    const products: Product[] = data.map((row) => ({
      slug: row.slug,
      name: row.name,
      brand: row.brand,
      audience: row.audience || [],
      functions: row.functions || [],
      categories: row.categories || [],
      summary: row.summary || "",
      benefits: row.benefits || [],
      howToUse: row.how_to_use || "",
      image: row.image_url ? { url: row.image_url } : undefined,
    }));

    return products;
  } catch (err) {
    logger.error("[Catalog] Supabase connection error", { error: err });
    return null;
  }
}

/**
 * Retrieves the full list of products from JSON catalog (fallback).
 */
function getProductsFromJSON(): Product[] {
  if (_validProducts) return _validProducts;

  const results = z.array(productSchema).safeParse(productsRaw);

  if (!results.success) {
    logger.error("[Catalog] Invalid products.json structure", { errors: results.error.format() });
    return [];
  }

  _validProducts = results.data as Product[];
  return _validProducts;
}

/**
 * Retrieves the full list of products.
 * 
 * Strategy (Strangler Fig Pattern):
 * 1. Try Supabase first (if configured and has data)
 * 2. Fallback to static JSON catalog
 * 
 * @returns {Promise<Product[]>} Array of validated Product objects.
 */
export async function listProductsAsync(): Promise<Product[]> {
  // Check cached Supabase products first
  if (_supabaseProducts) return _supabaseProducts;

  // Try Supabase
  const supabaseProducts = await fetchProductsFromSupabase();
  if (supabaseProducts && supabaseProducts.length > 0) {
    _supabaseProducts = supabaseProducts;
    return supabaseProducts;
  }

  // Fallback to JSON
  return getProductsFromJSON();
}

/**
 * Synchronous version for backward compatibility.
 * Uses only JSON data (no Supabase).
 */
export function listProducts(): Product[] {
  return getProductsFromJSON();
}

export function allProductSlugs(): string[] {
  return listProducts().map((p) => p.slug);
}

export async function allProductSlugsAsync(): Promise<string[]> {
  const products = await listProductsAsync();
  return products.map((p) => p.slug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return listProducts().find((p) => p.slug === slug);
}

export async function getProductBySlugAsync(slug: string): Promise<Product | undefined> {
  const products = await listProductsAsync();
  return products.find((p) => p.slug === slug);
}
