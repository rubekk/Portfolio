<script lang="ts">
	import type { Entry } from '../data/types';
	import EntryDetail from './EntryDetail.svelte';
	import RailCard from './RailCard.svelte';
	import ScrollRail from './ScrollRail.svelte';

	interface Props {
		label: string;
		entries: Entry[];
	}

	let { label, entries }: Props = $props();

	const uid = $props.id();
	const panelId = `${uid}-detail`;

	// Only one entry is open at a time. `shownId` outlives `openId` so the panel
	// keeps its content while it animates closed.
	let openId = $state<string | null>(null);
	let shownId = $state<string | null>(null);
	const shown = $derived(entries.find((entry) => entry.id === shownId));

	function toggle(id: string, trigger: HTMLElement) {
		if (openId === id) {
			openId = null;
			return;
		}
		openId = id;
		shownId = id;

		const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
		trigger.closest('li')?.scrollIntoView({
			inline: 'nearest',
			block: 'nearest',
			behavior: reduceMotion ? 'auto' : 'smooth',
		});
	}
</script>

<ScrollRail {label}>
	{#each entries as entry (entry.id)}
		<RailCard
			{entry}
			{panelId}
			expanded={openId === entry.id}
			ontoggle={(trigger) => toggle(entry.id, trigger)}
		/>
	{/each}

	{#snippet below()}
		<EntryDetail id={panelId} entry={shown} open={openId !== null} />
	{/snippet}
</ScrollRail>
