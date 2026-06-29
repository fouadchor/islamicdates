import { useState, useEffect, useRef } from 'react';
import { g2h, h2g, daysInHMonth, getOcc, occName, dotColor, todayUTC } from '../lib/hijri';
import { type Lang, toLang, pick, hMonArr, gShortArr, wdHeadArr, hijriEra } from '../lib/data';

interface Props { lang: Lang }

declare global { interface Window { html2canvas?: any; jspdf?: any } }

interface Cell { hd: number; greg: Date; occCat?: string; occName?: string; isToday: boolean }

export default function PrintCalendarIsland({ lang }: Props) {
  const ll = toLang(lang);
  const hMon = hMonArr(lang);
  const gShort = gShortArr(lang);
  const wdHead = wdHeadArr(lang);
  const era = hijriEra(lang);

  const [mounted, setMounted] = useState(false);
  const [todayKey, setTodayKey] = useState<number | null>(null);
  const buildHy = g2h(todayUTC()).y;
  const [hy, setHy] = useState(buildHy);
  const [view, setView] = useState<'year' | 'month'>('year');
  const [hm, setHm] = useState(g2h(todayUTC()).m);
  const [busy, setBusy] = useState('');
  const sheetRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const scalerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [scaledH, setScaledH] = useState<number | undefined>(undefined);

  // Design width of the printable sheet (keeps PDF/PNG output crisp & A4-friendly).
  const sheetW = view === 'year' ? 1040 : 560;

  useEffect(() => {
    setMounted(true);
    const t = todayUTC();
    setTodayKey(t.getUTCFullYear() * 10000 + (t.getUTCMonth() + 1) * 100 + t.getUTCDate());
  }, []);

  // Fit the fixed-width sheet to the available width on narrow screens by scaling
  // a wrapper (NOT the capture target), so downloads stay full resolution.
  useEffect(() => {
    if (!mounted) return;
    const recompute = () => {
      const wrap = wrapRef.current, sheet = sheetRef.current;
      if (!wrap || !sheet) return;
      const avail = wrap.clientWidth;
      const s = Math.min(1, avail / sheetW);
      setScale(s);
      setScaledH(sheet.offsetHeight * s); // offsetHeight ignores transforms
    };
    recompute();
    const ro = new ResizeObserver(recompute);
    if (wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener('resize', recompute);
    return () => { ro.disconnect(); window.removeEventListener('resize', recompute); };
  }, [mounted, view, hy, hm, sheetW]);

  const t = {
    yearLabel: pick(lang, 'السنة الهجرية', 'Hijri year', 'ہجری سال'),
    fullYear: pick(lang, 'السنة كاملة', 'Full year', 'پورا سال'),
    oneMonth: pick(lang, 'شهر واحد', 'Single month', 'ایک مہینہ'),
    monthLabel: pick(lang, 'الشهر', 'Month', 'مہینہ'),
    dlPdf: pick(lang, 'تنزيل PDF', 'Download PDF', 'PDF ڈاؤن لوڈ'),
    dlPng: pick(lang, 'تنزيل PNG', 'Download PNG', 'PNG ڈاؤن لوڈ'),
    print: pick(lang, 'طباعة', 'Print', 'پرنٹ کریں'),
    preparing: pick(lang, 'جارٍ التحضير…', 'Preparing…', 'تیار ہو رہا ہے…'),
    yearTitle: (y: number) => pick(lang, `التقويم الهجري ${y} هـ`, `Hijri Calendar ${y} AH`, `ہجری کیلنڈر ${y} ھ`),
    brand: pick(lang, 'التقويم الهجري · islamicdates.org', 'Hijri Calendar · islamicdates.org', 'ہجری کیلنڈر · islamicdates.org'),
    today: pick(lang, 'اليوم', 'Today', 'آج'),
    eid: pick(lang, 'عيد', 'Eid', 'عید'),
    holy: pick(lang, 'مناسبة دينية', 'Religious day', 'دینی مناسبت'),
    ram: pick(lang, 'رمضان', 'Ramadan', 'رمضان'),
  };

  const buildMonth = (y: number, m: number): { lead: number; cells: Cell[] } => {
    const first = h2g(y, m, 1);
    const total = daysInHMonth(y, m);
    const lead = (first.getUTCDay() + 1) % 7; // week starts Saturday
    const cells: Cell[] = [];
    for (let d = 1; d <= total; d++) {
      const greg = new Date(first.getTime() + (d - 1) * 86400000);
      const key = greg.getUTCFullYear() * 10000 + (greg.getUTCMonth() + 1) * 100 + greg.getUTCDate();
      const raw = getOcc(m, d);
      cells.push({ hd: d, greg, occCat: raw ? raw[0] : undefined, occName: raw ? occName(raw, lang) : undefined, isToday: todayKey === key });
    }
    return { lead, cells };
  };

  const MonthBlock = ({ m, big }: { m: number; big: boolean }) => {
    const { lead, cells } = buildMonth(hy, m);
    const cellMin = big ? 46 : 26;
    const numSize = big ? 17 : 12.5;
    return (
      <div style={{ breakInside: 'avoid' }}>
        <div style={{ textAlign: 'center', fontWeight: 800, fontSize: big ? 20 : 14, color: 'var(--accent)', marginBottom: 6 }}>{hMon[m - 1]} {hy}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: big ? 5 : 2 }}>
          {wdHead.map((w, i) => (
            <div key={'h' + i} style={{ textAlign: 'center', fontSize: big ? 12 : 8.5, fontWeight: 700, color: i === 6 ? 'var(--accent)' : 'var(--muted)', padding: '2px 0' }}>{w}</div>
          ))}
          {Array.from({ length: lead }).map((_, i) => <div key={'b' + i} />)}
          {cells.map((c, i) => (
            <div key={i} style={{
              position: 'relative', minHeight: cellMin, borderRadius: big ? 9 : 5,
              border: '1px solid ' + (c.isToday ? 'var(--accent)' : 'var(--border)'),
              background: c.isToday ? 'var(--accent)' : (m === 9 ? 'var(--accent-soft)' : 'var(--surface2)'),
              color: c.isToday ? 'var(--accent-contrast)' : 'var(--text)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1, padding: big ? '4px 0' : '2px 0',
            }}>
              {big && <span style={{ fontSize: 9, lineHeight: 1, opacity: c.isToday ? 0.9 : 0.6, color: c.isToday ? 'var(--accent-contrast)' : 'var(--muted)' }}>{gShort[c.greg.getUTCMonth()]} {c.greg.getUTCDate()}</span>}
              <span style={{ fontWeight: 700, fontSize: numSize, lineHeight: 1 }}>{c.hd}</span>
              {c.occCat && <span style={{ position: 'absolute', bottom: big ? 4 : 2, width: big ? 5 : 4, height: big ? 5 : 4, borderRadius: '50%', background: c.isToday ? 'var(--accent-contrast)' : dotColor(c.occCat as any) }} />}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const yearFirst = h2g(hy, 1, 1);
  const yearLast = h2g(hy, 12, daysInHMonth(hy, 12));
  const gSpan = `${gShort[yearFirst.getUTCMonth()]} ${yearFirst.getUTCFullYear()} – ${gShort[yearLast.getUTCMonth()]} ${yearLast.getUTCFullYear()}`;

  const baseName = view === 'year' ? `hijri-calendar-${hy}` : `hijri-${hMon[hm - 1]}-${hy}`;

  const ensureLibs = () => typeof window !== 'undefined' && window.html2canvas;
  const capture = async () => {
    const node = sheetRef.current;
    if (!node || !ensureLibs()) return null;
    // Strip the fit-to-width scaling during capture so html2canvas measures the
    // sheet at its full design size — keeps exported PNG/PDF at full resolution.
    const scaler = scalerRef.current;
    const prev = scaler ? scaler.style.transform : '';
    if (scaler) scaler.style.transform = 'none';
    try {
      return await window.html2canvas(node, { scale: 2, backgroundColor: '#ffffff', useCORS: true, logging: false });
    } finally {
      if (scaler) scaler.style.transform = prev;
    }
  };
  const downloadPng = async () => {
    setBusy('png');
    try { const c = await capture(); if (c) { const a = document.createElement('a'); a.href = c.toDataURL('image/png'); a.download = baseName + '.png'; a.click(); } }
    finally { setBusy(''); }
  };
  const downloadPdf = async () => {
    setBusy('pdf');
    try {
      const c = await capture();
      if (c && window.jspdf) {
        const { jsPDF } = window.jspdf;
        const orientation = view === 'year' ? 'landscape' : 'portrait';
        const pdf = new jsPDF({ orientation, unit: 'pt', format: 'a4' });
        const pw = pdf.internal.pageSize.getWidth(), ph = pdf.internal.pageSize.getHeight();
        const margin = 18;
        const r = Math.min((pw - margin * 2) / c.width, (ph - margin * 2) / c.height);
        const w = c.width * r, h = c.height * r;
        pdf.addImage(c.toDataURL('image/png'), 'PNG', (pw - w) / 2, (ph - h) / 2, w, h);
        pdf.save(baseName + '.pdf');
      }
    } finally { setBusy(''); }
  };

  const btn: React.CSSProperties = { padding: '10px 16px', borderRadius: 11, border: 'none', background: 'var(--accent)', color: 'var(--accent-contrast)', fontWeight: 700, fontSize: 14, cursor: 'pointer' };
  const btn2: React.CSSProperties = { ...btn, background: 'var(--surface2)', color: 'var(--accent)', border: '1px solid var(--border)' };
  const ctrl: React.CSSProperties = { padding: '9px 12px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)', fontSize: 14, fontWeight: 600 };
  const pillS = (a: boolean): React.CSSProperties => ({ padding: '8px 14px', borderRadius: 999, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13.5, background: a ? 'var(--accent)' : 'transparent', color: a ? 'var(--accent-contrast)' : 'var(--muted)' });

  if (!mounted) return <div style={{ minHeight: 300 }} />;

  const Legend = () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center', marginTop: 14, fontSize: 12, color: 'var(--muted)' }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 11, height: 11, borderRadius: '50%', background: 'var(--accent)' }} />{t.today}</span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 11, height: 11, borderRadius: '50%', background: 'var(--gold)' }} />{t.eid}</span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 11, height: 11, borderRadius: '50%', background: 'var(--holy)' }} />{t.holy}</span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 13, height: 11, borderRadius: 3, background: 'var(--accent-soft)', border: '1px solid var(--accent)' }} />{t.ram}</span>
    </div>
  );

  return (
    <div>
      {/* Controls (not captured / not printed) */}
      <div className="no-print" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button style={btn2} aria-label="−" onClick={() => setHy(y => y - 1)}>−</button>
          <span style={{ ...ctrl, minWidth: 96, textAlign: 'center' }}>{hy} {era}</span>
          <button style={btn2} aria-label="+" onClick={() => setHy(y => y + 1)}>+</button>
        </div>
        <div style={{ display: 'flex', gap: 3, background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 999, padding: 4 }}>
          <button style={pillS(view === 'year')} onClick={() => setView('year')}>{t.fullYear}</button>
          <button style={pillS(view === 'month')} onClick={() => setView('month')}>{t.oneMonth}</button>
        </div>
        {view === 'month' && (
          <select value={hm} onChange={e => setHm(+e.target.value)} style={ctrl}>
            {hMon.map((n, i) => <option key={i + 1} value={i + 1}>{n}</option>)}
          </select>
        )}
        <div style={{ display: 'flex', gap: 8, marginInlineStart: 'auto', flexWrap: 'wrap' }}>
          <button style={btn} onClick={downloadPdf} disabled={!!busy}>{busy === 'pdf' ? t.preparing : '⬇ ' + t.dlPdf}</button>
          <button style={btn2} onClick={downloadPng} disabled={!!busy}>{busy === 'png' ? t.preparing : '⬇ ' + t.dlPng}</button>
          <button style={btn2} onClick={() => window.print()}>🖨 {t.print}</button>
        </div>
      </div>

      {/* Print-sheet print resets: undo the on-screen fit-to-width scaling when printing */}
      <style>{`
        @media print {
          .sheet-spacer { height: auto !important; overflow: visible !important; }
          .sheet-scaler { transform: none !important; width: 100% !important; }
          #print-sheet { width: 100% !important; max-width: 100% !important; }
        }
      `}</style>

      {/* Fit-to-width wrapper: the sheet renders at its fixed design width and the
          scaler shrinks it to fit narrow screens. The capture target (#print-sheet)
          itself carries NO transform, so html2canvas exports at full resolution. */}
      <div ref={wrapRef} style={{ width: '100%' }}>
        <div className="sheet-spacer" style={{ height: scaledH, overflow: 'hidden' }}>
          <div className="sheet-scaler" ref={scalerRef} style={{ width: sheetW, transform: `scale(${scale})`, transformOrigin: lang === 'en' ? 'top left' : 'top right' }}>
            <div id="print-sheet" ref={sheetRef} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: view === 'year' ? '22px 22px 16px' : '22px', width: sheetW, margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <div style={{ fontSize: view === 'year' ? 24 : 22, fontWeight: 800, color: 'var(--text)' }}>
                  {view === 'year' ? t.yearTitle(hy) : `${hMon[hm - 1]} ${hy} ${era}`}
                </div>
                <div style={{ fontSize: 13.5, color: 'var(--muted)', marginTop: 3 }}>{view === 'year' ? gSpan : ''}</div>
              </div>

              {view === 'year' ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                  {Array.from({ length: 12 }, (_, i) => <MonthBlock key={i} m={i + 1} big={false} />)}
                </div>
              ) : (
                <MonthBlock m={hm} big={true} />
              )}

              <Legend />
              <div style={{ textAlign: 'center', marginTop: 14, fontSize: 12, color: 'var(--muted)', fontWeight: 600 }}>{t.brand}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
