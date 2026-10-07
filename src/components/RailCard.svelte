<script lang="ts">
	import type { Entry } from '../data/types';

	interface Props {
		entry: Entry;
		/** The id of the panel this card's toggle controls. */
		panelId: string;
		expanded: boolean;
		ontoggle: (trigger: HTMLElement) => void;
	}

	let { entry, panelId, expanded, ontoggle }: Props = $props();
</script>

<li>
	<div class="card" class:expanded>
		<div class="heading">
			{#if entry.href}
				<a class="title" href={entry.href} target="_blank" rel="noreferrer noopener">
					{entry.title}<span class="arrow" aria-hidden="true"> ↗</span>
				</a>
			{:else}
				<span class="title">{entry.title}</span>
			{/if}

			<button
				type="button"
				class="toggle"
				aria-expanded={expanded}
				aria-controls={panelId}
				aria-label="{expanded ? 'Hide' : 'Show'} details for {entry.title}"
				onclick={(event) => ontoggle(event.currentTarget)}
			>
				<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 3v10M3 8h10" /></svg>
			</button>
		</div>

		{#if entry.meta}<span class="meta">{entry.meta}</span>{/if}
		<span class="description">{entry.summary}</span>
		<span class="stack">{entry.stack.join(' · ')}</span>
	</div>
</li>

<style>
	.card {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		height: 100%;
		padding-top: 1.25rem;
		border-top: 1px solid var(--line);
		transition: border-color 0.2s;
	}
	.card.expanded {
		border-top-color: var(--ink);
	}

	.heading {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 0.75rem;
	}

	.title {
		font-family: var(--font-display);
		font-size: 1.5rem;
		font-weight: 500;
		line-height: 1.25;
		letter-spacing: -0.01em;
		text-decoration: underline;
		text-decoration-color: transparent;
		text-decoration-thickness: 1px;
		text-underline-offset: 0.25em;
		transition: text-decoration-color 0.2s;
	}

	a.title:hover,
	a.title:focus-visible {
		text-decoration-color: currentColor;
	}

	.arrow {
		color: var(--ink-muted);
	}

	.toggle {
		display: grid;
		flex: none;
		place-items: center;
		width: 2rem;
		height: 2rem;
		padding: 0;
		border: 1px solid var(--line);
		border-radius: 50%;
		background: none;
		cursor: pointer;
		transition: border-color 0.2s;
	}
	.toggle:hover,
	.expanded .toggle {
		border-color: var(--ink);
	}

	.toggle svg {
		width: 0.875rem;
		height: 0.875rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.5;
		stroke-linecap: round;
		transition: rotate 0.25s ease;
	}
	.expanded .toggle svg {
		rotate: 45deg;
	}

	.meta,
	.description,
	.stack {
		color: var(--ink-muted);
	}

	.meta {
		font-size: 0.875rem;
	}

	.description {
		flex: 1;
	}

	.stack {
		padding-top: 0.5rem;
		font-size: 0.875rem;
		opacity: 0.8;
	}

	@media (prefers-reduced-motion: reduce) {
		.card,
		.title,
		.toggle,
		.toggle svg {
			transition: none;
		}
	}
</style>
