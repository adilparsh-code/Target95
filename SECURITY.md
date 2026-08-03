# Security Policy

Security best practices and policies for Target95+.

---

## 📋 Table of Contents

- [Security Principles](#security-principles)
- [Reporting Vulnerabilities](#reporting-vulnerabilities)
- [Secrets Management](#secrets-management)
- [Firebase Security](#firebase-security)
- [Authentication Security](#authentication-security)
- [Data Protection](#data-protection)
- [Client-Side Security](#client-side-security)
- [Network Security](#network-security)
- [Dependency Security](#dependency-security)
- [Security Checklist](#security-checklist)
- [Incident Response](#incident-response)

---

## 🔒 Security Principles

Target95+ follows these core security principles:

1. **Defense in Depth** - Multiple layers of security controls
2. **Least Privilege** - Minimal access rights for users and services
3. **Secure by Default** - Security enabled out of the box
4. **Fail Securely** - Errors don't compromise security
5. **Don't Trust Client-Side** - All validation on server/Firebase
6. **Keep It Simple** - Complex security is buggy security
7. **Privacy by Design** - User data protection prioritized

---

## 🚨 Reporting Vulnerabilities

### How to Report

If you discover a security vulnerability, please report it responsibly:

**Email**: security@target95.vercel.app

**Subject**: `[SECURITY] Brief description`

### What to Include

```markdown
## Vulnerability Description
Clear description of the issue

## Affected Component
- Component/Feature: [e.g., Authentication, Mock Tests]
- URL/Endpoint: [if applicable]
- Environment: [Production/Staging]

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Proof of Concept
[Code, screenshots, or video demonstrating the issue]

## Impact Assessment
- Severity: [Critical/High/Medium/Low]
- Potential Damage: [Data breach, privilege escalation, etc.]
- Affected Users: [All users, admins only, etc.]

## Suggested Fix
[If you have a solution in mind]

## Contact Information
[Optional: For follow-up questions]
```

### Response Timeline

- **24 hours** - Initial acknowledgment
- **72 hours** - Preliminary assessment
- **7 days** - Detailed analysis and fix plan
- **30 days** - Patch released (for critical issues)

### Responsible Disclosure

- ✅ Report privately to security@target95.vercel.app
- ✅ Allow reasonable time for fixes
- ✅ Avoid public disclosure until patch ready
- ✅ Coordinate disclosure timeline with us
- ❌ Don't exploit the vulnerability
- ❌ Don't access/modify others' data
- ❌ Don't share details publicly before fix

### Recognition

Security researchers who report valid vulnerabilities will be:
- Listed in SECURITY_CREDITS.md (with permission)
- Mentioned in release notes
- Eligible for bug bounty (future program)

---

## 🔐 Secrets Management

### Environment Variables

#### ✅ DO

```env
# Use NEXT_PUBLIC_ prefix for public Firebase config
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=project.firebaseapp.com

# Keep secrets server-side only (future backend)
DATABASE_URL=postgresql://...
API_SECRET_KEY=secret123
```

#### ❌ DON'T

```javascript
// Never hardcode secrets
const apiKey = "AIzaSy..."; // ❌ Bad

// Never commit .env.local
// Never log secrets to console
console.log(apiKey); // ❌ Bad

// Never expose in client-side code
const secretKey = process.env.SECRET_KEY; // ❌ Bad (without NEXT_PUBLIC_)
```

### Best Practices

1. **Firebase Credentials**
   - Firebase API keys are public by design
   - Security enforced via Firebase Security Rules
   - Never expose Firebase private keys
   - Rotate keys if compromised

2. **Environment Files**
   ```bash
   # .gitignore must include
   .env.local
   .env.development.local
   .env.production.local
   .env*.local
   ```

3. **Vercel Environment Variables**
   - Store in Vercel dashboard, not code
   - Use different values for preview/production
   - Mark as "Sensitive" when needed
   - Rotate periodically

4. **Secret Rotation**
   - Rotate API keys quarterly
   - Rotate immediately if compromised
   - Use Firebase console to regenerate
   - Update Vercel environment variables

---

## 🔥 Firebase Security

### Security Rules

#### Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return request.auth.uid == userId;
    }
    
    function isAdmin() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid))
        .data.role == 'admin';
    }

    // Users collection
    match /users/{userId} {
      allow read: if isAuthenticated() && isOwner(userId);
      allow write: if isAuthenticated() && isOwner(userId);
      
      // User progress subcollection
      match /progress/{progressId} {
        allow read, write: if isAuthenticated() && isOwner(userId);
      }
      
      // User bookmarks subcollection
      match /bookmarks/{bookmarkId} {
        allow read, write: if isAuthenticated() && isOwner(userId);
      }
      
      // User mock tests subcollection
      match /mockTests/{testId} {
        allow read, write: if isAuthenticated() && isOwner(userId);
      }
    }

    // Questions - read-only for authenticated users
    match /questions/{questionId} {
      allow read: if isAuthenticated();
      allow write: if isAdmin(); // Only admins can modify
    }

    // Chapters
    match /chapters/{chapterId} {
      allow read: if isAuthenticated();
      allow write: if isAdmin();
    }

    // Daily challenges
    match /dailyChallenges/{challengeId} {
      allow read: if isAuthenticated();
      allow write: if isAdmin();
    }

    // Rewards and achievements
    match /rewards/{rewardId} {
      allow read: if isAuthenticated();
      allow write: if isAdmin();
    }
  }
}
```

#### Security Rules Best Practices

1. **Principle of Least Privilege**
   - Users can only access their own data
   - Read-only access where write not needed
   - Admin-only for sensitive operations

2. **Validate Input**
   ```javascript
   // Validate data structure
   allow create: if request.resource.data.keys().hasAll(['name', 'email', 'uid'])
     && request.resource.data.name is string
     && request.resource.data.email is string;
   ```

3. **Prevent Deletion**
   ```javascript
   allow delete: if false; // Prevent deletion
   ```

4. **Test Rules**
   ```bash
   # Use Firebase Emulator for testing
   firebase emulators:start
   
   # Run security rules tests
   npm run test:firestore-rules
   ```

### Authentication Security

#### Firebase Auth Configuration

1. **Enable Only Required Providers**
   - Email/Password
   - Google (recommended)
   - Disable anonymous auth (unless needed)

2. **Password Policy**
   - Minimum 6 characters (enforced by Firebase)
   - Consider custom validation for stronger passwords
   - Implement password strength indicator

3. **Email Verification**
   - Require email verification for login
   - Send verification email on registration
   - Resend verification option available

4. **Rate Limiting**
   - Firebase has built-in rate limiting
   - Monitor abuse in Firebase Console
   - Implement additional client-side throttling if needed

5. **Session Management**
   - Firebase handles token refresh automatically
   - Tokens expire after 1 hour
   - Refresh tokens stored securely by Firebase SDK

#### Authentication Best Practices

```javascript
// ✅ DO: Verify email before login
const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  
  if (!userCredential.user.emailVerified) {
    await signOut(auth);
    return { success: false, message: "Please verify your email" };
  }
  
  return { success: true, user: userCredential.user };
};

// ✅ DO: Handle auth state changes
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      fetchUserProfile(user.uid);
    } else {
      // User is signed out
      clearUserData();
    }
  });
  
  return () => unsubscribe();
}, []);

