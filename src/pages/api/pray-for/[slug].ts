import type { APIRoute } from 'astro';
import {
  allow,
  asGender,
  asKind,
  cleanName,
  deletePage,
  editPage,
  getPage,
  mineFor,
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

/** حالة الصفحة الآن، مع ما فعله هذا المتصفح. */
export const GET: APIRoute = async (ctx) => {
  const slug = ctx.params.slug;
  if (!validSlug(slug)) return fail('bad_link', 404);
  const database = db(ctx);
  if (!database) return fail('unavailable', 503);

  try {
    const row = await getPage(database, slug);
    if (!row) return fail('not_found', 404);
    const t = ctx.url.searchParams.get('token');
    const mine = await mineFor(database, slug, validToken(t) ? t : null);
    return json({ ok: true, page: toView(row, mine) });
  } catch {
    return fail('unavailable', 503);
  }
};

/** «دعوت له»، أو تعديل الصفحة أو حذفها بمفتاح منشئها. */
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
      // A press that cannot count (this browser prayed within the last day) is
      // answered from the mark alone and never spends the network's rate limit.
      const before = await mineFor(database, slug, b.token);
      if (before.againAt) return json({ ok: true, result: 'already', page: toView(row, before) });
      if (!(await allow(database, `pp:${clientIp(ctx.request)}`, PRAY_LIMIT))) return fail('rate_pray', 429);
      const result = await pray(database, slug, b.token);
      const fresh = (await getPage(database, slug)) ?? row;
      return json({ ok: true, result, page: toView(fresh, await mineFor(database, slug, b.token)) });
    }

    if (b.action === 'edit') {
      if (!validKey(b.adminKey)) return fail('not_admin', 403);
      const name = cleanName(b.name);
      if (!name) return fail('empty_name', 422);
      const kind = asKind(b.kind);
      const gender = asGender(b.gender);
      if (!kind || !gender) return fail('bad_kind', 422);
      if (!(await editPage(database, slug, b.adminKey, { name, kind, gender }))) return fail('not_admin', 403);
      const fresh = (await getPage(database, slug)) ?? row;
      const t = validToken(b.token) ? b.token : null;
      return json({ ok: true, page: toView(fresh, await mineFor(database, slug, t)) });
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
