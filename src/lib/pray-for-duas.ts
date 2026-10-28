// ─────────────────────────────────────────────────────────────────────────────
// أدعية صفحة «ادعوا لـ…» — للميت، وللأحياء: المريض، والتيسير، والمسافر،
// ومن في كرب، وصاحب الحاجة.
//
// Only supplications with an established source: the Qur'an, Sahih Muslim, the
// two Sahihs, and the Sunan where the hadith is authenticated. Each is stored in
// its masculine and feminine forms, because a family praying for their mother
// should not read «اللهم اغفر له». Where the Prophet ﷺ himself named the person
// he prayed for («اللهم اغفر لأبي سلمة», «اللهم اشفِ سعداً», «اللهم أنجِ
// الوليد») the page puts the family's own name in the same place.
//
// Some established wordings are in the first or second person — Musa's «رَبِّ
// اشْرَحْ لِي صَدْرِي», the istikharah, the farewell «أستودع الله دينك». Those are
// written here in the third person, for someone praying for another, and their
// `when` line says so and quotes the original wording. Nothing is attributed to
// the Prophet ﷺ in a form he did not say. «صلاة الحاجة» is left out on purpose:
// at-Tirmidhi, who narrates it, says its chain is weak.
//
// The Arabic is shown to every reader; English and Urdu readers also get the
// meaning underneath. Source labels come from lib/duas.ts so they match the
// supplications library exactly.
//
// The first supplication of each list is the page's featured one: short enough
// to read in a moment, and carrying the person's name.
// ─────────────────────────────────────────────────────────────────────────────
import type { Lang } from './data';
import { srcLabel, type DuaSrc } from './duas';
import type { Gender, PrayKind } from './pray-for';

type G = { m: string; f: string };
type Tri = { ar: string; en: string; ur: string };

export interface PrayDua {
  id: string;
  ar: G;
  /** Same supplication with {name} in the place the Prophet ﷺ named the person. */
  arNamed?: G;
  en: G;
  enNamed?: G;
  /** Urdu pronouns («ان», «انہیں») do not mark gender, so one form serves both… */
  ur: string;
  /** …unless the wording itself differs for a woman. */
  urF?: string;
  urNamed?: string;
  when: Tri;
  count?: number;
  src: DuaSrc;
}

const FSI = '\u2068';
const PDI = '\u2069';

/**
 * The name, safe to drop into a sentence of the given direction.
 *
 * A Latin name inside an Arabic line (or an Arabic name inside an English one)
 * is otherwise reordered by the bidi algorithm — «لِـAhmad Yusuf،» came out with
 * the comma and the lam on the wrong sides. Unicode isolates (FSI…PDI) keep it
 * one unit. A name already in the sentence's own script is left alone, since
 * format characters could break the cursive join after «لِ».
 */
export function iso(name: string, rtl: boolean): string {
  const foreign = rtl ? /[A-Za-z]/.test(name) : /[\u0590-\u08FF]/.test(name);
  return foreign ? FSI + name + PDI : name;
}

/**
 * «لِـ» + name, spelled as Arabic spells it: «للوالد» not «لالوالد», and joined
 * to an Arabic name; a name in Latin script keeps a visible kashida before it.
 */
export function li(name: string, diacritic = true): string {
  const l = diacritic ? 'لِ' : 'ل';
  if (/^ال/.test(name)) return l + name.slice(1);
  if (/^[\u0600-\u06FF]/.test(name)) return l + name;
  return l + 'ـ' + iso(name, true);
}

