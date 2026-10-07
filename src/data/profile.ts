import type { ContactLink } from './types';

export const profile = {
	name: ['Rubek', 'Maharjan'],
	role: 'Full stack developer',
	location: 'Kathmandu, Nepal',
	bio: 'I’m a full stack developer. I enjoy thinking up creative ideas, and once I have one, I like to bring it to life in code.',
} as const;

export const contacts: ContactLink[] = [
	{ label: 'Email', href: 'mailto:rubekmhzn7@gmail.com' },
	{ label: 'LinkedIn', href: 'https://linkedin.com/in/rubekk' },
	{ label: 'GitHub', href: 'https://github.com/rubekk' },
];
