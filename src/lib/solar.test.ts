import { describe, expect, it } from 'vitest';
import { KATHMANDU, sunPosition } from './solar';

// 2026-10-07 — Kathmandu is UTC+5:45, so local noon is 06:15 UTC.
const at = (utc: string) => sunPosition(new Date(`2026-10-07T${utc}Z`), KATHMANDU);

describe('sunPosition', () => {
	it('is high in the south around local solar noon', () => {
		const { elevation, azimuth } = at('06:15:00');
		expect(elevation).toBeGreaterThan(55);
		expect(elevation).toBeLessThan(65);
		expect(azimuth).toBeGreaterThan(170);
		expect(azimuth).toBeLessThan(190);
	});

	it('rises in the east and sets in the west', () => {
		const morning = at('01:00:00'); // 06:45 local
		const evening = at('11:30:00'); // 17:15 local
		expect(morning.azimuth).toBeGreaterThan(60);
		expect(morning.azimuth).toBeLessThan(110);
		expect(evening.azimuth).toBeGreaterThan(250);
		expect(evening.azimuth).toBeLessThan(300);
	});

	it('is below the horizon at local midnight', () => {
		expect(at('18:15:00').elevation).toBeLessThan(-30);
	});
});
