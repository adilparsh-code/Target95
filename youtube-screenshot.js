// Playwright script to navigate to YouTube and take a screenshot
// To run: node youtube-screenshot.js

const { chromium } = require('playwright');

(async () => {
  // Launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1366, height: 768 }
  });
  const page = await context.newPage();

  try {
    // Navigate to YouTube
    console.log('🌐 Navigating to https://www.youtube.com...');
    await page.goto('https://www.youtube.com', { waitUntil: 'networkidle' });
    
    // Wait for the page to load completely
    await page.waitForSelector('input#search', { timeout: 10000 });
    console.log('✅ YouTube page loaded successfully');

    // Accept cookies if the dialog appears
    try {
      const acceptCookiesButton = page.locator('button[aria-label="Accept all"]');
      if (await acceptCookiesButton.isVisible({ timeout: 3000 })) {
        await acceptCookiesButton.click();
        console.log('🍪 Accepted cookie consent');
        await page.waitForTimeout(1000);
      }
    } catch (e) {
      console.log('ℹ️ No cookie dialog found or already accepted');
    }

    // Take a full page screenshot
    console.log('📸 Taking screenshot...');
    await page.screenshot({ 
      path: 'youtube-screenshot.png', 
      fullPage: false,
      quality: 90
    });
    console.log('✅ Screenshot saved as youtube-screenshot.png');

    // Get page title
    const title = await page.title();
    console.log(`📄 Page title: ${title}`);

    // Keep browser open to view the page
    console.log('\n⏳ Browser will close in 5 seconds...');
    await page.waitForTimeout(5000);

  } catch (error) {
    console.error('❌ Error during automation:', error);
  } finally {
    await context.close();
    await browser.close();
    console.log('\n🔒 Browser closed. Task complete!');
  }
})();