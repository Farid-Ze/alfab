import { test, expect } from "@playwright/test";

/**
 * Homepage E2E Tests
 *
 * Homepage is currently in maintenance mode.
 * Tests verify maintenance page renders correctly.
 * When homepage content goes live, update these tests to check
 * Hero, BrandShowcase, Pillars, Stats sections.
 */

test.describe("Homepage", () => {
    test("should load homepage successfully", async ({ page }) => {
        await page.goto("/id", { waitUntil: "domcontentloaded" });
        await expect(page).toHaveTitle(/Alfa Beauty/);
    });

    test("should display maintenance page with heading", async ({ page }) => {
        await page.goto("/id", { waitUntil: "domcontentloaded" });
        const heading = page.locator("h1").first();
        await expect(heading).toBeVisible({ timeout: 10000 });
        await expect(heading).toHaveText(/Beranda/); // ID locale maintenance title
    });

    test("should have locale switcher visible", async ({ page }) => {
        await page.goto("/id", { waitUntil: "domcontentloaded" });
        const localeSwitcher = page.locator("header a[href='/en']");
        await expect(localeSwitcher).toBeVisible({ timeout: 10000 });
    });

    test("should have WhatsApp CTA visible", async ({ page }) => {
        await page.goto("/id", { waitUntil: "domcontentloaded" });
        // WhatsApp button has entrance animation delay
        const whatsappBtn = page.locator('a[aria-label="Hubungi via WhatsApp"]');
        await expect(whatsappBtn).toBeVisible({ timeout: 5000 });
    });

    test("should have navigation visible", async ({ page }) => {
        await page.goto("/id", { waitUntil: "domcontentloaded" });
        const nav = page.locator("header nav");
        await expect(nav).toBeVisible({ timeout: 10000 });
    });

    test("should have back to home CTA on maintenance page", async ({ page }) => {
        await page.goto("/id", { waitUntil: "domcontentloaded" });
        const cta = page.locator("a.btn").first();
        await expect(cta).toBeVisible({ timeout: 10000 });
    });
});
