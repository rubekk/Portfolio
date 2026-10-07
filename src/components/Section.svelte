<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		id: string;
		title: string;
		children: Snippet;
	}

	let { id, title, children }: Props = $props();
</script>

<section aria-labelledby="{id}-title" {id}>
	<h2 id="{id}-title">{title}</h2>
	<div class="content">
		{@render children()}
	</div>
</section>

<style>
	section {
		display: grid;
		gap: 1.5rem;
		padding-top: var(--section-gap);
	}

	h2 {
		font-family: var(--font-body);
		font-size: 0.8125rem;
		font-weight: 500;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--ink-muted);
	}

	@media (min-width: 48rem) {
		section {
			grid-template-columns: 11rem 1fr;
			gap: 2rem;
		}
		h2 {
			padding-top: 0.35rem;
		}
	}
</style>
