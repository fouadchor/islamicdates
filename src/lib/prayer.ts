// Prayer-time calculation engine.
// Adapted from the PrayTimes.org algorithm by Hamid Zarrabi-Zadeh, used under
// its free-use terms (https://praytimes.org). Ported to TypeScript, no deps.
// Computes solar-based prayer times for a given date, latitude, longitude and
// timezone offset (in hours).

export type MethodId = 'MWL' | 'ISNA' | 'Egypt' | 'Makkah' | 'Karachi' | 'Tehran' | 'Jafari' | 'Gulf' | 'Kuwait' | 'Qatar' | 'Singapore' | 'Turkey';
export type AsrId = 'Standard' | 'Hanafi';
export type HighLatId = 'NightMiddle' | 'AngleBased' | 'OneSeventh' | 'None';

interface MethodParams {
  fajr: number;
  isha: number | { minutes: number };
  maghrib?: number | { minutes: number };
  midnight?: 'Standard' | 'Jafari';
}

export const METHODS: Record<MethodId, { ar: string; en: string; params: MethodParams }> = {
  MWL:       { ar: 'رابطة العالم الإسلامي', en: 'Muslim World League',        params: { fajr: 18,   isha: 17 } },
  ISNA:      { ar: 'أمريكا الشمالية (ISNA)', en: 'Islamic Society of N. America', params: { fajr: 15,   isha: 15 } },
  Egypt:     { ar: 'الهيئة المصرية العامة',  en: 'Egyptian General Authority',  params: { fajr: 19.5, isha: 17.5 } },
  Makkah:    { ar: 'أم القرى (مكة المكرمة)', en: 'Umm al-Qura, Makkah',         params: { fajr: 18.5, isha: { minutes: 90 } } },
  Karachi:   { ar: 'جامعة العلوم - كراتشي',  en: 'University of Karachi',        params: { fajr: 18,   isha: 18 } },
  Gulf:      { ar: 'هيئة الخليج (الإمارات)', en: 'Gulf Region',                 params: { fajr: 19.5, isha: { minutes: 90 } } },
  Kuwait:    { ar: 'الكويت',                 en: 'Kuwait',                      params: { fajr: 18,   isha: 17.5 } },
  Qatar:     { ar: 'قطر',                    en: 'Qatar',                       params: { fajr: 18,   isha: { minutes: 90 } } },
  Singapore: { ar: 'سنغافورة',               en: 'Singapore',                   params: { fajr: 20,   isha: 18 } },
  Turkey:    { ar: 'تركيا (ديانت)',          en: 'Turkey (Diyanet)',            params: { fajr: 18,   isha: 17 } },
  Tehran:    { ar: 'طهران',                  en: 'Univ. of Tehran',             params: { fajr: 17.7, isha: 14, maghrib: 4.5, midnight: 'Jafari' } },
  Jafari:    { ar: 'الشيعة (جعفري)',         en: 'Shia Ithna-Ashari (Jafari)',  params: { fajr: 16,   isha: 14, maghrib: 4,   midnight: 'Jafari' } },
};

// ---- trig helpers (degrees) ----
const dtr = (d: number) => (d * Math.PI) / 180;
const rtd = (r: number) => (r * 180) / Math.PI;
const sin = (d: number) => Math.sin(dtr(d));
const cos = (d: number) => Math.cos(dtr(d));
const tan = (d: number) => Math.tan(dtr(d));
const arcsin = (x: number) => rtd(Math.asin(x));
const arccos = (x: number) => rtd(Math.acos(x));
const arctan2 = (y: number, x: number) => rtd(Math.atan2(y, x));
const arccot = (x: number) => rtd(Math.atan(1 / x));
const fix = (a: number, b: number) => { a = a - b * Math.floor(a / b); return a < 0 ? a + b : a; };
const fixAngle = (a: number) => fix(a, 360);
const fixHour = (a: number) => fix(a, 24);

function julian(year: number, month: number, day: number): number {
  if (month <= 2) { year -= 1; month += 12; }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
}

// Sun declination & equation of time at a given Julian date.
function sunPosition(jd: number) {
  const D = jd - 2451545.0;
  const g = fixAngle(357.529 + 0.98560028 * D);
  const q = fixAngle(280.459 + 0.98564736 * D);
  const L = fixAngle(q + 1.915 * sin(g) + 0.020 * sin(2 * g));
  const e = 23.439 - 0.00000036 * D;
  const decl = arcsin(sin(e) * sin(L));
  const RA = arctan2(cos(e) * sin(L), cos(L)) / 15;
  const eqt = q / 15 - fixHour(RA);
  return { decl, eqt };
}

export interface PrayerOptions {
  method: MethodId;
  asr: AsrId;
  highLat: HighLatId;
}

export interface PrayerTimes {
  fajr: number; sunrise: number; dhuhr: number; asr: number;
  sunset: number; maghrib: number; isha: number; midnight: number;
}

