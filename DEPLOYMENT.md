# Deployment Guide

Production deployment guide for Target95+.

---

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Vercel Deployment](#vercel-deployment)
- [Environment Variables](#environment-variables)
- [Firebase Configuration](#firebase-configuration)
- [Post-Deployment Checklist](#post-deployment-checklist)
- [Rollback Procedure](#rollback-procedure)
- [Monitoring & Maintenance](#monitoring--maintenance)
- [Troubleshooting](#troubleshooting)

---

## 📦 Prerequisites

Before deploying, ensure you have:

- [ ] GitHub repository with latest code
- [ ] Firebase project created and configured
- [ ] Vercel account (free tier sufficient)
- [ ] Custom domain (optional, but recommended)
- [ ] All environment variables ready
- [ ] Firebase security rules deployed
- [ ] Firestore database created
- [ ] Firebase Authentication enabled

---

## ✅ Pre-Deployment Checklist

### Code Quality
- [ ] All tests pass
- [ ] Linter passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] No console errors in development
- [ ] No console warnings
- [ ] All features tested locally
- [ ] Documentation updated

### Security
- [ ] `.env.local` not committed to git
- [ ] No hardcoded secrets in code
- [ ] Firebase security rules reviewed
- [ ] Environment variables documented
- [ ] Sensitive data removed from code

### Performance
- [ ] Images optimized
- [ ] Bundle size acceptable (< 500KB initial)
- [ ] Lighthouse score > 90
- [ ] No memory leaks
- [ ] Loading states implemented

### Content
- [ ] All pages complete
- [ ] SEO meta tags set
- [ ] Favicon and icons ready
- [ ] PWA manifest configured
- [ ] Legal pages (Privacy, Terms) complete

---

## 🚀 Vercel Deployment

### Method 1: Deploy via GitHub (Recommended)

#### Step 1: Push to GitHub

```bash
# Ensure you're on main branch
git checkout main

# Pull latest changes
git pull origin main

# Push to GitHub
git push origin main
```

#### Step 2: Import to Vercel

1. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub

2. **Import Project**
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Choose your Target95 repository
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)
   - **Install Command**: `npm install` (auto-filled)

4. **Add Environment Variables**
   - Click "Environment Variables"
   - Add all variables from `.env.local`
   - See [Environment Variables](#environment-variables) section

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (2-3 minutes)
   - Your app is now live!

#### Step 3: Configure Custom Domain (Optional)

1. **Add Domain in Vercel**
   - Go to Project Settings → Domains
   - Add your custom domain (e.g., `target95.com`)
   - Click "Verify"

2. **Update DNS Records**
   
   Add these records to your domain registrar:
   
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **Wait for Propagation**
   - DNS propagation takes 24-48 hours
   - SSL certificate auto-provisioned by Vercel
   - HTTPS enabled automatically

### Method 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Method 3: Deploy via Git Push (Auto-Deploy)

Once connected, every push to `main` triggers automatic deployment:

```bash
# Make changes
git add .
git commit -m "feat: add new feature"
git push origin main

# Vercel automatically deploys
```

---

## 🔧 Environment Variables

### Required Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-ABC123XYZ

# Application
NEXT_PUBLIC_APP_URL=https://target95.vercel.app
```

### How to Get Firebase Credentials

1. **Go to Firebase Console**
   - Visit [console.firebase.google.com](https://console.firebase.google.com)
   - Select your project

2. **Get Config**
   - Click Project Settings (gear icon)
   - Scroll to "Your apps" section
   - Select your web app
   - Copy the `firebaseConfig` object

3. **Add to Vercel**
   - Copy each value to Vercel environment variables
   - Example:
     ```
     NEXT_PUBLIC_FIREBASE_API_KEY = AIzaSy...
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = your-project.firebaseapp.com
     ```

### Environment Variable Best Practices

- ✅ Use `NEXT_PUBLIC_` prefix for client-side variables
- ✅ Never commit `.env.local` to git
- ✅ Use different values for staging/production
- ✅ Rotate keys periodically
- ✅ Use Firebase security rules, not client-side checks

---

## 🔥 Firebase Configuration

### Step 1: Enable Firebase Services

1. **Authentication**
   - Go to Firebase Console → Authentication
   - Click "Get Started"
   - Enable "Email/Password" provider
   - Enable "Google" provider
   - Configure authorized domains:
     - `localhost:3000` (development)
     - `target95.vercel.app` (production)
     - Your custom domain

2. **Firestore Database**
   - Go to Firebase Console → Firestore Database
   - Click "Create Database"
   - Choose location (closest to users)
   - Start in **Test Mode** (we'll secure it next)
   - Deploy security rules

3. **Storage** (Optional)
   - Go to Firebase Console → Storage
   - Click "Get Started"
   - Configure security rules

### Step 2: Deploy Firestore Security Rules

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase (if not done)
firebase init

# Deploy security rules
firebase deploy --only firestore:rules
```

### Step 3: Firestore Security Rules

Your `firestore.rules` should look like:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Questions are readable by all authenticated users
    match /questions/{questionId} {
      allow read: if request.auth != null;
      allow write: if false; // Only admins can write
    }
    
    // Mock tests - users can only access their own
    match /mockTests/{testId} {
      allow read, write: if request.auth != null && 
                          resource.data.userId == request.auth.uid;
    }
    
    // Bookmarks - users can only access their own
    match /bookmarks/{bookmarkId} {
      allow read, write: if request.auth != null && 
                          resource.data.userId == request.auth.uid;
    }
    
    // Progress tracking
    match /progress/{progressId} {
      allow read, write: if request.auth != null && 
                           resource.data.userId == request.auth.uid;
    }
  }
}
```

### Step 4: Seed Initial Data (Optional)

If you have initial data to populate:

```javascript
// scripts/seed-firestore.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  // Your config
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Add sample data
async function seedData() {
  // Add questions, chapters, etc.
}

seedData();
```

---

## ✅ Post-Deployment Checklist

### Immediate Checks (First 5 Minutes)

- [ ] **Homepage loads**
  - Visit https://target95.vercel.app
  - Page loads without errors
  - All assets load (images, fonts)

- [ ] **Check Console**
  - Open DevTools Console
  - No errors or warnings
  - No 404s for assets

- [ ] **Test Authentication**
  - Register new user
  - Login with existing user
  - Google OAuth works
  - Logout works

- [ ] **Verify Firebase Connection**
  - Check Firestore reads/writes
  - Verify data persists
  - Check real-time updates

### Functional Testing (First 30 Minutes)

- [ ] **Navigation**
  - All pages load
  - All links work
  - No 404 errors
  - Sitemap accessible

- [ ] **Core Features**
  - Mock tests work
  - Practice questions load
  - AI Tutor responds
  - Progress tracking updates
  - Bookmarks save

- [ ] **Responsive Design**
  - Test on mobile (use DevTools)
  - Test on tablet
  - Test on desktop
  - No horizontal scroll

- [ ] **PWA Features**
  - Install prompt appears
  - Can install app
  - Works offline
  - Service worker active

### SEO & Meta (First Hour)

- [ ] **Meta Tags**
  - View page source
  - Title tags correct
  - Meta descriptions present
  - Open Graph tags work
  - Twitter Cards work

- [ ] **Structured Data**
  - Test with Google Rich Results Test
  - Schema markup valid

- [ ] **Sitemap & Robots**
  - `/sitemap.xml` accessible
  - `/robots.txt` accessible
  - Pages indexed correctly

### Performance (First Hour)

- [ ] **Lighthouse Audit**
  - Run Lighthouse in Chrome
  - Performance > 90
  - Accessibility > 90
  - Best Practices > 90
  - SEO > 90

- [ ] **Core Web Vitals**
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1

- [ ] **Network**
  - Check waterfall in DevTools
  - No unnecessary requests
  - Assets cached properly

### Security (First Day)

- [ ] **HTTPS**
  - SSL certificate valid
  - No mixed content warnings
  - HTTPS redirects work

- [ ] **Firebase Security**
  - Security rules deployed
  - Unauthorized access blocked
  - Data properly secured

- [ ] **Headers**
  - Check security headers
  - CSP configured (if used)
  - X-Frame-Options set

---

## 🔄 Rollback Procedure

If deployment fails or critical bugs found:

### Quick Rollback via Vercel

1. **Go to Vercel Dashboard**
   - Navigate to your project
   - Click "Deployments"
   - Find last working deployment
   - Click "..." → "Promote to Production"

2. **Or via CLI**
   ```bash
   vercel rollback
   ```

### Rollback via Git

```bash
# Revert last commit
git revert HEAD
git push origin main

# Or reset to specific commit
git reset --hard <commit-hash>
git push origin main --force
```

### Rollback Checklist

- [ ] Identify issue severity
- [ ] Notify team
- [ ] Execute rollback
- [ ] Verify rollback successful
- [ ] Investigate root cause
- [ ] Fix in development
- [ ] Test thoroughly
- [ ] Redeploy when ready

---

## 📊 Monitoring & Maintenance

### Vercel Analytics

Enable in Vercel Dashboard:
- [ ] Web Vitals monitoring
- [ ] Real User Monitoring
- [ ] Performance insights
- [ ] Error tracking

### Firebase Monitoring

1. **Firebase Console**
   - Authentication metrics
   - Firestore usage
   - Error logs
   - Performance monitoring

2. **Enable Alerts**
   - Set up email alerts for errors
   - Monitor quota usage
   - Track active users

### Error Tracking (Recommended)

Set up error tracking:

```javascript
// lib/errorTracking.js
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

### Uptime Monitoring

Use services like:
- [UptimeRobot](https://uptimerobot.com/)
- [Pingdom](https://www.pingdom.com/)
- [StatusCake](https://www.statuscake.com/)

Set up monitors for:
- Homepage
- Login page
- API endpoints (future)

### Regular Maintenance

**Weekly:**
- [ ] Check error logs
- [ ] Review performance metrics
- [ ] Monitor Firebase usage

**Monthly:**
- [ ] Update dependencies
- [ ] Review security advisories
- [ ] Check for broken links
- [ ] Review user feedback

**Quarterly:**
- [ ] Security audit
- [ ] Performance optimization
- [ ] Dependency updates
- [ ] Feature reviews

---

## 🐛 Troubleshooting

### Common Issues

#### Build Fails

**Symptom**: Build fails in Vercel

**Solutions**:
1. Check build logs in Vercel
2. Run `npm run build` locally
3. Fix errors locally first
4. Check Node.js version matches
5. Verify all dependencies installed

#### Environment Variables Not Working

**Symptom**: Firebase not connecting

**Solutions**:
1. Verify variables in Vercel dashboard
2. Check variable names (no typos)
3. Redeploy after adding variables
4. Ensure `NEXT_PUBLIC_` prefix for client-side
5. Check Firebase config is correct

#### 404 Errors

**Symptom**: Pages return 404

**Solutions**:
1. Check file paths in `src/app/`
2. Verify dynamic routes syntax
3. Check `not-found.jsx` exists
4. Review Vercel routing config

#### Images Not Loading

**Symptom**: Broken images

**Solutions**:
1. Use Next.js Image component
2. Add domains to `next.config.mjs`
3. Check image paths are correct
4. Verify images in `public/` folder

#### Firebase Connection Issues

**Symptom**: Can't connect to Firebase

**Solutions**:
1. Verify Firebase config
2. Check Firebase project status
3. Verify security rules
4. Check authorized domains
5. Review Firebase console logs

#### Slow Performance

**Symptom**: Pages load slowly

**Solutions**:
1. Run Lighthouse audit
2. Optimize images
3. Implement code splitting
4. Reduce bundle size
5. Enable caching

### Getting Help

- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Firebase Support**: [firebase.google.com/support](https://firebase.google.com/support)
- **GitHub Issues**: [github.com/adilparsh-code/Target95/issues](https://github.com/adilparsh-code/Target95/issues)
- **Documentation**: Check this guide and README.md

---

## 📝 Deployment Log

Keep track of deployments:

```markdown
## Deployment Log

### v1.0.0 - January 15, 2025
- **Deployed by**: [Name]
- **Commit**: [commit-hash]
- **Duration**: 3 minutes
- **Status**: ✅ Success
- **Issues**: None
- **Notes**: Initial production deployment

### v1.0.1 - January 20, 2025
- **Deployed by**: [Name]
- **Commit**: [commit-hash]
- **Duration**: 2 minutes
- **Status**: ✅ Success
- **Issues**: None
- **Notes**: Fixed login bug
```

---

## 🎯 Deployment Best Practices

1. **Deploy During Low Traffic**
   - Early morning or late evening
   - Avoid peak hours

2. **Test Before Deploying**
   - Always test locally first
   - Use preview deployments
   - Get peer review

3. **Monitor After Deploying**
   - Watch error logs
   - Check performance metrics
   - Monitor user feedback

4. **Have a Rollback Plan**
   - Always know how to rollback
   - Test rollback procedure
   - Keep previous version ready

5. **Communicate**
   - Notify team before deploying
   - Announce major changes
   - Document downtime

6. **Automate**
   - Use CI/CD pipelines
   - Automate testing
   - Automate deployment

---

**Last Updated**: January 15, 2025

**Maintained By**: DevOps Team