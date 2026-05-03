/* Byron Floor Cleaning · interactive prototype
   Three-page site: Home / Services / Estimate
   Visual variants: modern-premium · dark-luxury · clean-light
*/

const { useState, useEffect, useRef, useMemo } = React;

// ---------- design tokens per visual variant ----------
const variantTokens = {
  'modern-premium': {
    name: 'Modern Premium',
    bg: '#FAF8F3',
    surface: '#FFFFFF',
    ink: '#0F1115',
    ink2: '#272A31',
    muted: '#5A6068',
    line: '#E7E4DC',
    lineStrong: '#D6D2C8',
    heroBg: '#0F1115',
    heroInk: '#FAF8F3',
    heroSub: '#C8C2B4',
    btnBg: '#0F1115',
    btnFg: '#FFFFFF',
    btnAlt: 'transparent',
    btnAltFg: '#0F1115',
    btnAltBorder: '#0F1115',
    accentText: '#8A6420',
    titleFont: "'Fraunces', Georgia, serif",
    bodyFont: "'Inter', system-ui, sans-serif",
  },
  'dark-luxury': {
    name: 'Dark Luxury',
    bg: '#0B0C10',
    surface: '#15171C',
    ink: '#F4EFE2',
    ink2: '#D8D2C2',
    muted: '#8B8576',
    line: '#26262B',
    lineStrong: '#3A3A40',
    heroBg: '#0B0C10',
    heroInk: '#F4EFE2',
    heroSub: '#B5AE9C',
    btnBg: '#B8893A',
    btnFg: '#0B0C10',
    btnAlt: 'transparent',
    btnAltFg: '#F4EFE2',
    btnAltBorder: '#B8893A',
    accentText: '#D7A653',
    titleFont: "'Fraunces', Georgia, serif",
    bodyFont: "'Inter', system-ui, sans-serif",
  },
  'clean-light': {
    name: 'Clean Light',
    bg: '#FFFFFF',
    surface: '#F6F4EE',
    ink: '#111316',
    ink2: '#3A3F46',
    muted: '#6B7079',
    line: '#EDEAE2',
    lineStrong: '#DAD5C8',
    heroBg: '#F6F4EE',
    heroInk: '#111316',
    heroSub: '#3A3F46',
    btnBg: '#111316',
    btnFg: '#FFFFFF',
    btnAlt: 'transparent',
    btnAltFg: '#111316',
    btnAltBorder: '#111316',
    accentText: '#9A6F1F',
    titleFont: "'Inter', system-ui, sans-serif",
    bodyFont: "'Inter', system-ui, sans-serif",
  },
};

// ---------- shared content ----------
const SERVICES = [
  { slug: 'strip-wax', name: 'Strip & Wax', short: 'VCT, deep refinish',
    body: 'Old wax and ground-in grime stripped down to bare tile, then sealed with multiple coats of commercial-grade high-gloss wax. The full reset.', timeline: '1 night for a typical office' },
  { slug: 'tile-grout', name: 'Tile & Grout', short: 'Restore the color of dingy grout lines',
    body: 'Deep cleaning that pulls embedded dirt out of grout and brings tile back to its original color, without the chemical fumes of harsh restorers.', timeline: '1 day for a kitchen / bathroom' },
  { slug: 'vinyl', name: 'Vinyl Floor Care', short: 'Gentle, no surface damage',
    body: 'Cleaning and finishing tuned for vinyl, so you get the gloss back without scratching, hazing, or stripping the protective layer.', timeline: '1 day for a typical home' },
  { slug: 'recurring', name: 'Recurring Maintenance', short: 'Monthly or quarterly',
    body: "We come back on a schedule that keeps floors looking new, without the cost of a full strip & wax every year. Most clients save money in year two.", timeline: 'Ongoing' },
  { slug: 'deep-clean', name: 'One-Time Deep Clean', short: 'For floors that have been let go',
    body: 'A complete reset for floors that have been neglected. Perfect before a move-in, an inspection, or a busy season. One visit, one bill, big difference.', timeline: '1 to 2 days' },
];

const FAQ = [
  { q: 'How much does it cost?', a: 'Every floor is different. Pricing depends on square footage, condition, and floor type, which is why we come out and look in person. Request a free estimate and we will reach out within 24 hours to schedule a site visit.' },
  { q: 'How long does a job take?', a: 'A typical office or classroom is one overnight. Larger jobs are scheduled in sections so you can keep operating.' },
  { q: 'Will the smell linger?', a: 'No. We use commercial-grade products that dry quickly and air out. Floors are walkable within a few hours.' },
  { q: 'Do you work weekends and overnights?', a: 'Yes. Most commercial jobs happen overnight or on weekends so we don\u2019t disrupt your business.' },
  { q: 'Do you do residential homes?', a: 'Yes. Kitchens, basements, sunrooms, and any vinyl, tile, or VCT in the home.' },
  { q: 'What areas of NJ do you cover?', a: 'All of New Jersey. If you\u2019re outside our usual route, ask anyway. We travel for larger jobs.' },
];

const BEFORE_AFTER = [
  { id: 1, caption: 'Office hallway · Plainfield, NJ', detail: 'VCT · strip & wax · 1 night',
    beforeHue: 32, beforeL: 38, afterHue: 32, afterL: 78 },
  { id: 2, caption: 'School classroom · Edison, NJ', detail: 'VCT · strip, wax, 4 coats · weekend',
    beforeHue: 28, beforeL: 42, afterHue: 28, afterL: 82 },
  { id: 3, caption: 'Retail showroom · New Brunswick, NJ', detail: 'Tile · deep clean & seal · 1 day',
    beforeHue: 24, beforeL: 36, afterHue: 24, afterL: 80 },
];

