import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 375, height: 667 } }); // Force mobile view

test("Mobile Menu can be toggled via hamburger button", async ({ page }) => {
    await page.goto("/en");

    // Verify hamburger button is visible on mobile
    const menuButton = page.getByRole("button", { name: /open menu/i });
    await expect(menuButton).toBeVisible();

    // Dialog should be hidden initially
    // Note: Depending on implementation, it might not exist in DOM or be hidden
    // We check for absence or hidden state.
    const menuDialog = page.getByRole("dialog", { name: /navigation menu/i }).or(page.getByTestId("mobile-menu"));
    await expect(menuDialog).toBeHidden();

    // Open menu
    await menuButton.click();

    // Verify menu is visible
    await expect(menuDialog).toBeVisible();

    // Verify navigation links are present
    await expect(page.getByRole("link", { name: /products/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /partnership/i })).toBeVisible();

    // Close menu (assuming close button exists or clicking outside/link works)
    const closeButton = page.getByRole("button", { name: /close menu/i }).or(menuButton);
    await closeButton.click();

    // Verify menu is closed
    await expect(menuDialog).toBeHidden();
});
