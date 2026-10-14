// Hijri calendar utilities — all dates in UTC to avoid timezone off-by-one

const hfmt = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', {
  day: 'numeric', month: 'numeric', year: 'numeric', timeZone: 'UTC',
});

export interface HDate { y: number; m: number; d: number }

export function g2h(date: Date): HDate {
  const parts = hfmt.formatToParts(date);
  let y = 0, m = 0, d = 0;
  for (const p of parts) {
    if (p.type === 'year') y = +p.value;
    else if (p.type === 'month') m = +p.value;
    else if (p.type === 'day') d = +p.value;
  }
  return { y, m, d };
}

export function h2g(hy: number, hm: number, hd: number): Date {
  const ord = (y: number, m: number, d: number) => y * 354.367 + (m - 1) * 29.53 + d;
  let d2 = new Date(
    Date.UTC(622, 6, 19) +
    Math.round(((hy - 1) * 354.367 + (hm - 1) * 29.53 + (hd - 1)) * 86400000)
  );
  for (let i = 0; i < 12; i++) {
    const h = g2h(d2);
    const diff = ord(hy, hm, hd) - ord(h.y, h.m, h.d);
    if (Math.abs(diff) < 1) break;
    d2 = new Date(d2.getTime() + Math.round(diff) * 86400000);
  }
  for (let i = 0; i < 90; i++) {
    const h = g2h(d2);
    const cur = h.y * 10000 + h.m * 100 + h.d;
    const tgt = hy * 10000 + hm * 100 + hd;
    if (cur === tgt) break;
    d2 = new Date(d2.getTime() + (cur < tgt ? 86400000 : -86400000));
  }
  // Normalize to exact UTC midnight: the seed estimate carries a fractional
  // time-of-day that survives the whole-day refinement steps, which would make
  // date subtractions (e.g. daysInHMonth) round to the wrong day count.
  return new Date(Date.UTC(d2.getUTCFullYear(), d2.getUTCMonth(), d2.getUTCDate()));
}

// ── Historical dates ────────────────────────────────────────────────────────
// The Umm al-Qura table in CLDR/ICU starts at 1 Muharram 1300 AH (12 Nov 1882).
// For earlier dates the same `islamic-umalqura` formatter falls back to the
// arithmetical (tabular, "civil") Islamic calendar with the Friday epoch —
// 1 Muharram 1 AH = 16 July 622 Julian — which is what historical reference
// converters use. g2h/h2g above therefore already cover 1 AH onward; these
// helpers add the Western side: dates before 15 October 1582 are shown in the
// Julian calendar, as historical sources record them.

/** First Hijri year covered by the Umm al-Qura table; earlier years are tabular. */
export const UQ_FIRST_YEAR = 1300;
/** First day of the Gregorian calendar (15 Oct 1582). */
export const GREGORIAN_START_MS = Date.UTC(1582, 9, 15);

const DAY_MS = 86400000;
const UNIX_EPOCH_JDN = 2440588; // Julian Day Number of 1970-01-01

const jdnOf = (d: Date) => Math.floor(d.getTime() / DAY_MS) + UNIX_EPOCH_JDN;
const dateOfJdn = (jdn: number) => new Date((jdn - UNIX_EPOCH_JDN) * DAY_MS);

/** Julian-calendar Y/M/D for a UTC-midnight date. */
export function toJulian(date: Date): HDate {
  const c = jdnOf(date) + 32082;
  const d = Math.floor((4 * c + 3) / 1461);
  const e = c - Math.floor((1461 * d) / 4);
  const m = Math.floor((5 * e + 2) / 153);
  return {
    d: e - Math.floor((153 * m + 2) / 5) + 1,
    m: m + 3 - 12 * Math.floor(m / 10),
    y: d - 4800 + Math.floor(m / 10),
  };
}

/** UTC-midnight date for a Julian-calendar Y/M/D. */
export function fromJulian(y: number, m: number, d: number): Date {
  const a = Math.floor((14 - m) / 12);
  const yy = y + 4800 - a;
  const mm = m + 12 * a - 3;
  return dateOfJdn(d + Math.floor((153 * mm + 2) / 5) + 365 * yy + Math.floor(yy / 4) - 32083);
}

/** True for instants before the Gregorian reform (shown in the Julian calendar). */
export const isJulianEra = (date: Date) => date.getTime() < GREGORIAN_START_MS;

/** A "Western" Y/M/D (Julian before 15 Oct 1582, Gregorian from then on) is in the Julian era. */
export const westernIsJulian = (y: number, m: number, d: number) =>
  y < 1582 || (y === 1582 && (m < 10 || (m === 10 && d < 15)));

