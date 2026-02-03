import { expect, test } from "@playwright/test";

test("WhatsApp CTA renders a usable wa.me link", async ({ page }) => {
  // Use canonical locale path to avoid environment-dependent redirects
  await page.goto("/en", { waitUntil: "networkidle" });

  // CTA appears after scroll (Design V2 behavior)
  await page.evaluate(() => window.scrollTo(0, 800));
  await page.waitForFunction(() => window.scrollY >= 500);

  const cta = page.getByTestId("whatsapp-cta");
  await expect(cta).toBeVisible();

  const href = await cta.getAttribute("href");
  expect(href, "WhatsApp CTA must have an href").toBeTruthy();
  expect(href!).not.toBe("#");
  expect(href!).toMatch(/^https:\/\/wa\.me\//);
});
