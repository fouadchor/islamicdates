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
      ar: 'أدعية وأذكار اليوم الثابتة: النوم والاستيقاظ والطعام والخروج والسفر والاستخارة ودخول المسجد، مع مصدر كل دعاء.',
      en: 'Established everyday duas: sleeping, waking, eating, leaving home, travel, istikharah and entering the mosque, each with its source.',
      ur: 'روزمرہ کی ثابت دعائیں: سونا، جاگنا، کھانا، گھر سے نکلنا، سفر، استخارہ اور مسجد میں داخلہ، حوالہ کے ساتھ۔',
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
