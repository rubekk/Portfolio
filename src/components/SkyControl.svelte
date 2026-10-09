<script lang="ts">
	import type { SkyClock } from '../lib/clock.svelte';
	import type { DaylightHours } from '../lib/daylight';
	import { atMinuteOfDay, formatClock, MINUTES_IN_DAY } from '../lib/time';

	interface Props {
		clock: SkyClock;
		place: string;
		hours: DaylightHours | null;
		/** Degrees above the horizon, used for the plain-language caption. */
		elevation: number;
	}

	let { clock, place, hours, elevation }: Props = $props();

	const sunIsUp = $derived(elevation > 0);
	const caption = $derived(
		sunIsUp ? `Sun ${Math.round(elevation)}° above the horizon` : 'Sun below the horizon',
	);

	const toPercent = (minute: number) => (minute / MINUTES_IN_DAY) * 100;
	const timeAt = (minute: number) =>
		formatClock(atMinuteOfDay(clock.date, minute), { seconds: false });
</script>

<div class="control">
	<div class="readout">
		<span class="place">{place}</span>
		<time class="numeric" datetime={clock.date.toISOString()}>
			{formatClock(clock.date, { seconds: clock.isLive })}
		</time>
		<span class="caption">{caption}</span>
	</div>

	<div class="slider">
		<div class="path" aria-hidden="true">
			{#if hours}
				<span
					class="daylight"
					style:left="{toPercent(hours.sunrise)}%"
					style:width="{toPercent(hours.sunset - hours.sunrise)}%"
				></span>
				<span class="mark" style:left="{toPercent(hours.sunrise)}%">
					Sunrise {timeAt(hours.sunrise)}
				</span>
				<span class="mark" style:left="{toPercent(hours.sunset)}%">
					Sunset {timeAt(hours.sunset)}
				</span>
			{/if}

			<!-- Follows the eased sky time, so it travels with the sun instead of jumping. -->
			<span
				class="sun"
				data-sun={sunIsUp ? 'up' : 'down'}
				style:left="{toPercent(clock.skyMinute)}%"
			></span>
		</div>

		<!-- The real control: invisible, but it takes the pointer, keyboard and screen readers. -->
		<label>
			<span class="sr-only">Time of day in Kathmandu</span>
			<input
				type="range"
				min="0"
				max={MINUTES_IN_DAY - 0.01}
				step="any"
				value={clock.minute}
				aria-valuetext={formatClock(clock.date, { seconds: false })}
				oninput={(event) => clock.scrubTo(event.currentTarget.valueAsNumber)}
			/>
		</label>
	</div>

	{#if clock.isLive}
		<span class="status live">Live</span>
	{:else}
		<button class="status" type="button" onclick={() => clock.goLive()}>Back to live</button>
	{/if}
</div>

<style>
	.control {
		--dot: 1rem;
		--grab: 2.25rem;
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: start;
		gap: 0.5rem 2rem;
		font-size: 0.875rem;
		color: var(--ink-muted);
	}

	.readout {
		display: grid;
		gap: 0.1rem;
		min-width: 11rem;
	}

	.place {
		letter-spacing: 0.04em;
		text-transform: uppercase;
		font-size: 0.75rem;
	}

	time {
		color: var(--ink);
		font-size: 1.125rem;
		font-weight: 500;
	}

	.caption {
		font-size: 0.8125rem;
	}

	.slider {
		position: relative;
		height: var(--grab);
		margin-top: -0.5rem;
	}

	/* The sun's path across the day: a hairline, thickened between sunrise and sunset. */
	.path {
		position: absolute;
		inset: 0 calc(var(--grab) / 2);
		pointer-events: none;
	}

	.path::before {
		content: '';
		position: absolute;
		inset: calc(var(--grab) / 2) 0 auto;
		height: 1px;
		background: var(--line);
	}

	.daylight {
		position: absolute;
		top: calc(var(--grab) / 2 - 1px);
		height: 3px;
		border-radius: 2px;
		background: color-mix(in oklab, var(--ink) 35%, var(--bg));
	}

	.mark {
		position: absolute;
		top: calc(var(--grab) / 2 + 0.75rem);
		translate: -50% 0;
		font-size: 0.75rem;
		white-space: nowrap;
	}

	/* The sun: filled and warm by day, an empty ring at night. */
	.sun {
		position: absolute;
		top: calc(var(--grab) / 2);
		width: var(--dot);
		height: var(--dot);
		translate: -50% -50%;
		border: 1.5px solid transparent;
		border-radius: 50%;
		background: oklch(82% 0.15 var(--sun-hue));
		box-shadow: 0 0 0 5px oklch(82% 0.15 var(--sun-hue) / 0.22);
		will-change: left;
	}
	.sun[data-sun='down'] {
		border-color: var(--ink-muted);
		background: var(--bg);
		box-shadow: none;
	}

	label {
		position: absolute;
		inset: 0;
	}

	input[type='range'] {
		display: block;
		width: 100%;
		height: 100%;
		margin: 0;
		background: transparent;
		appearance: none;
		cursor: grab;
		opacity: 0;
		touch-action: pan-y;
	}
	input[type='range']:active {
		cursor: grabbing;
	}

	input[type='range']::-webkit-slider-runnable-track {
		height: var(--grab);
		background: transparent;
	}
	input[type='range']::-moz-range-track {
		height: var(--grab);
		background: transparent;
	}
	/* Same width as the inset above, so the hidden thumb lines up with the drawn sun. */
	input[type='range']::-webkit-slider-thumb {
		width: var(--grab);
		height: var(--grab);
		appearance: none;
	}
	input[type='range']::-moz-range-thumb {
		width: var(--grab);
		height: var(--grab);
		border: 0;
	}

	/* Keyboard focus is shown on the sun, since the input itself is invisible. */
	.slider:has(input:focus-visible) .sun {
		outline: 2px solid var(--accent);
		outline-offset: 6px;
	}
	input[type='range']:focus-visible {
		outline: none;
	}

	.status {
		min-width: 6.5rem;
		padding: 0;
		border: 0;
		background: none;
		text-align: right;
		color: var(--ink-muted);
	}

	button.status {
		cursor: pointer;
		text-decoration: underline;
		text-underline-offset: 0.25em;
		text-decoration-color: var(--line);
	}
	button.status:hover {
		color: var(--ink);
	}

	.live::before {
		content: '';
		display: inline-block;
		width: 0.4rem;
		height: 0.4rem;
		margin-right: 0.5rem;
		vertical-align: 0.1em;
		border-radius: 50%;
		background: var(--accent);
	}

	@media (max-width: 40rem) {
		.control {
			grid-template-columns: 1fr auto;
			gap: 0.25rem 1.5rem;
		}
		.slider {
			grid-column: 1 / -1;
			grid-row: 2;
			margin-top: 0;
		}
		.caption {
			display: none;
		}
	}
</style>
