import { test, expect } from "@playwright/test";

/**
 * Homepage E2E Tests
 * 
 * Each test navigates independently for isolation.
 */

test.describe("Homepage", () => {
    test("should load homepage successfully", async ({ page }) => {
        await page.goto("/id", { waitUntil: "domcontentloaded" });
        await expect(page).toHaveTitle(/Alfa Beauty/);
    });

    test("should display hero section", async ({ page }) => {
        await page.goto("/id", { waitUntil: "domcontentloaded" });
        const heading = page.locator("h1").first();
        await expect(heading).toBeVisible({ timeout: 10000 });
    });

    test("should have locale switcher visible", async ({ page }) => {
        await page.goto("/id", { waitUntil: "domcontentloaded" });
        const localeSwitcher = page.locator("header a[href='/en']");
        await expect(localeSwitcher).toBeVisible({ timeout: 10000 });
    });

    test("should have WhatsApp CTA visible", async ({ page }) => {
        await page.goto("/id", { waitUntil: "domcontentloaded" });
        // WhatsApp button has entrance animation delay
        const whatsappBtn = page.locator('a[aria-label="Contact via WhatsApp"]');
        await expect(whatsappBtn).toBeVisible({ timeout: 5000 });
    });

    test("should have navigation visible", async ({ page }) => {
        await page.goto("/id", { waitUntil: "domcontentloaded" });
        const nav = page.locator("header nav");
        await expect(nav).toBeVisible({ timeout: 10000 });
    });
});
