// ─────────────────────────────────────────────────────────────────────────────
// Link-preview cards for «ادعوا لـ…» pages: public/og/pray-for/{lang}-{kind}.jpg
//
// A prayer-page link travels mostly through WhatsApp, so the preview is what the
// family's group actually sees. The person's name rides in og:title beside the
// image, so the card itself says only what kind of prayer it is — one per
// language and kind, plus one for each landing page («living», the page for the
// living; the deceased landing uses the deceased card): 3 × 7 = 21 small JPEGs,
// rendered once. Same visual identity as the khatma cards
// (scripts/gen-khatma-og.mjs). The living share the gold accent; the deceased
// keep the plain white heart.
//
// Rendered with Chromium so Arabic and Urdu are shaped correctly.
//
// Regenerate (only needed if the design or wording changes):
//
//   npm i --no-save @fontsource/ibm-plex-sans-arabic @fontsource/noto-naskh-arabic \
//                   @fontsource/plus-jakarta-sans playwright
//   node scripts/gen-pray-for-og.mjs [--fonts <dir containing @fontsource>]
//
// Where Playwright cannot download its browser, point it at any Chromium with
// CHROMIUM_PATH=/path/to/chromium.
// ─────────────────────────────────────────────────────────────────────────────
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import { mkdirSync, readFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const require = createRequire(import.meta.url);
function load(mod) {
  try { return require(mod); } catch {}
  const g = execSync('npm root -g').toString().trim();
  return require(join(g, mod));
}
const { chromium } = load('playwright');

const argFonts = process.argv.indexOf('--fonts');
const FONT_ROOT = resolve(argFonts > -1 ? process.argv[argFonts + 1] : 'node_modules');
const font = (pkg, file) => {
  const p = join(FONT_ROOT, '@fontsource', pkg, 'files', file);
  if (!existsSync(p)) throw new Error(`missing font ${p} — see the header of this script`);
  return `data:font/woff2;base64,${readFileSync(p).toString('base64')}`;
};
const FACES = `
@font-face{font-family:Plex;font-weight:600;src:url(${font('ibm-plex-sans-arabic', 'ibm-plex-sans-arabic-arabic-600-normal.woff2')})}
@font-face{font-family:Plex;font-weight:700;src:url(${font('ibm-plex-sans-arabic', 'ibm-plex-sans-arabic-arabic-700-normal.woff2')})}
@font-face{font-family:Naskh;font-weight:600;src:url(${font('noto-naskh-arabic', 'noto-naskh-arabic-arabic-600-normal.woff2')})}
@font-face{font-family:Naskh;font-weight:700;src:url(${font('noto-naskh-arabic', 'noto-naskh-arabic-arabic-700-normal.woff2')})}
@font-face{font-family:Jakarta;font-weight:700;src:url(${font('plus-jakarta-sans', 'plus-jakarta-sans-latin-700-normal.woff2')})}
@font-face{font-family:Jakarta;font-weight:800;src:url(${font('plus-jakarta-sans', 'plus-jakarta-sans-latin-800-normal.woff2')})}`;

// Wording matches src/lib/pray-for-i18n.ts. Gender-neutral on purpose: one card
// serves «له» and «لها».
const COPY = {
  ar: {
    dir: 'rtl', font: 'Plex', brand: 'التقويم الهجري', word: 'دعاء',
    living: { head: 'ادعوا لمن تحبّون', sub: 'رابط واحد يجمع الدعاء له من الأهل والأصحاب' },
    deceased: { head: 'ادعوا بالرحمة والمغفرة', sub: 'صفحة دعاء لمن رحل من أهلنا وأحبّتنا' },
    sick: { head: 'ادعوا بالشفاء والعافية', sub: 'صفحة دعاء لمريض من أهلنا وأحبّتنا' },
    ease: { head: 'ادعوا بالتيسير والتوفيق', sub: 'صفحة دعاء لامتحان أو أمرٍ صعب' },
    travel: { head: 'ادعوا بالحفظ في السفر', sub: 'صفحة دعاء لمسافر من أهلنا وأحبّتنا' },
    distress: { head: 'ادعوا بتفريج الكرب', sub: 'صفحة دعاء لمن يمرّ بضيق' },
    need: { head: 'ادعوا له بالخير', sub: 'في نفسه حاجة يعلمها الله' },
    cta: 'افتح الصفحة وادعُ',
  },
  en: {
    dir: 'ltr', font: 'Jakarta', brand: 'Hijri Calendar', word: 'Dua',
    living: { head: 'Pray for someone you love', sub: 'One link gathers prayers from family and friends' },
    deceased: { head: 'Pray for mercy and forgiveness', sub: 'A prayer page for someone who has passed away' },
    sick: { head: 'Pray for healing and well-being', sub: 'A prayer page for someone who is unwell' },
    ease: { head: 'Pray for ease and success', sub: 'A prayer page for an exam or a hard day' },
    travel: { head: 'Pray for a safe journey', sub: 'A prayer page for someone who is travelling' },
    distress: { head: 'Pray for relief', sub: 'A prayer page for someone going through hardship' },
    need: { head: 'Pray for good for them', sub: 'They have a need that Allah knows' },
    cta: 'Open the page and pray',
  },
  ur: {
    dir: 'rtl', font: 'Naskh', brand: 'ہجری کیلنڈر', word: 'دعا',
    living: { head: 'اپنے پیاروں کے لیے دعا', sub: 'ایک لنک پر گھر والوں اور دوستوں کی دعائیں' },
    deceased: { head: 'مغفرت اور رحمت کی دعا', sub: 'مرحوم کے لیے دعا کا صفحہ' },
    sick: { head: 'شفا اور عافیت کی دعا', sub: 'بیمار کے لیے دعا کا صفحہ' },
    ease: { head: 'آسانی اور کامیابی کی دعا', sub: 'امتحان یا مشکل کام کے لیے دعا کا صفحہ' },
    travel: { head: 'سفر میں حفاظت کی دعا', sub: 'مسافر کے لیے دعا کا صفحہ' },
    distress: { head: 'مشکل آسان ہونے کی دعا', sub: 'پریشانی میں گھرے عزیز کے لیے دعا کا صفحہ' },
    need: { head: 'بھلائی کی دعا', sub: 'ان کی ایک حاجت ہے جسے اللہ جانتا ہے' },
    cta: 'صفحہ کھولیں اور دعا کریں',
  },
};

const CARDS = ['living', 'deceased', 'sick', 'ease', 'travel', 'distress', 'need'];

const HEART = 'M12 21s-7.5-4.6-9.4-9.3C1.2 8.2 3.4 4.5 7 4.5c2 0 3.4 1.1 5 3 1.6-1.9 3-3 5-3 3.6 0 5.8 3.7 4.4 7.2C19.5 16.4 12 21 12 21Z';

function html(lang, kind) {
  const c = COPY[lang];
  const k = c[kind];
  const accent = kind === 'deceased' ? '#ffffff' : '#f2c14e';
  return `<!doctype html><html lang="${lang}" dir="${c.dir}"><head><meta charset="utf-8"><style>
${FACES}
*{margin:0;box-sizing:border-box}
html,body{width:1200px;height:630px}
body{font-family:${c.font},Plex,Jakarta,sans-serif;color:#fff;
  background:linear-gradient(135deg,#16958a 0%,#0e8076 55%,#0a6f65 100%);display:grid;place-items:center}
.panel{width:1080px;height:510px;border-radius:36px;background:rgba(255,255,255,.075);
  display:flex;align-items:center;gap:56px;padding:0 64px}
.text{flex:1;min-width:0}
.brand{display:flex;align-items:center;gap:14px;font-size:30px;font-weight:600;opacity:.9}
.moon{width:34px;height:34px;border-radius:50%;background:#fff;position:relative;overflow:hidden;flex:none}
.moon:after{content:"";position:absolute;width:28px;height:28px;border-radius:50%;background:#0e8076;top:-3px;
  ${c.dir === 'rtl' ? 'left:-8px' : 'right:-8px'}}
h1{font-size:${lang === 'en' ? 62 : 72}px;font-weight:${lang === 'en' ? 800 : 700};line-height:1.25;margin:26px 0 16px}
.sub{font-size:${lang === 'en' ? 33 : 37}px;font-weight:600;opacity:.92;line-height:1.5}
.cta{display:inline-block;margin-top:34px;background:#fff;color:#0b7a70;font-size:${lang === 'en' ? 30 : 32}px;
  font-weight:700;padding:14px 30px;border-radius:999px}
.emblem{width:340px;height:340px;flex:none;border-radius:50%;border:14px solid rgba(255,255,255,.2);
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px}
.emblem svg{width:150px;height:150px}
.word{font-size:${lang === 'en' ? 40 : 48}px;font-weight:700;opacity:.9}
</style></head><body><div class="panel">
  <div class="text">
    <div class="brand"><span class="moon"></span>${c.brand}</div>
    <h1>${k.head}</h1>
    <div class="sub">${k.sub}</div>
    <div class="cta">${c.cta}</div>
  </div>
  <div class="emblem">
    <svg viewBox="0 0 24 24" fill="none" stroke="${accent}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="${HEART}"/></svg>
    <div class="word">${c.word}</div>
  </div>
</div></body></html>`;
}

const out = resolve('public/og/pray-for');
mkdirSync(out, { recursive: true });
const browser = await chromium.launch(process.env.CHROMIUM_PATH
  ? { executablePath: process.env.CHROMIUM_PATH, args: ['--no-sandbox', '--font-render-hinting=none'] }
  : {});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
let n = 0;
for (const lang of ['ar', 'en', 'ur']) {
  for (const kind of CARDS) {
    await page.setContent(html(lang, kind), { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: join(out, `${lang}-${kind}.jpg`), type: 'jpeg', quality: 84 });
    n++;
  }
}
await browser.close();
console.log(`wrote ${n} cards to ${out}`);
