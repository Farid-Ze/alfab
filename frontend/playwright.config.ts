import { defineConfig, devices } from "@playwright/test";

const htmlReportDir = process.env.PLAYWRIGHT_HTML_REPORT_DIR ?? "playwright-report";
const outputDir = process.env.PLAYWRIGHT_OUTPUT_DIR ?? "test-results";
// Default to a fresh production-like server to make middleware/redirect behavior deterministic.
// Reuse only when explicitly requested.
const reuseExistingServer = process.env.PLAYWRIGHT_REUSE_EXISTING_SERVER === "true";
const skipWebServer = process.env.PLAYWRIGHT_SKIP_WEBSERVER === "true";

// Paket A quality gate: Playwright smoke tests for
// - WhatsApp CTA always works
// - Become Partner lead form does not break
export default defineConfig({
  testDir: "./e2e",
  timeout: 60_000,
  expect: {
    timeout: 30_000,
  },
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI
    ? [["list"], ["html", { open: "never", outputFolder: htmlReportDir }]]
    : [["html", { open: "on-failure", outputFolder: htmlReportDir }]],
  outputDir,
  use: {
    // Prefer localhost on Windows to avoid IPv4/IPv6 binding mismatches.
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3001",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  globalSetup: require.resolve("./e2e/global-setup"),
  globalTeardown: require.resolve("./e2e/global-teardown"),
  webServer: skipWebServer
    ? undefined
    : {
      // Use a production-like server for deterministic middleware/redirect behavior.
      // Run on port 3001 to avoid conflict with local dev server.
      // Use npx next start directly to bypass package.json hardcoded port 3000.
      command: "npm run build && npx next start -p 3001",
      // Root (/) is intentionally non-routable in this app (locale-prefixed URLs only).
      // Use a canonical locale path so Playwright can detect server readiness.
      url: "http://localhost:3001/en",
      reuseExistingServer: false, // Force fresh server
      timeout: 120_000,
      env: {
        // Website runtime config for e2e.
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001",

        // E2E uses `next start`. Disable `output: "standalone"` for this build to avoid
        // standalone/start mismatch warnings and Windows output tracing issues.
        NEXT_DISABLE_STANDALONE: "true",

        // Ensure WhatsApp CTA produces a wa.me link in UI smoke tests.
        NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "6281234567890",
        NEXT_PUBLIC_WHATSAPP_PREFILL:
          process.env.NEXT_PUBLIC_WHATSAPP_PREFILL ?? "Hello Alfa Beauty, I would like to consult.",
        NEXT_PUBLIC_FALLBACK_EMAIL: process.env.NEXT_PUBLIC_FALLBACK_EMAIL ?? "hello@example.com",
      },
    },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
