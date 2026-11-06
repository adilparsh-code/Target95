import { expect, test } from '@playwright/test';

test('homepage introduces Ace without disturbing the launcher or layout', async ({ page }, testInfo) => {
  await page.goto('/');
  const intro = page.getByRole('region', { name: /hey, i.m ace/i });
  await expect(intro).toBeVisible();
  await expect(intro).toContainText('Your study companion for reaching your Target95');
  const mascot = intro.locator('svg.ace-mascot');
  await expect(mascot).toBeVisible();
  await expect(mascot).toHaveAttribute('aria-hidden', 'true');

  // Existing homepage content is still present and Ace never overlaps it.
  await expect(page.getByRole('heading', { name: 'Select Your Curriculum Pathway' })).toBeVisible();
  await expect(page.getByRole('link', { name: /explore office lessons/i })).toBeVisible();
  const introBox = await intro.boundingBox();
  const launcherBox = await page.getByRole('heading', { name: 'Select Your Curriculum Pathway' }).boundingBox();
  expect(introBox.y + introBox.height).toBeLessThanOrEqual(launcherBox.y);

  // No horizontal overflow introduced at this viewport.
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
  await page.screenshot({ path: testInfo.outputPath(`home-ace-${testInfo.project.name}.png`) });
});

test('Ace animation is finite and disabled for reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const sprite = page.locator('svg.ace-mascot .ace-sprite');
  const animated = await sprite.evaluate((el) => ({ name: getComputedStyle(el).animationName, count: getComputedStyle(el).animationIterationCount }));
  expect(animated.name).toBe('ace-hop');
  expect(animated.count).toBe('2');

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(sprite).toHaveCSS('animation-name', 'none');
  await expect(page.locator('svg.ace-mascot .ace-arm-wave')).toHaveCSS('animation-name', 'none');
});
