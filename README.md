# 🎯 Target95+

**AI-Powered Learning Platform for ICSE & ISC Computer Science Students**

[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-61dafb)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-10.8.0-ffca28)](https://firebase.google.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://vercel.com/)

---

## 📚 Project Overview

Target95+ is a production-grade, AI-powered learning platform designed specifically for ICSE (Class 10) and ISC (Class 12) Computer Science students. The platform helps students prepare for board exams through intelligent practice, comprehensive study materials, and personalized learning paths.

### 🎯 Mission

To democratize access to quality Computer Science education by providing:
- **Smart Practice** - AI-curated questions and adaptive learning
- **Comprehensive Coverage** - Complete syllabus coverage for ICSE & ISC
- **Exam Simulation** - Realistic mock tests with detailed analytics
- **Progress Tracking** - Monitor learning journey with detailed insights
- **Accessibility** - Free tier available for all students

---

## ✨ Features

### Core Learning Features
- 📝 **Mock Tests** - Timed tests with real exam patterns and instant results
- 💻 **Practice Questions** - Extensive question bank with topic-wise filtering
- 🤖 **AI Tutor** - Interactive AI-powered learning assistant
- 📖 **Study Material** - Comprehensive notes and explanations
- 🎯 **Daily Challenges** - Daily practice questions to build consistency
- 🏆 **Rewards System** - Gamified learning with points and achievements

### User Features
- 🔐 **Secure Authentication** - Email/password and Google OAuth
- 📊 **Progress Tracking** - Detailed analytics and performance metrics
- 🔖 **Bookmarks** - Save important questions for revision
- 📱 **Offline Support** - Study without internet connection
- 🎨 **Dark Mode Ready** - Modern UI with theme support
- 📲 **PWA Support** - Install as native app on any device

### Technical Features
- ⚡ ** blazing Fast** - Optimized with Next.js 16 and React 19
- 🔍 **SEO Optimized** - Meta tags, sitemap, and robots.txt
- ♿ **Accessible** - WCAG compliant components
- 📱 **Responsive** - Mobile-first design approach
- 🔄 **Real-time Updates** - Live data synchronization with Firestore

---

## 📸 Screenshots

> **Note:** Add screenshots of the platform here

```
Screenshots to include:
1. Homepage with hero section
2. Mock test interface
3. Practice question bank
4. AI Tutor chat interface
5. Progress dashboard
6. Mobile responsive views
```

---

## 🚀 Installation

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Firebase account
- Git

### Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/adilparsh-code/Target95.git
cd Target95
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env.local` file in the root directory:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Application URL
NEXT_PUBLIC_APP_URL=https://target95.vercel.app
```

4. **Run development server**
```bash
npm run dev
```

5. **Open browser**
Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Folder Structure

```
Target95/
├── public/                          # Static assets
│   ├── icons/                       # PWA icons
│   ├── manifest.json                # PWA manifest
│   └── sw.js                        # Service worker
│
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── components/              # Reusable UI components
│   │   │   ├── ui/                  # Base UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ...
│   │   ├── context/                 # React Context providers
│   │   │   └── AuthContext.js
│   │   ├── hooks/                   # Custom React hooks
│   │   │   ├── useBookmarks.js
│   │   │   ├── useProgress.js
│   │   │   └── ...
│   │   ├── lib/                     # Business logic & utilities
│   │   │   ├── firebase/            # Firebase configuration
│   │   │   ├── curriculum.js        # Curriculum data
│   │   │   ├── questionBank.js      # Question management
│   │   │   └── ...
│   │   ├── utils/                   # Helper utilities
│   │   ├── layout.js                # Root layout
│   │   ├── page.js                  # Homepage
│   │   └── [routes]/                # App routes
│   │       ├── about/
│   │       ├── mock-test/
│   │       ├── practice/
│   │       ├── ai-tutor/
│   │       └── ...
│   │
│   └── components/                  # Global components
│       └── dashboard/
│
├── .env.local                       # Environment variables (not committed)
├── .gitignore
├── next.config.mjs                  # Next.js configuration
├── tailwind.config.js               # Tailwind CSS configuration
├── package.json                     # Dependencies
├── firestore.rules                  # Firestore security rules
└── README.md
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16.2.9 (App Router)
- **UI Library**: React 19.2.4
- **Styling**: Tailwind CSS 4.0
- **Icons**: Heroicons & Lucide React
- **Syntax Highlighting**: React Syntax Highlighter

### Backend & Services
- **Authentication**: Firebase Authentication
- **Database**: Cloud Firestore
- **Hosting**: Vercel
- **PWA**: Service Workers & Web App Manifest

### Development Tools
- **Linting**: ESLint 9
- **Compiler**: Babel React Compiler
- **Package Manager**: npm

---

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API key | Yes |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | Yes |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID | Yes |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | Yes |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | Yes |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID | Yes |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | Firebase analytics measurement ID | No |
| `NEXT_PUBLIC_APP_URL` | Application URL | Yes |

> ⚠️ **Security Note**: Never commit `.env.local` to version control. All Firebase credentials are public-facing and safe for client-side use.

---

## 💻 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint
```

### Development Workflow

1. Create a new branch from `main`
2. Make changes following coding standards
3. Test locally with `npm run dev`
4. Run linter with `npm run lint`
5. Commit with conventional commit message
6. Push and create Pull Request

### Code Style

- Functional components with hooks
- Mobile-first responsive design
- Tailwind CSS for styling
- Client components marked with `"use client"`
- Reusable components in `src/app/components/`
- Business logic in `src/lib/` and `src/hooks/`

---

## 🏗️ Production Build

### Build Process

```bash
# Install dependencies
npm install

# Run build
npm run build

# The build output will be in .next/ directory
```

### Build Optimization

- Automatic code splitting
- Image optimization with Next.js Image
- Font optimization
- CSS minification with Tailwind
- JavaScript minification
- Tree shaking for unused code

### Performance Targets

- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- First Input Delay: < 100ms

---

## 🚢 Deployment

### Vercel Deployment (Recommended)

1. **Push to GitHub**
```bash
git push origin main
```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables
   - Deploy

3. **Configure Custom Domain** (Optional)
   - Add custom domain in Vercel dashboard
   - Update DNS records
   - Enable SSL (automatic with Vercel)

### Environment Variables in Vercel

Add all environment variables in Vercel dashboard:
- Project Settings → Environment Variables
- Add each variable from `.env.local`
- Redeploy after adding variables

### Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test authentication flow
- [ ] Check Firebase connection
- [ ] Test on mobile devices
- [ ] Verify SEO meta tags
- [ ] Test PWA installation
- [ ] Check offline functionality
- [ ] Verify analytics (if enabled)
- [ ] Test all user flows
- [ ] Check console for errors

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 📄 License

This project is proprietary software. All rights reserved.

---

## 👨‍💻 Author

**Target95+ Team**

---

## 📞 Support

- **Website**: [https://target95.vercel.app](https://target95.vercel.app)
- **Email**: support@target95.vercel.app
- **Issues**: [GitHub Issues](https://github.com/adilparsh-code/Target95/issues)

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [Firebase](https://firebase.google.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Deployed on [Vercel](https://vercel.com/)

---

**Made with ❤️ for ICSE & ISC Computer Science students**