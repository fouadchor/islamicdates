import { useState, useEffect } from 'react';
import { g2h, h2g, daysInHMonth, todayUTC, toInputVal } from '../lib/hijri';
import { type Lang, toLang, pick, hMonArr, gMonArr, wdArr, hijriEra, gregEra } from '../lib/data';

interface Props { lang: Lang }

interface YMD { y: number; m: number; d: number }

export default function AgeIsland({ lang }: Props) {
  const ll = toLang(lang);
  const rtl = ll !== 'en';
  const sep = ll === 'en' ? ', ' : '، ';
  const dsep = ll === 'en' ? ', ' : '، ';
  const hMon = hMonArr(lang);
  const gMon = gMonArr(lang);
  const wd = wdArr(lang);

  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<'g' | 'h'>('g');
  const [bg, setBg] = useState('');            // gregorian birth (yyyy-mm-dd)
  const todayH0 = g2h(todayUTC());
  const [bhy, setBhy] = useState(todayH0.y - 25);
  const [bhm, setBhm] = useState(1);
  const [bhd, setBhd] = useState(1);
  const [copied, setCopied] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const t = {
    title: pick(lang, 'حاسبة العمر بالهجري', 'Hijri Age Calculator', 'ہجری عمر کیلکولیٹر'),
    modeG: pick(lang, 'ميلاد ميلادي', 'Gregorian birth', 'عیسوی پیدائش'),
    modeH: pick(lang, 'ميلاد هجري', 'Hijri birth', 'ہجری پیدائش'),
    pickG: pick(lang, 'اختر تاريخ ميلادك (ميلادي)', 'Pick your birth date (Gregorian)', 'اپنی تاریخِ پیدائش منتخب کریں (عیسوی)'),
    day: pick(lang, 'اليوم', 'Day', 'دن'),
    month: pick(lang, 'الشهر', 'Month', 'مہینہ'),
    year: pick(lang, 'السنة', 'Year', 'سال'),
    prompt: pick(lang, 'أدخل تاريخ ميلادك لعرض عمرك.', 'Enter your birth date to see your age.', 'اپنی عمر دیکھنے کے لیے تاریخِ پیدائش درج کریں۔'),
    future: pick(lang, 'تاريخ الميلاد في المستقبل — تحقّق من التاريخ.', 'Birth date is in the future — please check it.', 'تاریخِ پیدائش مستقبل میں ہے — براہِ کرم جانچ لیں۔'),
    ageHijri: pick(lang, 'عمرك بالتقويم الهجري', 'Your age in the Hijri calendar', 'ہجری تقویم میں آپ کی عمر'),
    ageGreg: pick(lang, 'عمرك بالتقويم الميلادي', 'Your age in the Gregorian calendar', 'عیسوی تقویم میں آپ کی عمر'),
    yr: pick(lang, 'سنة', 'years', 'سال'),
    mo: pick(lang, 'شهر', 'months', 'ماہ'),
    dy: pick(lang, 'يوم', 'days', 'دن'),
    bornLabel: pick(lang, 'تاريخ ميلادك', 'Your birth date', 'آپ کی تاریخِ پیدائش'),
    bornOn: pick(lang, 'وُلدت يوم', 'You were born on', 'آپ پیدا ہوئے بروز'),
    totalDays: pick(lang, 'إجمالي الأيام التي عشتها', 'Total days you have lived', 'آپ نے کل اتنے دن گزارے'),
    daysWord: pick(lang, 'يوم', 'days', 'دن'),
    nextHijri: pick(lang, 'عيد ميلادك القادم (هجري)', 'Your next Hijri birthday', 'آپ کی اگلی ہجری سالگرہ'),
    nextGreg: pick(lang, 'عيد ميلادك القادم (ميلادي)', 'Your next Gregorian birthday', 'آپ کی اگلی عیسوی سالگرہ'),
    today: pick(lang, 'اليوم! 🎉', 'Today! 🎉', 'آج! 🎉'),
    left: (n: number) => pick(lang, `باقٍ ${n} يوم`, `${n} days left`, `${n} دن باقی`),
    copy: pick(lang, 'نسخ النتيجة', 'Copy result', 'نتیجہ کاپی کریں'),
    copied: pick(lang, 'تم النسخ ✓', 'Copied ✓', 'کاپی ہو گیا ✓'),
  };

  const card: React.CSSProperties = { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' };
  const inputStyle: React.CSSProperties = { padding: '11px 13px', borderRadius: 11, border: '1px solid var(--border)', background: 'var(--surface2)', color: 'var(--text)', fontSize: 15 };
  const pillS = (active: boolean): React.CSSProperties => ({ padding: '7px 15px', borderRadius: 999, border: 'none', cursor: 'pointer', fontSize: 13.5, fontWeight: 700, whiteSpace: 'nowrap', background: active ? 'var(--accent)' : 'transparent', color: active ? 'var(--accent-contrast)' : 'var(--muted)', transition: 'all .2s' });

  if (!mounted) return <section style={{ ...card, padding: '24px 26px', minHeight: 300 }} />;

  // --- resolve birth date (UTC) ---
  let birth: Date | null = null;
  if (mode === 'g') {
    const p = (bg || '').split('-').map(Number);
    if (p.length === 3 && p.every(x => x)) birth = new Date(Date.UTC(p[0], p[1] - 1, p[2]));
  } else {
    if (bhy && bhm && bhd) birth = h2g(bhy, bhm, bhd);
  }

  const today = todayUTC();
  const valid = birth && !isNaN(birth.getTime()) && birth.getTime() <= today.getTime();

  // diff in a calendar (y/m/d), borrowing days from the month before "to"
  const diffYMD = (from: YMD, to: YMD, daysInPrevMonth: (y: number, m: number) => number): YMD => {
    let y = to.y - from.y, m = to.m - from.m, d = to.d - from.d;
    if (d < 0) { m -= 1; let py = to.y, pm = to.m - 1; if (pm < 1) { pm = 12; py -= 1; } d += daysInPrevMonth(py, pm); }
    if (m < 0) { y -= 1; m += 12; }
    return { y, m, d };
  };
  const gregDaysInMonth = (y: number, m: number) => new Date(Date.UTC(y, m, 0)).getUTCDate(); // m is 1-based
  const fmtYMD = (a: YMD) => [`${a.y} ${t.yr}`, `${a.m} ${t.mo}`, `${a.d} ${t.dy}`].join(sep);

  let hijriAge = '', gregAge = '', bornHijri = '', bornGreg = '', bornWd = '', totalDays = 0;
  let nextHDate: Date | null = null, nextGDate: Date | null = null, nextHDays = 0, nextGDays = 0;

  if (valid && birth) {
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

  const fmtGFull = (d: Date) => `${wd[d.getUTCDay()]}${dsep}${d.getUTCDate()} ${gMon[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
  const fmtHFull = (d: Date) => { const h = g2h(d); return `${h.d} ${hMon[h.m - 1]} ${h.y} ${hijriEra(lang)}`; };

  const copyResult = () => {
    if (!valid) return;
    const text = `${t.ageHijri}: ${hijriAge} · ${t.ageGreg}: ${gregAge} · ${t.bornLabel}: ${bornHijri} / ${bornGreg}`;
    try { navigator.clipboard?.writeText(text); } catch {}
    setCopied(true); setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section style={{ ...card, padding: '22px 24px', animation: 'fadeUp .5s ease' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
        <h2 style={{ margin: 0, fontWeight: 700, fontSize: 18 }}>{t.title}</h2>
        <div style={{ display: 'flex', gap: 3, background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 999, padding: 4 }}>
          <button style={pillS(mode === 'g')} onClick={() => setMode('g')}>{t.modeG}</button>
          <button style={pillS(mode === 'h')} onClick={() => setMode('h')}>{t.modeH}</button>
        </div>
      </div>

      {mode === 'g' ? (
        <label style={{ display: 'flex', flexDirection: 'column', gap: 7, fontSize: 13, color: 'var(--muted)', maxWidth: 280 }}>
          {t.pickG}
          <input type="date" value={bg} max={toInputVal(today)} onChange={e => setBg(e.target.value)} style={inputStyle} />
        </label>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-end' }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 7, fontSize: 13, color: 'var(--muted)' }}>
            {t.day}
            <select value={bhd} onChange={e => setBhd(+e.target.value)} style={{ ...inputStyle, minWidth: 80 }}>
              {Array.from({ length: 30 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
            </select>
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 7, fontSize: 13, color: 'var(--muted)' }}>
            {t.month}
            <select value={bhm} onChange={e => setBhm(+e.target.value)} style={{ ...inputStyle, minWidth: 150 }}>
              {hMon.map((n, i) => <option key={i + 1} value={i + 1}>{n}</option>)}
            </select>
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 7, fontSize: 13, color: 'var(--muted)' }}>
            {t.year}
            <input type="number" value={bhy} onChange={e => setBhy(parseInt(e.target.value) || bhy)} style={{ ...inputStyle, width: 110 }} />
          </label>
        </div>
      )}

      {!valid ? (
        <p style={{ marginTop: 18, fontSize: 14, color: 'var(--muted)' }}>{birth && birth.getTime() > today.getTime() ? t.future : t.prompt}</p>
      ) : (
        <div style={{ marginTop: 20, display: 'grid', gap: 14 }}>
          <div style={{ padding: '18px 20px', borderRadius: 14, background: 'var(--accent-soft)' }}>
            <div style={{ fontSize: 12.5, color: 'var(--accent)', fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase', marginBottom: 6 }}>{t.ageHijri}</div>
            <div style={{ fontWeight: 800, fontSize: 'clamp(20px,3.4vw,28px)', lineHeight: 1.25, color: 'var(--text)' }}>{hijriAge}</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 12 }}>
            <div style={{ padding: '14px 16px', borderRadius: 12, background: 'var(--surface2)', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 12.5, color: 'var(--muted)', fontWeight: 600 }}>{t.ageGreg}</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginTop: 4 }}>{gregAge}</div>
            </div>
            <div style={{ padding: '14px 16px', borderRadius: 12, background: 'var(--surface2)', border: '1px solid var(--border)' }}>
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
            <div style={{ padding: '14px 16px', borderRadius: 12, background: 'var(--surface2)', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 12.5, color: 'var(--accent)', fontWeight: 700 }}>{t.nextHijri}</div>
              <div style={{ fontWeight: 700, fontSize: 14.5, marginTop: 4 }}>{nextHDate && fmtHFull(nextHDate)}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>{nextHDays === 0 ? t.today : t.left(nextHDays)}</div>
            </div>
            <div style={{ padding: '14px 16px', borderRadius: 12, background: 'var(--surface2)', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 12.5, color: 'var(--accent)', fontWeight: 700 }}>{t.nextGreg}</div>
              <div style={{ fontWeight: 700, fontSize: 14.5, marginTop: 4 }}>{nextGDate && fmtGFull(nextGDate)}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>{nextGDays === 0 ? t.today : t.left(nextGDays)}</div>
            </div>
          </div>

          <div>
            <button onClick={copyResult} style={{ padding: '10px 18px', borderRadius: 11, border: 'none', background: 'var(--accent)', color: 'var(--accent-contrast)', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
              {copied ? t.copied : t.copy}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
