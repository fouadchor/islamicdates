import type { APIContext } from 'astro';
import type { D1 } from '../../../lib/khatma';

export const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

export const fail = (message: string, status = 400) => json({ ok: false, error: message }, status);

/** قاعدة البيانات إن كانت مربوطة. */
export function db(ctx: APIContext): D1 | null {
  return (ctx.locals as App.Locals)?.runtime?.env?.DB ?? null;
}

/**
 * يقبل الطلب فقط إذا جاء من الموقع نفسه.
 *
 * The endpoints take no credentials, so the risk is not account theft but a
 * third-party page quietly claiming juz' on a visitor's behalf. Comparing the
 * Origin with the request's own origin costs nothing and closes that.
 */
export function sameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return true; // non-CORS clients (curl, server-side) send none
  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

export async function body(request: Request): Promise<Record<string, unknown>> {
  try {
    const v = await request.json();
    return v && typeof v === 'object' ? (v as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}

export const clientIp = (request: Request) =>
  request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
