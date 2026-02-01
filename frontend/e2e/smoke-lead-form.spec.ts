import { expect, test } from "@playwright/test";


test("Become Partner form can submit successfully", async ({ page }) => {
  const runId = process.env.PLAYWRIGHT_E2E_RUN_ID ?? String(Date.now());

  // Use canonical locale path to avoid environment-dependent redirects.
  await page.goto("/en/partnership");

  const submit = page.getByRole("button", { name: /^submit$/i });
  await expect(submit).toBeVisible();
  await expect(submit).toBeDisabled();

  // "E2E" string in business name triggers Server Action bypass (success)
  await page.getByLabel(/business name/i).fill(`Salon Mawar (E2E ${runId})`);
  await page.getByLabel(/contact name/i).fill(`Dewi (E2E ${runId})`);
  await page.getByLabel(/whatsapp number/i).fill("081234567890");
  await page.getByLabel(/city/i).fill("Bandung");
  await page.getByLabel(/salon type/i).selectOption("SALON");

  // Consent is required.
  const consent = page.getByRole("checkbox", { name: /consent to be contacted/i });
  await consent.check();

  await expect(submit).toBeEnabled();

  await submit.click();

  await expect(page.getByText(/thank you/i)).toBeVisible();
  await expect(page.getByText(/we received your details/i)).toBeVisible();
});

test("Become Partner form requires consent before enabling submit", async ({ page }) => {
  await page.goto("/en/partnership");

  const submit = page.getByRole("button", { name: /^submit$/i });
  await expect(submit).toBeVisible();

  await page.getByLabel(/business name/i).fill("Salon Mawar");
  await page.getByLabel(/contact name/i).fill("Dewi");
  await page.getByLabel(/whatsapp number/i).fill("081234567890");
  await page.getByLabel(/city/i).fill("Bandung");
  await page.getByLabel(/salon type/i).selectOption("SALON");

  // Without consent, submit must stay disabled.
  await expect(submit).toBeDisabled();

  await page.getByRole("checkbox", { name: /consent to be contacted/i }).check();
  await expect(submit).toBeEnabled();
});

test("Become Partner shows friendly message on rate limit (429)", async ({ page }) => {
  await page.goto("/en/partnership");

  // TRIGGER_429 forces the server action to return 'rate_limited' error
  await page.getByLabel(/business name/i).fill("Salon Trigger TRIGGER_429");
  await page.getByLabel(/contact name/i).fill("Dewi");
  await page.getByLabel(/whatsapp number/i).fill("081234567890");
  await page.getByLabel(/city/i).fill("Bandung");
  await page.getByLabel(/salon type/i).selectOption("SALON");
  await page.getByRole("checkbox", { name: /consent to be contacted/i }).check();

  const submit = page.getByRole("button", { name: /^submit$/i });
  await submit.click();

  await expect(page.getByText(/too many requests/i)).toBeVisible();
  await expect(submit).toBeEnabled();
});

test("Become Partner shows server error message (>=400)", async ({ page }) => {
  await page.goto("/en/partnership");

  // TRIGGER_500 forces the server action to return 'internal_error'
  await page.getByLabel(/business name/i).fill("Salon Trigger TRIGGER_500");
  await page.getByLabel(/contact name/i).fill("Dewi");
  await page.getByLabel(/whatsapp number/i).fill("081234567890");
  await page.getByLabel(/city/i).fill("Bandung");
  await page.getByLabel(/salon type/i).selectOption("SALON");
  await page.getByRole("checkbox", { name: /consent to be contacted/i }).check();

  const submit = page.getByRole("button", { name: /^submit$/i });
  await submit.click();

  // Matches 'Submission failed. Please try again.' from en.json
  await expect(page.getByText(/submission failed/i)).toBeVisible();
  await expect(submit).toBeEnabled();
});
