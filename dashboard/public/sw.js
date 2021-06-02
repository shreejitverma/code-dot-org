const cacheName = 'code-pwa-v1';
const cachedFiles = [
  '/s/express-2020',
  '/assets/css/code-studio.css',
  '/assets/application.css',
  '/shared/css/hamburger.css',
  '/assets/css/scripts.css',
  '/assets/js/code-studio.js',
  '/assets/js/essential.js',
  '/assets/js/vendors.js',
  '/assets/application.js',
  '/assets/js/en_us/common_locale.js',
  '/assets/js/code-studio-common.js',
  '/assets/js/scripts/show.js',
  '/assets/js/webpack-runtime.js',
  '/assets/fontawesome-webfont.woff2',
  '/assets/logo.svg'
];

self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    console.log('[Service Worker] Caching:', cachedFiles);
    await cache.addAll(cachedFiles);
  })());
});

self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    const r = await caches.match(e.request);
    console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
    // If found in the cache, return it.
    if (r) {
      console.log(`[Service Worker] ${e.request.url} is cached`)
      return r;
    }
    console.log(`[Service Worker] ${e.request.url} is not cached`)
    // If misssing from cache, make a network request.
    const response = await fetch(e.request);
    // const cache = await caches.open(cacheName);
    // console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
    // cache.put(e.request, response.clone());
    return response;
  })());
});


