const path = require('path');
const fs = require('fs');

function generateListOfURLs(dir, baseurl) {
  let urls = [];
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const absolutePath = path.join(dir, file);
    if (fs.statSync(absolutePath).isDirectory()) {
      urls = [...urls, ...generateListOfURLs(absolutePath, baseurl + file + '/')];
    } else if (file === 'index.html') {
      urls.push(baseurl);
    }
  });

  return urls;
}

const listOfURLs = generateListOfURLs('_site', '/');
// Use 'listOfURLs' in your service worker 'warmCache' option

const serviceWorkerContent = `
import {
	offlineFallback,
	pageCache,
	staticResourceCache,
	imageCache,
} from 'workbox-recipes';

// Enable navigation preload
import { enable } from 'workbox-navigation-preload';
enable();

// Serve pages as network first, with 2 seconds timeout and cache fallback
pageCache({
	networkTimoutSeconds: 2,
	warmCache: ['/', '/documentation/', '/offline/', '/emergencies','/images/', '/lifecycle', ${listOfURLs.map(url => `'${url}'`).join(', ')}],
});

// Serve static assets from immediately from cache, and update (aka "Stale While Revalidate")
staticResourceCache({
	warmCache: self.__WB_MANIFEST,
});

// Cache a maximum of 100 images, for 90 days each at most
imageCache({
	maxEntries: 100,
	maxAgeSeconds: 60 * 60 * 24 * 90,
	warmCache: ['./images/logo-192px.png', './images/logo-512px.png'],
});

// Provide offline fallbacks for HTML and images
offlineFallback({
	pageFallback: '/offline/fallback.html',
	imageFallback: '/offline/fallback.svg',
});
`;

fs.writeFileSync('src/assets/js/service-worker.js', serviceWorkerContent);
