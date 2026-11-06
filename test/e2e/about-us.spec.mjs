import { expect, test } from '@playwright/test';

test('About Us shows the coding teacher, story, and preserved disclaimer with a working email link', async ({ page }, testInfo) => {
  await page.goto('/about');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Computer Science');
  await expect(page.getByRole('heading', { name: 'Behind Target95' })).toBeVisible();
  await expect(page.getByText("A teacher's vision. A developer's dedication.")).toBeVisible();

  const scene = page.getByRole('img', { name: /teacher writing code on a laptop/i });
  await expect(scene).toBeVisible();

  // Existing sections are still present.
  for (const name of ['Our Mission', 'What We Offer', 'Our Impact', 'Built for Students, Driven by Passion']) {
    await expect(page.getByRole('heading', { name })).toBeVisible();
  }

  // Disclaimer: new message, preserved educational/exam meaning, official email.
  const disclaimer = page.getByRole('region', { name: 'Built with Dedication. Made for Learning.' });
  await expect(disclaimer).toContainText('human errors, unintentional inaccuracies, or technical issues may occasionally occur');
  await expect(disclaimer).toContainText('we do not guarantee specific examination results');
  await expect(disclaimer).not.toContainText(/error-free|100% accurate|guaranteed accuracy/i);
  await expect(disclaimer.getByRole('link', { name: 'support@target95.com' })).toHaveAttribute('href', 'mailto:support@target95.com');
  await expect(disclaimer.getByRole('link', { name: 'Terms of Service' })).toHaveAttribute('href', '/terms');

  // Navigation and footer survive; no horizontal overflow.
  await expect(page.getByRole('navigation').first()).toBeVisible();
  await expect(page.getByRole('contentinfo')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(0);

  await scene.scrollIntoViewIfNeeded();
  await page.screenshot({ path: testInfo.outputPath(`about-${testInfo.project.name}.png`), fullPage: true });
});

test('About Us illustration does not shift layout and is static under reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/about');
  const scene = page.getByRole('img', { name: /teacher writing code on a laptop/i });
  const before = await scene.boundingBox();
  await page.waitForTimeout(1500);
  const after = await scene.boundingBox();
  expect(after).toEqual(before);

  const animated = await page.locator('svg[role="img"] rect[class*="codeLine"]').first().evaluate((el) => getComputedStyle(el).animationName);
  expect(animated).not.toBe('none');

  await page.emulateMedia({ reducedMotion: 'reduce' });
  const names = await page.locator('svg[role="img"] [class*="codeLine"], svg[role="img"] [class*="cursor"], svg[role="img"] [class*="symbol"], svg[role="img"] [class*="handFront"]')
    .evaluateAll((els) => els.map((el) => getComputedStyle(el).animationName));
  expect(names.length).toBeGreaterThan(0);
  expect(names.every((name) => name === 'none')).toBe(true);
});
