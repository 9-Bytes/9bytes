import consentForm from "./consentForm.mjs";
import { addConsentListeners, checkConsent, getCookie } from "./functions.mjs";
import { ACCEPTED, CONSENT, MARKETING, TRACKING } from "./variables.mjs";

const consentLink = document.querySelector('a[href="#consent-select"]');

consentLink?.addEventListener("click", () => {
	const consent = getCookie(CONSENT);

	if (consent?.includes(ACCEPTED)) {
		if (consent.includes(MARKETING)) {
			document.querySelector('input[value="MARKETING"]').checked = true;
		}

		if (consent.includes(TRACKING)) {
			document.querySelector('input[value="TRACKING"]').checked = true;
		}
	}
});

addConsentListeners();
checkConsent();
