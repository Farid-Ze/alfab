import type { NextConfig } from "next";

// Bundle analyzer for performance monitoring
const withBundleAnalyzer = process.env.ANALYZE === "true"
  ? require("@next/bundle-analyzer")({ enabled: true })
  : (config: NextConfig) => config;

/**
 * Next.js 16 Configuration
 * 
 * Key Features:
 * - Turbopack enabled by default
 * - Security headers (per paket-a.md §15)
 * - Image optimization
 * - Bundle analyzer (npm run analyze)
 */
const nextConfig: NextConfig = {
  // Enable React strict mode
  reactStrictMode: true,

  // Security headers (OWASP baseline)
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        },
        {
          key: "X-Frame-Options",
          value: "DENY",
        },
        {
          key: "Permissions-Policy",
          value: "geolocation=(), microphone=(), camera=()",
        },
      ],
    },
  ],

  // Image optimization domains
  images: {
    remotePatterns: [
      // Supabase Storage
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },

  // Experimental features
  experimental: {
    // Enable Turbopack for dev (already default in 16)
    // turbopack: true,
  },
};

export default withBundleAnalyzer(nextConfig);
