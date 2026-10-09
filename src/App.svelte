<script lang="ts">
	import Contact from './components/Contact.svelte';
	import Hero from './components/Hero.svelte';
	import Projects from './components/Projects.svelte';
	import Section from './components/Section.svelte';
	import SkillList from './components/SkillList.svelte';
	import SkyControl from './components/SkyControl.svelte';
	import Sun from './components/Sun.svelte';
	import Work from './components/Work.svelte';
	import { contacts, profile } from './data/profile';
	import { projects } from './data/projects';
	import { skillGroups } from './data/skills';
	import { work } from './data/work';
	import { SkyClock } from './lib/clock.svelte';
	import { daylightHours } from './lib/daylight';
	import { applySky, describeSky } from './lib/sky';
	import { sunPosition } from './lib/solar';
	import { atMinuteOfDay } from './lib/time';

	const clock = new SkyClock();
	const sun = $derived(sunPosition(clock.skyDate));
	const sky = $derived(describeSky(sun));

	// Keyed on the day so sunrise and sunset are only recomputed when the date changes.
	const dayStart = $derived(atMinuteOfDay(clock.date, 0).getTime());
	const hours = $derived(daylightHours(new Date(dayStart)));

	$effect(() => clock.start());
	$effect(() => applySky(document.documentElement, sky));
</script>

<Sun />

<div class="page">
	<header>
		<SkyControl {clock} place={profile.location} {hours} elevation={sun.elevation} />
	</header>

	<main>
		<Hero name={profile.name} role={profile.role} bio={profile.bio} />

		{#if work.length > 0}
			<Section id="work" title="Work">
				<Work items={work} />
			</Section>
		{/if}

		<Section id="projects" title="Personal projects">
			<Projects {projects} />
		</Section>

		<Section id="skills" title="Skills">
			<SkillList groups={skillGroups} />
		</Section>

		<Section id="contact" title="Contact">
			<Contact links={contacts} />
		</Section>
	</main>

	<footer>
		<small>© {new Date().getFullYear()} {profile.name.join(' ')}</small>
		<small>Lit by the sun over Kathmandu.</small>
	</footer>
</div>

<style>
	.page {
		max-width: var(--measure);
		margin-inline: auto;
		padding-inline: var(--gutter);
	}

	header {
		padding-top: 1.75rem;
	}

	footer {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 0.5rem 2rem;
		margin-top: var(--section-gap);
		padding-block: 1.5rem 2.5rem;
		border-top: 1px solid var(--line);
		color: var(--ink-muted);
	}
</style>
