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
  return d2;
}

export function daysInHMonth(hy: number, hm: number): number {
  const a = h2g(hy, hm, 1);
  let ny = hy, nm = hm + 1;
  if (nm > 12) { nm = 1; ny++; }
  return Math.round((h2g(ny, nm, 1).getTime() - a.getTime()) / 86400000);
}

export type OccCat = 'eid' | 'holy' | 'fast';
export type Occ = [OccCat, string, string];

const OCC: Record<string, Occ> = {
  '1-1':  ['holy', 'رأس السنة الهجرية', 'Islamic New Year'],
  '1-10': ['holy', 'عاشوراء', 'Ashura'],
  '3-12': ['holy', 'المولد النبوي الشريف', 'Mawlid al-Nabi'],
  '7-27': ['holy', 'الإسراء والمعراج', 'Isra & Miʿraj'],
  '8-15': ['holy', 'ليلة النصف من شعبان', 'Mid-Shaʿban'],
  '9-1':  ['fast', 'أول رمضان', 'First of Ramadan'],
  '9-27': ['holy', 'ليلة القدر', 'Laylat al-Qadr'],
  '10-1': ['eid',  'عيد الفطر', 'Eid al-Fitr'],
  '12-9': ['holy', 'يوم عرفة', 'Day of Arafah'],
  '12-10':['eid',  'عيد الأضحى', 'Eid al-Adha'],
};

export function getOcc(hm: number, hd: number): Occ | null {
  return OCC[`${hm}-${hd}`] ?? null;
}

export function dotColor(cat: OccCat): string {
  return cat === 'eid' ? 'var(--gold)' : cat === 'holy' ? 'var(--holy)' : 'var(--accent)';
}

export function todayUTC(): Date {
  const n = new Date();
  return new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()));
}

export function toInputVal(d: Date): string {
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth()+1).padStart(2,'0')}-${String(d.getUTCDate()).padStart(2,'0')}`;
}
