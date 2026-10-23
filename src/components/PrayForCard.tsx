import { useCallback, useEffect, useRef, useState } from 'react';
import type { Lang } from '../lib/data';
import { num } from '../lib/khatma-juz';
import type { CardT, PrayErr } from '../lib/pray-for-i18n';
import type { RenderedDua } from '../lib/pray-for-duas';
import { track } from '../lib/track';

interface PrayView {
  slug: string;
  name: string;
  kind: 'deceased' | 'sick';
  gender: 'm' | 'f';
  prayers: number;
  prayed: boolean;
}

const ico = (d: string, size = 16) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d={d} />
  </svg>
);
const I_CHECK = 'M20 6 9 17l-5-5';
const I_LINK = 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71';
const I_SHARE = 'M18 8a3 3 0 1 0-2.83-4M6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm12 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8.6 13.5l6.8 4M15.4 6.5l-6.8 4';
// A heart — the same mark as the home-page tile and the link preview.
const I_HEART = 'M12 21s-7.5-4.6-9.4-9.3C1.2 8.2 3.4 4.5 7 4.5c2 0 3.4 1.1 5 3 1.6-1.9 3-3 5-3 3.6 0 5.8 3.7 4.4 7.2C19.5 16.4 12 21 12 21Z';
const I_TRASH = 'M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6';
const WhatsAppLogo = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const TOKEN_KEY = 'idk.pray.token';
const adminKeyName = (slug: string) => `idk.pray.admin.${slug}`;

/** رمز عشوائي في هذا المتصفح وحده — حتى لا يُحسب دعاؤه مرتين. */
function readerToken(): string {
  try {
    const cur = localStorage.getItem(TOKEN_KEY);
    if (cur) return cur;
    const t = crypto.randomUUID().replace(/-/g, '');
    localStorage.setItem(TOKEN_KEY, t);
    return t;
  } catch {
    // Storage blocked: a per-visit token still lets this press count once.
    return crypto.randomUUID().replace(/-/g, '');
  }
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

export interface PrayForCardProps {
  initial: PrayView;
  lang: Lang;
  t: CardT;
  duas: RenderedDua[];
  duasH: string;
  /** Canonical address built on the server — never location.href, which can carry ?new=1. */
  shareUrl: string;
  base: string;
}

export default function PrayForCard({ initial, lang, t, duas, duasH, shareUrl, base }: PrayForCardProps) {
  const [p, setP] = useState<PrayView>(initial);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [justPrayed, setJustPrayed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);
  const [admin, setAdmin] = useState<string | null>(null);
  const [deleted, setDeleted] = useState(false);
  const token = useRef('');
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
    try {
      setAdmin(localStorage.getItem(adminKeyName(initial.slug)));
    } catch {
      /* storage blocked: no delete button, which is the safe default */
    }
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

  const prayNow = async () => {
    if (busy || p.prayed) return;
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
        if (j.counted) track('prayfor_pray', { kind, lang });
      } else {
        setErr(t.err[(j?.code ?? 'generic') as PrayErr] ?? t.err.generic);
      }
    } catch {
      setErr(t.err.network);
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    if (!admin || !window.confirm(t.adminConfirm)) return;
    setBusy(true);
    setErr('');
    try {
      const r = await fetch(`/api/pray-for/${initial.slug}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ action: 'delete', adminKey: admin }),
      });
      const j = await r.json();
      if (j?.ok) {
        try {
          localStorage.removeItem(adminKeyName(initial.slug));
        } catch {
          /* nothing to clean */
        }
        track('prayfor_delete', { kind, lang });
        setDeleted(true);
      } else {
        setErr(t.err[(j?.code ?? 'generic') as PrayErr] ?? t.err.generic);
      }
    } catch {
      setErr(t.err.network);
    } finally {
      setBusy(false);
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      track('prayfor_share', { method: 'copy', kind, lang });
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard refused — the link is in the address bar */
    }
  };

  const nativeShare = async () => {
    try {
      await navigator.share({ title: document.title, text: t.shareText, url: shareUrl });
      track('prayfor_share', { method: 'native', kind, lang });
    } catch {
      /* sheet closed */
    }
  };

  if (deleted) {
    return (
      <div className="pf pf-deleted">
        <p className="pf-deleted-msg">{t.adminDeleted}</p>
        <a className="pf-new-link" href={base}>{t.createNew}</a>
      </div>
    );
  }

  const cat = plural(p.prayers, lang);
  const template = t.count[cat] ?? t.count.other;
  const [before, after] = template.includes('{n}') ? template.split('{n}') : [template, ''];
  const hasNum = template.includes('{n}');

  return (
    <div className="pf">
      <div className={`pf-tally${p.prayers === 0 ? ' pf-tally-zero' : ''}`} aria-live="polite">
        <span className="pf-tally-ic" aria-hidden="true">{ico(I_HEART, 26)}</span>
        <p>
          {before}
          {hasNum && <b className="pf-n">{num(p.prayers, lang)}</b>}
          {after}
        </p>
      </div>

      <h2 className="section-h2 pf-duas-h">{duasH}</h2>
      <ol className="pf-duas">
        {duas.map((d, i) => (
          <li key={d.id} className="pf-dua">
            <div className="pf-dua-head">
              <span className="pf-dua-n" aria-hidden="true">{num(i + 1, lang)}</span>
              <h3 className="pf-when">{d.when}</h3>
              {d.count && <span className="pf-times">×{num(d.count, lang)}</span>}
            </div>
            <p className="pf-text" dir="rtl" lang="ar">{d.text}</p>
            {d.meaning && <p className="pf-meaning">{d.meaning}</p>}
            <p className="pf-src">{d.src}</p>
          </li>
        ))}
      </ol>

      <div className="pf-act">
        {err && <p className="pf-err" role="alert">{err}</p>}
        <button type="button" className={`pf-pray${p.prayed ? ' is-done' : ''}`} onClick={() => void prayNow()}
          disabled={busy || p.prayed} aria-pressed={p.prayed}>
          {ico(p.prayed ? I_CHECK : I_HEART, p.prayed ? 20 : 22)}
          {busy ? t.praying : t.pray}
        </button>
        {!p.prayed && <p className="pf-hint">{t.prayHint}</p>}
        {p.prayed && justPrayed && <p className="pf-thanks">{t.thanks}</p>}
      </div>

      <div className="pf-share">
        {!(p.prayed && justPrayed) && <p>{t.sharePrompt}</p>}
        <div className="pf-share-row">
          <a className="pf-wa" href={`https://wa.me/?text=${encodeURIComponent(`${t.shareText} ${shareUrl}`)}`}
            target="_blank" rel="noopener noreferrer"
            onClick={() => track('prayfor_share', { method: 'whatsapp', kind, lang })}>
            <WhatsAppLogo />
            {t.shareWa}
          </a>
          {canShare && (
            <button type="button" onClick={() => void nativeShare()}>
              {ico(I_SHARE)}
              {t.shareNative}
            </button>
          )}
          <button type="button" className="pf-ghost" onClick={() => void copy()}>
            {ico(copied ? I_CHECK : I_LINK)}
            {copied ? t.shareCopied : t.shareCopy}
          </button>
        </div>
      </div>

      {admin && (
        <div className="pf-admin">
          <span>{t.adminLead}</span>
          <button type="button" onClick={() => void remove()} disabled={busy}>
            {ico(I_TRASH, 15)}
            {t.adminDelete}
          </button>
        </div>
      )}
    </div>
  );
}
