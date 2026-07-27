import type { ChunkRef, Manifest } from '../types';
import { planChunks } from './chunking';

// Assemble a manifest from a file's size and its per-chunk hashes, in order.
// The root — computed in Rust from the same hashes — content-addresses the
// whole file, so any seeder holding these chunks can serve it.
export function buildManifest(
  name: string,
  size: number,
  chunkSize: number,
  hashes: string[],
  root: string,
): Manifest {
  const plan = planChunks(size, chunkSize);
  if (plan.length !== hashes.length) {
    throw new Error(`expected ${plan.length} chunk hashes, got ${hashes.length}`);
  }
  const chunks: ChunkRef[] = plan.map((c, i) => ({ hash: hashes[i], size: c.size }));
  return { root, name, size, chunkSize, chunks };
}
