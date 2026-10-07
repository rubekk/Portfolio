<script lang="ts">
	import type { Project } from '../data/types';
	import EntryRail from './EntryRail.svelte';

	let { projects }: { projects: Project[] } = $props();

	const entries = $derived(
		projects.map((project) => ({
			id: project.url,
			title: project.title,
			summary: project.description,
			details: project.details,
			stack: project.stack,
			href: project.url,
		})),
	);
</script>

<EntryRail label="Personal projects" {entries} />
