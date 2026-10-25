// ─────────────────────────────────────────────────────────────────────────────
// أدعية صفحة «ادعوا لـ…» — للميت وللمريض.
//
// Only supplications with an established source: the Qur'an, Sahih Muslim, the
// two Sahihs, and the Sunan where the hadith is authenticated. Each is stored in
// its masculine and feminine forms, because a family praying for their mother
// should not read «اللهم اغفر له». Where the Prophet ﷺ himself named the person
// he prayed for («اللهم اغفر لأبي سلمة», «اللهم اشفِ سعداً») the page puts the
// family's own name in the same place.
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

export const PRAY_DUAS: Record<PrayKind, PrayDua[]> = { deceased: DECEASED, sick: SICK };

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
 * Each is the exact wording of an authentic narration.
 */
export function shareDua(kind: PrayKind, gender: Gender, name: string): string {
  if (kind === 'sick') return `اللَّهُمَّ اشْفِ ${iso(name, true)}`;
  return gender === 'f' ? 'اللَّهُمَّ اغْفِرْ لَهَا وَارْحَمْهَا' : 'اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ';
}
