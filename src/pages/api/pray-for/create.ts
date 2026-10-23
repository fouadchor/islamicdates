import type { APIRoute } from 'astro';
import { allow, asGender, asKind, cleanName, createPage, CREATE_LIMIT } from '../../../lib/pray-for';
import type { PrayErr } from '../../../lib/pray-for-i18n';
import { body, clientIp, db, json, sameOrigin } from '../khatma/_shared';

export const prerender = false;

const fail = (code: PrayErr, status = 400) => json({ ok: false, code }, status);

export const POST: APIRoute = async (ctx) => {
  if (!sameOrigin(ctx.request)) return fail('forbidden', 403);

  const database = db(ctx);
  if (!database) return fail('unavailable', 503);

  const b = await body(ctx.request);
  const name = cleanName(b.name);
  if (!name) return fail('empty_name', 422);
  const kind = asKind(b.kind);
  const gender = asGender(b.gender);
  if (!kind || !gender) return fail('bad_kind', 422);

  try {
    if (!(await allow(database, `pc:${clientIp(ctx.request)}`, CREATE_LIMIT))) return fail('rate', 429);

    // Recorded only to count pages per locale; each page renders in the language
    // of whoever opens it.
    const lang = ['ar', 'en', 'ur'].includes(String(b.lang)) ? String(b.lang) : 'ar';
    const { slug, adminKey } = await createPage(database, { name, kind, gender, lang });
    const base = lang === 'en' ? '/en/pray-for/' : lang === 'ur' ? '/ur/pray-for/' : '/pray-for/';
    return json({ ok: true, slug, adminKey, url: `${base}${slug}/` }, 201);
  } catch {
    return fail('unavailable', 503);
  }
};