// date: a Date whose Y/M/D (local) are the target day.
// lat, lng in degrees; timezone in hours offset from UTC (incl. DST).
export function computePrayerTimes(date: Date, lat: number, lng: number, timezone: number, opts: PrayerOptions): PrayerTimes {
  const p = METHODS[opts.method].params;
  const asrFactor = opts.asr === 'Hanafi' ? 2 : 1;
  const jDate = julian(date.getFullYear(), date.getMonth() + 1, date.getDate()) - lng / (15 * 24);

  const midDay = (t: number) => fixHour(12 - sunPosition(jDate + t).eqt);
  const sunAngleTime = (angle: number, t: number, ccw?: boolean) => {
    const decl = sunPosition(jDate + t).decl;
    const noon = midDay(t);
    const x = (-sin(angle) - sin(lat) * sin(decl)) / (cos(lat) * cos(decl));
    const a = arccos(x) / 15;
    return noon + (ccw ? -a : a);
  };
  const asrTimeF = (t: number) => {
    const decl = sunPosition(jDate + t).decl;
    const angle = -arccot(asrFactor + tan(Math.abs(lat - decl)));
    return sunAngleTime(angle, t);
  };

  const riseSet = 0.833; // sun altitude at sunrise/sunset (refraction)

  // initial guesses (in hours / 24 as day portions)
  let t = { fajr: 5, sunrise: 6, dhuhr: 12, asr: 13, sunset: 18, maghrib: 18, isha: 18 };
  const dp = (h: number) => h / 24;
  const portions = { fajr: dp(5), sunrise: dp(6), dhuhr: dp(12), asr: dp(13), sunset: dp(18), maghrib: dp(18), isha: dp(18) };

  const fajr = sunAngleTime(p.fajr, portions.fajr, true);
  const sunrise = sunAngleTime(riseSet, portions.sunrise, true);
  const dhuhr = midDay(portions.dhuhr);
  const asr = asrTimeF(portions.asr);
  const sunset = sunAngleTime(riseSet, portions.sunset);
  let maghrib: number;
  if (p.maghrib && typeof p.maghrib === 'object') maghrib = sunset + p.maghrib.minutes / 60;
  else if (p.maghrib && typeof p.maghrib === 'number') maghrib = sunAngleTime(p.maghrib, portions.maghrib);
  else maghrib = sunset; // default: maghrib = sunset
  let isha: number;
  if (typeof p.isha === 'object') isha = maghrib + p.isha.minutes / 60;
  else isha = sunAngleTime(p.isha, portions.isha);

  let times = { fajr, sunrise, dhuhr, asr, sunset, maghrib, isha };

  // adjust for timezone & longitude
  const adj = timezone - lng / 15;
  (Object.keys(times) as (keyof typeof times)[]).forEach(k => { times[k] += adj; });

  // high-latitude adjustment
  if (opts.highLat !== 'None') {
    const nightTime = fixHour(times.sunrise - times.sunset);
    const portion = (angle: number) => {
      if (opts.highLat === 'AngleBased') return (1 / 60) * angle;
      if (opts.highLat === 'OneSeventh') return 1 / 7;
      return 1 / 2; // NightMiddle
    };
    const adjHL = (time: number, base: number, angle: number, ccw?: boolean) => {
      const night = nightTime;
      const pn = portion(angle) * night;
      const diff = ccw ? fixHour(base - time) : fixHour(time - base);
      if (isNaN(time) || diff > pn) return base + (ccw ? -pn : pn);
      return time;
    };
    const fajrAngle = p.fajr;
    const ishaAngle = typeof p.isha === 'number' ? p.isha : 18;
    times.fajr = adjHL(times.fajr, times.sunrise, fajrAngle, true);
    times.isha = adjHL(times.isha, times.sunset, ishaAngle, false);
  }

  // midnight (for reference)
  const midnight = p.midnight === 'Jafari'
    ? times.sunset + fixHour(times.fajr - times.sunset) / 2
    : times.sunset + fixHour(times.sunrise - times.sunset) / 2;

  return { ...times, midnight: fixHour(midnight) };
}

// Format decimal hours (0..24) to "HH:MM" 24h, or 12h with suffix.
export function fmtTime(t: number, h12: boolean, ar: boolean): string {
  if (isNaN(t)) return '--:--';
  t = fixHour(t + 0.5 / 60); // round to nearest minute
  let h = Math.floor(t);
  const m = Math.floor((t - h) * 60);
  const mm = String(m).padStart(2, '0');
  if (!h12) return `${String(h).padStart(2, '0')}:${mm}`;
  const suffix = ar ? (h < 12 ? 'ص' : 'م') : (h < 12 ? 'AM' : 'PM');
  let hh = h % 12; if (hh === 0) hh = 12;
  return `${hh}:${mm} ${suffix}`;
}

export const PRAYER_KEYS = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'] as const;
export type PrayerKey = typeof PRAYER_KEYS[number];

export const PRAYER_LABELS: Record<PrayerKey, { ar: string; en: string }> = {
  fajr:    { ar: 'الفجر',    en: 'Fajr' },
  sunrise: { ar: 'الشروق',   en: 'Sunrise' },
  dhuhr:   { ar: 'الظهر',    en: 'Dhuhr' },
  asr:     { ar: 'العصر',    en: 'Asr' },
  maghrib: { ar: 'المغرب',   en: 'Maghrib' },
  isha:    { ar: 'العشاء',   en: 'Isha' },
};
