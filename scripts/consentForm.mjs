import { addTrackingScripts } from "./functions.mjs";
import { ACCEPTED, CONSENT, MARKETING, TRACKING } from "./variables.mjs";

const cookieSelectButtons = document.querySelectorAll("#consent-select button");

export default cookieSelectButtons.forEach(button => {
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

				let consentString = `${ACCEPTED}:${new Date()}`;

				if (trackingCheckbox.checked) {
					consentString += `:${trackingCheckbox.value}`;
				}

				if (marketingCheckbox.checked) {
					consentString += `:${marketingCheckbox.value}`;
				}

				await localStorage.setItem(CONSENT, consentString);

				window.location.href = "#";

				if (trackingCheckbox.checked && marketingCheckbox.checked) {
					addTrackingScripts();
				}
				break;

			case "accept-consent":
				document.querySelector('input[value="TRACKING"]').checked = true;
				document.querySelector('input[value="MARKETING"]').checked = true;

				await localStorage.setItem(
					CONSENT,
					`${ACCEPTED}:${new Date()}:${MARKETING}:${TRACKING}`
				);
				window.location.href = "#";
				addTrackingScripts();
		}
	});
});
