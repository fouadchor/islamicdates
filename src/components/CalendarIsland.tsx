import { useState, useRef } from 'react';
import { g2h, h2g, daysInHMonth, getOcc, dotColor, todayUTC } from '../lib/hijri';
import type { HDate } from '../lib/hijri';
import { H_MON_AR, H_MON_EN, G_MON_AR, G_MON_EN, G_SHORT_AR, G_SHORT_EN, WD_AR, WD_EN, WD_HEAD_AR, WD_HEAD_EN } from '../lib/data';

interface Props { lang: 'ar' | 'en' }

export default function CalendarIsland({ lang }: Props) {
  const ar = lang === 'ar';
  const today = todayUTC();
  const todayH = g2h(today);
  const todayKey = today.getUTCFullYear() * 10000 + (today.getUTCMonth() + 1) * 100 + today.getUTCDate();

  const [viewY, setViewY] = useState(todayH.y);
  const [viewM, setViewM] = useState(todayH.m);
  const [fading, setFading] = useState(false);
  const [selDate, setSelDate] = useState<Date | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hMon  = ar ? H_MON_AR  : H_MON_EN;
  const gMon  = ar ? G_MON_AR  : G_MON_EN;
  const gShort= ar ? G_SHORT_AR : G_SHORT_EN;
  const wdHead= ar ? WD_HEAD_AR : WD_HEAD_EN;
  const wdFull= ar ? WD_AR     : WD_EN;

  const fmtH = (d: Date, wd: boolean) => {
    const h = g2h(d);
    const w = wd ? wdFull[d.getUTCDay()] + '، ' : '';
    return `${w}${h.d} ${hMon[h.m-1]} ${h.y} ${ar ? 'هـ' : 'AH'}`;
  };
  const fmtG = (d: Date, wd: boolean) => {
    const w = wd ? wdFull[d.getUTCDay()] + '، ' : '';
    return `${w}${d.getUTCDate()} ${gMon[d.getUTCMonth()]} ${d.getUTCFullYear()} ${ar ? 'م' : 'CE'}`;
  };

  const nav = (delta: number) => {
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
    timerRef.current = setTimeout(() => { setViewY(todayH.y); setViewM(todayH.m); setFading(false); }, 150);
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
    cells.push({ show:true, d, date, key, isToday: key===todayKey, isSel: selDate ? key === (selDate.getUTCFullYear()*10000+(selDate.getUTCMonth()+1)*100+selDate.getUTCDate()) : false, isRam: viewM===9, occ: getOcc(viewM,d), showMon, gmShort: gShort[date.getUTCMonth()], gd });
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
  let selHijri='', selGreg='', selOcc: string|null=null;
  if (selDate) {
    selHijri = fmtH(selDate, true);
    selGreg  = fmtG(selDate, false);
    const sh = g2h(selDate);
    const so = getOcc(sh.m, sh.d);
    selOcc = so ? (ar ? so[1] : so[2]) : (sh.m===9 ? (ar?'شهر رمضان':'Ramadan') : null);
  }

  const btnBase: React.CSSProperties = { width:42, height:42, borderRadius:12, border:'1px solid var(--border)', background:'var(--surface2)', color:'var(--accent)', fontSize:22, display:'flex', alignItems:'center', justifyContent:'center', lineHeight:'1', transition:'all .2s' };

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
      <section className="card" style={{ padding:'22px 22px 26px' }}>
        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, marginBottom:18, flexWrap:'wrap' }}>
          <div>
            <h2 style={{ margin:0, fontWeight:700, fontSize:'clamp(21px,3.6vw,29px)', lineHeight:1.1 }}>
              {hMon[viewM-1]} {viewY} {ar?'هـ':'AH'}
            </h2>
            <div style={{ color:'var(--muted)', fontSize:'14.5px', marginTop:3 }}>{monthTitleG}</div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <button onClick={goToday}
              style={{ padding:'9px 15px', borderRadius:11, border:'1px solid var(--border)', background:'var(--surface2)', color:'var(--accent)', fontWeight:700, fontSize:'13.5px', transition:'all .2s' }}
              onMouseEnter={e => { e.currentTarget.style.background='var(--accent)'; e.currentTarget.style.color='var(--accent-contrast)'; e.currentTarget.style.borderColor='var(--accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.background='var(--surface2)'; e.currentTarget.style.color='var(--accent)'; e.currentTarget.style.borderColor='var(--border)'; }}>
              {ar ? 'اليوم' : 'Today'}
            </button>
            <button onClick={() => nav(-1)} style={btnBase}
              onMouseEnter={e => { e.currentTarget.style.background='var(--accent)'; e.currentTarget.style.color='var(--accent-contrast)'; }}
              onMouseLeave={e => { e.currentTarget.style.background='var(--surface2)'; e.currentTarget.style.color='var(--accent)'; }}>
              {ar ? '›' : '‹'}
            </button>
            <button onClick={() => nav(1)} style={btnBase}
              onMouseEnter={e => { e.currentTarget.style.background='var(--accent)'; e.currentTarget.style.color='var(--accent-contrast)'; }}
              onMouseLeave={e => { e.currentTarget.style.background='var(--surface2)'; e.currentTarget.style.color='var(--accent)'; }}>
              {ar ? '‹' : '›'}
            </button>
          </div>
        </div>

        {/* Weekday headers */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:6, marginBottom:8 }}>
          {wdHead.map((w, i) => (
            <div key={w} style={{ textAlign:'center', fontSize:12, fontWeight:700, padding:'6px 0', color: i===6 ? 'var(--accent)' : 'var(--muted)' }}>{w}</div>
          ))}
        </div>

        {/* Day grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:6, opacity:fading?0:1, transform:fading?'translateY(6px)':'none', transition:'opacity .16s ease, transform .16s ease' }}>
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
                  {c.showMon ? `${c.gmShort} ${c.gd}` : c.gd}
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
        <section className="card" style={{ padding:'20px 24px', borderInlineStart:'4px solid var(--accent)', animation:'pop .25s ease' }}>
          <div style={{ fontSize:12, color:'var(--accent)', fontWeight:700, letterSpacing:'.06em', textTransform:'uppercase' }}>{ar?'اليوم المختار':'Selected day'}</div>
          <div style={{ fontWeight:700, fontSize:21, marginTop:7 }}>{selHijri}</div>
          <div style={{ color:'var(--muted)', marginTop:3, fontSize:15 }}>{selGreg}</div>
          {selOcc && (
            <div style={{ marginTop:13, display:'inline-flex', alignItems:'center', gap:9, padding:'8px 15px', borderRadius:999, background:'var(--accent-soft)', color:'var(--accent)', fontWeight:700, fontSize:14 }}>
              <span style={{ width:8, height:8, borderRadius:'50%', background:'var(--accent)', display:'inline-block' }} />
              {selOcc}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
