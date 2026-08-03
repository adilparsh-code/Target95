# Architecture Documentation

Technical architecture and design decisions for Target95+.

---

## 📋 Table of Contents

- [Architecture Overview](#architecture-overview)
- [Folder Structure](#folder-structure)
- [Data Flow](#data-flow)
- [Authentication Flow](#authentication-flow)
- [Firestore Schema](#firestore-schema)
- [Reusable Components](#reusable-components)
- [State Management](#state-management)
- [Routing](#routing)
- [Performance Optimization](#performance-optimization)
- [Design Patterns](#design-patterns)

---

## 🏗️ Architecture Overview

Target95+ follows a **modern, scalable architecture** built on Next.js 16 with App Router, React 19, and Firebase.

### Core Principles

1. **Separation of Concerns** - Business logic separated from UI
2. **Component Reusability** - DRY principle with shared components
3. **Performance First** - Optimized for speed and user experience
4. **Mobile-First** - Responsive design from ground up
5. **Type Safety** - Prop validation and consistent data shapes
6. **Progressive Enhancement** - Works without JavaScript, enhanced with it

### Architecture Layers

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│   (React Components, UI, Pages)         │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│         Business Logic Layer            │
│   (Hooks, Context, Utils, Lib)          │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│         Data Layer                      │
│   (Firebase, Firestore, LocalStorage)   │
└─────────────────────────────────────────┘
```

---

## 📁 Folder Structure

```
Target95/
│
├── public/                          # Static assets (served as-is)
│   ├── icons/                       # PWA icons (48x48 to 512x512)
│   │   ├── icon-48x48.png
│   │   ├── icon-72x72.png
│   │   ├── icon-96x96.png
│   │   ├── icon-128x128.png
│   │   ├── icon-144x144.png
│   │   ├── icon-152x152.png
│   │   ├── icon-192x192.png
│   │   ├── icon-384x384.png
│   │   └── icon-512x512.png
│   ├── apple-touch-icon.png         # iOS home screen icon
│   ├── manifest.json                # PWA manifest
│   ├── sw.js                        # Service worker for offline
│   ├── globe.svg                    # Favicon
│   ├── file.svg                     # Asset icons
│   └── window.svg                   # Asset icons
│
├── src/
│   ├── app/                         # Next.js App Router (pages & layouts)
│   │   ├── layout.js                # Root layout (HTML structure, metadata)
│   │   ├── page.js                  # Homepage (/)
│   │   ├── globals.css              # Global styles
│   │   ├── favicon.ico              # Favicon
│   │   ├── robots.js                # robots.txt generation
│   │   ├── sitemap.js               # sitemap.xml generation
│   │   ├── not-found.jsx            # 404 page
│   │   │
│   │   ├── components/              # Shared UI components
│   │   │   ├── ui/                  # Base/reusable UI primitives
│   │   │   │   ├── ErrorBoundary.jsx
│   │   │   │   ├── Loading.jsx
│   │   │   │   └── ...
│   │   │   ├── Navbar.jsx           # Navigation bar
│   │   │   ├── Footer.jsx           # Footer
│   │   │   ├── Hero.jsx             # Hero section
│   │   │   ├── Stats.jsx            # Statistics display
│   │   │   ├── Features.jsx         # Features section
│   │   │   ├── Subjects.jsx         # Subject selection
│   │   │   ├── WhyTarget95.jsx      # Value proposition
│   │   │   ├── AIWorkflow.jsx       # AI workflow display
│   │   │   ├── BoardSupport.jsx     # Board support info
│   │   │   ├── Testimonials.jsx     # User testimonials
│   │   │   ├── FAQ.jsx              # Frequently asked questions
│   │   │   ├── Pricing.jsx          # Pricing plans
│   │   │   ├── Newsletter.jsx       # Newsletter signup
│   │   │   ├── AuthProviderWrapper.jsx  # Auth context provider
│   │   │   ├── PWAPrompt.jsx        # PWA install prompt
│   │   │   ├── OfflineBanner.jsx    # Offline mode indicator
│   │   │   └── IOSInstallPrompt.jsx # iOS PWA install prompt
│   │   │
│   │   ├── context/                 # React Context providers
│   │   │   └── AuthContext.js       # Authentication state management
│   │   │
│   │   ├── hooks/                   # Custom React hooks
│   │   │   ├── useBookmarks.js      # Bookmark management
│   │   │   ├── useChapterProgress.js # Chapter progress tracking
│   │   │   ├── useFirestore.js      # Firestore operations
│   │   │   ├── useMockTests.js      # Mock test logic
│   │   │   ├── useProgrammingQuestions.js # Programming questions
│   │   │   ├── useProgress.js       # Progress tracking
│   │   │   ├── useProgressTracker.js # Progress tracking utility
│   │   │   ├── useQuestions.js      # Question bank logic
│   │   │   └── useRecentlyStudied.js # Recently studied items
│   │   │
│   │   ├── lib/                     # Business logic & data
│   │   │   ├── firebase/            # Firebase configuration
│   │   │   │   └── config.js        # Firebase initialization
│   │   │   ├── aiTutor.js           # AI Tutor logic
│   │   │   ├── curriculum.js        # Curriculum data (ICSE/ISC)
│   │   │   ├── gamification.js      # Points, badges, rewards
│   │   │   ├── learningContent.js   # Study material content
│   │   │   ├── learningRoadmap.js   # Learning path generation
│   │   │   ├── mocktest.js          # Mock test logic
│   │   │   ├── practiceUrls.js      # Practice resource URLs
│   │   │   ├── questionBank.js      # Question bank data
│   │   │   ├── questionFilters.js   # Question filtering logic
│   │   │   ├── questionPresentation.js # Question display logic
│   │   │   ├── studyCenter.js       # Study center logic
│   │   │   ├── firestore/           # Firestore utilities
│   │   │   │   ├── queries.js       # Common queries
│   │   │   │   └── schema.js        # Data schema definitions
│   │   │   └── progress/            # Progress tracking logic
│   │   │       ├── calculator.js    # Progress calculations
│   │   │       └── storage.js       # Progress persistence
│   │   │
│   │   ├── utils/                   # Utility functions
│   │   │   ├── addNewSections.js    # Add new curriculum sections
│   │   │   ├── auditChapters.js     # Audit chapter content
│   │   │   ├── enrichChapters.js    # Enrich chapter data
│   │   │   ├── fixChapterContent.js # Fix chapter content issues
│   │   │   ├── fixDuplicates.js     # Remove duplicate content
│   │   │   └── inventory.js         # Content inventory
│   │   │
│   │   ├── data/                    # Static data files
│   │   │
│   │   └── [routes]/                # App routes (pages)
│   │       ├── about/               # About page
│   │       │   └── page.jsx
│   │       ├── admin/               # Admin dashboard
│   │       │   └── page.jsx
│   │       ├── ai-tutor/            # AI Tutor
│   │       │   └── page.jsx
│   │       ├── analytics/           # Analytics dashboard
│   │       │   └── page.jsx
│   │       ├── bookmarks/           # Bookmarks page
│   │       │   └── page.jsx
│   │       ├── contact/             # Contact page
│   │       │   └── page.jsx
│   │       ├── daily-challenge/     # Daily challenges
│   │       │   └── page.jsx
│   │       ├── dashboard/           # User dashboard
│   │       │   └── page.jsx
│   │       ├── forgot-password/     # Password reset
│   │       │   └── page.jsx
│   │       ├── java/                # Java programming
│   │       │   └── page.jsx
│   │       ├── login/               # Login page
│   │       │   └── page.jsx
│   │       ├── mock-test/           # Mock tests
│   │       │   └── page.jsx
│   │       ├── my-learning/         # My learning page
│   │       │   └── page.jsx
│   │       ├── offline/             # Offline page
│   │       │   └── page.jsx
│   │       ├── practice/            # Practice questions
│   │       │   └── page.jsx
│   │       ├── privacy/             # Privacy policy
│   │       │   └── page.jsx
│   │       ├── profile/             # User profile
│   │       │   └── page.jsx
│   │       ├── question-bank/       # Question bank
│   │       │   └── page.jsx
│   │       ├── register/            # Registration page
│   │       │   └── page.jsx
│   │       ├── rewards/             # Rewards page
│   │       │   └── page.jsx
│   │       ├── roadmap/             # Learning roadmap
│   │       │   └── page.jsx
│   │       ├── services/            # Services page
│   │       │   └── page.jsx
│   │       ├── settings/            # Settings page
│   │       │   └── page.jsx
│   │       ├── study/               # Study material
│   │       │   └── page.jsx
│   │       ├── teacher/             # Teacher dashboard
│   │       │   └── page.jsx
│   │       ├── terms/               # Terms of service
│   │       │   └── page.jsx
│   │       └── ...                  # Additional routes
│   │
│   └── components/                  # Global components (if any)
│       └── dashboard/               # Dashboard-specific components
│
├── .env.local                       # Environment variables (not committed)
├── .gitignore                       # Git ignore rules
├── next.config.mjs                  # Next.js configuration
├── tailwind.config.js               # Tailwind CSS configuration
├── postcss.config.js                # PostCSS configuration
├── postcss.config.mjs               # PostCSS config (ESM)
├── eslint.config.mjs                # ESLint configuration
├── jsconfig.json                    # JavaScript config for IDE
├── package.json                     # Dependencies & scripts
├── package-lock.json                # Locked dependency versions
├── firestore.rules                  # Firestore security rules
├── README.md                        # Project documentation
├── CHANGELOG.md                     # Version history
├── ROADMAP.md                       # Future plans
├── CONTRIBUTING.md                  # Contribution guide
├── TESTING.md                       # Testing guide
├── DEPLOYMENT.md                    # Deployment guide
├── SECURITY.md                      # Security policy
└── ARCHITECTURE.md                  # This file
```

### Key Directories Explained

#### `/src/app/` - Next.js App Router
- **Purpose**: Contains all pages, layouts, and routing logic
- **Structure**: File-system based routing
- **Pages**: Each folder represents a route
- **Layouts**: Shared UI across routes

#### `/src/app/components/` - UI Components
- **Purpose**: Reusable React components
- **Organization**: By feature and type
- **ui/**: Base components (Button, Input, Modal)
- **Feature components**: Specific to features (Navbar, Hero)

#### `/src/app/context/` - State Management
- **Purpose**: Global state with React Context
- **Usage**: Authentication, theme, user preferences
- **Pattern**: Provider pattern with custom hooks

#### `/src/app/hooks/` - Custom Hooks
- **Purpose**: Reusable stateful logic
- **Benefits**: Logic reuse, cleaner components
- **Examples**: useBookmarks, useProgress, useFirestore

#### `/src/app/lib/` - Business Logic
- **Purpose**: Core application logic
- **Separation**: Keeps components clean
- **Contains**: Data processing, API calls, utilities

#### `/src/app/utils/` - Helper Functions
- **Purpose**: Pure utility functions
- **Usage**: Data transformation, validation
- **Examples**: Content enrichment, audit functions

---

## 🔄 Data Flow

### Client-Side Data Flow

```
User Interaction
       ↓
Event Handler (Component)
       ↓
Custom Hook (useBookmarks, useProgress, etc.)
       ↓
Business Logic (lib/)
       ↓
Firebase SDK / LocalStorage
       ↓
Firestore / LocalStorage
       ↓
Real-time Updates (onSnapshot)
       ↓
State Update (useState/useEffect)
       ↓
Re-render Component
```

### Example: Bookmark Flow

```javascript
// 1. User clicks bookmark button
<button onClick={() => toggleBookmark(questionId)}>
  Bookmark
</button>

// 2. Event handler in component
const toggleBookmark = async (questionId) => {
  await toggleBookmark(questionId); // Custom hook
};

// 3. Custom hook manages state and logic
function useBookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  
  const toggleBookmark = async (questionId) => {
    // Business logic
    if (bookmarks.includes(questionId)) {
      await removeBookmark(questionId);
      setBookmarks(prev => prev.filter(id => id !== questionId));
    } else {
      await addBookmark(questionId);
      setBookmarks(prev => [...prev, questionId]);
    }
  };
  
  return { bookmarks, toggleBookmark };
}

// 4. Hook uses Firebase service
async function addBookmark(questionId) {
  const { db } = getFirebaseInstance();
  await addDoc(collection(db, "bookmarks"), {
    questionId,
    userId: user.uid,
    createdAt: new Date(),
  });
}

// 5. Firestore triggers real-time update
useEffect(() => {
  const q = query(
    collection(db, "bookmarks"),
    where("userId", "==", user.uid)
  );
  
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const bookmarks = snapshot.docs.map(doc => doc.data().questionId);
    setBookmarks(bookmarks);
  });
  
  return () => unsubscribe();
}, [user.uid]);
```

### Data Flow Patterns

#### Pattern 1: Read-Only Data (Questions, Chapters)
```
Firestore → onSnapshot → State → Component
```
- Real-time listeners for live updates
- No local state modification
- Optimistic UI updates not needed

#### Pattern 2: User-Generated Data (Progress, Bookmarks)
```
User Action → Optimistic Update → Firestore → Confirm/Rollback
```
- Immediate UI feedback
- Background sync with Firestore
- Error handling with rollback

#### Pattern 3: Computed Data (Analytics, Statistics)
```
Multiple Sources → Aggregation → Calculation → Display
```
- Combine data from multiple collections
- Calculate statistics client-side
- Cache results for performance

---

## 🔐 Authentication Flow

### Authentication State Management

```
App Load
  ↓
AuthProvider (Context)
  ↓
onAuthStateChanged (Firebase)
  ↓
Check Firestore for user profile
  ↓
Set user state
  ↓
Provide user to app
```

### Registration Flow

```
User fills registration form
  ↓
Client-side validation
  ↓
createUserWithEmailAndPassword()
  ↓
Create Firestore user document
  ↓
updateProfile() with displayName
  ↓
sendEmailVerification()
  ↓
Show success message
  ↓
Redirect to email verification page
  ↓
User clicks verification link
  ↓
Email verified in Firebase
  ↓
User can now login
```

### Login Flow

```
User enters credentials
  ↓
Client-side validation
  ↓
signInWithEmailAndPassword()
  ↓
Check emailVerified
  ↓
If not verified → signOut() + error message
  ↓
If verified → Fetch user profile from Firestore
  ↓
Set user state
  ↓
Redirect to dashboard
```

### Google OAuth Flow

```
User clicks "Sign in with Google"
  ↓
GoogleAuthProvider created
  ↓
signInWithPopup()
  ↓
Google authentication
  ↓
Check if user exists in Firestore
  ↓
If new user → Create Firestore document
  ↓
Set user state
  ↓
Redirect to dashboard
```

### Session Persistence

- Firebase SDK handles token refresh automatically
- Tokens stored in IndexedDB by Firebase
- Session persists across browser restarts
- onAuthStateChanged fires on app load
- User state restored automatically

### Protected Routes

```javascript
// middleware.js (future implementation)
export function middleware(request) {
  const token = request.cookies.get('token');
  
  if (!token && protectedRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// Component-level protection
function ProtectedPage({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) return <Spinner />;
  if (!user) return <Navigate to="/login" />;
  
  return children;
}
```

---

## 🗄️ Firestore Schema

### Database Structure

```
Target95 Firestore
│
├── users/
│   └── {userId}/
│       ├── uid: string
│       ├── email: string
│       ├── fullName: string
│       ├── role: string (student/teacher/admin)
│       ├── emailVerified: boolean
│       ├── createdAt: timestamp
│       ├── lastLogin: timestamp
│       │
│       ├── progress/ (subcollection)
│       │   └── {progressId}/
│       │       ├── chapterId: string
│       │       ├── subject: string
│       │       ├── completed: boolean
│       │       ├── score: number
│       │       ├── timeSpent: number
│       │       └── completedAt: timestamp
│       │
│       ├── bookmarks/ (subcollection)
│       │   └── {bookmarkId}/
│       │       ├── questionId: string
│       │       ├── createdAt: timestamp
│       │       └── notes: string (optional)
│       │
│       ├── mockTests/ (subcollection)
│       │   └── {testId}/
│       │       ├── subject: string
│       │       ├── chapter: string
│       │       ├── score: number
│       │       ├── totalQuestions: number
│       │       ├── correctAnswers: number
│       │       ├── timeTaken: number
│       │       ├── answers: array
│       │       └── completedAt: timestamp
│       │
│       └── rewards/ (subcollection)
│           └── {rewardId}/
│               ├── type: string (points/badge/achievement)
│               ├── points: number
│               ├── description: string
│               └── earnedAt: timestamp
│
├── questions/
│   └── {questionId}/
│       ├── question: string
│       ├── type: string (mcq/subjective/programming)
│       ├── subject: string
│       ├── chapter: string
│       ├── topic: string
│       ├── difficulty: string (easy/medium/hard)
│       ├── options: array (for MCQ)
│       ├── correctAnswer: string
│       ├── explanation: string
│       ├── marks: number
│       ├── tags: array
│       └── createdAt: timestamp
│
├── chapters/
│   └── {chapterId}/
│       ├── name: string
│       ├── subject: string
│       ├── class: string (10/12)
│       ├── order: number
│       ├── description: string
│       ├── topics: array
│       ├── totalQuestions: number
│       └── estimatedTime: string
│
├── subjects/
│   └── {subjectId}/
│       ├── name: string
│       ├── class: string
│       ├── icon: string
│       ├── description: string
│       ├── chapters: array
│       └── totalChapters: number
│
├── dailyChallenges/
│   └── {challengeId}/
│       ├── date: timestamp
│       ├── questionId: string
│       ├── difficulty: string
│       └── points: number
│
└── rewards/
    └── {rewardId}/
        ├── name: string
        ├── description: string
        ├── type: string
        ├── points: number
        ├── icon: string
        └── criteria: object
```

### Data Relationships

```
users (1) ────── (N) progress
     │
     ├────────── (N) bookmarks
     │
     ├────────── (N) mockTests
     │
     └────────── (N) rewards

questions (N) ──── (1) chapters
     │
     └────────── referenced by bookmarks

chapters (N) ──── (1) subjects

dailyChallenges (1) ── (1) questions
```

### Indexing Strategy

```javascript
// Composite indexes for common queries
// 1. User's progress by subject
Collection: users/{userId}/progress
Index: subject + completed + completedAt

// 2. User's mock tests by date
Collection: users/{userId}/mockTests
Index: completedAt (descending)

// 3. Questions by subject and difficulty
Collection: questions
Index: subject + difficulty + createdAt

// 4. Bookmarks by user and date
Collection: users/{userId}/bookmarks
Index: createdAt (descending)
```

---

## 🧩 Reusable Components

### Component Hierarchy

```
App
├── Layout Components
│   ├── AuthProviderWrapper
│   ├── Navbar
│   ├── Footer
│   ├── OfflineBanner
│   └── ErrorBoundary
│
├── Page Components
│   ├── Home
│   │   ├── Hero
│   │   ├── Stats
│   │   ├── Features
│   │   ├── Subjects
│   │   ├── WhyTarget95
│   │   ├── AIWorkflow
│   │   ├── BoardSupport
│   │   ├── Testimonials
│   │   ├── FAQ
│   │   ├── Pricing
│   │   └── Newsletter
│   │
│   ├── MockTest
│   │   ├── TestSetup
│   │   ├── TestPlayer
│   │   ├── QuestionDisplay
│   │   ├── QuestionPalette
│   │   └── TestResults
│   │
│   ├── Practice
│   │   ├── QuestionFilters
│   │   ├── QuestionList
│   │   ├── QuestionCard
│   │   └── QuestionDetail
│   │
│   └── ...
│
└── Feature Components
    ├── BookmarkButton
    ├── ProgressBar
    ├── StatsCard
    ├── LoadingSpinner
    ├── ErrorMessage
    └── EmptyState
```

### Component Design Principles

#### 1. Single Responsibility
```jsx
// ✅ Good: Component does one thing
function BookmarkButton({ questionId, isBookmarked, onToggle }) {
  return (
    <button onClick={() => onToggle(questionId)}>
      {isBookmarked ? '★' : '☆'}
    </button>
  );
}

// ❌ Bad: Component does too much
function BookmarkButton({ questionId, onToggle, onShare, onReport }) {
  // Too many responsibilities
}
```

#### 2. Composition Over Inheritance
```jsx
// ✅ Good: Compose components
<Card>
  <Card.Header>
    <Card.Title>Title</Card.Title>
  </Card.Header>
  <Card.Body>
    <p>Content</p>
  </Card.Body>
</Card>

// ❌ Bad: Prop drilling for every option
<Card title="Title" showHeader bodyContent={<p>Content</p>} />
```

#### 3. Props Interface
```jsx
// ✅ Good: Clear, typed props
function Button({ 
  variant = 'primary',  // primary | secondary | outline
  size = 'md',          // sm | md | lg
  disabled = false,
  loading = false,
  onClick,
  children 
}) {
  // Implementation
}

// ❌ Bad: Unclear props
function Button(props) {
  // What does this prop do?
}
```

#### 4. Controlled Components
```jsx
// ✅ Good: Controlled input
function SearchInput({ value, onChange, placeholder }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}

// Usage
const [query, setQuery] = useState('');
<SearchInput value={query} onChange={setQuery} />
```

### Key Reusable Components

#### Button Component
```jsx
/**
 * Reusable button with variants
 * @param {string} variant - primary | secondary | outline | ghost
 * @param {string} size - sm | md | lg
 * @param {boolean} disabled - Disable button
 * @param {boolean} loading - Show loading spinner
 * @param {function} onClick - Click handler
 */
function Button({ variant, size, disabled, loading, onClick, children }) {
  const baseStyles = "rounded-lg font-medium transition-colors";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
  };
  
  return (
    <button 
      className={`${baseStyles} ${variants[variant]}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
}
```

#### Card Component
```jsx
/**
 * Container component for content
 * @param {string} padding - none | sm | md | lg
 * @param {boolean} shadow - Show shadow
 * @param {boolean} hover - Hover effect
 */
function Card({ padding, shadow, hover, children }) {
  const baseStyles = "bg-white rounded-lg";
  const paddingStyles = { sm: 'p-4', md: 'p-6', lg: 'p-8' };
  
  return (
    <div className={`
      ${baseStyles}
      ${paddingStyles[padding]}
      ${shadow ? 'shadow-md' : ''}
      ${hover ? 'hover:shadow-lg transition-shadow' : ''}
    `}>
      {children}
    </div>
  );
}
```

#### Modal Component
```jsx
/**
 * Accessible modal dialog
 * @param {boolean} isOpen - Show/hide modal
 * @param {function} onClose - Close handler
 * @param {string} title - Modal title
 */
function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
```

---

## 🗂️ State Management

### State Management Strategy

Target95+ uses a **hybrid approach**:

1. **Local State** - Component-specific state (useState)
2. **Context API** - Global state (Auth, Theme)
3. **Server State** - Firebase/Firestore (real-time)
4. **Local Storage** - Offline persistence

### State Categories

#### 1. Local State (useState)
```javascript
// Component-specific state
function QuestionCard({ question }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  
  // Only relevant to this component
}
```

#### 2. Global State (Context)
```javascript
// Authentication state
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Available to entire app
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Usage in any component
function Profile() {
  const { user } = useAuth();
  return <div>{user.name}</div>;
}
```

#### 3. Server State (Firebase)
```javascript
// Real-time data from Firestore
function useQuestions(filters) {
  const [questions, setQuestions] = useState([]);
  
  useEffect(() => {
    const q = query(collection(db, "questions"), ...filters);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setQuestions(snapshot.docs.map(doc => doc.data()));
    });
    
    return () => unsubscribe();
  }, [filters]);
  
  return questions;
}
```

#### 4. Client Persistence (localStorage)
```javascript
// Offline-capable data
function useOfflineBookmarks() {
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('bookmarks');
    return saved ? JSON.parse(saved) : [];
  });
  
  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);
  
  return bookmarks;
}
```

### State Management Rules

1. **Local First** - Use local state by default
2. **Lift When Needed** - Lift state when sharing between siblings
3. **Context for Global** - Use Context for app-wide state
4. **Server as Source of Truth** - Firebase is source of truth
5. **Optimistic Updates** - Update UI immediately, sync later

---

## 🛣️ Routing

### Next.js App Router Structure

```
src/app/
├── layout.js          # Root layout (wraps all pages)
├── page.js            # Homepage (/)
├── about/
│   └── page.jsx       # /about
├── mock-test/
│   └── page.jsx       # /mock-test
└── practice/
    └── page.jsx       # /practice
```

### Route Types

#### Static Routes
```javascript
// src/app/about/page.jsx
// Automatically available at /about
export default function About() {
  return <div>About Page</div>;
}
```

#### Dynamic Routes
```javascript
// src/app/mock-test/[testId]/page.jsx
// Matches /mock-test/123, /mock-test/abc, etc.
export default function MockTest({ params }) {
  return <div>Test ID: {params.testId}</div>;
}
```

#### Catch-All Routes
```javascript
// src/app/subjects/[...slug]/page.jsx
// Matches /subjects/cs, /subjects/cs/java, etc.
export default function Subject({ params }) {
  return <div>Slug: {params.slug}</div>;
}
```

### Navigation

```javascript
// Client-side navigation
import { useRouter } from 'next/navigation';

function Component() {
  const router = useRouter();
  
  const handleClick = () => {
    router.push('/dashboard');
    router.replace('/login'); // Replace history
    router.back(); // Go back
    router.forward(); // Go forward
  };
}

// Link component (prefetching)
import Link from 'next/link';

function NavLink({ href, children }) {
  return (
    <Link href={href} prefetch={true}>
      {children}
    </Link>
  );
}
```

### Metadata & SEO

```javascript
// Static metadata
export const metadata = {
  title: 'Page Title',
  description: 'Page description',
};

// Dynamic metadata
export async function generateMetadata({ params }) {
  const question = await getQuestion(params.id);
  
  return {
    title: question.title,
    description: question.excerpt,
    openGraph: {
      title: question.title,
      description: question.excerpt,
      images: [question.image],
    },
  };
}
```

---

## ⚡ Performance Optimization

### Optimization Strategies

#### 1. Code Splitting
```javascript
// Automatic with Next.js
// Each page is automatically code-split

// Manual code splitting
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Spinner />,
  ssr: false, // Disable SSR for client-only component
});
```

#### 2. Image Optimization
```javascript
import Image from 'next/image';

// ✅ Use Next.js Image component
<Image
  src="/hero.png"
  alt="Hero"
  width={1200}
  height={600}
  priority // Load immediately (above the fold)
/>

// Lazy load below-fold images
<Image
  src="/content.png"
  alt="Content"
  width={800}
  height={400}
  loading="lazy"
/>
```

#### 3. Font Optimization
```javascript
// Automatic in Next.js
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

// In layout.js
<html className={inter.className}>
```

#### 4. Bundle Optimization
```javascript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable compiler
  compiler: {
    reactRemoveProperties: true,
  },
  
  // Production optimizations
  swcMinify: true,
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
};

export default nextConfig;
```

#### 5. Caching Strategy

```javascript
// Service Worker caching (public/sw.js)
const CACHE_NAME = 'target95-v1';

// Cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/offline',
        '/styles.css',
        '/main.js',
      ]);
    })
  );
});

// Serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
```

### Performance Metrics

| Metric | Target | Current |
|--------|--------|---------|
| First Contentful Paint | < 1.8s | ~1.5s |
| Largest Contentful Paint | < 2.5s | ~2.0s |
| First Input Delay | < 100ms | ~50ms |
| Cumulative Layout Shift | < 0.1 | ~0.05 |
| Time to Interactive | < 3.8s | ~3.0s |

---

## 🎨 Design Patterns

### Patterns Used

#### 1. Provider Pattern
```javascript
// Context provider for global state
<AuthProvider>
  <ThemeProvider>
    <App />
  </ThemeProvider>
</AuthProvider>
```

#### 2. Custom Hooks Pattern
```javascript
// Reusable logic
function useBookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  
  useEffect(() => {
    // Fetch bookmarks
  }, []);
  
  const addBookmark = (id) => { /* ... */ };
  const removeBookmark = (id) => { /* ... */ };
  
  return { bookmarks, addBookmark, removeBookmark };
}
```

#### 3. Compound Components
```javascript
// Components that work together
<Card>
  <Card.Header>
    <Card.Title>Title</Card.Title>
  </Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>
```

#### 4. Render Props
```javascript
// Share logic via props
<DataFetcher url="/api/questions">
  {(data, loading, error) => {
    if (loading) return <Spinner />;
    if (error) return <Error />;
    return <QuestionList questions={data} />;
  }}
</DataFetcher>
```

#### 5. Higher-Order Components (HOC)
```javascript
// Wrap component with additional logic
function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const { user, loading } = useAuth();
    
    if (loading) return <Spinner />;
    if (!user) return <Navigate to="/login" />;
    
    return <Component {...props} user={user} />;
  };
}

// Usage
const ProtectedDashboard = withAuth(Dashboard);
```

---

## 📊 Monitoring & Observability

### Error Tracking

```javascript
// Error boundaries
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    // Log to error tracking service
    logErrorToService(error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorPage />;
    }
    return this.props.children;
  }
}
```

### Performance Monitoring

```javascript
// Web Vitals
import { getCLS, getFID, getFID, getLCP } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getLCP(console.log);
```

### Analytics

```javascript
// Firebase Analytics
import { getAnalytics, logEvent } from 'firebase/analytics';

const analytics = getAnalytics();

// Track events
logEvent(analytics, 'mock_test_completed', {
  subject: 'Computer Science',
  score: 85,
  timeTaken: 1200,
});
```

---

## 🔮 Future Architecture Considerations

### Planned Improvements

1. **TypeScript Migration**
   - Better type safety
   - Improved developer experience
   - Fewer runtime errors

2. **Backend API**
   - Custom API layer
   - Better caching
   - Advanced features

3. **Microservices** (v2.0+)
   - Separate services for different features
   - Better scalability
   - Independent deployments

4. **Mobile Apps**
   - React Native or Flutter
   - Shared business logic
   - Native performance

---

**Last Updated**: January 15, 2025

**Maintained By**: Architecture Team