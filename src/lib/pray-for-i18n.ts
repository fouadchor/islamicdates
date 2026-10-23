// ─────────────────────────────────────────────────────────────────────────────
// نصوص «ادعوا لـ…» بالعربية والإنجليزية والأردية.
//
// The landing copy is static per language. The page copy depends on three facts
// about the page — the name, deceased or ill, and له or لها — so it is built on
// the server by `pageCopy()`; the part handed to the React island (`card`) is
// plain strings with at most an {n} placeholder, already personalised.
// ─────────────────────────────────────────────────────────────────────────────
import type { Lang } from './data';
import type { Gender, PrayKind } from './pray-for';
import { li } from './pray-for-duas';
import { num } from './khatma-juz';

export type PrayErr =
  | 'not_found' | 'bad_link' | 'unavailable' | 'forbidden'
  | 'rate' | 'rate_pray' | 'empty_name' | 'bad_kind'
  | 'no_token' | 'bad_action' | 'not_admin'
  | 'network' | 'generic';

type Plural = 'zero' | 'one' | 'two' | 'few' | 'many' | 'other';

/** What the island needs — plain strings, already in the right gender and with the name. */
export interface CardT {
  /** Keyed by Intl.PluralRules category, plus `zero` for "nobody yet". {n} = the count. */
  count: Partial<Record<Plural, string>> & { zero: string; other: string };
  pray: string;
  praying: string;
  prayHint: string;
  thanks: string;
  sharePrompt: string;
  shareText: string;
  shareWa: string; shareNative: string; shareCopy: string; shareCopied: string;
  adminLead: string; adminDelete: string; adminConfirm: string; adminDeleted: string; createNew: string;
  err: Record<PrayErr, string>;
}

export interface PageCopy {
  title: string;
  description: string;
  h1: string;
  lead: string;
  intro: string;
  duasH: string;
  reminderH: string;
  reminder: string;
  ogAlt: string;
  card: CardT;
}

export interface LandingT {
  dir: 'rtl' | 'ltr';
  base: string;
  tagline: string;
  home: string;
  /** Tile on the home page and link in the footer. */
  toolLabel: string; toolSub: string;
  metaTitle: string; metaDesc: string;
  h1: string; intro: string;
  formH: string;
  kindLabel: string;
  kinds: Record<PrayKind, { t: string; d: string }>;
  nameLabel: string; namePh: string; nameHint: string;
  genderLabel: string; genders: Record<Gender, string>; genderHint: string;
  submit: string; submitting: string;
  stepsH: string; steps: { t: string; d: string }[];
  duasDeceasedH: string; duasSickH: string; duasNote: string;
  rulesH: string; rules: { b: string; t: string }[];
  faqH: string; faq: { q: string; a: string }[];
  relatedH: string; related: { href: string; label: string }[];
  footerNote: string; privacyLabel: string; privacyHref: string;
  newNoteLead: string; newNote: string;
  notFoundH: string; notFoundBody: string;
  unavailableH: string; unavailableBody: string;
  createNew: string; navNew: string;
  /** Errors the landing form can show. */
  err: Record<PrayErr, string>;
  page: (name: string, kind: PrayKind, g: Gender, prayers: number) => PageCopy;
}

const fill = (s: string, v: Record<string, string>) => s.replace(/\{(\w+)\}/g, (m, k) => v[k] ?? m);

// ── العربية ──────────────────────────────────────────────────────────────────
const AR_ERR: Record<PrayErr, string> = {
  not_found: 'لم نجد هذه الصفحة.',
  bad_link: 'رابط غير صالح.',
  unavailable: 'الخدمة غير متاحة حالياً.',
  forbidden: 'طلب غير مسموح.',
  rate: 'أنشأتَ صفحات كثيرة خلال ساعة. حاول بعد قليل.',
  rate_pray: 'ضغطات كثيرة من هذه الشبكة خلال ساعة. حاول بعد قليل.',
  empty_name: 'اكتب الاسم.',
  bad_kind: 'اختر: لمتوفّى أو لمريض، وله أو لها.',
  no_token: 'تعذّر التعرّف على هذا المتصفح. أعد تحميل الصفحة.',
  bad_action: 'إجراء غير معروف.',
  not_admin: 'لا تُحذف الصفحة إلا من المتصفح الذي أنشأها.',
  network: 'تعذّر الاتصال. تحقّق من الشبكة وأعد المحاولة.',
  generic: 'تعذّر إتمام الطلب.',
};

