<script lang="ts">
	import type { Project } from '../data/types';

	let { projects }: { projects: Project[] } = $props();
</script>

<ul>
	{#each projects as project (project.url)}
		<li>
			<a href={project.url} target="_blank" rel="noreferrer noopener">
				<span class="heading">
					<span class="title">{project.title}</span>
					<span class="arrow" aria-hidden="true">↗</span>
				</span>
				<span class="description">{project.description}</span>
				<span class="stack">{project.stack.join(' · ')}</span>
			</a>
		</li>
	{/each}
</ul>

<style>
	li {
		border-top: 1px solid var(--line);
	}
	li:last-child {
		border-bottom: 1px solid var(--line);
	}

	a {
		display: grid;
		gap: 0.35rem;
		padding-block: 1.5rem;
	}

	.heading {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
	}

	.title {
		font-family: var(--font-display);
		font-size: 1.5rem;
		font-weight: 500;
		letter-spacing: -0.01em;
		text-decoration: underline;
		text-decoration-color: transparent;
		text-decoration-thickness: 1px;
		text-underline-offset: 0.25em;
		transition: text-decoration-color 0.2s;
	}

	.arrow {
		color: var(--ink-muted);
		transition:
			translate 0.2s,
			color 0.2s;
	}

	a:hover .title,
	a:focus-visible .title {
		text-decoration-color: currentColor;
	}
	a:hover .arrow,
	a:focus-visible .arrow {
		translate: 0.2rem -0.2rem;
		color: var(--accent);
	}

	.description {
		max-width: 36rem;
		color: var(--ink-muted);
	}

	.stack {
		font-size: 0.875rem;
		color: var(--ink-muted);
		opacity: 0.8;
	}

	@media (prefers-reduced-motion: reduce) {
		.arrow,
		.title {
			transition: none;
		}
	}
</style>
