// ─────────────────────────────────────────────────────────────────────────────
// نصوص ميزة الختمة الجماعية بالعربية والإنجليزية والأردية.
//
// `grid` holds only plain strings with {placeholders}: that object is serialised
// into the page and handed to the React island, so nothing in it may be a
// function. Everything outside `grid` is rendered on the server and may be one.
// ─────────────────────────────────────────────────────────────────────────────
import type { Lang } from './data';

/** رموز الأخطاء — تُرسل من الخادم وتُترجَم في المتصفح. */
export type ErrCode =
  | 'taken' | 'cannot_confirm' | 'cannot_release'
  | 'bad_part' | 'no_token' | 'bad_action'
  | 'not_found' | 'bad_link' | 'unavailable'
  | 'forbidden' | 'rate' | 'empty_title'
  | 'network' | 'generic';

export interface GridT {
  progressAria: string;
  countDone: string;
  reading: string;
  free: string;
  completeMsg: string;
  completeLink: string;
  mineNote: string;
  statusFree: string; statusHeld: string; statusDone: string;
  juzAria: string;
  tagDone: string; tagHeldBy: string; tagHeld: string; tagMine: string; tagTake: string;
  actRead: string; actDone: string; actRelease: string;
  modalTitle: string; modalRange: string;
  nameLabel: string; namePh: string; modalNote: string;
  modalTake: string; modalCancel: string;
  sharePrompt: string; shareText: string; shareWa: string; shareCopy: string; shareCopied: string;
  tExpired: string; tDay: string; tDays: string; tHour: string; tHours: string; tMinutes: string;
  err: Record<ErrCode, string>;
}

export interface KhatmaT {
  dir: 'rtl' | 'ltr';
  tagline: string;
  base: string;
  metaTitle: string; metaDesc: string;
  h1: string; intro: string;
  formH: string;
  titleLabel: string; titlePh: string;
  holdLabel: string; holdHint: string;
  submit: string; submitting: string;
  stepsH: string; steps: { t: string; d: string }[];
  rulesH: string; rulesIntro: string; rules: { b: string; t: string }[];
  rulesMoreA: string; rulesMoreB: string; rulesMoreC: string;
  faqH: string; faq: { q: string; a: string }[];
  relatedH: string; related: { href: string; label: string }[];
  footerNote: string; privacyLabel: string; privacyHref: string;
  newNoteLead: string; newNote: string;
  pageIntro: string;
  reminderH: string; reminder: string;
  notFoundH: string; notFoundBody: string;
  unavailableH: string; unavailableBody: string;
  createNew: string; navNew: string; home: string;
  /** صياغة المهلة: 12 → «١٢ ساعة»، 720 → «شهر» */
  holdText: (h: number) => string;
  khatmaTitle: (t: string) => string;
  khatmaDesc: (t: string, done: number) => string;
  grid: GridT;
}

export const FATWA_LINKS = {
  darAlifta: 'https://www.dar-alifta.org/ar/fatwaresearch/details/77/%D8%AD%D9%83%D9%85-%D8%AE%D8%AA%D9%85-%D8%A7%D9%84%D9%82%D8%B1%D8%A2%D9%86-%D8%AC%D9%85%D8%A7%D8%B9%D8%A9',
  islamweb: 'https://www.islamweb.net/ar/fatwa/442006/',
};

