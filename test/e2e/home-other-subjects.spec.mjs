import { expect, test } from '@playwright/test';

test('homepage Other subjects card links to real subject pages without disturbing other sections', async ({ page }, testInfo) => {
  await page.goto('/');
  const card = page.getByRole('region', { name: 'Other subjects' });
  await expect(card).toBeVisible();
  await expect(card.getByRole('heading', { name: /^CISCE/ })).toBeVisible();
  await expect(card.getByRole('heading', { name: /^CBSE/ })).toBeVisible();
  await expect(card.getByRole('link', { name: /view the cbse curriculum/i })).toHaveAttribute('href', '/learn/cbse');
  const links = card.locator('ul a');
  expect(await links.count()).toBeGreaterThan(0);
  await expect(card.getByRole('link', { name: /browse all subjects/i })).toHaveAttribute('href', '/learn');

  // Existing sections are still present.
  await expect(page.getByRole('heading', { name: 'Select Your Curriculum Pathway' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Build confidence with Microsoft Office' })).toBeVisible();
  await expect(page.getByRole('heading', { name: /hey, i.m ace/i })).toBeVisible();

  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(0);
  await card.scrollIntoViewIfNeeded();
  await card.screenshot({ path: testInfo.outputPath(`other-subjects-${testInfo.project.name}.png`) });

  // The first card opens a real subject page.
  const href = await links.first().getAttribute('href');
  await links.first().click();
  await expect(page).toHaveURL(new RegExp(`${href}$`));
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});
