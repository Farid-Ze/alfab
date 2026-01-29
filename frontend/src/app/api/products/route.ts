import { NextResponse } from "next/server";
import products from "@/content/data/products.json";

export const runtime = "nodejs"; // Strict adherence to "Hybrid Node.js" Arch (Paket A)

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
            // TOGAF: Vendor-Agnostic Caching + Vercel Optimization
            // Reduced to 60s for CMS updates, but kept Vercel headers for Edge performance.
            "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
            "CDN-Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
            "Vercel-CDN-Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
    });
}
