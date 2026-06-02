import React, { useEffect, useRef, useState } from 'react';


/* ---------------- Hash router ---------------- */
function getPath() {
  const hash = window.location.hash.slice(1) || '/';
  return hash === '' ? '/' : hash;
}

function useRoute() {
  const [path, setPath] = useState(getPath);
  useEffect(() => {
    const onChange = () => setPath(getPath());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return path;
}

function navigate(to, opts = {}) {
  const target = to.startsWith('/') ? to : '/' + to;
  window.location.hash = target;
  if (opts.scroll !== false) {
    window.scrollTo({ top: 0, behavior: 'scrollBehavior' in document.documentElement.style ? 'instant' : 'auto' });
  }
}

function Link({ to, children, className, onClick, ...rest }) {
  const handle = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    e.preventDefault();
    if (onClick) onClick(e);
    navigate(to);
  };
  return (
    <a href={`#${to}`} onClick={handle} className={className} {...rest}>
      {children}
    </a>
  );
}

/* ---------------- Reveal hook ---------------- */
function useReveal(dep) {
  useEffect(() => {
    // Clear any previous "in" state on a fresh page mount so animations replay.
    const all = document.querySelectorAll('.reveal, .reveal-fade, .reveal-up-sm');
    all.forEach((el) => el.classList.remove('in'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    // Slight delay so that page transition opacity doesn't fight reveals
    const id = requestAnimationFrame(() => {
      document.querySelectorAll('.reveal, .reveal-fade, .reveal-up-sm').forEach((el) => io.observe(el));
    });
    return () => { cancelAnimationFrame(id); io.disconnect(); };
  }, [dep]);
}

/* ---------------- Icons (inline SVG, stroke 1.75) ---------------- */
// Brand social icons use OFFICIAL brand color systems.
const BrandIcons = {
  Instagram: (p) => (
    <svg viewBox="0 0 48 48" {...p}>
      <defs>
        <radialGradient id="igGrad" cx="30%" cy="107%" r="150%">
          <stop offset="0%"  stopColor="#FFDD55" />
          <stop offset="10%" stopColor="#FFDD55" />
          <stop offset="50%" stopColor="#FF543E" />
          <stop offset="100%" stopColor="#C837AB" />
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#igGrad)" />
      <rect x="11" y="11" width="26" height="26" rx="7.5" fill="none" stroke="#fff" strokeWidth="2.6" />
      <circle cx="24" cy="24" r="6" fill="none" stroke="#fff" strokeWidth="2.6" />
      <circle cx="33" cy="15" r="1.8" fill="#fff" />
    </svg>
  ),
  Facebook: (p) => (
    <svg viewBox="0 0 48 48" {...p}>
      <rect x="2" y="2" width="44" height="44" rx="12" fill="#1877F2" />
      <path fill="#fff" d="M27.5 41V26.4h4.9l.74-5.7h-5.64v-3.65c0-1.65.46-2.78 2.83-2.78H33.4V8.96c-.52-.07-2.32-.22-4.42-.22-4.37 0-7.36 2.67-7.36 7.57v4.39H17v5.7h4.62V41h5.88z"/>
    </svg>
  ),
  Whatsapp: (p) => (
    <svg viewBox="0 0 48 48" {...p}>
      <defs>
        <linearGradient id="wa-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5BD066" />
          <stop offset="1" stopColor="#27B43E" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="48" height="48" rx="10.6" fill="url(#wa-bg)" />
      {/* Single white path = bubble + tail with the handset cut out as negative space (evenodd) */}
      <path fill="#fff" fillRule="evenodd" clipRule="evenodd" d="M34.13 13.86A14.27 14.27 0 0 0 24.02 9.6C16.12 9.6 9.7 16.02 9.7 23.92c0 2.52.66 4.99 1.92 7.16L9.6 38.4l7.5-1.97a14.31 14.31 0 0 0 6.92 1.76h.01c7.9 0 14.32-6.42 14.33-14.32 0-3.83-1.49-7.43-4.23-10.01zM24.03 35.78h-.01a11.86 11.86 0 0 1-6.05-1.66l-.43-.26-4.45 1.17 1.19-4.34-.28-.45a11.85 11.85 0 0 1-1.82-6.33c0-6.56 5.34-11.9 11.9-11.9 3.18 0 6.16 1.24 8.41 3.49a11.83 11.83 0 0 1 3.48 8.42c0 6.56-5.34 11.86-11.94 11.86zm6.53-8.91c-.36-.18-2.12-1.05-2.45-1.17-.33-.12-.57-.18-.81.18-.24.36-.93 1.17-1.14 1.41-.21.24-.42.27-.78.09-.36-.18-1.51-.56-2.88-1.78-1.07-.95-1.78-2.13-1.99-2.49-.21-.36-.02-.55.16-.73.16-.16.36-.42.54-.63.18-.21.24-.36.36-.6.12-.24.06-.45-.03-.63-.09-.18-.81-1.95-1.11-2.67-.29-.7-.59-.6-.81-.61l-.69-.01a1.32 1.32 0 0 0-.96.45c-.33.36-1.26 1.23-1.26 3 0 1.77 1.29 3.48 1.47 3.72.18.24 2.54 3.88 6.15 5.44.86.37 1.53.59 2.05.76.86.27 1.65.23 2.27.14.69-.1 2.12-.87 2.42-1.71.3-.84.3-1.56.21-1.71-.09-.15-.33-.24-.69-.42z" />
    </svg>
  ),
};

const I = {
  Instagram: BrandIcons.Instagram,
  Facebook: BrandIcons.Facebook,
  Whatsapp: BrandIcons.Whatsapp,
  Arrow: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  ),
  ArrowUR: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  ),
  Phone: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  Pin: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  Mail: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 7 9-7"/>
    </svg>
  ),
  Clock: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="9"/>
      <path d="M12 7v5l3 2"/>
    </svg>
  ),
  Star: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="m12 17.27 6.18 3.73-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>
  ),
  Check: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M20 6 9 17l-5-5"/>
    </svg>
  ),
  Close: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M18 6 6 18M6 6l12 12"/>
    </svg>
  ),
  Menu: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 6h16M4 12h16M4 18h16"/>
    </svg>
  ),
  // Branş icons — Lucide Icons (lucide.dev), stroke 1.6 for visual continuity
  // with the rest of the app's icon set.
  Sparkles: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="4" r="1.5"/>
      <path d="M12 6v5"/>
      <path d="M8 4l4 4 4-4"/>
      <path d="M12 11l-3 6"/>
      <path d="M12 11l3 6"/>
    </svg>
  ),
  ShieldCheck: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="7" cy="3" r="1.5"/>
      <path d="M8 5l1 5"/>
      <path d="M9 7l-3 2"/>
      <path d="M9 7l3-2"/>
      <path d="M9 10l-1 6"/>
      <path d="M9 10l6-4"/>
    </svg>
  ),
  Zap: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="2" y="8" width="7" height="8" rx="2"/>
      <rect x="15" y="8" width="7" height="8" rx="2"/>
      <path d="M9 11h6"/>
      <path d="M5 8V6M7 8V5"/>
      <path d="M17 8V5M19 8V6"/>
    </svg>
  ),
  Wind: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/>
      <path d="M9.6 4.6A2 2 0 1 1 11 8H2"/>
      <path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>
    </svg>
  ),
  Dumbbell: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="2" y="8" width="3" height="8" rx="1"/>
      <rect x="19" y="8" width="3" height="8" rx="1"/>
      <line x1="5" y1="12" x2="19" y2="12"/>
      <rect x="5" y="10" width="4" height="4" rx="1"/>
      <rect x="15" y="10" width="4" height="4" rx="1"/>
    </svg>
  ),
  Flame: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
    </svg>
  ),
};

