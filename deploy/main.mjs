const currentYear = new Date().getFullYear();
document.getElementById("current-year").textContent = currentYear;

const form = document.getElementById("cta");
const emailInput = document.querySelector('input[name="honeypot"]');

form.addEventListener("submit", event => {
	if (emailInput.value) {
		event.preventDefault(); // Stop form submission
		window.location.href = "#";
	}
});