const DECEASED: PrayDua[] = [
  {
    id: 'wathila',
    ar: {
      m: 'اللَّهُمَّ إِنَّ فُلَانَ بْنَ فُلَانٍ فِي ذِمَّتِكَ، وَحَبْلِ جِوَارِكَ، فَقِهِ مِنْ فِتْنَةِ الْقَبْرِ وَعَذَابِ النَّارِ، وَأَنْتَ أَهْلُ الْوَفَاءِ وَالْحَقِّ، فَاغْفِرْ لَهُ وَارْحَمْهُ، إِنَّكَ أَنْتَ الْغَفُورُ الرَّحِيمُ',
      f: 'اللَّهُمَّ إِنَّ فُلَانَةَ بِنْتَ فُلَانٍ فِي ذِمَّتِكَ، وَحَبْلِ جِوَارِكَ، فَقِهَا مِنْ فِتْنَةِ الْقَبْرِ وَعَذَابِ النَّارِ، وَأَنْتَ أَهْلُ الْوَفَاءِ وَالْحَقِّ، فَاغْفِرْ لَهَا وَارْحَمْهَا، إِنَّكَ أَنْتَ الْغَفُورُ الرَّحِيمُ',
    },
    arNamed: {
      m: 'اللَّهُمَّ إِنَّ {name} فِي ذِمَّتِكَ، وَحَبْلِ جِوَارِكَ، فَقِهِ مِنْ فِتْنَةِ الْقَبْرِ وَعَذَابِ النَّارِ، وَأَنْتَ أَهْلُ الْوَفَاءِ وَالْحَقِّ، فَاغْفِرْ لَهُ وَارْحَمْهُ، إِنَّكَ أَنْتَ الْغَفُورُ الرَّحِيمُ',
      f: 'اللَّهُمَّ إِنَّ {name} فِي ذِمَّتِكَ، وَحَبْلِ جِوَارِكَ، فَقِهَا مِنْ فِتْنَةِ الْقَبْرِ وَعَذَابِ النَّارِ، وَأَنْتَ أَهْلُ الْوَفَاءِ وَالْحَقِّ، فَاغْفِرْ لَهَا وَارْحَمْهَا، إِنَّكَ أَنْتَ الْغَفُورُ الرَّحِيمُ',
    },
    en: {
      m: 'O Allah, so-and-so son of so-and-so is in Your care and under the protection of Your nearness, so shield him from the trial of the grave and the punishment of the Fire. You are the One who keeps faith and the Truth: forgive him and have mercy on him. You are the Forgiving, the Merciful.',
      f: 'O Allah, so-and-so daughter of so-and-so is in Your care and under the protection of Your nearness, so shield her from the trial of the grave and the punishment of the Fire. You are the One who keeps faith and the Truth: forgive her and have mercy on her. You are the Forgiving, the Merciful.',
    },
    enNamed: {
      m: 'O Allah, {name} is in Your care and under the protection of Your nearness, so shield him from the trial of the grave and the punishment of the Fire. You are the One who keeps faith and the Truth: forgive him and have mercy on him. You are the Forgiving, the Merciful.',
      f: 'O Allah, {name} is in Your care and under the protection of Your nearness, so shield her from the trial of the grave and the punishment of the Fire. You are the One who keeps faith and the Truth: forgive her and have mercy on her. You are the Forgiving, the Merciful.',
    },
    ur: 'اے اللہ! فلاں بن فلاں تیری ذمہ داری اور تیری پناہ میں ہیں، انہیں قبر کی آزمائش اور جہنم کے عذاب سے بچا، تو وفا اور حق والا ہے، پس ان کی مغفرت فرما اور ان پر رحم فرما، بے شک تو بخشنے والا، نہایت رحم والا ہے۔',
    urNamed: 'اے اللہ! {name} تیری ذمہ داری اور تیری پناہ میں ہیں، انہیں قبر کی آزمائش اور جہنم کے عذاب سے بچا، تو وفا اور حق والا ہے، پس ان کی مغفرت فرما اور ان پر رحم فرما، بے شک تو بخشنے والا، نہایت رحم والا ہے۔',
    when: {
      ar: 'دعا به النبي ﷺ في الصلاة على رجل من المسلمين، وسمّاه باسمه',
      en: 'The Prophet ﷺ prayed this over a Muslim man at his funeral, naming him',
      ur: 'نبی ﷺ نے ایک مسلمان کی نمازِ جنازہ میں اس کا نام لے کر یہ دعا فرمائی',
    },
    src: { kind: 'hadith', books: ['abudawud', 'ibnmajah'] },
  },
  {
    // The feminine form leaves out «وَزَوْجًا خَيْرًا مِنْ زَوْجِهَا» (and its
    // meaning in English and Urdu) — a decision of the site's owners, 25 Oct
    // 2026. It is a known point: several scholars hold that the phrase is not
    // said for a woman, since in Paradise she is with her husband from this world.
    id: 'janazah',
    ar: {
      m: 'اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ، وَعَافِهِ وَاعْفُ عَنْهُ، وَأَكْرِمْ نُزُلَهُ، وَوَسِّعْ مُدْخَلَهُ، وَاغْسِلْهُ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ، وَنَقِّهِ مِنَ الْخَطَايَا كَمَا نَقَّيْتَ الثَّوْبَ الْأَبْيَضَ مِنَ الدَّنَسِ، وَأَبْدِلْهُ دَارًا خَيْرًا مِنْ دَارِهِ، وَأَهْلًا خَيْرًا مِنْ أَهْلِهِ، وَزَوْجًا خَيْرًا مِنْ زَوْجِهِ، وَأَدْخِلْهُ الْجَنَّةَ، وَأَعِذْهُ مِنْ عَذَابِ الْقَبْرِ وَمِنْ عَذَابِ النَّارِ',
      f: 'اللَّهُمَّ اغْفِرْ لَهَا وَارْحَمْهَا، وَعَافِهَا وَاعْفُ عَنْهَا، وَأَكْرِمْ نُزُلَهَا، وَوَسِّعْ مُدْخَلَهَا، وَاغْسِلْهَا بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ، وَنَقِّهَا مِنَ الْخَطَايَا كَمَا نَقَّيْتَ الثَّوْبَ الْأَبْيَضَ مِنَ الدَّنَسِ، وَأَبْدِلْهَا دَارًا خَيْرًا مِنْ دَارِهَا، وَأَهْلًا خَيْرًا مِنْ أَهْلِهَا، وَأَدْخِلْهَا الْجَنَّةَ، وَأَعِذْهَا مِنْ عَذَابِ الْقَبْرِ وَمِنْ عَذَابِ النَّارِ',
    },
    en: {
      m: 'O Allah, forgive him and have mercy on him, keep him safe and pardon him. Honour his resting place and make his entrance wide. Wash him with water, snow and hail, and cleanse him of sins as a white garment is cleansed of dirt. Give him a home better than his home, a family better than his family and a spouse better than his spouse. Admit him to Paradise, and protect him from the punishment of the grave and the punishment of the Fire.',
      f: 'O Allah, forgive her and have mercy on her, keep her safe and pardon her. Honour her resting place and make her entrance wide. Wash her with water, snow and hail, and cleanse her of sins as a white garment is cleansed of dirt. Give her a home better than her home and a family better than her family. Admit her to Paradise, and protect her from the punishment of the grave and the punishment of the Fire.',
    },
    ur: 'اے اللہ! ان کی مغفرت فرما اور ان پر رحم فرما، انہیں عافیت دے اور ان سے درگزر فرما، ان کی باعزت مہمانی فرما اور ان کی قبر کشادہ فرما، انہیں پانی، برف اور اولوں سے دھو دے، اور انہیں گناہوں سے ایسے پاک کر دے جیسے سفید کپڑا میل سے پاک کیا جاتا ہے، انہیں ان کے گھر سے بہتر گھر، ان کے گھر والوں سے بہتر گھر والے اور ان کے جوڑے سے بہتر جوڑا عطا فرما، انہیں جنت میں داخل فرما اور عذابِ قبر اور عذابِ جہنم سے بچا۔',
    urF: 'اے اللہ! ان کی مغفرت فرما اور ان پر رحم فرما، انہیں عافیت دے اور ان سے درگزر فرما، ان کی باعزت مہمانی فرما اور ان کی قبر کشادہ فرما، انہیں پانی، برف اور اولوں سے دھو دے، اور انہیں گناہوں سے ایسے پاک کر دے جیسے سفید کپڑا میل سے پاک کیا جاتا ہے، انہیں ان کے گھر سے بہتر گھر اور ان کے گھر والوں سے بہتر گھر والے عطا فرما، انہیں جنت میں داخل فرما اور عذابِ قبر اور عذابِ جہنم سے بچا۔',
    when: {
      ar: 'دعاء النبي ﷺ في صلاة الجنازة',
      en: 'The Prophet’s ﷺ supplication in the funeral prayer',
      ur: 'نمازِ جنازہ میں نبی ﷺ کی دعا',
    },
    src: { kind: 'hadith', books: ['muslim'] },
  },
  {
    id: 'abu-salamah',
    ar: {
      m: 'اللَّهُمَّ اغْفِرْ لَهُ، وَارْفَعْ دَرَجَتَهُ فِي الْمَهْدِيِّينَ، وَاخْلُفْهُ فِي عَقِبِهِ فِي الْغَابِرِينَ، وَاغْفِرْ لَنَا وَلَهُ يَا رَبَّ الْعَالَمِينَ، وَافْسَحْ لَهُ فِي قَبْرِهِ، وَنَوِّرْ لَهُ فِيهِ',
      f: 'اللَّهُمَّ اغْفِرْ لَهَا، وَارْفَعْ دَرَجَتَهَا فِي الْمَهْدِيِّينَ، وَاخْلُفْهَا فِي عَقِبِهَا فِي الْغَابِرِينَ، وَاغْفِرْ لَنَا وَلَهَا يَا رَبَّ الْعَالَمِينَ، وَافْسَحْ لَهَا فِي قَبْرِهَا، وَنَوِّرْ لَهَا فِيهِ',
    },
    arNamed: {
      m: 'اللَّهُمَّ اغْفِرْ {li}، وَارْفَعْ دَرَجَتَهُ فِي الْمَهْدِيِّينَ، وَاخْلُفْهُ فِي عَقِبِهِ فِي الْغَابِرِينَ، وَاغْفِرْ لَنَا وَلَهُ يَا رَبَّ الْعَالَمِينَ، وَافْسَحْ لَهُ فِي قَبْرِهِ، وَنَوِّرْ لَهُ فِيهِ',
      f: 'اللَّهُمَّ اغْفِرْ {li}، وَارْفَعْ دَرَجَتَهَا فِي الْمَهْدِيِّينَ، وَاخْلُفْهَا فِي عَقِبِهَا فِي الْغَابِرِينَ، وَاغْفِرْ لَنَا وَلَهَا يَا رَبَّ الْعَالَمِينَ، وَافْسَحْ لَهَا فِي قَبْرِهَا، وَنَوِّرْ لَهَا فِيهِ',
    },
    en: {
      m: 'O Allah, forgive him and raise his rank among the rightly guided, and be his successor for those he leaves behind. Forgive us and him, Lord of the worlds. Make his grave spacious for him and fill it with light.',
      f: 'O Allah, forgive her and raise her rank among the rightly guided, and be her successor for those she leaves behind. Forgive us and her, Lord of the worlds. Make her grave spacious for her and fill it with light.',
    },
    enNamed: {
      m: 'O Allah, forgive {name} and raise his rank among the rightly guided, and be his successor for those he leaves behind. Forgive us and him, Lord of the worlds. Make his grave spacious for him and fill it with light.',
      f: 'O Allah, forgive {name} and raise her rank among the rightly guided, and be her successor for those she leaves behind. Forgive us and her, Lord of the worlds. Make her grave spacious for her and fill it with light.',
    },
    ur: 'اے اللہ! ان کی مغفرت فرما، ہدایت یافتہ لوگوں میں ان کا درجہ بلند فرما، ان کے پیچھے رہ جانے والوں میں تو ہی ان کا جانشین بن، اے رب العالمین! ہماری اور ان کی مغفرت فرما، ان کی قبر کشادہ فرما اور اسے ان کے لیے منوّر کر دے۔',
    urNamed: 'اے اللہ! {name} کی مغفرت فرما، ہدایت یافتہ لوگوں میں ان کا درجہ بلند فرما، ان کے پیچھے رہ جانے والوں میں تو ہی ان کا جانشین بن، اے رب العالمین! ہماری اور ان کی مغفرت فرما، ان کی قبر کشادہ فرما اور اسے ان کے لیے منوّر کر دے۔',
    when: {
      ar: 'دعا به النبي ﷺ لأبي سلمة حين مات، وسمّاه باسمه',
      en: 'The Prophet ﷺ prayed this for Abu Salamah when he died, naming him',
      ur: 'نبی ﷺ نے ابو سلمہؓ کی وفات پر ان کا نام لے کر یہ دعا فرمائی',
    },
    src: { kind: 'hadith', books: ['muslim'] },
  },
  {
    id: 'al-hashr',
    ar: {
      m: 'رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ وَلَا تَجْعَلْ فِي قُلُوبِنَا غِلًّا لِّلَّذِينَ آمَنُوا رَبَّنَا إِنَّكَ رَءُوفٌ رَّحِيمٌ',
      f: 'رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ وَلَا تَجْعَلْ فِي قُلُوبِنَا غِلًّا لِّلَّذِينَ آمَنُوا رَبَّنَا إِنَّكَ رَءُوفٌ رَّحِيمٌ',
    },
    en: {
      m: 'Our Lord, forgive us and our brothers who went before us in faith, and leave no rancour in our hearts towards those who believe. Our Lord, You are Most Kind, Most Merciful.',
      f: 'Our Lord, forgive us and our brothers who went before us in faith, and leave no rancour in our hearts towards those who believe. Our Lord, You are Most Kind, Most Merciful.',
    },
    ur: 'اے ہمارے رب! ہمیں اور ہمارے ان بھائیوں کو بخش دے جو ہم سے پہلے ایمان لا چکے، اور ہمارے دلوں میں ایمان والوں کے لیے کوئی کینہ نہ رکھ۔ اے ہمارے رب! تو بڑا شفقت کرنے والا، نہایت رحم والا ہے۔',
    when: {
      ar: 'دعاء المؤمنين لمن سبقهم بالإيمان',
      en: 'The believers’ prayer for those who went before them in faith',
      ur: 'پہلے گزر جانے والے اہلِ ایمان کے لیے مومنوں کی دعا',
    },
    src: { kind: 'quran', surah: 59, ayah: '10' },
  },
];