const AR: LandingT = {
  dir: 'rtl',
  base: '/pray-for/',
  tagline: 'صفحة دعاء',
  home: 'الرئيسية',
  toolLabel: 'صفحة دعاء لمتوفّى أو مريض',
  toolSub: 'رابط واحد يجمع الدعاء له من الأهل والأصحاب',
  metaTitle: 'صفحة دعاء لمتوفّى أو مريض · رابط واحد يجمع الدعاء له',
  metaDesc: 'أنشئ صفحة دعاء لمن فقدته أو لمريض تحبّه، مجاناً وبلا تسجيل: رابط واحد ترسله للأهل والأصدقاء، فيقرأ كلٌّ منهم الدعاء من القرآن والسنة ويضغط «دعوت له»، ويرى الجميع عدد من دعا.',
  h1: 'ادعوا له: صفحة دعاء لمتوفّى أو مريض',
  intro: 'حين يرحل عزيز أو يمرض، يسأل أهله وأصحابه: ماذا نقدّم له؟ الدعاء. أنشئ صفحة باسمه وأرسل رابطها في مجموعة العائلة، فيجد كل من يفتحها أدعية ثابتة من القرآن والسنة يقرؤها له، ثم يضغط «دعوت له» فيكبر العدّاد. بلا تسجيل ولا تطبيق.',
  formH: 'أنشئ صفحة دعاء',
  kindLabel: 'لمن الدعاء؟',
  kinds: {
    deceased: { t: 'لمتوفّى', d: 'الدعاء بالرحمة والمغفرة' },
    sick: { t: 'لمريض', d: 'الدعاء بالشفاء والعافية' },
  },
  nameLabel: 'الاسم',
  namePh: 'مثال: الوالد محمد بن أحمد',
  nameHint: 'كما يعرفه أهله وأصحابه. يظهر في عنوان الصفحة وفي الدعاء نفسه.',
  genderLabel: 'صيغة الدعاء',
  genders: { m: 'له', f: 'لها' },
  genderHint: 'تُكتب الأدعية بالضمير الصحيح: «اللهم اغفر له» أو «اللهم اغفر لها».',
  submit: 'إنشاء الصفحة',
  submitting: 'جارٍ الإنشاء…',
  stepsH: 'كيف تعمل؟',
  steps: [
    { t: 'اكتب الاسم', d: 'اختر: لمتوفّى أو لمريض، واكتب الاسم الذي يعرفه به الناس. بلا حساب ولا بريد ولا رقم هاتف.' },
    { t: 'أرسل الرابط', d: 'ينشأ رابط واحد للصفحة. أرسله في مجموعة العائلة أو الأصدقاء، أو مع رسالة العزاء.' },
    { t: 'كلٌّ يدعو له', d: 'من يفتح الرابط يجد الأدعية جاهزة بالاسم والضمير الصحيح، فيقرؤها ويضغط «دعوت له»، ويرى الجميع كم شخصاً دعا.' },
  ],
  duasDeceasedH: 'أدعية للميت من القرآن والسنة',
  duasSickH: 'أدعية للمريض بالشفاء',
  duasNote: 'هذه الأدعية نفسها تظهر في كل صفحة بالاسم والضمير المناسبين. ولك أن تدعو بما شئت وبأي لغة.',
  rulesH: 'ضوابط راعيناها',
  rules: [
    { b: 'الدعاء لا الإهداء.', t: 'تقتصر الصفحة على الدعاء، وهو ينفع الميت باتفاق أهل العلم. ولا نقدّم فيها قراءةً أو ختمةً تُهدى، لأن وصول ثواب التلاوة إلى الميت محلّ خلاف.' },
    { b: 'لا عدد مقصود.', t: 'العدّاد ليعرف الأهل أن الناس دعوا لفقيدهم، لا هدفاً يُسعى إليه. لا نضع رقماً ولا نَعِد بشيء عند بلوغه.' },
    { b: 'أدعية ثابتة.', t: 'من القرآن والسنة الصحيحة مع مصدر كل دعاء، وبضمائر المؤنّث إن كان الدعاء لامرأة.' },
    { b: 'لا أسماء ولا تنافس.', t: 'لا نطلب اسم من يدعو، ولا نعرض قائمة بمن دعا.' },
    { b: 'صفحة خاصة.', t: 'لا تظهر في محركات البحث، ولا يفتحها إلا من معه الرابط، ويستطيع منشئها حذفها متى شاء.' },
  ],
  faqH: 'أسئلة شائعة',
  faq: [
    { q: 'هل ينتفع الميت بدعاء الأحياء؟', a: 'نعم، باتفاق أهل العلم. قال تعالى في وصف المؤمنين: ﴿رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ﴾ [الحشر: ١٠]، وقال النبي ﷺ: «إذا مات الإنسان انقطع عنه عمله إلا من ثلاثة: إلا من صدقة جارية، أو علم يُنتفع به، أو ولد صالح يدعو له» رواه مسلم. وكان ﷺ يدعو للأموات في صلاة الجنازة وعند زيارة القبور.' },
    { q: 'هل لبلوغ أربعين أو مئة شخص فضل خاص؟', a: 'ورد في صحيح مسلم فضلُ أن يصلّي على الميت أربعون أو مئة من المسلمين يشفعون له، وذلك في صلاة الجنازة خاصة. أما الدعاء عبر صفحة كهذه فلم يرد فيه عدد، ولذلك لا نضع هدفاً عددياً: دعاء واحد صادق خير من عدّاد كبير.' },
    { q: 'لماذا لا تقدّمون ختمة أو قراءة تُهدى للميت؟', a: 'لأن وصول ثواب قراءة القرآن إلى الميت مسألة خلافية بين المذاهب، أما الدعاء فمتفق على نفعه. ومن أراد قراءة القرآن مع غيره فالختمة الجماعية في الموقع متاحة قراءةً عامة بلا إهداء.' },
    { q: 'هل تصلح الصفحة للدعاء لمريض؟', a: 'نعم. اختر «لمريض» عند الإنشاء، فتظهر أدعية الشفاء الثابتة، ومنها ما كان النبي ﷺ يرقي به المرضى. والدعاء للمسلم بظهر الغيب مستجاب، ففي صحيح مسلم: «دعوة المرء المسلم لأخيه بظهر الغيب مستجابة».' },
    { q: 'هل أحتاج إلى حساب؟ وهل يظهر اسمي؟', a: 'لا هذا ولا ذاك. الرابط وحده يكفي، ولا نطلب اسم من يدعو. نحفظ في متصفحك رمزاً عشوائياً حتى لا يُحسب دعاؤك مرتين، ولا يرتبط بهويتك.' },
    { q: 'هل يمكن حذف الصفحة؟', a: 'نعم. في المتصفح الذي أنشأها يظهر زرّ «حذف الصفحة» أسفلها، فيُحذف الاسم والعدّاد نهائياً. وإن أنشأتها من جهاز آخر فراسلنا على contact@islamicdates.org مع الرابط.' },
  ],
  relatedH: 'أدوات ذات صلة',
  related: [
    { href: '/dua/', label: 'أدعية وأذكار من القرآن والسنة' },
    { href: '/dua/health-protection/', label: 'أدعية الشفاء والرقية' },
    { href: '/khatma/', label: 'ختمة قرآن جماعية' },
    { href: '/prayer-times/', label: 'مواقيت الصلاة حسب المدينة' },
    { href: '/', label: 'التقويم الهجري وتاريخ اليوم' },
  ],
  footerNote: 'صفحة دعاء بلا تسجيل · لا نطلب اسم من يدعو',
  privacyLabel: 'سياسة الخصوصية',
  privacyHref: '/privacy/',
  newNoteLead: 'أُنشئت الصفحة.',
  newNote: 'أرسل رابطها في مجموعة العائلة والأصدقاء، واحتفظ به عندك؛ فمن هذا المتصفح وحده تستطيع حذف الصفحة لاحقاً.',
  notFoundH: 'لم نجد هذه الصفحة',
  notFoundBody: 'الرابط غير صحيح، أو أن منشئها حذفها. تأكّد من نسخ الرابط كاملاً، أو أنشئ صفحة دعاء جديدة.',
  unavailableH: 'الخدمة غير متاحة حالياً',
  unavailableBody: 'تعذّر الوصول إلى بيانات الصفحة في هذه اللحظة. أعد المحاولة بعد قليل.',
  createNew: 'إنشاء صفحة دعاء جديدة',
  navNew: 'صفحة جديدة',
  err: AR_ERR,
  page: (name, kind, g, prayers) => {
    const L = li(name, false);
    const lahu = g === 'f' ? 'لها' : 'له';
    const dead = kind === 'deceased';
    const rahimahu = g === 'f' ? 'رحمها الله' : 'رحمه الله';
    const shafahu = g === 'f' ? 'شفاها الله' : 'شفاه الله';
    const ahlu = g === 'f' ? 'أهلها' : 'أهله';
    const count = {
      zero: `كن أول من يدعو ${lahu}`,
      one: `دعا ${lahu} شخص واحد`,
      two: `دعا ${lahu} شخصان`,
      few: `دعا ${lahu} {n} أشخاص`,
      many: `دعا ${lahu} {n} شخصاً`,
      other: `دعا ${lahu} {n} شخص`,
    };
    const n = num(prayers, 'ar');
    const tally = prayers === 0 ? '' : ` ${fill(count[pluralAr(prayers)], { n })}.`;
    return {
      title: dead ? `ادعوا ${L} · ${rahimahu}` : `ادعوا ${L} بالشفاء · ${shafahu}`,
      description: dead
        ? `صفحة دعاء ${L}، ${rahimahu}. اقرأ ${lahu} الدعاء من القرآن والسنة، ثم اضغط «دعوت ${lahu}».${tally}`
        : `صفحة دعاء ${L} بالشفاء، ${shafahu}. اقرأ ${lahu} الدعاء من القرآن والسنة، ثم اضغط «دعوت ${lahu}».${tally}`,
      h1: `ادعوا ${L}`,
      lead: dead ? (g === 'f' ? 'رحمها الله وغفر لها' : 'رحمه الله وغفر له') : (g === 'f' ? 'شفاها الله وعافاها' : 'شفاه الله وعافاه'),
      intro: dead
        ? `اقرأ ${lahu} ما تيسّر من هذه الأدعية، أو ادعُ ${lahu} بما شئت وبلغتك، ثم اضغط «دعوت ${lahu}» ليعرف ${ahlu} أنك دعوت.`
        : `ادعُ ${lahu} بالشفاء بما تيسّر من هذه الأدعية أو بما شئت، ثم اضغط «دعوت ${lahu}» ليعرف ${ahlu} أنك دعوت.`,
      duasH: 'أدعية من القرآن والسنة',
      reminderH: 'تذكير',
      reminder: dead
        ? 'قال النبي ﷺ: «إذا مات الإنسان انقطع عنه عمله إلا من ثلاثة: إلا من صدقة جارية، أو علم يُنتفع به، أو ولد صالح يدعو له» رواه مسلم. فالدعاء من أنفع ما يُقدَّم للميت، ولا يُشترط له لفظ ولا وقت ولا عدد.'
        : 'قال النبي ﷺ: «دعوة المرء المسلم لأخيه بظهر الغيب مستجابة، عند رأسه ملك موكّل، كلما دعا لأخيه بخير قال الملك الموكّل به: آمين ولك بمثل» رواه مسلم. فادعُ بما شئت، ولك مثل ما دعوت.',
      ogAlt: dead ? `ادعوا ${L} — ${rahimahu}` : `ادعوا ${L} بالشفاء`,
      card: {
        count,
        pray: `دعوتُ ${lahu}`,
        praying: 'لحظة…',
        prayHint: 'اضغط بعد أن تدعو. يُحسب كل جهاز مرة واحدة.',
        thanks: `تقبّل الله دعاءك. أرسل الرابط ليدعو ${lahu} غيرك.`,
        sharePrompt: `أرسل الرابط ليدعو ${lahu} غيرك:`,
        shareText: dead
          ? `ادعوا ${L}، ${rahimahu}. اقرأ الدعاء واضغط «دعوت ${lahu}»:`
          : `ادعوا ${L} بالشفاء، ${shafahu}. اقرأ الدعاء واضغط «دعوت ${lahu}»:`,
        shareWa: 'مشاركة على واتساب', shareNative: 'تطبيقات أخرى…', shareCopy: 'نسخ الرابط', shareCopied: 'تم نسخ الرابط',
        adminLead: 'أنت أنشأت هذه الصفحة من هذا المتصفح.',
        adminDelete: 'حذف الصفحة',
        adminConfirm: 'حذف الصفحة نهائياً؟ يُحذف الاسم والعدّاد، ولا يعود الرابط يعمل.',
        adminDeleted: 'حُذفت الصفحة.',
        createNew: 'إنشاء صفحة دعاء جديدة',
        err: AR_ERR,
      },
    };
  },
};

