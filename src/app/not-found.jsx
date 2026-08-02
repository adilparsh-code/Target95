"use client";

import Link from 'next/link';
import Button from './components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Glassmorphism card */}
      <div className="relative z-10 text-center">
        <div className="backdrop-blur-xl bg-white/10 dark:bg-white/5 rounded-3xl border border-white/20 dark:border-white/10 p-8 md:p-16 shadow-2xl max-w-3xl mx-auto">
          {/* SVG 404 Illustration */}
          <div className="mb-8 relative">
            <svg
              viewBox="0 0 400 150"
              className="w-full max-w-lg mx-auto"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
                <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              
              {/* Number 4 */}
              <path
                d="M50 120L90 40H120V90H140V120H120V130H90V120H50ZM90 90H120V70L90 90Z"
                fill="url(#grad1)"
                filter="url(#glow)"
                className="transition-all duration-300 hover:scale-105"
              />
              
              {/* Number 0 */}
              <ellipse
                cx="200"
                cy="85"
                rx="45"
                ry="50"
                fill="none"
                stroke="url(#grad2)"
                strokeWidth="12"
                filter="url(#glow)"
              />
              <ellipse
                cx="200"
                cy="85"
                rx="20"
                ry="25"
                fill="currentColor"
                className="text-slate-800 dark:text-slate-200"
              />
              
              {/* Number 4 */}
              <path
                d="M300 120L340 40H370V90H390V120H370V130H340V120H300ZM340 90H370V70L340 90Z"
                fill="url(#grad1)"
                filter="url(#glow)"
              />

              {/* Floating decorative elements */}
              <circle cx="160" cy="30" r="4" fill="#3b82f6" className="animate-bounce" style={{ animationDelay: '0s' }} />
              <circle cx="240" cy="25" r="3" fill="#06b6d4" className="animate-bounce" style={{ animationDelay: '0.5s' }} />
              <circle cx="280" cy="40" r="3" fill="#8b5cf6" className="animate-bounce" style={{ animationDelay: '1s' }} />
            </svg>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Page Not Found
          </h1>
          <p className="text-lg md:text-xl text-slate-300 dark:text-slate-400 mb-10 max-w-xl mx-auto">
            Oops! The page you're looking for seems to have wandered off. Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/">
              <Button variant="default" size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 border-0">
                Back to Home
              </Button>
            </Link>
            <Link href="/Java">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10">
                Start Learning
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" size="lg" className="w-full sm:w-auto text-slate-300 hover:text-white hover:bg-white/10">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}