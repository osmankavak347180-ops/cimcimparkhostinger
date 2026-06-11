// ═══════════════════════════════════════════════════════
// CİMCİMPARK Üye Portal — Apps Script Backend v2.0
// ═══════════════════════════════════════════════════════

// ── Sütun numaraları — Sheet yapına göre düzenle ───────
const COL_AD        = 1;   // A
const COL_TELEFON   = 2;   // B
const COL_BRANS     = 3;   // C
const COL_BASLANGIC = 4;   // D
const COL_BITIS     = 5;   // E
const COL_HAFTA     = 6;   // F
const COL_ODEME     = 7;   // G
const COL_HASH      = 8;   // H — sifre_hash
const COL_SALT      = 9;   // I — sifre_salt
const COL_KVKK      = 10;  // J — kvkk_tarih

const SHEET_NAME   = 'Üyeler';
const MAX_ATTEMPTS = 5;
const LOCK_TTL     = 900; // 15 dakika (saniye)

// ── Ana Router ─────────────────────────────────────────
function doGet(e) {
  try {
    const action = String(e.parameter.action || '').trim();
    if (action === 'checkStatus') return checkStatusHandler(e);
    if (action === 'setPassword') return setPasswordHandler(e);
    if (action === 'login')       return loginHandler(e);
    if (action === 'me')          return meHandler(e);
    return jsonResponse({ error: 'Geçersiz istek' });
  } catch (err) {
    Logger.log('doGet error: ' + err);
    return jsonResponse({ error: 'Sunucu hatası' });
  }
}

// ── checkStatus ────────────────────────────────────────
function checkStatusHandler(e) {
  const phone = normalizePhone(e.parameter.q || '');
  if (phone.length !== 10) return jsonResponse({ error: 'Geçersiz numara' });

  const row = findRow(phone);
  if (!row) return jsonResponse({ exists: false, hasPassword: false });

  const hash = String(row[COL_HASH - 1] || '').trim();
  return jsonResponse({ exists: true, hasPassword: hash !== '' });
}

// ── setPassword ────────────────────────────────────────
function setPasswordHandler(e) {
  const phone    = normalizePhone(e.parameter.q || '');
  const password = String(e.parameter.password  || '');
  const kvkk     = e.parameter.kvkk === 'true';

  if (phone.length !== 10) return jsonResponse({ success: false, error: 'Geçersiz numara' });
  if (password.length < 8) return jsonResponse({ success: false, error: 'Şifre en az 8 karakter olmalı' });
  if (!kvkk)               return jsonResponse({ success: false, error: 'KVKK onayı gerekli' });

  const sheet = getSheet();
  const data  = sheet.getDataRange().getValues();
  let rowIdx  = -1;

  for (let i = 1; i < data.length; i++) {
    if (normalizePhone(String(data[i][COL_TELEFON - 1])) === phone) { rowIdx = i; break; }
  }

  if (rowIdx === -1) return jsonResponse({ success: false, error: 'Bu numaraya ait kayıt bulunamadı' });

  const existingHash = String(data[rowIdx][COL_HASH - 1] || '').trim();
  if (existingHash !== '') {
    return jsonResponse({ success: false, error: 'Şifre zaten belirlenmiş. Değiştirmek için merkezi arayın.' });
  }

  const salt  = generateSalt();
  const hash  = hashPassword(salt, password);
  const today = Utilities.formatDate(new Date(), 'Europe/Istanbul', 'yyyy-MM-dd');

  const r = rowIdx + 1;
  sheet.getRange(r, COL_HASH).setValue(hash);
  sheet.getRange(r, COL_SALT).setValue(salt);
  sheet.getRange(r, COL_KVKK).setValue(today);

  return jsonResponse({ success: true, token: createToken(phone) });
}

// ── login ──────────────────────────────────────────────
function loginHandler(e) {
  const phone    = normalizePhone(e.parameter.q || '');
  const password = String(e.parameter.password  || '');

  if (phone.length !== 10) return jsonResponse({ success: false, error: 'Geçersiz numara' });

  const cache   = CacheService.getScriptCache();
  const lockKey = 'lock_' + phone;
  const attKey  = 'att_'  + phone;

  if (cache.get(lockKey)) {
    return jsonResponse({ success: false, error: 'Çok fazla yanlış deneme. 15 dakika sonra tekrar deneyin.' });
  }

  const row = findRow(phone);
  if (!row) {
    incrementAttempts(cache, attKey, lockKey);
    return jsonResponse({ success: false, error: 'Telefon veya şifre hatalı' });
  }

  const storedHash = String(row[COL_HASH - 1] || '').trim();
  const storedSalt = String(row[COL_SALT - 1] || '').trim();

  if (!storedHash) {
    return jsonResponse({ success: false, error: 'Şifre henüz belirlenmemiş. İlk girişi yapın.' });
  }

  if (hashPassword(storedSalt, password) !== storedHash) {
    incrementAttempts(cache, attKey, lockKey);
    return jsonResponse({ success: false, error: 'Telefon veya şifre hatalı' });
  }

  cache.remove(attKey);
  return jsonResponse({ success: true, token: createToken(phone) });
}

