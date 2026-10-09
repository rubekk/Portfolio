import { describe, expect, it } from 'vitest';
import { describeSky, castShadow } from './sky';

const noon = describeSky({ elevation: 60, azimuth: 180 });
const morning = describeSky({ elevation: 15, azimuth: 100 });
const midnight = describeSky({ elevation: -40, azimuth: 0 });

describe('describeSky', () => {
	it('is light by day and dark by night', () => {
		expect(noon.tone).toBe('light');
		expect(midnight.tone).toBe('dark');
		expect(noon.daylight).toBe(1);
		expect(midnight.daylight).toBe(0);
	});

	it('puts a morning sun on the left and an evening sun on the right', () => {
		const evening = describeSky({ elevation: 15, azimuth: 260 });
		expect(morning.sunX).toBeLessThan(50);
		expect(evening.sunX).toBeGreaterThan(50);
	});

	it('casts shadows away from the sun, longer when it is lower', () => {
		expect(morning.shadow.x).toBeGreaterThan(0);
		expect(morning.shadow.x).toBeGreaterThan(Math.abs(noon.shadow.x));
		expect(morning.shadow.y).toBeGreaterThan(noon.shadow.y);
	});

	it('hides the sun and its shadow at night', () => {
		expect(midnight.glow).toBe(0);
		expect(castShadow(midnight.shadow)).toBe('none');
	});
});
