# Security Architecture Migration Document

## Current State Analysis

### Existing Security Implementation

**Client-Side Protection:**
- `ProtectedRoute.jsx`: Client-side route guard using Firebase auth state
- `AuthContext.js`: Firebase authentication with email/password and Google OAuth
- `firebase.js`: Client-side Firebase initialization with environment variables

**Current Vulnerabilities:**
1. Client-side only protection (can be bypassed)
2. No server-side route validation
3. No HTTP-only cookie sessions
4. No CSRF protection
5. No rate limiting on auth endpoints
6. Sensitive pages accessible via direct URL before auth check completes

---

## Migration Strategy

### Phase 1: Middleware-Based Route Protection (Next.js 16)

**Objective:** Add server-side route validation before page render

**Implementation:**

Create `src/middleware.js`:

```javascript
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('session')?.value;
  
  // Public routes that don't require authentication
  const publicRoutes = ['/', '/login', '/register', '/forgot-password', '/about', '/contact', '/privacy', '/terms'];
  const publicPatterns = ['/java/', '/study/', '/roadmap'];
  
  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname) || 
                        publicPatterns.some(pattern => request.nextUrl.pathname.startsWith(pattern));
  
  // Allow public routes
  if (isPublicRoute) {
    return NextResponse.next();
  }
  
  // Protected routes require session token
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Continue to page for token validation
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

**Benefits:**
- Blocks unauthorized access before page render
- Reduces client-side attack surface
- Improves performance by avoiding unnecessary client renders

---

### Phase 2: Cookie-Based Session Management

**Objective:** Replace client-side auth state with HTTP-only secure cookies

**Implementation:**

**2.1 Create API Route for Session Management**

Create `src/app/api/auth/session/route.js`:

```javascript
import { NextResponse } from 'next/server';
import { getFirebaseInstance } from '@/app/lib/firebase';
import { adminAuth } from '@/app/lib/firebase-admin'; // Requires Firebase Admin SDK

