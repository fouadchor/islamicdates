// «محوّل التواريخ التاريخية» — a dedicated page for the converter's historical
// range (1 AH / 622 CE onward). Copy lives here; the worked examples are computed
// at build time with the same functions the converter uses, so the table can
// never disagree with the tool above it.
import { type Lang, pick, hMonArr, gMonArr, wdArr } from './data';
import { g2h, fromWestern, toWestern, isJulianEra } from './hijri';

export const historicalPath = (lang: Lang) =>
  pick(lang, '/historical-date-converter/', '/en/historical-date-converter/', '/ur/historical-date-converter/');

/** Where the converter opens on this page: the fall of Constantinople. */
export const HISTORICAL_START = { y: 1453, m: 5, d: 29 };

interface Example { ar: string; en: string; ur: string; y: number; m: number; d: number }

// Western dates as historians give them (Julian before 15 Oct 1582).
const EXAMPLES: Example[] = [
  { ar: 'بداية التقويم الهجري', en: 'Start of the Hijri calendar', ur: 'ہجری تقویم کا آغاز', y: 622, m: 7, d: 16 },
  { ar: 'معركة حطين', en: 'Battle of Hattin', ur: 'جنگِ حطین', y: 1187, m: 7, d: 4 },
  { ar: 'معركة عين جالوت', en: 'Battle of Ain Jalut', ur: 'جنگِ عین جالوت', y: 1260, m: 9, d: 3 },
  { ar: 'فتح القسطنطينية', en: 'Fall of Constantinople', ur: 'فتحِ قسطنطنیہ', y: 1453, m: 5, d: 29 },
  { ar: 'سقوط غرناطة', en: 'Fall of Granada', ur: 'سقوطِ غرناطہ', y: 1492, m: 1, d: 2 },
  { ar: 'معركة الأهرام', en: 'Battle of the Pyramids', ur: 'جنگِ اہرام', y: 1798, m: 7, d: 21 },
  { ar: 'أول يوم في جدول أم القرى', en: 'First day of the Umm al-Qura table', ur: 'اُمّ القریٰ جدول کا پہلا دن', y: 1882, m: 11, d: 12 },
];

export function historicalExamples(lang: Lang) {
  const hMon = hMonArr(lang), gMon = gMonArr(lang), wd = wdArr(lang);
  const ah = pick(lang, 'هـ', 'AH', 'ھ');
  const ce = pick(lang, 'م', 'CE', 'ء');
  const julian = pick(lang, 'يولياني', 'Julian', 'جولین');
  return EXAMPLES.map(e => {
    const date = fromWestern(e.y, e.m, e.d);
    const h = g2h(date);
    const w = toWestern(date);
    return {
      event: pick(lang, e.ar, e.en, e.ur),
      western: `${w.d} ${gMon[w.m - 1]} ${w.y} ${ce}` + (isJulianEra(date) ? ` (${julian})` : ''),
      hijri: `${h.d} ${hMon[h.m - 1]} ${h.y} ${ah}`,
      weekday: wd[date.getUTCDay()],
    };
  });
}

export function historicalT(lang: Lang) {
  return pick(lang, AR, EN, UR);
}

