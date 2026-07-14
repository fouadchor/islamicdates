import { useState, useRef, useEffect } from 'react';
import { g2h, h2g, daysInHMonth, getOcc, occName, dotColor, todayUTC } from '../lib/hijri';
import type { HDate } from '../lib/hijri';
import { type Lang, toLang, pick, isRTL, hMonArr, gMonArr, gShortArr, wdArr, wdHeadArr, hijriEra, gregEra } from '../lib/data';

interface Props { lang: Lang }

export default function CalendarIsland({ lang }: Props) {
  const ll = toLang(lang);
  const rtl = isRTL(lang);

  // "Today" must come from the visitor's own clock, never the build server — a static
  // build would otherwise bake a stale date (and a stray highlight in other months).
  const buildTH = g2h(todayUTC()); // build-time month, used only as the initial view
  const [todayKey, setTodayKey] = useState<number | null>(null);
  const [viewY, setViewY] = useState(buildTH.y);
  const [viewM, setViewM] = useState(buildTH.m);
  const [fading, setFading] = useState(false);
  const [selDate, setSelDate] = useState<Date | null>(null);
  const [selCopied, setSelCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navedRef = useRef(false);

  // On mount: set today's highlight from the local clock and jump the view to today's
  // month; refresh again at the next local midnight so the highlight moves on its own.
  useEffect(() => {
    const apply = () => {
      const t = todayUTC();
      const th = g2h(t);
      setTodayKey(t.getUTCFullYear() * 10000 + (t.getUTCMonth() + 1) * 100 + t.getUTCDate());
      if (!navedRef.current) { setViewY(th.y); setViewM(th.m); }
    };
    apply();
    const now = new Date();
    const msToMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - now.getTime();
    const t = setTimeout(apply, msToMidnight + 1000);
    return () => clearTimeout(t);
  }, []);

  const hMon  = hMonArr(lang);
  const gMon  = gMonArr(lang);
  const gShort= gShortArr(lang);
  const wdHead= wdHeadArr(lang);
  const wdFull= wdArr(lang);
  const sep   = ll === 'en' ? ', ' : '، ';

  const fmtH = (d: Date, wd: boolean) => {
    const h = g2h(d);
    const w = wd ? wdFull[d.getUTCDay()] + sep : '';
    return `${w}${h.d} ${hMon[h.m-1]} ${h.y} ${hijriEra(lang)}`;
  };
  const fmtG = (d: Date, wd: boolean) => {
    const w = wd ? wdFull[d.getUTCDay()] + sep : '';
    return `${w}${d.getUTCDate()} ${gMon[d.getUTCMonth()]} ${d.getUTCFullYear()} ${gregEra(lang)}`;
  };

  const nav = (delta: number) => {
    navedRef.current = true;
    setFading(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      let m = viewM + delta, y = viewY;
      if (m > 12) { m = 1; y++; }
      if (m < 1)  { m = 12; y--; }
      setViewM(m); setViewY(y); setFading(false);
    }, 150);
  };

  const goToday = () => {
    setFading(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    const t = todayUTC();
    const th = g2h(t);
    navedRef.current = false;
    setSelDate(t); // move the selected square (and detail card) back to today
    timerRef.current = setTimeout(() => { setViewY(th.y); setViewM(th.m); setFading(false); }, 150);
  };

  const total = daysInHMonth(viewY, viewM);
  const first = h2g(viewY, viewM, 1);
  const lead  = (first.getUTCDay() + 1) % 7; // week starts Saturday
  const cells: { show: boolean; d?: number; date?: Date; key?: number; isToday?: boolean; isSel?: boolean; isRam?: boolean; occ?: ReturnType<typeof getOcc>; showMon?: boolean; gmShort?: string; gd?: number }[] = [];

  for (let i = 0; i < lead; i++) cells.push({ show: false });

  for (let d = 1; d <= total; d++) {
    const date = new Date(first.getTime() + (d - 1) * 86400000);
    const key  = date.getUTCFullYear() * 10000 + (date.getUTCMonth() + 1) * 100 + date.getUTCDate();
    const gd   = date.getUTCDate();
    const showMon = d === 1 || gd === 1;
    cells.push({ show:true, d, date, key, isToday: todayKey !== null && key === todayKey, isSel: selDate ? key === (selDate.getUTCFullYear()*10000+(selDate.getUTCMonth()+1)*100+selDate.getUTCDate()) : false, isRam: viewM===9, occ: getOcc(viewM,d), showMon, gmShort: gShort[date.getUTCMonth()], gd });
  }

  // month title
  const lastDate = h2g(viewY, viewM, total);
  const gm1 = gMon[first.getUTCMonth()], gy1 = first.getUTCFullYear();
  const gm2 = gMon[lastDate.getUTCMonth()], gy2 = lastDate.getUTCFullYear();
  let monthTitleG = '';
  if (first.getUTCMonth() === lastDate.getUTCMonth() && gy1 === gy2) monthTitleG = `${gm1} ${gy1}`;
  else if (gy1 === gy2) monthTitleG = `${gm1} – ${gm2} ${gy1}`;
  else monthTitleG = `${gm1} ${gy1} – ${gm2} ${gy2}`;

  // selected day info
  const isoC = (d: Date) => `${d.getUTCFullYear()}${String(d.getUTCMonth()+1).padStart(2,'0')}${String(d.getUTCDate()).padStart(2,'0')}`;
  let selHijri='', selGreg='', selOcc: string|null=null, selRelLabel='', selGcal='';
  if (selDate) {
    selHijri = fmtH(selDate, true);
    selGreg  = fmtG(selDate, false);
    const sh = g2h(selDate);
    const so = getOcc(sh.m, sh.d);
    selOcc = so ? occName(so, lang) : (sh.m===9 ? pick(lang, 'شهر رمضان', 'Ramadan', 'رمضان') : null);
    const diff = Math.round((selDate.getTime() - todayUTC().getTime()) / 86400000);
    selRelLabel = diff === 0
      ? pick(lang, 'اليوم', 'Today', 'آج')
      : diff > 0
        ? pick(lang, `بعد ${diff} يوم`, `in ${diff} day${diff===1?'':'s'}`, `${diff} دن بعد`)
        : pick(lang, `قبل ${-diff} يوم`, `${-diff} day${-diff===1?'':'s'} ago`, `${-diff} دن پہلے`);
    const title = selOcc || selHijri;
    selGcal = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${isoC(selDate)}/${isoC(new Date(selDate.getTime()+86400000))}&details=${encodeURIComponent(selHijri + ' — islamicdates.org')}`;
  }
  const copySel = () => {
    if (!selDate) return;
    try { navigator.clipboard?.writeText(fmtH(selDate, true) + ' — ' + fmtG(selDate, false)); } catch {}
    setSelCopied(true); setTimeout(() => setSelCopied(false), 1600);
  };

  const btnBase: React.CSSProperties = { width:42, height:42, borderRadius:12, border:'1px solid var(--border)', background:'var(--surface2)', color:'var(--accent)', fontSize:22, display:'flex', alignItems:'center', justifyContent:'center', lineHeight:'1', transition:'all .2s' };

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
      <section className="card" style={{ padding:'22px 22px 26px' }}>
        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, marginBottom:18, flexWrap:'wrap' }}>
          <div>
            <h2 style={{ margin:0, fontWeight:700, fontSize:'clamp(21px,3.6vw,29px)', lineHeight:1.1 }}>
              {hMon[viewM-1]} {viewY} {hijriEra(lang)}
            </h2>
            <div style={{ color:'var(--muted)', fontSize:'14.5px', marginTop:3 }}>{monthTitleG}</div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <button onClick={goToday}
              style={{ padding:'9px 15px', borderRadius:11, border:'1px solid var(--border)', background:'var(--surface2)', color:'var(--accent)', fontWeight:700, fontSize:'13.5px', transition:'all .2s' }}
              onMouseEnter={e => { e.currentTarget.style.background='var(--accent)'; e.currentTarget.style.color='var(--accent-contrast)'; e.currentTarget.style.borderColor='var(--accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.background='var(--surface2)'; e.currentTarget.style.color='var(--accent)'; e.currentTarget.style.borderColor='var(--border)'; }}>
              {pick(lang, 'اليوم', 'Today', 'آج')}
            </button>
            <button onClick={() => nav(-1)} style={btnBase} aria-label={pick(lang, 'الشهر السابق', 'Previous month', 'پچھلا مہینہ')}
              onMouseEnter={e => { e.currentTarget.style.background='var(--accent)'; e.currentTarget.style.color='var(--accent-contrast)'; }}
              onMouseLeave={e => { e.currentTarget.style.background='var(--surface2)'; e.currentTarget.style.color='var(--accent)'; }}>
              <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{rtl ? <path d="M9 6l6 6-6 6"/> : <path d="M15 6l-6 6 6 6"/>}</svg>
            </button>
            <button onClick={() => nav(1)} style={btnBase} aria-label={pick(lang, 'الشهر التالي', 'Next month', 'اگلا مہینہ')}
              onMouseEnter={e => { e.currentTarget.style.background='var(--accent)'; e.currentTarget.style.color='var(--accent-contrast)'; }}
              onMouseLeave={e => { e.currentTarget.style.background='var(--surface2)'; e.currentTarget.style.color='var(--accent)'; }}>
              <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{rtl ? <path d="M15 6l-6 6 6 6"/> : <path d="M9 6l6 6-6 6"/>}</svg>
            </button>
          </div>
        </div>

        {/* Weekday headers */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(7,minmax(0,1fr))', gap:6, marginBottom:8 }}>
          {wdHead.map((w, i) => (
            <div key={w} style={{ textAlign:'center', fontSize:12, fontWeight:700, padding:'6px 0', color: i===6 ? 'var(--accent)' : 'var(--muted)' }}>{w}</div>
          ))}
        </div>

        {/* Day grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(7,minmax(0,1fr))', gap:6, opacity:fading?0:1, transform:fading?'translateY(6px)':'none', transition:'opacity .16s ease, transform .16s ease' }}>
          {cells.map((c, i) => (
            <div key={i}
              onClick={() => c.show && c.date && setSelDate(c.date)}
              style={{
                position:'relative', aspectRatio:'1/1', minHeight:48,
                display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:2,
                borderRadius:12, cursor: c.show ? 'pointer' : 'default',
                background: c.isToday ? 'var(--accent)' : (c.isRam ? 'var(--accent-soft)' : 'var(--surface2)'),
                border: `1px solid ${c.isToday ? 'var(--accent)' : 'var(--border)'}`,
                color: c.isToday ? 'var(--accent-contrast)' : 'var(--text)',
                boxShadow: c.isSel ? '0 0 0 3px var(--accent)' : 'none',
                transition: 'transform .15s ease, box-shadow .15s ease',
              }}
              onMouseEnter={e => { if (c.show) { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow=c.isSel?'0 0 0 3px var(--accent)':'var(--shadow)'; } }}
              onMouseLeave={e => { if (c.show) { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=c.isSel?'0 0 0 3px var(--accent)':'none'; } }}>
              {c.show && (<>
                <span style={{ fontSize:10, fontWeight:600, lineHeight:1, opacity:c.isToday?0.92:0.62, color:c.isToday?'var(--accent-contrast)':'var(--muted)' }}>
                  {`${c.gmShort} ${c.gd}`}
                </span>
                <span style={{ fontWeight:700, fontSize:'clamp(15px,2.6vw,20px)', lineHeight:1 }}>{c.d}</span>
                {c.occ && <span style={{ position:'absolute', bottom:6, width:5, height:5, borderRadius:'50%', background:dotColor(c.occ[0]) }} />}
              </>)}
            </div>
          ))}
        </div>
      </section>

      {/* Selected day card */}
      {selDate && (
        <section className="card" style={{ padding:'22px 26px', borderInlineStart:'4px solid var(--gold)', background:'var(--gold-soft)', animation:'pop .25s ease' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:10, flexWrap:'wrap', marginBottom:10 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <span aria-hidden="true" style={{ fontSize:18, lineHeight:1 }}>☾</span>
              <span style={{ fontSize:'12.5px', color:'var(--gold-deep)', fontWeight:800, letterSpacing:'.04em' }}>{pick(lang, 'اليوم المختار', 'Selected day', 'منتخب دن')}</span>
            </div>
            {selRelLabel && (
              <span style={{ padding:'4px 12px', borderRadius:999, background:'var(--surface)', color:'var(--gold-deep)', fontWeight:700, fontSize:'12.5px', border:'1px solid var(--border)' }}>{selRelLabel}</span>
            )}
          </div>
          <div style={{ fontWeight:800, fontSize:'clamp(20px,3vw,25px)', lineHeight:1.3, color:'var(--text)' }}>{selHijri}</div>
          <div style={{ color:'var(--muted)', marginTop:5, fontSize:'15.5px' }}>{selGreg}</div>
          {selOcc && (
            <div style={{ marginTop:14 }}>
              <span style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'7px 15px', borderRadius:999, background:'var(--accent)', color:'var(--accent-contrast)', fontWeight:700, fontSize:'13.5px' }}>
                <span style={{ width:7, height:7, borderRadius:'50%', background:'var(--accent-contrast)', display:'inline-block', opacity:0.85 }} />
                {selOcc}
              </span>
            </div>
          )}
          <div style={{ marginTop:16, display:'flex', flexWrap:'wrap', gap:9 }}>
            <a href={selGcal} target="_blank" rel="noopener" style={{ padding:'9px 16px', borderRadius:11, background:'var(--accent)', color:'var(--accent-contrast)', fontWeight:700, fontSize:13, textDecoration:'none' }}>{pick(lang, 'أضِفه إلى تقويم Google', 'Add to Google Calendar', 'گوگل کیلنڈر میں شامل کریں')}</a>
            <button type="button" onClick={copySel} style={{ padding:'9px 16px', borderRadius:11, background:'var(--surface)', border:'1px solid var(--border)', color:'var(--accent)', fontWeight:700, fontSize:13, cursor:'pointer' }}>
              {selCopied ? pick(lang, 'تم النسخ ✓', 'Copied ✓', 'کاپی ہو گیا ✓') : pick(lang, 'نسخ التاريخ', 'Copy date', 'تاریخ کاپی کریں')}
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
