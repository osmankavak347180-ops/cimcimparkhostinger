import React, { useState, useEffect, useRef } from 'react';
import { Link, Eyebrow, Section, Photo, Img, IconTile, Counter, Logo, I } from './primitives';


/* ====================================================================== */
/* SOCIAL RAIL — official brand colors                                    */
/* ====================================================================== */
function SocialRail() {
  return (
    <>
      {/* Fixed right rail — visible on all screen sizes */}
      <aside className="social-rail-brand flex" aria-label="Sosyal medya">
        <a href="https://www.instagram.com/cimcimparkk/" aria-label="Instagram" target="_blank" rel="noreferrer" className="social-tile">
          <I.Instagram width="36" height="36" />
        </a>
        <a href="https://www.facebook.com/people/Cimcimparkk/61581461134869/" aria-label="Facebook" target="_blank" rel="noreferrer" className="social-tile">
          <I.Facebook width="36" height="36" />
        </a>
        <a href="https://wa.me/905392437606" aria-label="WhatsApp" target="_blank" rel="noreferrer" className="social-tile">
          <I.Whatsapp width="36" height="36" />
        </a>
      </aside>
    </>
  );
}

/* ====================================================================== */
/* NAVBAR                                                                 */
/* ====================================================================== */
function Navbar({ route }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile sheet on route change
  useEffect(() => { setOpen(false); }, [route]);

  const items = [
    { to: '/',             label: 'Ana Sayfa' },
    { to: '/hakkimizda',   label: 'Hakkımızda' },
    { to: '/branslarimiz', label: 'Branşlarımız' },
    { to: '/ekibimiz',     label: 'Ekibimiz' },
    { to: '/galeri',       label: 'Galeri' },
    { to: '/blog',         label: 'Blog' },
    { to: '/iletisim',     label: 'İletişim' },
  ];

  const isActive = (to) => route === to || (to !== '/' && route.startsWith(to));

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white/85 backdrop-blur border-b border-line' : 'bg-white border-b border-transparent'}`}>
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10 h-16 flex items-center justify-between gap-6">
        <Logo />

        <nav className="hidden lg:flex items-center gap-5" aria-label="Ana navigasyon">
          {items.map((it) => (
            <Link
              key={it.to}
              to={it.to}
              className={`nav-link whitespace-nowrap text-[13px] font-medium text-ink-soft hover:text-ink ${isActive(it.to) ? 'active text-ink' : ''}`}
            >
              {it.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="tel:+905392437606" className="hidden xl:inline-flex items-center gap-2 text-[13px] font-semibold text-ink-soft hover:text-brand">
            <I.Phone width="16" height="16" />
            0539 243 76 06
          </a>
          <Link to="/iletisim" className="btn-primary text-[13px] !py-2.5 !px-4 whitespace-nowrap hidden sm:inline-flex items-center gap-2">
            Ücretsiz Deneme Dersi
            <I.Arrow width="15" height="15" />
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menü"
            className="lg:hidden p-2 rounded-btn border border-line"
          >
            {open ? <I.Close width="20" height="20" /> : <I.Menu width="20" height="20" />}
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <div className={`lg:hidden mobile-sheet ${open ? 'open' : ''}`}>
        <div className="px-6 py-6 flex flex-col gap-1">
          {items.map((it) => (
            <Link
              key={it.to}
              to={it.to}
              className="py-3 border-b border-line text-[16px] font-semibold text-ink flex items-center justify-between"
            >
              {it.label}
              <I.Arrow width="16" height="16" className="text-ink-faint" />
            </Link>
          ))}
          <Link to="/iletisim" className="btn-primary mt-5 justify-center inline-flex items-center gap-2">
            Ücretsiz Deneme Dersi
            <I.Arrow width="15" height="15" />
          </Link>
        </div>
      </div>
    </header>
  );
}

/* ====================================================================== */
/* HERO — full-bleed 3-slide background slider                            */
/* ====================================================================== */
const HERO_SLIDES = [
  // Slayt 1 — yetişkin pilates / genel kitle
  {
    src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1800&q=80',
    alt: 'Yetişkin kadın pilates seansı',
    tint: 'from-aqua/40 to-brand/30',
    title: 'Kendi Sınırlarını Keşfet,',
    titleAccent: 'Gücünü Zirveye Taşı!',
    subtitle: 'Profesyonel eğitmenlerimizle hayalindeki forma kavuşmak için daha fazla bekleme. Gücünü ve potansiyelini bugünden keşfet.',
    cta: 'Ücretsiz Deneme Dersi Al!',
    ctaTo: '/iletisim',
  },
  // Slayt 2 — gerçek CimCimPark çocuk cimnastik dersi
  {
    src: '/hero/cimcimpark-cimnastik-cocuk.png',
    alt: 'CimCimPark çocuk cimnastik dersi — minder & çember çalışması',
    tint: 'from-brand/40 to-aqua/30',
    title: 'Çocuğunun Geleceğine',
    titleAccent: 'En İyi Yatırımı Yap!',
    subtitle: 'Çocuğunun fiziksel ve zihinsel gelişimini şansa bırakma. Güvenli stüdyolarımızda her seviyeye özel programlar.',
    cta: 'Programları Keşfet ve Kaydol!',
    ctaTo: '/branslarimiz',
  },

  {
    src: '/hero/hero-2.jpg',
    alt: 'CimCimPark çocuk cimnastik dersi',
    tint: 'from-brand-deep/40 to-aqua-deep/30',
    title: "Kahramanmaraş'ın En Aydınlık,",
    titleAccent: 'En Modern Cimnastik Merkezi',
    subtitle: 'Uzman eğitmenlerimiz ve son teknoloji tesisimizle tanışın. İlk dersiniz bizden!',
    cta: 'Hemen Başla!',
    ctaTo: '/iletisim',
    focal: 'center top',
  },
];

function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const copyRef = useRef(null);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % HERO_SLIDES.length), 3000);
    return () => clearInterval(id);
  }, [paused]);

  // Replay the reveal animation on every slide change. The page-level
  // IntersectionObserver in useReveal only observes nodes that exist at mount,
  // so for slide-driven content we manage the .in class manually.
  useEffect(() => {
    const root = copyRef.current;
    if (!root) return;
    const els = root.querySelectorAll('.reveal');
    els.forEach((el) => el.classList.remove('in'));
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        els.forEach((el) => el.classList.add('in'));
      });
    });
    return () => cancelAnimationFrame(id);
  }, [active]);

  return (
    <section
      data-screen-label="01 Hero"
      className="relative overflow-hidden bg-ink h-[680px] flex"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slider layer */}
      <div className="absolute inset-0">
        {HERO_SLIDES.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-[1200ms] ease-out ${i === active ? 'opacity-100' : 'opacity-0'}`}
            aria-hidden={i !== active}
          >
            {/* color fallback if image fails to load */}
            <div className={`absolute inset-0 bg-gradient-to-br ${s.tint}`}></div>
            {/* TODO: CLIENT WILL REPLACE THIS IMAGE URL */}
            <img
              src={s.src}
              alt={s.alt}
              className="absolute inset-0 w-full h-full object-cover hero-kenburns"
              style={{ objectPosition: s.focal || 'center center' }}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
        {/* Readability overlay — light touch so the photos read brightly while keeping
            enough contrast for white text (which also carries a drop-shadow). */}
        <div className="absolute inset-0 bg-ink/35 sm:bg-ink/25"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/20 via-transparent to-ink/55"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(17,24,39,0.30)_95%)]"></div>
      </div>

      {/* Content — mobilde 100svh içinde dikey ortalanır, masaüstünde padding ile nefes alır */}
      <div className="relative w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10 py-20 sm:py-32 lg:py-40 text-center text-white flex flex-col justify-center items-center h-[680px]">
        <div className="reveal flex justify-center" style={{ '--d': '0ms' }}>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-semibold tracking-wide uppercase bg-white/12 ring-1 ring-white/30 backdrop-blur-sm text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-brand"></span>
            Kahramanmaraş • Onikişubat
          </span>
        </div>

        {/* Heading — slide-specific copy. Animation is replayed via the copyRef effect
            on every `active` change (see Hero useEffect). DO NOT wrap in key={active}:
            the page-level IntersectionObserver doesn't re-observe remounted nodes. */}
        <div ref={copyRef}>
          <h1
            className="reveal mt-5 sm:mt-6 mx-auto font-display font-extrabold tracking-[-0.025em] text-[28px] xs:text-[34px] sm:text-[52px] lg:text-[60px] leading-[1.12] max-w-[22ch] text-balance drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]"
            style={{ '--d': '80ms' }}
          >
            <span className="block">{HERO_SLIDES[active].title}</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand via-brand to-aqua">
              {HERO_SLIDES[active].titleAccent}
            </span>
          </h1>

          <p
            className="reveal mt-4 sm:mt-6 mx-auto text-[14.5px] sm:text-[18px] leading-[1.55] sm:leading-[1.6] text-white/90 max-w-[620px] text-balance"
            style={{ '--d': '160ms' }}
          >
            {HERO_SLIDES[active].subtitle}
          </p>

          <div className="reveal mt-6 sm:mt-8 flex items-center justify-center" style={{ '--d': '240ms' }}>
            <Link to={HERO_SLIDES[active].ctaTo} className="btn-primary btn-hero inline-flex items-center gap-2">
              {HERO_SLIDES[active].cta}
              <I.Arrow width="16" height="16" />
            </Link>
          </div>
        </div>

        {/* Slider dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              aria-label={`Slayt ${i + 1}`}
              onClick={() => setActive(i)}
              className={`transition-all duration-300 rounded-full ${i === active ? 'w-8 h-2 bg-white' : 'w-2 h-2 bg-white/45 hover:bg-white/75'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====================================================================== */
/* TRUST / COUNTERS                                                       */
/* ====================================================================== */
function Trust() {
  const stats = [
    { value: 500, suffix: '+', label: 'Aktif Üye',         sub: 'Düzenli antrenman' },
    { value: 6,   suffix: '',  label: 'Profesyonel Branş', sub: 'Çocuk & Yetişkin' },
    { value: 4,   suffix: '+', label: 'Uzman Eğitmen',     sub: 'Sertifikalı kadro' },
    // Stat özel: rakam yerine '4-65' yazı olarak gösterilir.
    { display: '4-65', label: '4-65 Yaş Aralığı',     sub: 'Herkes için spor' },
  ];

  return (
    <Section id="trust" label="02 Trust" tone="soft" className="py-12 sm:py-16">
      <div className="rounded-card bg-white shadow-soft border border-line p-6 sm:p-8 lg:p-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 sm:gap-x-10">
          {stats.map((s, i) => (
            <div key={i} className="reveal flex flex-col" style={{ '--d': `${i*80}ms` }}>
              <div className="font-display font-extrabold text-[40px] sm:text-[52px] text-brand leading-none">
                {s.display
                  ? <span className="counter-num">{s.display}</span>
                  : <Counter to={s.value} suffix={s.suffix} />}
              </div>
              <div className="mt-3 text-[14.5px] font-semibold text-ink">{s.label}</div>
              <div className="text-[12.5px] text-ink-muted mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ====================================================================== */
/* BRANCHES                                                               */
/* ====================================================================== */
const BRANCHES = {
  kids: [
    { icon: 'Sparkles', name: 'Temel Cimnastik', age: '4 — 12 yaş', desc: 'Denge, esneklik ve özgüvenin temellerini eğlenceli minder oyunlarıyla atıyoruz.', tag: 'En popüler', tone: 'brand' },
    { icon: 'ShieldCheck', name: 'Çocuk Taekwondo', age: '6 — 14 yaş', desc: 'Disiplin ve saygı temelli, kuşak sistemi ile motive edici uzun soluklu bir yolculuk.', tag: 'Disiplin', tone: 'aqua' },
    { icon: 'Zap', name: 'Çocuk Kick Boks', age: '8 — 14 yaş', desc: 'Koordinasyon, refleks ve özgüveni yüksek tempolu güvenli antrenmanlarla geliştirir.', tag: 'Enerji', tone: 'brand' },
  ],
  adults: [
    { icon: 'Wind', name: 'Mat Pilates', age: '16 — 65 yaş', desc: 'Postür, çekirdek kuvveti ve nefes kontrolü. Ofis yorgunluğuna birebir.', tag: 'Yeni Başlayan ✓', tone: 'aqua' },
    { icon: 'Dumbbell', name: 'Reformer Pilates', age: '18 — 65 yaş', desc: 'Yaylı reformer sistemiyle birebir & 3 kişilik küçük grup seansları.', tag: 'Birebir', tone: 'brand' },
    { icon: 'Flame', name: 'Yetişkin Kick Boks', age: '16 — 45 yaş', desc: 'Yüksek kalori yakımı + teknik gelişim. Stresten arınmanın en hızlı yolu.', tag: 'Yoğun', tone: 'aqua' },
  ],
};

function BranchCard({ b }) {
  const IconCmp = I[b.icon];
  const isBrand = b.tone !== 'aqua';
  const accentBg   = isBrand ? 'bg-brand'          : 'bg-aqua';
  const accentText = isBrand ? 'text-brand-deep'   : 'text-aqua-deep';
  const accentSoft = isBrand ? 'bg-brand-soft'     : 'bg-aqua-soft';
  const tagColor   = isBrand ? 'text-brand-deep bg-brand-soft ring-brand/20' : 'text-aqua-deep bg-aqua-soft ring-aqua/20';
  const borderHover = isBrand ? 'group-hover:border-brand/40' : 'group-hover:border-aqua/40';
  const linkHover   = isBrand ? 'group-hover:text-brand'     : 'group-hover:text-aqua-deep';

  return (
    <article className={`group relative flex flex-col overflow-hidden bg-white rounded-card border border-line ${borderHover} shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300`}>

      {/* Top accent bar */}
      <span className={`block h-[4px] w-full ${accentBg} transition-all duration-300`}></span>

      <div className="flex flex-col flex-1 p-6 sm:p-7">

        {/* Header row: icon + tag */}
        <div className="flex items-start justify-between gap-3">
          <IconTile tone={b.tone} size={52}>
            <IconCmp width="26" height="26" />
          </IconTile>
          <span className={`mt-1 inline-flex items-center text-[11px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ring-1 ${tagColor}`}>
            {b.tag}
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-5 font-display font-bold text-[21px] leading-[1.2] text-ink tracking-tight">
          {b.name}
        </h3>

        {/* Description */}
        <p className="mt-2.5 text-[14px] text-ink-soft leading-[1.65] flex-1">
          {b.desc}
        </p>

        {/* Age badge */}
        <div className={`mt-5 self-start inline-flex items-center gap-1.5 text-[12px] font-mono font-medium ${accentText} ${accentSoft} rounded-full px-3 py-1`}>
          <I.Clock width="11" height="11" />
          {b.age}
        </div>

        {/* Divider */}
        <div className="mt-6 h-px bg-line"></div>

        {/* CTA link */}
        <Link
          to="/branslarimiz"
          className={`mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-ink-soft ${linkHover} transition-colors duration-200`}
        >
          Programı incele
          <I.Arrow
            width="14"
            height="14"
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>

      </div>

      {/* Bottom accent line: w-10 → full on hover */}
      <span className={`absolute left-0 bottom-0 h-[3px] w-10 ${accentBg} group-hover:w-full transition-all duration-500`}></span>
    </article>
  );
}

function Branches() {
  const [tab, setTab] = useState('kids');
  const list = BRANCHES[tab];
  return (
    <Section id="branches" label="03 Branches" className="py-20 sm:py-28">
      <div className="grid lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-7 reveal">
          <Eyebrow tone="aqua">Branşlarımız</Eyebrow>
          <h2 className="mt-4 font-display font-extrabold tracking-[-0.025em] text-[34px] sm:text-[44px] leading-[1.05] text-ink">
            Her yaşa, her hedefe<br /><span className="text-aqua-deep">özel bir program.</span>
          </h2>
        </div>
        <div className="lg:col-span-5 lg:text-right reveal" style={{ '--d': '120ms' }}>
          <p className="text-[15.5px] text-ink-soft max-w-[440px] lg:ml-auto">
            Çocuk gelişiminden yetişkin fitness'a; CİMCİMPARK'ta 6 disiplin, küçük gruplar ve birebir
            seanslarla sunuluyor.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8 flex items-center gap-2 reveal-up-sm">
        <div className="inline-flex p-1 bg-white border border-line rounded-pill shadow-soft">
          {[
            { id: 'kids',   label: 'Çocuk Branşları' },
            { id: 'adults', label: 'Yetişkin Branşları' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              aria-pressed={tab === t.id}
              className={`px-4 sm:px-5 py-2 rounded-pill text-[13.5px] font-semibold transition-all ${
                tab === t.id
                  ? 'bg-brand text-white shadow-soft'
                  : 'bg-white text-ink-muted hover:text-ink hover:bg-paper-soft'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cards — outer key={tab} remounts the grid so tab-fade replays;
          inner key={b.name + tab} guarantees each card is a fresh node per tab. */}
      <div key={tab} className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 tab-fade">
        {list.map((b) => <BranchCard key={b.name + tab} b={b} />)}
      </div>

      {/* Bottom strip */}
      <div className="reveal mt-12 rounded-card bg-gradient-to-br from-brand-soft to-aqua-soft border border-line p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8 justify-between">
        <div>
          <div className="font-display font-bold text-[20px] sm:text-[22px] tracking-tight text-ink">İlk dersin bizden hediye.</div>
          <div className="text-[14px] text-ink-soft mt-1">Branşına karar veremedin mi? Önce dene, sonra karar ver.</div>
        </div>
        <Link to="/iletisim" className="btn-primary inline-flex items-center gap-2 whitespace-nowrap">
          Ücretsiz Deneme Dersi
          <I.Arrow width="16" height="16" />
        </Link>
      </div>
    </Section>
  );
}

/* ====================================================================== */
/* WHY / FEATURES                                                         */
/* ====================================================================== */
function WhyUs() {
  const items = [
    { t: 'Sertifikalı Eğitmenler', d: 'Türkiye Cimnastik Federasyonu lisanslı, deneyimli kadro.' },
    { t: 'Aydınlık & Güvenli Stüdyo', d: 'Standartlara uygun zemin, hijyen ve güvenlik protokolleri.' },
    { t: 'Küçük Grup Seansları', d: 'Maksimum 8 kişilik gruplarla bireysel ilgi garantisi.' },
    { t: 'Esnek Saatler', d: 'Hafta içi 09:00 — 21:00, hafta sonu çocuk programları.' },
  ];
  return (
    <Section id="why" label="04 Why" tone="soft" className="py-20 sm:py-24">
      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 reveal">
          <Eyebrow tone="brand">Neden CİMCİMPARK?</Eyebrow>
          <h2 className="mt-4 font-display font-extrabold tracking-[-0.02em] text-[32px] sm:text-[40px] leading-[1.2] text-ink">
            Disiplinli eğitim,<br /> sıcak bir aile ortamı.
          </h2>
          <p className="mt-5 text-[15.5px] text-ink-soft max-w-[460px]">
            Hedefimiz sadece sportif başarı değil; sağlıklı bir bedenin, güçlü bir karakterin
            ve hayat boyu süren spor alışkanlığının temellerini atmak.
          </p>
          <div className="mt-7 flex items-center gap-4">
            <Link to="/hakkimizda" className="btn-ghost inline-flex items-center gap-2">Hakkımızda</Link>
            <Link to="/iletisim" className="text-[14px] font-semibold text-brand-deep hover:text-brand inline-flex items-center gap-1.5">
              Bize ulaşın <I.Arrow width="14" height="14" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
          {items.map((it, i) => (
            <div key={i} className="reveal bg-white border border-line rounded-card p-5 card-lift" style={{ '--d': `${i*80}ms` }}>
              <div className="flex items-center gap-3">
                <IconTile tone={i % 2 ? 'aqua' : 'brand'} size={40}>
                  <I.Check width="20" height="20" />
                </IconTile>
                <div className="font-display font-semibold text-[16px] text-ink">{it.t}</div>
              </div>
              <p className="mt-3 text-[14px] text-ink-soft leading-relaxed">{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ====================================================================== */
/* FOUNDER                                                                */
/* ====================================================================== */
function Founder() {
  const creds = [
    'III. Kademe TCF Cimnastik Antrenörü',
    'TCF Pilates Antrenörü (Mat & Reformer)',
    'Erciyes Üniv. — Beden Eğitimi ve Spor Mezunu',
    '8+ yıllık aktif antrenörlük tecrübesi',
  ];

  return (
    <Section id="founder" label="05 Founder" className="py-20 sm:py-28">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div className="lg:col-span-5 relative">
          <div className="reveal-fade relative">
            {/* TODO: CLIENT WILL REPLACE THIS IMAGE URL */}
            <Img
              src="/assets/founder.jpg"
              alt="Büşra FISTIK — Baş Antrenör"
              caption="KURUCU • Büşra FISTIK portresi"
              tone="aqua" aspect="4/5" className="shadow-card"
              focal="center top"
            />
            <div className="absolute -right-4 -bottom-4 sm:-right-6 sm:-bottom-6 bg-white rounded-card shadow-card border border-line px-5 py-4 max-w-[230px] reveal-up-sm" style={{ '--d': '500ms' }}>
              <div className="flex items-center gap-1 text-brand">
                {[0,1,2,3,4].map((i)=>(<I.Star key={i} width="13" height="13" />))}
              </div>
              <p className="mt-2 text-[13px] text-ink-soft leading-snug">
                "Kızım Büşra hocayla 6 ayda hem disiplin hem özgüven kazandı."
              </p>
              <div className="mt-2 text-[11.5px] font-semibold text-ink">Aysel K. — Veli</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="reveal">
            <Eyebrow tone="aqua">Kurucu & Baş Antrenör</Eyebrow>
            <h2 className="mt-4 font-display font-extrabold tracking-[-0.025em] text-[34px] sm:text-[44px] leading-[1.05] text-ink">
              Büşra FISTIK
            </h2>
            <div className="mt-2 text-[14px] font-mono text-ink-faint">III. Kademe TCF Antrenörü</div>
          </div>

          <p className="reveal mt-6 text-[16px] sm:text-[17px] leading-[1.65] text-ink-soft" style={{ '--d': '120ms' }}>
            Erciyes Üniversitesi Beden Eğitimi ve Spor bölümünde aldığı akademik temeli, sahada
            geçirdiği yıllarla birleştirdi. CİMCİMPARK'ı 2026'da Kahramanmaraş'ta;
            <span className="text-ink font-semibold"> "her çocuğun ilk takla anısı güvenli, her yetişkinin sporu sürdürülebilir olmalı" </span>
            felsefesiyle kurdu.
          </p>

          <ul className="reveal mt-7 grid sm:grid-cols-2 gap-x-6 gap-y-3" style={{ '--d': '200ms' }}>
            {creds.map((c, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[14px] text-ink-soft">
                <span className="mt-1 w-4 h-4 grid place-items-center rounded-full bg-brand-soft text-brand-deep flex-shrink-0">
                  <I.Check width="11" height="11" />
                </span>
                {c}
              </li>
            ))}
          </ul>

          <div className="reveal mt-8 flex flex-wrap items-center gap-4" style={{ '--d': '300ms' }}>
            <Link to="/iletisim" className="btn-primary inline-flex items-center gap-2">
              Birebir Seans Talep Et
              <I.Arrow width="16" height="16" />
            </Link>
            <Link to="/ekibimiz" className="text-[14px] font-semibold text-ink hover:text-brand-deep inline-flex items-center gap-1.5">
              Tüm ekibi tanı <I.Arrow width="14" height="14" />
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ====================================================================== */
/* ABOUT (story)                                                          */
/* ====================================================================== */
function About() {
  const timeline = [
    { y: '2024', t: 'Vizyon', d: 'Kahramanmaraş\'a uzman kadrolu modern bir cimnastik merkezi fikri olgunlaşır.' },
    { y: '2025', t: 'İnşa', d: '350 m² aydınlık stüdyo, profesyonel ekipman ve güvenli zemin sistemi.' },
    { y: '2026', t: 'Açılış', d: 'CİMCİMPARK kapılarını 6 branş ve uzman kadroyla açar.' },
    { y: '∞',     t: 'Misyon', d: 'Her yaştan üyeye sürdürülebilir, disiplinli ve sevdiren bir spor deneyimi.' },
  ];
  return (
    <Section id="about" label="06 About" tone="soft" className="py-20 sm:py-24">
      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 reveal">
          <Eyebrow>Hakkımızda</Eyebrow>
          <h2 className="mt-4 font-display font-extrabold tracking-[-0.02em] text-[32px] sm:text-[40px] leading-[1.18] text-ink">
            2026 Yılında <span className="text-brand">Kuruldu</span>
          </h2>
          <p className="mt-5 text-[15.5px] sm:text-[16px] leading-[1.7] text-ink-soft max-w-[480px]">
            2026 yılında tek bir hedefle yola çıktık: Sizin ve çocuğunuzun sağlıklı gelişimi.
          </p>
          <p className="mt-4 text-[15px] leading-[1.7] text-ink-muted max-w-[480px]">
            CİMCİMPARK; bir sporcunun deneyimleri, bir anne-babanın hassasiyeti ve bir antrenörün
            disiplinine sahip ekipler tarafından kuruldu. Misyonumuz; Kahramanmaraş'ta cimnastiği,
            pilatesi ve dövüş sanatlarını hak ettiği profesyonel ortamda buluşturmak.
          </p>
        </div>

        <div className="lg:col-span-7">
          <ol className="relative border-l-2 border-dashed border-brand/30 ml-4 space-y-4 sm:space-y-6">
            {timeline.map((t, i) => (
              <li key={i} className="reveal pl-7 pt-1 pb-10 sm:pb-12 relative" style={{ '--d': `${i*90}ms` }}>
                <span className="absolute -left-[10px] top-1 w-[18px] h-[18px] rounded-full bg-white border-2 border-brand grid place-items-center">
                  <span className="w-2 h-2 rounded-full bg-brand"></span>
                </span>
                <div className="font-mono text-[12px] text-brand-deep font-semibold tracking-wider">{t.y}</div>
                <div className="mt-2 font-display font-semibold text-[18px] text-ink">{t.t}</div>
                <div className="mt-2 text-[14.5px] text-ink-soft leading-relaxed max-w-[520px]">{t.d}</div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}

/* ====================================================================== */
/* GALLERY                                                                */
/* ====================================================================== */
// TODO: CLIENT WILL REPLACE THESE IMAGE URLs
const GALLERY = [
  { c: 'ANA SALON • geniş açı',     t: 'brand',   a: '4/3', src: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1400&q=80', span: 'lg:col-span-2 lg:row-span-2' },
  { c: 'Çocuk minder alanı',         t: 'aqua',    a: '4/3', src: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=900&q=80' },
  { c: 'Reformer pilates köşesi',   t: 'brand',   a: '4/3', src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80' },
  { c: 'Soyunma odası',              t: 'neutral', a: '4/3', src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80' },
  { c: 'Bekleme & resepsiyon',       t: 'aqua',    a: '4/3', src: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=900&q=80' },
  { c: 'Kick boks ringi',            t: 'brand',   a: '4/3', src: 'https://images.unsplash.com/photo-1517438476312-10d79c5f2c1e?auto=format&fit=crop&w=900&q=80' },
  { c: 'Eğitmen — hareket anı',     t: 'neutral', a: '4/3', src: 'https://images.unsplash.com/photo-1593810451137-2e44a8a4d3eb?auto=format&fit=crop&w=900&q=80' },
];

function Gallery() {
  const [open, setOpen] = useState(null);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowLeft')  setOpen((o) => o !== null ? (o - 1 + GALLERY.length) % GALLERY.length : null);
      if (e.key === 'ArrowRight') setOpen((o) => o !== null ? (o + 1) % GALLERY.length : null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <Section id="gallery" label="07 Gallery" className="py-20 sm:py-28">
      <div className="grid lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-7 reveal">
          <Eyebrow tone="brand">Galeri</Eyebrow>
          <h2 className="mt-4 font-display font-extrabold tracking-[-0.025em] text-[34px] sm:text-[44px] leading-[1.05] text-ink">
            Aydınlık stüdyolarımızı<br /> yakından gör.
          </h2>
        </div>
        <div className="lg:col-span-5 reveal" style={{ '--d': '120ms' }}>
          <p className="text-[15.5px] text-ink-soft max-w-[440px] lg:ml-auto lg:text-right">
            Her detayı sporcularımız ve velilerimiz için tasarlandı: ferah salon, kaliteli zemin,
            şeffaf ebeveyn izleme camı.
          </p>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {GALLERY.map((g, i) => (
          <button
            key={i}
            onClick={() => setOpen(i)}
            className={`reveal group relative rounded-card overflow-hidden text-left ${g.span || ''}`}
            style={{ '--d': `${i*70}ms` }}
          >
            <Img src={g.src} caption={g.c} alt={g.c} tone={g.t} aspect={g.a} className="transition-transform duration-500 group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute right-3 top-3 w-9 h-9 grid place-items-center rounded-full bg-white/90 text-ink opacity-0 group-hover:opacity-100 translate-y-[-4px] group-hover:translate-y-0 transition-all duration-300">
              <I.ArrowUR width="16" height="16" />
            </div>
          </button>
        ))}
      </div>

      {open !== null && (
        <div className="lightbox-backdrop" onClick={() => setOpen(null)}>
          <div className="relative max-w-[1100px] w-full" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setOpen(null)} aria-label="Kapat"
              className="absolute -top-12 right-0 w-10 h-10 grid place-items-center rounded-full bg-white text-ink hover:bg-brand hover:text-white transition-colors">
              <I.Close width="20" height="20" />
            </button>
            <Img src={GALLERY[open].src} caption={GALLERY[open].c} alt={GALLERY[open].c} tone={GALLERY[open].t} aspect="16/10" />
            <div className="mt-4 flex items-center justify-between text-white text-[13px]">
              <div className="font-mono">{String(open+1).padStart(2,'0')} / {String(GALLERY.length).padStart(2,'0')}</div>
              <div className="flex items-center gap-2">
                <button onClick={() => setOpen((open - 1 + GALLERY.length) % GALLERY.length)}
                  aria-label="Önceki fotoğraf"
                  className="w-9 h-9 grid place-items-center rounded-full bg-white/15 hover:bg-white/25 transition-colors">
                  <I.Arrow width="16" height="16" className="rotate-180" />
                </button>
                <button onClick={() => setOpen((open + 1) % GALLERY.length)}
                  aria-label="Sonraki fotoğraf"
                  className="w-9 h-9 grid place-items-center rounded-full bg-white/15 hover:bg-white/25 transition-colors">
                  <I.Arrow width="16" height="16" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}

/* ====================================================================== */
/* TESTIMONIALS                                                           */
/* ====================================================================== */
function Testimonials() {
  const t = [
    { q: 'Kızım 6 yaşında başladı, 4 ayda hem postürü hem özgüveni inanılmaz gelişti. Eğitmenlerin çocuklarla iletişimi mükemmel.', n: 'Esra Y.', r: 'Veli — Temel Cimnastik' },
    { q: 'Reformer pilates dersleri sayesinde yıllardır süren bel ağrılarımdan kurtuldum. Salon ferah, hocalar son derece profesyonel.', n: 'Merve A.', r: 'Üye — Reformer Pilates' },
    { q: 'Oğlumu taekwondoya yazdırdık, disiplin ve saygı konusunda ciddi bir fark gördük. Kahramanmaraş\'ta böyle bir yer şarttı.', n: 'Tuncay D.', r: 'Veli — Çocuk Taekwondo' },
  ];
  return (
    <Section id="testimonials" label="08 Testimonials" tone="soft" className="py-20 sm:py-24">
      <div className="reveal max-w-[720px]">
        <Eyebrow tone="aqua">Üyelerimiz anlatıyor</Eyebrow>
        <h2 className="mt-4 font-display font-extrabold tracking-[-0.025em] text-[32px] sm:text-[40px] leading-[1.08] text-ink">
          Kahramanmaraşlıların güvendiği<br /> spor adresi.
        </h2>
      </div>
      <div className="mt-10 grid md:grid-cols-3 gap-5">
        {t.map((x, i) => (
          <figure key={i} className="reveal card-lift bg-white border border-line rounded-card p-6 flex flex-col" style={{ '--d': `${i*100}ms` }}>
            <div className="flex items-center gap-1 text-brand">
              {[0,1,2,3,4].map((s)=>(<I.Star key={s} width="14" height="14" />))}
            </div>
            <blockquote className="mt-4 text-[15px] leading-relaxed text-ink-soft">"{x.q}"</blockquote>
            <figcaption className="mt-5 pt-5 border-t border-line flex items-center gap-3">
              <span className="w-10 h-10 rounded-full ph-stripe-aqua"></span>
              <div>
                <div className="text-[14px] font-semibold text-ink">{x.n}</div>
                <div className="text-[12px] text-ink-muted">{x.r}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

/* ====================================================================== */
/* CONTACT                                                                */
/* ====================================================================== */
function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', branch: 'Temel Cimnastik', message: '' });
  const [status, setStatus] = useState(null); // null | 'loading' | 'sent'

  const branches = [
    'Temel Cimnastik', 'Çocuk Taekwondo', 'Çocuk Kick Boks',
    'Mat Pilates', 'Reformer Pilates', 'Yetişkin Kick Boks',
  ];

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setStatus('loading');
    setTimeout(() => setStatus('sent'), 900);
  };

  return (
    <Section id="contact" label="09 Contact" className="py-20 sm:py-28">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="reveal">
            <Eyebrow tone="brand">İletişim</Eyebrow>
            <h2 className="mt-4 font-display font-extrabold tracking-[-0.025em] text-[34px] sm:text-[44px] leading-[1.05] text-ink">
              Ücretsiz deneme<br /> dersine bir form uzakta.
            </h2>
            <p className="mt-5 text-[15.5px] text-ink-soft max-w-[440px]">
              Formu doldurun, 24 saat içinde size uygun saatleri WhatsApp üzerinden iletelim.
            </p>
          </div>

          <ul className="reveal mt-8 space-y-5" style={{ '--d': '100ms' }}>
            {[
              { ic: 'Pin',   tone: 'brand', t: 'Adres', d: 'Tavşan Tepe, 69002. Sk No: 88/A\nOnikişubat / Kahramanmaraş' },
              { ic: 'Phone', tone: 'aqua',  t: 'Telefon', d: '0539 243 76 06', href: 'tel:+905392437606' },
              { ic: 'Whatsapp', brand: true, t: 'WhatsApp', d: 'Anında yanıt — wa.me/905392437606', href: 'https://wa.me/905392437606' },
              { ic: 'Clock', tone: 'brand', t: 'Çalışma Saatleri', d: 'Hafta içi 09:00 — 21:00\nC.tesi 09:00 — 18:00 · Pazar Kapalı' },
            ].map((it, i) => {
              const Ic = I[it.ic];
              const inner = (
                <div className="flex items-start gap-4">
                  {it.brand ? (
                    <Ic width="40" height="40" className="flex-shrink-0 rounded-[10px]" />
                  ) : (
                    <IconTile tone={it.tone} size={40} className="flex-shrink-0">
                      <Ic width="20" height="20" />
                    </IconTile>
                  )}
                  <div>
                    <div className="text-[12.5px] font-semibold uppercase tracking-wide text-ink-faint">{it.t}</div>
                    <div className="text-[14.5px] text-ink mt-0.5 whitespace-pre-line leading-snug">{it.d}</div>
                  </div>
                </div>
              );
              return (
                <li key={i}>
                  {it.href ? <a href={it.href} className="block hover:text-brand-deep transition-colors">{inner}</a> : inner}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Form + Map */}
        <div className="lg:col-span-7 space-y-5">
          <form onSubmit={submit} className="reveal bg-white border border-line rounded-card p-6 sm:p-8 shadow-soft" style={{ '--d': '120ms' }}>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="text-[12.5px] font-semibold text-ink-soft block mb-1.5">Ad Soyad</label>
                <input id="contact-name" className="input" placeholder="Adınız Soyadınız" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} required />
              </div>
              <div>
                <label htmlFor="contact-phone" className="text-[12.5px] font-semibold text-ink-soft block mb-1.5">Telefon</label>
                <input id="contact-phone" className="input" placeholder="0 5__ ___ __ __" value={form.phone} onChange={(e)=>setForm({...form, phone:e.target.value})} required />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="contact-branch" className="text-[12.5px] font-semibold text-ink-soft block mb-1.5">İlgilendiğiniz Branş</label>
              <select id="contact-branch" className="input" value={form.branch} onChange={(e)=>setForm({...form, branch:e.target.value})}>
                {branches.map((b) => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div className="mt-4">
              <label htmlFor="contact-message" className="text-[12.5px] font-semibold text-ink-soft block mb-1.5">Mesajınız (opsiyonel)</label>
              <textarea id="contact-message" className="input min-h-[110px] resize-y" placeholder="Yaş, hedef, tercih ettiğiniz gün/saat..." value={form.message} onChange={(e)=>setForm({...form, message:e.target.value})} />
            </div>
            <div className="mt-5 flex items-center justify-between gap-4 flex-wrap">
              <p className="text-[12px] text-ink-muted">Bilgileriniz KVKK kapsamında korunur; üçüncü taraflarla paylaşılmaz.</p>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary inline-flex items-center gap-2 disabled:opacity-70"
              >
                {status === 'sent' ? (<><I.Check width="16" height="16" /> Talebiniz alındı</>) : status === 'loading' ? 'Gönderiliyor...' : (<>Deneme Dersi İste <I.Arrow width="16" height="16" /></>)}
              </button>
            </div>
          </form>

          {/* Map */}
          <div className="reveal rounded-card overflow-hidden border border-line shadow-soft" style={{ '--d': '180ms' }}>
            <iframe
              title="CİMCİMPARK konumu"
              src="https://www.openstreetmap.org/export/embed.html?bbox=36.92%2C37.55%2C36.96%2C37.59&layer=mapnik&marker=37.575%2C36.94"
              className="w-full h-[300px] block"
              style={{ border: 0 }}
              loading="lazy"
            />
            <div className="bg-white px-5 py-3 flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2 text-[13.5px] text-ink-soft">
                <I.Pin width="16" height="16" className="text-brand-deep" />
                Tavşan Tepe, 69002. Sk No 88/A, Onikişubat / Kahramanmaraş
              </div>
              <a href="https://www.google.com/maps/search/?api=1&query=Tav%C5%9Fan+Tepe+69002+Sk+No+88+Onikisubat+Kahramanmaras"
                 target="_blank" rel="noreferrer"
                 className="text-[13px] font-semibold text-brand-deep hover:text-brand inline-flex items-center gap-1.5">
                Yol tarifi al <I.ArrowUR width="13" height="13" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ====================================================================== */
/* FOOTER                                                                 */
/* ====================================================================== */
function Footer() {
  return (
    <footer className="bg-paper-soft border-t border-line mt-8 pb-16 sm:pb-0">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10 py-14">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 text-[14px] text-ink-soft max-w-[340px] leading-relaxed">
              Kahramanmaraş'ın aydınlık, dinamik ve uzman kadrolu spor & cimnastik merkezi.
              Her yaş, her seviye için.
            </p>
            <div className="mt-5 flex items-center gap-2.5">
              <a href="https://www.instagram.com/cimcimparkk/" aria-label="Instagram" target="_blank" rel="noreferrer" className="hover:-translate-y-0.5 transition-transform rounded-xl overflow-hidden bg-gradient-to-br from-[#FFDD55] via-[#FF543E] to-[#C837AB] p-0.5 flex"><I.Instagram width="34" height="34" /></a>
              <a href="https://www.facebook.com/people/Cimcimparkk/61581461134869/" aria-label="Facebook" target="_blank" rel="noreferrer" className="hover:-translate-y-0.5 transition-transform"><I.Facebook width="34" height="34" /></a>
              <a href="https://wa.me/905392437606" aria-label="WhatsApp" target="_blank" rel="noreferrer" className="hover:-translate-y-0.5 transition-transform"><I.Whatsapp width="34" height="34" /></a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="text-[12px] font-semibold uppercase tracking-wider text-ink-faint">Site</div>
            <ul className="mt-4 space-y-2.5 text-[14px]">
              {[['/','Ana Sayfa'],['/hakkimizda','Hakkımızda'],['/branslarimiz','Branşlarımız'],['/ekibimiz','Ekibimiz'],['/galeri','Galeri'],['/blog','Blog'],['/iletisim','İletişim']].map(([to,l])=>(
                <li key={to}><Link to={to} className="text-ink-soft hover:text-brand-deep">{l}</Link></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="text-[12px] font-semibold uppercase tracking-wider text-ink-faint">Branşlar</div>
            <ul className="mt-4 space-y-2.5 text-[14px]">
              {['Temel Cimnastik','Mat Pilates','Reformer Pilates','Çocuk Taekwondo','Yetişkin Kick Boks'].map((b)=>(
                <li key={b}><Link to="/branslarimiz" className="text-ink-soft hover:text-brand-deep">{b}</Link></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="text-[12px] font-semibold uppercase tracking-wider text-ink-faint">İletişim</div>
            <ul className="mt-4 space-y-3 text-[14px] text-ink-soft">
              <li className="flex items-start gap-2"><I.Pin width="15" height="15" className="mt-0.5 text-brand-deep flex-shrink-0" />Tavşan Tepe, 69002. Sk No 88/A, Onikişubat / Kahramanmaraş</li>
              <li className="flex items-center gap-2"><I.Phone width="15" height="15" className="text-brand-deep" /><a href="tel:+905392437606" className="hover:text-brand-deep">0539 243 76 06</a></li>
              <li className="flex items-center gap-2"><I.Mail width="15" height="15" className="text-brand-deep" />info@cimcimpark.com</li>
            </ul>
          </div>
        </div>

        <div className="hairline my-10"></div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[12.5px] text-ink-muted">
          <div>© 2026 CİMCİMPARK · Tüm hakları saklıdır.</div>
          <div className="flex items-center gap-5">
            <Link to="/gizlilik" className="hover:text-ink">Gizlilik</Link>
            <Link to="/kvkk" className="hover:text-ink">KVKK Aydınlatma</Link>
            <Link to="/cerez" className="hover:text-ink">Çerez Politikası</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { SocialRail, Navbar, Hero, Trust, Branches, WhyUs, Founder, About, Gallery, Testimonials, Contact, Footer };

