<script lang="ts">
	import type { WorkItem } from '../data/types';
	import EntryRail from './EntryRail.svelte';

	let { items }: { items: WorkItem[] } = $props();

	const entries = $derived(
		items.map((item) => ({
			id: `${item.company}-${item.period}`,
			title: item.company,
			meta: `${item.role} · ${item.period}`,
			summary: item.summary,
			details: item.details,
			stack: item.stack,
			href: item.url,
		})),
	);
</script>

<EntryRail label="Work" {entries} />
