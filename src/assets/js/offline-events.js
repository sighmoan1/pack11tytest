import Toastify from 'toastify-js';

let isOffline = false;
const bodyElement = document.querySelector('body');

function updateConnectivityStatus() {
	let notificationToShow = false;
	let notificationClass = '';
	let notificationText = '';
	let notificationDuration = 3000;
	let notificationDestination = false;
}

function checkConnectivity() {
	window.addEventListener('online', updateConnectivityStatus);
	window.addEventListener('offline', updateConnectivityStatus);
	updateConnectivityStatus();
}

window.addEventListener('load', checkConnectivity);
