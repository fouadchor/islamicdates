import { useState, useEffect } from 'react';
import { g2h, todayUTC } from '../lib/hijri';
import { H_MON_AR, H_MON_EN, G_MON_AR, G_MON_EN, WD_AR, WD_EN } from '../lib/data';

// Standalone widget shown inside an <iframe> on other websites.
// Reads ?lang=ar|en and ?theme=light|dark|auto from the URL, computes today client-side.
export default function EmbedIsland() {
  const [st, setSt] = useState<{ ready: boolean; ar: boolean; dark: boolean; hij: string; greg: string }>({ ready: false, ar: true, dark: false, hij: '', greg: '' });

  useEffect(() => {
    const p = new URLSearchParams(location.search);
    const ar = p.get('lang') !== 'en';
    let theme = p.get('theme') || 'light';
    if (theme === 'auto') theme = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
    const dark = theme === 'dark';

    const d = todayUTC();
    const h = g2h(d);
    const wd = ar ? WD_AR : WD_EN;
    const hMon = ar ? H_MON_AR : H_MON_EN;
    const gMon = ar ? G_MON_AR : G_MON_EN;
    const hij = `${wd[d.getUTCDay()]}${ar ? '، ' : ', '}${h.d} ${hMon[h.m - 1]} ${h.y} ${ar ? 'هـ' : 'AH'}`;
    const greg = `${d.getUTCDate()} ${gMon[d.getUTCMonth()]} ${d.getUTCFullYear()} ${ar ? 'م' : 'CE'}`;
    setSt({ ready: true, ar, dark, hij, greg });
  }, []);

  if (!st.ready) return null;
  const { ar, dark, hij, greg } = st;
  const bg = dark ? '#0f2730' : '#ffffff';
  const text = dark ? '#f2f7f9' : '#0f2730';
  const muted = dark ? '#9bb0b8' : '#5b7682';
  const border = dark ? 'rgba(255,255,255,.12)' : '#e3eaef';
  const accent = '#0d9488';

  return (
    <div dir={ar ? 'rtl' : 'ltr'} style={{ fontFamily: "system-ui, -apple-system, 'Segoe UI', Tahoma, Arial, sans-serif" }}>
      <div style={{ maxWidth: 360, margin: '0 auto', background: bg, border: `1px solid ${border}`, borderRadius: 16, padding: '16px 18px', boxShadow: '0 1px 2px rgba(13,40,48,.06), 0 8px 24px rgba(13,40,48,.06)', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <span aria-hidden="true" style={{ width: 34, height: 34, flex: '0 0 auto', borderRadius: 10, background: accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, lineHeight: 1 }}>☾</span>
          <span style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: '.04em', color: muted }}>{ar ? 'التقويم الهجري اليوم' : "Today's Hijri date"}</span>
        </div>
        <div style={{ fontSize: 'clamp(17px,5vw,21px)', fontWeight: 800, color: text, lineHeight: 1.35 }}>{hij}</div>
        <div style={{ fontSize: 13.5, color: muted, marginTop: 4 }}>{greg}</div>
        <a href="https://islamicdates.org/" target="_blank" rel="noopener" style={{ display: 'inline-block', marginTop: 12, fontSize: 12, fontWeight: 700, color: accent, textDecoration: 'none' }}>islamicdates.org ↗</a>
      </div>
    </div>
  );
}
