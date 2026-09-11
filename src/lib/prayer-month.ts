// Monthly prayer timetable for one city, computed at build time.
//
// The city pages already showed this table, but only inside CityPrayerIsland,
// which returns an empty placeholder until it mounts — so the server HTML
// carried no table at all, and the page's own meta description promised "a full
// monthly timetable" that a crawler never saw. src/lib/imsakiyah.ts states the
// principle for the Ramadan pages: a timetable a crawler cannot read is a
// timetable that never ranks. This is the same computation for the ordinary
// Gregorian month, so the city pages can follow it too.
//
// Everything here is pure, exactly like buildImsakiyah, so it runs at build time
// and the rows ship inside the HTML.

import { computePrayerTimes, type MethodId, type PrayerOptions } from './prayer';
import { zoneOffsetHours } from './qibla';
import { g2h } from './hijri';
import { type PtCity, cityMethod } from './cities';
import { ymdInZone } from './imsakiyah';

export interface PrayerMonthRow {
  /** Day of the Gregorian month, 1-based. */
  day: number;
  date: Date;
  /** Fractional hours, local to the city, as produced by computePrayerTimes. */
  fajr: number;
  sunrise: number;
  dhuhr: number;
  asr: number;
  maghrib: number;
  isha: number;
  /** Hijri day and month index for the date column. */
  hd: number;
  hm: number;
  /** True when this row is today in the city's own timezone. */
  isToday: boolean;
}

export interface PrayerMonth {
  year: number;
  /** 0-based, matching Date#getMonth. */
  month: number;
  method: MethodId;
  rows: PrayerMonthRow[];
}

/**
 * Builds the timetable for one city for the Gregorian month containing `today`
 * in that city's own timezone.
 *
 * The UTC offset is resolved per row rather than once per month, so a month that
 * straddles a daylight-saving change does not silently shift every row after the
 * transition by an hour — the same reason buildImsakiyah does it that way.
 */
export function buildPrayerMonth(city: PtCity, today: Date = new Date()): PrayerMonth {
  const method = cityMethod(city);
  const opts: PrayerOptions = { method, asr: 'Standard', highLat: 'NightMiddle' };

  // Anchor the month on the city's own date, not the build server's.
  const key = ymdInZone(today, city.zone);
  const [cy, cm] = key.split('-').map(Number);
  const year = cy;
  const month = cm - 1;
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();

  const rows: PrayerMonthRow[] = [];
  for (let day = 1; day <= daysInMonth; day++) {
    // Local (not UTC) date: computePrayerTimes reads Y/M/D off the local fields.
    const date = new Date(year, month, day);
    const offset = zoneOffsetHours(city.zone, date);
    const t = computePrayerTimes(date, city.lat, city.lng, offset, opts);
    const h = g2h(new Date(Date.UTC(year, month, day)));
    rows.push({
      day, date,
      fajr: t.fajr, sunrise: t.sunrise, dhuhr: t.dhuhr,
      asr: t.asr, maghrib: t.maghrib, isha: t.isha,
      hd: h.d, hm: h.m,
      isToday: `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` === key,
    });
  }

  return { year, month, method, rows };
}

/** Fractional hours → "HH:MM", the format the static table renders. */
export function hhmm(t: number): string {
  if (!isFinite(t)) return '—';
  let m = Math.round(t * 60);
  m = ((m % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
}