const SICK: PrayDua[] = [
  {
    id: 'sad',
    ar: { m: 'اللَّهُمَّ اشْفِهِ', f: 'اللَّهُمَّ اشْفِهَا' },
    arNamed: { m: 'اللَّهُمَّ اشْفِ {name}', f: 'اللَّهُمَّ اشْفِ {name}' },
    en: { m: 'O Allah, heal him.', f: 'O Allah, heal her.' },
    enNamed: { m: 'O Allah, heal {name}.', f: 'O Allah, heal {name}.' },
    ur: 'اے اللہ! انہیں شفا دے۔',
    urNamed: 'اے اللہ! {name} کو شفا دے۔',
    when: {
      ar: 'كما دعا النبي ﷺ لسعد بن أبي وقاص: «اللهم اشفِ سعداً»',
      en: 'As the Prophet ﷺ prayed for Saʿd ibn Abi Waqqas: “O Allah, heal Saʿd”',
      ur: 'جیسے نبی ﷺ نے سعد بن ابی وقاصؓ کے لیے دعا فرمائی: «اللهم اشفِ سعداً»',
    },
    count: 3,
    src: { kind: 'hadith', books: ['agreed'] },
  },
  {
    id: 'rabb-an-nas',
    ar: {
      m: 'اللَّهُمَّ رَبَّ النَّاسِ، أَذْهِبِ الْبَأْسَ، اشْفِهِ وَأَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا',
      f: 'اللَّهُمَّ رَبَّ النَّاسِ، أَذْهِبِ الْبَأْسَ، اشْفِهَا وَأَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا',
    },
    en: {
      m: 'O Allah, Lord of mankind, take away the harm and heal him — You are the Healer. There is no healing but Your healing, a healing that leaves no illness behind.',
      f: 'O Allah, Lord of mankind, take away the harm and heal her — You are the Healer. There is no healing but Your healing, a healing that leaves no illness behind.',
    },
    ur: 'اے اللہ، لوگوں کے رب! تکلیف دور فرما اور انہیں شفا دے، تو ہی شفا دینے والا ہے، تیری شفا کے سوا کوئی شفا نہیں، ایسی شفا جو کوئی بیماری باقی نہ چھوڑے۔',
    when: {
      ar: 'كان النبي ﷺ يرقي به المريض',
      en: 'The Prophet ﷺ recited this over the sick',
      ur: 'نبی ﷺ یہ دعا پڑھ کر مریض کو دم فرماتے',
    },
    src: { kind: 'hadith', books: ['agreed'] },
  },
  {
    id: 'seven-times',
    ar: {
      m: 'أَسْأَلُ اللَّهَ الْعَظِيمَ، رَبَّ الْعَرْشِ الْعَظِيمِ، أَنْ يَشْفِيَهُ',
      f: 'أَسْأَلُ اللَّهَ الْعَظِيمَ، رَبَّ الْعَرْشِ الْعَظِيمِ، أَنْ يَشْفِيَهَا',
    },
    en: {
      m: 'I ask Allah the Almighty, Lord of the Mighty Throne, to heal him.',
      f: 'I ask Allah the Almighty, Lord of the Mighty Throne, to heal her.',
    },
    ur: 'میں عظمت والے اللہ سے، جو عرشِ عظیم کا رب ہے، سوال کرتا ہوں کہ وہ انہیں شفا دے۔',
    when: {
      ar: 'علّمنا النبي ﷺ أن نقولها عند المريض بلفظ «أن يشفيك»',
      en: 'The Prophet ﷺ taught it to be said at the bedside, as “…to heal you”',
      ur: 'نبی ﷺ نے مریض کے پاس «أن يشفيك» (کہ تمہیں شفا دے) کے الفاظ سے پڑھنے کی تعلیم دی',
    },
    count: 7,
    src: { kind: 'hadith', books: ['abudawud', 'tirmidhi'] },
  },
];

