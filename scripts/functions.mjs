import {
	ACCEPTED,
	CONSENT,
	DECLINED,
	MARKETING,
	TRACKING,
} from "./variables.mjs";

export function addTrackingScripts() {
	// Add script in head
	const headScript = document.createElement("script");
	const inlineScript = `
      (function (w, d, s, l, i) {
          w[l] = w[l] || [];
          w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
          var f = d.getElementsByTagName(s)[0],
              j = d.createElement(s),
              dl = l != "dataLayer" ? "&l=" + l : "";
          j.async = true;
          j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
          f.parentNode.insertBefore(j, f);
      })(window, document, "script", "dataLayer", "GTM-K628SXN");
  `;
	headScript.innerHTML = inlineScript;
	document.head.appendChild(headScript);

	// Add noscript with iframe in body
	const noscriptElement = document.createElement("noscript");
	const iframe = document.createElement("iframe");
	iframe.src = "https://www.googletagmanager.com/ns.html?id=GTM-K628SXN";
	iframe.height = "0";
	iframe.width = "0";
	iframe.style.display = "none";
	iframe.style.visibility = "hidden";
	noscriptElement.appendChild(iframe);
	document.body.appendChild(noscriptElement);
}

export async function checkConsent() {
	const consent = await localStorage.getItem(CONSENT);
	if (!consent) return (window.location.href = "#consent");

	if (
		consent.includes(ACCEPTED) &&
		consent.includes(MARKETING) &&
		consent.includes(TRACKING)
	) {
		addTrackingScripts();
	}
}

export function addConsentListeners() {
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
					addTrackingScripts();
					break;

				case "decline-consent":
					await localStorage.setItem(CONSENT, `${DECLINED}:${new Date()}`);
					window.location.href = "#";
					break;

				case "select-consent":
					window.location.href = "#consent-select";
			}
		});
	});
}
