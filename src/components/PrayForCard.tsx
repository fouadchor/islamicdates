import { useCallback, useEffect, useRef, useState } from 'react';
import type { Lang } from '../lib/data';
import { num } from '../lib/khatma-juz';
import type { CardT, Plurals, PrayErr } from '../lib/pray-for-i18n';
import type { RenderedDua } from '../lib/pray-for-duas';
import { track } from '../lib/track';

type Kind = 'deceased' | 'sick';
type Gender = 'm' | 'f';

interface PrayView {
  slug: string;
  name: string;
  kind: Kind;
  gender: Gender;
  prayers: number;
  total: number;
  prayed: boolean;
  /** When this browser may pray again (ms), or null if it can now. */
  againAt: number | null;
}

const ico = (d: string, size = 16, width = 2.2) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={width}
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d={d} />
  </svg>
);
const I_CHECK = 'M20 6 9 17l-5-5';
const I_LINK = 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71';
const I_SHARE = 'M18 8a3 3 0 1 0-2.83-4M6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm12 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8.6 13.5l6.8 4M15.4 6.5l-6.8 4';
// A heart — the same mark as the home-page tile and the link preview.
const I_HEART = 'M12 21s-7.5-4.6-9.4-9.3C1.2 8.2 3.4 4.5 7 4.5c2 0 3.4 1.1 5 3 1.6-1.9 3-3 5-3 3.6 0 5.8 3.7 4.4 7.2C19.5 16.4 12 21 12 21Z';
const I_COPY = 'M9 9h11v11H9zM5 15H4V4h11v1';
const I_TRASH = 'M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6';
const I_EDIT = 'M4 20h4L19 9l-4-4L4 16zM14 6l4 4';
const WhatsAppLogo = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const TOKEN_KEY = 'idk.pray.token';
const FONT_KEY = 'idk.pray.font';
const adminKeyName = (slug: string) => `idk.pray.admin.${slug}`;

/** Text size steps for the supplications — older relatives read these pages too. */
const FONT_STEPS = [0.9, 1, 1.12, 1.26, 1.42];

const store = {
  get(k: string): string | null {
    try {
      return localStorage.getItem(k);
    } catch {
      return null;
    }
  },
  set(k: string, v: string) {
    try {
      localStorage.setItem(k, v);
    } catch {
      /* storage blocked — a convenience lost, nothing more */
    }
  },
  del(k: string) {
    try {
      localStorage.removeItem(k);
    } catch {
      /* nothing to clean */
    }
  },
};

/** رمز عشوائي في هذا المتصفح وحده — حتى لا يُحسب دعاؤه أكثر من مرة في اليوم. */
function readerToken(): string {
  const cur = store.get(TOKEN_KEY);
  if (cur) return cur;
  const t = crypto.randomUUID().replace(/-/g, '');
  store.set(TOKEN_KEY, t);
  return t;
}

type Plural = 'zero' | 'one' | 'two' | 'few' | 'many' | 'other';
function plural(n: number, lang: Lang): Plural {
  if (n === 0) return 'zero';
  if (lang !== 'ar') return n === 1 ? 'one' : 'other';
  if (n === 1) return 'one';
  if (n === 2) return 'two';
  const m = n % 100;
  if (m >= 3 && m <= 10) return 'few';
  if (m >= 11 && m <= 99) return 'many';
  return 'other';
}

/** A plural template with its number bolded in place. */
function Counted({ n, forms, lang, className }: { n: number; forms: Plurals; lang: Lang; className?: string }) {
  const tpl = forms[plural(n, lang)] ?? forms.other;
  if (!tpl.includes('{n}')) return <span className={className}>{tpl}</span>;
  const [a, b] = tpl.split('{n}');
  return (
    <span className={className}>
      {a}
      <b className="pf-n">{num(n, lang)}</b>
      {b}
    </span>
  );
}

export interface PrayForCardProps {
  initial: PrayView;
  lang: Lang;
  t: CardT;
  duas: RenderedDua[];
  /** Canonical address built on the server — never location.href, which can carry ?new=1. */
  shareUrl: string;
  base: string;
  /** The creator's first visit, straight after creating the page. */
  isNew: boolean;
}

