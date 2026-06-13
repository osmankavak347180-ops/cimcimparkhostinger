// pages.jsx — route compositions
// Each page composes existing sections + a PageHeader band.

const { useState: useStateP, useEffect: useEffectP } = React;

/* ---------------- Page header band ---------------- */
function PageHeader({ eyebrow, title, accent, lede, crumbs }) {
  return (
    <section className="page-band">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10 py-14 sm:py-20">
        {crumbs && (
          <nav className="reveal flex items-center gap-2 text-[12.5px] text-ink-muted" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-brand-deep">Ana Sayfa</Link>
            <span>/</span>
            <span className="text-ink">{crumbs}</span>
          </nav>
        )}
        <div className="mt-4 reveal" style={{ '--d': '60ms' }}>
          {eyebrow && <Eyebrow tone="brand">{eyebrow}</Eyebrow>}
        </div>
        <h1 className="reveal mt-4 font-display font-extrabold tracking-[-0.025em] text-[40px] sm:text-[56px] leading-[1.1] text-ink max-w-[860px]" style={{ '--d': '120ms' }}>
          {title} {accent && <span className="text-brand">{accent}</span>}
        </h1>
        {lede && (
          <p className="reveal mt-5 text-[17px] leading-[1.6] text-ink-soft max-w-[640px]" style={{ '--d': '200ms' }}>
            {lede}
          </p>
        )}
      </div>
    </section>
  );
}

/* ====================================================================== */
/* HOME PAGE                                                              */
/* ====================================================================== */
function HomePage() {
  useEffectP(() => {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://cimcimpark.com/');
    return () => {};
  }, []);
  return (
    <>
      <Hero />
      <Trust />
      <Branches />
      <WhyUs />
      <Founder />
      <Testimonials />
      <FinalCTA />
    </>
  );
}

/* ---- Reusable final CTA strip (home / contact) ---- */
function FinalCTA() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
        <div className="reveal relative overflow-hidden rounded-card border border-line shadow-card bg-gradient-to-br from-brand to-brand-deep p-8 sm:p-12 text-white">
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/10 blur-2xl"></div>
          <div className="absolute -left-12 -bottom-16 w-60 h-60 rounded-full bg-aqua/30 blur-2xl"></div>
          <div className="relative grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="text-[12px] font-semibold uppercase tracking-wider text-white/80">Bugün başla</div>
              <h2 className="mt-3 font-display font-extrabold text-[30px] sm:text-[40px] leading-[1.1] tracking-[-0.02em]">
                İlk dersin bizden hediye, gerisi sana kalmış.
              </h2>
              <p className="mt-4 text-[16px] text-white/90 max-w-[560px]">
                Formu doldur, en uygun gün ve saatte CİMCİMPARK'ta görüşelim.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
              <Link to="/iletisim" className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-btn bg-white text-brand-deep font-semibold hover:translate-y-[-2px] transition-transform shadow-lift">
                Ücretsiz Deneme Dersi
                <I.Arrow width="16" height="16" />
              </Link>
              <a href="https://wa.me/905392437606" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-btn bg-white/15 ring-1 ring-white/30 text-white font-semibold hover:bg-white/25 transition-colors">
                <I.Whatsapp width="22" height="22" />
                WhatsApp ile yaz
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ====================================================================== */
/* HAKKIMIZDA                                                             */
/* ====================================================================== */
function AboutPage() {
  useEffectP(() => {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://cimcimpark.com/hakkimizda');
    return () => {};
  }, []);
  return (
    <>
      <PageHeader
        crumbs="Hakkımızda"
        eyebrow="Hakkımızda"
        title="Kahramanmaraş'ın aydınlık spor evi."
        lede="2026 yılında tek bir hedefle yola çıktık: Sizin ve çocuğunuzun sağlıklı gelişimi. Modern stüdyolarımız, uzman kadromuz ve disiplinli ama sıcak ortamımızla her yaşa hitap ediyoruz."
      />
      <About />
      <Founder />
      <WhyUs />
      <FinalCTA />
    </>
  );
}

/* ====================================================================== */
/* BRANŞLAR                                                               */
/* ====================================================================== */
const BRANCHES_FAQ = [
  {
    q: 'Kaç yaşından itibaren kayıt yaptırabilirsiniz?',
    a: 'CİMCİMPARK\'ta dersler 4 yaşından itibaren başlamaktadır. Temel cimnastik ve çocuk taekwondo programlarımız 4 yaş ve üzeri için tasarlanmıştır.'
  },
  {
    q: 'Hangi branşlarda eğitim veriyorsunuz?',
    a: 'Temel Cimnastik (4-12 yaş), Çocuk Taekwondo (6-14 yaş), Çocuk Kick Boks, Mat Pilates, Reformer Pilates ve Yetişkin Kick Boks olmak üzere 6 branşta eğitim sunuyoruz.'
  },
  {
    q: 'Ücretsiz deneme dersi alabilir miyim?',
    a: 'Evet. Tüm branşlarımızda ilk ders ücretsizdir. İletişim formumuzu doldurarak veya 0539 243 76 06 numaralı hattımızı arayarak randevu oluşturabilirsiniz.'
  },
  {
    q: 'Eğitmenleriniz sertifikalı mı?',
    a: 'Evet. Tüm eğitmenlerimiz Türkiye Cimnastik Federasyonu (TCF) ve ilgili spor federasyonlarının lisans belgelerine sahiptir.'
  },
  {
    q: 'Dersler haftada kaç gün yapılmaktadır?',
    a: 'Branşa ve yaş grubuna göre haftada 2-3 gün seçenekleri mevcuttur. Yoğun çalışmak isteyen üyeler için ek seans imkânı da sağlanabilmektedir.'
  },
];

function FAQItem({ q, a, delay }) {
  const [open, setOpen] = useStateP(false);
  return (
    <div className="reveal rounded-card border border-line bg-white overflow-hidden" style={{ '--d': `${delay}ms` }}>
      <button
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-display font-semibold text-[16px] text-ink leading-snug">{q}</span>
        <span className={`flex-shrink-0 w-6 h-6 rounded-full border grid place-items-center transition-transform duration-200 ${open ? 'rotate-45 bg-brand text-white border-brand' : 'border-line bg-paper-soft text-ink-muted'}`}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5 text-[15px] text-ink-soft leading-[1.7]">{a}</div>
      )}
    </div>
  );
}

