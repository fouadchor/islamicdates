// Occasion-by-year SEO page data. Build-time only.
import { h2g } from './hijri';

export interface OccFaq { q: string; a: string }
export interface OccLoc {
  name: string;
  /** Alternate name people commonly search for (e.g. "Eid Milad un-Nabi") — used in title/meta/H1. */
  alias?: string;
  what: string;
  /** The occasion's virtue / significance — rendered as its own section. */
  virtues?: string;
  /** What Muslims traditionally do on it — rendered as its own section + FAQ answer. */
  practices?: string;
  /** Historical background — rendered as its own section. */
  history?: string;
  /** Extra locale-specific FAQs appended to the generated ones (also emitted in the FAQ rich result). */
  faq?: OccFaq[];
}
/** Country-by-country observance row. Names are localized as [ar, en, ur]. */
export interface OccCountry {
  names: [string, string, string];
  /** Expected day offset from the Umm al-Qura date (1 = usually observed the next day). */
  shift: 0 | 1;
  /** Relies on local moon sighting — the actual date may move by about a day. */
  sighting: boolean;
  /** Official public holiday in that country. */
  holiday: boolean;
}
export interface OccDef {
  slug: string;          // url slug base (english, shared across langs)
  hm: number;            // hijri month
  hd: number;            // hijri day
  ar: OccLoc;
  en: OccLoc;
  ur: OccLoc;
  /** Optional country-by-country date & public-holiday table (year-agnostic: dates derived at build time). */
  countries?: OccCountry[];
}

