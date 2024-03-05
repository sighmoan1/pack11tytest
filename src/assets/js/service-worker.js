
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
	warmCache: ['/', '/documentation/', '/offline/', '/emergencies','/images/', '/lifecycle', '/_headers', '/acronyms/index.html', '/assets/yt-lite/lite-yt-embed.css', '/assets/yt-lite/lite-yt-embed.js', '/bundle/E5duHn8xl9.css', '/bundle/LYwoaOjAWz.js', '/bundle/NfTCyKwx5R.js', '/bundle/i62IKo387H.css', '/calmer/index.html', '/difficult-situations/index.html', '/documentation/assets/index.html', '/documentation/collections/index.html', '/documentation/configuration/index.html', '/documentation/content/index.html', '/documentation/development/index.html', '/documentation/filters/index.html', '/documentation/index.html', '/documentation/installation/index.html', '/documentation/layout/index.html', '/documentation/navigation/index.html', '/documentation/old_readme/index.html', '/documentation/pwa/index.html', '/documentation/responsive-images/index.html', '/documentation/videos/index.html', '/emergencies/anti-human-trafficking/index.html', '/emergencies/briefing/index.html', '/emergencies/command-and-control-structure/index.html', '/emergencies/cost-recovery/index.html', '/emergencies/critical-incident/index.html', '/emergencies/debriefing/index.html', '/emergencies/donations/index.html', '/emergencies/glossary-and-acronyms/index.html', '/emergencies/index.html', '/emergencies/major-incident-planning/index.html', '/emergencies/managing-an-incident/index.html', '/emergencies/notification-procedure/index.html', '/emergencies/record-management/index.html', '/emergencies/resourcing-an-incident/index.html', '/engaging-and-building-rapport/index.html', '/favicon.ico', '/help-for-you-after-a-response/index.html', '/images/call-out-1.png', '/images/call-out-2.png', '/images/call-out-3.png', '/images/call-out-4.png', '/images/call-out-5.png', '/images/external-link-blue.svg', '/images/external-link-white.svg', '/images/flag.png', '/images/heart.png', '/images/logo-192px.png', '/images/logo-512px.png', '/images/tabard-1.png', '/images/tabard-2.png', '/images/what-next.png', '/index.html', '/lifecycle/1-rota-and-contact-details/index.html', '/lifecycle/2-your-shift-and-responding/index.html', '/lifecycle/3-pre-departure-checks/index.html', '/lifecycle/4-arriving-at-the-incident/index.html', '/lifecycle/5-during-the-incident/index.html', '/lifecycle/6-leaving-and-post-call-out/index.html', '/lifecycle/index.html', '/manifest.webmanifest', '/needs-assessment/index.html', '/offline/fallback.html', '/offline/fallback.svg', '/offline/index.html', '/robots.txt', '/safeguarding/index.html', '/service-worker.js', '/the-emergency-response-role/index.html', '/training/index.html', '/useful-tools/index.html', '/what-next plan/index.html', '/working with partners/index.html'],
});

// Serve static assets from immediately from cache, and update (aka "Stale While Revalidate")
staticResourceCache({
	warmCache: self.__WB_MANIFEST,
});

// Cache a maximum of 100 images, for 90 days each at most
imageCache({
	maxEntries: 100,
	maxAgeSeconds: 60 * 60 * 24 * 90,
	warmCache: ['/images/call-out-1.png', '/images/call-out-2.png', '/images/call-out-3.png', '/images/call-out-4.png', '/images/call-out-5.png', '/images/external-link-blue.svg', '/images/external-link-white.svg', '/images/flag.png', '/images/heart.png', '/images/logo-192px.png', '/images/logo-512px.png', '/images/tabard-1.png', '/images/tabard-2.png', '/images/what-next.png'],
});

// Provide offline fallbacks for HTML and images
offlineFallback({
	pageFallback: '/offline/fallback.html',
	imageFallback: '/offline/fallback.svg',
});
