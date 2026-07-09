import { useState, useEffect, useRef } from 'react';
import { g2h, todayUTC } from '../lib/hijri';
import { type Lang, pick, isRTL, hMonArr, gMonArr, wdArr, hijriEra, gregEra } from '../lib/data';
import { OCCASIONS, occurrencesInGYear, occLoc, fmtG, fmtH, G_YEAR_END } from '../lib/occasions';
import { computePrayerTimes, fmtTime, PRAYER_KEYS, PRAYER_LABELS, type MethodId, type PrayerKey } from '../lib/prayer';

// Standalone widgets shown inside an <iframe> on other websites.
// URL params: ?type=date|countdown|prayer  &lang=ar|en|ur  &theme=light|dark|auto
//             countdown: &occasion=<slug>   prayer: &city=<key>

interface City { key: string; ar: string; en: string; ur: string; lat: number; lng: number; zone: string; method: MethodId }
export const EMBED_CITIES: City[] = [
  { key: 'makkah',   ar: 'مكة المكرمة',     en: 'Makkah',      ur: 'مکہ مکرمہ',   lat: 21.4225, lng: 39.8262,  zone: 'Asia/Riyadh',      method: 'Makkah' },
  { key: 'madinah',  ar: 'المدينة المنورة', en: 'Madinah',     ur: 'مدینہ منورہ', lat: 24.4686, lng: 39.6142,  zone: 'Asia/Riyadh',      method: 'Makkah' },
  { key: 'riyadh',   ar: 'الرياض',          en: 'Riyadh',      ur: 'ریاض',        lat: 24.7136, lng: 46.6753,  zone: 'Asia/Riyadh',      method: 'Makkah' },
  { key: 'doha',     ar: 'الدوحة',          en: 'Doha',        ur: 'دوحہ',        lat: 25.2854, lng: 51.5310,  zone: 'Asia/Qatar',       method: 'Qatar' },
  { key: 'dubai',    ar: 'دبي',             en: 'Dubai',       ur: 'دبئی',        lat: 25.2048, lng: 55.2708,  zone: 'Asia/Dubai',       method: 'Gulf' },
  { key: 'kuwait',   ar: 'الكويت',          en: 'Kuwait City', ur: 'کویت سٹی',    lat: 29.3759, lng: 47.9774,  zone: 'Asia/Kuwait',      method: 'Kuwait' },
  { key: 'cairo',    ar: 'القاهرة',         en: 'Cairo',       ur: 'قاہرہ',       lat: 30.0444, lng: 31.2357,  zone: 'Africa/Cairo',     method: 'Egypt' },
  { key: 'amman',    ar: 'عمّان',           en: 'Amman',       ur: 'عمان',        lat: 31.9539, lng: 35.9106,  zone: 'Asia/Amman',       method: 'MWL' },
  { key: 'damascus', ar: 'دمشق',            en: 'Damascus',    ur: 'دمشق',        lat: 33.5138, lng: 36.2765,  zone: 'Asia/Damascus',    method: 'MWL' },
  { key: 'istanbul', ar: 'إسطنبول',         en: 'Istanbul',    ur: 'استنبول',     lat: 41.0082, lng: 28.9784,  zone: 'Europe/Istanbul',  method: 'Turkey' },
  { key: 'london',   ar: 'لندن',            en: 'London',      ur: 'لندن',        lat: 51.5074, lng: -0.1278,  zone: 'Europe/London',    method: 'MWL' },
  { key: 'paris',    ar: 'باريس',           en: 'Paris',       ur: 'پیرس',        lat: 48.8566, lng: 2.3522,   zone: 'Europe/Paris',     method: 'MWL' },
  { key: 'newyork',  ar: 'نيويورك',         en: 'New York',    ur: 'نیویارک',     lat: 40.7128, lng: -74.0060, zone: 'America/New_York', method: 'ISNA' },
  { key: 'karachi',  ar: 'كراتشي',          en: 'Karachi',     ur: 'کراچی',       lat: 24.8607, lng: 67.0011,  zone: 'Asia/Karachi',     method: 'Karachi' },
  { key: 'jakarta',  ar: 'جاكرتا',          en: 'Jakarta',     ur: 'جکارتہ',      lat: -6.2088, lng: 106.8456, zone: 'Asia/Jakarta',     method: 'Singapore' },
];

function zoneOffsetHours(zone: string, date: Date): number {
  try {
    const local = new Date(date.toLocaleString('en-US', { timeZone: zone }));
    const utc = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
    return Math.round(((local.getTime() - utc.getTime()) / 3600000) * 100) / 100;
  } catch {
    return -date.getTimezoneOffset() / 60;
  }
}

