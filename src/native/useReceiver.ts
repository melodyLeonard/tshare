import { useEffect, useState } from 'react';
import type { NativeModule } from 'react-native-cross-native';
import TcpSocket from 'react-native-tcp-socket';
import { receiveTransfer } from '../lib/receiver';
import type { Peer } from '../types';
import { chunkVerifier } from './chunkVerifier';
import { saveFile } from './saveFile';
import { socketWire } from './socketWire';

export interface Receiving {
  done: number;
  total: number;
  finished: boolean;
  error?: string;
  name?: string;
  savedPath?: string;
}

// Connect to a peer, pull the file it's serving, and verify each chunk with the
// Rust core. Reports progress for the receiving screen.
export function useReceiver(peer: Peer, core: NativeModule | null): Receiving {
  const [state, setState] = useState<Receiving>({ done: 0, total: 0, finished: false });

  useEffect(() => {
    if (!core) {
      return;
    }
    const socket = TcpSocket.createConnection(
      { host: peer.host, port: peer.port },
      () => {},
    );
    receiveTransfer(socketWire(socket), chunkVerifier(core), (done, total) =>
      setState((s) => ({ ...s, done, total })),
    )
      .then(async ({ name, chunks }) => {
        const savedPath = await saveFile(name, chunks);
        setState((s) => ({ ...s, finished: true, name, savedPath }));
      })
      .catch((e: unknown) => setState((s) => ({ ...s, error: String(e) })));
    socket.on('error', (e: unknown) => setState((s) => ({ ...s, error: String(e) })));

    return () => socket.destroy();
  }, [peer.host, peer.port, core]);

  return state;
}
