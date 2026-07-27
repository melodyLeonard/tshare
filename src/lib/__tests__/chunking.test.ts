import { planChunks } from '../chunking';

describe('planChunks', () => {
  it('splits an exact multiple into equal chunks', () => {
    expect(planChunks(200, 100)).toEqual([
      { index: 0, offset: 0, size: 100 },
      { index: 1, offset: 100, size: 100 },
    ]);
  });

  it('puts the remainder in the final chunk', () => {
    const plan = planChunks(250, 100);
    expect(plan).toHaveLength(3);
    expect(plan[2]).toEqual({ index: 2, offset: 200, size: 50 });
  });

  it('returns no chunks for an empty file', () => {
    expect(planChunks(0, 100)).toEqual([]);
  });

  it('rejects a non-positive chunk size', () => {
    expect(() => planChunks(100, 0)).toThrow(RangeError);
  });
});
