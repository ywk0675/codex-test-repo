const STORAGE_KEY = 'ai_tycoon_master_key';

function getOrCreateMasterKey() {
  if (typeof window === 'undefined') return '';
  let key = sessionStorage.getItem(STORAGE_KEY);
  if (!key) {
    key = Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    sessionStorage.setItem(STORAGE_KEY, key);
  }
  return key;
}

async function getCryptoKey() {
  const masterKey = getOrCreateMasterKey();
  const rawKey = new TextEncoder().encode(masterKey.slice(0, 32));
  return crypto.subtle.importKey('raw', rawKey, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
}

export async function encryptAPIKey(apiKey) {
  try {
    const key = await getCryptoKey();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      new TextEncoder().encode(apiKey)
    );
    const combined = new Uint8Array(iv.length + encrypted.byteLength);
    combined.set(iv);
    combined.set(new Uint8Array(encrypted), iv.length);
    return btoa(String.fromCharCode(...combined));
  } catch {
    return apiKey;
  }
}

export async function decryptAPIKey(encrypted) {
  try {
    const key = await getCryptoKey();
    const combined = Uint8Array.from(atob(encrypted), c => c.charCodeAt(0));
    const iv = combined.slice(0, 12);
    const ciphertext = combined.slice(12);
    const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ciphertext);
    return new TextDecoder().decode(decrypted);
  } catch {
    return '';
  }
}

export function maskAPIKey(apiKey) {
  if (!apiKey || apiKey.length < 8) return '••••••••';
  return apiKey.slice(0, 6) + '••••' + apiKey.slice(-4);
}
