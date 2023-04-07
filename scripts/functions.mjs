export function removeTrackingScripts() {
	document
		.querySelectorAll('script[src*="googletagmanager.com/gtm.js"]')
		?.forEach(script => script.remove());
	document
		.querySelectorAll('iframe[src*="googletagmanager.com/ns.html"]')
		?.forEach(frame => frame.remove());
}
