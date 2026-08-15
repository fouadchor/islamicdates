import { useState } from 'react';
import { g2h, h2g, daysInHMonth, todayUTC } from '../lib/hijri';
import { type Lang, toLang, pick, hMonArr, gMonArr, wdArr, hijriEra, gregEra } from '../lib/data';

interface Props { lang: Lang }

interface YMD { y: number; m: number; d: number }

export default function ConverterIsland({ lang }: Props) {
  const today = todayUTC();
  const todayH = g2h(today);
  const sep = toLang(lang) === 'en' ? ', ' : '، ';

  const [tab, setTab] = useState<'conv' | 'age'>('conv');
  const [mode, setMode] = useState<'g2h' | 'h2g'>('g2h');

  // Converter — Gregorian side (day/month/year dropdowns, defaults to today)
  const [cgd, setCgd] = useState(today.getUTCDate());
  const [cgm, setCgm] = useState(today.getUTCMonth() + 1);
  const [cgy, setCgy] = useState(today.getUTCFullYear());
  // Converter — Hijri side (defaults to today)
  const [chy, setChy] = useState(todayH.y);
  const [chm, setChm] = useState(todayH.m);
  const [chd, setChd] = useState(todayH.d);

  // Age calculator — Gregorian birth date (starts empty)
  const [agd, setAgd] = useState(0);
  const [agm, setAgm] = useState(0);
  const [agy, setAgy] = useState(0);

  const hMon = hMonArr(lang);
  const gMon = gMonArr(lang);
  const wd   = wdArr(lang);

  const t = {
    convTitle: pick(lang, 'محوّل التاريخ السريع', 'Quick Date Converter', 'فوری تاریخ کنورٹر'),
    ageTitle:  pick(lang, 'حاسبة العمر بالهجري', 'Hijri Age Calculator', 'ہجری عمر کیلکولیٹر'),
    g2h: pick(lang, 'ميلادي ← هجري', 'Gregorian → Hijri', 'عیسوی ← ہجری'),
    h2g: pick(lang, 'هجري ← ميلادي', 'Hijri → Gregorian', 'ہجری ← عیسوی'),
    pickG: pick(lang, 'اختر تاريخاً ميلادياً', 'Pick a Gregorian date', 'عیسوی تاریخ منتخب کریں'),
    pickH: pick(lang, 'اختر تاريخاً هجرياً', 'Pick a Hijri date', 'ہجری تاریخ منتخب کریں'),
    pickBirth: pick(lang, 'اختر تاريخ ميلادك (ميلادي)', 'Pick your birth date (Gregorian)', 'اپنی تاریخِ پیدائش منتخب کریں (عیسوی)'),
    day: pick(lang, 'اليوم', 'Day', 'دن'),
    month: pick(lang, 'الشهر', 'Month', 'مہینہ'),
    year: pick(lang, 'السنة', 'Year', 'سال'),
    result: pick(lang, 'النتيجة', 'Result', 'نتیجہ'),
    prompt: pick(lang, 'أدخل تاريخ ميلادك لعرض عمرك.', 'Enter your birth date to see your age.', 'اپنی عمر دیکھنے کے لیے تاریخِ پیدائش درج کریں۔'),
    future: pick(lang, 'تاريخ الميلاد في المستقبل — تحقّق من التاريخ.', 'Birth date is in the future — please check it.', 'تاریخِ پیدائش مستقبل میں ہے — براہِ کرم جانچ لیں۔'),
    ageHijri: pick(lang, 'عمرك بالتقويم الهجري', 'Your age in the Hijri calendar', 'ہجری تقویم میں آپ کی عمر'),
    ageGreg: pick(lang, 'عمرك بالتقويم الميلادي', 'Your age in the Gregorian calendar', 'عیسوی تقویم میں آپ کی عمر'),
    yr: pick(lang, 'سنة', 'years', 'سال'),
    mo: pick(lang, 'شهر', 'months', 'ماہ'),
    dy: pick(lang, 'يوم', 'days', 'دن'),
    totalDays: pick(lang, 'إجمالي الأيام التي عشتها', 'Total days you have lived', 'آپ نے کل اتنے دن گزارے'),
    daysWord: pick(lang, 'يوم', 'days', 'دن'),
    bornLabel: pick(lang, 'تاريخ ميلادك', 'Your birth date', 'آپ کی تاریخِ پیدائش'),
    bornOn: pick(lang, 'وُلدت يوم', 'You were born on', 'آپ پیدا ہوئے بروز'),
    nextHijri: pick(lang, 'عيد ميلادك القادم (هجري)', 'Your next Hijri birthday', 'آپ کی اگلی ہجری سالگرہ'),
    nextGreg: pick(lang, 'عيد ميلادك القادم (ميلادي)', 'Your next Gregorian birthday', 'آپ کی اگلی عیسوی سالگرہ'),
    todayWord: pick(lang, 'اليوم! 🎉', 'Today! 🎉', 'آج! 🎉'),
    left: (n: number) => pick(lang, `باقٍ ${n} يوم`, `${n} days left`, `${n} دن باقی`),
    fullAge: pick(lang, 'الصفحة الكاملة لحاسبة العمر', 'Open the full age calculator', 'مکمل عمر کیلکولیٹر کھولیں'),
  };

  const agePath = pick(lang, '/age/', '/en/age/', '/ur/age/');

  const fmtH = (d: Date) => { const h = g2h(d); return `${wd[d.getUTCDay()]}${sep}${h.d} ${hMon[h.m - 1]} ${h.y} ${hijriEra(lang)}`; };
  const fmtG = (d: Date) => `${wd[d.getUTCDay()]}${sep}${d.getUTCDate()} ${gMon[d.getUTCMonth()]} ${d.getUTCFullYear()} ${gregEra(lang)}`;
  const fmtHShort = (d: Date) => { const h = g2h(d); return `${h.d} ${hMon[h.m - 1]} ${h.y} ${hijriEra(lang)}`; };
  const fmtGWd = (d: Date) => `${wd[d.getUTCDay()]}${sep}${d.getUTCDate()} ${gMon[d.getUTCMonth()]} ${d.getUTCFullYear()}`;

  // ---- Converter values ----
  const curGY = today.getUTCFullYear();
  const gregDaysInMonth = (y: number, m: number) => new Date(Date.UTC(y, m, 0)).getUTCDate(); // m is 1-based
  const cgDays = gregDaysInMonth(cgy, cgm);
  const cgdSafe = cgd > cgDays ? cgDays : cgd;
  const chDays = daysInHMonth(chy, chm);
  const chdSafe = chd > chDays ? chDays : chd;

  const convYears: number[] = [];
  for (let y = curGY + 11; y >= 1900; y--) convYears.push(y);
  const convHYears: number[] = [];
  for (let y = todayH.y + 11; y >= 1318; y--) convHYears.push(y);

  let convResult = '', convResultSub = '';
  if (mode === 'g2h') {
    const d = new Date(Date.UTC(cgy, cgm - 1, cgdSafe));
    convResult = fmtH(d); convResultSub = fmtG(d);
  } else {
    const d = h2g(chy, chm, chdSafe);
    convResult = fmtG(d); convResultSub = fmtH(d);
  }

  // ---- Age values ----
  const aDays = (agy && agm) ? gregDaysInMonth(agy, agm) : 31;
  const agdSafe = agd > aDays ? aDays : agd;
  const ageYears: number[] = [];
  for (let y = curGY; y >= 1900; y--) ageYears.push(y);

  const birth = (agy && agm && agdSafe) ? new Date(Date.UTC(agy, agm - 1, agdSafe)) : null;
  const birthValid = !!(birth && !isNaN(birth.getTime()) && birth.getTime() <= today.getTime());

  const diffYMD = (from: YMD, to: YMD, daysInPrevMonth: (y: number, m: number) => number): YMD => {
    let y = to.y - from.y, m = to.m - from.m, d = to.d - from.d;
    if (d < 0) { m -= 1; let py = to.y, pm = to.m - 1; if (pm < 1) { pm = 12; py -= 1; } d += daysInPrevMonth(py, pm); }
    if (m < 0) { y -= 1; m += 12; }
    return { y, m, d };
  };
  const fmtYMD = (a: YMD) => [`${a.y} ${t.yr}`, `${a.m} ${t.mo}`, `${a.d} ${t.dy}`].join(sep);

  let hijriAge = '', gregAge = '', bornHijri = '', bornGreg = '', bornWd = '', totalDays = 0;
  let nextHDate: Date | null = null, nextGDate: Date | null = null, nextHDays = 0, nextGDays = 0;
  if (birthValid && birth) {
    const bgY = { y: birth.getUTCFullYear(), m: birth.getUTCMonth() + 1, d: birth.getUTCDate() };
    const tgY = { y: today.getUTCFullYear(), m: today.getUTCMonth() + 1, d: today.getUTCDate() };
    gregAge = fmtYMD(diffYMD(bgY, tgY, gregDaysInMonth));
    const bh = g2h(birth), th = g2h(today);
    hijriAge = fmtYMD(diffYMD(bh, th, (y, m) => daysInHMonth(y, m)));
    bornHijri = `${bh.d} ${hMon[bh.m - 1]} ${bh.y} ${hijriEra(lang)}`;
    bornGreg = `${birth.getUTCDate()} ${gMon[birth.getUTCMonth()]} ${birth.getUTCFullYear()} ${gregEra(lang)}`;
    bornWd = wd[birth.getUTCDay()];
    totalDays = Math.floor((today.getTime() - birth.getTime()) / 86400000);

    // next gregorian birthday
    let ng = new Date(Date.UTC(today.getUTCFullYear(), birth.getUTCMonth(), birth.getUTCDate()));
    if (ng.getTime() < today.getTime()) ng = new Date(Date.UTC(today.getUTCFullYear() + 1, birth.getUTCMonth(), birth.getUTCDate()));
    nextGDate = ng; nextGDays = Math.round((ng.getTime() - today.getTime()) / 86400000);

    // next hijri birthday
    let nh = h2g(th.y, bh.m, bh.d);
    if (nh.getTime() < today.getTime()) nh = h2g(th.y + 1, bh.m, bh.d);
    nextHDate = nh; nextHDays = Math.round((nh.getTime() - today.getTime()) / 86400000);
  }

  // ---- Styles ----
  const pillS = (active: boolean): React.CSSProperties => ({
    padding: '7px 13px', borderRadius: 999, border: 'none', cursor: 'pointer',
    fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap',
    background: active ? 'var(--accent)' : 'transparent',
    color: active ? 'var(--accent-contrast)' : 'var(--muted)',
    transition: 'all .2s',
  });
  const inputStyle: React.CSSProperties = { padding: '11px 13px', borderRadius: 11, border: '1px solid var(--border)', background: 'var(--surface2)', color: 'var(--text)', fontSize: 15 };
  const selLabel: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12.5, color: 'var(--muted)' };
  const miniCard: React.CSSProperties = { padding: '14px 16px', borderRadius: 12, background: 'var(--surface2)', border: '1px solid var(--border)' };

  const dmySelects = (
    dVal: number, dOpts: number, onD: (n: number) => void,
    mVal: number, mNames: string[], onM: (n: number) => void,
    yVal: number, yOpts: number[], onY: (n: number) => void,
    withEmpty: boolean,
  ) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      <label style={{ ...selLabel, flex: '1 1 80px', minWidth: 78 }}>
        {t.day}
        <select value={dVal} onChange={e => onD(+e.target.value)} style={{ ...inputStyle, width: '100%' }}>
          {withEmpty && <option value={0}>—</option>}
          {Array.from({ length: dOpts }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
        </select>
      </label>
      <label style={{ ...selLabel, flex: '2 1 130px', minWidth: 120 }}>
        {t.month}
        <select value={mVal} onChange={e => onM(+e.target.value)} style={{ ...inputStyle, width: '100%' }}>
          {withEmpty && <option value={0}>—</option>}
          {mNames.map((n, i) => <option key={i + 1} value={i + 1}>{n}</option>)}
        </select>
      </label>
      <label style={{ ...selLabel, flex: '1 1 90px', minWidth: 88 }}>
        {t.year}
        <select value={yVal} onChange={e => onY(+e.target.value)} style={{ ...inputStyle, width: '100%' }}>
          {withEmpty && <option value={0}>—</option>}
          {yOpts.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
      </label>
    </div>
  );

  return (
    <section className="card" style={{ padding: '22px 26px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 18 }}>
        <h2 style={{ margin: 0, fontWeight: 700, fontSize: 18 }}>{tab === 'conv' ? t.convTitle : t.ageTitle}</h2>
        <div role="tablist" style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '100%', gap: 3, background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 999, padding: 4 }}>
          <button role="tab" aria-selected={tab === 'conv'} style={pillS(tab === 'conv')} onClick={() => setTab('conv')}>{t.convTitle}</button>
          <button role="tab" aria-selected={tab === 'age'} style={pillS(tab === 'age')} onClick={() => setTab('age')}>{t.ageTitle}</button>
        </div>
      </div>

      {tab === 'conv' ? (
        <div>
          <div style={{ display: 'inline-flex', gap: 3, background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 999, padding: 4, marginBottom: 16 }}>
            <button style={pillS(mode === 'g2h')} onClick={() => setMode('g2h')}>{t.g2h}</button>
            <button style={pillS(mode === 'h2g')} onClick={() => setMode('h2g')}>{t.h2g}</button>
          </div>

          <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 8 }}>{mode === 'g2h' ? t.pickG : t.pickH}</div>
          {mode === 'g2h'
            ? dmySelects(cgdSafe, cgDays, setCgd, cgm, gMon, setCgm, cgy, convYears, setCgy, false)
            : dmySelects(chdSafe, chDays, setChd, chm, hMon, setChm, chy, convHYears, setChy, false)}

          <div style={{ marginTop: 20, padding: '18px 20px', borderRadius: 14, background: 'var(--accent-soft)' }}>
            <div style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 7 }}>{t.result}</div>
            <div style={{ fontWeight: 700, fontSize: 'clamp(18px,3.2vw,25px)', lineHeight: 1.25 }}>{convResult}</div>
            <div style={{ marginTop: 5, color: 'var(--muted)', fontSize: '14.5px' }}>{convResultSub}</div>
          </div>
        </div>
      ) : (
        <div>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 8 }}>{t.pickBirth}</div>
          {dmySelects(agdSafe, aDays, setAgd, agm, gMon, setAgm, agy, ageYears, setAgy, true)}

          {!birthValid ? (
            <p style={{ marginTop: 18, fontSize: 14, color: 'var(--muted)' }}>{birth && birth.getTime() > today.getTime() ? t.future : t.prompt}</p>
          ) : (
            <div style={{ marginTop: 20, display: 'grid', gap: 12 }}>
              <div style={{ padding: '18px 20px', borderRadius: 14, background: 'var(--accent-soft)' }}>
                <div style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 7 }}>{t.ageHijri}</div>
                <div style={{ fontWeight: 700, fontSize: 'clamp(18px,3.2vw,25px)', lineHeight: 1.25 }}>{hijriAge}</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 12 }}>
                <div style={miniCard}>
                  <div style={{ fontSize: 12.5, color: 'var(--muted)', fontWeight: 600 }}>{t.ageGreg}</div>
                  <div style={{ fontWeight: 700, fontSize: 16, marginTop: 4 }}>{gregAge}</div>
                </div>
                <div style={miniCard}>
                  <div style={{ fontSize: 12.5, color: 'var(--muted)', fontWeight: 600 }}>{t.totalDays}</div>
                  <div style={{ fontWeight: 700, fontSize: 16, marginTop: 4 }}>{totalDays.toLocaleString('en-US')} {t.daysWord}</div>
                </div>
              </div>

              <div style={{ padding: '14px 16px', borderRadius: 12, background: 'var(--gold-soft)', border: '1px solid var(--gold-soft)' }}>
                <div style={{ fontSize: 12.5, color: 'var(--gold-deep)', fontWeight: 700 }}>{t.bornLabel}</div>
                <div style={{ fontWeight: 700, fontSize: 15.5, marginTop: 4, color: 'var(--text)' }}>{bornHijri}</div>
                <div style={{ fontSize: 14, color: 'var(--muted)', marginTop: 2 }}>{bornGreg}</div>
                <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 6 }}>{t.bornOn} <strong style={{ color: 'var(--text)' }}>{bornWd}</strong></div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12 }}>
                <div style={miniCard}>
                  <div style={{ fontSize: 12.5, color: 'var(--accent)', fontWeight: 700 }}>{t.nextHijri}</div>
                  <div style={{ fontWeight: 700, fontSize: 14.5, marginTop: 4 }}>{nextHDate && fmtHShort(nextHDate)}</div>
                  <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>{nextHDays === 0 ? t.todayWord : t.left(nextHDays)}</div>
                </div>
                <div style={miniCard}>
                  <div style={{ fontSize: 12.5, color: 'var(--accent)', fontWeight: 700 }}>{t.nextGreg}</div>
                  <div style={{ fontWeight: 700, fontSize: 14.5, marginTop: 4 }}>{nextGDate && fmtGWd(nextGDate)}</div>
                  <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>{nextGDays === 0 ? t.todayWord : t.left(nextGDays)}</div>
                </div>
              </div>
            </div>
          )}

          <a href={agePath} style={{ marginTop: 16, display: 'inline-flex', alignItems: 'center', gap: 7, color: 'var(--accent)', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
            {t.fullAge}
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transform: toLang(lang) === 'en' ? 'none' : 'scaleX(-1)' }}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
        </div>
      )}
    </section>
  );
}
