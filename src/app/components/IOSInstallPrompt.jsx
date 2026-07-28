'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'target95-ios-prompt-dismissed';

export default function IOSInstallPrompt() {
  const [showIOSPrompt, setShowIOSPrompt] = useState(false);

  useEffect(() => {
    // Check if running on iOS Safari and not in standalone mode
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const dismissed = localStorage.getItem(STORAGE_KEY);

    if (isIOS && !isStandalone && isSafari && !dismissed) {
      // Delay showing so it doesn't appear immediately on page load
      const timer = setTimeout(() => setShowIOSPrompt(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setShowIOSPrompt(false);
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // localStorage not available
    }
  };

  if (!showIOSPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white rounded-lg shadow-xl p-4 z-50 border border-gray-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="bg-gray-900 rounded-lg p-2">
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Install Target95+</h3>
            <p className="text-xs text-gray-500">Add to Home Screen</p>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="text-gray-400 hover:text-gray-600 ml-4"
          aria-label="Dismiss"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <p className="font-medium text-gray-800">To install on your iPhone/iPad:</p>
        <ol className="space-y-2 list-decimal list-inside">
          <li>
            Tap the{' '}
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded text-xs font-medium">
              <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.21 14.77a.75.75 0 01.02 1.06L8.16 18l-2.07-2.17a.75.75 0 111.04-1.08l.77.81V2.75a.75.75 0 011.5 0v12.84l.77-.81a.75.75 0 011.06-.01z" clipRule="evenodd" />
              </svg>
              Share
            </span>{' '}
            button
          </li>
          <li>
            Scroll down and tap{' '}
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded text-xs font-medium">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add to Home Screen
            </span>
          </li>
          <li>Tap &ldquo;Add&rdquo; in the top right corner</li>
        </ol>
      </div>

      <div className="mt-4">
        <button
          onClick={handleDismiss}
          className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  );
}