// ── me ─────────────────────────────────────────────────
function meHandler(e) {
  const payload = verifyToken(e.parameter.token || '');
  if (!payload) {
    return jsonResponse({ found: false, error: 'Oturum süresi doldu. Lütfen tekrar giriş yapın.' });
  }
  const members = getMembers(payload.p);
  return jsonResponse({ found: members.length > 0, members: members });
}

// ── Sheet yardımcıları ─────────────────────────────────
function getSheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
}

function findRow(phone) {
  const rows = getSheet().getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (normalizePhone(String(rows[i][COL_TELEFON - 1])) === phone) return rows[i];
  }
  return null;
}

function getMembers(phone) {
  const rows   = getSheet().getDataRange().getValues();
  const result = [];
  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    if (normalizePhone(String(r[COL_TELEFON - 1])) !== phone) continue;
    result.push({
      ad:        String(r[COL_AD        - 1] || ''),
      brans:     String(r[COL_BRANS     - 1] || ''),
      baslangic: fmtDate(r[COL_BASLANGIC - 1]),
      bitis:     fmtDate(r[COL_BITIS    - 1]),
      hafta:     String(r[COL_HAFTA     - 1] || ''),
      odeme:     String(r[COL_ODEME     - 1] || '')
    });
  }
  return result;
}

// ── Telefon normalize ──────────────────────────────────
function normalizePhone(raw) {
  let d = String(raw).replace(/\D/g, '');
  if (d.startsWith('90')) d = d.slice(2);
  if (d.startsWith('0'))  d = d.slice(1);
  return d;
}

// ── Tarih format ───────────────────────────────────────
function fmtDate(val) {
  if (!val) return '';
  if (val instanceof Date) {
    return String(val.getDate()).padStart(2, '0') + '.'
         + String(val.getMonth() + 1).padStart(2, '0') + '.'
         + val.getFullYear();
  }
  return String(val);
}

// ── Şifre hash ─────────────────────────────────────────
function generateSalt() {
  return Utilities.getUuid().replace(/-/g, '').slice(0, 16);
}

function hashPassword(salt, password) {
  const bytes = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    salt + password,
    Utilities.Charset.UTF_8
  );
  return bytes.map(b => ((b < 0 ? b + 256 : b).toString(16).padStart(2, '0'))).join('');
}

// ── Rate limiting ──────────────────────────────────────
function incrementAttempts(cache, attKey, lockKey) {
  const n = parseInt(cache.get(attKey) || '0') + 1;
  if (n >= MAX_ATTEMPTS) {
    cache.put(lockKey, '1', LOCK_TTL);
    cache.remove(attKey);
  } else {
    cache.put(attKey, String(n), LOCK_TTL);
  }
}

// ── HMAC Token ─────────────────────────────────────────
function createToken(phone) {
  const payloadStr = JSON.stringify({ p: phone, exp: Math.floor(Date.now() / 1000) + 2592000 });
  const payloadB64 = Utilities.base64EncodeWebSafe(payloadStr).replace(/=+$/, '');
  return payloadB64 + '.' + hmacSign(payloadB64);
}

function verifyToken(token) {
  if (!token) return null;
  const dot = token.lastIndexOf('.');
  if (dot === -1) return null;
  const payloadB64 = token.slice(0, dot);
  const sig        = token.slice(dot + 1);
  try {
    if (hmacSign(payloadB64) !== sig) return null;
    const payload = JSON.parse(
      Utilities.newBlob(Utilities.base64DecodeWebSafe(payloadB64)).getDataAsString()
    );
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch (err) {
    Logger.log('verifyToken: ' + err);
    return null;
  }
}

function hmacSign(data) {
  const secret = PropertiesService.getScriptProperties().getProperty('TOKEN_SECRET');
  if (!secret) throw new Error('TOKEN_SECRET tanımlı değil. Script Properties ayarla.');
  const sig = Utilities.computeHmacSha256Signature(data, secret, Utilities.Charset.UTF_8);
  return Utilities.base64EncodeWebSafe(sig).replace(/=+$/, '');
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
