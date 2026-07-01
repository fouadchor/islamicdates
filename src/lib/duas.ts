// Authentic supplications (أدعية وأذكار) sourced from the Quran and the Sunnah
// (Sahih hadith collections, in the manner of Hisn al-Muslim). Build-time data.
import { type LangLike, toLang } from './data';

type Tri = { ar: string; en: string; ur: string };

export interface DuaSrc {
  kind: 'quran' | 'hadith';
  surah?: number;   // for quran
  ayah?: string;    // for quran, e.g. "201" or "285-286"
  books?: string[]; // for hadith, collection keys (see BOOKS)
}

export interface Dua {
  ar: string;       // the supplication text (Arabic) — may contain line breaks
  count?: number;   // repetition count
  when?: Tri;       // optional context label (e.g. "before sleeping")
  src: DuaSrc;
}

export interface DuaSection {
  id: string;
  title: Tri;
  intro: Tri;
  items: Dua[];
}

// Hadith collections (plain names; Arabic prefixes "رواه" added at render time).
const BOOKS: Record<string, Tri> = {
  agreed:    { ar: 'متفق عليه',  en: 'Bukhari & Muslim',  ur: 'متفق علیہ' },
  bukhari:   { ar: 'البخاري',    en: 'Sahih al-Bukhari',  ur: 'صحیح بخاری' },
  muslim:    { ar: 'مسلم',       en: 'Sahih Muslim',      ur: 'صحیح مسلم' },
  abudawud:  { ar: 'أبو داود',   en: 'Abu Dawud',         ur: 'سنن ابی داؤد' },
  tirmidhi:  { ar: 'الترمذي',    en: 'at-Tirmidhi',       ur: 'جامع ترمذی' },
  nasai:     { ar: 'النسائي',    en: 'an-Nasaʾi',         ur: 'سنن نسائی' },
  ibnmajah:  { ar: 'ابن ماجه',   en: 'Ibn Majah',         ur: 'سنن ابن ماجہ' },
  ahmad:     { ar: 'أحمد',       en: 'Ahmad',             ur: 'مسند احمد' },
  ibnhibban: { ar: 'ابن حبان',   en: 'Ibn Hibban',        ur: 'صحیح ابن حبان' },
  hakim:     { ar: 'الحاكم',     en: 'al-Hakim',          ur: 'مستدرک حاکم' },
};

// Surah names (only those referenced below).
const SURAHS: Record<number, Tri> = {
  2:  { ar: 'البقرة',    en: 'al-Baqarah',  ur: 'البقرہ' },
  3:  { ar: 'آل عمران',  en: 'Aal ʿImran',  ur: 'آلِ عمران' },
  7:  { ar: 'الأعراف',   en: 'al-Aʿraf',    ur: 'الاعراف' },
  14: { ar: 'إبراهيم',   en: 'Ibrahim',     ur: 'ابراہیم' },
  17: { ar: 'الإسراء',   en: 'al-Isra',     ur: 'بنی اسرائیل' },
  18: { ar: 'الكهف',     en: 'al-Kahf',     ur: 'الکہف' },
  20: { ar: 'طه',        en: 'Ta-Ha',       ur: 'طٰہٰ' },
  21: { ar: 'الأنبياء',  en: 'al-Anbiyaʾ',  ur: 'الانبیاء' },
  23: { ar: 'المؤمنون',  en: 'al-Muʾminun', ur: 'المؤمنون' },
  25: { ar: 'الفرقان',   en: 'al-Furqan',   ur: 'الفرقان' },
  28: { ar: 'القصص',     en: 'al-Qasas',    ur: 'القصص' },
  46: { ar: 'الأحقاف',   en: 'al-Ahqaf',    ur: 'الاحقاف' },
};

const pickTri = (t: Tri, l: 'ar' | 'en' | 'ur') => (l === 'ar' ? t.ar : l === 'ur' ? t.ur : t.en);

// Build the localized source/reference label for a supplication.
export function srcLabel(src: DuaSrc, lang: LangLike): string {
  const l = toLang(lang);
  if (src.kind === 'quran') {
    const name = pickTri(SURAHS[src.surah!], l);
    if (l === 'en') return `Quran — ${name} ${src.surah}:${src.ayah}`;
    if (l === 'ur') return `سورۃ ${name} — آیت ${src.ayah}`;
    return `سورة ${name} — الآية ${src.ayah}`;
  }
  const keys = src.books!;
  if (keys.length === 1 && keys[0] === 'agreed') return pickTri(BOOKS.agreed, l);
  const names = keys.map(k => pickTri(BOOKS[k], l));
  if (l === 'en') return `Narrated in ${names.join(' & ')}`;
  if (l === 'ur') return `${names.join(' و ')} میں مروی`;
  return `رواه ${names.join(' و ')}`;
}

