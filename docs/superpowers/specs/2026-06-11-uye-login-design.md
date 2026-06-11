# Üye Giriş Paneli — Design Spec
**Tarih:** 2026-06-11  
**Durum:** Onaylandı

## Özet

`uye-girisi.html` sayfasına telefon+şifre tabanlı kimlik doğrulama eklenir. Şifresiz telefon numaraları için ilk giriş akışı (şifre belirleme + KVKK onayı) çalışır. Backend Google Apps Script, auth stateless HMAC-SHA256 token ile sağlanır.

## Mimari

```
uye-girisi.html
  └── fetch → Apps Script (PORTAL_URL)
        ├── action=checkStatus  → {exists, hasPassword}
        ├── action=setPassword  → {success, token}
        ├── action=login        → {success, token} | {error}
        └── action=me           → {found, members[]} | {error}

Google Sheet "Üyeler"
  └── Mevcut sütunlar + sifre_hash | sifre_salt | kvkk_tarih
```

## Google Sheet Sütun Düzeni

Mevcut sütunların sağına şu 3 sütun eklenir (sıra önemli):

| Sütun | Başlık | Açıklama |
|-------|--------|----------|
| H (veya boş ilk sütun) | `sifre_hash` | SHA-256(salt+şifre) hex |
| I | `sifre_salt` | 16 karakter rastgele string |
| J | `kvkk_tarih` | "2026-06-11" formatı |

> **Not:** Sütun numaraları Apps Script sabitlerinde `HASH_COL`, `SALT_COL`, `KVKK_COL` olarak tanımlanır — Sheet yapısına göre güncellenir.

## Frontend Durumları

```
[1] GİRİŞ          telefon input → "İlerle" butonu
        ↓ checkStatus → hasPassword=false
[2] ŞİFRE BELİRLE  yeni şifre + tekrar + KVKK checkbox
        ↓ setPassword success
[3] ÜYELİK KARTI   üyelik bilgileri + "Çıkış Yap"
        ↑ sayfa yüklenirken localStorage token geçerliyse direkt buraya
        ↓ checkStatus → hasPassword=true
[1b] ŞİFRE GİR     aynı form, şifre alanı görünür
        ↓ login success → token → localStorage
[3] ÜYELİK KARTI
```

## Backend Actions

### `checkStatus?q={phone10}`
- Phone normalize: 10 hane
- Sheet'te ara: var mı, `sifre_hash` dolu mu?
- Yanıt: `{exists: bool, hasPassword: bool}`
- Güvenlik: varlık bilgisi dışında veri sızdırmaz

### `setPassword?q={phone10}&password={pw}&kvkk=true`
- **Önce** `sifre_hash` boş mu kontrol et — doluysa `{success:false, error:"Şifre zaten belirlenmiş"}` dön
- Salt üret: `Utilities.getUuid().replace(/-/g,'').slice(0,16)`
- Hash: `Utilities.computeDigest(SHA_256, salt+password)` → hex
- Sheet'e yaz: hash, salt, kvkk_tarih
- Token üret → dön: `{success:true, token}`

### `login?q={phone10}&password={pw}`
- Rate limit: CacheService `lock_{phone}` — 5 yanlış → 15 dk kilit
- Hash doğrula: SHA-256(stored_salt + password) == stored_hash
- Başarı: `{success:true, token}`
- Hata: `{success:false, error:"Telefon veya şifre hatalı"}` (hangi alanın yanlış olduğu söylenmez)

### `me?token={token}`
- Token parse: `payload_b64.sig_b64`
- HMAC doğrula: `HMAC-SHA256(payload_b64, SECRET) == sig_b64`
- `exp` kontrol: `payload.exp > Date.now()/1000`
- Süresi dolmuşsa: `{found:false, error:"Oturum süresi doldu"}`
- Geçerliyse: `payload.p` telefonu ile üye sorgula → `{found, members[]}`

## Token Formatı

```
token = base64url(payload) + "." + base64url(sig)

payload = JSON.stringify({p: "5321234567", exp: unixTimestamp+2592000})
sig     = HMAC-SHA256(payload_b64, SECRET_KEY)
SECRET_KEY → Script Properties'te "TOKEN_SECRET" anahtarı
```

## Güvenlik

| Konu | Çözüm |
|------|-------|
| Brute-force | CacheService: 5 hatalı deneme → 15 dk kilit |
| Şifre üzerine yazma | setPassword başında hash boşluk kontrolü |
| Token sahteciliği | HMAC-SHA256 imza doğrulama |
| Token süresi | 30 gün exp, me'de kontrol |
| Şifre kuralı | Min 8 karakter (frontend + backend) |
| KVKK kanıtı | kvkk_tarih sütununa tarih kaydedilir |

## KVKK Akışı

[2] ekranında:
- Sabit yükseklikli kaydırılabilir kutu içinde tam aydınlatma metni
- `<input type="checkbox" required>` — işaretlenmeden form submit edilemez
- `setPassword` isteğine `kvkk=true` parametresi eklenir
- Backend `kvkk_tarih` = bugünün tarihi olarak yazar

## Admin Şifre Sıfırlama

Büşra Google Sheet'te ilgili üyenin `sifre_hash` ve `sifre_salt` hücrelerini siler. Üye bir sonraki girişte `checkStatus` → `hasPassword: false` → [2] ŞİFRE BELİRLE akışına yönlendirilir.

## Kapsam Dışı

- E-posta ile giriş (telefon yeterli)
- Üye kendi şifresini değiştiremez (Büşra sıfırlar)
- SMS OTP (maliyet nedeniyle kapsam dışı bırakıldı)
- Supabase / harici auth
