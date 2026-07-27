import { base64ToBytes, bytesToBase64 } from '../base64';

describe('base64ToBytes', () => {
  it('decodes the WASM magic number', () => {
    // "AGFzbQ==" is the base64 for the \0asm module header.
    expect(Array.from(base64ToBytes('AGFzbQ=='))).toEqual([0x00, 0x61, 0x73, 0x6d]);
  });

  it('round-trips arbitrary bytes', () => {
    expect(Array.from(base64ToBytes('aGVsbG8='))).toEqual([104, 101, 108, 108, 111]);
  });
});

describe('bytesToBase64', () => {
  it('encodes bytes, padding as needed', () => {
    expect(bytesToBase64(new Uint8Array([104, 101, 108, 108, 111]))).toBe('aGVsbG8=');
    expect(bytesToBase64(new Uint8Array([0, 97, 115, 109]))).toBe('AGFzbQ==');
  });

  it('is the inverse of base64ToBytes', () => {
    const bytes = new Uint8Array([1, 2, 3, 250, 251, 252, 42]);
    expect(Array.from(base64ToBytes(bytesToBase64(bytes)))).toEqual(Array.from(bytes));
  });
});
