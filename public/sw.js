const CACHE_NAME = 'target95-v2';
const DYNAMIC_CACHE = 'target95-dynamic-v2';
const OFFLINE_URL = '/offline';

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/offline',
  '/manifest.json',
  '/icon-48x48.png',
  '/icon-72x72.png',
  '/icon-96x96.png',
  '/icon-128x128.png',
  '/icon-144x144.png',
  '/icon-152x152.png',
  '/icon-192x192.png',
  '/icon-256x256.png',
  '/icon-384x384.png',
  '/icon-512x512.png',
  '/apple-touch-icon.png',
];

// Install event - cache static assets, enable navigation preload
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      }),
      // Enable navigation preload if supported
      self.registration?.navigationPreload?.enable(),
    ]).then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME && name !== DYNAMIC_CACHE)
            .map((name) => caches.delete(name))
        );
      }),
      // Take control of all clients immediately
      self.clients.claim(),
    ])
  );
});

// Helper: network first, cache fallback (for navigation & dynamic content)
async function networkFirstWithFallback(request, fallbackUrl = OFFLINE_URL) {
  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      const clone = response.clone();
      caches.open(DYNAMIC_CACHE).then((cache) => {
        cache.put(request, clone);
      });
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) return cached;
    return caches.match(fallbackUrl);
  }
}

// Helper: cache first (for static assets)
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      const clone = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
    }
    return response;
  } catch {
    return caches.match(OFFLINE_URL);
  }
}

// Helper: stale while revalidate (for non-critical dynamic data)
async function staleWhileRevalidate(request) {
  const cached = await caches.match(request);
  const fetchPromise = fetch(request).then((response) => {
    if (response && response.status === 200) {
      const clone = response.clone();
      caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, clone));
    }
    return response;
  }).catch(() => cached);

  return cached || fetchPromise;
}

// Fetch event with routing
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) return;

  const { pathname } = new URL(event.request.url);

  // Handle navigation requests - network first, offline fallback
  if (event.request.mode === 'navigate') {
    event.respondWith(networkFirstWithFallback(event.request));
    return;
  }

  // Static assets (icons, fonts) - cache first
  if (
    pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|webp)$/) ||
    pathname.match(/\.(woff2?|ttf|eot)$/)
  ) {
    event.respondWith(cacheFirst(event.request));
    return;
  }

  // Stylesheets and scripts - cache first
  if (
    pathname.match(/\.(css|js|mjs)$/) ||
    pathname.startsWith('/_next/static/')
  ) {
    event.respondWith(cacheFirst(event.request));
    return;
  }

  // API-like requests / question data - stale while revalidate
  if (
    pathname.includes('/api/') ||
    pathname.includes('/data/') ||
    pathname.match(/\.json$/)
  ) {
    event.respondWith(staleWhileRevalidate(event.request));
    return;
  }

  // Default: network first with offline fallback
  event.respondWith(networkFirstWithFallback(event.request));
});

// Background Sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-bookmarks' || event.tag === 'sync-progress') {
    event.waitUntil(syncData(event.tag));
  }
});

async function syncData(tag) {
  try {
    const clients = await self.clients.matchAll();
    clients.forEach((client) => {
      client.postMessage({
        type: 'SYNC_TRIGGERED',
        tag,
        timestamp: Date.now(),
      });
    });
    console.log(`Background sync completed for: ${tag}`);
  } catch (error) {
    console.error(`Background sync failed for ${tag}:`, error);
    throw error; // Retry later
  }
}

// Listen for messages from the client
self.addEventListener('message', (event) => {
  if (!event.data) return;

  switch (event.data.type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
    case 'REGISTER_SYNC':
      // Registration happens in the client, but we handle the sync event
      break;
  }
});