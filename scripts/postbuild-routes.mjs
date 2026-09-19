// Post-build: overwrite the adapter's auto-generated _routes.json with a minimal,
// future-proof version. Only the request-time routes invoke the SSR Worker; every
// other (prerendered) page is served as a static asset.
//
// NOTE: this list is hand-maintained. A page that sets `prerender = false` but is
// missing here is served as a static asset and 404s in production, so add its path
// whenever a new SSR route or API endpoint lands.
// This keeps us far below Cloudflare's 100-rule limit and avoids invoking the
// Worker for the thousands of static pages. Both slash and non-slash forms of the
// localized homepages are included so neither 404s.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const routes = {
  version: 1,
  include: [
    '/', '/en', '/en/', '/ur', '/ur/',
    '/on-this-day', '/on-this-day/', '/en/on-this-day', '/en/on-this-day/', '/ur/on-this-day', '/ur/on-this-day/',
    // Khatma: every per-khatma page is shared live state, and the endpoints
    // behind it read and write D1, so both run on each request.
    '/khatma/*', '/api/*',
  ],
  // /khatma/ itself is the prerendered landing page — serving it from the Worker
  // would spend an invocation on every visit. `exclude` wins over `include`.
  exclude: ['/khatma/'],
};

const out = fileURLToPath(new URL('../dist/_routes.json', import.meta.url));
writeFileSync(out, JSON.stringify(routes, null, 2) + '\n');
console.log('[postbuild] wrote minimal _routes.json ->', routes.include.join(', '));
