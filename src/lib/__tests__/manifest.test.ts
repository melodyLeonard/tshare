import { buildManifest } from '../manifest';

describe('buildManifest', () => {
  it('pairs each chunk hash with its planned size', () => {
    const manifest = buildManifest('clip.mov', 250, 100, ['a', 'b', 'c'], 'root');

    expect(manifest.root).toBe('root');
    expect(manifest.chunks).toEqual([
      { hash: 'a', size: 100 },
      { hash: 'b', size: 100 },
      { hash: 'c', size: 50 },
    ]);
  });

  it('rejects a hash count that does not match the plan', () => {
    expect(() => buildManifest('x', 250, 100, ['a', 'b'], 'root')).toThrow(
      /expected 3 chunk hashes/,
    );
  });
});
