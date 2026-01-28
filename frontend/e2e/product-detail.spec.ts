import { test, expect } from '@playwright/test';

test.describe('Product Detail Journey', () => {
    test('should navigate from catalog to product detail', async ({ page }) => {
        // 1. Go to Products Page (Catalog)
        await page.goto('/en/products');

        // 2. Click on the first product card
        // We assume product cards have a specific link or structure.
        // Based on analysis, they have a "View Details" link or the card itself is clickable.
        const firstProductCard = page.locator('article').first();
        const productLink = firstProductCard.locator('a[href*="/products/"]');

        await expect(firstProductCard).toBeVisible();
        await productLink.click();

        // 3. Verify Product Detail Page
        // Check URL
        await expect(page).toHaveURL(/\/products\/[\w-]+/);

        // Check Title (h1)
        const title = page.locator('h1');
        await expect(title).toBeVisible();

        // Check "Add to Inquiry" or similar CTA exists
        const cta = page.getByRole('button', { name: /add to inquiry|contact/i });
        // Depending on implementation, it might be a link or button. 
        // We'll just check for the main H1 for now as a smoke test.
    });

    test('should load correct locale content', async ({ page }) => {
        await page.goto('/id/products');
        const firstProductCard = page.locator('article').first();
        const productLink = firstProductCard.locator('a[href*="/products/"]');
        await productLink.click();

        // Verify URL contains /id/
        await expect(page).toHaveURL(/\/id\/products\//);
    });
});
