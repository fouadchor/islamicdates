// Curated authentic hadiths — exclusively from Sahih al-Bukhari & Sahih Muslim
// (متفق عليه / رواه البخاري / رواه مسلم). Shown one per day, rotating by day-of-year.
export interface Hadith { ar: string; arSrc: string; en: string; enSrc: string; }

export const HADITHS: Hadith[] = [
  { ar: 'إنَّما الأعمالُ بالنِّيّاتِ، وإنَّما لكلِّ امرئٍ ما نَوى', arSrc: 'متفق عليه', en: 'Actions are but by intentions, and every person will have only what they intended.', enSrc: 'Bukhari & Muslim' },
  { ar: 'مَن كان يؤمنُ باللهِ واليومِ الآخِرِ فليَقُلْ خيرًا أو ليَصمُتْ', arSrc: 'متفق عليه', en: 'Whoever believes in Allah and the Last Day, let him speak good or remain silent.', enSrc: 'Bukhari & Muslim' },
  { ar: 'المسلمُ مَن سَلِمَ المسلمونَ من لسانِه ويدِه', arSrc: 'متفق عليه', en: 'The Muslim is the one from whose tongue and hand other Muslims are safe.', enSrc: 'Bukhari & Muslim' },
  { ar: 'لا يؤمنُ أحدُكم حتى يُحبَّ لأخيهِ ما يُحبُّ لنفسِه', arSrc: 'متفق عليه', en: 'None of you truly believes until he loves for his brother what he loves for himself.', enSrc: 'Bukhari & Muslim' },
  { ar: 'الدِّينُ النَّصيحةُ', arSrc: 'رواه مسلم', en: 'Religion is sincerity and well-wishing.', enSrc: 'Muslim' },
  { ar: 'الطُّهورُ شَطرُ الإيمانِ', arSrc: 'رواه مسلم', en: 'Purity is half of faith.', enSrc: 'Muslim' },
  { ar: 'الكلمةُ الطيِّبةُ صدقةٌ', arSrc: 'متفق عليه', en: 'A good word is a charity.', enSrc: 'Bukhari & Muslim' },
  { ar: 'مَن لا يَرحمُ الناسَ لا يَرحمُه اللهُ', arSrc: 'متفق عليه', en: 'Whoever does not show mercy to people, Allah will not show mercy to him.', enSrc: 'Bukhari & Muslim' },
  { ar: 'إنَّ اللهَ رفيقٌ يُحبُّ الرِّفقَ في الأمرِ كلِّه', arSrc: 'متفق عليه', en: 'Allah is gentle and loves gentleness in all matters.', enSrc: 'Bukhari & Muslim' },
  { ar: 'خيرُكم مَن تعلَّمَ القرآنَ وعلَّمَه', arSrc: 'رواه البخاري', en: 'The best of you are those who learn the Quran and teach it.', enSrc: 'Bukhari' },
  { ar: 'مَن سلكَ طريقًا يلتمِسُ فيه عِلمًا، سهَّلَ اللهُ له به طريقًا إلى الجنةِ', arSrc: 'رواه مسلم', en: 'Whoever travels a path seeking knowledge, Allah will make easy for him a path to Paradise.', enSrc: 'Muslim' },
  { ar: 'إنَّ اللهَ كتبَ الإحسانَ على كلِّ شيءٍ', arSrc: 'رواه مسلم', en: 'Allah has prescribed excellence (ihsan) in all things.', enSrc: 'Muslim' },
  { ar: 'مَن نفَّسَ عن مؤمنٍ كُربةً من كُرَبِ الدنيا، نفَّسَ اللهُ عنه كُربةً من كُرَبِ يومِ القيامةِ', arSrc: 'رواه مسلم', en: 'Whoever relieves a believer of a hardship of this world, Allah will relieve him of a hardship on the Day of Resurrection.', enSrc: 'Muslim' },
  { ar: 'بشِّروا ولا تُنفِّروا، ويسِّروا ولا تُعسِّروا', arSrc: 'متفق عليه', en: 'Give glad tidings and do not repel; make things easy and do not make them hard.', enSrc: 'Bukhari & Muslim' },
  { ar: 'أحبُّ الأعمالِ إلى اللهِ أدْوَمُها وإن قلَّ', arSrc: 'متفق عليه', en: 'The most beloved deeds to Allah are those done consistently, even if small.', enSrc: 'Bukhari & Muslim' },
  { ar: 'إذا ماتَ ابنُ آدمَ انقطعَ عملُه إلا من ثلاثٍ: صدقةٍ جاريةٍ، أو علمٍ يُنتفَعُ به، أو ولدٍ صالحٍ يدعو له', arSrc: 'رواه مسلم', en: 'When a person dies, his deeds end except three: ongoing charity, beneficial knowledge, or a righteous child who prays for him.', enSrc: 'Muslim' },
  { ar: 'الحياءُ لا يأتي إلا بخيرٍ', arSrc: 'متفق عليه', en: 'Modesty brings nothing but good.', enSrc: 'Bukhari & Muslim' },
  { ar: 'مَن غشَّنا فليسَ مِنَّا', arSrc: 'رواه مسلم', en: 'Whoever deceives us is not one of us.', enSrc: 'Muslim' },
  { ar: 'المؤمنُ القويُّ خيرٌ وأحبُّ إلى اللهِ من المؤمنِ الضعيفِ، وفي كلٍّ خيرٌ', arSrc: 'رواه مسلم', en: 'The strong believer is better and more beloved to Allah than the weak believer, though in both there is good.', enSrc: 'Muslim' },
  { ar: 'المسلمُ أخو المسلمِ، لا يَظلِمُه ولا يُسلِمُه', arSrc: 'متفق عليه', en: 'A Muslim is the brother of a Muslim; he neither wrongs him nor forsakes him.', enSrc: 'Bukhari & Muslim' },
];

export function hadithOfDay(d: Date): Hadith {
  const start = Date.UTC(d.getUTCFullYear(), 0, 0);
  const day = Math.floor((Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) - start) / 86400000);
  return HADITHS[((day % HADITHS.length) + HADITHS.length) % HADITHS.length];
}