// ── العربية ──────────────────────────────────────────────────────────────────
const AR: KhatmaT = {
  dir: 'rtl',
  tagline: 'ختمة جماعية',
  base: '/khatma/',
  metaTitle: 'ختمة قرآن جماعية · وزّعوا الأجزاء الثلاثين بينكم برابط واحد',
  metaDesc: 'أنشئ ختمة قرآن جماعية مجاناً وبلا تسجيل: رابط واحد تشاركه، وكل مشارك يختار جزءاً ويقرأه، والعدّاد يتابع الأجزاء المكتملة. الجزء غير المقروء يعود للمجموعة تلقائياً حتى لا تتوقّف الختمة.',
  h1: 'ختمة قرآن جماعية بتوزيع الأجزاء',
  intro: 'ثلاثون جزءاً وأنتم جماعة: كل واحد يأخذ جزءاً ويقرأه، فتكتمل الأجزاء الثلاثون بينكم في أيام. أنشئ الختمة من هنا، وشارك رابطها في مجموعتكم — بلا تسجيل ولا تطبيق ولا إعلان داخل الصفحة.',
  formH: 'أنشئ ختمة الآن',
  titleLabel: 'عنوان الختمة',
  titlePh: 'مثال: ختمة العائلة · ختمة رمضان · ختمة الأصدقاء',
  holdLabel: 'مهلة قراءة الجزء الواحد',
  holdHint: 'إذا لم يؤكّد القارئ إتمام جزئه خلال هذه المهلة عاد الجزء إلى المجموعة تلقائياً، فلا تتعطّل الختمة بجزء نسيه صاحبه. اختر مهلة تناسب إيقاع مجموعتكم: نصف يوم لختمة سريعة، وشهر لمن يقرأ على مهل.',
  submit: 'إنشاء الختمة',
  submitting: 'جارٍ الإنشاء…',
  stepsH: 'كيف تعمل؟',
  steps: [
    { t: 'أنشئ الختمة', d: 'اكتب عنواناً يعرفه أهلك أو أصدقاؤك — «ختمة العائلة» أو «ختمة رمضان» — واضغط إنشاء. بلا حساب ولا بريد ولا رقم هاتف.' },
    { t: 'شارك الرابط', d: 'ينشأ رابط واحد للختمة. أرسله في مجموعة واتساب أو التلغرام؛ كل من يفتحه يرى الأجزاء المتاحة فوراً.' },
    { t: 'كل مشارك يختار جزءاً', d: 'بضغطة واحدة يحجز الجزء باسمه أو بلا اسم، فيختفي من قائمة المتاح لئلا يُقرأ مرتين ويبقى غيره بلا قارئ.' },
    { t: 'تأكيد الإتمام', d: 'بعد القراءة يضغط «أتممت القراءة» فيُحتسب الجزء. وإذا انشغل ومرّت المهلة عاد الجزء للمجموعة تلقائياً.' },
  ],
  rulesH: 'ضوابط راعيناها في هذه الصفحة',
  rulesIntro: 'الختمة الجماعية مسألة اجتهادية، وقد بُنيت هذه الأداة على الصورة التي عليها أكثر المفتين المعاصرين، مع تجنّب مواضع الخلاف الحادّ:',
  rules: [
    { b: 'لا إهداء للأموات.', t: 'ليس في الختمة حقل لاسم متوفّى، لأن وصول ثواب التلاوة إلى الميت محلّ خلاف بين المذاهب. والدعاء للميت متفق عليه، فليدعُ من شاء بنفسه.' },
    { b: 'العدّاد صادق في عبارته.', t: 'يقول «كذا جزءاً مكتملاً» ولا يقول لأحد إنه ختم القرآن؛ فمن قرأ جزءاً فقد قرأ جزءاً.' },
    { b: 'لا تخصيص بزمن ولا عدد.', t: 'لا نربط الختمة بليلة بعينها ولا بأربعين يوماً ولا بتكرار مخصوص يُعتقد فيه فضل خاص.' },
    { b: 'القراءة باللسان.', t: 'ننبّه عليها عند أخذ كل جزء، فالنظر المجرّد في المصحف من غير تحريك اللسان لا يُعدّ تلاوة.' },
    { b: 'لا إلزام ولا عقوبة.', t: 'من لم يتمكّن من جزئه أرجعه بزرّ واحد، ولا يُشهَّر بأحد ولا تُحتسب عليه مخالفة.' },
    { b: 'الاسم اختياري ولا لوحة تنافس.', t: 'من شاء شارك باسمه ومن شاء بقي «مشارك»، ولا نرتّب الناس حسب عدد أجزائهم.' },
    { b: 'دعاء الختم لكل قارئ.', t: 'لا نصوغ للمجموعة دعاء ختمةٍ كاملة، إذ من قرأ جزءاً لم يختم القرآن.' },
  ],
  rulesMoreA: 'للاستزادة: ',
  rulesMoreB: 'فتوى دار الإفتاء المصرية في ختم القرآن جماعة',
  rulesMoreC: 'فتوى إسلام ويب في المجموعات المنظَّمة للختم. والمسألة اجتهادية، والأولى سؤال دار الإفتاء في بلدك.',
  faqH: 'أسئلة شائعة',
  faq: [
    { q: 'هل تجوز الختمة الجماعية بتوزيع الأجزاء؟', a: 'القراءة نفسها لا خلاف في فضلها، وكل قارئ يؤجر على ما قرأ. أما تنظيم المجموعة وتوزيع الأجزاء فقد أفتت دار الإفتاء المصرية بجواز ختم القرآن جماعةً، واعتبرته تعاوناً على الخير لا عبادةً بصفة مخترعة. وذهب آخرون — كمركز الفتوى بإسلام ويب — إلى التحفّظ على اتخاذها عادة راتبة، ونبّهوا إلى أن من قرأ جزءاً واحداً لم يختم القرآن حقيقةً. ولذلك يعرض الموقع العدّاد على أنه «أجزاء مكتملة» لا على أن أحداً ختم القرآن، وهي مسألة اجتهادية يُرجع فيها إلى دار الإفتاء في بلدك.' },
    { q: 'هل في الموقع ختمة للمتوفّى؟', a: 'لا. هذه الختمة قراءة جماعية عامة ليس غير، وليس فيها حقل لاسم متوفّى ولا إهداء ثواب، لأن وصول ثواب التلاوة إلى الميت مسألة خلافية بين المذاهب. ومن أراد الدعاء لميت فليدعُ له بنفسه، فالدعاء متفق على وصوله.' },
    { q: 'هل أحتاج إلى حساب أو تسجيل دخول؟', a: 'لا. الرابط وحده هو الدعوة، والاسم اختياري تماماً؛ من تركه ظهر باسم «مشارك». لا نطلب بريداً ولا رقم هاتف، ولا نحفظ عنك شيئاً سوى الاسم الذي تكتبه بنفسك إن كتبته.' },
    { q: 'ماذا لو أخذ أحدهم جزءاً ولم يقرأه؟', a: 'لكل جزء مهلة يحدّدها منشئ الختمة، من اثنتي عشرة ساعة إلى شهر كامل، والافتراضي يومان. فإذا انتهت المهلة دون تأكيد، عاد الجزء إلى المتاح ليأخذه غيره. هذه أهم نقطة عملياً: بدونها تتجمّد الختمة عند جزء واحد نسيه صاحبه.' },
    { q: 'هل يمكن أن يأخذ شخصان الجزء نفسه؟', a: 'لا. يُحجز الجزء لأول من يضغط عليه، ومن يأتي بعده تظهر له رسالة بأن غيره سبقه مع تحديث فوري للأجزاء المتاحة.' },
    { q: 'كم جزءاً أستطيع أن آخذ؟', a: 'ما شئت. خذ جزءاً واحداً أو عدة أجزاء، وأعد أي جزء للمجموعة متى شئت بزر «إرجاع» إن رأيت أنك لن تتمكّن منه.' },
  ],
  relatedH: 'أدوات ذات صلة',
  related: [
    { href: '/imsakiyah/', label: 'إمساكية رمضان حسب مدينتك' },
    { href: '/fasting/', label: 'الأيام البيض وأيام الصيام' },
    { href: '/dua/', label: 'أدعية وأذكار' },
    { href: '/prayer-times/', label: 'مواقيت الصلاة حسب المدينة' },
    { href: '/', label: 'التقويم الهجري وتاريخ اليوم' },
  ],
  footerNote: 'ختمة جماعية بلا تسجيل · الاسم اختياري ولا نحفظ بيانات شخصية',
  privacyLabel: 'سياسة الخصوصية',
  privacyHref: '/privacy/',
  newNoteLead: 'أُنشئت الختمة.',
  newNote: 'انسخ رابط هذه الصفحة وأرسله إلى مجموعتكم؛ كل من يفتحه يستطيع أخذ جزء فوراً. احتفظ بالرابط عندك، فهو طريقك الوحيد للعودة إليها.',
  pageIntro: 'اختر جزءاً متاحاً فيُحجز باسمك، ثم اقرأه بلسانك وأكّد إتمامه. من قرأ جزءاً فله أجر ما قرأ، والعدّاد يُظهر ما اكتمل من الأجزاء الثلاثين.',
  reminderH: 'تذكير',
  reminder: 'القراءة تكون باللسان لا بمجرّد النظر. وليست العبرة بسرعة الإنهاء بل بالإتقان والتدبّر، فإن ضاق وقتك عن جزئك فأرجعه بزرّ «إرجاع» ليأخذه غيرك. وهذه ختمة قراءة جماعية عامة ليس فيها إهداء ثواب لأحد؛ من أراد الدعاء لميت فليدعُ له بنفسه.',
  notFoundH: 'لم نجد هذه الختمة',
  notFoundBody: 'الرابط غير صحيح أو أن الختمة لم تعد موجودة. تأكّد من نسخ الرابط كاملاً، أو ابدأ ختمة جديدة.',
  unavailableH: 'الخدمة غير متاحة حالياً',
  unavailableBody: 'تعذّر الوصول إلى بيانات الختمات في هذه اللحظة. أعد المحاولة بعد قليل.',
  createNew: 'إنشاء ختمة جديدة',
  navNew: 'ختمة جديدة',
  home: 'الرئيسية',
  holdText: (h) => (h === 720 ? 'شهر' : h === 168 ? 'أسبوع' : h === 24 ? 'يوم واحد' : h < 24 ? `${h} ساعة` : h === 48 ? 'يومان' : `${h / 24} أيام`),
  khatmaTitle: (t) => `ختمة «${t}» · اختر جزءاً واقرأه`,
  khatmaDesc: (t, d) => `شارك في ختمة «${t}»: اكتمل ${d} من ٣٠ جزءاً. اختر جزءاً متاحاً واقرأه، ثم أكّد إتمامه.`,
  grid: {
    progressAria: 'تقدّم الختمة',
    countDone: '{done}/{total} جزءاً مكتملاً',
    reading: '{n} قيد القراءة',
    free: '{n} متاح',
    completeMsg: 'اكتملت أجزاء الختمة الثلاثون. تقبّل الله من كل قارئ ما قرأ.',
    completeLink: 'ابدأ ختمة جديدة',
    mineNote: 'بين يديك الأجزاء: {list}. اضغط «أتممت القراءة» عند الانتهاء ليُحتسب في العدّاد.',
    statusFree: 'متاح', statusHeld: 'قيد القراءة', statusDone: 'مقروء',
    juzAria: 'الجزء {n} — {name} — {status}',
    tagDone: 'مقروء',
    tagHeldBy: 'مع {name}',
    tagHeld: 'قيد القراءة',
    tagMine: 'لك · {time}',
    tagTake: 'خذ هذا الجزء',
    actRead: 'اقرأ الجزء', actDone: 'أتممت القراءة', actRelease: 'إرجاع',
    modalTitle: 'الجزء {n} — {name}',
    modalRange: '{from} إلى {to}',
    nameLabel: 'اسمك (اختياري)',
    namePh: 'يظهر بجانب الجزء — اتركه فارغاً لتبقى «مشارك»',
    modalNote: 'القراءة تكون باللسان لا بمجرّد النظر. أمامك {hold} لقراءته، وبعدها يعود للمجموعة تلقائياً حتى لا تتوقّف الختمة.',
    modalTake: 'خذ الجزء', modalCancel: 'إلغاء',
    sharePrompt: 'شارك الرابط ليأخذ غيرك بقيّة الأجزاء:',
    shareText: 'شاركنا في ختمة «{title}» — اختر جزءاً واقرأه:',
    shareWa: 'مشاركة على واتساب', shareCopy: 'نسخ الرابط', shareCopied: 'تم نسخ الرابط',
    tExpired: 'انتهت المهلة', tDay: 'يوم تقريباً', tDays: '{n} أيام تقريباً',
    tHour: 'ساعة تقريباً', tHours: '{n} ساعات تقريباً', tMinutes: '{n} دقيقة',
    err: {
      taken: 'سبقك إليه غيرك — اختر جزءاً آخر.',
      cannot_confirm: 'لا يمكن تأكيد هذا الجزء — ربما انتهت مهلته أو أُكِّد من قبل.',
      cannot_release: 'لا يمكن إرجاع هذا الجزء.',
      bad_part: 'رقم جزء غير صالح.',
      no_token: 'رمز القارئ مفقود.',
      bad_action: 'إجراء غير معروف.',
      not_found: 'لم نجد هذه الختمة.',
      bad_link: 'رابط ختمة غير صالح.',
      unavailable: 'خدمة الختمة غير متاحة حالياً.',
      forbidden: 'طلب غير مسموح.',
      rate: 'أنشأتَ ختمات كثيرة خلال ساعة. حاول بعد قليل.',
      empty_title: 'اكتب عنواناً للختمة.',
      network: 'تعذّر الاتصال. تحقّق من الشبكة وأعد المحاولة.',
      generic: 'تعذّر إتمام الطلب.',
    },
  },
};

