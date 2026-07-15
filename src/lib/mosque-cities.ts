// Mosque directory: the subset of PT_CITIES that have a curated, real
// OpenStreetMap mosque dataset (see mosques-data.json). Reuses the prayer-times
// city dataset for names, coordinates and country grouping so the two
// directories stay perfectly in sync.
import { PT_CITIES, PT_COUNTRIES, type PtCity, type PtCountry, type PtLang } from './cities';
import mosquesData from './mosques-data.json';
import { featuredFor } from './mosque-featured';

export interface MosqueEntry { n: string; na: string; u: string; a: string; lat: number; lng: number; landmark?: boolean }
export interface CityMosques { count: number; list: MosqueEntry[] }

const DATA = mosquesData as Record<string, CityMosques>;

export const hasMosqueData = (slug: string): boolean =>
  Array.isArray(DATA[slug]?.list) && DATA[slug].list.length > 0;

export const mosquesFor = (slug: string): CityMosques =>
  DATA[slug] ?? { count: 0, list: [] };

export const mosqueCities = (): PtCity[] =>
  PT_CITIES.filter(c => hasMosqueData(c.slug));

export const mosqueCitiesOfCountry = (code: string): PtCity[] =>
  mosqueCities().filter(c => c.cc === code);

export const mosqueCountries = (): PtCountry[] => {
  const codes = new Set(mosqueCities().map(c => c.cc));
  return PT_COUNTRIES.filter(c => codes.has(c.code));
};

// URL helpers — mirror the prayer-times scheme.
export const mosqueBase = (lang: PtLang): string =>
  lang === 'ar' ? '/mosques/' : `/${lang}/mosques/`;
export const mosqueCountryPath = (countrySlug: string, lang: PtLang): string =>
  `${mosqueBase(lang)}${countrySlug}/`;
export const mosqueCityPath = (countrySlug: string, citySlug: string, lang: PtLang): string =>
  `${mosqueBase(lang)}${countrySlug}/${citySlug}/`;

export const mapsDir = (lat: number, lng: number): string =>
  `https://www.google.com/maps/dir/?api=1&destination=${lat}%2C${lng}`;


// ---------------------------------------------------------------------------
// Curation: show the famous landmark mosques first, drop unnamed / junk OSM
// entries, and cap each city to a short, high-quality list. This keeps the
// city pages focused on the mosques people actually look for instead of a raw
// data dump of every tagged building.

const DEFAULT_CAP = 8;

// Rough distance in metres between two lat/lng points (haversine).
const distM = (aLat: number, aLng: number, bLat: number, bLng: number): number => {
  const R = 6371000, toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(bLat - aLat), dLng = toRad(bLng - aLng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(aLat)) * Math.cos(toRad(bLat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};

// An OSM entry is "named" if it has a usable English or Arabic name that is not
// just a fragment (a bare number, a floor label, a generic "prayer hall", etc.).
const JUNK = /^(prayer hall|prayer room|musalla|مصلى|مدرسة|مسجد|mosque|masjid|جامع)\b/i;
const isNamed = (m: MosqueEntry): boolean => {
  const name = (m.na || m.n || '').trim();
  if (!name) return false;
  if (/^[-\d().،\s]+$/.test(name)) return false;      // only digits / punctuation
  if (name.length < 3) return false;
  if (JUNK.test(name) && name.replace(JUNK, '').trim().length < 2) return false;
  return true;
};

// Curated list for a city: verified landmarks first, then the best-named OSM
// entries that are not duplicates of a landmark, capped to `cap`.
export const curatedMosquesFor = (slug: string, cap = DEFAULT_CAP): MosqueEntry[] => {
  const featured: MosqueEntry[] = featuredFor(slug).map(f => ({ n: f.n, na: f.na, u: '', a: '', lat: f.lat, lng: f.lng, landmark: true }));
  const osm = mosquesFor(slug).list.filter(isNamed);
  const nearFeatured = (m: MosqueEntry) => featured.some(f => distM(f.lat, f.lng, m.lat, m.lng) < 250);
  const extras = osm.filter(m => !nearFeatured(m));
  return [...featured, ...extras].slice(0, Math.max(cap, featured.length));
};

// Total documented mosques for a city (used for "X of Y+" copy).
export const cityMosqueTotal = (slug: string): number => {
  const d = mosquesFor(slug);
  return Math.max(d.count, d.list.length);
};

// Top landmark names for a city (for directory previews).
export const landmarkNamesFor = (slug: string, lang: PtLang, n = 2): string[] =>
  featuredFor(slug).slice(0, n).map(f => (lang === 'ar' ? f.na || f.n : f.n || f.na));
