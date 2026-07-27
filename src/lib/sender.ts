import type { Manifest } from '../types';
import type { Wire } from './wire';

// Serve a prepared file over a wire: announce the manifest, then answer each
// chunk the receiver asks for. `chunkAt` returns a chunk's bytes as base64.
export function serveTransfer(
  wire: Wire,
  manifest: Manifest,
  chunkAt: (index: number) => string,
): void {
  wire.onMessage((message) => {
    if (message.t === 'want') {
      wire.send({ t: 'chunk', index: message.index, data: chunkAt(message.index) });
    }
  });
  wire.send({ t: 'manifest', manifest });
}
