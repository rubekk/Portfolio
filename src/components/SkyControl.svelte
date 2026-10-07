<script lang="ts">
	import type { SkyClock } from '../lib/clock.svelte';
	import { formatClock, MINUTES_IN_DAY } from '../lib/time';

	interface Props {
		clock: SkyClock;
		place: string;
		/** Degrees above the horizon, used for the plain-language caption. */
		elevation: number;
	}

	let { clock, place, elevation }: Props = $props();

	const caption = $derived(
		elevation > 0 ? `Sun ${Math.round(elevation)}° above the horizon` : 'Sun below the horizon',
	);
</script>

<div class="control">
	<div class="readout">
		<span class="place">{place}</span>
		<time class="numeric" datetime={clock.date.toISOString()}>
			{formatClock(clock.date, { seconds: clock.isLive })}
		</time>
		<span class="caption">{caption}</span>
	</div>

	<label class="scrubber">
		<span class="sr-only">Time of day in Kathmandu</span>
		<input
			type="range"
			min="0"
			max={MINUTES_IN_DAY - 1}
			step="1"
			value={Math.floor(clock.minute)}
			oninput={(event) => clock.scrubTo(event.currentTarget.valueAsNumber)}
		/>
	</label>

	{#if clock.isLive}
		<span class="status live">Live</span>
	{:else}
		<button class="status" type="button" onclick={() => clock.goLive()}>Back to live</button>
	{/if}
</div>

<style>
	.control {
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		gap: 0.75rem 1.5rem;
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

	.scrubber {
		display: block;
	}

	input[type='range'] {
		width: 100%;
		height: 1.5rem;
		margin: 0;
		background: transparent;
		appearance: none;
		cursor: ew-resize;
	}

	input[type='range']::-webkit-slider-runnable-track {
		height: 1px;
		background: var(--line);
	}
	input[type='range']::-moz-range-track {
		height: 1px;
		background: var(--line);
	}

	input[type='range']::-webkit-slider-thumb {
		width: 0.875rem;
		height: 0.875rem;
		margin-top: -0.4375rem;
		border: 0;
		border-radius: 50%;
		background: var(--ink);
		appearance: none;
	}
	input[type='range']::-moz-range-thumb {
		width: 0.875rem;
		height: 0.875rem;
		border: 0;
		border-radius: 50%;
		background: var(--ink);
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
		width: 0.5rem;
		height: 0.5rem;
		margin-right: 0.5rem;
		border-radius: 50%;
		background: var(--accent);
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes pulse {
		50% {
			opacity: 0.35;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.live::before {
			animation: none;
		}
	}

	.caption {
		display: none;
	}

	@media (max-width: 40rem) {
		.control {
			grid-template-columns: 1fr auto;
		}
		.scrubber {
			grid-column: 1 / -1;
			grid-row: 2;
		}
	}

	@media (min-width: 40rem) {
		.caption {
			display: block;
		}
	}
</style>