const AR = {
  title: 'محوّل التاريخ الهجري للتواريخ التاريخية: من 1 هـ (622م) حتى اليوم',
  description: 'حوّل أي تاريخ هجري قديم إلى ميلادي أو العكس، من سنة 1 هـ (622م) حتى اليوم: تقويم أم القرى من 1300 هـ، والتقويم الحسابي قبله، والتقويم اليولياني قبل 1582. مجاني وبلا تسجيل.',
  home: 'الرئيسية',
  tagline: 'تقويم أم القرى',
  breadcrumb: 'محوّل التواريخ التاريخية',
  h1: 'محوّل التاريخ الهجري للتواريخ التاريخية',
  intro: 'حوّل أي تاريخ بين التقويم الهجري والميلادي من سنة 1 هـ (622م) حتى اليوم: للتاريخ والمخطوطات والوثائق العثمانية وسجلات العائلات والبحث العلمي. كل نتيجة تذكر التقويم الذي حُسبت به، فيمكنك الاستشهاد بها.',
  howH: 'كيف يحسب المحوّل',
  how: [
    'من 1 محرم 1300 هـ (12 نوفمبر 1882م) فما بعد: تقويم أم القرى، التقويم الرسمي في السعودية، كما تعرضه أنظمة آبل وأندرويد وويندوز.',
    'قبل 1300 هـ: التقويم الهجري الحسابي (الجدولي)، وأول يوم فيه 1 محرم 1 هـ = الجمعة 16 يوليو 622م. هو التقويم المعتمد في المراجع والجداول التاريخية.',
    'قبل 15 أكتوبر 1582: نكتب التاريخ الميلادي بالتقويم اليولياني كما تذكره المصادر التاريخية، ونضع تحته ما يقابله بالتقويم الغريغوري.',
  ],
  dayH: 'لماذا قد يختلف يوماً أو يومين؟',
  day: [
    'كانت الشهور الهجرية تبدأ برؤية الهلال، والرؤية تختلف من بلد لآخر ومن سنة لأخرى. التقويم الحسابي قاعدة ثابتة متفق عليها بين المؤرخين، لكنه لا يعرف ما رُئي فعلاً في يوم بعينه.',
    'بعض المحوّلات تبدأ الحساب من يوم الخميس 15 يوليو 622م (الحساب الفلكي) بدلاً من الجمعة، فتختلف نتائجها عن نتائجنا يوماً واحداً.',
    'إذا ذكر المصدر اسم اليوم من الأسبوع، فقارنه بالنتيجة: اليوم من الأسبوع أدقّ دليل على التاريخ الصحيح.',
  ],
  examplesH: 'أمثلة محسوبة بالمحوّل نفسه',
  colEvent: 'الحدث',
  colWestern: 'التاريخ الميلادي',
  colHijri: 'التاريخ الهجري',
  colWeekday: 'اليوم',
  quickH: 'تقدير سريع بلا محوّل',
  quick: [
    'السنة الهجرية أقصر من الميلادية بنحو 11 يوماً، لذلك:',
    'السنة الميلادية ≈ 622 + السنة الهجرية × 0.97',
    'السنة الهجرية ≈ (السنة الميلادية − 622) × 1.03',
    'مثال: 857 هـ ≈ 622 + 831 = 1453م.',
  ],
  notH: 'ما لا يغطيه المحوّل',
  not: 'لا يحوّل التقويم الرومي (المالي) العثماني ولا التقويم الهجري الشمسي (الإيراني). ولتاريخ قبل الهجرة يخبرك المحوّل أن التاريخ يسبق بداية التقويم الهجري.',
  citeH: 'كيف تستشهد بالنتيجة',
  cite: 'مثال: «حُوِّل التاريخ بالتقويم الهجري الحسابي (حقبة الجمعة) والتقويم اليولياني، islamicdates.org، تاريخ الاطلاع: …». تفاصيل الطريقة في صفحة «من نحن والمنهجية».',
  methodLink: 'صفحة المنهجية',
  todayLink: 'محوّل تاريخ اليوم والتواريخ الحديثة',
};

const EN = {
  title: 'Historical Hijri Date Converter: Hijri ⇄ Gregorian & Julian from 1 AH (622 CE)',
  description: 'Convert historical Hijri dates to Gregorian or Julian and back, from 1 AH (622 CE) to today: Umm al-Qura from 1300 AH, the tabular Islamic calendar before it, Julian dates before 1582. Free, no sign-up.',
  home: 'Home',
  tagline: 'Umm al-Qura calendar',
  breadcrumb: 'Historical date converter',
  h1: 'Historical Hijri date converter',
  intro: 'Convert any date between the Hijri and Western calendars from 1 AH (622 CE) to today — for history, manuscripts, Ottoman documents, family records and research. Each result says which calendar was used, so you can cite it.',
  howH: 'How the converter calculates',
  how: [
    'From 1 Muharram 1300 AH (12 November 1882) onward: the Umm al-Qura calendar, Saudi Arabia’s official calendar, as Apple, Android and Windows show it.',
    'Before 1300 AH: the arithmetical (tabular) Islamic calendar, whose first day, 1 Muharram 1 AH, is Friday 16 July 622 CE. It is the calendar historical references and tables use.',
    'Before 15 October 1582: Christian-era dates are given in the Julian calendar, as historical sources record them, with the Gregorian equivalent underneath.',
  ],
  dayH: 'Why a result can be a day or two off',
  day: [
    'Hijri months began with the sighting of the crescent, which varied by place and by year. The tabular calendar is a fixed convention historians share, but it cannot know what was actually seen on a given evening.',
    'Some converters count from Thursday 15 July 622 (the astronomical epoch) instead of Friday, so their results differ from ours by one day.',
    'If your source names the day of the week, compare it with the result: the weekday is the best evidence for the right date.',
  ],
  examplesH: 'Examples worked out by this converter',
  colEvent: 'Event',
  colWestern: 'Western date',
  colHijri: 'Hijri date',
  colWeekday: 'Weekday',
  quickH: 'A quick estimate without a converter',
  quick: [
    'A Hijri year is about 11 days shorter than a Gregorian one, so:',
    'CE year ≈ 622 + AH year × 0.97',
    'AH year ≈ (CE year − 622) × 1.03',
    'Example: 857 AH ≈ 622 + 831 = 1453 CE.',
  ],
  notH: 'What it does not cover',
  not: 'It does not convert the Ottoman Rumi (fiscal) calendar or the solar Hijri (Iranian) calendar. For a date before the Hijra it tells you the date is earlier than the start of the Hijri calendar.',
  citeH: 'How to cite a result',
  cite: 'For example: “Converted with the tabular Islamic calendar (Friday epoch) and the Julian calendar, islamicdates.org, accessed …”. The method is described on our About & methodology page.',
  methodLink: 'methodology page',
  todayLink: 'Today’s date and modern conversions',
};

