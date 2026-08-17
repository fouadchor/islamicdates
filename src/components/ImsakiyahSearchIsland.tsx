import { useState, useMemo, useRef, useId, useEffect } from 'react';
import { PT_CITIES, PT_COUNTRIES } from '../lib/cities';
import { imsakCityPath, type ImsakLang } from '../lib/imsakiyah';
import { type Lang, pick, isRTL } from '../lib/data';
import { normalizeSearch, matchRank } from '../lib/search';

interface Props { lang: Lang }

const MAX_RESULTS = 10;

/**
 * City/country search for the imsākiyya directory.
 *
 * Implemented as a real ARIA combobox rather than a filtered list: the results
 * are reachable by keyboard alone (arrows, Enter, Escape) and announced to screen
 * readers. The full country-by-country index still renders underneath in the HTML,
 * so this is an accelerator — never the only way to reach a city, and never
 * something a crawler has to execute to see the links.
 */
export default function ImsakiyahSearchIsland({ lang }: Props) {
  const rtl = isRTL(lang);
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const uid = useId();
  const listId = `${uid}-list`;

  const index = useMemo(() => PT_CITIES.map(c => {
    const country = PT_COUNTRIES.find(x => x.code === c.cc)!;
    return {
      city: c,
      country,
      cityName: pick(lang, c.ar, c.en, c.ur),
      countryName: pick(lang, country.ar, country.en, country.ur),
      // Every spelling is searchable regardless of the UI language, so an Urdu
      // reader on the Arabic site can still type "Karachi". Kept as separate
      // strings, not joined — see matchRank for why that matters to ranking.
      nCity: [c.ar, c.en, c.ur].map(normalizeSearch),
      nCountry: [country.ar, country.en, country.ur].map(normalizeSearch),
    };
  }), [lang]);

  const results = useMemo(() => {
    const nq = normalizeSearch(q);
    if (nq.length < 2) return [];
    return index
      .map(e => ({ e, rank: matchRank(nq, e.nCity, e.nCountry) }))
      .filter((r): r is { e: typeof index[number]; rank: number } => r.rank !== null)
      .sort((a, b) => a.rank - b.rank || a.e.cityName.localeCompare(b.e.cityName, lang))
      .slice(0, MAX_RESULTS)
      .map(r => r.e);
  }, [q, index, lang]);

  // Clamp the highlight whenever the result set changes under it.
  useEffect(() => { setActive(0); }, [q]);

  // Keep the highlighted row in view when arrowing past the visible edge.
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-i="${active}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const go = (i: number) => {
    const r = results[i];
    if (r) window.location.href = imsakCityPath(r.country.slug, r.city.slug, lang as ImsakLang);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { setQ(''); setOpen(false); return; }
    if (!results.length) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(i => (i + 1) % results.length); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(i => (i - 1 + results.length) % results.length); }
    else if (e.key === 'Home') { e.preventDefault(); setActive(0); }
    else if (e.key === 'End') { e.preventDefault(); setActive(results.length - 1); }
    else if (e.key === 'Enter') { e.preventDefault(); go(active); }
  };

  const showList = open && results.length > 0;
  const t = {
    ph: pick(lang, 'ابحث عن مدينتك أو دولتك… مثال: جدة، مصر، لندن',
                   'Search your city or country… e.g. Cairo, Egypt, London',
                   'اپنا شہر یا ملک تلاش کریں… مثلاً کراچی، پاکستان، لندن'),
    label: pick(lang, 'ابحث عن مدينة أو دولة', 'Search for a city or country', 'شہر یا ملک تلاش کریں'),
    clear: pick(lang, 'مسح البحث', 'Clear search', 'تلاش صاف کریں'),
    go: pick(lang, 'الإمساكية ←', 'Timetable →', 'نقشہ ←'),
    none: pick(lang, 'لا توجد نتائج — جرّب اسماً آخر أو تصفّح حسب الدولة أدناه.',
                     'No results — try another spelling, or browse by country below.',
                     'کوئی نتیجہ نہیں — دوسرا املا آزمائیں یا نیچے ملک کے لحاظ سے دیکھیں۔'),
    count: (n: number) => pick(lang, `${n} نتيجة`, `${n} results`, `${n} نتائج`),
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'relative' }}>
        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round"
          aria-hidden="true"
          style={{ position: 'absolute', top: 13, [rtl ? 'right' : 'left']: 14, pointerEvents: 'none' } as any}>
          <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
        </svg>

        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={showList}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={showList ? `${uid}-opt-${active}` : undefined}
          autoComplete="off"
          value={q}
          onChange={e => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
          onKeyDown={onKeyDown}
          placeholder={t.ph}
          aria-label={t.label}
          style={{
            width: '100%', boxSizing: 'border-box',
            padding: rtl ? '12px 42px 12px 40px' : '12px 40px 12px 42px',
            borderRadius: 12, border: '1px solid var(--border)',
            background: 'var(--surface2)', color: 'var(--text)', fontSize: 15,
          }}
        />

        {q && (
          <button type="button" onMouseDown={e => e.preventDefault()}
            onClick={() => { setQ(''); inputRef.current?.focus(); }}
            aria-label={t.clear}
            style={{
              position: 'absolute', top: 9, [rtl ? 'left' : 'right']: 10,
              width: 26, height: 26, borderRadius: 8, border: 'none',
              background: 'transparent', color: 'var(--muted)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            } as any}>
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Result count, for screen readers only. */}
      <span aria-live="polite" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clipPath: 'inset(50%)' }}>
        {normalizeSearch(q).length >= 2 ? t.count(results.length) : ''}
      </span>

      <ul
        ref={listRef}
        id={listId}
        role="listbox"
        aria-label={t.label}
        hidden={!showList}
        style={{
          listStyle: 'none', margin: '10px 0 0', padding: 0,
          display: 'flex', flexDirection: 'column', gap: 6,
          maxHeight: 340, overflowY: 'auto',
        }}
      >
        {results.map((r, i) => (
          <li key={`${r.country.slug}-${r.city.slug}`} id={`${uid}-opt-${i}`} role="option"
            aria-selected={i === active} data-i={i}>
            <a
              href={imsakCityPath(r.country.slug, r.city.slug, lang as ImsakLang)}
              onMouseEnter={() => setActive(i)}
              tabIndex={-1}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10,
                padding: '11px 14px', borderRadius: 11,
                border: '1px solid ' + (i === active ? 'var(--accent)' : 'var(--border)'),
                background: i === active ? 'var(--accent-soft)' : 'var(--surface2)',
                textDecoration: 'none', color: 'var(--text)',
              }}>
              <span style={{ fontWeight: 700, fontSize: 14.5 }}>
                {r.cityName}
                <span style={{ fontWeight: 500, color: 'var(--muted)', fontSize: 13 }}> · {r.countryName}</span>
              </span>
              <span style={{ color: 'var(--accent)', fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap' }}>{t.go}</span>
            </a>
          </li>
        ))}
      </ul>

      {normalizeSearch(q).length >= 2 && results.length === 0 && (
        <p style={{ margin: '10px 2px 0', fontSize: 13.5, color: 'var(--muted)' }}>{t.none}</p>
      )}
    </div>
  );
}
