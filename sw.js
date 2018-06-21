var CACHE_NAME = 'pdf-reader-v2';
var urlsToCache = [
    '/pdf-reader/web/viewer.html',
    '/pdf-reader/web/viewer.js',
    '/pdf-reader/web/viewer.css',
    '/pdf-reader/public/img/favicon.ico',
    '/pdf-reader/public/manifest.json',
    '/pdf-reader/build/pdf.js',
    '/pdf-reader/build/pdf.worker.js'
];

// Install handler
self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch handler
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (resp) {
            return resp || fetch(event.request).then(function (response) {
                let responseClone = response.clone();
                caches.open(CACHE_NAME).then(function (cache) {
                    cache.put(event.request, responseClone);
                });
                return response;
            });
        })
    );
});