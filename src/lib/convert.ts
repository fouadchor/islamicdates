// Shareable Hijri→Gregorian converter page helpers. Build-time only.
import { g2h, h2g, todayUTC } from './hijri';
import { type LangLike, toLang, hMonArr, gMonArr, wdArr, hijriEra } from './data';
import { OCCASIONS } from './occasions';

// Years to generate converter pages for (AH 1445–1450, ~2024–2029)
export const CONV_HY_START = 1445;
export const CONV_HY_END   = 1450;

export function convYears(): number[] {
  const a: number[] = [];
  for (let y = CONV_HY_START; y <= CONV_HY_END; y++) a.push(y);
  return a;
}

// ---- Index curation -----------------------------------------------------------
// Second pass. The first attempt indexed every converter date within one Hijri
// year of today; Search Console's "Crawled - currently not indexed" bucket grew
// from 1,220 to 3,927 under it, so the window was not the binding constraint —
// near-duplication was. Measured over the 90 days to 2026-09-17:
//
//   group          pages  impressions  clicks   CTR
//   event pages      119       14,430      31   0.21%
//   convert          766        5,731      10   0.17%
//   hijri month      103        2,482       8   0.32%
//
// 766 converter pages earned ten clicks between them, and adjacent pages share
// 96% of their words (only the date differs in ~700 words of template). They are
// worth keeping live and internally linked — a visitor who lands on one is served
// — but as a body of indexable documents they are ballast that Google reads as a
// site-wide quality signal.
//
// So indexability is no longer a window around today. A converter page is indexed
// only when a distinct query plausibly exists for that exact date:
//   1. the 1st of a Hijri month ("1 Ramadan 1448 in Gregorian"), or
//   2. the date of a named Islamic occasion,
// and in both cases only within CONV_INDEX_SPAN Hijri years of today, since
// nobody searches the Gregorian equivalent of a date six years out.
//
// Everything else ships <meta robots="noindex,follow"> and is filtered out of the
// sitemap (see astro.config.mjs). Widen CONV_INDEX_SPAN or relax the day test here
// if Search Console later shows converter pages earning clicks rather than bare
// impressions — that is the signal this trade is tuned against.
export const CONV_INDEX_SPAN = 1;

const OCC_DAY_KEYS = new Set(OCCASIONS.map(o => `${o.hm}-${o.hd}`));

/** Hijri year of "today", used as the centre of the indexable window. */
export function currentHy(): number {
  return g2h(todayUTC()).y;
}

export function convIsIndexable(hy: number, hm: number, hd: number, curHy = currentHy()): boolean {
  if (Math.abs(hy - curHy) > CONV_INDEX_SPAN) return false;
  if (hd === 1) return true;
  return OCC_DAY_KEYS.has(`${hm}-${hd}`);
}

/** Return slug string for a Hijri date, e.g. "1448-9-1" */
export function convSlug(hy: number, hm: number, hd: number): string {
  return `${hy}-${hm}-${hd}`;
}

/** Parse slug back to { hy, hm, hd }, returns null if invalid */
export function parseSlug(slug: string): { hy: number; hm: number; hd: number } | null {
  const parts = slug.split('-');
  if (parts.length !== 3) return null;
  const [hy, hm, hd] = parts.map(Number);
  if (!hy || !hm || !hd || hm < 1 || hm > 12 || hd < 1 || hd > 30) return null;
  // Verify round-trip: h2g then g2h must give back same date
  const gDate = h2g(hy, hm, hd);
  const back = g2h(gDate);
  if (back.y !== hy || back.m !== hm || back.d !== hd) return null;
  return { hy, hm, hd };
}

/** Canonical paths */
export function convBasePath(hy: number, hm: number, hd: number, lang: LangLike): string {
  const l = toLang(lang);
  const s = convSlug(hy, hm, hd);
  return l === 'ar' ? `/convert/${s}/` : l === 'ur' ? `/ur/convert/${s}/` : `/en/convert/${s}/`;
}

/** All valid Hijri day numbers for a given (hy, hm) per Umm al-Qura */
export function validDaysInMonth(hy: number, hm: number): number[] {
  let date = h2g(hy, hm, 1);
  const days: number[] = [];
  for (let guard = 0; guard < 32; guard++) {
    const h = g2h(date);
    if (h.y !== hy || h.m !== hm) break;
    days.push(h.d);
    date = new Date(date.getTime() + 86400000);
  }
  return days;
}

/** Human-readable Hijri date */
export function fmtHijri(hy: number, hm: number, hd: number, lang: LangLike): string {
  const mon = hMonArr(lang)[hm - 1];
  return `${hd} ${mon} ${hy} ${hijriEra(lang)}`;
}

/** Human-readable Gregorian date */
export function fmtGregorian(d: Date, lang: LangLike): string {
  const l = toLang(lang);
  const wd  = wdArr(l)[d.getUTCDay()];
  const mon = gMonArr(l)[d.getUTCMonth()];
  return l === 'en'
    ? `${wd}, ${d.getUTCDate()} ${mon} ${d.getUTCFullYear()}`
    : `${wd}، ${d.getUTCDate()} ${mon} ${d.getUTCFullYear()}`;
}

export function fmtGregorianShort(d: Date, lang: LangLike): string {
  const mon = gMonArr(lang)[d.getUTCMonth()];
  return `${d.getUTCDate()} ${mon} ${d.getUTCFullYear()}`;
}

export function isoDate(d: Date): string {
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth()+1).padStart(2,'0')}-${String(d.getUTCDate()).padStart(2,'0')}`;
}

export function monthName(hm: number, lang: LangLike): string {
  return hMonArr(lang)[hm - 1];
}
