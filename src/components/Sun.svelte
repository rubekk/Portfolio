<script lang="ts">
	// The sun over Kathmandu. Position and colour come from the CSS variables set by lib/sky.ts,
	// which are updated every frame while the sky glides, so no CSS transitions are needed here.
</script>

<div class="sun" aria-hidden="true"></div>
<div class="grain" aria-hidden="true"></div>

<style>
	.sun {
		/* Dusk and dawn glow deeper and darker so light text stays readable over them. */
		--lightness: calc(40% + var(--daylight) * 50%);
		position: fixed;
		inset: 0 auto auto 0;
		z-index: -1;
		width: 0;
		height: 0;
		pointer-events: none;
		opacity: var(--sun-glow);
		translate: calc(var(--sun-x) * 1vw) calc(var(--sun-y) * 1vh);
	}

	/* Fine grain dithers the gradients so they never show banding. */
	.grain {
		position: fixed;
		inset: 0;
		z-index: -1;
		pointer-events: none;
		opacity: 0.06;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
	}

	.sun::before,
	.sun::after {
		content: '';
		position: absolute;
		border-radius: 50%;
		translate: -50% -50%;
	}

	/* Light spilling across the whole page */
	.sun::before {
		width: 130vmax;
		height: 130vmax;
		background: radial-gradient(
			closest-side,
			oklch(var(--lightness) var(--sun-chroma) var(--sun-hue) / 0.4),
			oklch(var(--lightness) var(--sun-chroma) var(--sun-hue) / 0.28) 12%,
			oklch(var(--lightness) var(--sun-chroma) var(--sun-hue) / 0.18) 25%,
			oklch(var(--lightness) var(--sun-chroma) var(--sun-hue) / 0.1) 40%,
			oklch(var(--lightness) var(--sun-chroma) var(--sun-hue) / 0.045) 58%,
			oklch(var(--lightness) var(--sun-chroma) var(--sun-hue) / 0.012) 78%,
			transparent
		);
	}

	/* The sun itself, seen through haze: no hard edge */
	.sun::after {
		width: clamp(18rem, 38vmin, 30rem);
		aspect-ratio: 1;
		background: radial-gradient(
			closest-side,
			oklch(calc(var(--lightness) + 6%) calc(var(--sun-chroma) * 1.1) var(--sun-hue) / 0.85),
			oklch(var(--lightness) var(--sun-chroma) var(--sun-hue) / 0.35) 40%,
			transparent
		);
	}
</style>
