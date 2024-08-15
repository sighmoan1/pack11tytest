import Toastify from 'toastify-js';

let isOffline = false;
const bodyElement = document.querySelector('body');

function updateConnectivityStatus() {
	let notificationToShow = false;
	let notificationClass = '';
	let notificationText = '';
	let notificationDuration = 3000;
	let notificationDestination = false;

	if (typeof navigator.onLine !== 'undefined') {
		if (!navigator.onLine) {
			bodyElement.classList.add('offline');

			if ('serviceWorker' in navigator) {
				notificationClass = 'warning';
				notificationText =
					'It looks like <strong>the connection is lost</strong>.<br />Continue reading this page, or look at <a href="/offline/">other contents you can read while offline</a>.';
				notificationDestination = '/offline/';
				notificationDuration = 10000;
			} else {
				notificationClass = 'error';
				notificationText =
					'It looks like <strong>the connection is lost</strong>.<br />Continue reading this page, until the connection is back.';
			}
			isOffline = true;
		} else {
			if (isOffline) {
				isOffline = false;
				bodyElement.classList.remove('offline');
			}
		}
	}
}

function checkConnectivity() {
	window.addEventListener('online', updateConnectivityStatus);
	window.addEventListener('offline', updateConnectivityStatus);
	updateConnectivityStatus();
}

window.addEventListener('load', checkConnectivity);
