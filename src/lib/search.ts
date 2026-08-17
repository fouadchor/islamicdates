// Shared text normalisation for the city search boxes.
//
// Arabic and Urdu readers type the same place a dozen ways: with or without
// diacritics, ا/أ/إ/آ, ي/ى, ه/ة, ك/ک. Comparing raw strings would make the search
// feel broken for exactly the audience it is for, so both sides of every
// comparison are folded through this first.

export function normalizeSearch(s: string): string {
  return s
    .toLowerCase()
    .replace(/[ً-ٰٟ]/g, '')   // harakat + dagger alef
    .replace(/ـ/g, '')                   // tatweel
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/ئ/g, 'ي')
    .replace(/ك/g, 'ک')                       // Arabic kaf → Urdu keheh, so both match
    .replace(/ی/g, 'ي')                       // Urdu yeh → Arabic yeh
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Rank for one candidate against a normalised query. Lower sorts first;
 * null means no match.
 *
 * Each spelling is tested on its own rather than as one concatenated blob.
 * Joining them first would mean no Latin name could ever *begin* with the query
 * on an Arabic-first entry — "lon" then scores London and Barcelona identically
 * (both merely "contain" it) and the tie-break puts برشلونة first, which is not
 * what anyone typing "lon" wants.
 *
 * A city matched on its own name always outranks one matched only by its country.
 */
export function matchRank(query: string, cityNames: string[], countryNames: string[]): number | null {
  if (!query) return null;
  let best: number | null = null;
  const consider = (r: number) => { if (best === null || r < best) best = r; };

  for (const n of cityNames) {
    if (n.startsWith(query)) return 0;      // best possible; stop early
    if (n.includes(query)) consider(1);
  }
  for (const n of countryNames) {
    if (n.startsWith(query)) consider(2);
    else if (n.includes(query)) consider(3);
  }
  return best;
}