// Before an exam, an interview, an operation day, a hard conversation.
const LA_SAHL: PrayDua = {
  id: 'la-sahl',
  ar: {
    m: 'اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا، وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا',
    f: 'اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا، وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا',
  },
  en: {
    m: 'O Allah, nothing is easy except what You make easy, and You make the difficult easy when You will.',
    f: 'O Allah, nothing is easy except what You make easy, and You make the difficult easy when You will.',
  },
  ur: 'اے اللہ! کوئی چیز آسان نہیں سوائے اس کے جسے تو آسان کر دے، اور تو جب چاہے مشکل کو آسان کر دیتا ہے۔',
  when: {
    ar: 'دعاء تيسير الأمور',
    en: 'For making the difficult easy',
    ur: 'آسانی کی دعا',
  },
  src: { kind: 'hadith', books: ['ibnhibban'] },
};

const EASE: PrayDua[] = [
  {
    id: 'sharh',
    ar: {
      m: 'اللَّهُمَّ اشْرَحْ لَهُ صَدْرَهُ، وَيَسِّرْ لَهُ أَمْرَهُ',
      f: 'اللَّهُمَّ اشْرَحْ لَهَا صَدْرَهَا، وَيَسِّرْ لَهَا أَمْرَهَا',
    },
    arNamed: {
      m: 'اللَّهُمَّ اشْرَحْ صَدْرَ {name}، وَيَسِّرْ لَهُ أَمْرَهُ',
      f: 'اللَّهُمَّ اشْرَحْ صَدْرَ {name}، وَيَسِّرْ لَهَا أَمْرَهَا',
    },
    en: {
      m: 'O Allah, open his heart and make his task easy for him.',
      f: 'O Allah, open her heart and make her task easy for her.',
    },
    enNamed: {
      m: 'O Allah, open the heart of {name} and make his task easy for him.',
      f: 'O Allah, open the heart of {name} and make her task easy for her.',
    },
    ur: 'اے اللہ! ان کا سینہ کھول دے اور ان کا کام آسان فرما۔',
    urNamed: 'اے اللہ! {name} کا سینہ کھول دے اور ان کا کام آسان فرما۔',
    when: {
      ar: 'من دعاء موسى عليه السلام: ﴿رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي﴾، بصيغة الدعاء لغيره',
      en: 'From the prayer of Musa (peace be upon him), “My Lord, open my heart and ease my task for me”, said for someone else',
      ur: 'موسیٰ علیہ السلام کی دعا ﴿رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي﴾ سے، دوسرے کے لیے',
    },
    src: { kind: 'quran', surah: 20, ayah: '25-26' },
  },
  LA_SAHL,
];

