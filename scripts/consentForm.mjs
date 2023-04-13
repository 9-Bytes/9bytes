import { setCookie } from "./functions.mjs";
import { ACCEPTED, CONSENT, MARKETING, TRACKING } from "./variables.mjs";

const cookieSelectButtons = document.querySelectorAll("#consent-select button");

export default cookieSelectButtons.forEach(button => {
	window.dataLayer = window.dataLayer || [];

	button.addEventListener("click", async event => {
		switch (event.target.name) {
			case "select-consent":
				window.location.href = "#consent";
				break;

			case "accept-selection":
				const trackingCheckbox = document.querySelector(
					'input[value="TRACKING"]'
				);

				const marketingCheckbox = document.querySelector(
					'input[value="MARKETING"]'
				);

				let consentString = ACCEPTED;

				if (trackingCheckbox.checked) {
					consentString += `:${trackingCheckbox.value}`;
				}

				if (marketingCheckbox.checked) {
					consentString += `:${marketingCheckbox.value}`;
				}

				setCookie(CONSENT, consentString);
				window.dataLayer.push({
					event: "user_consent_preferences",
					analytics_storage: trackingCheckbox.checked ? "granted" : "denied",
					ad_storage: marketingCheckbox.checked ? "granted" : "denied",
				});

				window.location.href = "#";

				break;

			case "accept-consent":
				document.querySelector('input[value="TRACKING"]').checked = true;
				document.querySelector('input[value="MARKETING"]').checked = true;

				setCookie(CONSENT, `${ACCEPTED}:${MARKETING}:${TRACKING}`);
				window.dataLayer.push({
					event: "user_consent_preferences",
					analytics_storage: "granted",
					ad_storage: "granted",
				});
				window.location.href = "#";
		}
	});
});
