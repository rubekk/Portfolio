import { KATHMANDU, sunPosition, type Place } from './solar';
import { atMinuteOfDay, MINUTES_IN_DAY } from './time';

export interface DaylightHours {
	/** Minutes after local midnight. */
	sunrise: number;
	sunset: number;
}

/** The sun's upper edge touches the horizon at this elevation, allowing for refraction. */
const HORIZON_ELEVATION = -0.833;

/** Sunrise and sunset on the Kathmandu day containing `date`, to the nearest minute. */
export function daylightHours(date: Date, place: Place = KATHMANDU): DaylightHours | null {
	let sunrise: number | null = null;
	let sunset: number | null = null;
	let wasUp = sunPosition(atMinuteOfDay(date, 0), place).elevation > HORIZON_ELEVATION;

	for (let minute = 1; minute <= MINUTES_IN_DAY; minute++) {
		const isUp = sunPosition(atMinuteOfDay(date, minute), place).elevation > HORIZON_ELEVATION;
		if (isUp && !wasUp) sunrise = minute;
		if (!isUp && wasUp) sunset = minute;
		wasUp = isUp;
	}

	return sunrise !== null && sunset !== null ? { sunrise, sunset } : null;
}
