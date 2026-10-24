// ─────────────────────────────────────────────────────────────────────────────
// «ادعوا لـ…» — صفحة دعاء لمتوفّى أو مريض
//
// A family creates one page in someone's name and sends its link around. Whoever
// opens it reads supplications from the Qur'an and Sunnah — already in the right
// grammatical form and with the name in place — and presses «دعوت له». The page
// shows how many people have prayed.
//
// Same shape as the khatma (lib/khatma.ts): no account, a random slug as the
// invitation, a random per-browser token instead of identity, and an admin key
// kept only in the creator's browser. Deliberately absent: any reading or
// khatma "dedicated" to the person — only supplication, which benefits the dead
// by agreement of the scholars — and any target number.
// ─────────────────────────────────────────────────────────────────────────────
import type { D1, D1Stmt } from './khatma';

export type PrayKind = 'deceased' | 'sick';
export type Gender = 'm' | 'f';

export const KINDS: readonly PrayKind[] = ['deceased', 'sick'];
export const NAME_MAX = 60;

// Alphabet without 0/O/1/l/I, as for khatma links.
const ALPHABET = 'abcdefghjkmnpqrstuvwxyz23456789';
function randomId(len: number): string {
  const buf = new Uint8Array(len);
  crypto.getRandomValues(buf);
  let out = '';
  for (let i = 0; i < len; i++) out += ALPHABET[buf[i] % ALPHABET.length];
  return out;
}

export const newSlug = () => randomId(10);
export const newAdminKey = () => randomId(24);

/** شكل الرابط صالح؟ يمنع استعلام القاعدة بمدخل عشوائي. */
export function validSlug(s: unknown): s is string {
  return typeof s === 'string' && /^[a-z2-9]{10}$/.test(s);
}

export const validToken = (v: unknown): v is string =>
  typeof v === 'string' && /^[A-Za-z0-9_-]{8,64}$/.test(v);

export const validKey = (v: unknown): v is string => typeof v === 'string' && /^[a-z2-9]{24}$/.test(v);

/** The name lands on a page other people read: strip control/bidi characters and runaway space. */
export function cleanName(s: unknown): string {
  if (typeof s !== 'string') return '';
  return s
    .replace(/[\u0000-\u001f\u007f‎‏‪-‮⁦-⁩]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, NAME_MAX);
}

export const asKind = (v: unknown): PrayKind | null => (KINDS as readonly unknown[]).includes(v) ? (v as PrayKind) : null;
export const asGender = (v: unknown): Gender | null => (v === 'm' || v === 'f' ? v : null);

export interface PrayRow {
  slug: string;
  name: string;
  kind: PrayKind;
  gender: Gender;
  admin_key: string;
  lang: string;
  prayers: number;
  created_at: number;
}

/** الصفحة كما يراها المتصفح — بلا مفتاح الإدارة. */
export interface PrayView {
  slug: string;
  name: string;
  kind: PrayKind;
  gender: Gender;
  prayers: number;
  /** هل ضغط هذا المتصفح «دعوت» من قبل؟ */
  prayed: boolean;
}

export const toView = (r: PrayRow, prayed = false): PrayView => ({
  slug: r.slug,
  name: r.name,
  kind: r.kind,
  gender: r.gender,
  prayers: r.prayers,
  prayed,
});

