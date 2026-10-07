<script lang="ts">
	import type { ContactLink } from '../data/types';

	let { links }: { links: ContactLink[] } = $props();
</script>

<ul>
	{#each links as link (link.href)}
		<li>
			<a
				href={link.href}
				target={link.href.startsWith('http') ? '_blank' : undefined}
				rel="noreferrer noopener"
			>
				{link.label}<span aria-hidden="true"> ↗</span>
			</a>
		</li>
	{/each}
</ul>

<style>
	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 2rem;
	}

	a {
		font-family: var(--font-display);
		font-size: 1.5rem;
		text-decoration: underline;
		text-decoration-color: var(--line);
		text-decoration-thickness: 1px;
		text-underline-offset: 0.3em;
		transition: text-decoration-color 0.2s;
	}

	a:hover,
	a:focus-visible {
		text-decoration-color: currentColor;
	}

	@media (prefers-reduced-motion: reduce) {
		a {
			transition: none;
		}
	}
</style>
