// ─────────────────────────────────────────────────────────────────────────────
// حدود الأجزاء الثلاثين وأسماؤها بثلاث لغات.
//
// Stored as sūrah + āyah numbers rather than as ready-made strings, so the same
// boundary data serves Arabic, English and Urdu and the three can never drift
// apart. Only the sūrahs that actually begin or end a juz are named here.
// ─────────────────────────────────────────────────────────────────────────────
import type { Lang } from './data';

/** أسماء السور عند حدود الأجزاء. اللغة الأردية تستعمل الاسم العربي كما في مصاحفها. */
const SURAH: Record<number, { ar: string; en: string }> = {
  1: { ar: 'الفاتحة', en: 'Al-Fātiḥah' },
  2: { ar: 'البقرة', en: 'Al-Baqarah' },
  3: { ar: 'آل عمران', en: 'Āl ʿImrān' },
  4: { ar: 'النساء', en: 'An-Nisāʾ' },
  5: { ar: 'المائدة', en: 'Al-Māʾidah' },
  6: { ar: 'الأنعام', en: 'Al-Anʿām' },
  7: { ar: 'الأعراف', en: 'Al-Aʿrāf' },
  8: { ar: 'الأنفال', en: 'Al-Anfāl' },
  9: { ar: 'التوبة', en: 'At-Tawbah' },
  11: { ar: 'هود', en: 'Hūd' },
  12: { ar: 'يوسف', en: 'Yūsuf' },
  14: { ar: 'إبراهيم', en: 'Ibrāhīm' },
  15: { ar: 'الحجر', en: 'Al-Ḥijr' },
  16: { ar: 'النحل', en: 'An-Naḥl' },
  17: { ar: 'الإسراء', en: 'Al-Isrāʾ' },
  18: { ar: 'الكهف', en: 'Al-Kahf' },
  20: { ar: 'طه', en: 'Ṭā Hā' },
  21: { ar: 'الأنبياء', en: 'Al-Anbiyāʾ' },
  22: { ar: 'الحج', en: 'Al-Ḥajj' },
  23: { ar: 'المؤمنون', en: 'Al-Muʾminūn' },
  25: { ar: 'الفرقان', en: 'Al-Furqān' },
  27: { ar: 'النمل', en: 'An-Naml' },
  29: { ar: 'العنكبوت', en: 'Al-ʿAnkabūt' },
  33: { ar: 'الأحزاب', en: 'Al-Aḥzāb' },
  36: { ar: 'يس', en: 'Yā Sīn' },
  39: { ar: 'الزمر', en: 'Az-Zumar' },
  41: { ar: 'فصلت', en: 'Fuṣṣilat' },
  45: { ar: 'الجاثية', en: 'Al-Jāthiyah' },
  46: { ar: 'الأحقاف', en: 'Al-Aḥqāf' },
  51: { ar: 'الذاريات', en: 'Adh-Dhāriyāt' },
  57: { ar: 'الحديد', en: 'Al-Ḥadīd' },
  58: { ar: 'المجادلة', en: 'Al-Mujādilah' },
  66: { ar: 'التحريم', en: 'At-Taḥrīm' },
  67: { ar: 'الملك', en: 'Al-Mulk' },
  77: { ar: 'المرسلات', en: 'Al-Mursalāt' },
  78: { ar: 'النبأ', en: 'An-Nabaʾ' },
  114: { ar: 'الناس', en: 'An-Nās' },
};

interface Bound {
  /** الاسم المتعارف عليه للجزء (مطلع أول آية فيه) */
  ar: string;
  en: string;
  /** سورة البداية وآيتها، ثم سورة النهاية وآيتها */
  s1: number; a1: number; s2: number; a2: number;
}

