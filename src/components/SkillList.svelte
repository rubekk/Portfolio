<script lang="ts">
	import type { SkillGroup } from '../data/types';

	let { groups }: { groups: SkillGroup[] } = $props();
</script>

<dl>
	{#each groups as group (group.label)}
		<div class="group">
			<dt>{group.label}</dt>
			<dd>{group.skills.join(', ')}</dd>
		</div>
	{/each}
</dl>

<style>
	.group {
		display: grid;
		gap: 0.15rem;
		padding-block: 0.9rem;
		border-top: 1px solid var(--line);
	}
	.group:last-child {
		border-bottom: 1px solid var(--line);
	}

	dt {
		font-size: 0.875rem;
		color: var(--ink-muted);
	}

	dd {
		margin: 0;
	}

	@media (min-width: 40rem) {
		.group {
			grid-template-columns: 9rem 1fr;
			gap: 1.5rem;
		}
	}
</style>