// ❌ DON'T: Store passwords in localStorage
localStorage.setItem('password', password); // ❌ Bad

// ❌ DON'T: Trust client-side auth checks
if (user) { /* allow access */ } // ❌ Always verify on server/Firebase
```

---

## 🛡️ Data Protection

### Data Classification

#### Public Data
- Study material content
- Questions and answers
- Public profiles (if applicable)

#### Sensitive Data
- User email addresses
- User names
- Progress data
- Test scores

#### Highly Sensitive
- Passwords (handled by Firebase)
- Authentication tokens
- Payment information (future)

### Data Protection Measures

1. **Encryption**
   - Firebase encrypts data at rest
   - HTTPS/TLS for data in transit
   - Sensitive data encrypted client-side (future)

2. **Data Minimization**
   - Collect only necessary data
   - Don't store sensitive data unnecessarily
   - Regular data cleanup

3. **Access Control**
   - Users can only access their own data
   - Role-based access (Student/Teacher/Admin)
   - Audit logs for sensitive operations

4. **Data Retention**
   - Define retention policies
   - Delete inactive accounts after X months
   - Allow users to delete their data

### GDPR/Privacy Compliance

```javascript
// Allow users to export their data
async function exportUserData(userId) {
  const userData = await getDoc(doc(db, "users", userId));
  const progress = await getDocs(query(collection(db, "progress"), where("userId", "==", userId)));
  const bookmarks = await getDocs(query(collection(db, "bookmarks"), where("userId", "==", userId)));
  
  return {
    profile: userData.data(),
    progress: progress.docs.map(d => d.data()),
    bookmarks: bookmarks.docs.map(d => d.data()),
  };
}

