// Sunnah fasting days helpers — build-time only.
// White days (13–14–15 of each Hijri month), annual fasts, and forbidden days,
// all computed from the Umm al-Qura tables in ./hijri.
import { h2g, g2h, daysInHMonth, todayUTC } from './hijri';
import { type LangLike, toLang, pick, hMonArr, gMonArr, wdArr, hijriEra } from './data';

export interface WhiteDaysRow {
  hm: number;          // hijri month 1–12
  monthName: string;   // localised hijri month name
  g13: Date;           // Gregorian date of 13th
  g15: Date;           // Gregorian date of 15th
}

/** The current Hijri year at build time. */
export function currentHY(): number {
  return g2h(todayUTC()).y;
}

/** White days (13–15) of every month of a Hijri year, with Gregorian dates. */
export function whiteDaysForYear(hy: number, lang: LangLike): WhiteDaysRow[] {
  const mon = hMonArr(lang);
  return Array.from({ length: 12 }, (_, i) => ({
    hm: i + 1,
    monthName: mon[i],
    g13: h2g(hy, i + 1, 13),
    g15: h2g(hy, i + 1, 15),
  }));
}

/** "الأربعاء 29 يوليو 2026" / "Wednesday, 29 July 2026" / Urdu equivalent */
export function fmtGDay(d: Date, lang: LangLike): string {
  const l = toLang(lang);
  const sep = l === 'en' ? ', ' : '، ';
  return `${wdArr(lang)[d.getUTCDay()]}${sep}${d.getUTCDate()} ${gMonArr(lang)[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

/** Short "29 يوليو" / "29 July" (no year) */
export function fmtGShortNoYear(d: Date, lang: LangLike): string {
  return `${d.getUTCDate()} ${gMonArr(lang)[d.getUTCMonth()]}`;
}

/** Compact white-days span: "29 – 31 يوليو 2026" or "31 ديسمبر 2026 – 2 يناير 2027" */
export function fmtSpan(a: Date, b: Date, lang: LangLike): string {
  const gm = gMonArr(lang);
  const sameMonth = a.getUTCMonth() === b.getUTCMonth() && a.getUTCFullYear() === b.getUTCFullYear();
  const sameYear = a.getUTCFullYear() === b.getUTCFullYear();
  if (sameMonth) return `${a.getUTCDate()} – ${b.getUTCDate()} ${gm[a.getUTCMonth()]} ${a.getUTCFullYear()}`;
  if (sameYear)  return `${a.getUTCDate()} ${gm[a.getUTCMonth()]} – ${b.getUTCDate()} ${gm[b.getUTCMonth()]} ${a.getUTCFullYear()}`;
  return `${a.getUTCDate()} ${gm[a.getUTCMonth()]} ${a.getUTCFullYear()} – ${b.getUTCDate()} ${gm[b.getUTCMonth()]} ${b.getUTCFullYear()}`;
}

/** ISO yyyy-mm-dd (UTC) for data attributes / schema. */
export function isoDate(d: Date): string {
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
}

export interface AnnualFast {
  key: string;
  hijriLabel: string;   // localised hijri description, e.g. "9 ذو الحجة"
  date: Date;           // Gregorian date (first day if a range)
  dateEnd?: Date;       // optional range end
}

/** Key annual fasting dates for a Hijri year. */
export function annualFasts(hy: number, lang: LangLike) {
  const era = hijriEra(lang);
  const mon = hMonArr(lang);
  const lbl = (hd: number, hm: number) => `${hd} ${mon[hm - 1]} ${hy} ${era}`;
  return {
    tasua:   { hijriLabel: lbl(9, 1),  date: h2g(hy, 1, 9)  },
    ashura:  { hijriLabel: lbl(10, 1), date: h2g(hy, 1, 10) },
    arafah:  { hijriLabel: lbl(9, 12), date: h2g(hy, 12, 9) },
    shawwalStart: { hijriLabel: lbl(2, 10), date: h2g(hy, 10, 2) },
    shawwalEnd:   { hijriLabel: lbl(daysInHMonth(hy, 10), 10), date: h2g(hy, 10, daysInHMonth(hy, 10)) },
  };
}

/** Days on which fasting is forbidden, for a Hijri year. */
export function forbiddenDays(hy: number, lang: LangLike) {
  const era = hijriEra(lang);
  const mon = hMonArr(lang);
  return {
    eidFitr:  { hijriLabel: `1 ${mon[9]} ${hy} ${era}`,      date: h2g(hy, 10, 1) },
    eidAdha:  { hijriLabel: `10 ${mon[11]} ${hy} ${era}`,    date: h2g(hy, 12, 10) },
    tashreeq: { hijriLabel: `11–13 ${mon[11]} ${hy} ${era}`, date: h2g(hy, 12, 11), dateEnd: h2g(hy, 12, 13) },
  };
}

/** Canonical paths for the fasting page. */
export function fastingBasePath(lang: LangLike): string {
  const l = toLang(lang);
  return l === 'ar' ? '/fasting/' : l === 'ur' ? '/ur/fasting/' : '/en/fasting/';
}
