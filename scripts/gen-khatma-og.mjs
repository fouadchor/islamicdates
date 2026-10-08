// ─────────────────────────────────────────────────────────────────────────────
// Link-preview cards for the khatma pages: public/og/khatma/{lang}-{done}.jpg
//
// When a khatma link is pasted into WhatsApp or Instagram, the preview used to be
// the generic site card. These show what the group actually needs to know — how
// many of the thirty juz' are done — in the site's own visual identity (the teal
// card and white crescent of public/og-image.png). The khatma's name travels in
// og:title beside the image, so one card per language and count covers every
// khatma: 3 languages × 31 counts (0–30) = 93 small JPEGs, rendered once.
//
// Rendered with Chromium so Arabic and Urdu are shaped correctly — image
// libraries that draw text themselves get joining and bidi wrong.
//
// Regenerate (only needed if the design or wording changes):
//
//   npm i --no-save @fontsource/ibm-plex-sans-arabic @fontsource/noto-naskh-arabic \
//                   @fontsource/plus-jakarta-sans playwright
//   node scripts/gen-khatma-og.mjs [--fonts <dir containing @fontsource>]
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

const AR_DIGITS = '٠١٢٣٤٥٦٧٨٩';
const UR_DIGITS = '۰۱۲۳۴۵۶۷۸۹';
const num = (n, lang) =>
  lang === 'en' ? String(n) : String(n).replace(/[0-9]/g, (c) => (lang === 'ur' ? UR_DIGITS : AR_DIGITS)[+c]);

// Wording matches src/lib/khatma-i18n.ts.
const COPY = {
  ar: {
    dir: 'rtl', font: 'Plex', brand: 'التقويم الهجري',
    head: (d) => (d >= 30 ? 'اكتملت الختمة' : d === 0 ? 'ختمة جديدة' : 'ختمة جماعية'),
    sub: (d) => (d >= 30 ? 'قُرئت الأجزاء الثلاثون — تقبّل الله من كل قارئ' : d === 0 ? 'ثلاثون جزءاً بانتظار القرّاء' : `الأجزاء المتبقية: ${num(30 - d, 'ar')} من ${num(30, 'ar')}`),
    cta: (d) => (d >= 30 ? 'ابدأ ختمة جديدة' : 'اختر جزءاً واقرأه'),
    of: `من ${num(30, 'ar')}`,
    open: 'جزءاً متاحاً',
  },
  en: {
    dir: 'ltr', font: 'Jakarta', brand: 'Hijri Calendar',
    head: (d) => (d >= 30 ? 'Khatma complete' : d === 0 ? 'A new group khatma' : 'Group khatma'),
    sub: (d) => (d >= 30 ? 'All thirty juz’ read — may Allah accept it' : d === 0 ? 'Thirty juz’, waiting for readers' : `${30 - d} of 30 juz’ still to read`),
    cta: (d) => (d >= 30 ? 'Start a new khatma' : 'Take a juz and read it'),
    of: 'of 30',
    open: 'juz’ open',
  },
  ur: {
    dir: 'rtl', font: 'Naskh', brand: 'ہجری کیلنڈر',
    head: (d) => (d >= 30 ? 'ختم مکمل ہو گیا' : d === 0 ? 'نیا اجتماعی ختم' : 'اجتماعی ختم'),
    sub: (d) => (d >= 30 ? 'تیسوں پارے پڑھے جا چکے — اللہ قبول فرمائے' : d === 0 ? 'تیس پارے قاریوں کے منتظر' : `${num(30, 'ur')} میں سے ${num(30 - d, 'ur')} پارے باقی`),
    cta: (d) => (d >= 30 ? 'نیا ختم شروع کریں' : 'ایک پارہ لیں اور پڑھیں'),
    of: `${num(30, 'ur')} میں سے`,
    open: 'پارے دستیاب',
  },
};

/** Thirty arcs, one per juz — a done juz is gold, the rest are faint. */
function ring(done) {
  const cx = 190, cy = 190, r = 158, segs = 30, gap = 2.6;
  const pt = (a) => {
    const rad = ((a - 90) * Math.PI) / 180;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
  };
  let out = '';
  for (let i = 0; i < segs; i++) {
    const a0 = (i * 360) / segs + gap / 2, a1 = ((i + 1) * 360) / segs - gap / 2;
    const [x0, y0] = pt(a0), [x1, y1] = pt(a1);
    const on = i < done;
    out += `<path d="M${x0.toFixed(2)} ${y0.toFixed(2)} A${r} ${r} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)}"
      stroke="${on ? '#f2c14e' : 'rgba(255,255,255,.2)'}" stroke-width="26" fill="none" stroke-linecap="butt"/>`;
  }
  return `<svg width="380" height="380" viewBox="0 0 380 380">${out}</svg>`;
}

function html(lang, done) {
  const c = COPY[lang];
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
h1{font-size:${lang === 'en' ? 66 : 74}px;font-weight:${lang === 'en' ? 800 : 700};line-height:1.25;margin:26px 0 14px}
.sub{font-size:${lang === 'en' ? 34 : 38}px;font-weight:600;opacity:.92;line-height:1.5}
.cta{display:inline-block;margin-top:34px;background:#fff;color:#0b7a70;font-size:${lang === 'en' ? 30 : 32}px;
  font-weight:700;padding:14px 30px;border-radius:999px}
.ringwrap{position:relative;width:380px;height:380px;flex:none}
.center{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
.big{font-family:${lang === 'en' ? 'Jakarta' : 'Plex'};font-size:${done >= 10 || done === 0 ? 128 : 140}px;font-weight:${lang === 'en' ? 800 : 700};line-height:1}
.of{font-size:32px;font-weight:600;opacity:.85;margin-top:${lang === 'en' ? 6 : 14}px}
</style></head><body><div class="panel">
  <div class="text">
    <div class="brand"><span class="moon"></span>${c.brand}</div>
    <h1>${c.head(done)}</h1>
    <div class="sub">${c.sub(done)}</div>
    <div class="cta">${c.cta(done)}</div>
  </div>
  <div class="ringwrap">${ring(done)}
    <div class="center">${
      // The Arabic-script zero is a dot; a new khatma reads better as "30 open".
      done === 0
        ? `<div class="big">${num(30, lang)}</div><div class="of">${c.open}</div>`
        : `<div class="big">${num(done, lang)}</div><div class="of">${c.of}</div>`
    }</div>
  </div>
</div></body></html>`;
}

const out = resolve('public/og/khatma');
mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
let n = 0;
for (const lang of ['ar', 'en', 'ur']) {
  for (let done = 0; done <= 30; done++) {
    await page.setContent(html(lang, done), { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: join(out, `${lang}-${done}.jpg`), type: 'jpeg', quality: 84 });
    n++;
  }
}
await browser.close();
console.log(`wrote ${n} cards to ${out}`);
