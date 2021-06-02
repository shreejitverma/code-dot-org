const cacheName = 'code-pwa-v1';
const cachedHTML = [
  '/s/express-2020',
  '/s/express-2020/lessons/2/levels/2'
];
const cachedCSS = [
  '/assets/css/code-studio.css',
  '/assets/application.css',
  '/shared/css/hamburger.css',
  '/assets/css/scripts.css',
  '/assets/css/maze.css',
  '/assets/css/common.css',
  '/assets/css/levels.css',
  '/blockly/video-js/video-js.css',

];

const cachedJS = [
  '/assets/js/code-studio.js',
  '/assets/js/essential.js',
  '/assets/js/vendors.js',
  '/assets/application.js',
  '/assets/js/en_us/common_locale.js',
  '/assets/js/code-studio-common.js',
  '/assets/js/scripts/show.js',
  '/assets/js/webpack-runtime.js',
  '/assets/js/maze.js',
  '/assets/js/en_us/maze_locale.js',
  '/assets/js/blockly.js',
  '/assets/js/common.js',
  '/assets/js/en_us/blockly_locale.js',
  '/assets/js/levels/show.js',
  '/assets/js/layouts/_small_footer.js',
  '/assets/js/levels/_teacher_panel.js',

];

const cachedImages = [
  '/assets/logo.svg',
  '/c/video_thumbnails/C2_maze_intro.jpg'
];

const cachedFonts = [
  '/assets/fontawesome-webfont.woff2'
];

const cachedOther = [
  '/manifest.webmanifest'
];

self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    await cache.addAll(cachedHTML.concat(cachedJS, cachedCSS, cachedFonts, cachedImages, cachedOther));
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


