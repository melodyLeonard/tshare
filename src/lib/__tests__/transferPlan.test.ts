import type { Manifest } from '../../types';
import { missingChunks } from '../transferPlan';

const manifest = (n: number): Manifest => ({
  root: 'r',
  name: 'f',
  size: n,
  chunkSize: 1,
  chunks: Array.from({ length: n }, (_, i) => ({ hash: `h${i}`, size: 1 })),
});

describe('missingChunks', () => {
  it('returns every chunk for a fresh transfer', () => {
    expect(missingChunks(manifest(4), [])).toEqual([0, 1, 2, 3]);
  });

  it('skips chunks already verified (resume)', () => {
    expect(missingChunks(manifest(4), [0, 2])).toEqual([1, 3]);
  });

  it('returns nothing once complete', () => {
    expect(missingChunks(manifest(3), [0, 1, 2])).toEqual([]);
  });
});