const TRAVEL: PrayDua[] = [
  {
    id: 'istawdi',
    ar: {
      m: 'أَسْتَوْدِعُ اللَّهَ دِينَهُ، وَأَمَانَتَهُ، وَخَوَاتِيمَ عَمَلِهِ',
      f: 'أَسْتَوْدِعُ اللَّهَ دِينَهَا، وَأَمَانَتَهَا، وَخَوَاتِيمَ عَمَلِهَا',
    },
    arNamed: {
      m: 'أَسْتَوْدِعُ اللَّهَ دِينَ {name}، وَأَمَانَتَهُ، وَخَوَاتِيمَ عَمَلِهِ',
      f: 'أَسْتَوْدِعُ اللَّهَ دِينَ {name}، وَأَمَانَتَهَا، وَخَوَاتِيمَ عَمَلِهَا',
    },
    en: {
      m: 'I entrust to Allah his faith, his trust, and the final outcome of his deeds.',
      f: 'I entrust to Allah her faith, her trust, and the final outcome of her deeds.',
    },
    enNamed: {
      m: 'I entrust to Allah the faith of {name}, his trust, and the final outcome of his deeds.',
      f: 'I entrust to Allah the faith of {name}, her trust, and the final outcome of her deeds.',
    },
    ur: 'میں ان کا دین، ان کی امانت اور ان کے اعمال کا انجام اللہ کے سپرد کرتا ہوں۔',
    urNamed: 'میں {name} کا دین، ان کی امانت اور ان کے اعمال کا انجام اللہ کے سپرد کرتا ہوں۔',
    when: {
      ar: 'كان النبي ﷺ يودّع به المسافر: «أستودع الله دينك وأمانتك وخواتيم عملك»',
      en: 'The Prophet ﷺ bade travellers farewell with it: “I entrust to Allah your faith, your trust and the final outcome of your deeds”',
      ur: 'نبی ﷺ مسافر کو ان الفاظ سے رخصت فرماتے: «أستودع الله دينك وأمانتك وخواتيم عملك»',
    },
    src: { kind: 'hadith', books: ['abudawud', 'tirmidhi'] },
  },
  {
    // Already in the third person: said of the man, as he walked away.
    id: 'itwi',
    ar: {
      m: 'اللَّهُمَّ اطْوِ لَهُ الْبُعْدَ، وَهَوِّنْ عَلَيْهِ السَّفَرَ',
      f: 'اللَّهُمَّ اطْوِ لَهَا الْبُعْدَ، وَهَوِّنْ عَلَيْهَا السَّفَرَ',
    },
    en: {
      m: 'O Allah, fold up the distance for him and make the journey easy for him.',
      f: 'O Allah, fold up the distance for her and make the journey easy for her.',
    },
    ur: 'اے اللہ! ان کے لیے دوری کو سمیٹ دے اور ان پر سفر آسان فرما۔',
    when: {
      ar: 'دعا به النبي ﷺ لرجل مسافر حين ولّى',
      en: 'The Prophet ﷺ prayed this for a traveller as he set off',
      ur: 'نبی ﷺ نے ایک مسافر کے روانہ ہوتے وقت یہ دعا فرمائی',
    },
    src: { kind: 'hadith', books: ['tirmidhi'] },
  },
  {
    id: 'zawwada',
    ar: {
      m: 'زَوَّدَهُ اللَّهُ التَّقْوَى، وَغَفَرَ ذَنْبَهُ، وَيَسَّرَ لَهُ الْخَيْرَ حَيْثُمَا كَانَ',
      f: 'زَوَّدَهَا اللَّهُ التَّقْوَى، وَغَفَرَ ذَنْبَهَا، وَيَسَّرَ لَهَا الْخَيْرَ حَيْثُمَا كَانَتْ',
    },
    en: {
      m: 'May Allah give him piety as his provision, forgive his sins, and make good easy for him wherever he is.',
      f: 'May Allah give her piety as her provision, forgive her sins, and make good easy for her wherever she is.',
    },
    ur: 'اللہ انہیں تقویٰ کا زادِ راہ عطا فرمائے، ان کے گناہ معاف فرمائے، اور وہ جہاں بھی ہوں ان کے لیے بھلائی آسان فرمائے۔',
    when: {
      ar: 'دعا به النبي ﷺ لرجل أراد السفر، بلفظ «زوّدك الله التقوى…»',
      en: 'The Prophet ﷺ prayed this for a man about to travel, as “May Allah give you piety as provision…”',
      ur: 'نبی ﷺ نے سفر کا ارادہ رکھنے والے ایک شخص کے لیے «زوّدك الله التقوى…» کے الفاظ سے یہ دعا فرمائی',
    },
    src: { kind: 'hadith', books: ['tirmidhi'] },
  },
];

