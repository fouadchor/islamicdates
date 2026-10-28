// ─────────────────────────────────────────────────────────────────────────────
// نصوص «ادعوا لـ…» بالعربية والإنجليزية والأردية.
//
// Two landing pages, deliberately apart (see lib/pray-for.ts): the living —
// someone ill, before an exam or a hard day, travelling, in distress, or with a
// need only Allah knows — at /pray-for/, and someone who has died at
// /pray-for/deceased/. Nothing on the page for the living speaks of death.
//
// The landing copy is static per language and door. The page copy depends on
// three facts about the page — the name, the kind of prayer, and له or لها — so
// it is built on the server by `page()`; the part handed to the React island
// (`card`) is plain strings with at most an {n} placeholder, already
// personalised. Names are wrapped by iso() wherever they sit inside a sentence
// of the other direction.
// ─────────────────────────────────────────────────────────────────────────────
import type { Lang } from './data';
import type { Gender, PrayKind } from './pray-for';
import { iso, li, shareDua } from './pray-for-duas';
import { num } from './khatma-juz';

export type PrayErr =
  | 'not_found' | 'bad_link' | 'unavailable' | 'forbidden'
  | 'rate' | 'rate_pray' | 'empty_name' | 'bad_kind'
  | 'no_token' | 'bad_action' | 'not_admin'
  | 'network' | 'generic';

/** The two landing pages. */
export type Door = 'living' | 'deceased';
export const doorOf = (k: PrayKind): Door => (k === 'deceased' ? 'deceased' : 'living');

type Plural = 'zero' | 'one' | 'two' | 'few' | 'many' | 'other';
/** Keyed by plural category, plus `zero`. {n} = the number. */
export type Plurals = Partial<Record<Plural, string>> & { zero: string; other: string };

/** Labels that do not depend on the person — the same on every page of a language. */
export interface CardUi {
  praying: string;
  shareWa: string; shareNative: string; shareCopy: string; shareCopied: string;
  copyDua: string; copiedDua: string;
  fontSmaller: string; fontLarger: string;
  doneTitle: string;
  /** The angel's «ولك بمثل» — the reward of praying for someone in their absence. */
  doneHadith: string; doneHadithSrc: string;
  newH: string; newP: string; newPrayFirst: string;
  adminLead: string; adminEdit: string; adminDelete: string;
  deleteWarn: string; deleteYes: string; cancel: string; deleted: string; createNew: string;
  editH: string; editName: string; editKind: string; editGender: string; editSave: string; editSaving: string;
  /** Under the kind choice in the creator's edit panel. */
  editKindHint: string;
  /** Short labels for the edit panel's kind choice. */
  kinds: Record<PrayKind, string>;
  genders: Record<Gender, string>;
  err: Record<PrayErr, string>;
}

/** What the island needs — everything already in the right gender and with the name. */
export interface CardT extends CardUi {
  count: Plurals;
  /** Every counted prayer, shown beside the people count once people have come back. */
  total: Plurals;
  youToo: string;
  featuredH: string;
  moreH: string;
  pray: string;
  prayAgain: string;
  prayedToday: string;
  prayHint: string;
  returnHint: string;
  comeBack: string;
  sharePrompt: string;
  shareAfter: string;
  shareText: string;
}

export interface PageCopy {
  title: string;
  description: string;
  /** A verse or the words said to the sick or on hearing of a death — above the name. */
  eyebrow: string;
  /** Their meaning, on the English and Urdu pages. */
  eyebrowNote: string | null;
  lead: string;
  intro: string;
  reminderH: string;
  reminder: string;
  ogAlt: string;
  card: CardT;
}

/** One landing page: the page for the living, or the page for the deceased. */
export interface DoorCopy {
  base: string;
  /** Tile on the home page and link in the footer. */
  toolLabel: string; toolSub: string;
  metaTitle: string; metaDesc: string;
  h1: string; intro: string;
  formH: string;
  namePh: string;
  genderHint: string;
  steps: { t: string; d: string }[];
  duasNote: string;
  rules: { b: string; t: string }[];
  faq: { q: string; a: string }[];
  related: { href: string; label: string }[];
  /** public/og/pray-for/{lang}-{og}.jpg */
  og: string;
}

export interface LandingT {
  dir: 'rtl' | 'ltr';
  /** Prefix of every page's address: /pray-for/{slug}/. */
  base: string;
  tagline: string;
  home: string;
  kindLabel: string;
  /** The choice on the form for the living (and the edit panel's long form). */
  kinds: Record<PrayKind, { t: string; d: string }>;
  /** Heading over each kind's supplications on the landing pages. */
  duasH: Record<PrayKind, string>;
  nameLabel: string; nameHint: string;
  genderLabel: string; genders: Record<Gender, string>;
  submit: string; submitting: string;
  stepsH: string; rulesH: string; faqH: string; relatedH: string;
  footerNote: string; privacyLabel: string; privacyHref: string;
  notFoundH: string; notFoundBody: string;
  unavailableH: string; unavailableBody: string;
  createNew: string; navNew: string;
  /** Errors the landing form can show. */
  err: Record<PrayErr, string>;
  doors: Record<Door, DoorCopy>;
  page: (name: string, kind: PrayKind, g: Gender, prayers: number) => PageCopy;
}

const fill = (s: string, v: Record<string, string>) => s.replace(/\{(\w+)\}/g, (m, k) => v[k] ?? m);

/** Arabic plural category without relying on the runtime's ICU data. */
export function pluralAr(n: number): Plural {
  if (n === 0) return 'zero';
  if (n === 1) return 'one';
  if (n === 2) return 'two';
  const m = n % 100;
  if (m >= 3 && m <= 10) return 'few';
  if (m >= 11 && m <= 99) return 'many';
  return 'other';
}

/** Verses and words above the name — the same Arabic in every language. */
const EYEBROW: Record<PrayKind, string> = {
  deceased: 'إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ',
  sick: 'لا بَأْسَ، طَهُورٌ إِنْ شَاءَ اللَّهُ',
  ease: 'وَمَنْ يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ',
  travel: 'فَاللَّهُ خَيْرٌ حَافِظًا',
  distress: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا',
  need: 'وَقَالَ رَبُّكُمُ ادْعُونِي أَسْتَجِبْ لَكُمْ',
};

// ── العربية ──────────────────────────────────────────────────────────────────
const AR_ERR: Record<PrayErr, string> = {
  not_found: 'لم نجد هذه الصفحة.',
  bad_link: 'رابط غير صالح.',
  unavailable: 'الخدمة غير متاحة حالياً.',
  forbidden: 'طلب غير مسموح.',
  rate: 'أنشأتَ صفحات كثيرة خلال ساعة. حاول بعد قليل.',
  rate_pray: 'ضغطات كثيرة من هذه الشبكة خلال ساعة. حاول بعد قليل.',
  empty_name: 'اكتب الاسم.',
  bad_kind: 'اختر لمن الدعاء، وله أو لها.',
  no_token: 'تعذّر التعرّف على هذا المتصفح. أعد تحميل الصفحة.',
  bad_action: 'إجراء غير معروف.',
  not_admin: 'لا تُحذف الصفحة إلا من المتصفح الذي أنشأها.',
  network: 'تعذّر الاتصال. تحقّق من الشبكة وأعد المحاولة.',
  generic: 'تعذّر إتمام الطلب.',
};

const AR_UI: Omit<CardUi, 'err'> = {
  praying: 'لحظة…',
  shareWa: 'مشاركة على واتساب', shareNative: 'تطبيقات أخرى…', shareCopy: 'نسخ الرابط', shareCopied: 'تم نسخ الرابط',
  copyDua: 'نسخ الدعاء', copiedDua: 'نُسخ الدعاء',
  fontSmaller: 'تصغير خط الدعاء', fontLarger: 'تكبير خط الدعاء',
  doneTitle: 'تقبّل الله دعاءك',
  doneHadith: '«ما من عبدٍ مسلمٍ يدعو لأخيه بظهر الغيب، إلا قال الملَك: ولك بمِثْل»',
  doneHadithSrc: 'رواه مسلم',
  newH: 'أُنشئت الصفحة',
  newP: 'أرسلها الآن إلى الأهل والأصحاب؛ كل من يفتحها يجد الدعاء جاهزاً بالاسم.',
  newPrayFirst: 'وابدأ أنت بالدعاء.',
  adminLead: 'أنت أنشأت هذه الصفحة.', adminEdit: 'تعديل', adminDelete: 'حذف الصفحة',
  deleteWarn: 'سيُحذف الاسم والعدّاد نهائياً، ولن يعمل الرابط بعد ذلك.',
  deleteYes: 'نعم، احذفها', cancel: 'إلغاء', deleted: 'حُذفت الصفحة.',
  createNew: 'أنشئ صفحة دعاء لعزيز آخر',
  editH: 'تعديل الصفحة', editName: 'الاسم', editKind: 'الدعاء', editGender: 'الصيغة',
  editSave: 'حفظ', editSaving: 'جارٍ الحفظ…',
  editKindHint: 'إن غيّرت نوع الدعاء تتغيّر الأدعية والعناوين، ويبقى الرابط نفسه وعدد من دعا.',
  kinds: { sick: 'بالشفاء', ease: 'بالتيسير', travel: 'للمسافر', distress: 'بتفريج الكرب', need: 'لحاجة', deceased: 'بالرحمة (لمتوفّى)' },
  genders: { m: 'له', f: 'لها' },
};

const AR_STEP_PRAY = { t: 'كلٌّ يدعو له', d: 'من يفتح الرابط يجد الدعاء جاهزاً بالاسم والضمير الصحيح، فيقرؤه ويضغط «دعوتُ له»، ويرى الجميع كم شخصاً دعا. ومن عاد في يوم آخر ودعا مرة أخرى حُسب دعاؤه من جديد.' };
const AR_FAQ_ACCOUNT = { q: 'هل أحتاج إلى حساب؟ وهل يظهر اسمي؟', a: 'لا هذا ولا ذاك. الرابط وحده يكفي، ولا نطلب اسم من يدعو. نحفظ في متصفحك رمزاً عشوائياً حتى لا يُحسب دعاؤك مرتين، ولا يرتبط بهويتك.' };
const AR_FAQ_AGAIN = { q: 'هل أستطيع أن أدعو له أكثر من مرة؟', a: 'نعم، ادعُ له ما شئت ومتى شئت. والصفحة تحسب كل جهاز شخصاً واحداً، وإن عاد في يوم آخر ودعا حُسب دعاؤه في مجموع الدعوات؛ فيعرف من أنشأها كم شخصاً دعا، وكم مرة.' };
const AR_RULE_NAMES = { b: 'لا أسماء ولا تنافس.', t: 'لا نطلب اسم من يدعو، ولا نعرض قائمة بمن دعا.' };
const AR_RULE_PRIVATE = { b: 'صفحة خاصة.', t: 'لا تظهر في محركات البحث، ولا يفتحها إلا من معه الرابط، ويستطيع منشئها حذفها متى شاء.' };

