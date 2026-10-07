<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/** Names the region for assistive technology, e.g. "Projects". */
		label: string;
		/** `<li>` elements; they snap to the start of the rail. */
		children: Snippet;
		/** Rendered directly under the cards, above the arrows. */
		below?: Snippet;
	}

	let { label, children, below }: Props = $props();

	let viewport: HTMLElement;
	let canScrollBack = $state(false);
	let canScrollForward = $state(false);

	function update() {
		const maxScroll = viewport.scrollWidth - viewport.clientWidth;
		canScrollBack = viewport.scrollLeft > 1;
		canScrollForward = viewport.scrollLeft < maxScroll - 1;
	}

	function scrollByCard(direction: -1 | 1) {
		const card = viewport.querySelector('li');
		if (!card) return;
		const gap = parseFloat(getComputedStyle(card.parentElement!).columnGap) || 0;
		const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
		viewport.scrollBy({
			left: direction * (card.offsetWidth + gap),
			behavior: reduceMotion ? 'auto' : 'smooth',
		});
	}

	$effect(() => {
		update();
		const observer = new ResizeObserver(update);
		observer.observe(viewport);
		observer.observe(viewport.firstElementChild!);
		return () => observer.disconnect();
	});
</script>

<div class="rail">
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<div
		class="viewport"
		class:fade-start={canScrollBack}
		class:fade-end={canScrollForward}
		role="region"
		aria-label={label}
		tabindex="0"
		bind:this={viewport}
		onscroll={update}
	>
		<ul class="track">
			{@render children()}
		</ul>
	</div>

	{@render below?.()}

	{#if canScrollBack || canScrollForward}
		<div class="controls">
			<button
				type="button"
				aria-label="Scroll {label} back"
				disabled={!canScrollBack}
				onclick={() => scrollByCard(-1)}
			>
				<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3 5 8l5 5" /></svg>
			</button>
			<button
				type="button"
				aria-label="Scroll {label} forward"
				disabled={!canScrollForward}
				onclick={() => scrollByCard(1)}
			>
				<svg viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3 5 5-5 5" /></svg>
			</button>
		</div>
	{/if}
</div>

<style>
	.rail {
		min-width: 0;
	}

	.viewport {
		--fade: 3rem;
		overflow-x: auto;
		padding-block: 0.25rem;
		scroll-snap-type: x mandatory;
		scrollbar-width: none;
		-webkit-overflow-scrolling: touch;
		mask-image: linear-gradient(
			to right,
			transparent,
			#000 var(--fade-start, 0),
			#000 calc(100% - var(--fade-end, 0px)),
			transparent
		);
	}
	.viewport::-webkit-scrollbar {
		display: none;
	}
	.viewport.fade-start {
		--fade-start: var(--fade);
	}
	.viewport.fade-end {
		--fade-end: var(--fade);
	}
	.viewport:focus-visible {
		outline-offset: -2px;
	}

	.track {
		display: flex;
		gap: 1.5rem;
		width: max-content;
	}

	.track > :global(li) {
		flex: 0 0 min(19rem, 80vw);
		scroll-snap-align: start;
	}

	.controls {
		display: flex;
		gap: 0.5rem;
		margin-top: 1.25rem;
	}

	button {
		display: grid;
		place-items: center;
		width: 2.25rem;
		height: 2.25rem;
		padding: 0;
		border: 1px solid var(--line);
		border-radius: 50%;
		background: none;
		cursor: pointer;
		transition:
			border-color 0.2s,
			opacity 0.2s;
	}
	button:hover:not(:disabled) {
		border-color: var(--ink);
	}
	button:disabled {
		opacity: 0.35;
		cursor: default;
	}

	svg {
		width: 1rem;
		height: 1rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.5;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	/* On small screens the rail bleeds to the screen edges so the next card peeks in. */
	@media (max-width: 47.99rem) {
		.viewport {
			margin-inline: calc(var(--gutter) * -1);
			padding-inline: var(--gutter);
			scroll-padding-inline: var(--gutter);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		button {
			transition: none;
		}
	}
</style>
