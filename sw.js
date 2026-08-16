const CACHE = 'masrofaty-v1';
self.addEventListener('install', e => { 
  self.skipWaiting(); 
});
self.addEventListener('activate', e => { 
  self.clients.claim(); 
});
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(async cache => {
      try {
        const res = await fetch(e.request);
        if (e.request.method === 'GET') cache.put(e.request, res.clone());
        return res;
      } catch (err) {
        const cached = await cache.match(e.request);
        return cached || Response.error();
      }
    })
  );
});
