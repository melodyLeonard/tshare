import { base64ToBytes } from '../base64';

describe('base64ToBytes', () => {
  it('decodes the WASM magic number', () => {
    // "AGFzbQ==" is the base64 for the \0asm module header.
    expect(Array.from(base64ToBytes('AGFzbQ=='))).toEqual([0x00, 0x61, 0x73, 0x6d]);
  });

  it('round-trips arbitrary bytes', () => {
    expect(Array.from(base64ToBytes('aGVsbG8='))).toEqual([104, 101, 108, 108, 111]);
  });
});
