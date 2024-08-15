
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
	warmCache: ['/at-your-home-base-preparing-to-deploy/', '/before-your-shift-starts/', '/en-route-to-an-incident-and-arriving/', '/identifying-peoples-needs-at-an-incident/', '/incident-report-form/', '/', '/leaving-an-incident-and-post-deployment/', '/providing-assistance-at-an-incident/', '/starting-your-deployment/'],
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
