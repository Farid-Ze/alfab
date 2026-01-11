import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    // Paket A §15 — Website (HTML) security headers baseline.
    // Note: CSP here is intentionally minimal to avoid breaking Next.js runtime.
    // We only enforce the baseline directives required by the spec.
    const csp = [
      "base-uri 'none'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join("; ");

    return [
      {
        // Apply broadly; these headers are safe for both HTML and static assets.
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=()" },
          // Legacy/defense-in-depth (optional per spec).
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
};

export default nextConfig;
