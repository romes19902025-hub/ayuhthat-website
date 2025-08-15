/*
  Simple service worker for offline caching.  
  This script caches core assets during installation and serves them from cache
  when offline. In a production system, consider using Workbox for more
  advanced strategies.
*/

const CACHE_NAME = 'ayuhthat-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/manifest.json',
  '/images/hero.jpg',
  '/images/logo.png',
  '/images/product-jbco-single.jpg',
  '/images/product-coldpressed.jpg',
  '/images/product-organic.jpg',
  '/icons/icon-512.png'
  ,'/inventory.json'
  ,'/inventory.js'
];

// Install event: cache defined assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event: respond with cached assets or fetch from network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});