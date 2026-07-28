'use client';

import useOnlineStatus from '../hooks/useOnlineStatus';
import { useEffect, useState } from 'react';

export default function OfflineBanner() {
  const { isOnline, wasOffline } = useOnlineStatus();
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState('offline');

  useEffect(() => {
    if (!isOnline) {
      setType('offline');
      setVisible(true);
    } else if (wasOffline) {
      setType('online');
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, wasOffline]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed top-0 left-0 right-0 z-[60] transition-transform duration-300 ${
        type === 'offline'
          ? 'bg-amber-50 border-b border-amber-200'
          : 'bg-green-50 border-b border-green-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-center gap-2">
        {type === 'offline' ? (
          <>
            <svg className="h-4 w-4 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m-2.829-2.829a5 5 0 000-7.07m-4.243 4.243a1 1 0 010-1.414M3 3l18 18" />
            </svg>
            <span className="text-sm font-medium text-amber-800">
              You are offline. Some features may be limited.
            </span>
          </>
        ) : (
          <>
            <svg className="h-4 w-4 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-medium text-green-800">
              Back online! Your data will sync automatically.
            </span>
          </>
        )}
      </div>
    </div>
  );
}