export async function POST(request) {
  try {
    const { idToken } = await request.json();
    
    // Verify ID token server-side
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    
    // Create HTTP-only session cookie
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    
    const response = NextResponse.json({ success: true });
    
    // Set HTTP-only cookie
    response.cookies.set('session', sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });
    
    return response;
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 401 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('session');
  return response;
}
```

**2.2 Update AuthContext to Use Cookies**

Modify `src/context/AuthContext.js`:

```javascript
// Add cookie validation on mount
useEffect(() => {
  const validateSession = async () => {
    try {
      const response = await fetch('/api/auth/session', {
        method: 'GET',
      });
      const data = await response.json();
      
      if (data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  
  validateSession();
}, []);
```

**2.3 Update Login Flow**

Modify login/register to exchange Firebase ID token for session cookie:

```javascript
const login = async (email, password) => {
  try {
    setError(null);
    const { auth } = getFirebaseInstance();
    const credential = await signInWithEmailAndPassword(auth, email, password);
    
    // Exchange ID token for session cookie
    const idToken = await credential.user.getIdToken();
    await fetch('/api/auth/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    });
    
    return { success: true, user: credential.user };
  } catch (authError) {
    const message = getAuthMessage(authError.code);
    setError(message);
    return { success: false, message };
  }
};
```

**Security Benefits:**
- HTTP-only cookies prevent XSS token theft
- Secure flag ensures HTTPS-only transmission
- SameSite prevents CSRF attacks
- Server-side token validation

---

### Phase 3: Enhanced Middleware with Role-Based Access

**Objective:** Add role-based route protection at middleware level

**Implementation:**

Update `src/middleware.js`:

```javascript
import { NextResponse } from 'next/server';
import { adminAuth } from '@/app/lib/firebase-admin';

// Role-based route configuration
const routeConfig = {
  '/admin': ['admin'],
  '/teacher': ['admin', 'teacher'],
  '/dashboard': ['student', 'admin', 'teacher'],
  '/profile': ['student', 'admin', 'teacher'],
  '/settings': ['student', 'admin', 'teacher'],
};

export async function middleware(request) {
  const token = request.cookies.get('session')?.value;
  const path = request.nextUrl.pathname;
  
  // Check if route requires specific role
  const protectedRoute = Object.keys(routeConfig).find(route => path.startsWith(route));
  
  if (protectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  if (protectedRoute && token) {
    try {
      const decodedToken = await adminAuth.verifySessionCookie(token, true);
      const allowedRoles = routeConfig[protectedRoute];
      
      if (!allowedRoles.includes(decodedToken.role)) {
        return NextResponse.redirect(new URL('/', request.url));
      }
      
      // Add user info to headers for client-side use
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user-role', decodedToken.role);
      requestHeaders.set('x-user-id', decodedToken.uid);
      
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

---

### Phase 4: Firebase Admin SDK Setup

**Prerequisites:**

1. Install Firebase Admin SDK:
```bash
npm install firebase-admin
```

2. Create service account key:
   - Go to Firebase Console → Project Settings → Service Accounts
   - Generate new private key
   - Save as `serviceAccountKey.json` (add to `.gitignore`)

3. Create `src/app/lib/firebase-admin.js`:

```javascript
import admin from 'firebase-admin';

let adminApp;

if (!admin.apps.length) {
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT 
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT) 
    : require('../../serviceAccountKey.json');
  
  adminApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const adminAuth = admin.auth(adminApp);
export const adminDb = admin.firestore(adminApp);
```

4. Add environment variable to `.env.local`:
```
FIREBASE_SERVICE_ACCOUNT={"type":"service_account",...}
```

---

### Phase 5: Additional Security Hardening

**5.1 Rate Limiting**

Create `src/middleware/rateLimiter.js`:

```javascript
const rateLimitMap = new Map();

export function rateLimit(identifier, maxRequests, windowMs) {
  const now = Date.now();
  const requests = rateLimitMap.get(identifier) || [];
  
  // Remove old requests outside window
  const recentRequests = requests.filter(time => now - time < windowMs);
  
  if (recentRequests.length >= maxRequests) {
    return false; // Rate limit exceeded
  }
  
  recentRequests.push(now);
  rateLimitMap.set(identifier, recentRequests);
  return true;
}
```

Apply to auth routes in middleware.

**5.2 CSRF Protection**

Add CSRF token generation for state-changing operations:

```javascript
// In API routes
import { randomUUID } from 'crypto';

export async function POST(request) {
  const session = await request.cookies.get('session');
  
  if (!session?.value) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Verify CSRF token for non-GET requests
  const csrfToken = request.headers.get('x-csrf-token');
  const storedToken = request.cookies.get('csrf-token')?.value;
  
  if (!csrfToken || csrfToken !== storedToken) {
    return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 });
  }
  
  // Process request...
}
```

**5.3 Input Validation**

Add Zod or similar validation library for all API inputs:

```bash
npm install zod
```

Example:
```javascript
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(request) {
  const body = await request.json();
  
  try {
    const validated = loginSchema.parse(body);
    // Process validated data...
  } catch (error) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }
}
```

---

## Migration Checklist

### Before Migration
- [ ] Backup current authentication flow
- [ ] Set up Firebase Admin SDK
- [ ] Add environment variables for service account
- [ ] Test middleware in development environment

### Phase 1: Middleware (Week 1)
- [ ] Create `src/middleware.js`
- [ ] Test public route access
- [ ] Test protected route redirection
- [ ] Verify middleware doesn't break static assets

### Phase 2: Cookie Sessions (Week 2)
- [ ] Create `/api/auth/session` route
- [ ] Update AuthContext to validate session
- [ ] Update login/register flows
- [ ] Test session persistence
- [ ] Test logout functionality

### Phase 3: Role-Based Access (Week 3)
- [ ] Update middleware with role checks
- [ ] Test admin route protection
- [ ] Test teacher route protection
- [ ] Verify role-based redirects

### Phase 4: Hardening (Week 4)
- [ ] Implement rate limiting
- [ ] Add CSRF protection
- [ ] Add input validation
- [ ] Security audit
- [ ] Penetration testing

---

## Security Improvements Summary

| Aspect | Current | After Migration |
|--------|---------|-----------------|
| Route Protection | Client-side only | Server-side middleware + client-side |
| Session Storage | Client state | HTTP-only secure cookies |
| XSS Protection | Partial | Full (HTTP-only cookies) |
| CSRF Protection | None | SameSite + CSRF tokens |
| Rate Limiting | None | Per-IP rate limits |
| Input Validation | Client-side | Server-side validation |
| Token Security | Exposed in memory | Server-validated cookies |

---

## Rollback Plan

If issues arise during migration:

1. **Immediate Rollback:**
   - Revert middleware.js
   - Revert AuthContext.js changes
   - Client-side protection remains functional

2. **Gradual Rollback:**
   - Keep middleware, disable cookie sessions
   - Fall back to client-side auth state
   - Fix issues before re-enabling

3. **Database Rollback:**
   - No database schema changes required
   - Firebase Auth remains unchanged

---

## Testing Strategy

### Unit Tests
- Middleware route matching
- Cookie validation logic
- Role-based access control

### Integration Tests
- Login flow with session cookies
- Protected route access
- Logout functionality
- Token refresh

### Security Tests
- Attempt direct access to protected routes
- Test CSRF token validation
- Verify rate limiting
- Test XSS prevention
- Verify HTTPS-only cookies in production

---

## Performance Considerations

1. **Middleware Execution:** Runs on every request, keep logic minimal
2. **Session Validation:** Cache decoded tokens in memory (short TTL)
3. **Database Calls:** Minimize Firestore calls in middleware
4. **Cookie Size:** Keep session cookies under 4KB

---

## Monitoring & Alerts

Track these metrics post-migration:
- Authentication failure rate
- Rate limit triggers
- Middleware execution time
- Session validation errors
- Unauthorized access attempts

---

## Future Enhancements

1. **Multi-Factor Authentication (MFA)**
   - Add TOTP support
   - SMS-based OTP

2. **Session Management**
   - Active session listing
   - Remote session termination
   - Session activity logs

3. **Advanced Threat Protection**
   - Anomaly detection
   - IP-based blocking
   - Device fingerprinting

4. **Audit Logging**
   - Log all authentication events
   - Track sensitive operations
   - Compliance reporting

---

## References

- [Next.js Middleware Documentation](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [HTTP-Only Cookies Best Practices](https://owasp.org/www-chapter-london/assets/slides/OWASP_HttpOnly_Cookies.pdf)

---

## Contact

For questions about this migration plan, contact the security team or refer to the project documentation.

**Document Version:** 1.0  
**Last Updated:** 2026-08-03  
**Status:** Ready for Implementation