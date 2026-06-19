import { useState, useEffect } from 'react';
import { g2h, getOcc, dotColor, todayUTC, h2g } from '../lib/hijri';
import { H_MON_AR, H_MON_EN, G_MON_AR, G_MON_EN, WD_AR, WD_EN, COUNTRIES, MAJOR_OCC_KEYS } from '../lib/data';

interface Props { lang: 'ar' | 'en' }

export default function TodayIsland({ lang }: Props) {
  const ar = lang === 'ar';
  const [country, setCountry] = useState('sa');
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const today = todayUTC();
  const th = g2h(today);

  const hMon = ar ? H_MON_AR : H_MON_EN;
  const gMon = ar ? G_MON_AR : G_MON_EN;
  const wd   = ar ? WD_AR : WD_EN;

  const fmtH = (d: Date, withDay: boolean) => {
    const h = g2h(d);
    const w = withDay ? wd[d.getUTCDay()] + '، ' : '';
    return `${w}${h.d} ${hMon[h.m-1]} ${h.y} ${ar ? 'هـ' : 'AH'}`;
  };
  const fmtG = (d: Date, withDay: boolean) => {
    const w = withDay ? wd[d.getUTCDay()] + '، ' : '';
    return `${w}${d.getUTCDate()} ${gMon[d.getUTCMonth()]} ${d.getUTCFullYear()} ${ar ? 'م' : 'CE'}`;
  };

  const todayHijri = fmtH(today, true);
  const todayGreg  = fmtG(today, false);
  const todayFull  = fmtH(today, true) + ' — ' + fmtG(today, false);

  const tocc = getOcc(th.m, th.d);
  const todayOcc = tocc ? (ar ? tocc[1] : tocc[2]) : (th.m === 9 ? (ar ? 'شهر رمضان المبارك' : 'The blessed month of Ramadan') : null);

  // next upcoming occasion for countdown
  const upcoming = MAJOR_OCC_KEYS.map(([hm, hd]) => {
    const occ = getOcc(hm, hd)!;
    let d = h2g(th.y, hm, hd);
    if (d.getTime() < today.getTime()) d = h2g(th.y + 1, hm, hd);
    const days = Math.round((d.getTime() - today.getTime()) / 86400000);
    return { name: ar ? occ[1] : occ[2], days };
  }).sort((a, b) => a.days - b.days);
  const nearest = upcoming[0];
  const countdown = nearest
    ? (ar
        ? (nearest.days === 0 ? `${nearest.name} اليوم` : `باقٍ ${nearest.days} يوم على ${nearest.name}`)
        : (nearest.days === 0 ? `${nearest.name} today` : `${nearest.days} days to ${nearest.name}`))
    : '';

  const cur = COUNTRIES.find(c => c.v === country) ?? COUNTRIES[0];
  const hilalNote = ar
    ? (cur.umm
        ? 'يعتمد العرض على تقويم أم القرى المعتمد رسمياً، وقد تختلف بدايات الأشهر الدينية حسب إعلان رؤية الهلال في كل دولة.'
        : `العرض وفق تقويم أم القرى؛ وقد يختلف التاريخ الرسمي في ${cur.ar} بمقدار يوم واحد حسب رؤية الهلال محلياً.`)
    : (cur.umm
        ? 'Based on the official Umm al-Qura calendar; religious month starts may vary with local moon sighting.'
        : `Based on the Umm al-Qura calendar; the official date in ${cur.en} may differ by one day depending on local moon sighting.`);

  const copyToday = () => {
    try { navigator.clipboard?.writeText(todayFull); } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const shareWa = () => {
    const text = todayFull + ' \n' + (typeof location !== 'undefined' ? location.href : '');
    window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank');
  };

  if (!mounted) return (
    <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'var(--radius)', boxShadow:'var(--shadow)', padding:'28px 30px', minHeight: 200 }} />
  );

  return (
    <section style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'var(--radius)', boxShadow:'var(--shadow)', padding:'28px 30px', animation:'fadeUp .5s ease' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, flexWrap:'wrap', marginBottom:14 }}>
        <div style={{ fontSize:'12.5px', letterSpacing:'.12em', textTransform:'uppercase', color:'var(--accent)', fontWeight:700 }}>
          {ar ? 'تاريخ اليوم' : "Today's Date"}
        </div>
        <label style={{ display:'flex', alignItems:'center', gap:8, fontSize:'12.5px', color:'var(--muted)' }}>
          {ar ? 'الدولة' : 'Region'}
          <select value={country} onChange={e => setCountry(e.target.value)}
            style={{ padding:'7px 11px', borderRadius:10, border:'1px solid var(--border)', background:'var(--surface2)', color:'var(--text)', fontSize:'13.5px' }}>
            {COUNTRIES.map(c => <option key={c.v} value={c.v}>{ar ? c.ar : c.en}</option>)}
          </select>
        </label>
      </div>

      <h1 style={{ margin:0, fontWeight:700, fontSize:'clamp(30px,6.2vw,54px)', lineHeight:1.05 }}>{todayHijri}</h1>
      <div style={{ marginTop:12, fontSize:'clamp(15px,2.6vw,21px)', color:'var(--muted)' }}>{todayGreg}</div>

      <div style={{ marginTop:18, display:'flex', flexWrap:'wrap', gap:10, alignItems:'center' }}>
        {todayOcc && (
          <div style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'10px 18px', borderRadius:999, background:'var(--accent-soft)', color:'var(--accent)', fontWeight:700, fontSize:15 }}>
            <span style={{ width:9, height:9, borderRadius:'50%', background:'var(--accent)', display:'inline-block' }} />
            {todayOcc}
          </div>
        )}
        {countdown && (
          <div style={{ display:'inline-flex', alignItems:'center', gap:9, padding:'10px 18px', borderRadius:999, background:'var(--surface2)', border:'1px solid var(--border)', fontWeight:600, fontSize:14 }}>
            <span style={{ width:8, height:8, borderRadius:'50%', background:'var(--gold)', display:'inline-block' }} />
            {countdown}
          </div>
        )}
      </div>

      <div style={{ marginTop:18, display:'flex', flexWrap:'wrap', gap:10 }}>
        <button onClick={copyToday}
          style={{ padding:'11px 18px', borderRadius:11, border:'none', background:'var(--accent)', color:'var(--accent-contrast)', fontWeight:700, fontSize:14, transition:'filter .2s' }}
          onMouseEnter={e => (e.currentTarget.style.filter='brightness(1.06)')}
          onMouseLeave={e => (e.currentTarget.style.filter='')}>
          {copied ? (ar ? 'تم النسخ ✓' : 'Copied ✓') : (ar ? 'انسخ تاريخ اليوم' : "Copy today's date")}
        </button>
        <button onClick={shareWa}
          style={{ padding:'11px 18px', borderRadius:11, border:'1px solid var(--border)', background:'var(--surface2)', color:'var(--accent)', fontWeight:700, fontSize:14, transition:'border-color .2s' }}
          onMouseEnter={e => (e.currentTarget.style.borderColor='var(--accent)')}
          onMouseLeave={e => (e.currentTarget.style.borderColor='var(--border)')}>
          {ar ? 'شارك عبر واتساب' : 'Share on WhatsApp'}
        </button>
      </div>

      <p style={{ margin:'16px 0 0', fontSize:'12.5px', color:'var(--muted)', lineHeight:1.65, textWrap:'pretty' as any }}>{hilalNote}</p>
    </section>
  );
}
