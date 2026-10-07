<script lang="ts">
	interface Props {
		name: readonly [string, string];
		role: string;
		bio: string;
	}

	let { name, role, bio }: Props = $props();
</script>

<section class="hero">
	<p class="role">{role}</p>
	<h1>
		{#each name as part}
			<span>{part}</span>
		{/each}
	</h1>
	<p class="bio">{bio}</p>
</section>

<style>
	.hero {
		padding-block: clamp(4rem, 14vh, 9rem) 0;
	}

	.role {
		margin-bottom: 1.25rem;
		color: var(--ink-muted);
		letter-spacing: 0.04em;
		text-transform: uppercase;
		font-size: 0.8125rem;
	}

	h1 {
		font-family: var(--font-display);
		font-size: clamp(3.5rem, 14vw, 9.5rem);
		font-weight: 600;
		line-height: 0.92;
		letter-spacing: -0.035em;
		text-shadow: var(--name-shadow);
		/* The shadow is long; keep it from creating horizontal scroll. */
		overflow-wrap: anywhere;
	}

	h1 span {
		display: block;
	}

	.bio {
		max-width: 34rem;
		margin-top: clamp(2rem, 5vw, 3.5rem);
		font-size: clamp(1.125rem, 2.2vw, 1.375rem);
		line-height: 1.55;
		color: var(--ink-muted);
	}
</style>
