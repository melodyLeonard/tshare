const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const LOOKUP = new Uint8Array(128);
for (let i = 0; i < CHARS.length; i++) {
  LOOKUP[CHARS.charCodeAt(i)] = i;
}

// Decode the base64 module Metro embeds as text into the bytes the native
// runtime loads. Hand-rolled so it doesn't depend on atob being present.
export function base64ToBytes(b64: string): Uint8Array {
  const clean = b64.replace(/=+$/, '');
  const out = new Uint8Array(Math.floor((clean.length * 3) / 4));
  let p = 0;
  for (let i = 0; i < clean.length; i += 4) {
    const a = LOOKUP[clean.charCodeAt(i)];
    const b = LOOKUP[clean.charCodeAt(i + 1)];
    const c = LOOKUP[clean.charCodeAt(i + 2)];
    const d = LOOKUP[clean.charCodeAt(i + 3)];
    out[p++] = (a << 2) | (b >> 4);
    if (i + 2 < clean.length) out[p++] = ((b & 15) << 4) | (c >> 2);
    if (i + 3 < clean.length) out[p++] = ((c & 3) << 6) | d;
  }
  return out;
}