// ---------- icon set (simple line glyphs) ----------
const Icon = ({ name, size = 22 }) => {
  const s = size, p = { width: s, height: s, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'phone': return <svg {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>;
    case 'msg': return <svg {...p}><path d="M4 5h16v11H8l-4 4z"/></svg>;
    case 'mail': return <svg {...p}><rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="M3 7l9 7 9-7"/></svg>;
    case 'check': return <svg {...p}><path d="M5 13l4 4L19 7"/></svg>;
    case 'arrow': return <svg {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case 'star': return <svg {...p}><path d="M12 3l2.6 5.5 6 .9-4.4 4.2 1.1 6L12 16.8 6.7 19.6l1.1-6L3.4 9.4l6-.9z"/></svg>;
    case 'shield': return <svg {...p}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/></svg>;
    case 'clock': return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case 'home': return <svg {...p}><path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z"/></svg>;
    case 'building': return <svg {...p}><rect x="4" y="3" width="16" height="18"/><path d="M9 8h2M13 8h2M9 12h2M13 12h2M9 16h2M13 16h2"/></svg>;
    case 'sparkle': return <svg {...p}><path d="M12 3v6M12 15v6M3 12h6M15 12h6M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3"/></svg>;
    case 'menu': return <svg {...p}><path d="M4 7h16M4 12h16M4 17h16"/></svg>;
    case 'close': return <svg {...p}><path d="M6 6l12 12M18 6l-6 12"/></svg>;
    default: return null;
  }
};

// ---------- placeholder floor image (canvas-painted swatch) ----------
const FloorSwatch = ({ hue, lightness, label, t }) => {
  // build an SVG floor with tile lines + a soft reflection band
  const tileColor = `hsl(${hue} 12% ${lightness}%)`;
  const groutColor = `hsl(${hue} 10% ${Math.max(lightness - 18, 8)}%)`;
  const reflect = lightness > 60 ? 0.45 : 0.05;
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: tileColor }}>
      <svg viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}>
        <defs>
          <pattern id={`tile-${label}`} x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse" patternTransform="skewX(-20)">
            <rect width="50" height="50" fill={tileColor} />
            <path d="M0 0H50M0 50H50M0 0V50M50 0V50" stroke={groutColor} strokeWidth="1.2" />
          </pattern>
          <linearGradient id={`shine-${label}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity={reflect} />
            <stop offset="60%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`vignette-${label}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000" stopOpacity={lightness < 50 ? 0.35 : 0.15} />
          </linearGradient>
        </defs>
        <rect width="200" height="140" fill={`url(#tile-${label})`} />
        <rect width="200" height="140" fill={`url(#shine-${label})`} />
        <rect width="200" height="140" fill={`url(#vignette-${label})`} />
        {lightness > 65 && (
          <ellipse cx="100" cy="40" rx="120" ry="14" fill="#fff" opacity="0.18" />
        )}
        {lightness < 50 && (
          <>
            <circle cx="60" cy="80" r="14" fill="#000" opacity="0.18" />
            <circle cx="150" cy="100" r="20" fill="#000" opacity="0.14" />
            <path d="M20 60 Q40 70 60 60" stroke="#000" strokeWidth="1" fill="none" opacity="0.2" />
          </>
        )}
      </svg>
      <div style={{
        position: 'absolute', top: 12, left: 12,
        fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600,
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color: lightness > 60 ? '#0F1115' : '#FAF8F3',
        background: lightness > 60 ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.4)',
        padding: '4px 8px', borderRadius: 2,
      }}>{label}</div>
    </div>
  );
};

// ---------- before/after slider ----------
const BeforeAfter = ({ pair, t }) => {
  const [pos, setPos] = useState(50);
  const ref = useRef(null);
  const dragging = useRef(false);

  const move = (clientX) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const p = Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100));
    setPos(p);
  };

  useEffect(() => {
    const onMove = (e) => { if (dragging.current) move(e.touches ? e.touches[0].clientX : e.clientX); };
    const onUp = () => { dragging.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);
    };
  }, []);

  return (
    <div>
      <div
        ref={ref}
        onMouseDown={(e) => { dragging.current = true; move(e.clientX); }}
        onTouchStart={(e) => { dragging.current = true; move(e.touches[0].clientX); }}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '4 / 3',
          overflow: 'hidden',
          borderRadius: 4,
          border: `1px solid ${t.line}`,
          cursor: 'ew-resize',
          userSelect: 'none',
          background: '#000',
        }}
      >
        <div style={{ position: 'absolute', inset: 0 }}>
          <FloorSwatch hue={pair.afterHue} lightness={pair.afterL} label="After" t={t} />
        </div>
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: `${pos}%`, overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: `${100 / (pos / 100)}%`, height: '100%' }}>
            <FloorSwatch hue={pair.beforeHue} lightness={pair.beforeL} label="Before" t={t} />
          </div>
        </div>
        <div style={{
          position: 'absolute', top: 0, bottom: 0, left: `${pos}%`,
          width: 2, background: '#fff', boxShadow: '0 0 0 1px rgba(0,0,0,0.3)',
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: `${pos}%`,
          transform: 'translate(-50%, -50%)',
          width: 44, height: 44, borderRadius: 999,
          background: '#fff', border: `1px solid ${t.lineStrong}`,
          boxShadow: '0 2px 6px rgba(0,0,0,0.18)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#0F1115',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M9 6l-4 6 4 6M15 6l4 6-4 6"/></svg>
        </div>
      </div>
      <div style={{ marginTop: 12, fontFamily: t.bodyFont }}>
        <div style={{ fontWeight: 600, color: t.ink, fontSize: 15 }}>{pair.caption}</div>
        <div style={{ color: t.muted, fontSize: 13, marginTop: 2 }}>{pair.detail}</div>
      </div>
    </div>
  );
};

// ---------- buttons ----------
const Btn = ({ t, kind = 'primary', onClick, children, full, as = 'button', href }) => {
  const Comp = as === 'a' ? 'a' : 'button';
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    fontFamily: t.bodyFont, fontWeight: 500, fontSize: 15, lineHeight: 1,
    padding: '14px 22px', borderRadius: 4, cursor: 'pointer',
    textDecoration: 'none', border: '1px solid transparent',
    transition: 'transform 120ms ease, background 120ms ease, color 120ms ease',
    width: full ? '100%' : 'auto',
  };
  const styles = kind === 'primary'
    ? { ...base, background: t.btnBg, color: t.btnFg, borderColor: t.btnBg }
    : { ...base, background: t.btnAlt, color: t.btnAltFg, borderColor: t.btnAltBorder };
  return <Comp href={href} onClick={onClick} style={styles}>{children}</Comp>;
};

