import { useEffect } from 'react';
import TcpSocket from 'react-native-tcp-socket';
import { serveTransfer } from '../lib/sender';
import type { Manifest } from '../types';
import { socketWire } from './socketWire';

// Serve a prepared file to any peer that connects on `port`. Runs while the
// Send screen is open; each connection gets its own transfer.
export function useServer(
  port: number,
  manifest: Manifest | undefined,
  chunkAt: (index: number) => string,
): void {
  useEffect(() => {
    if (!manifest) {
      return;
    }
    const server = TcpSocket.createServer((socket) => {
      serveTransfer(socketWire(socket), manifest, chunkAt);
    }).listen({ port, host: '0.0.0.0' });

    return () => {
      server.close();
    };
  }, [port, manifest, chunkAt]);
}
