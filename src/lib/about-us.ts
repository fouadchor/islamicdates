// ─────────────────────────────────────────────────────────────────────────────
// «من نحن والمنهجية» — who runs the site, how every number on it is produced,
// where the religious text comes from, and how mistakes get fixed.
//
// Google weighs religious and prayer-time content heavily on who stands behind
// it; until this page the site said nothing about that. Every methodology claim
// here is checked against the code that produces the number:
//   calendar   → lib/hijri.ts (Intl islamic-umalqura)
//   prayer     → lib/prayer.ts (PrayTimes.org algorithm, METHODS table) and
//                lib/cities.ts (default method per country); NightMiddle for
//                high latitudes; Asr Standard/Hanafi selectable
//   qibla      → lib/qibla.ts (Kaaba 21.4225 N 39.8262 E, great circle, haversine)
//   zakat      → components/ZakatIsland.tsx (85 g gold / 595 g silver, 2.5 %)
//   duas       → lib/duas.ts (Quran + Sahih collections, source on every duʿāʾ)
//   khatma     → lib/khatma-i18n.ts (no dedication field, recitation by tongue)
// If one of those changes, this page must change with it.
// ─────────────────────────────────────────────────────────────────────────────
import type { Lang } from './data';

export const ABOUT_UPDATED = '2026-10-08';
export const CONTACT_EMAIL = 'contact@islamicdates.org';
export const COMPANY = { name: 'ICTSPS L.L.C', longName: 'ICT Solutions & Professional Services', url: 'https://ictsps.com/' };

export const FATWA_LINKS = {
  daralifta: 'https://www.dar-alifta.org/ar/fatwaresearch/details/77/%D8%AD%D9%83%D9%85-%D8%AE%D8%AA%D9%85-%D8%A7%D9%84%D9%82%D8%B1%D8%A2%D9%86-%D8%AC%D9%85%D8%A7%D8%B9%D8%A9',
  islamweb: 'https://www.islamweb.net/ar/fatwa/442006/',
};

export const aboutUsPath = (lang: Lang) => (lang === 'ar' ? '/about-us/' : `/${lang}/about-us/`);

export interface Person { name: string; role: string; bio: string }
export interface AboutT {
  title: string; description: string; h1: string; intro: string;
  breadcrumbHome: string; breadcrumb: string; tagline: string; home: string;
  tocH: string;
  whoH: string; whoIntro: string; people: Person[]; mission: string;
  companyH: string; company: string; companyLink: string;
  calH: string; cal: string[];
  prayH: string; pray: string[]; prayTableCaption: string;
  prayCols: [string, string, string, string]; minutesAfterMaghrib: (m: string) => string; andOthers: string;
  qiblaH: string; qibla: string[];
  zakatH: string; zakat: string[];
  duaH: string; dua: string[];
  khatmaH: string; khatma: string[]; fatwaDarAlifta: string; fatwaIslamweb: string;
  fixH: string; fix: string[];
  privH: string; priv: string[]; privLink: string;
  contactH: string; contact: string; contactForm: string; emailLabel: string;
  updated: string;
  related: { href: string; label: string }[]; relatedH: string;
}

