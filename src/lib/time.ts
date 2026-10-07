/** Nepal Standard Time is a fixed UTC+5:45 offset with no daylight saving. */
const NPT_OFFSET_MINUTES = 345;
const MINUTES_PER_DAY = 1440;
const MS_PER_MINUTE = 60_000;

const withSeconds = new Intl.DateTimeFormat('en-GB', {
	timeZone: 'Asia/Kathmandu',
	hour: '2-digit',
	minute: '2-digit',
	second: '2-digit',
	hourCycle: 'h23',
});
const withoutSeconds = new Intl.DateTimeFormat('en-GB', {
	timeZone: 'Asia/Kathmandu',
	hour: '2-digit',
	minute: '2-digit',
	hourCycle: 'h23',
});

/** Minutes elapsed since midnight in Kathmandu, including the fractional part. */
export function minutesIntoDay(date: Date): number {
	const minutes = date.getTime() / MS_PER_MINUTE + NPT_OFFSET_MINUTES;
	return ((minutes % MINUTES_PER_DAY) + MINUTES_PER_DAY) % MINUTES_PER_DAY;
}

/** The same Kathmandu calendar day as `date`, moved to the given minute of that day. */
export function atMinuteOfDay(date: Date, minutes: number): Date {
	const midnight = date.getTime() - minutesIntoDay(date) * MS_PER_MINUTE;
	return new Date(midnight + minutes * MS_PER_MINUTE);
}

export function formatClock(date: Date, { seconds }: { seconds: boolean }): string {
	return (seconds ? withSeconds : withoutSeconds).format(date);
}

export const MINUTES_IN_DAY = MINUTES_PER_DAY;
