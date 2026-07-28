import type { Manifest } from '../types';
import { missingChunks } from './transferPlan';
import type { Verify, Wire } from './wire';

// Drive the receive side: read the manifest, ask for every chunk still missing,
// verify each with `verify`, and resolve with a map of index -> base64 for the
// chunks received. `have` lets a partial transfer resume and lets chunks come
// from more than one seeder (chunks are content-addressed).
export function receiveTransfer(
  wire: Wire,
  verify: Verify,
  onProgress: (done: number, total: number) => void,
  have: number[] = [],
): Promise<{ name: string; chunks: Map<number, string> }> {
  return new Promise((resolve, reject) => {
    let manifest: Manifest | undefined;
    let want = 0;
    const got = new Map<number, string>();
    const finish = () => {
      wire.send({ t: 'done' });
      resolve({ name: manifest?.name ?? '', chunks: got });
    };

    wire.onMessage(async (message) => {
      if (message.t === 'manifest') {
        manifest = message.manifest;
        const missing = missingChunks(manifest, have);
        want = missing.length;
        for (const i of missing) {
          wire.send({ t: 'want', index: i });
        }
        if (want === 0) {
          finish();
        }
      } else if (message.t === 'chunk' && manifest) {
        if (!(await verify(message.data, manifest.chunks[message.index].hash))) {
          return reject(new Error(`chunk ${message.index} failed verification`));
        }
        got.set(message.index, message.data);
        onProgress(got.size, want);
        if (got.size === want) {
          finish();
        }
      }
    });
  });
}
