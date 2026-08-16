// Regenerates the PWA/touch icons in public/icons from the same crescent mark as
// public/favicon.svg. Run by hand after a brand change — deliberately NOT part of
// `npm run build`, since sharp is only a transitive dependency here and the icons
// are committed static assets that change about never.
//
//   node scripts/generate-icons.mjs
//
// Two shapes are emitted:
//   • "any"      — rounded-square mark, matches the favicon (used in tab strips, menus).
//   • "maskable" — full-bleed background with the crescent inside the central 80%
//                  safe zone, so Android can crop it to a circle/squircle without
//                  clipping the mark. Same full-bleed shape serves the iOS touch icon,
//                  which iOS rounds off itself.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const TEAL = '#0d9488';
// Crescent path from favicon.svg, authored on a 64×64 grid.
const CRESCENT = 'M41 32a13 13 0 1 1-7.6-11.8A10 10 0 1 0 41 32z';

/** @param {number} size @param {number} radius corner radius in px @param {number} scale mark size as a fraction of the canvas */
const svg = (size, radius, scale) => {
  const s = (size * scale) / 64;          // crescent grid → canvas units
  const offset = (size - 64 * s) / 2;     // centre the scaled mark
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">` +
      `<rect width="${size}" height="${size}" rx="${radius}" fill="${TEAL}"/>` +
      `<g transform="translate(${offset} ${offset}) scale(${s})"><path d="${CRESCENT}" fill="#fff"/></g>` +
    `</svg>`
  );
};

const targets = [
  // file,                    size, radius,        mark scale
  ['icon-192.png',             192, 192 * 15 / 64, 0.86],
  ['icon-512.png',             512, 512 * 15 / 64, 0.86],
  ['icon-maskable-512.png',    512, 0,             0.62],
  ['apple-touch-icon.png',     180, 0,             0.78],
];

await mkdir(new URL('../public/icons/', import.meta.url), { recursive: true });
for (const [name, size, radius, scale] of targets) {
  const out = new URL(`../public/icons/${name}`, import.meta.url);
  await sharp(svg(size, radius, scale)).png({ compressionLevel: 9 }).toFile(out.pathname);
  console.log(`[icons] ${name} (${size}×${size})`);
}
