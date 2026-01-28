import { expect, test } from "@playwright/test";

test("Navigating to non-existent route shows 404 page", async ({ page }) => {
    // Navigate to a random non-existent path
    const response = await page.goto("/en/non-existent-page-12345");

    // Verify status code is 404
    expect(response?.status()).toBe(404);

    // Verify UI content matches 404 page
    // "Page Not Found" or localized equivalent
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Ideally check for specific text if known, e.g. "404" or "Page Not Found"
    // Assuming the 404 page has a distinct title or text
    const headings = await page.getByRole("heading").allInnerTexts();
    expect(headings.some(h => h.includes("404") || h.includes("Found"))).toBeTruthy();

    // Verify "Back to Home" link exists
    await expect(page.getByRole("link", { name: /home|kembali/i })).toBeVisible();
});
