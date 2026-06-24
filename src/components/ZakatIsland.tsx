import { useState, useEffect } from 'react';

interface Props { lang: 'ar' | 'en' }

const GRAMS_PER_OZ = 31.1034768;
const NISAB_GOLD_G = 85;
const NISAB_SILVER_G = 595;
const RATE = 0.025;

// Main currencies for the dropdown
const CURRENCIES: { code: string; ar: string; en: string }[] = [
  { code: 'USD', ar: 'دولار أمريكي', en: 'US Dollar' },
  { code: 'SAR', ar: 'ريال سعودي', en: 'Saudi Riyal' },
  { code: 'AED', ar: 'درهم إماراتي', en: 'UAE Dirham' },
  { code: 'QAR', ar: 'ريال قطري', en: 'Qatari Riyal' },
  { code: 'KWD', ar: 'دينار كويتي', en: 'Kuwaiti Dinar' },
  { code: 'BHD', ar: 'دينار بحريني', en: 'Bahraini Dinar' },
  { code: 'OMR', ar: 'ريال عماني', en: 'Omani Rial' },
  { code: 'EGP', ar: 'جنيه مصري', en: 'Egyptian Pound' },
  { code: 'JOD', ar: 'دينار أردني', en: 'Jordanian Dinar' },
  { code: 'IQD', ar: 'دينار عراقي', en: 'Iraqi Dinar' },
  { code: 'LBP', ar: 'ليرة لبنانية', en: 'Lebanese Pound' },
  { code: 'SYP', ar: 'ليرة سورية', en: 'Syrian Pound' },
  { code: 'YER', ar: 'ريال يمني', en: 'Yemeni Rial' },
  { code: 'TRY', ar: 'ليرة تركية', en: 'Turkish Lira' },
  { code: 'MAD', ar: 'درهم مغربي', en: 'Moroccan Dirham' },
  { code: 'DZD', ar: 'دينار جزائري', en: 'Algerian Dinar' },
  { code: 'TND', ar: 'دينار تونسي', en: 'Tunisian Dinar' },
  { code: 'LYD', ar: 'دينار ليبي', en: 'Libyan Dinar' },
  { code: 'SDG', ar: 'جنيه سوداني', en: 'Sudanese Pound' },
  { code: 'PKR', ar: 'روبية باكستانية', en: 'Pakistani Rupee' },
  { code: 'INR', ar: 'روبية هندية', en: 'Indian Rupee' },
  { code: 'IDR', ar: 'روبية إندونيسية', en: 'Indonesian Rupiah' },
  { code: 'MYR', ar: 'رينغيت ماليزي', en: 'Malaysian Ringgit' },
  { code: 'BDT', ar: 'تاكا بنغلاديشي', en: 'Bangladeshi Taka' },
  { code: 'NGN', ar: 'نايرا نيجيري', en: 'Nigerian Naira' },
  { code: 'GBP', ar: 'جنيه إسترليني', en: 'British Pound' },
  { code: 'EUR', ar: 'يورو', en: 'Euro' },
];

// Guess a default currency from the browser timezone
const TZ_CCY: Record<string, string> = {
  'Asia/Riyadh': 'SAR', 'Asia/Dubai': 'AED', 'Asia/Qatar': 'QAR', 'Asia/Kuwait': 'KWD',
  'Asia/Bahrain': 'BHD', 'Asia/Muscat': 'OMR', 'Asia/Aden': 'YER', 'Africa/Cairo': 'EGP',
  'Asia/Amman': 'JOD', 'Asia/Baghdad': 'IQD', 'Asia/Beirut': 'LBP', 'Asia/Damascus': 'SYP',
  'Europe/Istanbul': 'TRY', 'Asia/Istanbul': 'TRY', 'Africa/Casablanca': 'MAD',
  'Africa/Algiers': 'DZD', 'Africa/Tunis': 'TND', 'Africa/Tripoli': 'LYD', 'Africa/Khartoum': 'SDG',
  'Asia/Karachi': 'PKR', 'Asia/Kolkata': 'INR', 'Asia/Calcutta': 'INR', 'Asia/Jakarta': 'IDR',
  'Asia/Kuala_Lumpur': 'MYR', 'Asia/Dhaka': 'BDT', 'Africa/Lagos': 'NGN', 'Europe/London': 'GBP',
};

