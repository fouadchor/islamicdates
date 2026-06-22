import { useState, useEffect, useRef } from 'react';
import {
  computePrayerTimes, fmtTime, METHODS, PRAYER_KEYS, PRAYER_LABELS,
  type MethodId, type AsrId, type PrayerKey,
} from '../lib/prayer';

interface Props { lang: 'ar' | 'en' }

interface City { key: string; ar: string; en: string; lat: number; lng: number; zone: string; method: MethodId }
const CITIES: City[] = [
  { key: 'makkah',    ar: 'مكة المكرمة',     en: 'Makkah',    lat: 21.4225, lng: 39.8262, zone: 'Asia/Riyadh',     method: 'Makkah' },
  { key: 'madinah',   ar: 'المدينة المنورة', en: 'Madinah',   lat: 24.4686, lng: 39.6142, zone: 'Asia/Riyadh',     method: 'Makkah' },
  { key: 'riyadh',    ar: 'الرياض',          en: 'Riyadh',    lat: 24.7136, lng: 46.6753, zone: 'Asia/Riyadh',     method: 'Makkah' },
  { key: 'doha',      ar: 'الدوحة',          en: 'Doha',      lat: 25.2854, lng: 51.5310, zone: 'Asia/Qatar',      method: 'Qatar' },
  { key: 'dubai',     ar: 'دبي',             en: 'Dubai',     lat: 25.2048, lng: 55.2708, zone: 'Asia/Dubai',      method: 'Gulf' },
  { key: 'kuwait',    ar: 'الكويت',          en: 'Kuwait City', lat: 29.3759, lng: 47.9774, zone: 'Asia/Kuwait',  method: 'Kuwait' },
  { key: 'cairo',     ar: 'القاهرة',         en: 'Cairo',     lat: 30.0444, lng: 31.2357, zone: 'Africa/Cairo',    method: 'Egypt' },
  { key: 'amman',     ar: 'عمّان',           en: 'Amman',     lat: 31.9539, lng: 35.9106, zone: 'Asia/Amman',      method: 'MWL' },
  { key: 'istanbul',  ar: 'إسطنبول',         en: 'Istanbul',  lat: 41.0082, lng: 28.9784, zone: 'Europe/Istanbul', method: 'Turkey' },
  { key: 'london',    ar: 'لندن',            en: 'London',    lat: 51.5074, lng: -0.1278, zone: 'Europe/London',   method: 'MWL' },
  { key: 'paris',     ar: 'باريس',           en: 'Paris',     lat: 48.8566, lng:  2.3522, zone: 'Europe/Paris',    method: 'MWL' },
  { key: 'newyork',   ar: 'نيويورك',         en: 'New York',  lat: 40.7128, lng: -74.0060, zone: 'America/New_York', method: 'ISNA' },
  { key: 'karachi',   ar: 'كراتشي',          en: 'Karachi',   lat: 24.8607, lng: 67.0011, zone: 'Asia/Karachi',    method: 'Karachi' },
  { key: 'jakarta',   ar: 'جاكرتا',          en: 'Jakarta',   lat: -6.2088, lng: 106.8456, zone: 'Asia/Jakarta',   method: 'Singapore' },
];

// Pick a country-appropriate calculation method from an IANA timezone.
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