const AR: LandingT = {
  dir: 'rtl',
  base: '/pray-for/',
  tagline: 'صفحة دعاء',
  home: 'الرئيسية',
  kindLabel: 'لمن الدعاء؟',
  kinds: {
    sick: { t: 'لمريض', d: 'بالشفاء والعافية' },
    ease: { t: 'لامتحان أو أمرٍ صعب', d: 'بالتيسير والتوفيق' },
    travel: { t: 'لمسافر', d: 'بالحفظ والسلامة' },
    distress: { t: 'لمن في ضيق', d: 'بتفريج الهمّ والكرب' },
    need: { t: 'لحاجة يعلمها الله', d: 'دون أن تُذكر الحاجة' },
    deceased: { t: 'لمتوفّى', d: 'بالرحمة والمغفرة' },
  },
  duasH: {
    sick: 'أدعية للمريض بالشفاء',
    ease: 'أدعية للتيسير: امتحان أو مقابلة أو أمر صعب',
    travel: 'أدعية للمسافر',
    distress: 'أدعية لمن في كرب أو ضيق',
    need: 'أدعية لصاحب الحاجة',
    deceased: 'أدعية للميت من القرآن والسنة',
  },
  nameLabel: 'الاسم',
  nameHint: 'كما يعرفه أهله وأصحابه. يظهر في عنوان الصفحة وفي الدعاء نفسه.',
  genderLabel: 'صيغة الدعاء',
  genders: { m: 'له', f: 'لها' },
  submit: 'إنشاء الصفحة',
  submitting: 'جارٍ الإنشاء…',
  stepsH: 'كيف تعمل؟',
  rulesH: 'ضوابط راعيناها',
  faqH: 'أسئلة شائعة',
  relatedH: 'أدوات ذات صلة',
  footerNote: 'صفحة دعاء بلا تسجيل · لا نطلب اسم من يدعو',
  privacyLabel: 'سياسة الخصوصية',
  privacyHref: '/privacy/',
  notFoundH: 'لم نجد هذه الصفحة',
  notFoundBody: 'الرابط غير صحيح، أو أن منشئها حذفها. تأكّد من نسخ الرابط كاملاً، أو أنشئ صفحة دعاء جديدة.',
  unavailableH: 'الخدمة غير متاحة حالياً',
  unavailableBody: 'تعذّر الوصول إلى بيانات الصفحة في هذه اللحظة. أعد المحاولة بعد قليل.',
  createNew: 'إنشاء صفحة دعاء جديدة',
  navNew: 'صفحة جديدة',
  err: AR_ERR,
  doors: {
    living: {
      base: '/pray-for/',
      toolLabel: 'صفحة دعاء لمن تحب',
      toolSub: 'لمريض أو مسافر أو امتحان أو حاجة — رابط واحد يجمع الدعاء له',
      metaTitle: 'صفحة دعاء لمريض أو مسافر أو صاحب حاجة · رابط واحد يجمع الدعاء له',
      metaDesc: 'أنشئ صفحة دعاء لمن تحب، مجاناً وبلا تسجيل: لمريض بالشفاء، أو لامتحان أو أمر صعب بالتيسير، أو لمسافر بالحفظ، أو لمن في ضيق، أو لحاجة يعلمها الله. رابط واحد ترسله للأهل والأصدقاء، فيقرأ كلٌّ منهم الدعاء من القرآن والسنة باسمه ويضغط «دعوت له».',
      h1: 'ادعوا له: صفحة دعاء لمن تحب',
      intro: 'مريضٌ تنتظرون شفاءه، أو ابنٌ على باب امتحان، أو مسافر، أو صديقٌ في ضيق أو له حاجة… أنشئ صفحة باسمه وأرسل رابطها لأهله وأصحابه، فيجد كل من يفتحها دعاءً ثابتاً من القرآن والسنة فيه اسمه، يقرؤه له ثم يضغط «دعوت له» فيكبر العدّاد. بلا تسجيل ولا تطبيق.',
      formH: 'أنشئ صفحة دعاء',
      namePh: 'مثال: أخي أحمد',
      genderHint: 'تُكتب الأدعية بالضمير الصحيح: «اللهم اشفِه» أو «اللهم اشفِها».',
      steps: [
        { t: 'اختر واكتب الاسم', d: 'اختر لمن الدعاء: لمريض، أو امتحان أو أمر صعب، أو مسافر، أو من في ضيق، أو لحاجة يعلمها الله. ثم اكتب الاسم الذي يعرفه به الناس. بلا حساب ولا بريد ولا رقم هاتف.' },
        { t: 'أرسل الرابط', d: 'ينشأ رابط واحد للصفحة. أرسله في مجموعة العائلة أو الأصدقاء.' },
        AR_STEP_PRAY,
      ],
      duasNote: 'تظهر في كل صفحة أدعية نوعها، بالاسم والضمير المناسبين. ولك أن تدعو بما شئت وبأي لغة.',
      rules: [
        { b: 'أدعية ثابتة.', t: 'من القرآن والسنة الصحيحة مع مصدر كل دعاء، وبضمائر المؤنّث إن كان الدعاء لامرأة. وما ورد بلفظ المتكلّم أو المخاطَب كتبناه بصيغة الدعاء لغيره، وذكرنا تحته لفظه الأصلي.' },
        { b: 'الحاجة سرّ صاحبها.', t: 'في «لحاجة يعلمها الله» لا تُذكر الحاجة في الصفحة، ولا نسأل عنها.' },
        { b: 'لا عدد مقصود.', t: 'العدّاد ليعرف من أنشأ الصفحة أن الناس دعوا، لا هدفاً يُسعى إليه. لا نضع رقماً ولا نَعِد بشيء عند بلوغه.' },
        AR_RULE_NAMES,
        AR_RULE_PRIVATE,
      ],
      faq: [
        { q: 'لمن تصلح هذه الصفحة؟', a: 'لكل من تحب أن يجتمع أهله وأصحابه على الدعاء له: مريض أو من تُجرى له عملية، أو طالب في امتحان أو من ينتظر مقابلة أو أمراً صعباً، أو مسافر، أو من يمرّ بكرب أو ضيق، أو من له حاجة لا يحب ذكرها. اختر نوع الدعاء عند الإنشاء، فتظهر الأدعية المناسبة باسمه وبالضمير الصحيح.' },
        { q: 'ماذا يعني «لحاجة يعلمها الله»؟', a: 'أن الصفحة تطلب الدعاء له دون أن تذكر حاجته، وتظهر فيها أدعية عامة بالخير والتيسير. فإن كانت حاجته مما يُستحيا من ذكره، كدَين أو أمرٍ في البيت، فهذا الخيار له، والله يعلم ما في نفسه.' },
        { q: 'هل يُستجاب الدعاء للمسلم في غيابه؟', a: 'نعم. قال النبي ﷺ: «دعوة المرء المسلم لأخيه بظهر الغيب مستجابة، عند رأسه ملك موكَّل، كلما دعا لأخيه بخير قال الملك الموكَّل به: آمين، ولك بمِثل» رواه مسلم. ودعا ﷺ لأصحابه بأسمائهم، فقال: «اللهم اشفِ سعداً» متفق عليه.' },
        { q: 'لماذا بعض الأدعية بصيغة الغائب؟', a: 'لأن من الأدعية الثابتة ما ورد بلفظ المتكلّم أو المخاطَب، كدعاء موسى عليه السلام ﴿رَبِّ اشْرَحْ لِي صَدْرِي﴾، ودعاء الاستخارة، وتوديع المسافر «أستودع الله دينك». كتبناها بصيغة الدعاء للغائب ليقرأها من يدعو له، وذكرنا تحت كل دعاء لفظه الأصلي ومصدره.' },
        { q: 'لماذا لا تذكرون صلاة الحاجة؟', a: 'لأن حديثها المشهور في سنن الترمذي في إسناده ضعف، وقال الترمذي نفسه: «في إسناده مقال»، فاقتصرنا على ما ثبت. ومن أراد أن يدعو له في صلاته فالسجود موضع الدعاء، قال النبي ﷺ: «أقرب ما يكون العبد من ربه وهو ساجد، فأكثروا الدعاء» رواه مسلم.' },
        AR_FAQ_ACCOUNT,
        AR_FAQ_AGAIN,
        { q: 'كتبتُ الاسم خطأً، أو اخترتُ نوعاً غير المقصود — هل أنشئ صفحة جديدة؟', a: 'لا. في المتصفح الذي أنشأ الصفحة يظهر أسفلها زرّ «تعديل»: صحّح الاسم أو الصيغة أو نوع الدعاء، ويبقى الرابط الذي أرسلته وعدد من دعا كما هما. ومن هناك أيضاً تُحذف الصفحة نهائياً. وإن أنشأتها من جهاز آخر فراسلنا على contact@islamicdates.org مع الرابط.' },
      ],
      related: [
        { href: '/dua/', label: 'أدعية وأذكار من القرآن والسنة' },
        { href: '/dua/health-protection/', label: 'أدعية الشفاء والرقية' },
        { href: '/dua/distress/', label: 'أدعية الكرب والهمّ' },
        { href: '/khatma/', label: 'ختمة قرآن جماعية' },
        { href: '/prayer-times/', label: 'مواقيت الصلاة حسب المدينة' },
        { href: '/', label: 'التقويم الهجري وتاريخ اليوم' },
      ],
      og: 'living',
    },
    deceased: {
      base: '/pray-for/deceased/',
      toolLabel: 'صفحة دعاء لمتوفّى',
      toolSub: 'رابط واحد يجمع الدعاء له بالرحمة',
      metaTitle: 'صفحة دعاء لمتوفّى · رابط واحد يجمع الدعاء له بالرحمة',
      metaDesc: 'أنشئ صفحة دعاء لمن فقدته، مجاناً وبلا تسجيل: رابط واحد ترسله للأهل والأصدقاء أو مع رسالة العزاء، فيقرأ كلٌّ منهم أدعية الميت من القرآن والسنة باسمه ويضغط «دعوت له»، ويرى الجميع عدد من دعا.',
      h1: 'ادعوا له بالرحمة: صفحة دعاء لمن رحل',
      intro: 'حين يرحل عزيز يسأل أهله وأصحابه: ماذا نقدّم له؟ الدعاء. أنشئ صفحة باسمه وأرسل رابطها في مجموعة العائلة أو مع رسالة العزاء، فيجد كل من يفتحها أدعية ثابتة من القرآن والسنة يقرؤها له، ثم يضغط «دعوت له» فيكبر العدّاد. بلا تسجيل ولا تطبيق.',
      formH: 'أنشئ صفحة دعاء',
      namePh: 'مثال: الوالد محمد بن أحمد',
      genderHint: 'تُكتب الأدعية بالضمير الصحيح: «اللهم اغفر له» أو «اللهم اغفر لها».',
      steps: [
        { t: 'اكتب الاسم', d: 'اكتب الاسم الذي يعرفه به الناس. بلا حساب ولا بريد ولا رقم هاتف.' },
        { t: 'أرسل الرابط', d: 'ينشأ رابط واحد للصفحة. أرسله في مجموعة العائلة أو الأصدقاء، أو مع رسالة العزاء.' },
        AR_STEP_PRAY,
      ],
      duasNote: 'هذه الأدعية نفسها تظهر في كل صفحة بالاسم والضمير المناسبين. ولك أن تدعو بما شئت وبأي لغة.',
      rules: [
        { b: 'الدعاء لا الإهداء.', t: 'تقتصر الصفحة على الدعاء، وهو ينفع الميت باتفاق أهل العلم. ولا نقدّم فيها قراءةً أو ختمةً تُهدى، لأن وصول ثواب التلاوة إلى الميت محلّ خلاف.' },
        { b: 'لا عدد مقصود.', t: 'العدّاد ليعرف الأهل أن الناس دعوا لفقيدهم، لا هدفاً يُسعى إليه. لا نضع رقماً ولا نَعِد بشيء عند بلوغه.' },
        { b: 'أدعية ثابتة.', t: 'من القرآن والسنة الصحيحة مع مصدر كل دعاء، وبضمائر المؤنّث إن كان الدعاء لامرأة.' },
        AR_RULE_NAMES,
        AR_RULE_PRIVATE,
      ],
      faq: [
        { q: 'هل ينتفع الميت بدعاء الأحياء؟', a: 'نعم، باتفاق أهل العلم. قال تعالى في وصف المؤمنين: ﴿رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ﴾ [الحشر: ١٠]، وقال النبي ﷺ: «إذا مات الإنسان انقطع عنه عمله إلا من ثلاثة: إلا من صدقة جارية، أو علم يُنتفع به، أو ولد صالح يدعو له» رواه مسلم. وكان ﷺ يدعو للأموات في صلاة الجنازة وعند زيارة القبور.' },
        { q: 'هل لبلوغ أربعين أو مئة شخص فضل خاص؟', a: 'ورد في صحيح مسلم فضلُ أن يصلّي على الميت أربعون أو مئة من المسلمين يشفعون له، وذلك في صلاة الجنازة خاصة. أما الدعاء عبر صفحة كهذه فلم يرد فيه عدد، ولذلك لا نضع هدفاً عددياً: دعاء واحد صادق خير من عدّاد كبير.' },
        { q: 'لماذا لا تقدّمون ختمة أو قراءة تُهدى للميت؟', a: 'لأن وصول ثواب قراءة القرآن إلى الميت مسألة خلافية بين المذاهب، أما الدعاء فمتفق على نفعه. ومن أراد قراءة القرآن مع غيره فالختمة الجماعية في الموقع متاحة قراءةً عامة بلا إهداء.' },
        AR_FAQ_ACCOUNT,
        AR_FAQ_AGAIN,
        { q: 'كتبتُ الاسم خطأً — هل أنشئ صفحة جديدة؟', a: 'لا. في المتصفح الذي أنشأ الصفحة يظهر أسفلها زرّ «تعديل»: صحّح الاسم أو الصيغة، ويبقى الرابط الذي أرسلته وعدد من دعا كما هما. ومن هناك أيضاً تُحذف الصفحة نهائياً. وإن أنشأتها من جهاز آخر فراسلنا على contact@islamicdates.org مع الرابط.' },
      ],
      related: [
        { href: '/dua/', label: 'أدعية وأذكار من القرآن والسنة' },
        { href: '/dua/parents-family/', label: 'أدعية الوالدين والأسرة' },
        { href: '/khatma/', label: 'ختمة قرآن جماعية' },
        { href: '/pray-for/', label: 'صفحة دعاء لمريض أو مسافر أو صاحب حاجة' },
        { href: '/', label: 'التقويم الهجري وتاريخ اليوم' },
      ],
      og: 'deceased',
    },
  },
  page: (name, kind, g, prayers) => {
    const L = li(name, false);
    const f = g === 'f';
    const lahu = f ? 'لها' : 'له';
    const ahlu = f ? 'أهلها' : 'أهله';
    const ghiyab = f ? 'غيابها' : 'غيابه';
    const count: Plurals = {
      zero: `كن أول من يدعو ${lahu}`,
      one: `دعا ${lahu} شخص واحد`,
      two: `دعا ${lahu} شخصان`,
      few: `دعا ${lahu} {n} أشخاص`,
      many: `دعا ${lahu} {n} شخصاً`,
      other: `دعا ${lahu} {n} شخص`,
    };
    const total: Plurals = { zero: '', one: 'دعوة واحدة', two: 'دعوتان', few: '{n} دعوات', many: '{n} دعوة', other: '{n} دعوة' };
    const tally = prayers === 0 ? '' : ` ${fill(count[pluralAr(prayers)] ?? count.other, { n: num(prayers, 'ar') })}.`;
    const sentBy = 'ليعرف من أرسل إليك الرابط أنك دعوت.';

    // what: after «ادعوا لفلان» · honor: the short prayer after the name.
    const K: Record<PrayKind, { what: string; honor: string; lead: string; featured: string; intro: string; reminderH: string; reminder: string }> = {
      deceased: {
        what: '',
        honor: f ? 'رحمها الله' : 'رحمه الله',
        lead: f ? 'رحمها الله وغفر لها' : 'رحمه الله وغفر له',
        featured: `ادعُ ${lahu}`,
        intro: `ادعُ ${lahu} بهذا الدعاء أو بما شئت وبأي لغة، ثم اضغط «دعوتُ ${lahu}» ليعرف ${ahlu} أنك دعوت.`,
        reminderH: f ? 'ممّا ينفعها بعد موتها' : 'ممّا ينفعه بعد موته',
        reminder: 'قال النبي ﷺ: «إذا مات الإنسان انقطع عنه عمله إلا من ثلاثة: إلا من صدقة جارية، أو علم يُنتفع به، أو ولد صالح يدعو له» رواه مسلم. فالدعاء من أنفع ما يُقدَّم للميت، ولا يُشترط له لفظ ولا وقت ولا عدد، ' + (f ? 'والصدقة عنها تنفعها' : 'والصدقة عنه تنفعه') + ' كذلك باتفاق أهل العلم.',
      },
      sick: {
        what: ' بالشفاء',
        honor: f ? 'شفاها الله' : 'شفاه الله',
        lead: f ? 'شفاها الله وعافاها' : 'شفاه الله وعافاه',
        featured: `ادعُ ${lahu} بالشفاء`,
        intro: `ادعُ ${lahu} بالشفاء بهذا الدعاء أو بما شئت وبأي لغة، ثم اضغط «دعوتُ ${lahu}» ليعرف ${ahlu} أنك دعوت.`,
        reminderH: f ? 'إن استطعت فزُرها' : 'إن استطعت فزُره',
        reminder: `قال النبي ﷺ: «مَن عادَ مريضاً لم يزل في خُرْفة الجنة». قيل: يا رسول الله، وما خُرْفة الجنة؟ قال: «جَناها» رواه مسلم. فإن تيسّرت لك ${f ? 'زيارتها أو مكالمتها' : 'زيارته أو مكالمته'} فافعل، وإلا فدعاؤك ${lahu} في ${ghiyab} مستجاب بإذن الله.`,
      },
      ease: {
        what: ' بالتيسير',
        honor: f ? 'يسّر الله أمرها' : 'يسّر الله أمره',
        lead: f ? 'يسّر الله أمرها ووفّقها' : 'يسّر الله أمره ووفّقه',
        featured: `ادعُ ${lahu} بالتيسير`,
        intro: `ادعُ ${lahu} بالتيسير بهذا الدعاء أو بما شئت وبأي لغة، ثم اضغط «دعوتُ ${lahu}» ${sentBy}`,
        reminderH: f ? 'اذكرها في سجودك' : 'اذكره في سجودك',
        reminder: `قال النبي ﷺ: «أقرب ما يكون العبد من ربه وهو ساجد، فأكثروا الدعاء» رواه مسلم. فإن عرفتَ موعد ${f ? 'امتحانها أو أمرها فاذكرها' : 'امتحانه أو أمره فاذكره'} في سجودك ذلك اليوم.`,
      },
      travel: {
        what: f ? ' في سفرها' : ' في سفره',
        honor: f ? 'حفظها الله' : 'حفظه الله',
        lead: f ? 'حفظها الله في سفرها وردّها سالمة' : 'حفظه الله في سفره وردّه سالماً',
        featured: f ? `ادعُ لها في سفرها` : `ادعُ له في سفره`,
        intro: `ادعُ ${lahu} في ${f ? 'سفرها' : 'سفره'} بهذا الدعاء أو بما شئت وبأي لغة، ثم اضغط «دعوتُ ${lahu}» ${sentBy}`,
        reminderH: 'دعوة المسافر مستجابة',
        reminder: f
          ? 'قال النبي ﷺ: «ثلاث دعوات مستجابات لا شك فيهن: دعوة الوالد، ودعوة المسافر، ودعوة المظلوم» رواه أبو داود. فإن لقيتَها قبل سفرها فودّعها بما كان النبي ﷺ يودّع به: «أستودع اللهَ دينكِ وأمانتكِ وخواتيم عملكِ»، واطلب منها أن تدعو لك.'
          : 'قال النبي ﷺ: «ثلاث دعوات مستجابات لا شك فيهن: دعوة الوالد، ودعوة المسافر، ودعوة المظلوم» رواه أبو داود. فإن لقيتَه قبل سفره فودّعه بما كان النبي ﷺ يودّع به: «أستودع اللهَ دينك وأمانتك وخواتيم عملك»، واطلب منه أن يدعو لك.',
      },
      distress: {
        what: '',
        honor: f ? 'فرّج الله عنها' : 'فرّج الله عنه',
        lead: f ? 'فرّج الله عنها وأصلح شأنها' : 'فرّج الله عنه وأصلح شأنه',
        featured: `ادعُ ${lahu} بالفرج`,
        intro: `ادعُ ${lahu} بهذا الدعاء أو بما شئت وبأي لغة، ثم اضغط «دعوتُ ${lahu}» ${sentBy}`,
        reminderH: f ? 'وإن استطعت أن تعينها فأعِنها' : 'وإن استطعت أن تعينه فأعِنه',
        reminder: `قال النبي ﷺ: «من نفّس عن مؤمن كربة من كرب الدنيا، نفّس الله عنه كربة من كرب يوم القيامة» رواه مسلم. فإن كان بيدك عونٌ ${lahu} — كلمة أو زيارة أو حاجة تقضيها — فافعل، وإلا فدعاؤك ${lahu} في ${ghiyab} مستجاب بإذن الله.`,
      },
      need: {
        what: '',
        honor: f ? 'قضى الله حاجتها' : 'قضى الله حاجته',
        lead: f ? 'قضى الله حاجتها وكتب لها الخير' : 'قضى الله حاجته وكتب له الخير',
        featured: `ادعُ ${lahu} بالخير`,
        intro: `في ${f ? 'نفسها' : 'نفسه'} حاجة يعلمها الله، ولم تُذكر هنا. ادعُ ${lahu} بهذا الدعاء أو بما شئت وبأي لغة، ثم اضغط «دعوتُ ${lahu}» ${sentBy}`,
        reminderH: `دعاؤك ${lahu} في ${ghiyab} مستجاب`,
        reminder: `قال النبي ﷺ: «دعوة المرء المسلم لأخيه بظهر الغيب مستجابة، عند رأسه ملك موكَّل، كلما دعا لأخيه بخير قال الملك الموكَّل به: آمين، ولك بمِثل» رواه مسلم. ولا يلزمك أن تعرف ${f ? 'حاجتها' : 'حاجته'}؛ ادعُ ${lahu} بالخير، والله يعلمها.`,
      },
    };
    const k = K[kind];
    return {
      title: `ادعوا ${L}${k.what} · ${k.honor}`,
      description: `صفحة دعاء ${L}${k.what}، ${k.honor}. اقرأ ${lahu} الدعاء من القرآن والسنة، ثم اضغط «دعوتُ ${lahu}».${tally}`,
      eyebrow: EYEBROW[kind],
      eyebrowNote: null,
      lead: k.lead,
      intro: k.intro,
      reminderH: k.reminderH,
      reminder: k.reminder,
      ogAlt: `ادعوا ${L}${k.what} — ${k.honor}`,
      card: {
        ...AR_UI,
        err: AR_ERR,
        count,
        total,
        youToo: 'وأنت منهم',
        featuredH: k.featured,
        moreH: `أدعية أخرى ${lahu}`,
        pray: `دعوتُ ${lahu}`,
        prayAgain: `دعوتُ ${lahu} اليوم`,
        prayedToday: `دعوتَ ${lahu} اليوم`,
        prayHint: `اضغط بعد أن تدعو ${lahu}.`,
        returnHint: `دعوتَ ${lahu} من قبل، جزاك الله خيراً. ادعُ ${lahu} اليوم أيضاً.`,
        comeBack: `عُد غداً وادعُ ${lahu} مرة أخرى.`,
        sharePrompt: `أرسل الرابط ليدعو ${lahu} غيرك:`,
        shareAfter: `والآن أرسل الرابط إلى من ${f ? 'يعرفها' : 'يعرفه'}، ليدعو ${lahu} هو أيضاً:`,
        shareText: `ادعوا ${L}${k.what}، ${k.honor}\n«${shareDua(kind, g, name)}»\nاقرأ ${lahu} الدعاء واضغط «دعوتُ ${lahu}»:`,
      },
    };
  },
};