const BOUNDS: readonly Bound[] = [
  { ar: 'الم',                 en: 'Alif Lām Mīm',            s1: 1,  a1: 1,   s2: 2,   a2: 141 },
  { ar: 'سيقول السفهاء',       en: 'Sayaqūl',                 s1: 2,  a1: 142, s2: 2,   a2: 252 },
  { ar: 'تلك الرسل',           en: 'Tilka r-Rusul',           s1: 2,  a1: 253, s2: 3,   a2: 92  },
  { ar: 'لن تنالوا البِرّ',     en: 'Lan Tanālū',              s1: 3,  a1: 93,  s2: 4,   a2: 23  },
  { ar: 'والمحصنات',           en: 'Wa-l-Muḥṣanāt',           s1: 4,  a1: 24,  s2: 4,   a2: 147 },
  { ar: 'لا يحب الله',         en: 'Lā Yuḥibbu Llāh',         s1: 4,  a1: 148, s2: 5,   a2: 81  },
  { ar: 'وإذا سمعوا',          en: 'Wa-Idhā Samiʿū',          s1: 5,  a1: 82,  s2: 6,   a2: 110 },
  { ar: 'ولو أننا نزّلنا',      en: 'Wa-Law Annanā',           s1: 6,  a1: 111, s2: 7,   a2: 87  },
  { ar: 'قال الملأ',           en: 'Qāla l-Malaʾ',            s1: 7,  a1: 88,  s2: 8,   a2: 40  },
  { ar: 'واعلموا',             en: 'Wa-ʿlamū',                s1: 8,  a1: 41,  s2: 9,   a2: 92  },
  { ar: 'يعتذرون',             en: 'Yaʿtadhirūn',             s1: 9,  a1: 93,  s2: 11,  a2: 5   },
  { ar: 'وما من دابّة',         en: 'Wa-Mā Min Dābbah',        s1: 11, a1: 6,   s2: 12,  a2: 52  },
  { ar: 'وما أُبرّئ نفسي',      en: 'Wa-Mā Ubarriʾu',          s1: 12, a1: 53,  s2: 14,  a2: 52  },
  { ar: 'رُبما',               en: 'Rubamā',                  s1: 15, a1: 1,   s2: 16,  a2: 128 },
  { ar: 'سبحان الذي',          en: 'Subḥāna Lladhī',          s1: 17, a1: 1,   s2: 18,  a2: 74  },
  { ar: 'قال ألم أقل لك',      en: 'Qāla Alam Aqul Lak',      s1: 18, a1: 75,  s2: 20,  a2: 135 },
  { ar: 'اقترب للناس',         en: 'Iqtaraba li-n-Nās',       s1: 21, a1: 1,   s2: 22,  a2: 78  },
  { ar: 'قد أفلح المؤمنون',    en: 'Qad Aflaḥa l-Muʾminūn',   s1: 23, a1: 1,   s2: 25,  a2: 20  },
  { ar: 'وقال الذين لا يرجون', en: 'Wa-Qāla Lladhīna',        s1: 25, a1: 21,  s2: 27,  a2: 55  },
  { ar: 'أَمَّنْ خلق',           en: 'Amman Khalaqa',           s1: 27, a1: 56,  s2: 29,  a2: 45  },
  { ar: 'اتْلُ ما أُوحي',       en: 'Utlu Mā Ūḥiya',           s1: 29, a1: 46,  s2: 33,  a2: 30  },
  { ar: 'ومن يقنت',            en: 'Wa-Man Yaqnut',           s1: 33, a1: 31,  s2: 36,  a2: 27  },
  { ar: 'ومَا لِيَ',            en: 'Wa-Mā Liya',              s1: 36, a1: 28,  s2: 39,  a2: 31  },
  { ar: 'فمن أظلم',            en: 'Fa-Man Aẓlamu',           s1: 39, a1: 32,  s2: 41,  a2: 46  },
  { ar: 'إليه يُرَدّ',          en: 'Ilayhi Yuraddu',          s1: 41, a1: 47,  s2: 45,  a2: 37  },
  { ar: 'حم',                  en: 'Ḥā Mīm',                  s1: 46, a1: 1,   s2: 51,  a2: 30  },
  { ar: 'قال فما خطبكم',       en: 'Qāla Fa-Mā Khaṭbukum',    s1: 51, a1: 31,  s2: 57,  a2: 29  },
  { ar: 'قد سمع الله',         en: 'Qad Samiʿa Llāh',         s1: 58, a1: 1,   s2: 66,  a2: 12  },
  { ar: 'تبارك الذي',          en: 'Tabāraka Lladhī',         s1: 67, a1: 1,   s2: 77,  a2: 50  },
  { ar: 'عمّ',                 en: 'ʿAmma',                   s1: 78, a1: 1,   s2: 114, a2: 6   },
] as const;

export const PARTS = BOUNDS.length; // 30

const AR_DIGITS = '٠١٢٣٤٥٦٧٨٩';
const UR_DIGITS = '۰۱۲۳۴۵۶۷۸۹';

/** الأرقام بخط اللغة: عربية-هندية للعربية، أردية للأردية، لاتينية للإنجليزية. */
export function num(n: number, lang: Lang): string {
  const s = String(n);
  if (lang === 'en') return s;
  const d = lang === 'ur' ? UR_DIGITS : AR_DIGITS;
  return s.replace(/[0-9]/g, (c) => d[Number(c)]);
}

export interface JuzInfo {
  n: number;
  /** اسم الجزء */
  name: string;
  /** بدايته */
  from: string;
  /** نهايته */
  to: string;
}

const surahName = (s: number, lang: Lang) => (lang === 'en' ? SURAH[s].en : SURAH[s].ar);

/** معلومات الجزء رقم n (1..30) باللغة المطلوبة. */
export function juzInfo(n: number, lang: Lang): JuzInfo {
  const b = BOUNDS[n - 1];
  return {
    n,
    name: lang === 'en' ? b.en : b.ar,
    from: `${surahName(b.s1, lang)} ${num(b.a1, lang)}`,
    to: `${surahName(b.s2, lang)} ${num(b.a2, lang)}`,
  };
}

/** كل الأجزاء باللغة المطلوبة. */
export const allJuz = (lang: Lang): JuzInfo[] =>
  Array.from({ length: PARTS }, (_, i) => juzInfo(i + 1, lang));

/** رابط قراءة الجزء في مصحف خارجي. */
export const juzReadHref = (n: number, lang: Lang) =>
  `https://quran.com/${lang === 'en' ? 'en' : lang === 'ur' ? 'ur' : 'ar'}/juz/${n}`;