/* ---------------- Pill / chip ---------------- */
function Eyebrow({ children, tone = 'brand' }) {
  const map = {
    brand: 'bg-brand-soft text-brand-deep ring-1 ring-brand/20',
    aqua:  'bg-aqua-soft text-aqua-deep ring-1 ring-aqua/20',
    neutral: 'bg-paper-soft text-ink-soft ring-1 ring-line',
  };
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-semibold tracking-wide uppercase ${map[tone]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${tone === 'aqua' ? 'bg-aqua' : tone === 'neutral' ? 'bg-ink-faint' : 'bg-brand'}`}></span>
      {children}
    </span>
  );
}

/* ---------------- Section wrapper ---------------- */
function Section({ id, label, children, className = '', tone = 'paper' }) {
  const bg = tone === 'soft' ? 'bg-paper-soft' : 'bg-paper';
  return (
    <section id={id} data-screen-label={label} className={`relative overflow-hidden ${bg} ${className}`}>
      <div className="max-w-[1200px] mx-auto px-5 pr-[60px] sm:px-8 lg:px-10">
        {children}
      </div>
    </section>
  );
}

/* ---------------- Image placeholder ---------------- */
function Photo({ caption, tone = 'brand', aspect = '4/3', className = '', children }) {
  const cls = tone === 'aqua' ? 'ph-stripe-aqua' : tone === 'neutral' ? 'ph-stripe-neutral' : 'ph-stripe';
  return (
    <div className={`relative ${cls} rounded-card overflow-hidden ${className}`} style={{ aspectRatio: aspect }}>
      <div className="absolute inset-0 grid place-items-center p-4">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/85 ring-1 ring-line">
            <span className="w-1.5 h-1.5 rounded-full bg-brand"></span>
            <span className="font-mono text-[11px] text-ink-soft tracking-tight">{caption}</span>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

/* ---------------- Image (Unsplash + striped fallback) ---------------- */
function Img({ src, srcset, alt = '', caption, tone = 'brand', aspect = '4/3', className = '', children, focal = 'center' }) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const cls = tone === 'aqua' ? 'ph-stripe-aqua' : tone === 'neutral' ? 'ph-stripe-neutral' : 'ph-stripe';
  return (
    <div className={`relative ${cls} rounded-card overflow-hidden ${className}`} style={{ aspectRatio: aspect }}>
      {!errored && (
        <img
          src={src}
          srcSet={srcset}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ objectPosition: focal }}
        />
      )}
      {(!loaded || errored) && (
        <div className="absolute inset-0 grid place-items-center p-4 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/85 ring-1 ring-line">
            <span className="w-1.5 h-1.5 rounded-full bg-brand"></span>
            <span className="font-mono text-[11px] text-ink-soft tracking-tight">{caption || alt}</span>
          </div>
        </div>
      )}
      {children}
    </div>
  );
}

/* ---------------- Soft 3D icon tile ----------------
   Wraps a glyph in a gradient rounded-square with inner highlight + soft shadow.
   Use as: <IconTile tone="brand"><I.Gym ... /></IconTile>
*/
function IconTile({ tone = 'brand', size = 56, children, className = '' }) {
  const grad = tone === 'aqua'
    ? 'from-aqua to-aqua-deep'
    : tone === 'mix'
      ? 'from-brand via-brand to-aqua-deep'
      : 'from-brand to-brand-deep';
  return (
    <span
      className={`relative inline-grid place-items-center rounded-[14px] bg-gradient-to-br ${grad} text-white shadow-lift ${className}`}
      style={{ width: size, height: size }}
    >
      {/* glossy inner highlight */}
      <span className="pointer-events-none absolute inset-[2px] rounded-[12px] bg-gradient-to-b from-white/30 to-transparent opacity-60"></span>
      {/* bottom inner shadow */}
      <span className="pointer-events-none absolute inset-x-2 bottom-1 h-1/3 rounded-b-[10px] bg-gradient-to-t from-black/15 to-transparent"></span>
      <span className="relative">{children}</span>
    </span>
  );
}


function Counter({ to, suffix = '', duration = 1400 }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setVal(Math.round(to * eased));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return <span ref={ref} className="counter-num">{val}{suffix}</span>;
}

/* ---------------- Logo ---------------- */
function Logo({ size = 32 }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <span className="relative grid place-items-center" style={{ width: size, height: size }}>
        <span className="absolute inset-0 rounded-[10px] bg-gradient-to-br from-brand to-brand-deep shadow-lift"></span>
        <span className="absolute inset-[3px] rounded-[8px] bg-white grid place-items-center">
          <svg viewBox="0 0 24 24" width={size * 0.55} height={size * 0.55} fill="none" stroke="#F97316" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 20c2-3 4-4 7-4s5 1 7 4M7 9a5 5 0 0 1 10 0M12 9v7"/>
          </svg>
        </span>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display font-extrabold tracking-tight text-[17px] text-ink">CİMCİMPARK</span>
        <span className="hidden lg:block font-mono text-[9.5px] text-ink-faint tracking-[.18em] mt-0.5">SPOR • CİMNASTİK</span>
      </span>
    </Link>
  );
}

export { useReveal, useRoute, navigate, Link, Eyebrow, Section, Photo, Img, IconTile, Counter, Logo, I };

