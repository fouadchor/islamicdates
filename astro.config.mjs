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
      // The homepages and on-this-day index are request-time SSR (prerender=false),
      // so they aren't emitted as static files and won't be auto-discovered.
      customPages: [
        'https://islamicdates.org/',
        'https://islamicdates.org/en/',
        'https://islamicdates.org/ur/',
        'https://islamicdates.org/on-this-day/',
        'https://islamicdates.org/en/on-this-day/',
        'https://islamicdates.org/ur/on-this-day/',
      ],
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  site: 'https://islamicdates.org',
});
