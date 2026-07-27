import { MessageDecoder } from '../messageDecoder';
import { encodeMessage } from '../protocol';

describe('MessageDecoder', () => {
  it('yields a message only once its line is complete', () => {
    const d = new MessageDecoder();
    expect(d.push('{"t":"do')).toEqual([]);
    expect(d.push('ne"}\n')).toEqual([{ t: 'done' }]);
  });

  it('splits several messages delivered in one read', () => {
    const d = new MessageDecoder();
    const text =
      encodeMessage({ t: 'want', index: 0 }) + encodeMessage({ t: 'want', index: 1 });
    expect(d.push(text)).toEqual([
      { t: 'want', index: 0 },
      { t: 'want', index: 1 },
    ]);
  });

  it('keeps a trailing partial for the next read', () => {
    const d = new MessageDecoder();
    expect(d.push('{"t":"done"}\n{"t":"wa')).toEqual([{ t: 'done' }]);
    expect(d.push('nt","index":2}\n')).toEqual([{ t: 'want', index: 2 }]);
  });
});