// ── English ──────────────────────────────────────────────────────────────────
const EN_ERR: Record<PrayErr, string> = {
  not_found: 'We could not find this page.',
  bad_link: 'This link is not valid.',
  unavailable: 'The service is unavailable right now.',
  forbidden: 'Request not allowed.',
  rate: 'You have created many pages in the last hour. Please try again shortly.',
  rate_pray: 'Too many presses from this network in the last hour. Please try again shortly.',
  empty_name: 'Please write the name.',
  bad_kind: 'Choose who the prayer is for, and him or her.',
  no_token: 'This browser could not be recognised. Please reload the page.',
  bad_action: 'Unknown action.',
  not_admin: 'Only the browser that created the page can delete it.',
  network: 'Could not connect. Check your connection and try again.',
  generic: 'Something went wrong.',
};

const EN_UI: Omit<CardUi, 'err'> = {
  praying: 'One moment…',
  shareWa: 'Share on WhatsApp', shareNative: 'Other apps…', shareCopy: 'Copy link', shareCopied: 'Link copied',
  copyDua: 'Copy', copiedDua: 'Copied',
  fontSmaller: 'Smaller supplication text', fontLarger: 'Larger supplication text',
  doneTitle: 'May Allah accept your prayer',
  doneHadith: '“No Muslim prays for his brother in his absence but the angel says: and the same for you.”',
  doneHadithSrc: 'Muslim',
  newH: 'Your page is ready',
  newP: 'Send it now to family and friends — whoever opens it finds the supplication ready, with the name.',
  newPrayFirst: 'And be the first to pray.',
  adminLead: 'You created this page.', adminEdit: 'Edit', adminDelete: 'Delete page',
  deleteWarn: 'The name and the count will be removed for good, and the link will stop working.',
  deleteYes: 'Yes, delete it', cancel: 'Cancel', deleted: 'The page has been deleted.',
  createNew: 'Create a prayer page for someone else',
  editH: 'Edit the page', editName: 'Name', editKind: 'Prayer for', editGender: 'Him or her',
  editSave: 'Save', editSaving: 'Saving…',
  editKindHint: 'Changing the kind of prayer changes the supplications and headings; the link and the count stay the same.',
  kinds: { sick: 'Healing', ease: 'Ease', travel: 'A journey', distress: 'Relief', need: 'A need', deceased: 'Mercy (has died)' },
  genders: { m: 'Him', f: 'Her' },
};