/** Arabic plural category without relying on the runtime's ICU data. */
function pluralAr(n: number): Plural {
  if (n === 0) return 'zero';
  if (n === 1) return 'one';
  if (n === 2) return 'two';
  const m = n % 100;
  if (m >= 3 && m <= 10) return 'few';
  if (m >= 11 && m <= 99) return 'many';
  return 'other';
}

// ── English ──────────────────────────────────────────────────────────────────
const EN_ERR: Record<PrayErr, string> = {
  not_found: 'We could not find this page.',
  bad_link: 'This link is not valid.',
  unavailable: 'The service is unavailable right now.',
  forbidden: 'Request not allowed.',
  rate: 'You have created many pages in the last hour. Please try again shortly.',
  rate_pray: 'Too many presses from this network in the last hour. Please try again shortly.',
  empty_name: 'Please write the name.',
  bad_kind: 'Choose whether the page is for someone who has died or is ill, and him or her.',
  no_token: 'This browser could not be recognised. Please reload the page.',
  bad_action: 'Unknown action.',
  not_admin: 'Only the browser that created the page can delete it.',
  network: 'Could not connect. Check your connection and try again.',
  generic: 'Something went wrong.',
};

const EN: LandingT = {
  dir: 'ltr',
  base: '/en/pray-for/',
  tagline: 'Prayer page',
  home: 'Home',
  toolLabel: 'Prayer page for the deceased or ill',
  toolSub: 'One link that gathers prayers from family and friends',
  metaTitle: 'Prayer page for someone who has died or is ill · one link gathers the dua',
  metaDesc: 'Create a free prayer page, with no sign-up, for someone you have lost or someone who is ill: one link for family and friends, each reads supplications from the Qur’an and Sunnah and presses “I prayed”, and everyone sees how many have prayed.',
  h1: 'Pray for them: a prayer page for someone who has died or is ill',
  intro: 'When someone dear dies or falls ill, their family and friends ask what they can do for them. Pray. Create a page in their name and send its link to the family group: whoever opens it finds established supplications from the Qur’an and Sunnah to read for them, then presses “I prayed” and the count rises. No sign-up, no app.',
  formH: 'Create a prayer page',
  kindLabel: 'Who is the prayer for?',
  kinds: {
    deceased: { t: 'Someone who has died', d: 'Prayers for mercy and forgiveness' },
    sick: { t: 'Someone who is ill', d: 'Prayers for healing and well-being' },
  },
  nameLabel: 'Name',
  namePh: 'e.g. My father, Muhammad Ahmad',
  nameHint: 'As family and friends know them. It appears in the page title and in the supplication itself.',
  genderLabel: 'The prayer is for',
  genders: { m: 'Him', f: 'Her' },
  genderHint: 'The Arabic supplications use the right pronoun: “allahumma-ghfir lahu” for a man, “lahā” for a woman.',
  submit: 'Create the page',
  submitting: 'Creating…',
  stepsH: 'How it works',
  steps: [
    { t: 'Write the name', d: 'Choose someone who has died or someone who is ill, and write the name people know them by. No account, no e-mail, no phone number.' },
    { t: 'Send the link', d: 'One link is created for the page. Send it to the family or friends group, or with a message of condolence.' },
    { t: 'Everyone prays', d: 'Whoever opens it finds the supplications ready, with the name and the right pronouns. They read, press “I prayed”, and everyone sees how many have prayed.' },
  ],
  duasDeceasedH: 'Supplications for the deceased from the Qur’an and Sunnah',
  duasSickH: 'Supplications for the sick',
  duasNote: 'These same supplications appear on every page, with the right name and pronouns. You are free to pray in your own words, in any language.',
  rulesH: 'What we were careful about',
  rules: [
    { b: 'Supplication, not dedication.', t: 'The page is only supplication, which benefits the dead by agreement of the scholars. It offers no reading or khatma “gifted” to them, since whether the reward of recitation reaches the dead is disputed.' },
    { b: 'No target number.', t: 'The count is there so the family know people prayed — not a goal. We set no number and promise nothing for reaching one.' },
    { b: 'Established supplications.', t: 'From the Qur’an and authentic Sunnah, each with its source, and in the feminine form when the prayer is for a woman.' },
    { b: 'No names, no ranking.', t: 'We never ask who prayed and never list them.' },
    { b: 'A private page.', t: 'It is kept out of search engines, only people with the link can open it, and its creator can delete it at any time.' },
  ],
  faqH: 'Common questions',
  faq: [
    { q: 'Do the dead benefit from the prayers of the living?', a: 'Yes, by agreement of the scholars. Allah describes the believers as saying: “Our Lord, forgive us and our brothers who went before us in faith” (al-Hashr 59:10), and the Prophet ﷺ said: “When a person dies, his deeds come to an end except for three: ongoing charity, knowledge that benefits, or a righteous child who prays for him” (Muslim). He ﷺ himself prayed for the dead in the funeral prayer and when visiting graves.' },
    { q: 'Is there special merit in reaching forty or a hundred people?', a: 'Sahih Muslim reports the merit of forty, or a hundred, Muslims praying over the deceased and interceding for them — but that is about the funeral prayer itself. No number is reported for supplication made like this, which is why the page sets no target: one sincere prayer is worth more than a large count.' },
    { q: 'Why is there no khatma or reading dedicated to the deceased?', a: 'Because whether the reward of reciting the Qur’an reaches the dead is disputed between the schools, while supplication is agreed to benefit them. If you want to read the Qur’an with others, the site’s group khatma is there as a general reading, without dedication.' },
    { q: 'Can I use it for someone who is ill?', a: 'Yes. Choose “Someone who is ill” when creating the page and it shows the established supplications for healing, including those the Prophet ﷺ recited over the sick. And a Muslim’s prayer for his brother in his absence is answered, as Sahih Muslim reports.' },
    { q: 'Do I need an account? Will my name show?', a: 'Neither. The link is all anyone needs, and we never ask who prayed. Your browser keeps a random code so your prayer is not counted twice; it is not linked to who you are.' },
    { q: 'Can the page be deleted?', a: 'Yes. In the browser that created it, a “Delete page” button appears at the bottom, and the name and count are removed for good. If you created it on another device, write to contact@islamicdates.org with the link.' },
  ],
  relatedH: 'Related tools',
  related: [
    { href: '/en/dua/', label: 'Supplications from the Qur’an and Sunnah' },
    { href: '/en/dua/health-protection/', label: 'Supplications for healing and ruqyah' },
    { href: '/en/khatma/', label: 'Group Quran khatma' },
    { href: '/en/prayer-times/', label: 'Prayer times by city' },
    { href: '/en/', label: 'Hijri calendar and today’s date' },
  ],
  footerNote: 'Prayer page with no sign-up · we never ask who prayed',
  privacyLabel: 'Privacy Policy',
  privacyHref: '/en/privacy/',
  newNoteLead: 'The page is ready.',
  newNote: 'Send its link to your family and friends group, and keep it yourself: only this browser can delete the page later.',
  notFoundH: 'We could not find this page',
  notFoundBody: 'The link is incomplete, or its creator deleted the page. Check that you copied the whole link, or create a new prayer page.',
  unavailableH: 'The service is unavailable right now',
  unavailableBody: 'The page’s data could not be reached at this moment. Please try again shortly.',
  createNew: 'Create a new prayer page',
  navNew: 'New page',
  err: EN_ERR,
  page: (name, kind, g, prayers) => {
    const him = g === 'f' ? 'her' : 'him';
    const his = g === 'f' ? 'her' : 'his';
    const dead = kind === 'deceased';
    const count = {
      zero: `Be the first to pray for ${him}`,
      one: `{n} person has prayed for ${him}`,
      other: `{n} people have prayed for ${him}`,
    };
    const tally = prayers === 0 ? '' : ` ${fill(prayers === 1 ? count.one : count.other, { n: String(prayers) })}.`;
    return {
      title: dead ? `Pray for ${name} · may Allah have mercy on ${him}` : `Pray for ${name}’s recovery`,
      description: dead
        ? `A prayer page for ${name}, may Allah have mercy on ${him}. Read a supplication from the Qur’an and Sunnah for ${him}, then press “I prayed for ${him}”.${tally}`
        : `A prayer page for ${name}’s recovery. Read a supplication for healing from the Qur’an and Sunnah, then press “I prayed for ${him}”.${tally}`,
      h1: `Pray for ${name}`,
      lead: dead ? `May Allah have mercy on ${him} and forgive ${him}.` : `May Allah heal ${him} and grant ${him} well-being.`,
      intro: dead
        ? `Read whichever of these supplications you can — or pray for ${him} in your own words and language — then press “I prayed for ${him}” so ${his} family know you prayed.`
        : `Pray for ${his} healing with these supplications, or in your own words, then press “I prayed for ${him}” so ${his} family know you prayed.`,
      duasH: 'Supplications from the Qur’an and Sunnah',
      reminderH: 'A reminder',
      reminder: dead
        ? 'The Prophet ﷺ said: “When a person dies, his deeds come to an end except for three: ongoing charity, knowledge that benefits, or a righteous child who prays for him” (Muslim). Supplication is among the most beneficial things that can be offered for the dead, and it needs no set wording, time or number.'
        : 'The Prophet ﷺ said: “The supplication of a Muslim for his brother in his absence is answered. At his head is an appointed angel; whenever he prays for good for his brother, the angel says: Amin, and the same for you” (Muslim). Pray in whatever words you wish — and the same is yours.',
      ogAlt: dead ? `Pray for ${name}` : `Pray for ${name}’s recovery`,
      card: {
        count,
        pray: `I prayed for ${him}`,
        praying: 'One moment…',
        prayHint: 'Press it once you have prayed. Each device counts once.',
        thanks: `May Allah accept your prayer. Send the link so others can pray for ${him} too.`,
        sharePrompt: `Send the link so others can pray for ${him} too:`,
        shareText: dead
          ? `Pray for ${name}, may Allah have mercy on ${him}. Read the supplication and press “I prayed”:`
          : `Pray for ${name}’s recovery. Read the supplication and press “I prayed”:`,
        shareWa: 'Share on WhatsApp', shareNative: 'Other apps…', shareCopy: 'Copy link', shareCopied: 'Link copied',
        adminLead: 'You created this page in this browser.',
        adminDelete: 'Delete page',
        adminConfirm: 'Delete this page for good? The name and the count are removed and the link stops working.',
        adminDeleted: 'The page has been deleted.',
        createNew: 'Create a new prayer page',
        err: EN_ERR,
      },
    };
  },
};

