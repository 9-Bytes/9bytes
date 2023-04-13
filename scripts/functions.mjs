import {
	ACCEPTED,
	CONSENT,
	DECLINED,
	MARKETING,
	TRACKING,
} from "./variables.mjs";

export async function checkConsent() {
	const consent = getCookie(CONSENT);

	if (!consent) window.location.href = "#consent";
}

export function addConsentListeners() {
	const consentButtons = document.querySelectorAll("#consent button");

	consentButtons.forEach(button => {
		button.addEventListener("click", async event => {
			window.dataLayer = window.dataLayer || [];
			let href = "#";

			switch (event.target.name) {
				case "accept-consent":
					setCookie(CONSENT, `${ACCEPTED}:${MARKETING}:${TRACKING}`);
					window.dataLayer.push({
						event: "user_consent_preferences",
						analytics_storage: "granted",
						ad_storage: "granted",
					});
					break;

				case "decline-consent":
					setCookie(CONSENT, DECLINED);
					window.dataLayer.push({
						event: "user_consent_preferences",
						analytics_storage: "denied",
						ad_storage: "denied",
					});
					break;

				case "select-consent":
					href = "#consent-select";
			}

			window.location.href = href;
		});
	});
}

export function setCookie(name, value) {
	const expires = new Date(
		Date.now() + 720 * 24 * 60 * 60 * 1000
	).toUTCString();
	document.cookie = `${name}=${value}; expires=${expires}; path=/;SameSite=None;Secure`;
}

export function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);

	if (parts.length === 2) return parts.pop().split(";").shift();
}
