import type { NextConfig } from "next";

// Bundle analyzer for performance monitoring
const withBundleAnalyzer = process.env.ANALYZE === "true"
  ? require("@next/bundle-analyzer")({ enabled: true })
  : (config: NextConfig) => config;

/**
 * Next.js 16 Enterprise Configuration
 * 
 * Performance Features:
 * - Image optimization (AVIF/WebP)
 * - Bundle optimization (tree-shaking icons)
 * - Compression (Brotli via Vercel)
 * - Security headers (OWASP baseline)
 */
const nextConfig: NextConfig = {
  // React strict mode for better debugging
  reactStrictMode: true,

  // Enable compression (Vercel uses Brotli by default)
  compress: true,

  // Powered-by header removal (security)
  poweredByHeader: false,

  // Security headers (OWASP baseline)
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-DNS-Prefetch-Control", value: "on" },
        { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=()" },
      ],
    },
    // Static assets - immutable caching
    {
      source: "/_next/static/(.*)",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      ],
    },
    // Images - long cache with revalidation
    {
      source: "/images/(.*)",
      headers: [
        { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
      ],
    },
  ],

  // Image optimization (Agency-Level)
  images: {
    // Enable modern formats (AVIF > WebP > JPEG)
    formats: ["image/avif", "image/webp"],

    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],

    // Minimize layout shift
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days

    // Remote patterns
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },

  // Experimental features (Next.js 16)
  experimental: {
    // Tree-shake icon libraries
    optimizePackageImports: ["lucide-react", "framer-motion"],

    // Note: typedRoutes disabled - incompatible with dynamic [locale] routes
    // typedRoutes: true,

    // Server Actions optimization
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },

  // Logging configuration
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === "development",
    },
  },
};

export default withBundleAnalyzer(nextConfig);