// ── English ──────────────────────────────────────────────────────────────────
const EN: KhatmaT = {
  dir: 'ltr',
  tagline: 'Group khatma',
  base: '/en/khatma/',
  metaTitle: "Group Quran Khatma · Share the thirty juz' over one link",
  metaDesc: "Start a group Qur'an khatma, free and without signing up: one link to share, each reader takes a juz and reads it, and the counter follows what is done. A juz left unread returns to the group automatically, so the khatma never stalls.",
  h1: "A group Qur'an khatma, juz by juz",
  intro: "Thirty juz' and a group of you: each person takes one and reads it, and the thirty are finished between you within days. Create the khatma here and share its link with your group — no sign-up, no app, no ads on the page.",
  formH: 'Start a khatma',
  titleLabel: 'Khatma name',
  titlePh: 'For example: Family khatma · Ramadan khatma · Friends',
  holdLabel: 'How long one juz may be held',
  holdHint: 'If a reader does not confirm their juz within this window it returns to the group automatically, so one forgotten juz cannot stall the khatma. Pick what matches your group: half a day for a fast khatma, a month for reading at leisure.',
  submit: 'Create khatma',
  submitting: 'Creating…',
  stepsH: 'How it works',
  steps: [
    { t: 'Create the khatma', d: 'Give it a name your family or friends will recognise — "Family khatma", "Ramadan khatma" — and press create. No account, no e-mail, no phone number.' },
    { t: 'Share the link', d: "One link is created. Send it to a WhatsApp or Telegram group; anyone who opens it sees the available juz' straight away." },
    { t: 'Each person takes a juz', d: 'One tap reserves it, with a name or without, and it leaves the available list — so nothing is read twice while something else goes unread.' },
    { t: 'Confirm when done', d: 'After reading they press "I finished reading" and the juz counts. If they get busy and the window passes, it returns to the group on its own.' },
  ],
  rulesH: 'What we were careful about',
  rulesIntro: 'The group khatma is a matter scholars differ on. This tool is built on the form most contemporary muftis allow, and stays away from the sharper points of disagreement:',
  rules: [
    { b: 'No dedication to the dead.', t: 'There is no field for a deceased person, because whether the reward of recitation reaches the dead is disputed between the schools. Supplication for the dead is agreed upon, so anyone who wishes may make it themselves.' },
    { b: 'The counter says what it means.', t: "It reads “N juz' completed” and never tells anyone they finished the Qur'an. A reader who read one juz read one juz." },
    { b: 'No fixed time or count.', t: 'The khatma is not tied to a particular night, nor to forty days, nor to a set number of repetitions believed to carry a special merit.' },
    { b: 'Recitation with the tongue.', t: 'We say so when each juz is taken: looking at the page without moving the tongue is not recitation.' },
    { b: 'No obligation, no penalty.', t: 'Anyone who cannot manage their juz returns it with one button. Nobody is named and shamed and nothing is counted against them.' },
    { b: 'Names optional, no leaderboard.', t: "Share your name if you like, or stay “Participant”. We do not rank people by how many juz' they took." },
    { b: "The closing supplication is each reader's own.", t: "We do not compose a whole-khatma supplication for the group, since a reader of one juz has not completed the Qur'an." },
  ],
  rulesMoreA: 'Further reading: ',
  rulesMoreB: "Dar al-Ifta al-Misriyyah on completing the Qur'an as a group",
  rulesMoreC: "IslamWeb on organised groups for completion (both in Arabic). This is a matter of scholarly judgement — your own country's house of fatwa is the place to ask.",
  faqH: 'Common questions',
  faq: [
    { q: "Is a group khatma with the juz' divided up permitted?", a: "The reading itself is not disputed, and each reader is rewarded for what they read. As for organising the group and dividing the juz', Dar al-Ifta al-Misriyyah has ruled that completing the Qur'an as a group is permitted, treating it as cooperation in good rather than an invented act of worship. Others — the fatwa centre at IslamWeb among them — are more reserved about making it a standing habit, and note that someone who read a single juz has not truly completed the Qur'an. That is why the counter here reads “juz' completed” rather than claiming anyone finished the Qur'an. It is a matter of scholarly judgement; ask the house of fatwa in your own country." },
    { q: 'Is there a khatma for a deceased person?', a: 'No. This is a plain group reading. There is no field for a deceased person and no dedication of reward, because whether the reward of recitation reaches the dead is disputed between the schools. Anyone who wants to pray for someone who has died should do so themselves — supplication is agreed to reach them.' },
    { q: 'Do I need an account?', a: 'No. The link itself is the invitation and the name is entirely optional; leave it empty and you appear as "Participant". We ask for no e-mail and no phone number, and store nothing about you beyond the name you type, if you type one.' },
    { q: 'What if someone takes a juz and never reads it?', a: 'Every juz has a window set by whoever created the khatma, from twelve hours to a full month, with two days as the default. If the window passes without confirmation, the juz returns to the available list for someone else. This is the point that matters most in practice: without it, one forgotten juz freezes the khatma for good.' },
    { q: 'Can two people take the same juz?', a: "No. The juz goes to whoever taps it first; anyone who follows sees a message that someone was ahead of them, and the available juz' refresh at once." },
    { q: "How many juz' can I take?", a: 'As many as you like. Take one or several, and hand any of them back to the group whenever you want with the "Release" button if you find you cannot manage it.' },
  ],
  relatedH: 'Related tools',
  related: [
    { href: '/en/imsakiyah/', label: 'Ramadan timetable for your city' },
    { href: '/en/fasting/', label: 'White days and fasting days' },
    { href: '/en/dua/', label: 'Supplications and remembrances' },
    { href: '/en/prayer-times/', label: 'Prayer times by city' },
    { href: '/en/', label: "Hijri calendar and today's date" },
  ],
  footerNote: 'A group khatma with no sign-up · names are optional and no personal data is stored',
  privacyLabel: 'Privacy Policy',
  privacyHref: '/en/privacy/',
  newNoteLead: 'Your khatma is ready.',
  newNote: "Copy this page's link and send it to your group; anyone who opens it can take a juz straight away. Keep the link — it is your only way back to this khatma.",
  pageIntro: 'Pick an available juz and it is reserved for you. Read it aloud, then confirm you have finished. Each reader is rewarded for what they read; the counter shows how many of the thirty are done.',
  reminderH: 'A reminder',
  reminder: 'Recitation is with the tongue, not by looking alone. What counts is care and reflection rather than speed, so if your time runs short, hand the juz back with the "Release" button and let someone else read it. This is a plain group reading with no reward dedicated to anyone; whoever wishes to pray for someone who has died should do so themselves.',
  notFoundH: 'We could not find that khatma',
  notFoundBody: 'The link is wrong, or the khatma no longer exists. Check that you copied the whole link, or start a new one.',
  unavailableH: 'The service is unavailable right now',
  unavailableBody: 'We could not reach the khatma data at this moment. Please try again shortly.',
  createNew: 'Start a new khatma',
  navNew: 'New khatma',
  home: 'Home',
  holdText: (h) => (h === 720 ? 'a month' : h === 168 ? 'a week' : h === 24 ? 'one day' : h < 24 ? `${h} hours` : `${h / 24} days`),
  khatmaTitle: (t) => `Khatma "${t}" · take a juz and read it`,
  khatmaDesc: (t, d) => `Join the khatma "${t}": ${d} of 30 juz' completed. Pick an available juz, read it, then confirm.`,
  grid: {
    progressAria: 'Khatma progress',
    countDone: "{done}/{total} juz' completed",
    reading: '{n} being read',
    free: '{n} available',
    completeMsg: "All thirty juz' are complete. May God accept from every reader what they read.",
    completeLink: 'Start a new khatma',
    mineNote: 'You are holding: {list}. Press "I finished reading" when you are done so it counts.',
    statusFree: 'available', statusHeld: 'being read', statusDone: 'completed',
    juzAria: 'Juz {n} — {name} — {status}',
    tagDone: 'Completed',
    tagHeldBy: 'With {name}',
    tagHeld: 'Being read',
    tagMine: 'Yours · {time}',
    tagTake: 'Take this juz',
    actRead: 'Read it', actDone: 'I finished reading', actRelease: 'Release',
    modalTitle: 'Juz {n} — {name}',
    modalRange: '{from} to {to}',
    nameLabel: 'Your name (optional)',
    namePh: 'Shown beside the juz — leave empty to stay "Participant"',
    modalNote: 'Recitation is with the tongue, not by looking alone. You have {hold} to read it; after that it returns to the group automatically so the khatma keeps moving.',
    modalTake: 'Take the juz', modalCancel: 'Cancel',
    sharePrompt: "Share the link so others can take the remaining juz':",
    shareText: 'Join our khatma "{title}" — take a juz and read it:',
    shareWa: 'Share on WhatsApp', shareCopy: 'Copy link', shareCopied: 'Link copied',
    tExpired: 'window expired', tDay: 'about a day', tDays: 'about {n} days',
    tHour: 'about an hour', tHours: 'about {n} hours', tMinutes: '{n} minutes',
    err: {
      taken: 'Someone was ahead of you — pick another juz.',
      cannot_confirm: 'This juz cannot be confirmed — its window may have passed, or it was confirmed already.',
      cannot_release: 'This juz cannot be released.',
      bad_part: 'That juz number is not valid.',
      no_token: 'Reader token missing.',
      bad_action: 'Unknown action.',
      not_found: 'We could not find that khatma.',
      bad_link: 'That khatma link is not valid.',
      unavailable: 'The khatma service is unavailable right now.',
      forbidden: 'Request not allowed.',
      rate: 'You have created a lot of khatmas in the past hour. Try again shortly.',
      empty_title: 'Give the khatma a name.',
      network: 'Could not connect. Check your network and try again.',
      generic: 'The request could not be completed.',
    },
  },
};