// ── المخطّط ──────────────────────────────────────────────────────────────────
// Created on first use rather than by a manual migration: the Pages project's
// D1 is configured in the dashboard, so a forgotten `wrangler d1 execute` would
// otherwise turn the whole feature into 500s. IF NOT EXISTS makes this a no-op
// after the first run; it is attempted once per isolate.
const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS pray_page (
     slug TEXT PRIMARY KEY, name TEXT NOT NULL, kind TEXT NOT NULL, gender TEXT NOT NULL,
     admin_key TEXT NOT NULL, lang TEXT NOT NULL DEFAULT 'ar', prayers INTEGER NOT NULL DEFAULT 0,
     created_at INTEGER NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS pray_mark (
     slug TEXT NOT NULL REFERENCES pray_page(slug) ON DELETE CASCADE, token TEXT NOT NULL,
     at INTEGER NOT NULL, PRIMARY KEY (slug, token))`,
  `CREATE TABLE IF NOT EXISTS khatma_rate (
     bucket TEXT PRIMARY KEY, count INTEGER NOT NULL, expires INTEGER NOT NULL)`,
];

let ready: Promise<void> | null = null;
export function ensureSchema(db: D1): Promise<void> {
  if (!ready) {
    ready = db
      .batch(SCHEMA.map((q) => db.prepare(q)))
      .then(() => undefined)
      .catch((e) => {
        ready = null; // try again on the next request rather than failing for the isolate's life
        throw e;
      });
  }
  return ready;
}

// ── استعلامات ────────────────────────────────────────────────────────────────

export async function getPage(db: D1, slug: string): Promise<PrayRow | null> {
  await ensureSchema(db);
  return db.prepare('SELECT * FROM pray_page WHERE slug = ?').bind(slug).first<PrayRow>();
}

export async function hasPrayed(db: D1, slug: string, token: string | null): Promise<boolean> {
  if (!token) return false;
  const r = await db.prepare('SELECT 1 AS x FROM pray_mark WHERE slug = ? AND token = ?').bind(slug, token).first();
  return !!r;
}

export async function createPage(
  db: D1,
  opts: { name: string; kind: PrayKind; gender: Gender; lang: string },
): Promise<{ slug: string; adminKey: string }> {
  await ensureSchema(db);
  const slug = newSlug();
  const adminKey = newAdminKey();
  await db
    .prepare('INSERT INTO pray_page (slug, name, kind, gender, admin_key, lang, prayers, created_at) VALUES (?,?,?,?,?,?,0,?)')
    .bind(slug, opts.name, opts.kind, opts.gender, adminKey, opts.lang, Date.now())
    .run();
  return { slug, adminKey };
}

/**
 * «دعوت له». Counted once per browser: the mark's primary key makes a repeat
 * press insert nothing, and the counter moves only when the insert did. The
 * increment itself is atomic, so concurrent presses never lose a count.
 *
 * Returns true when this press was counted, false when this browser had
 * already prayed — both are a success for the reader.
 */
export async function pray(db: D1, slug: string, token: string): Promise<boolean> {
  const r = await db
    .prepare('INSERT OR IGNORE INTO pray_mark (slug, token, at) VALUES (?,?,?)')
    .bind(slug, token, Date.now())
    .run();
  if (r.meta.changes !== 1) return false;
  await db.prepare('UPDATE pray_page SET prayers = prayers + 1 WHERE slug = ?').bind(slug).run();
  return true;
}

/** حذف الصفحة نهائياً — الاسم والعدّاد والعلامات — بمفتاح المنشئ وحده. */
export async function deletePage(db: D1, slug: string, adminKey: string): Promise<boolean> {
  const row = await db.prepare('SELECT admin_key FROM pray_page WHERE slug = ?').bind(slug).first<{ admin_key: string }>();
  if (!row || row.admin_key !== adminKey) return false;
  const stmts: D1Stmt[] = [
    db.prepare('DELETE FROM pray_mark WHERE slug = ?').bind(slug),
    db.prepare('DELETE FROM pray_page WHERE slug = ? AND admin_key = ?').bind(slug, adminKey),
  ];
  await db.batch(stmts);
  return true;
}

/**
 * Coarse abuse brake, sharing khatma_rate: `limit` actions per key per hour.
 * Not a security boundary — enough to keep a script from inflating a counter
 * or filling the table, without a CAPTCHA in front of a supplication.
 */
export async function allow(db: D1, key: string, limit: number): Promise<boolean> {
  await ensureSchema(db);
  const hour = Math.floor(Date.now() / 3600_000);
  const bucket = `${key}:${hour}`;
  const expires = (hour + 2) * 3600_000;
  await db
    .prepare(
      `INSERT INTO khatma_rate (bucket, count, expires) VALUES (?, 1, ?)
         ON CONFLICT(bucket) DO UPDATE SET count = count + 1`,
    )
    .bind(bucket, expires)
    .run();
  const row = await db.prepare('SELECT count FROM khatma_rate WHERE bucket = ?').bind(bucket).first<{ count: number }>();
  await db.prepare('DELETE FROM khatma_rate WHERE expires < ?').bind(Date.now()).run();
  return (row?.count ?? 1) <= limit;
}

/** حدود الاستخدام: إنشاء الصفحات، والضغط على «دعوت» من شبكة واحدة. */
export const CREATE_LIMIT = 5;
/** Generous: a family on one home Wi-Fi, or a mosque hall, all praying in the same hour. */
export const PRAY_LIMIT = 120;
