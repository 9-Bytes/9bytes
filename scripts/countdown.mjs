class Countdown {
	constructor() {
		this.$el = document.querySelector(".countdown");
		this.countdown_interval = null;
		this.total_seconds = 0;
	}

	init() {
		this.$ = {
			days: this.$el.querySelectorAll(".bloc-time.days .figure"),
			hours: this.$el.querySelectorAll(".bloc-time.hours .figure"),
			minutes: this.$el.querySelectorAll(".bloc-time.min .figure"),
			seconds: this.$el.querySelectorAll(".bloc-time.sec .figure"),
		};

		const now = new Date();
		const until = new Date("2023-07-31T00:00:00");
		const difference = until - now; // Difference in milliseconds

		this.values = {
			days: Math.floor(difference / (1000 * 60 * 60 * 24)),
			hours: Math.floor(
				(difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
			),
			minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
			seconds: Math.floor((difference % (1000 * 60)) / 1000),
		};

		this.total_seconds =
			this.values.days * 24 * 60 * 60 +
			this.values.hours * 60 * 60 +
			this.values.minutes * 60 +
			this.values.seconds;
		this.count();
	}

	count() {
		const updateDOMValues = () => {
			this.checkHour(this.values.days, this.$.days[0], this.$.days[1]);
			this.checkHour(this.values.hours, this.$.hours[0], this.$.hours[1]);
			this.checkHour(this.values.minutes, this.$.minutes[0], this.$.minutes[1]);
			this.checkHour(this.values.seconds, this.$.seconds[0], this.$.seconds[1]);
		};

		this.countdown_interval = setInterval(() => {
			if (this.total_seconds > 0) {
				--this.values.seconds;

				if (this.values.minutes >= 0 && this.values.seconds < 0) {
					this.values.seconds = 59;
					--this.values.minutes;
				}

				if (this.values.hours >= 0 && this.values.minutes < 0) {
					this.values.minutes = 59;
					--this.values.hours;
				}

				updateDOMValues();
				--this.total_seconds;
			} else {
				clearInterval(this.countdown_interval);
			}
		}, 1000);
	}

	animateFigure(el, value) {
		const top = el.querySelector(".top");
		const bottom = el.querySelector(".bottom");
		const backTop = el.querySelector(".top-back");
		const backBottom = el.querySelector(".bottom-back");

		backTop.querySelector("span").textContent = value;
		backBottom.querySelector("span").textContent = value;

		top.style.transform = `perspective(200px) rotateX(-180deg)`;
		top.style.transition = "transform 0.8s";
		backTop.style.transform = `perspective(200px) rotateX(0deg)`;
		backTop.style.transition = "transform 0.8s";

		setTimeout(() => {
			top.textContent = value;
			bottom.textContent = value;
			top.style.transform = `perspective(200px) rotateX(0deg)`;
			top.style.transition = "";
			backTop.style.transform = `perspective(200px) rotateX(180deg)`;
			backTop.style.transition = "";
		}, 800);
	}

	checkHour(value, el_1, el_2) {
		const val_1 = value.toString().charAt(0);
		const val_2 = value.toString().charAt(1);
		const fig_1_value = el_1.querySelector(".top").textContent;
		const fig_2_value = el_2.querySelector(".top").textContent;

		if (value >= 10) {
			if (fig_1_value !== val_1) this.animateFigure(el_1, val_1);
			if (fig_2_value !== val_2) this.animateFigure(el_2, val_2);
		} else {
			if (fig_1_value !== "0") this.animateFigure(el_1, 0);
			if (fig_2_value !== val_1) this.animateFigure(el_2, val_1);
		}
	}
}

const countdown = new Countdown();
countdown.init();
