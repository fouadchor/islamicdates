import { g2h, h2g, getOcc, occName, dotColor, todayUTC } from '../lib/hijri';
import { MAJOR_OCC_KEYS, type Lang, pick, hMonArr, gMonArr, hijriEra } from '../lib/data';
import { OCCASIONS, occBasePath } from '../lib/occasions';

interface Props { lang: Lang }

export default function UpcomingIsland({ lang }: Props) {
  const today = todayUTC();
  const todayH = g2h(today);
  const hMon = hMonArr(lang);
  const gMon = gMonArr(lang);

  const fmtH = (d: Date) => { const h=g2h(d); return `${h.d} ${hMon[h.m-1]} ${h.y} ${hijriEra(lang)}`; };
  const fmtG = (d: Date) => `${d.getUTCDate()} ${gMon[d.getUTCMonth()]} ${d.getUTCFullYear()}`;

  const daysLabel = (n: number) =>
    n === 0 ? pick(lang, 'اليوم', 'Today', 'آج') :
    n === 1 ? pick(lang, 'غداً', 'Tomorrow', 'کل') :
    pick(lang, `باقٍ ${n} يوم`, `${n} days left`, `${n} دن باقی`);

  // Slug lookup so each occasion row can link to its dedicated page.
  const slugFor = (hm: number, hd: number) =>
    OCCASIONS.find(o => o.hm === hm && o.hd === hd)?.slug;

  const items = MAJOR_OCC_KEYS.map(([hm, hd]) => {
    const occ = getOcc(hm, hd)!;
    let d = h2g(todayH.y, hm, hd);
    if (d.getTime() < today.getTime()) d = h2g(todayH.y + 1, hm, hd);
    const days = Math.round((d.getTime() - today.getTime()) / 86400000);
    const slug = slugFor(hm, hd);
    const href = slug ? occBasePath(slug, d.getUTCFullYear(), lang) : undefined;
    return { cat: occ[0], name: occName(occ, lang), hijri: fmtH(d), greg: fmtG(d), days, t: d.getTime(), href };
  }).sort((a,b) => a.t - b.t);

  const rowStyle: React.CSSProperties = {
    display:'flex', alignItems:'center', gap:13, padding:'13px 15px',
    border:'1px solid var(--border)', borderRadius:14, background:'var(--surface2)',
    textDecoration:'none', color:'inherit',
  };

  return (
    <section className="card" style={{ padding:'22px 26px' }}>
      <style>{`
        .upcoming-row { transition: border-color .15s, background .15s, transform .15s; }
        a.upcoming-row:hover { border-color: var(--accent); background: var(--surface); transform: translateY(-1px); }
        a.upcoming-row:hover .upcoming-name { color: var(--accent); }
      `}</style>
      <h2 style={{ margin:'0 0 16px', fontWeight:700, fontSize:19 }}>{pick(lang, 'المناسبات الإسلامية القادمة', 'Upcoming Islamic occasions', 'آنے والی اسلامی مناسبتیں')}</h2>
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {items.map((u, i) => {
          const inner = (
            <>
              <span style={{ width:11, height:11, borderRadius:'50%', flex:'0 0 auto', background:dotColor(u.cat) }} />
              <div style={{ flex:'1 1 auto', minWidth:0 }}>
                <div className="upcoming-name" style={{ fontWeight:700, fontSize:'15.5px' }}>{u.name}</div>
                <div style={{ fontSize:13, color:'var(--muted)', marginTop:2 }}>{u.hijri} · {u.greg}</div>
              </div>
              <span style={{ flex:'0 0 auto', padding:'6px 13px', borderRadius:999, background:'var(--accent-soft)', color:'var(--accent)', fontWeight:700, fontSize:13, whiteSpace:'nowrap' }}>
                {daysLabel(u.days)}
              </span>
            </>
          );
          return u.href ? (
            <a key={i} className="upcoming-row" href={u.href} style={rowStyle} aria-label={u.name}>{inner}</a>
          ) : (
            <div key={i} className="upcoming-row" style={rowStyle}>{inner}</div>
          );
        })}
      </div>
    </section>
  );
}
