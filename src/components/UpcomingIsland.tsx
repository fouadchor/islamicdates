import { g2h, h2g, getOcc, dotColor, todayUTC } from '../lib/hijri';
import { H_MON_AR, H_MON_EN, G_MON_AR, G_MON_EN, MAJOR_OCC_KEYS } from '../lib/data';

interface Props { lang: 'ar' | 'en' }

export default function UpcomingIsland({ lang }: Props) {
  const ar = lang === 'ar';
  const today = todayUTC();
  const todayH = g2h(today);
  const hMon = ar ? H_MON_AR : H_MON_EN;
  const gMon = ar ? G_MON_AR : G_MON_EN;

  const fmtH = (d: Date) => { const h=g2h(d); return `${h.d} ${hMon[h.m-1]} ${h.y} ${ar?'هـ':'AH'}`; };
  const fmtG = (d: Date) => `${d.getUTCDate()} ${gMon[d.getUTCMonth()]} ${d.getUTCFullYear()}`;

  const daysLabel = (n: number) =>
    n === 0 ? (ar?'اليوم':'Today') :
    n === 1 ? (ar?'غداً':'Tomorrow') :
    ar ? `باقٍ ${n} يوم` : `${n} days left`;

  const items = MAJOR_OCC_KEYS.map(([hm, hd]) => {
    const occ = getOcc(hm, hd)!;
    let d = h2g(todayH.y, hm, hd);
    if (d.getTime() < today.getTime()) d = h2g(todayH.y + 1, hm, hd);
    const days = Math.round((d.getTime() - today.getTime()) / 86400000);
    return { cat: occ[0], name: ar ? occ[1] : occ[2], hijri: fmtH(d), greg: fmtG(d), days, t: d.getTime() };
  }).sort((a,b) => a.t - b.t);

  return (
    <section className="card" style={{ padding:'22px 26px' }}>
      <h2 style={{ margin:'0 0 16px', fontWeight:700, fontSize:19 }}>{ar ? 'المناسبات الإسلامية القادمة' : 'Upcoming Islamic occasions'}</h2>
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {items.map((u, i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:13, padding:'13px 15px', border:'1px solid var(--border)', borderRadius:14, background:'var(--surface2)' }}>
            <span style={{ width:11, height:11, borderRadius:'50%', flex:'0 0 auto', background:dotColor(u.cat) }} />
            <div style={{ flex:'1 1 auto', minWidth:0 }}>
              <div style={{ fontWeight:700, fontSize:'15.5px' }}>{u.name}</div>
              <div style={{ fontSize:13, color:'var(--muted)', marginTop:2 }}>{u.hijri} · {u.greg}</div>
            </div>
            <span style={{ flex:'0 0 auto', padding:'6px 13px', borderRadius:999, background:'var(--accent-soft)', color:'var(--accent)', fontWeight:700, fontSize:13, whiteSpace:'nowrap' }}>
              {daysLabel(u.days)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
