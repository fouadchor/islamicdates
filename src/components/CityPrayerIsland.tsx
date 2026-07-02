import { useState, useEffect, useRef } from 'react';
import {
  computePrayerTimes, fmtTime, METHODS, PRAYER_KEYS, PRAYER_LABELS,
  type MethodId, type AsrId, type PrayerKey,
} from '../lib/prayer';
import { qiblaBearing, qiblaDistanceKm, compassPoint, zoneOffsetHours } from '../lib/qibla';
import { g2h } from '../lib/hijri';
import { type Lang, pick, isRTL, hMonArr, gMonArr, hijriEra } from '../lib/data';

interface Props {
  lang: Lang;
  city: { ar: string; en: string; ur: string };
  country: { ar: string; en: string; ur: string };
  lat: number;
  lng: number;
  zone: string;
  method: MethodId;
}

const card: React.CSSProperties = { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' };
const selStyle: React.CSSProperties = { padding: '8px 11px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--surface2)', color: 'var(--text)', fontSize: 13.5 };

export default function CityPrayerIsland({ lang, city, country, lat, lng, zone, method: defaultMethod }: Props) {
  const rtl = isRTL(lang);
  const dateLoc = pick(lang, 'ar', 'en-US', 'ur');
  const gregLoc = pick(lang, 'ar-u-ca-gregory', 'en-US', 'ur-u-ca-gregory');
  const [mounted, setMounted] = useState(false);
  const [method, setMethod] = useState<MethodId>(defaultMethod);
  const [asr, setAsr] = useState<AsrId>('Standard');
  const [h12, setH12] = useState(true);
  const [monthShift, setMonthShift] = useState(0); // 0 = current month
  const [now, setNow] = useState(() => new Date());
  const tick = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
    try {
      const s = JSON.parse(localStorage.getItem('pt_city_settings') || '{}');
      if (s.asr) setAsr(s.asr);
      if (typeof s.h12 === 'boolean') setH12(s.h12);
    } catch {}
    tick.current = window.setInterval(() => setNow(new Date()), 1000);
    return () => { if (tick.current) clearInterval(tick.current); };
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try { localStorage.setItem('pt_city_settings', JSON.stringify({ asr, h12 })); } catch {}
  }, [asr, h12, mounted]);

  if (!mounted) return <div style={{ ...card, padding: 28, minHeight: 420 }} />;

  const offset = zoneOffsetHours(zone, now);
  const opts = { method, asr, highLat: 'NightMiddle' as const };
  const times = computePrayerTimes(now, lat, lng, offset, opts);

  const zoneNow = new Date(now.toLocaleString('en-US', { timeZone: zone }));
  const curH = zoneNow.getHours() + zoneNow.getMinutes() / 60 + zoneNow.getSeconds() / 3600;

  const order: PrayerKey[] = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];
  const plbl = (k: PrayerKey) => pick(lang, PRAYER_LABELS[k].ar, PRAYER_LABELS[k].en, PRAYER_LABELS[k].ur);
  let nextKey: PrayerKey | null = null;
  for (const k of order) { if (times[k] > curH) { nextKey = k; break; } }
  let nextH: number; let nextLabel: string; let tomorrow = false;
  if (nextKey) { nextH = times[nextKey]; nextLabel = plbl(nextKey); }
  else {
    const t2 = computePrayerTimes(new Date(now.getTime() + 86400000), lat, lng, offset, opts);
    nextH = t2.fajr + 24; nextKey = 'fajr'; nextLabel = plbl('fajr'); tomorrow = true;
  }
  let curKey: PrayerKey | null = null;
  for (const k of order) { if (times[k] <= curH) curKey = k; }

  const remH = nextH - curH;
  const rh = Math.floor(remH), rm = Math.floor((remH - rh) * 60), rs = Math.floor(((remH - rh) * 60 - rm) * 60);
  const pad = (n: number) => String(n).padStart(2, '0');
  const countdown = `${pad(rh)}:${pad(rm)}:${pad(rs)}`;

  // Hijri + Gregorian date (in the city's timezone)
  const zParts = new Intl.DateTimeFormat('en-CA', { timeZone: zone, year: 'numeric', month: 'numeric', day: 'numeric' }).formatToParts(now);
  const zy = +zParts.find(p => p.type === 'year')!.value, zm = +zParts.find(p => p.type === 'month')!.value, zd = +zParts.find(p => p.type === 'day')!.value;
  const hd = g2h(new Date(Date.UTC(zy, zm - 1, zd, 12)));
  const hijriStr = `${hd.d} ${hMonArr(lang)[hd.m - 1]} ${hd.y} ${hijriEra(lang)}`;
  const wd = zoneNow.toLocaleDateString(dateLoc, { weekday: 'long', timeZone: zone });
  const gdate = zoneNow.toLocaleDateString(gregLoc, { day: 'numeric', month: 'long', year: 'numeric', timeZone: zone });

  // Qibla
  const bearing = qiblaBearing(lat, lng);
  const distKm = qiblaDistanceKm(lat, lng);
  const cp = compassPoint(bearing);
  const bearingTxt = `${bearing.toFixed(1)}°`;

  // Monthly table
  const mBase = new Date(zy, zm - 1 + monthShift, 1);
  const my = mBase.getFullYear(), mm = mBase.getMonth();
  const daysInMonth = new Date(my, mm + 1, 0).getDate();
  const monthLabel = `${gMonArr(lang)[mm]} ${my}`;
  const isThisMonth = monthShift === 0;
  const rows = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const dDate = new Date(my, mm, d, 12);
    const off = zoneOffsetHours(zone, dDate);
    const t = computePrayerTimes(dDate, lat, lng, off, opts);
    const h = g2h(new Date(Date.UTC(my, mm, d, 12)));
    rows.push({ d, t, h, isToday: isThisMonth && d === zd, dow: dDate.getDay() });
  }

  const cityName = pick(lang, city.ar, city.en, city.ur);
  const countryName = pick(lang, country.ar, country.en, country.ur);

  const th: React.CSSProperties = { padding: '9px 10px', fontSize: 12.5, fontWeight: 700, color: 'var(--muted)', whiteSpace: 'nowrap', textAlign: rtl ? 'right' : 'left' };
  const td: React.CSSProperties = { padding: '9px 10px', fontSize: 13.5, whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' as any };

  return (
    <>
      {/* ---- Today card ---- */}
      <section style={{ ...card, padding: '24px 22px', animation: 'fadeUp .5s ease' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 12.5, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 700 }}>{pick(lang, 'مواقيت الصلاة اليوم', "Today's Prayer Times", 'آج کے اوقاتِ نماز')}</div>
            <h2 style={{ fontSize: 22, fontWeight: 800, margin: '4px 0 0' }}>{cityName}<span style={{ fontWeight: 600, color: 'var(--muted)', fontSize: 15 }}> · {countryName}</span></h2>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>{wd}، {gdate}</div>
            <div style={{ fontSize: 13.5, color: 'var(--gold, var(--accent))', fontWeight: 700, marginTop: 2 }}>{hijriStr}</div>
          </div>
          <div style={{ background: 'var(--accent-soft)', borderRadius: 14, padding: '12px 18px', textAlign: 'center', minWidth: 170 }}>
            <div style={{ fontSize: 12.5, color: 'var(--accent)', fontWeight: 700 }}>{pick(lang, 'الصلاة القادمة', 'Next prayer', 'اگلی نماز')}{tomorrow ? pick(lang, ' (غداً)', ' (tomorrow)', ' (کل)') : ''}</div>
            <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--accent)', marginTop: 2 }}>{nextLabel} · {fmtTime(nextH % 24, h12, lang)}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent)', marginTop: 2, fontVariantNumeric: 'tabular-nums' as any }}>{countdown}</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 8 }}>
          {PRAYER_KEYS.map(k => {
            const active = k === curKey;
            return (
              <div key={k} style={{ padding: '12px 14px', borderRadius: 12, textAlign: 'center', border: active ? '1px solid var(--accent)' : '1px solid var(--border)', background: active ? 'var(--accent-soft)' : 'var(--surface2)' }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: active ? 'var(--accent)' : 'var(--muted)' }}>{plbl(k)}</div>
                <div style={{ fontWeight: 800, fontSize: 17, marginTop: 3, color: active ? 'var(--accent)' : 'var(--text)', fontVariantNumeric: 'tabular-nums' as any }}>{fmtTime(times[k], h12, lang)}</div>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--border)' }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 12, color: 'var(--muted)' }}>
            {pick(lang, 'طريقة الحساب', 'Calculation method', 'حساب کا طریقہ')}
            <select value={method} onChange={e => setMethod(e.target.value as MethodId)} style={selStyle}>
              {(Object.keys(METHODS) as MethodId[]).map(m => <option key={m} value={m}>{pick(lang, METHODS[m].ar, METHODS[m].en, METHODS[m].ur)}</option>)}
            </select>
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 12, color: 'var(--muted)' }}>
            {pick(lang, 'مذهب العصر', 'Asr method', 'عصر کا مذہب')}
            <select value={asr} onChange={e => setAsr(e.target.value as AsrId)} style={selStyle}>
              <option value="Standard">{pick(lang, 'الجمهور', 'Standard', 'جمہور')}</option>
              <option value="Hanafi">{pick(lang, 'حنفي', 'Hanafi', 'حنفی')}</option>
            </select>
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 12, color: 'var(--muted)' }}>
            {pick(lang, 'صيغة الوقت', 'Time format', 'وقت کی صورت')}
            <select value={h12 ? '12' : '24'} onChange={e => setH12(e.target.value === '12')} style={selStyle}>
              <option value="12">{pick(lang, '12 ساعة', '12-hour', '12 گھنٹے')}</option>
              <option value="24">{pick(lang, '24 ساعة', '24-hour', '24 گھنٹے')}</option>
            </select>
          </label>
        </div>
      </section>

      {/* ---- Qibla card ---- */}
      <section style={{ ...card, padding: '22px', marginTop: 18 }}>
        <h2 className="section-h2" style={{ margin: 0, fontSize: 18 }}>{pick(lang, `اتجاه القبلة في ${cityName}`, `Qibla direction in ${cityName}`, `${cityName} میں قبلہ کا رخ`)}</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center', marginTop: 14 }}>
          <svg viewBox="0 0 120 120" width="130" height="130" role="img" aria-label={pick(lang, `القبلة ${bearingTxt}`, `Qibla ${bearingTxt}`, `قبلہ ${bearingTxt}`)}>
            <circle cx="60" cy="60" r="56" fill="var(--surface2)" stroke="var(--border)" strokeWidth="2" />
            <circle cx="60" cy="60" r="44" fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="2 4" />
            {['N', 'E', 'S', 'W'].map((c, i) => {
              const a = (i * 90 - 90) * Math.PI / 180;
              return <text key={c} x={60 + 50 * Math.cos(a)} y={60 + 50 * Math.sin(a) + 4} textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--muted)">{c}</text>;
            })}
            <g transform={`rotate(${bearing} 60 60)`}>
              <path d="M60 18 L66 52 L60 46 L54 52 Z" fill="var(--accent)" />
              <line x1="60" y1="46" x2="60" y2="86" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" opacity="0.45" />
            </g>
            <circle cx="60" cy="60" r="4" fill="var(--accent)" />
            <text x="60" y="106" textAnchor="middle" fontSize="9" fill="var(--muted)">🕋</text>
          </svg>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--accent)' }}>{bearingTxt} <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{pick(lang, cp.ar, cp.en, cp.ur)}</span></div>
            <p style={{ margin: '8px 0 0', fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.7 }}>
              {pick(lang,
                `اتجاه القبلة من ${cityName} هو ${bearingTxt} من الشمال الحقيقي (باتجاه عقارب الساعة)، والمسافة إلى الكعبة المشرفة نحو ${distKm.toLocaleString('ar')} كم.`,
                `The Qibla from ${cityName} is ${bearingTxt} clockwise from true north. Distance to the Kaaba: about ${distKm.toLocaleString('en')} km.`,
                `${cityName} سے قبلہ کا رخ حقیقی شمال سے ${bearingTxt} (گھڑی وار) ہے، اور کعبہ شریف کا فاصلہ تقریباً ${distKm.toLocaleString('ur')} کلومیٹر ہے۔`)}
            </p>
          </div>
        </div>
      </section>

      {/* ---- Monthly timetable ---- */}
      <section style={{ ...card, padding: '22px', marginTop: 18 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 className="section-h2" style={{ margin: 0, fontSize: 18 }}>{pick(lang, `جدول مواقيت الصلاة لشهر ${monthLabel}`, `Prayer timetable — ${monthLabel}`, `${monthLabel} کے اوقاتِ نماز کا جدول`)}</h2>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setMonthShift(s => s - 1)} aria-label={pick(lang, 'الشهر السابق', 'Previous month', 'پچھلا مہینہ')} style={{ ...selStyle, cursor: 'pointer', fontWeight: 700 }}>{rtl ? '›' : '‹'}</button>
            {monthShift !== 0 && <button onClick={() => setMonthShift(0)} style={{ ...selStyle, cursor: 'pointer', fontWeight: 700 }}>{pick(lang, 'الشهر الحالي', 'Current', 'موجودہ')}</button>}
            <button onClick={() => setMonthShift(s => s + 1)} aria-label={pick(lang, 'الشهر التالي', 'Next month', 'اگلا مہینہ')} style={{ ...selStyle, cursor: 'pointer', fontWeight: 700 }}>{rtl ? '‹' : '›'}</button>
          </div>
        </div>
        <div style={{ overflowX: 'auto', marginTop: 14, WebkitOverflowScrolling: 'touch' as any, borderRadius: 12, border: '1px solid var(--border)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 620 }}>
            <thead>
              <tr style={{ background: 'var(--surface2)', borderBottom: '1px solid var(--border)' }}>
                <th style={th}>{pick(lang, 'اليوم', 'Day', 'دن')}</th>
                <th style={th}>{pick(lang, 'هجري', 'Hijri', 'ہجری')}</th>
                {order.map(k => <th key={k} style={th}>{plbl(k)}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.d} style={{ borderBottom: '1px solid var(--border)', background: r.isToday ? 'var(--accent-soft)' : r.dow === 5 ? 'color-mix(in srgb, var(--accent-soft) 40%, transparent)' : 'transparent' }}>
                  <td style={{ ...td, fontWeight: r.isToday ? 800 : 600 }}>{r.d} {r.isToday && <span style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 800 }}>{pick(lang, '· اليوم', '· today', '· آج')}</span>}</td>
                  <td style={{ ...td, color: 'var(--muted)', fontSize: 12.5 }}>{r.h.d} {hMonArr(lang)[r.h.m - 1]}</td>
                  {order.map(k => <td key={k} style={{ ...td, fontWeight: r.isToday ? 700 : 400 }}>{fmtTime(r.t[k], h12, lang)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ margin: '12px 0 0', fontSize: 12, color: 'var(--muted)', lineHeight: 1.65 }}>
          {pick(lang,
            'المواقيت محسوبة فلكياً وقد تختلف بدقائق قليلة عن التقويم الرسمي المحلي. صفوف الجمعة مظلّلة.',
            'Times are astronomically calculated and may differ by a few minutes from official local timetables. Friday rows are highlighted.',
            'اوقات فلکی حساب سے ہیں اور مقامی سرکاری نظام الاوقات سے چند منٹ مختلف ہو سکتے ہیں۔ جمعہ کی قطاریں نمایاں ہیں۔')}
        </p>
      </section>
    </>
  );
}
