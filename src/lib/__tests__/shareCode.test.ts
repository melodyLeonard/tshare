import { shareCode } from '../shareCode';

describe('shareCode', () => {
  it('takes the first 12 hex of the root, upper-cased and grouped', () => {
    expect(shareCode('d74981efa70a0c880b8d8c19')).toBe('D749-81EF-A70A');
  });

  it('handles a root shorter than 12 characters', () => {
    expect(shareCode('abcd')).toBe('ABCD');
  });
});
