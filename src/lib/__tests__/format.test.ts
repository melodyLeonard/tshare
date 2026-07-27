import { formatBytes } from '../format';

describe('formatBytes', () => {
  it('keeps small sizes in bytes', () => {
    expect(formatBytes(500)).toBe('500 B');
  });

  it('shows one decimal below ten units', () => {
    expect(formatBytes(1536)).toBe('1.5 KB');
  });

  it('drops the decimal at ten units and above', () => {
    expect(formatBytes(20 * 1024 * 1024)).toBe('20 MB');
  });

  it('scales up to gigabytes', () => {
    expect(formatBytes(3 * 1024 * 1024 * 1024)).toBe('3.0 GB');
  });
});
