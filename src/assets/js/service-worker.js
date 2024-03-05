
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
	warmCache: ['/', '/documentation/', '/offline/', '/emergencies','/images/', '/lifecycle', '/acronyms/', '/calmer/', '/difficult-situations/', '/documentation/assets/', '/documentation/collections/', '/documentation/configuration/', '/documentation/content/', '/documentation/development/', '/documentation/filters/', '/documentation/', '/documentation/installation/', '/documentation/layout/', '/documentation/navigation/', '/documentation/old_readme/', '/documentation/pwa/', '/documentation/responsive-images/', '/documentation/videos/', '/emergencies/anti-human-trafficking/', '/emergencies/briefing/', '/emergencies/command-and-control-structure/', '/emergencies/cost-recovery/', '/emergencies/critical-incident/', '/emergencies/debriefing/', '/emergencies/donations/', '/emergencies/glossary-and-acronyms/', '/emergencies/', '/emergencies/major-incident-planning/', '/emergencies/managing-an-incident/', '/emergencies/notification-procedure/', '/emergencies/record-management/', '/emergencies/resourcing-an-incident/', '/engaging-and-building-rapport/', '/help-for-you-after-a-response/', '/', '/lifecycle/1-rota-and-contact-details/', '/lifecycle/2-your-shift-and-responding/', '/lifecycle/3-pre-departure-checks/', '/lifecycle/4-arriving-at-the-incident/', '/lifecycle/5-during-the-incident/', '/lifecycle/6-leaving-and-post-call-out/', '/lifecycle/', '/needs-assessment/', '/offline/', '/safeguarding/', '/the-emergency-response-role/', '/training/', '/useful-tools/', '/what-next plan/', '/working with partners/'],
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
