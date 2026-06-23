// Shareable Hijri→Gregorian converter page helpers. Build-time only.
import { g2h, h2g } from './hijri';
import { H_MON_AR, H_MON_EN, G_MON_AR, G_MON_EN, WD_AR, WD_EN } from './data';

// Years to generate converter pages for (AH 1445–1450, ~2024–2029)
export const CONV_HY_START = 1445;
export const CONV_HY_END   = 1450;

export function convYears(): number[] {
  const a: number[] = [];
  for (let y = CONV_HY_START; y <= CONV_HY_END; y++) a.push(y);
  return a;
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
  const gDate = h2g(hy, hm, hd);
  const back = g2h(gDate);
  if (back.y !== hy || back.m !== hm || back.d !== hd) return null;
  return { hy, hm, hd };
}

/** Canonical paths */
export function convBasePath(hy: number, hm: number, hd: number, ar: boolean): string {
  return ar ? `/convert/${convSlug(hy, hm, hd)}/` : `/en/convert/${convSlug(hy, hm, hd)}/`;
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
export function fmtHijri(hy: number, hm: number, hd: number, ar: boolean): string {
  const mon = (ar ? H_MON_AR : H_MON_EN)[hm - 1];
  return ar ? `${hd} ${mon} ${hy} هـ` : `${hd} ${mon} ${hy} AH`;
}

/** Human-readable Gregorian date */
export function fmtGregorian(d: Date, ar: boolean): string {
  const wd  = (ar ? WD_AR : WD_EN)[d.getUTCDay()];
  const mon = (ar ? G_MON_AR : G_MON_EN)[d.getUTCMonth()];
  return ar
    ? `${wd}، ${d.getUTCDate()} ${mon} ${d.getUTCFullYear()}`
    : `${wd}, ${d.getUTCDate()} ${mon} ${d.getUTCFullYear()}`;
}

export function fmtGregorianShort(d: Date, ar: boolean): string {
  const mon = (ar ? G_MON_AR : G_MON_EN)[d.getUTCMonth()];
  return ar ? `${d.getUTCDate()} ${mon} ${d.getUTCFullYear()}` : `${d.getUTCDate()} ${mon} ${d.getUTCFullYear()}`;
}

export function isoDate(d: Date): string {
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth()+1).padStart(2,'0')}-${String(d.getUTCDate()).padStart(2,'0')}`;
}

export function monthName(hm: number, ar: boolean): string {
  return (ar ? H_MON_AR : H_MON_EN)[hm - 1];
}
