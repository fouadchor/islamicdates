import { useState } from 'react';
import { type Lang, pick, isRTL } from '../lib/data';

interface Props { lang: Lang }

interface Mosque { id: string; name: string; lat: number; lng: number; dist: number }

// Public Overpass API (OpenStreetMap) mirrors — free, no API key.
const ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
];

const R_EARTH = 6371000;
function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * R_EARTH * Math.asin(Math.sqrt(a));
}

function fmtDist(m: number, lang: Lang): string {
  if (m < 1000) return pick(lang, `${Math.round(m)} م`, `${Math.round(m)} m`, `${Math.round(m)} میٹر`);
  const km = (m / 1000).toFixed(1);
  return pick(lang, `${km} كم`, `${km} km`, `${km} کلومیٹر`);
}

async function queryOverpass(lat: number, lng: number, radius: number): Promise<Mosque[]> {
  const q = `[out:json][timeout:25];(
    nwr["amenity"="place_of_worship"]["religion"="muslim"](around:${radius},${lat},${lng});
    nwr["building"="mosque"](around:${radius},${lat},${lng});
  );out center tags 80;`;
  let lastErr: unknown = null;
  for (const url of ENDPOINTS) {
    try {
      const res = await fetch(url, { method: 'POST', body: 'data=' + encodeURIComponent(q), headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
      if (!res.ok) { lastErr = new Error(String(res.status)); continue; }
      const json = await res.json();
      const seen = new Set<string>();
      const out: Mosque[] = [];
      for (const el of json.elements || []) {
        const elat = el.lat ?? el.center?.lat;
        const elng = el.lon ?? el.center?.lon;
        if (typeof elat !== 'number' || typeof elng !== 'number') continue;
        const id = `${el.type}/${el.id}`;
        if (seen.has(id)) continue;
        seen.add(id);
        const t = el.tags || {};
        out.push({ id, name: t['name:ar'] || t.name || t['name:en'] || t['name:ur'] || '', lat: elat, lng: elng, dist: haversine(lat, lng, elat, elng) });
      }
      out.sort((a, b) => a.dist - b.dist);
      return out;
    } catch (e) { lastErr = e; }
  }
  throw lastErr || new Error('overpass failed');
}

type Status = 'idle' | 'locating' | 'searching' | 'done' | 'denied' | 'error';

export default function NearbyMosquesIsland({ lang }: Props) {
  const rtl = isRTL(lang);
  const [status, setStatus] = useState<Status>('idle');
  const [mosques, setMosques] = useState<Mosque[]>([]);
  const [radius, setRadius] = useState(3000);
  const [usedRadius, setUsedRadius] = useState(3000);
  const [pos, setPos] = useState<{ lat: number; lng: number } | null>(null);
  const [shown, setShown] = useState(10);

  const search = async (lat: number, lng: number, r: number) => {
    setStatus('searching');
    try {
      let list = await queryOverpass(lat, lng, r);
      let used = r;
      if (list.length === 0 && r < 10000) { used = 10000; list = await queryOverpass(lat, lng, 10000); }
      setMosques(list);
      setUsedRadius(used);
      setShown(10);
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  const locate = () => {
    if (!navigator.geolocation) { setStatus('error'); return; }
    setStatus('locating');
    navigator.geolocation.getCurrentPosition(
      p => { const lat = p.coords.latitude, lng = p.coords.longitude; setPos({ lat, lng }); search(lat, lng, radius); },
      err => setStatus(err.code === 1 ? 'denied' : 'error'),
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 },
    );
  };

  const changeRadius = (r: number) => { setRadius(r); if (pos) search(pos.lat, pos.lng, r); };

  const card: React.CSSProperties = { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' };
  const busy = status === 'locating' || status === 'searching';
  const unnamed = pick(lang, 'مسجد (بدون اسم مسجّل)', 'Mosque (unnamed)', 'مسجد (بے نام)');
  const gmapsSearch = 'https://www.google.com/maps/search/' + encodeURIComponent(pick(lang, 'مساجد قريبة مني', 'mosques near me', 'قریبی مساجد'));

  return (
    <section id="nearby-mosques" style={{ ...card, padding: '24px 26px', animation: 'fadeUp .5s ease' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 12.5, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 700 }}>🕌 {pick(lang, 'دليل المساجد', 'Mosque finder', 'مساجد فائنڈر')}</div>
          <h2 style={{ fontSize: 21, fontWeight: 800, margin: '4px 0 0' }}>{pick(lang, 'الجوامع القريبة من مكاني', 'Mosques near me', 'میرے قریب مساجد')}</h2>
          <p style={{ fontSize: 13.5, color: 'var(--muted)', margin: '6px 0 0', lineHeight: 1.7 }}>
            {pick(lang,
              'اعثر على أقرب الجوامع والمساجد إليك مرتّبة حسب المسافة، مع رابط الاتجاهات لكل مسجد.',
              'Find the closest mosques to you, sorted by distance, with directions for each one.',
              'اپنے قریب ترین مساجد فاصلے کے حساب سے ترتیب شدہ دیکھیں، ہر مسجد کے لیے راستے کے لنک کے ساتھ۔')}
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: rtl ? 'flex-start' : 'flex-end' }}>
          <button onClick={locate} disabled={busy}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '10px 16px', borderRadius: 11, border: '1px solid var(--accent)', background: 'var(--accent)', color: 'var(--accent-contrast)', fontWeight: 700, fontSize: 13.5, cursor: busy ? 'wait' : 'pointer', opacity: busy ? 0.75 : 1 }}>
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="3" /><path d="M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11Z" /></svg>
            {status === 'locating' ? pick(lang, 'جارٍ تحديد موقعك…', 'Locating…', 'مقام کا تعین ہو رہا ہے…')
              : status === 'searching' ? pick(lang, 'جارٍ البحث…', 'Searching…', 'تلاش جاری ہے…')
              : status === 'done' ? pick(lang, 'تحديث النتائج', 'Refresh results', 'نتائج تازہ کریں')
              : pick(lang, 'اعرض الجوامع القريبة مني', 'Show mosques near me', 'قریبی مساجد دکھائیں')}
          </button>
          {status === 'done' && (
            <label style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12.5, color: 'var(--muted)' }}>
              {pick(lang, 'نطاق البحث', 'Search radius', 'تلاش کا دائرہ')}
              <select value={radius} onChange={e => changeRadius(Number(e.target.value))}
                style={{ padding: '7px 10px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--surface2)', color: 'var(--text)', fontSize: 13 }}>
                <option value={1000}>{pick(lang, '1 كم', '1 km', '1 کلومیٹر')}</option>
                <option value={3000}>{pick(lang, '3 كم', '3 km', '3 کلومیٹر')}</option>
                <option value={5000}>{pick(lang, '5 كم', '5 km', '5 کلومیٹر')}</option>
                <option value={10000}>{pick(lang, '10 كم', '10 km', '10 کلومیٹر')}</option>
              </select>
            </label>
          )}
        </div>
      </div>

      {status === 'denied' && (
        <div style={{ marginTop: 14, fontSize: 13.5, color: 'var(--gold)', lineHeight: 1.7 }}>
          {pick(lang,
            'تعذّر الوصول إلى موقعك. فعِّل إذن الموقع من إعدادات المتصفح، أو ابحث مباشرة في ',
            'Location access was denied. Enable location permission in your browser settings, or search directly on ',
            'مقام تک رسائی نہیں ملی۔ براؤزر کی ترتیبات سے اجازت دیں، یا براہِ راست تلاش کریں: ')}
          <a href={gmapsSearch} target="_blank" rel="noopener" style={{ color: 'var(--accent)' }}>{pick(lang, 'خرائط جوجل', 'Google Maps', 'گوگل میپس')}</a>.
        </div>
      )}
      {status === 'error' && (
        <div style={{ marginTop: 14, fontSize: 13.5, color: 'var(--gold)', lineHeight: 1.7 }}>
          {pick(lang,
            'حدث خطأ أثناء البحث. حاول مرة أخرى بعد قليل، أو ابحث مباشرة في ',
            'Something went wrong while searching. Try again shortly, or search directly on ',
            'تلاش کے دوران خرابی ہوئی۔ تھوڑی دیر بعد دوبارہ کوشش کریں، یا براہِ راست تلاش کریں: ')}
          <a href={gmapsSearch} target="_blank" rel="noopener" style={{ color: 'var(--accent)' }}>{pick(lang, 'خرائط جوجل', 'Google Maps', 'گوگل میپس')}</a>.
        </div>
      )}

      {status === 'done' && mosques.length === 0 && (
        <div style={{ marginTop: 14, fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.7 }}>
          {pick(lang,
            'لم نعثر على مساجد مسجّلة في خرائط OpenStreetMap ضمن 10 كم من موقعك. جرّب البحث في ',
            'No mosques registered on OpenStreetMap were found within 10 km of your location. Try searching on ',
            'آپ کے مقام سے 10 کلومیٹر کے اندر OpenStreetMap پر کوئی مسجد درج نہیں ملی۔ تلاش کریں: ')}
          <a href={gmapsSearch} target="_blank" rel="noopener" style={{ color: 'var(--accent)' }}>{pick(lang, 'خرائط جوجل', 'Google Maps', 'گوگل میپس')}</a>.
        </div>
      )}

      {status === 'done' && mosques.length > 0 && (
        <>
          <div style={{ marginTop: 16, fontSize: 12.5, color: 'var(--muted)' }}>
            {pick(lang,
              `عُثر على ${mosques.length} مسجداً ضمن ${usedRadius / 1000} كم من موقعك، الأقرب أولاً:`,
              `Found ${mosques.length} mosque${mosques.length > 1 ? 's' : ''} within ${usedRadius / 1000} km of your location, closest first:`,
              `آپ کے مقام سے ${usedRadius / 1000} کلومیٹر کے اندر ${mosques.length} مساجد ملیں، قریب ترین پہلے:`)}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
            {mosques.slice(0, shown).map((m, i) => (
              <div key={m.id} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '12px 16px', borderRadius: 12, border: i === 0 ? '1px solid var(--accent)' : '1px solid var(--border)', background: i === 0 ? 'var(--accent-soft)' : 'var(--surface2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                  <span aria-hidden="true" style={{ fontSize: 17 }}>🕌</span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, color: i === 0 ? 'var(--accent)' : 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.name || unnamed}</div>
                    <div style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 2 }}>{fmtDist(m.dist, lang)}{i === 0 ? pick(lang, ' · الأقرب إليك', ' · closest to you', ' · قریب ترین') : ''}</div>
                  </div>
                </div>
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${m.lat}%2C${m.lng}`}
                  target="_blank" rel="noopener"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 12px', borderRadius: 10, border: '1px solid var(--accent)', color: 'var(--accent)', textDecoration: 'none', fontWeight: 700, fontSize: 12.5, whiteSpace: 'nowrap' }}>
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>
                  {pick(lang, 'الاتجاهات', 'Directions', 'راستہ')}
                </a>
              </div>
            ))}
          </div>
          {mosques.length > shown && (
            <button onClick={() => setShown(s => s + 10)}
              style={{ marginTop: 12, padding: '9px 16px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--surface2)', color: 'var(--text)', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
              {pick(lang, `عرض المزيد (${mosques.length - shown})`, `Show more (${mosques.length - shown})`, `مزید دکھائیں (${mosques.length - shown})`)}
            </button>
          )}
        </>
      )}

      <p style={{ margin: '16px 0 0', fontSize: 11.5, color: 'var(--muted)', lineHeight: 1.65 }}>
        {pick(lang,
          'يُستخدم موقعك داخل متصفحك فقط للبحث في قاعدة بيانات الخرائط ولا يُخزَّن لدينا. بيانات المساجد من خرائط OpenStreetMap وقد لا تشمل كل المساجد في منطقتك.',
          'Your location is used only in your browser to query the map database and is never stored by us. Mosque data comes from OpenStreetMap and may not include every mosque in your area.',
          'آپ کا مقام صرف آپ کے براؤزر میں نقشے کے ڈیٹا بیس سے تلاش کے لیے استعمال ہوتا ہے اور ہمارے پاس محفوظ نہیں ہوتا۔ مساجد کا ڈیٹا OpenStreetMap سے ہے اور ممکن ہے آپ کے علاقے کی ہر مسجد شامل نہ ہو۔')}
        {' '}<a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener" style={{ color: 'var(--muted)' }}>© OpenStreetMap</a>
      </p>
    </section>
  );
}
