import { expect, test } from '@playwright/test';

const browserProblems = new WeakMap();

test.beforeEach(({ page }) => {
  const problems = [];
  browserProblems.set(page, problems);
  page.on('console', (message) => {
    if (message.type() === 'error') problems.push(`console: ${message.text()}`);
  });
  page.on('requestfailed', (request) => {
    const errorText = request.failure()?.errorText || 'failed';
    if (errorText !== 'net::ERR_ABORTED') problems.push(`request: ${request.url()} (${errorText})`);
  });
});

test.afterEach(({ page }) => expect(browserProblems.get(page), 'browser console/request failures').toEqual([]));

test('Office discovery reaches every application card from the homepage', async ({ page }, testInfo) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Build confidence with Microsoft Office' })).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath(`homepage-office-${testInfo.project.name}.png`), fullPage: true });
  await page.getByRole('link', { name: /explore office lessons/i }).click();
  await expect(page).toHaveURL(/\/office$/);
  await expect(page.getByRole('heading', { name: 'Microsoft Office 2026' })).toBeVisible();

  for (const app of ['Word', 'Excel', 'PowerPoint']) {
    await page.getByRole('link', { name: new RegExp(`${app} 2026`) }).click();
    await expect(page).toHaveURL(new RegExp(`/office/${app.toLowerCase()}$`));
    await expect(page.getByRole('navigation', { name: 'Breadcrumb' })).toContainText(app);
    await page.goBack();
  }
});

test('Office lesson exposes working breadcrumbs, progress interactions, and board navigation', async ({ page }, testInfo) => {
  await page.goto('/office/word/getting-started-with-word');
  await expect(page.getByRole('heading', { name: 'Getting Started with Word' })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Breadcrumb' })).toContainText('Office');
  await page.getByLabel('Launch Word').check();
  await expect(page.getByLabel('Launch Word')).toBeChecked();
  await page.screenshot({ path: testInfo.outputPath(`office-lesson-${testInfo.project.name}.png`), fullPage: true });
  await page.getByRole('link', { name: /all chapters/i }).click();
  await expect(page).toHaveURL(/\/office\/word$/);
  await page.goto('/');
  await page.getByRole('link', { name: /open syllabus chapters/i }).click();
  await expect(page).toHaveURL(/\/(Java|cisce|cbse)/);
  await page.screenshot({ path: testInfo.outputPath(`board-navigation-${testInfo.project.name}.png`), fullPage: true });
});

test('mobile navigation exposes the Office route', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'mobile navigation is only shown at the mobile breakpoint');
  await page.goto('/');
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.locator('nav').getByRole('link', { name: /Office/ }).click();
  await expect(page).toHaveURL(/\/office$/);
  await expect(page.getByRole('heading', { name: 'Microsoft Office 2026' })).toBeVisible();
});
