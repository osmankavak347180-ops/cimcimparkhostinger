// sections.jsx — page sections
import React, { useState as useStateS, useEffect as useEffectS, useRef as useRefS } from 'react';
import { navigate, Link, Section, Eyebrow, IconTile, Counter, Img, Photo, Logo, I, useReveal } from './primitives';

/* ====================================================================== */
/* SOCIAL RAIL — official brand colors                                    */
/* ====================================================================== */
function SocialRail() {
  return (
    <>
      {/* Fixed right rail — visible on all screen sizes */}
      <aside className="social-rail-brand flex" aria-label="Sosyal medya">
        <a href="https://wa.me/905392437606?text=Merhaba%20B%C3%BC%C5%9Fra%20han%C4%B1m!%20Kurslar%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." aria-label="WhatsApp" target="_blank" rel="noreferrer" className="social-tile animate-pulse">
          <I.Whatsapp width="36" height="36" />
        </a>
      </aside>
    </>
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useStateS(false);
  useEffectS(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Yukarı çık"
      className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-brand shadow-lift flex items-center justify-center hover:bg-brand-deep transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}

/* ====================================================================== */
/* NAVBAR                                                                 */
/* ====================================================================== */
function Navbar({ route }) {
  const [scrolled, setScrolled] = useStateS(false);
  const [open, setOpen] = useStateS(false);

  useEffectS(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile sheet on route change
  useEffectS(() => { setOpen(false); }, [route]);

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
          <a href="/uye-girisi.html" className="nav-link whitespace-nowrap text-[13px] font-medium text-ink-soft hover:text-ink">
            Üyelik Takip
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/iletisim" className="btn-primary text-[13px] !py-2.5 !px-4 whitespace-nowrap hidden sm:inline-flex items-center gap-2">
            Ücretsiz Deneme Dersi
            <I.Arrow width="15" height="15" />
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menü"
            className="lg:hidden rounded-[6px]"
            style={{ backgroundColor: '#FF6B00', color: 'white', padding: '6px 10px', border: 'none' }}
          >
            {open ? <I.Close width="20" height="20" /> : (
              <span className="flex flex-col items-center gap-0.5">
                <I.Menu width="24" height="24" />
                <span style={{ fontSize: '10px', fontWeight: 600, color: 'white', letterSpacing: '0.05em', lineHeight: 1 }}>MENÜ</span>
              </span>
            )}
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
          <a href="/uye-girisi.html" className="py-3 border-b border-line text-[16px] font-semibold text-ink flex items-center justify-between">
            Üyelik Takip
            <I.Arrow width="16" height="16" className="text-ink-faint" />
          </a>
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
  // Slayt 1 — gerçek CimCimPark çocuk cimnastik dersi (lokal, preload ile eşleşir)
  {
    src: 'assets/hero-slide-1.webp',
    mobileSrc: 'assets/hero-mobile-1.webp',
    alt: 'CimCimPark çocuk cimnastik dersi — minder & çember çalışması',
    tint: 'from-brand/40 to-aqua/30',
    title: 'Çocuğunun Geleceğine',
    titleAccent: 'En İyi Yatırımı Yap!',
    subtitle: 'Çocuğunun fiziksel ve zihinsel gelişimini şansa bırakma. Güvenli stüdyolarımızda her seviyeye özel programlar.',
    cta: 'Programları Keşfet ve Kaydol!',
    ctaTo: '/branslarimiz',
  },
  // Slayt 2 — gerçek CimCimPark çocuk hareket
  {
    src: 'assets/hero-slide-2.webp',
    mobileSrc: 'assets/hero-mobile-2.webp',
    alt: 'CimCimPark çocuk cimnastik dersi',
    tint: 'from-brand-deep/40 to-aqua-deep/30',
    title: "Kahramanmaraş'ın En Aydınlık,",
    titleAccent: 'En Modern Cimnastik Merkezi',
    subtitle: 'Uzman eğitmenlerimiz ve son teknoloji tesisimizle tanışın. İlk dersiniz bizden!',
    cta: 'Hemen Başla!',
    ctaTo: '/iletisim',
    focal: 'center top',
  },
  // Slayt 3 — yetişkin pilates / genel kitle
  {
    src: 'assets/hero-slide-3-new.webp',
    mobileSrc: 'assets/hero-mobile-3.webp',
    alt: 'Yetişkin kadın pilates seansı',
    tint: 'from-aqua/40 to-brand/30',
    title: 'Kendi Sınırlarını Keşfet,',
    titleAccent: 'Gücünü Zirveye Taşı!',
    subtitle: 'Profesyonel eğitmenlerimizle hayalindeki forma kavuşmak için daha fazla bekleme. Gücünü ve potansiyelini bugünden keşfet.',
    cta: 'Ücretsiz Deneme Dersi Al!',
    ctaTo: '/iletisim',
  },
];

function Hero() {
  const [active, setActive] = useStateS(0);
  const [paused, setPaused] = useStateS(false);
  const copyRef = useRefS(null);

  useEffectS(() => {
    if (paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % HERO_SLIDES.length), 6000);
    return () => clearInterval(id);
  }, [paused]);

  // Replay the reveal animation on every slide change. The page-level
  // IntersectionObserver in useReveal only observes nodes that exist at mount,
  // so for slide-driven content we manage the .in class manually.
  useEffectS(() => {
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
      className="relative overflow-hidden bg-ink h-[480px] md:h-[520px] lg:h-[560px] flex"
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
            <img
              src={s.src}
              alt={s.alt}
              className="hero-bg-desktop hero-kenburns"
              style={{ objectPosition: s.focal || 'center center' }}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : 'auto'}
            />
            <img
              src={s.mobileSrc}
              alt={s.alt}
              className="hero-bg-mobile hero-kenburns"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : 'auto'}
            />
          </div>
        ))}
        {/* Readability overlay — light touch so the photos read brightly while keeping
            enough contrast for white text (which also carries a drop-shadow). */}
        <div className="absolute inset-0 bg-ink/15 sm:bg-ink/10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/10 via-transparent to-ink/45"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(17,24,39,0.15)_95%)]"></div>
      </div>

      {/* Content — mobilde 100svh içinde dikey ortalanır, masaüstünde padding ile nefes alır */}
      <div className="relative w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10 py-6 sm:py-8 text-center text-white flex flex-col justify-center items-center overflow-hidden h-full">
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
            className="reveal mt-3 sm:mt-4 mx-auto font-display font-extrabold tracking-[-0.025em] text-[22px] xs:text-[26px] sm:text-[36px] lg:text-[44px] leading-[1.12] max-w-[22ch] text-balance drop-shadow-[0_2px_20px_rgba(0,0,0,0.75)]"
            style={{ '--d': '80ms' }}
          >
            <span className="block">{HERO_SLIDES[active].title}</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand via-brand to-aqua">
              {HERO_SLIDES[active].titleAccent}
            </span>
          </h1>

          <p
            className="reveal mt-3 sm:mt-4 mx-auto text-[13px] sm:text-[16px] leading-[1.5] text-white max-w-[560px] text-balance drop-shadow-[0_1px_8px_rgba(0,0,0,0.60)]"
            style={{ '--d': '160ms' }}
          >
            {HERO_SLIDES[active].subtitle}
          </p>

          <div className="reveal mt-4 sm:mt-5 flex items-center justify-center" style={{ '--d': '240ms' }}>
            <Link to={HERO_SLIDES[active].ctaTo} className="btn-primary btn-hero inline-flex items-center gap-2">
              {HERO_SLIDES[active].cta}
              <I.Arrow width="16" height="16" />
            </Link>
          </div>
        </div>

        {/* Slider prev/next arrows */}
        <button onClick={() => setActive((active - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
          aria-label="Önceki slayt"
          className="hero-nav-btn absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white rounded-full p-2 transition-colors shadow-soft items-center justify-center">
          <I.Arrow width="20" height="20" className="rotate-180 text-ink" />
        </button>
        <button onClick={() => setActive((active + 1) % HERO_SLIDES.length)}
          aria-label="Sonraki slayt"
          className="hero-nav-btn absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white rounded-full p-2 transition-colors shadow-soft items-center justify-center">
          <I.Arrow width="20" height="20" className="text-ink" />
        </button>

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
    // Stat özel: rakam yerine '3-65' yazı olarak gösterilir.
    { display: '3-65', label: '3-65 Yaş Aralığı',     sub: 'Herkes için spor' },
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
const BRANCH_PHOTOS = [
  { name: 'Çocuk Cimnastik Kursu',        age: '6-12 Yaş',     src: 'assets/branch-cocuk-jimnastik.webp',   tone: 'brand', href: '/cocuk-cimnastik-kursu.html'  },
  { name: 'Genç Cimnastik Kursu',          age: '12-18 Yaş',    src: 'assets/branch-genc-jimnastik.webp',    tone: 'aqua',  href: '/genc-cimnastik-kursu.html'   },
  { name: 'Cimnastik Kursu',               age: 'Tüm Yaşlar',   src: 'assets/branch-jimnastik.webp',         tone: 'brand', href: '/cimnastik-kursu.html'        },
  { name: 'Okul Öncesi Cimnastik Kursu',   age: '3-6 Yaş',      src: 'assets/branch-okul-oncesi.webp',       tone: 'brand', href: '/okul-oncesi-cimnastik.html'  },
  { name: 'Artistik Cimnastik Kursu',      age: 'İleri Seviye', src: 'assets/branch-artistik-v2.webp',          tone: 'aqua',  href: '/artistik-cimnastik.html'     },
  { name: 'Reformer Pilates',              age: '18-65 Yaş',    src: 'assets/branch-reformer-pilates.webp',  tone: 'aqua',  href: '/reformer-pilates.html'       },
  { name: 'Mat Pilates',                   age: '16-65 Yaş',    src: 'assets/branch-mat-pilates.webp',       tone: 'aqua',  href: '/mat-pilates.html'            },
  { name: 'Çocuk Taekwondo',               age: '6-14 Yaş',     src: 'assets/branch-cocuk-taekwondo.webp',   tone: 'brand', href: '/cocuk-taekwondo.html'        },
  { name: 'Çocuk Kick Boks',               age: '8-14 Yaş',     src: 'assets/branch-cocuk-kickboks.webp',    tone: 'brand', href: '/cocuk-kick-boks.html'        },
  { name: 'Yetişkin Kick Boks',            age: '16-45 Yaş',    src: 'assets/branch-kickboks-v2.webp', tone: 'aqua',  href: '/yetiskin-kick-boks.html'     },
];

function BranchPhotoCard({ b }) {
  return (
    <a
      href={b.href || '/branslarimiz'}
      className="group relative block overflow-hidden rounded-card"
      style={{ aspectRatio: '3/4' }}
    >
      {/* Gradient fallback */}
      <div className={`absolute inset-0 ${b.tone === 'brand' ? 'bg-gradient-to-br from-brand to-brand-deep' : 'bg-gradient-to-br from-aqua to-aqua-deep'}`} />
      {/* Photo */}
      <img
        src={b.src}
        alt={b.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        loading="lazy"
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />
      {/* Dark gradient overlay bottom-up */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
      {/* Age badge top-left */}
      <span
        className={`absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-full text-white ${b.tone === 'brand' ? 'bg-brand' : 'bg-aqua'}`}
      >
        {b.age}
      </span>
      {/* Branch name bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="font-display font-bold text-[15px] sm:text-[16px] leading-[1.25] text-white">
          {b.name}
        </h3>
      </div>
    </a>
  );
}

function BranchPhotoGrid() {
  return (
    <Section id="branches" label="03 Branches" className="py-20 sm:py-28">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 reveal">
        <div>
          <Eyebrow tone="brand">Branşlarımız</Eyebrow>
          <h2 className="mt-4 font-display font-extrabold tracking-[-0.025em] text-[30px] sm:text-[42px] leading-[1.08] text-ink">
            CİMCİMPARK'ta Hangi<br />
            <span className="text-brand-deep">Branş Seni Bekliyor?</span>
          </h2>
        </div>
        <a
          href="https://wa.me/905392437606"
          target="_blank"
          rel="noreferrer"
          className="btn-primary inline-flex items-center gap-2 whitespace-nowrap self-start sm:self-auto"
        >
          <I.Whatsapp width="17" height="17" />
          Ücretsiz Deneme Dersi
        </a>
      </div>

      {/* Grid */}
      <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 reveal" style={{ '--d': '80ms' }}>
        {BRANCH_PHOTOS.map((b) => (
          <BranchPhotoCard key={b.name} b={b} />
        ))}
      </div>
    </Section>
  );
}

/* Keep old Branches as alias so BranchesPage still works */
const Branches = BranchPhotoGrid;

/* ====================================================================== */
/* WHY / FEATURES — enhanced                                              */
/* ====================================================================== */
function WhyUs() {
  const stats = [
    { n: '10+', l: 'Branş' },
    { n: '500+', l: 'Mutlu Öğrenci' },
    { n: '3-65', l: 'Yaş' },
    { n: '7+', l: 'Yıl' },
  ];
  const cards = [
    { ico: 'trainer', t: 'Uzman Eğitmen Kadrosu',            d: 'Yıllarca deneyim ve federasyon sertifikaları ile donanmış kadromuz her sporcuya bireysel ilgi gösterir.',    tag: 'Sertifikalı', tone: 'brand' },
    { ico: 'shield',  t: 'Güvenli & Bakımlı Ekipmanlar',     d: 'Uluslararası standartlara uygun, periyodik bakımlı ekipmanlarımızla güvenlik her zaman önceliğimizdir.',    tag: 'Uluslararası Standart', tone: 'aqua' },
    { ico: 'age',     t: 'Yaşa Özel Programlar',             d: '3 yaşından 65 yaşına kadar her bireye özel tasarlanmış müfredat ve seans programları.',                       tag: '3-65 Yaş', tone: 'brand' },
    { ico: 'cert',    t: 'Federasyona Bağlı Resmi Eğitim',   d: 'TCF lisanslı antrenörlerimizle resmi müfredat dahilinde eğitim — sporun temelleri sağlam atılıyor.',          tag: 'TCF Lisanslı', tone: 'aqua' },
    { ico: 'trophy',  t: 'Yarışma & Gösteri Deneyimi',       d: 'Yıl sonu gösterisi ve resmi yarışmalar ile öğrencilerimize sahne ve rekabet deneyimi kazandırıyoruz.',        tag: 'Yıl Sonu Gösterisi', tone: 'brand' },
    { ico: 'heart',   t: 'Aile Dostu Sıcak Ortam',           d: 'Öğrenci ve ailelerinin kendini evinde hissedeceği samimi, güler yüzlü bir spor ailesi sizi bekliyor.',        tag: 'Aile & Öğrenci Odaklı', tone: 'aqua' },
  ];
  const icons = {
    trainer: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    shield:  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    age:     <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M13 7a4 4 0 11-8 0 4 4 0 018 0" /></svg>,
    cert:    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>,
    trophy:  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
    heart:   <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
  };
  return (
    <section id="why-us" className="py-20 sm:py-28 bg-paper-soft">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
        <div className="reveal text-center max-w-[640px] mx-auto">
          <Eyebrow tone="brand">Neden CİMCİMPARK?</Eyebrow>
          <h2 className="mt-4 font-display font-extrabold tracking-[-0.02em] text-[32px] sm:text-[42px] leading-[1.15] text-ink">
            Güvenilir, Sertifikalı, <span className="text-brand">Sonuç Odaklı</span>
          </h2>
          <p className="mt-4 text-[16px] text-ink-soft leading-relaxed">
            Hedefimiz sadece sportif başarı değil; sağlıklı beden, güçlü karakter ve hayat boyu süren spor alışkanlığı.
          </p>
        </div>

        {/* Stats strip */}
        <div className="reveal mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4" style={{ '--d': '80ms' }}>
          {stats.map((s, i) => (
            <div key={i} className="text-center bg-white rounded-card border border-line shadow-soft py-5 px-3">
              <div className="font-display font-extrabold text-[32px] sm:text-[36px] text-brand leading-none">{s.n}</div>
              <div className="mt-1 text-[13px] text-ink-muted font-medium">{s.l}</div>
            </div>
          ))}
        </div>

        {/* 6 cards */}
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((c, i) => (
            <div key={i} className="reveal bg-white border border-line rounded-card p-6 transition-all duration-300 hover:-translate-y-[5px] hover:shadow-lift" style={{ '--d': `${i * 60}ms` }}>
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${c.tone === 'brand' ? 'bg-brand-soft text-brand-deep' : 'bg-aqua-soft text-aqua-deep'}`}>
                {icons[c.ico]}
              </div>
              <h3 className="font-display font-bold text-[15.5px] text-ink leading-snug">{c.t}</h3>
              <p className="mt-2 text-[13.5px] text-ink-soft leading-relaxed">{c.d}</p>
              <div className={`mt-3 inline-block text-[11px] font-semibold px-2.5 py-1 rounded-pill ${c.tone === 'brand' ? 'bg-brand-soft text-brand-deep' : 'bg-aqua-soft text-aqua-deep'}`}>
                {c.tag}
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <div className="reveal mt-10 text-center" style={{ '--d': '200ms' }}>
          <a
            href="https://wa.me/905392437606"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 bg-brand text-white font-display font-bold rounded-btn shadow-lift px-7 py-4 text-[15px] hover:bg-brand-deep hover:-translate-y-1 transition-all duration-300"
          >
            <I.Whatsapp width="22" height="22" />
            Ücretsiz Deneme Dersi Al
          </a>
        </div>
      </div>
    </section>
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
              src="assets/founder.jpg"
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
const GALLERY = [
  { c: 'CimcimPark', t: 'brand',   src: 'assets/cimcimpark-1.webp', span: 'lg:col-span-2 lg:row-span-2' },
  { c: 'CimcimPark', t: 'neutral', src: 'assets/cimcimpark-2.webp' },
  { c: 'CimcimPark', t: 'aqua',    src: 'assets/cimcimpark-3.webp' },
  { c: 'CimcimPark', t: 'brand',   src: 'assets/cimcimpark-4.webp' },
  { c: 'CimcimPark', t: 'neutral', src: 'assets/cimcimpark-5.webp' },
  { c: 'CimcimPark', t: 'brand',   src: 'assets/cimcimpark-6.webp' },
  { c: 'CimcimPark', t: 'aqua',    src: 'assets/cimcimpark-7.webp' },
  { c: 'CimcimPark', t: 'neutral', src: 'assets/cimcimpark-8.webp' },
  { c: 'CimcimPark', t: 'brand',   src: 'assets/cimcimpark-9.webp' },
];

function Gallery() {
  const [open, setOpen] = useStateS(null);
  useEffectS(() => {
    const pending = sessionStorage.getItem('galleryOpen');
    if (pending !== null) {
      sessionStorage.removeItem('galleryOpen');
      setOpen(parseInt(pending, 10));
    }
  }, []);
  useEffectS(() => {
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
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-90 z-50" onClick={() => setOpen(null)}>
          <div className="relative max-w-[1100px] w-full px-6" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setOpen(null)} aria-label="Kapat"
              className="absolute -top-12 right-6 w-10 h-10 grid place-items-center rounded-full bg-white text-ink hover:bg-brand hover:text-white transition-colors">
              <I.Close width="20" height="20" />
            </button>
            <div className="relative">
              <img src={GALLERY[open].src} alt={GALLERY[open].c}
                className="max-h-[90vh] max-w-[90vw] object-contain w-full rounded-card mx-auto block" />
              <button onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + GALLERY.length) % GALLERY.length); }}
                aria-label="Önceki fotoğraf"
                className="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 grid place-items-center rounded-full bg-white/15 hover:bg-white/25 transition-colors text-white">
                <I.Arrow width="18" height="18" className="rotate-180" />
              </button>
              <button onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % GALLERY.length); }}
                aria-label="Sonraki fotoğraf"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 grid place-items-center rounded-full bg-white/15 hover:bg-white/25 transition-colors text-white">
                <I.Arrow width="18" height="18" />
              </button>
            </div>
            <div className="mt-4 flex items-center justify-center text-white text-[13px]">
              <div className="font-mono">{String(open+1).padStart(2,'0')} / {String(GALLERY.length).padStart(2,'0')}</div>
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
  const [form, setForm] = useStateS({ name: '', phone: '', branch: 'Temel Cimnastik', message: '' });
  const [status, setStatus] = useStateS(null); // null | 'loading' | 'sent'

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

/* ====================================================================== */
/* AGE GROUPS                                                             */
/* ====================================================================== */
function AgeGroups() {
  const groups = [
    {
      tag: 'Çocuklar', age: '6-12 Yaş',
      title: 'Küçük Adımlar, Büyük Gelişimler!',
      img: 'assets/branch-cocuk-jimnastik.webp', alt: 'Çocuk cimnastik dersi',
      color: '#F97316', softBg: '#FFF7ED',
      points: ['Denge ve koordinasyon gelişimi', 'Sosyal beceri ve takım ruhu', 'Kemik ve kas gelişimine katkı', 'Uzman eğitmenle güvenli ortam'],
      reverse: false,
    },
    {
      tag: 'Gençler', age: '12-18 Yaş',
      title: 'Enerjiyi Doğru Kanalize Et!',
      img: 'assets/branch-genc-jimnastik.webp', alt: 'Genç cimnastik dersi',
      color: '#06B6D4', softBg: '#ECFEFF',
      points: ['Stres azaltma ve zihinsel rahatlama', 'Özgüven ve liderlik gelişimi', 'Akran grubuyla motivasyon', 'Vücut farkındalığı ve postür'],
      reverse: true,
    },
    {
      tag: 'Yetişkinler', age: '18+ Yaş',
      title: 'Sağlıklı Beden, Zinde Yaşam!',
      img: 'assets/branch-reformer-pilates.webp', alt: 'Reformer pilates dersi',
      color: '#8B5CF6', softBg: '#F5F3FF',
      points: ['Core güçlendirme ve stabilite', 'Esneklik ve eklem sağlığı', 'Stres atma ve iç huzur', 'Pilates, cimnastik ve kickboks seçenekleri'],
      reverse: false,
    },
  ];
  return (
    <section id="age-groups" className="py-20 sm:py-28 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
        <div className="reveal text-center max-w-[600px] mx-auto mb-16">
          <Eyebrow tone="brand">Her Yaşa Uygun</Eyebrow>
          <h2 className="mt-4 font-display font-extrabold tracking-[-0.02em] text-[32px] sm:text-[42px] leading-[1.15] text-ink">
            Yaşınıza Özel <span className="text-brand">Program</span>
          </h2>
          <p className="mt-4 text-[16px] text-ink-soft">
            3'ten 65'e kadar her bireyin ihtiyacına göre tasarlanmış programlarla başlayın.
          </p>
        </div>
        {groups.map((g, i) => (
          <div key={i} className={`reveal flex flex-col ${g.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 lg:gap-16 items-center ${i < groups.length - 1 ? 'mb-20' : ''}`} style={{ '--d': `${i * 100}ms` }}>
            <div className="w-full lg:w-1/2 relative">
              <div className="relative overflow-hidden rounded-card shadow-card" style={{ aspectRatio: '4/3' }}>
                <img src={g.img} alt={g.alt} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  onError={(e) => { e.currentTarget.style.backgroundColor = '#f3f4f6'; }} />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${g.color}40, transparent 60%)` }}></div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full opacity-20 blur-2xl pointer-events-none" style={{ backgroundColor: g.color }}></div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill text-[12px] font-bold mb-4" style={{ backgroundColor: g.softBg, color: g.color }}>
                <span>{g.age}</span>
                <span className="w-1 h-1 rounded-full" style={{ backgroundColor: g.color }}></span>
                <span>{g.tag}</span>
              </div>
              <h3 className="font-display font-extrabold text-[26px] sm:text-[34px] leading-[1.15] text-ink tracking-[-0.02em]">{g.title}</h3>
              <ul className="mt-6 space-y-3">
                {g.points.map((p, j) => (
                  <li key={j} className="flex items-center gap-3 text-[15px] text-ink-soft">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: g.softBg }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={g.color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex items-center gap-4">
                <a href="https://wa.me/905392437606" target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-[14px] px-5 py-3 rounded-btn text-white shadow-soft hover:-translate-y-0.5 transition-all duration-300"
                  style={{ backgroundColor: g.color }}>
                  <I.Whatsapp width="17" height="17" />
                  Hemen Başla
                </a>
                <Link to="/branslarimiz" className="text-[14px] font-semibold text-ink-soft hover:text-ink inline-flex items-center gap-1.5">
                  Detaylı Bilgi <I.Arrow width="14" height="14" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ====================================================================== */
/* HOME GALLERY                                                            */
/* ====================================================================== */
function HomeGallery() {
  const photos = [
    { src: 'assets/cimcimpark-1.webp', label: 'CimcimPark', span: 'g-big' },
    { src: 'assets/cimcimpark-2.webp', label: 'CimcimPark', span: '' },
    { src: 'assets/cimcimpark-3.webp', label: 'CimcimPark', span: 'g-tall' },
    { src: 'assets/cimcimpark-4.webp', label: 'CimcimPark', span: '' },
    { src: 'assets/cimcimpark-5.webp', label: 'CimcimPark', span: '' },
    { src: 'assets/cimcimpark-6.webp', label: 'CimcimPark', span: 'g-wide' },
    { src: 'assets/cimcimpark-7.webp', label: 'CimcimPark', span: '' },
    { src: 'assets/cimcimpark-8.webp', label: 'CimcimPark', span: '' },
    { src: 'assets/cimcimpark-9.webp', label: 'CimcimPark', span: '' },
  ];
  const openInGallery = (i) => {
    sessionStorage.setItem('galleryOpen', String(i));
    navigate('/galeri');
  };
  return (
    <section id="home-gallery" className="py-20 sm:py-28 bg-paper-soft">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
        <div className="reveal text-center max-w-[600px] mx-auto mb-10">
          <Eyebrow tone="aqua">Galeri</Eyebrow>
          <h2 className="mt-4 font-display font-extrabold tracking-[-0.02em] text-[32px] sm:text-[42px] leading-[1.15] text-ink">
            CimcimPark'ı <span className="text-brand">Yakından</span> Tanıyın!
          </h2>
          <p className="mt-4 text-[16px] text-ink-soft">
            Stüdyomuz, ekipmanlarımız ve öğrencilerimizin enerjisi — gözlerinizle görün.
          </p>
        </div>
        <div className="gallery-masonry reveal" style={{ '--d': '80ms' }}>
          {photos.map((p, i) => (
            <div key={i} className={`gallery-item ${p.span}`} onClick={() => openInGallery(i)}
              role="button" tabIndex={0} aria-label={p.label}
              onKeyDown={(e) => e.key === 'Enter' && openInGallery(i)}>
              <img src={p.src} alt={p.label} loading="lazy" className="gallery-img"
                onError={(e) => { e.currentTarget.style.backgroundColor = '#f3f4f6'; }} />
              <div className="gallery-overlay"><span className="gallery-label">{p.label}</span></div>
            </div>
          ))}
        </div>
        <div className="reveal mt-8 text-center" style={{ '--d': '200ms' }}>
          <a href="https://www.instagram.com/cimcimparkk/" target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2.5 border border-line bg-white rounded-btn px-6 py-3.5 text-[14px] font-semibold text-ink hover:border-brand hover:text-brand transition-colors shadow-soft">
            <I.Instagram width="20" height="20" />
            Instagram'da Daha Fazla Gör
          </a>
        </div>
      </div>
    </section>
  );
}

/* ====================================================================== */
/* FAQ                                                                     */
/* ====================================================================== */
function FAQ() {
  const [open, setOpen] = useStateS(null);
  const items = [
    { q: 'Başlamak için en uygun yaş nedir?',
      a: '3 yaşından itibaren çocuklar okul öncesi ve temel cimnastik programlarına katılabilir. Yetişkinler için herhangi bir yaş sınırı yoktur — 65 yaşında başlayanlarımız bile var!' },
    { q: 'Kurs ücretleri ne kadar?',
      a: 'Kurs ücretleri branş, gün sayısı ve seans süresine göre değişmektedir. Güncel fiyat listesi için WhatsApp veya telefon üzerinden bize ulaşabilirsiniz.' },
    { q: 'Ücretsiz deneme dersi var mı?',
      a: 'Evet! Tüm yeni üyelerimize 1 seans ücretsiz deneme dersi sunuyoruz. WhatsApp üzerinden mesaj atarak uygun gün ve saati birlikte ayarlayabiliriz.' },
    { q: 'Stüdyo güvenli mi? Çocuğum yaralanır mı?',
      a: 'Güvenlik en büyük önceliğimizdir. Tüm ekipmanlar uluslararası standartlara uygundur, zeminler koruyucu matlarla kaplıdır ve her seans boyunca eğitmen gözetimi sağlanmaktadır.' },
    { q: 'Haftada kaç gün antrenman yapılıyor?',
      a: 'Branşa göre değişmekle birlikte genellikle haftada 2-3 gün antrenman yapılmaktadır. Esnek saat seçeneklerimizle okul ve iş programlarınıza uyum sağlıyoruz.' },
    { q: 'Çocuğumun yeteneği var mı?',
      a: 'Ücretsiz deneme dersimizde eğitmenlerimiz çocuğunuzun ilgisini ve potansiyelini değerlendirir. Yetenek zamanla gelişir — en önemli şey başlamaktır!' },
    { q: 'Taekwondo ve Kick Boks dersleri var mı?',
      a: 'Evet! Çocuk Taekwondo, Çocuk Kick Boks ve Yetişkin Kick Boks branşlarımız bulunmaktadır. Branşlarımız sayfasından tüm programları inceleyebilirsiniz.' },
    { q: 'İlk derse ne getirmeliyim?',
      a: 'Rahat spor kıyafeti ve kapalı burun spor ayakkabı ile gelin. Cimnastik derslerinde çorap veya çıplak ayakla çalışılmaktadır. Su şişesi ve küçük havlu getirmenizi öneririz.' },
  ];
  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="max-w-[800px] mx-auto px-5 sm:px-8 lg:px-10">
        <div className="reveal text-center mb-12">
          <Eyebrow tone="brand">SSS</Eyebrow>
          <h2 className="mt-4 font-display font-extrabold tracking-[-0.02em] text-[32px] sm:text-[42px] leading-[1.15] text-ink">
            Sıkça Sorulan <span className="text-brand">Sorular</span>
          </h2>
          <p className="mt-4 text-[16px] text-ink-soft">
            Cevabını bulamadığınız soru var mı? WhatsApp'tan bize yazın.
          </p>
        </div>
        <div className="space-y-3">
          {items.map((it, i) => (
            <div key={i} className="reveal border border-line rounded-card overflow-hidden" style={{ '--d': `${i * 40}ms` }}>
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left bg-white hover:bg-paper-soft transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}>
                <span className="font-display font-semibold text-[15px] text-ink leading-snug">{it.q}</span>
                <span className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${open === i ? 'rotate-180 bg-brand border-brand text-white' : 'border-line text-ink-muted'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"/></svg>
                </span>
              </button>
              <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: open === i ? '300px' : '0' }}>
                <p className="px-6 py-4 text-[14.5px] text-ink-soft leading-relaxed border-t border-line bg-paper-soft">{it.a}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="reveal mt-12 bg-ink rounded-card p-8 text-center" style={{ '--d': '200ms' }}>
          <p className="text-white/70 text-[14px] mb-2">Başka sorunuz mu var?</p>
          <h3 className="font-display font-bold text-white text-[22px] mb-5">Hemen WhatsApp'tan Yazın!</h3>
          <a href="https://wa.me/905392437606" target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2.5 bg-brand text-white font-bold rounded-btn px-6 py-3.5 text-[15px] hover:bg-brand-deep hover:-translate-y-0.5 transition-all duration-300">
            <I.Whatsapp width="20" height="20" />
            WhatsApp'ta Mesaj At
          </a>
        </div>
      </div>
    </section>
  );
}

/* ====================================================================== */
/* SOCIAL MEDIA                                                            */
/* ====================================================================== */
function SocialMedia() {
  const posts = [
    { img: 'assets/branch-cocuk-jimnastik.webp', label: 'Çocuk Cimnastik' },
    { img: 'assets/branch-mat-pilates.webp',      label: 'Mat Pilates' },
    { img: 'assets/branch-reformer-pilates.webp', label: 'Reformer Pilates' },
    { img: 'assets/branch-genc-jimnastik.webp',   label: 'Genç Cimnastik' },
    { img: 'assets/branch-artistik-v2.webp',         label: 'Artistik' },
    { img: 'assets/branch-kickboks-v2.webp',label: 'Kick Boks' },
  ];
  return (
    <section id="social-media" className="py-20 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
        <div className="reveal grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Phone mock */}
          <div className="flex justify-center">
            <div className="relative w-60 sm:w-64" style={{ perspective: '1200px' }}>
              <div className="relative bg-[#1a1a1a] rounded-[32px] p-2.5 shadow-lift" style={{ transform: 'rotateY(-8deg) rotateX(3deg)' }}>
                <div className="bg-black rounded-[26px] overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-2 bg-black">
                    <span className="text-white/80 text-[11px] font-medium">9:41</span>
                    <div className="w-16 h-3 bg-black rounded-full mx-auto"></div>
                    <span className="text-white/60 text-[10px]">●●●</span>
                  </div>
                  <div className="bg-white px-3 py-2.5 flex items-center gap-2.5 border-b border-gray-100">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand to-brand-deep flex items-center justify-center text-white text-[10px] font-bold">C</div>
                    <div>
                      <div className="text-[11px] font-bold text-black">cimcimparkk</div>
                      <div className="text-[9px] text-gray-400">Kahramanmaraş</div>
                    </div>
                    <div className="ml-auto" style={{ color: '#E1306C' }}>
                      <I.Instagram width="16" height="16" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-px bg-gray-200">
                    {posts.map((p, i) => (
                      <div key={i} className="aspect-square overflow-hidden">
                        <img src={p.img} alt={p.label} loading="lazy" className="w-full h-full object-cover"
                          onError={(e) => { e.currentTarget.style.backgroundColor = '#e5e7eb'; }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-44 h-12 bg-brand/20 rounded-full blur-2xl pointer-events-none"></div>
            </div>
          </div>

          {/* Content */}
          <div>
            <Eyebrow tone="brand">Sosyal Medya</Eyebrow>
            <h2 className="mt-4 font-display font-extrabold text-[30px] sm:text-[40px] leading-[1.15] text-ink tracking-[-0.02em]">
              Bizi Instagram'dan <span className="text-brand">Takip Edin!</span>
            </h2>
            <p className="mt-4 text-[15.5px] text-ink-soft leading-relaxed max-w-[440px]">
              Öğrencilerimizin gelişimlerini, yıl sonu gösterilerini ve günlük antrenman anlarını takip edin. Ailenin bir parçası olun!
            </p>
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
              <a href="https://www.instagram.com/cimcimparkk/" target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2.5 text-white font-bold rounded-btn px-5 py-3 text-[14px] hover:-translate-y-0.5 transition-transform shadow-soft"
                style={{ background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)' }}>
                <I.Instagram width="18" height="18" />
                Instagram'da Takip Et
              </a>
              <a href="https://wa.me/905392437606" target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2.5 text-white font-bold rounded-btn px-5 py-3 text-[14px] hover:-translate-y-0.5 transition-transform shadow-soft bg-[#25D366]">
                <I.Whatsapp width="18" height="18" />
                WhatsApp
              </a>
              <a href="https://www.facebook.com/people/Cimcimparkk/61581461134869/" target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2.5 text-white font-bold rounded-btn px-5 py-3 text-[14px] hover:-translate-y-0.5 transition-transform shadow-soft bg-[#1877F2]">
                <I.Facebook width="18" height="18" />
                Facebook
              </a>
            </div>
            <div className="mt-6 inline-flex items-center gap-2 bg-white border border-line rounded-pill px-4 py-2 shadow-soft">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
              <span className="text-[13px] font-semibold text-ink">Aktif ve Canlı</span>
              <span className="text-[13px] text-ink-muted">— @cimcimparkk</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ====================================================================== */
/* CTA STRIP                                                               */
/* ====================================================================== */
function CTAStrip() {
  return (
    <>
      {/* Thin announcement bar */}
      <div className="bg-brand py-3 text-center px-4">
        <p className="text-white font-semibold text-[13.5px]">
          🎁 Ücretsiz deneme dersi için hemen yazın! —{' '}
          <a href="https://wa.me/905392437606" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:no-underline font-bold">
            WhatsApp'a Yaz
          </a>
        </p>
      </div>

      {/* Main dark banner */}
      <section id="cta-strip" className="relative overflow-hidden py-20 sm:py-28" style={{ backgroundColor: '#111827' }}>
        <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(249,115,22,.18) 0%, transparent 70%)' }}></div>
        <div className="absolute -bottom-24 -right-16 w-[480px] h-[480px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(6,182,212,.12) 0%, transparent 70%)' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(249,115,22,.06) 0%, transparent 70%)' }}></div>

        <div className="relative max-w-[900px] mx-auto px-5 sm:px-8 lg:px-10 text-center">
          <div className="reveal">
            <Eyebrow tone="brand">Başlamak İçin Doğru An</Eyebrow>
            <h2 className="mt-5 font-display font-extrabold text-[34px] sm:text-[50px] lg:text-[56px] leading-[1.1] tracking-[-0.03em] text-white">
              Enerjini Zirveye Taşı:<br />
              <span className="text-brand">Cimnastikle</span> Kendini Yeniden Keşfet!
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed max-w-[560px] mx-auto" style={{ color: 'rgba(255,255,255,.7)' }}>
              Ücretsiz deneme dersinizi alın, stüdyomuzu görün ve CİMCİMPARK ailesinin bir parçası olun.
            </p>
          </div>
          <div className="reveal mt-10 flex flex-col sm:flex-row items-center justify-center gap-4" style={{ '--d': '120ms' }}>
            <a href="https://wa.me/905392437606" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-3 bg-brand text-white font-display font-bold rounded-btn px-8 py-4 text-[16px] hover:bg-brand-deep hover:-translate-y-1 transition-all duration-300 shadow-lift">
              <I.Whatsapp width="24" height="24" />
              WhatsApp'tan Yaz
            </a>
            <a href="tel:+905392437606"
              className="inline-flex items-center gap-3 font-semibold rounded-btn px-8 py-4 text-[16px] transition-colors"
              style={{ background: 'rgba(255,255,255,.1)', color: '#fff', outline: '1px solid rgba(255,255,255,.2)' }}
              onMouseOver={e => e.currentTarget.style.background='rgba(255,255,255,.18)'}
              onMouseOut={e => e.currentTarget.style.background='rgba(255,255,255,.1)'}>
              <I.Phone width="20" height="20" />
              0539 243 76 06
            </a>
          </div>
          <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-3" style={{ '--d': '200ms' }}>
            {[['🎁','Ücretsiz Deneme'],['👶','3-65 Yaş'],['🏅','10 Branş'],['⚡','Anında Yanıt']].map(([ico, txt], i) => (
              <div key={i} className="flex items-center gap-2 rounded-pill px-4 py-2 text-[13px] font-medium" style={{ background: 'rgba(255,255,255,.1)', color: '#fff' }}>
                <span>{ico}</span><span>{txt}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating WhatsApp button */}
      <a href="https://wa.me/905392437606" target="_blank" rel="noreferrer" aria-label="WhatsApp ile yazın"
        className="fixed bottom-20 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lift hover:scale-110 transition-transform"
        style={{ backgroundColor: '#25D366', animation: 'whatsapp-pulse 2.5s ease-in-out infinite' }}>
        <I.Whatsapp width="28" height="28" />
      </a>
    </>
  );
}

/* ====================================================================== */
/* SPLIT PROMO                                                            */
/* ====================================================================== */
function SplitPromo() {
  return (
    <section data-screen-label="SplitPromo" className="overflow-hidden md:hidden">
      <div className="flex flex-col">

        {/* Alt (mobil): Metin + buton */}
        <div className="order-2 relative overflow-hidden flex items-center px-8 py-12" style={{ background: 'linear-gradient(135deg, #EA580C 0%, #9A3412 100%)' }}>
          <div className="absolute pointer-events-none rounded-full bg-white/10" style={{ width: 360, height: 360, top: -120, right: -90 }}></div>
          <div className="absolute pointer-events-none rounded-full bg-aqua/20" style={{ width: 240, height: 240, bottom: -80, left: 20 }}></div>
          <div className="relative z-10">
            <p className="text-[13px] font-semibold text-white/80 leading-snug">
              Enerjisi Bitmeyen Çocuklar İçin Harika Bir Başlangıç!
            </p>
            <div className="mt-4 w-9 rounded-full bg-white/45" style={{ height: 3 }}></div>
            <h2 className="mt-5 font-display font-extrabold text-[26px] leading-[1.13] tracking-[-0.02em] text-white">
              Güvenli Eller, Mutlu Çocuklar:
              <span className="block" style={{ color: 'rgba(255,255,255,.88)' }}>Cimnastiğin İlk Adımları Bizimle!</span>
            </h2>
            <a
              href="https://wa.me/905392437606"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-3 bg-white text-brand-deep font-display font-bold rounded-btn shadow-card"
              style={{ padding: '14px 28px', fontSize: 15 }}
            >
              <I.Whatsapp width="22" height="22" />
              Hemen Kayıt Ol
            </a>
          </div>
        </div>

        {/* Üst (mobil): Fotoğraf */}
        <div className="order-1 relative overflow-hidden" style={{ minHeight: '260px' }}>
          <img
            src="assets/split-promo-gymnasts.webp"
            alt="CİMCİMPARK — Cimnastik yapan çocuklar"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>

      </div>
    </section>
  );
}

Object.assign(window, {
  SocialRail, ScrollToTop, Navbar, Hero, Trust, Branches, BranchPhotoGrid, WhyUs, Founder, About, Gallery, Testimonials, Contact, Footer, SplitPromo,
  AgeGroups, HomeGallery, FAQ, SocialMedia, CTAStrip,
});

export { SocialRail, ScrollToTop, Navbar, Hero, Trust, Branches, BranchPhotoGrid, WhyUs, Founder, About, Gallery, Testimonials, Contact, Footer, SplitPromo, AgeGroups, HomeGallery, FAQ, SocialMedia, CTAStrip };
