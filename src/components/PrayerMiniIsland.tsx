import { useState, useEffect, useRef } from 'react';
import {
  computePrayerTimes, fmtTime, PRAYER_KEYS, PRAYER_LABELS,
  type MethodId, type AsrId, type PrayerKey,
} from '../lib/prayer';
import { type Lang, pick } from '../lib/data';

interface Props { lang: Lang }

interface City { key: string; ar: string; en: string; ur: string; lat: number; lng: number; zone: string; method: MethodId }
const CITIES: City[] = [
  { key: 'makkah',    ar: 'مكة المكرمة',     en: 'Makkah',      ur: 'مکہ مکرمہ',   lat: 21.4225, lng: 39.8262, zone: 'Asia/Riyadh',     method: 'Makkah' },
  { key: 'madinah',   ar: 'المدينة المنورة', en: 'Madinah',     ur: 'مدینہ منورہ', lat: 24.4686, lng: 39.6142, zone: 'Asia/Riyadh',     method: 'Makkah' },
  { key: 'riyadh',    ar: 'الرياض',          en: 'Riyadh',      ur: 'ریاض',        lat: 24.7136, lng: 46.6753, zone: 'Asia/Riyadh',     method: 'Makkah' },
  { key: 'doha',      ar: 'الدوحة',          en: 'Doha',        ur: 'دوحہ',        lat: 25.2854, lng: 51.5310, zone: 'Asia/Qatar',      method: 'Qatar' },
  { key: 'dubai',     ar: 'دبي',             en: 'Dubai',       ur: 'دبئی',        lat: 25.2048, lng: 55.2708, zone: 'Asia/Dubai',      method: 'Gulf' },
  { key: 'kuwait',    ar: 'الكويت',          en: 'Kuwait City', ur: 'کویت سٹی',    lat: 29.3759, lng: 47.9774, zone: 'Asia/Kuwait',     method: 'Kuwait' },
  { key: 'cairo',     ar: 'القاهرة',         en: 'Cairo',       ur: 'قاہرہ',       lat: 30.0444, lng: 31.2357, zone: 'Africa/Cairo',    method: 'Egypt' },
  { key: 'amman',     ar: 'عمّان',           en: 'Amman',       ur: 'عمان',        lat: 31.9539, lng: 35.9106, zone: 'Asia/Amman',      method: 'MWL' },
  { key: 'damascus',  ar: 'دمشق',            en: 'Damascus',    ur: 'دمشق',        lat: 33.5138, lng: 36.2765, zone: 'Asia/Damascus',   method: 'MWL' },
  { key: 'istanbul',  ar: 'إسطنبول',         en: 'Istanbul',    ur: 'استنبول',     lat: 41.0082, lng: 28.9784, zone: 'Europe/Istanbul', method: 'Turkey' },
  { key: 'london',    ar: 'لندن',            en: 'London',      ur: 'لندن',        lat: 51.5074, lng: -0.1278, zone: 'Europe/London',   method: 'MWL' },
  { key: 'paris',     ar: 'باريس',           en: 'Paris',       ur: 'پیرس',        lat: 48.8566, lng:  2.3522, zone: 'Europe/Paris',    method: 'MWL' },
  { key: 'newyork',   ar: 'نيويورك',         en: 'New York',    ur: 'نیویارک',     lat: 40.7128, lng: -74.0060, zone: 'America/New_York', method: 'ISNA' },
  { key: 'karachi',   ar: 'كراتشي',          en: 'Karachi',     ur: 'کراچی',       lat: 24.8607, lng: 67.0011, zone: 'Asia/Karachi',    method: 'Karachi' },
  { key: 'jakarta',   ar: 'جاكرتا',          en: 'Jakarta',     ur: 'جکارتہ',      lat: -6.2088, lng: 106.8456, zone: 'Asia/Jakarta',   method: 'Singapore' },
];

