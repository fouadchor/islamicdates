// Moon phase geometry, derived from the Hijri day of the month.
//
// An Umm al-Qura month begins right after conjunction, so the day number is
// already a good proxy for the Moon's age: day 1 is a thin waxing crescent,
// ~day 15 is full, day 29 is a thin waning crescent. That means the phase costs
// nothing to compute — no ephemeris, no network, no client-side work. The shape
// is emitted as a single SVG path so it renders inside the existing markup.

/** Mean synodic month (new moon → new moon), in days. */
export const SYNODIC = 29.53058867;

/** Phase fraction in [0,1): 0 = new, 0.25 = first quarter, 0.5 = full, 0.75 = last quarter. */
export function moonPhase(hijriDay: number): number {
  // −0.5 centres each day on its midpoint rather than its start, so day 1 reads
  // as a young crescent instead of a (never-visible) exact new moon.
  const p = (hijriDay - 0.5) / SYNODIC;
  return ((p % 1) + 1) % 1;
}

/** Illuminated fraction of the disc, 0 (new) → 1 (full). */
export function moonIllumination(phase: number): number {
  return (1 - Math.cos(2 * Math.PI * phase)) / 2;
}

/**
 * SVG path for the lit region of a moon of radius `r` centred on (0,0).
 *
 * The terminator is a half-ellipse whose x-radius is r·cos(2πp): it starts at
 * the right limb (new), flattens to a straight line (first quarter), then bows
 * out to the left limb (full). Waning phases are the mirror image of the
 * matching waxing phase, so the caller flips the path on x instead of us
 * duplicating the maths.
 */
export function moonLitPath(phase: number, r: number): { d: string; mirrored: boolean } {
  const mirrored = phase > 0.5;
  const q = mirrored ? 1 - phase : phase;      // fold onto the waxing half
  // True illumination on days 1 and 29–30 is well under 1%, which renders as an
  // invisible dark disc at badge size. Cap the terminator short of the limb so a
  // hairline crescent always survives — the shape stays readable as a moon.
  const MAX = 0.88;
  const a = r * clamp(Math.cos(2 * Math.PI * q), -MAX, MAX);
  const rx = Math.abs(round(a));
  // Terminator runs bottom→top; it passes right of centre while a > 0 (crescent)
  // and left of centre once a < 0 (gibbous), which flips the arc's sweep.
  const sweep = a > 0 ? 0 : 1;
  const R = round(r);
  const d = `M0,${-R}A${R},${R} 0 0,1 0,${R}A${rx},${R} 0 0,${sweep} 0,${-R}Z`;
  return { d, mirrored };
}

const round = (n: number) => Math.round(n * 100) / 100;
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

/** Localised name of the phase, for the accessible label. */
export function moonPhaseName(phase: number, lang: 'ar' | 'en' | 'ur'): string {
  // Day 1 of a Hijri month sits at phase ≈ 0.017 and is precisely the sighted
  // crescent that opened the month, so the "new moon" band is kept tighter than
  // that — only the tail of day 30 falls into it.
  const i =
    phase < 0.012 || phase >= 0.988 ? 0 :
    phase < 0.23 ? 1 :
    phase < 0.27 ? 2 :
    phase < 0.48 ? 3 :
    phase < 0.52 ? 4 :
    phase < 0.73 ? 5 :
    phase < 0.77 ? 6 : 7;
  return [
    ['المحاق', 'هلال متزايد', 'التربيع الأول', 'أحدب متزايد', 'بدر', 'أحدب متناقص', 'التربيع الأخير', 'هلال متناقص'],
    ['New moon', 'Waxing crescent', 'First quarter', 'Waxing gibbous', 'Full moon', 'Waning gibbous', 'Last quarter', 'Waning crescent'],
    ['نیا چاند', 'بڑھتا ہلال', 'پہلی سہ ماہی', 'بڑھتا گبس', 'پورا چاند', 'گھٹتا گبس', 'آخری سہ ماہی', 'گھٹتا ہلال'],
  ][lang === 'ar' ? 0 : lang === 'ur' ? 2 : 1][i];
}
