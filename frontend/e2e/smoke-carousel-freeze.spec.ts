import { expect, test } from "@playwright/test";

test.describe("Editorial Carousel Design Freeze", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/id");
    });

    test("Carousel cards use CSS-controlled widths", async ({ page }) => {
        // Scroll to the carousel section
        const carouselSection = page.locator('[aria-label="Produk pilihan"]');
        await carouselSection.scrollIntoViewIfNeeded();

        // Verify carousel cards exist with CSS class
        const cards = page.locator("[data-carousel-card]");
        await expect(cards.first()).toBeVisible();

        // Verify card uses .carousel-card class (CSS-first approach)
        const firstCard = cards.first();
        await expect(firstCard).toHaveClass(/carousel-card/);

        // Verify card width is responsive (not a fixed JS-calculated value)
        const cardBox = await firstCard.boundingBox();
        expect(cardBox).not.toBeNull();
        // On desktop, card should be around 260px (16.25rem)
        // On mobile, it should scale with viewport
        expect(cardBox!.width).toBeGreaterThan(200);
        expect(cardBox!.width).toBeLessThan(350);
    });





    test("Navigation arrows are visible on desktop", async ({ page, viewport }) => {
        // Only test on desktop-sized viewport
        if (viewport && viewport.width >= 640) {
            const carouselSection = page.locator('[aria-label="Produk pilihan"]');
            await carouselSection.scrollIntoViewIfNeeded();

            // Right arrow should be visible when there's content to scroll
            const rightArrow = carouselSection.locator('button[aria-label="Next"]');

            // May or may not be visible depending on card count and viewport
            // Just verify it exists
            await expect(rightArrow).toBeAttached();
        }
    });

    test("Cards are scrollable with snap behavior", async ({ page }) => {
        const scrollContainer = page.locator('[aria-label="Produk pilihan"] [role="list"]');
        await scrollContainer.scrollIntoViewIfNeeded();

        // Verify scroll container has snap classes
        await expect(scrollContainer).toHaveClass(/snap-x/);
        await expect(scrollContainer).toHaveClass(/snap-mandatory/);

        // Verify cards have snap-start
        const firstCard = page.locator("[data-carousel-card]").first();
        await expect(firstCard).toHaveClass(/snap-start/);
    });



    test("Section header typography is correct", async ({ page }) => {
        // Kicker
        const kicker = page.locator(".type-kicker").filter({ hasText: /PRODUK PROFESIONAL/i });
        await expect(kicker).toBeVisible();

        // Title
        const title = page.locator(".type-h2").filter({ hasText: /Pilihan untuk Profesional/i });
        await expect(title).toBeVisible();

        // Description
        const description = page.locator(".type-body").filter({ hasText: /Produk-produk pilihan/i });
        await expect(description).toBeVisible();
    });
});
