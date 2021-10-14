const cacheName = 'ezn-scoreboard-v01';
const offlineList = [
  '/',
  '/index.htm',
  '/dsashboard.htm',
  '/src/master.css',
  '/src/sevenSegment.css',
  '/src/dashboard.js',
  '/src/ezn.svg',
  '/src/octocat.svg',
  '/src/icons/icon192.png',
  '/src/icons/icon512.png',
  '/src/fonts/seven_segment-webfont.woff',
  '/src/fonts/seven_segment-webfont.woff',
  '/src/fonts/lato.css',
  '/src/fonts/lato_latin.woff2',
  '/src/fonts/lato_latin_ext.woff2',
  '/src/fonts/material_icons.css',
  '/src/fonts/material_icons.woff2', 
  '/src/tailwind.css',
  '/src/vue.js',
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(cacheName).then(cache => {
      cache.addAll(offlineList)
    })
  )
})