// Allow users to delete their data
async function deleteUserData(userId) {
  // Delete all user documents
  const collections = ['progress', 'bookmarks', 'mockTests', 'rewards'];
  
  for (const collection of collections) {
    const snapshot = await getDocs(query(collection(db, collection), where("userId", "==", userId)));
    const batch = writeBatch(db);
    
    snapshot.docs.forEach(doc => batch.delete(doc.ref));
    await batch.commit();
  }
  
  // Delete user document
  await deleteDoc(doc(db, "users", userId));
}
```

---

## 💻 Client-Side Security

### Input Validation

```javascript
// ✅ DO: Validate all user input
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}

// Sanitize before rendering
function sanitizeHTML(html) {
  // Use DOMPurify or similar
  return DOMPurify.sanitize(html);
}

// ❌ DON'T: Trust user input
function displayUserContent(content) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />; // ❌ XSS risk
}
```

### XSS Prevention

```javascript
// ✅ DO: Escape user content
function UserComment({ comment }) {
  return <div>{comment}</div>; // React auto-escapes
}

// ✅ DO: Use textContent instead of innerHTML
element.textContent = userInput; // Safe

// ❌ DON'T: Use innerHTML with user input
element.innerHTML = userInput; // ❌ XSS risk

// ✅ DO: Sanitize if HTML needed
import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(dirty);
```

### CSRF Protection

```javascript
// Firebase SDK handles CSRF automatically
// For custom API calls (future):

// ✅ DO: Include CSRF token
const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
fetch('/api/endpoint', {
  headers: {
    'X-CSRF-Token': csrfToken,
  },
});
```

### Content Security Policy

Add to `next.config.mjs`:

```javascript
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.gstatic.com https://*.firebase.com;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https:;
      font-src 'self' data:;
      connect-src 'self' https://*.firebaseio.com https://*.googleapis.com;
      frame-src 'self' https://*.firebaseapp.com;
    `.replace(/\s{2,}/g, ' ').trim(),
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
];

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};
```

---

## 🌐 Network Security

### HTTPS

- ✅ All traffic over HTTPS (enforced by Vercel)
- ✅ HSTS header enabled
- ✅ No mixed content (HTTP resources on HTTPS page)
- ✅ Secure cookies (future)

### CORS Configuration

```javascript
// For custom API routes (future)
export async function GET(request) {
  return new Response('OK', {
    headers: {
      'Access-Control-Allow-Origin': 'https://target95.vercel.app',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
```

### API Security (Future)

```javascript
// Rate limiting
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});

// Input validation
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// API key authentication
function authenticateApiKey(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}
```