const EN_STEP_PRAY = { t: 'Everyone prays', d: 'Whoever opens it finds the supplication ready, with the name and the right pronouns. They read, press “I prayed”, and everyone sees how many have prayed. Anyone who comes back on another day and prays again is counted again.' };
const EN_FAQ_ACCOUNT = { q: 'Do I need an account? Will my name show?', a: 'Neither. The link is all anyone needs, and we never ask who prayed. Your browser keeps a random code so your prayer is not counted twice; it is not linked to who you are.' };
const EN_FAQ_AGAIN = { q: 'Can I pray for them more than once?', a: 'Yes — pray as often as you like. The page counts each device as one person, and a prayer on a later day is added to the total, so whoever created it can see both how many people prayed and how often.' };
const EN_RULE_NAMES = { b: 'No names, no ranking.', t: 'We never ask who prayed and never list them.' };
const EN_RULE_PRIVATE = { b: 'A private page.', t: 'It is kept out of search engines, only people with the link can open it, and its creator can delete it at any time.' };

const EN: LandingT = {
  dir: 'ltr',
  base: '/en/pray-for/',
  tagline: 'Prayer page',
  home: 'Home',
  kindLabel: 'Who is the prayer for?',
  kinds: {
    sick: { t: 'Someone who is ill', d: 'Healing and well-being' },
    ease: { t: 'An exam or a hard day', d: 'Ease and success' },
    travel: { t: 'Someone travelling', d: 'A safe journey' },
    distress: { t: 'Someone in hardship', d: 'Relief from worry and distress' },
    need: { t: 'A need Allah knows', d: 'Without naming the need' },
    deceased: { t: 'Someone who has died', d: 'Mercy and forgiveness' },
  },
  duasH: {
    sick: 'Supplications for the sick',
    ease: 'Supplications for ease: an exam, an interview or a hard day',
    travel: 'Supplications for a traveller',
    distress: 'Supplications for someone in distress',
    need: 'Supplications for someone with a need',
    deceased: 'Supplications for the deceased from the Qur’an and Sunnah',
  },
  nameLabel: 'Name',
  nameHint: 'As family and friends know them. It appears in the page title and in the supplication itself.',
  genderLabel: 'The prayer is for',
  genders: { m: 'Him', f: 'Her' },
  submit: 'Create the page',
  submitting: 'Creating…',
  stepsH: 'How it works',
  rulesH: 'What we were careful about',
  faqH: 'Common questions',
  relatedH: 'Related tools',
  footerNote: 'Prayer page with no sign-up · we never ask who prayed',
  privacyLabel: 'Privacy Policy',
  privacyHref: '/en/privacy/',
  notFoundH: 'We could not find this page',
  notFoundBody: 'The link is incomplete, or its creator deleted the page. Check that you copied the whole link, or create a new prayer page.',
  unavailableH: 'The service is unavailable right now',
  unavailableBody: 'The page’s data could not be reached at this moment. Please try again shortly.',
  createNew: 'Create a new prayer page',
  navNew: 'New page',
  err: EN_ERR,
  doors: {
    living: {
      base: '/en/pray-for/',
      toolLabel: 'Prayer page for someone you love',
      toolSub: 'Someone ill, travelling, facing an exam or in need — one link gathers the prayers',
      metaTitle: 'Prayer page for someone ill, travelling or in need · one link gathers the dua',
      metaDesc: 'Create a free prayer page, with no sign-up, for someone you love: healing for someone ill, ease before an exam or a hard day, a safe journey, relief from hardship, or a need only Allah knows. Send one link to family and friends; each reads a supplication from the Qur’an and Sunnah with the name and presses “I prayed”.',
      h1: 'Pray for them: a prayer page for someone you love',
      intro: 'Someone ill you hope will recover, a child facing an exam, someone travelling, a friend in hardship or with a need… Create a page in their name and send its link to family and friends: whoever opens it finds an established supplication from the Qur’an and Sunnah with the name in it, reads it, presses “I prayed”, and the count rises. No sign-up, no app.',
      formH: 'Create a prayer page',
      namePh: 'e.g. My brother Ahmad',
      genderHint: 'The Arabic supplications use the right pronoun: “allahumma-shfihi” for a man, “-shfihā” for a woman.',
      steps: [
        { t: 'Choose and write the name', d: 'Choose who the prayer is for — someone ill, an exam or a hard day, a journey, someone in hardship, or a need Allah knows — and write the name people know them by. No account, no e-mail, no phone number.' },
        { t: 'Send the link', d: 'One link is created for the page. Send it to the family or friends group.' },
        EN_STEP_PRAY,
      ],
      duasNote: 'Each page shows the supplications for its kind, with the right name and pronouns. You are free to pray in your own words, in any language.',
      rules: [
        { b: 'Established supplications.', t: 'From the Qur’an and authentic Sunnah, each with its source, and in the feminine form when the prayer is for a woman. Wordings that come in the first or second person are written as a prayer for someone else, with the original wording noted underneath.' },
        { b: 'The need stays private.', t: 'With “A need Allah knows” the page never names the need, and we never ask.' },
        { b: 'No target number.', t: 'The count is there so whoever created the page knows people prayed — not a goal. We set no number and promise nothing for reaching one.' },
        EN_RULE_NAMES,
        EN_RULE_PRIVATE,
      ],
      faq: [
        { q: 'Who is this page for?', a: 'Anyone you would like family and friends to pray for together: someone ill or having an operation, a student facing an exam or someone waiting on an interview or a hard day, someone travelling, someone going through hardship, or someone with a need they would rather not name. Choose the kind when creating the page, and the right supplications appear with the name and pronouns.' },
        { q: 'What does “A need Allah knows” mean?', a: 'That the page asks people to pray for them without saying what the need is, and shows general supplications for good and ease. If the need is something people are shy to mention — a debt, something at home — this is the option for it; Allah knows what is in their heart.' },
        { q: 'Is a prayer for a Muslim in their absence answered?', a: 'Yes. The Prophet ﷺ said: “A Muslim’s prayer for his brother in his absence is answered. At his head is an angel appointed to him: whenever he prays for good for his brother, the angel says: Amin, and the same for you” (Muslim). And he ﷺ prayed for his companions by name, saying “O Allah, heal Saʿd” (Bukhari & Muslim).' },
        { q: 'Why are some supplications in the third person?', a: 'Some established supplications come in the first or second person — Musa’s “My Lord, open my heart”, the istikharah, and the farewell to a traveller, “I entrust to Allah your faith”. We wrote them as a prayer for someone else, so that the one praying can read them for him, and noted the original wording and source under each.' },
        { q: 'Why is there no “prayer of need” (salat al-hajah)?', a: 'Because its well-known hadith in Sunan at-Tirmidhi has a weak chain — at-Tirmidhi himself says its chain is questioned — so we kept to what is established. If you want to pray for them in your prayer, prostration is the place for it: the Prophet ﷺ said, “The closest a servant comes to his Lord is while he is prostrating, so make plenty of supplication then” (Muslim).' },
        EN_FAQ_ACCOUNT,
        EN_FAQ_AGAIN,
        { q: 'I misspelt the name, or chose the wrong kind — do I make a new page?', a: 'No. In the browser that created the page, an “Edit” button appears at the bottom: correct the name, the pronoun or the kind of prayer, and the link you sent and the count stay as they are. The page can also be deleted for good from there. If you created it on another device, write to contact@islamicdates.org with the link.' },
      ],
      related: [
        { href: '/en/dua/', label: 'Supplications from the Qur’an and Sunnah' },
        { href: '/en/dua/health-protection/', label: 'Supplications for healing and ruqyah' },
        { href: '/en/dua/distress/', label: 'Supplications for distress and worry' },
        { href: '/en/khatma/', label: 'Group Quran khatma' },
        { href: '/en/prayer-times/', label: 'Prayer times by city' },
        { href: '/en/', label: 'Hijri calendar and today’s date' },
      ],
      og: 'living',
    },
    deceased: {
      base: '/en/pray-for/deceased/',
      toolLabel: 'Prayer page for someone who has died',
      toolSub: 'One link that gathers prayers for mercy',
      metaTitle: 'Prayer page for someone who has died · one link gathers prayers for mercy',
      metaDesc: 'Create a free prayer page, with no sign-up, for someone you have lost: one link for family and friends or with a message of condolence; each reads supplications for the deceased from the Qur’an and Sunnah with the name and presses “I prayed”, and everyone sees how many have prayed.',
      h1: 'Pray for mercy: a prayer page for someone who has passed away',
      intro: 'When someone dear dies, their family and friends ask what they can still do for them. Pray. Create a page in their name and send its link to the family group or with a message of condolence: whoever opens it finds established supplications from the Qur’an and Sunnah to read for them, then presses “I prayed” and the count rises. No sign-up, no app.',
      formH: 'Create a prayer page',
      namePh: 'e.g. My father, Muhammad Ahmad',
      genderHint: 'The Arabic supplications use the right pronoun: “allahumma-ghfir lahu” for a man, “lahā” for a woman.',
      steps: [
        { t: 'Write the name', d: 'Write the name people knew them by. No account, no e-mail, no phone number.' },
        { t: 'Send the link', d: 'One link is created for the page. Send it to the family or friends group, or with a message of condolence.' },
        EN_STEP_PRAY,
      ],
      duasNote: 'These same supplications appear on every page, with the right name and pronouns. You are free to pray in your own words, in any language.',
      rules: [
        { b: 'Supplication, not dedication.', t: 'The page is only supplication, which benefits the dead by agreement of the scholars. It offers no reading or khatma “gifted” to them, since whether the reward of recitation reaches the dead is disputed.' },
        { b: 'No target number.', t: 'The count is there so the family know people prayed — not a goal. We set no number and promise nothing for reaching one.' },
        { b: 'Established supplications.', t: 'From the Qur’an and authentic Sunnah, each with its source, and in the feminine form when the prayer is for a woman.' },
        EN_RULE_NAMES,
        EN_RULE_PRIVATE,
      ],
      faq: [
        { q: 'Do the dead benefit from the prayers of the living?', a: 'Yes, by agreement of the scholars. Allah describes the believers as saying: “Our Lord, forgive us and our brothers who went before us in faith” (al-Hashr 59:10), and the Prophet ﷺ said: “When a person dies, his deeds come to an end except for three: ongoing charity, knowledge that benefits, or a righteous child who prays for him” (Muslim). He ﷺ himself prayed for the dead in the funeral prayer and when visiting graves.' },
        { q: 'Is there special merit in reaching forty or a hundred people?', a: 'Sahih Muslim reports the merit of forty, or a hundred, Muslims praying over the deceased and interceding for them — but that is about the funeral prayer itself. No number is reported for supplication made like this, which is why the page sets no target: one sincere prayer is worth more than a large count.' },
        { q: 'Why is there no khatma or reading dedicated to the deceased?', a: 'Because whether the reward of reciting the Qur’an reaches the dead is disputed between the schools, while supplication is agreed to benefit them. If you want to read the Qur’an with others, the site’s group khatma is there as a general reading, without dedication.' },
        EN_FAQ_ACCOUNT,
        EN_FAQ_AGAIN,
        { q: 'I misspelt the name — do I make a new page?', a: 'No. In the browser that created the page, an “Edit” button appears at the bottom: correct the name or the pronoun, and the link you sent and the count stay as they are. The page can also be deleted for good from there. If you created it on another device, write to contact@islamicdates.org with the link.' },
      ],
      related: [
        { href: '/en/dua/', label: 'Supplications from the Qur’an and Sunnah' },
        { href: '/en/dua/parents-family/', label: 'Supplications for parents and family' },
        { href: '/en/khatma/', label: 'Group Quran khatma' },
        { href: '/en/pray-for/', label: 'Prayer page for someone ill, travelling or in need' },
        { href: '/en/', label: 'Hijri calendar and today’s date' },
      ],
      og: 'deceased',
    },
  },
  page: (name, kind, g, prayers) => {
    const N = iso(name, false);
    const f = g === 'f';
    const him = f ? 'her' : 'him';
    const his = f ? 'her' : 'his';
    const he = f ? 'she' : 'he';
    const He = f ? 'She' : 'He';
    const count: Plurals = {
      zero: `Be the first to pray for ${him}`,
      one: `{n} person has prayed for ${him}`,
      other: `{n} people have prayed for ${him}`,
    };
    const total: Plurals = { zero: '', one: '{n} prayer in all', other: '{n} prayers in all' };
    const tally = prayers === 0 ? '' : ` ${fill(prayers === 1 ? count.one! : count.other, { n: String(prayers) })}.`;
    const pressed = `then press “I prayed for ${him}”`;
    const sentBy = 'so whoever sent you the link knows you prayed.';

    const K: Record<PrayKind, {
      title: string; desc: string; note: string; lead: string; intro: string;
      reminderH: string; reminder: string; ogAlt: string; featured: string; share: string; meaning: string;
    }> = {
      deceased: {
        title: `Pray for ${N} · may Allah have mercy on ${him}`,
        desc: `A prayer page for ${N}, may Allah have mercy on ${him}. Read a supplication from the Qur’an and Sunnah for ${him}, ${pressed}.`,
        note: 'To Allah we belong, and to Him we return.',
        lead: `May Allah have mercy on ${him} and forgive ${him}.`,
        intro: `Pray for ${him} with this supplication, or in your own words and language, ${pressed} so ${his} family know you prayed.`,
        reminderH: 'What still benefits them',
        reminder: 'The Prophet ﷺ said: “When a person dies, his deeds come to an end except for three: ongoing charity, knowledge that benefits, or a righteous child who prays for him” (Muslim). Supplication is among the most beneficial things that can be offered for the dead, and it needs no set wording, time or number; charity given on their behalf reaches them too, by agreement of the scholars.',
        ogAlt: `Pray for ${N}`,
        featured: `Pray for ${him}`,
        share: `Please pray for ${N}, may Allah have mercy on ${him}.`,
        meaning: `O Allah, forgive ${him} and have mercy on ${him}.`,
      },
      sick: {
        title: `Pray for ${N}’s recovery`,
        desc: `A prayer page for ${N}’s recovery. Read a supplication for healing from the Qur’an and Sunnah, ${pressed}.`,
        note: 'No harm — it is a purification, if Allah wills.',
        lead: `May Allah heal ${him} and grant ${him} well-being.`,
        intro: `Pray for ${his} healing with this supplication, or in your own words and language, ${pressed} so ${his} family know you prayed.`,
        reminderH: `Visit ${him} if you can`,
        reminder: `The Prophet ﷺ said: “Whoever visits a sick person remains in the khurfah of Paradise.” He was asked what the khurfah of Paradise is, and said: “Its harvest” (Muslim). If you can visit or call ${him}, do; if not, your prayer for ${him} in ${his} absence is answered, by Allah’s leave.`,
        ogAlt: `Pray for ${N}’s recovery`,
        featured: `Pray for ${his} healing`,
        share: `Please pray for ${N}’s recovery.`,
        meaning: `O Allah, heal ${N}.`,
      },
      ease: {
        title: `Pray for ${N} · may Allah make it easy for ${him}`,
        desc: `A prayer page for ${N}: pray that Allah makes ${his} task easy. Read a supplication from the Qur’an and Sunnah, ${pressed}.`,
        note: 'Whoever puts their trust in Allah, He is enough for them.',
        lead: `May Allah make it easy for ${him} and grant ${him} success.`,
        intro: `Pray for ease for ${him} with this supplication, or in your own words and language, ${pressed} ${sentBy}`,
        reminderH: `Remember ${him} in your prostration`,
        reminder: `The Prophet ﷺ said: “The closest a servant comes to his Lord is while he is prostrating, so make plenty of supplication then” (Muslim). If you know when ${his} exam or appointment is, remember ${him} in your prostration that day.`,
        ogAlt: `Pray for ${N}`,
        featured: `Pray for ease for ${him}`,
        share: `Please pray for ${N}, that Allah makes it easy for ${him}.`,
        meaning: 'O Allah, nothing is easy except what You make easy.',
      },
      travel: {
        title: `Pray for ${N}’s journey · may Allah keep ${him} safe`,
        desc: `A prayer page for ${N}’s journey. Read a supplication from the Qur’an and Sunnah for ${him}, ${pressed}.`,
        note: 'Allah is the best of guardians.',
        lead: `May Allah keep ${him} safe on ${his} journey and bring ${him} back well.`,
        intro: `Pray for ${his} journey with this supplication, or in your own words and language, ${pressed} ${sentBy}`,
        reminderH: 'A traveller’s prayer is answered',
        reminder: `The Prophet ﷺ said: “Three prayers are answered, there is no doubt in them: the prayer of a parent, the prayer of a traveller, and the prayer of one who has been wronged” (Abu Dawud). If you see ${him} before ${he} leaves, bid ${him} farewell as the Prophet ﷺ did — “I entrust to Allah your faith, your trust and the final outcome of your deeds” — and ask ${him} to pray for you.`,
        ogAlt: `Pray for ${N}’s journey`,
        featured: `Pray for ${his} journey`,
        share: `Please pray for ${N}’s journey, may Allah keep ${him} safe.`,
        meaning: `O Allah, fold up the distance for ${him} and make the journey easy for ${him}.`,
      },
      distress: {
        title: `Pray for ${N} · may Allah relieve ${him}`,
        desc: `A prayer page for ${N}, may Allah relieve ${him}. Read a supplication from the Qur’an and Sunnah for ${him}, ${pressed}.`,
        note: 'Truly, with hardship comes ease.',
        lead: `May Allah relieve ${him} and set ${his} affairs right.`,
        intro: `Pray for ${him} with this supplication, or in your own words and language, ${pressed} ${sentBy}`,
        reminderH: `Help ${him} if you can`,
        reminder: `The Prophet ﷺ said: “Whoever relieves a believer of one of the hardships of this world, Allah will relieve him of one of the hardships of the Day of Resurrection” (Muslim). If something is in your hands — a word, a visit, a task done for ${him} — do it; if not, your prayer for ${him} in ${his} absence is answered, by Allah’s leave.`,
        ogAlt: `Pray for ${N}`,
        featured: `Pray for ${his} relief`,
        share: `Please pray for ${N}, may Allah relieve ${him}.`,
        meaning: `O Allah, deliver ${N}.`,
      },
      need: {
        title: `Pray for ${N} · may Allah fulfil ${his} need`,
        desc: `A prayer page for ${N}, who has a need that Allah knows. Read a supplication from the Qur’an and Sunnah for ${him}, ${pressed}.`,
        note: 'Your Lord has said: Call on Me, and I will answer you.',
        lead: `May Allah fulfil ${his} need and write good for ${him}.`,
        intro: `${He} has a need that Allah knows; it is not named here. Pray for ${him} with this supplication, or in your own words and language, ${pressed} ${sentBy}`,
        reminderH: 'A prayer made in someone’s absence is answered',
        reminder: `The Prophet ﷺ said: “A Muslim’s prayer for his brother in his absence is answered. At his head is an angel appointed to him: whenever he prays for good for his brother, the angel says: Amin, and the same for you” (Muslim). You need not know what ${his} need is: pray for good for ${him}, and Allah knows it.`,
        ogAlt: `Pray for ${N}`,
        featured: `Pray for good for ${him}`,
        share: `Please pray for ${N}, may Allah fulfil ${his} need.`,
        meaning: `O Allah, decree good for ${him} wherever it may be, then make ${him} content with it.`,
      },
    };
    const k = K[kind];
    return {
      title: k.title,
      description: k.desc + tally,
      eyebrow: EYEBROW[kind],
      eyebrowNote: k.note,
      lead: k.lead,
      intro: k.intro,
      reminderH: k.reminderH,
      reminder: k.reminder,
      ogAlt: k.ogAlt,
      card: {
        ...EN_UI,
        err: EN_ERR,
        count,
        total,
        youToo: 'including you',
        featuredH: k.featured,
        moreH: `More supplications for ${him}`,
        pray: `I prayed for ${him}`,
        prayAgain: `I prayed for ${him} today`,
        prayedToday: `You prayed for ${him} today`,
        prayHint: 'Press it once you have prayed.',
        returnHint: `You have prayed for ${him} before — may Allah reward you. Pray for ${him} today as well.`,
        comeBack: `Come back tomorrow and pray for ${him} again.`,
        sharePrompt: `Send the link so others can pray for ${him} too:`,
        shareAfter: `Now send the link to people who know ${him}, so they can pray for ${him} too:`,
        shareText: `${k.share}\n«${shareDua(kind, g, name)}»\n(${k.meaning})\nRead the supplication and press “I prayed”:`,
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
  bad_kind: 'منتخب کریں کہ دعا کس کے لیے ہے، اور مرد یا عورت۔',
  no_token: 'اس براؤزر کی شناخت نہیں ہو سکی۔ صفحہ دوبارہ لوڈ کریں۔',
  bad_action: 'نامعلوم عمل۔',
  not_admin: 'صفحہ صرف اسی براؤزر سے حذف ہو سکتا ہے جس سے بنایا گیا۔',
  network: 'رابطہ نہیں ہو سکا۔ نیٹ ورک دیکھ کر دوبارہ کوشش کریں۔',
  generic: 'درخواست مکمل نہیں ہو سکی۔',
};

const UR_UI: Omit<CardUi, 'err'> = {
  praying: 'ایک لمحہ…',
  shareWa: 'واٹس ایپ پر بھیجیں', shareNative: 'دیگر ایپس…', shareCopy: 'لنک کاپی کریں', shareCopied: 'لنک کاپی ہو گیا',
  copyDua: 'دعا کاپی کریں', copiedDua: 'کاپی ہو گئی',
  fontSmaller: 'دعا کا خط چھوٹا کریں', fontLarger: 'دعا کا خط بڑا کریں',
  doneTitle: 'اللہ آپ کی دعا قبول فرمائے',
  doneHadith: '«جو مسلمان اپنے بھائی کے لیے اس کی غیر موجودگی میں دعا کرتا ہے، فرشتہ کہتا ہے: اور تمہارے لیے بھی اسی جیسا»',
  doneHadithSrc: 'مسلم',
  newH: 'صفحہ بن گیا',
  newP: 'اب اسے گھر والوں اور دوستوں کو بھیجیں؛ جو بھی کھولے گا اسے نام کے ساتھ دعا تیار ملے گی۔',
  newPrayFirst: 'اور سب سے پہلے آپ دعا کریں۔',
  adminLead: 'یہ صفحہ آپ نے بنایا ہے۔', adminEdit: 'ترمیم', adminDelete: 'صفحہ حذف کریں',
  deleteWarn: 'نام اور گنتی ہمیشہ کے لیے مٹ جائے گی اور لنک کام نہیں کرے گا۔',
  deleteYes: 'ہاں، حذف کریں', cancel: 'منسوخ', deleted: 'صفحہ حذف ہو گیا۔',
  createNew: 'کسی اور عزیز کے لیے دعا کا صفحہ بنائیں',
  editH: 'صفحے میں ترمیم', editName: 'نام', editKind: 'دعا', editGender: 'کس کے لیے',
  editSave: 'محفوظ کریں', editSaving: 'محفوظ ہو رہا ہے…',
  editKindHint: 'دعا کی قسم بدلنے سے دعائیں اور عنوان بدل جائیں گے؛ لنک اور گنتی وہی رہیں گے۔',
  kinds: { sick: 'شفا', ease: 'آسانی', travel: 'سفر', distress: 'نجات', need: 'حاجت', deceased: 'مغفرت (مرحوم)' },
  genders: { m: 'مرد', f: 'عورت' },
};

const UR_STEP_PRAY = { t: 'سب دعا کریں', d: 'جو بھی لنک کھولے، اسے نام اور درست ضمیروں کے ساتھ دعا تیار ملے گی۔ وہ پڑھ کر «میں نے دعا کی» دبائے، اور سب دیکھیں کہ کتنے لوگوں نے دعا کی۔ جو کسی اور دن آ کر دوبارہ دعا کرے، اس کی دعا پھر گنی جاتی ہے۔' };
const UR_FAQ_ACCOUNT = { q: 'کیا اکاؤنٹ بنانا ہوگا؟ کیا میرا نام ظاہر ہوگا؟', a: 'دونوں نہیں۔ صرف لنک کافی ہے، اور ہم دعا کرنے والے کا نام نہیں پوچھتے۔ آپ کے براؤزر میں ایک بے ترتیب کوڈ محفوظ ہوتا ہے تاکہ آپ کی دعا دو بار نہ گنی جائے؛ اس کا آپ کی شناخت سے کوئی تعلق نہیں۔' };
const UR_FAQ_AGAIN = { q: 'کیا میں ایک سے زیادہ بار دعا کر سکتا ہوں؟', a: 'جی ہاں، جتنی بار چاہیں دعا کریں۔ صفحہ ہر ڈیوائس کو ایک شخص گنتا ہے، اور کسی اور دن کی دعا کل دعاؤں میں شامل ہو جاتی ہے، تاکہ صفحہ بنانے والا جان سکے کہ کتنے لوگوں نے اور کتنی بار دعا کی۔' };
const UR_RULE_NAMES = { b: 'نہ نام، نہ مقابلہ۔', t: 'ہم دعا کرنے والے کا نام نہیں پوچھتے اور نہ دعا کرنے والوں کی فہرست دکھاتے ہیں۔' };
const UR_RULE_PRIVATE = { b: 'نجی صفحہ۔', t: 'یہ سرچ انجنوں میں ظاہر نہیں ہوتا، صرف لنک رکھنے والے اسے کھول سکتے ہیں، اور بنانے والا جب چاہے اسے حذف کر سکتا ہے۔' };

const UR: LandingT = {
  dir: 'rtl',
  base: '/ur/pray-for/',
  tagline: 'دعا کا صفحہ',
  home: 'ہوم',
  kindLabel: 'دعا کس کے لیے ہے؟',
  kinds: {
    sick: { t: 'بیمار کے لیے', d: 'شفا اور عافیت' },
    ease: { t: 'امتحان یا مشکل کام', d: 'آسانی اور کامیابی' },
    travel: { t: 'مسافر کے لیے', d: 'سفر میں حفاظت' },
    distress: { t: 'پریشانی میں', d: 'غم اور مشکل سے نجات' },
    need: { t: 'کسی حاجت کے لیے', d: 'حاجت لکھے بغیر' },
    deceased: { t: 'مرحوم کے لیے', d: 'مغفرت اور رحمت' },
  },
  duasH: {
    sick: 'بیمار کی شفا کے لیے دعائیں',
    ease: 'آسانی کی دعائیں: امتحان، انٹرویو یا مشکل کام',
    travel: 'مسافر کے لیے دعائیں',
    distress: 'پریشانی اور تنگی میں دعائیں',
    need: 'حاجت مند کے لیے دعائیں',
    deceased: 'مرحوم کے لیے قرآن و سنت کی دعائیں',
  },
  nameLabel: 'نام',
  nameHint: 'جس نام سے گھر والے اور دوست انہیں جانتے ہیں۔ یہ صفحے کے عنوان اور خود دعا میں نظر آئے گا۔',
  genderLabel: 'دعا کس کے لیے',
  genders: { m: 'مرد', f: 'عورت' },
  submit: 'صفحہ بنائیں',
  submitting: 'بن رہا ہے…',
  stepsH: 'یہ کیسے کام کرتا ہے؟',
  rulesH: 'جن باتوں کا ہم نے خیال رکھا',
  faqH: 'عام سوالات',
  relatedH: 'متعلقہ ٹولز',
  footerNote: 'دعا کا صفحہ بغیر رجسٹریشن · ہم دعا کرنے والے کا نام نہیں پوچھتے',
  privacyLabel: 'رازداری پالیسی',
  privacyHref: '/ur/privacy/',
  notFoundH: 'یہ صفحہ نہیں ملا',
  notFoundBody: 'لنک درست نہیں، یا بنانے والے نے صفحہ حذف کر دیا ہے۔ یقینی بنائیں کہ پورا لنک کاپی ہوا ہے، یا دعا کا نیا صفحہ بنائیں۔',
  unavailableH: 'سروس اس وقت دستیاب نہیں',
  unavailableBody: 'اس وقت صفحے کا ڈیٹا حاصل نہیں ہو سکا۔ تھوڑی دیر بعد دوبارہ کوشش کریں۔',
  createNew: 'دعا کا نیا صفحہ بنائیں',
  navNew: 'نیا صفحہ',
  err: UR_ERR,
  doors: {
    living: {
      base: '/ur/pray-for/',
      toolLabel: 'اپنے پیاروں کے لیے دعا کا صفحہ',
      toolSub: 'بیمار، مسافر، امتحان یا کسی حاجت کے لیے — ایک لنک پر سب کی دعائیں',
      metaTitle: 'بیمار، مسافر یا حاجت مند کے لیے دعا کا صفحہ · ایک لنک پر سب کی دعائیں',
      metaDesc: 'اپنے کسی پیارے کے لیے مفت اور بغیر رجسٹریشن دعا کا صفحہ بنائیں: بیمار کی شفا، امتحان یا مشکل کام میں آسانی، مسافر کی حفاظت، پریشانی سے نجات، یا ایسی حاجت جسے اللہ جانتا ہے۔ ایک لنک گھر والوں اور دوستوں کو بھیجیں؛ ہر کوئی نام کے ساتھ قرآن و سنت کی دعا پڑھ کر «میں نے دعا کی» دبائے۔',
      h1: 'ان کے لیے دعا کریں: اپنے پیاروں کے لیے دعا کا صفحہ',
      intro: 'کوئی بیمار جس کی شفا کا انتظار ہے، امتحان دینے والا بیٹا، کوئی مسافر، یا کوئی دوست جو پریشانی میں ہے یا جس کی کوئی حاجت ہے… ان کے نام سے ایک صفحہ بنائیں اور اس کا لنک گھر والوں اور دوستوں کو بھیجیں؛ جو بھی کھولے گا اسے نام کے ساتھ قرآن و سنت کی ثابت دعا ملے گی، وہ پڑھ کر «میں نے دعا کی» دبائے گا اور گنتی بڑھ جائے گی۔ نہ رجسٹریشن، نہ ایپ۔',
      formH: 'دعا کا صفحہ بنائیں',
      namePh: 'مثال: میرا بھائی احمد',
      genderHint: 'عربی دعاؤں میں ضمیر اسی کے مطابق ہوں گے: «اللهم اشفه» یا «اللهم اشفها»۔',
      steps: [
        { t: 'منتخب کریں اور نام لکھیں', d: 'منتخب کریں کہ دعا کس کے لیے ہے — بیمار، امتحان یا مشکل کام، سفر، پریشانی، یا کوئی حاجت جسے اللہ جانتا ہے — اور وہ نام لکھیں جس سے لوگ انہیں جانتے ہیں۔ نہ اکاؤنٹ، نہ ای میل، نہ فون نمبر۔' },
        { t: 'لنک بھیجیں', d: 'صفحے کا ایک لنک بنتا ہے۔ اسے خاندان یا دوستوں کے گروپ میں بھیج دیں۔' },
        UR_STEP_PRAY,
      ],
      duasNote: 'ہر صفحے پر اس کی قسم کی دعائیں مناسب نام اور ضمیر کے ساتھ ظاہر ہوتی ہیں۔ آپ اپنے الفاظ میں اور کسی بھی زبان میں دعا کر سکتے ہیں۔',
      rules: [
        { b: 'ثابت دعائیں۔', t: 'قرآن اور صحیح سنت سے، ہر دعا کے حوالے کے ساتھ، اور عورت کے لیے مؤنث صیغے میں۔ جو دعائیں متکلم یا مخاطب کے صیغے میں آئی ہیں انہیں دوسرے کے لیے دعا کی صورت میں لکھا گیا ہے، اور نیچے اصل الفاظ درج ہیں۔' },
        { b: 'حاجت راز رہتی ہے۔', t: '«کسی حاجت کے لیے» میں صفحے پر حاجت کا ذکر نہیں ہوتا، اور ہم اس کے بارے میں نہیں پوچھتے۔' },
        { b: 'کوئی ہدف نہیں۔', t: 'گنتی اس لیے ہے کہ صفحہ بنانے والے کو معلوم ہو کہ لوگوں نے دعا کی — یہ کوئی ہدف نہیں۔ ہم کوئی عدد مقرر نہیں کرتے اور کسی عدد تک پہنچنے پر کوئی وعدہ نہیں کرتے۔' },
        UR_RULE_NAMES,
        UR_RULE_PRIVATE,
      ],
      faq: [
        { q: 'یہ صفحہ کس کے لیے ہے؟', a: 'ہر اس شخص کے لیے جس کے لیے آپ چاہتے ہیں کہ گھر والے اور دوست مل کر دعا کریں: بیمار یا جس کا آپریشن ہونا ہے، امتحان دینے والا طالب علم یا جسے انٹرویو یا کسی مشکل کام کا سامنا ہے، مسافر، پریشانی میں گھرا ہوا شخص، یا وہ جس کی کوئی حاجت ہے جس کا ذکر وہ پسند نہیں کرتا۔ صفحہ بناتے وقت دعا کی قسم منتخب کریں، تو نام اور درست ضمیر کے ساتھ مناسب دعائیں ظاہر ہوں گی۔' },
        { q: '«کسی حاجت کے لیے» کا کیا مطلب ہے؟', a: 'یہ کہ صفحہ ان کے لیے دعا کی درخواست کرتا ہے مگر ان کی حاجت نہیں بتاتا، اور بھلائی اور آسانی کی عام دعائیں دکھاتا ہے۔ اگر حاجت ایسی ہو جس کا ذکر کرتے جھجک ہو — جیسے قرض یا گھر کا کوئی معاملہ — تو یہ اسی کے لیے ہے؛ اللہ ان کے دل کی بات جانتا ہے۔' },
        { q: 'کیا کسی مسلمان کے لیے اس کی غیر موجودگی میں دعا قبول ہوتی ہے؟', a: 'جی ہاں۔ نبی ﷺ نے فرمایا: «مسلمان کی اپنے بھائی کے لیے اس کی غیر موجودگی میں کی گئی دعا قبول ہوتی ہے؛ اس کے سر کے پاس ایک فرشتہ مقرر ہوتا ہے، جب بھی وہ اپنے بھائی کے لیے بھلائی کی دعا کرتا ہے تو مقرر فرشتہ کہتا ہے: آمین، اور تمہارے لیے بھی اسی جیسا» (مسلم)۔ اور آپ ﷺ نے اپنے صحابہ کے لیے نام لے کر دعا فرمائی: «اللهم اشفِ سعداً» (متفق علیہ)۔' },
        { q: 'کچھ دعائیں غائب کے صیغے میں کیوں ہیں؟', a: 'کیونکہ کچھ ثابت دعائیں متکلم یا مخاطب کے صیغے میں آئی ہیں، جیسے موسیٰ علیہ السلام کی دعا ﴿رَبِّ اشْرَحْ لِي صَدْرِي﴾، دعائے استخارہ، اور مسافر کو رخصت کرنے کی دعا «أستودع الله دينك»۔ ہم نے انہیں دوسرے کے لیے دعا کی صورت میں لکھا تاکہ دعا کرنے والا ان کے لیے پڑھ سکے، اور ہر دعا کے نیچے اس کے اصل الفاظ اور حوالہ درج کیا۔' },
        { q: 'صلاۃ الحاجت کیوں شامل نہیں؟', a: 'کیونکہ اس کی مشہور حدیث، جو سنن ترمذی میں ہے، کی سند کمزور ہے — امام ترمذی نے خود فرمایا: «اس کی سند میں کلام ہے» — اس لیے ہم نے صرف ثابت چیزیں رکھیں۔ اگر آپ نماز میں ان کے لیے دعا کرنا چاہیں تو سجدہ دعا کی جگہ ہے: نبی ﷺ نے فرمایا: «بندہ اپنے رب کے سب سے زیادہ قریب سجدے کی حالت میں ہوتا ہے، پس کثرت سے دعا کرو» (مسلم)۔' },
        UR_FAQ_ACCOUNT,
        UR_FAQ_AGAIN,
        { q: 'نام غلط لکھا گیا، یا غلط قسم منتخب ہو گئی — کیا نیا صفحہ بنائیں؟', a: 'نہیں۔ جس براؤزر سے صفحہ بنایا گیا، اس میں نیچے «ترمیم» کا بٹن نظر آتا ہے: نام، ضمیر یا دعا کی قسم درست کریں؛ بھیجا ہوا لنک اور گنتی وہی رہیں گے۔ وہیں سے صفحہ ہمیشہ کے لیے حذف بھی ہو سکتا ہے۔ اگر آپ نے کسی اور ڈیوائس سے بنایا تھا تو لنک کے ساتھ contact@islamicdates.org پر لکھیں۔' },
      ],
      related: [
        { href: '/ur/dua/', label: 'قرآن و سنت کی دعائیں' },
        { href: '/ur/dua/health-protection/', label: 'شفا اور رقیہ کی دعائیں' },
        { href: '/ur/dua/distress/', label: 'پریشانی اور غم کی دعائیں' },
        { href: '/ur/khatma/', label: 'اجتماعی ختمِ قرآن' },
        { href: '/ur/prayer-times/', label: 'شہر کے مطابق اوقاتِ نماز' },
        { href: '/ur/', label: 'ہجری کیلنڈر اور آج کی تاریخ' },
      ],
      og: 'living',
    },
    deceased: {
      base: '/ur/pray-for/deceased/',
      toolLabel: 'مرحوم کے لیے دعا کا صفحہ',
      toolSub: 'ایک لنک پر مغفرت کی دعائیں',
      metaTitle: 'مرحوم کے لیے دعا کا صفحہ · ایک لنک پر سب کی دعائیں',
      metaDesc: 'کسی بچھڑ جانے والے عزیز کے لیے مفت اور بغیر رجسٹریشن دعا کا صفحہ بنائیں: ایک لنک گھر والوں اور دوستوں کو یا تعزیت کے پیغام کے ساتھ بھیجیں، ہر کوئی نام کے ساتھ قرآن و سنت کی دعا پڑھ کر «میں نے دعا کی» دبائے، اور سب دیکھیں کہ کتنے لوگوں نے دعا کی۔',
      h1: 'مغفرت کی دعا کریں: مرحوم کے لیے دعا کا صفحہ',
      intro: 'جب کوئی عزیز دنیا سے رخصت ہو جائے تو گھر والے اور دوست پوچھتے ہیں کہ ہم ان کے لیے کیا کریں؟ دعا۔ ان کے نام سے ایک صفحہ بنائیں اور اس کا لنک خاندان کے گروپ میں یا تعزیت کے پیغام کے ساتھ بھیج دیں؛ جو بھی اسے کھولے گا اسے قرآن و سنت کی ثابت دعائیں ملیں گی، وہ ان کے لیے پڑھ کر «میں نے دعا کی» دبائے گا اور گنتی بڑھ جائے گی۔ نہ رجسٹریشن، نہ ایپ۔',
      formH: 'دعا کا صفحہ بنائیں',
      namePh: 'مثال: والد صاحب محمد احمد',
      genderHint: 'عربی دعاؤں میں ضمیر اسی کے مطابق ہوں گے: «اللهم اغفر له» یا «اللهم اغفر لها»۔',
      steps: [
        { t: 'نام لکھیں', d: 'وہ نام لکھیں جس سے لوگ انہیں جانتے تھے۔ نہ اکاؤنٹ، نہ ای میل، نہ فون نمبر۔' },
        { t: 'لنک بھیجیں', d: 'صفحے کا ایک لنک بنتا ہے۔ اسے خاندان یا دوستوں کے گروپ میں، یا تعزیت کے پیغام کے ساتھ بھیج دیں۔' },
        UR_STEP_PRAY,
      ],
      duasNote: 'یہی دعائیں ہر صفحے پر مناسب نام اور ضمیر کے ساتھ ظاہر ہوتی ہیں۔ آپ اپنے الفاظ میں اور کسی بھی زبان میں دعا کر سکتے ہیں۔',
      rules: [
        { b: 'دعا، ایصالِ ثواب نہیں۔', t: 'صفحہ صرف دعا کے لیے ہے، جس کا میت کو فائدہ پہنچنا علما کے اتفاق سے ثابت ہے۔ اس میں ایصالِ ثواب کے لیے کوئی تلاوت یا ختم نہیں رکھا گیا، کیونکہ تلاوت کا ثواب میت تک پہنچنے میں علما کا اختلاف ہے۔' },
        { b: 'کوئی ہدف نہیں۔', t: 'گنتی اس لیے ہے کہ گھر والوں کو معلوم ہو کہ لوگوں نے دعا کی — یہ کوئی ہدف نہیں۔ ہم کوئی عدد مقرر نہیں کرتے اور کسی عدد تک پہنچنے پر کوئی وعدہ نہیں کرتے۔' },
        { b: 'ثابت دعائیں۔', t: 'قرآن اور صحیح سنت سے، ہر دعا کے حوالے کے ساتھ، اور عورت کے لیے مؤنث صیغے میں۔' },
        UR_RULE_NAMES,
        UR_RULE_PRIVATE,
      ],
      faq: [
        { q: 'کیا زندوں کی دعا سے میت کو فائدہ پہنچتا ہے؟', a: 'جی ہاں، علما کے اتفاق سے۔ اللہ تعالیٰ مومنوں کا قول بیان فرماتا ہے: ﴿رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ﴾ (الحشر: ۱۰)، اور نبی ﷺ نے فرمایا: «جب انسان فوت ہو جاتا ہے تو اس کا عمل ختم ہو جاتا ہے سوائے تین چیزوں کے: صدقۂ جاریہ، یا وہ علم جس سے فائدہ اٹھایا جائے، یا نیک اولاد جو اس کے لیے دعا کرے» (مسلم)۔ نبی ﷺ خود نمازِ جنازہ میں اور قبروں کی زیارت کے وقت مُردوں کے لیے دعا فرماتے تھے۔' },
        { q: 'کیا چالیس یا سو لوگوں تک پہنچنے کی کوئی خاص فضیلت ہے؟', a: 'صحیح مسلم میں یہ فضیلت آئی ہے کہ چالیس یا سو مسلمان میت کی نمازِ جنازہ پڑھیں اور اس کے لیے سفارش کریں — لیکن یہ خاص نمازِ جنازہ کے بارے میں ہے۔ اس طرح کی دعا کے لیے کوئی عدد وارد نہیں، اسی لیے صفحے پر کوئی ہدف نہیں رکھا گیا: ایک سچی دعا بڑی گنتی سے بہتر ہے۔' },
        { q: 'اس میں میت کے لیے ختم یا تلاوت کیوں نہیں؟', a: 'کیونکہ تلاوتِ قرآن کا ثواب میت تک پہنچنے کے بارے میں مسالک میں اختلاف ہے، جبکہ دعا کا فائدہ متفق علیہ ہے۔ اگر آپ دوسروں کے ساتھ مل کر قرآن پڑھنا چاہیں تو سائٹ کا اجتماعی ختم عام تلاوت کے طور پر موجود ہے۔' },
        UR_FAQ_ACCOUNT,
        UR_FAQ_AGAIN,
        { q: 'نام غلط لکھا گیا — کیا نیا صفحہ بنائیں؟', a: 'نہیں۔ جس براؤزر سے صفحہ بنایا گیا، اس میں نیچے «ترمیم» کا بٹن نظر آتا ہے: نام یا ضمیر درست کریں؛ بھیجا ہوا لنک اور گنتی وہی رہیں گے۔ وہیں سے صفحہ ہمیشہ کے لیے حذف بھی ہو سکتا ہے۔ اگر آپ نے کسی اور ڈیوائس سے بنایا تھا تو لنک کے ساتھ contact@islamicdates.org پر لکھیں۔' },
      ],
      related: [
        { href: '/ur/dua/', label: 'قرآن و سنت کی دعائیں' },
        { href: '/ur/dua/parents-family/', label: 'والدین اور خاندان کی دعائیں' },
        { href: '/ur/khatma/', label: 'اجتماعی ختمِ قرآن' },
        { href: '/ur/pray-for/', label: 'بیمار، مسافر یا حاجت مند کے لیے دعا کا صفحہ' },
        { href: '/ur/', label: 'ہجری کیلنڈر اور آج کی تاریخ' },
      ],
      og: 'deceased',
    },
  },
  page: (name, kind, g, prayers) => {
    const N = iso(name, true);
    const count: Plurals = { zero: 'سب سے پہلے آپ دعا کریں', one: 'ایک شخص نے دعا کی', other: '{n} افراد نے دعا کی' };
    const total: Plurals = { zero: '', one: 'کل ایک دعا', other: 'کل {n} دعائیں' };
    const tally = prayers === 0 ? '' : ` ${prayers === 1 ? count.one : fill(count.other, { n: num(prayers, 'ur') })}۔`;
    const press = 'پھر «میں نے دعا کی» دبائیں';
    const sentBy = 'تاکہ لنک بھیجنے والے کو معلوم ہو کہ آپ نے دعا کی۔';
    const family = 'تاکہ ان کے گھر والوں کو معلوم ہو کہ آپ نے دعا کی۔';

    const K: Record<PrayKind, {
      title: string; desc: string; note: string; lead: string; intro: string;
      reminderH: string; reminder: string; ogAlt: string; featured: string; share: string;
    }> = {
      deceased: {
        title: `${N} کے لیے دعا کریں · اللہ ان کی مغفرت فرمائے`,
        desc: `${N} کے لیے دعا کا صفحہ، اللہ ان کی مغفرت فرمائے۔ قرآن و سنت کی دعا پڑھیں، ${press}۔`,
        note: 'ہم اللہ ہی کے ہیں اور اسی کی طرف لوٹ کر جانے والے ہیں۔',
        lead: 'اللہ ان پر رحم فرمائے اور ان کی مغفرت فرمائے۔',
        intro: `اس دعا سے یا اپنے الفاظ اور اپنی زبان میں ان کے لیے دعا کریں، ${press} ${family}`,
        reminderH: 'جو چیز انہیں اب بھی فائدہ دیتی ہے',
        reminder: 'نبی ﷺ نے فرمایا: «جب انسان فوت ہو جاتا ہے تو اس کا عمل ختم ہو جاتا ہے سوائے تین چیزوں کے: صدقۂ جاریہ، یا وہ علم جس سے فائدہ اٹھایا جائے، یا نیک اولاد جو اس کے لیے دعا کرے» (مسلم)۔ دعا میت کے لیے سب سے مفید تحفوں میں سے ہے، اور اس کے لیے کوئی خاص الفاظ، وقت یا تعداد شرط نہیں؛ اور ان کی طرف سے صدقہ بھی علما کے اتفاق سے انہیں پہنچتا ہے۔',
        ogAlt: `${N} کے لیے دعا کریں`,
        featured: 'ان کے لیے دعا کریں',
        share: `${N} کے لیے دعا کریں، اللہ ان کی مغفرت فرمائے۔`,
      },
      sick: {
        title: `${N} کی شفا کے لیے دعا کریں`,
        desc: `${N} کی شفا کے لیے دعا کا صفحہ۔ قرآن و سنت کی شفا کی دعا پڑھیں، ${press}۔`,
        note: 'کوئی حرج نہیں، ان شاء اللہ یہ (گناہوں سے) پاکی ہے۔',
        lead: 'اللہ انہیں شفا اور عافیت عطا فرمائے۔',
        intro: `اس دعا سے یا اپنے الفاظ میں ان کی شفا کے لیے دعا کریں، ${press} ${family}`,
        reminderH: 'ہو سکے تو ان کی عیادت کریں',
        reminder: 'نبی ﷺ نے فرمایا: «جو کسی مریض کی عیادت کرتا ہے وہ جنت کے خُرفہ میں رہتا ہے۔» پوچھا گیا: جنت کا خُرفہ کیا ہے؟ فرمایا: «اس کے چنے ہوئے پھل» (مسلم)۔ اگر ممکن ہو تو ان کی عیادت کریں یا فون کریں، ورنہ ان کی غیر موجودگی میں آپ کی دعا اللہ کے حکم سے قبول ہوتی ہے۔',
        ogAlt: `${N} کی شفا کے لیے دعا کریں`,
        featured: 'ان کی شفا کے لیے دعا کریں',
        share: `${N} کی شفا کے لیے دعا کریں۔`,
      },
      ease: {
        title: `${N} کے لیے آسانی کی دعا کریں`,
        desc: `${N} کے لیے دعا کا صفحہ: اللہ ان کا کام آسان فرمائے۔ قرآن و سنت کی دعا پڑھیں، ${press}۔`,
        note: 'جو اللہ پر بھروسا کرے، اللہ اس کے لیے کافی ہے۔',
        lead: 'اللہ ان کا کام آسان فرمائے اور انہیں کامیابی دے۔',
        intro: `اس دعا سے یا اپنے الفاظ اور اپنی زبان میں ان کے لیے آسانی کی دعا کریں، ${press} ${sentBy}`,
        reminderH: 'سجدے میں انہیں یاد رکھیں',
        reminder: 'نبی ﷺ نے فرمایا: «بندہ اپنے رب کے سب سے زیادہ قریب سجدے کی حالت میں ہوتا ہے، پس کثرت سے دعا کرو» (مسلم)۔ اگر آپ کو ان کے امتحان یا کام کا وقت معلوم ہو تو اس دن اپنے سجدے میں انہیں یاد رکھیں۔',
        ogAlt: `${N} کے لیے آسانی کی دعا کریں`,
        featured: 'ان کے لیے آسانی کی دعا کریں',
        share: `${N} کے لیے آسانی کی دعا کریں۔`,
      },
      travel: {
        title: `${N} کے سفر کے لیے دعا کریں`,
        desc: `${N} کے سفر کے لیے دعا کا صفحہ، اللہ انہیں محفوظ رکھے۔ قرآن و سنت کی دعا پڑھیں، ${press}۔`,
        note: 'اللہ ہی بہترین نگہبان ہے۔',
        lead: 'اللہ انہیں سفر میں محفوظ رکھے اور خیریت سے واپس لائے۔',
        intro: `اس دعا سے یا اپنے الفاظ اور اپنی زبان میں ان کے سفر کے لیے دعا کریں، ${press} ${sentBy}`,
        reminderH: 'مسافر کی دعا قبول ہوتی ہے',
        reminder: 'نبی ﷺ نے فرمایا: «تین دعائیں قبول ہوتی ہیں، ان میں کوئی شک نہیں: والد کی دعا، مسافر کی دعا اور مظلوم کی دعا» (ابو داؤد)۔ اگر ان کے سفر سے پہلے ملاقات ہو تو انہیں نبی ﷺ کے الفاظ «أستودع الله دينك وأمانتك وخواتيم عملك» سے رخصت کریں، اور ان سے اپنے لیے دعا کی درخواست کریں۔',
        ogAlt: `${N} کے سفر کے لیے دعا کریں`,
        featured: 'ان کے سفر کے لیے دعا کریں',
        share: `${N} کے سفر کے لیے دعا کریں، اللہ انہیں محفوظ رکھے۔`,
      },
      distress: {
        title: `${N} کے لیے دعا کریں · اللہ ان کی مشکل آسان فرمائے`,
        desc: `${N} کے لیے دعا کا صفحہ، اللہ ان کی مشکل آسان فرمائے۔ قرآن و سنت کی دعا پڑھیں، ${press}۔`,
        note: 'بے شک تنگی کے ساتھ آسانی ہے۔',
        lead: 'اللہ ان کی مشکل آسان فرمائے اور ان کے حالات درست فرمائے۔',
        intro: `اس دعا سے یا اپنے الفاظ اور اپنی زبان میں ان کے لیے دعا کریں، ${press} ${sentBy}`,
        reminderH: 'ہو سکے تو ان کی مدد کریں',
        reminder: 'نبی ﷺ نے فرمایا: «جس نے کسی مومن سے دنیا کی تکلیفوں میں سے کوئی تکلیف دور کی، اللہ قیامت کے دن کی تکلیفوں میں سے اس کی کوئی تکلیف دور فرمائے گا» (مسلم)۔ اگر آپ ان کی کچھ مدد کر سکیں — ایک بات، ایک ملاقات یا کوئی کام — تو ضرور کریں، ورنہ ان کی غیر موجودگی میں آپ کی دعا اللہ کے حکم سے قبول ہوتی ہے۔',
        ogAlt: `${N} کے لیے دعا کریں`,
        featured: 'ان کے لیے دعا کریں',
        share: `${N} کے لیے دعا کریں، اللہ ان کی مشکل آسان فرمائے۔`,
      },
      need: {
        title: `${N} کے لیے دعا کریں · اللہ ان کی حاجت پوری فرمائے`,
        desc: `${N} کے لیے دعا کا صفحہ، جن کی ایک حاجت ہے جسے اللہ جانتا ہے۔ قرآن و سنت کی دعا پڑھیں، ${press}۔`,
        note: 'اور تمہارے رب نے فرمایا: مجھ سے دعا کرو، میں تمہاری دعا قبول کروں گا۔',
        lead: 'اللہ ان کی حاجت پوری فرمائے اور ان کے لیے بھلائی لکھ دے۔',
        intro: `ان کی ایک حاجت ہے جسے اللہ جانتا ہے؛ وہ یہاں نہیں لکھی گئی۔ اس دعا سے یا اپنے الفاظ میں ان کے لیے دعا کریں، ${press} ${sentBy}`,
        reminderH: 'غیر موجودگی میں کی گئی دعا قبول ہوتی ہے',
        reminder: 'نبی ﷺ نے فرمایا: «مسلمان کی اپنے بھائی کے لیے اس کی غیر موجودگی میں کی گئی دعا قبول ہوتی ہے؛ اس کے سر کے پاس ایک فرشتہ مقرر ہوتا ہے، جب بھی وہ اپنے بھائی کے لیے بھلائی کی دعا کرتا ہے تو مقرر فرشتہ کہتا ہے: آمین، اور تمہارے لیے بھی اسی جیسا» (مسلم)۔ ان کی حاجت جاننا ضروری نہیں؛ ان کے لیے بھلائی کی دعا کریں، اللہ ان کی حاجت جانتا ہے۔',
        ogAlt: `${N} کے لیے دعا کریں`,
        featured: 'ان کے لیے بھلائی کی دعا کریں',
        share: `${N} کے لیے دعا کریں، اللہ ان کی حاجت پوری فرمائے۔`,
      },
    };
    const k = K[kind];
    return {
      title: k.title,
      description: k.desc + tally,
      eyebrow: EYEBROW[kind],
      eyebrowNote: k.note,
      lead: k.lead,
      intro: k.intro,
      reminderH: k.reminderH,
      reminder: k.reminder,
      ogAlt: k.ogAlt,
      card: {
        ...UR_UI,
        err: UR_ERR,
        count,
        total,
        youToo: 'آپ بھی ان میں شامل ہیں',
        featuredH: k.featured,
        moreH: 'ان کے لیے مزید دعائیں',
        pray: 'میں نے دعا کی',
        prayAgain: 'میں نے آج دعا کی',
        prayedToday: 'آپ نے آج دعا کر لی',
        prayHint: 'دعا کر لینے کے بعد دبائیں۔',
        returnHint: 'آپ پہلے بھی دعا کر چکے ہیں، جزاک اللہ خیراً۔ آج بھی ان کے لیے دعا کریں۔',
        comeBack: 'کل پھر آئیں اور دوبارہ دعا کریں۔',
        sharePrompt: 'لنک بھیجیں تاکہ دوسرے بھی ان کے لیے دعا کریں:',
        shareAfter: 'اب یہ لنک ان کے جاننے والوں کو بھیجیں تاکہ وہ بھی دعا کریں:',
        shareText: `${k.share}\n«${shareDua(kind, g, name)}»\nدعا پڑھیں اور «میں نے دعا کی» دبائیں:`,
      },
    };
  },
};

export const prayT = (lang: Lang): LandingT => (lang === 'en' ? EN : lang === 'ur' ? UR : AR);

/** Where «create another page» leads from a page of this kind: the same door. */
export const newPageHref = (lang: Lang, kind: PrayKind): string => prayT(lang).doors[doorOf(kind)].base;