function FAQSection() {
  useEffectP(() => {
    const el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = 'schema-faq';
    el.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': BRANCHES_FAQ.map(({ q, a }) => ({
        '@type': 'Question',
        'name': q,
        'acceptedAnswer': { '@type': 'Answer', 'text': a }
      }))
    });
    document.head.appendChild(el);
    return () => { const s = document.getElementById('schema-faq'); if (s) s.remove(); };
  }, []);

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
        <div className="reveal max-w-[640px] mb-10">
          <Eyebrow tone="brand">Sık sorulan sorular</Eyebrow>
          <h2 className="mt-4 font-display font-extrabold tracking-[-0.02em] text-[30px] sm:text-[36px] leading-[1.18] text-ink">
            Aklınızdaki sorulara cevap.
          </h2>
        </div>
        <div className="space-y-3">
          {BRANCHES_FAQ.map(({ q, a }, i) => (
            <FAQItem key={i} q={q} a={a} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BranchesPage() {
  useEffectP(() => {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://cimcimpark.com/branslarimiz');
    return () => {};
  }, []);
  return (
    <>
      <PageHeader
        crumbs="Branşlarımız"
        eyebrow="6 disiplin · 4-65 yaş"
        title="Her yaşa, her hedefe"
        accent="özel bir program."
        lede="Çocuğun ilk takla denemesinden yetişkinin reformer seansına kadar, küçük gruplar ve birebir seanslarla profesyonel eğitim."
      />
      <Branches />
      <BranchesDetailed />
      <FAQSection />
      <FinalCTA />
    </>
  );
}

function BranchesDetailed() {
  // Detailed branch info cards — long-form view for the dedicated page
  const detailed = [
    { name: 'Temel Cimnastik', age: '4 — 12 yaş', duration: '60 dk', freq: 'Haftada 2-3', tone: 'brand', src: 'https://images.unsplash.com/photo-1611280889834-c4c0a05d4b34?auto=format&fit=crop&w=900&q=80', pts: ['Esneklik ve denge çalışmaları', 'Minder & paralel bar tekniği', 'Disiplinli ısınma & soğuma'] },
    { name: 'Reformer Pilates', age: '18 — 65 yaş', duration: '50 dk', freq: '2-4 kişilik grup / birebir', tone: 'aqua', src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80', pts: ['Yaylı reformer sistemi', 'Postür ve omurga sağlığı', 'Bireysel programlama'] },
    { name: 'Çocuk Taekwondo', age: '6 — 14 yaş', duration: '60 dk', freq: 'Haftada 2', tone: 'brand', src: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?auto=format&fit=crop&w=900&q=80', pts: ['Kuşak sistemi ile motivasyon', 'Refleks ve denge gelişimi', 'Saygı ve disiplin kültürü'] },
  ];
  return (
    <section className="py-16 sm:py-20 bg-paper-soft">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
        <div className="reveal max-w-[640px]">
          <Eyebrow tone="aqua">Detaylı bakış</Eyebrow>
          <h2 className="mt-4 font-display font-extrabold tracking-[-0.02em] text-[30px] sm:text-[36px] leading-[1.18] text-ink">
            Programlarımız nasıl işler?
          </h2>
        </div>
        <div className="mt-10 grid lg:grid-cols-3 gap-5">
          {detailed.map((d, i) => (
            <article key={d.name} className="reveal bg-white border border-line rounded-card overflow-hidden card-lift" style={{ '--d': `${i*100}ms` }}>
              {/* TODO: CLIENT WILL REPLACE THIS IMAGE URL */}
              <Img src={d.src} alt={d.name} caption={d.name} tone={d.tone} aspect="16/10" />
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-[19px] text-ink tracking-tight">{d.name}</h3>
                  <span className="font-mono text-[11.5px] text-ink-faint">{d.age}</span>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-[12px]">
                  <span className="chip"><I.Clock width="12" height="12" className="inline -mt-0.5 mr-1 text-brand-deep" />{d.duration}</span>
                  <span className="chip">{d.freq}</span>
                </div>
                <ul className="mt-4 space-y-2">
                  {d.pts.map((p, j) => (
                    <li key={j} className="flex items-start gap-2 text-[14px] text-ink-soft">
                      <span className="mt-1 w-4 h-4 grid place-items-center rounded-full bg-brand-soft text-brand-deep flex-shrink-0">
                        <I.Check width="11" height="11" />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                <Link to="/iletisim" className="mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-brand-deep hover:text-brand">
                  Bu programa katıl <I.ArrowUR width="14" height="14" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====================================================================== */
/* EKİBİMİZ                                                              */
/* ====================================================================== */
const TRAINERS = [
  {
    name: 'Büşra PAKYARDIM',
    role: 'Kurucu & Baş Antrenör',
    branch: 'CİMNASTİK & PİLATES',
    photo: 'assets/trainer-busra.webp',
    instagram: 'https://instagram.com/cimcimparkk',
    whatsapp: 'https://wa.me/905392437606',
    credentials: [
      'Beden Eğitimi ve Spor Öğretmenliği',
      '3. Kademe Kıdemli Artistik Cimnastik Antrenörü',
      '1. Kademe Hareket Eğitimi Uzmanı',
      'TCF Pilates Eğitmeni',
    ],
    edu: 'Erciyes Üniversitesi Spor Bilimleri Fakültesi',
    soon: false,
  },
  {
    name: 'Hüsniye TUĞRUL',
    role: 'Mat Pilates & Reformer Antrenörü',
    branch: 'PİLATES',
    photo: 'assets/trainer-husniye.webp',
    whatsapp: 'https://wa.me/905392437606',
    credentials: ['TCF Pilates Eğitmeni'],
    soon: false,
  },
  {
    name: 'Zeynep GÜLELLİ',
    role: 'Cimnastik & Atletizm Eğitmeni',
    branch: 'CİMNASTİK',
    photo: 'assets/trainer-zeynep.webp',
    whatsapp: 'https://wa.me/905392437606',
    credentials: [
      '3. Kademe Yüzme Antrenörü',
      '1. Kademe Genel Cimnastik Eğitmeni',
      '1. Kademe Atletizm Eğitmeni',
    ],
    edu: 'KSÜ Spor Bilimleri Fakültesi',
    soon: false,
  },
  {
    name: 'Hatice FISTIK',
    role: 'Cimnastik Yardımcı Eğitmeni',
    branch: 'CİMNASTİK',
    photo: 'assets/trainer-hatice.webp',
    whatsapp: 'https://wa.me/905392437606',
    credentials: [
      'Aktif Cimnastikçi & Yarışmacı Geçmişi',
      '4 Yıldır CimcimPark Eğitmeni',
    ],
    soon: false,
  },
  {
    name: 'Nisa KÖSE',
    role: 'Cimnastik Yardımcı Eğitmeni',
    branch: 'CİMNASTİK',
    photo: 'assets/trainer-nisa.webp',
    whatsapp: 'https://wa.me/905392437606',
    soon: false,
  },
];

function TeamCard({ m, i }) {
  const isAqua = m.branch === ‘TAEKWONDO’;
  const branchChip = isAqua ? ‘text-aqua-deep bg-aqua-soft’ : ‘text-brand-deep bg-brand-soft’;
  return (
    <article
      className="reveal card-lift bg-white border border-line rounded-card overflow-hidden flex flex-col"
      style={{ ‘--d’: `${i * 100}ms` }}
    >
      {/* Photo */}
      <div className="relative">
        {m.photo && !m.soon
          ? (
            <div className="relative overflow-hidden" style={{ aspectRatio: ‘3/4’ }}>
              <img
                src={m.photo}
                alt={`${m.name} — portre`}
                className="w-full h-full object-cover"
                style={{ objectPosition: ‘top center’ }}
                loading="lazy"
              />
            </div>
          )
          : <Photo caption={m.soon ? `${m.branch} Antrenörü — yakında` : `${m.name} — portre`} tone={isAqua ? ‘aqua’ : ‘brand’} aspect="3/4" />
        }
        {m.soon && (
          <span className="absolute top-3 left-3 text-[11px] font-semibold uppercase tracking-wide bg-ink/70 text-white px-2.5 py-1 rounded-full backdrop-blur-sm">
            Yakında
          </span>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display font-bold text-[20px] text-ink tracking-tight">
          {m.soon ? <span className="text-ink-faint italic">Eklenecek</span> : m.name}
        </h3>
        <div className="mt-1 text-[13.5px] font-semibold text-brand">{m.role}</div>

        <div className="mt-3">
          <span className={`inline-flex items-center text-[11.5px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${branchChip}`}>
            {m.branch}
          </span>
        </div>

        {m.edu && (
          <div className="mt-3">
            <span className="inline-flex items-center text-[11.5px] font-medium text-ink-soft bg-paper-soft border border-line px-2.5 py-1 rounded-full">
              🎓 {m.edu}
            </span>
          </div>
        )}

        {m.credentials && m.credentials.length > 0 && (
          <ul className="mt-3 space-y-1">
            {m.credentials.map((c, idx) => (
              <li key={idx} className="flex items-start gap-2 text-[13px] text-ink-soft">
                <span className="mt-[3px] w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
                {c}
              </li>
            ))}
          </ul>
        )}

        {m.bio && (
          <p className="mt-3 text-[13.5px] text-ink-soft leading-relaxed">
            {m.bio}
          </p>
        )}

        <div className="mt-auto pt-5 flex items-center gap-2">
          <div className="flex items-center gap-2">
            {m.instagram && (
              <a
                href={m.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label={`${m.name || m.branch} — Instagram`}
                className="w-9 h-9 grid place-items-center rounded-full border border-line text-ink-soft hover:text-ink hover:border-brand hover:bg-brand-soft transition-colors"
              >
                <I.Instagram width="18" height="18" />
              </a>
            )}
            {m.whatsapp && (
              <a
                href={m.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label={`${m.name || m.branch} — WhatsApp’tan yaz`}
                className="w-9 h-9 grid place-items-center rounded-full border border-line text-ink-soft hover:text-ink hover:border-brand hover:bg-brand-soft transition-colors"
              >
                <I.Whatsapp width="18" height="18" />
              </a>
            )}
          </div>
          <Link
            to="/iletisim"
            className="ml-auto inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink hover:text-brand transition-colors"
          >
            İletişim <I.ArrowUR width="13" height="13" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function TeamPage() {
  useEffectP(() => {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://cimcimpark.com/ekibimiz');
    return () => {};
  }, []);
  return (
    <>
      <PageHeader
        crumbs="Ekibimiz"
        eyebrow="Ekibimiz"
        title="Uzman kadromuzla"
        accent="tanışın."
        lede="Her biri alanında sertifikalı, tutkulu ve deneyimli eğitmenlerimiz sizin ve çocuğunuzun yanında."
      />

      <section className="py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TRAINERS.map((m, i) => <TeamCard key={i} m={m} i={i} />)}
          </div>

          {/* Bottom CTA strip */}
          <div className="reveal mt-16 rounded-card bg-gradient-to-br from-brand-soft to-aqua-soft border border-line p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8 justify-between">
            <div>
              <div className="font-display font-bold text-[22px] sm:text-[26px] tracking-tight text-ink">
                Ekibimizle çalışmak ister misin?
              </div>
              <div className="mt-2 text-[14.5px] text-ink-soft max-w-[480px]">
                Eksiksiz bir tanışma seansıyla başlayalım. İlk dersin bizden hediye.
              </div>
            </div>
            <Link to="/iletisim" className="btn-primary inline-flex items-center gap-2 whitespace-nowrap">
              Ücretsiz Deneme Dersi Al
              <I.Arrow width="16" height="16" />
            </Link>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}

/* ====================================================================== */
/* GALERİ                                                                 */
/* ====================================================================== */
function GalleryPage() {
  useEffectP(() => {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://cimcimpark.com/galeri');
    return () => {};
  }, []);
  return (
    <>
      <PageHeader
        crumbs="Galeri"
        eyebrow="Stüdyomuzu keşfet"
        title="Aydınlık, ferah ve modern"
        accent="bir spor evi."
        lede="Salonumuzu, ekipmanlarımızı ve antrenman atmosferimizi yakından görün. Görsele tıklayarak büyütebilirsiniz."
      />
      <Gallery />
    </>
  );
}

/* ====================================================================== */
/* BLOG                                                                   */
/* ====================================================================== */
const BLOG_POSTS = [
  /* ---- Grup 1: CİMCİMPARK / Yerel SEO ---- */
  {
    slug: 'kahramanmaras-cocuk-cimnastik-kursu',
    title: 'Kahramanmaraş Çocuk Cimnastik Kursu | 4–12 Yaş | CİMCİMPARK',
    metaDescription: 'Kahramanmaraş çocuk cimnastik kursu arıyorsanız CİMCİMPARK doğru adres. Onikişubat\'ta 4-12 yaş için profesyonel, güvenli ve eğlenceli cimnastik eğitimi.',
    category: 'Çocuk Cimnastik',
    date: '15 Mayıs 2026',
    readTime: '10 dk',
    excerpt: 'Kahramanmaraş\'ın ilk profesyonel çocuk cimnastik merkezi CİMCİMPARK\'ta 4–12 yaş arası minikler için özel tasarlanmış programları keşfedin. Esneklik, denge ve özgüven bir arada.',
    tone: 'brand',
    src: 'https://images.unsplash.com/photo-1611280889834-c4c0a05d4b34?auto=format&fit=crop&w=900&q=80',
    content: `<p><strong>Kahramanmaraş çocuk cimnastik</strong> eğitiminde yeni bir dönem başlıyor. <strong>CİMCİMPARK</strong>, Onikişubat ilçesinde kurduğu modern cimnastik stüdyosuyla 4–12 yaş arası çocuklara uluslararası standartlarda eğitim sunmaktadır. Çocuğunuzun hem fiziksel hem de zihinsel gelişimine katkı sağlayan <strong>kahramanmaraş çocuk cimnastik</strong> programlarımız, alanında uzman eğitmenler gözetiminde titizlikle yürütülmektedir.</p>

<h2>Neden CİMCİMPARK'ta Çocuk Cimnastiği?</h2>

<p>Kahramanmaraş'ta kaliteli <strong>çocuk cimnastik</strong> eğitimi arayanlar için <strong>CİMCİMPARK</strong>, birçok açıdan fark yaratmaktadır. Türkiye Cimnastik Federasyonu lisanslı eğitmenlerimiz, her çocuğun bireysel hızına ve ihtiyaçlarına göre uyarlanmış programlar uygulamaktadır. Güvenlik en öncelikli konumuzdur; tüm ekipmanlar düzenli bakımdan geçirilmekte, zeminler darbe emen materyallerle döşenmektedir.</p>

<ul>
<li><strong>TCF Lisanslı Eğitmenler:</strong> Türkiye Cimnastik Federasyonu onaylı eğitim metodolojisi</li>
<li><strong>Küçük Gruplar:</strong> Azami 8 kişilik gruplarda bireysel ilgi</li>
<li><strong>Güvenli Donanım:</strong> Olimpik standartlarda minder, barfiks ve jimnastik ekipmanları</li>
<li><strong>4 Yaştan İtibaren:</strong> Yaşa uygun müfredat ile en erken başlangıç fırsatı</li>
</ul>

<h2>Cimnastik Eğitiminin Yaşa Göre İçeriği</h2>

<h3>4–6 Yaş: Keşif ve Hareket Dönemi</h3>

<p>Bu yaş grubunda temel motor becerilerin temeli atılır. Programımız oyun tabanlı aktiviteler, müzikli hareket seansları ve cimnastiğe giriş niteliğindeki temel egzersizlerden oluşur. Takla, yuvarlama, kelebek ve yan dönüş hareketleri, çocuğun günlük eğlencesinin ayrılmaz bir parçası haline gelir. <strong>Kahramanmaraş çocuk cimnastik</strong> programımızda bu yaş grubundaki miniklerimiz için haftada 2 gün, 45 dakikalık seanslar düzenlenmektedir.</p>

<h3>7–9 Yaş: Teknik Gelişim Dönemi</h3>

<p>Motor becerilerin hızla pekiştiği bu dönemde paralel bar, denge aleti ve trambolin çalışmaları başlar. Eğitmenlerimiz, her çocuğun güçlü yönlerini belirleyerek bireysel gelişim planları oluşturur. Aylık değerlendirme raporlarıyla veliler de sürecin aktif bir parçasıdır. <strong>CİMCİMPARK</strong>'ta bu yaş grubu haftada 2–3 gün, 60 dakikalık seanslarla çalışmaktadır.</p>

<h3>10–12 Yaş: Performans ve Yarışma Dönemi</h3>

<p>İl ve bölge düzeyinde müsabakalara hazırlık bu aşamada başlar. İleri teknik çalışmalar, kondisyon geliştirme ve zihinsel hazırlık seansları programın ayrılmaz parçalarıdır. <strong>Kahramanmaraş çocuk cimnastik</strong> camiasında yetenekli sporculara yönelik özel seçme programlarımız da mevcuttur.</p>

<h2>Cimnastiğin Çocuğunuza Kazandırdıkları</h2>

<p>Cimnastik yalnızca bir spor değil; çocuğunuzun geleceğine yapılan kapsamlı bir yatırımdır:</p>

<ul>
<li><strong>Esneklik ve Denge:</strong> Yaşla birlikte azalan esneklik, cimnastik sayesinde çocukluktan itibaren korunur.</li>
<li><strong>Güç Gelişimi:</strong> Vücut ağırlığıyla yapılan hareketler tüm kas gruplarını dengeli şekilde güçlendirir.</li>
<li><strong>Koordinasyon:</strong> Karmaşık hareketler, beyin ve kas arasındaki iletişimi geliştirir.</li>
<li><strong>Özgüven:</strong> Her yeni beceri öğrenildiğinde artan özgüven, akademik başarıya da yansır.</li>
<li><strong>Disiplin:</strong> Düzenli antrenman alışkanlığı, okul ve sosyal yaşama da aktarılır.</li>
</ul>

<h2>Ücretsiz Deneme Dersi</h2>

<p><strong>CİMCİMPARK</strong> olarak tüm yeni katılımcılara ücretsiz deneme dersi sunuyoruz. Çocuğunuz stüdyomuzu, eğitmenlerimizi ve diğer sporcu arkadaşlarını tanısın, sonra birlikte karar verelim. Dulkadiroğlu ve Onikişubat'ın her yerinden kolaylıkla ulaşabileceğiniz tesisimizde sizi bekliyoruz. Randevu için <a href="/iletisim">iletişim formunu</a> doldurun.</p>`,
  },
  {
    slug: 'kahramanmaras-pilates-dersleri',
    title: 'Kahramanmaraş Pilates Dersleri | Mat & Reformer | CİMCİMPARK',
    metaDescription: 'Kahramanmaraş pilates dersleri için CİMCİMPARK\'ı seçin. Onikişubat\'ta mat ve reformer pilates seanslarıyla postür, güç ve esneklik kazanın.',
    category: 'Pilates',
    date: '10 Mayıs 2026',
    readTime: '11 dk',
    excerpt: 'Kahramanmaraş pilates dersleri için en kapsamlı merkez: CİMCİMPARK. Mat pilates ve reformer seanslarıyla postürünüzü düzeltin, çekirdek kaslarınızı güçlendirin.',
    tone: 'aqua',
    src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80',
    content: `<p><strong>Kahramanmaraş pilates</strong> dünyasında <strong>CİMCİMPARK</strong>, hem mat hem de reformer pilates alanında şehrin en donanımlı merkezi olarak öne çıkmaktadır. Onikişubat'taki stüdyomuzda her yaş ve seviyeye uygun gruplar oluşturulmuş; postür bozukluğundan kronik bel ağrısına, genel toparlanmadan atletik performans geliştirmeye kadar geniş bir yelpazede çözüm sunulmaktadır.</p>

<h2>Mat Pilates ve Reformer Pilates: Hangisi Size Uygun?</h2>

<p><strong>Kahramanmaraş pilates</strong> merkezimizde iki temel uygulama sunulmaktadır. Mat pilates, zemin üzerinde vücut ağırlığıyla yapılan klasik egzersizlerden oluşur; herhangi bir ekipmana gerek duymaksızın güçlü bir çekirdek bölgesi ve esneklik geliştirir. Reformer pilates ise yaylı reformer makinesiyle uygulanan, daha geniş bir hareket yelpazesine olanak tanıyan ileri düzey bir yöntemdir.</p>

<ul>
<li><strong>Mat Pilates:</strong> Başlangıç seviyesinden ileri düzeye, haftada 2–3 seans. Grup dersleri, ekonomik ve sosyal.</li>
<li><strong>Reformer Pilates:</strong> Maksimum 4 kişilik gruplar veya birebir seans. Bel sorunları, postür düzeltme, atletik destek için ideal.</li>
</ul>

<h2>CİMCİMPARK Pilates Programının İçeriği</h2>

<h3>Isınma ve Nefes Tekniği</h3>

<p>Her <strong>kahramanmaraş pilates</strong> seansı, pilatesin beş temel prensibini (nefes, merkez aktivasyonu, kontrol, konsantrasyon, akış) pekiştiren bir ısınmayla başlar. Diyafragmatik nefes, lateral torasik nefes ve core aktivasyon teknikleri ilk seanslardan itibaren öğretilir. Bu temel olmadan tüm diğer hareketlerin faydası sınırlı kalır; bu yüzden <strong>CİMCİMPARK</strong> eğitmenlerimiz bu aşamaya özel önem verir.</p>

<h3>Ana Egzersiz Blokları</h3>

<p>Her seviyeye uygun 30–35 dakikalık egzersiz blokları, şu bileşenleri kapsar:</p>

<ul>
<li>The Hundred, Roll-Up, Single Leg Stretch gibi klasik pilates sekansları</li>
<li>Lateral güçlendirme ve kalça stabilizasyon egzersizleri</li>
<li>Omurga mobilizasyonu ve esneklik çalışmaları</li>
<li>Reformer seanslarında: Footwork, Short Box Serisi, Rowing sekansları</li>
</ul>

<h3>Soğuma ve Germe</h3>

<p>Her seansın son 10 dakikası yavaşlama, bilinçli germe ve kısa bir meditasyon döngüsüyle tamamlanır. Bu bölüm, hafıza oluşumu ve kas toparlanması açısından son derece önemlidir.</p>

<h2>Pilatesin Sağlığa Faydaları</h2>

<p>Düzenli <strong>kahramanmaraş pilates</strong> seanslarına katılan üyelerimizin paylaşımlarını ve bilimsel araştırmaları bir araya getirdiğimizde şu tablo ortaya çıkmaktadır:</p>

<ul>
<li>8–10 seans içinde postür belirgin biçimde iyileşir</li>
<li>Kronik bel ve boyun ağrıları azalır</li>
<li>Karın, sırt ve kalça kasları güçlenir</li>
<li>Esneklik artar; sakatlık riski düşer</li>
<li>Stres ve anksiyete belirtileri hafifler</li>
<li>Uyku kalitesi yükselir</li>
</ul>

<h2>Kimler Katılabilir?</h2>

<p>Kahramanmaraş pilates programlarımız 18–65 yaş arası herkese açıktır. Sırt fıtığı, diz sorunları veya hamilelik/doğum sonrası dönem gibi özel durumlar için eğitmenlerimiz bireysel program oluşturmaktadır. Başlamadan önce kısa bir ön değerlendirme görüşmesi yapılmakta; bu sayede sizi en doğru gruba yerleştiriyoruz.</p>

<p>Kahramanmaraş'ta pilates arayanlar için ilk adım çok kolay: <a href="/iletisim">ücretsiz deneme seansı</a> formunu doldurun, sizi en uygun gruba davet edelim.</p>`,
  },
  {
    slug: 'onikisubat-taekwondo-kursu',
    title: 'Onikişubat Taekwondo Kursu | Çocuk & Genç | CİMCİMPARK',
    metaDescription: 'Onikişubat\'ta taekwondo eğitimi için CİMCİMPARK\'ı tercih edin. 6-16 yaş çocuk ve genç programlarıyla kuşak sistemi, disiplin ve öz-savunma.',
    category: 'Dövüş Sanatları',
    date: '05 Mayıs 2026',
    readTime: '10 dk',
    excerpt: 'Onikişubat\'ta taekwondo öğrenmek isteyen çocuklar için CİMCİMPARK profesyonel eğitim sunuyor. Kuşak sistemiyle ilerleyen program, 6 yaşından itibaren saygı ve disiplini geliştiriyor.',
    tone: 'brand',
    src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80',
    content: `<p><strong>Onikişubat taekwondo</strong> eğitiminde <strong>CİMCİMPARK</strong>, çocukların ve gençlerin bu köklü Kore dövüş sanatıyla güvenli, disiplinli ve ilham verici bir ortamda buluşmasını sağlamaktadır. Dünya genelinde 80 milyondan fazla sporcu tarafından uygulanan taekwondo, 6 yaşından itibaren başlanabilen, hem karakter hem de fiziksel gelişim açısından son derece değerli bir spordur.</p>

<h2>Taekwondo Neden Bu Kadar Değerli Bir Spor?</h2>

<p>Taekwondo, sadece tekme ve yumruk tekniklerini içeren bir dövüş sanatının çok ötesindedir. Kore'nin ulusal sporu olan taekwondo, 2000 Sydney Olimpiyatları'ndan bu yana olimpik bir branştır. <strong>Onikişubat taekwondo</strong> programımızda öğrenciler yalnızca fiziksel teknikler değil, Taekwondo'nun ruhunu oluşturan beş temel prensip olan kibum (礼儀), y염치 (廉恥), 인내 (忍耐), 극기 (克己) ve 백절불굴 (百折不屈) — yani saygı, dürüstlük, sabır, öz-disiplin ve dayanılmazlık değerlerini de kazanır.</p>

<ul>
<li><strong>Fiziksel Gelişim:</strong> Esneklik, denge, koordinasyon, hız ve kuvvet birlikte gelişir</li>
<li><strong>Karakter Gelişimi:</strong> Saygı, disiplin, sorumluluk bilinci ve liderlik</li>
<li><strong>Özgüven:</strong> Kuşak sistemi, ölçülebilir başarı hissiyle motivasyonu canlı tutar</li>
<li><strong>Öz-Savunma:</strong> Gerçek yaşamda işe yarayan teknikler</li>
</ul>

<h2>CİMCİMPARK Taekwondo Programı</h2>

<h3>Çocuk Taekwondo (6–10 Yaş)</h3>

<p>Bu yaş grubunda odak noktası teknik mükemmellik değil, hareketle tanışmak ve sporla barışık bir ilişki kurmaktır. <strong>Onikişubat taekwondo</strong> çocuk programımızda her ders; ısınma oyunları, temel poomsae (form) çalışması ve kuşak bazlı teknik egzersizlerle yapılandırılmıştır. Haftada 2 gün, 55 dakikalık seanslar halinde düzenlenen program, çocukların okul ritmine göre sabah veya öğleden sonra saatlerinde sunulmaktadır.</p>

<h3>Genç Taekwondo (11–16 Yaş)</h3>

<p>Bu program, teknik derinleşme, sparing çalışmaları ve müsabaka hazırlığını kapsar. <strong>CİMCİMPARK</strong>'taki gençlik grubu, il ve bölge düzeyindeki yarışmalara düzenli olarak katılmaktadır. Eğitmenlerimiz Türkiye Taekwondo Federasyonu lisanslı olup ulusal müsabaka kurallarına uygun antrenman metodolojileri uygulamaktadır.</p>

<h2>Kuşak Sistemi: İlerlemenin Görünür Kanıtı</h2>

<p>Taekwondoda motivasyonun sürekliliğini sağlayan en önemli unsur kuşak sistemidir. Beyaz kuşakla başlayan <strong>onikişubat taekwondo</strong> yolculuğu, belirli aralıklarla yapılan sınavlarla devam eder. Her kuşak rengi, öğrencinin teknik bilgi ve kişisel gelişiminin belgelenmiş bir kanıtıdır:</p>

<ul>
<li>Beyaz Kuşak → Sarı Kuşak → Turuncu → Yeşil → Mavi → Kırmızı → Siyah Kuşak</li>
<li>Kuşak sınavları 3 ayda bir düzenlenir</li>
<li>Sınav kriterleri: teknik doğruluk, poomsae performansı, sparing ve genel tutum</li>
</ul>

<h2>Güvenlik Önceliğimiz</h2>

<p><strong>CİMCİMPARK</strong>'ta <strong>onikişubat taekwondo</strong> seanslarında tüm koruyucu ekipmanlar zorunlu olarak kullanılmaktadır. Kask, göğüs koruyucu, ön kol ve bacak koruyucular ile ağız koruyucu, sparing çalışmalarının ayrılmaz parçasıdır. Eğitmenlerimiz her antrenmanın başında güvenlik kontrolü yapar.</p>

<p>Çocuğunuzun taekwondo yolculuğu <strong>CİMCİMPARK</strong>'ta başlasın. <a href="/iletisim">Ücretsiz deneme dersi</a> için hemen formu doldurun.</p>`,
  },
  {
    slug: 'dulkadiroglukick-boks-kursu',
    title: 'Dulkadiroğlu Kick Boks Kursu | Çocuk ve Yetişkin | CİMCİMPARK',
    metaDescription: 'Kahramanmaraş kick boks kursu arıyorsanız CİMCİMPARK\'ta çocuk ve yetişkin programlarını keşfedin. Dulkadiroğlu\'nda profesyonel eğitim.',
    category: 'Dövüş Sanatları',
    date: '27 Mayıs 2026',
    readTime: '12 dk',
    excerpt: 'Kahramanmaraş kick boks eğitiminde CİMCİMPARK farkını keşfedin. 8–14 yaş çocuk ve 16–45 yaş yetişkin programlarıyla Dulkadiroğlu\'nda güçlü bir başlangıç yapın.',
    tone: 'brand',
    src: 'https://images.unsplash.com/photo-1517438476312-10d79c5f2c1e?auto=format&fit=crop&w=900&q=80',
    content: `<p><strong>Kahramanmaraş kick boks</strong> dünyasında yeni bir dönem başlıyor. <strong>CİMCİMPARK</strong> olarak Dulkadiroğlu ilçesinde kurduğumuz modern kick boks stüdyomuzda, çocuklardan yetişkinlere kadar her yaş grubuna özel programlar sunuyoruz. Kahramanmaraş'ın spor kültürüne katkı sağlamak amacıyla tasarlanan bu programlar, yalnızca teknik beceri geliştirmekle kalmaz; özgüven, disiplin ve fiziksel dayanıklılık da kazandırır.</p>

<h2>Kahramanmaraş'ta Kick Boks Neden Bu Kadar Popüler?</h2>

<p><strong>Kahramanmaraş kick boks</strong> sporu son yıllarda şehirde hızla yaygınlaşmaktadır. Onikişubat ve Dulkadiroğlu başta olmak üzere şehrin dört bir yanında kick boksa olan ilgi giderek artmaktadır. Kick boks yalnızca bir dövüş sporu değil, aynı zamanda mükemmel bir kondisyon ve stres yönetimi aracıdır. Düzenli antrenmanlar kardiyovasküler sağlığı iyileştirir, kasları güçlendirir ve zihinsel odaklanmayı artırır.</p>

<h2>Kick Boksun Temelleri</h2>

<p>Kick boks, el ve ayak tekniklerini bir arada kullanan dinamik bir dövüş sporudur. Temel hareketler:</p>

<ul>
<li><strong>Jab ve Cross:</strong> El yumruklarının temel kombinasyonları</li>
<li><strong>Roundhouse Kick:</strong> Yan dönerek uygulanan yuvarlak tekme</li>
<li><strong>Front Kick:</strong> Öne doğru yapılan düz tekme</li>
<li><strong>Hook ve Uppercut:</strong> Köşe ve yukarı doğru yumruklar</li>
<li><strong>Side Kick:</strong> Yana doğru yapılan güçlü tekme</li>
</ul>

<h2>CİMCİMPARK Kick Boks Programları</h2>

<h3>Çocuk Kick Boks (8–14 Yaş)</h3>

<p>8–14 yaş arası çocuklara yönelik <strong>kahramanmaraş kick boks</strong> programımız, hem eğlenceli hem de eğitici bir içerik sunar. Oyun tabanlı öğrenme yöntemleriyle desteklenen bu program haftada 3 gün, 50 dakikalık seanslar halinde uygulanmaktadır. Temel teknik çalışması, koordinasyon oyunları ve torba çalışmasını kapsayan kapsamlı bir müfredat sunulmaktadır. Velilerimize aylık gelişim raporu hazırlanmakta; şeffaflık ve aile katılımı öncelikli değerimizdir.</p>

<h3>Yetişkin Kick Boks (16–45 Yaş)</h3>

<p>Yetişkin programımız hem kondisyon hem de teknik odaklıdır. Haftada 3 veya 5 gün antrenman seçeneğiyle sunulan bu program şunları kapsar: fonksiyonel ısınma, teknik seanslar, kombine kondisyon çalışması (HIIT+kick boks), torba ve ped çalışması, ileri seviyelerde serbest sparing.</p>

<h2>Kick Boksun 10 Temel Faydası</h2>

<ul>
<li><strong>Kardiyovasküler Sağlık:</strong> 45 dakikalık seans 600–800 kalori yakar</li>
<li><strong>Tam Vücut Güçlendirme:</strong> Hem üst hem alt vücut kasları birlikte çalışır</li>
<li><strong>Esneklik ve Koordinasyon:</strong> Özellikle kalça esnekliği üzerinde olumlu etkiler</li>
<li><strong>Stres Azaltma:</strong> Endorfin salgısı ruh halini iyileştirir</li>
<li><strong>Özgüven Artışı:</strong> Çocuklarda ve gençlerde belirgin biçimde gözlemlenir</li>
<li><strong>Kişisel Savunma Becerisi:</strong> Gerçek yaşam durumlarına uygulanabilir teknikler</li>
<li><strong>Kilo Kontrolü:</strong> Yüksek kalorili yakımla kilo yönetimini kolaylaştırır</li>
<li><strong>Disiplin ve Odaklanma:</strong> İş ve okul hayatına yansıyan disiplin alışkanlığı</li>
<li><strong>Sosyal Bağ Kurma:</strong> Antrenman grupları güçlü topluluklar oluşturur</li>
<li><strong>Kemik ve Eklem Sağlığı:</strong> Kontrollü darbe egzersizleri kemik yoğunluğunu artırır</li>
</ul>

<h2>Ücretsiz Deneme Dersi</h2>

<p><strong>CİMCİMPARK</strong>, <strong>kahramanmaraş kick boks</strong> deneyimini herkesin tatmasını sağlamak amacıyla ücretsiz deneme dersi imkânı sunmaktadır. Dulkadiroğlu ve Onikişubat'tan gelen her yeni sporcu bu fırsattan yararlanabilir. Güçlü bir başlangıç için bugün <a href="/iletisim">ücretsiz deneme dersi formunu</a> doldurun.</p>`,
  },
  {
    slug: 'kahramanmaras-reformer-pilates',
    title: 'Kahramanmaraş Reformer Pilates Stüdyosu | CİMCİMPARK',
    metaDescription: 'Kahramanmaraş reformer pilates için CİMCİMPARK\'ı tercih edin. Onikişubat\'ta bireysel ve grup seanslarıyla postür, esneklik ve güç kazanın.',
    category: 'Pilates',
    date: '22 Mayıs 2026',
    readTime: '13 dk',
    excerpt: 'Kahramanmaraş reformer pilates deneyimini CİMCİMPARK ile yaşayın. Onikişubat\'taki modern stüdyomuzda bireysel ve küçük grup seanslarıyla vücudunuzu yeniden keşfedin.',
    tone: 'aqua',
    src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=80',
    content: `<p><strong>Kahramanmaraş reformer pilates</strong> tutkunları için şehrin en donanımlı stüdyosu artık hizmetinizde. <strong>CİMCİMPARK</strong> bünyesindeki reformer pilates merkezimiz, Onikişubat ilçesinde konuşlanmış olup en son teknoloji reformer makineleriyle donatılmıştır. Postür bozukluklarından kronik sırt ağrısına, kilo kontrolünden atletik performans geliştirmeye kadar geniş bir yelpazede çözüm arayan bireyler için <strong>kahramanmaraş reformer pilates</strong> programlarımız birebir tasarlanmıştır.</p>

<h2>Reformer Pilates Nedir?</h2>

<p>Reformer pilates, Joseph Pilates tarafından geliştirilen pilates metodunun özel bir makinede uygulanmasıdır. "Reformer" makinesi, hareket yüzeyi, yaylar, kayışlar ve çeşitli aksesuarlardan oluşur. Mat pilatese kıyasla çok daha geniş bir hareket yelpazesi sunar; yay direnci sayesinde hem kasları güçlendirir hem de kontrollü bir şekilde gerer.</p>

<ul>
<li><strong>Yay Direnci:</strong> Vücut ağırlığıyla kısıtlı kalmayan, ayarlanabilir direnç seviyeleri</li>
<li><strong>Geniş Hareket Açısı:</strong> Eklemlerin tam potansiyeli kullanılır</li>
<li><strong>Düşük Etki:</strong> Eklem dostu, sakatlanma riski minimal</li>
<li><strong>Bireysel Ayarlama:</strong> Her vücut tipine ve ihtiyacına göre özelleştirme imkânı</li>
</ul>

<h2>CİMCİMPARK Reformer Pilates Programları</h2>

<h3>Bireysel Seanslar</h3>

<p>55 dakikalık birebir seanslar, en hızlı ilerlemeyi sağlayan formattır. Eğitmenimiz tüm dikkatini size ayırır; postür analizi, güçlü-zayıf nokta değerlendirmesi ve bireysel program oluşturulur. Bel fıtığı, boyun düzleşmesi, skolyoz veya spor sakatlığı rehabilitasyonu gibi özel durumlar için bu format en uygun seçenektir.</p>

<h3>Küçük Grup Seansları (2–4 Kişi)</h3>

<p>Sosyal bir ortamda reformer deneyimi yaşamak isteyenler için ideal seçenek. <strong>Kahramanmaraş reformer pilates</strong> küçük grup seanslarımız, her katılımcının bireysel ihtiyacına göre uyarlanmış egzersizleri birlikte uyguladığı dinamik bir format sunar. Haftada 2 seans katılım önerilmektedir.</p>

<h2>Reformer Pilatesten Kimler Yararlanır?</h2>

<ul>
<li><strong>Masa Başı Çalışanlar:</strong> Postür bozuklukları ve bel ağrısı için ideal</li>
<li><strong>Hamileler ve Yeni Anneler:</strong> Pelvik taban sağlığını destekler</li>
<li><strong>Sporcular:</strong> Performans artışı ve sakatlanma önleme</li>
<li><strong>50 Yaş Üstü:</strong> Denge, kemik yoğunluğu ve aktif yaşlanma için</li>
<li><strong>Kronik Ağrı Yaşayanlar:</strong> Fizyoterapist refakatinde destekleyici tedavi olarak</li>
</ul>

<h2>Sıkça Sorulan Sorular</h2>

<p><strong>Reformer pilates için ne giyilir?</strong> Hareket kısıtlamayan esnek spor kıyafetleri önerilir. Grip çorap ile katılınır; stüdyomuzda satışı mevcuttur.</p>

<p><strong>Kaç seanste sonuç alınır?</strong> 8–10 seans sonunda belirgin değişimler gözlemlenir. Postür iyileşmesi çoğunlukla 4–6 seans içinde hissedilir.</p>

<p><strong>Sırt fıtığım var, reformer yapabilir miyim?</strong> Evet, ancak önce doktorunuzla görüşmenizi öneririz. Eğitmenlerimiz özel protokoller konusunda deneyimlidir.</p>

<p>Kahramanmaraş'ın en iyi reformer pilates stüdyosunu denemek için <a href="/iletisim">ilk seans ücretsiz</a> fırsatımızdan yararlanın.</p>`,
  },
  {
    slug: 'kahramanmaras-cocuk-spor-programlari',
    title: 'Kahramanmaraş\'ta Çocuk Spor Programları 4–12 Yaş | CİMCİMPARK',
    metaDescription: 'Kahramanmaraş çocuk spor programları için CİMCİMPARK\'ı tercih edin. 4-12 yaş çocuklara özel cimnastik, taekwondo ve kick boks eğitimleri Onikişubat\'ta.',
    category: 'Çocuk Sporu',
    date: '27 Mayıs 2026',
    readTime: '14 dk',
    excerpt: 'Kahramanmaraş çocuk spor programlarında CİMCİMPARK farkını keşfedin. 4–12 yaş çocuklar için cimnastik, taekwondo ve kick boks branşlarıyla sağlıklı gelişim.',
    tone: 'brand',
    src: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=900&q=80',
    content: `<p><strong>Kahramanmaraş çocuk spor</strong> programlarında ailelerin en güvendiği adres olan <strong>CİMCİMPARK</strong>, 4–12 yaş arası çocuklara yönelik kapsamlı spor eğitimleri sunmaktadır. Onikişubat ilçesindeki modern tesisimizde, küçük sporcuların hem fiziksel hem de zihinsel gelişimini destekleyen programlar titizlikle hazırlanmıştır.</p>

<h2>Kahramanmaraş'ta Çocuk Sporu Neden Bu Kadar Kritik?</h2>

<p>Dijital ekranların giderek daha fazla zaman çaldığı günümüzde, çocukları harekete yönlendirmek salt fiziksel bir gereklilik değil, bütüncül bir gelişim yatırımıdır. Bilimsel araştırmalar, düzenli spor yapan çocukların akademik başarısının spor yapmayan akranlarına kıyasla yüzde otuz daha yüksek olduğunu göstermektedir.</p>

<ul>
<li><strong>Motor Gelişim:</strong> 4–12 yaş, büyük ve küçük kas gruplarının koordinasyonunun en hızlı ilerlediği dönemdir</li>
<li><strong>Kemik ve Kas Sağlığı:</strong> Bu dönemde kazanılan kemik yoğunluğu, ilerleyen yaşlarda osteoporoz riskini azaltır</li>
<li><strong>Sosyal Beceriler:</strong> Takım çalışması, liderlik ve adil rekabet spor ortamında doğal olarak kazanılır</li>
<li><strong>Zihinsel Sağlık:</strong> Spor, çocuklarda anksiyete riskini azaltır; özgüveni güçlendirir</li>
</ul>

<h2>Yaşa Göre Programlar</h2>

<h3>4–6 Yaş: Hareket ve Keşif</h3>

<p>Bu yaş grubunda temel motor becerilerin temeli atılır. Programımız oyun tabanlı aktiviteler, müzikli hareket seansları ve cimnastiğe giriş niteliğindeki temel egzersizlerden oluşur. Dikkat süreleri kısa olduğundan etkinlikler 5–8 dakikalık segmentler halinde düzenlenir; her geçişte motivasyon tazelenir.</p>

<h3>7–9 Yaş: Teknik Öğrenme</h3>

<p>Motor becerilerin hızla pekiştiği "teknik altın çağda" çocuklar branşa özgü temel teknikleri sistematik biçimde öğrenir. Aylık bireysel ilerleme değerlendirmesi yapılır; mini sınıf içi turnuvalar düzenlenerek rekabetçi ortam simüle edilir.</p>

<h3>10–12 Yaş: Disiplin ve Rekabet</h3>

<p>Uzmanlaşmanın yavaş yavaş gündeme geldiği bu geçiş döneminde il ve bölge düzeyinde müsabakalara hazırlık başlar. Kondisyon geliştirme, zihinsel hazırlık ve beslenme konularında temel bilgilendirme de programa dahil edilir.</p>

<h2>CİMCİMPARK'taki Branşlar</h2>

<ul>
<li><strong>Temel Cimnastik:</strong> 4–12 yaş, haftada 2–3 gün. Esneklik, denge ve koordinasyon temeli</li>
<li><strong>Çocuk Taekwondo:</strong> 6–14 yaş, haftada 2 gün. Kuşak sistemi, disiplin ve öz-savunma</li>
<li><strong>Çocuk Kick Boks:</strong> 8–14 yaş, haftada 3 gün. Kondisyon, özgüven ve koordinasyon</li>
</ul>

<h2>Velilere Bilgi Akışı</h2>

<p><strong>CİMCİMPARK</strong>'ta şeffaflık temel değerimizdir. Her dönem sonunda teknik ilerleme, disiplin ve sosyal uyum kriterlerini kapsayan yazılı gelişim raporu velilerimizle paylaşılmaktadır. WhatsApp grubu aracılığıyla haftalık etkinlik takibi yapılabilmektedir.</p>

<p>Çocuğunuz için en uygun branşı birlikte belirleyelim. <a href="/iletisim">Ücretsiz tanışma seansı</a> için formunuzu doldurun.</p>`,
  },

  /* ---- Grup 2: Genel Bilgi / SEO ---- */
  {
    slug: 'pilates-faydalari-nelerdir',
    title: 'Pilates Faydaları: Vücut ve Zihin İçin 12 Bilimsel Kanıt',
    metaDescription: 'Pilates yapmanın fiziksel ve zihinsel sağlığa olan bilimsel olarak kanıtlanmış 12 temel faydası. Postürden uyku kalitesine, stres yönetiminden ağrı azaltmaya.',
    category: 'Pilates',
    date: '20 Mayıs 2026',
    readTime: '9 dk',
    excerpt: 'Pilatesi düzenli yapmak ne kazandırır? Postür düzeltmeden kronik ağrı azaltmaya, stres yönetiminden uyku kalitesine — 12 bilimsel kanıtla pilatesin faydaları.',
    tone: 'aqua',
    src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=80',
    content: `<p>Pilates, Joseph Pilates tarafından 1920'lerde geliştirilen ve bugün dünya genelinde 11 milyondan fazla insan tarafından uygulanan bütünsel bir egzersiz metodudur. Zihin-beden bağlantısını merkeze alan bu yöntem, son on yılda bilimsel araştırmaların da odağına girmiş; <strong>pilates faydaları</strong> artık yalnızca anekdotik değil, kanıta dayalı tıpla da desteklenmektedir.</p>

<h2>1. Postür ve Omurga Sağlığı</h2>

<p>Pilatesin en belgelenmiş faydalarından biri <strong>postür üzerindeki etkisidir</strong>. 2015 yılında <em>Journal of Physical Therapy Science</em>'da yayımlanan araştırma, 12 haftalık pilates programının baş öne uzaması ve omuz yuvarlaklaşması gibi postür bozukluklarını istatistiksel olarak anlamlı biçimde azalttığını göstermiştir. Uzun saatler masabaşında çalışanlar bu faydayı 6–8 seans içinde hissetmeye başlar.</p>

<h2>2. Çekirdek (Core) Kasların Güçlenmesi</h2>

<p>Pilates, karın, sırt, kalça ve pelvik taban kaslarını —yani "güç merkezi" olarak adlandırılan bölgeyi— hedef alır. Güçlü bir core, günlük hareketlerden spor performansına kadar her alanda vücuda destek sağlar ve bel ağrısı riskini azaltır.</p>

<h2>3. Kronik Bel Ağrısının Azalması</h2>

<p>2012 yılında <em>Cochrane Database of Systematic Reviews</em>'da yayımlanan meta-analiz, pilatesin kronik bel ağrısı için diğer egzersiz türlerine kıyasla daha üstün sonuçlar ürettiğini ortaya koymuştur. 8–10 seans sonunda ağrı yoğunluğu ve işlevsel kısıtlılık belirgin şekilde azalmaktadır.</p>

<h2>4. Esneklik Artışı</h2>

<p>Pilates hareketlerinin büyük çoğunluğu, kasları hem güçlendirirken hem de ger. Bu çift yönlü etki, yoga benzeri bir esneklik kazanımını antrenman sürecinin doğal bir parçası yapar; ekstra germe rutinlerine gerek kalmaz.</p>

<h2>5. Denge ve Koordinasyon</h2>

<p>Tek ayak üzerinde durma, ekipman üzerinde dengede kalma gibi hareketler vestibüler sistemi ve propriosepsiyonu (vücut farkındalığı) geliştirir. Özellikle 50 yaş üstü bireylerde düşme riskini azalttığına dair güçlü kanıtlar mevcuttur.</p>

<h2>6. Stres ve Anksiyete Azaltma</h2>

<p>Pilates seanslarında uygulanan kontrollü nefes teknikleri parasempatik sinir sistemini aktive eder; kortizol (stres hormonu) düzeyleri düşer, serotonin ve endorfin salgısı artar. Düzenli pratisyenler genellikle "seansın ardından tüm stresi bıraktım" hissini tanımlamaktadır.</p>

<h2>7. Uyku Kalitesinin Yükselmesi</h2>

<p>2018 yılında <em>Journal of Bodywork and Movement Therapies</em>'de yayımlanan çalışma, haftalık 3 seans pilates yapan katılımcıların 8 hafta sonunda uyku kalitesi skorlarında anlamlı iyileşme yaşadığını göstermiştir. Vücudun genel tonus dengesinin sağlanması, sirkadiyen ritmi olumlu etkiler.</p>

<h2>8. Atletik Performans Desteği</h2>

<p>Pek çok profesyonel sporcu pilatesin çapraz eğitim aracı olarak yararlandığını paylaşmaktadır. Gereksiz kas gruplarının gevşemesi, enerji tasarrufu sağlar; ana sporculuk performansını artırır.</p>

<h2>9. Pelvik Taban ve Kadın Sağlığı</h2>

<p>Hamilelik, doğum sonrası dönem ve menopozda pelvik taban kaslarının zayıflaması sık karşılaşılan bir sorundur. Pilates, bu kasları güvenli ve etkili biçimde güçlendirir; üriner inkontinans riskini azaltır.</p>

<h2>10. Zihin-Beden Bağlantısı</h2>

<p>Pilates pratiği, her hareketi bilinçli bir dikkatle yapmayı gerektirir. Bu "hareket meditasyonu" hali, mindfulness meditasyonunun bilişsel faydalarına benzer sonuçlar üretmektedir: dikkat süresi uzar, impulsif davranışlar azalır.</p>

<h2>11. Kemik Yoğunluğunun Korunması</h2>

<p>Ağırlık taşıma içermeyen pilates egzersizleri bile kemik yeniden yapılanmasını tetikler. Postmenopozal kadınlarda kemik yoğunluğu kaybını yavaşlattığına dair kontrollü çalışmalar bulunmaktadır.</p>

<h2>12. Uzun Vadeli Hareket Kabiliyeti</h2>

<p>Yaşlanmayla birlikte azalan hareket kabiliyeti ve eklem esnekliği, düzenli pilates pratiğiyle yavaşlatılabilir. 60–70'li yaşlarda bile başlanabilen pilates, aktif yaşlanma stratejisinin önemli bir parçasıdır.</p>

<p>Bu faydaları bizzat deneyimlemek için <a href="/iletisim">CİMCİMPARK'ta ücretsiz bir deneme seansı</a> talep edebilirsiniz.</p>`,
  },
  {
    slug: 'cocuk-cimnastik-faydalari',
    title: 'Çocuklar İçin Cimnastiğin 10 Temel Faydası | Uzman Rehberi',
    metaDescription: 'Cimnastiğin çocuk gelişimine katkıları: motor beceriler, öz-disiplin, özgüven ve akademik başarı. Bilimsel kanıtlarla desteklenmiş kapsamlı bir rehber.',
    category: 'Çocuk Gelişimi',
    date: '22 Mayıs 2026',
    readTime: '8 dk',
    excerpt: 'Cimnastiğin çocuk gelişimine 10 temel katkısı: esneklik ve motor becerilerden özgüven ve akademik başarıya uzanan bilimsel kanıtlı faydalar.',
    tone: 'brand',
    src: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=900&q=80',
    content: `<p>Cimnastik, insanlığın bilinen en eski sporlarından biridir. Antik Yunan'dan modern Olimpiyatlara uzanan köklü tarihiyle bu spor, çocukların bütünsel gelişimine katkıda bulunma konusunda benzersiz bir konumda yer almaktadır. Peki cimnastik gerçekten çocuğunuz için bu kadar önemli mi? Bilimsel araştırmalar ve uzman görüşleri aynı noktada buluşuyor: <strong>çocuklar için cimnastik</strong>, erken yaşta başlanması gereken en kapsamlı spor dallarından biridir.</p>

<h2>1. Esneklik ve Eklem Sağlığı</h2>

<p>Çocukluk döneminde kazanılan esneklik, yetişkinlikte de korunur. <strong>Çocuklar için cimnastik</strong> antrenmanları, kasların ve eklemlerin tam hareket genişliğinde çalışmasını sağlar. Araştırmalar, düzenli cimnastik yapan çocukların 40–50 yaşında bile daha yüksek esneklik puanlarına sahip olduğunu göstermektedir.</p>

<h2>2. Güç ve Kas Dengesi</h2>

<p>Cimnastikte vücut ağırlığıyla yapılan hareketler tüm kas gruplarını dengeli şekilde geliştirir. Halka, paralel bar, minder ve trambolin çalışmaları sırasında karın, sırt, kol ve bacak kasları eşzamanlı aktive olur. Bu denge, ilerleyen yaşlarda postür bozukluğunu önler.</p>

<h2>3. Koordinasyon ve Motor Beceriler</h2>

<p>Cimnastiğin gelişim psikolojisi açısından en kritik katkısı bu alandadır. Takla, el değirmeni ve kafes dönüşü gibi hareketler beyinde yeni sinir bağlantıları oluşturur. Nörolojik çalışmalar, <strong>çocuklar için cimnastik</strong> programına katılımın ince motor becerileri (kalem tutma, düğme ilikleme) olumlu etkilediğini göstermektedir.</p>

<h2>4. Denge ve Vestibüler Sistem Gelişimi</h2>

<p>Denge kirişi ve denge hareketleri, kulak içindeki vestibüler sistemi eğitir. Sağlıklı bir vestibüler sistem; okuma, yazma ve matematiksel düşünme gibi akademik becerilerin altyapısını oluşturur.</p>

<h2>5. Özgüven ve Öz-Yeterlilik</h2>

<p>Her yeni becerinin kazanılması — ilk kez takla atmak, ya da barfiksten geçmek — çocuğa somut bir "yapabilirim" deneyimi yaşatır. Bu deneyimler zamanla güçlü bir öz-yeterlilik algısı oluşturur ve akademik ile sosyal zorluklarla başa çıkma kapasitesini artırır.</p>

<h2>6. Disiplin ve Sorumluluk</h2>

<p>Cimnastik, tekrara dayalı bir antrenman metodudur. Aynı hareketi doğru formda defalarca yapmak, sabır ve disiplin gerektirir. Bu alışkanlık, zamanla okul ödevlerine, ders çalışmaya ve sosyal kurallara uymaya da yansır.</p>

<h2>7. Sosyal Beceriler ve Takım Ruhu</h2>

<p>Küçük grup seansları, çocukların yaşıtlarıyla sağlıklı ilişkiler kurmasını sağlar. Sırasını bekleme, arkadaşını kutlama ve hayal kırıklığıyla baş etme gibi sosyal-duygusal beceriler cimnastik ortamında doğal olarak edinilir.</p>

<h2>8. Beyin Gelişimine Katkı</h2>

<p>Aerobik aktivite beyin kaynaklı nörotrofik faktörü (BDNF) artırır; bu madde nöronal büyümeyi ve sinaptik plastisiteyi destekler. Araştırmalar, haftada 3 gün düzenli egzersiz yapan çocukların hafıza ve dikkat testlerinde daha yüksek puanlar aldığını ortaya koymaktadır.</p>

<h2>9. Fiziksel Sağlık Alışkanlıklarının Temeli</h2>

<p>Çocuklukta edinilen aktif yaşam alışkanlığı, yetişkinlikte de sürdürülme eğilimindedir. Araştırmalar, çocukken düzenli spor yapanların yetişkinlikte obezite, kalp hastalıkları ve diyabete yakalanma riskinin belirgin şekilde düşük olduğunu göstermektedir.</p>

<h2>10. Eğlence ve Spor Tutkusunun Kıvılcımı</h2>

<p>Doğru bir eğitmen ve destekleyici bir ortamda cimnastik, çocuklar için büyük bir zevk kaynağı olur. Bu olumlu deneyim, spora karşı kalıcı bir sevgi ve tutkunun tohumunu atar — bu da yaşam boyu sürecek sağlıklı bir yaşam tarzının en güçlü güvencesidir.</p>

<p>Çocuğunuzun cimnastik yolculuğu için <a href="/iletisim">CİMCİMPARK'ta ücretsiz deneme dersini</a> kaçırmayın.</p>`,
  },
  {
    slug: 'taekwondo-nedir-nasil-yapilir',
    title: 'Taekwondo Nedir? Başlangıç Rehberi | Kuşaklar, Teknikler, Faydalar',
    metaDescription: 'Taekwondo\'nun tarihi, temel teknikleri, kuşak sistemi ve sağlığa faydaları hakkında kapsamlı bir başlangıç rehberi. Çocuktan yetişkine herkes için.',
    category: 'Dövüş Sanatları',
    date: '18 Mayıs 2026',
    readTime: '11 dk',
    excerpt: 'Taekwondo\'nun tarihi, temel teknikleri, kuşak sistemi ve sağlık faydaları hakkında kapsamlı bir başlangıç rehberi. Çocuktan yetişkine başlamak için bilmeniz gereken her şey.',
    tone: 'brand',
    src: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?auto=format&fit=crop&w=900&q=80',
    content: `<p><strong>Taekwondo nedir?</strong> Kore'nin ulusal dövüş sanatı olan taekwondo, el ve ayak tekniklerini birleştiren, disiplin ve felsefeyi ön plana çıkaran olimpik bir spordur. 2000 Sydney Olimpiyatları'ndan bu yana olimpik branşlar arasında yer alan taekwondo, dünya genelinde 80 milyonu aşkın sporcu tarafından uygulanmaktadır.</p>

<h2>Taekwondo'nun Tarihçesi</h2>

<p>Taekwondo'nun kökleri, yüzyıllar öncesine dayanan Kore dövüş sanatlarına — özellikle de Taekkyeon ve Subak'a — uzanmaktadır. Modern anlamda taekwondo, 1950'li yıllarda General Choi Hong-hi öncülüğünde sistematize edilmiş ve 1955'te resmi olarak adını almıştır. Dünya Taekwondo Federasyonu (WT) 1973'te kurulmuş; spor, 1988 Seul Olimpiyatları'nda gösteri branşı, 2000 yılında ise tam anlamıyla olimpik statü kazanmıştır.</p>

<h2>Taekwondo'nun Temel Prensipleri</h2>

<p>Taekwondo yalnızca fiziksel bir spor değil, bir yaşam felsefesidir. Beş temel prensip tüm pratisyenler için yol göstericidir:</p>

<ul>
<li><strong>Ye-Ui (예의):</strong> Nezaket ve saygı</li>
<li><strong>Yeom-Chi (염치):</strong> Dürüstlük ve onur</li>
<li><strong>In-Nae (인내):</strong> Sabır ve dayanıklılık</li>
<li><strong>Guk-Gi (극기):</strong> Öz-disiplin ve öz-kontrol</li>
<li><strong>Baek-Jeol-Bul-Gul (백절불굴):</strong> Yenilmez bir ruh ve azim</li>
</ul>

<h2>Temel Teknikler</h2>

<h3>Ayak Teknikleri (Chagi)</h3>

<p>Taekwondo'nun en ayırt edici özelliği, yüksek oranda ayak tekniklerine dayanmasıdır. Temel ayak teknikleri şunlardır:</p>

<ul>
<li><strong>Ap Chagi:</strong> Öne tekme — en temel teknik</li>
<li><strong>Dollyo Chagi:</strong> Yuvarlak tekme — en yaygın kullanılan</li>
<li><strong>Yeop Chagi:</strong> Yan tekme — güçlü ve sert</li>
<li><strong>Dwi Chagi:</strong> Arka tekme — arkaya dönerek uygulanan</li>
<li><strong>Twio Dollyo Chagi:</strong> Sıçrama yuvarlak tekme — ileri düzey</li>
</ul>

<h3>El Teknikleri (Makgi ve Chigi)</h3>

<p>Savunma (makgi) ve saldırı (chigi) bloklarından oluşan el teknikleri, rakibin saldırısını geçersiz kılmak ve karşı atakta bulunmak için kullanılır.</p>

<h3>Poomsae (Formlar)</h3>

<p>Poomsae, belirlenmiş teknik sekansların hareketlerini önceden tanımlanmış bir düzende uygulandığı çalışmalardır. Kuşak sınavlarının ayrılmaz bir parçasıdır; hem teknik hem de zihinsel konsantrasyonu test eder.</p>

<h2>Kuşak Sistemi</h2>

<p>Taekwondo'da ilerleme, kuşak rengiyle görünür biçimde ölçülür. Sistemin temel yapısı şu şekildedir:</p>

<ul>
<li>Beyaz Kuşak (10. Gup) — Başlangıç</li>
<li>Sarı Kuşak (9.–8. Gup)</li>
<li>Yeşil Kuşak (7.–6. Gup)</li>
<li>Mavi Kuşak (5.–4. Gup)</li>
<li>Kırmızı Kuşak (3.–2. Gup)</li>
<li>Siyah Kuşak (1. Dan ve üzeri) — Uzman seviyesi</li>
</ul>

<p>Sınavlar genellikle 3 ayda bir düzenlenir. Değerlendirme kriterleri poomsae performansı, fiziksel kondisyon ve genel tutumu kapsar.</p>

<h2>Taekwondonu Faydaları</h2>

<ul>
<li>Kardiyovasküler dayanıklılık ve güç gelişimi</li>
<li>Esneklik, denge ve koordinasyon</li>
<li>Öz-disiplin, sabır ve özgüven</li>
<li>Stres azaltma ve zihinsel odaklanma</li>
<li>Kişisel savunma becerileri</li>
<li>Sosyal beceriler ve takım ruhu</li>
</ul>

<h2>Başlamak İçin Ne Gerekir?</h2>

<p>Taekwondoya başlamak için herhangi bir ön bilgi ya da fiziksel hazırlık gerekmez. Rahat bir eşofman veya dobok (taekwondo giysisi) yeterlidir. Ilk sınavdan itibaren geleneksel dobok giyilmesi önerilir.</p>

<p>Taekwondo yolculuğunuzu başlatmak için <a href="/iletisim">CİMCİMPARK'ta ücretsiz deneme dersini</a> deneyin.</p>`,
  },
  {
    slug: 'kick-boks-nedir-baslangic-rehberi',
    title: 'Kick Boks Nedir? Ekipman, Teknikler ve Başlangıç İpuçları',
    metaDescription: 'Kick boks sporunun temelleri: tarihçe, temel teknikler, gerekli ekipmanlar ve başlangıç için pratik ipuçları. Yeni başlayanlar için adım adım rehber.',
    category: 'Dövüş Sanatları',
    date: '24 Mayıs 2026',
    readTime: '10 dk',
    excerpt: 'Kick boks sporunun temelleri: tarihçe, temel teknikler, ekipmanlar ve başlangıç ipuçları. Hem kondisyon hem savunma arayan yeni başlayanlar için kapsamlı rehber.',
    tone: 'aqua',
    src: 'https://images.unsplash.com/photo-1517438476312-10d79c5f2c1e?auto=format&fit=crop&w=900&q=80',
    content: `<p><strong>Kick boks nedir?</strong> El yumruğu ve ayak tekniklerini bir arada kullanan bu dinamik dövüş sporu, hem kişisel savunma hem de yüksek yoğunluklu kondisyon antrenmanı olarak dünya genelinde büyük popülerlik kazanmıştır. 1960'larda Japonya'da ortaya çıkan ve Kuzey Amerika'da büyük ilgi gören <strong>kick boks</strong>, bugün hem profesyonel müsabakalarda hem de fitness stüdyolarında kendine sağlam bir yer bulmuştur.</p>

<h2>Kick Boksun Kısa Tarihçesi</h2>

<p>Modern kick boksun temelleri 1960'lı yıllarda Japonya'da, geleneksel karate ve Tayland boks (Muay Thai) tekniklerinin sentezlenmesiyle atılmıştır. 1970'lerde Kuzey Amerika'ya taşınan spor, burada profesyonel organizasyonlar bünyesinde hızla yaygınlaşmıştır. Türkiye Kick Boks Federasyonu 1993 yılında kurulmuş; günümüzde branş, amatör ve profesyonel kategorilerde uluslararası müsabakalar düzenlemektedir.</p>

<h2>Kick Boksun Alt Branşları</h2>

<ul>
<li><strong>Full Contact Kick Boks:</strong> Kontrollü güçte yumruk ve tekme, boks ringinde</li>
<li><strong>Low Kick:</strong> Full contact kurallarına ek olarak bacak tekmeleri serbest</li>
<li><strong>K-1 Kuralları:</strong> Diz darbelerinin de dahil olduğu, en popüler uluslararası format</li>
<li><strong>Fitness Kick Boks (Cardio KB):</strong> Müsabaka amaçsız, kondisyon odaklı stüdyo formatı</li>
</ul>

<h2>Temel Teknikler</h2>

<h3>El Teknikleri</h3>

<ul>
<li><strong>Jab:</strong> Öndeki elle hızlı düz vuruş; mesafe ölçme ve ritim kurma</li>
<li><strong>Cross:</strong> Arkadaki elle güçlü düz vuruş; temel hasar verici teknik</li>
<li><strong>Hook:</strong> Yandan köşe vuruşu; çeneden gelen ani açılı atak</li>
<li><strong>Uppercut:</strong> Aşağıdan yukarı yumruk; yakın mesafede etkili</li>
</ul>

<h3>Ayak Teknikleri</h3>

<ul>
<li><strong>Front Kick (Öne Tekme):</strong> Baskı ve mesafe açma</li>
<li><strong>Roundhouse Kick:</strong> En çok kullanılan tekme; vücudun yanına yuvarlak yay çizerek</li>
<li><strong>Side Kick:</strong> Güçlü yana tekme; kalça rotasyonuyla oluşturulan kuvvet</li>
<li><strong>Back Kick:</strong> Dönerek arka tekme; sürpriz saldırı</li>
<li><strong>Axe Kick:</strong> Yukarıdan aşağı döven tekme; omuz veya kafayı hedefler</li>
</ul>

<h2>Gerekli Ekipmanlar</h2>

<ul>
<li><strong>Boks Eldiveni (8–16 oz):</strong> Başlangıç için 10 oz yeterlidir</li>
<li><strong>El Bandajı:</strong> Bilek ve el eklemlerini sarar; eldivenin altına giyilir</li>
<li><strong>Kask:</strong> Sparing çalışmalarında zorunlu</li>
<li><strong>Ağız Koruyucu:</strong> Diş ve çene koruması</li>
<li><strong>Kaval Kemiği Koruyucu:</strong> Tekme çalışmalarında bacak koruma</li>
<li><strong>Ayak Koruyucu:</strong> Eklem koruması</li>
</ul>

<p>Başlangıç seviyesindeki sporculara özel stüdyo ekipmanı temin edilebilir; kendi ekipmanınızı edinmek uzun vadede konfor sağlar.</p>

<h2>Kick Boks Antrenmanı Nasıl Görünür?</h2>

<p>Tipik bir kick boks seansı şu aşamalardan oluşur:</p>

<ol>
<li><strong>Isınma (10 dk):</strong> Dinamik germe, atlama ipi, eklem hareketleri</li>
<li><strong>Teknik Çalışma (15 dk):</strong> Ayna/gölge boks, seansın teknik odağı</li>
<li><strong>Ped/Torba Çalışması (15 dk):</strong> Partner veya torbayla gerçekçi vuruş pratiği</li>
<li><strong>Kondisyon Turu (5–10 dk):</strong> HIIT formatında yoğun interval</li>
<li><strong>Soğuma ve Germe (5 dk):</strong> Kasları yavaşlatma ve esneklik</li>
</ol>

<h2>Yeni Başlayanlar İçin 5 Altın Kural</h2>

<ol>
<li>Ego'yu bir kenara bırakın; temel teknikleri doğru öğrenmek zaman alır</li>
<li>Güvenli antrenman için doğru ekipmanı kullanın</li>
<li>Her seans öncesi ısınmayı atlamamanın önemi sakatlık önlemede kritiktir</li>
<li>Haftada 2 seansla başlayın, vücudunuzun adaptasyonuna zaman tanıyın</li>
<li>Rehber bir eğitmen bulun; teknik hatalar sonradan kırılması zor alışkanlıklar oluşturur</li>
</ol>

<p>Kick boksun tadını çıkarmak için <a href="/iletisim">CİMCİMPARK'ta ücretsiz deneme dersine</a> katılın.</p>`,
  },
  {
    slug: 'reformer-mat-pilates-farki',
    title: 'Reformer Pilates mi, Mat Pilates mi? Farklar ve Hangisi Size Uygun?',
    metaDescription: 'Reformer ve mat pilates arasındaki temel farklar, avantajlar ve hangisinin kim için daha uygun olduğu. Pilates seçiminde doğru kararı verin.',
    category: 'Pilates',
    date: '25 Mayıs 2026',
    readTime: '9 dk',
    excerpt: 'Reformer ve mat pilates arasında kararsız kaldınız mı? İkisinin farkları, birbirlerine göre avantajları ve hangi profildeki sporcu için ideal olduklarını bu rehberde bulacaksınız.',
    tone: 'aqua',
    src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80',
    content: `<p>"<strong>Reformer pilates mi, mat pilates mi?</strong>" — Pilates dünyasına adım atan neredeyse herkesin sorduğu bu soru, aslında basit bir tercih meselesinin ötesinde bir içeriğe sahiptir. Her iki yöntem de Joseph Pilates'in özgün metodolojisine dayanır; ancak uygulanış biçimi, sunduğu imkânlar ve hitap ettiği hedef kitle bakımından birbirinden önemli ölçüde ayrışır.</p>

<h2>Mat Pilates: Temele Dönüş</h2>

<p><strong>Mat pilates</strong>, adından da anlaşılacağı üzere zemin minderi üzerinde, yalnızca vücut ağırlığı kullanılarak uygulanan klasik pilates formudur. Joseph Pilates tarafından geliştirilen orijinal 34 egzersizin büyük bölümü mat üzerinde yapılır. Herhangi bir ekipman gerekmeksizin uygulanabilmesi, mat pilatesin en büyük avantajlarından biridir.</p>

<h3>Mat Pilatesi Kimler İçin İdeal?</h3>

<ul>
<li>Pilates dünyasına yeni adım atanlar; temel hareketleri öğrenmek için en saf zemin</li>
<li>Evde veya seyahatte egzersiz yapmak isteyenler</li>
<li>Ekonomik bir seçenek arayanlar</li>
<li>Sosyal ve grup dinamiğini sevenler (büyük gruplar mümkün)</li>
<li>Çekirdek kas gücünü ve vücut farkındalığını geliştirmeyi hedefleyenler</li>
</ul>

<h3>Mat Pilatesteki Sınırlamalar</h3>

<p>Mat pilates, dirençli egzersizler ve hareket kısıtlılığı olan bireyler için bazı kısıtlamalar içerir. Bel fıtığı, omurga sorunları veya ciddi postür bozuklukları için mat pilates tek başına yeterli olmayabilir.</p>

<h2>Reformer Pilates: Metodun Derinliği</h2>

<p><strong>Reformer pilates</strong>, özel olarak tasarlanmış "reformer" makinesinde uygulanan, mat pilatese kıyasla çok daha geniş bir hareket yelpazesi sunan gelişmiş bir format. Reformer makinesi, ayarlanabilir yaylar, bir hareket platformu (carriage), kayışlar ve çeşitli çubuklardan oluşur. Yayların sağladığı direnç, hem kasları güçlendirme hem de kontrollü germe imkânı sunar.</p>

<h3>Reformer Pilatesi Kimler İçin İdeal?</h3>

<ul>
<li>Sırt fıtığı, boyun düzleşmesi veya kronik bel ağrısı yaşayanlar</li>
<li>Hamile ve doğum sonrası dönemdekiler (pelvik taban rehabilitasyonu)</li>
<li>Spor sakatlanmasından toparlanma sürecindekiler</li>
<li>Atletik performansını desteklemek isteyenler</li>
<li>Hızlı ve belirgin sonuç hedefleyenler</li>
<li>Daha ileri düzey teknik çalışma arayanlar</li>
</ul>

<h3>Reformer Pilatesteki Avantajlar</h3>

<ul>
<li><strong>Daha Geniş Hareket Açısı:</strong> Vücut ağırlığı sınırlaması olmaksızın tüm eklemler tam potansiyelde çalışır</li>
<li><strong>Bireyselleştirme:</strong> Yay direnci ve makine ayarları her vücuda göre özelleştirilir</li>
<li><strong>Rehabilitasyon Uyumluluğu:</strong> Fizyoterapistlerle koordineli çalışma mümkündür</li>
<li><strong>Düşük Etki:</strong> Eklemler üzerindeki yük mat pilatesden bile daha azdır</li>
</ul>

<h2>Fark Tablosu</h2>

<ul>
<li><strong>Ekipman:</strong> Mat → Minder. Reformer → Özel makine</li>
<li><strong>Direnç:</strong> Mat → Vücut ağırlığı. Reformer → Ayarlanabilir yay sistemi</li>
<li><strong>Hareket Çeşitliliği:</strong> Mat → Sınırlı. Reformer → Çok daha geniş</li>
<li><strong>Grup Boyutu:</strong> Mat → Büyük gruplar. Reformer → Max 4 kişi veya birebir</li>
<li><strong>Maliyet:</strong> Mat → Ekonomik. Reformer → Daha yüksek</li>
<li><strong>Başlangıç Seviyesi:</strong> Mat → Her seviye. Reformer → Genellikle orta-ileri</li>
</ul>

<h2>Hangisinden Başlamalısınız?</h2>

<p>Pilates deneyimi yoksa mat pilatesle başlayıp temel prensipleri kavramak tavsiye edilir. Bununla birlikte, özel bir sağlık durumu (bel sorunları, doğum sonrası dönem, spor sakatlanması) varsa doğrudan reformerla başlamak daha uygun olabilir. En doğru karar, bir pilates uzmanıyla kısa bir değerlendirme görüşmesi yapıldıktan sonra alınır.</p>

<p>İkisini de denemek mi istiyorsunuz? <a href="/iletisim">CİMCİMPARK'ta ücretsiz deneme seansı</a> formunu doldurun; sizin için en uygun formatı birlikte belirleyelim.</p>`,
  },
  {
    slug: 'cocuklarda-spor-aliskanligı-nasil-kazandirilir',
    title: 'Çocuğunuza Spor Alışkanlığı Kazandırmanın 7 Etkili Yolu',
    metaDescription: 'Çocuğunuzu harekete geçirmek ve kalıcı bir spor alışkanlığı oluşturmak için uzman önerileri. Zorlamadan, oyunlaştırarak ve rol model olarak.',
    category: 'Çocuk Gelişimi',
    date: '26 Mayıs 2026',
    readTime: '8 dk',
    excerpt: 'Çocuğunuzu harekete geçirmek ve kalıcı bir spor alışkanlığı oluşturmak için kanıta dayalı 7 etkili yöntem. Zorlamadan, oyunlaştırarak ve aile olarak.',
    tone: 'brand',
    src: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=900&q=80',
    content: `<p>Dünya Sağlık Örgütü'nün (WHO) 2020 yılında yayımladığı kılavuz, 5–17 yaş arası çocuk ve gençlerin günde en az 60 dakika orta-yoğun fiziksel aktivite yapması gerektiğini belirtmektedir. Ancak istatistikler endişe verici: Türkiye'de çocukların büyük çoğunluğu bu hedefi karşılayamamaktadır. Ekran süresinin artması, şehir yaşamının getirdiği kısıtlamalar ve yoğun okul programları, <strong>çocuklarda spor alışkanlığı</strong> geliştirmeyi her geçen yıl daha zorlu bir görev haline getirmektedir.</p>

<p>Peki bir ebeveyn olarak çocuğunuza nasıl kalıcı bir spor sevgisi aşılayabilirsiniz? İşte bilimsel temellere dayanan 7 etkili yöntem.</p>

<h2>1. Zorlamayın — Keşfettirin</h2>

<p>Araştırmalar, zorla yaptırılan aktivitelerin uzun vadede aktiviteye karşı olumsuz bir tutum oluşturduğunu göstermektedir. <strong>Çocuklarda spor alışkanlığı</strong> geliştirmenin ilk kuralı, çocuğun merakına saygı göstermektir. Birden fazla branşla tanışmasına izin verin: cimnastik deneme, taekwondo deneme, pilates deneme... Çocuğun "bu benim için" dediği branş çok daha sürdürülebilir bir motivasyon sağlar.</p>

<h2>2. Rol Model Olun</h2>

<p>Çocuklar ebeveynlerini gözlemleyerek öğrenir. Siz spor yaparken çocuğunuz sizi izliyorsa, spora dair güçlü bir olumlu çağrışım oluşur. Ortak aktiviteler — sabah yürüyüşü, bisiklet turu, hafta sonu futbol maçı — hem birliktelik hem de aktif yaşam mesajı iletir. "Yapın" yerine "birlikte yapalım" yaklaşımı, <strong>çocuklarda spor alışkanlığı</strong> geliştirmede çok daha etkilidir.</p>

<h2>3. Sporu Oyuna Dönüştürün</h2>

<p>Özellikle 4–8 yaş grubunda çocuklar için oyun ve spor arasındaki sınır muğlak olmalıdır. Parka gitmek, parkurda yarışmak, balonla oynamak — bunların hepsi fiziksel aktivitedir. Biçimsel "antrenman" kavramı, ancak çocuk bunu istediğinde gündeme gelmelidir. Eğlenceli yapılar, <strong>çocuklarda spor alışkanlığı</strong>nı zorlamadan yerleştirir.</p>

<h2>4. Küçük Hedefler Belirleyin ve Kutlayın</h2>

<p>Büyük hedefler yerine küçük, ulaşılabilir adımlar motivasyonu canlı tutar. "Bu hafta 3 gün antrenmana gideceğiz" ve bunu başardığında küçük bir ödül veya kutlama ritüeli oluşturun. Taekwondo'daki kuşak sınavı sistemi bu mekanizmanın mükemmel bir örneğidir: Her kuşak rengi, somut ve ölçülebilir bir başarının simgesidir.</p>

<h2>5. Sosyal Ortamın Gücünden Yararlanın</h2>

<p>Çocuklar arkadaşlarıyla birlikte yaptıkları aktiviteleri çok daha fazla benimser. Aynı yaş grubundaki arkadaşlarla birlikte spora kaydolmak ya da stüdyoda yeni dostluklar kurmak, devam motivasyonunu güçlü tutar. <strong>Çocuklarda spor alışkanlığı</strong>nın sürdürülebilirliğinde sosyal bağ, bireysel motivasyondan çok daha belirleyici bir faktördür.</p>

<h2>6. Düzenli Bir Rutin Oluşturun</h2>

<p>Çocuklar rutin ve öngörülebilirlikle gelişir. Sporu haftalık programın değişmez bir parçası haline getirin; "Salı ve Perşembe antrenmandır" gibi net bir çerçeve oluşturun. Düzensizlik ve istisnalar çoğaldığında alışkanlık zayıflar. Ailece oluşturulmuş bir haftalık çizelge, hem sporu hem de diğer etkinlikleri dengede tutar.</p>

<h2>7. Sonuçları Değil, Süreci Övün</h2>

<p>"Çok hızlı koştun, aferin!" yerine "Bugün çok çalıştın, taklan harika gelişiyor!" gibi süreç odaklı geri bildirimler, içsel motivasyonu besler. Performans baskısı altındaki çocuklar ilerleyen dönemlerde spordan uzaklaşma eğilimindedir. Katılım ve çaba övgüsü, <strong>çocuklarda spor alışkanlığı</strong>nın en sağlam zeminini oluşturur.</p>

<h2>Ne Zaman Başlanmalı?</h2>

<p>Araştırmalar, 4–6 yaş döneminin temel motor becerilerin kazanımı için kritik bir pencere olduğunu göstermektedir. Ancak spora "başlamak için geç kaldım" diye bir şey yoktur; her yaşta başlanan spor, o yaşın ihtiyaçlarına uygun faydalar sağlar.</p>

<p>Çocuğunuzun ilk adımını atmaya hazır olduğunu düşünüyorsanız, <a href="/iletisim">CİMCİMPARK'ta ücretsiz tanışma seansı</a> talep edin. Branş seçiminden program planlamasına kadar size rehberlik edelim.</p>`,
  },
];

const MONTH_MAP = { 'Ocak':'01','Şubat':'02','Mart':'03','Nisan':'04','Mayıs':'05','Haziran':'06','Temmuz':'07','Ağustos':'08','Eylül':'09','Ekim':'10','Kasım':'11','Aralık':'12' };

function BlogPostDetail({ post, onBack, onNavigate }) {
  useEffectP(() => {
    const injectSchema = (id, data) => {
      let el = document.getElementById(id);
      if (!el) { el = document.createElement('script'); el.type = 'application/ld+json'; el.id = id; document.head.appendChild(el); }
      el.textContent = JSON.stringify(data);
    };
    const parts = post.date.split(' ');
    const isoDate = parts.length === 3
      ? `${parts[2]}-${MONTH_MAP[parts[1]] || '01'}-${String(parts[0]).padStart(2, '0')}`
      : post.date;

    injectSchema('schema-article', {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'headline': post.title,
      'description': post.metaDescription || post.excerpt,
      'image': post.src || '',
      'datePublished': isoDate,
      'author': { '@type': 'Person', 'name': 'Büşra PAKYARDIM', 'url': 'https://cimcimpark.com/ekibimiz' },
      'publisher': { '@type': 'Organization', 'name': 'CİMCİMPARK', 'url': 'https://cimcimpark.com' },
      'url': `https://cimcimpark.com/blog/${post.slug}`,
      'mainEntityOfPage': `https://cimcimpark.com/blog/${post.slug}`
    });

    injectSchema('schema-breadcrumb', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Ana Sayfa', 'item': 'https://cimcimpark.com/' },
        { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': 'https://cimcimpark.com/blog' },
        { '@type': 'ListItem', 'position': 3, 'name': post.title, 'item': `https://cimcimpark.com/blog/${post.slug}` }
      ]
    });

    return () => { const el = document.getElementById('schema-article'); if (el) el.remove(); };
  }, [post.slug]);

  return (
    <div className="page-fade">
      <div className="page-band border-b border-line">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10 py-10">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-[13px] text-ink-muted hover:text-ink transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Blog'a Dön
          </button>
          <div className="mt-4 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider">
            <span className={post.tone === 'aqua' ? 'text-aqua-deep' : 'text-brand-deep'}>{post.category}</span>
            <span className="text-ink-faint">•</span>
            <span className="text-ink-muted">{post.date}</span>
            <span className="text-ink-faint">•</span>
            <span className="text-ink-muted inline-flex items-center gap-1"><I.Clock width="11" height="11" /> {post.readTime}</span>
          </div>
          <h1 className="mt-4 font-display font-extrabold tracking-[-0.025em] text-[36px] sm:text-[48px] leading-[1.1] text-ink max-w-[860px]">
            {post.title}
          </h1>
          <p className="mt-4 text-[16.5px] text-ink-soft max-w-[680px] leading-[1.65]">{post.excerpt}</p>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10 py-12 sm:py-16">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            {post.src && (
              <div className="mb-8 rounded-card overflow-hidden">
                <Img src={post.src} alt={post.title} caption={post.title} tone={post.tone} aspect="16/7" />
              </div>
            )}
            <div
              className="prose prose-lg max-w-none text-ink-soft leading-[1.8]
                [&_h2]:font-display [&_h2]:font-bold [&_h2]:text-[24px] [&_h2]:sm:text-[28px] [&_h2]:text-ink [&_h2]:tracking-tight [&_h2]:mt-10 [&_h2]:mb-4
                [&_h3]:font-display [&_h3]:font-semibold [&_h3]:text-[20px] [&_h3]:text-ink [&_h3]:mt-8 [&_h3]:mb-3
                [&_p]:mb-5 [&_p]:text-[16px]
                [&_ul]:my-4 [&_ul]:space-y-2 [&_ul>li]:text-[15px] [&_ul>li]:pl-1
                [&_ol]:my-4 [&_ol]:space-y-2 [&_ol>li]:text-[15px]
                [&_strong]:text-ink [&_strong]:font-semibold
                [&_a]:text-brand-deep [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-brand"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-card bg-gradient-to-br from-brand-soft to-aqua-soft border border-line p-6">
                <div className="font-display font-bold text-[18px] text-ink tracking-tight">Ücretsiz Deneme Dersi</div>
                <p className="mt-2 text-[14px] text-ink-soft">İlk dersiniz bizden. Randevu için formu doldurun.</p>
                <Link to="/iletisim" className="mt-4 btn-primary inline-flex items-center gap-2 w-full justify-center">
                  Hemen Başla <I.Arrow width="15" height="15" />
                </Link>
              </div>
              <div className="rounded-card bg-white border border-line p-5">
                <div className="font-semibold text-[14px] text-ink mb-3">Diğer Yazılar</div>
                <div className="space-y-3">
                  {BLOG_POSTS.filter(p => p.slug !== post.slug).slice(0, 4).map(p => (
                    <button
                      key={p.slug}
                      onClick={() => { onNavigate(p); }}
                      className="block text-left w-full group"
                    >
                      <div className="text-[12px] font-semibold uppercase tracking-wide text-brand-deep">{p.category}</div>
                      <div className="text-[13.5px] text-ink group-hover:text-brand transition-colors leading-snug mt-0.5">{p.title}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function BlogPage() {
  const [feature, ...rest] = BLOG_POSTS;

  return (
    <>
      <PageHeader
        crumbs="Blog"
        eyebrow="Blog & Rehber"
        title="Spor, gelişim ve"
        accent="sağlık üzerine."
        lede="Eğitmen kadromuzdan ipuçları, antrenman önerileri ve velilere yönelik rehber içerikler."
      />
      <section className="py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          {/* Featured */}
          <article className="reveal grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <Img src={feature.src} alt={feature.title} caption={feature.title} tone={feature.tone} aspect="16/10" className="shadow-card" />
            </div>
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider">
                <span className="text-brand-deep">{feature.category}</span>
                <span className="text-ink-faint">•</span>
                <span className="text-ink-muted">{feature.date}</span>
              </div>
              <h2 className="mt-3 font-display font-extrabold tracking-[-0.02em] text-[28px] sm:text-[34px] leading-[1.18] text-ink">
                {feature.title}
              </h2>
              <p className="mt-4 text-[15.5px] text-ink-soft leading-[1.65]">{feature.excerpt}</p>
              <div className="mt-5 flex items-center gap-4">
                <button
                  onClick={() => navigate('/blog/' + feature.slug)}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  Yazıyı Oku <I.Arrow width="16" height="16" />
                </button>
                <span className="text-[13px] text-ink-muted inline-flex items-center gap-1.5"><I.Clock width="13" height="13" /> {feature.readTime} okuma</span>
              </div>
            </div>
          </article>

          {/* Grid */}
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((p, i) => (
              <article key={p.slug} className="reveal card-lift bg-white border border-line rounded-card overflow-hidden flex flex-col" style={{ '--d': `${i*90}ms` }}>
                <Img src={p.src} alt={p.title} caption={p.title} tone={p.tone} aspect="16/10" />
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-[11.5px] font-semibold uppercase tracking-wider">
                    <span className={p.tone === 'aqua' ? 'text-aqua-deep' : 'text-brand-deep'}>{p.category}</span>
                    <span className="text-ink-faint">•</span>
                    <span className="text-ink-muted">{p.date}</span>
                  </div>
                  <h3 className="mt-2 font-display font-semibold text-[18px] leading-[1.3] text-ink">{p.title}</h3>
                  <p className="mt-2.5 text-[14px] text-ink-soft leading-[1.6]">{p.excerpt}</p>
                  <div className="mt-auto pt-4 flex items-center justify-between text-[12.5px]">
                    <span className="text-ink-muted inline-flex items-center gap-1"><I.Clock width="12" height="12" /> {p.readTime}</span>
                    <button
                      onClick={() => navigate('/blog/' + p.slug)}
                      className="font-semibold text-brand-deep hover:text-brand inline-flex items-center gap-1 transition-colors"
                    >
                      Devamını oku <I.ArrowUR width="12" height="12" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter */}
          <div className="reveal mt-16 rounded-card bg-paper-soft border border-line p-8 grid lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7">
              <div className="font-display font-bold text-[22px] text-ink tracking-tight">Yeni yazılardan haberdar ol.</div>
              <p className="mt-2 text-[14.5px] text-ink-soft max-w-[460px]">Spor, gelişim ve sağlık üzerine içeriklerimizi ayda bir kez e-postanıza gönderelim.</p>
            </div>
            <form className="lg:col-span-5 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input className="input flex-1" type="email" placeholder="ornek@eposta.com" />
              <button className="btn-primary inline-flex items-center gap-2 whitespace-nowrap" type="submit">Abone Ol</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

/* ====================================================================== */
/* İLETİŞİM                                                               */
/* ====================================================================== */
function ContactPage() {
  useEffectP(() => {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://cimcimpark.com/iletisim');
    return () => {};
  }, []);
  return (
    <>
      <PageHeader
        crumbs="İletişim"
        eyebrow="İletişim"
        title="Bizimle iletişime"
        accent="geç."
        lede="Sorularınız için formu doldurun veya doğrudan WhatsApp / telefon hattımızdan ulaşın. 24 saat içinde geri dönüş yapıyoruz."
      />
      <Contact />
    </>
  );
}

/* ====================================================================== */
/* 404                                                                    */
/* ====================================================================== */
function NotFoundPage() {
  return (
    <Section className="py-24 sm:py-32 text-center">
      <div className="font-mono text-[12px] text-brand-deep font-semibold tracking-wider">404</div>
      <h1 className="mt-3 font-display font-extrabold text-[40px] sm:text-[56px] leading-[1.1] tracking-[-0.025em] text-ink">
        Sayfa bulunamadı.
      </h1>
      <p className="mt-4 text-[16px] text-ink-soft max-w-[480px] mx-auto">
        Aradığınız sayfa taşınmış veya kaldırılmış olabilir.
      </p>
      <div className="mt-7 flex items-center justify-center gap-3">
        <Link to="/" className="btn-primary inline-flex items-center gap-2">Ana Sayfaya Dön <I.Arrow width="16" height="16" /></Link>
        <Link to="/iletisim" className="btn-ghost">Bize Ulaşın</Link>
      </div>
    </Section>
  );
}

function GizlilikPage() {
  return (
    <Section className="py-20 sm:py-28">
      <div className="max-w-[760px] mx-auto">
        <div className="font-mono text-[11px] text-brand-deep font-semibold tracking-wider uppercase mb-3">Yasal</div>
        <h1 className="font-display font-extrabold text-[32px] sm:text-[44px] leading-[1.15] tracking-[-0.02em] text-ink mb-6">Gizlilik Politikası</h1>
        <div className="prose-like space-y-5 text-[15px] text-ink-soft leading-relaxed">
          <p>CİMCİMPARK Spor &amp; Cimnastik Merkezi olarak kişisel verilerinizin gizliliğine önem veriyoruz. Bu politika, web sitemizi (<strong>cimcimpark.com</strong>) kullanırken toplanan verilerin nasıl işlendiğini açıklar.</p>
          <h2 className="text-[18px] font-semibold text-ink mt-8">Toplanan Veriler</h2>
          <p>İletişim formu aracılığıyla adınız, telefon numaranız ve e-posta adresiniz toplanabilir. Bu veriler yalnızca sizinle iletişim kurmak amacıyla kullanılır.</p>
          <h2 className="text-[18px] font-semibold text-ink mt-8">Verilerin Kullanımı</h2>
          <p>Toplanan kişisel veriler; üçüncü taraflarla paylaşılmaz, satılmaz veya kiralanmaz. Yalnızca CİMCİMPARK hizmetlerinin sunulması amacıyla kullanılır.</p>
          <h2 className="text-[18px] font-semibold text-ink mt-8">Veri Güvenliği</h2>
          <p>Verileriniz teknik ve idari tedbirlerle korunmaktadır. Detaylı bilgi için <strong>info@cimcimpark.com</strong> adresine ulaşabilirsiniz.</p>
          <h2 className="text-[18px] font-semibold text-ink mt-8">İletişim</h2>
          <p>Gizlilik politikamıza ilişkin sorularınız için: <a href="mailto:info@cimcimpark.com" className="text-brand hover:underline">info@cimcimpark.com</a></p>
        </div>
        <div className="mt-10">
          <Link to="/" className="btn-ghost inline-flex items-center gap-2"><I.Arrow className="rotate-180" width="16" height="16" /> Ana Sayfaya Dön</Link>
        </div>
      </div>
    </Section>
  );
}

function KVKKPage() {
  return (
    <Section className="py-20 sm:py-28">
      <div className="max-w-[760px] mx-auto">
        <div className="font-mono text-[11px] text-brand-deep font-semibold tracking-wider uppercase mb-3">Yasal</div>
        <h1 className="font-display font-extrabold text-[32px] sm:text-[44px] leading-[1.15] tracking-[-0.02em] text-ink mb-6">KVKK Aydınlatma Metni</h1>
        <div className="space-y-5 text-[15px] text-ink-soft leading-relaxed">
          <p>6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında veri sorumlusu sıfatıyla <strong>CİMCİMPARK Spor &amp; Cimnastik Merkezi</strong> (Tavşan Tepe, 69002. Sk No 88/A, Onikişubat/Kahramanmaraş) olarak kişisel verilerinizi aşağıda açıklanan amaçlar doğrultusunda işlemekteyiz.</p>
          <h2 className="text-[18px] font-semibold text-ink mt-8">İşlenen Kişisel Veriler</h2>
          <p>Ad, soyad, telefon numarası, e-posta adresi ve iletişim formuna girilen diğer bilgiler.</p>
          <h2 className="text-[18px] font-semibold text-ink mt-8">İşleme Amaçları</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Hizmetlerimiz hakkında bilgi vermek ve randevu oluşturmak</li>
            <li>Ücretsiz deneme dersi taleplerini değerlendirmek</li>
            <li>Yasal yükümlülükleri yerine getirmek</li>
          </ul>
          <h2 className="text-[18px] font-semibold text-ink mt-8">Hukuki Dayanak</h2>
          <p>KVKK madde 5/2 kapsamında; sözleşmenin ifası, meşru menfaat ve açık rıza hukuki sebeplerine dayanılmaktadır.</p>
          <h2 className="text-[18px] font-semibold text-ink mt-8">Haklarınız (KVKK m. 11)</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
            <li>İşlenmişse bilgi talep etme</li>
            <li>Düzeltme veya silme talep etme</li>
            <li>İşlemeye itiraz etme</li>
          </ul>
          <p className="mt-4">Başvurularınızı <a href="mailto:info@cimcimpark.com" className="text-brand hover:underline">info@cimcimpark.com</a> adresine iletebilirsiniz.</p>
        </div>
        <div className="mt-10">
          <Link to="/" className="btn-ghost inline-flex items-center gap-2"><I.Arrow className="rotate-180" width="16" height="16" /> Ana Sayfaya Dön</Link>
        </div>
      </div>
    </Section>
  );
}

function CerezPage() {
  return (
    <Section className="py-20 sm:py-28">
      <div className="max-w-[760px] mx-auto">
        <div className="font-mono text-[11px] text-brand-deep font-semibold tracking-wider uppercase mb-3">Yasal</div>
        <h1 className="font-display font-extrabold text-[32px] sm:text-[44px] leading-[1.15] tracking-[-0.02em] text-ink mb-6">Çerez Politikası</h1>
        <div className="space-y-5 text-[15px] text-ink-soft leading-relaxed">
          <p><strong>cimcimpark.com</strong> web sitesi, kullanıcı deneyimini iyileştirmek amacıyla çerezler kullanmaktadır.</p>
          <h2 className="text-[18px] font-semibold text-ink mt-8">Çerez Nedir?</h2>
          <p>Çerezler, tarayıcınız aracılığıyla cihazınıza kaydedilen küçük metin dosyalarıdır. Siteyi her ziyaretinizde tercihlerinizi hatırlamaya yardımcı olur.</p>
          <h2 className="text-[18px] font-semibold text-ink mt-8">Kullandığımız Çerezler</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Zorunlu Çerezler:</strong> Sitenin düzgün çalışması için gereklidir. Devre dışı bırakılamaz.</li>
            <li><strong>Analitik Çerezler:</strong> Sayfa ziyaretlerini anonim olarak analiz etmek için kullanılabilir.</li>
          </ul>
          <h2 className="text-[18px] font-semibold text-ink mt-8">Çerezleri Kontrol Etme</h2>
          <p>Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz. Ancak bu durumda bazı işlevler düzgün çalışmayabilir.</p>
          <h2 className="text-[18px] font-semibold text-ink mt-8">İletişim</h2>
          <p>Sorularınız için: <a href="mailto:info@cimcimpark.com" className="text-brand hover:underline">info@cimcimpark.com</a></p>
        </div>
        <div className="mt-10">
          <Link to="/" className="btn-ghost inline-flex items-center gap-2"><I.Arrow className="rotate-180" width="16" height="16" /> Ana Sayfaya Dön</Link>
        </div>
      </div>
    </Section>
  );
}

Object.assign(window, {
  PageHeader, FinalCTA,
  HomePage, AboutPage, BranchesPage, TeamPage, GalleryPage, BlogPage, BlogPostDetail, ContactPage, NotFoundPage,
  GizlilikPage, KVKKPage, CerezPage,
  BLOG_POSTS,
});