const DISTRESS: PrayDua[] = [
  {
    id: 'anji',
    ar: { m: 'اللَّهُمَّ أَنْجِهِ', f: 'اللَّهُمَّ أَنْجِهَا' },
    arNamed: { m: 'اللَّهُمَّ أَنْجِ {name}', f: 'اللَّهُمَّ أَنْجِ {name}' },
    en: { m: 'O Allah, deliver him.', f: 'O Allah, deliver her.' },
    enNamed: { m: 'O Allah, deliver {name}.', f: 'O Allah, deliver {name}.' },
    ur: 'اے اللہ! انہیں نجات دے۔',
    urNamed: 'اے اللہ! {name} کو نجات دے۔',
    when: {
      ar: 'كما دعا النبي ﷺ في القنوت للمستضعفين بمكة بأسمائهم: «اللهم أنجِ الوليد بن الوليد…»',
      en: 'As the Prophet ﷺ prayed in the qunut for the oppressed believers in Makkah, naming them: “O Allah, deliver al-Walid ibn al-Walid…”',
      ur: 'جیسے نبی ﷺ نے قنوت میں مکہ کے کمزور مسلمانوں کے لیے ان کے نام لے کر دعا فرمائی: «اللهم أنجِ الوليد بن الوليد…»',
    },
    src: { kind: 'hadith', books: ['agreed'] },
  },
  {
    id: 'rahmataka',
    ar: {
      m: 'اللَّهُمَّ رَحْمَتَكَ نَرْجُو، فَلَا تَكِلْهُ إِلَى نَفْسِهِ طَرْفَةَ عَيْنٍ، وَأَصْلِحْ لَهُ شَأْنَهُ كُلَّهُ، لَا إِلَهَ إِلَّا أَنْتَ',
      f: 'اللَّهُمَّ رَحْمَتَكَ نَرْجُو، فَلَا تَكِلْهَا إِلَى نَفْسِهَا طَرْفَةَ عَيْنٍ، وَأَصْلِحْ لَهَا شَأْنَهَا كُلَّهُ، لَا إِلَهَ إِلَّا أَنْتَ',
    },
    arNamed: {
      m: 'اللَّهُمَّ رَحْمَتَكَ نَرْجُو، فَلَا تَكِلْ {name} إِلَى نَفْسِهِ طَرْفَةَ عَيْنٍ، وَأَصْلِحْ لَهُ شَأْنَهُ كُلَّهُ، لَا إِلَهَ إِلَّا أَنْتَ',
      f: 'اللَّهُمَّ رَحْمَتَكَ نَرْجُو، فَلَا تَكِلْ {name} إِلَى نَفْسِهَا طَرْفَةَ عَيْنٍ، وَأَصْلِحْ لَهَا شَأْنَهَا كُلَّهُ، لَا إِلَهَ إِلَّا أَنْتَ',
    },
    en: {
      m: 'O Allah, it is Your mercy we hope for: do not leave him to himself for the blink of an eye, and set right all his affairs. There is no god but You.',
      f: 'O Allah, it is Your mercy we hope for: do not leave her to herself for the blink of an eye, and set right all her affairs. There is no god but You.',
    },
    enNamed: {
      m: 'O Allah, it is Your mercy we hope for: do not leave {name} to himself for the blink of an eye, and set right all his affairs. There is no god but You.',
      f: 'O Allah, it is Your mercy we hope for: do not leave {name} to herself for the blink of an eye, and set right all her affairs. There is no god but You.',
    },
    ur: 'اے اللہ! ہم تیری ہی رحمت کے امیدوار ہیں، انہیں پلک جھپکنے کے برابر بھی ان کے نفس کے حوالے نہ کر، اور ان کے سارے کام درست فرما دے، تیرے سوا کوئی معبود نہیں۔',
    urNamed: 'اے اللہ! ہم تیری ہی رحمت کے امیدوار ہیں، {name} کو پلک جھپکنے کے برابر بھی ان کے نفس کے حوالے نہ کر، اور ان کے سارے کام درست فرما دے، تیرے سوا کوئی معبود نہیں۔',
    when: {
      ar: 'من دعوات المكروب التي علّمها النبي ﷺ، بصيغة الدعاء لغيره',
      en: 'From the supplications for the distressed that the Prophet ﷺ taught, said for someone else',
      ur: 'نبی ﷺ کی سکھائی ہوئی پریشان حال کی دعاؤں میں سے، دوسرے کے لیے',
    },
    src: { kind: 'hadith', books: ['abudawud'] },
  },
  {
    id: 'karb',
    ar: {
      m: 'لَا إِلَهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمُ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ السَّمَاوَاتِ وَرَبُّ الْأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيمِ',
      f: 'لَا إِلَهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمُ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ السَّمَاوَاتِ وَرَبُّ الْأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيمِ',
    },
    en: {
      m: 'There is no god but Allah, the Almighty, the Forbearing. There is no god but Allah, Lord of the Mighty Throne. There is no god but Allah, Lord of the heavens, Lord of the earth and Lord of the Noble Throne.',
      f: 'There is no god but Allah, the Almighty, the Forbearing. There is no god but Allah, Lord of the Mighty Throne. There is no god but Allah, Lord of the heavens, Lord of the earth and Lord of the Noble Throne.',
    },
    ur: 'اللہ کے سوا کوئی معبود نہیں جو عظمت والا، بردبار ہے۔ اللہ کے سوا کوئی معبود نہیں جو عرشِ عظیم کا رب ہے۔ اللہ کے سوا کوئی معبود نہیں جو آسمانوں کا رب، زمین کا رب اور عرشِ کریم کا رب ہے۔',
    when: {
      ar: 'دعاء الكرب، كان النبي ﷺ يقوله عند الكرب',
      en: 'The supplication of distress, which the Prophet ﷺ said in times of distress',
      ur: 'کرب کی دعا، جو نبی ﷺ تکلیف کے وقت پڑھتے',
    },
    src: { kind: 'hadith', books: ['agreed'] },
  },
];

