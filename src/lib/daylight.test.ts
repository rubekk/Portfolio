import { describe, expect, it } from 'vitest';
import { daylightHours } from './daylight';

describe('daylightHours', () => {
	it('finds sunrise and sunset for Kathmandu in early October', () => {
		const hours = daylightHours(new Date('2026-10-07T06:15:00Z'));
		expect(hours).not.toBeNull();
		// About 06:00 and 17:44 local time.
		expect(hours!.sunrise).toBeGreaterThan(5 * 60 + 50);
		expect(hours!.sunrise).toBeLessThan(6 * 60 + 10);
		expect(hours!.sunset).toBeGreaterThan(17 * 60 + 35);
		expect(hours!.sunset).toBeLessThan(17 * 60 + 55);
	});

	it('has the day longer in June than in December', () => {
		const length = (iso: string) => {
			const hours = daylightHours(new Date(iso))!;
			return hours.sunset - hours.sunrise;
		};
		expect(length('2026-06-21T06:15:00Z')).toBeGreaterThan(length('2026-12-21T06:15:00Z'));
	});
});
