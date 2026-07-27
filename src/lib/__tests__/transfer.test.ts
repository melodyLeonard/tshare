import { wirePair } from '@testing/wirePair';
import type { Manifest } from '../../types';
import { receiveTransfer } from '../receiver';
import { serveTransfer } from '../sender';

const manifest = (chunks: string[]): Manifest => ({
  root: 'r',
  name: 'f',
  size: chunks.length * 3,
  chunkSize: 3,
  chunks: chunks.map((_, i) => ({ hash: `h${i}`, size: 3 })),
});

describe('transfer protocol', () => {
  it('receives every chunk, verified, in order', async () => {
    const chunks = ['QUFB', 'QkJC', 'Q0ND'];
    const [server, client] = wirePair();
    serveTransfer(server, manifest(chunks), (i) => chunks[i]);

    const got = await receiveTransfer(
      client,
      async (d) => chunks.includes(d),
      () => {},
    );

    expect([got.get(0), got.get(1), got.get(2)]).toEqual(chunks);
  });

  it('rejects a chunk that fails verification', async () => {
    const [server, client] = wirePair();
    serveTransfer(server, manifest(['x']), () => 'tampered');
    const receive = receiveTransfer(
      client,
      async () => false,
      () => {},
    );

    await expect(receive).rejects.toThrow(/verification/);
  });
});
