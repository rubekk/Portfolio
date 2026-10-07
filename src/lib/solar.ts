export interface Place {
	latitude: number;
	longitude: number;
}

export interface SunPosition {
	/** Degrees above the horizon. Negative when the sun is below it. */
	elevation: number;
	/** Degrees clockwise from north (90 = east, 180 = south, 270 = west). */
	azimuth: number;
}

export const KATHMANDU: Place = { latitude: 27.7172, longitude: 85.324 };

const rad = (deg: number) => (deg * Math.PI) / 180;
const deg = (radians: number) => (radians * 180) / Math.PI;
const mod = (value: number, divisor: number) => ((value % divisor) + divisor) % divisor;

/**
 * Low-precision solar position (accurate to ~0.01°), after the Astronomical Almanac.
 * More than enough to decide where to draw a shadow.
 */
export function sunPosition(date: Date, place: Place = KATHMANDU): SunPosition {
	const daysSinceJ2000 = date.getTime() / 86_400_000 + 2_440_587.5 - 2_451_545;

	const meanLongitude = mod(280.46 + 0.9856474 * daysSinceJ2000, 360);
	const meanAnomaly = rad(mod(357.528 + 0.9856003 * daysSinceJ2000, 360));
	const eclipticLongitude = rad(
		meanLongitude + 1.915 * Math.sin(meanAnomaly) + 0.02 * Math.sin(2 * meanAnomaly),
	);
	const obliquity = rad(23.439 - 4e-7 * daysSinceJ2000);

	const rightAscension = Math.atan2(
		Math.cos(obliquity) * Math.sin(eclipticLongitude),
		Math.cos(eclipticLongitude),
	);
	const declination = Math.asin(Math.sin(obliquity) * Math.sin(eclipticLongitude));

	const siderealHours = mod(18.697374558 + 24.06570982441908 * daysSinceJ2000, 24);
	const hourAngle = rad(siderealHours * 15 + place.longitude) - rightAscension;

	const latitude = rad(place.latitude);
	const elevation = Math.asin(
		Math.sin(latitude) * Math.sin(declination) +
			Math.cos(latitude) * Math.cos(declination) * Math.cos(hourAngle),
	);
	const azimuth =
		Math.atan2(
			Math.sin(hourAngle),
			Math.cos(hourAngle) * Math.sin(latitude) - Math.tan(declination) * Math.cos(latitude),
		) + Math.PI;

	return { elevation: deg(elevation), azimuth: mod(deg(azimuth), 360) };
}