/** UTC-midnight date for a Western Y/M/D, read as Julian before the reform. */
export function fromWestern(y: number, m: number, d: number): Date {
  return westernIsJulian(y, m, d) ? fromJulian(y, m, d) : new Date(Date.UTC(y, m - 1, d));
}

/** Western Y/M/D for a date: Julian before the reform, Gregorian after. */
export function toWestern(date: Date): HDate {
  return isJulianEra(date)
    ? toJulian(date)
    : { y: date.getUTCFullYear(), m: date.getUTCMonth() + 1, d: date.getUTCDate() };
}

/** Days in a Western month (Julian leap rule before 1582). */
export function westernDaysInMonth(y: number, m: number): number {
  if (m === 2 && (y < 1582)) return y % 4 === 0 ? 29 : 28;
  return new Date(Date.UTC(y, m, 0)).getUTCDate();
}

/** True when this Hijri year is computed with the tabular calendar. */
export const isTabularYear = (hy: number) => hy < UQ_FIRST_YEAR;

export function daysInHMonth(hy: number, hm: number): number {
  const a = h2g(hy, hm, 1);
  let ny = hy, nm = hm + 1;
  if (nm > 12) { nm = 1; ny++; }
  return Math.round((h2g(ny, nm, 1).getTime() - a.getTime()) / 86400000);
}

export type OccCat = 'eid' | 'holy' | 'fast';
// [category, arabic name, english name, urdu name]
export type Occ = [OccCat, string, string, string];

const OCC: Record<string, Occ> = {
  '1-1':  ['holy', 'رأس السنة الهجرية', 'Islamic New Year', 'نیا ہجری سال'],
  '1-10': ['holy', 'عاشوراء', 'Ashura', 'عاشورا'],
  '3-12': ['holy', 'المولد النبوي الشريف', 'Mawlid al-Nabi', 'میلاد النبی ﷺ'],
  '7-27': ['holy', 'الإسراء والمعراج', 'Isra & Miʿraj', 'شبِ معراج'],
  '8-15': ['holy', 'ليلة النصف من شعبان', 'Mid-Shaʿban', 'شبِ برات'],
  '9-1':  ['fast', 'أول رمضان', 'First of Ramadan', 'یکم رمضان'],
  '9-27': ['holy', 'ليلة القدر', 'Laylat al-Qadr', 'شبِ قدر'],
  '10-1': ['eid',  'عيد الفطر', 'Eid al-Fitr', 'عید الفطر'],
  '12-9': ['holy', 'يوم عرفة', 'Day of Arafah', 'یومِ عرفہ'],
  '12-10':['eid',  'عيد الأضحى', 'Eid al-Adha', 'عید الاضحیٰ'],
};

export function getOcc(hm: number, hd: number): Occ | null {
  return OCC[`${hm}-${hd}`] ?? null;
}

// Pick the localized occasion name from an Occ tuple.
import type { LangLike } from './data';
import { pick } from './data';
export function occName(occ: Occ, lang: LangLike): string {
  return pick(lang, occ[1], occ[2], occ[3]);
}

export function dotColor(cat: OccCat): string {
  return cat === 'eid' ? 'var(--gold)' : cat === 'holy' ? 'var(--holy)' : 'var(--accent)';
}

// Civil (Y/M/D) date within a given IANA timezone, represented as a UTC-midnight
// Date so that all downstream getUTC* formatting stays consistent.
function civilDateInTZ(instant: Date, timeZone: string): Date {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone, year: 'numeric', month: 'numeric', day: 'numeric',
  }).formatToParts(instant);
  let y = 0, m = 0, d = 0;
  for (const p of parts) {
    if (p.type === 'year') y = +p.value;
    else if (p.type === 'month') m = +p.value;
    else if (p.type === 'day') d = +p.value;
  }
  return new Date(Date.UTC(y, m - 1, d));
}

// "Today" reference.
//  - On the CLIENT we use the visitor's own local timezone, so the displayed
//    date always matches where they actually are.
//  - On the SERVER (SSR, evaluated at request time) there is no visitor
//    timezone, so we anchor the initial HTML to Asia/Riyadh, the official
//    Umm al-Qura reference. This keeps the crawler / first-paint snapshot
//    canonical and, above all, always current (never frozen at build time).
//    The client re-renders to the visitor's local date on hydration.
export function todayUTC(): Date {
  const now = new Date();
  if (typeof window === 'undefined') {
    return civilDateInTZ(now, 'Asia/Riyadh');
  }
  return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
}

export function toInputVal(d: Date): string {
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth()+1).padStart(2,'0')}-${String(d.getUTCDate()).padStart(2,'0')}`;
}
