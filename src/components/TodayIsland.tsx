import { useState, useEffect } from 'react';
import { g2h, getOcc, occName, dotColor, todayUTC, h2g } from '../lib/hijri';
import { MAJOR_OCC_KEYS, type Lang, toLang, pick, hMonArr, gMonArr, wdArr, hijriEra, gregEra } from '../lib/data';
import { COUNTRIES, TZ_TO_COUNTRY } from '../lib/countries';

interface Props { lang: Lang }

export default function TodayIsland({ lang }: Props) {
  const ll = toLang(lang);
  const [country, setCountry] = useState('sa');
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Quietly default the region to the visitor's location using their
    // browser timezone — no permission prompt, no IP lookup. Selector stays
    // available as an override for anyone who wants a different region.
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const match = TZ_TO_COUNTRY[tz];
      if (match && COUNTRIES.some(c => c.v === match)) setCountry(match);
    } catch {}
  }, []);

  const today = todayUTC();
  const th = g2h(today);

  const hMon = hMonArr(lang);
  const gMon = gMonArr(lang);
  const wd   = wdArr(lang);
  const sep  = ll === 'en' ? ', ' : '، ';
  const cName = (c: typeof COUNTRIES[number]) => pick(lang, c.ar, c.en, c.ur);

  const fmtH = (d: Date, withDay: boolean) => {
    const h = g2h(d);
    const w = withDay ? wd[d.getUTCDay()] + sep : '';
    return `${w}${h.d} ${hMon[h.m-1]} ${h.y} ${hijriEra(lang)}`;
  };
  const fmtG = (d: Date, withDay: boolean) => {
    const w = withDay ? wd[d.getUTCDay()] + sep : '';
    return `${w}${d.getUTCDate()} ${gMon[d.getUTCMonth()]} ${d.getUTCFullYear()} ${gregEra(lang)}`;
  };

  const todayHijri = fmtH(today, true);
  const todayGreg  = fmtG(today, false);
  const todayFull  = fmtH(today, true) + ' — ' + fmtG(today, false);

  const tocc = getOcc(th.m, th.d);
  const todayOcc = tocc ? occName(tocc, lang) : (th.m === 9 ? pick(lang, 'شهر رمضان المبارك', 'The blessed month of Ramadan', 'رمضان المبارک کا مہینہ') : null);

  // next upcoming occasion for countdown
  const upcoming = MAJOR_OCC_KEYS.map(([hm, hd]) => {
    const occ = getOcc(hm, hd)!;
    let d = h2g(th.y, hm, hd);
    if (d.getTime() < today.getTime()) d = h2g(th.y + 1, hm, hd);
    const days = Math.round((d.getTime() - today.getTime()) / 86400000);
    return { name: occName(occ, lang), days };
  }).sort((a, b) => a.days - b.days);
  const nearest = upcoming[0];
  const countdown = nearest
    ? (nearest.days === 0
        ? pick(lang, `${nearest.name} اليوم`, `${nearest.name} today`, `${nearest.name} آج`)
        : pick(lang, `باقٍ ${nearest.days} يوم على ${nearest.name}`, `${nearest.days} days to ${nearest.name}`, `${nearest.name} میں ${nearest.days} دن باقی`))
    : '';

  const cur = COUNTRIES.find(c => c.v === country) ?? COUNTRIES[0];
  const hilalNote = cur.umm
    ? pick(lang,
        'يعتمد العرض على تقويم أم القرى المعتمد رسمياً، وقد تختلف بدايات الأشهر الدينية حسب إعلان رؤية الهلال في كل دولة.',
        'Based on the official Umm al-Qura calendar; religious month starts may vary with local moon sighting.',
        'یہ نمائش سرکاری طور پر معتمد اُمّ القریٰ تقویم پر مبنی ہے، اور دینی مہینوں کا آغاز ہر ملک میں رؤیتِ ہلال کے اعلان کے مطابق مختلف ہو سکتا ہے۔')
    : pick(lang,
        `العرض وفق تقويم أم القرى؛ وقد يختلف التاريخ الرسمي في ${cur.ar} بمقدار يوم واحد حسب رؤية الهلال محلياً.`,
        `Based on the Umm al-Qura calendar; the official date in ${cur.en} may differ by one day depending on local moon sighting.`,
        `یہ نمائش اُمّ القریٰ تقویم کے مطابق ہے؛ ${cur.ur} میں سرکاری تاریخ مقامی رؤیتِ ہلال کے مطابق ایک دن مختلف ہو سکتی ہے۔`);

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
    <section style={{ position:'relative', overflow:'hidden', background:'var(--surface)', backgroundImage:'linear-gradient(135deg, var(--accent-glow) 0%, transparent 55%)', border:'1px solid var(--border)', borderRadius:'var(--radius)', boxShadow:'var(--shadow)', padding:'28px 30px', animation:'fadeUp .5s ease' }}>
      <span aria-hidden="true" style={{ position:'absolute', top:-34, insetInlineEnd:-18, fontSize:150, lineHeight:1, color:'var(--accent)', opacity:.05, pointerEvents:'none', userSelect:'none' }}>☾</span>

      <div style={{ position:'relative', display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, flexWrap:'wrap', marginBottom:18 }}>
        <div style={{ fontSize:'12.5px', letterSpacing:'.12em', textTransform:'uppercase', color:'var(--accent)', fontWeight:700 }}>
          {pick(lang, 'تقويم أم القرى', 'Umm al-Qura calendar', 'اُمّ القریٰ تقویم')}
        </div>
        <label style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:'12px', color:'var(--muted)', opacity:.85 }}
          title={pick(lang, 'اختياري: غيّر المنطقة لتعديل ملاحظة رؤية الهلال', 'Optional: change region to adjust the moon-sighting note', 'اختیاری: رؤیتِ ہلال کا نوٹ تبدیل کرنے کے لیے ملک منتخب کریں')}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity:.7 }} aria-hidden="true">
            <circle cx="12" cy="10" r="3" /><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z" />
          </svg>
          <select value={country} onChange={e => setCountry(e.target.value)}
            aria-label={pick(lang, 'المنطقة', 'Region', 'ملک')}
            style={{ padding:'3px 4px', borderRadius:8, border:'none', background:'transparent', color:'var(--muted)', fontSize:'12.5px', fontWeight:600, cursor:'pointer' }}>
            {[...COUNTRIES].sort((a, b) => cName(a).localeCompare(cName(b), ll)).map(c => <option key={c.v} value={c.v}>{cName(c)}</option>)}
          </select>
        </label>
      </div>

      <div style={{ position:'relative', display:'flex', alignItems:'center', justifyContent:'space-between', gap:28, flexWrap:'wrap' }}>
        <div style={{ flex:'1 1 320px', minWidth:0 }}>
          <h1 style={{ margin:0, fontWeight:700, fontSize:'clamp(30px,6.2vw,54px)', lineHeight:1.05 }}>
            <span style={{ display:'block', fontSize:'clamp(14px,2.1vw,18px)', fontWeight:600, color:'var(--muted)', marginBottom:8, lineHeight:1.3 }}>
              {pick(lang, 'التاريخ الهجري اليوم', "Today's Hijri Date", 'آج کی ہجری تاریخ')}
            </span>
            {todayHijri}
          </h1>
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
              {copied ? pick(lang, 'تم النسخ ✓', 'Copied ✓', 'کاپی ہو گیا ✓') : pick(lang, 'انسخ تاريخ اليوم', "Copy today's date", 'آج کی تاریخ کاپی کریں')}
            </button>
            <button onClick={shareWa}
              style={{ padding:'11px 18px', borderRadius:11, border:'1px solid var(--border)', background:'var(--surface2)', color:'var(--accent)', fontWeight:700, fontSize:14, transition:'border-color .2s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor='var(--accent)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor='var(--border)')}>
              {pick(lang, 'شارك عبر واتساب', 'Share on WhatsApp', 'واٹس ایپ پر شیئر کریں')}
            </button>
          </div>

          <p style={{ margin:'16px 0 0', fontSize:'12.5px', color:'var(--muted)', lineHeight:1.65, textWrap:'pretty' as any }}>{hilalNote}</p>
        </div>

        <div aria-hidden="true" style={{ flex:'0 0 auto', width:186, height:186, borderRadius:'50%', background:'linear-gradient(140deg, var(--accent) 0%, var(--accent-strong) 100%)', color:'var(--accent-contrast)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', boxShadow:'0 14px 34px rgba(13,148,136,.30)', border:'6px solid var(--accent-soft)' }}>
          <span style={{ fontSize:24, lineHeight:1, opacity:.92 }}>☾</span>
          <span style={{ fontSize:15, fontWeight:600, opacity:.92, marginTop:5 }}>{hMon[th.m-1]}</span>
          <span style={{ fontSize:62, fontWeight:800, lineHeight:1.02 }}>{th.d}</span>
          <span style={{ fontSize:14, fontWeight:600, opacity:.92 }}>{th.y} {hijriEra(lang)}</span>
        </div>
      </div>
    </section>
  );
}