export default function PrayerTimesIsland({ lang }: Props) {
  const ar = lang === 'ar';
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
      if (s.method && METHODS[s.method as MethodId]) setMethod(s.method);
      if (s.asr) setAsr(s.asr);
      if (typeof s.h12 === 'boolean') setH12(s.h12);
      if (s.loc && typeof s.loc.lat === 'number') setLoc(s.loc);
      else { const c = CITIES[0]; setLoc({ lat: c.lat, lng: c.lng, zone: c.zone, key: c.key }); setMethod(c.method); }
    } catch {
      const c = CITIES[0]; setLoc({ lat: c.lat, lng: c.lng, zone: c.zone, key: c.key });
    }
    tick.current = window.setInterval(() => setNow(new Date()), 1000);
    return () => { if (tick.current) clearInterval(tick.current); };
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try { localStorage.setItem('pt_settings', JSON.stringify({ method, asr, h12, loc })); } catch {}
  }, [method, asr, h12, loc, mounted]);

  const cityName = (key?: string) => { const c = CITIES.find(x => x.key === key); return c ? (ar ? c.ar : c.en) : ''; };
  const locLabel = !loc ? '' : loc.isGeo ? (ar ? 'موقعي الحالي' : 'My location') : (loc.key ? cityName(loc.key) : (ar ? 'موقع مخصص' : 'Custom location'));

  const useMyLocation = () => {
    if (!navigator.geolocation) { setGeo('error'); return; }
    setGeo('loading');
    navigator.geolocation.getCurrentPosition(
      pos => {
        const zone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
        setLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude, zone, isGeo: true });
        setMethod(methodForZone(zone));
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

  if (!mounted || !loc) return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', padding: '28px 30px', minHeight: 360 }} />
  );

  const offset = zoneOffsetHours(loc.zone, now);
  const times = computePrayerTimes(now, loc.lat, loc.lng, offset, { method, asr, highLat: 'NightMiddle' });

  const zoneNow = new Date(now.toLocaleString('en-US', { timeZone: loc.zone }));
  const curH = zoneNow.getHours() + zoneNow.getMinutes() / 60 + zoneNow.getSeconds() / 3600;

  const order: PrayerKey[] = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];
  let nextKey: PrayerKey | null = null;
  for (const k of order) { if (times[k] > curH) { nextKey = k; break; } }
  let nextH: number; let nextLabel: string; let tomorrow = false;
  if (nextKey) { nextH = times[nextKey]; nextLabel = (ar ? PRAYER_LABELS[nextKey].ar : PRAYER_LABELS[nextKey].en); }
  else {
    const t2 = computePrayerTimes(new Date(now.getTime() + 86400000), loc.lat, loc.lng, offset, { method, asr, highLat: 'NightMiddle' });
    nextH = t2.fajr + 24; nextKey = 'fajr'; nextLabel = ar ? PRAYER_LABELS.fajr.ar : PRAYER_LABELS.fajr.en; tomorrow = true;
  }
  let curKey: PrayerKey | null = null;
  for (const k of order) { if (times[k] <= curH) curKey = k; }

  const remH = nextH - curH;
  const rh = Math.floor(remH);
  const rm = Math.floor((remH - rh) * 60);
  const rs = Math.floor(((remH - rh) * 60 - rm) * 60);
  const pad = (n: number) => String(n).padStart(2, '0');
  const countdown = `${pad(rh)}:${pad(rm)}:${pad(rs)}`;

  const wd = zoneNow.toLocaleDateString(ar ? 'ar' : 'en-US', { weekday: 'long', timeZone: loc.zone });
  const gdate = zoneNow.toLocaleDateString(ar ? 'ar-u-ca-gregory' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric', timeZone: loc.zone });

  const card: React.CSSProperties = { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' };

  return (
    <section style={{ ...card, padding: '24px 26px', animation: 'fadeUp .5s ease' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 12.5, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 700 }}>{ar ? 'مواقيت الصلاة' : 'Prayer Times'}</div>
          <div style={{ fontSize: 22, fontWeight: 800, marginTop: 4 }}>{locLabel}</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>{wd}، {gdate}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: ar ? 'flex-start' : 'flex-end' }}>
          <button onClick={useMyLocation}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '9px 14px', borderRadius: 11, border: '1px solid var(--accent)', background: 'var(--accent)', color: 'var(--accent-contrast)', fontWeight: 700, fontSize: 13.5 }}>
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="3" /><path d="M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11Z" /></svg>
            {geo === 'loading' ? (ar ? 'جارٍ التحديد…' : 'Locating…') : (ar ? 'موقعي' : 'My location')}
          </button>
          <select value={loc.key || ''} onChange={e => pickCity(e.target.value)}
            style={{ padding: '8px 11px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--surface2)', color: 'var(--text)', fontSize: 13.5, minWidth: 150 }}>
            <option value="">{ar ? 'اختر مدينة' : 'Choose a city'}</option>
            {CITIES.map(c => <option key={c.key} value={c.key}>{ar ? c.ar : c.en}</option>)}
          </select>
        </div>
      </div>

      {geo === 'denied' && <div style={{ fontSize: 13, color: 'var(--gold)', marginBottom: 14 }}>{ar ? 'تعذّر الوصول إلى موقعك. يمكنك اختيار مدينة يدوياً.' : 'Location access denied. You can pick a city manually.'}</div>}

      <div style={{ background: 'var(--accent-soft)', borderRadius: 14, padding: '16px 20px', display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 12.5, color: 'var(--accent)', fontWeight: 700, letterSpacing: '.03em' }}>{ar ? 'الصلاة القادمة' : 'Next prayer'}{tomorrow ? (ar ? ' (غداً)' : ' (tomorrow)') : ''}</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent)', marginTop: 3 }}>{nextLabel} · {fmtTime(nextH, h12, ar)}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 12.5, color: 'var(--accent)', fontWeight: 700 }}>{ar ? 'الوقت المتبقي' : 'Time remaining'}</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--accent)', marginTop: 3, fontVariantNumeric: 'tabular-nums' as any, letterSpacing: '.02em' }}>{countdown}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {PRAYER_KEYS.map(k => {
          const active = k === curKey;
          return (
            <div key={k} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 18px', borderRadius: 12, border: active ? '1px solid var(--accent)' : '1px solid var(--border)', background: active ? 'var(--accent-soft)' : 'var(--surface2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                {active && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />}
                <span style={{ fontWeight: 700, fontSize: 16, color: active ? 'var(--accent)' : 'var(--text)' }}>{ar ? PRAYER_LABELS[k].ar : PRAYER_LABELS[k].en}</span>
              </div>
              <span style={{ fontWeight: 800, fontSize: 17, color: active ? 'var(--accent)' : 'var(--text)', fontVariantNumeric: 'tabular-nums' as any }}>{fmtTime(times[k], h12, ar)}</span>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 18, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 12, color: 'var(--muted)' }}>
          {ar ? 'طريقة الحساب' : 'Calculation method'}
          <select value={method} onChange={e => setMethod(e.target.value as MethodId)} style={{ padding: '8px 11px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--surface2)', color: 'var(--text)', fontSize: 13.5 }}>
            {(Object.keys(METHODS) as MethodId[]).map(m => <option key={m} value={m}>{ar ? METHODS[m].ar : METHODS[m].en}</option>)}
          </select>
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 12, color: 'var(--muted)' }}>
          {ar ? 'مذهب العصر' : 'Asr method'}
          <select value={asr} onChange={e => setAsr(e.target.value as AsrId)} style={{ padding: '8px 11px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--surface2)', color: 'var(--text)', fontSize: 13.5 }}>
            <option value="Standard">{ar ? 'الجمهور (شافعي/مالكي/حنبلي)' : 'Standard (Shafiʿi/Maliki/Hanbali)'}</option>
            <option value="Hanafi">{ar ? 'حنفي' : 'Hanafi'}</option>
          </select>
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 12, color: 'var(--muted)' }}>
          {ar ? 'صيغة الوقت' : 'Time format'}
          <select value={h12 ? '12' : '24'} onChange={e => setH12(e.target.value === '12')} style={{ padding: '8px 11px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--surface2)', color: 'var(--text)', fontSize: 13.5 }}>
            <option value="12">{ar ? '12 ساعة' : '12-hour'}</option>
            <option value="24">{ar ? '24 ساعة' : '24-hour'}</option>
          </select>
        </label>
      </div>

      <p style={{ margin: '16px 0 0', fontSize: 12, color: 'var(--muted)', lineHeight: 1.65 }}>
        {ar
          ? 'المواقيت محسوبة فلكياً حسب موقعك وطريقة الحساب المختارة، وقد تختلف بدقائق عن التقويم المحلي. للاحتياط راجع الإعلان الرسمي في بلدك.'
          : 'Times are calculated astronomically from your location and selected method, and may differ by a few minutes from local timetables. For precision, check your local official announcement.'}
      </p>
    </section>
  );
}
