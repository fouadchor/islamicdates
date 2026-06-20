export const H_MON_AR = ['محرم','صفر','ربيع الأول','ربيع الآخر','جمادى الأولى','جمادى الآخرة','رجب','شعبان','رمضان','شوال','ذو القعدة','ذو الحجة'];
export const H_MON_EN = ['Muharram','Safar','Rabiʿ I','Rabiʿ II','Jumada I','Jumada II','Rajab','Shaʿban','Ramadan','Shawwal','Dhuʾl-Qaʿdah','Dhuʾl-Hijjah'];
export const G_MON_AR = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
export const G_MON_EN = ['January','February','March','April','May','June','July','August','September','October','November','December'];
export const G_SHORT_AR = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
export const G_SHORT_EN = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
export const WD_AR   = ['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
export const WD_EN   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
export const WD_HEAD_AR = ['السبت','الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة'];
export const WD_HEAD_EN = ['Sat','Sun','Mon','Tue','Wed','Thu','Fri'];

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

export const COUNTRIES = [
  { v: 'sa', ar: 'السعودية',        en: 'Saudi Arabia',        umm: true  },
  { v: 'ae', ar: 'الإمارات',        en: 'United Arab Emirates', umm: true  },
  { v: 'qa', ar: 'قطر',             en: 'Qatar',               umm: true  },
  { v: 'jo', ar: 'الأردن / فلسطين', en: 'Jordan / Palestine',  umm: false },
  { v: 'sy', ar: 'سوريا',           en: 'Syria',               umm: false },
];

export const MAJOR_OCC_KEYS = [[9,1],[10,1],[12,10],[1,1],[1,10],[3,12]] as const;

export function getL(ar: boolean) {
  return {
    brand:        ar ? 'التقويم الهجري'                      : 'Hijri Calendar',
    tagline:      ar ? 'التقويم الهجري والميلادي'            : 'Islamic & Gregorian Calendar',
    langBtn:      ar ? 'EN'                                   : 'ع',
    langHref:     ar ? '/en/'                                  : '/',
    today:        ar ? 'تاريخ اليوم'                          : 'Today\'s Date',
    countryLabel: ar ? 'الدولة'                               : 'Region',
    copy:         ar ? 'انسخ تاريخ اليوم'                    : 'Copy today\'s date',
    copied:       ar ? 'تم النسخ ✓'                          : 'Copied ✓',
    shareWa:      ar ? 'شارك عبر واتساب'                      : 'Share on WhatsApp',
    goToday:      ar ? 'اليوم'                                : 'Today',
    converter:    ar ? 'محوّل التاريخ السريع'                  : 'Quick Date Converter',
    g2h:          ar ? 'ميلادي ← هجري'                        : 'Gregorian → Hijri',
    h2g:          ar ? 'هجري ← ميلادي'                        : 'Hijri → Gregorian',
    gregInput:    ar ? 'اختر تاريخاً ميلادياً'                : 'Pick a Gregorian date',
    result:       ar ? 'النتيجة'                               : 'Result',
    day:          ar ? 'اليوم'                                 : 'Day',
    month:        ar ? 'الشهر'                                 : 'Month',
    year:         ar ? 'السنة'                                 : 'Year',
    upcomingTitle:ar ? 'المناسبات الإسلامية القادمة'           : 'Upcoming Islamic occasions',
    occasionsTitle:ar? 'مناسبات هذا الشهر'                    : 'Occasions this month',
    none:         ar ? 'لا توجد مناسبات هذا الشهر'            : 'No occasions this month',
    legend:       ar ? 'دليل الألوان'                          : 'Legend',
    legendToday:  ar ? 'اليوم'                                 : 'Today',
    legendEid:    ar ? 'عيد'                                   : 'Eid',
    legendHoly:   ar ? 'مناسبة دينية'                          : 'Religious day',
    legendRam:    ar ? 'أيام رمضان'                            : 'Ramadan days',
    selectedDay:  ar ? 'اليوم المختار'                         : 'Selected day',
    ad:           ar ? 'مساحة إعلانية'                         : 'Advertisement',
    footer:       ar ? 'الحساب وفق تقويم أم القرى · للأغراض التقريبية' : 'Dates based on the Umm al-Qura calendar · for reference',
    aboutTitle:   ar ? 'عن التقويم الهجري'                    : 'About the Hijri Calendar',
    aboutBody:    ar ? 'موقع التقويم الهجري يعرض التاريخ الهجري اليوم بجانب التاريخ الميلادي للمقارنة، ويتيح تصفّح الأشهر الهجرية شهراً بشهر، وتحويل التواريخ بين الهجري والميلادي بسهولة، مع إبراز المناسبات الإسلامية مثل رمضان وعيد الفطر وعيد الأضحى وعاشوراء، وكل ذلك وفق تقويم أم القرى.'
                      : 'This Hijri calendar shows today\'s Islamic date next to the Gregorian date for easy comparison, lets you browse the Hijri months one by one, convert dates between Hijri and Gregorian, and highlights Islamic occasions such as Ramadan, Eid al-Fitr, Eid al-Adha and Ashura — all based on the Umm al-Qura calendar.',
    faqTitle:     ar ? 'أسئلة شائعة'                          : 'Frequently Asked Questions',
    whatIsTitle:  ar ? 'ما هو التقويم الهجري؟'                : 'What is the Hijri calendar?',
    whatIsBody:   ar ? 'التقويم الهجري تقويم قمري يعتمد على دورة القمر، وتتكوّن السنة فيه من اثني عشر شهراً قمرياً بطول 354 أو 355 يوماً تقريباً، أي أقصر من السنة الميلادية بنحو 11 يوماً. ويبدأ التأريخ به من هجرة النبي محمد ﷺ من مكة إلى المدينة سنة 622 ميلادية.'
                      : 'The Hijri calendar is a lunar calendar based on the moon\'s cycle. Its year has twelve lunar months totaling about 354–355 days — roughly 11 days shorter than the Gregorian year. It counts from the migration (Hijra) of Prophet Muhammad from Mecca to Medina in 622 CE.',
    diffTitle:    ar ? 'ما الفرق بين تقويم أم القرى والتقويم الهجري؟' : 'Umm al-Qura vs. the Hijri calendar',
    diffBody:     ar ? 'تقويم أم القرى هو التقويم الرسمي المعتمد في المملكة العربية السعودية، ويُحسب فلكياً مسبقاً لتنظيم الأمور المدنية. أما بدايات الأشهر الدينية مثل رمضان وشوال وذي الحجة فقد تعتمد في بعض الدول على رؤية الهلال المباشرة، ما قد يؤدي إلى فرق يوم واحد بين الدول.'
                      : 'Umm al-Qura is the official calendar of Saudi Arabia, calculated astronomically in advance for civil use. The start of religious months such as Ramadan, Shawwal and Dhuʾl-Hijjah may instead rely on direct moon sighting in some countries, which can cause a one-day difference between regions.',
    howTitle:     ar ? 'كيف يُحسب التاريخ الهجري؟'           : 'How is the Hijri date calculated?',
    howBody:      ar ? 'يبدأ الشهر القمري بعد اقتران القمر (المحاق)، ويتراوح طوله بين 29 و30 يوماً. يحسب هذا الموقع التواريخ فلكياً وفق معايير تقويم أم القرى لعرضها ومقارنتها بالتقويم الميلادي، وتبقى النتائج تقريبية لأغراض العرض والمقارنة.'
                      : 'A lunar month begins after the new moon (conjunction) and lasts 29 or 30 days. This site computes dates astronomically following the Umm al-Qura standard to display and compare them with the Gregorian calendar; results are approximate, for reference.',
    monthsTitle:  ar ? 'الأشهر الهجرية بالترتيب'              : 'The Hijri months in order',
    faqItems: ar ? [
      { q: 'ما هو التاريخ الهجري اليوم؟',           a: 'يعرض الموقع التاريخ الهجري لليوم تلقائياً في الأعلى بجانب التاريخ الميلادي وفق تقويم أم القرى.' },
      { q: 'كيف أحوّل التاريخ من هجري إلى ميلادي؟', a: 'استخدم محوّل التاريخ السريع: اختر التاريخ الهجري أو الميلادي وسيظهر التاريخ المقابل له فوراً.' },
      { q: 'ما هي الأشهر الهجرية الاثنا عشر؟',      a: 'محرم، صفر، ربيع الأول، ربيع الآخر، جمادى الأولى، جمادى الآخرة، رجب، شعبان، رمضان، شوال، ذو القعدة، ذو الحجة.' },
    ] : [
      { q: 'What is today\'s Hijri date?',             a: 'The site automatically shows today\'s Islamic (Hijri) date at the top, next to the Gregorian date, based on the Umm al-Qura calendar.' },
      { q: 'How do I convert a date from Hijri to Gregorian?', a: 'Use the Quick Date Converter: pick either a Hijri or a Gregorian date and the matching date appears instantly.' },
      { q: 'What are the twelve Hijri months?',        a: 'Muharram, Safar, Rabiʿ I, Rabiʿ II, Jumada I, Jumada II, Rajab, Shaʿban, Ramadan, Shawwal, Dhuʾl-Qaʿdah and Dhuʾl-Hijjah.' },
    ],
  };
}
