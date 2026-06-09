# CİMCİMPARK Web Sitesi

Kahramanmaraş'ta faaliyet gösteren spor & cimnastik merkezi. Vanilla React 18 + Tailwind CSS (CDN). Build adımı yok — `index.html` doğrudan browser'da açılır.

## Geliştirme

```bash
python -m http.server 3000
# → http://localhost:3000
```

## Dosya Yapısı

```
index.html        ← giriş noktası, CDN yüklemeleri (React, Babel, Tailwind)
styles.css        ← global CSS: animasyonlar, .reveal, .btn-primary, .ph-stripe, lightbox, vb.
primitives.jsx    ← paylaşılan bileşenler → window'a export edilir
sections.jsx      ← tüm sayfa bölümleri → window'a export edilir
pages.jsx         ← rota kompozisyonları → window'a export edilir
app.jsx           ← hash router + layout (Navbar, Footer, SocialRail persist)
assets/
  hero/           ← gerçek hero görselleri (PNG)
```

## Mimari

Dosyalar arasında import yok. Her dosya `Object.assign(window, {...})` ile bileşenlerini global'e açar; bir sonraki `<script>` onları doğrudan kullanır. Yükleme sırası: `primitives → sections → pages → app`.

**Yeni bileşen eklerken:** tanımladığın dosyanın en altındaki `Object.assign(window, {...})` listesine ekle.

## Routing

Hash-based (`#/rota`). `navigate(to)` veya `<Link to="/rota">` kullan. `window.location.hash` değişince `useRoute()` hook'u yeniden render tetikler.

| Hash | Sayfa |
|------|-------|
| `#/` | Ana Sayfa |
| `#/hakkimizda` | Hakkımızda |
| `#/branslarimiz` | Branşlarımız |
| `#/ekibimiz` | Ekibimiz |
| `#/galeri` | Galeri |
| `#/blog` | Blog |
| `#/iletisim` | İletişim |

Yeni rota: `app.jsx`'teki `ROUTES` objesine ekle, `pages.jsx`'te sayfa bileşenini tanımla.

## Tasarım Sistemi

**Renkler** (`tailwind.config` → `index.html`):
- `brand` / `brand-deep` / `brand-tint` / `brand-soft` → Turuncu `#F97316`
- `aqua` / `aqua-deep` / `aqua-tint` / `aqua-soft` → Turkuaz `#06B6D4`
- `ink` / `ink-soft` / `ink-muted` / `ink-faint` → Antrasit metin
- `paper` / `paper-soft` / `paper-warm` → Beyaz/gri arka plan
- `line` → Kenarlık `#E5E7EB`

**Tipografi:** `font-display` = Poppins, `font-sans` = Inter, `font-mono` = JetBrains Mono

**Border radius:** `rounded-card` = 14px, `rounded-btn` = 12px, `rounded-pill` = 999px

**Gölgeler:** `shadow-soft`, `shadow-card`, `shadow-lift`, `shadow-glow`

## Paylaşılan Bileşenler (primitives.jsx)

| Bileşen | Kullanım |
|---------|---------|
| `<Link to="/rota">` | Hash routing ile navigasyon |
| `<Section id tone>` | `max-w-[1200px]` sarmalayıcı |
| `<Eyebrow tone>` | Küçük etiket pill (brand/aqua/neutral) |
| `<IconTile tone size>` | Gradient ikon kutusu (3D efekt) |
| `<Counter to suffix>` | IntersectionObserver sayaç animasyonu |
| `<Img src alt caption tone aspect>` | Görsel + striped fallback |
| `<Photo caption tone aspect>` | Sadece placeholder |
| `<Logo>` | CİMCİMPARK logosu + linki |
| `I.Arrow / I.Phone / I.Pin / ...` | İkon kütüphanesi (inline SVG) |

## Animasyonlar

- `.reveal` → fade-up (opacity + translateY 20px), IntersectionObserver tetikler
- `.reveal-fade` → sadece opacity
- `.reveal-up-sm` → küçük fade-up (12px)
- Stagger: `style={{ '--d': '100ms' }}` ile `transition-delay` ver
- `useReveal(dep)` hook'u rota değişince animasyonları sıfırlar

## Marka Bilgileri

- **İşletme:** CİMCİMPARK Spor & Cimnastik Merkezi
- **Kurucu:** Büşra PAKYARDIM (III. Kademe TCF Cimnastik Antrenörü, TCF Pilates Antrenörü)
- **Adres:** Tavşan Tepe, 69002. Sk No 88/A, Onikişubat/Kahramanmaraş
- **Telefon:** 0539 243 76 06
- **WhatsApp:** https://wa.me/905392437606
- **E-posta:** info@cimcimpark.com
- **Hedef kitle:** 4-65 yaş
- **Branşlar:** Temel Cimnastik, Çocuk Taekwondo, Çocuk Kick Boks, Mat Pilates, Reformer Pilates, Yetişkin Kick Boks

## Görsel Placeholder'lar

Gerçek stüdyo fotoğrafı olmayan yerlerde `<Img>` veya `<Photo>` kullan. `src` prop'u null ise striped placeholder gösterir, `caption` metni monospace etiket olarak üzerine biner. `assets/hero/` içindeki 2 PNG gerçek fotoğraf.

## Önemli Notlar

- Siyah/karanlık tema kullanma. Site beyaz, ferah, enerjik.
- Yeni sayfa bölümü → `sections.jsx`'e ekle, `Object.assign(window,{...})` listesini güncelle.
- Yeni sayfa → `pages.jsx` + `app.jsx ROUTES`.
- Tailwind CDN kullandığından `purge` yok; tüm utility sınıfları çalışır.
- `<script type="text/babel">` ile Babel CDN JSX'i runtime'da derliyor; production için Vite/CRA'ya taşı.
