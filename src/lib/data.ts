// ---- Language model -------------------------------------------------------
// The site is trilingual: Arabic ('ar', RTL), English ('en', LTR) and Urdu
// ('ur', RTL). Many helper functions historically took a boolean `ar`. To keep
// those call sites working while adding a third language, helpers accept a
// `LangLike` (a Lang OR a boolean) and normalise it via `toLang`.
export type Lang = 'ar' | 'en' | 'ur';
export type LangLike = Lang | boolean;
export const toLang = (x: LangLike): Lang => (x === true ? 'ar' : x === false ? 'en' : x);
export function pick<T>(x: LangLike, ar: T, en: T, ur: T): T {
  const l = toLang(x);
  return l === 'ar' ? ar : l === 'ur' ? ur : en;
}
export const isRTL = (x: LangLike): boolean => toLang(x) !== 'en';

export const H_MON_AR = ['محرم','صفر','ربيع الأول','ربيع الآخر','جمادى الأولى','جمادى الآخرة','رجب','شعبان','رمضان','شوال','ذو القعدة','ذو الحجة'];
export const H_MON_EN = ['Muharram','Safar','Rabiʿ I','Rabiʿ II','Jumada I','Jumada II','Rajab','Shaʿban','Ramadan','Shawwal','Dhuʾl-Qaʿdah','Dhuʾl-Hijjah'];
export const H_MON_UR = ['محرم','صفر','ربیع الاول','ربیع الثانی','جمادی الاول','جمادی الثانی','رجب','شعبان','رمضان','شوال','ذوالقعدہ','ذوالحجہ'];
export const G_MON_AR = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
export const G_MON_EN = ['January','February','March','April','May','June','July','August','September','October','November','December'];
export const G_MON_UR = ['جنوری','فروری','مارچ','اپریل','مئی','جون','جولائی','اگست','ستمبر','اکتوبر','نومبر','دسمبر'];
export const G_SHORT_AR = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
export const G_SHORT_EN = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
export const G_SHORT_UR = ['جنوری','فروری','مارچ','اپریل','مئی','جون','جولائی','اگست','ستمبر','اکتوبر','نومبر','دسمبر'];
export const WD_AR   = ['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
export const WD_EN   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
export const WD_UR   = ['اتوار','پیر','منگل','بدھ','جمعرات','جمعہ','ہفتہ'];
export const WD_HEAD_AR = ['السبت','الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة'];
export const WD_HEAD_EN = ['Sat','Sun','Mon','Tue','Wed','Thu','Fri'];
export const WD_HEAD_UR = ['ہفتہ','اتوار','پیر','منگل','بدھ','جمعرات','جمعہ'];

// Per-language array selectors (reduce churn in the islands/templates).
export const hMonArr   = (l: LangLike) => pick(l, H_MON_AR, H_MON_EN, H_MON_UR);
export const gMonArr   = (l: LangLike) => pick(l, G_MON_AR, G_MON_EN, G_MON_UR);
export const gShortArr = (l: LangLike) => pick(l, G_SHORT_AR, G_SHORT_EN, G_SHORT_UR);
export const wdArr     = (l: LangLike) => pick(l, WD_AR, WD_EN, WD_UR);
export const wdHeadArr = (l: LangLike) => pick(l, WD_HEAD_AR, WD_HEAD_EN, WD_HEAD_UR);
// Era suffix shown after a Hijri / Gregorian year.
export const hijriEra = (l: LangLike) => pick(l, 'هـ', 'AH', 'ھ');
export const gregEra  = (l: LangLike) => pick(l, 'م', 'CE', 'ء');

export const MONTHS_NOTES_AR = [
  'من الأشهر الحُرم الأربعة، وبه يبدأ العام الهجري، وفيه يوم عاشوراء العاشر منه',
  'الشهر الثاني من العام الهجري، سُمِّي بالصَّفَر لخلوِّ البيوت من أهلها إبّان السفر والغزو',
  'فيه وُلد النبي محمد ﷺ وتُوُفِّي، ويُحيي كثير من المسلمين ذكرى المولد النبوي الشريف',
  'الشهر الرابع من العام الهجري، ويُعرف أيضاً بربيع الثاني',
  'الخامس من أشهر العام الهجري، سُمِّي لتزامنه مع جمود الماء من شدة البرد',
  'السادس من أشهر العام الهجري، ويُعرف أيضاً بجمادى الثانية',
  'من الأشهر الحُرم الأربعة، وفيه الإسراء والمعراج في السابع والعشرين منه',
  'كان النبي ﷺ يُكثر فيه الصيام تطوعاً، وتُحيا فيه ليلة النصف المباركة',
  'شهر الصيام الفريضة، نزل فيه القرآن الكريم، وفيه ليلة القدر خيرٌ من ألف شهر',
  'يبدأ بعيد الفطر المبارك، وصيام ستة أيام منه سنةٌ مستحبة',
  'من الأشهر الحُرم الأربعة، وفيه يبدأ الحجاج التوجهَ إلى الأراضي المقدسة',
  'من الأشهر الحُرم، وفيه موسم الحج وعيد الأضحى، وأوائله العشرة أفضل أيام العام',
];

export const MONTHS_NOTES_EN = [
  'One of the four sacred months; opens the Hijri year — the 10th is the day of Ashura',
  'The second month; its name reflects the old custom of Arabs leaving their homes empty to travel or wage war',
  'The Prophet Muhammad ﷺ was born and passed away in this month; many Muslims mark the Mawlid occasion',
  'The fourth month of the Hijri year, also known as Rabiʿ al-Thani',
  'The fifth month; its name stems from water freezing in winter when the calendar was first named',
  'The sixth month of the Hijri year, also known as Jumada al-Thani',
  'One of the four sacred months; the 27th is observed as the night of Israʿ & Miʿraj',
  'The Prophet ﷺ fasted abundantly in it; the 15th night is widely commemorated as Laylat al-Bara\'ah',
  'The month of obligatory fasting; the Quran was revealed in it, and Laylat al-Qadr — better than a thousand months — falls within it',
  'Opens with Eid al-Fitr; fasting six of its days is a recommended Sunnah',
  'One of the four sacred months; pilgrims begin making their way toward the Holy Land',
  'A sacred month; home to Hajj, Eid al-Adha, and the first ten days are considered the most blessed of the year',
];

export const MONTHS_NOTES_UR = [
  'حرمت والے چار مہینوں میں سے ایک، اسی سے ہجری سال کا آغاز ہوتا ہے، اور اس کی دسویں تاریخ کو یومِ عاشورہ ہے',
  'ہجری سال کا دوسرا مہینہ، اسے صفر اس لیے کہا گیا کہ سفر اور جنگ کے زمانے میں گھر خالی ہو جاتے تھے',
  'اسی مہینے میں نبی کریم ﷺ کی ولادت اور وفات ہوئی، اور بہت سے مسلمان میلاد النبی مناتے ہیں',
  'ہجری سال کا چوتھا مہینہ، اسے ربیع الثانی بھی کہا جاتا ہے',
  'سال کا پانچواں مہینہ، اس کا نام شدید سردی میں پانی جم جانے کی مناسبت سے رکھا گیا',
  'ہجری سال کا چھٹا مہینہ، اسے جمادی الثانی بھی کہا جاتا ہے',
  'حرمت والے چار مہینوں میں سے ایک، اور اس کی ستائیسویں شب اسراء و معراج کی ہے',
  'نبی کریم ﷺ اس میں کثرت سے نفلی روزے رکھتے تھے، اور اس کی پندرہویں شب کو شبِ برات کہا جاتا ہے',
  'فرض روزوں کا مہینہ، اسی میں قرآن نازل ہوا، اور اسی میں شبِ قدر ہے جو ہزار مہینوں سے بہتر ہے',
  'اس کا آغاز عید الفطر سے ہوتا ہے، اور اس کے چھ روزے رکھنا مستحب سنت ہے',
  'حرمت والے چار مہینوں میں سے ایک، اور اسی میں حُجّاج حرمین کی طرف روانگی شروع کرتے ہیں',
  'حرمت والے مہینوں میں سے، اسی میں حج اور عید الاضحیٰ ہے، اور اس کے پہلے دس دن سال کے افضل ترین دن ہیں',
];

export const COUNTRIES = [
  { v: 'sa', ar: 'السعودية',        en: 'Saudi Arabia',         ur: 'سعودی عرب',        umm: true  },
  { v: 'ae', ar: 'الإمارات',        en: 'United Arab Emirates', ur: 'متحدہ عرب امارات', umm: true  },
  { v: 'qa', ar: 'قطر',             en: 'Qatar',                ur: 'قطر',              umm: true  },
  { v: 'jo', ar: 'الأردن / فلسطين', en: 'Jordan / Palestine',   ur: 'اردن / فلسطین',    umm: false },
  { v: 'sy', ar: 'سوريا',           en: 'Syria',                ur: 'شام',              umm: false },
];

export const MAJOR_OCC_KEYS = [[9,1],[9,27],[10,1],[12,9],[12,10],[1,1],[1,10],[3,12],[7,27],[8,15]] as const;

export function getL(langLike: LangLike) {
  const lang = toLang(langLike);
  const p = <T>(ar: T, en: T, ur: T): T => pick(lang, ar, en, ur);
  return {
    lang,
    brand:        p('التقويم الهجري', 'Hijri Calendar', 'ہجری کیلنڈر'),
    tagline:      p('التقويم الهجري والميلادي', 'Islamic & Gregorian Calendar', 'ہجری اور عیسوی کیلنڈر'),
    langBtn:      p('EN', 'ع', 'اردو'),
    langHref:     p('/en/', '/', '/'),
    today:        p('تاريخ اليوم', "Today's Date", 'آج کی تاریخ'),
    countryLabel: p('الدولة', 'Region', 'ملک'),
    copy:         p('انسخ تاريخ اليوم', "Copy today's date", 'آج کی تاریخ کاپی کریں'),
    copied:       p('تم النسخ ✓', 'Copied ✓', 'کاپی ہو گیا ✓'),
    shareWa:      p('شارك عبر واتساب', 'Share on WhatsApp', 'واٹس ایپ پر شیئر کریں'),
    goToday:      p('اليوم', 'Today', 'آج'),
    converter:    p('محوّل التاريخ السريع', 'Quick Date Converter', 'فوری تاریخ کنورٹر'),
    g2h:          p('ميلادي ← هجري', 'Gregorian → Hijri', 'عیسوی ← ہجری'),
    h2g:          p('هجري ← ميلادي', 'Hijri → Gregorian', 'ہجری ← عیسوی'),
    gregInput:    p('اختر تاريخاً ميلادياً', 'Pick a Gregorian date', 'عیسوی تاریخ منتخب کریں'),
    result:       p('النتيجة', 'Result', 'نتیجہ'),
    day:          p('اليوم', 'Day', 'دن'),
    month:        p('الشهر', 'Month', 'مہینہ'),
    year:         p('السنة', 'Year', 'سال'),
    upcomingTitle:p('المناسبات الإسلامية القادمة', 'Upcoming Islamic occasions', 'آنے والی اسلامی مناسبتیں'),
    occasionsTitle:p('مناسبات هذا الشهر', 'Occasions this month', 'اس مہینے کی مناسبتیں'),
    none:         p('لا توجد مناسبات هذا الشهر', 'No occasions this month', 'اس مہینے کوئی مناسبت نہیں'),
    legend:       p('دليل الألوان', 'Legend', 'رنگوں کی وضاحت'),
    legendToday:  p('اليوم', 'Today', 'آج'),
    legendEid:    p('عيد', 'Eid', 'عید'),
    legendHoly:   p('مناسبة دينية', 'Religious day', 'دینی مناسبت'),
    legendRam:    p('أيام رمضان', 'Ramadan days', 'رمضان کے دن'),
    selectedDay:  p('اليوم المختار', 'Selected day', 'منتخب دن'),
    footer:       p('الحساب وفق تقويم أم القرى', 'Dates based on the Umm al-Qura calendar · for reference', 'حساب اُمّ القریٰ تقویم کے مطابق'),
    aboutTitle:   p('عن التقويم الهجري', 'About the Hijri Calendar', 'ہجری تقویم کے بارے میں'),
    aboutBody:    p(
      'موقع التقويم الهجري يعرض التاريخ الهجري اليوم بجانب التاريخ الميلادي للمقارنة، ويتيح تصفّح الأشهر الهجرية شهراً بشهر، وتحويل التواريخ بين الهجري والميلادي بسهولة، مع إبراز المناسبات الإسلامية مثل رمضان وعيد الفطر وعيد الأضحى وعاشوراء، وكل ذلك وفق تقويم أم القرى.',
      'This Hijri calendar shows today\'s Islamic date next to the Gregorian date for easy comparison, lets you browse the Hijri months one by one, convert dates between Hijri and Gregorian, and highlights Islamic occasions such as Ramadan, Eid al-Fitr, Eid al-Adha and Ashura — all based on the Umm al-Qura calendar.',
      'یہ ہجری تقویم سائٹ آج کی اسلامی تاریخ کو عیسوی تاریخ کے ساتھ موازنے کے لیے دکھاتی ہے، ہجری مہینوں کو ایک ایک کر کے دیکھنے اور ہجری و عیسوی کے درمیان تاریخ تبدیل کرنے کی سہولت دیتی ہے، اور رمضان، عید الفطر، عید الاضحیٰ اور عاشورہ جیسی اسلامی مناسبتوں کو نمایاں کرتی ہے — یہ سب اُمّ القریٰ تقویم کے مطابق ہے۔'),
    faqTitle:     p('أسئلة شائعة', 'Frequently Asked Questions', 'اکثر پوچھے جانے والے سوالات'),
    whatIsTitle:  p('ما هو التقويم الهجري؟', 'What is the Hijri calendar?', 'ہجری تقویم کیا ہے؟'),
    whatIsBody:   p(
      'التقويم الهجري تقويم قمري يعتمد على دورة القمر، وتتكوّن السنة فيه من اثني عشر شهراً قمرياً بطول 354 أو 355 يوماً تقريباً، أي أقصر من السنة الميلادية بنحو 11 يوماً. ويبدأ التأريخ به من هجرة النبي محمد ﷺ من مكة إلى المدينة سنة 622 ميلادية.',
      'The Hijri calendar is a lunar calendar based on the moon\'s cycle. Its year has twelve lunar months totaling about 354–355 days — roughly 11 days shorter than the Gregorian year. It counts from the migration (Hijra) of Prophet Muhammad from Mecca to Medina in 622 CE.',
      'ہجری تقویم ایک قمری تقویم ہے جو چاند کی گردش پر مبنی ہے۔ اس کا سال بارہ قمری مہینوں پر مشتمل ہوتا ہے جو تقریباً 354 یا 355 دن کا ہوتا ہے، یعنی عیسوی سال سے تقریباً 11 دن چھوٹا۔ اس کا آغاز نبی کریم ﷺ کی مکہ سے مدینہ ہجرت (622 عیسوی) سے ہوتا ہے۔'),
    diffTitle:    p('ما الفرق بين تقويم أم القرى والتقويم الهجري؟', 'Umm al-Qura vs. the Hijri calendar', 'اُمّ القریٰ اور ہجری تقویم میں کیا فرق ہے؟'),
    diffBody:     p(
      'تقويم أم القرى هو التقويم الرسمي المعتمد في المملكة العربية السعودية، ويُحسب فلكياً مسبقاً لتنظيم الأمور المدنية. أما بدايات الأشهر الدينية مثل رمضان وشوال وذي الحجة فقد تعتمد في بعض الدول على رؤية الهلال المباشرة، ما قد يؤدي إلى فرق يوم واحد بين الدول.',
      'Umm al-Qura is the official calendar of Saudi Arabia, calculated astronomically in advance for civil use. The start of religious months such as Ramadan, Shawwal and Dhuʾl-Hijjah may instead rely on direct moon sighting in some countries, which can cause a one-day difference between regions.',
      'اُمّ القریٰ سعودی عرب کا سرکاری تقویم ہے جو شہری معاملات کی تنظیم کے لیے پیشگی فلکی حساب سے تیار کیا جاتا ہے۔ جبکہ رمضان، شوال اور ذوالحجہ جیسے دینی مہینوں کا آغاز بعض ممالک میں براہِ راست رؤیتِ ہلال پر منحصر ہوتا ہے، جس کی وجہ سے مختلف ممالک کے درمیان ایک دن کا فرق آ سکتا ہے۔'),
    howTitle:     p('كيف يُحسب التاريخ الهجري؟', 'How is the Hijri date calculated?', 'ہجری تاریخ کا حساب کیسے ہوتا ہے؟'),
    howBody:      p(
      'يبدأ الشهر القمري بعد اقتران القمر (المحاق)، ويتراوح طوله بين 29 و30 يوماً. يحسب هذا الموقع التواريخ فلكياً وفق معايير تقويم أم القرى لعرضها ومقارنتها بالتقويم الميلادي، وتبقى النتائج تقريبية لأغراض العرض والمقارنة.',
      'A lunar month begins after the new moon (conjunction) and lasts 29 or 30 days. This site computes dates astronomically following the Umm al-Qura standard to display and compare them with the Gregorian calendar; results are approximate, for reference.',
      'قمری مہینہ اجتماعِ قمر (نئے چاند) کے بعد شروع ہوتا ہے اور اس کا دورانیہ 29 یا 30 دن ہوتا ہے۔ یہ سائٹ تاریخوں کا حساب اُمّ القریٰ معیار کے مطابق فلکی طور پر کرتی ہے تاکہ انہیں عیسوی تقویم کے ساتھ دکھایا اور موازنہ کیا جا سکے؛ نتائج بطورِ حوالہ تقریبی ہیں۔'),
    monthsTitle:  p('الأشهر الهجرية بالترتيب', 'The Hijri months in order', 'ہجری مہینے ترتیب سے'),
    faqItems: lang === 'ar' ? [
      { q: 'ما هو التاريخ الهجري اليوم؟',           a: 'يعرض الموقع التاريخ الهجري لليوم تلقائياً في الأعلى بجانب التاريخ الميلادي وفق تقويم أم القرى.' },
      { q: 'كيف أحوّل التاريخ من هجري إلى ميلادي؟', a: 'استخدم محوّل التاريخ السريع: اختر التاريخ الهجري أو الميلادي وسيظهر التاريخ المقابل له فوراً.' },
      { q: 'ما هي الأشهر الهجرية الاثنا عشر؟',      a: 'محرم، صفر، ربيع الأول، ربيع الآخر، جمادى الأولى، جمادى الآخرة، رجب، شعبان، رمضان، شوال، ذو القعدة، ذو الحجة.' },
    ] : lang === 'ur' ? [
      { q: 'آج ہجری تاریخ کیا ہے؟',                 a: 'سائٹ آج کی ہجری (اسلامی) تاریخ خودکار طور پر اوپر عیسوی تاریخ کے ساتھ اُمّ القریٰ تقویم کے مطابق دکھاتی ہے۔' },
      { q: 'میں ہجری سے عیسوی تاریخ کیسے تبدیل کروں؟', a: 'فوری تاریخ کنورٹر استعمال کریں: ہجری یا عیسوی تاریخ منتخب کریں اور اس کے مقابل کی تاریخ فوراً ظاہر ہو جائے گی۔' },
      { q: 'بارہ ہجری مہینے کون سے ہیں؟',           a: 'محرم، صفر، ربیع الاول، ربیع الثانی، جمادی الاول، جمادی الثانی، رجب، شعبان، رمضان، شوال، ذوالقعدہ اور ذوالحجہ۔' },
    ] : [
      { q: 'What is today\'s Hijri date?',             a: 'The site automatically shows today\'s Islamic (Hijri) date at the top, next to the Gregorian date, based on the Umm al-Qura calendar.' },
      { q: 'How do I convert a date from Hijri to Gregorian?', a: 'Use the Quick Date Converter: pick either a Hijri or a Gregorian date and the matching date appears instantly.' },
      { q: 'What are the twelve Hijri months?',        a: 'Muharram, Safar, Rabiʿ I, Rabiʿ II, Jumada I, Jumada II, Rajab, Shaʿban, Ramadan, Shawwal, Dhuʾl-Qaʿdah and Dhuʾl-Hijjah.' },
    ],
    // Homepage FAQ. Deliberately distinct from `faqItems` (which /about/ renders): duplicating
    // the same Q&A pairs across two indexed pages would put identical FAQPage markup on both.
    // Answers stay evergreen — no hard-coded dates or counts — so the static text never goes stale.
    homeFaqTitle: p('أسئلة شائعة عن التاريخ الهجري', 'Common questions about the Hijri date', 'ہجری تاریخ کے بارے میں عام سوالات'),
    homeFaqItems: lang === 'ar' ? [
      { q: 'لماذا يختلف التاريخ الهجري بين الدول بيوم واحد؟', a: 'التواريخ هنا محسوبة فلكياً وفق تقويم أم القرى المعتمد في السعودية. وتعتمد دول أخرى على رؤية الهلال المباشرة ليلة التاسع والعشرين، فإذا حال الغيم أو الصفاء دون الرؤية اختلف بدء الشهر بمقدار يوم واحد تقريباً.' },
      { q: 'هل يمكنني معرفة كم باقٍ على رمضان أو العيد؟', a: 'نعم، يعرض قسم «المناسبات الإسلامية القادمة» في هذه الصفحة عدّاً تنازلياً بالأيام لكل مناسبة، مع تاريخها بالهجري والميلادي معاً.' },
      { q: 'كيف أحسب عمري بالتقويم الهجري؟', a: 'استخدم «حاسبة العمر بالهجري» ضمن المحوّل: أدخل تاريخ ميلادك ميلادياً أو هجرياً، فتظهر لك عمرك بالسنوات الهجرية ويوم مولدك.' },
      { q: 'هل مواقيت الصلاة المعروضة دقيقة لمدينتي؟', a: 'المواقيت محسوبة فلكياً حسب إحداثيات كل مدينة. وقد تفرق دقائق يسيرة عن التقويم المحلي لاختلاف زاوية الفجر والعشاء المعتمدة لدى الجهة الرسمية في بلدك.' },
    ] : lang === 'ur' ? [
      { q: 'ہجری تاریخ مختلف ممالک میں ایک دن آگے پیچھے کیوں ہوتی ہے؟', a: 'یہاں تاریخوں کا حساب سعودی عرب میں رائج اُمّ القریٰ تقویم کے مطابق فلکی طور پر کیا جاتا ہے۔ دیگر ممالک انتیسویں شب براہِ راست رؤیتِ ہلال پر انحصار کرتے ہیں، اس لیے مہینے کا آغاز تقریباً ایک دن مختلف ہو سکتا ہے۔' },
      { q: 'کیا میں دیکھ سکتا ہوں کہ رمضان یا عید میں کتنے دن باقی ہیں؟', a: 'جی ہاں، اسی صفحے پر «آنے والی اسلامی مناسبتیں» کے حصے میں ہر مناسبت کے لیے دنوں کی گنتی ہجری اور عیسوی دونوں تاریخوں کے ساتھ دی گئی ہے۔' },
      { q: 'میں اپنی عمر ہجری تقویم میں کیسے معلوم کروں؟', a: 'کنورٹر میں موجود «ہجری عمر کیلکولیٹر» استعمال کریں: اپنی تاریخِ پیدائش عیسوی یا ہجری میں درج کریں، آپ کی عمر ہجری سالوں میں اور یومِ پیدائش ظاہر ہو جائے گا۔' },
      { q: 'کیا دکھائے گئے نمازوں کے اوقات میرے شہر کے لیے درست ہیں؟', a: 'اوقات ہر شہر کے جغرافیائی محلِ وقوع کے مطابق فلکی طور پر نکالے جاتے ہیں۔ فجر اور عشاء کے زاویے کے فرق کی وجہ سے مقامی تقویم سے چند منٹ کا فرق ہو سکتا ہے۔' },
    ] : [
      { q: 'Why does the Hijri date differ by a day between countries?', a: 'Dates here are calculated astronomically using the Umm al-Qura calendar used in Saudi Arabia. Other countries rely on a direct sighting of the crescent on the 29th evening, so if the moon is not sighted the month can begin about one day later.' },
      { q: 'Can I see how many days are left until Ramadan or Eid?', a: 'Yes — the "Upcoming Islamic occasions" section on this page shows a day-by-day countdown for each occasion, with both its Hijri and Gregorian date.' },
      { q: 'How do I work out my age in the Hijri calendar?', a: 'Use the Hijri age calculator inside the converter: enter your date of birth in either calendar and it returns your age in Hijri years along with the weekday you were born on.' },
      { q: 'Are the prayer times shown accurate for my city?', a: 'Times are computed astronomically from each city\'s coordinates. They can differ by a few minutes from your local timetable, because authorities vary in the Fajr and Isha twilight angles they adopt.' },
    ],
  };
}
