// ─────────────────────────────────────────────────────────────────────────────
// الختمة الجماعية — بيانات الأجزاء ومنطق الحجز
//
// A khatma is a group of people dividing the Qur'an between them. Each reader
// claims a juz, reads it, and marks it done; the khatma completes when all
// thirty are done. No account, no e-mail, no personal data beyond an optional
// display name — the link itself is the invitation.
//
// Deliberately absent: any field for a deceased person. The feature is a plain
// collective reading, which is the form scholars are least divided about.
// ─────────────────────────────────────────────────────────────────────────────

/** حالة الجزء كما تُخزَّن. */
export type PartStatus = 'free' | 'held' | 'done';

export { PARTS } from './khatma-juz';
import { PARTS } from './khatma-juz';

/** المهل المتاحة لحجز الجزء (بالساعات): من نصف يوم إلى شهر — الافتراضي يومان. */
export const HOLD_HOURS = [12, 24, 48, 72, 168, 720] as const;
export const HOLD_DEFAULT = 48;

export const TITLE_MAX = 80;
export const NAME_MAX = 32;

// ── معرّفات عشوائية ──────────────────────────────────────────────────────────
// Alphabet without 0/O/1/l/I so a link read aloud or retyped does not go astray.
const ALPHABET = 'abcdefghjkmnpqrstuvwxyz23456789';

function randomId(len: number): string {
  const buf = new Uint8Array(len);
  crypto.getRandomValues(buf);
  let out = '';
  for (let i = 0; i < len; i++) out += ALPHABET[buf[i] % ALPHABET.length];
  return out;
}

/** معرّف الختمة في الرابط. */
export const newSlug = () => randomId(10);
/** مفتاح الإدارة للمنشئ. */
export const newAdminKey = () => randomId(24);
/** رمز القارئ — يُحفظ في متصفحه فقط. */
export const newReaderToken = () => randomId(24);

