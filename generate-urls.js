const path = require('path');
const fs = require('fs');

function generateListOfURLs(dir, baseurl) {
	let urls = [];
	try {
		const files = fs.readdirSync(dir);

		files.forEach((file) => {
			const absolutePath = path.join(dir, file);
			if (fs.statSync(absolutePath).isDirectory()) {
				urls = [
					...urls,
					...generateListOfURLs(absolutePath, baseurl + file + '/'),
				];
			} else if (file === 'index.html') {
				urls.push(baseurl);
			}
		});
	} catch (error) {
		console.error(`Error reading directory ${dir}:`, error);
	}

	return urls;
}

const listOfURLs = generateListOfURLs('_site', '/');
console.log('URLs to be cached:', listOfURLs.join(', '));

const serviceWorkerContent = `
import {
	offlineFallback,
	pageCache,
	staticResourceCache,
	imageCache,
} from 'workbox-recipes';

import { enable } from 'workbox-navigation-preload';
enable();

pageCache({
	networkTimoutSeconds: 2,
	warmCache: [${listOfURLs.map((url) => `'${url}'`).join(', ')}],
});

staticResourceCache({
	warmCache: self.__WB_MANIFEST,
});

imageCache({
	maxEntries: 100,
	maxAgeSeconds: 60 * 60 * 24 * 90,
	warmCache: ['./images/logo-192px.png', './images/logo-512px.png'],
});

offlineFallback({
	pageFallback: '/offline/fallback.html',
	imageFallback: '/offline/fallback.svg',
});
`;

fs.writeFileSync('src/assets/js/service-worker.js', serviceWorkerContent);
