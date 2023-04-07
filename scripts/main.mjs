import consentForm from "./consentForm.mjs";
import { removeTrackingScripts } from "./functions.mjs";
import {
	ACCEPTED,
	CONSENT,
	DECLINED,
	MARKETING,
	TRACKING,
} from "./variables.mjs";

const currentYear = new Date().getFullYear();
document.getElementById("current-year").textContent = currentYear;

const ctaForm = document.getElementById("cta");
const emailInput = document.querySelector('input[name="honeypot"]');

ctaForm.addEventListener("submit", event => {
	if (emailInput.value) {
		event.preventDefault(); // Stop form submission
		window.location.href = "#";
	}
});

const consentButtons = document.querySelectorAll("#consent button");

consentButtons.forEach(button => {
	button.addEventListener("click", async event => {
		switch (event.target.name) {
			case "accept-consent":
				await localStorage.setItem(
					CONSENT,
					`${ACCEPTED}:${new Date()}:${MARKETING}:${TRACKING}`
				);
				window.location.href = "#";
				break;

			case "decline-consent":
				await localStorage.setItem(CONSENT, `${DECLINED}:${new Date()}`);
				removeTrackingScripts();
				window.location.href = "#";
				break;

			case "select-consent":
				window.location.href = "#consent-select";
		}
	});
});

(async function checkConsent() {
	const consent = await localStorage.getItem(CONSENT);
	if (!consent) return (window.location.href = "#consent");

	if (
		consent.includes(DECLINED) ||
		!consent.includes(MARKETING) ||
		!consent.includes(TRACKING)
	) {
		removeTrackingScripts();
	}
})();