export default function PrayForCard({ initial, lang, t, duas, shareUrl, base, isNew }: PrayForCardProps) {
  const [p, setP] = useState<PrayView>(initial);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [justPrayed, setJustPrayed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedDua, setCopiedDua] = useState<string | null>(null);
  const [canShare, setCanShare] = useState(false);
  const [admin, setAdmin] = useState<string | null>(null);
  const [panel, setPanel] = useState<null | 'edit' | 'delete'>(null);
  const [edit, setEdit] = useState({ name: initial.name, kind: initial.kind, gender: initial.gender });
  const [deleted, setDeleted] = useState(false);
  const [font, setFont] = useState(1);
  const [actionInView, setActionInView] = useState(true);
  const [bump, setBump] = useState(0);
  const token = useRef('');
  const actionRef = useRef<HTMLDivElement>(null);
  const lastCount = useRef(initial.prayers);
  const kind = initial.kind;

  const refresh = useCallback(async () => {
    try {
      const r = await fetch(`/api/pray-for/${initial.slug}?token=${encodeURIComponent(token.current)}`, {
        headers: { accept: 'application/json' },
      });
      const j = await r.json();
      if (j?.ok) setP(j.page);
    } catch {
      /* offline — keep showing what we last knew */
    }
  }, [initial.slug]);

  useEffect(() => {
    setCanShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function');
    token.current = readerToken();
    setAdmin(store.get(adminKeyName(initial.slug)));
    const f = Number(store.get(FONT_KEY));
    if (FONT_STEPS.includes(f)) setFont(f);
    void refresh();
  }, [refresh, initial.slug]);

  // Others are praying while the page is open; re-read while it is in front.
  useEffect(() => {
    const tick = () => {
      if (document.visibilityState === 'visible') void refresh();
    };
    const id = window.setInterval(tick, 60_000);
    document.addEventListener('visibilitychange', tick);
    return () => {
      window.clearInterval(id);
      document.removeEventListener('visibilitychange', tick);
    };
  }, [refresh]);

  // A gentle pulse on the number whenever it grows.
  useEffect(() => {
    if (p.prayers > lastCount.current) setBump((b) => b + 1);
    lastCount.current = p.prayers;
  }, [p.prayers]);

  // The pray button follows the reader down the page once its own place has
  // scrolled away — whoever reads all the supplications should not have to
  // scroll back up to say they did.
  useEffect(() => {
    const el = actionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => setActionInView(e.isIntersecting || e.boundingClientRect.top > window.innerHeight), {
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const mode: 'new' | 'return' | 'today' | 'done' = justPrayed
    ? 'done'
    : !p.prayed
      ? 'new'
      : p.againAt === null
        ? 'return'
        : 'today';
  const sticky = (mode === 'new' || mode === 'return') && !actionInView && !deleted && panel === null;

  useEffect(() => {
    document.body.classList.toggle('pf-sticky-on', sticky);
    return () => document.body.classList.remove('pf-sticky-on');
  }, [sticky]);

  const prayNow = async () => {
    if (busy) return;
    setBusy(true);
    setErr('');
    try {
      const r = await fetch(`/api/pray-for/${initial.slug}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ action: 'pray', token: token.current }),
      });
      const j = await r.json();
      if (j?.ok) {
        setP(j.page);
        setJustPrayed(true);
        if (j.result === 'first' || j.result === 'again') track('prayfor_pray', { kind, lang, repeat: j.result === 'again' });
        // Bring the thanks — and the share buttons under it — into view.
        window.setTimeout(() => actionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 60);
      } else {
        setErr(t.err[(j?.code ?? 'generic') as PrayErr] ?? t.err.generic);
      }
    } catch {
      setErr(t.err.network);
    } finally {
      setBusy(false);
    }
  };

  const adminPost = async (payload: Record<string, unknown>) => {
    setBusy(true);
    setErr('');
    try {
      const r = await fetch(`/api/pray-for/${initial.slug}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...payload, adminKey: admin, token: token.current }),
      });
      const j = await r.json();
      if (!j?.ok) setErr(t.err[(j?.code ?? 'generic') as PrayErr] ?? t.err.generic);
      return j?.ok ? j : null;
    } catch {
      setErr(t.err.network);
      return null;
    } finally {
      setBusy(false);
    }
  };

  const saveEdit = async () => {
    const j = await adminPost({ action: 'edit', name: edit.name, kind: edit.kind, gender: edit.gender });
    if (!j) return;
    track('prayfor_edit', { kind: edit.kind, changed_kind: edit.kind !== kind, lang });
    // Every sentence on the page depends on the name, له/لها and the kind, and
    // the server words them; a reload is the honest way to show the new page.
    window.location.reload();
  };

  const remove = async () => {
    const j = await adminPost({ action: 'delete' });
    if (!j) return;
    store.del(adminKeyName(initial.slug));
    track('prayfor_delete', { kind, lang });
    document.querySelectorAll('[data-pf-hero], .pf-reminder').forEach((el) => el.remove());
    setDeleted(true);
  };

  const setFontStep = (dir: 1 | -1) => {
    const i = Math.max(0, Math.min(FONT_STEPS.length - 1, FONT_STEPS.indexOf(font) + dir));
    setFont(FONT_STEPS[i]);
    store.set(FONT_KEY, String(FONT_STEPS[i]));
  };

  const copyLink = async (where: string) => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      track('prayfor_share', { method: 'copy', where, kind, lang });
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard refused — the link is in the address bar */
    }
  };

  const nativeShare = async (where: string) => {
    try {
      await navigator.share({ title: document.title, text: t.shareText, url: shareUrl });
      track('prayfor_share', { method: 'native', where, kind, lang });
    } catch {
      /* sheet closed */
    }
  };

  const copyDuaText = async (d: RenderedDua) => {
    try {
      await navigator.clipboard.writeText(d.text.replace(/[⁦-⁩]/g, ''));
      track('prayfor_copy', { dua: d.id, kind, lang });
      setCopiedDua(d.id);
      window.setTimeout(() => setCopiedDua(null), 2000);
    } catch {
      /* clipboard refused */
    }
  };

  /**
   * The person's name, picked out where it stands as a word of its own inside a
   * supplication («اللهم إنّ فاطمة في ذمتك»). Where it is fused to a letter
   * («لِلوالد») it is left alone: a colour change mid-word can break the cursive
   * join in some browsers.
   */
  const withName = (text: string) => {
    const n = initial.name;
    const i = text.indexOf(n);
    const before = i > 0 ? text[i - 1] : ' ';
    if (i < 0 || (before !== ' ' && before !== '\u2068')) return text;
    return (
      <>
        {text.slice(0, i)}
        <span className="pf-the-name">{n}</span>
        {text.slice(i + n.length)}
      </>
    );
  };

  const waHref = `https://wa.me/?text=${encodeURIComponent(`${t.shareText}\n${shareUrl}`)}`;
  const shareRow = (where: string, big = false) => (
    <div className={`pf-share-row${big ? ' is-big' : ''}`}>
      <a className="pf-wa" href={waHref} target="_blank" rel="noopener noreferrer"
        onClick={() => track('prayfor_share', { method: 'whatsapp', where, kind, lang })}>
        <WhatsAppLogo size={big ? 20 : 18} />
        {t.shareWa}
      </a>
      {canShare && (
        <button type="button" className="pf-btn-soft" onClick={() => void nativeShare(where)}>
          {ico(I_SHARE)}
          {t.shareNative}
        </button>
      )}
      <button type="button" className="pf-btn-soft" onClick={() => void copyLink(where)}>
        {ico(copied ? I_CHECK : I_LINK)}
        {copied ? t.shareCopied : t.shareCopy}
      </button>
    </div>
  );

  const duaCard = (d: RenderedDua, featured = false) => (
    <article key={d.id} className={`pf-dua${featured ? ' is-featured' : ''}`}>
      {!featured && (
        <div className="pf-dua-head">
          <h3 className="pf-when">{d.when}</h3>
          {d.count && <span className="pf-times">×{num(d.count, lang)}</span>}
        </div>
      )}
      <p className="pf-text" dir="rtl" lang="ar">{withName(d.text)}</p>
      {featured && d.count && <p className="pf-times-line">×{num(d.count, lang)}</p>}
      {d.meaning && <p className="pf-meaning">{withName(d.meaning)}</p>}
      <div className="pf-dua-foot">
        <span className="pf-src">
          {featured && <>{d.when} · </>}
          {d.src}
        </span>
        <button type="button" className="pf-copy" onClick={() => void copyDuaText(d)} aria-label={t.copyDua}>
          {ico(copiedDua === d.id ? I_CHECK : I_COPY, 14)}
          <span>{copiedDua === d.id ? t.copiedDua : t.copyDua}</span>
        </button>
      </div>
    </article>
  );

  if (deleted) {
    return (
      <div className="pf pf-deleted">
        <p className="pf-deleted-msg">{t.deleted}</p>
        <a className="pf-new-link" href={base}>{t.createNew}</a>
      </div>
    );
  }

  const [featured, ...more] = duas;
  const showCreator = isNew && !!admin;
  const prayButton = (label: string, inBar = false) => (
    <button type="button" className={`pf-pray${inBar ? ' in-bar' : ''}`} onClick={() => void prayNow()} disabled={busy}>
      {ico(I_HEART, inBar ? 20 : 22, 2)}
      {busy ? t.praying : label}
    </button>
  );

  return (
    <div className={`pf pf-k-${p.kind}`} style={{ ['--pf-fs' as string]: String(font) }}>
      {showCreator && (
        <div className="pf-creator" role="status">
          <p className="pf-creator-h">
            <span className="pf-creator-ic" aria-hidden="true">{ico(I_CHECK, 16, 3)}</span>
            {t.newH}
          </p>
          <p className="pf-creator-p">{t.newP}</p>
          {shareRow('new', true)}
          <p className="pf-creator-p pf-creator-first">{t.newPrayFirst}</p>
        </div>
      )}

      <p className={`pf-count${p.prayers === 0 ? ' is-zero' : ''}`} aria-live="polite">
        <span className="pf-count-ic" key={bump} aria-hidden="true">{ico(I_HEART, 18, 2.2)}</span>
        <Counted n={p.prayers} forms={t.count} lang={lang} />
        {p.total > p.prayers && (
          <>
            <span className="pf-dot" aria-hidden="true">·</span>
            <Counted n={p.total} forms={t.total} lang={lang} className="pf-count-sub" />
          </>
        )}
        {p.prayed && p.prayers > 0 && (
          <>
            <span className="pf-dot" aria-hidden="true">·</span>
            <span className="pf-count-sub">{t.youToo}</span>
          </>
        )}
      </p>

      {featured && (
        <section className="pf-feature" aria-labelledby="pf-feature-h">
          <div className="pf-feature-top">
            <h2 id="pf-feature-h" className="pf-feature-h">{t.featuredH}</h2>
            <div className="pf-font" role="group">
              <button type="button" onClick={() => setFontStep(-1)} disabled={font === FONT_STEPS[0]} aria-label={t.fontSmaller} title={t.fontSmaller}>
                <span className="pf-a-sm">A</span>−
              </button>
              <button type="button" onClick={() => setFontStep(1)} disabled={font === FONT_STEPS[FONT_STEPS.length - 1]} aria-label={t.fontLarger} title={t.fontLarger}>
                <span className="pf-a-lg">A</span>+
              </button>
            </div>
          </div>
          {duaCard(featured, true)}
        </section>
      )}

      <div className="pf-act" ref={actionRef}>
        {err && <p className="pf-err" role="alert">{err}</p>}

        {mode === 'new' && (
          <>
            {prayButton(t.pray)}
            <p className="pf-hint">{t.prayHint}</p>
          </>
        )}

        {mode === 'return' && (
          <>
            <p className="pf-return">{t.returnHint}</p>
            {prayButton(t.prayAgain)}
          </>
        )}

        {mode === 'today' && (
          <div className="pf-today">
            <span className="pf-today-pill">
              {ico(I_CHECK, 18, 2.6)}
              {t.prayedToday}
            </span>
            <p className="pf-hint">{t.comeBack}</p>
          </div>
        )}

        {mode === 'done' && (
          <div className="pf-done" role="status">
            <svg className="pf-done-mark" viewBox="0 0 52 52" width="56" height="56" aria-hidden="true">
              <circle cx="26" cy="26" r="24" fill="none" stroke="currentColor" strokeWidth="2.5" />
              <path d="M15 27l7.5 7.5L38 19" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="pf-done-h">{t.doneTitle}</p>
            <blockquote className="pf-done-q">
              <p lang={lang === 'en' ? 'en' : undefined}>{t.doneHadith}</p>
              <cite>{t.doneHadithSrc}</cite>
            </blockquote>
            <p className="pf-hint">{t.comeBack}</p>
            <div className="pf-share pf-share-after">
              <p>{t.shareAfter}</p>
              {shareRow('after', true)}
            </div>
          </div>
        )}
      </div>

      {mode !== 'done' && !showCreator && (
        <div className="pf-share">
          <p>{t.sharePrompt}</p>
          {shareRow('page')}
        </div>
      )}

      {more.length > 0 && (
        <section className="pf-more" aria-labelledby="pf-more-h">
          <h2 id="pf-more-h" className="section-h2">{t.moreH}</h2>
          <div className="pf-more-list">
            {more.map((d) => duaCard(d))}
          </div>
        </section>
      )}

      {admin && (
        <div className="pf-admin">
          {panel === null && (
            <div className="pf-admin-row">
              <span>{t.adminLead}</span>
              <span className="pf-admin-btns">
                <button type="button" onClick={() => { setErr(''); setEdit({ name: p.name, kind: p.kind, gender: p.gender }); setPanel('edit'); }}>
                  {ico(I_EDIT, 15)}
                  {t.adminEdit}
                </button>
                <button type="button" className="is-danger" onClick={() => { setErr(''); setPanel('delete'); }}>
                  {ico(I_TRASH, 15)}
                  {t.adminDelete}
                </button>
              </span>
            </div>
          )}

          {panel === 'edit' && (
            <form className="pf-edit" onSubmit={(e) => { e.preventDefault(); void saveEdit(); }}>
              <p className="pf-edit-h">{t.editH}</p>
              <label htmlFor="pf-edit-name">{t.editName}</label>
              <input id="pf-edit-name" type="text" maxLength={60} value={edit.name} required
                onChange={(e) => setEdit({ ...edit, name: e.target.value })} />
              <fieldset>
                <legend>{t.editKind}</legend>
                <div className="pf-seg">
                  {(['deceased', 'sick'] as const).map((k) => (
                    <label key={k}>
                      <input type="radio" name="pf-edit-kind" value={k} checked={edit.kind === k}
                        onChange={() => setEdit({ ...edit, kind: k })} />
                      <span>{t.kinds[k]}</span>
                    </label>
                  ))}
                </div>
                {kind === 'sick' && <p className="pf-edit-hint">{t.editKindHint}</p>}
              </fieldset>
              <fieldset>
                <legend>{t.editGender}</legend>
                <div className="pf-seg">
                  {(['m', 'f'] as const).map((g) => (
                    <label key={g}>
                      <input type="radio" name="pf-edit-gender" value={g} checked={edit.gender === g}
                        onChange={() => setEdit({ ...edit, gender: g })} />
                      <span>{t.genders[g]}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              {err && <p className="pf-err" role="alert">{err}</p>}
              <div className="pf-edit-btns">
                <button type="submit" className="pf-btn-main" disabled={busy || !edit.name.trim()}>
                  {busy ? t.editSaving : t.editSave}
                </button>
                <button type="button" className="pf-btn-soft" onClick={() => setPanel(null)}>{t.cancel}</button>
              </div>
            </form>
          )}

          {panel === 'delete' && (
            <div className="pf-confirm" role="alertdialog" aria-labelledby="pf-del-warn">
              <p id="pf-del-warn">{t.deleteWarn}</p>
              {err && <p className="pf-err" role="alert">{err}</p>}
              <div className="pf-edit-btns">
                <button type="button" className="pf-btn-danger" onClick={() => void remove()} disabled={busy}>
                  {ico(I_TRASH, 15)}
                  {t.deleteYes}
                </button>
                <button type="button" className="pf-btn-soft" onClick={() => setPanel(null)}>{t.cancel}</button>
              </div>
            </div>
          )}
        </div>
      )}

      {sticky && (
        <div className="pf-bar">
          <div className="pf-bar-in">{prayButton(mode === 'return' ? t.prayAgain : t.pray, true)}</div>
        </div>
      )}
    </div>
  );
}