// Match the visitor's browser timezone to a listed city (e.g. Asia/Qatar → Doha).
function cityForTz(): City | null {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return CITIES.find(c => c.zone === tz) || null;
  } catch { return null; }
}

function methodForZone(zone: string): MethodId {
  const z = (zone || '').toLowerCase();
  const exact: Record<string, MethodId> = {
    'asia/qatar': 'Qatar', 'asia/bahrain': 'Gulf', 'asia/dubai': 'Gulf', 'asia/muscat': 'Gulf',
    'asia/riyadh': 'Makkah', 'asia/kuwait': 'Kuwait', 'asia/aden': 'Makkah', 'asia/baghdad': 'MWL',
    'africa/cairo': 'Egypt', 'asia/karachi': 'Karachi', 'asia/tehran': 'Tehran',
    'europe/istanbul': 'Turkey', 'asia/singapore': 'Singapore', 'asia/kuala_lumpur': 'Singapore',
    'asia/jakarta': 'Singapore',
  };
  if (exact[z]) return exact[z];
  if (z.startsWith('america/') || z.startsWith('us/') || z.startsWith('canada/')) return 'ISNA';
  if (z.startsWith('europe/') || z.startsWith('africa/') || z.startsWith('australia/')) return 'MWL';
  return 'MWL';
}

function zoneOffsetHours(zone: string, date: Date): number {
  try {
    const local = new Date(date.toLocaleString('en-US', { timeZone: zone }));
    const utc = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
    return Math.round(((local.getTime() - utc.getTime()) / 3600000) * 100) / 100;
  } catch {
    return -date.getTimezoneOffset() / 60;
  }
}

interface Loc { lat: number; lng: number; zone: string; key?: string; isGeo?: boolean }

