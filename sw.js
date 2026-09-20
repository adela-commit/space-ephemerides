/* Service worker : permet l'utilisation hors connexion et les mises à jour.
   Pour publier une nouvelle version de l'application (index.html modifié), changez VERSION ci-dessous :
   les appareils connectés proposent alors « Recharger ». Modifier seulement content.json ne l'exige pas. */
const VERSION = '2026-09-19.7';
const CACHE = 'ciel-zodiacal-' + VERSION;
const SHELL = [
  'index.html', 'content.json', 'manifest.webmanifest',
  'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(SHELL.map(u => new Request(u, { cache: 'reload' }))))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k.startsWith('ciel-zodiacal-') && k !== CACHE).map(k => caches.delete(k))
    ))
  );
});

self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

function fetchWithTimeout(request, ms) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  return fetch(new Request(request, { cache: 'no-cache' }), { signal: ctrl.signal }).finally(() => clearTimeout(timer));
}

/* Réseau d'abord (contenu à jour), cache en secours (hors connexion ou réseau lent) */
async function networkFirst(request, key, markCached) {
  const cache = await caches.open(CACHE);
  try {
    const response = await fetchWithTimeout(request, 4000);
    if (response && response.ok) {
      /* content.json : un fichier invalide est refusé (erreur), ce qui renvoie la dernière bonne version enregistrée */
      if (markCached) await response.clone().json();
      await cache.put(key, response.clone());
    }
    return response;
  } catch (err) {
    const hit = await cache.match(key, { ignoreSearch: true });
    if (!hit) return new Response('Hors connexion', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    if (!markCached) return hit;
    const headers = new Headers(hit.headers);
    headers.set('X-Served-From', 'cache');
    return new Response(hit.body, { status: hit.status, statusText: hit.statusText, headers });
  }
}

/* Cache d'abord pour les fichiers qui ne changent pas (icônes, manifeste) */
async function cacheFirst(request) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(request, { ignoreSearch: true });
  if (hit) return hit;
  const response = await fetch(request);
  if (response && response.ok) cache.put(request, response.clone());
  return response;
}

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request, 'index.html', false));
  } else if (url.pathname.endsWith('/content.json')) {
    event.respondWith(networkFirst(request, 'content.json', true));
  } else {
    event.respondWith(cacheFirst(request));
  }
});