// ── تنقية المدخلات ───────────────────────────────────────────────────────────
// Everything a stranger can type lands on a page other people read, so control
// characters and runaway whitespace are stripped before anything is stored.
function clean(s: unknown, max: number): string {
  if (typeof s !== 'string') return '';
  return s
    .replace(/[\u0000-\u001f\u007f‎‏‪-‮]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
}

export const cleanTitle = (s: unknown) => clean(s, TITLE_MAX);
export const cleanName = (s: unknown) => clean(s, NAME_MAX);

/** هل الرابط صالح الشكل؟ يمنع استعلام قاعدة البيانات بمدخل عشوائي. */
export function validSlug(s: unknown): s is string {
  return typeof s === 'string' && /^[a-z2-9]{10}$/.test(s);
}

// ── نوع قاعدة البيانات ───────────────────────────────────────────────────────
// Structural, so the file carries no dependency on @cloudflare/workers-types.
export interface D1Stmt {
  bind(...vals: unknown[]): D1Stmt;
  first<T = unknown>(): Promise<T | null>;
  all<T = unknown>(): Promise<{ results: T[] }>;
  run(): Promise<{ meta: { changes: number } }>;
}
export interface D1 {
  prepare(query: string): D1Stmt;
  batch(stmts: D1Stmt[]): Promise<unknown[]>;
}

export interface KhatmaRow {
  slug: string;
  title: string;
  admin_key: string;
  lang: string;
  parts: number;
  hold_hours: number;
  created_at: number;
  completed_at: number | null;
}

export interface PartRow {
  part_no: number;
  status: PartStatus;
  reader_name: string | null;
  reader_token: string | null;
  claimed_at: number | null;
  done_at: number | null;
}

/** الجزء كما يراه المتصفح — بلا رموز القرّاء. */
export interface PartView {
  n: number;
  status: PartStatus;
  reader: string | null;
  /** لحظة انتهاء المهلة (ms) للأجزاء المحجوزة. */
  expiresAt: number | null;
  /** هل هذا الجزء محجوز لصاحب الطلب نفسه؟ */
  mine: boolean;
}

export const nowMs = () => Date.now();

/**
 * الحالة الفعلية للجزء: الحجز المنتهية مهلته يُعامَل كأنه حرّ.
 *
 * Expiry is applied on read rather than by a scheduled job, so a khatma with no
 * visitors costs nothing and a visiting reader always sees the truthful state.
 */
export function effective(p: PartRow, holdHours: number, now = nowMs()): PartStatus {
  if (p.status !== 'held') return p.status;
  const claimed = p.claimed_at ?? 0;
  return now - claimed >= holdHours * 3600_000 ? 'free' : 'held';
}

export function toView(p: PartRow, holdHours: number, token: string | null, now = nowMs()): PartView {
  const st = effective(p, holdHours, now);
  return {
    n: p.part_no,
    status: st,
    reader: st === 'free' ? null : p.reader_name,
    expiresAt: st === 'held' ? (p.claimed_at ?? 0) + holdHours * 3600_000 : null,
    mine: st !== 'free' && !!token && p.reader_token === token,
  };
}

export interface KhatmaView {
  slug: string;
  title: string;
  holdHours: number;
  createdAt: number;
  completedAt: number | null;
  parts: PartView[];
  done: number;
  held: number;
  free: number;
}

export function summarise(k: KhatmaRow, rows: PartRow[], token: string | null, now = nowMs()): KhatmaView {
  const parts = rows
    .slice()
    .sort((a, b) => a.part_no - b.part_no)
    .map((p) => toView(p, k.hold_hours, token, now));
  return {
    slug: k.slug,
    title: k.title,
    holdHours: k.hold_hours,
    createdAt: k.created_at,
    completedAt: k.completed_at,
    parts,
    done: parts.filter((p) => p.status === 'done').length,
    held: parts.filter((p) => p.status === 'held').length,
    free: parts.filter((p) => p.status === 'free').length,
  };
}

// ── استعلامات ────────────────────────────────────────────────────────────────

export async function getKhatma(db: D1, slug: string): Promise<KhatmaRow | null> {
  return db.prepare('SELECT * FROM khatma WHERE slug = ?').bind(slug).first<KhatmaRow>();
}

export async function getParts(db: D1, slug: string): Promise<PartRow[]> {
  const r = await db
    .prepare('SELECT part_no, status, reader_name, reader_token, claimed_at, done_at FROM khatma_part WHERE slug = ?')
    .bind(slug)
    .all<PartRow>();
  return r.results ?? [];
}

export async function createKhatma(
  db: D1,
  opts: { title: string; lang?: string; holdHours?: number },
): Promise<{ slug: string; adminKey: string }> {
  const slug = newSlug();
  const adminKey = newAdminKey();
  const holdHours = (HOLD_HOURS as readonly number[]).includes(opts.holdHours ?? HOLD_DEFAULT)
    ? (opts.holdHours ?? HOLD_DEFAULT)
    : HOLD_DEFAULT;

  const stmts: D1Stmt[] = [
    db
      .prepare('INSERT INTO khatma (slug, title, admin_key, lang, parts, hold_hours, created_at) VALUES (?,?,?,?,?,?,?)')
      .bind(slug, opts.title, adminKey, opts.lang ?? 'ar', PARTS, holdHours, nowMs()),
  ];
  for (let n = 1; n <= PARTS; n++) {
    stmts.push(db.prepare("INSERT INTO khatma_part (slug, part_no, status) VALUES (?,?,'free')").bind(slug, n));
  }
  await db.batch(stmts);
  return { slug, adminKey };
}

/**
 * حجز جزء. التحديث الشرطي هو ما يمنع أخذ الجزء نفسه مرتين: من يصل أولاً
 * يغيّر الصف، ومن يليه يجد `changes === 0` فيُردّ عليه أن الجزء أُخذ.
 */
export async function claimPart(
  db: D1,
  k: KhatmaRow,
  partNo: number,
  name: string,
  token: string,
): Promise<boolean> {
  const now = nowMs();
  const cutoff = now - k.hold_hours * 3600_000;
  const r = await db
    .prepare(
      `UPDATE khatma_part
          SET status = 'held', reader_name = ?, reader_token = ?, claimed_at = ?
        WHERE slug = ? AND part_no = ?
          AND (status = 'free' OR (status = 'held' AND claimed_at <= ?))`,
    )
    .bind(name || null, token, now, k.slug, partNo, cutoff)
    .run();
  return r.meta.changes === 1;
}

/** تأكيد إتمام القراءة — لا يقبل إلا من الرمز الذي حجز الجزء. */
export async function completePart(db: D1, k: KhatmaRow, partNo: number, token: string): Promise<boolean> {
  const r = await db
    .prepare(
      `UPDATE khatma_part
          SET status = 'done', done_at = ?
        WHERE slug = ? AND part_no = ? AND status = 'held' AND reader_token = ?`,
    )
    .bind(nowMs(), k.slug, partNo, token)
    .run();
  if (r.meta.changes !== 1) return false;
  await db
    .prepare(
      `UPDATE khatma SET completed_at = ?
        WHERE slug = ? AND completed_at IS NULL
          AND NOT EXISTS (SELECT 1 FROM khatma_part WHERE slug = ? AND status <> 'done')`,
    )
    .bind(nowMs(), k.slug, k.slug)
    .run();
  return true;
}

/** إرجاع الجزء للمجموعة طوعاً. */
export async function releasePart(db: D1, k: KhatmaRow, partNo: number, token: string): Promise<boolean> {
  const r = await db
    .prepare(
      `UPDATE khatma_part
          SET status = 'free', reader_name = NULL, reader_token = NULL, claimed_at = NULL
        WHERE slug = ? AND part_no = ? AND status = 'held' AND reader_token = ?`,
    )
    .bind(k.slug, partNo, token)
    .run();
  return r.meta.changes === 1;
}

/**
 * كابح بسيط على إنشاء الختمات: خمس ختمات لكل عنوان IP في الساعة.
 * Not a security boundary — just enough to keep a bored script from filling the
 * table, without a CAPTCHA in front of an act of worship.
 */
export async function allowCreate(db: D1, ip: string, limit = 5): Promise<boolean> {
  const hour = Math.floor(nowMs() / 3600_000);
  const bucket = `c:${ip}:${hour}`;
  const expires = (hour + 2) * 3600_000;
  await db
    .prepare(
      `INSERT INTO khatma_rate (bucket, count, expires) VALUES (?, 1, ?)
         ON CONFLICT(bucket) DO UPDATE SET count = count + 1`,
    )
    .bind(bucket, expires)
    .run();
  const row = await db.prepare('SELECT count FROM khatma_rate WHERE bucket = ?').bind(bucket).first<{ count: number }>();
  // Opportunistic cleanup; cheap and keeps the table from growing without bound.
  await db.prepare('DELETE FROM khatma_rate WHERE expires < ?').bind(nowMs()).run();
  return (row?.count ?? 1) <= limit;
}