// Major Islamic occasions people search for by Gregorian year.
export const OCCASIONS: OccDef[] = [
  {
    slug: 'ramadan', hm: 9, hd: 1,
    ar: {
      name: 'رمضان',
      what: 'رمضان هو الشهر التاسع في التقويم الهجري وشهر الصيام الفريضة عند المسلمين، يمتنعون فيه عن الطعام والشراب من الفجر إلى المغرب. نزل فيه القرآن الكريم، وفيه ليلة القدر التي هي خير من ألف شهر. يستمر الشهر تسعة وعشرين أو ثلاثين يوماً، ويُختتم بعيد الفطر.',
      virtues: 'إذا دخل رمضان فُتحت أبواب الجنة وغُلقت أبواب النار وصُفّدت الشياطين كما صحّ عن النبي ﷺ. ومن صامه إيماناً واحتساباً غُفر له ما تقدّم من ذنبه، والعمرة فيه تعدل حجة. وفيه ليلة القدر التي جعلها الله خيراً من ألف شهر.',
      practices: 'يصوم المسلمون نهاره ويقومون ليله بصلاة التراويح، ويُكثرون من تلاوة القرآن حتى يختمه كثيرون مرة أو أكثر. وتزداد الصدقات وموائد الإفطار، ويحرص الناس على السحور اقتداءً بالسنة، ويعتكف بعضهم في المساجد خلال العشر الأواخر التماساً لليلة القدر.',
    },
    en: {
      name: 'Ramadan',
      what: 'Ramadan is the ninth month of the Hijri calendar and the month of obligatory fasting, during which Muslims abstain from food and drink from dawn to sunset. The Quran was first revealed in it, and it contains Laylat al-Qadr — the Night of Decree, better than a thousand months. It lasts 29 or 30 days and ends with Eid al-Fitr.',
      virtues: 'When Ramadan begins, the gates of Paradise are opened, the gates of the Fire are closed and the devils are chained, as authentically reported from the Prophet ﷺ. Whoever fasts it out of faith and hope for reward has his past sins forgiven, and an Umrah performed in it equals a Hajj in reward. It also holds Laylat al-Qadr, which Allah made better than a thousand months.',
      practices: 'Muslims fast its days and stand its nights in Tarawih prayer, and increase their recitation of the Quran — many completing it once or more. Charity multiplies, iftar tables are shared, the pre-dawn suhoor meal is kept following the Sunnah, and some devote themselves to iʿtikaf (retreat) in the mosque during the last ten nights seeking Laylat al-Qadr.',
    },
    ur: {
      name: 'رمضان',
      what: 'رمضان ہجری تقویم کا نواں مہینہ اور مسلمانوں کے فرض روزوں کا مہینہ ہے، جس میں وہ فجر سے غروبِ آفتاب تک کھانے پینے سے رکتے ہیں۔ اسی میں قرآنِ کریم نازل ہوا، اور اسی میں شبِ قدر ہے جو ہزار مہینوں سے بہتر ہے۔ یہ مہینہ انتیس یا تیس دن کا ہوتا ہے اور عید الفطر پر اختتام پذیر ہوتا ہے۔',
      virtues: 'جب رمضان آتا ہے تو جنت کے دروازے کھول دیے جاتے ہیں، جہنم کے دروازے بند کر دیے جاتے ہیں اور شیاطین جکڑ دیے جاتے ہیں، جیسا کہ نبی کریم ﷺ سے صحیح روایت ہے۔ جو ایمان اور اجر کی امید کے ساتھ اس کے روزے رکھے اس کے پچھلے گناہ معاف کر دیے جاتے ہیں، اور اس میں عمرہ حج کے برابر ثواب رکھتا ہے۔ اسی میں شبِ قدر ہے جسے اللہ نے ہزار مہینوں سے بہتر بنایا۔',
      practices: 'مسلمان دن میں روزہ رکھتے ہیں اور رات میں تراویح پڑھتے ہیں، اور تلاوتِ قرآن میں اضافہ کرتے ہیں — بہت سے لوگ ایک یا زیادہ بار قرآن ختم کرتے ہیں۔ صدقات اور افطار کے دسترخوان بڑھ جاتے ہیں، سنت کے مطابق سحری کا اہتمام ہوتا ہے، اور بعض لوگ آخری عشرے میں شبِ قدر کی تلاش میں مسجد میں اعتکاف کرتے ہیں۔',
    },
  },
  {
    slug: 'eid-al-fitr', hm: 10, hd: 1,
    ar: {
      name: 'عيد الفطر',
      what: 'عيد الفطر هو أول أيام شهر شوال، ويأتي مباشرة بعد انتهاء صيام رمضان. يُعرف بالعيد الصغير، ويبدأ بصلاة العيد ثم التزاور وتبادل التهاني، ويُستحب فيه إخراج زكاة الفطر قبل الصلاة.',
      virtues: 'هو يوم الجائزة الذي يفرح فيه الصائمون بإتمام فريضتهم، وقد جعله النبي ﷺ يوم فرحٍ للمسلمين. يحرم صيامه، فهو يوم أكلٍ وشربٍ وذكرٍ لله، وفيه تُطهَّر نفس الصائم بزكاة الفطر وتُسدّ حاجة الفقراء.',
      practices: 'يبدأ اليوم بالاغتسال ولبس أجمل الثياب والتكبير في الطريق إلى صلاة العيد، وتُخرَج زكاة الفطر قبل الصلاة. ثم تعمّ الزيارات وصلة الأرحام وتبادل التهاني والهدايا والعيدية، وتُعدّ الحلوى وكعك العيد في كثير من البلدان.',
    },
    en: {
      name: 'Eid al-Fitr',
      what: 'Eid al-Fitr falls on the first day of Shawwal, immediately after the end of fasting in Ramadan. Known as the "Lesser Eid," it begins with the Eid prayer followed by visits and greetings, and Zakat al-Fitr is given before the prayer.',
      virtues: 'It is the day of reward, when those who fasted rejoice at completing their obligation — a day of joy for Muslims. Fasting on it is forbidden: it is a day of eating, drinking and remembering Allah, and Zakat al-Fitr purifies the fasting person while providing for those in need.',
      practices: 'The day begins with a bath, one’s finest clothes, and takbir on the way to the Eid prayer, with Zakat al-Fitr given beforehand. Then follow family visits, maintaining ties of kinship, exchanging greetings, gifts and Eidiyah money for children, and festive sweets — from maamoul to kahk — in many countries.',
    },
    ur: {
      name: 'عید الفطر',
      what: 'عید الفطر شوال کی پہلی تاریخ کو ہوتی ہے، اور رمضان کے روزوں کے اختتام کے فوراً بعد آتی ہے۔ اسے "چھوٹی عید" بھی کہا جاتا ہے، اس کا آغاز نمازِ عید سے ہوتا ہے، پھر ملاقاتیں اور مبارک باد کا سلسلہ چلتا ہے، اور نماز سے پہلے صدقۂ فطر ادا کرنا مستحب ہے۔',
      virtues: 'یہ انعام کا دن ہے جب روزہ دار اپنا فریضہ مکمل کرنے پر خوش ہوتے ہیں — مسلمانوں کی خوشی کا دن۔ اس دن روزہ رکھنا حرام ہے؛ یہ کھانے پینے اور اللہ کے ذکر کا دن ہے، اور صدقۂ فطر روزہ دار کو پاک کرتا ہے اور غریبوں کی ضرورت پوری کرتا ہے۔',
      practices: 'دن کا آغاز غسل، عمدہ لباس اور نمازِ عید کے راستے میں تکبیرات سے ہوتا ہے، اور صدقۂ فطر نماز سے پہلے ادا کیا جاتا ہے۔ پھر ملاقاتیں، صلہ رحمی، مبارک باد، تحائف اور بچوں کی عیدی کا سلسلہ چلتا ہے، اور بہت سے ممالک میں شیر خرما اور مٹھائیاں تیار کی جاتی ہیں۔',
    },
  },
  {
    slug: 'eid-al-adha', hm: 12, hd: 10,
    ar: {
      name: 'عيد الأضحى',
      what: 'عيد الأضحى هو العاشر من ذي الحجة، ويأتي بعد يوم عرفة في موسم الحج. يُعرف بالعيد الكبير، ويُحيي ذكرى استعداد النبي إبراهيم عليه السلام للتضحية، فيُضحّى فيه بالأنعام وتُوزّع لحومها على الأهل والفقراء، ويمتد إلى أيام التشريق الثلاثة.',
      virtues: 'قال النبي ﷺ: «أعظم الأيام عند الله يوم النحر». وهو ذروة موسم الحج ويوم الحج الأكبر، تُذبح فيه الأضاحي اقتداءً بأبينا إبراهيم عليه السلام، ومن أحبّ الأعمال إلى الله فيه إراقة دم الأضحية.',
      practices: 'يبدأ بصلاة العيد ثم ذبح الأضحية لمن استطاع، وتُقسم لحومها أثلاثاً: للأهل والأقارب والفقراء. ويستمر التكبير المقيّد عقب الصلوات حتى آخر أيام التشريق، وتعمّ الزيارات والولائم وصلة الأرحام أربعة أيام كاملة.',
    },
    en: {
      name: 'Eid al-Adha',
      what: 'Eid al-Adha falls on the 10th of Dhuʾl-Hijjah, the day after Arafah during the Hajj season. Known as the "Greater Eid," it commemorates Prophet Ibrahim’s willingness to sacrifice; animals are sacrificed and the meat shared with family and the poor. It continues through the three days of Tashriq.',
      virtues: 'The Prophet ﷺ said: "The greatest of days with Allah is the Day of Sacrifice." It is the climax of the Hajj season and the day of the greater pilgrimage; the sacrifice follows the example of Prophet Ibrahim, and few deeds on this day are more beloved to Allah than offering it.',
      practices: 'The day opens with the Eid prayer, followed by the sacrifice for those able, its meat traditionally divided in thirds — for the household, relatives and the poor. Takbir continues after every prayer until the end of the Tashriq days, and four full days are spent in visits, feasts and family ties.',
    },
    ur: {
      name: 'عید الاضحیٰ',
      what: 'عید الاضحیٰ ذوالحجہ کی دسویں تاریخ کو ہوتی ہے، حج کے موسم میں یومِ عرفہ کے اگلے دن۔ اسے "بڑی عید" بھی کہا جاتا ہے، اور یہ حضرت ابراہیم علیہ السلام کی قربانی کے لیے آمادگی کی یاد دلاتی ہے؛ اس میں جانوروں کی قربانی کی جاتی ہے اور گوشت اہلِ خانہ اور غرباء میں تقسیم کیا جاتا ہے۔ یہ ایامِ تشریق کے تین دنوں تک جاری رہتی ہے۔',
      virtues: 'نبی کریم ﷺ نے فرمایا: «اللہ کے نزدیک سب سے عظیم دن یومِ نحر ہے»۔ یہ حج کے موسم کا نقطۂ عروج اور حجِ اکبر کا دن ہے؛ قربانی حضرت ابراہیم علیہ السلام کی سنت ہے، اور اس دن اللہ کے محبوب ترین اعمال میں قربانی کا خون بہانا ہے۔',
      practices: 'دن کا آغاز نمازِ عید سے ہوتا ہے، پھر استطاعت رکھنے والے قربانی کرتے ہیں جس کا گوشت روایتی طور پر تین حصوں میں بانٹا جاتا ہے — گھر والوں، رشتہ داروں اور غریبوں کے لیے۔ ایامِ تشریق کے آخر تک ہر نماز کے بعد تکبیرات جاری رہتی ہیں، اور پورے چار دن ملاقاتوں، دعوتوں اور صلہ رحمی میں گزرتے ہیں۔',
    },
  },
  {
    slug: 'ashura', hm: 1, hd: 10,
    ar: {
      name: 'عاشوراء',
      what: 'عاشوراء هو اليوم العاشر من شهر محرم. صامه النبي ﷺ وأمر بصيامه شكراً لله على نجاة موسى عليه السلام، ويُستحب صيام التاسع معه. وله مكانة خاصة لدى المسلمين لما يحمله من معانٍ تاريخية ودينية.',
      virtues: 'سُئل النبي ﷺ عن صيام يوم عاشوراء فقال: «يكفّر السنة الماضية» كما في صحيح مسلم. وهو اليوم الذي نجّى الله فيه موسى عليه السلام وقومه من فرعون، فصامه موسى شكراً لله، وصامه نبينا ﷺ وحثّ عليه.',
      practices: 'يُستحب صيامه مع التاسع (تاسوعاء) كما أرشد النبي ﷺ، ويُكثر المسلمون فيه من الذكر والدعاء والصدقة. وتتنوع مظاهر إحيائه بين المسلمين بحسب مذاهبهم وبلدانهم.',
    },
    en: {
      name: 'Ashura',
      what: 'Ashura is the 10th day of Muharram. The Prophet ﷺ fasted it and encouraged fasting it in gratitude for the salvation of Prophet Musa; fasting the 9th alongside it is recommended. It holds special historical and religious significance for Muslims.',
      virtues: 'When asked about fasting the day of Ashura, the Prophet ﷺ said it "expiates the sins of the past year" (Sahih Muslim). It is the day Allah saved Prophet Musa and his people from Pharaoh — Musa fasted it in gratitude, and our Prophet ﷺ fasted it and urged others to do so.',
      practices: 'It is recommended to fast it together with the 9th (Tasuʿa), as the Prophet ﷺ directed. Muslims increase in remembrance, supplication and charity on this day, and its observance varies among communities and countries.',
    },
    ur: {
      name: 'عاشورا',
      what: 'عاشورا محرم کی دسویں تاریخ ہے۔ نبی کریم ﷺ نے اس کا روزہ رکھا اور حضرت موسیٰ علیہ السلام کی نجات پر اللہ کے شکر کے طور پر اس کے روزے کی ترغیب دی؛ اس کے ساتھ نویں تاریخ کا روزہ رکھنا مستحب ہے۔ مسلمانوں کے نزدیک اس کی خاص تاریخی و دینی اہمیت ہے۔',
      virtues: 'نبی کریم ﷺ سے عاشورا کے روزے کے بارے میں پوچھا گیا تو فرمایا کہ یہ «گزشتہ سال کے گناہوں کا کفارہ ہے» (صحیح مسلم)۔ یہی وہ دن ہے جب اللہ نے حضرت موسیٰ علیہ السلام اور ان کی قوم کو فرعون سے نجات دی — موسیٰ علیہ السلام نے شکرانے کا روزہ رکھا، اور ہمارے نبی ﷺ نے بھی روزہ رکھا اور اس کی ترغیب دی۔',
      practices: 'نبی کریم ﷺ کی ہدایت کے مطابق اس کے ساتھ نویں (تاسوعا) کا روزہ رکھنا مستحب ہے۔ مسلمان اس دن ذکر، دعا اور صدقے میں اضافہ کرتے ہیں، اور اس کے منانے کے انداز مختلف مکاتب اور ممالک میں مختلف ہیں۔',
    },
  },
  {
    slug: 'islamic-new-year', hm: 1, hd: 1,
    ar: {
      name: 'رأس السنة الهجرية',
      what: 'رأس السنة الهجرية هو أول يوم من شهر محرم، وبه يبدأ العام الهجري الجديد. ويؤرّخ التقويم الهجري من هجرة النبي محمد ﷺ من مكة إلى المدينة سنة 622 ميلادية، وهي الحدث الذي بدأ منه العدّ.',
      virtues: 'يفتتح العامَ شهرُ محرم، أحد الأشهر الحرم الأربعة التي عظّمها الله في كتابه. وقال النبي ﷺ: «أفضل الصيام بعد رمضان شهر الله المحرم»، فبداية العام موسم مبارك للطاعة لا لمجرد الاحتفال.',
      practices: 'ليست له عبادة مخصوصة ثابتة، لكن كثيراً من المسلمين يجعلونه وقفة للمحاسبة وتجديد النية واستحضار دروس الهجرة النبوية. ويُكثر بعضهم من صيام التطوع في محرم عملاً بالحديث، وتُلقى الدروس عن السيرة ومعاني التضحية والتوكل.',
    },
    en: {
      name: 'Islamic New Year',
      what: 'The Islamic New Year falls on the first day of Muharram, opening a new Hijri year. The Hijri calendar counts from the migration (Hijra) of Prophet Muhammad ﷺ from Mecca to Medina in 622 CE — the event from which the numbering begins.',
      virtues: 'The year opens with Muharram, one of the four sacred months honoured by Allah in the Quran. The Prophet ﷺ said: "The best fasting after Ramadan is in the month of Allah, Muharram" — making the year’s start a blessed season for devotion rather than mere celebration.',
      practices: 'No specific ritual is prescribed for the day itself, but many Muslims treat it as a moment of self-accounting, renewed intention and reflection on the lessons of the Hijra. Some increase voluntary fasting through Muharram following the hadith, and lessons are given on the Prophet’s biography and the meanings of sacrifice and trust in Allah.',
    },
    ur: {
      name: 'نیا ہجری سال',
      what: 'نیا ہجری سال محرم کی پہلی تاریخ کو شروع ہوتا ہے، اور اسی سے نیا ہجری سال آغاز پاتا ہے۔ ہجری تقویم کا حساب نبی کریم ﷺ کی مکہ سے مدینہ ہجرت (622 عیسوی) سے کیا جاتا ہے — وہی واقعہ جس سے سالوں کی گنتی شروع ہوتی ہے۔',
      virtues: 'سال کا آغاز محرم سے ہوتا ہے جو ان چار حرمت والے مہینوں میں سے ہے جنہیں اللہ نے قرآن میں عظمت دی۔ نبی کریم ﷺ نے فرمایا: «رمضان کے بعد سب سے افضل روزے اللہ کے مہینے محرم کے ہیں» — اس لیے سال کا آغاز محض جشن نہیں بلکہ عبادت کا بابرکت موسم ہے۔',
      practices: 'اس دن کی کوئی مخصوص عبادت ثابت نہیں، لیکن بہت سے مسلمان اسے احتساب، تجدیدِ نیت اور ہجرتِ نبوی کے اسباق پر غور کا موقع بناتے ہیں۔ بعض لوگ حدیث پر عمل کرتے ہوئے محرم میں نفلی روزے بڑھاتے ہیں، اور سیرت اور قربانی و توکل کے مضامین پر دروس ہوتے ہیں۔',
    },
  },
  {
    slug: 'mawlid-al-nabi', hm: 3, hd: 12,
    countries: [
      { names: ['السعودية', 'Saudi Arabia', 'سعودی عرب'], shift: 0, sighting: false, holiday: false },
      { names: ['الإمارات', 'UAE', 'متحدہ عرب امارات'], shift: 0, sighting: false, holiday: true },
      { names: ['مصر', 'Egypt', 'مصر'], shift: 0, sighting: true, holiday: true },
      { names: ['باكستان', 'Pakistan', 'پاکستان'], shift: 0, sighting: true, holiday: true },
      { names: ['الهند', 'India', 'بھارت'], shift: 1, sighting: true, holiday: true },
      { names: ['بنغلاديش', 'Bangladesh', 'بنگلہ دیش'], shift: 1, sighting: true, holiday: true },
      { names: ['إندونيسيا', 'Indonesia', 'انڈونیشیا'], shift: 0, sighting: false, holiday: true },
      { names: ['المغرب', 'Morocco', 'مراکش'], shift: 1, sighting: true, holiday: true },
      { names: ['الأردن', 'Jordan', 'اردن'], shift: 0, sighting: true, holiday: true },
      { names: ['تركيا', 'Türkiye', 'ترکی'], shift: 0, sighting: false, holiday: false },
    ],
    ar: {
      name: 'المولد النبوي الشريف',
      alias: 'مولد الرسول ﷺ',
      what: 'المولد النبوي الشريف يوافق الثاني عشر من ربيع الأول، وفيه يحيي كثير من المسلمين ذكرى مولد النبي محمد ﷺ. وتتنوع مظاهر إحيائه بين الدول، من ذكر سيرته وشمائله إلى الدروس والاحتفالات.',
      virtues: 'هو ذكرى مولد خير الخلق ﷺ الذي أرسله الله رحمةً للعالمين، وقد قال ﷺ عن صيام الاثنين: «ذاك يوم وُلدت فيه». فالمناسبة تذكيرٌ بعظيم نعمة الله على البشرية ببعثته ﷺ.',
      practices: 'يحييه كثيرون بقراءة السيرة النبوية ومجالس المدائح والذكر والصدقة وإطعام الطعام، وتُقام الدروس عن شمائله ﷺ وأخلاقه. وتختلف مظاهره بين البلدان، ويرى بعض أهل العلم الاقتصار على اتباع سنته ﷺ دون تخصيص احتفال، فالأمر واسع بين المسلمين.',
      history: 'وُلد النبي محمد ﷺ في مكة عام الفيل (نحو 571م) يوم الاثنين باتفاق أهل السير، والمشهور عند الجمهور أنه في الثاني عشر من ربيع الأول، مع أقوال أخرى في الثاني والثامن والتاسع والعاشر. وأول ما عُرفت الاحتفالات العامة بالمولد في مصر في العهد الفاطمي، ثم اشتهرت في القرن السادس الهجري بمواكب الملك المظفّر كوكبري صاحب إربل، وانتشرت بعد ذلك في أنحاء العالم الإسلامي بمظاهر تختلف من بلد إلى آخر، مع بقاء المسألة محلّ نظر واجتهاد بين أهل العلم.',
      faq: [
        { q: 'هل وُلد النبي ﷺ في 12 ربيع الأول فعلاً؟', a: 'المتفق عليه أنه ﷺ وُلد يوم الاثنين في عام الفيل، لقوله ﷺ عن صيام الاثنين: «ذاك يوم وُلدت فيه». أما تحديد اليوم من الشهر فمختلف فيه بين أهل السير، فقيل الثاني والثامن والتاسع والعاشر والثاني عشر من ربيع الأول، والأخير هو الأشهر.' },
        { q: 'هل المولد النبوي إجازة رسمية في السعودية؟', a: 'لا، ليس المولد النبوي إجازة رسمية في السعودية. بينما هو إجازة رسمية في دول عدة منها مصر وباكستان والإمارات والمغرب والأردن وإندونيسيا والهند وبنغلاديش.' },
        { q: 'لماذا يحيي بعض المسلمين الذكرى في 17 ربيع الأول؟', a: 'يرى كثير من علماء الشيعة أن المولد كان في السابع عشر من ربيع الأول، ولذلك تحييه إيران وبعض المجتمعات في هذا اليوم، وتُعرف الأيام بين 12 و17 ربيع الأول هناك بأسبوع الوحدة الإسلامية.' },
      ],
    },
    en: {
      name: 'Mawlid al-Nabi',
      alias: 'Eid Milad un-Nabi',
      what: 'Mawlid al-Nabi falls on the 12th of Rabiʿ al-Awwal, when many Muslims commemorate the birth of Prophet Muhammad ﷺ. Observances vary across countries, from recounting his life and character to lessons and gatherings.',
      virtues: 'It marks the birth of the best of creation ﷺ, sent by Allah as a mercy to the worlds. About fasting Mondays the Prophet ﷺ said: "That is the day I was born" — so the occasion is above all a reminder of Allah’s immense favour to humanity through his mission.',
      practices: 'Many observe it with readings of the Prophet’s biography, gatherings of praise and remembrance, charity and feeding others, and lessons on his character. Practice differs between countries, and some scholars prefer devotion through simply following his Sunnah without a designated celebration — a matter of accepted difference among Muslims.',
      history: 'The Prophet Muhammad ﷺ was born in Mecca in the Year of the Elephant (c. 571 CE) on a Monday — a point the early biographers agree on. The 12th of Rabi al-Awwal is the most widely cited day, though the 2nd, 8th, 9th and 10th are also reported. Large public Mawlid festivities are first recorded in Fatimid Egypt, and the observance became famous through the celebrations of Muzaffar al-Din Gökböri, ruler of Erbil, in the 6th century AH. From there it spread across the Muslim world, with customs differing by region and a well-known scholarly discussion about the celebration itself.',
      faq: [
        { q: 'Was the Prophet ﷺ really born on 12 Rabi al-Awwal?', a: 'What is agreed upon is that he ﷺ was born on a Monday in the Year of the Elephant — about fasting Mondays he said: “That is the day I was born.” The exact day of the month is debated among the early biographers: the 2nd, 8th, 9th, 10th and 12th of Rabi al-Awwal are all reported, the 12th being the most famous.' },
        { q: 'Is Mawlid al-Nabi a public holiday in Saudi Arabia?', a: 'No — Mawlid is not an official public holiday in Saudi Arabia. It is, however, a public holiday in many countries, including Egypt, Pakistan, the UAE, Morocco, Jordan, Indonesia, India and Bangladesh.' },
        { q: 'Are Mawlid al-Nabi and Eid Milad un-Nabi the same occasion?', a: 'Yes. Eid Milad un-Nabi (also written Eid-e-Milad) is the name commonly used in Pakistan, India and Bangladesh for Mawlid al-Nabi — the same commemoration of the Prophet’s ﷺ birth on 12 Rabi al-Awwal.' },
        { q: 'Why do some Muslims observe it on 17 Rabi al-Awwal?', a: 'Most Shia scholars hold that the Prophet ﷺ was born on the 17th of Rabi al-Awwal, so Iran and some communities observe it then; the days between the 12th and the 17th are marked in Iran as Islamic Unity Week.' },
      ],
    },
    ur: {
      name: 'میلاد النبی ﷺ',
      alias: 'عید میلاد النبی',
      what: 'میلاد النبی ﷺ ربیع الاول کی بارہویں تاریخ کو ہوتا ہے، جب بہت سے مسلمان نبی کریم محمد ﷺ کی ولادت کی یاد مناتے ہیں۔ اس کے مظاہر مختلف ممالک میں مختلف ہیں، سیرت و شمائل کے تذکرے سے لے کر دروس اور محافل تک۔',
      virtues: 'یہ خیر الخلق ﷺ کی ولادت کی یاد ہے جنہیں اللہ نے تمام جہانوں کے لیے رحمت بنا کر بھیجا۔ پیر کے روزے کے بارے میں آپ ﷺ نے فرمایا: «یہ وہ دن ہے جس میں میری ولادت ہوئی» — پس یہ مناسبت سب سے بڑھ کر اللہ کے اُس عظیم احسان کی یاد دہانی ہے جو آپ ﷺ کی بعثت کی صورت میں انسانیت پر ہوا۔',
      practices: 'بہت سے لوگ اسے سیرتِ نبوی کی قراءت، نعت و ذکر کی محافل، صدقہ اور کھانا کھلانے سے مناتے ہیں، اور آپ ﷺ کے اخلاق و شمائل پر دروس ہوتے ہیں۔ اس کے انداز ملکوں میں مختلف ہیں، اور بعض اہلِ علم کسی مخصوص جشن کے بجائے صرف اتباعِ سنت کو ترجیح دیتے ہیں — یہ مسلمانوں میں معروف وسعت کا معاملہ ہے۔',
      history: 'نبی کریم ﷺ مکہ میں عام الفیل (تقریباً 571ء) میں پیر کے دن پیدا ہوئے — اس پر اہلِ سیرت کا اتفاق ہے۔ مہینے کی تاریخ میں اختلاف ہے: 2، 8، 9، 10 اور 12 ربیع الاول کے اقوال ملتے ہیں، اور 12 ربیع الاول سب سے مشہور ہے۔ میلاد کی بڑی عوامی تقریبات کا آغاز فاطمی دورِ مصر سے ملتا ہے، پھر چھٹی صدی ہجری میں اربل کے حکمران مظفر الدین کوکبری کے اہتمام سے یہ سلسلہ مشہور ہوا اور رفتہ رفتہ عالمِ اسلام میں پھیل گیا — ہر خطے کے اپنے انداز کے ساتھ، اور علماء کے درمیان اس پر معروف علمی بحث بھی رہی ہے۔',
      faq: [
        { q: 'کیا نبی کریم ﷺ واقعی 12 ربیع الاول کو پیدا ہوئے؟', a: 'متفقہ بات یہ ہے کہ آپ ﷺ پیر کے دن عام الفیل میں پیدا ہوئے — پیر کے روزے کے بارے میں فرمایا: «یہ وہ دن ہے جس میں میری ولادت ہوئی»۔ مہینے کی تاریخ میں سیرت نگاروں کا اختلاف ہے: 2، 8، 9، 10 اور 12 ربیع الاول کے اقوال ہیں، اور 12 ربیع الاول سب سے مشہور قول ہے۔' },
        { q: 'کیا 12 ربیع الاول کو پاکستان میں سرکاری چھٹی ہوتی ہے؟', a: 'جی ہاں، عید میلاد النبی ﷺ پاکستان میں سرکاری تعطیل ہے، اور بھارت و بنگلہ دیش میں بھی چھٹی ہوتی ہے۔ سعودی عرب میں یہ سرکاری تعطیل نہیں۔ پاکستان میں حتمی تاریخ مرکزی رؤیتِ ہلال کمیٹی کے اعلان سے طے ہوتی ہے۔' },
        { q: 'بعض مسلمان 17 ربیع الاول کو کیوں مناتے ہیں؟', a: 'اکثر شیعہ علماء کے نزدیک ولادتِ نبوی 17 ربیع الاول کو ہوئی؛ ایران اور بعض کمیونٹیز اسی دن مناتی ہیں، اور ایران میں 12 تا 17 ربیع الاول کو ہفتۂ وحدت کہا جاتا ہے۔' },
      ],
    },
  },
  {
    slug: 'day-of-arafah', hm: 12, hd: 9,
    ar: {
      name: 'يوم عرفة',
      what: 'يوم عرفة هو التاسع من ذي الحجة، وهو ركن الحج الأعظم حيث يقف الحجاج على صعيد عرفة. ويُستحب لغير الحاج صيامه، فصيامه يكفّر سنة ماضية وسنة قادمة كما ورد في الحديث.',
      virtues: 'قال النبي ﷺ: «ما من يوم أكثر من أن يعتق الله فيه عبداً من النار من يوم عرفة». وفيه أُنزل قوله تعالى: ﴿اليوم أكملت لكم دينكم﴾، وصيامه يكفّر سنتين، وهو يوم إجابة الدعاء.',
      practices: 'يقف الحجاج على صعيد عرفات من الزوال إلى الغروب متضرعين، وهو ركن الحج الأعظم. أما غير الحجاج فيُستحب لهم صيامه والإكثار من الدعاء، وخير الدعاء دعاء يوم عرفة: «لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير».',
    },
    en: {
      name: 'Day of Arafah',
      what: 'The Day of Arafah is the 9th of Dhuʾl-Hijjah and the greatest pillar of Hajj, when pilgrims stand on the plain of Arafah. For non-pilgrims, fasting this day is recommended and is said to expiate the previous and coming year.',
      virtues: 'The Prophet ﷺ said: "There is no day on which Allah frees more people from the Fire than the Day of Arafah." On it the verse "This day I have perfected for you your religion" was revealed; fasting it expiates two years of sins, and it is a day of answered supplication.',
      practices: 'Pilgrims stand on the plain of Arafat from midday to sunset in earnest supplication — the greatest pillar of Hajj. Non-pilgrims are encouraged to fast the day and to abound in duʿa, for "the best supplication is that of the Day of Arafah": La ilaha illa Allah, alone without partner; His is the dominion and the praise, and He is able over all things.',
    },
    ur: {
      name: 'یومِ عرفہ',
      what: 'یومِ عرفہ ذوالحجہ کی نویں تاریخ ہے اور حج کا سب سے بڑا رکن ہے، جب حُجّاج میدانِ عرفات میں وقوف کرتے ہیں۔ غیر حاجی کے لیے اس دن کا روزہ مستحب ہے، اور حدیث کے مطابق اس کا روزہ گزشتہ اور آئندہ سال کے گناہوں کا کفارہ ہے۔',
      virtues: 'نبی کریم ﷺ نے فرمایا: «کوئی دن ایسا نہیں جس میں اللہ یومِ عرفہ سے زیادہ بندوں کو جہنم سے آزاد کرتا ہو»۔ اسی دن آیت ﴿آج میں نے تمہارے لیے تمہارا دین مکمل کر دیا﴾ نازل ہوئی؛ اس کا روزہ دو سال کے گناہوں کا کفارہ ہے، اور یہ قبولیتِ دعا کا دن ہے۔',
      practices: 'حجاج زوال سے غروب تک میدانِ عرفات میں گڑگڑا کر دعائیں کرتے ہوئے وقوف کرتے ہیں — یہی حج کا سب سے بڑا رکن ہے۔ غیر حاجیوں کے لیے اس دن کا روزہ اور کثرتِ دعا مستحب ہے، کیونکہ «سب سے بہتر دعا یومِ عرفہ کی دعا ہے»: لا الٰہ الا اللہ وحدہ لا شریک لہ، لہ الملک ولہ الحمد وہو علیٰ کل شیء قدیر۔',
    },
  },
  {
    slug: 'isra-and-miraj', hm: 7, hd: 27,
    ar: {
      name: 'الإسراء والمعراج',
      what: 'الإسراء والمعراج يوافق السابع والعشرين من رجب عند كثير من المسلمين، ويحيي ذكرى رحلة النبي ﷺ الليلية من المسجد الحرام إلى المسجد الأقصى ثم العروج إلى السماوات، وفيها فُرضت الصلوات الخمس.',
      virtues: 'هي معجزة عظيمة أكرم الله بها نبيه ﷺ بعد عام الحزن، أُسري به فيها من المسجد الحرام إلى المسجد الأقصى ثم عُرج به إلى السماوات العلا. وفيها فُرضت الصلوات الخمس من فوق سبع سماوات، مما يدل على عظيم مكانتها في الدين.',
      practices: 'ليست لها عبادة مخصوصة ثابتة في السنة، لكن كثيراً من المسلمين يحيون ذكراها بالدروس والمحاضرات عن تفاصيل الرحلة ودلالاتها، ومكانة المسجد الأقصى، واستشعار عظمة الصلاة التي فُرضت فيها والمحافظة عليها.',
    },
    en: {
      name: 'Israʾ and Miʿraj',
      what: 'Israʾ and Miʿraj is observed by many Muslims on the 27th of Rajab, commemorating the Prophet’s ﷺ night journey from the Sacred Mosque to al-Aqsa and his ascension through the heavens, during which the five daily prayers were ordained.',
      virtues: 'It was a tremendous miracle with which Allah honoured His Prophet ﷺ after the Year of Sorrow — carried by night from the Sacred Mosque to al-Aqsa, then raised through the heavens. In it the five daily prayers were ordained from above the seven heavens, a sign of their exalted place in the religion.',
      practices: 'No specific ritual is established in the Sunnah for the night, but many Muslims mark it with lessons and lectures on the journey and its meanings, the status of al-Aqsa Mosque, and a renewed appreciation of the prayer that was ordained in it — the best commemoration being to guard the five prayers themselves.',
    },
    ur: {
      name: 'شبِ معراج',
      what: 'شبِ معراج (اسراء و معراج) کو بہت سے مسلمان رجب کی ستائیسویں تاریخ کو مناتے ہیں، جو نبی کریم ﷺ کے مسجدِ حرام سے مسجدِ اقصیٰ تک کے رات کے سفر اور پھر آسمانوں کی طرف عروج کی یاد دلاتی ہے، اسی موقع پر پانچ نمازیں فرض ہوئیں۔',
      virtues: 'یہ وہ عظیم معجزہ ہے جس سے اللہ نے عام الحزن کے بعد اپنے نبی ﷺ کو عزت بخشی — راتوں رات مسجدِ حرام سے مسجدِ اقصیٰ تک لے جایا گیا، پھر آسمانوں کی بلندیوں پر عروج ہوا۔ اسی میں سات آسمانوں کے اوپر سے پانچ نمازیں فرض ہوئیں، جو دین میں نماز کے بلند مقام کی دلیل ہے۔',
      practices: 'اس شب کی کوئی مخصوص عبادت سنت سے ثابت نہیں، لیکن بہت سے مسلمان اسے سفرِ معراج اور اس کے معانی، مسجدِ اقصیٰ کے مقام، اور اس نماز کی عظمت پر دروس و خطبات سے مناتے ہیں جو اسی موقع پر فرض ہوئی — بہترین یاد یہی ہے کہ پانچوں نمازوں کی حفاظت کی جائے۔',
    },
  },
  {
    slug: 'laylat-al-qadr', hm: 9, hd: 27,
    ar: {
      name: 'ليلة القدر',
      what: 'ليلة القدر ليلة مباركة في العشر الأواخر من رمضان، وصفها الله بأنها خير من ألف شهر. يُرجّح أنها في الليلة السابعة والعشرين، ويجتهد المسلمون في العبادة والدعاء التماساً لها في الليالي الوترية.',
      virtues: 'قال تعالى: ﴿ليلة القدر خير من ألف شهر﴾ — فالعمل فيها خير من عبادة أكثر من ثمانين سنة. فيها نزل القرآن، وتتنزّل الملائكة والروح، وهي سلام حتى مطلع الفجر، ومن قامها إيماناً واحتساباً غُفر له ما تقدم من ذنبه.',
      practices: 'يجتهد المسلمون في قيام الليل وتلاوة القرآن وتحرّيها في الليالي الوتر من العشر الأواخر، ويعتكف بعضهم في المساجد كما كان النبي ﷺ يفعل. وأوصى ﷺ عائشة رضي الله عنها بدعاء: «اللهم إنك عفوٌّ تحب العفو فاعفُ عني».',
    },
    en: {
      name: 'Laylat al-Qadr',
      what: 'Laylat al-Qadr is a blessed night in the last ten days of Ramadan, described as better than a thousand months. It is most often sought on the 27th night, and Muslims devote themselves to worship and supplication across the odd nights seeking it.',
      virtues: 'Allah says: "The Night of Decree is better than a thousand months" — worship in it outweighs more than eighty years of devotion. In it the Quran was sent down, the angels and the Spirit descend, it is peace until the break of dawn, and whoever stands it in prayer out of faith and hope is forgiven his past sins.',
      practices: 'Muslims strive in night prayer and Quran recitation, seeking the night among the odd nights of the last ten, and some retreat to the mosque in iʿtikaf as the Prophet ﷺ did. He taught Aisha to say on it: "O Allah, You are Pardoning and love pardon, so pardon me."',
    },
    ur: {
      name: 'شبِ قدر',
      what: 'شبِ قدر رمضان کے آخری عشرے کی ایک بابرکت رات ہے، جسے اللہ نے ہزار مہینوں سے بہتر قرار دیا۔ غالب گمان یہ ہے کہ یہ ستائیسویں شب ہے، اور مسلمان طاق راتوں میں اس کی تلاش میں عبادت اور دعا میں مشغول رہتے ہیں۔',
      virtues: 'اللہ تعالیٰ فرماتا ہے: ﴿شبِ قدر ہزار مہینوں سے بہتر ہے﴾ — اس میں عبادت اسّی سال سے زیادہ کی عبادت پر بھاری ہے۔ اسی میں قرآن نازل ہوا، فرشتے اور روح الامین اترتے ہیں، یہ طلوعِ فجر تک سلامتی ہے، اور جو ایمان و احتساب کے ساتھ اس میں قیام کرے اس کے پچھلے گناہ معاف ہو جاتے ہیں۔',
      practices: 'مسلمان قیام اللیل اور تلاوت میں محنت کرتے ہیں اور آخری عشرے کی طاق راتوں میں اسے تلاش کرتے ہیں؛ بعض نبی کریم ﷺ کی سنت کے مطابق مسجد میں اعتکاف کرتے ہیں۔ آپ ﷺ نے حضرت عائشہ رضی اللہ عنہا کو یہ دعا سکھائی: «اے اللہ! تو معاف کرنے والا ہے، معافی کو پسند کرتا ہے، پس مجھے معاف فرما»۔',
    },
  },
  {
    slug: 'mid-shaban', hm: 8, hd: 15,
    ar: {
      name: 'ليلة النصف من شعبان',
      what: 'ليلة النصف من شعبان هي ليلة الخامس عشر من شهر شعبان، يحييها كثير من المسلمين بالدعاء والذكر والصلاة. وقد وردت في فضلها بعض الأحاديث، واختلف أهل العلم في تخصيصها بعبادة معيّنة، والأصل أنها ليلة مباركة يُستحب فيها الإكثار من الطاعات والاستغفار.',
      virtues: 'ورد في الحديث: «يطّلع الله إلى خلقه في ليلة النصف من شعبان فيغفر لجميع خلقه إلا لمشرك أو مشاحن»، وقد حسّنه جماعة من أهل العلم. وكان النبي ﷺ يُكثر الصيام في شعبان أكثر من أي شهر بعد رمضان.',
      practices: 'يحييها كثيرون بالدعاء والاستغفار وتصفية القلوب من الشحناء التي تمنع المغفرة كما في الحديث. ويصوم بعضهم يوم النصف ضمن الأيام البيض (13 و14 و15)، مع مراعاة أن تخصيصها بعبادات معيّنة محل خلاف بين أهل العلم.',
    },
    en: {
      name: 'Mid-Shaʿban',
      what: 'Mid-Shaʿban (Laylat al-Baraʾah) is the 15th night of the month of Shaʿban, observed by many Muslims with supplication, remembrance and prayer. Scholars have differed over singling it out for specific acts of worship, but it is widely regarded as a blessed night for increasing in good deeds and seeking forgiveness.',
      virtues: 'A hadith — graded sound by a number of scholars — states: "Allah looks upon His creation on the middle night of Shaʿban and forgives them all, except one who associates partners with Him or one who harbours rancour." The Prophet ﷺ also fasted more in Shaʿban than in any month besides Ramadan.',
      practices: 'Many spend it in supplication and seeking forgiveness, and in clearing the heart of the rancour that bars forgiveness per the hadith. Some fast the 15th as one of the three "white days" (13th–15th), while noting that assigning the night specific rituals remains a point of scholarly difference.',
    },
    ur: {
      name: 'شبِ برات',
      what: 'شبِ برات شعبان کے مہینے کی پندرہویں شب ہے، جسے بہت سے مسلمان دعا، ذکر اور نماز کے ساتھ مناتے ہیں۔ علماء کا اس کو کسی مخصوص عبادت کے ساتھ خاص کرنے میں اختلاف رہا ہے، تاہم اسے نیکیوں میں اضافے اور استغفار کے لیے ایک بابرکت شب سمجھا جاتا ہے۔',
      virtues: 'حدیث میں آیا ہے — جسے متعدد اہلِ علم نے حسن قرار دیا: «اللہ شعبان کی پندرہویں شب اپنی مخلوق کی طرف نظر فرماتا ہے اور مشرک اور کینہ رکھنے والے کے سوا سب کو معاف کر دیتا ہے»۔ نبی کریم ﷺ رمضان کے بعد سب سے زیادہ روزے شعبان ہی میں رکھتے تھے۔',
      practices: 'بہت سے لوگ یہ رات دعا اور استغفار میں گزارتے ہیں اور دلوں کو اس کینے سے پاک کرتے ہیں جو حدیث کے مطابق مغفرت سے محروم کرتا ہے۔ بعض پندرہویں کا روزہ ایامِ بیض (13، 14، 15) کے طور پر رکھتے ہیں، تاہم اس شب کو مخصوص عبادات کے ساتھ خاص کرنا اہلِ علم کے درمیان اختلافی مسئلہ ہے۔',
    },
  },
  // ---- Expanded set ----------------------------------------------------------
  {
    slug: 'start-of-rajab', hm: 7, hd: 1,
    ar: {
      name: 'بداية شهر رجب',
      what: 'أول يوم من شهر رجب، أحد الأشهر الحرم الأربعة التي قال الله فيها: ﴿منها أربعة حرم﴾. وهو شهر منفرد بين الأشهر الحرم، إذ يأتي وحده بين جمادى الآخرة وشعبان، بينما تأتي الثلاثة الأخرى متتابعة. وبدخوله يستشعر المسلمون قرب شعبان ثم رمضان.',
      virtues: 'الأشهر الحرم عظّمها الله في كتابه ونهى عن الظلم فيها: ﴿فلا تظلموا فيهن أنفسكم﴾، فالحسنات فيها أعظم أجراً والسيئات أشد وزراً كما قال المفسرون. ورجب مدخل موسم الخيرات الذي يمتد إلى رمضان.',
      practices: 'ليست لأول رجب عبادة مخصوصة ثابتة، لكن كثيراً من المسلمين يجعلونه بداية الاستعداد الروحي لرمضان، فيتعاهدون الصيام التطوعي والقرآن والاستغفار. ويشتهر على الألسنة دعاء: «اللهم بارك لنا في رجب وشعبان وبلّغنا رمضان».',
    },
    en: {
      name: 'Start of Rajab',
      what: 'The first day of Rajab, one of the four sacred months of which Allah said: "of them, four are sacred." Rajab stands alone among them — falling singly between Jumada al-Akhirah and Shaʿban, while the other three run consecutively. Its arrival signals that Shaʿban, and then Ramadan, are drawing near.',
      virtues: 'Allah honoured the sacred months in His Book and forbade wrongdoing in them: "so do not wrong yourselves therein." Good deeds in them carry greater reward and sins a heavier burden, as the exegetes noted — and Rajab opens the season of blessings that extends to Ramadan.',
      practices: 'No specific ritual is established for the first of Rajab, but many Muslims treat it as the start of their spiritual preparation for Ramadan — renewing voluntary fasting, Quran and istighfar. A well-known supplication is often repeated: "O Allah, bless us in Rajab and Shaʿban, and let us reach Ramadan."',
    },
    ur: {
      name: 'ماہِ رجب کا آغاز',
      what: 'رجب کی پہلی تاریخ — یہ ان چار حرمت والے مہینوں میں سے ہے جن کے بارے میں اللہ نے فرمایا: ﴿ان میں سے چار حرمت والے ہیں﴾۔ رجب ان میں منفرد ہے کیونکہ یہ جمادی الثانی اور شعبان کے درمیان اکیلا آتا ہے، جب کہ باقی تین مسلسل آتے ہیں۔ اس کے آنے سے شعبان اور پھر رمضان کی قربت کا احساس ہوتا ہے۔',
      virtues: 'اللہ نے اپنی کتاب میں حرمت والے مہینوں کی عظمت بیان کی اور ان میں ظلم سے منع فرمایا: ﴿پس ان میں اپنے اوپر ظلم نہ کرو﴾۔ مفسرین کے بقول ان میں نیکیوں کا اجر بڑھ جاتا ہے اور گناہوں کا بوجھ بھاری ہو جاتا ہے — اور رجب اُس موسمِ خیر کا دروازہ ہے جو رمضان تک پھیلا ہے۔',
      practices: 'یکم رجب کی کوئی مخصوص عبادت ثابت نہیں، لیکن بہت سے مسلمان اسے رمضان کی روحانی تیاری کا آغاز بناتے ہیں — نفلی روزوں، قرآن اور استغفار کا اہتمام کرتے ہیں۔ زبانوں پر مشہور دعا ہے: «اے اللہ! ہمارے لیے رجب اور شعبان میں برکت دے اور ہمیں رمضان تک پہنچا»۔',
    },
  },
  {
    slug: 'ten-days-of-dhul-hijjah', hm: 12, hd: 1,
    ar: {
      name: 'العشر الأوائل من ذي الحجة',
      what: 'الأيام العشر الأولى من شهر ذي الحجة، وهي أفضل أيام الدنيا على الإطلاق. أقسم الله بها في قوله: ﴿والفجر وليالٍ عشر﴾ عند جمهور المفسرين، وتتوَّج بيوم عرفة في التاسع ثم عيد الأضحى في العاشر، ويتزامن معها موسم الحج.',
      virtues: 'قال النبي ﷺ: «ما من أيام العمل الصالح فيهن أحب إلى الله من هذه الأيام العشر» — حتى فضّلها على الجهاد إلا من خرج بنفسه وماله فلم يرجع بشيء. فهي للعام كما العشر الأواخر لرمضان: ذروة مواسم الأجر.',
      practices: 'يُستحب فيها الإكثار من التكبير والتهليل والتحميد جهراً في الأسواق والبيوت، وصيام التسع الأُوَل أو ما تيسر منها وآكدها يوم عرفة، والصدقة وقراءة القرآن. ومن أراد الأضحية أمسك عن شعره وأظفاره من دخول العشر حتى يضحّي.',
    },
    en: {
      name: 'First Ten Days of Dhul-Hijjah',
      what: 'The first ten days of Dhul-Hijjah are the best days of the entire year. Allah swore by them — "By the dawn, and ten nights" per most exegetes — and they culminate in the Day of Arafah on the 9th and Eid al-Adha on the 10th, coinciding with the Hajj season.',
      virtues: 'The Prophet ﷺ said: "There are no days in which righteous deeds are more beloved to Allah than these ten days" — placing them above even jihad, except for one who goes out with his self and wealth and returns with neither. They are to the year what the last ten nights are to Ramadan: the summit of reward.',
      practices: 'It is recommended to abound in takbir, tahlil and tahmid aloud, to fast the first nine days — or what one can, above all Arafah — and to increase charity and Quran. Whoever intends to offer a sacrifice refrains from cutting hair and nails from the start of the ten days until the sacrifice is made.',
    },
    ur: {
      name: 'ذوالحجہ کا پہلا عشرہ',
      what: 'ذوالحجہ کے پہلے دس دن — یہ سال کے سب سے افضل دن ہیں۔ جمہور مفسرین کے نزدیک اللہ نے انہی کی قسم کھائی: ﴿قسم ہے فجر کی اور دس راتوں کی﴾۔ ان کا نقطۂ عروج نویں تاریخ کو یومِ عرفہ اور دسویں کو عید الاضحیٰ ہے، اور انہی میں حج کا موسم آتا ہے۔',
      virtues: 'نبی کریم ﷺ نے فرمایا: «کوئی دن ایسے نہیں جن میں نیک عمل اللہ کو ان دس دنوں سے زیادہ محبوب ہو» — حتیٰ کہ انہیں جہاد پر بھی فضیلت دی، سوائے اس کے جو جان و مال لے کر نکلے اور کچھ واپس نہ لائے۔ یہ سال کے لیے وہی ہیں جو رمضان کے لیے آخری عشرہ: اجر کے موسموں کی چوٹی۔',
      practices: 'ان دنوں بلند آواز سے تکبیر و تہلیل و تحمید کی کثرت مستحب ہے، پہلے نو دنوں کے روزے — یا جتنے ممکن ہوں، خصوصاً عرفہ کا روزہ — اور صدقہ و تلاوت کا اہتمام۔ جو قربانی کا ارادہ رکھتا ہو وہ عشرہ شروع ہوتے ہی قربانی تک بال اور ناخن نہ کاٹے۔',
    },
  },
  {
    slug: 'day-of-tarwiyah', hm: 12, hd: 8,
    ar: {
      name: 'يوم التروية',
      what: 'يوم التروية هو الثامن من ذي الحجة وأول أيام مناسك الحج، فيه يُحرم الحجاج ويتوجهون إلى منى فيبيتون فيها ليلة التاسع. وسُمّي بالتروية لأن الحجاج كانوا يتروّون فيه من الماء ويسقون ركائبهم استعداداً للوقوف بعرفة.',
      virtues: 'هو بوابة أعظم أيام العام: تنطلق فيه قوافل الحجيج على خطى النبي ﷺ الذي خرج فيه إلى منى فصلى بها الظهر والعصر والمغرب والعشاء وفجر التاسع. وهو من الأيام العشر التي العمل الصالح فيها أحب إلى الله.',
      practices: 'يُحرم الحاج بالحج من مكانه ضحى هذا اليوم ثم يخرج إلى منى فيصلي بها الصلوات الخمس قصراً دون جمع ويبيت بها اقتداءً بالنبي ﷺ. ولغير الحاج يُستحب صيامه ضمن صيام التسع والإكثار من التكبير والذكر.',
    },
    en: {
      name: 'Day of Tarwiyah',
      what: 'The Day of Tarwiyah is the 8th of Dhul-Hijjah and the first day of the Hajj rites: pilgrims enter ihram and set out for Mina, spending there the night before Arafah. It was named Tarwiyah ("watering") because pilgrims would stock up on water for themselves and their mounts in preparation for the standing at Arafah.',
      virtues: 'It is the gateway to the greatest days of the year: the pilgrim caravans set out on it following the Prophet ﷺ, who went to Mina and prayed Dhuhr, Asr, Maghrib, Isha and the next day’s Fajr there. It also lies within the ten days in which righteous deeds are most beloved to Allah.',
      practices: 'The pilgrim assumes ihram for Hajj in the forenoon and proceeds to Mina, shortening the five prayers there without combining them, and spends the night — following the Prophet’s ﷺ example. For non-pilgrims, fasting it among the first nine days and abounding in takbir and remembrance is recommended.',
    },
    ur: {
      name: 'یومِ ترویہ',
      what: 'یومِ ترویہ ذوالحجہ کی آٹھویں تاریخ اور مناسکِ حج کا پہلا دن ہے: حجاج احرام باندھ کر منیٰ روانہ ہوتے ہیں اور عرفہ سے پہلے کی رات وہیں گزارتے ہیں۔ اسے ترویہ ("پانی پلانا") اس لیے کہا گیا کہ حجاج اس دن وقوفِ عرفات کی تیاری میں اپنے اور اپنی سواریوں کے لیے پانی کا ذخیرہ کرتے تھے۔',
      virtues: 'یہ سال کے عظیم ترین دنوں کا دروازہ ہے: اسی دن حجاج کے قافلے نبی کریم ﷺ کے نقشِ قدم پر روانہ ہوتے ہیں، جنہوں نے منیٰ جا کر وہاں ظہر، عصر، مغرب، عشاء اور اگلے دن کی فجر ادا فرمائی۔ یہ ان دس دنوں میں بھی شامل ہے جن میں نیک عمل اللہ کو سب سے زیادہ محبوب ہے۔',
      practices: 'حاجی چاشت کے وقت اپنی جگہ سے حج کا احرام باندھتا ہے، پھر منیٰ جا کر پانچوں نمازیں قصر کے ساتھ (بغیر جمع کیے) ادا کرتا ہے اور رات وہیں گزارتا ہے — نبی کریم ﷺ کی اقتدا میں۔ غیر حاجی کے لیے پہلے نو دنوں کے روزوں میں اس کا روزہ اور تکبیر و ذکر کی کثرت مستحب ہے۔',
    },
  },
  {
    slug: 'days-of-tashriq', hm: 12, hd: 11,
    ar: {
      name: 'أيام التشريق',
      what: 'أيام التشريق هي الحادي عشر والثاني عشر والثالث عشر من ذي الحجة، وتلي مباشرة يوم النحر. يبيت فيها الحجاج بمنى ويرمون الجمرات الثلاث، وهي امتداد لفرحة عيد الأضحى، وسُميت بذلك لأن لحوم الأضاحي كانت تُشرَّق فيها أي تُقدَّد في الشمس.',
      virtues: 'وصفها النبي ﷺ بقوله: «أيام التشريق أيام أكلٍ وشربٍ وذكرٍ لله». وهي من الأيام المعدودات التي قال الله فيها: ﴿واذكروا الله في أيام معدودات﴾، ويحرم صيامها إلا لمن لم يجد هدي التمتع من الحجاج.',
      practices: 'يرمي الحجاج فيها الجمرات الثلاث بعد الزوال ويبيتون بمنى، ولمن تعجّل أن ينفر في اليوم الثاني عشر. ويواصل المسلمون جميعاً التكبير المقيّد عقب الصلوات حتى عصر اليوم الثالث عشر، وتستمر الولائم وتوزيع لحوم الأضاحي وصلة الأرحام.',
    },
    en: {
      name: 'Days of Tashriq',
      what: 'The Days of Tashriq are the 11th, 12th and 13th of Dhul-Hijjah, immediately following the Day of Sacrifice. Pilgrims spend their nights at Mina and stone the three Jamarat, and for everyone they extend the joy of Eid al-Adha. The name refers to the old practice of drying the sacrificial meat in the sun.',
      virtues: 'The Prophet ﷺ described them: "The Days of Tashriq are days of eating, drinking and remembering Allah." They are the "appointed days" of the verse "And remember Allah during appointed days," and fasting them is not permitted — except for a pilgrim who cannot find the tamattuʿ sacrifice.',
      practices: 'Pilgrims stone the three Jamarat after midday and stay overnight at Mina — those who wish to leave early may depart on the 12th. All Muslims continue the takbir after every prayer until Asr of the 13th, while feasts, distribution of sacrificial meat and family visits carry on.',
    },
    ur: {
      name: 'ایامِ تشریق',
      what: 'ایامِ تشریق ذوالحجہ کی گیارہویں، بارہویں اور تیرہویں تاریخیں ہیں، جو یومِ نحر کے فوراً بعد آتی ہیں۔ حجاج ان راتوں میں منیٰ میں قیام کرتے ہیں اور تینوں جمرات کو کنکریاں مارتے ہیں، اور سب کے لیے یہ عید الاضحیٰ کی خوشی کا تسلسل ہیں۔ یہ نام قربانی کے گوشت کو دھوپ میں سکھانے کے پرانے عمل کی طرف اشارہ ہے۔',
      virtues: 'نبی کریم ﷺ نے فرمایا: «ایامِ تشریق کھانے پینے اور اللہ کے ذکر کے دن ہیں»۔ یہی وہ "گنتی کے دن" ہیں جن کا ذکر آیت ﴿اور گنتی کے دنوں میں اللہ کو یاد کرو﴾ میں ہے، اور ان کے روزے جائز نہیں — سوائے اس حاجی کے جسے حجِ تمتع کی قربانی میسر نہ ہو۔',
      practices: 'حجاج زوال کے بعد تینوں جمرات کی رمی کرتے ہیں اور منیٰ میں رات گزارتے ہیں — جلدی جانے والے بارہویں کو روانہ ہو سکتے ہیں۔ تمام مسلمان تیرہویں کی عصر تک ہر نماز کے بعد تکبیرات جاری رکھتے ہیں، اور دعوتیں، قربانی کے گوشت کی تقسیم اور صلہ رحمی جاری رہتی ہے۔',
    },
  },
  {
    slug: 'last-ten-nights-of-ramadan', hm: 9, hd: 21,
    ar: {
      name: 'العشر الأواخر من رمضان',
      what: 'العشر الأواخر من رمضان تبدأ بغروب شمس اليوم العشرين، وهي أعظم ليالي العام، ففيها ليلة القدر التي هي خير من ألف شهر. كان النبي ﷺ يخصّها باجتهاد في العبادة لا يكون في غيرها.',
      virtues: 'قالت عائشة رضي الله عنها: «كان النبي ﷺ إذا دخل العشر شدّ مئزره وأحيا ليله وأيقظ أهله». فيها تُلتمس ليلة القدر في الليالي الوتر، ومن قامها إيماناً واحتساباً غُفر له ما تقدم من ذنبه.',
      practices: 'يُستحب فيها إحياء الليل بالقيام والتهجد وإيقاظ الأهل للعبادة، والاعتكاف في المساجد كما كان النبي ﷺ يعتكف حتى قبضه الله. ويُكثر المسلمون من دعاء «اللهم إنك عفو تحب العفو فاعف عني»، ومن الصدقة وختم القرآن.',
    },
    en: {
      name: 'Last Ten Nights of Ramadan',
      what: 'The last ten nights of Ramadan begin at sunset of the 20th day and are the greatest nights of the year, for among them is Laylat al-Qadr — better than a thousand months. The Prophet ﷺ devoted himself in them to worship as in no other time.',
      virtues: 'Aisha (may Allah be pleased with her) said: "When the last ten began, the Prophet ﷺ would tighten his waist-wrapper, spend the night in worship and wake his family." In them Laylat al-Qadr is sought on the odd nights, and whoever stands it in faith and hope is forgiven his past sins.',
      practices: 'It is recommended to enliven the nights with prayer and tahajjud, to wake one’s family for worship, and to observe iʿtikaf in the mosque as the Prophet ﷺ did until his passing. Muslims abound in the supplication "O Allah, You are Pardoning and love pardon, so pardon me," in charity, and in completing the Quran.',
    },
    ur: {
      name: 'رمضان کا آخری عشرہ',
      what: 'رمضان کا آخری عشرہ بیسویں دن کے غروبِ آفتاب سے شروع ہوتا ہے اور یہ سال کی عظیم ترین راتیں ہیں، کیونکہ انہی میں شبِ قدر ہے جو ہزار مہینوں سے بہتر ہے۔ نبی کریم ﷺ ان میں عبادت کے لیے ایسی محنت فرماتے جو کسی اور وقت نہ ہوتی۔',
      virtues: 'حضرت عائشہ رضی اللہ عنہا فرماتی ہیں: «جب آخری عشرہ شروع ہوتا تو نبی کریم ﷺ کمر کس لیتے، رات کو زندہ کرتے اور گھر والوں کو جگاتے»۔ انہی میں طاق راتوں میں شبِ قدر تلاش کی جاتی ہے، اور جو ایمان و احتساب کے ساتھ اس میں قیام کرے اس کے پچھلے گناہ معاف ہو جاتے ہیں۔',
      practices: 'ان راتوں میں قیام و تہجد سے شب بیداری، گھر والوں کو عبادت کے لیے جگانا، اور مسجد میں اعتکاف مستحب ہے جیسا کہ نبی کریم ﷺ آخر عمر تک کرتے رہے۔ مسلمان «اللهم إنك عفو تحب العفو فاعف عني» کی دعا، صدقے اور قرآن مکمل کرنے کی کثرت کرتے ہیں۔',
    },
  },
  {
    slug: 'six-days-of-shawwal', hm: 10, hd: 2,
    ar: {
      name: 'صيام الست من شوال',
      what: 'صيام ستة أيام من شهر شوال بعد عيد الفطر سنة مستحبة، يبدأ وقتها من ثاني أيام شوال إذ يحرم صيام يوم العيد. ويجوز صيامها متتابعة أو متفرقة في أي وقت من الشهر.',
      virtues: 'قال النبي ﷺ: «من صام رمضان ثم أتبعه ستاً من شوال كان كصيام الدهر» — رواه مسلم. فالحسنة بعشر أمثالها: رمضان بعشرة أشهر والست بشهرين، فتكتمل سنة كاملة من الأجر.',
      practices: 'يصومها المسلمون متتابعة من ثاني العيد أو متفرقة على مدار الشهر، وكلاهما جائز والمسارعة أفضل. ومن كان عليه قضاء من رمضان قدّمه عند جمهور العلماء ثم أتبعه الست، حرصاً على تحصيل الفضل الوارد في الحديث.',
    },
    en: {
      name: 'Six Days of Shawwal',
      what: 'Fasting six days of Shawwal after Eid al-Fitr is a recommended Sunnah. Their time begins on the 2nd of Shawwal — as fasting on Eid day itself is forbidden — and they may be fasted consecutively or spread across the month.',
      virtues: 'The Prophet ﷺ said: "Whoever fasts Ramadan and follows it with six days of Shawwal, it is as if he fasted the whole year" (Muslim). Each good deed counts tenfold: Ramadan equals ten months and the six days two more — completing a full year of reward.',
      practices: 'Muslims fast them consecutively from the day after Eid or spread through the month — both are valid, though hastening is better. Whoever owes missed Ramadan days makes them up first according to most scholars, then follows with the six, so as to fully attain the reward mentioned in the hadith.',
    },
    ur: {
      name: 'شوال کے چھ روزے',
      what: 'عید الفطر کے بعد شوال کے چھ روزے رکھنا مستحب سنت ہے۔ ان کا وقت شوال کی دوسری تاریخ سے شروع ہوتا ہے — کیونکہ عید کے دن روزہ حرام ہے — اور یہ مسلسل یا مہینے میں الگ الگ، دونوں طرح رکھے جا سکتے ہیں۔',
      virtues: 'نبی کریم ﷺ نے فرمایا: «جس نے رمضان کے روزے رکھے پھر ان کے بعد شوال کے چھ روزے رکھے تو گویا اس نے پورے سال کے روزے رکھے» (مسلم)۔ ہر نیکی کا اجر دس گنا ہے: رمضان دس مہینوں کے برابر اور چھ روزے دو مہینوں کے — یوں پورے سال کا اجر مکمل ہو جاتا ہے۔',
      practices: 'مسلمان یہ روزے عید کے اگلے دن سے مسلسل یا پورے مہینے میں الگ الگ رکھتے ہیں — دونوں جائز ہیں، البتہ جلدی کرنا افضل ہے۔ جس کے ذمے رمضان کی قضا ہو وہ جمہور علماء کے نزدیک پہلے قضا کرے پھر چھ روزے رکھے، تاکہ حدیث میں مذکور فضیلت مکمل طور پر حاصل ہو۔',
    },
  },
];

