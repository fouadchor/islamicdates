// Occasion-by-year SEO page data. Build-time only.
import { h2g } from './hijri';

export interface OccDef {
  slug: string;          // url slug base (english, shared across langs)
  hm: number;            // hijri month
  hd: number;            // hijri day
  ar: { name: string; what: string };
  en: { name: string; what: string };
}

// Major Islamic occasions people search for by Gregorian year.
export const OCCASIONS: OccDef[] = [
  {
    slug: 'ramadan', hm: 9, hd: 1,
    ar: {
      name: 'رمضان',
      what: 'رمضان هو الشهر التاسع في التقويم الهجري وشهر الصيام الفريضة عند المسلمين، يمتنعون فيه عن الطعام والشراب من الفجر إلى المغرب. نزل فيه القرآن الكريم، وفيه ليلة القدر التي هي خير من ألف شهر. يستمر الشهر تسعة وعشرين أو ثلاثين يوماً، ويُختتم بعيد الفطر.',
    },
    en: {
      name: 'Ramadan',
      what: 'Ramadan is the ninth month of the Hijri calendar and the month of obligatory fasting, during which Muslims abstain from food and drink from dawn to sunset. The Quran was first revealed in it, and it contains Laylat al-Qadr — the Night of Decree, better than a thousand months. It lasts 29 or 30 days and ends with Eid al-Fitr.',
    },
  },
  {
    slug: 'eid-al-fitr', hm: 10, hd: 1,
    ar: {
      name: 'عيد الفطر',
      what: 'عيد الفطر هو أول أيام شهر شوال، ويأتي مباشرة بعد انتهاء صيام رمضان. يُعرف بالعيد الصغير، ويبدأ بصلاة العيد ثم التزاور وتبادل التهاني، ويُستحب فيه إخراج زكاة الفطر قبل الصلاة.',
    },
    en: {
      name: 'Eid al-Fitr',
      what: 'Eid al-Fitr falls on the first day of Shawwal, immediately after the end of fasting in Ramadan. Known as the "Lesser Eid," it begins with the Eid prayer followed by visits and greetings, and Zakat al-Fitr is given before the prayer.',
    },
  },
  {
    slug: 'eid-al-adha', hm: 12, hd: 10,
    ar: {
      name: 'عيد الأضحى',
      what: 'عيد الأضحى هو العاشر من ذي الحجة، ويأتي بعد يوم عرفة في موسم الحج. يُعرف بالعيد الكبير، ويُحيي ذكرى استعداد النبي إبراهيم عليه السلام للتضحية، فيُضحّى فيه بالأنعام وتُوزّع لحومها على الأهل والفقراء، ويمتد إلى أيام التشريق الثلاثة.',
    },
    en: {
      name: 'Eid al-Adha',
      what: 'Eid al-Adha falls on the 10th of Dhuʾl-Hijjah, the day after Arafah during the Hajj season. Known as the "Greater Eid," it commemorates Prophet Ibrahim\'s willingness to sacrifice; animals are sacrificed and the meat shared with family and the poor. It continues through the three days of Tashriq.',
    },
  },
  {
    slug: 'ashura', hm: 1, hd: 10,
    ar: {
      name: 'عاشوراء',
      what: 'عاشوراء هو اليوم العاشر من شهر محرم. صامه النبي ﷺ وأمر بصيامه شكراً لله على نجاة موسى عليه السلام، ويُستحب صيام التاسع معه. وله مكانة خاصة لدى المسلمين لما يحمله من معانٍ تاريخية ودينية.',
    },
    en: {
      name: 'Ashura',
      what: 'Ashura is the 10th day of Muharram. The Prophet ﷺ fasted it and encouraged fasting it in gratitude for the salvation of Prophet Musa; fasting the 9th alongside it is recommended. It holds special historical and religious significance for Muslims.',
    },
  },
  {
    slug: 'islamic-new-year', hm: 1, hd: 1,
    ar: {
      name: 'رأس السنة الهجرية',
      what: 'رأس السنة الهجرية هو أول يوم من شهر محرم، وبه يبدأ العام الهجري الجديد. ويؤرّخ التقويم الهجري من هجرة النبي محمد ﷺ من مكة إلى المدينة سنة 622 ميلادية، وهي الحدث الذي بدأ منه العدّ.',
    },
    en: {
      name: 'Islamic New Year',
      what: 'The Islamic New Year falls on the first day of Muharram, opening a new Hijri year. The Hijri calendar counts from the migration (Hijra) of Prophet Muhammad ﷺ from Mecca to Medina in 622 CE — the event from which the numbering begins.',
    },
  },
  {
    slug: 'mawlid-al-nabi', hm: 3, hd: 12,
    ar: {
      name: 'المولد النبوي الشريف',
      what: 'المولد النبوي الشريف يوافق الثاني عشر من ربيع الأول، وفيه يحيي كثير من المسلمين ذكرى مولد النبي محمد ﷺ. وتتنوع مظاهر إحيائه بين الدول، من ذكر سيرته وشمائله إلى الدروس والاحتفالات.',
    },
    en: {
      name: 'Mawlid al-Nabi',
      what: 'Mawlid al-Nabi falls on the 12th of Rabiʿ al-Awwal, when many Muslims commemorate the birth of Prophet Muhammad ﷺ. Observances vary across countries, from recounting his life and character to lessons and gatherings.',
    },
  },
  {
    slug: 'day-of-arafah', hm: 12, hd: 9,
    ar: {
      name: 'يوم عرفة',
      what: 'يوم عرفة هو التاسع من ذي الحجة، وهو ركن الحج الأعظم حيث يقف الحجاج على صعيد عرفة. ويُستحب لغير الحاج صيامه، فصيامه يكفّر سنة ماضية وسنة قادمة كما ورد في الحديث.',
    },
    en: {
      name: 'Day of Arafah',
      what: 'The Day of Arafah is the 9th of Dhuʾl-Hijjah and the greatest pillar of Hajj, when pilgrims stand on the plain of Arafah. For non-pilgrims, fasting this day is recommended and is said to expiate the previous and coming year.',
    },
  },
  {
    slug: 'isra-and-miraj', hm: 7, hd: 27,
    ar: {
      name: 'الإسراء والمعراج',
      what: 'الإسراء والمعراج يوافق السابع والعشرين من رجب عند كثير من المسلمين، ويحيي ذكرى رحلة النبي ﷺ الليلية من المسجد الحرام إلى المسجد الأقصى ثم العروج إلى السماوات، وفيها فُرضت الصلوات الخمس.',
    },
    en: {
      name: 'Israʾ and Miʿraj',
      what: 'Israʾ and Miʿraj is observed by many Muslims on the 27th of Rajab, commemorating the Prophet\'s ﷺ night journey from the Sacred Mosque to al-Aqsa and his ascension through the heavens, during which the five daily prayers were ordained.',
    },
  },
  {
    slug: 'laylat-al-qadr', hm: 9, hd: 27,
    ar: {
      name: 'ليلة القدر',
      what: 'ليلة القدر ليلة مباركة في العشر الأواخر من رمضان، وصفها الله بأنها خير من ألف شهر. يُرجّح أنها في الليلة السابعة والعشرين، ويجتهد المسلمون في العبادة والدعاء التماساً لها في الليالي الوترية.',
    },
    en: {
      name: 'Laylat al-Qadr',
      what: 'Laylat al-Qadr is a blessed night in the last ten days of Ramadan, described as better than a thousand months. It is most often sought on the 27th night, and Muslims devote themselves to worship and supplication across the odd nights seeking it.',
    },
  },
  {
    slug: 'mid-shaban', hm: 8, hd: 15,
    ar: {
      name: 'ليلة النصف من شعبان',
      what: 'ليلة النصف من شعبان هي ليلة الخامس عشر من شهر شعبان، يحييها كثير من المسلمين بالدعاء والذكر والصلاة. وقد وردت في فضلها بعض الأحاديث، واختلف أهل العلم في تخصيصها بعبادة معيّنة، والأصل أنها ليلة مباركة يُستحب فيها الإكثار من الطاعات والاستغفار.',
    },
    en: {
      name: 'Mid-Shaʿban',
      what: 'Mid-Shaʿban (Laylat al-Baraʾah) is the 15th night of the month of Shaʿban, observed by many Muslims with supplication, remembrance and prayer. Scholars have differed over singling it out for specific acts of worship, but it is widely regarded as a blessed night for increasing in good deeds and seeking forgiveness.',
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

// ---- formatting helpers ----
import { H_MON_AR, H_MON_EN, G_MON_AR, G_MON_EN, WD_AR, WD_EN } from './data';

export function fmtG(d: Date, ar: boolean): string {
  const wd = (ar ? WD_AR : WD_EN)[d.getUTCDay()];
  const mon = (ar ? G_MON_AR : G_MON_EN)[d.getUTCMonth()];
  return ar ? `${wd}، ${d.getUTCDate()} ${mon} ${d.getUTCFullYear()}` : `${wd}, ${d.getUTCDate()} ${mon} ${d.getUTCFullYear()}`;
}
export function fmtGShort(d: Date, ar: boolean): string {
  const mon = (ar ? G_MON_AR : G_MON_EN)[d.getUTCMonth()];
  return `${d.getUTCDate()} ${mon} ${d.getUTCFullYear()}`;
}
export function fmtH(hy: number, hm: number, hd: number, ar: boolean): string {
  const mon = (ar ? H_MON_AR : H_MON_EN)[hm - 1];
  return ar ? `${hd} ${mon} ${hy} هـ` : `${hd} ${mon} ${hy} AH`;
}
export function isoUTC(d: Date): string {
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth()+1).padStart(2,'0')}-${String(d.getUTCDate()).padStart(2,'0')}`;
}
export function occBasePath(slug: string, gYear: number, ar: boolean): string {
  return ar ? `/${slug}-${gYear}/` : `/en/${slug}-${gYear}/`;
}