// A need the family would rather not name — a debt, something at home. The
// page asks for good without saying what it is.
const NEED: PrayDua[] = [
  {
    id: 'khayr',
    ar: {
      m: 'اللَّهُمَّ اقْدُرْ لَهُ الْخَيْرَ حَيْثُ كَانَ، ثُمَّ أَرْضِهِ بِهِ',
      f: 'اللَّهُمَّ اقْدُرْ لَهَا الْخَيْرَ حَيْثُ كَانَ، ثُمَّ أَرْضِهَا بِهِ',
    },
    arNamed: {
      m: 'اللَّهُمَّ اقْدُرْ {li} الْخَيْرَ حَيْثُ كَانَ، ثُمَّ أَرْضِهِ بِهِ',
      f: 'اللَّهُمَّ اقْدُرْ {li} الْخَيْرَ حَيْثُ كَانَ، ثُمَّ أَرْضِهَا بِهِ',
    },
    en: {
      m: 'O Allah, decree good for him wherever it may be, then make him content with it.',
      f: 'O Allah, decree good for her wherever it may be, then make her content with it.',
    },
    enNamed: {
      m: 'O Allah, decree good for {name} wherever it may be, then make him content with it.',
      f: 'O Allah, decree good for {name} wherever it may be, then make her content with it.',
    },
    ur: 'اے اللہ! ان کے لیے بھلائی مقدر فرما جہاں بھی ہو، پھر انہیں اس پر راضی کر دے۔',
    urNamed: 'اے اللہ! {name} کے لیے بھلائی مقدر فرما جہاں بھی ہو، پھر انہیں اس پر راضی کر دے۔',
    when: {
      ar: 'من دعاء الاستخارة: «واقدُر لي الخير حيث كان، ثم أرضني به»، بصيغة الدعاء لغيره',
      en: 'From the istikharah supplication — “decree good for me wherever it may be, then make me content with it” — said for someone else',
      ur: 'دعائے استخارہ کے الفاظ «واقدر لي الخير حيث كان ثم أرضني به» سے، دوسرے کے لیے',
    },
    src: { kind: 'hadith', books: ['bukhari'] },
  },
  {
    id: 'hasanah',
    ar: {
      m: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
      f: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    },
    en: {
      m: 'Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.',
      f: 'Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.',
    },
    ur: 'اے ہمارے رب! ہمیں دنیا میں بھی بھلائی دے اور آخرت میں بھی بھلائی دے، اور ہمیں آگ کے عذاب سے بچا۔',
    when: {
      ar: 'أكثر ما كان النبي ﷺ يدعو به، كما في الصحيحين',
      en: 'The supplication the Prophet ﷺ made most often, as al-Bukhari and Muslim report',
      ur: 'وہ دعا جو نبی ﷺ سب سے زیادہ مانگتے تھے، جیسا کہ بخاری و مسلم میں ہے',
    },
    src: { kind: 'quran', surah: 2, ayah: '201' },
  },
  LA_SAHL,
];

