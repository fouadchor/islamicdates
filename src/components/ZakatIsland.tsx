import { useState, useEffect } from 'react';

interface Props { lang: 'ar' | 'en' }

const GRAMS_PER_OZ = 31.1034768;
const NISAB_GOLD_G = 85;     // 85g of gold
const NISAB_SILVER_G = 595;  // 595g of silver
const RATE = 0.025;          // 2.5%

export default function ZakatIsland({ lang }: Props) {
  const ar = lang === 'ar';
  const [mounted, setMounted] = useState(false);

  // settings
  const [basis, setBasis] = useState<'gold' | 'silver'>('gold');
  const [currency, setCurrency] = useState(ar ? 'دولار' : 'USD');
  const [goldPrice, setGoldPrice] = useState('132');   // per gram (USD default, editable)
  const [silverPrice, setSilverPrice] = useState('1.5');
  const [priceNote, setPriceNote] = useState('');

  // assets
  const [cash, setCash] = useState('');
  const [goldGrams, setGoldGrams] = useState('');
  const [silverGrams, setSilverGrams] = useState('');
  const [business, setBusiness] = useState('');
  const [investments, setInvestments] = useState('');
  const [receivables, setReceivables] = useState('');
  // liabilities
  const [debts, setDebts] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Hybrid: try to auto-fill live spot prices (USD/gram). User can override
    // and switch to their own currency. Gracefully falls back to defaults.
    (async () => {
      try {
        const [g, s] = await Promise.all([
          fetch('https://api.gold-api.com/price/XAU').then(r => r.json()),
          fetch('https://api.gold-api.com/price/XAG').then(r => r.json()),
        ]);
        if (g && g.price) setGoldPrice((g.price / GRAMS_PER_OZ).toFixed(2));
        if (s && s.price) setSilverPrice((s.price / GRAMS_PER_OZ).toFixed(3));
        setCurrency(ar ? 'دولار' : 'USD');
        setPriceNote(ar
          ? 'أسعار السوق الحالية بالدولار الأمريكي. إن كانت عملتك مختلفة فعدّل سعر الجرام وأدخل كل المبالغ بالعملة نفسها.'
          : 'Live spot prices in US dollars. If your currency differs, edit the gram price and enter all amounts in that same currency.');
      } catch {
        setPriceNote(ar
          ? 'تعذّر جلب الأسعار تلقائياً — رجاءً أدخل سعر جرام الذهب والفضة بعملتك يدوياً.'
          : 'Could not fetch live prices — please enter the gold and silver gram price in your currency manually.');
      }
    })();
  }, []);

  const n = (s: string) => {
    const v = parseFloat(String(s).replace(/,/g, ''));
    return isFinite(v) && v > 0 ? v : 0;
  };
  const fmt = (v: number) => v.toLocaleString(ar ? 'ar-EG' : 'en-US', { maximumFractionDigits: 2 });
  const money = (v: number) => `${fmt(v)} ${currency}`;

  const gp = n(goldPrice), sp = n(silverPrice);
  const goldVal = n(goldGrams) * gp;
  const silverVal = n(silverGrams) * sp;
  const totalAssets = n(cash) + goldVal + silverVal + n(business) + n(investments) + n(receivables);
  const net = Math.max(0, totalAssets - n(debts));
  const nisab = basis === 'gold' ? NISAB_GOLD_G * gp : NISAB_SILVER_G * sp;
  const due = net >= nisab && nisab > 0;
  const zakat = due ? net * RATE : 0;
  const shortfall = Math.max(0, nisab - net);

  const t = {
    settings: ar ? 'الإعدادات والأسعار' : 'Settings & prices',
    basis: ar ? 'أساس النصاب' : 'Nisab basis',
    gold: ar ? 'الذهب' : 'Gold',
    silver: ar ? 'الفضة' : 'Silver',
    goldG: ar ? 'سعر جرام الذهب' : 'Gold price / gram',
    silverG: ar ? 'سعر جرام الفضة' : 'Silver price / gram',
    currency: ar ? 'العملة' : 'Currency',
    assets: ar ? 'الأصول الزكوية' : 'Zakatable assets',
    cash: ar ? 'النقد والأرصدة البنكية' : 'Cash & bank balances',
    goldGrams: ar ? 'الذهب المملوك (جرام)' : 'Gold owned (grams)',
    silverGrams: ar ? 'الفضة المملوكة (جرام)' : 'Silver owned (grams)',
    business: ar ? 'عروض التجارة والبضائع للبيع' : 'Business goods / inventory',
    investments: ar ? 'الأسهم والاستثمارات' : 'Stocks & investments',
    receivables: ar ? 'ديون مرجوّة لك' : 'Money owed to you (recoverable)',
    liabilities: ar ? 'الخصوم' : 'Liabilities',
    debts: ar ? 'ديون مستحقة عليك الآن' : 'Debts due now',
    totalAssets: ar ? 'إجمالي الأصول' : 'Total assets',
    less: ar ? 'يُطرح: الخصوم' : 'Less: liabilities',
    netW: ar ? 'صافي المال الزكوي' : 'Net zakatable wealth',
    nisab: ar ? 'النصاب' : 'Nisab threshold',
    due: ar ? 'الزكاة المستحقة (2.5%)' : 'Zakat due (2.5%)',
    dueYes: ar ? 'مالك بلغ النصاب، وتجب الزكاة إن مرّ عليه حول هجري كامل.' : 'Your wealth has reached the nisab — zakat is due if a full lunar year has passed.',
    dueNo: ar ? 'مالك دون النصاب، فلا تجب الزكاة حالياً.' : 'Your wealth is below the nisab, so no zakat is due now.',
    short: ar ? 'الفارق حتى بلوغ النصاب' : 'Amount below nisab',
    reset: ar ? 'تفريغ الحقول' : 'Reset',
    copy: ar ? 'نسخ النتيجة' : 'Copy result',
    copied: ar ? 'تم النسخ ✓' : 'Copied ✓',
    hawl: ar
      ? 'تذكير: تجب الزكاة في المال إذا بلغ النصاب ومرّ عليه حول (سنة هجرية كاملة) وأنت مالك له. وهذه الحاسبة للاسترشاد فقط؛ ولأي حالة خاصة استشر أهل العلم.'
      : 'Reminder: zakat is due when wealth reaches the nisab and a full lunar (Hijri) year passes while you own it. This tool is for guidance only — consult a scholar for specific cases.',
  };

  const card: React.CSSProperties = { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', padding: '22px 24px' };
  const label: React.CSSProperties = { fontSize: 13.5, color: 'var(--muted)', fontWeight: 600, marginBottom: 6, display: 'block' };
  const input: React.CSSProperties = { width: '100%', boxSizing: 'border-box', padding: '11px 13px', borderRadius: 11, border: '1px solid var(--border)', background: 'var(--surface2)', color: 'var(--text)', fontSize: 15, fontWeight: 600 };
  const row: React.CSSProperties = { marginBottom: 14 };

  const Field = ({ lbl, val, set, suffix, ph }: { lbl: string; val: string; set: (s: string) => void; suffix?: string; ph?: string }) => (
    <div style={row}>
      <label style={label}>{lbl}{suffix ? <span style={{ opacity: .7, fontWeight: 500 }}> · {suffix}</span> : null}</label>
      <input type="number" inputMode="decimal" min="0" value={val} placeholder={ph ?? '0'}
        onChange={e => set(e.target.value)} style={input} />
    </div>
  );

  if (!mounted) return <section style={{ ...card, minHeight: 360 }} />;

  return (
    <section style={{ display: 'grid', gap: 18 }}>
      {/* Settings & prices */}
      <div style={card}>
        <h2 style={{ margin: '0 0 4px', fontSize: 17, fontWeight: 700 }}>{t.settings}</h2>
        {priceNote && <p style={{ margin: '0 0 16px', fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.6 }}>{priceNote}</p>}

        <label style={label}>{t.basis}</label>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          {(['gold', 'silver'] as const).map(b => (
            <button key={b} onClick={() => setBasis(b)}
              style={{ flex: '1 1 140px', padding: '11px 14px', borderRadius: 11, cursor: 'pointer', fontWeight: 700, fontSize: 14,
                border: '1px solid ' + (basis === b ? 'var(--accent)' : 'var(--border)'),
                background: basis === b ? 'var(--accent)' : 'var(--surface2)',
                color: basis === b ? 'var(--accent-contrast)' : 'var(--text)' }}>
              {b === 'gold' ? `${t.gold} · ${NISAB_GOLD_G}g` : `${t.silver} · ${NISAB_SILVER_G}g`}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
          <Field lbl={t.goldG} val={goldPrice} set={setGoldPrice} suffix={currency} />
          <Field lbl={t.silverG} val={silverPrice} set={setSilverPrice} suffix={currency} />
          <div style={row}>
            <label style={label}>{t.currency}</label>
            <input value={currency} onChange={e => setCurrency(e.target.value)} style={input} />
          </div>
        </div>
      </div>

      {/* Assets */}
      <div style={card}>
        <h2 style={{ margin: '0 0 16px', fontSize: 17, fontWeight: 700 }}>{t.assets}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0 16px' }}>
          <Field lbl={t.cash} val={cash} set={setCash} suffix={currency} />
          <Field lbl={t.goldGrams} val={goldGrams} set={setGoldGrams} suffix={goldVal > 0 ? money(goldVal) : (ar ? 'جرام' : 'grams')} />
          <Field lbl={t.silverGrams} val={silverGrams} set={setSilverGrams} suffix={silverVal > 0 ? money(silverVal) : (ar ? 'جرام' : 'grams')} />
          <Field lbl={t.business} val={business} set={setBusiness} suffix={currency} />
          <Field lbl={t.investments} val={investments} set={setInvestments} suffix={currency} />
          <Field lbl={t.receivables} val={receivables} set={setReceivables} suffix={currency} />
        </div>
        <h2 style={{ margin: '10px 0 16px', fontSize: 17, fontWeight: 700 }}>{t.liabilities}</h2>
        <div style={{ maxWidth: 360 }}>
          <Field lbl={t.debts} val={debts} set={setDebts} suffix={currency} />
        </div>
      </div>

      {/* Result */}
      <div style={{ ...card, background: 'var(--accent-soft)', borderColor: 'var(--accent)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14.5, padding: '6px 0', color: 'var(--muted)' }}>
          <span>{t.totalAssets}</span><strong style={{ color: 'var(--text)' }}>{money(totalAssets)}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14.5, padding: '6px 0', color: 'var(--muted)' }}>
          <span>{t.less}</span><strong style={{ color: 'var(--text)' }}>− {money(n(debts))}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, padding: '10px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', margin: '6px 0' }}>
          <span style={{ fontWeight: 700 }}>{t.netW}</span><strong>{money(net)}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, padding: '6px 0', color: 'var(--muted)' }}>
          <span>{t.nisab} · {basis === 'gold' ? `${t.gold} ${NISAB_GOLD_G}g` : `${t.silver} ${NISAB_SILVER_G}g`}</span><strong style={{ color: 'var(--text)' }}>{money(nisab)}</strong>
        </div>

        <div style={{ marginTop: 14, textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 700, letterSpacing: '.08em' }}>{t.due}</div>
          <div style={{ fontSize: 'clamp(30px,6vw,46px)', fontWeight: 800, color: 'var(--accent)', lineHeight: 1.1, margin: '4px 0' }}>{money(zakat)}</div>
          <p style={{ margin: '6px auto 0', fontSize: 13.5, color: 'var(--text)', maxWidth: 460, lineHeight: 1.6 }}>
            {due ? t.dueYes : `${t.dueNo} ${shortfall > 0 ? `(${t.short}: ${money(shortfall)})` : ''}`}
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 16, flexWrap: 'wrap' }}>
          <button onClick={() => {
            const text = `${t.netW}: ${money(net)} · ${t.nisab}: ${money(nisab)} · ${t.due}: ${money(zakat)}`;
            try { navigator.clipboard?.writeText(text); } catch {}
            setCopied(true); setTimeout(() => setCopied(false), 1800);
          }} style={{ padding: '10px 18px', borderRadius: 11, border: 'none', background: 'var(--accent)', color: 'var(--accent-contrast)', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
            {copied ? t.copied : t.copy}
          </button>
          <button onClick={() => { setCash(''); setGoldGrams(''); setSilverGrams(''); setBusiness(''); setInvestments(''); setReceivables(''); setDebts(''); }}
            style={{ padding: '10px 18px', borderRadius: 11, border: '1px solid var(--border)', background: 'var(--surface2)', color: 'var(--text)', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
            {t.reset}
          </button>
        </div>
      </div>

      <p style={{ margin: 0, fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.7, textAlign: 'center' }}>{t.hawl}</p>
    </section>
  );
}
