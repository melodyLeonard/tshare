// A stand-in file so the Send flow is demoable before the OS file picker is
// wired in. Deterministic bytes, and a small chunk size so the multi-chunk
// hashing progress is visible. Swapping in a real picked file replaces only
// this function.
export function sampleFile(): { name: string; bytes: Uint8Array; chunkSize: number } {
  const size = 384 * 1024;
  const bytes = new Uint8Array(size);
  let seed = 0x9e3779b1;
  for (let i = 0; i < size; i++) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    bytes[i] = seed & 0xff;
  }
  return { name: 'demo-photo.jpg', bytes, chunkSize: 64 * 1024 };
}