type WType = 'date' | 'countdown' | 'prayer';
interface Cfg { type: WType; lang: Lang; dark: boolean; occasion: string; city: string }

function palette(dark: boolean) {
  return {
    bg: dark ? '#0f2730' : '#ffffff',
    text: dark ? '#f2f7f9' : '#0f2730',
    muted: dark ? '#9bb0b8' : '#5b7682',
    border: dark ? 'rgba(255,255,255,.12)' : '#e3eaef',
    soft: dark ? 'rgba(20,184,166,.14)' : '#e6f4f1',
    accent: '#0d9488',
  };
}
type Pal = ReturnType<typeof palette>;

const wrapStyle = (rtl: boolean): React.CSSProperties => ({ fontFamily: "system-ui, -apple-system, 'Segoe UI', Tahoma, Arial, sans-serif", direction: rtl ? 'rtl' : 'ltr' });

function Brand({ c, label }: { c: Pal; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
      <span aria-hidden="true" style={{ width: 34, height: 34, flex: '0 0 auto', borderRadius: 10, background: c.accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, lineHeight: 1 }}>☾</span>
      <span style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: '.04em', color: c.muted }}>{label}</span>
    </div>
  );
}

function Attribution({ c }: { c: Pal }) {
  return <a href="https://islamicdates.org/" target="_blank" rel="noopener" style={{ display: 'inline-block', marginTop: 12, fontSize: 12, fontWeight: 700, color: c.accent, textDecoration: 'none' }}>islamicdates.org ↗</a>;
}