// Compact prayer-times card for the sidebar. Shares the same `pt_settings`
// localStorage key as the full prayer-times page so choices stay in sync.
export default function PrayerMiniIsland({ lang }: Props) {
  const [mounted, setMounted] = useState(false);
  const [loc, setLoc] = useState<Loc | null>(null);
  const [method, setMethod] = useState<MethodId>('Makkah');
  const [asr, setAsr] = useState<AsrId>('Standard');
  const [h12, setH12] = useState(true);
  const [geo, setGeo] = useState<'idle' | 'loading' | 'denied' | 'error'>('idle');
  const [now, setNow] = useState(() => new Date());
  const tick = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
    try {
      const s = JSON.parse(localStorage.getItem('pt_settings') || '{}');
      if (s.method) setMethod(s.method);
      if (s.asr) setAsr(s.asr);
      if (typeof s.h12 === 'boolean') setH12(s.h12);
      if (s.loc && typeof s.loc.lat === 'number') {
        let loaded = s.loc as Loc;
        if (!loaded.key) {
          const m = CITIES.find(c => c.zone === loaded.zone);
          if (m) { loaded = { lat: m.lat, lng: m.lng, zone: m.zone, key: m.key }; setMethod(m.method); }
        }
        setLoc(loaded);
      } else {
        const c = cityForTz() || CITIES[0];
        setLoc({ lat: c.lat, lng: c.lng, zone: c.zone, key: c.key });
        setMethod(c.method);
      }
    } catch {
      const c = cityForTz() || CITIES[0];
      setLoc({ lat: c.lat, lng: c.lng, zone: c.zone, key: c.key });
      setMethod(c.method);
    }
    tick.current = window.setInterval(() => setNow(new Date()), 1000);
    return () => { if (tick.current) clearInterval(tick.current); };
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try { localStorage.setItem('pt_settings', JSON.stringify({ method, asr, h12, loc })); } catch {}
  }, [method, asr, h12, loc, mounted]);

  const cityName = (key?: string) => { const c = CITIES.find(x => x.key === key); return c ? pick(lang, c.ar, c.en, c.ur) : ''; };
  const locLabel = !loc ? '' : loc.isGeo ? pick(lang, 'موقعي الحالي', 'My location', 'میرا موجودہ مقام') : (loc.key ? cityName(loc.key) : pick(lang, 'موقع مخصص', 'Custom location', 'حسبِ ضرورت مقام'));

  const useMyLocation = () => {
    if (!navigator.geolocation) { setGeo('error'); return; }
    setGeo('loading');
    navigator.geolocation.getCurrentPosition(
      pos => {
        const zone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
        const city = CITIES.find(c => c.zone === zone);
        if (city) { setLoc({ lat: city.lat, lng: city.lng, zone: city.zone, key: city.key }); setMethod(city.method); }
        else { setLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude, zone, isGeo: true }); setMethod(methodForZone(zone)); }
        setGeo('idle');
      },
      () => setGeo('denied'),
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 },
    );
  };

  const pickCity = (key: string) => {
    const c = CITIES.find(x => x.key === key); if (!c) return;
    setLoc({ lat: c.lat, lng: c.lng, zone: c.zone, key: c.key });
    setMethod(c.method);
  };

  const card: React.CSSProperties = { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' };

  // Pre-hydration placeholder. This card sits above the fold on the home page, so
  // an empty box read as a broken/blank element; a shimmering skeleton with the
  // same footprint keeps the layout stable and signals "loading" instead.
  if (!mounted || !loc) return (
    <div style={{ ...card, padding: '20px 22px', minHeight: 320 }} aria-hidden="true">
      <div className="pm-sk" style={{ height: 13, width: '38%', borderRadius: 6 }} />
      <div className="pm-sk" style={{ height: 22, width: '58%', borderRadius: 7, marginTop: 10 }} />
      <div className="pm-sk" style={{ height: 38, borderRadius: 10, marginTop: 14 }} />
      <div className="pm-sk" style={{ height: 56, borderRadius: 12, marginTop: 12 }} />
      {[0, 1, 2, 3, 4, 5].map(i => (
        <div key={i} className="pm-sk" style={{ height: 30, borderRadius: 9, marginTop: 8 }} />
      ))}
      <style>{`
        .pm-sk {
          background: linear-gradient(90deg, var(--surface2) 25%, var(--border) 37%, var(--surface2) 63%);
          background-size: 400% 100%;
          animation: pmShimmer 1.4s ease-in-out infinite;
        }
        @keyframes pmShimmer { 0% { background-position: 100% 0 } 100% { background-position: -100% 0 } }
        @media (prefers-reduced-motion: reduce) { .pm-sk { animation: none } }
      `}</style>
    </div>
  );

  const offset = zoneOffsetHours(loc.zone, now);
  const times = computePrayerTimes(now, loc.lat, loc.lng, offset, { method, asr, highLat: 'NightMiddle' });

  const zoneNow = new Date(now.toLocaleString('en-US', { timeZone: loc.zone }));
  const curH = zoneNow.getHours() + zoneNow.getMinutes() / 60 + zoneNow.getSeconds() / 3600;

  const order: PrayerKey[] = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];
  let nextKey: PrayerKey | null = null;
  for (const k of order) { if (times[k] > curH) { nextKey = k; break; } }
  let nextH: number; let nextLabel: string; let tomorrow = false;
  const plbl = (k: PrayerKey) => pick(lang, PRAYER_LABELS[k].ar, PRAYER_LABELS[k].en, PRAYER_LABELS[k].ur);
  if (nextKey) { nextH = times[nextKey]; nextLabel = plbl(nextKey); }
  else {
    const t2 = computePrayerTimes(new Date(now.getTime() + 86400000), loc.lat, loc.lng, offset, { method, asr, highLat: 'NightMiddle' });
    nextH = t2.fajr + 24; nextKey = 'fajr'; nextLabel = plbl('fajr'); tomorrow = true;
  }
  let curKey: PrayerKey | null = null;
  for (const k of order) { if (times[k] <= curH) curKey = k; }

  const remH = nextH - curH;
  const rh = Math.floor(remH);
  const rm = Math.floor((remH - rh) * 60);
  const rs = Math.floor(((remH - rh) * 60 - rm) * 60);
  const pad = (n: number) => String(n).padStart(2, '0');
  const countdown = `${pad(rh)}:${pad(rm)}:${pad(rs)}`;

  const prayerHref = pick(lang, '/prayer-times/', '/en/prayer-times/', '/ur/prayer-times/');

  return (
    <section style={{ ...card, padding: '20px 22px', animation: 'fadeUp .5s ease' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 12 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 11.5, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 700 }}>{pick(lang, 'مواقيت الصلاة', 'Prayer Times', 'مواقیتِ نماز')}</div>
          <div style={{ fontSize: 17, fontWeight: 800, marginTop: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{locLabel}</div>
        </div>
        <button onClick={useMyLocation} aria-label={pick(lang, 'موقعي', 'My location', 'میرا مقام')} title={pick(lang, 'موقعي', 'My location', 'میرا مقام')}
          style={{ flex: '0 0 auto', width: 36, height: 36, borderRadius: 10, border: '1px solid var(--accent)', background: 'var(--accent)', color: 'var(--accent-contrast)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="3" /><path d="M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11Z" /></svg>
        </button>
      </div>

      <select value={loc.key || ''} onChange={e => pickCity(e.target.value)}
        style={{ width: '100%', padding: '8px 11px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--surface2)', color: 'var(--text)', fontSize: 13.5, marginBottom: 12 }}>
        <option value="">{pick(lang, 'اختر مدينة', 'Choose a city', 'شہر منتخب کریں')}</option>
        {CITIES.map(c => <option key={c.key} value={c.key}>{pick(lang, c.ar, c.en, c.ur)}</option>)}
      </select>

      {geo === 'denied' && <div style={{ fontSize: 12.5, color: 'var(--gold)', marginBottom: 10 }}>{pick(lang, 'تعذّر تحديد موقعك. اختر مدينة.', 'Location denied. Pick a city.', 'مقام نہیں ملا۔ شہر منتخب کریں۔')}</div>}

      <div style={{ background: 'var(--accent-soft)', borderRadius: 12, padding: '12px 15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 11.5, color: 'var(--accent)', fontWeight: 700 }}>{pick(lang, 'الصلاة القادمة', 'Next prayer', 'اگلی نماز')}{tomorrow ? pick(lang, ' (غداً)', ' (tom.)', ' (کل)') : ''}</div>
          <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--accent)', marginTop: 2 }}>{nextLabel} · {fmtTime(nextH, h12, lang)}</div>
        </div>
        <div style={{ fontSize: 19, fontWeight: 800, color: 'var(--accent)', fontVariantNumeric: 'tabular-nums' as any }}>{countdown}</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {PRAYER_KEYS.map(k => {
          const active = k === curKey;
          return (
            <div key={k} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 13px', borderRadius: 10, border: active ? '1px solid var(--accent)' : '1px solid var(--border)', background: active ? 'var(--accent-soft)' : 'var(--surface2)' }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: active ? 'var(--accent)' : 'var(--text)' }}>{plbl(k)}</span>
              <span style={{ fontWeight: 800, fontSize: 14.5, color: active ? 'var(--accent)' : 'var(--text)', fontVariantNumeric: 'tabular-nums' as any }}>{fmtTime(times[k], h12, lang)}</span>
            </div>
          );
        })}
      </div>

      <a href={prayerHref} style={{ display: 'inline-block', marginTop: 12, fontSize: 13, color: 'var(--accent)', fontWeight: 700, textDecoration: 'none' }}>{pick(lang, 'المواقيت الكاملة والإعدادات ←', 'Full times & settings →', 'مکمل اوقات و ترتیبات ←')}</a>
    </section>
  );
}
