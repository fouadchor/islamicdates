// Hijri month-browse page data. Build-time only.
//
// NOTE: the date grid is built by anchoring on h2g(hy,hm,1) (which is reliable)
// and then iterating Gregorian days forward, reading each day's Hijri value from
// the authoritative Intl Umm al-Qura calendar (g2h). This avoids a known
// off-by-one in daysInHMonth(), which over-counts 29-day months by one.
import { g2h, h2g, getOcc, occName, type OccCat } from './hijri';
import { OCCASIONS, occBasePath, occurrencesInGYear, G_YEAR_START, G_YEAR_END } from './occasions';
import { type LangLike, toLang, hMonArr } from './data';

// SEO-friendly English slugs for the twelve Hijri months (index 0 = Muharram).
export const H_MON_SLUG = [
  'muharram', 'safar', 'rabi-al-awwal', 'rabi-al-thani',
  'jumada-al-awwal', 'jumada-al-thani', 'rajab', 'shaban',
  'ramadan', 'shawwal', 'dhul-qadah', 'dhul-hijjah',
];

// Hijri years to generate. 1445–1457 AH spans Gregorian 2024–2035 inclusive.
export const H_YEAR_START = 1445;
export const H_YEAR_END = 1457;

export function hYears(): number[] {
  const a: number[] = [];
  for (let y = H_YEAR_START; y <= H_YEAR_END; y++) a.push(y);
  return a;
}

export function slugToMonth(slug: string): number | null {
  const i = H_MON_SLUG.indexOf(slug);
  return i === -1 ? null : i + 1;
}

export function monthSlug(hm: number): string {
  return H_MON_SLUG[hm - 1];
}

export function monthBasePath(hy: number, hm: number, lang: LangLike): string {
  const l = toLang(lang);
  return l === 'ar' ? `/${hy}/${monthSlug(hm)}/` : l === 'ur' ? `/ur/${hy}/${monthSlug(hm)}/` : `/en/${hy}/${monthSlug(hm)}/`;
}

export function monthName(hm: number, lang: LangLike): string {
  return hMonArr(lang)[hm - 1];
}

export interface MDay {
  hd: number;
  date: Date;        // Gregorian date for this Hijri day
  col: number;       // 0..6, week starting Saturday
  occ: { cat: OccCat; name: string; href: string | null } | null;
}

function occHref(hm: number, hd: number, date: Date, lang: LangLike): string | null {
  const def = OCCASIONS.find(o => o.hm === hm && o.hd === hd);
  if (!def) return null;
  const gy = date.getUTCFullYear();
  for (const y of [gy - 1, gy, gy + 1]) {
    if (y < G_YEAR_START || y > G_YEAR_END) continue;
    if (occurrencesInGYear(def.hm, def.hd, y).some(o => Math.abs(o.date.getTime() - date.getTime()) < 2 * 86400000)) {
      return occBasePath(def.slug, y, lang);
    }
  }
  return null;
}

// Build the full day grid for one Hijri month using the Intl calendar as source of truth.
export function monthGrid(hy: number, hm: number, lang: LangLike): MDay[] {
  let date = h2g(hy, hm, 1); // reliable anchor for the 1st of the month
  const out: MDay[] = [];
  for (let guard = 0; guard < 32; guard++) {
    const h = g2h(date);
    if (h.y !== hy || h.m !== hm) break;
    const col = (date.getUTCDay() + 1) % 7; // Sat=0 .. Fri=6
    const raw = getOcc(hm, h.d);
    let occ: MDay['occ'] = null;
    if (raw) {
      occ = { cat: raw[0], name: occName(raw, lang), href: occHref(hm, h.d, date, lang) };
    }
    out.push({ hd: h.d, date: new Date(date), col, occ });
    date = new Date(date.getTime() + 86400000);
  }
  return out;
}

export function prevMonth(hy: number, hm: number): { hy: number; hm: number } | null {
  let py = hy, pm = hm - 1;
  if (pm < 1) { pm = 12; py--; }
  return py < H_YEAR_START ? null : { hy: py, hm: pm };
}

export function nextMonth(hy: number, hm: number): { hy: number; hm: number } | null {
  let ny = hy, nm = hm + 1;
  if (nm > 12) { nm = 1; ny++; }
  return ny > H_YEAR_END ? null : { hy: ny, hm: nm };
}