const UR = {
  title: 'تاریخی ہجری تاریخ کنورٹر: یکم ہجری (622ء) سے آج تک ہجری ⇄ عیسوی و جولین',
  description: 'قدیم ہجری تاریخ کو عیسوی یا جولین میں اور اس کے برعکس بدلیں، یکم ہجری (622ء) سے آج تک: 1300ھ سے اُمّ القریٰ، اس سے پہلے حسابی ہجری تقویم، اور 1582ء سے پہلے جولین تاریخیں۔ مفت، بغیر رجسٹریشن۔',
  home: 'ہوم',
  tagline: 'اُمّ القریٰ تقویم',
  breadcrumb: 'تاریخی تاریخ کنورٹر',
  h1: 'تاریخی ہجری تاریخ کنورٹر',
  intro: 'یکم ہجری (622ء) سے آج تک کسی بھی تاریخ کو ہجری اور عیسوی تقویم کے درمیان بدلیں — تاریخ، مخطوطات، عثمانی دستاویزات، خاندانی ریکارڈ اور تحقیق کے لیے۔ ہر نتیجہ بتاتا ہے کہ کون سا تقویم استعمال ہوا، تاکہ آپ اس کا حوالہ دے سکیں۔',
  howH: 'کنورٹر کیسے حساب کرتا ہے',
  how: [
    'یکم محرم 1300ھ (12 نومبر 1882ء) سے آگے: اُمّ القریٰ تقویم، سعودی عرب کا سرکاری تقویم، جیسا کہ ایپل، اینڈرائیڈ اور ونڈوز دکھاتے ہیں۔',
    '1300ھ سے پہلے: حسابی (جدولی) ہجری تقویم، جس کا پہلا دن یکم محرم 1ھ = جمعہ 16 جولائی 622ء ہے۔ یہی تاریخی حوالوں اور جدولوں میں رائج ہے۔',
    '15 اکتوبر 1582ء سے پہلے: عیسوی تاریخ جولین تقویم میں لکھی جاتی ہے، جیسا کہ تاریخی مآخذ میں درج ہے، اور نیچے گریگورین مساوی دیا جاتا ہے۔',
  ],
  dayH: 'نتیجے میں ایک دو دن کا فرق کیوں ہو سکتا ہے',
  day: [
    'ہجری مہینے رؤیتِ ہلال سے شروع ہوتے تھے، جو جگہ اور سال کے ساتھ بدلتی تھی۔ حسابی تقویم مؤرخین کا طے شدہ ضابطہ ہے، مگر یہ نہیں جانتا کہ کسی خاص شام کو اصل میں چاند دیکھا گیا یا نہیں۔',
    'بعض کنورٹر جمعہ کے بجائے جمعرات 15 جولائی 622ء (فلکی آغاز) سے گنتی کرتے ہیں، اس لیے ان کے نتیجے میں ہم سے ایک دن کا فرق آتا ہے۔',
    'اگر آپ کے ماخذ میں ہفتے کا دن درج ہے تو اسے نتیجے سے ملائیں: ہفتے کا دن درست تاریخ کا بہترین ثبوت ہے۔',
  ],
  examplesH: 'اسی کنورٹر سے نکالی گئی مثالیں',
  colEvent: 'واقعہ',
  colWestern: 'عیسوی تاریخ',
  colHijri: 'ہجری تاریخ',
  colWeekday: 'دن',
  quickH: 'کنورٹر کے بغیر فوری اندازہ',
  quick: [
    'ہجری سال عیسوی سال سے تقریباً 11 دن چھوٹا ہوتا ہے، اس لیے:',
    'عیسوی سال ≈ 622 + ہجری سال × 0.97',
    'ہجری سال ≈ (عیسوی سال − 622) × 1.03',
    'مثال: 857ھ ≈ 622 + 831 = 1453ء۔',
  ],
  notH: 'جو یہ کنورٹر نہیں کرتا',
  not: 'یہ عثمانی رومی (مالی) تقویم یا شمسی ہجری (ایرانی) تقویم کو نہیں بدلتا۔ ہجرت سے پہلے کی تاریخ پر یہ بتاتا ہے کہ تاریخ ہجری تقویم کے آغاز سے پہلے کی ہے۔',
  citeH: 'نتیجے کا حوالہ کیسے دیں',
  cite: 'مثال: «حسابی ہجری تقویم (جمعہ آغاز) اور جولین تقویم سے تبدیل کیا گیا، islamicdates.org، رسائی کی تاریخ: …»۔ طریقہ ہمارے «ہمارے بارے میں اور طریقۂ کار» صفحے پر درج ہے۔',
  methodLink: 'طریقۂ کار کا صفحہ',
  todayLink: 'آج کی تاریخ اور جدید تبدیلیاں',
};
