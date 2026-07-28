import { orderedChunks } from '../assemble';

describe('orderedChunks', () => {
  it('returns the chunks in index order', () => {
    const got = new Map([
      [2, 'c'],
      [0, 'a'],
      [1, 'b'],
    ]);
    expect(orderedChunks(got, 3)).toEqual(['a', 'b', 'c']);
  });

  it('throws when a chunk is missing', () => {
    const got = new Map([
      [0, 'a'],
      [2, 'c'],
    ]);
    expect(() => orderedChunks(got, 3)).toThrow(/missing chunk 1/);
  });
});
