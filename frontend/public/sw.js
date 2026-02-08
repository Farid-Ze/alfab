// Empty service worker to prevent 404 errors
// This is a placeholder until PWA features are implemented

self.addEventListener('install', () => {
    // Skip waiting
    self.skipWaiting();
});

self.addEventListener('activate', () => {
    // Claim clients
    self.clients.claim();
});
