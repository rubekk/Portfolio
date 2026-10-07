import type { SunPosition } from './solar';

export interface Sky {
	/** 0 at night, 1 in full daylight, with a smooth twilight in between. */
	daylight: number;
	tone: 'light' | 'dark';
	/** Sun position in viewport percentages. */
	sunX: number;
	sunY: number;
	/** Visibility of the sun and its glow, 0–1. */
	glow: number;
	sunHue: number;
	sunChroma: number;
	/** Where a shadow cast by the sun falls, in em, and how visible it is. */
	shadow: { x: number; y: number; strength: number };
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const lerp = (from: number, to: number, t: number) => from + (to - from) * t;
const smoothstep = (edge0: number, edge1: number, x: number) => {
	const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
	return t * t * (3 - 2 * t);
};

const SHADOW_LENGTH_PER_UNIT = 0.17; // em of shadow per unit of (height / shadow length)
const SHADOW_MAX_LENGTH = 0.75; // em
const SHADOW_DROP = 0.5; // how much of the length falls downwards rather than sideways

export function describeSky({ elevation, azimuth }: SunPosition): Sky {
	const daylight = smoothstep(-6, 8, elevation);
	const warmth = 1 - smoothstep(0, 35, elevation);

	// Facing south: east is on the left, west on the right.
	const eastWest = -Math.sin((azimuth * Math.PI) / 180);
	const lengthRatio = 1 / Math.tan((Math.max(elevation, 1) * Math.PI) / 180);
	const length = Math.min(lengthRatio * SHADOW_LENGTH_PER_UNIT, SHADOW_MAX_LENGTH);

	return {
		daylight,
		tone: daylight >= 0.5 ? 'light' : 'dark',
		sunX: 50 + eastWest * 42,
		sunY: lerp(88, 14, clamp(elevation, 0, 70) / 70),
		glow: smoothstep(-4, 6, elevation),
		sunHue: lerp(88, 42, warmth),
		sunChroma: lerp(0.1, 0.18, warmth),
		shadow: {
			x: -eastWest * length,
			y: length * SHADOW_DROP,
			strength: smoothstep(1, 12, elevation),
		},
	};
}

const SHADOW_STEPS = 36;

/** A `text-shadow` value: a soft, fading trail of copies stretching away from the sun. */
export function longShadow({ x, y, strength }: Sky['shadow']): string {
	if (strength < 0.01) return 'none';

	const layers = Array.from({ length: SHADOW_STEPS }, (_, index) => {
		const t = (index + 1) / SHADOW_STEPS;
		const alpha = Math.round(strength * (1 - t) ** 1.4 * 14 * 10) / 10;
		const color = `color-mix(in srgb, var(--ink) ${alpha}%, transparent)`;
		return `${(x * t).toFixed(3)}em ${(y * t).toFixed(3)}em 0 ${color}`;
	});
	return layers.join(', ');
}

export function skyToCssVars(sky: Sky): Record<string, string> {
	return {
		'--daylight': sky.daylight.toFixed(3),
		'--sun-x': sky.sunX.toFixed(2),
		'--sun-y': sky.sunY.toFixed(2),
		'--sun-glow': sky.glow.toFixed(3),
		'--sun-hue': sky.sunHue.toFixed(1),
		'--sun-chroma': sky.sunChroma.toFixed(3),
		'--name-shadow': longShadow(sky.shadow),
	};
}

export function applySky(root: HTMLElement, sky: Sky): void {
	root.dataset.tone = sky.tone;
	for (const [name, value] of Object.entries(skyToCssVars(sky))) {
		root.style.setProperty(name, value);
	}
}
