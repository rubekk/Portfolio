import { atMinuteOfDay, minutesIntoDay } from './time';

/**
 * The time the page is lit for: the real time in Kathmandu, or a minute of
 * today's date that the visitor has scrubbed to.
 */
export class SkyClock {
	#now = $state(new Date());
	#scrubbedMinute = $state<number | null>(null);

	get isLive() {
		return this.#scrubbedMinute === null;
	}

	get date() {
		return this.#scrubbedMinute === null
			? this.#now
			: atMinuteOfDay(this.#now, this.#scrubbedMinute);
	}

	get minute() {
		return this.#scrubbedMinute ?? minutesIntoDay(this.#now);
	}

	scrubTo(minute: number) {
		this.#scrubbedMinute = minute;
	}

	goLive() {
		this.#scrubbedMinute = null;
	}

	/** Starts ticking; returns a function that stops it. */
	start() {
		const id = setInterval(() => (this.#now = new Date()), 1000);
		return () => clearInterval(id);
	}
}
