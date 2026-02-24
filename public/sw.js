// Service Worker for TADA PWA
const CACHE_NAME = 'tada-v1.0.0';
const RUNTIME_CACHE = 'tada-runtime';
const OFFLINE_URL = '/';

// Maximum number of entries in the runtime cache (prevents unbounded growth)
const MAX_RUNTIME_CACHE_ENTRIES = 100;

// Assets to cache on install
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/tada-icon.svg',
  '/manifest.json',
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Trim a cache down to `maxEntries` by deleting the oldest entries.
 */
async function trimCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > maxEntries) {
    const excess = keys.length - maxEntries;
    const toDelete = keys.slice(0, excess);
    await Promise.all(toDelete.map((request) => cache.delete(request)));
    console.log(`[SW] Trimmed ${excess} entries from ${cacheName}`);
  }
}

// ---------------------------------------------------------------------------
// Install — cache core assets
// ---------------------------------------------------------------------------
self.addEventListener('install', (event) => {
  console.log('[SW] Install event');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Precaching app shell');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

// ---------------------------------------------------------------------------
// Activate — cleanup old caches
// ---------------------------------------------------------------------------
self.addEventListener('activate', (event) => {
  console.log('[SW] Activate event');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME && name !== RUNTIME_CACHE)
            .map((name) => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

// ---------------------------------------------------------------------------
// Fetch — network-first for HTML, cache-first for assets
// ---------------------------------------------------------------------------
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip cross-origin requests
  if (url.origin !== location.origin) return;

  // Network-first strategy for HTML
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const responseToCache = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(request).then((cached) => {
            return cached || caches.match(OFFLINE_URL);
          });
        })
    );
    return;
  }

  // Cache-first strategy for static assets (JS, CSS, images)
  event.respondWith(
    caches.match(request)
      .then((cached) => {
        if (cached) {
          return cached;
        }

        return fetch(request).then((response) => {
          if (!response || response.status !== 200 || response.type === 'error') {
            return response;
          }

          const responseToCache = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, responseToCache);
            // Enforce cache size limit after adding
            trimCache(RUNTIME_CACHE, MAX_RUNTIME_CACHE_ENTRIES);
          });

          return response;
        }).catch((error) => {
          console.log('[SW] Fetch failed:', error);
          throw error;
        });
      })
  );
});

// ---------------------------------------------------------------------------
// Messages from clients
// ---------------------------------------------------------------------------
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[SW] Skip waiting requested');
    self.skipWaiting();
  }
});

// ---------------------------------------------------------------------------
// Background sync (future enhancement)
// ---------------------------------------------------------------------------
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);
});
