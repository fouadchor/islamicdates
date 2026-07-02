// Qibla direction & distance to the Kaaba (Masjid al-Haram, Makkah).
const KAABA_LAT = 21.4225;
const KAABA_LNG = 39.8262;

const dtr = (d: number) => (d * Math.PI) / 180;
const rtd = (r: number) => (r * 180) / Math.PI;

/** Great-circle initial bearing from (lat,lng) to the Kaaba, degrees from true north (0–360). */
export function qiblaBearing(lat: number, lng: number): number {
  const phi = dtr(lat), phiK = dtr(KAABA_LAT);
  const dL = dtr(KAABA_LNG - lng);
  const b = rtd(Math.atan2(Math.sin(dL), Math.cos(phi) * Math.tan(phiK) - Math.sin(phi) * Math.cos(dL)));
  return (b + 360) % 360;
}

/** Great-circle distance to the Kaaba in kilometres (haversine). */
export function qiblaDistanceKm(lat: number, lng: number): number {
  const R = 6371;
  const dPhi = dtr(KAABA_LAT - lat);
  const dL = dtr(KAABA_LNG - lng);
  const a = Math.sin(dPhi / 2) ** 2 + Math.cos(dtr(lat)) * Math.cos(dtr(KAABA_LAT)) * Math.sin(dL / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

/** UTC offset (hours, incl. DST) of an IANA timezone at a given instant. */
export function zoneOffsetHours(zone: string, date: Date): number {
  try {
    const local = new Date(date.toLocaleString('en-US', { timeZone: zone }));
    const utc = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
    return Math.round(((local.getTime() - utc.getTime()) / 3600000) * 100) / 100;
  } catch {
    return -date.getTimezoneOffset() / 60;
  }
}

/** Compass point label for a bearing, in ar/en/ur. */
const POINTS = [
  { ar: 'الشمال', en: 'N', ur: 'شمال' }, { ar: 'الشمال الشرقي', en: 'NE', ur: 'شمال مشرق' },
  { ar: 'الشرق', en: 'E', ur: 'مشرق' }, { ar: 'الجنوب الشرقي', en: 'SE', ur: 'جنوب مشرق' },
  { ar: 'الجنوب', en: 'S', ur: 'جنوب' }, { ar: 'الجنوب الغربي', en: 'SW', ur: 'جنوب مغرب' },
  { ar: 'الغرب', en: 'W', ur: 'مغرب' }, { ar: 'الشمال الغربي', en: 'NW', ur: 'شمال مغرب' },
];
export function compassPoint(bearing: number): { ar: string; en: string; ur: string } {
  return POINTS[Math.round(((bearing % 360) / 45)) % 8];
}
