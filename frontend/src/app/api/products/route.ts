import { NextResponse } from "next/server";
import products from "@/content/products.json";

export const runtime = "edge"; // fast response

/**
 * Product API (Task 15)
 * Serves static product data with aggressive caching.
 * 
 * Cache Strategy:
 * - s-maxage=3600: Cache in CDN (Vercel Edge) for 1 hour.
 * - stale-while-revalidate=86400: Serve stale content for up to 24 hours while revalidating.
 */
export async function GET() {
    return NextResponse.json(products, {
        status: 200,
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
            "CDN-Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
            "Vercel-CDN-Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
    });
}