// ── Arabic ───────────────────────────────────────────────────────────────────
const AR: AboutT = {
  title: 'من نحن والمنهجية · كيف نحسب التاريخ الهجري ومواقيت الصلاة',
  description: 'تعرّف على فريق موقع التقويم الهجري، وكيف نحسب التاريخ وفق أم القرى ومواقيت الصلاة والقبلة والزكاة، ومن أين نأخذ الأدعية، وكيف نصحّح الأخطاء.',
  h1: 'من نحن والمنهجية',
  intro: 'هذه الصفحة تعرّف بفريق الموقع، وتشرح كيف يُحسب كل رقم تراه فيه، ومن أين يأتي النص الديني، وماذا نفعل حين يقع خطأ.',
  breadcrumbHome: 'الرئيسية', breadcrumb: 'من نحن والمنهجية', tagline: 'من نحن والمنهجية', home: 'الرئيسية',
  tocH: 'في هذه الصفحة',

  whoH: 'فريق الموقع',
  whoIntro: 'يعمل على الموقع:',
  people: [
    {
      name: 'سلمى محمود',
      role: 'مؤسِّسة الموقع',
      bio: 'متخصصة في تكامل الأنظمة والحلول الرقمية، بخبرة تزيد على عشر سنوات في تطبيقات الهاتف والتجارة الإلكترونية والتحوّل الرقمي، وخلفية في هندسة تقنية المعلومات بتركيز على الذكاء الاصطناعي. مقيمة في الدوحة.',
    },
    {
      name: 'د. محمد بسام',
      role: 'خبير في إدارة الأعمال، حاصل على الدكتوراه',
      bio: 'يتولّى التخطيط الاستراتيجي للموقع وأولويات تطويره بناءً على ملاحظات الزوار وبيانات الاستخدام، وبناء الشراكات مع المساجد والمراكز والمواقع الإسلامية.',
    },
    {
      name: 'سمير عبد الغني',
      role: 'مصمم تجربة وواجهة المستخدم (UX/UI)',
      bio: 'صمّم واجهة الموقع وتجربة استخدامه على الهاتف والحاسوب، بالعربية والإنجليزية والأردية.',
    },
  ],
  companyH: 'الشركة',
  company: 'التقويم الهجري أحد مشاريع شركة \u2066ICTSPS L.L.C (ICT Solutions & Professional Services)\u2069، المتخصصة في حلول تقنية المعلومات والتحوّل الرقمي، وتطوير البرمجيات وتطبيقات الهاتف والمواقع، وتحليلات الأعمال والاستشارات، ولها مكاتب في الولايات المتحدة وتركيا.',
  companyLink: 'موقع الشركة',
  mission: 'قامت سلمى ببناء هذا الموقع ليكون مرجعاً دقيقاً ومجانياً للتقويم الهجري ومواقيت الصلاة والمناسبات الإسلامية، بالعربية والإنجليزية والأردية، بلا حسابات ولا تسجيل. كل أداة فيه تشرح طريقة حسابها أدناه، حتى يعرف القارئ لماذا قد يختلف رقم عندنا عمّا يراه في مكان آخر.',

  calH: 'التاريخ الهجري',
  cal: [
    'نعتمد تقويم أم القرى، وهو التقويم الرسمي في المملكة العربية السعودية، ويُحسب فلكياً مسبقاً. نستخدم تطبيقه المعياري المضمَّن في المتصفحات وأنظمة التشغيل (معيار Unicode CLDR، تقويم islamic-umalqura)، فالتاريخ الذي تراه عندنا هو نفسه الذي تعرضه هواتف آبل وأندرويد وأنظمة ويندوز.',
    'تعتمد دول كثيرة — منها باكستان ومصر والمغرب — على رؤية الهلال بالعين، فقد يتقدّم بداية الشهر عندها أو يتأخّر يوماً عن أم القرى. لذلك تعرض صفحات المناسبات التاريخ المتوقَّع في كل دولة مع التنبيه إلى ذلك، والمرجع في الصيام والعيد هو ما تعلنه الجهة الرسمية في بلدك.',
  ],

  prayH: 'مواقيت الصلاة',
  pray: [
    'تُحسب المواقيت فلكياً من موقع الشمس لكل يوم ومدينة، بخوارزمية مأخوذة عن مشروع PrayTimes.org (حامد زرابي‌زاده) وفق شروط استخدامه الحر، بعد نقلها إلى TypeScript.',
    'يختلف الفجر والعشاء باختلاف زاوية انخفاض الشمس التي تعتمدها كل هيئة، ولكل دولة طريقتها الافتراضية في الموقع (الجدول أدناه). العصر محسوب افتراضياً على قول الجمهور (ظلّ الشيء مثله)، ويمكن اختيار المذهب الحنفي (مثلاه) من الإعدادات. وفي خطوط العرض العالية يُضبط الفجر والعشاء بطريقة منتصف الليل.',
    'هذه مواقيت محسوبة، وقد تختلف بدقائق عن تقويم مسجدك أو الجهة الرسمية في بلدك بسبب الاحتياط أو التقريب. عند الاختلاف، فالعبرة بإعلان مسجدك المحلي.',
  ],
  prayTableCaption: 'طرق الحساب المستخدمة والدول التي تعتمدها افتراضياً في الموقع',
  prayCols: ['الطريقة', 'الفجر', 'العشاء', 'الدول'],
  minutesAfterMaghrib: (m) => `${m} دقيقة بعد المغرب`,
  andOthers: 'وغيرها',

  qiblaH: 'اتجاه القبلة',
  qibla: [
    'نحسب الاتجاه على الدائرة العظمى من موقعك إلى الكعبة المشرّفة (‎21.4225° شمالاً، ‎39.8262° شرقاً)، بالدرجات من الشمال الجغرافي، والمسافة بصيغة هافرساين.',
    'دقة البوصلة على الهاتف تتأثر بالمعادن والمغناطيس القريب؛ إن بدا الاتجاه غريباً فحرّك الهاتف على شكل الرقم ٨ لمعايرتها.',
  ],

  zakatH: 'حاسبة الزكاة',
  zakat: [
    'النصاب ٨٥ غراماً من الذهب أو ٥٩٥ غراماً من الفضة، والمقدار الواجب ربع العشر (٢٫٥٪) إذا بلغ المال النصاب وحال عليه الحول.',
    'نجلب أسعار الذهب والفضة وسعر الصرف تلقائياً، ويمكنك تعديلها يدوياً. الحاسبة أداة مساعدة للحالات الشائعة؛ وفي الأموال المعقّدة كالشركات والديون والعقار فاسأل أهل العلم.',
  ],

  duaH: 'الأدعية والأذكار',
  dua: [
    'نأخذ الأدعية من القرآن الكريم ومن السنّة الصحيحة — صحيح البخاري وصحيح مسلم وكتب السنن كالترمذي — على طريقة «حصن المسلم».',
    'يظهر تحت كل دعاء مصدره: السورة والآية، أو كتاب الحديث الذي رواه. لا ندرج عن علم ما ضعّفه أهل الحديث، وإن وجدت دعاءً مصدره غير دقيق فأخبرنا وسنراجعه.',
  ],

  khatmaH: 'الختمة الجماعية',
  khatma: [
    'الختمة قراءة جماعية للأجزاء الثلاثين: يأخذ كل مشارك جزءاً ويقرأه بلسانه ثم يؤكّد إتمامه. العدّاد يقول «كذا جزءاً مكتملاً» ولا يقول لأحد «ختمتَ القرآن»، والاسم اختياري ولا لوحة للمنافسة.',
    'ليس في الختمة حقل لاسم متوفّى ولا إهداء ثواب، لأن وصول ثواب التلاوة إلى الميت محلّ خلاف بين المذاهب، أمّا الدعاء له فمتفق عليه. اعتمدنا في ضوابطها على فتويين:',
  ],
  fatwaDarAlifta: 'دار الإفتاء المصرية — حكم ختم القرآن جماعة',
  fatwaIslamweb: 'إسلام ويب — الفتوى ٤٤٢٠٠٦',

  fixH: 'الأخطاء والتصحيح',
  fix: [
    'إن وجدت تاريخاً أو وقتاً أو نصاً غير صحيح، فأرسل لنا رابط الصفحة ووصف الخطأ عبر نموذج التواصل أو البريد أدناه. نراجع كل بلاغ، ونصحّح الصفحة، ونحدّث تاريخ «آخر مراجعة» فيها.',
  ],

  privH: 'الخصوصية',
  priv: [
    'لا يطلب الموقع حساباً ولا بريداً ولا رقم هاتف لأي أداة. الختمة تتعرّف عليك برمز عشوائي يبقى في متصفحك وحده.',
    'نستخدم Google Analytics لقياس الزيارات، ونعرض إعلانات Google AdSense لتغطية تكاليف الموقع.',
  ],
  privLink: 'سياسة الخصوصية كاملة',

  contactH: 'التواصل',
  contact: 'لأي اقتراح أو تصحيح أو سؤال:',
  contactForm: 'نموذج التواصل',
  emailLabel: 'البريد',

  updated: 'آخر مراجعة لهذه الصفحة: ٨ أكتوبر ٢٠٢٦',
  relatedH: 'صفحات ذات صلة',
  related: [
    { href: '/about/', label: 'ما هو التقويم الهجري؟' },
    { href: '/prayer-times/', label: 'مواقيت الصلاة' },
    { href: '/qibla/', label: 'اتجاه القبلة' },
    { href: '/zakat/', label: 'حاسبة الزكاة' },
    { href: '/dua/', label: 'الأدعية والأذكار' },
    { href: '/khatma/', label: 'ختمة قرآن جماعية' },
  ],
};

