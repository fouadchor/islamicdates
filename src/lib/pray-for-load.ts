import type { D1 } from './khatma';
import { getPage, toView, validSlug, type PrayView } from './pray-for';

export type PrayProblem = 'bad-link' | 'not-found' | 'unavailable' | null;

export interface PrayLoaded {
  slug: string;
  view: PrayView | null;
  problem: PrayProblem;
}

/**
 * Called from the page's own frontmatter, never from a child component: Astro
 * streams, so a status set after an await inside a child arrives too late and an
 * unknown page would answer 200 (same reason as lib/khatma-load.ts).
 */
export async function loadPrayPage(slug: string | undefined, db: D1 | null): Promise<PrayLoaded> {
  if (!validSlug(slug)) return { slug: String(slug ?? ''), view: null, problem: 'bad-link' };
  if (!db) return { slug, view: null, problem: 'unavailable' };
  try {
    const row = await getPage(db, slug);
    if (!row) return { slug, view: null, problem: 'not-found' };
    // Rendered without the reader's token; the island re-asks with it on mount,
    // which is what turns the button into "you prayed".
    return { slug, view: toView(row), problem: null };
  } catch {
    return { slug, view: null, problem: 'unavailable' };
  }
}

export const prayStatusFor = (p: PrayProblem): number => (p === 'unavailable' ? 503 : p === null ? 200 : 404);
