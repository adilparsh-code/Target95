// Playwright automation script to add todo items to https://demo.playwright.dev/todomvc
// To run this script:
// 1. First install Playwright: npm install playwright
// 2. Then run: node todomvc-automation.js

const { chromium } = require('playwright');

(async () => {
  // Launch browser
  const browser = await chromium.launch({ headless: false }); // Set to true for headless mode
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Navigate to TodoMVC demo
    console.log('🌐 Navigating to https://demo.playwright.dev/todomvc...');
    await page.goto('https://demo.playwright.dev/todomvc');
    
    // Wait for the page to load
    await page.waitForSelector('input.new-todo');
    
    // Todo items to add
    const todoItems = [
      'Learn Playwright automation',
      'Complete web development project',
      'Review and refactor code',
      'Write comprehensive documentation',
      'Test all functionalities'
    ];

    console.log('📝 Adding todo items...\n');
    
    // Add each todo item
    for (let i = 0; i < todoItems.length; i++) {
      const item = todoItems[i];
      // Clear the input and add the new todo
      await page.fill('input.new-todo', '');
      await page.fill('input.new-todo', item);
      await page.press('input.new-todo', 'Enter');
      console.log(`✅ Added: "${item}"`);
      
      // Small delay to visualize the process
      await page.waitForTimeout(500);
    }

    // Get all added todo items to verify
    const todoList = await page.locator('ul.todo-list li');
    const count = await todoList.count();
    console.log(`\n📊 Summary: Successfully added ${count} todo items!`);
    
    // List all items in the list
    console.log('\n📋 All todo items:');
    for (let i = 0; i < count; i++) {
      const text = await todoList.nth(i).locator('label').textContent();
      console.log(`   ${i + 1}. ${text}`);
    }

    // Mark the first item as completed
    console.log('\n✅ Marking first item as completed...');
    await todoList.first().locator('input.toggle').click();
    
    // Take a screenshot
    await page.screenshot({ path: 'todomvc-screenshot.png', fullPage: true });
    console.log('📸 Screenshot saved as todomvc-screenshot.png');

    // Keep browser open for a few seconds to view the results
    console.log('\n⏳ Browser will close in 5 seconds...');
    await page.waitForTimeout(5000);

  } catch (error) {
    console.error('❌ Error during automation:', error);
  } finally {
    // Cleanup
    await context.close();
    await browser.close();
    console.log('\n🔒 Browser closed. Automation complete!');
  }
})();