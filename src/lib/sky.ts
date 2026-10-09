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

const SHADOW_LENGTH_PER_UNIT = 0.12; // em of shadow per unit of (height / shadow length)
const SHADOW_MAX_LENGTH = 0.4; // em
const SHADOW_DROP = 0.5; // how much of the length falls downwards rather than sideways

/** Daylight at which the page flips between light and dark text. Past dusk, so dusk reads dark. */
const LIGHT_TONE_FROM = 0.6;

export function describeSky({ elevation, azimuth }: SunPosition): Sky {
	const daylight = smoothstep(-6, 8, elevation);
	const warmth = 1 - smoothstep(0, 35, elevation);

	// Facing south: east is on the left, west on the right.
	const eastWest = -Math.sin((azimuth * Math.PI) / 180);
	const lengthRatio = 1 / Math.tan((Math.max(elevation, 1) * Math.PI) / 180);
	const length = Math.min(lengthRatio * SHADOW_LENGTH_PER_UNIT, SHADOW_MAX_LENGTH);

	return {
		daylight,
		tone: daylight >= LIGHT_TONE_FROM ? 'light' : 'dark',
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

const SHADOW_LAYERS = 5;

/**
 * A `text-shadow` value: a few layers stretching away from the sun, each a little
 * softer than the last, so the shadow reads as light falling off, not as a smear.
 */
export function castShadow({ x, y, strength }: Sky['shadow']): string {
	if (strength < 0.01) return 'none';

	const layers = Array.from({ length: SHADOW_LAYERS }, (_, index) => {
		const t = (index + 1) / SHADOW_LAYERS;
		const alpha = (strength * 11 * (1 - 0.6 * t)).toFixed(1);
		const blur = (0.01 + 0.07 * t).toFixed(3);
		const color = `color-mix(in srgb, var(--ink) ${alpha}%, transparent)`;
		return `${(x * t).toFixed(3)}em ${(y * t).toFixed(3)}em ${blur}em ${color}`;
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
		'--dusk-in': clamp(sky.daylight * 2, 0, 1).toFixed(3),
		'--dusk-out': clamp(sky.daylight * 2 - 1, 0, 1).toFixed(3),
		'--name-shadow': castShadow(sky.shadow),
	};
}

export function applySky(root: HTMLElement, sky: Sky): void {
	root.dataset.tone = sky.tone;
	for (const [name, value] of Object.entries(skyToCssVars(sky))) {
		root.style.setProperty(name, value);
	}
}