export const PRAY_DUAS: Record<PrayKind, PrayDua[]> = {
  deceased: DECEASED,
  sick: SICK,
  ease: EASE,
  travel: TRAVEL,
  distress: DISTRESS,
  need: NEED,
};

export interface RenderedDua {
  id: string;
  text: string;
  /** Meaning in the reader's language — null on the Arabic page. */
  meaning: string | null;
  when: string;
  count?: number;
  src: string;
}

/** Ready to print: right gender, the family's name in place where one is given. */
export function renderDuas(kind: PrayKind, gender: Gender, lang: Lang, name: string | null): RenderedDua[] {
  const fill = (s: string, rtl: boolean) => (name ? s.replace('{li}', li(name)).replace('{name}', iso(name, rtl)) : s);
  return PRAY_DUAS[kind].map((d) => {
    const ar = name && d.arNamed ? fill(d.arNamed[gender], true) : d.ar[gender];
    const meaning =
      lang === 'ar'
        ? null
        : lang === 'ur'
          ? name && d.urNamed ? fill(d.urNamed, true) : (gender === 'f' && d.urF) || d.ur
          : name && d.enNamed ? fill(d.enNamed[gender], false) : d.en[gender];
    return {
      id: d.id,
      text: ar,
      meaning,
      when: lang === 'ar' ? d.when.ar : lang === 'ur' ? d.when.ur : d.when.en,
      count: d.count,
      src: srcLabel(d.src, lang),
    };
  });
}

/**
 * One line of supplication that travels inside the shared message itself, so
 * that whoever reads it in the group has prayed even if they never open the link.
 * Each is the wording of an authentic narration — with the family's name where
 * the Prophet ﷺ named the person, and in the third person where the original
 * is a prayer for oneself (the istikharah line for a need).
 */
export function shareDua(kind: PrayKind, gender: Gender, name: string): string {
  const f = gender === 'f';
  switch (kind) {
    case 'sick':
      return `اللَّهُمَّ اشْفِ ${iso(name, true)}`;
    case 'distress':
      return `اللَّهُمَّ أَنْجِ ${iso(name, true)}`;
    case 'ease':
      return 'اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا';
    case 'travel':
      return f ? 'اللَّهُمَّ اطْوِ لَهَا الْبُعْدَ، وَهَوِّنْ عَلَيْهَا السَّفَرَ' : 'اللَّهُمَّ اطْوِ لَهُ الْبُعْدَ، وَهَوِّنْ عَلَيْهِ السَّفَرَ';
    case 'need':
      return f ? 'اللَّهُمَّ اقْدُرْ لَهَا الْخَيْرَ حَيْثُ كَانَ، ثُمَّ أَرْضِهَا بِهِ' : 'اللَّهُمَّ اقْدُرْ لَهُ الْخَيْرَ حَيْثُ كَانَ، ثُمَّ أَرْضِهِ بِهِ';
    default:
      return f ? 'اللَّهُمَّ اغْفِرْ لَهَا وَارْحَمْهَا' : 'اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ';
  }
}
