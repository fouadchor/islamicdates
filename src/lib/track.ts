/**
 * حدث GA4 — بلا ضجيج إن كان القياس معطّلاً أو محجوباً.
 *
 * gtag is loaded by the layout; a visitor with an ad blocker, or a page opened
 * before the script settled, simply records nothing rather than throwing into
 * the middle of someone's reading.
 */
export function track(name: string, params: Record<string, unknown> = {}): void {
  try {
    const g = (globalThis as { gtag?: (...a: unknown[]) => void }).gtag;
    if (typeof g === 'function') g('event', name, params);
  } catch {
    /* analytics must never break the feature */
  }
}
