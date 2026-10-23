import type { APIRoute } from 'astro';
import {
  allow,
  deletePage,
  getPage,
  hasPrayed,
  pray,
  PRAY_LIMIT,
  toView,
  validKey,
  validSlug,
  validToken,
} from '../../../lib/pray-for';
import type { PrayErr } from '../../../lib/pray-for-i18n';
import { body, clientIp, db, json, sameOrigin } from '../khatma/_shared';

export const prerender = false;

const fail = (code: PrayErr, status = 400) => json({ ok: false, code }, status);

/** حالة الصفحة الآن، مع «هل دعا هذا المتصفح؟». */
export const GET: APIRoute = async (ctx) => {
  const slug = ctx.params.slug;
  if (!validSlug(slug)) return fail('bad_link', 404);
  const database = db(ctx);
  if (!database) return fail('unavailable', 503);

  try {
    const row = await getPage(database, slug);
    if (!row) return fail('not_found', 404);
    const t = ctx.url.searchParams.get('token');
    const prayed = validToken(t) ? await hasPrayed(database, slug, t) : false;
    return json({ ok: true, page: toView(row, prayed) });
  } catch {
    return fail('unavailable', 503);
  }
};

/** «دعوت له»، أو حذف الصفحة بمفتاح منشئها. */
export const POST: APIRoute = async (ctx) => {
  if (!sameOrigin(ctx.request)) return fail('forbidden', 403);
  const slug = ctx.params.slug;
  if (!validSlug(slug)) return fail('bad_link', 404);
  const database = db(ctx);
  if (!database) return fail('unavailable', 503);

  const b = await body(ctx.request);
  try {
    const row = await getPage(database, slug);
    if (!row) return fail('not_found', 404);

    if (b.action === 'pray') {
      if (!validToken(b.token)) return fail('no_token', 422);
      // A repeat press from this browser is answered from the mark alone and
      // never touches the rate limit — only a new prayer spends one.
      if (await hasPrayed(database, slug, b.token)) return json({ ok: true, counted: false, page: toView(row, true) });
      if (!(await allow(database, `pp:${clientIp(ctx.request)}`, PRAY_LIMIT))) return fail('rate_pray', 429);
      const counted = await pray(database, slug, b.token);
      const fresh = (await getPage(database, slug)) ?? row;
      return json({ ok: true, counted, page: toView(fresh, true) });
    }

    if (b.action === 'delete') {
      if (!validKey(b.adminKey)) return fail('not_admin', 403);
      const ok = await deletePage(database, slug, b.adminKey);
      return ok ? json({ ok: true, deleted: true }) : fail('not_admin', 403);
    }

    return fail('bad_action', 422);
  } catch {
    return fail('unavailable', 503);
  }
};
