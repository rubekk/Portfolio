import type { SkillGroup } from './types';

export const skillGroups: SkillGroup[] = [
	{ label: 'Languages', skills: ['HTML/CSS', 'JavaScript', 'TypeScript', 'Go', 'PHP'] },
	{
		label: 'Frameworks',
		skills: [
			'SvelteKit',
			'React',
			'Next.js',
			'Tailwind CSS',
			'Node.js',
			'Express',
			'NestJS',
			'Echo',
		],
	},
	{ label: 'Data', skills: ['Firebase', 'Supabase', 'PostgreSQL', 'MongoDB', 'MySQL'] },
	{ label: 'Tools', skills: ['Git', 'Docker'] },
];
