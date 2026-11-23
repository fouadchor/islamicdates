// Tells Bing (and the other IndexNow engines: Yandex, Seznam, Naver, Yep…)
// which pages changed after a rebuild, so they recrawl them within hours
// instead of whenever they next come round.
//
// Why this exists: Bing, with DuckDuckGo, Yahoo and Ecosia on its index, is
// where the site's search traffic actually comes from. Cloudflare's Crawler
// Hints does ping IndexNow, but in Bing Webmaster Tools its submissions in
// Nov 2026 were almost all fonts, SVGs and robots.txt — not the pages whose
// prayer tables, noindex windows and dates the scheduled rebuild changes.
//
// Runs in .github/workflows/indexnow.yml against the LIVE site, after the
// deploy has gone out. Node 20+, no dependencies.
//
//   node scripts/indexnow-submit.mjs --changed
//       URLs that entered the sitemap since the last run, the homepages, and
//       on the first run of a new month every prayer-times page (their monthly
//       table changes). State lives in .indexnow/state.json, which the
//       workflow carries between runs with actions/cache.
//
//   node scripts/indexnow-submit.mjs --match '<regex>'
//       Every sitemap URL matching the regex — for after a merged PR, e.g.
//       --match '/en/[a-z-]+-20(26|27|28)/$' after an English title change.
//
//   node scripts/indexnow-submit.mjs --dry-run …
//       Print what would be sent; send nothing.
//
// IndexNow is for changed pages only. Submitting unchanged URLs over and over
// teaches Bing to ignore the pings, which is why nothing here sends the whole
// sitemap.

import { mkdir, readFile, writeFile } from 'node:fs/promises';

const HOST = 'islamicdates.org';
const ORIGIN = `https://${HOST}`;
// Public by design: IndexNow verifies ownership by fetching this file from the
// site root (public/<key>.txt). Same key as the OpenSEO project.
const KEY = '7a70b0f5ac9c4c47b6e3d424ddf110de';
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const BATCH = 10000; // protocol maximum per request
const STATE_FILE = '.indexnow/state.json';

const ALWAYS = [`${ORIGIN}/`, `${ORIGIN}/en/`, `${ORIGIN}/ur/`];
const PRAYER_RE = /^https:\/\/islamicdates\.org\/(?:(?:en|ur)\/)?prayer-times\//;

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const changed = args.includes('--changed');
const matchIdx = args.indexOf('--match');
const match = matchIdx >= 0 ? args[matchIdx + 1] : null;

if (!changed && !match) {
  console.error('Usage: indexnow-submit.mjs (--changed | --match <regex>) [--dry-run]');
  process.exit(2);
}

async function get(url) {
  for (let attempt = 1; ; attempt++) {
    try {
      const r = await fetch(url, { headers: { 'user-agent': 'islamicdates-indexnow/1.0' } });
      if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
      return await r.text();
    } catch (e) {
      if (attempt >= 3) throw new Error(`GET ${url}: ${e.message}`);
      await new Promise(res => setTimeout(res, 5000 * attempt));
    }
  }
}

const locs = xml => [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map(m => m[1]);

async function sitemapUrls() {
  const index = await get(`${ORIGIN}/sitemap-index.xml`);
  const children = locs(index);
  const urls = new Set();
  for (const child of children) for (const u of locs(await get(child))) urls.add(u);
  return urls;
}

async function readState() {
  try { return JSON.parse(await readFile(STATE_FILE, 'utf8')); } catch { return null; }
}

async function submit(urls) {
  const list = [...new Set(urls)].filter(u => u.startsWith(`${ORIGIN}/`));
  if (!list.length) { console.log('Nothing to submit.'); return; }
  console.log(`${dryRun ? 'Would submit' : 'Submitting'} ${list.length} URL(s):`);
  for (const u of list.slice(0, 40)) console.log('  ' + u);
  if (list.length > 40) console.log(`  … and ${list.length - 40} more`);
  if (dryRun) return;
  for (let i = 0; i < list.length; i += BATCH) {
    const urlList = list.slice(i, i + BATCH);
    const r = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${ORIGIN}/${KEY}.txt`, urlList }),
    });
    // 200 = received, 202 = received and the key check is still pending.
    if (r.status !== 200 && r.status !== 202) {
      throw new Error(`IndexNow answered ${r.status}: ${(await r.text()).slice(0, 300)}`);
    }
    console.log(`IndexNow: ${r.status} for ${urlList.length} URL(s).`);
  }
}

const current = await sitemapUrls();
console.log(`Live sitemap: ${current.size} URLs.`);

if (match) {
  const re = new RegExp(match);
  await submit([...current].filter(u => re.test(u)));
} else {
  const state = await readState();
  const month = new Date().toISOString().slice(0, 7); // YYYY-MM, UTC
  const picks = [...ALWAYS];

  if (state?.urls) {
    const before = new Set(state.urls);
    const added = [...current].filter(u => !before.has(u));
    console.log(`New in the sitemap since the last run: ${added.length}.`);
    picks.push(...added);
  } else {
    console.log('No previous run on record: recording the sitemap for next time.');
  }

  // The 1st-of-month rebuild puts a new month's table on every prayer-times
  // page. The Sunday cron can also land on the 1st, so send them once a month.
  // A first run (no state) only records: those tables did not just change.
  const monthly = Boolean(state) && state.monthly !== month;
  if (monthly) {
    const prayer = [...current].filter(u => PRAYER_RE.test(u));
    console.log(`First run of ${month}: adding ${prayer.length} prayer-times URLs.`);
    picks.push(...prayer);
  }

  await submit(picks);

  if (!dryRun) {
    await mkdir('.indexnow', { recursive: true });
    await writeFile(STATE_FILE, JSON.stringify({ at: new Date().toISOString(), monthly: month, urls: [...current] }));
  }
}
