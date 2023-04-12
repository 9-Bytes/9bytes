import consentForm from "./consentForm.mjs";
import { addConsentListeners, checkConsent } from "./functions.mjs";

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

addConsentListeners();
checkConsent();
