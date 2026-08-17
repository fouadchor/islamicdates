// Ramadan imsākiyya: the day-by-day suhūr/ifṭār timetable for one city.
//
// Everything here is pure and runs at build time, so the whole table ships inside
// the HTML rather than being assembled by client JavaScript — that is the point of
// the page, since a timetable a crawler cannot read is a timetable that never ranks.

import { computePrayerTimes, type MethodId, type PrayerOptions } from './prayer';
import { zoneOffsetHours } from './qibla';
import { h2g, g2h, daysInHMonth, todayUTC } from './hijri';
import { type PtCity, cityMethod } from './cities';

export const RAMADAN = 9;

/**
 * The Hijri year whose Ramadan this page should show: the current one while it is
 * still running, otherwise the next. Rolling over on the last day of Ramadan rather
 * than the first of Shawwāl keeps the table useful right through ʿĪd eve.
 */
export function activeRamadanYear(today: Date = todayUTC()): number {
  const h = g2h(today);
  if (h.m < RAMADAN) return h.y;              // before Ramadan this year
  if (h.m === RAMADAN) return h.y;            // in it
  return h.y + 1;                             // Shawwāl onwards → next year's
}

export interface ImsakRow {
  /** Day of Ramadan, 1-based. */
  day: number;
  /** Gregorian date this Ramadan day falls on. */
  date: Date;
  /** Fractional hours, local to the city, as produced by computePrayerTimes. */
  fajr: number;
  maghrib: number;
  /** Length of the fast in whole minutes (maghrib − fajr). */
  fastMinutes: number;
  /** True when this row is today in the city's own timezone. */
  isToday: boolean;
}

export interface Imsakiyah {
  hijriYear: number;
  /** 29 or 30 — Ramadan is not a fixed length. */
  days: number;
  method: MethodId;
  rows: ImsakRow[];
  /** First and last Gregorian dates, for the page's date range line. */
  start: Date;
  end: Date;
  /** Shortest and longest fasting day, which is genuinely useful and unique to a city. */
  shortest: ImsakRow;
  longest: ImsakRow;
}

/**
 * Builds the timetable for one city. The UTC offset is resolved per row rather than
 * once per month: Ramadan drifts ~11 days earlier each year, so it will regularly
 * straddle a daylight-saving change, and a single offset would silently shift every
 * row after the transition by an hour.
 */
export function buildImsakiyah(city: PtCity, hijriYear: number, today: Date = todayUTC()): Imsakiyah {
  const method = cityMethod(city);
  const opts: PrayerOptions = { method, asr: 'Standard', highLat: 'NightMiddle' };
  const days = daysInHMonth(hijriYear, RAMADAN);

  // "Today" as the city sees it, so a user in Jakarta and one in Casablanca each get
  // their own row highlighted rather than whatever the build server thought the date was.
  const todayKey = ymdInZone(today, city.zone);

  const rows: ImsakRow[] = [];
  for (let day = 1; day <= days; day++) {
    const date = h2g(hijriYear, RAMADAN, day);
    const offset = zoneOffsetHours(city.zone, date);
    const t = computePrayerTimes(date, city.lat, city.lng, offset, opts);
    rows.push({
      day,
      date,
      fajr: t.fajr,
      maghrib: t.maghrib,
      fastMinutes: Math.round((t.maghrib - t.fajr) * 60),
      isToday: isoUTCDate(date) === todayKey,
    });
  }

  const byLength = [...rows].sort((a, b) => a.fastMinutes - b.fastMinutes);
  return {
    hijriYear, days, method, rows,
    start: rows[0].date,
    end: rows[rows.length - 1].date,
    shortest: byLength[0],
    longest: byLength[byLength.length - 1],
  };
}

/** YYYY-MM-DD of a UTC-anchored date, matching how h2g returns its dates. */
export const isoUTCDate = (d: Date): string => d.toISOString().slice(0, 10);

/** YYYY-MM-DD of an instant as observed in a given IANA zone. */
export function ymdInZone(instant: Date, zone: string): string {
  try {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: zone, year: 'numeric', month: '2-digit', day: '2-digit',
    }).format(instant);
  } catch {
    return isoUTCDate(instant);
  }
}

/** "15h 32m" / "١٥ س ٣٢ د" — fast length, formatted per language. */
export function fmtDuration(minutes: number, lang: 'ar' | 'en' | 'ur'): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (lang === 'en') return `${h}h ${String(m).padStart(2, '0')}m`;
  if (lang === 'ur') return `${h} گھنٹے ${m} منٹ`;
  return `${h} س ${m} د`;
}

// ---- URL helpers -------------------------------------------------------------
export type ImsakLang = 'ar' | 'en' | 'ur';
export const imsakBase = (lang: ImsakLang) => lang === 'ar' ? '/imsakiyah/' : `/${lang}/imsakiyah/`;
export const imsakCountryPath = (countrySlug: string, lang: ImsakLang) => `${imsakBase(lang)}${countrySlug}/`;
export const imsakCityPath = (countrySlug: string, citySlug: string, lang: ImsakLang) =>
  `${imsakBase(lang)}${countrySlug}/${citySlug}/`;
