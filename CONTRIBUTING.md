# Contributing to Target95+

Thank you for your interest in contributing to Target95+! This guide will help you understand our development workflow, coding standards, and how to submit contributions.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Branch Strategy](#branch-strategy)
- [Commit Naming Convention](#commit-naming-convention)
- [Pull Request Process](#pull-request-process)
- [Code Review](#code-review)
- [Testing Requirements](#testing-requirements)
- [Documentation](#documentation)

---

## 🤝 Code of Conduct

By participating in this project, you agree to:

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive feedback
- Accept responsibility and apologize for mistakes
- Prioritize the project's and community's interests

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git configured with your credentials
- Firebase account (for local development)
- Code editor (VS Code recommended)

### Setup

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Target95.git
   cd Target95
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/adilparsh-code/Target95.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Firebase credentials
   ```

6. **Run development server**
   ```bash
   npm run dev
   ```

7. **Verify setup**
   - Open http://localhost:3000
   - Ensure no console errors
   - Test basic functionality

---

## 🔄 Development Workflow

### 1. Sync with Upstream

Always start by syncing your fork with the main repository:

```bash
git checkout main
git pull upstream main
git push origin main
```

### 2. Create Feature Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
# or
git checkout -b docs/documentation-update
```

### 3. Make Changes

- Write clean, maintainable code
- Follow coding standards (see below)
- Add tests if applicable
- Update documentation

### 4. Test Locally

```bash
# Run development server
npm run dev

# Run linter
npm run lint

# Build for production
npm run build
```

### 5. Commit Changes

```bash
git add .
git commit -m "feat: add new feature"
```

### 6. Push to Fork

```bash
git push origin feature/your-feature-name
```

### 7. Create Pull Request

- Go to GitHub
- Click "New Pull Request"
- Fill in PR template
- Request review from maintainers

---

## 📝 Coding Standards

### General Principles

- **KISS** - Keep It Simple, Stupid
- **DRY** - Don't Repeat Yourself
- **YAGNI** - You Aren't Gonna Need It
- **SOLID** principles where applicable
- Write self-documenting code
- Comment complex logic, not obvious code

### JavaScript/React

#### Component Structure

```jsx
// 1. Imports (grouped: React, external, internal, styles)
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import styles from "./Component.module.css";

// 2. Component definition
export default function ComponentName({ prop1, prop2 }) {
  // 3. Hooks (in order: state, effects, context, custom)
  const [state, setState] = useState(null);
  const { user } = useAuth();
  
  // 4. Event handlers
  const handleClick = () => {
    // implementation
  };
  
  // 5. Effects
  useEffect(() => {
    // implementation
  }, [dependency]);
  
  // 6. Render
  return (
    <div className="container">
      {/* JSX */}
    </div>
  );
}

// 7. Helper functions (if needed)
function helperFunction() {
  // implementation
}
```

#### Naming Conventions

- **Components**: PascalCase (`UserProfile.jsx`)
- **Functions**: camelCase (`handleSubmit`)
- **Variables**: camelCase (`userName`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_RETRIES`)
- **Files**: PascalCase for components, camelCase for utilities
- **CSS Classes**: kebab-case (`user-profile`)

#### Best Practices

```jsx
// ✅ DO: Use functional components with hooks
export default function UserCard({ user }) {
  const [isFollowing, setIsFollowing] = useState(false);
  
  return <div>{user.name}</div>;
}

// ❌ DON'T: Use class components
class UserCard extends React.Component {
  // Avoid
}

// ✅ DO: Destructure props
function UserCard({ name, email, avatar }) {
  return <div>{name}</div>;
}

// ❌ DON'T: Access props via props.object
function UserCard(props) {
  return <div>{props.name}</div>;
}

// ✅ DO: Use early returns
function Component({ isLoading, data, error }) {
  if (isLoading) return <Spinner />;
  if (error) return <Error message={error} />;
  if (!data) return <Empty />;
  
  return <DataView data={data} />;
}

// ❌ DON'T: Deep nesting
function Component({ isLoading, data, error }) {
  if (!isLoading) {
    if (!error) {
      if (data) {
        return <DataView data={data} />;
      } else {
        return <Empty />;
      }
    } else {
      return <Error message={error} />;
    }
  } else {
    return <Spinner />;
  }
}
```

### Tailwind CSS

```jsx
// ✅ DO: Use Tailwind classes
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-xl font-bold text-gray-900">Title</h2>
</div>

// ✅ DO: Extract repeated patterns to components
<Button variant="primary" size="md">Click me</Button>

// ❌ DON'T: Use inline styles
<div style={{ display: 'flex', padding: '16px' }}>

// ❌ DON'T: Create CSS files for one-off styles
```

### File Organization

```
src/app/components/
├── ui/                      # Base/reusable UI components
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Modal.jsx
│   └── index.js            # Export all UI components
├── layout/                 # Layout components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── Sidebar.jsx
├── forms/                  # Form components
│   ├── LoginForm.jsx
│   └── RegistrationForm.jsx
└── feature/                # Feature-specific components
    ├── MockTest.jsx
    ├── QuestionBank.jsx
    └── AITutor.jsx
```

### Comments

```jsx
// ✅ DO: Explain WHY, not WHAT
// Use debounce to prevent excessive API calls on every keystroke
const debouncedSearch = useDebounce(searchQuery, 300);

// ❌ DON'T: State the obvious
// Set user state
setUser(userData);

// ✅ DO: Document complex algorithms
// Binary search to find the insertion point for the new score
// Time complexity: O(log n)
const index = binarySearch(scores, newScore);

// ✅ DO: Use JSDoc for functions
/**
 * Calculates the user's progress percentage
 * @param {number} completed - Number of completed chapters
 * @param {number} total - Total number of chapters
 * @returns {number} Progress percentage (0-100)
 */
function calculateProgress(completed, total) {
  return Math.round((completed / total) * 100);
}
```

### Error Handling

```jsx
// ✅ DO: Handle errors gracefully
async function fetchUserData(userId) {
  try {
    const data = await getDoc(doc(db, "users", userId));
    return { success: true, data };
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return { success: false, error: "Failed to load user data" };
  }
}

// ❌ DON'T: Swallow errors silently
async function fetchUserData(userId) {
  const data = await getDoc(doc(db, "users", userId));
  return data;
}
```

---

## 🌿 Branch Strategy

We use **Git Flow** branching model:

### Branch Types

#### Main Branches

- **`main`** - Production-ready code
  - Protected branch
  - Always deployable
  - Tagged with version numbers

- **`develop`** - Integration branch for features
  - Next release development
  - All features merge here first

#### Supporting Branches

- **`feature/*`** - New features
  - Branch from: `develop`
  - Merge to: `develop`
  - Example: `feature/ai-tutor-chat`

- **`fix/*`** - Bug fixes
  - Branch from: `develop` or `main` (for hotfixes)
  - Merge to: `develop` or `main`
  - Example: `fix/login-redirect-loop`

- **`docs/*`** - Documentation changes
  - Branch from: `develop`
  - Merge to: `develop`
  - Example: `docs/update-readme`

- **`refactor/*`** - Code refactoring
  - Branch from: `develop`
  - Merge to: `develop`
  - Example: `refactor/auth-context`

- **`hotfix/*`** - Production hotfixes
  - Branch from: `main`
  - Merge to: `main` and `develop`
  - Example: `hotfix/fix-security-vulnerability`

### Branch Naming

```
feature/add-dark-mode
fix/mock-test-timer-bug
docs/update-contributing-guide
refactor/optimize-firestore-queries
hotfix/fix-authentication-loop
chore/update-dependencies
```

---

## 💬 Commit Naming Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **`feat`** - New feature
- **`fix`** - Bug fix
- **`docs`** - Documentation changes
- **`style`** - Code style changes (formatting, missing semicolons)
- **`refactor`** - Code refactoring
- **`perf`** - Performance improvements
- **`test`** - Adding or updating tests
- **`chore`** - Maintenance tasks, dependency updates
- **`ci`** - CI/CD changes
- **`build`** - Build system changes
- **`revert`** - Revert previous commit

### Scopes (Optional)

- `auth` - Authentication related
- `ui` - User interface
- `api` - API changes
- `db` - Database changes
- `test` - Test changes
- `deps` - Dependencies
- `docs` - Documentation

### Examples

```bash
# Simple commit
git commit -m "feat: add dark mode toggle"

# With scope
git commit -m "fix(auth): resolve login redirect loop"

# With body
git commit -m "feat(ai-tutor): add support for code explanations

- Implement code parsing logic
- Add syntax highlighting
- Support for Java code snippets
- Include error detection

Closes #123"

# Breaking change
git commit -m "feat(api)!: change authentication endpoint

BREAKING CHANGE: The /auth/login endpoint now requires
email verification. Update your clients accordingly.

Migration guide: docs/migration-v1-to-v2.md"
```

### Rules

- Use imperative mood: "add" not "added" or "adds"
- Don't capitalize first letter
- No period at the end
- Keep subject under 50 characters
- Separate subject from body with blank line
- Wrap body at 72 characters
- Explain what and why, not how

---

## 🔀 Pull Request Process

### Before Submitting

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No console errors or warnings
- [ ] Tests pass (if applicable)
- [ ] Build succeeds (`npm run build`)
- [ ] Linter passes (`npm run lint`)

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix (non-breaking change)
- [ ] New feature (non-breaking change)
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Closes #123
Relates to #456

## Screenshots (if applicable)
[Add screenshots for UI changes]

## Testing
- [ ] Tested locally
- [ ] Added/updated tests
- [ ] All tests pass

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have checked my code for security issues
```

### Review Process

1. **Automated Checks**
   - CI/CD pipeline runs
   - Linting passes
   - Build succeeds

2. **Code Review**
   - At least one maintainer approval required
   - Address all review comments
   - Get final approval

3. **Merge**
   - Squash and merge to `develop`
   - Delete feature branch
   - PR description becomes commit message

---

## 👀 Code Review

### For Reviewers

- Be constructive and respectful
- Focus on code, not person
- Explain reasoning behind suggestions
- Approve when satisfied
- Request changes when needed

### Review Checklist

- [ ] Code follows standards
- [ ] Logic is correct
- [ ] Edge cases handled
- [ ] Error handling implemented
- [ ] Performance considered
- [ ] Security best practices followed
- [ ] Tests included
- [ ] Documentation updated
- [ ] No console.log statements
- [ ] No commented-out code

### Common Review Comments

```markdown
// Consider extracting this to a custom hook
// This could be a potential memory leak
// Please add error handling here
// Can we make this more reusable?
// Consider accessibility (keyboard navigation, ARIA labels)
// This might have performance implications with large datasets
```

---

## 🧪 Testing Requirements

### Manual Testing

Before submitting PR, test:

- [ ] Feature works as expected
- [ ] No console errors
- [ ] Responsive on mobile (320px width)
- [ ] Responsive on tablet (768px width)
- [ ] Responsive on desktop (1440px width)
- [ ] Works in Chrome, Firefox, Safari
- [ ] Loading states work
- [ ] Error states handled
- [ ] Empty states handled

### Automated Testing (Future)

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run e2e tests
npm run test:e2e
```

---

## 📚 Documentation

### When to Update Documentation

- Adding new features → Update README.md
- Changing API → Update relevant docs
- Adding environment variables → Update .env.example
- Changing architecture → Update ARCHITECTURE.md
- New dependencies → Update package.json docs

### Documentation Standards

- Use clear, simple language
- Include code examples
- Add diagrams for complex flows
- Keep documentation up-to-date
- Use proper Markdown formatting

---

## 🆘 Getting Help

- **Questions**: Open a [GitHub Discussion](https://github.com/adilparsh-code/Target95/discussions)
- **Bugs**: Open a [GitHub Issue](https://github.com/adilparsh-code/Target95/issues)
- **Chat**: Join our Discord community (link in README)
- **Email**: support@target95.vercel.app

---

## 🎉 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Given credit in social media announcements
- Invited to join the core team (for significant contributions)

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

**Thank you for contributing to Target95+! 🎯**

**Last Updated**: January 15, 2025