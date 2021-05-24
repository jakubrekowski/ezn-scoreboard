const cacheName = 'ezn-scoreboard-v01';
const offlineList = [
  '/',
  '/index.htm',
  '/dsashboard.htm',
  '/src/master.css',
  '/src/sevenSegment.css',
  '/src/connect.js',
  '/src/dashboard.js',
  '/src/icons/icon192.png',
  '/src/icons/icon512.png',
  '/src/fonts/seven_segment-webfont.woff',
  '/src/fonts/seven_segment-webfont.woff',
  'https://fonts.googleapis.com/css2?family=Lato&display=swap',
  'https://fonts.googleapis.com/css2?family=Material+Icons',
  'https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css',
  'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.js',
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(cacheName).then(cache => {
      cache.addAll(offlineList)
    })
  )
})