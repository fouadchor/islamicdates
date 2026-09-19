import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { JUZ, juzReadHref, type PartStatus } from '../lib/khatma';

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

/** «يومان و٣ ساعات» — مهلة مفهومة بلا ساعة رقمية تُقلق القارئ. */
function untilText(ms: number): string {
  if (ms <= 0) return 'انتهت المهلة';
  const h = Math.floor(ms / 3600_000);
  const d = Math.floor(h / 24);
  if (d >= 1) return d === 1 ? 'يوم تقريباً' : `${d} أيام تقريباً`;
  if (h >= 1) return h === 1 ? 'ساعة تقريباً' : `${h} ساعات تقريباً`;
  return `${Math.max(1, Math.round(ms / 60_000))} دقيقة`;
}

export default function KhatmaGrid({ initial }: { initial: KhatmaView }) {
  const [k, setK] = useState<KhatmaView>(initial);
  const [busy, setBusy] = useState<number | null>(null);
  const [err, setErr] = useState<string>('');
  const [picking, setPicking] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [copied, setCopied] = useState(false);
  const token = useRef<string>('');
  const nameInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    token.current = readerToken();
    setName(recall(NAME_KEY));
    // The server rendered this page without knowing who is looking at it, so the
    // "mine" flags are all false until we re-ask with this browser's token.
    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // Other readers are claiming parts while this page is open; re-read when the
  // tab is in front, and stop entirely when it is not.
  useEffect(() => {
    let id: number | undefined;
    const tick = () => {
      if (document.visibilityState === 'visible') void refresh();
    };
    const start = () => {
      stop();
      id = window.setInterval(tick, 30_000);
    };
    const stop = () => {
      if (id) window.clearInterval(id);
      id = undefined;
    };
    start();
    document.addEventListener('visibilitychange', tick);
    return () => {
      stop();
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
          setErr(j?.error ?? 'تعذّر إتمام الطلب.');
          void refresh();
        }
      } catch {
        setErr('تعذّر الاتصال. تحقّق من الشبكة وأعد المحاولة.');
      } finally {
        setBusy(null);
      }
    },
    [initial.slug, refresh],
  );

  const confirmClaim = () => {
    if (picking === null) return;
    const n = name.trim();
    if (n) remember(NAME_KEY, n);
    void act(picking, 'claim', n);
  };

  const pct = Math.round((k.done / k.parts.length) * 100);
  const shareUrl = useMemo(() => (typeof location === 'undefined' ? '' : location.href), []);
  const shareText = `شاركنا في ختمة «${k.title}» — اختر جزءاً واقرأه:`;

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
  const complete = k.done === k.parts.length;

  return (
    <div className="kh">
      <div className="kh-progress" role="group" aria-label="تقدّم الختمة">
        <div className="kh-bar" aria-hidden="true">
          <span style={{ width: `${pct}%` }} />
        </div>
        <p className="kh-count">
          <strong>
            {k.done}/{k.parts.length}
          </strong>{' '}
          جزءاً مكتملاً
          <span className="kh-sub">
            {' · '}
            {k.held} قيد القراءة{' · '}
            {k.free} متاح
          </span>
        </p>
      </div>

      {complete && (
        <p className="kh-complete">
          اكتملت أجزاء الختمة الثلاثون. تقبّل الله من كل قارئ ما قرأ.{' '}
          <a href="/khatma/">ابدأ ختمة جديدة</a>
        </p>
      )}

      {mineOpen.length > 0 && (
        <p className="kh-mine-note">
          بين يديك {mineOpen.length === 1 ? 'جزء' : `${mineOpen.length} أجزاء`}: {mineOpen.map((p) => p.n).join('، ')}.
          اضغط «أتممت القراءة» عند الانتهاء ليُحتسب في العدّاد.
        </p>
      )}

      {err && (
        <p className="kh-err" role="alert">
          {err}
        </p>
      )}

      <ul className="kh-grid">
        {k.parts.map((p) => {
          const j = JUZ[p.n - 1];
          const cls = p.mine && p.status === 'held' ? 'mine' : p.status;
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
                aria-label={`الجزء ${p.n} — ${j.name} — ${
                  p.status === 'done' ? 'مقروء' : p.status === 'held' ? 'قيد القراءة' : 'متاح'
                }`}
              >
                <span className="kh-n">{p.n}</span>
                <span className="kh-name">{j.name}</span>
                <span className="kh-range">
                  {j.from} — {j.to}
                </span>
                {p.status === 'done' && <span className="kh-tag">مقروء</span>}
                {p.status === 'held' && !p.mine && (
                  <span className="kh-tag">{p.reader ? `مع ${p.reader}` : 'قيد القراءة'}</span>
                )}
                {p.status === 'held' && p.mine && (
                  <span className="kh-tag">
                    لك · {untilText((p.expiresAt ?? 0) - Date.now())}
                  </span>
                )}
                {p.status === 'free' && <span className="kh-tag kh-take">خذ هذا الجزء</span>}
              </button>

              {p.mine && p.status === 'held' && (
                <div className="kh-actions">
                  <a className="kh-read" href={juzReadHref(p.n)} target="_blank" rel="noopener noreferrer">
                    اقرأ الجزء
                  </a>
                  <button type="button" onClick={() => void act(p.n, 'complete')} disabled={busy === p.n}>
                    أتممت القراءة
                  </button>
                  <button
                    type="button"
                    className="kh-ghost"
                    onClick={() => void act(p.n, 'release')}
                    disabled={busy === p.n}
                  >
                    إرجاع
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {picking !== null && (
        <div className="kh-modal" role="dialog" aria-modal="true" aria-label={`حجز الجزء ${picking}`}>
          <div className="kh-sheet">
            <h3>
              الجزء {picking} — {JUZ[picking - 1].name}
            </h3>
            <p className="kh-hint">
              {JUZ[picking - 1].from} إلى {JUZ[picking - 1].to}
            </p>
            <label htmlFor="kh-name">اسمك (اختياري)</label>
            <input
              id="kh-name"
              ref={nameInput}
              value={name}
              maxLength={32}
              placeholder="يظهر بجانب الجزء — اتركه فارغاً لتبقى «مشارك»"
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') confirmClaim();
                if (e.key === 'Escape') setPicking(null);
              }}
            />
            <p className="kh-note">
              القراءة تكون باللسان لا بمجرّد النظر. أمامك {k.holdHours >= 24 ? `${Math.round(k.holdHours / 24)} يوم` : `${k.holdHours} ساعة`}
              {' '}لقراءته، وبعدها يعود للمجموعة تلقائياً حتى لا تتوقّف الختمة.
            </p>
            <div className="kh-sheet-actions">
              <button type="button" onClick={confirmClaim} disabled={busy !== null}>
                خذ الجزء
              </button>
              <button type="button" className="kh-ghost" onClick={() => setPicking(null)}>
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="kh-share">
        <p>شارك الرابط ليأخذ غيرك بقيّة الأجزاء:</p>
        <div className="kh-share-row">
          <a
            className="kh-wa"
            href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            مشاركة على واتساب
          </a>
          <button type="button" className="kh-ghost" onClick={() => void copy()}>
            {copied ? 'تم نسخ الرابط' : 'نسخ الرابط'}
          </button>
        </div>
      </div>
    </div>
  );
}
