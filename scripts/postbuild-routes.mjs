// Post-build: overwrite the adapter's auto-generated _routes.json with a minimal,
// future-proof version. Only the three request-time homepages ( / , /en/ , /ur/ )
// invoke the SSR Worker; every other (prerendered) page is served as a static asset.
// This keeps us far below Cloudflare's 100-rule limit and avoids invoking the
// Worker for the thousands of static pages. Both slash and non-slash forms of the
// localized homepages are included so neither 404s.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const routes = {
  version: 1,
  include: ['/', '/en', '/en/', '/ur', '/ur/', '/on-this-day', '/on-this-day/'],
  exclude: [],
};

const out = fileURLToPath(new URL('../dist/_routes.json', import.meta.url));
writeFileSync(out, JSON.stringify(routes, null, 2) + '\n');
console.log('[postbuild] wrote minimal _routes.json ->', routes.include.join(', '));
