import { useState } from 'react';
import { g2h, h2g, todayUTC, toInputVal } from '../lib/hijri';
import { H_MON_AR, H_MON_EN, G_MON_AR, G_MON_EN, WD_AR, WD_EN } from '../lib/data';

interface Props { lang: 'ar' | 'en' }

export default function ConverterIsland({ lang }: Props) {
  const ar = lang === 'ar';
  const today = todayUTC();
  const todayH = g2h(today);

  const [mode, setMode] = useState<'g2h'|'h2g'>('g2h');
  const [convG, setConvG] = useState(toInputVal(today));
  const [convHY, setConvHY] = useState(todayH.y);
  const [convHM, setConvHM] = useState(todayH.m);
  const [convHD, setConvHD] = useState(todayH.d);

  const hMon = ar ? H_MON_AR : H_MON_EN;
  const gMon = ar ? G_MON_AR : G_MON_EN;
  const wd   = ar ? WD_AR : WD_EN;

  const fmtH = (d: Date) => { const h=g2h(d); return `${wd[d.getUTCDay()]}، ${h.d} ${hMon[h.m-1]} ${h.y} ${ar?'هـ':'AH'}`; };
  const fmtG = (d: Date) => `${wd[d.getUTCDay()]}، ${d.getUTCDate()} ${gMon[d.getUTCMonth()]} ${d.getUTCFullYear()} ${ar?'م':'CE'}`;

  let convResult = '', convResultSub = '';
  if (mode === 'g2h') {
    const p = (convG || '').split('-').map(Number);
    if (p.length === 3 && p.every(x => x)) {
      const d = new Date(Date.UTC(p[0], p[1]-1, p[2]));
      convResult = fmtH(d); convResultSub = fmtG(d);
    } else { convResult = ar ? 'اختر تاريخاً' : 'Pick a date'; }
  } else {
    const d = h2g(convHY, convHM, convHD);
    convResult = fmtG(d); convResultSub = fmtH(d);
  }

  const pill = (active: boolean): React.CSSProperties => ({
    padding:'7px 13px', borderRadius:999, border:'none', cursor:'pointer',
    fontSize:13, fontWeight:600, whiteSpace:'nowrap',
    background: active ? 'var(--accent)' : 'transparent',
    color: active ? 'var(--accent-contrast)' : 'var(--muted)',
    transition:'all .2s',
  });

  const inputStyle: React.CSSProperties = { padding:'11px 13px', borderRadius:11, border:'1px solid var(--border)', background:'var(--surface2)', color:'var(--text)', fontSize:15 };

  return (
    <section className="card" style={{ padding:'22px 26px' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12, marginBottom:18 }}>
        <h2 style={{ margin:0, fontWeight:700, fontSize:18 }}>{ar ? 'محوّل التاريخ السريع' : 'Quick Date Converter'}</h2>
        <div style={{ display:'flex', gap:3, background:'var(--surface2)', border:'1px solid var(--border)', borderRadius:999, padding:4 }}>
          <button style={pill(mode==='g2h')} onClick={() => setMode('g2h')}>{ar ? 'ميلادي ← هجري' : 'Gregorian → Hijri'}</button>
          <button style={pill(mode==='h2g')} onClick={() => setMode('h2g')}>{ar ? 'هجري ← ميلادي' : 'Hijri → Gregorian'}</button>
        </div>
      </div>

      {mode === 'g2h' ? (
        <label style={{ display:'flex', flexDirection:'column', gap:7, fontSize:13, color:'var(--muted)', maxWidth:260 }}>
          {ar ? 'اختر تاريخاً ميلادياً' : 'Pick a Gregorian date'}
          <input type="date" value={convG} onChange={e => setConvG(e.target.value)} style={inputStyle} />
        </label>
      ) : (
        <div style={{ display:'flex', flexWrap:'wrap', gap:12, alignItems:'flex-end' }}>
          <label style={{ display:'flex', flexDirection:'column', gap:7, fontSize:13, color:'var(--muted)' }}>
            {ar ? 'اليوم' : 'Day'}
            <select value={convHD} onChange={e => setConvHD(+e.target.value)} style={{ ...inputStyle, minWidth:80 }}>
              {Array.from({length:30},(_,i)=><option key={i+1} value={i+1}>{i+1}</option>)}
            </select>
          </label>
          <label style={{ display:'flex', flexDirection:'column', gap:7, fontSize:13, color:'var(--muted)' }}>
            {ar ? 'الشهر' : 'Month'}
            <select value={convHM} onChange={e => setConvHM(+e.target.value)} style={{ ...inputStyle, minWidth:150 }}>
              {hMon.map((n,i) => <option key={i+1} value={i+1}>{n}</option>)}
            </select>
          </label>
          <label style={{ display:'flex', flexDirection:'column', gap:7, fontSize:13, color:'var(--muted)' }}>
            {ar ? 'السنة' : 'Year'}
            <input type="number" value={convHY} onChange={e => setConvHY(parseInt(e.target.value)||convHY)} style={{ ...inputStyle, width:110 }} />
          </label>
        </div>
      )}

      <div style={{ marginTop:20, padding:'18px 20px', borderRadius:14, background:'var(--accent-soft)' }}>
        <div style={{ fontSize:12, color:'var(--accent)', fontWeight:700, letterSpacing:'.06em', textTransform:'uppercase', marginBottom:7 }}>
          {ar ? 'النتيجة' : 'Result'}
        </div>
        <div style={{ fontWeight:700, fontSize:'clamp(18px,3.2vw,25px)', lineHeight:1.25 }}>{convResult}</div>
        <div style={{ marginTop:5, color:'var(--muted)', fontSize:'14.5px' }}>{convResultSub}</div>
      </div>
    </section>
  );
}
