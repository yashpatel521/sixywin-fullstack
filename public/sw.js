// Service Worker for SixyWin
const VERSION = "v3";
const CACHE_NAMES = {
  pages: `sixywin-pages-${VERSION}`,
  assets: `sixywin-assets-${VERSION}`,
  images: `sixywin-images-${VERSION}`,
};

const CORE_ASSETS = [
  "/",
  "/index.html",
  "/logo/logo3.png",
  "/manifest.json",
];

// Utility: limit cache size (simple max-entries for images)
async function trimCache(cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length <= maxItems) return;
  // delete oldest first
  for (let i = 0; i < keys.length - maxItems; i++) {
    await cache.delete(keys[i]);
  }
}

// Strategies
async function networkFirst(event) {
  const req = event.request;
  const cache = await caches.open(CACHE_NAMES.pages);
  try {
    const fresh = await fetch(req);
    cache.put(req, fresh.clone());
    return fresh;
  } catch (err) {
    const cached = await cache.match(req);
    if (cached) return cached;
    // SPA fallback
    return caches.match("/index.html");
  }
}

async function staleWhileRevalidate(event) {
  const req = event.request;
  const cache = await caches.open(CACHE_NAMES.assets);
  const cached = await cache.match(req);
  const fetchPromise = fetch(req)
    .then((res) => {
      cache.put(req, res.clone());
      return res;
    })
    .catch(() => cached);
  return cached || fetchPromise;
}

async function cacheFirst(event, { cacheName, maxEntries } = { cacheName: CACHE_NAMES.images, maxEntries: 60 }) {
  const req = event.request;
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  if (cached) return cached;
  try {
    const res = await fetch(req, { mode: "no-cors" });
    cache.put(req, res.clone());
    // best-effort trim
    trimCache(cacheName, maxEntries).catch(() => {});
    return res;
  } catch (e) {
    return cached;
  }
}

// Install event
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    (async () => {
      const pages = await caches.open(CACHE_NAMES.pages);
      const assets = await caches.open(CACHE_NAMES.assets);
      try {
        await pages.addAll(["/", "/index.html"]);
        await assets.addAll(CORE_ASSETS);
      } catch (e) {
        // ignore precache failures, proceed
      }
    })()
  );
});

// Fetch event
self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  const sameOrigin = url.origin === self.location.origin;
  const destination = request.destination;

  if (request.mode === "navigate" || destination === "document") {
    event.respondWith(networkFirst(event));
    return;
  }

  if (destination === "script" || destination === "style") {
    event.respondWith(staleWhileRevalidate(event));
    return;
  }

  if (destination === "image") {
    event.respondWith(cacheFirst(event, { cacheName: CACHE_NAMES.images, maxEntries: 80 }));
    return;
  }

  // For other same-origin GET requests, try cache, then network
  if (sameOrigin) {
    event.respondWith(
      caches.match(request).then((cached) => cached || fetch(request))
    );
  }
});

// Activate event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const expected = new Set(Object.values(CACHE_NAMES));
      const keys = await caches.keys();
      await Promise.all(
        keys.map((key) => {
          if (!expected.has(key) && key.startsWith("sixywin-")) {
            return caches.delete(key);
          }
        })
      );
      await self.clients.claim();
    })()
  );
});

// Support manual skip waiting from client
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
