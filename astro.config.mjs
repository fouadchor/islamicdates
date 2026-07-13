import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  // Static by default (every existing page stays prerendered exactly as before);
  // individual pages opt into request-time SSR with `export const prerender = false`.
  output: 'hybrid',
  adapter: cloudflare(),
  integrations: [react()],
  site: 'https://islamicdates.org',
});
