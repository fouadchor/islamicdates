import type { APIRoute } from 'astro';
import { allowCreate, cleanTitle, createKhatma, HOLD_DEFAULT } from '../../../lib/khatma';
import { body, clientIp, db, fail, json, sameOrigin } from './_shared';

export const prerender = false;

export const POST: APIRoute = async (ctx) => {
  if (!sameOrigin(ctx.request)) return fail('طلب غير مسموح.', 403);

  const database = db(ctx);
  if (!database) return fail('خدمة الختمة غير مهيّأة على الخادم.', 503);

  const b = await body(ctx.request);
  const title = cleanTitle(b.title);
  if (!title) return fail('اكتب عنواناً للختمة.', 422);

  const holdHours = Number.isFinite(Number(b.holdHours)) ? Number(b.holdHours) : HOLD_DEFAULT;

  if (!(await allowCreate(database, clientIp(ctx.request)))) {
    return fail('أنشأتَ ختمات كثيرة خلال ساعة. حاول بعد قليل.', 429);
  }

  const { slug, adminKey } = await createKhatma(database, { title, lang: 'ar', holdHours });
  return json({ ok: true, slug, adminKey, url: `/khatma/${slug}/` }, 201);
};
