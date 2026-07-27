import type { Manifest } from '../types';

// The chunk indexes a receiver still needs, given what it has already verified.
// Drives a fresh transfer (have empty) and a resumed one (have carries over),
// and by extension multi-seeder — any missing index can be fetched from anyone.
export function missingChunks(manifest: Manifest, have: number[]): number[] {
  const done = new Set(have);
  const missing: number[] = [];
  for (let i = 0; i < manifest.chunks.length; i++) {
    if (!done.has(i)) {
      missing.push(i);
    }
  }
  return missing;
}
