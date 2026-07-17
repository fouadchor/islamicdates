import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Static by default (every existing page stays prerendered exactly as before);
  // individual pages opt into request-time SSR with `export const prerender = false`.
  output: 'hybrid',
  adapter: cloudflare(),
  integrations: [
    react(),
    sitemap({
      // Utility/no-index routes to keep out of the sitemap.
      filter: (page) => !page.includes('/embed') && !page.includes('/404'),
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