// ── English ──────────────────────────────────────────────────────────────────
const EN: AboutT = {
  title: 'About Us & Methodology · How We Calculate Hijri Dates and Prayer Times',
  description: 'Meet the islamicdates.org team, and see how we calculate Umm al-Qura dates, prayer times, qibla and zakat, where our supplications come from, and how we correct mistakes.',
  h1: 'About us & methodology',
  intro: 'This page introduces our team and explains how every number on the site is produced, where the religious text comes from, and what we do when something is wrong.',
  breadcrumbHome: 'Home', breadcrumb: 'About us & methodology', tagline: 'About us & methodology', home: 'Home',
  tocH: 'On this page',

  whoH: 'Our team',
  whoIntro: 'The people who work on the site:',
  people: [
    {
      name: 'Salma Mahmoud',
      role: 'Founder',
      bio: 'A systems integration and digital solutions specialist with more than ten years in mobile apps, e-commerce and digital transformation, and a background in IT engineering with a focus on AI. Based in Doha.',
    },
    {
      name: 'Dr. Mohammad Bassam',
      role: 'Business administration expert, PhD',
      bio: 'Leads the site\'s strategy and development priorities, guided by visitor feedback and usage data, and builds partnerships with mosques, Islamic centres and websites.',
    },
    {
      name: 'Samir Abdelghani',
      role: 'UX/UI designer',
      bio: 'Designed the site\'s interface and user experience across phone and desktop, in Arabic, English and Urdu.',
    },
  ],
  companyH: 'The company',
  company: 'Hijri Calendar is a project of ICTSPS L.L.C (ICT Solutions & Professional Services), a company specialising in IT solutions and digital transformation, software, mobile app and website development, and business analytics and consulting, with offices in the United States and Turkey.',
  companyLink: 'Company website',
  mission: 'Salma built this site to be an accurate, free reference for the Hijri calendar, prayer times and Islamic occasions — in Arabic, English and Urdu, with no accounts and no sign-up. Every tool on it explains its method below, so a reader can see why a number here might differ from one they saw elsewhere.',

  calH: 'Hijri dates',
  cal: [
    'We use the Umm al-Qura calendar, the official calendar of Saudi Arabia, which is calculated astronomically in advance. We rely on its standard implementation built into browsers and operating systems (Unicode CLDR, the islamic-umalqura calendar), so the date you see here is the one Apple, Android and Windows devices show.',
    'Many countries — Pakistan, Egypt and Morocco among them — start the month by sighting the new moon, so their month can begin a day earlier or later than Umm al-Qura. Our occasion pages show the expected date for each country with that caveat; for fasting and Eid, follow the announcement of the official authority where you live.',
  ],

  prayH: 'Prayer times',
  pray: [
    'Times are calculated astronomically from the sun\'s position for each day and city, using an algorithm adapted from the PrayTimes.org project (Hamid Zarrabi-Zadeh) under its free-use terms and ported to TypeScript.',
    'Fajr and Isha depend on how far below the horizon each authority puts the sun, and each country has a default method on the site (table below). Asr follows the majority view (shadow equal to the object) by default; the Hanafi view (twice the object) can be selected in the settings. At high latitudes, Fajr and Isha are adjusted using the middle-of-the-night rule.',
    'These are calculated times and can differ by a few minutes from your mosque\'s timetable or your country\'s official one, because of safety margins or rounding. Where they differ, follow your local mosque.',
  ],
  prayTableCaption: 'Calculation methods used, and the countries that use each one by default on the site',
  prayCols: ['Method', 'Fajr', 'Isha', 'Countries'],
  minutesAfterMaghrib: (m) => `${m} min after Maghrib`,
  andOthers: 'and others',

  qiblaH: 'Qibla direction',
  qibla: [
    'We calculate the great-circle bearing from your location to the Kaaba (21.4225° N, 39.8262° E), in degrees from true north, and the distance with the haversine formula.',
    'Phone compasses are affected by nearby metal and magnets; if the direction looks wrong, move the phone in a figure-of-eight to recalibrate it.',
  ],

  zakatH: 'Zakat calculator',
  zakat: [
    'The nisab is 85 g of gold or 595 g of silver, and the amount due is one-fortieth (2.5%) once wealth reaches the nisab and a lunar year has passed over it.',
    'Gold, silver and exchange rates are fetched automatically and can be edited by hand. The calculator is an aid for common cases; for complex wealth such as businesses, debts or property, ask a qualified scholar.',
  ],

  duaH: 'Supplications',
  dua: [
    'Supplications are taken from the Quran and the authentic Sunnah — Sahih al-Bukhari, Sahih Muslim and the Sunan collections such as at-Tirmidhi — in the manner of Hisn al-Muslim.',
    'Under every supplication we show its source: the surah and verse, or the hadith collection that narrates it. We do not knowingly include narrations graded weak; if you find one whose source looks wrong, tell us and we will review it.',
  ],

  khatmaH: 'Group khatma',
  khatma: [
    'A group khatma splits the thirty juz\' among participants: each takes a juz, recites it aloud, then confirms it. The counter says "so many juz\' completed", never "you completed the Quran"; names are optional and there is no leaderboard.',
    'There is no field for a deceased person and no dedication of reward, because whether the reward of recitation reaches the dead is disputed between the schools, while supplication for them is agreed upon. The khatma\'s guidelines follow two fatwas:',
  ],
  fatwaDarAlifta: 'Dar al-Ifta al-Misriyyah — on completing the Quran in a group (Arabic)',
  fatwaIslamweb: 'IslamWeb — fatwa 442006 (Arabic)',

  fixH: 'Mistakes and corrections',
  fix: [
    'If you find a date, time or text that is wrong, send us the page link and a description through the contact form or email below. We review every report, correct the page, and update its "last reviewed" date.',
  ],

  privH: 'Privacy',
  priv: [
    'No tool on the site asks for an account, an email address or a phone number. The khatma recognises you by a random token kept in your own browser.',
    'We use Google Analytics to measure visits, and show Google AdSense ads to cover the site\'s costs.',
  ],
  privLink: 'Full privacy policy',

  contactH: 'Contact',
  contact: 'For any suggestion, correction or question:',
  contactForm: 'Contact form',
  emailLabel: 'Email',

  updated: 'This page was last reviewed on 8 October 2026',
  relatedH: 'Related pages',
  related: [
    { href: '/en/about/', label: 'What is the Hijri calendar?' },
    { href: '/en/prayer-times/', label: 'Prayer times' },
    { href: '/en/qibla/', label: 'Qibla direction' },
    { href: '/en/zakat/', label: 'Zakat calculator' },
    { href: '/en/dua/', label: 'Supplications' },
    { href: '/en/khatma/', label: 'Group Quran khatma' },
  ],
};

