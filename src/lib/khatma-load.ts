import { getKhatma, getParts, summarise, validSlug, type D1, type KhatmaView } from './khatma';

export type KhatmaProblem = 'bad-link' | 'not-found' | 'unavailable' | null;

export interface Loaded {
  slug: string;
  view: KhatmaView | null;
  problem: KhatmaProblem;
}

/**
 * يُستدعى في صدر الصفحة نفسها لا داخل مكوّن ابن.
 *
 * Astro streams the response: the first `await` inside a child component can
 * come after the head has gone out, and a status set there is ignored — an
 * unknown khatma then answers 200 instead of 404. Doing the awaits in the
 * page's own frontmatter keeps the status truthful.
 */
export async function loadKhatma(slug: string | undefined, db: D1 | null): Promise<Loaded> {
  if (!validSlug(slug)) return { slug: String(slug ?? ''), view: null, problem: 'bad-link' };
  if (!db) return { slug, view: null, problem: 'unavailable' };

  const k = await getKhatma(db, slug);
  if (!k) return { slug, view: null, problem: 'not-found' };

  // Rendered without a reader token: the browser re-asks with its own token on
  // mount, which is what turns "held by someone" into "held by you".
  return { slug, view: summarise(k, await getParts(db, slug), null), problem: null };
}

/** رمز الاستجابة الموافق للحالة. */
export const statusFor = (p: KhatmaProblem): number =>
  p === 'unavailable' ? 503 : p === null ? 200 : 404;
