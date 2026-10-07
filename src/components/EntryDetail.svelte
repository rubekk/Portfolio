<script lang="ts">
	import type { Entry } from '../data/types';

	interface Props {
		id: string;
		entry: Entry | undefined;
		open: boolean;
	}

	let { id, entry, open }: Props = $props();
</script>

<div class="panel" class:open {id} role="region" aria-label="{entry?.title ?? 'Project'} details">
	<div class="clip" inert={!open}>
		{#if entry}
			{#key entry.id}
				<div class="body">
					<div class="story">
						<h3>{entry.title}</h3>
						{#if entry.meta}<p class="meta">{entry.meta}</p>{/if}
						{#each entry.details ?? [entry.summary] as paragraph}
							<p>{paragraph}</p>
						{/each}
					</div>

					<dl class="facts">
						<div>
							<dt>Built with</dt>
							<dd>
								<ul>
									{#each entry.stack as item}<li>{item}</li>{/each}
								</ul>
							</dd>
						</div>
						{#if entry.href}
							<div>
								<dt>Link</dt>
								<dd>
									<a href={entry.href} target="_blank" rel="noreferrer noopener">
										Visit project<span aria-hidden="true"> ↗</span>
									</a>
								</dd>
							</div>
						{/if}
					</dl>
				</div>
			{/key}
		{/if}
	</div>
</div>

<style>
	/* Animating a grid row from 0fr to 1fr opens the panel to its natural height. */
	.panel {
		display: grid;
		grid-template-rows: 0fr;
		transition: grid-template-rows 0.35s ease;
	}
	.panel.open {
		grid-template-rows: 1fr;
	}

	.clip {
		min-height: 0;
		overflow: hidden;
	}

	.body {
		display: grid;
		gap: 2rem 4rem;
		margin-top: 1.5rem;
		padding-block: 1.75rem 0.5rem;
		border-top: 1px solid var(--line);
		animation: reveal 0.35s ease;
	}

	@keyframes reveal {
		from {
			opacity: 0;
		}
	}

	.story {
		display: grid;
		gap: 0.75rem;
		max-width: 40rem;
	}

	h3 {
		font-family: var(--font-display);
		font-size: 1.75rem;
		font-weight: 500;
		line-height: 1.2;
		letter-spacing: -0.01em;
	}

	.story p {
		color: var(--ink-muted);
	}
	.story .meta {
		font-size: 0.875rem;
	}

	.facts {
		display: grid;
		align-content: start;
		gap: 1.25rem;
		font-size: 0.9375rem;
	}

	dt {
		margin-bottom: 0.35rem;
		font-size: 0.8125rem;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--ink-muted);
	}

	dd {
		margin: 0;
	}

	.facts ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem 1rem;
	}

	.facts a {
		text-decoration: underline;
		text-decoration-color: var(--line);
		text-decoration-thickness: 1px;
		text-underline-offset: 0.3em;
		transition: text-decoration-color 0.2s;
	}
	.facts a:hover,
	.facts a:focus-visible {
		text-decoration-color: currentColor;
	}

	@media (min-width: 48rem) {
		.body {
			grid-template-columns: minmax(0, 1fr) 14rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.panel,
		.facts a {
			transition: none;
		}
		.body {
			animation: none;
		}
	}
</style>
