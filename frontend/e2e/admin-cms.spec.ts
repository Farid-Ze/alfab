import { test, expect } from "@playwright/test";

/**
 * Admin CMS E2E Tests
 * ITIL OPS-10: Quality Gate for CMS Admin Panel
 * 
 * These tests verify critical admin functionality.
 * NOTE: Requires Supabase to be configured with test user.
 * 
 * Test user credentials should be set via environment variables:
 * - PLAYWRIGHT_ADMIN_EMAIL
 * - PLAYWRIGHT_ADMIN_PASSWORD
 */

const ADMIN_EMAIL = process.env.PLAYWRIGHT_ADMIN_EMAIL ?? "test@example.com";
const ADMIN_PASSWORD = process.env.PLAYWRIGHT_ADMIN_PASSWORD ?? "testpassword123";

test.describe("Admin Login", () => {
    test("should show login page when not authenticated", async ({ page }) => {
        await page.goto("/admin", { waitUntil: "networkidle" });

        // Should redirect to login page
        await expect(page).toHaveURL(/\/admin\/login/);

        // Login form should be visible
        const emailInput = page.getByRole("textbox", { name: /email/i });
        const passwordInput = page.locator('input[type="password"]');
        const loginButton = page.getByRole("button", { name: /login|masuk/i });

        await expect(emailInput).toBeVisible();
        await expect(passwordInput).toBeVisible();
        await expect(loginButton).toBeVisible();
    });

    test("should show error with invalid credentials", async ({ page }) => {
        await page.goto("/admin/login", { waitUntil: "networkidle" });

        // Fill invalid credentials
        await page.getByRole("textbox", { name: /email/i }).fill("invalid@example.com");
        await page.locator('input[type="password"]').fill("wrongpassword");
        await page.getByRole("button", { name: /login|masuk/i }).click();

        // Error message should appear
        const errorMessage = page.locator('[role="alert"], .text-red-500, .error');
        await expect(errorMessage).toBeVisible({ timeout: 10000 });
    });

    test("should have proper form accessibility", async ({ page }) => {
        await page.goto("/admin/login", { waitUntil: "networkidle" });

        // Form should have proper labels
        const emailLabel = page.getByText(/email/i);
        const passwordLabel = page.getByText(/password/i);

        await expect(emailLabel).toBeVisible();
        await expect(passwordLabel).toBeVisible();
    });
});

test.describe("Admin Dashboard (Smoke)", () => {
    // Skip authentication tests if no credentials provided
    test.skip(
        !process.env.PLAYWRIGHT_ADMIN_EMAIL,
        "Admin credentials not configured - skipping authenticated tests"
    );

    test.beforeEach(async ({ page }) => {
        // Login flow
        await page.goto("/admin/login", { waitUntil: "networkidle" });
        await page.getByRole("textbox", { name: /email/i }).fill(ADMIN_EMAIL);
        await page.locator('input[type="password"]').fill(ADMIN_PASSWORD);
        await page.getByRole("button", { name: /login|masuk/i }).click();

        // Wait for redirect to dashboard
        await page.waitForURL(/\/admin(?!\/login)/, { timeout: 15000 });
    });

    test("should display dashboard with stats", async ({ page }) => {
        // Dashboard heading should be visible
        const heading = page.getByRole("heading", { name: /dashboard/i });
        await expect(heading).toBeVisible();

        // Stats cards should be present
        const statsCards = page.locator('[data-testid="stats-card"], .bg-white.p-6');
        await expect(statsCards.first()).toBeVisible();
    });

    test("should have working sidebar navigation", async ({ page }) => {
        // Sidebar should be visible
        const sidebar = page.locator("aside, nav").first();
        await expect(sidebar).toBeVisible();

        // Navigation links should be present
        const productsLink = page.getByRole("link", { name: /products|produk/i });
        const articlesLink = page.getByRole("link", { name: /articles|artikel/i });
        const eventsLink = page.getByRole("link", { name: /events|acara/i });

        await expect(productsLink).toBeVisible();
        await expect(articlesLink).toBeVisible();
        await expect(eventsLink).toBeVisible();
    });
});

