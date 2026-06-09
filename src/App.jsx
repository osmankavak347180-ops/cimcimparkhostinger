import React from 'react';
import { useRoute, useReveal } from './primitives';
import { SocialRail, ScrollToTop, Navbar, Footer } from './sections';
import {
  HomePage, AboutPage, BranchesPage, TeamPage, GalleryPage, BlogPage, BlogPostDetail, ContactPage,
  GizlilikPage, KVKKPage, CerezPage, NotFoundPage, BLOG_POSTS,
} from './pages';
import { navigate } from './primitives';

const ROUTES = {
  '/':              { Component: () => <HomePage />,     label: 'Ana Sayfa',    title: "Cimnastik, Pilates, Reformer, Mat Pilates Kursu Kahramanmaraş | CimCimPark – Onikişubat'ın 1 Numaralı Spor Merkezi", desc: "Kahramanmaraş Onikişubat'ta çocuklar için cimnastik, taekwondo, pilates ve reformer pilates kursları. 3-18 yaş arası profesyonel antrenman. Ücretsiz deneme dersi için hemen ara!" },
  '/hakkimizda':    { Component: () => <AboutPage />,    label: 'Hakkımızda',   title: "Hakkımızda | CimCimPark Kahramanmaraş Cimnastik ve Spor Merkezi", desc: "CimCimPark, Kahramanmaraş Onikişubat'ta uzman eğitmenlerle çocukların spor hayatına güvenli adım attığı modern bir cimnastik ve spor merkezidir." },
  '/branslarimiz':  { Component: () => <BranchesPage />, label: 'Branşlarımız', title: "Cimnastik, Taekwondo, Pilates, Reformer Kursları | CimCimPark Kahramanmaraş", desc: "Kahramanmaraş'ta 3 yaşından itibaren cimnastik, taekwondo, kick boks, pilates ve reformer pilates kursları. CimCimPark Onikişubat'ta uzman antrenörlerle spora başla." },
  '/ekibimiz':      { Component: () => <TeamPage />,     label: 'Ekibimiz',     desc: "CİMCİMPARK'ın sertifikalı, deneyimli eğitmen kadrosu. TCF lisanslı uzmanlarla tanışın." },
  '/galeri':        { Component: () => <GalleryPage />,  label: 'Galeri',       desc: "CİMCİMPARK'ın aydınlık, ferah ve modern stüdyolarını fotoğraflarla keşfedin." },
  '/blog':          { Component: () => <BlogPage />,     label: 'Blog',         desc: "Cimnastik, pilates ve dövüş sanatları üzerine uzman ipuçları, gelişim rehberleri ve antrenman önerileri." },
  '/iletisim':      { Component: () => <ContactPage />,  label: 'İletişim',     title: "İletişim | CimCimPark Kahramanmaraş – Onikişubat Spor Merkezi", desc: "Kahramanmaraş Onikişubat'taki CimCimPark spor merkezine ulaşın. Adres, telefon ve WhatsApp ile kolayca iletişime geçin." },
  '/gizlilik':      { Component: () => <GizlilikPage />, label: 'Gizlilik',      desc: "CİMCİMPARK Gizlilik Politikası — kişisel verilerinizin nasıl korunduğunu öğrenin." },
  '/kvkk':          { Component: () => <KVKKPage />,     label: 'KVKK Aydınlatma', desc: "CİMCİMPARK KVKK Aydınlatma Metni — 6698 sayılı Kanun kapsamında kişisel veri işleme bilgilendirmesi." },
  '/cerez':         { Component: () => <CerezPage />,    label: 'Çerez Politikası', desc: "CİMCİMPARK Çerez Politikası — sitemizde kullanılan çerezler hakkında bilgi edinin." },
};

function App() {
  const route = useRoute();

  const blogSlug = route.startsWith('/blog/') ? route.slice(6) : null;
  const blogPost = blogSlug ? BLOG_POSTS.find(p => p.slug === blogSlug) : null;

  const baseMatch = ROUTES[route] || null;
  const { Component, label, title: routeTitle, desc } = (() => {
    if (blogPost) return {
      Component: () => (
        <BlogPostDetail
          post={blogPost}
          onBack={() => navigate('/blog')}
          onNavigate={(p) => navigate('/blog/' + p.slug)}
        />
      ),
      label: blogPost.title,
      title: `${blogPost.title} · CİMCİMPARK`,
      desc: blogPost.metaDescription || blogPost.excerpt,
    };
    if (blogSlug) return { Component: NotFoundPage, label: '404', title: '404', desc: '' };
    return baseMatch || { Component: NotFoundPage, label: '404', title: '404', desc: '' };
  })();

  // Re-run reveal observer per route change.
  useReveal(route);

  // Scroll to top + update SEO tags on route change.
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });

    const title = routeTitle || `${label} · CİMCİMPARK Kahramanmaraş`;
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

    // Dinamik BreadcrumbList schema
    const bcId = 'schema-breadcrumb';
    let bcEl = document.getElementById(bcId);
    if (route === '/') {
      if (bcEl) bcEl.remove();
    } else {
      if (!bcEl) {
        bcEl = document.createElement('script');
        bcEl.type = 'application/ld+json';
        bcEl.id = bcId;
        document.head.appendChild(bcEl);
      }
      bcEl.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Ana Sayfa', 'item': 'https://cimcimpark.com/' },
          { '@type': 'ListItem', 'position': 2, 'name': label, 'item': `${canonicalBase}${pagePath}` }
        ]
      });
    }
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