export default function EmbedIsland() {
  const [cfg, setCfg] = useState<Cfg | null>(null);
  const [now, setNow] = useState(() => new Date());
  const tick = useRef<number | null>(null);

  useEffect(() => {
    const p = new URLSearchParams(location.search);
    const lp = p.get('lang');
    const lang: Lang = lp === 'en' ? 'en' : lp === 'ur' ? 'ur' : 'ar';
    let theme = p.get('theme') || 'light';
    if (theme === 'auto') theme = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
    const tp = p.get('type');
    const type: WType = tp === 'countdown' ? 'countdown' : tp === 'prayer' ? 'prayer' : 'date';
    const occasion = p.get('occasion') || 'ramadan';
    const city = p.get('city') || 'makkah';
    setCfg({ type, lang, dark: theme === 'dark', occasion, city });
    if (type === 'prayer') {
      tick.current = window.setInterval(() => setNow(new Date()), 1000);
      return () => { if (tick.current) clearInterval(tick.current); };
    }
  }, []);

  if (!cfg) return null;
  const c = palette(cfg.dark);
  const { lang } = cfg;
  const card: React.CSSProperties = { maxWidth: 360, margin: '0 auto', background: c.bg, border: `1px solid ${c.border}`, borderRadius: 16, padding: '16px 18px', boxShadow: '0 1px 2px rgba(13,40,48,.06), 0 8px 24px rgba(13,40,48,.06)', boxSizing: 'border-box' };

  // ── Widget 1: today's Hijri date ─────────────────────────────────────────
  if (cfg.type === 'date') {
    const d = todayUTC();
    const h = g2h(d);
    const sep = lang === 'en' ? ', ' : '، ';
    const hij = `${wdArr(lang)[d.getUTCDay()]}${sep}${h.d} ${hMonArr(lang)[h.m - 1]} ${h.y} ${hijriEra(lang)}`;
    const greg = `${d.getUTCDate()} ${gMonArr(lang)[d.getUTCMonth()]} ${d.getUTCFullYear()} ${gregEra(lang)}`;
    return (
      <div style={wrapStyle(isRTL(lang))}>
        <div style={card}>
          <Brand c={c} label={pick(lang, 'التقويم الهجري اليوم', "Today's Hijri date", 'آج کی ہجری تاریخ')} />
          <div style={{ fontSize: 'clamp(17px,5vw,21px)', fontWeight: 800, color: c.text, lineHeight: 1.35 }}>{hij}</div>
          <div style={{ fontSize: 13.5, color: c.muted, marginTop: 4 }}>{greg}</div>
          <Attribution c={c} />
        </div>
      </div>
    );
  }

  // ── Widget 2: occasion countdown ─────────────────────────────────────────
  if (cfg.type === 'countdown') {
    const occ = OCCASIONS.find(o => o.slug === cfg.occasion) || OCCASIONS.find(o => o.slug === 'ramadan')!;
    const loc = occLoc(occ, lang);
    const today = todayUTC();
    let next: { hy: number; date: Date } | null = null;
    for (let y = today.getUTCFullYear(); y <= G_YEAR_END && !next; y++) {
      for (const o of occurrencesInGYear(occ.hm, occ.hd, y)) {
        if (o.date.getTime() >= today.getTime()) { next = o; break; }
      }
    }
    const days = next ? Math.round((next.date.getTime() - today.getTime()) / 86400000) : 0;
    const isToday = !!next && days === 0;
    const daysLabel = isToday
      ? pick(lang, 'اليوم!', 'Today!', 'آج!')
      : pick(lang, `باقٍ ${days} يوم`, `${days} day${days === 1 ? '' : 's'} left`, `${days} دن باقی`);
    return (
      <div style={wrapStyle(isRTL(lang))}>
        <div style={card}>
          <Brand c={c} label={pick(lang, 'العدّ التنازلي', 'Countdown', 'عددِ معکوس')} />
          <div style={{ fontSize: 'clamp(17px,5vw,21px)', fontWeight: 800, color: c.text, lineHeight: 1.35 }}>
            {loc.name} {next ? next.date.getUTCFullYear() : ''}
          </div>
          {next && (
            <div style={{ fontSize: 13, color: c.muted, marginTop: 4, lineHeight: 1.6 }}>
              {fmtG(next.date, lang)}
              <br />{fmtH(next.hy, occ.hm, occ.hd, lang)}
            </div>
          )}
          <div style={{ marginTop: 10, display: 'inline-block', background: c.soft, color: c.accent, borderRadius: 999, padding: '7px 16px', fontSize: 15, fontWeight: 800 }}>{daysLabel}</div>
          <div><Attribution c={c} /></div>
        </div>
      </div>
    );
  }

  // ── Widget 3: prayer times ───────────────────────────────────────────────
  const city = EMBED_CITIES.find(x => x.key === cfg.city) || EMBED_CITIES[0];
  const offset = zoneOffsetHours(city.zone, now);
  const opts = { method: city.method, asr: 'Standard' as const, highLat: 'NightMiddle' as const };
  const times = computePrayerTimes(now, city.lat, city.lng, offset, opts);
  const zoneNow = new Date(now.toLocaleString('en-US', { timeZone: city.zone }));
  const curH = zoneNow.getHours() + zoneNow.getMinutes() / 60 + zoneNow.getSeconds() / 3600;
  const plbl = (k: PrayerKey) => pick(lang, PRAYER_LABELS[k].ar, PRAYER_LABELS[k].en, PRAYER_LABELS[k].ur);
  let nextKey: PrayerKey | null = null;
  for (const k of PRAYER_KEYS) { if (times[k] > curH) { nextKey = k; break; } }
  let nextH: number; let tomorrow = false;
  if (nextKey) { nextH = times[nextKey]; }
  else {
    const t2 = computePrayerTimes(new Date(now.getTime() + 86400000), city.lat, city.lng, offset, opts);
    nextH = t2.fajr + 24; nextKey = 'fajr'; tomorrow = true;
  }
  const remH = nextH - curH;
  const rh = Math.floor(remH); const rm = Math.floor((remH - rh) * 60); const rs = Math.floor(((remH - rh) * 60 - rm) * 60);
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    <div style={wrapStyle(isRTL(lang))}>
      <div style={card}>
        <Brand c={c} label={`${pick(lang, 'مواقيت الصلاة', 'Prayer Times', 'مواقیتِ نماز')} · ${pick(lang, city.ar, city.en, city.ur)}`} />
        <div style={{ background: c.soft, borderRadius: 12, padding: '9px 13px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 800, color: c.accent }}>
            {pick(lang, 'القادمة', 'Next', 'اگلی')}{tomorrow ? pick(lang, ' (غداً)', ' (tom.)', ' (کل)') : ''}: {plbl(nextKey)} · {fmtTime(nextH % 24, true, lang)}
          </span>
          <span style={{ fontSize: 14.5, fontWeight: 800, color: c.accent, fontVariantNumeric: 'tabular-nums' }}>{pad(rh)}:{pad(rm)}:{pad(rs)}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
          {PRAYER_KEYS.map(k => (
            <div key={k} style={{ textAlign: 'center', padding: '7px 4px', borderRadius: 10, border: `1px solid ${k === nextKey && !tomorrow ? c.accent : c.border}`, background: k === nextKey && !tomorrow ? c.soft : 'transparent' }}>
              <div style={{ fontSize: 11.5, fontWeight: 700, color: c.muted }}>{plbl(k)}</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: c.text, marginTop: 2, fontVariantNumeric: 'tabular-nums' }}>{fmtTime(times[k], true, lang)}</div>
            </div>
          ))}
        </div>
        <Attribution c={c} />
      </div>
    </div>
  );
}
