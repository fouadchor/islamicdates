import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import { convIsIndexable, parseSlug } from './src/lib/convert.ts';

// Converter pages outside the indexable window ship with <meta robots="noindex">.
// Listing them in the sitemap too would trip "Submitted URL marked noindex" in
// Search Console, so they are filtered out here as well.
const CONV_RE = /\/convert\/([0-9]+-[0-9]+-[0-9]+)\/?$/;
function convertPageIsIndexable(url) {
  const m = url.match(CONV_RE);
  if (!m) return true;
  const p = parseSlug(m[1]);
  return p ? convIsIndexable(p.hy, p.hm, p.hd) : true;
}

export default defineConfig({
  // Static by default (every existing page stays prerendered exactly as before);
  // individual pages opt into request-time SSR with `export const prerender = false`.
  output: 'hybrid',
  adapter: cloudflare(),
  integrations: [
    react(),
    sitemap({
      // Utility/no-index routes to keep out of the sitemap.
      filter: (page) =>
        !page.includes('/embed') &&
        !page.includes('/404') &&
        convertPageIsIndexable(page),
      // Pages the crawler cannot discover on its own:
      //   • the homepages and on-this-day index are request-time SSR
      //     (prerender=false), so no static file is emitted for them;
      //   • the Kids pages are hand-authored HTML in public/, which the
      //     integration never scans — they are indexable, self-canonical and
      //     carry hreflang, so leaving them out was simply a gap.
      customPages: [
        'https://islamicdates.org/',
        'https://islamicdates.org/en/',
        'https://islamicdates.org/ur/',
        'https://islamicdates.org/on-this-day/',
        'https://islamicdates.org/en/on-this-day/',
        'https://islamicdates.org/ur/on-this-day/',
        'https://islamicdates.org/kids/',
        'https://islamicdates.org/en/kids/',
        'https://islamicdates.org/ur/kids/',
      ],
      // No lastmod, changefreq or priority.
      //
      // These were previously emitted as `new Date()` / 'weekly' / 0.7 — the same
      // three values on all ~6,800 URLs, with lastmod jumping to the current time
      // on every deploy. A lastmod that says "everything changed just now" whenever
      // anything is rebuilt is worse than none: Google treats an unreliable lastmod
      // as a reason to disregard the signal for the whole file. There is no honest
      // per-page date to put here either, since these pages are generated from
      // shared data and templates rather than edited individually, so the field is
      // omitted rather than faked. changefreq and priority are ignored by Google
      // outright, and carried no information at a single uniform value.
    }),
  ],
  site: 'https://islamicdates.org',
});
