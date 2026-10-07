import type { Project } from './types';

export const projects: Project[] = [
	{
		title: 'Map Chat',
		url: 'https://mapchat.netlify.app',
		description:
			'Realtime location-based chat on a map. Chat, and see where someone is chatting from.',
		stack: ['SvelteKit', 'Firebase'],
	},
	{
		title: 'Ktm Guessr',
		url: 'https://ktmguessr.netlify.app',
		description:
			'Guess places around Kathmandu from a 360° image. The closer you guess, the more points you get.',
		stack: ['SvelteKit', 'Firebase'],
	},
	{
		title: 'Districts of Nepal',
		url: 'https://districtsofnepal.netlify.app',
		description:
			'A game of guessing Nepal’s districts, by clicking the map or typing. Try for the highest score.',
		stack: ['SvelteKit', 'Firebase'],
	},
	{
		title: 'CG ko Malik',
		url: 'https://cgkomalik.netlify.app',
		description: 'A billionaire simulator. Shop like Nepal’s only billionaire, Binod Chaudhary.',
		stack: ['Svelte', 'html2canvas'],
	},
	{
		title: 'Envision Travel',
		url: 'https://envisiontravel.netlify.app',
		description: 'A single-page travel agency website. Elegant and responsive.',
		stack: ['HTML/CSS', 'JavaScript'],
	},
	{
		title: 'Liquors Nepal',
		url: 'https://github.com/rubekk/Liquors-Nepal',
		description: 'An e-commerce website for selling liquor products.',
		stack: ['PHP'],
	},
	{
		title: 'Bipana Ko Ghar',
		url: 'https://github.com/rubekk/Bipana-ko-Ghar',
		description: 'A real estate e-commerce website.',
		stack: ['PHP'],
	},
];
