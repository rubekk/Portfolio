<script lang="ts">
	// The sun over Kathmandu. Position and colour come from the CSS variables set by lib/sky.ts.
</script>

<div class="sun" aria-hidden="true"></div>

<style>
	.sun {
		position: fixed;
		inset: 0 auto auto 0;
		z-index: -1;
		width: 0;
		height: 0;
		pointer-events: none;
		opacity: var(--sun-glow);
		translate: calc(var(--sun-x) * 1vw) calc(var(--sun-y) * 1vh);
		transition:
			translate 0.6s ease,
			opacity 0.6s ease;
	}

	.sun::before,
	.sun::after {
		content: '';
		position: absolute;
		border-radius: 50%;
		translate: -50% -50%;
	}

	/* Atmospheric glow */
	.sun::before {
		width: 130vmax;
		height: 130vmax;
		background: radial-gradient(
			closest-side,
			oklch(90% var(--sun-chroma) var(--sun-hue) / 0.55),
			oklch(93% calc(var(--sun-chroma) * 0.6) var(--sun-hue) / 0.2) 40%,
			transparent
		);
	}

	/* Disc */
	.sun::after {
		width: clamp(3rem, 7vmin, 5rem);
		aspect-ratio: 1;
		background: oklch(88% calc(var(--sun-chroma) * 1.4) var(--sun-hue));
		box-shadow: 0 0 3rem 1rem oklch(88% var(--sun-chroma) var(--sun-hue) / 0.5);
	}

	@media (prefers-reduced-motion: reduce) {
		.sun {
			transition: none;
		}
	}
</style>
