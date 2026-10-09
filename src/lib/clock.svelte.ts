import { atMinuteOfDay, minutesIntoDay } from './time';

/** How long the sky takes to cover most of the way to a new time. */
const GLIDE_MS = 90;

/**
 * The time the page is lit for. By default it is the real time in Kathmandu;
 * a visitor can scrub to another minute of the day. The sky eases towards the
 * chosen time instead of jumping, so dragging and "back to live" feel smooth.
 */
export class SkyClock {
	#now = $state(new Date());
	#scrubbedMinute = $state<number | null>(null);
	#skyMinute = $state(minutesIntoDay(new Date()));
	#frame = 0;

	get isLive() {
		return this.#scrubbedMinute === null;
	}

	/** The time shown on the readout: the real time or the scrubbed one. */
	get date() {
		return this.#scrubbedMinute === null
			? this.#now
			: atMinuteOfDay(this.#now, this.#scrubbedMinute);
	}

	get minute() {
		return this.#scrubbedMinute ?? minutesIntoDay(this.#now);
	}

	/** The minute the sky is lit for. Trails `minute` while it glides. */
	get skyMinute() {
		return this.#skyMinute;
	}

	/** The time the sky is lit for. Trails `date` while it glides. */
	get skyDate() {
		return atMinuteOfDay(this.#now, this.#skyMinute);
	}

	scrubTo(minute: number) {
		this.#scrubbedMinute = minute;
		this.#glide();
	}

	goLive() {
		this.#scrubbedMinute = null;
		this.#glide();
	}

	/** Starts ticking; returns a function that stops it. */
	start() {
		const id = setInterval(() => {
			this.#now = new Date();
			// While a glide is running it follows the real time itself.
			if (this.isLive && this.#frame === 0) this.#skyMinute = this.minute;
		}, 1000);

		return () => {
			clearInterval(id);
			cancelAnimationFrame(this.#frame);
			this.#frame = 0;
		};
	}

	#glide() {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
			this.#skyMinute = this.minute;
			return;
		}
		if (this.#frame !== 0) return;

		let previous = performance.now();
		const step = (time: number) => {
			const goal = this.minute;
			const distance = goal - this.#skyMinute;

			if (Math.abs(distance) < 0.01) {
				this.#skyMinute = goal;
				this.#frame = 0;
				return;
			}

			this.#skyMinute += distance * (1 - Math.exp(-(time - previous) / GLIDE_MS));
			previous = time;
			this.#frame = requestAnimationFrame(step);
		};
		this.#frame = requestAnimationFrame(step);
	}
}