// ---------- header ----------
const Header = ({ t, brand, phone, page, setPage, onEstimate }) => {
  const [mOpen, setMOpen] = useState(false);
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 30,
      background: t.bg, borderBottom: `1px solid ${t.line}`,
      backdropFilter: 'saturate(140%) blur(8px)',
    }}>
      <div style={{
        maxWidth: 1180, margin: '0 auto', padding: '14px 24px',
        display: 'flex', alignItems: 'center', gap: 24,
      }}>
        <button onClick={() => setPage('home')} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: t.titleFont, fontSize: 20, fontWeight: 600, letterSpacing: '-0.01em',
          color: t.ink, padding: 0, display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{
            display: 'inline-block', width: 22, height: 22, borderRadius: 4,
            background: t.btnBg, color: t.btnFg, fontSize: 12, fontWeight: 700,
            lineHeight: '22px', textAlign: 'center', fontFamily: t.bodyFont,
          }}>B</span>
          {brand}
        </button>
        <nav className="byron-nav" style={{ display: 'flex', gap: 22, marginLeft: 12 }}>
          {[['home','Home'],['services','Services'],['estimate','Estimate']].map(([k,l]) => (
            <button key={k} onClick={() => setPage(k)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: t.bodyFont, fontSize: 14, fontWeight: 500,
              color: page === k ? t.ink : t.muted,
              padding: '6px 0',
              borderBottom: `2px solid ${page === k ? t.accentText : 'transparent'}`,
            }}>{l}</button>
          ))}
        </nav>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 14 }}>
          <a href={`tel:${phone.replace(/\D/g,'')}`} className="byron-phonelink" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            color: t.ink, textDecoration: 'none',
            fontFamily: t.bodyFont, fontWeight: 600, fontSize: 14,
          }}>
            <Icon name="phone" size={16} />{phone}
          </a>
          <Btn t={t} onClick={() => { setPage('estimate'); onEstimate?.(); }}>Free Estimate</Btn>
          <button className="byron-mtoggle" onClick={() => setMOpen(true)} style={{
            display: 'none', background: 'none', border: 'none', color: t.ink, cursor: 'pointer', padding: 6,
          }}><Icon name="menu" size={22} /></button>
        </div>
      </div>
      {mOpen && (
        <div style={{ position: 'fixed', inset: 0, background: t.bg, zIndex: 60, padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: t.titleFont, fontSize: 20, color: t.ink }}>{brand}</span>
            <button onClick={() => setMOpen(false)} style={{ background: 'none', border: 'none', color: t.ink, cursor: 'pointer' }}>
              <Icon name="close" />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 32 }}>
            {[['home','Home'],['services','Services'],['estimate','Estimate']].map(([k,l]) => (
              <button key={k} onClick={() => { setPage(k); setMOpen(false); }} style={{
                background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                padding: '18px 0', borderBottom: `1px solid ${t.line}`,
                fontFamily: t.titleFont, fontSize: 28, fontWeight: 500, color: t.ink,
              }}>{l}</button>
            ))}
          </div>
          <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Btn t={t} as="a" href={`tel:${phone.replace(/\D/g,'')}`} kind="secondary" full><Icon name="phone" size={16} /> Call {phone}</Btn>
            <Btn t={t} onClick={() => { setPage('estimate'); setMOpen(false); }} full>Get a Free Estimate</Btn>
          </div>
        </div>
      )}
    </header>
  );
};