// ── اردو ─────────────────────────────────────────────────────────────────────
const UR: KhatmaT = {
  dir: 'rtl',
  tagline: 'اجتماعی ختم',
  base: '/ur/khatma/',
  metaTitle: 'اجتماعی ختمِ قرآن · تیس پارے ایک لنک پر آپس میں بانٹیں',
  metaDesc: 'مفت اور بغیر رجسٹریشن اجتماعی ختمِ قرآن شروع کریں: ایک لنک شیئر کریں، ہر شریک ایک پارہ لے کر پڑھے، اور کاؤنٹر مکمل پاروں کا حساب رکھے۔ جو پارہ نہ پڑھا جائے وہ خود بخود گروپ کو واپس مل جاتا ہے، تاکہ ختم رُکے نہیں۔',
  h1: 'اجتماعی ختمِ قرآن، پارہ بہ پارہ',
  intro: 'تیس پارے اور آپ ایک جماعت: ہر فرد ایک پارہ لے کر پڑھتا ہے، اور تیسوں پارے چند دنوں میں آپس میں مکمل ہو جاتے ہیں۔ یہاں سے ختم بنائیں اور اس کا لنک اپنے گروپ میں بھیجیں — نہ رجسٹریشن، نہ ایپ، نہ صفحے کے اندر اشتہار۔',
  formH: 'ابھی ختم شروع کریں',
  titleLabel: 'ختم کا عنوان',
  titlePh: 'مثلاً: گھر والوں کا ختم · رمضان کا ختم · دوستوں کا ختم',
  holdLabel: 'ایک پارے کے لیے مہلت',
  holdHint: 'اگر پڑھنے والا اس مہلت میں اپنے پارے کی تصدیق نہ کرے تو پارہ خود بخود گروپ کو واپس مل جاتا ہے، تاکہ ایک بھولا ہوا پارہ پورے ختم کو نہ روکے۔ اپنی جماعت کی رفتار کے مطابق چنیں: تیز ختم کے لیے آدھا دن، اور اطمینان سے پڑھنے کے لیے ایک مہینہ۔',
  submit: 'ختم بنائیں',
  submitting: 'بن رہا ہے…',
  stepsH: 'یہ کیسے کام کرتا ہے؟',
  steps: [
    { t: 'ختم بنائیں', d: 'ایسا عنوان لکھیں جو گھر والے یا دوست پہچان لیں — «گھر والوں کا ختم» یا «رمضان کا ختم» — اور بنائیں پر دبائیں۔ نہ اکاؤنٹ، نہ ای میل، نہ فون نمبر۔' },
    { t: 'لنک شیئر کریں', d: 'ختم کا ایک لنک بنتا ہے۔ اسے واٹس ایپ یا ٹیلیگرام گروپ میں بھیجیں؛ جو بھی کھولے گا اسے دستیاب پارے فوراً نظر آئیں گے۔' },
    { t: 'ہر شریک ایک پارہ چنے', d: 'ایک کلک سے پارہ نام کے ساتھ یا بغیر نام کے محفوظ ہو جاتا ہے اور دستیاب فہرست سے ہٹ جاتا ہے — تاکہ ایک پارہ دو بار نہ پڑھا جائے اور کوئی دوسرا بغیر پڑھنے والے کے نہ رہ جائے۔' },
    { t: 'مکمل ہونے کی تصدیق', d: 'پڑھنے کے بعد «پڑھ لیا» دبائیں تو پارہ شمار ہو جاتا ہے۔ اور اگر مصروفیت کی وجہ سے مہلت گزر جائے تو پارہ خود بخود گروپ کو واپس مل جاتا ہے۔' },
  ],
  rulesH: 'وہ حدود جن کا ہم نے خیال رکھا',
  rulesIntro: 'اجتماعی ختم ایک اجتہادی مسئلہ ہے۔ یہ سہولت اُسی صورت پر بنائی گئی ہے جسے اکثر معاصر مفتیانِ کرام جائز کہتے ہیں، اور شدید اختلاف کے مقامات سے گریز کیا گیا ہے:',
  rules: [
    { b: 'مرحومین کے لیے ایصالِ ثواب نہیں۔', t: 'ختم میں کسی متوفی کے نام کا خانہ نہیں، کیونکہ تلاوت کا ثواب میت تک پہنچنے میں مذاہب کے درمیان اختلاف ہے۔ میت کے لیے دعا پر سب متفق ہیں، سو جو چاہے خود دعا کرے۔' },
    { b: 'کاؤنٹر سچ بولتا ہے۔', t: 'وہ کہتا ہے «اتنے پارے مکمل»، کسی سے یہ نہیں کہتا کہ اس نے قرآن ختم کر لیا؛ جس نے ایک پارہ پڑھا اس نے ایک پارہ ہی پڑھا۔' },
    { b: 'کسی وقت یا تعداد کی تخصیص نہیں۔', t: 'ہم ختم کو نہ کسی خاص رات سے جوڑتے ہیں، نہ چالیس دن سے، اور نہ کسی مخصوص تکرار سے جس میں کوئی خاص فضیلت سمجھی جائے۔' },
    { b: 'زبان سے تلاوت۔', t: 'ہر پارہ لیتے وقت اس پر تنبیہ کرتے ہیں: زبان ہلائے بغیر صرف دیکھنا تلاوت نہیں۔' },
    { b: 'نہ پابندی، نہ سزا۔', t: 'جو اپنا پارہ نہ پڑھ سکے وہ ایک بٹن سے واپس کر دے؛ کسی کی تشہیر نہیں ہوتی اور نہ کوئی کوتاہی لکھی جاتی ہے۔' },
    { b: 'نام اختیاری، کوئی مقابلہ نہیں۔', t: 'جو چاہے اپنے نام سے شریک ہو، جو چاہے «شریک» ہی رہے۔ ہم لوگوں کو پاروں کی تعداد پر درجہ بندی نہیں کرتے۔' },
    { b: 'دعائے ختم ہر قاری کی اپنی۔', t: 'ہم گروپ کے لیے مکمل ختم کی دعا نہیں بناتے، کیونکہ ایک پارہ پڑھنے والے نے قرآن ختم نہیں کیا۔' },
  ],
  rulesMoreA: 'مزید مطالعہ: ',
  rulesMoreB: 'دار الافتاء المصریہ کا فتویٰ: اجتماعی ختمِ قرآن',
  rulesMoreC: 'اسلام ویب کا فتویٰ: ختم کے لیے منظم گروپ (دونوں عربی میں)۔ مسئلہ اجتہادی ہے، اور بہتر یہ ہے کہ اپنے ملک کے دار الافتاء سے پوچھ لیں۔',
  faqH: 'عام سوالات',
  faq: [
    { q: 'کیا پارے تقسیم کر کے اجتماعی ختم جائز ہے؟', a: 'تلاوت کی فضیلت میں کوئی اختلاف نہیں، اور ہر قاری کو اپنے پڑھے ہوئے کا اجر ملتا ہے۔ رہا گروپ کو منظم کرنا اور پارے بانٹنا، تو دار الافتاء المصریہ نے اجتماعی ختمِ قرآن کو جائز قرار دیا اور اسے نیکی پر تعاون شمار کیا، نہ کہ کوئی ایجاد کردہ عبادت۔ دوسری طرف بعض اہلِ علم — جیسے اسلام ویب کا مرکزِ فتویٰ — اسے مستقل عادت بنانے پر تحفظ رکھتے ہیں اور یاد دلاتے ہیں کہ جس نے ایک پارہ پڑھا اس نے حقیقتاً قرآن ختم نہیں کیا۔ اسی لیے یہاں کاؤنٹر «مکمل پارے» دکھاتا ہے، یہ نہیں کہتا کہ کسی نے قرآن ختم کیا۔ مسئلہ اجتہادی ہے؛ اپنے ملک کے دار الافتاء سے رجوع کریں۔' },
    { q: 'کیا سائٹ پر مرحوم کے لیے ختم ہے؟', a: 'نہیں۔ یہ صرف ایک عام اجتماعی تلاوت ہے۔ اس میں کسی متوفی کے نام کا خانہ ہے نہ ایصالِ ثواب، کیونکہ تلاوت کا ثواب میت تک پہنچنے میں مذاہب کا اختلاف ہے۔ جو کسی مرحوم کے لیے دعا کرنا چاہے وہ خود دعا کرے، کیونکہ دعا کے پہنچنے پر سب متفق ہیں۔' },
    { q: 'کیا مجھے اکاؤنٹ یا لاگ اِن کی ضرورت ہے؟', a: 'نہیں۔ لنک ہی دعوت ہے، اور نام مکمل طور پر اختیاری ہے؛ جو خالی چھوڑ دے وہ «شریک» کے نام سے ظاہر ہوتا ہے۔ ہم نہ ای میل مانگتے ہیں نہ فون نمبر، اور آپ کے بارے میں اُس نام کے سوا کچھ محفوظ نہیں کرتے جو آپ خود لکھیں۔' },
    { q: 'اگر کوئی پارہ لے کر پڑھے ہی نہ تو؟', a: 'ہر پارے کی ایک مہلت ہوتی ہے جو ختم بنانے والا طے کرتا ہے، بارہ گھنٹے سے لے کر پورے ایک مہینے تک، اور پہلے سے دو دن مقرر ہیں۔ مہلت تصدیق کے بغیر گزر جائے تو پارہ دوبارہ دستیاب ہو جاتا ہے تاکہ کوئی اور لے لے۔ عملی طور پر یہی سب سے اہم بات ہے: اس کے بغیر ایک بھولا ہوا پارہ پورے ختم کو ہمیشہ کے لیے روک دیتا ہے۔' },
    { q: 'کیا دو افراد ایک ہی پارہ لے سکتے ہیں؟', a: 'نہیں۔ پارہ اُسی کو ملتا ہے جو پہلے دبائے؛ بعد والے کو پیغام ملتا ہے کہ کوئی اس سے پہلے لے چکا، اور دستیاب پارے فوراً تازہ ہو جاتے ہیں۔' },
    { q: 'میں کتنے پارے لے سکتا ہوں؟', a: 'جتنے چاہیں۔ ایک پارہ لیں یا کئی، اور جب چاہیں «واپس» کے بٹن سے کوئی بھی پارہ گروپ کو لوٹا دیں اگر محسوس ہو کہ آپ اسے نہیں پڑھ سکیں گے۔' },
  ],
  relatedH: 'متعلقہ سہولیات',
  related: [
    { href: '/ur/imsakiyah/', label: 'آپ کے شہر کا رمضان نقشہ' },
    { href: '/ur/fasting/', label: 'ایامِ بیض اور روزوں کے دن' },
    { href: '/ur/dua/', label: 'دعائیں اور اذکار' },
    { href: '/ur/prayer-times/', label: 'شہر کے اعتبار سے مواقیتِ نماز' },
    { href: '/ur/', label: 'ہجری تقویم اور آج کی تاریخ' },
  ],
  footerNote: 'اجتماعی ختم بغیر رجسٹریشن · نام اختیاری ہے اور کوئی ذاتی معلومات محفوظ نہیں کی جاتیں',
  privacyLabel: 'رازداری پالیسی',
  privacyHref: '/ur/privacy/',
  newNoteLead: 'ختم بن گیا۔',
  newNote: 'اس صفحے کا لنک کاپی کر کے اپنے گروپ کو بھیجیں؛ جو بھی کھولے گا فوراً پارہ لے سکتا ہے۔ لنک اپنے پاس محفوظ رکھیں، یہی اس ختم تک واپسی کا واحد راستہ ہے۔',
  pageIntro: 'کوئی دستیاب پارہ چنیں تو وہ آپ کے نام محفوظ ہو جائے گا، پھر اسے زبان سے پڑھیں اور تصدیق کر دیں۔ ہر قاری کو اپنے پڑھے کا اجر ہے، اور کاؤنٹر دکھاتا ہے کہ تیس میں سے کتنے پارے مکمل ہوئے۔',
  reminderH: 'یاد دہانی',
  reminder: 'تلاوت زبان سے ہوتی ہے، صرف دیکھنے سے نہیں۔ اصل بات جلد ختم کرنا نہیں بلکہ درستی اور تدبر ہے؛ اگر وقت تنگ ہو تو «واپس» کے بٹن سے پارہ لوٹا دیں تاکہ کوئی اور پڑھ لے۔ یہ ایک عام اجتماعی تلاوت ہے جس میں کسی کے لیے ایصالِ ثواب نہیں؛ جو کسی مرحوم کے لیے دعا کرنا چاہے وہ خود کرے۔',
  notFoundH: 'یہ ختم نہیں مل سکا',
  notFoundBody: 'لنک درست نہیں، یا ختم اب موجود نہیں۔ دیکھ لیں کہ پورا لنک کاپی ہوا ہے، یا نیا ختم شروع کریں۔',
  unavailableH: 'سہولت اس وقت دستیاب نہیں',
  unavailableBody: 'اس لمحے ختم کے ڈیٹا تک رسائی نہ ہو سکی۔ تھوڑی دیر بعد دوبارہ کوشش کریں۔',
  createNew: 'نیا ختم شروع کریں',
  navNew: 'نیا ختم',
  home: 'ہوم',
  holdText: (h) => (h === 720 ? 'ایک مہینہ' : h === 168 ? 'ایک ہفتہ' : h === 24 ? 'ایک دن' : h < 24 ? `${h} گھنٹے` : `${h / 24} دن`),
  khatmaTitle: (t) => `ختم «${t}» · ایک پارہ لیں اور پڑھیں`,
  khatmaDesc: (t, d) => `ختم «${t}» میں شریک ہوں: ۳۰ میں سے ${d} پارے مکمل۔ کوئی دستیاب پارہ چنیں، پڑھیں، پھر تصدیق کریں۔`,
  grid: {
    progressAria: 'ختم کی پیش رفت',
    countDone: '{done}/{total} پارے مکمل',
    reading: '{n} زیرِ تلاوت',
    free: '{n} دستیاب',
    completeMsg: 'تیسوں پارے مکمل ہو گئے۔ اللہ ہر قاری سے اس کا پڑھا ہوا قبول فرمائے۔',
    completeLink: 'نیا ختم شروع کریں',
    mineNote: 'آپ کے پاس یہ پارے ہیں: {list}۔ مکمل ہونے پر «پڑھ لیا» دبائیں تاکہ شمار ہو جائے۔',
    statusFree: 'دستیاب', statusHeld: 'زیرِ تلاوت', statusDone: 'مکمل',
    juzAria: 'پارہ {n} — {name} — {status}',
    tagDone: 'مکمل',
    tagHeldBy: '{name} کے پاس',
    tagHeld: 'زیرِ تلاوت',
    tagMine: 'آپ کا · {time}',
    tagTake: 'یہ پارہ لیں',
    actRead: 'پارہ پڑھیں', actDone: 'پڑھ لیا', actRelease: 'واپس',
    modalTitle: 'پارہ {n} — {name}',
    modalRange: '{from} سے {to} تک',
    nameLabel: 'آپ کا نام (اختیاری)',
    namePh: 'پارے کے ساتھ دکھایا جائے گا — خالی چھوڑیں تو «شریک» رہیں گے',
    modalNote: 'تلاوت زبان سے ہوتی ہے، صرف دیکھنے سے نہیں۔ اسے پڑھنے کے لیے آپ کے پاس {hold} ہے، اس کے بعد پارہ خود بخود گروپ کو واپس مل جائے گا تاکہ ختم رُکے نہیں۔',
    modalTake: 'پارہ لیں', modalCancel: 'منسوخ',
    sharePrompt: 'لنک شیئر کریں تاکہ باقی پارے دوسرے لے لیں:',
    shareText: 'ہمارے ختم «{title}» میں شریک ہوں — ایک پارہ لیں اور پڑھیں:',
    shareWa: 'واٹس ایپ پر شیئر کریں', shareCopy: 'لنک کاپی کریں', shareCopied: 'لنک کاپی ہو گیا',
    tExpired: 'مہلت ختم', tDay: 'تقریباً ایک دن', tDays: 'تقریباً {n} دن',
    tHour: 'تقریباً ایک گھنٹہ', tHours: 'تقریباً {n} گھنٹے', tMinutes: '{n} منٹ',
    err: {
      taken: 'آپ سے پہلے کوئی لے چکا — دوسرا پارہ چنیں۔',
      cannot_confirm: 'اس پارے کی تصدیق ممکن نہیں — شاید مہلت گزر چکی یا پہلے تصدیق ہو چکی ہے۔',
      cannot_release: 'اس پارے کو واپس نہیں کیا جا سکتا۔',
      bad_part: 'پارے کا نمبر درست نہیں۔',
      no_token: 'قاری کا کوڈ موجود نہیں۔',
      bad_action: 'نامعلوم عمل۔',
      not_found: 'یہ ختم نہیں مل سکا۔',
      bad_link: 'ختم کا لنک درست نہیں۔',
      unavailable: 'ختم کی سہولت اس وقت دستیاب نہیں۔',
      forbidden: 'یہ درخواست اجازت یافتہ نہیں۔',
      rate: 'آپ نے ایک گھنٹے میں بہت سے ختم بنائے ہیں۔ تھوڑی دیر بعد کوشش کریں۔',
      empty_title: 'ختم کا عنوان لکھیں۔',
      network: 'رابطہ نہ ہو سکا۔ اپنا نیٹ ورک دیکھ کر دوبارہ کوشش کریں۔',
      generic: 'درخواست مکمل نہ ہو سکی۔',
    },
  },
};

const TABLE: Record<Lang, KhatmaT> = { ar: AR, en: EN, ur: UR };

/** نصوص الميزة باللغة المطلوبة. */
export const khatmaT = (lang: Lang): KhatmaT => TABLE[lang];

/** استبدال {المفاتيح} في نصوص الجزيرة. */
export function fill(tpl: string, vars: Record<string, string | number>): string {
  return tpl.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
}
