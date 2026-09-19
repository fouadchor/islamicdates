import type { APIRoute } from 'astro';
import {
  claimPart,
  cleanName,
  completePart,
  getKhatma,
  getParts,
  PARTS,
  releasePart,
  summarise,
  validSlug,
} from '../../../lib/khatma';
import { body, db, fail, json, sameOrigin } from './_shared';

export const prerender = false;

const partNo = (v: unknown): number | null => {
  const n = Number(v);
  return Number.isInteger(n) && n >= 1 && n <= PARTS ? n : null;
};

const token = (v: unknown): string | null =>
  typeof v === 'string' && /^[A-Za-z0-9_-]{8,64}$/.test(v) ? v : null;

/** الحالة الحالية للختمة. */
export const GET: APIRoute = async (ctx) => {
  const slug = ctx.params.slug;
  if (!validSlug(slug)) return fail('رابط ختمة غير صالح.', 404);

  const database = db(ctx);
  if (!database) return fail('خدمة الختمة غير مهيّأة على الخادم.', 503);

  const k = await getKhatma(database, slug);
  if (!k) return fail('لم نجد هذه الختمة.', 404);

  const rows = await getParts(database, slug);
  return json({ ok: true, khatma: summarise(k, rows, token(ctx.url.searchParams.get('token'))) });
};

/** حجز جزء، أو تأكيد إتمامه، أو إرجاعه. */
export const POST: APIRoute = async (ctx) => {
  if (!sameOrigin(ctx.request)) return fail('طلب غير مسموح.', 403);

  const slug = ctx.params.slug;
  if (!validSlug(slug)) return fail('رابط ختمة غير صالح.', 404);

  const database = db(ctx);
  if (!database) return fail('خدمة الختمة غير مهيّأة على الخادم.', 503);

  const k = await getKhatma(database, slug);
  if (!k) return fail('لم نجد هذه الختمة.', 404);

  const b = await body(ctx.request);
  const n = partNo(b.part);
  const t = token(b.token);
  if (n === null) return fail('رقم جزء غير صالح.', 422);
  if (!t) return fail('رمز القارئ مفقود.', 422);

  let ok = false;
  switch (b.action) {
    case 'claim':
      ok = await claimPart(database, k, n, cleanName(b.name), t);
      if (!ok) return fail('سبقك إليه غيرك — اختر جزءاً آخر.', 409);
      break;
    case 'complete':
      ok = await completePart(database, k, n, t);
      if (!ok) return fail('لا يمكن تأكيد هذا الجزء — ربما انتهت مهلته أو أُكِّد من قبل.', 409);
      break;
    case 'release':
      ok = await releasePart(database, k, n, t);
      if (!ok) return fail('لا يمكن إرجاع هذا الجزء.', 409);
      break;
    default:
      return fail('إجراء غير معروف.', 422);
  }

  const rows = await getParts(database, slug);
  const fresh = (await getKhatma(database, slug)) ?? k;
  return json({ ok: true, khatma: summarise(fresh, rows, t) });
};
