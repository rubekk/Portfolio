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
	/* minmax(0, …) lets wide content (e.g. a scroll rail) scroll instead of stretching the page. */
	section {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
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
</style>
