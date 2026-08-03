# Testing Guide

Comprehensive testing guidelines and checklists for Target95+.

---

## 📋 Table of Contents

- [Testing Philosophy](#testing-philosophy)
- [Manual Testing Checklist](#manual-testing-checklist)
- [Regression Checklist](#regression-checklist)
- [Browser Support](#browser-support)
- [Device Testing](#device-testing)
- [Performance Testing](#performance-testing)
- [Accessibility Testing](#accessibility-testing)
- [Automated Testing (Future)](#automated-testing-future)
- [Bug Reporting](#bug-reporting)

---

## 🎯 Testing Philosophy

Target95+ follows a **manual testing-first approach** with plans for automated testing in future versions. Every feature must be manually tested across multiple browsers and devices before deployment.

### Testing Principles

- **User-Centric** - Test from the user's perspective
- **Comprehensive** - Cover all features and edge cases
- **Cross-Platform** - Test on all supported browsers and devices
- **Real-World** - Test with real data and scenarios
- **Continuous** - Test before every deployment

---

## 🧪 Manual Testing Checklist

### Authentication Flow

#### Registration
- [ ] User can access registration page
- [ ] Email validation works (invalid emails rejected)
- [ ] Password strength indicator shows
- [ ] Password confirmation matches
- [ ] Full name field accepts valid input
- [ ] Form shows appropriate error messages
- [ ] Successful registration redirects to verification page
- [ ] Verification email is sent
- [ ] User can resend verification email
- [ ] Error messages are user-friendly

#### Email/Password Login
- [ ] Login page loads correctly
- [ ] Email field accepts valid email
- [ ] Password field accepts password
- [ ] "Remember me" functionality works
- [ ] Unverified users see appropriate message
- [ ] Invalid credentials show error
- [ ] Successful login redirects to dashboard
- [ ] Loading state shows during login
- [ ] Error states are handled gracefully

#### Google OAuth Login
- [ ] Google sign-in button visible
- [ ] Clicking opens Google popup
- [ ] Successful Google login creates account
- [ ] User profile syncs with Firebase
- [ ] Error handling for cancelled login
- [ ] Error handling for failed login

#### Password Reset
- [ ] "Forgot Password" link works
- [ ] Email input accepts valid email
- [ ] Reset email is sent
- [ ] Success message displays
- [ ] Error handling for unregistered emails

#### Logout
- [ ] Logout button visible when authenticated
- [ ] Clicking logout clears session
- [ ] Redirects to home page
- [ ] User cannot access protected routes after logout

### Mock Tests

#### Test Creation & Setup
- [ ] Mock test page loads
- [ ] Subject selection works
- [ ] Chapter selection works
- [ ] Difficulty level can be selected
- [ ] Number of questions can be configured
- [ ] Test timer displays correctly
- [ ] Start test button works

#### During Test
- [ ] Timer counts down correctly
- [ ] Questions display one at a time
- [ ] Navigation between questions works
- [ ] Question palette shows all questions
- [ ] Answered questions marked in palette
- [ ] Flag for review functionality works
- [ ] Auto-save prevents data loss
- [ ] Clear response button works
- [ ] Previous/Next navigation works

#### Test Submission
- [ ] Submit button prompts confirmation
- [ ] Auto-submit when timer expires
- [ ] Results page loads after submission
- [ ] Score calculates correctly
- [ ] Time taken displays correctly
- [ ] Correct answers highlighted
- [ ] User answers shown
- [ ] Explanations display (if available)
- [ ] Performance statistics shown
- [ ] Option to review test

#### Test History
- [ ] Test history page loads
- [ ] Past tests listed with scores
- [ ] Detailed view of past tests works
- [ ] Performance trends visible
- [ ] Filter by subject/chapter works

### Practice Questions

#### Question Bank
- [ ] Question bank page loads
- [ ] Questions display correctly
- [ ] Subject filter works
- [ ] Chapter filter works
- [ ] Difficulty filter works
- [ ] Question type filter works
- [ ] Search functionality works
- [ ] Filters can be combined
- [ ] Clear filters button works
- [ ] Question count updates with filters

#### Question Interaction
- [ ] Questions display with proper formatting
- [ ] Code blocks syntax highlighted
- [ ] Images display correctly
- [ ] Multiple choice options selectable
- [ ] Show answer button works
- [ ] Explanation displays
- [ ] Bookmark button works
- [ ] Share button works (if implemented)
- [ ] Report question button works

#### Bookmarking
- [ ] Bookmark icon toggles correctly
- [ ] Bookmarked questions saved
- [ ] Bookmarks page loads
- [ ] Bookmarked questions listed
- [ ] Can remove bookmarks
- [ ] Bookmarks persist across sessions

### AI Tutor

#### Chat Interface
- [ ] AI Tutor page loads
- [ ] Chat interface displays correctly
- [ ] Message input accepts text
- [ ] Send button works
- [ ] Enter key sends message
- [ ] Loading indicator shows while "thinking"
- [ ] AI responses display correctly
- [ ] Code blocks in responses highlighted
- [ ] Chat history persists
- [ ] Clear chat button works
- [ ] Suggested questions work
- [ ] Context-aware responses

#### Code Assistance
- [ ] Can ask code-related questions
- [ ] Code examples provided
- [ ] Syntax highlighting works
- [ ] Error explanations clear
- [ ] Step-by-step guidance provided

### Progress Tracking

#### Dashboard
- [ ] Dashboard loads with user data
- [ ] Overall progress displays
- [ ] Chapter-wise progress shows
- [ ] Statistics cards display correctly
- [ ] Charts render properly
- [ ] Recent activity shown
- [ ] Streak counter works
- [ ] Points display correctly

#### Analytics
- [ ] Performance graphs display
- [ ] Time spent analytics show
- [ ] Topic mastery visualization works
- [ ] Weak areas identified
- [ ] Improvement suggestions display
- [ ] Data updates in real-time

### Study Material

#### Content Pages
- [ ] Study material page loads
- [ ] Chapters listed correctly
- [ ] Chapter content displays
- [ ] Text formatting correct
- [ ] Code examples highlighted
- [ ] Images/diagrams display
- [ ] Navigation between chapters works
- [ ] Progress tracked per chapter
- [ ] Mark as complete works
- [ ] Bookmarking works

### Daily Challenges

- [ ] Daily challenge page loads
- [ ] Today's challenge displays
- [ ] Challenge timer works
- [ ] Can attempt challenge
- [ ] Results save correctly
- [ ] Streak updates
- [ ] Bonus points awarded
- [ ] Challenge history accessible

### Rewards & Gamification

- [ ] Points display correctly
- [ ] Points update after activities
- [ ] Achievement badges show
- [ ] Badge unlock notifications work
- [ ] Level progression works
- [ ] Leaderboard displays (if enabled)
- [ ] Rewards history accessible

### Responsive Design

#### Mobile (320px - 480px)
- [ ] Homepage renders correctly
- [ ] Navigation menu works (hamburger)
- [ ] All pages accessible
- [ ] Forms usable
- [ ] Buttons appropriately sized
- [ ] Text readable
- [ ] Images scale properly
- [ ] No horizontal scroll
- [ ] Touch targets adequate (44x44px)

#### Tablet (481px - 768px)
- [ ] Layout adapts correctly
- [ ] Navigation works
- [ ] Content readable
- [ ] Forms functional
- [ ] Images display well

#### Desktop (769px+)
- [ ] Full layout displays
- [ ] All features accessible
- [ ] Hover states work
- [ ] Optimal use of space

### Offline Mode

- [ ] App works offline
- [ ] Cached pages load
- [ ] Offline banner shows
- [ ] Sync when back online
- [ ] Data persists locally

### PWA Features

- [ ] Install prompt appears
- [ ] Can install as PWA
- [ ] App icon displays
- [ ] Splash screen shows
- [ ] Works standalone
- [ ] Service worker caches assets

### Forms & Validation

- [ ] All forms validate input
- [ ] Error messages clear
- [ ] Success messages display
- [ ] Required fields marked
- [ ] Email validation works
- [ ] Password strength indicator
- [ ] Character limits enforced
- [ ] Submit buttons disabled during submission
- [ ] Loading states during submission

### Navigation

- [ ] All links work
- [ ] Active states show correctly
- [ ] Breadcrumbs work (if applicable)
- [ ] Back button functions properly
- [ ] Deep linking works
- [ ] 404 page displays for invalid routes

### Performance

- [ ] Pages load quickly (< 3s)
- [ ] No layout shift
- [ ] Images lazy load
- [ ] Smooth animations
- [ ] No janky scrolling
- [ ] Fast response to interactions

---

## 🔄 Regression Checklist

Run this checklist after every deployment or major change:

### Critical Paths
- [ ] User registration flow
- [ ] User login flow
- [ ] Mock test creation and completion
- [ ] Practice question filtering
- [ ] AI Tutor chat
- [ ] Progress tracking
- [ ] Bookmarking system

### Common Issues to Check
- [ ] Authentication state persists on refresh
- [ ] Data loads correctly
- [ ] No console errors
- [ ] No broken images
- [ ] No broken links
- [ ] Forms submit correctly
- [ ] Error messages display
- [ ] Loading states work
- [ ] Empty states handled

### Recent Changes
- [ ] Test all modified features
- [ ] Test dependent features
- [ ] Check for side effects
- [ ] Verify data integrity

---

## 🌐 Browser Support

### Supported Browsers

| Browser | Version | Support Level | Notes |
|---------|---------|---------------|-------|
| Chrome | Latest 2 versions | ✅ Full Support | Primary development browser |
| Edge | Latest 2 versions | ✅ Full Support | Chromium-based |
| Firefox | Latest 2 versions | ✅ Full Support | Regular testing |
| Safari | Latest 2 versions | ✅ Full Support | iOS & macOS |
| Opera | Latest 2 versions | ⚠️ Partial | Basic functionality |
| Samsung Internet | Latest version | ⚠️ Partial | Basic functionality |

### Browser-Specific Testing

#### Chrome/Edge
- [ ] DevTools work correctly
- [ ] Extensions don't break functionality
- [ ] PWA installation works
- [ ] Service worker updates properly

#### Firefox
- [ ] Developer tools work
- [ ] Private mode tested
- [ ] PWA features work

#### Safari
- [ ] iOS Safari tested
- [ ] macOS Safari tested
- [ ] PWA installation works
- [ ] Touch events work properly
- [ ] 100vh issue handled (if applicable)

### Known Issues

- **Safari**: Some CSS features may need prefixes
- **Firefox**: Service worker caching may behave differently
- **IE11**: Not supported (use modern browsers)

---

## 📱 Device Testing

### Physical Devices (Recommended)

#### iOS
- [ ] iPhone SE (375px)
- [ ] iPhone 12/13 (390px)
- [ ] iPhone 14 Pro Max (430px)
- [ ] iPad (768px)
- [ ] iPad Pro (1024px)

#### Android
- [ ] Samsung Galaxy S21 (360px)
- [ ] Google Pixel 5 (393px)
- [ ] Samsung Tab (800px)

### Emulators/Simulators

If physical devices unavailable, test on:
- [ ] Chrome DevTools Device Mode
- [ ] Safari Responsive Design Mode
- [ ] Firefox Responsive Design Mode
- [ ] BrowserStack/Sauce Labs (if available)

### Device-Specific Tests

- [ ] Touch interactions work
- [ ] Keyboard appears/disappears correctly
- [ ] Orientation change handled
- [ ] Safe areas respected (notched devices)
- [ ] Performance acceptable on low-end devices

---

## ⚡ Performance Testing

### Metrics to Check

#### Core Web Vitals
- [ ] **LCP** (Largest Contentful Paint) < 2.5s
- [ ] **FID** (First Input Delay) < 100ms
- [ ] **CLS** (Cumulative Layout Shift) < 0.1

#### Additional Metrics
- [ ] **FCP** (First Contentful Paint) < 1.8s
- [ ] **TTI** (Time to Interactive) < 3.8s
- [ ] **TBT** (Total Blocking Time) < 300ms

### Tools

```bash
# Lighthouse (Chrome DevTools)
# Run Lighthouse audit and check scores

# WebPageTest
# Test from multiple locations

# Bundle Analysis
npm run build
# Analyze .next/static/chunks/ for large bundles
```

### Performance Checklist

- [ ] Images optimized (WebP/AVIF)
- [ ] Fonts optimized
- [ ] Code splitting implemented
- [ ] Lazy loading for heavy components
- [ ] No unnecessary re-renders
- [ ] API calls optimized
- [ ] Caching strategies implemented

---

## ♿ Accessibility Testing

### WCAG 2.1 Level AA Compliance

#### Keyboard Navigation
- [ ] All interactive elements accessible via keyboard
- [ ] Tab order logical
- [ ] Focus indicators visible
- [ ] No keyboard traps
- [ ] Skip links work

#### Screen Reader
- [ ] Test with NVDA (Windows)
- [ ] Test with VoiceOver (macOS/iOS)
- [ ] All images have alt text
- [ ] Form labels associated
- [ ] ARIA labels where needed
- [ ] Heading hierarchy correct
- [ ] Landmarks used properly

#### Visual
- [ ] Color contrast ratio ≥ 4.5:1
- [ ] Text resizable to 200%
- [ ] No information by color alone
- [ ] Focus indicators visible
- [ ] Text spacing adjustable

### Tools

- [ ] axe DevTools
- [ ] WAVE Browser Extension
- [ ] Lighthouse Accessibility Audit
- [ ] Color Contrast Analyzer

---

## 🤖 Automated Testing (Future)

### Planned Setup

```bash
# Unit Tests (Jest + React Testing Library)
npm test

# Integration Tests
npm run test:integration

# E2E Tests (Playwright)
npm run test:e2e

# Coverage Report
npm run test:coverage
```

### Test Coverage Goals

- Unit Tests: 80% coverage
- Integration Tests: Critical paths covered
- E2E Tests: All user flows covered

---

## 🐛 Bug Reporting

### Before Reporting

1. **Check existing issues** - Search GitHub Issues
2. **Verify it's a bug** - Not expected behavior
3. **Reproduce consistently** - Can you reproduce it?
4. **Check browser console** - Any errors?

### Bug Report Template

```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Screenshots
Add screenshots if applicable

## Environment
- Browser: [e.g., Chrome 120]
- OS: [e.g., Windows 11, macOS Sonoma]
- Device: [e.g., Desktop, iPhone 14]
- Screen Size: [e.g., 1920x1080]

## Additional Context
Any other relevant information

## Frequency
- [ ] Always
- [ ] Sometimes
- [ ] Once

## Severity
- [ ] Critical - App crashes, data loss
- [ ] High - Major feature broken
- [ ] Medium - Feature partially broken
- [ ] Low - Minor UI issue
```

### Bug Severity Levels

- **Critical**: App crashes, data loss, security vulnerability
- **High**: Major feature completely broken
- **Medium**: Feature partially broken, workaround exists
- **Low**: Minor UI/UX issue, no functional impact

---

## 📊 Test Reporting

### Test Execution Report Template

```markdown
## Test Execution Report

**Date**: [Date]
**Tester**: [Name]
**Version**: [Version]
**Environment**: [Staging/Production]

### Summary
- Total Tests: X
- Passed: X
- Failed: X
- Blocked: X

### Failed Tests
1. [Test name] - [Reason]
2. [Test name] - [Reason]

### Blocked Tests
1. [Test name] - [Blocker]

### Recommendations
[Any suggestions]

### Sign-off
[ ] Ready for deployment
[ ] Needs fixes
```

---

## 🎯 Testing Best Practices

1. **Test Early** - Test during development, not after
2. **Test Often** - Test before every commit
3. **Test Real Scenarios** - Use real data, not just happy paths
4. **Test Edge Cases** - Empty states, errors, boundaries
5. **Document Findings** - Keep test records
6. **Automate When Possible** - Reduce manual effort
7. **Involve Users** - Beta testing with real users
8. **Monitor Production** - Use error tracking tools

---

## 🛠️ Testing Tools

### Recommended Tools

- **Browser DevTools** - Chrome, Firefox, Safari, Edge
- **Lighthouse** - Performance, accessibility, SEO
- **axe DevTools** - Accessibility testing
- **Postman** - API testing (future)
- **Jest** - Unit testing (future)
- **Playwright** - E2E testing (future)
- **Sentry** - Error tracking in production
- **Google Analytics** - User behavior tracking

---

## 📝 Test Documentation

### What to Document

- Test plans for new features
- Test cases and scenarios
- Bug reports with reproduction steps
- Test execution results
- Known issues and workarounds

### Where to Document

- Test plans: `docs/test-plans/`
- Bug reports: GitHub Issues
- Test results: PR comments or test reports
- Known issues: Project wiki or docs

---

**Last Updated**: January 15, 2025

**Maintained By**: QA Team