// ── اردو ─────────────────────────────────────────────────────────────────────
const UR_ERR: Record<PrayErr, string> = {
  not_found: 'یہ صفحہ نہیں ملا۔',
  bad_link: 'لنک درست نہیں۔',
  unavailable: 'سروس اس وقت دستیاب نہیں۔',
  forbidden: 'یہ درخواست قابلِ قبول نہیں۔',
  rate: 'آپ نے ایک گھنٹے میں بہت سے صفحات بنائے ہیں۔ تھوڑی دیر بعد کوشش کریں۔',
  rate_pray: 'اس نیٹ ورک سے ایک گھنٹے میں بہت زیادہ کوششیں ہوئیں۔ تھوڑی دیر بعد کوشش کریں۔',
  empty_name: 'نام لکھیں۔',
  bad_kind: 'منتخب کریں کہ دعا مرحوم کے لیے ہے یا بیمار کے لیے، اور مرد یا عورت۔',
  no_token: 'اس براؤزر کی شناخت نہیں ہو سکی۔ صفحہ دوبارہ لوڈ کریں۔',
  bad_action: 'نامعلوم عمل۔',
  not_admin: 'صفحہ صرف اسی براؤزر سے حذف ہو سکتا ہے جس سے بنایا گیا۔',
  network: 'رابطہ نہیں ہو سکا۔ نیٹ ورک دیکھ کر دوبارہ کوشش کریں۔',
  generic: 'درخواست مکمل نہیں ہو سکی۔',
};

