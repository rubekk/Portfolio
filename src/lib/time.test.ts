import { describe, expect, it } from 'vitest';
import { atMinuteOfDay, formatClock, minutesIntoDay } from './time';

describe('Kathmandu time', () => {
	const noonKtm = new Date('2026-10-07T06:15:00Z'); // 12:00 NPT

	it('measures minutes since local midnight', () => {
		expect(minutesIntoDay(noonKtm)).toBe(720);
		expect(minutesIntoDay(new Date('2026-10-06T18:15:00Z'))).toBe(0);
	});

	it('moves to another minute of the same local day', () => {
		const sixAm = atMinuteOfDay(noonKtm, 360);
		expect(minutesIntoDay(sixAm)).toBe(360);
		expect(sixAm.toISOString()).toBe('2026-10-07T00:15:00.000Z');
	});

	it('formats the clock in Nepal Standard Time', () => {
		expect(formatClock(noonKtm, { seconds: true })).toBe('12:00:00');
		expect(formatClock(noonKtm, { seconds: false })).toBe('12:00');
	});
});
