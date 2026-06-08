const CACHE_NAME = 'wws-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/login.html',
  '/register.html',
  '/feed.html',
  '/profile.html',
  '/ranking.html',
  '/challenges.html',
  '/friends.html',
  '/messages.html',
  '/css/style.css',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});