// ---------- hero ----------
const Hero = ({ t, brand, phone, setPage, variant, slogan }) => {
  const heroBg = variant === 'modern-premium' ? t.heroBg : (variant === 'dark-luxury' ? t.heroBg : t.surface);
  const heroInk = variant === 'clean-light' ? t.ink : t.heroInk;
  const heroSub = variant === 'clean-light' ? t.ink2 : t.heroSub;
  return (
    <section style={{ background: heroBg, color: heroInk, padding: '72px 24px 88px', borderBottom: `1px solid ${variant === 'clean-light' ? t.line : 'transparent'}` }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 56, alignItems: 'center' }} className="byron-hero-grid">
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: t.bodyFont, fontSize: 12, fontWeight: 600,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: t.accentText, marginBottom: 18,
          }}>
            <span style={{ width: 24, height: 1, background: t.accentText }} />
            New Jersey · 25+ years experience
          </div>
          <h1 style={{
            fontFamily: t.titleFont, fontSize: 'clamp(40px, 6vw, 72px)',
            lineHeight: 1.05, margin: 0, letterSpacing: '-0.025em', fontWeight: 600,
            color: heroInk,
          }}>
            Floors that look new again.
          </h1>
          <div style={{
            fontFamily: t.titleFont, fontStyle: 'italic', fontWeight: 400,
            fontSize: 'clamp(18px, 2vw, 22px)', lineHeight: 1.4,
            color: t.accentText, marginTop: 24, paddingTop: 20,
            borderTop: `1px solid ${variant === 'clean-light' ? t.line : 'rgba(184,137,58,0.25)'}`,
            maxWidth: 480,
          }}>“{slogan}”</div>
          <p style={{
            fontFamily: t.bodyFont, fontSize: 18, lineHeight: 1.55,
            color: heroSub, margin: '20px 0 32px', maxWidth: 520,
          }}>
            Professional stripping, waxing, and deep cleaning for VCT, tile, and vinyl floors across New Jersey. Backed by 25+ years of hands-on experience. Free in-person estimates, scheduled within 24 hours of your request.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Btn t={t} onClick={() => setPage('estimate')}>Get a Free Estimate <Icon name="arrow" size={16} /></Btn>
            <Btn t={t} kind="secondary" as="a" href={`tel:${phone.replace(/\D/g,'')}`}><Icon name="phone" size={16} /> {phone}</Btn>
          </div>
          <div style={{
            marginTop: 36, display: 'flex', flexWrap: 'wrap', gap: 24,
            fontFamily: t.bodyFont, fontSize: 13, color: heroSub,
          }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Icon name="check" size={14} /> 25+ years experience</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Icon name="check" size={14} /> Free in-person quotes</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Icon name="check" size={14} /> 24-hr scheduling reply</span>
          </div>
        </div>
        <div style={{ position: 'relative', aspectRatio: '4 / 5', borderRadius: 6, overflow: 'hidden', border: `1px solid ${t.lineStrong}` }}>
          <FloorSwatch hue={32} lightness={78} label="After · freshly waxed" t={t} />
          <div style={{
            position: 'absolute', bottom: 16, left: 16, right: 16,
            background: variant === 'dark-luxury' ? 'rgba(11,12,16,0.85)' : 'rgba(255,255,255,0.92)',
            border: `1px solid ${t.line}`, borderRadius: 4,
            padding: '14px 16px', backdropFilter: 'blur(8px)',
          }}>
            <div style={{ fontFamily: t.bodyFont, fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: t.accentText }}>Latest job</div>
            <div style={{ fontFamily: t.bodyFont, fontSize: 14, color: t.ink, marginTop: 4 }}>3,200 sq ft school cafeteria · stripped &amp; waxed overnight</div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ---------- before/after section ----------
const BeforeAfterSection = ({ t }) => {
  const [idx, setIdx] = useState(0);
  return (
    <section style={{ background: t.bg, padding: '88px 24px' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <SectionTitle t={t} eyebrow="Before & After" title="Real floors. Real results." sub="Every job, photographed before and after. Drag the slider to see the difference." />
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 32, marginTop: 32 }} className="byron-ba-grid">
          <BeforeAfter pair={BEFORE_AFTER[idx]} t={t} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {BEFORE_AFTER.map((p, i) => (
              <button key={p.id} onClick={() => setIdx(i)} style={{
                textAlign: 'left', padding: 14, borderRadius: 4,
                background: i === idx ? t.surface : 'transparent',
                border: `1px solid ${i === idx ? t.lineStrong : t.line}`,
                cursor: 'pointer', fontFamily: t.bodyFont,
                color: t.ink,
              }}>
                <div style={{ fontSize: 11, color: t.accentText, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Job {String(i+1).padStart(2,'0')}</div>
                <div style={{ fontWeight: 600, fontSize: 15, marginTop: 4 }}>{p.caption}</div>
                <div style={{ color: t.muted, fontSize: 13, marginTop: 2 }}>{p.detail}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const SectionTitle = ({ t, eyebrow, title, sub, center }) => (
  <div style={{ textAlign: center ? 'center' : 'left', maxWidth: center ? 720 : 760, margin: center ? '0 auto' : 0 }}>
    <div style={{
      fontFamily: t.bodyFont, fontSize: 12, fontWeight: 600,
      letterSpacing: '0.16em', textTransform: 'uppercase',
      color: t.accentText, marginBottom: 14,
      display: 'inline-flex', alignItems: 'center', gap: 8,
    }}>
      {center && <span style={{ width: 24, height: 1, background: t.accentText }} />}
      {eyebrow}
      {center && <span style={{ width: 24, height: 1, background: t.accentText }} />}
    </div>
    <h2 style={{
      fontFamily: t.titleFont, fontSize: 'clamp(30px, 4vw, 44px)',
      lineHeight: 1.1, margin: 0, letterSpacing: '-0.02em', fontWeight: 600, color: t.ink,
    }}>{title}</h2>
    {sub && <p style={{ fontFamily: t.bodyFont, fontSize: 17, lineHeight: 1.55, color: t.muted, margin: '14px 0 0' }}>{sub}</p>}
  </div>
);

// ---------- services overview ----------
const ServicesSection = ({ t, setPage, full }) => (
  <section style={{ background: t.surface, padding: '88px 24px', borderTop: `1px solid ${t.line}`, borderBottom: `1px solid ${t.line}` }}>
    <div style={{ maxWidth: 1180, margin: '0 auto' }}>
      <SectionTitle t={t} eyebrow="What we do" title="Five services. One clean floor." sub="Whether it's one room or a whole building, here's exactly what we offer." />
      <div className="byron-services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gridAutoRows: 'minmax(0, auto)', gap: 16, marginTop: 36 }}>
        {SERVICES.map((s, i) => {
          const isFeature = i === 0;
          const span = isFeature
            ? { gridColumn: 'span 3', gridRow: 'span 2' }
            : { gridColumn: 'span 3', gridRow: 'span 1' };
          const labels = ['Most requested', null, null, 'Save year over year', null];
          const featureBg = '#1a1d24';
          return (
            <div key={s.slug} style={{
              ...span,
              background: isFeature ? featureBg : t.bg,
              color: isFeature ? '#FAF8F3' : t.ink,
              border: `1px solid ${isFeature ? featureBg : t.line}`,
              borderRadius: 4,
              padding: isFeature ? 32 : 22,
              display: 'flex', flexDirection: 'column',
              position: 'relative', overflow: 'hidden',
              minHeight: isFeature ? 280 : 130,
            }}>
              {isFeature && (
                <div style={{
                  position: 'absolute', inset: 0, opacity: 0.35, pointerEvents: 'none',
                  background: `radial-gradient(ellipse at 75% 110%, ${t.accentText} 0%, transparent 55%)`,
                }} />
              )}
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>
                {labels[i] && (
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    fontFamily: t.bodyFont, fontSize: 13, fontWeight: 700,
                    letterSpacing: '0.14em', textTransform: 'uppercase',
                    color: isFeature ? '#E5B970' : t.accentText,
                    marginBottom: isFeature ? 16 : 12,
                  }}>
                    <span style={{ width: 18, height: 2, background: isFeature ? '#E5B970' : t.accentText, display: 'inline-block' }} />
                    {labels[i]}
                  </div>
                )}
                <h3 style={{
                  fontFamily: t.titleFont,
                  fontSize: isFeature ? 32 : 19,
                  lineHeight: 1.15, margin: 0, fontWeight: 600,
                  color: isFeature ? '#FAF8F3' : t.ink,
                  letterSpacing: '-0.01em',
                }}>{s.name}</h3>
                <p style={{
                  fontFamily: t.bodyFont,
                  fontSize: isFeature ? 15 : 13,
                  color: isFeature ? '#D8D2C2' : t.muted,
                  margin: '8px 0 0', lineHeight: 1.55,
                  maxWidth: isFeature ? 380 : 'none',
                }}>{full ? s.body : (isFeature ? s.body : s.short)}</p>
                {full && (
                  <div style={{
                    fontFamily: t.bodyFont, fontSize: 12,
                    color: isFeature ? '#D8D2C2' : t.ink2,
                    marginTop: 14,
                    borderTop: `1px solid ${isFeature ? 'rgba(255,255,255,0.18)' : t.line}`,
                    paddingTop: 12,
                  }}>
                    <span style={{ color: isFeature ? '#B5AE9C' : t.muted }}>Typical timeline: </span>{s.timeline}
                  </div>
                )}
                {isFeature && !full && (
                  <div style={{ marginTop: 'auto', paddingTop: 18, display: 'flex', alignItems: 'center', gap: 8, color: '#E5B970', fontFamily: t.bodyFont, fontSize: 13, fontWeight: 600 }}>
                    Includes strip, seal, and multi-coat wax <Icon name="arrow" size={14} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {!full && (
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Btn t={t} kind="secondary" onClick={() => setPage('services')}>See all services <Icon name="arrow" size={16} /></Btn>
        </div>
      )}
    </div>
  </section>
);

// ---------- why us ----------
const WhySection = ({ t }) => {
  const items = [
    { icon: 'clock', n: '25+', label: 'years experience', body: 'Decades of hands-on floor work in NJ. We have seen every kind of floor and every kind of mess.' },
    { icon: 'shield', n: 'Free', label: 'estimates in our standard service area', body: 'We offer no-obligation estimates for local properties. For locations outside our normal service area, a travel fee may apply and can be credited toward the job if you book with us.' },
    { icon: 'msg', n: '24h', label: 'reply window', body: 'Send a request and we will reach out within 24 hours to schedule your site visit.' },
    { icon: 'sparkle', n: '2', label: 'kinds of clients', body: 'Residential and commercial. Homes, schools, offices, and stores across NJ.' },
  ];
  return (
    <section style={{ background: t.bg, padding: '88px 24px' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <SectionTitle t={t} eyebrow="Why Byron" title="What you can count on." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 1, marginTop: 36, background: t.line, border: `1px solid ${t.line}`, borderRadius: 4, overflow: 'hidden' }}>
          {items.map((it, i) => (
            <div key={i} style={{ background: t.surface, padding: 28 }}>
              <div style={{ color: t.accentText }}><Icon name={it.icon} size={26} /></div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 14 }}>
                <span style={{ fontFamily: t.titleFont, fontSize: 36, fontWeight: 600, color: t.ink, letterSpacing: '-0.02em' }}>{it.n}</span>
                <span style={{ fontFamily: t.bodyFont, fontSize: 13, color: t.muted, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{it.label}</span>
              </div>
              <p style={{ fontFamily: t.bodyFont, fontSize: 14, color: t.muted, margin: '8px 0 0', lineHeight: 1.55 }}>{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------- process ----------
const ProcessSection = ({ t }) => {
  const steps = [
    { n: '01', title: 'Tell us about the floor', body: 'A few quick details by phone, text, or web form. Square footage, type, and what is going on with it.' },
    { n: '02', title: 'We schedule a site visit', body: 'Within 24 hours of your request, we reach out to set up a quick on-site walkthrough so we can give you an honest, accurate quote.' },
    { n: '03', title: 'We get to work', body: 'Once you approve the quote and pay the deposit, we work on your schedule. Overnights and weekends available so we don\u2019t disrupt your business.' },
  ];
  return (
    <section style={{ background: t.surface, padding: '88px 24px', borderTop: `1px solid ${t.line}`, borderBottom: `1px solid ${t.line}` }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <SectionTitle t={t} eyebrow="How it works" title="From request to clean floor in three steps." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24, marginTop: 40 }}>
          {steps.map(s => (
            <div key={s.n} style={{ position: 'relative', paddingTop: 28 }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: t.line }} />
              <div style={{
                position: 'absolute', top: -1, left: 0, height: 3, width: 40, background: t.accentText,
              }} />
              <div style={{ fontFamily: t.bodyFont, fontSize: 12, fontWeight: 600, letterSpacing: '0.14em', color: t.muted }}>STEP {s.n}</div>
              <h3 style={{ fontFamily: t.titleFont, fontSize: 24, lineHeight: 1.2, margin: '8px 0 10px', color: t.ink, fontWeight: 600 }}>{s.title}</h3>
              <p style={{ fontFamily: t.bodyFont, fontSize: 15, color: t.muted, lineHeight: 1.55, margin: 0 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------- estimate form ----------
const EstimateForm = ({ t, formStyle, embedded }) => {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState({
    name: '', phone: '', email: '', address: '',
    floorType: '', sqft: '', service: '', source: '', notes: '',
  });
  const update = (k, v) => setData(d => ({ ...d, [k]: v }));

  const submit = (e) => {
    e?.preventDefault?.();
    setSubmitted(true);
  };

  const Field = ({ label, k, type = 'text', placeholder, required, options }) => (
    <label style={{ display: 'block', fontFamily: t.bodyFont }}>
      <div style={{ fontSize: 13, fontWeight: 500, color: t.ink, marginBottom: 6 }}>
        {label}{required && <span style={{ color: t.accentText, marginLeft: 4 }}>*</span>}
      </div>
      {options ? (
        <select value={data[k]} onChange={(e) => update(k, e.target.value)} style={{
          width: '100%', padding: '12px 14px', borderRadius: 4,
          border: `1px solid ${t.lineStrong}`, background: t.surface, color: t.ink,
          fontFamily: t.bodyFont, fontSize: 15, height: 48,
        }}>
          <option value="">Select...</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input
          type={type}
          value={data[k]}
          placeholder={placeholder}
          onChange={(e) => update(k, e.target.value)}
          style={{
            width: '100%', padding: '12px 14px', borderRadius: 4,
            border: `1px solid ${t.lineStrong}`, background: t.surface, color: t.ink,
            fontFamily: t.bodyFont, fontSize: 15, height: 48,
            outline: 'none',
          }}
          onFocus={(e) => e.target.style.borderColor = t.accentText}
          onBlur={(e) => e.target.style.borderColor = t.lineStrong}
        />
      )}
    </label>
  );

  if (submitted) {
    return (
      <div style={{ background: t.surface, border: `1px solid ${t.line}`, borderRadius: 6, padding: 36, textAlign: 'center' }}>
        <div style={{ width: 56, height: 56, borderRadius: 999, background: t.accentText, color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
          <Icon name="check" size={28} />
        </div>
        <h3 style={{ fontFamily: t.titleFont, fontSize: 28, fontWeight: 600, color: t.ink, margin: 0 }}>Got it. Talk soon.</h3>
        <p style={{ fontFamily: t.bodyFont, fontSize: 15, color: t.muted, margin: '12px auto 24px', maxWidth: 480, lineHeight: 1.55 }}>
          Thanks for reaching out. We will review your request and contact you within 24 hours to schedule a free site visit, where we will give you an honest, accurate quote in person.
        </p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '12px 18px', background: t.bg, border: `1px solid ${t.line}`, borderRadius: 4, fontFamily: t.bodyFont, fontSize: 14, color: t.ink }}>
          <Icon name="phone" size={16} /> Need it sooner? Call or text 908-691-5644
        </div>
        <button onClick={() => { setSubmitted(false); setStep(0); setData({ name:'', phone:'', email:'', address:'', floorType:'', sqft:'', service:'', source:'', notes:'' }); }} style={{
          display: 'block', margin: '28px auto 0', background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: t.bodyFont, fontSize: 13, color: t.muted, textDecoration: 'underline',
        }}>Submit another request</button>
      </div>
    );
  }

  if (formStyle === 'multi') {
    const steps = [
      { title: 'Your contact info', fields: () => (
        <>
          <Field label="Your name" k="name" required />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <Field label="Phone" k="phone" type="tel" placeholder="908-555-0100" required />
            <Field label="Email" k="email" type="email" placeholder="you@email.com" />
          </div>
        </>
      ) },
      { title: 'About the floor', fields: () => (
        <>
          <Field label="Service address or city/zip" k="address" placeholder="100 Main St, Plainfield NJ" required />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <Field label="Floor type" k="floorType" options={['VCT', 'Tile', 'Vinyl', 'Not sure']} required />
            <Field label="Approx. square footage" k="sqft" placeholder="It's okay to estimate" />
          </div>
        </>
      ) },
      { title: 'Service & source', fields: () => (
        <>
          <Field label="Service needed" k="service" options={SERVICES.map(s => s.name).concat(['Not sure'])} required />
          <Field label="How did you hear about us?" k="source" options={['Google search', 'Referral / word of mouth', 'Flyer or business card', 'Drove past a job site', 'Other']} />
          <Field label="Anything else? (optional)" k="notes" />
        </>
      ) },
    ];
    return (
      <div style={{ background: t.bg, border: `1px solid ${t.line}`, borderRadius: 6, padding: embedded ? 28 : 36 }}>
        <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
          {steps.map((_, i) => (
            <div key={i} style={{ flex: 1, height: 3, background: i <= step ? t.accentText : t.line, borderRadius: 2 }} />
          ))}
        </div>
        <div style={{ fontFamily: t.bodyFont, fontSize: 12, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: t.muted, marginBottom: 4 }}>
          Step {step + 1} of {steps.length}
        </div>
        <h3 style={{ fontFamily: t.titleFont, fontSize: 26, fontWeight: 600, color: t.ink, margin: '0 0 22px' }}>{steps[step].title}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {steps[step].fields()}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24, gap: 12 }}>
          {step > 0 ? (
            <Btn t={t} kind="secondary" onClick={() => setStep(s => s - 1)}>Back</Btn>
          ) : <span />}
          {step < steps.length - 1 ? (
            <Btn t={t} onClick={() => setStep(s => s + 1)}>Continue <Icon name="arrow" size={16} /></Btn>
          ) : (
            <Btn t={t} onClick={submit}>Send my free estimate request</Btn>
          )}
        </div>
      </div>
    );
  }

  // single-step
  return (
    <form onSubmit={submit} style={{ background: t.bg, border: `1px solid ${t.line}`, borderRadius: 6, padding: embedded ? 28 : 36 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, fontFamily: t.bodyFont, fontSize: 12, color: t.accentText, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
        <Icon name="clock" size={14} /> We reply within 24 hours to schedule your site visit
      </div>
      <h3 style={{ fontFamily: t.titleFont, fontSize: 26, fontWeight: 600, color: t.ink, margin: '0 0 6px' }}>Free estimate, no obligation.</h3>
      <p style={{ fontFamily: t.bodyFont, fontSize: 14, color: t.muted, margin: '0 0 22px' }}>Eight short questions. Takes about a minute.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="byron-form-grid">
        <Field label="Your name" k="name" required />
        <Field label="Phone" k="phone" type="tel" placeholder="908-555-0100" required />
      </div>
      <div style={{ marginTop: 14 }}>
        <Field label="Email" k="email" type="email" placeholder="you@email.com" />
      </div>
      <div style={{ marginTop: 14 }}>
        <Field label="Service address or city/zip" k="address" placeholder="Plainfield, NJ 07060" required />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 14 }} className="byron-form-grid">
        <Field label="Floor type" k="floorType" options={['VCT', 'Tile', 'Vinyl', 'Not sure']} required />
        <Field label="Approx. square footage" k="sqft" placeholder="It's okay to estimate" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 14 }} className="byron-form-grid">
        <Field label="Service needed" k="service" options={SERVICES.map(s => s.name).concat(['Not sure'])} required />
        <Field label="How did you hear about us?" k="source" options={['Google search', 'Referral', 'Flyer or business card', 'Drove past a job site', 'Other']} />
      </div>

      {/* honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0 }} />

      <div style={{ display: 'flex', gap: 12, marginTop: 22, alignItems: 'center', flexWrap: 'wrap' }}>
        <Btn t={t}>Send my free estimate request <Icon name="arrow" size={16} /></Btn>
        <span style={{ fontFamily: t.bodyFont, fontSize: 13, color: t.muted }}>Or call/text <a href="tel:9086915644" style={{ color: t.ink, fontWeight: 600 }}>908-691-5644</a></span>
      </div>
    </form>
  );
};

// ---------- FAQ ----------
const FaqSection = ({ t }) => {
  const [open, setOpen] = useState(0);
  return (
    <section style={{ background: t.bg, padding: '88px 24px' }}>
      <div style={{ maxWidth: 880, margin: '0 auto' }}>
        <SectionTitle t={t} eyebrow="Common questions" title="What people ask before booking." />
        <div style={{ marginTop: 32, borderTop: `1px solid ${t.line}` }}>
          {FAQ.map((f, i) => (
            <div key={i} style={{ borderBottom: `1px solid ${t.line}` }}>
              <button onClick={() => setOpen(open === i ? -1 : i)} style={{
                width: '100%', textAlign: 'left', padding: '20px 0',
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
                fontFamily: t.titleFont, fontSize: 19, fontWeight: 500, color: t.ink,
              }}>
                {f.q}
                <span style={{
                  width: 28, height: 28, borderRadius: 999, border: `1px solid ${t.lineStrong}`,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 200ms ease',
                  color: t.ink,
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
                </span>
              </button>
              {open === i && (
                <div style={{ paddingBottom: 20, fontFamily: t.bodyFont, fontSize: 15, color: t.muted, lineHeight: 1.6, maxWidth: 720 }}>{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------- footer ----------
const Footer = ({ t, brand, phone, slogan }) => (
  <footer style={{ background: t.surface, borderTop: `1px solid ${t.line}`, padding: '56px 24px 32px' }}>
    <div style={{ maxWidth: 1180, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 40 }} className="byron-footer-grid">
        <div>
          <div style={{ fontFamily: t.titleFont, fontSize: 22, fontWeight: 600, color: t.ink, letterSpacing: '-0.01em', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              display: 'inline-block', width: 24, height: 24, borderRadius: 4,
              background: t.btnBg, color: t.btnFg, fontSize: 13, fontWeight: 700,
              lineHeight: '24px', textAlign: 'center', fontFamily: t.bodyFont,
            }}>B</span>
            {brand}
          </div>
          <p style={{ fontFamily: t.titleFont, fontStyle: 'italic', fontSize: 16, color: t.accentText, lineHeight: 1.5, margin: '12px 0 0' }}>“{slogan}”</p>
          <p style={{ fontFamily: t.bodyFont, fontSize: 14, color: t.muted, lineHeight: 1.6, margin: '10px 0 0', maxWidth: 360 }}>
            NJ floor stripping &amp; waxing, backed by 25+ years of hands-on experience. Residential and commercial, free in-person estimates statewide.
          </p>
        </div>
        <div>
          <div style={{ fontFamily: t.bodyFont, fontSize: 12, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: t.muted, marginBottom: 14 }}>Contact</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontFamily: t.bodyFont, fontSize: 14, color: t.ink2, lineHeight: 2 }}>
            <li><a href={`tel:${phone.replace(/\D/g,'')}`} style={{ color: t.ink2, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}><Icon name="phone" size={14} /> {phone}</a></li>
            <li><a href={`sms:${phone.replace(/\D/g,'')}`} style={{ color: t.ink2, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}><Icon name="msg" size={14} /> Text {phone}</a></li>
            <li><a href="mailto:byronfloorcleaning@gmail.com" style={{ color: t.ink2, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}><Icon name="mail" size={14} /> byronfloorcleaning@gmail.com</a></li>
          </ul>
        </div>
        <div>
          <div style={{ fontFamily: t.bodyFont, fontSize: 12, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: t.muted, marginBottom: 14 }}>Service area</div>
          <p style={{ fontFamily: t.bodyFont, fontSize: 14, color: t.ink2, margin: 0, lineHeight: 1.6 }}>All of New Jersey<br/>Mon–Sat · 8am–8pm<br/>Overnights &amp; weekends available</p>
        </div>
      </div>
      <div style={{ marginTop: 48, paddingTop: 24, borderTop: `1px solid ${t.line}`, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontFamily: t.bodyFont, fontSize: 12, color: t.muted }}>
        <span>© 2026 {brand}. ByronFloorcleaning.com</span>
        <span>Floor stripping, waxing &amp; deep cleaning · NJ</span>
      </div>
    </div>
  </footer>
);

// ---------- mobile sticky bar ----------
const StickyBar = ({ t, phone, setPage }) => (
  <div className="byron-stickybar" style={{
    position: 'fixed', left: 12, right: 12, bottom: 12, zIndex: 50,
    background: t.ink, color: t.btnFg, borderRadius: 8,
    display: 'none', padding: 6, gap: 4,
    boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
  }}>
    <a href={`tel:${phone.replace(/\D/g,'')}`} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: t.btnFg, textDecoration: 'none', padding: '12px 0', fontFamily: t.bodyFont, fontSize: 13, fontWeight: 600 }}>
      <Icon name="phone" size={16} /> Call
    </a>
    <a href={`sms:${phone.replace(/\D/g,'')}`} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: t.btnFg, textDecoration: 'none', padding: '12px 0', fontFamily: t.bodyFont, fontSize: 13, fontWeight: 600 }}>
      <Icon name="msg" size={16} /> Text
    </a>
    <button onClick={() => setPage('estimate')} style={{ flex: 1.4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: t.accentText, color: '#fff', border: 'none', borderRadius: 6, padding: '12px 0', fontFamily: t.bodyFont, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
      Free Estimate <Icon name="arrow" size={14} />
    </button>
  </div>
);

// ---------- pages ----------
const HomePage = ({ t, brand, phone, setPage, variant, formStyle, slogan }) => (
  <>
    <Hero t={t} brand={brand} phone={phone} setPage={setPage} variant={variant} slogan={slogan} />
    <BeforeAfterSection t={t} />
    <ServicesSection t={t} setPage={setPage} />
    <WhySection t={t} />
    <ProcessSection t={t} />
    <section style={{ background: t.bg, padding: '88px 24px' }}>
      <div style={{ maxWidth: 880, margin: '0 auto' }}>
        <SectionTitle t={t} eyebrow="Get a quote" title="Tell us about your floor." sub="Eight short questions. We will reach out within 24 hours to schedule your free site visit." />
        <div style={{ marginTop: 32 }}>
          <EstimateForm t={t} formStyle={formStyle} embedded />
        </div>
      </div>
    </section>
    <FaqSection t={t} />
  </>
);

const ServicesPage = ({ t, setPage, formStyle }) => (
  <>
    <section style={{ background: t.surface, padding: '64px 24px 48px', borderBottom: `1px solid ${t.line}` }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <SectionTitle t={t} eyebrow="Services" title="Five services. One clean floor." sub="Whether it's one room or an entire building, here's exactly what we do and how we do it." />
      </div>
    </section>
    <ServicesSection t={t} setPage={setPage} full />
    <ProcessSection t={t} />
    <section style={{ background: t.bg, padding: '88px 24px' }}>
      <div style={{ maxWidth: 880, margin: '0 auto' }}>
        <SectionTitle t={t} eyebrow="Get a quote" title="Ready for a free estimate?" sub="Tell us a bit about the floor. We will reach out within 24 hours to schedule your free site visit." />
        <div style={{ marginTop: 32 }}>
          <EstimateForm t={t} formStyle={formStyle} embedded />
        </div>
      </div>
    </section>
  </>
);

const EstimatePage = ({ t, formStyle }) => (
  <section style={{ background: t.bg, padding: '64px 24px 96px' }}>
    <div style={{ maxWidth: 1080, margin: '0 auto' }}>
      <SectionTitle t={t} eyebrow="Free estimate" title="Get your free estimate." sub="Fill out the form. We will contact you within 24 hours to schedule a free site visit, where we will give you honest pricing in person. No obligation." />
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 36, marginTop: 36 }} className="byron-est-grid">
        <EstimateForm t={t} formStyle={formStyle} />
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: t.surface, border: `1px solid ${t.line}`, borderRadius: 6, padding: 24 }}>
            <div style={{ fontFamily: t.bodyFont, fontSize: 12, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: t.accentText }}>Prefer to talk?</div>
            <h3 style={{ fontFamily: t.titleFont, fontSize: 22, fontWeight: 600, color: t.ink, margin: '8px 0 12px' }}>We answer the phone ourselves.</h3>
            <p style={{ fontFamily: t.bodyFont, fontSize: 14, color: t.muted, margin: '0 0 16px', lineHeight: 1.55 }}>25+ years of hands-on floor experience. Call or text anytime, we respond fast and quote honest.</p>
            <Btn t={t} as="a" href="tel:9086915644" full><Icon name="phone" size={16} /> 908-691-5644</Btn>
            <div style={{ height: 8 }} />
            <Btn t={t} kind="secondary" as="a" href="sms:9086915644" full><Icon name="msg" size={16} /> Text us instead</Btn>
          </div>
          <div style={{ background: t.surface, border: `1px solid ${t.line}`, borderRadius: 6, padding: 24 }}>
            <div style={{ fontFamily: t.bodyFont, fontSize: 12, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: t.muted, marginBottom: 12 }}>What happens next</div>
            <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {['We review your request', 'We contact you within 24 hrs to schedule a site visit', 'You get an in-person quote, no pressure'].map((s, i) => (
                <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontFamily: t.bodyFont, fontSize: 14, color: t.ink2 }}>
                  <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: 999, background: t.accentText, color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, fontFamily: t.bodyFont }}>{i+1}</span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </div>
    </div>
  </section>
);

// ---------- root app ----------
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "variant": "modern-premium",
  "brand": "Byron Floor Cleaning",
  "phone": "908-691-5644",
  "slogan": "Bringing shine to your dull moments.",
  "formStyle": "single",
  "showStickyBar": true
}/*EDITMODE-END*/;

function App() {
  const [page, setPage] = useState('home');
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const t = variantTokens[tweaks.variant] || variantTokens['modern-premium'];

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [page]);

  return (
    <div style={{ background: t.bg, color: t.ink, minHeight: '100vh', fontFamily: t.bodyFont }} data-screen-label={`Byron · ${t.name} · ${page}`}>
      <Header t={t} brand={tweaks.brand} phone={tweaks.phone} page={page} setPage={setPage} />
      {page === 'home' && <HomePage t={t} brand={tweaks.brand} phone={tweaks.phone} setPage={setPage} variant={tweaks.variant} formStyle={tweaks.formStyle} slogan={tweaks.slogan} />}
      {page === 'services' && <ServicesPage t={t} setPage={setPage} formStyle={tweaks.formStyle} />}
      {page === 'estimate' && <EstimatePage t={t} formStyle={tweaks.formStyle} />}
      <Footer t={t} brand={tweaks.brand} phone={tweaks.phone} slogan={tweaks.slogan} />
      {tweaks.showStickyBar && <StickyBar t={t} phone={tweaks.phone} setPage={setPage} />}

      <TweaksPanel title="Tweaks" defaultOpen={false}>
        <TweakSection title="Visual variant" subtitle="Three distinct directions. Pick one.">
          <TweakRadio
            value={tweaks.variant}
            onChange={(v) => setTweak('variant', v)}
            options={[
              { value: 'modern-premium', label: 'Modern' },
              { value: 'dark-luxury', label: 'Dark' },
              { value: 'clean-light', label: 'Light' },
            ]}
          />
        </TweakSection>
        <TweakSection title="Brand name" subtitle="Print materials are inconsistent. Try the three options live.">
          <TweakSelect
            value={tweaks.brand}
            onChange={(v) => setTweak('brand', v)}
            options={[
              { value: 'Byron Floor Cleaning', label: 'Byron Floor Cleaning (recommended, matches domain)' },
              { value: 'Byron Flooring', label: 'Byron Flooring' },
              { value: 'Byron Floor Shine', label: 'Byron Floor Shine' },
            ]}
          />
        </TweakSection>
        <TweakSection title="Phone number" subtitle="Updates header, hero, footer, sticky bar, and form fallback at once.">
          <TweakText value={tweaks.phone} onChange={(v) => setTweak('phone', v)} />
        </TweakSection>
        <TweakSection title="Slogan" subtitle="Appears under the hero headline and in the footer. Try a few wordings.">
          <TweakSelect
            value={tweaks.slogan}
            onChange={(v) => setTweak('slogan', v)}
            options={[
              { value: 'Bringing shine to your dull moments.', label: 'Bringing shine to your dull moments. (recommended)' },
              { value: 'Bringing shine to your dull days.', label: 'Bringing shine to your dull days.' },
              { value: 'Where dull floors come back to life.', label: 'Where dull floors come back to life.' },
              { value: 'Shine restored. Floors renewed.', label: 'Shine restored. Floors renewed.' },
            ]}
          />
          <div style={{ height: 8 }} />
          <TweakText value={tweaks.slogan} onChange={(v) => setTweak('slogan', v)} />
        </TweakSection>
        <TweakSection title="Form style">
          <TweakRadio
            value={tweaks.formStyle}
            onChange={(v) => setTweak('formStyle', v)}
            options={[
              { value: 'single', label: 'Single (recommended)' },
              { value: 'multi', label: 'Multi-step' },
            ]}
          />
        </TweakSection>
        <TweakSection title="Sticky mobile bar" subtitle="Call · Text · Estimate. Only visible on small screens.">
          <TweakToggle value={tweaks.showStickyBar} onChange={(v) => setTweak('showStickyBar', v)} />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
