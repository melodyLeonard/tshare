import { CHUNK_SIZE } from '../constants';

export interface ChunkPlan {
  index: number;
  offset: number;
  size: number;
}

// Split a file of `size` bytes into fixed-size chunks; the last chunk holds the
// remainder. Both sides derive the same plan from the size alone, so they agree
// on chunk boundaries without exchanging them.
export function planChunks(size: number, chunkSize = CHUNK_SIZE): ChunkPlan[] {
  if (size < 0 || chunkSize <= 0) {
    throw new RangeError('size must be >= 0 and chunkSize must be > 0');
  }
  const plan: ChunkPlan[] = [];
  for (let offset = 0, index = 0; offset < size; offset += chunkSize, index++) {
    plan.push({ index, offset, size: Math.min(chunkSize, size - offset) });
  }
  return plan;
}
