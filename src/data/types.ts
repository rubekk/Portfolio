export interface Project {
	title: string;
	url: string;
	description: string;
	/** Paragraphs shown when the card is expanded. Falls back to `description`. */
	details?: string[];
	stack: string[];
}

export interface SkillGroup {
	label: string;
	skills: string[];
}

export interface ContactLink {
	label: string;
	href: string;
}

export interface WorkItem {
	/** Company or client; use a short description instead if the name is confidential. */
	company: string;
	role: string;
	period: string;
	summary: string;
	/** Paragraphs shown when the card is expanded. Falls back to `summary`. */
	details?: string[];
	stack: string[];
	/** Only set when the project is public. Without it, there is no link. */
	url?: string;
}

/** What a rail card displays, whether it came from a project or from work. */
export interface Entry {
	id: string;
	title: string;
	meta?: string;
	summary: string;
	details?: string[];
	stack: string[];
	href?: string;
}
