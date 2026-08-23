'use client';

import { useEffect, useState } from 'react';

const DISMISSED_STORAGE_KEY = 'target95-install-dismissed';

async function clearLocalServiceWorkerState() {
  if (!('serviceWorker' in navigator)) return;
  const registrations = await navigator.serviceWorker.getRegistrations();
  await Promise.all(registrations.map((registration) => registration.unregister()));

  if ('caches' in window) {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)));
  }
}

export default function PWAPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [newVersionAvailable, setNewVersionAvailable] = useState(false);

  useEffect(() => {
    let cancelled = false;

    // Development must never be served stale PWA assets. Remove an older
    // registration/cache left by a previous production run of the app.
    if (process.env.NODE_ENV !== 'production') {
      clearLocalServiceWorkerState().catch(() => {});
      return () => { cancelled = true; };
    }

    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isStandalone) return undefined;

    let dismissed = false;
    try {
      dismissed = Boolean(localStorage.getItem(DISMISSED_STORAGE_KEY));
    } catch {
      dismissed = false;
    }
    if (dismissed) return undefined;

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      if (!cancelled) {
        setDeferredPrompt(event);
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then((registration) => {
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (!newWorker) return;
          newWorker.addEventListener('statechange', () => {
            if (!cancelled && newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              setNewVersionAvailable(true);
            }
          });
        });
      }).catch(() => {
        // PWA support is optional; the site remains usable without it.
      });
    }

    return () => {
      cancelled = true;
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        try { localStorage.setItem(DISMISSED_STORAGE_KEY, 'true'); } catch {}
      }
    } finally {
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    try { localStorage.setItem(DISMISSED_STORAGE_KEY, 'true'); } catch {}
  };

  const handleUpdate = async () => {
    if (!('serviceWorker' in navigator)) return;
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration?.waiting) registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    } finally {
      window.location.reload();
    }
  };

  return (
    <>
      {showPrompt && (
        <div role="dialog" aria-label="Install app" className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white rounded-lg shadow-xl p-4 z-50 border border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">Install Target95+</h3>
              <p className="text-sm text-gray-600 mt-1">Install our app for a better offline experience</p>
            </div>
            <button type="button" onClick={handleDismiss} className="ml-4 text-gray-400 hover:text-gray-600" aria-label="Dismiss install prompt">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6L18 18" /></svg>
            </button>
          </div>
          <div className="mt-4 flex gap-3">
            <button type="button" onClick={handleDismiss} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm font-medium">Not now</button>
            <button type="button" onClick={handleInstall} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium">Install</button>
          </div>
        </div>
      )}

      {newVersionAvailable && (
        <div role="alert" className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-green-50 rounded-lg shadow-xl p-4 z-50 border border-green-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-green-900">New Version Available!</h3>
              <p className="text-sm text-green-700 mt-1">Refresh to update to the latest version</p>
            </div>
          </div>
          <div className="mt-4">
            <button type="button" onClick={handleUpdate} className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium">Update Now</button>
          </div>
        </div>
      )}
    </>
  );
}