// ── Urdu ─────────────────────────────────────────────────────────────────────
const UR: AboutT = {
  title: 'ہمارے بارے میں اور طریقۂ کار · ہجری تاریخ اور نماز کے اوقات کیسے نکالے جاتے ہیں',
  description: 'islamicdates.org کی ٹیم سے ملیں، اور جانیں کہ ہم اُمّ القریٰ تاریخ، نماز کے اوقات، قبلہ اور زکوٰۃ کیسے نکالتے ہیں، دعائیں کہاں سے لیتے ہیں، اور غلطی کیسے درست کرتے ہیں۔',
  h1: 'ہمارے بارے میں اور طریقۂ کار',
  intro: 'یہ صفحہ ہماری ٹیم کا تعارف کراتا ہے اور بتاتا ہے کہ یہاں کا ہر عدد کیسے نکلتا ہے، دینی متن کہاں سے آتا ہے، اور غلطی ہو تو ہم کیا کرتے ہیں۔',
  breadcrumbHome: 'ہوم', breadcrumb: 'ہمارے بارے میں', tagline: 'ہمارے بارے میں اور طریقۂ کار', home: 'ہوم',
  tocH: 'اس صفحے پر',

  whoH: 'ہماری ٹیم',
  whoIntro: 'سائٹ پر کام کرنے والے:',
  people: [
    {
      name: 'سلمیٰ محمود',
      role: 'بانی',
      bio: 'سسٹمز انٹیگریشن اور ڈیجیٹل حل کی ماہر، موبائل ایپس، ای کامرس اور ڈیجیٹل تبدیلی میں دس سال سے زیادہ کا تجربہ، اور مصنوعی ذہانت پر توجہ کے ساتھ آئی ٹی انجینئرنگ کا پس منظر۔ دوحہ میں مقیم۔',
    },
    {
      name: 'ڈاکٹر محمد بسام',
      role: 'بزنس ایڈمنسٹریشن کے ماہر، پی ایچ ڈی',
      bio: 'زائرین کی آراء اور استعمال کے اعداد و شمار کی بنیاد پر سائٹ کی حکمتِ عملی اور ترقی کی ترجیحات، اور مساجد، اسلامی مراکز اور ویب سائٹس کے ساتھ شراکت داری کے ذمہ دار ہیں۔',
    },
    {
      name: 'سمیر عبدالغنی',
      role: 'UX/UI ڈیزائنر',
      bio: 'سائٹ کا انٹرفیس اور صارف کا تجربہ فون اور کمپیوٹر کے لیے، عربی، انگریزی اور اردو میں ڈیزائن کیا۔',
    },
  ],
  companyH: 'کمپنی',
  company: 'ہجری کیلنڈر \u2066ICTSPS L.L.C (ICT Solutions & Professional Services)\u2069 کا ایک منصوبہ ہے، جو آئی ٹی حل اور ڈیجیٹل تبدیلی، سافٹ ویئر، موبائل ایپس اور ویب سائٹس کی تیاری، اور بزنس اینالیٹکس و مشاورت میں مہارت رکھتی ہے، اور اس کے دفاتر امریکہ اور ترکی میں ہیں۔',
  companyLink: 'کمپنی کی ویب سائٹ',
  mission: 'سلمیٰ نے یہ سائٹ اس لیے بنائی کہ ہجری تقویم، نماز کے اوقات اور اسلامی مناسبتوں کے لیے ایک درست اور مفت حوالہ ہو — عربی، انگریزی اور اردو میں، بغیر اکاؤنٹ اور بغیر رجسٹریشن کے۔ ہر ٹول کا طریقۂ حساب نیچے لکھا ہے، تاکہ قاری جان سکے کہ یہاں کا عدد کہیں اور سے کیوں مختلف ہو سکتا ہے۔',

  calH: 'ہجری تاریخ',
  cal: [
    'ہم اُمّ القریٰ تقویم استعمال کرتے ہیں، جو سعودی عرب کا سرکاری تقویم ہے اور پہلے سے فلکیاتی طور پر نکالا جاتا ہے۔ ہم براؤزرز اور آپریٹنگ سسٹمز میں موجود اس کا معیاری نفاذ (Unicode CLDR، islamic-umalqura) استعمال کرتے ہیں، اس لیے یہاں کی تاریخ وہی ہے جو ایپل، اینڈرائیڈ اور ونڈوز دکھاتے ہیں۔',
    'کئی ممالک — جیسے پاکستان، مصر اور مراکش — مہینے کا آغاز چاند دیکھ کر کرتے ہیں، اس لیے وہاں مہینہ اُمّ القریٰ سے ایک دن آگے یا پیچھے ہو سکتا ہے۔ ہمارے مناسبتوں کے صفحات ہر ملک کی متوقع تاریخ اسی وضاحت کے ساتھ دکھاتے ہیں؛ روزے اور عید کے لیے اپنے ملک کی سرکاری رؤیتِ ہلال کمیٹی کے اعلان پر عمل کریں۔',
  ],

  prayH: 'نماز کے اوقات',
  pray: [
    'اوقات ہر دن اور شہر کے لیے سورج کی پوزیشن سے فلکیاتی طور پر نکالے جاتے ہیں، PrayTimes.org منصوبے (حامد زرابی زادہ) کے الگورتھم سے، اس کی آزاد استعمال کی شرائط کے تحت، TypeScript میں منتقل کر کے۔',
    'فجر اور عشاء اس زاویے پر منحصر ہیں جو ہر ادارہ سورج کے افق سے نیچے ہونے کے لیے مانتا ہے، اور سائٹ پر ہر ملک کا ایک طے شدہ طریقہ ہے (نیچے جدول)۔ عصر بطورِ طے شدہ جمہور کے قول پر ہے (سایہ ایک مثل)؛ ترتیبات سے حنفی قول (دو مثل) چنا جا سکتا ہے۔ بلند عرض البلد پر فجر اور عشاء نصف شب کے اصول سے درست کیے جاتے ہیں۔',
    'یہ حساب شدہ اوقات ہیں اور احتیاط یا تقریب کی وجہ سے آپ کی مسجد یا سرکاری نقشے سے چند منٹ مختلف ہو سکتے ہیں۔ فرق ہو تو اپنی مقامی مسجد پر عمل کریں۔',
  ],
  prayTableCaption: 'استعمال ہونے والے طریقے، اور وہ ممالک جو سائٹ پر انہیں بطورِ طے شدہ استعمال کرتے ہیں',
  prayCols: ['طریقہ', 'فجر', 'عشاء', 'ممالک'],
  minutesAfterMaghrib: (m) => `مغرب کے ${m} منٹ بعد`,
  andOthers: 'وغیرہ',

  qiblaH: 'سمتِ قبلہ',
  qibla: [
    'ہم آپ کے مقام سے خانہ کعبہ (‎21.4225° شمال، ‎39.8262° مشرق) تک دائرۂ عظیمہ پر سمت نکالتے ہیں، جغرافیائی شمال سے ڈگریوں میں، اور فاصلہ ہاورسائن فارمولے سے۔',
    'فون کا کمپاس قریبی دھات اور مقناطیس سے متاثر ہوتا ہے؛ اگر سمت عجیب لگے تو فون کو ۸ کی شکل میں گھما کر کیلیبریٹ کریں۔',
  ],

  zakatH: 'زکوٰۃ کیلکولیٹر',
  zakat: [
    'نصاب ۸۵ گرام سونا یا ۵۹۵ گرام چاندی ہے، اور واجب مقدار چالیسواں حصہ (۲٫۵٪) ہے جب مال نصاب کو پہنچے اور اس پر سال گزر جائے۔',
    'سونے، چاندی اور زرِ مبادلہ کی قیمتیں خودکار طور پر لائی جاتی ہیں اور ہاتھ سے بدلی جا سکتی ہیں۔ کیلکولیٹر عام صورتوں کے لیے مددگار ہے؛ کاروبار، قرض یا جائیداد جیسے پیچیدہ اموال میں اہلِ علم سے پوچھیں۔',
  ],

  duaH: 'دعائیں اور اذکار',
  dua: [
    'دعائیں قرآنِ کریم اور صحیح سنّت — صحیح بخاری، صحیح مسلم اور ترمذی جیسی کتبِ سنن — سے لی گئی ہیں، «حصن المسلم» کے انداز پر۔',
    'ہر دعا کے نیچے اس کا ماخذ لکھا ہے: سورت اور آیت، یا حدیث کی وہ کتاب جس نے اسے روایت کیا۔ ہم جان بوجھ کر ضعیف روایات شامل نہیں کرتے؛ اگر کسی دعا کا ماخذ غلط لگے تو ہمیں بتائیں، ہم دیکھ لیں گے۔',
  ],

  khatmaH: 'اجتماعی ختم',
  khatma: [
    'اجتماعی ختم میں تیس پارے شرکاء میں بٹ جاتے ہیں: ہر شخص ایک پارہ لیتا ہے، زبان سے پڑھتا ہے، پھر تصدیق کرتا ہے۔ کاؤنٹر «اتنے پارے مکمل» کہتا ہے، کسی سے «آپ نے قرآن ختم کر لیا» نہیں کہتا؛ نام اختیاری ہے اور کوئی مقابلے کی فہرست نہیں۔',
    'ختم میں کسی مرحوم کے نام کا خانہ یا ایصالِ ثواب نہیں، کیونکہ تلاوت کا ثواب میت تک پہنچنے میں مذاہب کا اختلاف ہے، جبکہ میت کے لیے دعا پر اتفاق ہے۔ ختم کے ضوابط دو فتووں پر مبنی ہیں:',
  ],
  fatwaDarAlifta: 'دار الافتاء مصر — اجتماعی ختمِ قرآن کا حکم (عربی)',
  fatwaIslamweb: 'اسلام ویب — فتویٰ ۴۴۲۰۰۶ (عربی)',

  fixH: 'غلطیاں اور تصحیح',
  fix: [
    'اگر کوئی تاریخ، وقت یا متن غلط ملے تو صفحے کا لنک اور غلطی کی وضاحت نیچے دیے گئے رابطہ فارم یا ای میل سے بھیجیں۔ ہم ہر اطلاع دیکھتے ہیں، صفحہ درست کرتے ہیں، اور اس کی «آخری نظرِ ثانی» کی تاریخ بدل دیتے ہیں۔',
  ],

  privH: 'رازداری',
  priv: [
    'سائٹ کا کوئی ٹول اکاؤنٹ، ای میل یا فون نمبر نہیں مانگتا۔ اجتماعی ختم آپ کو ایک بے ترتیب کوڈ سے پہچانتا ہے جو صرف آپ کے براؤزر میں رہتا ہے۔',
    'ہم وزٹس ناپنے کے لیے Google Analytics استعمال کرتے ہیں، اور سائٹ کے اخراجات کے لیے Google AdSense کے اشتہارات دکھاتے ہیں۔',
  ],
  privLink: 'مکمل رازداری پالیسی',

  contactH: 'رابطہ',
  contact: 'کسی تجویز، تصحیح یا سوال کے لیے:',
  contactForm: 'رابطہ فارم',
  emailLabel: 'ای میل',

  updated: 'اس صفحے پر آخری نظرِ ثانی: ۸ اکتوبر ۲۰۲۶',
  relatedH: 'متعلقہ صفحات',
  related: [
    { href: '/ur/about/', label: 'ہجری تقویم کیا ہے؟' },
    { href: '/ur/prayer-times/', label: 'نماز کے اوقات' },
    { href: '/ur/qibla/', label: 'سمتِ قبلہ' },
    { href: '/ur/zakat/', label: 'زکوٰۃ کیلکولیٹر' },
    { href: '/ur/dua/', label: 'دعائیں اور اذکار' },
    { href: '/ur/khatma/', label: 'اجتماعی ختمِ قرآن' },
  ],
};

export const aboutT = (lang: Lang): AboutT => (lang === 'en' ? EN : lang === 'ur' ? UR : AR);