// ---- module-scope styles + stable Field component (so inputs keep focus) ----
const cardStyle: React.CSSProperties = { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', padding: '22px 24px' };
const labelStyle: React.CSSProperties = { fontSize: 13.5, color: 'var(--muted)', fontWeight: 600, marginBottom: 6, display: 'block' };
const inputStyle: React.CSSProperties = { width: '100%', boxSizing: 'border-box', padding: '11px 13px', borderRadius: 11, border: '1px solid var(--border)', background: 'var(--surface2)', color: 'var(--text)', fontSize: 15, fontWeight: 600 };

function Field({ lbl, val, set, suffix, ph }: { lbl: string; val: string; set: (s: string) => void; suffix?: string; ph?: string }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={labelStyle}>{lbl}{suffix ? <span style={{ opacity: .7, fontWeight: 500 }}> · {suffix}</span> : null}</label>
      <input type="number" inputMode="decimal" min="0" value={val} placeholder={ph ?? '0'}
        onChange={e => set(e.target.value)} style={inputStyle} />
    </div>
  );
}

export default function ZakatIsland({ lang }: Props) {
  const ar = lang === 'ar';
  const [mounted, setMounted] = useState(false);

  const [basis, setBasis] = useState<'gold' | 'silver'>('gold');
  const [currency, setCurrency] = useState('USD');
  const [goldUSD, setGoldUSD] = useState(0);   // per gram, USD
  const [silverUSD, setSilverUSD] = useState(0);
  const [rates, setRates] = useState<Record<string, number>>({ USD: 1 });
  const [goldPrice, setGoldPrice] = useState('');   // per gram, in selected currency (editable)
  const [silverPrice, setSilverPrice] = useState('');
  const [priceNote, setPriceNote] = useState(ar ? 'يتم جلب أسعار الذهب والفضة وسعر الصرف تلقائياً…' : 'Fetching live gold, silver and exchange rates…');

  const [cash, setCash] = useState('');
  const [goldGrams, setGoldGrams] = useState('');
  const [silverGrams, setSilverGrams] = useState('');
  const [business, setBusiness] = useState('');
  const [investments, setInvestments] = useState('');
  const [receivables, setReceivables] = useState('');
  const [debts, setDebts] = useState('');
  const [copied, setCopied] = useState(false);

  // apply USD price + rate -> currency price strings
  const applyPrices = (gUSD: number, sUSD: number, rate: number) => {
    if (gUSD > 0) setGoldPrice((gUSD * rate).toFixed(2));
    if (sUSD > 0) setSilverPrice((sUSD * rate).toFixed(rate >= 100 ? 1 : 3));
  };

  useEffect(() => {
    setMounted(true);
    let ccy = 'USD';
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (TZ_CCY[tz]) ccy = TZ_CCY[tz];
    } catch {}
    setCurrency(ccy);
    (async () => {
      try {
        const [g, s, fx] = await Promise.all([
          fetch('https://api.gold-api.com/price/XAU').then(r => r.json()),
          fetch('https://api.gold-api.com/price/XAG').then(r => r.json()),
          fetch('https://open.er-api.com/v6/latest/USD').then(r => r.json()),
        ]);
        const gUSD = g && g.price ? g.price / GRAMS_PER_OZ : 0;
        const sUSD = s && s.price ? s.price / GRAMS_PER_OZ : 0;
        const rt: Record<string, number> = (fx && fx.rates) ? fx.rates : { USD: 1 };
        setGoldUSD(gUSD); setSilverUSD(sUSD); setRates(rt);
        const rate = rt[ccy] ?? 1;
        applyPrices(gUSD, sUSD, rate);
        setPriceNote(ar
          ? 'الأسعار محدّثة تلقائياً من السوق وتُحوَّل لعملتك. يمكنك تعديل سعر الجرام يدوياً عند الحاجة.'
          : 'Prices are fetched live and converted to your currency. You can edit the gram price manually if needed.');
      } catch {
        setPriceNote(ar
          ? 'تعذّر جلب الأسعار تلقائياً — اختر عملتك وأدخل سعر جرام الذهب والفضة يدوياً.'
          : 'Could not fetch live prices — pick your currency and enter the gold/silver gram price manually.');
      }
    })();
  }, []);

  const onCurrency = (code: string) => {
    setCurrency(code);
    const rate = rates[code] ?? 1;
    applyPrices(goldUSD, silverUSD, rate);
  };

  const num = (s: string) => {
    const v = parseFloat(String(s).replace(/,/g, ''));
    return isFinite(v) && v > 0 ? v : 0;
  };
  // Always Western digits (1, 2, 3)
  const fmt = (v: number) => v.toLocaleString('en-US', { maximumFractionDigits: 2 });
  const money = (v: number) => `${fmt(v)} ${currency}`;

  const gp = num(goldPrice), sp = num(silverPrice);
  const goldVal = num(goldGrams) * gp;
  const silverVal = num(silverGrams) * sp;
  const totalAssets = num(cash) + goldVal + silverVal + num(business) + num(investments) + num(receivables);
  const net = Math.max(0, totalAssets - num(debts));
  const goldNisab = NISAB_GOLD_G * gp;
  const silverNisab = NISAB_SILVER_G * sp;
  const nisab = basis === 'gold' ? goldNisab : silverNisab;
  const due = net >= nisab && nisab > 0;
  const zakat = due ? net * RATE : 0;
  const shortfall = Math.max(0, nisab - net);

  const t = {
    settings: ar ? 'الإعدادات والأسعار' : 'Settings & prices',
    basis: ar ? 'أساس النصاب' : 'Nisab basis',
    gold: ar ? 'الذهب' : 'Gold', silver: ar ? 'الفضة' : 'Silver',
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
    nisabToday: ar ? 'نصاب الزكاة اليوم' : "Today's Zakat nisab",
    nisabDesc: ar
      ? 'النصاب هو أقل مقدار من المال تجب فيه الزكاة، ويتغيّر يومياً بتغيّر سعر الذهب والفضة. هذه القيمة محسوبة بسعر السوق الحالي بعملتك. إذا بلغ صافي مالك أحد النصابين ومرّ عليه حول هجري كامل وجبت الزكاة (2.5%).'
      : 'The nisab is the minimum wealth on which Zakat is due, and it changes daily with gold and silver prices. These values use the current market price in your currency. If your net wealth reaches either nisab and a full Hijri year passes, Zakat (2.5%) is due.',
    nisabGold: ar ? 'نصاب الذهب · 85 جم' : 'Gold nisab · 85g',
    nisabSilver: ar ? 'نصاب الفضة · 595 جم' : 'Silver nisab · 595g',
    nisabNote: ar
      ? 'الأحوط لمن أكثر ماله نقد أو مختلط الأخذ بنصاب الفضة لأنه أقل. اضغط على أحد النصابين لاعتماده في الحساب.'
      : 'For mostly-cash or mixed wealth, the lower silver nisab is the more cautious choice. Tap a nisab to use it in the calculation.',
    active: ar ? 'مُعتمَد' : 'in use',
    due: ar ? 'الزكاة المستحقة (2.5%)' : 'Zakat due (2.5%)',
    dueYes: ar ? 'مالك بلغ النصاب، وتجب الزكاة إن مرّ عليه حول هجري كامل.' : 'Your wealth has reached the nisab — zakat is due if a full lunar year has passed.',
    dueNo: ar ? 'مالك دون النصاب، فلا تجب الزكاة حالياً.' : 'Your wealth is below the nisab, so no zakat is due now.',
    short: ar ? 'الفارق حتى بلوغ النصاب' : 'Amount below nisab',
    reset: ar ? 'تفريغ الحقول' : 'Reset', copy: ar ? 'نسخ النتيجة' : 'Copy result', copied: ar ? 'تم النسخ ✓' : 'Copied ✓',
    grams: ar ? 'جرام' : 'grams',
    hawl: ar
      ? 'تذكير: تجب الزكاة في المال إذا بلغ النصاب ومرّ عليه حول (سنة هجرية كاملة) وأنت مالك له. وهذه الحاسبة للاسترشاد فقط؛ ولأي حالة خاصة استشر أهل العلم.'
      : 'Reminder: zakat is due when wealth reaches the nisab and a full lunar (Hijri) year passes while you own it. This tool is for guidance only — consult a scholar for specific cases.',
  };

  if (!mounted) return <section style={{ ...cardStyle, minHeight: 360 }} />;

  return (
    <section style={{ display: 'grid', gap: 18 }}>
      {/* Nisab today — prominent, answers "how much is the nisab in <currency>" */}
      <div style={{ ...cardStyle, background: 'var(--accent-soft)', borderColor: 'var(--accent)' }}>
        <h2 style={{ margin: '0 0 4px', fontSize: 18, fontWeight: 800 }}>{t.nisabToday}</h2>
        <p style={{ margin: '0 0 14px', fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.6 }}>{t.nisabDesc}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
          {([['gold', t.nisabGold, goldNisab], ['silver', t.nisabSilver, silverNisab]] as const).map(([b, lbl, val]) => (
            <button key={b} onClick={() => setBasis(b as 'gold' | 'silver')}
              style={{ textAlign: ar ? 'right' : 'left', padding: '14px 16px', borderRadius: 12, cursor: 'pointer',
                border: '2px solid ' + (basis === b ? 'var(--accent)' : 'var(--border)'),
                background: 'var(--surface)' }}>
              <span style={{ display: 'block', fontSize: 13, color: 'var(--muted)', fontWeight: 600 }}>{lbl}{basis === b ? ` · ${t.active}` : ''}</span>
              <span style={{ display: 'block', fontSize: 'clamp(21px,3.6vw,28px)', fontWeight: 800, color: 'var(--accent)', marginTop: 4 }}>{money(val as number)}</span>
            </button>
          ))}
        </div>
        <p style={{ margin: '12px 0 0', fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{t.nisabNote}</p>
      </div>

      <div style={cardStyle}>
        <h2 style={{ margin: '0 0 4px', fontSize: 17, fontWeight: 700 }}>{t.settings}</h2>
        {priceNote && <p style={{ margin: '0 0 16px', fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.6 }}>{priceNote}</p>}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>{t.currency}</label>
            <select value={currency} onChange={e => onCurrency(e.target.value)} style={inputStyle}>
              {CURRENCIES.map(c => <option key={c.code} value={c.code}>{(ar ? c.ar : c.en) + ' · ' + c.code}</option>)}
            </select>
          </div>
          <Field lbl={t.goldG} val={goldPrice} set={setGoldPrice} suffix={currency} />
          <Field lbl={t.silverG} val={silverPrice} set={setSilverPrice} suffix={currency} />
        </div>
      </div>

      <div style={cardStyle}>
        <h2 style={{ margin: '0 0 16px', fontSize: 17, fontWeight: 700 }}>{t.assets}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0 16px' }}>
          <Field lbl={t.cash} val={cash} set={setCash} suffix={currency} />
          <Field lbl={t.goldGrams} val={goldGrams} set={setGoldGrams} suffix={goldVal > 0 ? money(goldVal) : t.grams} />
          <Field lbl={t.silverGrams} val={silverGrams} set={setSilverGrams} suffix={silverVal > 0 ? money(silverVal) : t.grams} />
          <Field lbl={t.business} val={business} set={setBusiness} suffix={currency} />
          <Field lbl={t.investments} val={investments} set={setInvestments} suffix={currency} />
          <Field lbl={t.receivables} val={receivables} set={setReceivables} suffix={currency} />
        </div>
        <h2 style={{ margin: '10px 0 16px', fontSize: 17, fontWeight: 700 }}>{t.liabilities}</h2>
        <div style={{ maxWidth: 360 }}>
          <Field lbl={t.debts} val={debts} set={setDebts} suffix={currency} />
        </div>
      </div>

      <div style={{ ...cardStyle, background: 'var(--accent-soft)', borderColor: 'var(--accent)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14.5, padding: '6px 0', color: 'var(--muted)' }}>
          <span>{t.totalAssets}</span><strong style={{ color: 'var(--text)' }}>{money(totalAssets)}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14.5, padding: '6px 0', color: 'var(--muted)' }}>
          <span>{t.less}</span><strong style={{ color: 'var(--text)' }}>− {money(num(debts))}</strong>
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
          }} style={{ padding: '10px 18px', borderRadius: 11, border: 'none', background: 'var(--cta)', color: 'var(--cta-contrast)', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
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
