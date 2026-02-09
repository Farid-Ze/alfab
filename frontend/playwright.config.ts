import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
    testDir: "./e2e",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 1, // Retry once locally for flaky tests
    workers: process.env.CI ? 1 : undefined,
    reporter: "html",
    timeout: 30000, // 30 seconds per test
    use: {
        baseURL: "http://localhost:3000",
        trace: "on-first-retry",
        actionTimeout: 10000, // 10 seconds for actions
        ignoreHTTPSErrors: true,
    },
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
        {
            name: "firefox",
            use: { ...devices["Desktop Firefox"] },
        },
        {
            name: "webkit",
            use: { ...devices["Desktop Safari"] },
        },
        {
            name: "Mobile Chrome",
            use: { ...devices["Pixel 5"] },
        },
        {
            name: "Mobile Safari",
            use: { ...devices["iPhone 12"] },
        },
        {
            name: "Legacy Mobile",
            use: { ...devices["iPhone 8"] },
        },
        {
            name: "Tablet",
            use: { ...devices["iPad (gen 7)"] },
        },
    ],
    webServer: {
        command: "npm run dev",
        url: "http://localhost:3000",
        reuseExistingServer: !process.env.CI,
        timeout: 60000, // 60 seconds to start server
    },
});
