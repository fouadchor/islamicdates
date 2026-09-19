import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Lang } from '../lib/data';
import { juzInfo, juzReadHref, num } from '../lib/khatma-juz';
import { fill, type ErrCode, type GridT } from '../lib/khatma-i18n';

type PartStatus = 'free' | 'held' | 'done';

interface PartView {
  n: number;
  status: PartStatus;
  reader: string | null;
  expiresAt: number | null;
  mine: boolean;
}
interface KhatmaView {
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

const TOKEN_KEY = 'idk.khatma.token';
const NAME_KEY = 'idk.khatma.name';

/**
 * رمز القارئ: عشوائي، يبقى في متصفحه وحده، ولا يُرسَل لأي متصفح آخر.
 * هو ما يسمح له بتأكيد جزئه أو إرجاعه بلا حساب ولا بريد.
 */
function readerToken(): string {
  try {
    const cur = localStorage.getItem(TOKEN_KEY);
    if (cur) return cur;
    const t = crypto.randomUUID().replace(/-/g, '');
    localStorage.setItem(TOKEN_KEY, t);
    return t;
  } catch {
    // Private mode or storage blocked: a per-session token still lets this
    // visitor finish what they started, it just will not survive a reload.
    return crypto.randomUUID().replace(/-/g, '');
  }
}

const remember = (k: string, v: string) => {
  try {
    localStorage.setItem(k, v);
  } catch {
    /* storage blocked — not worth interrupting the reader over */
  }
};
const recall = (k: string) => {
  try {
    return localStorage.getItem(k) ?? '';
  } catch {
    return '';
  }
};

export interface KhatmaGridProps {
  initial: KhatmaView;
  lang: Lang;
  t: GridT;
  /** «يومان» / «a month» — تُحسب على الخادم حيث الصياغة اللغوية متاحة. */
  holdLabel: string;
  /** جذر الميزة في هذه اللغة، لروابط «ختمة جديدة». */
  base: string;
}

export default function KhatmaGrid({ initial, lang, t, holdLabel, base }: KhatmaGridProps) {
  const [k, setK] = useState<KhatmaView>(initial);
  const [busy, setBusy] = useState<number | null>(null);
  const [err, setErr] = useState<string>('');
  const [picking, setPicking] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [copied, setCopied] = useState(false);
  const token = useRef<string>('');
  const nameInput = useRef<HTMLInputElement>(null);

  const N = useCallback((v: number) => num(v, lang), [lang]);

  const refresh = useCallback(async () => {
    try {
      const r = await fetch(`/api/khatma/${initial.slug}?token=${encodeURIComponent(token.current)}`, {
        headers: { accept: 'application/json' },
      });
      const j = await r.json();
      if (j?.ok) setK(j.khatma);
    } catch {
      /* offline or a blip — the page keeps showing what it last knew */
    }
  }, [initial.slug]);

  useEffect(() => {
    token.current = readerToken();
    setName(recall(NAME_KEY));
    // The server rendered this page without knowing who is looking at it, so the
    // "mine" flags are all false until we re-ask with this browser's token.
    void refresh();
  }, [refresh]);

  // Other readers are claiming parts while this page is open; re-read when the
  // tab is in front, and stop entirely when it is not.
  useEffect(() => {
    let id: number | undefined;
    const tick = () => {
      if (document.visibilityState === 'visible') void refresh();
    };
    id = window.setInterval(tick, 30_000);
    document.addEventListener('visibilitychange', tick);
    return () => {
      if (id) window.clearInterval(id);
      document.removeEventListener('visibilitychange', tick);
    };
  }, [refresh]);

  const act = useCallback(
    async (part: number, action: 'claim' | 'complete' | 'release', readerName = '') => {
      setBusy(part);
      setErr('');
      try {
        const r = await fetch(`/api/khatma/${initial.slug}`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ action, part, token: token.current, name: readerName }),
        });
        const j = await r.json();
        if (j?.ok) {
          setK(j.khatma);
          setPicking(null);
        } else {
          const code = (j?.code ?? 'generic') as ErrCode;
          setErr(t.err[code] ?? t.err.generic);
          void refresh();
        }
      } catch {
        setErr(t.err.network);
      } finally {
        setBusy(null);
      }
    },
    [initial.slug, refresh, t],
  );

  const confirmClaim = () => {
    if (picking === null) return;
    const n = name.trim();
    if (n) remember(NAME_KEY, n);
    void act(picking, 'claim', n);
  };

  /** «يومان تقريباً» — مهلة مفهومة بلا ساعة رقمية تُقلق القارئ. */
  const untilText = (ms: number): string => {
    if (ms <= 0) return t.tExpired;
    const h = Math.floor(ms / 3600_000);
    const d = Math.floor(h / 24);
    if (d >= 1) return d === 1 ? t.tDay : fill(t.tDays, { n: N(d) });
    if (h >= 1) return h === 1 ? t.tHour : fill(t.tHours, { n: N(h) });
    return fill(t.tMinutes, { n: N(Math.max(1, Math.round(ms / 60_000))) });
  };

  const total = k.parts.length;
  const pct = Math.round((k.done / total) * 100);
  const shareUrl = useMemo(() => (typeof location === 'undefined' ? '' : location.href), []);
  const shareText = fill(t.shareText, { title: k.title });

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard refused — the link is in the address bar anyway */
    }
  };

  const mineOpen = k.parts.filter((p) => p.mine && p.status === 'held');
  const complete = k.done === total;

  return (
    <div className="kh">
      <div className="kh-progress" role="group" aria-label={t.progressAria}>
        <div className="kh-bar" aria-hidden="true">
          <span style={{ width: `${pct}%` }} />
        </div>
        <p className="kh-count">
          <strong>{fill(t.countDone, { done: N(k.done), total: N(total) })}</strong>
          <span className="kh-sub">
            {' · '}
            {fill(t.reading, { n: N(k.held) })}
            {' · '}
            {fill(t.free, { n: N(k.free) })}
          </span>
        </p>
      </div>

      {complete && (
        <p className="kh-complete">
          {t.completeMsg} <a href={base}>{t.completeLink}</a>
        </p>
      )}

      {mineOpen.length > 0 && (
        <p className="kh-mine-note">
          {fill(t.mineNote, { list: mineOpen.map((p) => N(p.n)).join('، ') })}
        </p>
      )}

      {err && (
        <p className="kh-err" role="alert">
          {err}
        </p>
      )}

      <ul className="kh-grid">
        {k.parts.map((p) => {
          const j = juzInfo(p.n, lang);
          const cls = p.mine && p.status === 'held' ? 'mine' : p.status;
          const statusWord =
            p.status === 'done' ? t.statusDone : p.status === 'held' ? t.statusHeld : t.statusFree;
          return (
            <li key={p.n} className={`kh-cell kh-${cls}`}>
              <button
                type="button"
                className="kh-face"
                disabled={busy === p.n || (p.status !== 'free' && !p.mine)}
                onClick={() => {
                  if (p.status === 'free') {
                    setPicking(p.n);
                    window.setTimeout(() => nameInput.current?.focus(), 30);
                  }
                }}
                aria-label={fill(t.juzAria, { n: N(p.n), name: j.name, status: statusWord })}
              >
                <span className="kh-n">{N(p.n)}</span>
                <span className="kh-name">{j.name}</span>
                <span className="kh-range">
                  {j.from} — {j.to}
                </span>
                {p.status === 'done' && <span className="kh-tag">{t.tagDone}</span>}
                {p.status === 'held' && !p.mine && (
                  <span className="kh-tag">{p.reader ? fill(t.tagHeldBy, { name: p.reader }) : t.tagHeld}</span>
                )}
                {p.status === 'held' && p.mine && (
                  <span className="kh-tag">{fill(t.tagMine, { time: untilText((p.expiresAt ?? 0) - Date.now()) })}</span>
                )}
                {p.status === 'free' && <span className="kh-tag kh-take">{t.tagTake}</span>}
              </button>

              {p.mine && p.status === 'held' && (
                <div className="kh-actions">
                  <a className="kh-read" href={juzReadHref(p.n, lang)} target="_blank" rel="noopener noreferrer">
                    {t.actRead}
                  </a>
                  <button type="button" onClick={() => void act(p.n, 'complete')} disabled={busy === p.n}>
                    {t.actDone}
                  </button>
                  <button
                    type="button"
                    className="kh-ghost"
                    onClick={() => void act(p.n, 'release')}
                    disabled={busy === p.n}
                  >
                    {t.actRelease}
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {picking !== null && (
        <div
          className="kh-modal"
          role="dialog"
          aria-modal="true"
          aria-label={fill(t.modalTitle, { n: N(picking), name: juzInfo(picking, lang).name })}
        >
          <div className="kh-sheet">
            <h3>{fill(t.modalTitle, { n: N(picking), name: juzInfo(picking, lang).name })}</h3>
            <p className="kh-hint">
              {fill(t.modalRange, { from: juzInfo(picking, lang).from, to: juzInfo(picking, lang).to })}
            </p>
            <label htmlFor="kh-name">{t.nameLabel}</label>
            <input
              id="kh-name"
              ref={nameInput}
              value={name}
              maxLength={32}
              placeholder={t.namePh}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') confirmClaim();
                if (e.key === 'Escape') setPicking(null);
              }}
            />
            <p className="kh-note">{fill(t.modalNote, { hold: holdLabel })}</p>
            <div className="kh-sheet-actions">
              <button type="button" onClick={confirmClaim} disabled={busy !== null}>
                {t.modalTake}
              </button>
              <button type="button" className="kh-ghost" onClick={() => setPicking(null)}>
                {t.modalCancel}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="kh-share">
        <p>{t.sharePrompt}</p>
        <div className="kh-share-row">
          <a
            className="kh-wa"
            href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.shareWa}
          </a>
          <button type="button" className="kh-ghost" onClick={() => void copy()}>
            {copied ? t.shareCopied : t.shareCopy}
          </button>
        </div>
      </div>
    </div>
  );
}