---

## 📦 Dependency Security

### Dependency Management

```bash
# Audit dependencies for vulnerabilities
npm audit

# Fix automatically fixable issues
npm audit fix

# Update dependencies
npm update

# Check for outdated packages
npm outdated
```

### Best Practices

1. **Regular Updates**
   - Update dependencies monthly
   - Review security advisories
   - Use `npm audit` regularly

2. **Lock Files**
   - Commit `package-lock.json`
   - Use exact versions in production
   - Don't manually edit lock files

3. **Vulnerability Scanning**
   ```bash
   # Run before every deployment
   npm audit --audit-level=high
   ```

4. **Dependency Review**
   - Review new dependencies before adding
   - Check package maintenance status
   - Verify package authenticity
   - Check for known vulnerabilities

---

## ✅ Security Checklist

### Pre-Deployment

- [ ] No secrets in code or git
- [ ] Environment variables configured
- [ ] Firebase security rules deployed
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] Dependencies audited (`npm audit`)
- [ ] No console.log statements with sensitive data
- [ ] Input validation implemented
- [ ] XSS prevention measures in place
- [ ] CSRF protection enabled
- [ ] Error messages don't leak sensitive info
- [ ] Rate limiting implemented (future)
- [ ] Authentication flows tested
- [ ] Authorization checks in place

### Post-Deployment

- [ ] HTTPS certificate valid
- [ ] Security headers present
- [ ] Firebase rules working
- [ ] No unauthorized access
- [ ] Error tracking enabled
- [ ] Monitoring active
- [ ] Backup systems working

### Regular Maintenance

- [ ] Weekly: Check error logs
- [ ] Monthly: Update dependencies
- [ ] Monthly: Review security advisories
- [ ] Quarterly: Security audit
- [ ] Quarterly: Penetration testing (future)

---

## 🚨 Incident Response

### Security Incident Levels

#### Critical (P0)
- Data breach
- Authentication bypass
- Remote code execution
- Mass data exposure

**Response Time**: Immediate
**Action**: Rollback, patch, notify users

#### High (P1)
- Privilege escalation
- SQL injection (future)
- XSS vulnerability
- CSRF vulnerability

**Response Time**: 24 hours
**Action**: Patch and deploy

#### Medium (P2)
- Information disclosure
- Security misconfiguration
- Deprecated dependencies

**Response Time**: 1 week
**Action**: Schedule fix

#### Low (P3)
- Minor UI security issues
- Informational findings

**Response Time**: Next release
**Action**: Include in roadmap

### Incident Response Process

1. **Detection**
   - Monitor logs and alerts
   - Review user reports
   - Security scans

2. **Analysis**
   - Assess severity
   - Determine impact
   - Identify root cause

3. **Containment**
   - Isolate affected systems
   - Disable vulnerable features
   - Rotate compromised credentials

4. **Eradication**
   - Fix vulnerability
   - Remove malicious code
   - Update security rules

5. **Recovery**
   - Deploy fix
   - Verify fix works
   - Monitor for recurrence

6. **Lessons Learned**
   - Document incident
   - Update procedures
   - Improve prevention

### Communication Plan

**Internal:**
- Notify development team immediately
- Document in incident report
- Schedule post-mortem

**External:**
- Notify affected users (for critical issues)
- Publish security advisory
- Update SECURITY.md
- Credit researchers (if applicable)

---

## 📞 Security Contacts

- **Security Email**: security@target95.vercel.app
- **PGP Key**: [Link to PGP public key]
- **Bug Bounty**: Coming soon
- **Security Policy**: This document

---

## 📚 Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)
- [Next.js Security](https://nextjs.org/docs/security)
- [Web Security Academy](https://portswigger.net/web-security)

---

**Last Updated**: January 15, 2025

**Maintained By**: Security Team

**Review Schedule**: Quarterly