export interface Occurrence { hy: number; date: Date; }

// All occurrences of a Hijri (hm,hd) that land within a given Gregorian year.
export function occurrencesInGYear(hm: number, hd: number, gYear: number): Occurrence[] {
  const approx = Math.round((gYear - 621.5) / 0.970224);
  const out: Occurrence[] = [];
  for (let hy = approx - 2; hy <= approx + 2; hy++) {
    const date = h2g(hy, hm, hd);
    if (date.getUTCFullYear() === gYear) out.push({ hy, date });
  }
  out.sort((a, b) => a.date.getTime() - b.date.getTime());
  return out;
}

export const G_YEAR_START = 2024;
export const G_YEAR_END = 2035;

export function gYears(): number[] {
  const a: number[] = [];
  for (let y = G_YEAR_START; y <= G_YEAR_END; y++) a.push(y);
  return a;
}

// Pick the localized occasion strings.
import { type LangLike, toLang } from './data';
export function occLoc(occ: OccDef, lang: LangLike): OccLoc {
  const l = toLang(lang);
  return l === 'ar' ? occ.ar : l === 'ur' ? occ.ur : occ.en;
}

// ---- formatting helpers ----
import { gMonArr, hMonArr, wdArr, hijriEra } from './data';

export function fmtG(d: Date, lang: LangLike): string {
  const l = toLang(lang);
  const wd = wdArr(l)[d.getUTCDay()];
  const mon = gMonArr(l)[d.getUTCMonth()];
  return l === 'en'
    ? `${wd}, ${d.getUTCDate()} ${mon} ${d.getUTCFullYear()}`
    : `${wd}، ${d.getUTCDate()} ${mon} ${d.getUTCFullYear()}`;
}
export function fmtGShort(d: Date, lang: LangLike): string {
  const mon = gMonArr(lang)[d.getUTCMonth()];
  return `${d.getUTCDate()} ${mon} ${d.getUTCFullYear()}`;
}
export function fmtH(hy: number, hm: number, hd: number, lang: LangLike): string {
  const mon = hMonArr(lang)[hm - 1];
  return `${hd} ${mon} ${hy} ${hijriEra(lang)}`;
}
export function isoUTC(d: Date): string {
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth()+1).padStart(2,'0')}-${String(d.getUTCDate()).padStart(2,'0')}`;
}
export function occBasePath(slug: string, gYear: number, lang: LangLike): string {
  const l = toLang(lang);
  return l === 'ar' ? `/${slug}-${gYear}/` : l === 'ur' ? `/ur/${slug}-${gYear}/` : `/en/${slug}-${gYear}/`;
}