test.describe("Admin Products Page (Smoke)", () => {
    test.skip(
        !process.env.PLAYWRIGHT_ADMIN_EMAIL,
        "Admin credentials not configured"
    );

    test.beforeEach(async ({ page }) => {
        await page.goto("/admin/login", { waitUntil: "networkidle" });
        await page.getByRole("textbox", { name: /email/i }).fill(ADMIN_EMAIL);
        await page.locator('input[type="password"]').fill(ADMIN_PASSWORD);
        await page.getByRole("button", { name: /login|masuk/i }).click();
        await page.waitForURL(/\/admin(?!\/login)/, { timeout: 15000 });
    });

    test("should load products list page", async ({ page }) => {
        await page.goto("/admin/products", { waitUntil: "networkidle" });

        // Page heading
        const heading = page.getByRole("heading", { name: /products|produk/i });
        await expect(heading).toBeVisible();

        // Add new button should be visible
        const addButton = page.getByRole("link", { name: /add|tambah|new|baru/i });
        await expect(addButton).toBeVisible();
    });

    test("should navigate to new product page", async ({ page }) => {
        await page.goto("/admin/products", { waitUntil: "networkidle" });

        // Click add new button
        const addButton = page.getByRole("link", { name: /add|tambah|new|baru/i });
        await addButton.click();

        // Should be on new product page
        await expect(page).toHaveURL(/\/admin\/products\/new/);

        // Form should be visible
        const form = page.locator("form");
        await expect(form).toBeVisible();
    });
});

test.describe("Admin Articles Page (Smoke)", () => {
    test.skip(
        !process.env.PLAYWRIGHT_ADMIN_EMAIL,
        "Admin credentials not configured"
    );

    test.beforeEach(async ({ page }) => {
        await page.goto("/admin/login", { waitUntil: "networkidle" });
        await page.getByRole("textbox", { name: /email/i }).fill(ADMIN_EMAIL);
        await page.locator('input[type="password"]').fill(ADMIN_PASSWORD);
        await page.getByRole("button", { name: /login|masuk/i }).click();
        await page.waitForURL(/\/admin(?!\/login)/, { timeout: 15000 });
    });

    test("should load articles list page with locale columns", async ({ page }) => {
        await page.goto("/admin/articles", { waitUntil: "networkidle" });

        // Page heading
        const heading = page.getByRole("heading", { name: /articles|artikel/i });
        await expect(heading).toBeVisible();

        // Should have locale indicators (EN/ID)
        const enIndicator = page.getByText(/english|en/i);
        const idIndicator = page.getByText(/indonesia|id/i);

        // At least one should be visible
        const enVisible = await enIndicator.first().isVisible().catch(() => false);
        const idVisible = await idIndicator.first().isVisible().catch(() => false);
        expect(enVisible || idVisible).toBe(true);
    });

    test("should navigate to new article page", async ({ page }) => {
        await page.goto("/admin/articles", { waitUntil: "networkidle" });

        const addButton = page.getByRole("link", { name: /add|tambah|new|baru/i });
        await addButton.click();

        await expect(page).toHaveURL(/\/admin\/articles\/new/);
    });
});

test.describe("Admin Events Page (Smoke)", () => {
    test.skip(
        !process.env.PLAYWRIGHT_ADMIN_EMAIL,
        "Admin credentials not configured"
    );

    test.beforeEach(async ({ page }) => {
        await page.goto("/admin/login", { waitUntil: "networkidle" });
        await page.getByRole("textbox", { name: /email/i }).fill(ADMIN_EMAIL);
        await page.locator('input[type="password"]').fill(ADMIN_PASSWORD);
        await page.getByRole("button", { name: /login|masuk/i }).click();
        await page.waitForURL(/\/admin(?!\/login)/, { timeout: 15000 });
    });

    test("should load events list page", async ({ page }) => {
        await page.goto("/admin/events", { waitUntil: "networkidle" });

        const heading = page.getByRole("heading", { name: /events|acara/i });
        await expect(heading).toBeVisible();
    });

    test("should navigate to new event page", async ({ page }) => {
        await page.goto("/admin/events", { waitUntil: "networkidle" });

        const addButton = page.getByRole("link", { name: /add|tambah|new|baru/i });
        await addButton.click();

        await expect(page).toHaveURL(/\/admin\/events\/new/);
    });
});
