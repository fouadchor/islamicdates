import { useState, useEffect, useRef } from 'react';
import { qiblaBearing, qiblaDistanceKm, compassPoint } from '../lib/qibla';
import { type Lang, pick, isRTL } from '../lib/data';

interface Props { lang: Lang }

type Status = 'idle' | 'locating' | 'ready' | 'denied' | 'error';
type Sensor = 'unavailable' | 'idle' | 'active' | 'denied';

const fmtNum = (n: number, lang: Lang) => new Intl.NumberFormat(pick(lang, 'ar-EG', 'en-US', 'ur-PK')).format(n);

export default function QiblaIsland({ lang }: Props) {
  const rtl = isRTL(lang);
  const [status, setStatus] = useState<Status>('idle');
  const [pos, setPos] = useState<{ lat: number; lng: number } | null>(null);
  const [heading, setHeading] = useState<number | null>(null);
  const [sensor, setSensor] = useState<Sensor>('idle');
  const listening = useRef(false);

  const bearing = pos ? qiblaBearing(pos.lat, pos.lng) : null;
  const distKm = pos ? qiblaDistanceKm(pos.lat, pos.lng) : null;
  const point = bearing !== null ? compassPoint(bearing) : null;

  const locate = () => {
    if (!navigator.geolocation) { setStatus('error'); return; }
    setStatus('locating');
    navigator.geolocation.getCurrentPosition(
      p => { setPos({ lat: p.coords.latitude, lng: p.coords.longitude }); setStatus('ready'); },
      err => setStatus(err.code === 1 ? 'denied' : 'error'),
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 },
    );
  };

  const onOrient = (e: DeviceOrientationEvent & { webkitCompassHeading?: number }) => {
    let h: number | null = null;
    if (typeof e.webkitCompassHeading === 'number') h = e.webkitCompassHeading; // iOS: degrees from north, clockwise
    else if (e.absolute && typeof e.alpha === 'number') h = (360 - e.alpha) % 360; // Android absolute
    else if (typeof e.alpha === 'number') h = (360 - e.alpha) % 360; // best effort
    if (h !== null && !Number.isNaN(h)) { setHeading(h); setSensor('active'); }
  };

  const startCompass = async () => {
    if (typeof window === 'undefined' || !('DeviceOrientationEvent' in window)) { setSensor('unavailable'); return; }
    const DOE = DeviceOrientationEvent as any;
    try {
      if (typeof DOE.requestPermission === 'function') { // iOS 13+
        const res = await DOE.requestPermission();
        if (res !== 'granted') { setSensor('denied'); return; }
      }
      if (!listening.current) {
        listening.current = true;
        if ('ondeviceorientationabsolute' in window) window.addEventListener('deviceorientationabsolute', onOrient as any, true);
        else window.addEventListener('deviceorientation', onOrient as any, true);
      }
      setSensor(s => (s === 'active' ? s : 'idle'));
      // If no reading arrives shortly, the device has no compass (most desktops).
      window.setTimeout(() => setSensor(s => (s === 'active' ? s : 'unavailable')), 3000);
    } catch { setSensor('denied'); }
  };

  useEffect(() => () => {
    if (listening.current) {
      window.removeEventListener('deviceorientationabsolute', onOrient as any, true);
      window.removeEventListener('deviceorientation', onOrient as any, true);
    }
  }, []);

  const card: React.CSSProperties = { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' };
  const busy = status === 'locating';
  const live = sensor === 'active' && heading !== null && bearing !== null;
  const roseRotation = live ? -heading! : 0;
  let diff = 0;
  if (live) { diff = ((bearing! - heading! + 540) % 360) - 180; }
  const aligned = live && Math.abs(diff) <= 3;

  const R = 130; // rose radius in the 300×300 viewBox
  const markerAngle = bearing !== null ? bearing : 0;
  const mx = 150 + R * Math.sin((markerAngle * Math.PI) / 180);
  const my = 150 - R * Math.cos((markerAngle * Math.PI) / 180);

  return (
    <section id="qibla" style={{ ...card, padding: '24px 26px', animation: 'fadeUp .5s ease' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 12.5, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 700 }}>🕋 {pick(lang, 'بوصلة القبلة', 'Qibla compass', 'قبلہ کمپاس')}</div>
          <h2 style={{ fontSize: 21, fontWeight: 800, margin: '4px 0 0' }}>{pick(lang, 'اتجاه القبلة من موقعك', 'Qibla direction from your location', 'آپ کے مقام سے قبلہ کا رخ')}</h2>
          <p style={{ fontSize: 13.5, color: 'var(--muted)', margin: '6px 0 0', lineHeight: 1.7 }}>
            {pick(lang,
              'حدد موقعك لمعرفة زاوية القبلة بدقة من الشمال الحقيقي والمسافة إلى الكعبة المشرفة، مع بوصلة حية على الجوال.',
              'Locate yourself to get the exact Qibla angle from true north and your distance to the Kaaba, with a live compass on mobile.',
              'اپنا مقام معلوم کریں: حقیقی شمال سے قبلہ کا درست زاویہ اور کعبہ تک فاصلہ، موبائل پر لائیو کمپاس کے ساتھ۔')}
          </p>
        </div>
        <button onClick={locate} disabled={busy}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '10px 16px', borderRadius: 11, border: '1px solid var(--accent)', background: 'var(--accent)', color: 'var(--accent-contrast)', fontWeight: 700, fontSize: 13.5, cursor: busy ? 'wait' : 'pointer', opacity: busy ? 0.75 : 1 }}>
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="3" /><path d="M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11Z" /></svg>
          {status === 'locating' ? pick(lang, 'جارٍ تحديد موقعك…', 'Locating…', 'مقام کا تعین ہو رہا ہے…')
            : status === 'ready' ? pick(lang, 'تحديث الموقع', 'Refresh location', 'مقام تازہ کریں')
            : pick(lang, 'حدد اتجاه القبلة', 'Find Qibla direction', 'قبلہ کا رخ معلوم کریں')}
        </button>
      </div>

      {(status === 'denied' || status === 'error') && (
        <div style={{ marginTop: 14, fontSize: 13.5, color: 'var(--gold)', lineHeight: 1.7 }}>
          {status === 'denied'
            ? pick(lang, 'تعذّر الوصول إلى موقعك. فعِّل إذن الموقع من إعدادات المتصفح ثم أعد المحاولة، أو استخدم صفحات المدن لمعرفة اتجاه القبلة في مدينتك.', 'Location access was denied. Enable location permission in your browser and try again, or use our city pages to find the Qibla for your city.', 'مقام تک رسائی نہیں ملی۔ براؤزر میں اجازت دے کر دوبارہ کوشش کریں، یا اپنے شہر کا قبلہ شہر کی صفحات سے دیکھیں۔')
            : pick(lang, 'حدث خطأ أثناء تحديد الموقع. حاول مرة أخرى.', 'Something went wrong while locating you. Please try again.', 'مقام معلوم کرنے میں خرابی ہوئی۔ دوبارہ کوشش کریں۔')}
        </div>
      )}

      {status === 'ready' && bearing !== null && (
        <>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 18 }}>
            <div style={{ flex: '1 1 140px', background: 'var(--accent-soft)', borderRadius: 12, padding: '12px 16px', textAlign: 'center' }}>
              <div style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 700 }}>{pick(lang, 'زاوية القبلة من الشمال', 'Qibla angle from north', 'شمال سے قبلہ کا زاویہ')}</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--accent)', marginTop: 2, direction: 'ltr' as any }}>{bearing.toFixed(1)}°</div>
            </div>
            <div style={{ flex: '1 1 140px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 12, padding: '12px 16px', textAlign: 'center' }}>
              <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 700 }}>{pick(lang, 'الاتجاه', 'Direction', 'سمت')}</div>
              <div style={{ fontSize: 20, fontWeight: 800, marginTop: 5 }}>{point ? pick(lang, point.ar, point.en, point.ur) : ''}</div>
            </div>
            <div style={{ flex: '1 1 140px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 12, padding: '12px 16px', textAlign: 'center' }}>
              <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 700 }}>{pick(lang, 'المسافة إلى الكعبة', 'Distance to the Kaaba', 'کعبہ تک فاصلہ')}</div>
              <div style={{ fontSize: 20, fontWeight: 800, marginTop: 5 }}>{fmtNum(distKm!, lang)} {pick(lang, 'كم', 'km', 'کلومیٹر')}</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
            <svg viewBox="0 0 300 300" width="260" height="260" role="img"
              aria-label={pick(lang, `اتجاه القبلة ${bearing.toFixed(0)} درجة من الشمال`, `Qibla direction ${bearing.toFixed(0)} degrees from north`, `قبلہ کا رخ شمال سے ${bearing.toFixed(0)} درجے`)}>
              <circle cx="150" cy="150" r="146" fill="var(--surface2)" stroke={aligned ? 'var(--accent)' : 'var(--border)'} strokeWidth={aligned ? 4 : 2} />
              <g style={{ transform: `rotate(${roseRotation}deg)`, transformOrigin: '150px 150px', transition: 'transform .25s ease-out' }}>
                {Array.from({ length: 72 }).map((_, i) => {
                  const a = (i * 5 * Math.PI) / 180;
                  const long = i % 18 === 0, mid = i % 9 === 0;
                  const r1 = long ? 128 : mid ? 133 : 138, r2 = 144;
                  return <line key={i}
                    x1={150 + r1 * Math.sin(a)} y1={150 - r1 * Math.cos(a)}
                    x2={150 + r2 * Math.sin(a)} y2={150 - r2 * Math.cos(a)}
                    stroke={long ? 'var(--accent)' : 'var(--muted)'} strokeWidth={long ? 2.5 : 1} opacity={long ? 0.9 : 0.45} />;
                })}
                <text x="150" y="30" textAnchor="middle" fontSize="17" fontWeight="800" fill="var(--accent)">{pick(lang, 'ش', 'N', 'ش')}</text>
                <text x="272" y="156" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--muted)">{pick(lang, 'ق', 'E', 'م')}</text>
                <text x="150" y="284" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--muted)">{pick(lang, 'ج', 'S', 'ج')}</text>
                <text x="28" y="156" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--muted)">{pick(lang, 'غ', 'W', 'م')}</text>
                <line x1="150" y1="150" x2={mx} y2={my} stroke="var(--accent)" strokeWidth="3.5" strokeLinecap="round" opacity="0.9" />
                <circle cx={mx} cy={my} r="17" fill="var(--accent)" />
                <text x={mx} y={my + 6} textAnchor="middle" fontSize="16">🕋</text>
              </g>
              {live && (
                <path d="M150 34 l-9 22 q9 -6 18 0 Z" fill={aligned ? 'var(--accent)' : 'var(--gold)'} />
              )}
              <circle cx="150" cy="150" r="5" fill="var(--accent)" />
            </svg>

            {live ? (
              <div style={{ marginTop: 12, fontSize: 14.5, fontWeight: 700, color: aligned ? 'var(--accent)' : 'var(--text)', textAlign: 'center' }}>
                {aligned
                  ? pick(lang, '✓ أنت الآن باتجاه القبلة', '✓ You are now facing the Qibla', '✓ آپ اب قبلہ رخ ہیں')
                  : pick(lang,
                      `دُر ${diff > 0 ? 'يميناً' : 'يساراً'} ${Math.abs(diff).toFixed(0)}°`,
                      `Turn ${diff > 0 ? 'right' : 'left'} ${Math.abs(diff).toFixed(0)}°`,
                      `${Math.abs(diff).toFixed(0)}° ${diff > 0 ? 'دائیں' : 'بائیں'} مڑیں`)}
              </div>
            ) : (
              <div style={{ marginTop: 12, textAlign: 'center' }}>
                {sensor === 'unavailable' ? (
                  <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 420 }}>
                    {pick(lang,
                      'لا تتوفر بوصلة في هذا الجهاز. استخدم الزاوية أعلاه مع أي بوصلة أو تطبيق خرائط: وجّه نفسك نحو الدرجة المحددة من الشمال.',
                      'No compass sensor on this device. Use the angle above with any compass or maps app: face the shown degrees from north.',
                      'اس ڈیوائس میں کمپاس سینسر نہیں۔ اوپر دیا گیا زاویہ کسی بھی کمپاس یا میپس ایپ کے ساتھ استعمال کریں: شمال سے اتنے درجے رخ کریں۔')}
                  </p>
                ) : sensor === 'denied' ? (
                  <p style={{ margin: 0, fontSize: 13, color: 'var(--gold)' }}>
                    {pick(lang, 'تم رفض إذن البوصلة. فعّله من إعدادات المتصفح ثم أعد المحاولة.', 'Compass permission denied. Enable it in browser settings and try again.', 'کمپاس کی اجازت نہیں ملی۔ براؤزر کی ترتیبات سے فعال کر کے دوبارہ کوشش کریں۔')}
                  </p>
                ) : (
                  <button onClick={startCompass}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '9px 15px', borderRadius: 11, border: '1px solid var(--accent)', background: 'transparent', color: 'var(--accent)', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                    🧭 {pick(lang, 'تشغيل البوصلة الحية (على الجوال)', 'Start live compass (on mobile)', 'لائیو کمپاس چلائیں (موبائل پر)')}
                  </button>
                )}
              </div>
            )}
          </div>
        </>
      )}

      <p style={{ margin: '18px 0 0', fontSize: 11.5, color: 'var(--muted)', lineHeight: 1.65 }}>
        {pick(lang,
          'تُحسب الزاوية بدقة فلكية على أقصر مسار (الدائرة العظمى) نحو الكعبة المشرفة (21.4225°، 39.8262°) من الشمال الحقيقي. بوصلة الجهاز تشير إلى الشمال المغناطيسي وقد تنحرف بضع درجات حسب منطقتك — للمعايرة حرّك جوالك على شكل الرقم 8 وابتعد عن المعادن والمغناطيس، ويُستحسن التأكيد بموقع الشمس أو المساجد المجاورة.',
          'The angle is computed astronomically along the great-circle (shortest) path to the Kaaba (21.4225°, 39.8262°) from true north. Device compasses point to magnetic north and may deviate by a few degrees depending on your region — calibrate by moving your phone in a figure-8, keep away from metal and magnets, and confirm with the sun or nearby mosques when possible.',
          'زاویہ فلکیاتی درستگی سے کعبہ (21.4225°، 39.8262°) کی طرف مختصر ترین راستے (عظیم دائرہ) پر حقیقی شمال سے نکالا جاتا ہے۔ ڈیوائس کا کمپاس مقناطیسی شمال دکھاتا ہے اور علاقے کے لحاظ سے چند درجے فرق ممکن ہے — فون کو 8 کی شکل میں گھما کر کیلیبریٹ کریں، دھات اور مقناطیس سے دور رہیں، اور ممکن ہو تو سورج یا قریبی مساجد سے تصدیق کریں۔')}
      </p>
    </section>
  );
}
