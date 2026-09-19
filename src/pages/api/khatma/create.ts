import type { APIRoute } from 'astro';
import { allowCreate, cleanTitle, createKhatma, HOLD_DEFAULT } from '../../../lib/khatma';
import { body, clientIp, db, fail, json, sameOrigin } from './_shared';

export const prerender = false;

export const POST: APIRoute = async (ctx) => {
  if (!sameOrigin(ctx.request)) return fail('forbidden', 403);

  const database = db(ctx);
  if (!database) return fail('unavailable', 503);

  const b = await body(ctx.request);
  const title = cleanTitle(b.title);
  if (!title) return fail('empty_title', 422);

  const holdHours = Number.isFinite(Number(b.holdHours)) ? Number(b.holdHours) : HOLD_DEFAULT;

  if (!(await allowCreate(database, clientIp(ctx.request)))) {
    return fail('rate', 429);
  }

  // The creator's language is recorded only so a khatma can later be counted
  // per locale; every khatma page renders in the language of whoever opens it.
  const lang = ['ar', 'en', 'ur'].includes(String(b.lang)) ? String(b.lang) : 'ar';

  const { slug, adminKey } = await createKhatma(database, { title, lang, holdHours });
  const base = lang === 'en' ? '/en/khatma/' : lang === 'ur' ? '/ur/khatma/' : '/khatma/';
  return json({ ok: true, slug, adminKey, url: `${base}${slug}/` }, 201);
};
