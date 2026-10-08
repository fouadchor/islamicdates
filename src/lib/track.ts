/**
 * حدث GA4 — بلا ضجيج إن كان القياس معطّلاً أو محجوباً.
 *
 * gtag is loaded by the layout; a visitor with an ad blocker, or a page opened
 * before the script settled, simply records nothing rather than throwing into
 * the middle of someone's reading.
 */
export function track(name: string, params: Record<string, unknown> = {}): void {
  try {
    const w = globalThis as { gtag?: (...a: unknown[]) => void; dataLayer?: unknown[] };
    if (typeof w.gtag === 'function') {
      w.gtag('event', name, params);
    } else if (Array.isArray(w.dataLayer)) {
      // Same queue gtag() feeds. gtag.js reads `arguments` objects, not arrays,
      // so push one shaped exactly like gtag's own.
      (function (..._a: unknown[]) {
        // eslint-disable-next-line prefer-rest-params
        w.dataLayer!.push(arguments);
      })('event', name, params);
    }
  } catch {
    /* analytics must never break the feature */
  }
}
