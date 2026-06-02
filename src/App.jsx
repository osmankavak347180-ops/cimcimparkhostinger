import React from 'react';
import { useRoute, useReveal } from './primitives';
import { SocialRail, ScrollToTop, Navbar, Footer } from './sections';
import {
  HomePage, AboutPage, BranchesPage, TeamPage, GalleryPage, BlogPage, ContactPage,
  GizlilikPage, KVKKPage, CerezPage, NotFoundPage,
} from './pages';

const ROUTES = {
  '/':              { Component: () => <HomePage />,     label: 'Ana Sayfa',    desc: "Kahramanmaraş Onikişubat'ta 4-65 yaş için cimnastik, pilates, taekwondo ve kick boks. Ücretsiz deneme dersi için hemen ulaşın." },
  '/hakkimizda':    { Component: () => <AboutPage />,    label: 'Hakkımızda',   desc: "CİMCİMPARK'ın kuruluş hikayesi, misyonu ve uzman kadrosu. 2026'da Kahramanmaraş'ın spor yaşamına katkı sağlamak için yola çıktık." },
  '/branslarimiz':  { Component: () => <BranchesPage />, label: 'Branşlarımız', desc: "Temel Cimnastik, Çocuk Taekwondo, Kick Boks, Mat Pilates, Reformer Pilates — 4-65 yaş için 6 profesyonel branş." },
  '/ekibimiz':      { Component: () => <TeamPage />,     label: 'Ekibimiz',     desc: "CİMCİMPARK'ın sertifikalı, deneyimli eğitmen kadrosu. TCF lisanslı uzmanlarla tanışın." },
  '/galeri':        { Component: () => <GalleryPage />,  label: 'Galeri',       desc: "CİMCİMPARK'ın aydınlık, ferah ve modern stüdyolarını fotoğraflarla keşfedin." },
  '/blog':          { Component: () => <BlogPage />,     label: 'Blog',         desc: "Cimnastik, pilates ve dövüş sanatları üzerine uzman ipuçları, gelişim rehberleri ve antrenman önerileri." },
  '/iletisim':      { Component: () => <ContactPage />,  label: 'İletişim',     desc: "CİMCİMPARK ile iletişime geçin. Onikişubat/Kahramanmaraş. Tel: 0539 243 76 06. Ücretsiz deneme dersi için formu doldurun." },
  '/gizlilik':      { Component: () => <GizlilikPage />, label: 'Gizlilik',      desc: "CİMCİMPARK Gizlilik Politikası — kişisel verilerinizin nasıl korunduğunu öğrenin." },
  '/kvkk':          { Component: () => <KVKKPage />,     label: 'KVKK Aydınlatma', desc: "CİMCİMPARK KVKK Aydınlatma Metni — 6698 sayılı Kanun kapsamında kişisel veri işleme bilgilendirmesi." },
  '/cerez':         { Component: () => <CerezPage />,    label: 'Çerez Politikası', desc: "CİMCİMPARK Çerez Politikası — sitemizde kullanılan çerezler hakkında bilgi edinin." },
};

function App() {
  const route = useRoute();
  const match = ROUTES[route] || null;
  const { Component, label, desc } = match || { Component: NotFoundPage, label: '404', desc: '' };

  // Re-run reveal observer per route change.
  useReveal(route);

  // Scroll to top + update SEO tags on route change.
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });

    const title = label === 'Ana Sayfa'
      ? "CİMCİMPARK — Kahramanmaraş'ın En Dinamik Spor & Cimnastik Merkezi"
      : `${label} · CİMCİMPARK Kahramanmaraş`;
    document.title = title;

    const canonicalBase = 'https://cimcimpark.com';
    const pagePath = route === '/' ? '' : route;

    const setMeta = (id, value) => { const el = document.getElementById(id); if (el) el.content = value; };
    const setLink = (id, value) => { const el = document.getElementById(id); if (el) el.href = value; };
    const setMetaProp = (id, value) => { const el = document.getElementById(id); if (el) el.setAttribute('content', value); };

    setMeta('meta-description', desc);
    setLink('link-canonical', canonicalBase + pagePath);
    setMetaProp('og-title', title);
    setMetaProp('og-description', desc);
    setMetaProp('og-url', canonicalBase + pagePath);
  }, [route, label, desc]);

  return (
    <div className="min-h-screen flex flex-col" data-screen-label={`Page · ${label}`}>
      {/* GLOBAL persistent layout */}
      <SocialRail />
      <ScrollToTop />
      <Navbar route={route} />
      <main key={route} className="flex-1 page-fade">
        <Component />
      </main>
      <Footer />
    </div>
  );
}

export default App;
