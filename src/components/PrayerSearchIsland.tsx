import { useState, useMemo } from 'react';
import { PT_CITIES, PT_COUNTRIES, cityPath, type PtLang } from '../lib/cities';
import { type Lang, pick, isRTL } from '../lib/data';

interface Props { lang: Lang }

// Normalise Arabic/Urdu text for forgiving search (strip diacritics, unify alef/yaa forms).
function norm(s: string): string {
  return s.toLowerCase()
    .replace(/[ً-ٰٟ]/g, '')
    .replace(/[أإآٱ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه')
    .replace(/[ئى]/g, 'ی').replace(/ك/g, 'ک')
    .trim();
}

export default function PrayerSearchIsland({ lang }: Props) {
  const rtl = isRTL(lang);
  const [q, setQ] = useState('');

  const index = useMemo(() => PT_CITIES.map(c => {
    const country = PT_COUNTRIES.find(x => x.code === c.cc)!;
    return {
      city: c, country,
      hay: norm(`${c.ar} ${c.en} ${c.ur} ${country.ar} ${country.en} ${country.ur}`),
    };
  }), []);

  const results = useMemo(() => {
    const nq = norm(q);
    if (nq.length < 2) return [];
    return index.filter(e => e.hay.includes(nq)).slice(0, 8);
  }, [q, index]);

  return (
    <div>
      <div style={{ position: 'relative' }}>
        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round"
          style={{ position: 'absolute', top: 13, [rtl ? 'right' : 'left']: 14 } as any}>
          <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="search" value={q} onChange={e => setQ(e.target.value)}
          placeholder={pick(lang, 'ابحث عن مدينتك… مثال: جدة، لندن، كراتشي', 'Search your city… e.g. London, Jeddah, Karachi', 'اپنا شہر تلاش کریں… مثلاً کراچی، لاہور، لندن')}
          aria-label={pick(lang, 'ابحث عن مدينة', 'Search for a city', 'شہر تلاش کریں')}
          style={{ width: '100%', boxSizing: 'border-box', padding: rtl ? '12px 42px 12px 14px' : '12px 14px 12px 42px', borderRadius: 12, border: '1px solid var(--border)', background: 'var(--surface2)', color: 'var(--text)', fontSize: 15 }}
        />
      </div>
      {results.length > 0 && (
        <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {results.map(({ city, country }) => (
            <a key={`${country.slug}-${city.slug}`} href={cityPath(country.slug, city.slug, lang as PtLang)}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, padding: '11px 14px', borderRadius: 11, border: '1px solid var(--border)', background: 'var(--surface2)', textDecoration: 'none', color: 'var(--text)' }}>
              <span style={{ fontWeight: 700, fontSize: 14.5 }}>{pick(lang, city.ar, city.en, city.ur)}
                <span style={{ fontWeight: 500, color: 'var(--muted)', fontSize: 13 }}> · {pick(lang, country.ar, country.en, country.ur)}</span>
              </span>
              <span style={{ color: 'var(--accent)', fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap' }}>{pick(lang, 'المواقيت ←', 'Times →', 'اوقات ←')}</span>
            </a>
          ))}
        </div>
      )}
      {q.trim().length >= 2 && results.length === 0 && (
        <p style={{ margin: '10px 2px 0', fontSize: 13.5, color: 'var(--muted)' }}>
          {pick(lang, 'لا توجد نتائج — جرّب اسماً آخر أو تصفّح حسب الدولة أدناه.', 'No results — try another spelling or browse by country below.', 'کوئی نتیجہ نہیں — دوسرا املا آزمائیں یا نیچے ملک کے لحاظ سے دیکھیں۔')}
        </p>
      )}
    </div>
  );
}
