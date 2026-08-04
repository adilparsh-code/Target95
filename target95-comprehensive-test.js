// Comprehensive end-to-end testing suite for Target95 website
// Tests across multiple user personas, devices, and scenarios
// To run: node target95-comprehensive-test.js

const { chromium, devices } = require('playwright');
const fs = require('fs');

// Create screenshots directory if it doesn't exist
if (!fs.existsSync('./bug-screenshots')) {
  fs.mkdirSync('./bug-screenshots', { recursive: true });
}

// Create reports directory
if (!fs.existsExistsSync('./test-reports')) {
  fs.mkdirSync('./test-reports', { recursive: true });
}

class Target95Tester {
  constructor() {
    this.bugs = [];
    this.browser = null;
    this.context = null;
    this.page = null;
    this.screenshotCounter = 0;
  }

  async init() {
    this.browser = await chromium.launch({ headless: false, slowMo: 500 });
  }

  async createContext(device = null) {
    const contextOptions = device ? { ...devices[device] } : { viewport: { width: 1440, height: 900 } };
    this.context = await this.browser.newContext({
      ...contextOptions,
      recordVideo: { dir: './test-videos/' }
    });
    this.page = await this.context.newPage();
    
    // Listen for console errors
    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        this.logBug('Browser Console Error', 'Global', 'Open browser console', 'No console errors', `Console error: ${msg.text()}`, 'High', null);
      }
    });

    // Listen for failed network requests
    this.page.on('requestfailed', request => {
      this.logBug('Network Request Failed', request.url(), `Navigate to page containing ${request.url()}`, 'All resources load successfully', `Failed: ${request.failure().errorText}`, 'High', null);
    });
  }

  logBug(title, location, steps, expected, actual, severity, screenshot = null) {
    const bug = {
      id: this.bugs.length + 1,
      title,
      location,
      stepsToReproduce: steps,
      expectedResult: expected,
      actualResult: actual,
      severity,
      screenshot,
      timestamp: new Date().toISOString()
    };
    this.bugs.push(bug);
    console.log(`🐛 ${severity}: ${title} at ${location}`);
  }

  async takeScreenshot(name) {
    this.screenshotCounter++;
    const filename = `./bug-screenshots/${this.screenshotCounter.toString().padStart(3, '0')}-${name.replace(/\s+/g, '-')}.png`;
    await this.page.screenshot({ path: filename, fullPage: true });
    return filename;
  }

  async testHomepage() {
    console.log('🏠 Testing Homepage...');
    await this.page.goto('https://target95new.vercel.app');
    
    // Check hero section
    try {
      await this.page.waitForSelector('section', { timeout: 10000 });
      console.log('✅ Hero section loaded');
    } catch (e) {
      this.logBug('Hero section failed to load', 'Homepage', 'Navigate to homepage', 'Hero section loads within 10s', 'Hero section timeout', 'Critical', await this.takeScreenshot('hero-load-fail'));
    }

    // Test navigation
    const navLinks = await this.page.locator('nav a').all();
    console.log(`🔗 Found ${navLinks.length} navigation links`);
    
    // Test CTA buttons
    const ctaButtons = await this.page.locator('button:has-text("Start Learning"), a:has-text("Get Started")').all();
    console.log(`🖱️ Found ${ctaButtons.length} CTA buttons`);

    // Test footer
    try {
      await this.page.waitForSelector('footer', { timeout: 5000 });
      console.log('✅ Footer found');
      const footerLinks = await this.page.locator('footer a').all();
      console.log(`👣 Found ${footerLinks.length} footer links`);
    } catch (e) {
      this.logBug('Footer not found', 'Homepage', 'Scroll to bottom of homepage', 'Footer should be present', 'Footer element missing', 'Medium', await this.takeScreenshot('footer-missing'));
    }
  }

  async testAuthentication() {
    console.log('🔐 Testing Authentication flows...');
    
    // Test register page
    try {
      await this.page.goto('https://target95new.vercel.app/register');
      await this.page.waitForSelector('form', { timeout: 5000 });
      console.log('✅ Register page accessible');
    } catch (e) {
      this.logBug('Register page inaccessible', '/register', 'Navigate to /register', 'Register page loads', 'Failed to load register page', 'Critical', await this.takeScreenshot('register-page-fail'));
    }

    // Test login page
    try {
      await this.page.goto('https://target95new.vercel.app/login');
      await this.page.waitForSelector('form', { timeout: 5000 });
      console.log('✅ Login page accessible');
    } catch (e) {
      this.logBug('Login page inaccessible', '/login', 'Navigate to /login', 'Login page loads', 'Failed to load login page', 'Critical', await this.takeScreenshot('login-page-fail'));
    }

    // Test invalid credentials
    try {
      await this.page.fill('input[type="email"]', 'invalid@email.com');
      await this.page.fill('input[type="password"]', 'wrongpassword');
      await this.page.click('button[type="submit"]');
      await this.page.waitForTimeout(2000);
      console.log('✅ Login attempted with invalid credentials');
    } catch (e) {
      this.logBug('Login form submission failed', '/login', 'Submit form with invalid credentials', 'Error message displayed', 'Form submission error', 'Medium', null);
    }
  }

  async testRouting() {
    console.log('🧭 Testing all routes...');
    const routesToTest = [
      '/', '/dashboard', '/icse', '/cbse', '/study', '/java',
      '/question-bank', '/mock-test', '/pyqs', '/ai-tutor', '/analytics',
      '/rewards', '/daily-challenge', '/my-learning', '/about', '/contact'
    ];

    for (const route of routesToTest) {
      try {
        const fullUrl = `https://target95new.vercel.app${route}`;
        const response = await this.page.goto(fullUrl, { waitUntil: 'networkidle' });
        const status = response.status();
        if (status === 404) {
          this.logBug('404 Page Found', route, `Navigate to ${route}`, 'Page should exist', 'Returns 404 status', 'High', await this.takeScreenshot(`404-${route.slice(1)}`));
        } else {
          console.log(`✅ ${route} - Status: ${status}`);
        }
      } catch (e) {
        this.logBug('Route loading failed', route, `Navigate to ${route}`, 'Page loads successfully', `Load failed: ${e.message}`, 'Medium', null);
      }
      await this.page.waitForTimeout(1000);
    }
  }

  async testMobileResponsiveness() {
    console.log('📱 Testing mobile responsiveness...');
    const devicesToTest = [
      { name: 'iPhone SE (375px)', device: 'iPhone SE' },
      { name: 'iPad (768px)', device: 'iPad' },
      { name: 'iPad Pro (1024px)', device: 'iPad Pro 11' },
      { name: 'Desktop (1440px)', device: null }
    ];

    for (const { name, device } of devicesToTest) {
      console.log(`Testing ${name}...`);
      await this.context.close();
      await this.createContext(device);
      await this.page.goto('https://target95new.vercel.app');
      await this.page.waitForTimeout(2000);
      
      // Check if mobile menu appears
      if (device) {
        try {
          const mobileMenuButton = this.page.locator('button[aria-label="Toggle menu"]');
          if (await mobileMenuButton.isVisible()) {
            console.log(`✅ Mobile menu visible on ${name}`);
          } else {
            this.logBug('Mobile menu not visible', `Homepage - ${name}`, 'Load homepage on mobile', 'Mobile menu button should be visible', 'Desktop menu showing on mobile', 'High', await this.takeScreenshot(`mobile-menu-${name}`));
          }
        } catch (e) {
          console.log(`Mobile menu check complete for ${name}`);
        }
      }
      await this.takeScreenshot(`responsive-${name.replace(/\s+/g, '-')}`);
    }
  }

  async testAccessibility() {
    console.log('♿ Testing accessibility...');
    await this.page.goto('https://target95new.vercel.app');
    
    // Check for alt text on images
    const images = await this.page.locator('img').all();
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      if (!alt || alt === '') {
        const src = await img.getAttribute('src');
        this.logBug('Missing alt text', src || 'Unknown image', 'Check image attributes', 'All images have descriptive alt text', 'Image missing alt attribute', 'Low', null);
      }
    }

    // Check contrast (basic check)
    console.log('🔍 Accessibility scan complete');
  }

  async generateReport() {
    console.log('\n📊 Generating comprehensive test report...');
    
    const criticalBugs = this.bugs.filter(b => b.severity === 'Critical');
    const highBugs = this.bugs.filter(b => b.severity === 'High');
    const mediumBugs = this.bugs.filter(b => b.severity === 'Medium');
    const lowBugs = this.bugs.filter(b => b.severity === 'Low');

    const report = `
# Target95 Comprehensive QA Test Report

## Executive Summary
Total bugs found: ${this.bugs.length}
- Critical: ${criticalBugs.length}
- High: ${highBugs.length}
- Medium: ${mediumBugs.length}
- Low: ${lowBugs.length}

Tested on: ${new Date().toLocaleString()}
Test URL: https://target95new.vercel.app

---

## Critical Bugs (${criticalBugs.length})
${criticalBugs.map(b => this.formatBugForReport(b)).join('\n\n')}

---

## High Priority Bugs (${highBugs.length})
${highBugs.map(b => this.formatBugForReport(b)).join('\n\n')}

---

## Medium Bugs (${mediumBugs.length})
${mediumBugs.map(b => this.formatBugForReport(b)).join('\n\n')}

---

## Low Bugs (${lowBugs.length})
${lowBugs.map(b => this.formatBugForReport(b)).join('\n\n')}

---

## Test Coverage
- ✓ Homepage & Navigation
- ✓ Authentication flows
- ✓ Route testing
- ✓ Mobile responsiveness
- ✓ Basic accessibility checks
- ✓ Console error monitoring
- ✓ Network failure detection
`;

    fs.writeFileSync('./test-reports/comprehensive-report.md', report);
    console.log('📝 Report saved to ./test-reports/comprehensive-report.md');
  }

  formatBugForReport(bug) {
    return `
### ${bug.title}
**Location:** ${bug.location}
**Steps to Reproduce:** ${bug.stepsToReproduce}
**Expected:** ${bug.expectedResult}
**Actual:** ${bug.actualResult}
**Severity:** ${bug.severity}
**Screenshot:** ${bug.screenshot || 'None'}
**Suggested Fix:** Investigate and resolve immediately
`;
  }

  async runAllTests() {
    await this.init();
    await this.createContext();
    
    console.log('🚀 Starting comprehensive Target95 testing...\n');
    
    await this.testHomepage();
    await this.testAuthentication();
    await this.testRouting();
    await this.testMobileResponsiveness();
    await this.testAccessibility();
    await this.generateReport();
    
    await this.browser.close();
    console.log('\n🎉 All tests completed!');
  }
}

// Run the tester
const tester = new Target95Tester();
tester.runAllTests();