export const DUA_SECTIONS: DuaSection[] = [
  // ───────────────────────── 1. Morning & Evening ─────────────────────────
  {
    id: 'morning-evening',
    title: { ar: 'أذكار الصباح والمساء', en: 'Morning & Evening Remembrances', ur: 'صبح و شام کے اذکار' },
    intro: {
      ar: 'أذكار ثابتة عن النبي ﷺ تُقال في الصباح بعد الفجر وفي المساء بعد العصر، فيها حفظٌ وحصنٌ للمسلم.',
      en: 'Remembrances established from the Prophet ﷺ, recited in the morning after Fajr and in the evening after ʿAsr — a protection and fortress for the believer.',
      ur: 'نبی کریم ﷺ سے ثابت اذکار، جو صبح فجر کے بعد اور شام عصر کے بعد پڑھے جاتے ہیں — مومن کے لیے حفاظت اور قلعہ۔',
    },
    items: [
      {
        ar: 'اللّهُمَّ أَنْتَ رَبِّي لا إِلَهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي، فَإِنَّهُ لا يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ',
        when: { ar: 'سيد الاستغفار — صباحاً ومساءً', en: 'The chief of seeking forgiveness — morning & evening', ur: 'سید الاستغفار — صبح و شام' },
        src: { kind: 'hadith', books: ['bukhari'] },
      },
      {
        ar: 'اللَّهُ لا إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ ۚ لا تَأْخُذُهُ سِنَةٌ وَلا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلاَّ بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلاَّ بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
        when: { ar: 'آية الكرسي — مرة', en: 'Ayat al-Kursi — once', ur: 'آیت الکرسی — ایک بار' },
        src: { kind: 'quran', surah: 2, ayah: '255' },
      },
      {
        ar: 'قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ\n﴿وسورتا الفلق والناس﴾',
        count: 3,
        when: { ar: 'المعوذات — ثلاث مرات', en: 'The three protective surahs — three times', ur: 'تین معوذات — تین بار' },
        src: { kind: 'hadith', books: ['abudawud', 'tirmidhi'] },
      },
      {
        ar: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لا إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ',
        when: { ar: 'وفي المساء: أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ…', en: 'In the evening begin with: “Amsaynā wa amsa-l-mulku lillāh…”', ur: 'شام میں: امسینا و امسی الملک للہ…' },
        src: { kind: 'hadith', books: ['muslim'] },
      },
      {
        ar: 'اللّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ',
        when: { ar: 'وفي المساء: …وَإِلَيْكَ الْمَصِيرُ', en: 'In the evening end with: “…wa ilayka-l-maṣīr”', ur: 'شام میں: …و الیک المصیر' },
        src: { kind: 'hadith', books: ['tirmidhi'] },
      },
      {
        ar: 'اللّهُمَّ عَافِنِي فِي بَدَنِي، اللّهُمَّ عَافِنِي فِي سَمْعِي، اللّهُمَّ عَافِنِي فِي بَصَرِي، لا إِلَهَ إِلاَّ أَنْتَ',
        when: { ar: 'دعاء العافية في البدن', en: 'Well-being in body, hearing & sight', ur: 'بدن، سماعت و بصارت کی عافیت' },
        count: 3,
        src: { kind: 'hadith', books: ['abudawud'] },
      },
      {
        ar: 'حَسْبِيَ اللَّهُ لا إِلَهَ إِلاَّ هُوَ، عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ',
        when: { ar: 'حَسْبِيَ الله — كفاية وتوكّل', en: 'Allah suffices me — reliance', ur: 'اللہ کافی ہے — توکل' },
        count: 7,
        src: { kind: 'hadith', books: ['abudawud'] },
      },
      {
        ar: 'بِسْمِ اللَّهِ الَّذِي لا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
        when: { ar: 'التحصّن باسم الله', en: 'Protection by Allah’s name', ur: 'اللہ کے نام سے حفاظت' },
        count: 3,
        src: { kind: 'hadith', books: ['abudawud', 'tirmidhi'] },
      },
      {
        ar: 'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلامِ دِينًا، وَبِمُحَمَّدٍ ﷺ نَبِيًّا',
        when: { ar: 'الرضا بالله ربًّا', en: 'Contentment with Allah as Lord', ur: 'اللہ کے رب ہونے پر رضا' },
        count: 3,
        src: { kind: 'hadith', books: ['abudawud', 'ahmad'] },
      },
      {
        ar: 'اللّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ، اللّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي',
        when: { ar: 'سؤال العفو والعافية', en: 'Asking for pardon & well-being', ur: 'عفو و عافیت کا سوال' },
        src: { kind: 'hadith', books: ['abudawud', 'ibnmajah'] },
      },
      {
        ar: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
        when: { ar: 'التسبيح بحمد الله', en: 'Glorifying & praising Allah', ur: 'اللہ کی تسبیح و حمد' },
        count: 100,
        src: { kind: 'hadith', books: ['agreed'] },
      },
      {
        ar: 'لا إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
        when: { ar: 'التهليل وتوحيد الله', en: 'Declaring Allah’s oneness', ur: 'توحید کا کلمہ' },
        count: 10,
        src: { kind: 'hadith', books: ['agreed'] },
      },
    ],
  },

  // ───────────────────────── 2. Quranic supplications ─────────────────────────
  {
    id: 'quran',
    title: { ar: 'أدعية من القرآن الكريم', en: 'Supplications from the Quran', ur: 'قرآن کریم سے دعائیں' },
    intro: {
      ar: 'أدعية جامعة وردت في كتاب الله على لسان الأنبياء والصالحين، يدعو بها المسلم في كل وقت.',
      en: 'Comprehensive supplications found in the Book of Allah on the tongues of the prophets and the righteous — to be recited at any time.',
      ur: 'اللہ کی کتاب میں انبیاء اور صالحین کی زبان پر آنے والی جامع دعائیں، جو ہر وقت پڑھی جا سکتی ہیں۔',
    },
    items: [
      { ar: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ', when: { ar: 'دعاء خير الدنيا والآخرة', en: 'Good in this world & the next', ur: 'دنیا و آخرت کی بھلائی' }, src: { kind: 'quran', surah: 2, ayah: '201' } },
      { ar: 'رَبَّنَا لا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا ۚ رَبَّنَا وَلا تُحَمِّلْنَا مَا لا طَاقَةَ لَنَا بِهِ ۖ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا ۚ أَنتَ مَوْلانَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ', when: { ar: 'خواتيم سورة البقرة', en: 'The closing verses of al-Baqarah', ur: 'سورۃ البقرہ کی آخری آیات' }, src: { kind: 'quran', surah: 2, ayah: '286' } },
      { ar: 'رَبَّنَا لا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً ۚ إِنَّكَ أَنتَ الْوَهَّابُ', when: { ar: 'دعاء الثبات على الهدى', en: 'Steadfastness upon guidance', ur: 'ہدایت پر ثابت قدمی' }, src: { kind: 'quran', surah: 3, ayah: '8' } },
      { ar: 'رَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا وَإِسْرَافَنَا فِي أَمْرِنَا وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ', when: { ar: 'دعاء المغفرة والنصر', en: 'Forgiveness & victory', ur: 'مغفرت اور نصرت' }, src: { kind: 'quran', surah: 3, ayah: '147' } },
      { ar: 'رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ', when: { ar: 'دعاء آدم ﷺ — الاعتراف بالذنب', en: 'The prayer of Adam ﷺ', ur: 'آدم علیہ السلام کی دعا' }, src: { kind: 'quran', surah: 7, ayah: '23' } },
      { ar: 'رَبِّ اجْعَلْنِي مُقِيمَ الصَّلاةِ وَمِن ذُرِّيَّتِي ۚ رَبَّنَا وَتَقَبَّلْ دُعَاءِ ۝ رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ', when: { ar: 'دعاء إبراهيم ﷺ — إقامة الصلاة', en: 'Ibrahim’s ﷺ prayer for ṣalāh', ur: 'ابراہیم علیہ السلام کی دعا' }, src: { kind: 'quran', surah: 14, ayah: '40-41' } },
      { ar: 'رَبِّ اشْرَحْ لِي صَدْرِي ۝ وَيَسِّرْ لِي أَمْرِي ۝ وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي ۝ يَفْقَهُوا قَوْلِي', when: { ar: 'دعاء موسى ﷺ — شرح الصدر', en: 'Musa’s ﷺ prayer — opening the heart', ur: 'موسیٰ علیہ السلام کی دعا' }, src: { kind: 'quran', surah: 20, ayah: '25-28' } },
      { ar: 'رَّبِّ زِدْنِي عِلْمًا', when: { ar: 'دعاء طلب العلم', en: 'Prayer for increase in knowledge', ur: 'علم میں اضافہ کی دعا' }, src: { kind: 'quran', surah: 20, ayah: '114' } },
      { ar: 'لا إِلَهَ إِلاَّ أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ', when: { ar: 'دعاء يونس ﷺ — ذي النون', en: 'The prayer of Yunus ﷺ (Dhun-Nun)', ur: 'یونس علیہ السلام کی دعا' }, src: { kind: 'quran', surah: 21, ayah: '87' } },
      { ar: 'رَّبِّ أَعُوذُ بِكَ مِنْ هَمَزَاتِ الشَّيَاطِينِ ۝ وَأَعُوذُ بِكَ رَبِّ أَن يَحْضُرُونِ', when: { ar: 'الاستعاذة من همزات الشياطين', en: 'Refuge from the whispers of devils', ur: 'شیطانی وسوسوں سے پناہ' }, src: { kind: 'quran', surah: 23, ayah: '97-98' } },
      { ar: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا', when: { ar: 'دعاء صلاح الأهل والذرية', en: 'Prayer for a righteous family', ur: 'نیک اہل و اولاد کی دعا' }, src: { kind: 'quran', surah: 25, ayah: '74' } },
      { ar: 'رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ', when: { ar: 'دعاء موسى ﷺ — طلب الرزق', en: 'Musa’s ﷺ prayer for provision', ur: 'موسیٰ علیہ السلام کی رزق کی دعا' }, src: { kind: 'quran', surah: 28, ayah: '24' } },
      { ar: 'رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَى وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَصْلِحْ لِي فِي ذُرِّيَّتِي ۖ إِنِّي تُبْتُ إِلَيْكَ وَإِنِّي مِنَ الْمُسْلِمِينَ', when: { ar: 'دعاء الشكر وبرّ الوالدين', en: 'Gratitude & kindness to parents', ur: 'شکر اور والدین کے ساتھ احسان' }, src: { kind: 'quran', surah: 46, ayah: '15' } },
    ],
  },

  // ───────────────────────── 3. Distress, anxiety & hardship ─────────────────────────
  {
    id: 'distress',
    title: { ar: 'أدعية الكرب والهمّ والشدّة', en: 'Supplications for Distress & Hardship', ur: 'پریشانی، غم اور تنگی کی دعائیں' },
    intro: {
      ar: 'أدعية نبوية يلجأ بها المسلم إلى ربه عند الهمّ والحزن والكرب وضيق الأمور.',
      en: 'Prophetic supplications by which the believer turns to his Lord in times of worry, grief, distress and hardship.',
      ur: 'نبوی دعائیں جن کے ذریعے مومن غم، پریشانی اور تنگی کے وقت اپنے رب کی طرف رجوع کرتا ہے۔',
    },
    items: [
      {
        ar: 'لا إِلَهَ إِلاَّ اللَّهُ الْعَظِيمُ الْحَلِيمُ، لا إِلَهَ إِلاَّ اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ، لا إِلَهَ إِلاَّ اللَّهُ رَبُّ السَّمَاوَاتِ وَرَبُّ الْأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيمِ',
        when: { ar: 'دعاء الكرب', en: 'The supplication of distress', ur: 'کرب کی دعا' },
        src: { kind: 'hadith', books: ['agreed'] },
      },
      {
        ar: 'لا إِلَهَ إِلاَّ أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',
        when: { ar: 'دعاء ذي النون', en: 'The supplication of Dhun-Nun (Yunus)', ur: 'دعائے ذوالنون' },
        src: { kind: 'hadith', books: ['tirmidhi'] },
      },
      {
        ar: 'اللّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ',
        when: { ar: 'الاستعاذة من الهمّ والعجز والدَّين', en: 'Refuge from worry, weakness & debt', ur: 'غم، عاجزی اور قرض سے پناہ' },
        src: { kind: 'hadith', books: ['bukhari'] },
      },
      {
        ar: 'اللّهُمَّ إِنِّي عَبْدُكَ، وَابْنُ عَبْدِكَ، وَابْنُ أَمَتِكَ، نَاصِيَتِي بِيَدِكَ، مَاضٍ فِيَّ حُكْمُكَ، عَدْلٌ فِيَّ قَضَاؤُكَ، أَسْأَلُكَ بِكُلِّ اسْمٍ هُوَ لَكَ سَمَّيْتَ بِهِ نَفْسَكَ، أَوْ أَنْزَلْتَهُ فِي كِتَابِكَ، أَوْ عَلَّمْتَهُ أَحَدًا مِنْ خَلْقِكَ، أَوِ اسْتَأْثَرْتَ بِهِ فِي عِلْمِ الْغَيْبِ عِنْدَكَ، أَنْ تَجْعَلَ الْقُرْآنَ رَبِيعَ قَلْبِي، وَنُورَ صَدْرِي، وَجَلاءَ حُزْنِي، وَذَهَابَ هَمِّي',
        when: { ar: 'دعاء الهمّ والحزن', en: 'The supplication for worry and grief', ur: 'غم اور پریشانی کی دعا' },
        src: { kind: 'hadith', books: ['ahmad'] },
      },
      {
        ar: 'اللّهُمَّ رَحْمَتَكَ أَرْجُو فَلا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ، وَأَصْلِحْ لِي شَأْنِي كُلَّهُ، لا إِلَهَ إِلاَّ أَنْتَ',
        when: { ar: 'تفويض الأمر إلى الله', en: 'Entrusting all affairs to Allah', ur: 'تمام معاملات اللہ کے سپرد' },
        src: { kind: 'hadith', books: ['abudawud'] },
      },
      {
        ar: 'اللّهُمَّ لا سَهْلَ إِلاَّ مَا جَعَلْتَهُ سَهْلاً، وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلاً',
        when: { ar: 'دعاء تيسير الأمور', en: 'Making the difficult easy', ur: 'آسانی کی دعا' },
        src: { kind: 'hadith', books: ['ibnhibban'] },
      },
      {
        ar: 'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ',
        when: { ar: 'الاستغاثة عند الكرب', en: 'Seeking Allah’s aid in distress', ur: 'کرب میں اللہ سے فریاد' },
        src: { kind: 'hadith', books: ['hakim'] },
      },
      {
        ar: 'اللّهُمَّ اكْفِنِي بِحَلالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ',
        when: { ar: 'دعاء قضاء الدَّين', en: 'For settling debt', ur: 'قرض اتارنے کی دعا' },
        src: { kind: 'hadith', books: ['tirmidhi'] },
      },
      {
        ar: 'اللّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ جَهْدِ الْبَلاءِ، وَدَرَكِ الشَّقَاءِ، وَسُوءِ الْقَضَاءِ، وَشَمَاتَةِ الْأَعْدَاءِ',
        when: { ar: 'الاستعاذة من جهد البلاء', en: 'Refuge from severe affliction', ur: 'سخت آزمائش سے پناہ' },
        src: { kind: 'hadith', books: ['agreed'] },
      },
    ],
  },

  // ───────────────────────── 4. Daily supplications ─────────────────────────
  {
    id: 'daily',
    title: { ar: 'أدعية يومية', en: 'Daily Supplications', ur: 'روزمرہ کی دعائیں' },
    intro: {
      ar: 'أذكار وأدعية ثابتة ترافق المسلم في يومه: عند النوم والاستيقاظ والطعام والخروج والسفر وغيرها.',
      en: 'Established remembrances that accompany the believer through the day: on sleeping, waking, eating, leaving home, travel and more.',
      ur: 'ثابت اذکار جو دن بھر مومن کے ساتھ رہتے ہیں: سوتے، جاگتے، کھاتے، گھر سے نکلتے اور سفر کے وقت وغیرہ۔',
    },
    items: [
      {
        ar: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
        when: { ar: 'عند الاستيقاظ', en: 'On waking up', ur: 'بیدار ہونے پر' },
        src: { kind: 'hadith', books: ['bukhari'] },
      },
      {
        ar: 'بِاسْمِكَ اللّهُمَّ أَمُوتُ وَأَحْيَا',
        when: { ar: 'عند النوم', en: 'Before sleeping', ur: 'سونے سے پہلے' },
        src: { kind: 'hadith', books: ['bukhari'] },
      },
      {
        ar: 'بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلا حَوْلَ وَلا قُوَّةَ إِلاَّ بِاللَّهِ',
        when: { ar: 'عند الخروج من المنزل', en: 'On leaving home', ur: 'گھر سے نکلتے وقت' },
        src: { kind: 'hadith', books: ['abudawud', 'tirmidhi'] },
      },
      {
        ar: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلا قُوَّةٍ',
        when: { ar: 'بعد الطعام', en: 'After eating', ur: 'کھانے کے بعد' },
        src: { kind: 'hadith', books: ['abudawud', 'tirmidhi'] },
      },
      {
        ar: 'اللّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ',
        when: { ar: 'عند دخول الخلاء', en: 'On entering the restroom', ur: 'بیت الخلاء میں داخل ہوتے وقت' },
        src: { kind: 'hadith', books: ['agreed'] },
      },
      {
        ar: 'اللّهُمَّ صَيِّبًا نَافِعًا',
        when: { ar: 'عند نزول المطر', en: 'When it rains', ur: 'بارش کے وقت' },
        src: { kind: 'hadith', books: ['bukhari'] },
      },
      {
        ar: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ. اللّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى',
        when: { ar: 'دعاء السفر', en: 'The supplication for travel', ur: 'سفر کی دعا' },
        src: { kind: 'hadith', books: ['muslim'] },
      },
      {
        ar: 'اللّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
        when: { ar: 'عند دخول المسجد', en: 'On entering the mosque', ur: 'مسجد میں داخل ہوتے وقت' },
        src: { kind: 'hadith', books: ['muslim'] },
      },
      {
        ar: 'اللّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ، وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ، وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ، فَإِنَّكَ تَقْدِرُ وَلا أَقْدِرُ، وَتَعْلَمُ وَلا أَعْلَمُ، وَأَنْتَ عَلاَّمُ الْغُيُوبِ، اللّهُمَّ إِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الْأَمْرَ خَيْرٌ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي فَاقْدُرْهُ لِي وَيَسِّرْهُ لِي ثُمَّ بَارِكْ لِي فِيهِ',
        when: { ar: 'دعاء الاستخارة', en: 'The supplication of Istikharah', ur: 'استخارہ کی دعا' },
        src: { kind: 'hadith', books: ['bukhari'] },
      },
      {
        ar: 'أَشْهَدُ أَنْ لا إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ، اللّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ',
        when: { ar: 'بعد الوضوء', en: 'After ablution (wudu)', ur: 'وضو کے بعد' },
        src: { kind: 'hadith', books: ['muslim', 'tirmidhi'] },
      },
      {
        ar: 'إِذَا عَطَسَ أَحَدُكُمْ فَلْيَقُلِ: الْحَمْدُ لِلَّهِ، وَلْيَقُلْ لَهُ أَخُوهُ أَوْ صَاحِبُهُ: يَرْحَمُكَ اللَّهُ، فَإِذَا قَالَ لَهُ: يَرْحَمُكَ اللَّهُ، فَلْيَقُلْ: يَهْدِيكُمُ اللَّهُ وَيُصْلِحُ بَالَكُمْ',
        when: { ar: 'عند العطاس', en: 'On sneezing', ur: 'چھینک کے وقت' },
        src: { kind: 'hadith', books: ['bukhari'] },
      },
      {
        ar: 'اللّهُمَّ لَكَ الْحَمْدُ أَنْتَ كَسَوْتَنِيهِ، أَسْأَلُكَ مِنْ خَيْرِهِ وَخَيْرِ مَا صُنِعَ لَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّهِ وَشَرِّ مَا صُنِعَ لَهُ',
        when: { ar: 'عند لبس الثوب الجديد', en: 'On wearing new clothes', ur: 'نیا لباس پہنتے وقت' },
        src: { kind: 'hadith', books: ['abudawud', 'tirmidhi'] },
      },
      {
        ar: 'لا إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ يُحْيِي وَيُمِيتُ وَهُوَ حَيٌّ لا يَمُوتُ، بِيَدِهِ الْخَيْرُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
        when: { ar: 'عند دخول السوق', en: 'On entering the marketplace', ur: 'بازار میں داخل ہوتے وقت' },
        src: { kind: 'hadith', books: ['tirmidhi'] },
      },
      {
        ar: 'ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ',
        when: { ar: 'دعاء الإفطار', en: 'On breaking the fast (iftar)', ur: 'روزہ افطار کرتے وقت' },
        src: { kind: 'hadith', books: ['abudawud'] },
      },
    ],
  },

  // ───────────────────────── 5. Parents, family & marriage ─────────────────────────
  {
    id: 'parents-family',
    title: { ar: 'أدعية الوالدين والأسرة والزواج', en: 'Supplications for Parents, Family & Marriage', ur: 'والدین، خاندان اور نکاح کی دعائیں' },
    intro: {
      ar: 'أدعية من القرآن والسنة في برّ الوالدين والدعاء لهما، وتهنئة الزوجين عند الزواج، وطلب الذرية الصالحة وحفظ الأبناء.',
      en: 'Supplications from the Quran and Sunnah for honoring and praying for one’s parents, for spouses at marriage, and for righteous offspring and the protection of children.',
      ur: 'قرآن و سنت سے والدین کی دعا، نکاح کے موقع پر دولہا دلہن کی دعا، نیک اولاد اور بچوں کی حفاظت سے متعلق دعائیں۔',
    },
    items: [
      {
        ar: 'رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
        when: { ar: 'دعاء الوالدين', en: 'Prayer for one’s parents', ur: 'والدین کے لیے دعا' },
        src: { kind: 'quran', surah: 17, ayah: '24' },
      },
      {
        ar: 'رَبِّ هَبْ لِي مِن لَّدُنكَ ذُرِّيَّةً طَيِّبَةً ۖ إِنَّكَ سَمِيعُ الدُّعَاءِ',
        when: { ar: 'دعاء زكريا ﷺ — طلب الذرية الصالحة', en: 'Zakariyya’s ﷺ prayer for righteous offspring', ur: 'زکریا علیہ السلام کی نیک اولاد کی دعا' },
        src: { kind: 'quran', surah: 3, ayah: '38' },
      },
      {
        ar: 'بَارَكَ اللَّهُ لَكَ، وَبَارَكَ عَلَيْكَ، وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ',
        when: { ar: 'دعاء تهنئة العروسين', en: 'Congratulating the newly married couple', ur: 'دولہا دلہن کی تہنیت' },
        src: { kind: 'hadith', books: ['abudawud', 'tirmidhi'] },
      },
      {
        ar: 'اللّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا وَخَيْرَ مَا جَبَلْتَهَا عَلَيْهِ، وَأَعُوذُ بِكَ مِنْ شَرِّهَا وَشَرِّ مَا جَبَلْتَهَا عَلَيْهِ',
        when: { ar: 'دعاء الزوج لزوجته عند الزواج', en: 'The husband’s prayer for his wife at marriage', ur: 'شادی کے وقت شوہر کی بیوی کے لیے دعا' },
        src: { kind: 'hadith', books: ['abudawud', 'ibnmajah'] },
      },
      {
        ar: 'أُعِيذُكُمَا بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ، وَمِنْ كُلِّ عَيْنٍ لاَمَّةٍ',
        when: { ar: 'دعاء حفظ الأولاد (كما كان النبي ﷺ يُعَوِّذ به الحسن والحسين)', en: 'Prayer for protecting one’s children (as the Prophet ﷺ used for Hasan & Husain)', ur: 'اولاد کی حفاظت کی دعا (جیسے نبی ﷺ نے حسن و حسین کے لیے پڑھی)' },
        src: { kind: 'hadith', books: ['bukhari'] },
      },
    ],
  },

  // ───────────────────────── 6. Healing, ruqyah & protection ─────────────────────────
  {
    id: 'health-protection',
    title: { ar: 'أدعية الشفاء والرقية والحماية', en: 'Supplications for Healing, Ruqyah & Protection', ur: 'شفا، رقیہ اور حفاظت کی دعائیں' },
    intro: {
      ar: 'أدعية ورقى نبوية ثابتة للشفاء من المرض، والرقية الشرعية من العين والحسد، وطلب الحفظ والعافية.',
      en: 'Established prophetic supplications and ruqyah for healing from illness, protection from the evil eye and envy, and seeking safety and well-being.',
      ur: 'بیماری سے شفا، نظرِ بد اور حسد سے رقیہ شرعی، اور حفاظت و عافیت کی نبوی دعائیں۔',
    },
    items: [
      {
        ar: 'اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَأْسَ، اشْفِ أَنْتَ الشَّافِي، لاَ شِفَاءَ إِلاَّ شِفَاؤُكَ، شِفَاءً لاَ يُغَادِرُ سَقَمًا',
        when: { ar: 'دعاء الشفاء للمريض', en: 'Supplication for healing the sick', ur: 'مریض کے لیے شفا کی دعا' },
        src: { kind: 'hadith', books: ['agreed'] },
      },
      {
        ar: 'بِسْمِ اللَّهِ (ثلاثاً)، أَعُوذُ بِعِزَّةِ اللَّهِ وَقُدْرَتِهِ مِنْ شَرِّ مَا أَجِدُ وَأُحَاذِرُ (سبع مرات)',
        when: { ar: 'الرقية بوضع اليد على موضع الألم', en: 'Ruqyah by placing the hand on the site of pain', ur: 'درد کی جگہ ہاتھ رکھ کر رقیہ' },
        src: { kind: 'hadith', books: ['muslim'] },
      },
      {
        ar: 'بِسْمِ اللَّهِ أَرْقِيكَ، مِنْ كُلِّ شَيْءٍ يُؤْذِيكَ، مِنْ شَرِّ كُلِّ نَفْسٍ أَوْ عَيْنِ حَاسِدٍ، اللَّهُ يَشْفِيكَ، بِسْمِ اللَّهِ أَرْقِيكَ',
        when: { ar: 'رقية جبريل عليه السلام للنبي ﷺ', en: 'The ruqyah of Jibril ﷺ for the Prophet ﷺ', ur: 'جبریل علیہ السلام کی نبی ﷺ کے لیے رقیہ' },
        src: { kind: 'hadith', books: ['muslim'] },
      },
      {
        ar: 'مَا شَاءَ اللَّهُ لَا قُوَّةَ إِلَّا بِاللَّهِ',
        when: { ar: 'دفع العين عند استحسان شيء', en: 'Warding off the evil eye when admiring something', ur: 'کسی چیز کو پسند کرتے وقت نظرِ بد سے بچاؤ' },
        src: { kind: 'quran', surah: 18, ayah: '39' },
      },
      {
        ar: 'الْحَمْدُ لِلَّهِ الَّذِي عَافَانِي مِمَّا ابْتَلاَكَ بِهِ وَفَضَّلَنِي عَلَى كَثِيرٍ مِمَّنْ خَلَقَ تَفْضِيلاً',
        when: { ar: 'عند رؤية مبتلى', en: 'On seeing someone afflicted with a trial', ur: 'کسی مصیبت زدہ کو دیکھ کر' },
        src: { kind: 'hadith', books: ['tirmidhi'] },
      },
    ],
  },

  // ───────────────────────── 7. Provision, repentance & ease ─────────────────────────
  {
    id: 'rizq-tawbah',
    title: { ar: 'أدعية الرزق والتوبة وتيسير الأمور', en: 'Supplications for Provision, Repentance & Ease', ur: 'رزق، توبہ اور آسانی کی دعائیں' },
    intro: {
      ar: 'أدعية نبوية لطلب الرزق الحلال والعلم النافع، والتوبة والاستغفار، وقنوت النبي ﷺ في الصلاة.',
      en: 'Prophetic supplications for seeking lawful provision and beneficial knowledge, repentance and seeking forgiveness, and the Prophet’s ﷺ Qunut in prayer.',
      ur: 'حلال رزق اور نفع بخش علم کی طلب، توبہ و استغفار اور نبی ﷺ کے دعائے قنوت کی دعائیں۔',
    },
    items: [
      {
        ar: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلاً',
        when: { ar: 'دعاء بعد صلاة الفجر', en: 'Supplication after the Fajr prayer', ur: 'نمازِ فجر کے بعد کی دعا' },
        src: { kind: 'hadith', books: ['ibnmajah'] },
      },
      {
        ar: 'اللَّهُمَّ اهْدِنِي فِيمَنْ هَدَيْتَ، وَعَافِنِي فِيمَنْ عَافَيْتَ، وَتَوَلَّنِي فِيمَنْ تَوَلَّيْتَ، وَبَارِكْ لِي فِيمَا أَعْطَيْتَ، وَقِنِي شَرَّ مَا قَضَيْتَ، فَإِنَّكَ تَقْضِي وَلَا يُقْضَى عَلَيْكَ، إِنَّهُ لَا يَذِلُّ مَنْ وَالَيْتَ، تَبَارَكْتَ رَبَّنَا وَتَعَالَيْتَ',
        when: { ar: 'دعاء القنوت', en: 'The Qunut supplication', ur: 'دعائے قنوت' },
        src: { kind: 'hadith', books: ['abudawud', 'tirmidhi', 'nasai'] },
      },
      {
        ar: 'رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ',
        when: { ar: 'كان النبي ﷺ يقولها في المجلس الواحد مائة مرة', en: 'Repeated by the Prophet ﷺ a hundred times in a single gathering', ur: 'نبی ﷺ ایک مجلس میں سو بار پڑھا کرتے تھے' },
        src: { kind: 'hadith', books: ['abudawud', 'tirmidhi', 'ibnmajah'] },
      },
      {
        ar: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ',
        when: { ar: 'الاستعاذة من الفقر', en: 'Seeking refuge from poverty', ur: 'فقر سے پناہ' },
        src: { kind: 'hadith', books: ['abudawud', 'nasai'] },
      },
      {
        ar: 'أَسْتَغْفِرُ اللَّهَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيَّ الْقَيُّومَ وَأَتُوبُ إِلَيْهِ',
        when: { ar: 'الاستغفار الجامع', en: 'A comprehensive supplication of repentance', ur: 'جامع استغفار' },
        src: { kind: 'hadith', books: ['abudawud', 'tirmidhi'] },
      },
    ],
  },
];

// Localized page-level strings.
export const DUA_PAGE: Record<'ar' | 'en' | 'ur', {
  title: string; h1: string; lead: string; sourcesNote: string; relatedTitle: string;
}> = {
  ar: {
    title: 'أدعية وأذكار من القرآن والسنة · مصدرها صحيح',
    h1: 'الدعاء — أدعية وأذكار من الكتاب والسنة',
    lead: 'مجموعة من الأدعية والأذكار الصحيحة من القرآن الكريم والسنة النبوية، مرتّبة في أقسام مع ذكر مصدر كل دعاء.',
    sourcesNote: 'جميع الأدعية مأخوذة من القرآن الكريم وكتب السنة الصحيحة (كالبخاري ومسلم والسنن)، على نهج كتاب «حصن المسلم». ويُذكر مصدر كل دعاء أسفله.',
    relatedTitle: 'أدوات ذات صلة',
  },
  en: {
    title: 'Duʿaʾ & Adhkar from the Quran and Sunnah · Authentic Sources',
    h1: 'Duʿaʾ — Supplications & Remembrances from the Quran and Sunnah',
    lead: 'A collection of authentic supplications and remembrances from the Quran and the Sunnah, organized into sections with the source of each supplication.',
    sourcesNote: 'All supplications are taken from the Quran and authentic hadith collections (such as al-Bukhari, Muslim and the Sunan), in the manner of Hisn al-Muslim. The source of each is noted beneath it.',
    relatedTitle: 'Related tools',
  },
  ur: {
    title: 'قرآن و سنت سے دعائیں اور اذکار · مستند حوالہ جات',
    h1: 'دعا — قرآن و سنت سے دعائیں اور اذکار',
    lead: 'قرآن کریم اور سنتِ نبوی سے ماخوذ مستند دعاؤں اور اذکار کا مجموعہ، حصص میں مرتب، ہر دعا کے حوالے کے ساتھ۔',
    sourcesNote: 'تمام دعائیں قرآن کریم اور صحیح احادیث کی کتب (مثلاً بخاری، مسلم اور سنن) سے ماخوذ ہیں، «حصن المسلم» کے طرز پر۔ ہر دعا کا حوالہ اس کے نیچے درج ہے۔',
    relatedTitle: 'متعلقہ ٹولز',
  },
};

// Look up a section by its id.
export const getDuaSection = (id: string): DuaSection | undefined =>
  DUA_SECTIONS.find(s => s.id === id);

// Per-section SEO metadata for the standalone category pages.
// (title → <title>/og:title, desc → meta description; longer & keyword-focused.)
export const DUA_SECTION_SEO: Record<string, { title: Tri; desc: Tri }> = {
  'morning-evening': {
    title: {
      ar: 'أذكار الصباح والمساء كاملة مع العدد والمصدر',
      en: 'Morning & Evening Adhkar — Complete, with Counts & Sources',
      ur: 'صبح و شام کے مکمل اذکار — تعداد اور حوالہ کے ساتھ',
    },
    desc: {
      ar: 'أذكار الصباح والمساء الثابتة عن النبي ﷺ كاملةً: سيد الاستغفار، آية الكرسي، المعوذات وغيرها، مع عدد المرات ومصدر كل ذكر.',
      en: 'The complete morning and evening remembrances established from the Prophet ﷺ — Sayyid al-Istighfar, Ayat al-Kursi, the protective surahs and more, with repetitions and sources.',
      ur: 'نبی کریم ﷺ سے ثابت صبح و شام کے مکمل اذکار: سید الاستغفار، آیت الکرسی، معوذات وغیرہ، تعداد اور حوالہ کے ساتھ۔',
    },
  },
  'quran': {
    title: {
      ar: 'أدعية من القرآن الكريم — أدعية قرآنية مع رقم الآية',
      en: 'Supplications from the Quran — Quranic Duas with References',
      ur: 'قرآن کریم سے دعائیں — سورت و آیت کے حوالہ کے ساتھ',
    },
    desc: {
      ar: 'أدعية قرآنية جامعة وردت على لسان الأنبياء والصالحين، مع ذكر اسم السورة ورقم الآية لكل دعاء.',
      en: 'Comprehensive Quranic supplications on the tongues of the prophets and the righteous, each with its surah name and ayah number.',
      ur: 'قرآن کی جامع دعائیں جو انبیاء اور صالحین کی زبان پر آئیں، ہر ایک کے ساتھ سورت اور آیت کا حوالہ۔',
    },
  },
  'distress': {
    title: {
      ar: 'أدعية الكرب والهمّ والشدّة من السنة النبوية',
      en: 'Duas for Distress, Anxiety & Hardship — from the Sunnah',
      ur: 'پریشانی، غم اور تنگی کی دعائیں — سنت سے',
    },
    desc: {
      ar: 'أدعية نبوية للكرب والهمّ والحزن وقضاء الدَّين وتفريج الشدائد: دعاء الكرب ودعاء ذي النون وغيرهما، مع مصدر كل دعاء.',
      en: 'Prophetic supplications for distress, worry, grief, debt and relief from hardship — the dua of distress, the dua of Dhun-Nun and more, each with its source.',
      ur: 'کرب، غم، قرض اور تنگی سے نجات کی نبوی دعائیں: دعائے کرب، دعائے ذوالنون وغیرہ، حوالہ کے ساتھ۔',
    },
  },
  'daily': {
    title: {
      ar: 'أدعية يومية وأذكار من السنة لكل المناسبات',
      en: 'Daily Supplications & Adhkar from the Sunnah',
      ur: 'روزمرہ کی دعائیں اور اذکار — سنت سے',
    },
    desc: {
      ar: 'أدعية وأذكار اليوم الثابتة: النوم والاستيقاظ والطعام والخروج والسفر والاستخارة ودخول المسجد والسوق والعطاس والإفطار، مع مصدر كل دعاء.',
      en: 'Established everyday duas: sleeping, waking, eating, leaving home, travel, istikharah, entering the mosque and the market, sneezing, and breaking the fast — each with its source.',
      ur: 'روزمرہ کی ثابت دعائیں: سونا، جاگنا، کھانا، گھر سے نکلنا، سفر، استخارہ، مسجد اور بازار میں داخلہ، چھینک اور افطار کے وقت، حوالہ کے ساتھ۔',
    },
  },
  'parents-family': {
    title: {
      ar: 'أدعية الوالدين والزواج والذرية الصالحة',
      en: 'Duas for Parents, Marriage & Righteous Offspring',
      ur: 'والدین، نکاح اور نیک اولاد کی دعائیں',
    },
    desc: {
      ar: 'أدعية من القرآن والسنة لبرّ الوالدين والدعاء لهما، وتهنئة العروسين، وطلب الذرية الصالحة، وحفظ الأبناء، مع مصدر كل دعاء.',
      en: 'Supplications from the Quran and Sunnah for honoring one’s parents, congratulating newlyweds, praying for righteous children, and protecting them — each with its source.',
      ur: 'قرآن و سنت سے والدین کی دعا، دولہا دلہن کی تہنیت، نیک اولاد کی دعا اور بچوں کی حفاظت کی دعائیں، حوالہ کے ساتھ۔',
    },
  },
  'health-protection': {
    title: {
      ar: 'أدعية الشفاء والرقية الشرعية من العين والحسد',
      en: 'Duas for Healing & Ruqyah from the Evil Eye',
      ur: 'شفا اور نظرِ بد سے رقیہ شرعی کی دعائیں',
    },
    desc: {
      ar: 'أدعية ورقى نبوية ثابتة لشفاء المريض، ورقية جبريل عليه السلام، ودفع العين والحسد، مع مصدر كل دعاء من صحيح السنة.',
      en: 'Established prophetic supplications and ruqyah for healing the sick, the ruqyah of Jibril, and warding off the evil eye and envy — each sourced from authentic Sunnah.',
      ur: 'مریض کی شفا، جبریل علیہ السلام کی رقیہ اور نظرِ بد و حسد سے حفاظت کی نبوی دعائیں، صحیح سنت کے حوالہ کے ساتھ۔',
    },
  },
  'rizq-tawbah': {
    title: {
      ar: 'أدعية الرزق والتوبة والاستغفار ودعاء القنوت',
      en: 'Duas for Provision, Repentance & Qunut',
      ur: 'رزق، توبہ، استغفار اور دعائے قنوت',
    },
    desc: {
      ar: 'أدعية نبوية لطلب الرزق الحلال والعلم النافع، والتوبة والاستغفار، ودعاء القنوت الثابت عن النبي ﷺ، مع مصدر كل دعاء.',
      en: 'Prophetic supplications for lawful provision and beneficial knowledge, repentance and seeking forgiveness, and the Qunut supplication established from the Prophet ﷺ — each with its source.',
      ur: 'حلال رزق، نفع بخش علم، توبہ و استغفار اور نبی ﷺ سے ثابت دعائے قنوت، حوالہ کے ساتھ۔',
    },
  },
};

// UI chrome strings shared by the hub cards and category pages.
export const DUA_UI: Record<'ar' | 'en' | 'ur', {
  duaCrumb: string; allSections: string; otherSections: string; viewAll: string; backToHub: string; supplications: string;
}> = {
  ar: { duaCrumb: 'الدعاء', allSections: 'كل أقسام الدعاء', otherSections: 'تصفّح أقساماً أخرى', viewAll: 'عرض القسم', backToHub: 'كل الأدعية والأذكار', supplications: 'دعاء' },
  en: { duaCrumb: 'Duʿaʾ', allSections: 'All duʿaʾ sections', otherSections: 'Browse other sections', viewAll: 'View section', backToHub: 'All supplications & adhkar', supplications: 'duʿāʾ' },
  ur: { duaCrumb: 'دعا', allSections: 'دعا کے تمام حصے', otherSections: 'دیگر حصے دیکھیں', viewAll: 'حصہ دیکھیں', backToHub: 'تمام دعائیں و اذکار', supplications: 'دعائیں' },
};

// Localized heading for the FAQ blocks.
export const DUA_FAQ_TITLE: Tri = {
  ar: 'أسئلة شائعة',
  en: 'Frequently asked questions',
  ur: 'اکثر پوچھے گئے سوالات',
};

// Short, human-readable name for a supplication (used in ItemList structured data).
export function duaItemName(d: Dua, lang: 'ar' | 'en' | 'ur'): string {
  if (d.when) return pickTri(d.when, lang);
  if (d.src.kind === 'quran') return srcLabel(d.src, lang);
  return d.ar.replace(/\n[\s\S]*$/, '').split(/\s+/).slice(0, 6).join(' ');
}

// FAQ content per section (and the hub) — feeds both the visible FAQ block and FAQPage schema.
export const DUA_HUB_FAQ: { q: Tri; a: Tri }[] = [
  {
    q: { ar: 'ما هذه المجموعة من الأدعية والأذكار؟', en: 'What is this collection of supplications?', ur: 'یہ دعاؤں اور اذکار کا مجموعہ کیا ہے؟' },
    a: {
      ar: 'هي مجموعة من الأدعية والأذكار الصحيحة من القرآن الكريم والسنة النبوية، مرتّبة في أقسام: أذكار الصباح والمساء، وأدعية من القرآن، وأدعية الكرب والهمّ، وأدعية يومية، مع ذكر مصدر كل دعاء.',
      en: 'It is a collection of authentic supplications and remembrances from the Quran and Sunnah, organized into sections: morning & evening adhkar, Quranic duas, duas for distress, and daily supplications — each with its source.',
      ur: 'یہ قرآن و سنت سے مستند دعاؤں اور اذکار کا مجموعہ ہے، جو حصص میں مرتب ہے: صبح و شام کے اذکار، قرآنی دعائیں، کرب کی دعائیں اور روزمرہ کی دعائیں — ہر ایک کے حوالے کے ساتھ۔',
    },
  },
  {
    q: { ar: 'هل الأدعية صحيحة ومصدرها موثوق؟', en: 'Are the supplications authentic and well-sourced?', ur: 'کیا دعائیں مستند اور باحوالہ ہیں؟' },
    a: {
      ar: 'نعم، جميع الأدعية مأخوذة من القرآن الكريم وكتب السنة الصحيحة (كالبخاري ومسلم والسنن) على نهج كتاب «حصن المسلم»، ويُذكر مصدر كل دعاء أسفله.',
      en: 'Yes. Every supplication is taken from the Quran and authentic hadith collections (such as al-Bukhari, Muslim and the Sunan), in the manner of Hisn al-Muslim, with the source noted beneath each one.',
      ur: 'جی ہاں، تمام دعائیں قرآن اور صحیح احادیث (بخاری، مسلم، سنن) سے «حصن المسلم» کے طرز پر لی گئی ہیں، اور ہر دعا کا حوالہ نیچے درج ہے۔',
    },
  },
];

export const DUA_FAQ: Record<string, { q: Tri; a: Tri }[]> = {
  'morning-evening': [
    {
      q: { ar: 'متى تُقال أذكار الصباح والمساء؟', en: 'When are the morning and evening adhkar said?', ur: 'صبح و شام کے اذکار کب پڑھے جاتے ہیں؟' },
      a: {
        ar: 'تُقال أذكار الصباح بعد صلاة الفجر إلى طلوع الشمس، وأذكار المساء بعد صلاة العصر إلى غروب الشمس، ومن فاته الوقت قضاها متى تذكّر.',
        en: 'The morning adhkar are said after Fajr until sunrise, and the evening adhkar after ʿAsr until sunset; whoever misses the time may say them once they remember.',
        ur: 'صبح کے اذکار فجر کے بعد طلوعِ آفتاب تک اور شام کے اذکار عصر کے بعد غروبِ آفتاب تک پڑھے جاتے ہیں؛ وقت نکل جائے تو یاد آنے پر پڑھ لیں۔',
      },
    },
    {
      q: { ar: 'ما فضل المحافظة على أذكار الصباح والمساء؟', en: 'What is the virtue of keeping the morning & evening adhkar?', ur: 'صبح و شام کے اذکار کی پابندی کی کیا فضیلت ہے؟' },
      a: {
        ar: 'فيها حفظٌ وحصنٌ للمسلم من الشرور بإذن الله، وطمأنينةٌ للقلب، وهي ثابتة عن النبي ﷺ في أحاديث صحيحة.',
        en: 'They are a protection and fortress for the believer from harm by Allah’s leave, bring tranquility to the heart, and are established from the Prophet ﷺ in authentic hadith.',
        ur: 'یہ مسلمان کے لیے اللہ کے اذن سے شر سے حفاظت اور قلعہ ہیں، دل کو سکون دیتے ہیں، اور نبی ﷺ سے صحیح احادیث میں ثابت ہیں۔',
      },
    },
    {
      q: { ar: 'كم مرة تُقرأ المعوذات في الصباح والمساء؟', en: 'How many times are the protective surahs recited?', ur: 'معوذات کتنی بار پڑھی جائیں؟' },
      a: {
        ar: 'يُستحب قراءة سورة الإخلاص والمعوذتين (الفلق والناس) ثلاث مرات في الصباح وثلاثاً في المساء.',
        en: 'It is recommended to recite al-Ikhlas, al-Falaq and an-Nas three times in the morning and three times in the evening.',
        ur: 'سورۃ الاخلاص اور معوذتین (الفلق و الناس) صبح تین بار اور شام تین بار پڑھنا مستحب ہے۔',
      },
    },
  ],
  'quran': [
    {
      q: { ar: 'ما هي الأدعية القرآنية؟', en: 'What are Quranic supplications?', ur: 'قرآنی دعائیں کیا ہیں؟' },
      a: {
        ar: 'هي أدعية جامعة وردت في القرآن الكريم على لسان الأنبياء والصالحين، يدعو بها المسلم في كل وقت، مع ذكر السورة ورقم الآية لكل دعاء.',
        en: 'They are comprehensive supplications found in the Quran on the tongues of the prophets and the righteous, to be recited at any time, each with its surah and ayah number.',
        ur: 'یہ قرآن میں انبیاء اور صالحین کی زبان پر آنے والی جامع دعائیں ہیں، جو ہر وقت پڑھی جا سکتی ہیں، ہر ایک کے ساتھ سورت اور آیت کا حوالہ ہے۔',
      },
    },
    {
      q: { ar: 'هل يجوز الدعاء بالأدعية الواردة في القرآن؟', en: 'Is it permissible to supplicate with Quranic duas?', ur: 'کیا قرآنی دعاؤں سے دعا کرنا جائز ہے؟' },
      a: {
        ar: 'نعم، الدعاء بما ورد في القرآن من أفضل الدعاء وأجمعه، ويُستحب التوجّه به في الصلاة وخارجها.',
        en: 'Yes; supplicating with what came in the Quran is among the best and most comprehensive forms of duʿaʾ, recommended in and outside of prayer.',
        ur: 'جی ہاں، قرآن میں وارد دعاؤں سے دعا کرنا بہترین اور جامع ترین دعا ہے، نماز میں اور باہر دونوں جگہ مستحب ہے۔',
      },
    },
  ],
  'distress': [
    {
      q: { ar: 'ما هو دعاء الكرب والهمّ والحزن؟', en: 'What is the supplication for distress and grief?', ur: 'کرب اور غم کی دعا کیا ہے؟' },
      a: {
        ar: 'هي أدعية نبوية ثابتة يلجأ بها المسلم إلى ربه عند الهمّ والحزن والضيق، من أشهرها دعاء الكرب ودعاء ذي النون: «لا إله إلا أنت سبحانك إني كنت من الظالمين».',
        en: 'They are established prophetic supplications by which the believer turns to his Lord in worry, grief and hardship — most famously the duʿaʾ of distress and the duʿaʾ of Dhun-Nun: “Lā ilāha illā anta subḥānaka innī kuntu mina-ẓ-ẓālimīn.”',
        ur: 'یہ نبوی دعائیں ہیں جن سے مومن غم اور تنگی میں اپنے رب کی طرف رجوع کرتا ہے، سب سے مشہور دعائے کرب اور دعائے ذوالنون: «لا الٰہ الا انت سبحانک انی کنت من الظالمین»۔',
      },
    },
    {
      q: { ar: 'هل هناك دعاء لقضاء الدَّين وتفريج الكرب؟', en: 'Is there a duʿaʾ for clearing debt and relieving distress?', ur: 'کیا قرض اتارنے اور کرب دور کرنے کی دعا ہے؟' },
      a: {
        ar: 'نعم، من ذلك: «اللهم اكفني بحلالك عن حرامك، وأغنني بفضلك عمّن سواك»، مع الأخذ بالأسباب والتوكّل على الله.',
        en: 'Yes, such as: “Allāhumma-kfinī bi-ḥalālika ʿan ḥarāmik, wa aghninī bi-faḍlika ʿamman siwāk,” alongside taking practical means and relying on Allah.',
        ur: 'جی ہاں، جیسے: «اللهم اکفنی بحلالک عن حرامک واغننی بفضلک عمن سواک»، اسباب اختیار کرنے اور اللہ پر توکل کے ساتھ۔',
      },
    },
  ],
  'daily': [
    {
      q: { ar: 'ما هي الأدعية اليومية؟', en: 'What are the daily supplications?', ur: 'روزمرہ کی دعائیں کیا ہیں؟' },
      a: {
        ar: 'هي أذكار وأدعية ثابتة ترافق المسلم في يومه: عند الاستيقاظ والنوم والطعام والخروج من المنزل ودخول المسجد والسفر والاستخارة وبعد الوضوء.',
        en: 'They are established remembrances that accompany the believer through the day: on waking, sleeping, eating, leaving home, entering the mosque, travelling, istikharah, and after ablution.',
        ur: 'یہ ثابت اذکار ہیں جو دن بھر مومن کے ساتھ رہتے ہیں: بیداری، نیند، کھانے، گھر سے نکلنے، مسجد میں داخلے، سفر، استخارہ اور وضو کے بعد۔',
      },
    },
    {
      q: { ar: 'كيف تُؤدّى صلاة ودعاء الاستخارة؟', en: 'How is the istikharah prayer and duʿaʾ performed?', ur: 'استخارہ کی نماز اور دعا کیسے ادا کی جائے؟' },
      a: {
        ar: 'يصلّي المسلم ركعتين من غير الفريضة، ثم يدعو بدعاء الاستخارة: «اللهم إني أستخيرك بعلمك...» عند إرادة أمرٍ مباح ويُسمّيه في موضعه.',
        en: 'One prays two units (rakʿahs) other than the obligatory prayer, then recites the istikharah duʿaʾ: “Allāhumma innī astakhīruka bi-ʿilmik…”, naming the matter at its place when intending a permissible decision.',
        ur: 'فرض کے علاوہ دو رکعتیں پڑھ کر استخارہ کی دعا پڑھی جاتی ہے: «اللهم انی استخیرک بعلمک...»، اور جائز کام کا ارادہ کرتے وقت اس کا نام لیا جاتا ہے۔',
      },
    },
    {
      q: { ar: 'ما هو دعاء الإفطار في رمضان؟', en: 'What is the dua for breaking the fast in Ramadan?', ur: 'رمضان میں روزہ افطار کرنے کی دعا کیا ہے؟' },
      a: {
        ar: 'من الأدعية الثابتة عند الإفطار: «ذهب الظمأ وابتلّت العروق وثبت الأجر إن شاء الله»، رواه أبو داود.',
        en: 'An established supplication upon breaking the fast is: “The thirst has gone, the veins are moistened, and the reward is confirmed, if Allah wills” — reported by Abu Dawud.',
        ur: 'افطار کے وقت ثابت دعا: «ذہب الظمأ وابتلت العروق وثبت الاجر ان شاء اللہ»، جسے ابو داؤد نے روایت کیا۔',
      },
    },
  ],
  'parents-family': [
    {
      q: { ar: 'ما هو أفضل دعاء للوالدين؟', en: 'What is the best supplication for one’s parents?', ur: 'والدین کے لیے بہترین دعا کیا ہے؟' },
      a: {
        ar: 'من أفضل الأدعية للوالدين ما ورد في القرآن الكريم: «رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا»، وهو دعاء جامع يُقال في حياتهما وبعد وفاتهما.',
        en: 'Among the best supplications is the Quranic prayer: “My Lord, have mercy upon them as they raised me when I was small” (Quran 17:24) — comprehensive and said both during their lifetime and after their passing.',
        ur: 'والدین کے لیے بہترین دعاؤں میں سے قرآنی دعا ہے: «رب ارحمہما کما ربیانی صغیرا» (بنی اسرائیل: 24)، جو ان کی زندگی میں اور وفات کے بعد بھی پڑھی جا سکتی ہے۔',
      },
    },
    {
      q: { ar: 'ماذا يقال للعروسين يوم الزفاف؟', en: 'What is said to a newly married couple?', ur: 'شادی کے دن دولہا دلہن سے کیا کہا جائے؟' },
      a: {
        ar: 'يُستحب أن يُقال للعروسين: «بارك الله لك، وبارك عليك، وجمع بينكما في خير»، وهو دعاء ثابت عن النبي ﷺ.',
        en: 'It is recommended to say to them: “May Allah bless you, shower His blessings upon you, and join you together in goodness” — a supplication established from the Prophet ﷺ.',
        ur: 'دولہا دلہن سے کہنا مستحب ہے: «بارک اللہ لک وبارک علیک وجمع بینکما فی خیر»، جو نبی ﷺ سے ثابت دعا ہے۔',
      },
    },
  ],
  'health-protection': [
    {
      q: { ar: 'ما هو دعاء الرقية الشرعية من العين والحسد؟', en: 'What is the ruqyah supplication against the evil eye and envy?', ur: 'نظرِ بد اور حسد سے رقیہ شرعی کی دعا کیا ہے؟' },
      a: {
        ar: 'من أثبت الرقى رقيةُ جبريل عليه السلام للنبي ﷺ: «بسم الله أرقيك، من كل شيء يؤذيك، من شر كل نفس أو عين حاسد، الله يشفيك»، وتُقرأ أيضاً المعوذتان وآية الكرسي.',
        en: 'Among the most established is the ruqyah of Jibril ﷺ for the Prophet ﷺ: “In the name of Allah I perform ruqyah for you, from everything that harms you, from the evil of every soul or envious eye, Allah heals you.” Al-Falaq, an-Nas and Ayat al-Kursi are also recited.',
        ur: 'ثابت رقیوں میں سے جبریل علیہ السلام کی نبی ﷺ کے لیے رقیہ ہے: «بسم اللہ ارقیک من کل شیء یؤذیک...»، اس کے علاوہ معوذتین اور آیت الکرسی بھی پڑھی جاتی ہیں۔',
      },
    },
    {
      q: { ar: 'ماذا يُقال عند زيارة المريض؟', en: 'What is said when visiting the sick?', ur: 'مریض کی عیادت کے وقت کیا کہا جائے؟' },
      a: {
        ar: 'يُستحب أن يقول الزائر: «اللهم رب الناس أذهب البأس، اشفِ أنت الشافي، لا شفاء إلا شفاؤك، شفاءً لا يغادر سقماً»، وهو دعاء ثابت عن النبي ﷺ متفق عليه.',
        en: 'It is recommended for the visitor to say: “O Allah, Lord of mankind, remove the affliction and heal, for You are the Healer; there is no healing but Your healing, a healing that leaves no illness behind” — established from the Prophet ﷺ and agreed upon (Bukhari & Muslim).',
        ur: 'عیادت کرنے والے کے لیے مستحب ہے کہ کہے: «اللہم رب الناس اذہب البأس اشف انت الشافی...»، یہ نبی ﷺ سے ثابت اور متفق علیہ دعا ہے۔',
      },
    },
  ],
  'rizq-tawbah': [
    {
      q: { ar: 'ما هو دعاء طلب الرزق الحلال؟', en: 'What is the supplication for seeking lawful provision?', ur: 'حلال رزق طلب کرنے کی دعا کیا ہے؟' },
      a: {
        ar: 'من الأدعية الثابتة بعد صلاة الفجر: «اللهم إني أسألك علماً نافعاً، ورزقاً طيباً، وعملاً متقبلاً»، رواه ابن ماجه.',
        en: 'An established supplication after Fajr is: “O Allah, I ask You for beneficial knowledge, good provision, and accepted deeds” — reported by Ibn Majah.',
        ur: 'فجر کے بعد ثابت دعا: «اللہم انی اسألک علما نافعا ورزقا طیبا وعملا متقبلا»، جسے ابن ماجہ نے روایت کیا ہے۔',
      },
    },
    {
      q: { ar: 'ما هو دعاء القنوت الذي علّمه النبي ﷺ للحسن؟', en: 'What is the Qunut dua the Prophet ﷺ taught al-Hasan?', ur: 'دعائے قنوت جو نبی ﷺ نے حسن رضی اللہ عنہ کو سکھائی وہ کیا ہے؟' },
      a: {
        ar: 'علّم النبي ﷺ الحسنَ بنَ علي رضي الله عنهما أن يقول في قنوت الوتر: «اللهم اهدني فيمن هديت...» إلى آخره، رواه أبو داود والترمذي والنسائي.',
        en: 'The Prophet ﷺ taught al-Hasan ibn ʿAli, may Allah be pleased with him, to say in the Witr Qunut: “O Allah, guide me among those You have guided…” — reported by Abu Dawud, at-Tirmidhi and an-Nasaʾi.',
        ur: 'نبی ﷺ نے حسن بن علی رضی اللہ عنہما کو وتر کے قنوت میں یہ دعا سکھائی: «اللہم اہدنی فیمن ہدیت...»، جسے ابو داؤد، ترمذی اور نسائی نے روایت کیا۔',
      },
    },
  ],
};
