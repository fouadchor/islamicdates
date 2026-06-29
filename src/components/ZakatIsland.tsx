import { useState, useEffect } from 'react';
import { type Lang, toLang, pick, isRTL } from '../lib/data';

interface Props { lang: Lang }

const GRAMS_PER_OZ = 31.1034768;
const NISAB_GOLD_G = 85;
const NISAB_SILVER_G = 595;
const RATE = 0.025;

// Main currencies for the dropdown
const CURRENCIES: { code: string; ar: string; en: string; ur: string }[] = [
  { code: 'USD', ar: 'دولار أمريكي', en: 'US Dollar', ur: 'امریکی ڈالر' },
  { code: 'SAR', ar: 'ريال سعودي', en: 'Saudi Riyal', ur: 'سعودی ریال' },
  { code: 'AED', ar: 'درهم إماراتي', en: 'UAE Dirham', ur: 'اماراتی درہم' },
  { code: 'QAR', ar: 'ريال قطري', en: 'Qatari Riyal', ur: 'قطری ریال' },
  { code: 'KWD', ar: 'دينار كويتي', en: 'Kuwaiti Dinar', ur: 'کویتی دینار' },
  { code: 'BHD', ar: 'دينار بحريني', en: 'Bahraini Dinar', ur: 'بحرینی دینار' },
  { code: 'OMR', ar: 'ريال عماني', en: 'Omani Rial', ur: 'عمانی ریال' },
  { code: 'EGP', ar: 'جنيه مصري', en: 'Egyptian Pound', ur: 'مصری پاؤنڈ' },
  { code: 'JOD', ar: 'دينار أردني', en: 'Jordanian Dinar', ur: 'اردنی دینار' },
  { code: 'IQD', ar: 'دينار عراقي', en: 'Iraqi Dinar', ur: 'عراقی دینار' },
  { code: 'LBP', ar: 'ليرة لبنانية', en: 'Lebanese Pound', ur: 'لبنانی پاؤنڈ' },
  { code: 'SYP', ar: 'ليرة سورية', en: 'Syrian Pound', ur: 'شامی پاؤنڈ' },
  { code: 'YER', ar: 'ريال يمني', en: 'Yemeni Rial', ur: 'یمنی ریال' },
  { code: 'TRY', ar: 'ليرة تركية', en: 'Turkish Lira', ur: 'ترکی لیرا' },
  { code: 'MAD', ar: 'درهم مغربي', en: 'Moroccan Dirham', ur: 'مراکشی درہم' },
  { code: 'DZD', ar: 'دينار جزائري', en: 'Algerian Dinar', ur: 'الجزائری دینار' },
  { code: 'TND', ar: 'دينار تونسي', en: 'Tunisian Dinar', ur: 'تیونسی دینار' },
  { code: 'LYD', ar: 'دينار ليبي', en: 'Libyan Dinar', ur: 'لیبیائی دینار' },
  { code: 'SDG', ar: 'جنيه سوداني', en: 'Sudanese Pound', ur: 'سوڈانی پاؤنڈ' },
  { code: 'PKR', ar: 'روبية باكستانية', en: 'Pakistani Rupee', ur: 'پاکستانی روپیہ' },
  { code: 'INR', ar: 'روبية هندية', en: 'Indian Rupee', ur: 'بھارتی روپیہ' },
  { code: 'IDR', ar: 'روبية إندونيسية', en: 'Indonesian Rupiah', ur: 'انڈونیشی روپیہ' },
  { code: 'MYR', ar: 'رينغيت ماليزي', en: 'Malaysian Ringgit', ur: 'ملائیشین رنگٹ' },
  { code: 'BDT', ar: 'تاكا بنغلاديشي', en: 'Bangladeshi Taka', ur: 'بنگلہ دیشی ٹکا' },
  { code: 'NGN', ar: 'نايرا نيجيري', en: 'Nigerian Naira', ur: 'نائجیرین نائرا' },
  { code: 'GBP', ar: 'جنيه إسترليني', en: 'British Pound', ur: 'برطانوی پاؤنڈ' },
  { code: 'EUR', ar: 'يورو', en: 'Euro', ur: 'یورو' },
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
  // Eurozone -> EUR
  'Europe/Paris': 'EUR', 'Europe/Berlin': 'EUR', 'Europe/Madrid': 'EUR', 'Europe/Rome': 'EUR',
  'Europe/Amsterdam': 'EUR', 'Europe/Brussels': 'EUR', 'Europe/Vienna': 'EUR', 'Europe/Dublin': 'EUR',
  'Europe/Lisbon': 'EUR', 'Europe/Athens': 'EUR', 'Europe/Helsinki': 'EUR', 'Europe/Bratislava': 'EUR',
  'Europe/Ljubljana': 'EUR', 'Europe/Vilnius': 'EUR', 'Europe/Riga': 'EUR', 'Europe/Tallinn': 'EUR',
  'Europe/Luxembourg': 'EUR', 'Europe/Malta': 'EUR', 'Europe/Zagreb': 'EUR', 'Europe/Nicosia': 'EUR',
  'Atlantic/Canary': 'EUR',
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
  const ll = toLang(lang);
  const rtl = isRTL(lang);
  const [mounted, setMounted] = useState(false);

  const [basis, setBasis] = useState<'gold' | 'silver'>('gold');
  const [currency, setCurrency] = useState('USD');
  const [goldUSD, setGoldUSD] = useState(0);   // per gram, USD
  const [silverUSD, setSilverUSD] = useState(0);
  const [rates, setRates] = useState<Record<string, number>>({ USD: 1 });
  const [goldPrice, setGoldPrice] = useState('');   // per gram, in selected currency (editable)
  const [silverPrice, setSilverPrice] = useState('');
  const [priceNote, setPriceNote] = useState(pick(lang, 'يتم جلب أسعار الذهب والفضة وسعر الصرف تلقائياً…', 'Fetching live gold, silver and exchange rates…', 'سونے، چاندی اور شرحِ تبادلہ کی تازہ قیمتیں حاصل کی جا رہی ہیں…'));

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
        setPriceNote(pick(lang,
          'الأسعار محدّثة تلقائياً من السوق وتُحوَّل لعملتك. يمكنك تعديل سعر الجرام يدوياً عند الحاجة.',
          'Prices are fetched live and converted to your currency. You can edit the gram price manually if needed.',
          'قیمتیں خودکار طور پر بازار سے حاصل ہو کر آپ کی کرنسی میں تبدیل کی جاتی ہیں۔ ضرورت ہو تو فی گرام قیمت دستی طور پر تبدیل کر سکتے ہیں۔'));
      } catch {
        setPriceNote(pick(lang,
          'تعذّر جلب الأسعار تلقائياً — اختر عملتك وأدخل سعر جرام الذهب والفضة يدوياً.',
          'Could not fetch live prices — pick your currency and enter the gold/silver gram price manually.',
          'قیمتیں خودکار طور پر حاصل نہ ہو سکیں — اپنی کرنسی منتخب کریں اور سونے/چاندی کی فی گرام قیمت دستی طور پر درج کریں۔'));
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
    settings: pick(lang, 'الإعدادات والأسعار', 'Settings & prices', 'ترتیبات اور قیمتیں'),
    basis: pick(lang, 'أساس النصاب', 'Nisab basis', 'نصاب کی بنیاد'),
    gold: pick(lang, 'الذهب', 'Gold', 'سونا'), silver: pick(lang, 'الفضة', 'Silver', 'چاندی'),
    goldG: pick(lang, 'سعر جرام الذهب', 'Gold price / gram', 'سونے کی فی گرام قیمت'),
    silverG: pick(lang, 'سعر جرام الفضة', 'Silver price / gram', 'چاندی کی فی گرام قیمت'),
    currency: pick(lang, 'العملة', 'Currency', 'کرنسی'),
    assets: pick(lang, 'الأصول الزكوية', 'Zakatable assets', 'زکوٰۃ کے قابل اثاثے'),
    cash: pick(lang, 'النقد والأرصدة البنكية', 'Cash & bank balances', 'نقد اور بینک بیلنس'),
    goldGrams: pick(lang, 'الذهب المملوك (جرام)', 'Gold owned (grams)', 'ملکیتی سونا (گرام)'),
    silverGrams: pick(lang, 'الفضة المملوكة (جرام)', 'Silver owned (grams)', 'ملکیتی چاندی (گرام)'),
    business: pick(lang, 'عروض التجارة والبضائع للبيع', 'Business goods / inventory', 'مالِ تجارت / بیچنے کا سامان'),
    investments: pick(lang, 'الأسهم والاستثمارات', 'Stocks & investments', 'حصص اور سرمایہ کاری'),
    receivables: pick(lang, 'ديون مرجوّة لك', 'Money owed to you (recoverable)', 'وصول طلب قرضے (آپ کے)'),
    liabilities: pick(lang, 'الخصوم', 'Liabilities', 'واجبات'),
    debts: pick(lang, 'ديون مستحقة عليك الآن', 'Debts due now', 'ابھی واجب الادا قرضے'),
    totalAssets: pick(lang, 'إجمالي الأصول', 'Total assets', 'کل اثاثے'),
    less: pick(lang, 'يُطرح: الخصوم', 'Less: liabilities', 'منہا: واجبات'),
    netW: pick(lang, 'صافي المال الزكوي', 'Net zakatable wealth', 'خالص قابلِ زکوٰۃ مال'),
    nisab: pick(lang, 'النصاب', 'Nisab threshold', 'نصاب کی حد'),
    nisabToday: pick(lang, 'نصاب الزكاة اليوم', "Today's Zakat nisab", 'آج زکوٰۃ کا نصاب'),
    nisabDesc: pick(lang,
      'النصاب هو أقل مقدار من المال تجب فيه الزكاة، ويتغيّر يومياً بتغيّر سعر الذهب والفضة. هذه القيمة محسوبة بسعر السوق الحالي بعملتك. إذا بلغ صافي مالك أحد النصابين ومرّ عليه حول هجري كامل وجبت الزكاة (2.5%).',
      'The nisab is the minimum wealth on which Zakat is due, and it changes daily with gold and silver prices. These values use the current market price in your currency. If your net wealth reaches either nisab and a full Hijri year passes, Zakat (2.5%) is due.',
      'نصاب وہ کم سے کم مال ہے جس پر زکوٰۃ واجب ہوتی ہے، اور یہ سونے چاندی کی قیمت کے ساتھ روزانہ بدلتا ہے۔ یہ قدریں آپ کی کرنسی میں موجودہ بازاری قیمت کے مطابق ہیں۔ اگر آپ کا خالص مال کسی ایک نصاب کو پہنچ جائے اور اس پر پورا ہجری سال گزر جائے تو زکوٰۃ (2.5%) واجب ہوتی ہے۔'),
    nisabGold: pick(lang, 'نصاب الذهب · 85 جم', 'Gold nisab · 85g', 'سونے کا نصاب · 85 گرام'),
    nisabSilver: pick(lang, 'نصاب الفضة · 595 جم', 'Silver nisab · 595g', 'چاندی کا نصاب · 595 گرام'),
    nisabNote: pick(lang,
      'الأحوط لمن أكثر ماله نقد أو مختلط الأخذ بنصاب الفضة لأنه أقل. اضغط على أحد النصابين لاعتماده في الحساب.',
      'For mostly-cash or mixed wealth, the lower silver nisab is the more cautious choice. Tap a nisab to use it in the calculation.',
      'جس کا اکثر مال نقد یا مخلوط ہو، اس کے لیے چاندی کا کم نصاب لینا زیادہ محتاط ہے۔ حساب میں استعمال کے لیے کسی ایک نصاب پر کلک کریں۔'),
    active: pick(lang, 'مُعتمَد', 'in use', 'منتخب'),
    due: pick(lang, 'الزكاة المستحقة (2.5%)', 'Zakat due (2.5%)', 'واجب الادا زکوٰۃ (2.5%)'),
    dueYes: pick(lang, 'مالك بلغ النصاب، وتجب الزكاة إن مرّ عليه حول هجري كامل.', 'Your wealth has reached the nisab — zakat is due if a full lunar year has passed.', 'آپ کا مال نصاب کو پہنچ گیا ہے — اگر اس پر پورا قمری سال گزر چکا ہو تو زکوٰۃ واجب ہے۔'),
    dueNo: pick(lang, 'مالك دون النصاب، فلا تجب الزكاة حالياً.', 'Your wealth is below the nisab, so no zakat is due now.', 'آپ کا مال نصاب سے کم ہے، اس لیے فی الحال زکوٰۃ واجب نہیں۔'),
    short: pick(lang, 'الفارق حتى بلوغ النصاب', 'Amount below nisab', 'نصاب تک پہنچنے کا فرق'),
    reset: pick(lang, 'تفريغ الحقول', 'Reset', 'خانے خالی کریں'), copy: pick(lang, 'نسخ النتيجة', 'Copy result', 'نتیجہ کاپی کریں'), copied: pick(lang, 'تم النسخ ✓', 'Copied ✓', 'کاپی ہو گیا ✓'),
    grams: pick(lang, 'جرام', 'grams', 'گرام'),
    hawl: pick(lang,
      'تذكير: تجب الزكاة في المال إذا بلغ النصاب ومرّ عليه حول (سنة هجرية كاملة) وأنت مالك له. وهذه الحاسبة للاسترشاد فقط؛ ولأي حالة خاصة استشر أهل العلم.',
      'Reminder: zakat is due when wealth reaches the nisab and a full lunar (Hijri) year passes while you own it. This tool is for guidance only — consult a scholar for specific cases.',
      'یاد دہانی: زکوٰۃ اس وقت واجب ہوتی ہے جب مال نصاب کو پہنچے اور آپ کی ملکیت میں اس پر پورا قمری (ہجری) سال گزر جائے۔ یہ حاسبہ صرف رہنمائی کے لیے ہے؛ کسی خاص صورت میں اہلِ علم سے رجوع کریں۔'),
  };

  if (!mounted) return <section style={{ ...cardStyle, minHeight: 360 }} />;

  return (
    <section style={{ display: 'grid', gap: 18 }}>
      {/* Nisab today — prominent, answers "how much is the nisab in <currency>" */}
      <div style={{ ...cardStyle, background: 'var(--gold-soft)', borderColor: 'var(--gold)' }}>
        <h2 style={{ margin: '0 0 4px', fontSize: 18, fontWeight: 800 }}>{t.nisabToday}</h2>
        <p style={{ margin: '0 0 14px', fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.6 }}>{t.nisabDesc}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
          {([['gold', t.nisabGold, goldNisab], ['silver', t.nisabSilver, silverNisab]] as const).map(([b, lbl, val]) => (
            <button key={b} onClick={() => setBasis(b as 'gold' | 'silver')}
              style={{ textAlign: rtl ? 'right' : 'left', padding: '14px 16px', borderRadius: 12, cursor: 'pointer',
                border: '2px solid ' + (basis === b ? 'var(--gold)' : 'var(--border)'),
                background: 'var(--surface)' }}>
              <span style={{ display: 'block', fontSize: 13, color: 'var(--muted)', fontWeight: 600 }}>{lbl}{basis === b ? ` · ${t.active}` : ''}</span>
              <span style={{ display: 'block', fontSize: 'clamp(21px,3.6vw,28px)', fontWeight: 800, color: 'var(--gold-deep)', marginTop: 4 }}>{money(val as number)}</span>
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
              {(() => {
                const MAIN = ['USD', 'EUR', 'GBP', 'SAR', 'AED', 'QAR', 'KWD', 'BHD', 'OMR'];
                const byCode: Record<string, typeof CURRENCIES[number]> = Object.fromEntries(CURRENCIES.map(c => [c.code, c]));
                const main = MAIN.map(code => byCode[code]).filter(Boolean);
                const rest = CURRENCIES.filter(c => !MAIN.includes(c.code)).sort((a, b) => pick(lang, a.ar, a.en, a.ur).localeCompare(pick(lang, b.ar, b.en, b.ur), ll));
                const opt = (c: typeof CURRENCIES[number]) => <option key={c.code} value={c.code}>{pick(lang, c.ar, c.en, c.ur) + ' · ' + c.code}</option>;
                return (<>
                  <optgroup label={pick(lang, 'العملات الرئيسية', 'Main currencies', 'اہم کرنسیاں')}>{main.map(opt)}</optgroup>
                  <optgroup label={pick(lang, 'بقية العملات (أبجدي)', 'Other currencies (A–Z)', 'دیگر کرنسیاں (حروفِ تہجی)')}>{rest.map(opt)}</optgroup>
                </>);
              })()}
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
