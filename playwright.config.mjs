import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './test/e2e',
  timeout: 30_000,
  use: {
    baseURL: 'http://127.0.0.1:3002',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ? { launchOptions: { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE } } : {}),
  },
  projects: [
    { name: 'mobile', use: { viewport: { width: 390, height: 844 } } },
    { name: 'tablet', use: { viewport: { width: 768, height: 1024 } } },
    { name: 'desktop', use: { viewport: { width: 1366, height: 900 } } },
  ],
  webServer: {
    command: 'npm run start -- --hostname 127.0.0.1 --port 3002',
    url: 'http://127.0.0.1:3002',
    reuseExistingServer: false,
    timeout: 30_000,
  },
});