const UR: LandingT = {
  dir: 'rtl',
  base: '/ur/pray-for/',
  tagline: 'دعا کا صفحہ',
  home: 'ہوم',
  toolLabel: 'مرحوم یا بیمار کے لیے دعا کا صفحہ',
  toolSub: 'ایک لنک پر گھر والوں اور دوستوں کی دعائیں',
  metaTitle: 'مرحوم یا بیمار کے لیے دعا کا صفحہ · ایک لنک پر سب کی دعائیں',
  metaDesc: 'کسی بچھڑ جانے والے یا بیمار عزیز کے لیے مفت اور بغیر رجسٹریشن دعا کا صفحہ بنائیں: ایک لنک گھر والوں اور دوستوں کو بھیجیں، ہر کوئی قرآن و سنت کی دعا پڑھ کر «میں نے دعا کی» دبائے، اور سب دیکھیں کہ کتنے لوگوں نے دعا کی۔',
  h1: 'ان کے لیے دعا کریں: مرحوم یا بیمار کے لیے دعا کا صفحہ',
  intro: 'جب کوئی عزیز دنیا سے رخصت ہو جائے یا بیمار ہو، تو گھر والے اور دوست پوچھتے ہیں کہ ہم ان کے لیے کیا کریں؟ دعا۔ ان کے نام سے ایک صفحہ بنائیں اور اس کا لنک خاندان کے گروپ میں بھیج دیں؛ جو بھی اسے کھولے گا اسے قرآن و سنت کی ثابت دعائیں ملیں گی، وہ ان کے لیے پڑھ کر «میں نے دعا کی» دبائے گا اور گنتی بڑھ جائے گی۔ نہ رجسٹریشن، نہ ایپ۔',
  formH: 'دعا کا صفحہ بنائیں',
  kindLabel: 'دعا کس کے لیے ہے؟',
  kinds: {
    deceased: { t: 'مرحوم کے لیے', d: 'مغفرت اور رحمت کی دعا' },
    sick: { t: 'بیمار کے لیے', d: 'شفا اور عافیت کی دعا' },
  },
  nameLabel: 'نام',
  namePh: 'مثال: والد صاحب محمد احمد',
  nameHint: 'جس نام سے گھر والے اور دوست انہیں جانتے ہیں۔ یہ صفحے کے عنوان اور خود دعا میں نظر آئے گا۔',
  genderLabel: 'دعا کس کے لیے',
  genders: { m: 'مرد', f: 'عورت' },
  genderHint: 'عربی دعاؤں میں ضمیر اسی کے مطابق ہوں گے: «اللهم اغفر له» یا «اللهم اغفر لها»۔',
  submit: 'صفحہ بنائیں',
  submitting: 'بن رہا ہے…',
  stepsH: 'یہ کیسے کام کرتا ہے؟',
  steps: [
    { t: 'نام لکھیں', d: 'منتخب کریں کہ دعا مرحوم کے لیے ہے یا بیمار کے لیے، اور وہ نام لکھیں جس سے لوگ انہیں جانتے ہیں۔ نہ اکاؤنٹ، نہ ای میل، نہ فون نمبر۔' },
    { t: 'لنک بھیجیں', d: 'صفحے کا ایک لنک بنتا ہے۔ اسے خاندان یا دوستوں کے گروپ میں، یا تعزیت کے پیغام کے ساتھ بھیج دیں۔' },
    { t: 'سب دعا کریں', d: 'جو بھی لنک کھولے، اسے نام اور درست ضمیروں کے ساتھ دعائیں تیار ملیں گی۔ وہ پڑھ کر «میں نے دعا کی» دبائے، اور سب دیکھیں کہ کتنے لوگوں نے دعا کی۔' },
  ],
  duasDeceasedH: 'مرحوم کے لیے قرآن و سنت کی دعائیں',
  duasSickH: 'بیمار کی شفا کے لیے دعائیں',
  duasNote: 'یہی دعائیں ہر صفحے پر مناسب نام اور ضمیر کے ساتھ ظاہر ہوتی ہیں۔ آپ اپنے الفاظ میں اور کسی بھی زبان میں دعا کر سکتے ہیں۔',
  rulesH: 'جن باتوں کا ہم نے خیال رکھا',
  rules: [
    { b: 'دعا، ایصالِ ثواب نہیں۔', t: 'صفحہ صرف دعا کے لیے ہے، جس کا میت کو فائدہ پہنچنا علما کے اتفاق سے ثابت ہے۔ اس میں ایصالِ ثواب کے لیے کوئی تلاوت یا ختم نہیں رکھا گیا، کیونکہ تلاوت کا ثواب میت تک پہنچنے میں علما کا اختلاف ہے۔' },
    { b: 'کوئی ہدف نہیں۔', t: 'گنتی اس لیے ہے کہ گھر والوں کو معلوم ہو کہ لوگوں نے دعا کی — یہ کوئی ہدف نہیں۔ ہم کوئی عدد مقرر نہیں کرتے اور کسی عدد تک پہنچنے پر کوئی وعدہ نہیں کرتے۔' },
    { b: 'ثابت دعائیں۔', t: 'قرآن اور صحیح سنت سے، ہر دعا کے حوالے کے ساتھ، اور عورت کے لیے مؤنث صیغے میں۔' },
    { b: 'نہ نام، نہ مقابلہ۔', t: 'ہم دعا کرنے والے کا نام نہیں پوچھتے اور نہ دعا کرنے والوں کی فہرست دکھاتے ہیں۔' },
    { b: 'نجی صفحہ۔', t: 'یہ سرچ انجنوں میں ظاہر نہیں ہوتا، صرف لنک رکھنے والے اسے کھول سکتے ہیں، اور بنانے والا جب چاہے اسے حذف کر سکتا ہے۔' },
  ],
  faqH: 'عام سوالات',
  faq: [
    { q: 'کیا زندوں کی دعا سے میت کو فائدہ پہنچتا ہے؟', a: 'جی ہاں، علما کے اتفاق سے۔ اللہ تعالیٰ مومنوں کا قول بیان فرماتا ہے: ﴿رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ﴾ (الحشر: ۱۰)، اور نبی ﷺ نے فرمایا: «جب انسان فوت ہو جاتا ہے تو اس کا عمل ختم ہو جاتا ہے سوائے تین چیزوں کے: صدقۂ جاریہ، یا وہ علم جس سے فائدہ اٹھایا جائے، یا نیک اولاد جو اس کے لیے دعا کرے» (مسلم)۔ نبی ﷺ خود نمازِ جنازہ میں اور قبروں کی زیارت کے وقت مُردوں کے لیے دعا فرماتے تھے۔' },
    { q: 'کیا چالیس یا سو لوگوں تک پہنچنے کی کوئی خاص فضیلت ہے؟', a: 'صحیح مسلم میں یہ فضیلت آئی ہے کہ چالیس یا سو مسلمان میت کی نمازِ جنازہ پڑھیں اور اس کے لیے سفارش کریں — لیکن یہ خاص نمازِ جنازہ کے بارے میں ہے۔ اس طرح کی دعا کے لیے کوئی عدد وارد نہیں، اسی لیے صفحے پر کوئی ہدف نہیں رکھا گیا: ایک سچی دعا بڑی گنتی سے بہتر ہے۔' },
    { q: 'اس میں میت کے لیے ختم یا تلاوت کیوں نہیں؟', a: 'کیونکہ تلاوتِ قرآن کا ثواب میت تک پہنچنے کے بارے میں مسالک میں اختلاف ہے، جبکہ دعا کا فائدہ متفق علیہ ہے۔ اگر آپ دوسروں کے ساتھ مل کر قرآن پڑھنا چاہیں تو سائٹ کا اجتماعی ختم عام تلاوت کے طور پر موجود ہے۔' },
    { q: 'کیا یہ بیمار کے لیے بھی ہے؟', a: 'جی ہاں۔ صفحہ بناتے وقت «بیمار کے لیے» منتخب کریں تو شفا کی ثابت دعائیں ظاہر ہوں گی، جن میں وہ دعائیں بھی ہیں جو نبی ﷺ مریضوں پر پڑھتے تھے۔ اور مسلمان کی اپنے بھائی کے لیے اس کی غیر موجودگی میں دعا قبول ہوتی ہے، جیسا کہ صحیح مسلم میں ہے۔' },
    { q: 'کیا اکاؤنٹ بنانا ہوگا؟ کیا میرا نام ظاہر ہوگا؟', a: 'دونوں نہیں۔ صرف لنک کافی ہے، اور ہم دعا کرنے والے کا نام نہیں پوچھتے۔ آپ کے براؤزر میں ایک بے ترتیب کوڈ محفوظ ہوتا ہے تاکہ آپ کی دعا دو بار نہ گنی جائے؛ اس کا آپ کی شناخت سے کوئی تعلق نہیں۔' },
    { q: 'کیا صفحہ حذف ہو سکتا ہے؟', a: 'جی ہاں۔ جس براؤزر سے صفحہ بنایا گیا، اس میں صفحے کے نیچے «صفحہ حذف کریں» کا بٹن نظر آتا ہے، اور نام اور گنتی ہمیشہ کے لیے مٹ جاتی ہے۔ اگر آپ نے کسی اور ڈیوائس سے بنایا تھا تو لنک کے ساتھ contact@islamicdates.org پر لکھیں۔' },
  ],
  relatedH: 'متعلقہ ٹولز',
  related: [
    { href: '/ur/dua/', label: 'قرآن و سنت کی دعائیں' },
    { href: '/ur/dua/health-protection/', label: 'شفا اور رقیہ کی دعائیں' },
    { href: '/ur/khatma/', label: 'اجتماعی ختمِ قرآن' },
    { href: '/ur/prayer-times/', label: 'شہر کے مطابق اوقاتِ نماز' },
    { href: '/ur/', label: 'ہجری کیلنڈر اور آج کی تاریخ' },
  ],
  footerNote: 'دعا کا صفحہ بغیر رجسٹریشن · ہم دعا کرنے والے کا نام نہیں پوچھتے',
  privacyLabel: 'رازداری پالیسی',
  privacyHref: '/ur/privacy/',
  newNoteLead: 'صفحہ بن گیا۔',
  newNote: 'اس کا لنک خاندان اور دوستوں کے گروپ میں بھیجیں اور اپنے پاس محفوظ رکھیں؛ صفحہ بعد میں صرف اسی براؤزر سے حذف ہو سکتا ہے۔',
  notFoundH: 'یہ صفحہ نہیں ملا',
  notFoundBody: 'لنک درست نہیں، یا بنانے والے نے صفحہ حذف کر دیا ہے۔ یقینی بنائیں کہ پورا لنک کاپی ہوا ہے، یا دعا کا نیا صفحہ بنائیں۔',
  unavailableH: 'سروس اس وقت دستیاب نہیں',
  unavailableBody: 'اس وقت صفحے کا ڈیٹا حاصل نہیں ہو سکا۔ تھوڑی دیر بعد دوبارہ کوشش کریں۔',
  createNew: 'دعا کا نیا صفحہ بنائیں',
  navNew: 'نیا صفحہ',
  err: UR_ERR,
  page: (name, kind, _g, prayers) => {
    const dead = kind === 'deceased';
    const count = {
      zero: 'سب سے پہلے آپ دعا کریں',
      one: 'ایک شخص نے دعا کی',
      other: '{n} افراد نے دعا کی',
    };
    const n = num(prayers, 'ur');
    const tally = prayers === 0 ? '' : ` ${prayers === 1 ? count.one : fill(count.other, { n })}۔`;
    return {
      title: dead ? `${name} کے لیے دعا کریں · اللہ ان کی مغفرت فرمائے` : `${name} کی شفا کے لیے دعا کریں`,
      description: dead
        ? `${name} کے لیے دعا کا صفحہ، اللہ ان کی مغفرت فرمائے۔ قرآن و سنت کی دعا پڑھیں، پھر «میں نے دعا کی» دبائیں۔${tally}`
        : `${name} کی شفا کے لیے دعا کا صفحہ۔ قرآن و سنت کی شفا کی دعا پڑھیں، پھر «میں نے دعا کی» دبائیں۔${tally}`,
      h1: dead ? `${name} کے لیے دعا کریں` : `${name} کی شفا کے لیے دعا کریں`,
      lead: dead ? 'اللہ ان پر رحم فرمائے اور ان کی مغفرت فرمائے۔' : 'اللہ انہیں شفا اور عافیت عطا فرمائے۔',
      intro: dead
        ? 'ان میں سے جو دعا آسانی سے پڑھ سکیں ان کے لیے پڑھیں — یا اپنے الفاظ اور اپنی زبان میں دعا کریں — پھر «میں نے دعا کی» دبائیں تاکہ ان کے گھر والوں کو معلوم ہو کہ آپ نے دعا کی۔'
        : 'ان دعاؤں سے یا اپنے الفاظ میں ان کی شفا کے لیے دعا کریں، پھر «میں نے دعا کی» دبائیں تاکہ ان کے گھر والوں کو معلوم ہو کہ آپ نے دعا کی۔',
      duasH: 'قرآن و سنت کی دعائیں',
      reminderH: 'یاد دہانی',
      reminder: dead
        ? 'نبی ﷺ نے فرمایا: «جب انسان فوت ہو جاتا ہے تو اس کا عمل ختم ہو جاتا ہے سوائے تین چیزوں کے: صدقۂ جاریہ، یا وہ علم جس سے فائدہ اٹھایا جائے، یا نیک اولاد جو اس کے لیے دعا کرے» (مسلم)۔ دعا میت کے لیے سب سے مفید تحفوں میں سے ہے، اور اس کے لیے کوئی خاص الفاظ، وقت یا تعداد شرط نہیں۔'
        : 'نبی ﷺ نے فرمایا: «مسلمان کی اپنے بھائی کے لیے اس کی غیر موجودگی میں کی گئی دعا قبول ہوتی ہے، اس کے سر کے پاس ایک فرشتہ مقرر ہوتا ہے، جب بھی وہ اپنے بھائی کے لیے بھلائی کی دعا کرتا ہے تو فرشتہ کہتا ہے: آمین، اور تمہیں بھی اسی جیسا ملے» (مسلم)۔ اپنے الفاظ میں جیسے چاہیں دعا کریں۔',
      ogAlt: dead ? `${name} کے لیے دعا کریں` : `${name} کی شفا کے لیے دعا کریں`,
      card: {
        count,
        pray: 'میں نے دعا کی',
        praying: 'ایک لمحہ…',
        prayHint: 'دعا کر لینے کے بعد دبائیں۔ ہر ڈیوائس ایک ہی بار گنی جاتی ہے۔',
        thanks: 'اللہ آپ کی دعا قبول فرمائے۔ لنک بھیجیں تاکہ دوسرے بھی دعا کریں۔',
        sharePrompt: 'لنک بھیجیں تاکہ دوسرے بھی ان کے لیے دعا کریں:',
        shareText: dead
          ? `${name} کے لیے دعا کریں، اللہ ان کی مغفرت فرمائے۔ دعا پڑھیں اور «میں نے دعا کی» دبائیں:`
          : `${name} کی شفا کے لیے دعا کریں۔ دعا پڑھیں اور «میں نے دعا کی» دبائیں:`,
        shareWa: 'واٹس ایپ پر بھیجیں', shareNative: 'دیگر ایپس…', shareCopy: 'لنک کاپی کریں', shareCopied: 'لنک کاپی ہو گیا',
        adminLead: 'یہ صفحہ آپ نے اسی براؤزر سے بنایا ہے۔',
        adminDelete: 'صفحہ حذف کریں',
        adminConfirm: 'کیا یہ صفحہ ہمیشہ کے لیے حذف کر دیں؟ نام اور گنتی مٹ جائے گی اور لنک کام نہیں کرے گا۔',
        adminDeleted: 'صفحہ حذف ہو گیا۔',
        createNew: 'دعا کا نیا صفحہ بنائیں',
        err: UR_ERR,
      },
    };
  },
};

export const prayT = (lang: Lang): LandingT => (lang === 'en' ? EN : lang === 'ur' ? UR : AR);
