import consentForm from "./consentForm.mjs";
import { ACCEPTED, CONSENT, MARKETING, TRACKING } from "./variables.mjs";

(async function init() {
	const consent = await localStorage.getItem(CONSENT);
	if (consent) {
		const [, date] = consent.split(":");
		const options = { year: "numeric", month: "long", day: "numeric" };
		const germanDate = date.toLocaleDateString("de-DE", options);
		document.getElementById("consent-timestamp").innerText = germanDate;

		if (consent.includes(ACCEPTED)) {
			if (consent.includes(MARKETING)) {
				document.querySelector('input[value="MARKETING"]').checked = true;
			}

			if (consent.includes(TRACKING)) {
				document.querySelector('input[value="TRACKING"]').checked = true;
			}
		}
	}
})();
