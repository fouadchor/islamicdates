// Mosque directory: the subset of PT_CITIES that have a curated, real
// OpenStreetMap mosque dataset (see mosques-data.json). Reuses the prayer-times
// city dataset for names, coordinates and country grouping so the two
// directories stay perfectly in sync.
import { PT_CITIES, PT_COUNTRIES, type PtCity, type PtCountry, type PtLang } from './cities';
import mosquesData from './mosques-data.json';

export interface MosqueEntry { n: string; na: string; u: string; a: string; lat: number; lng: number }
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
