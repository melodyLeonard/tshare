import { useEffect, useState } from 'react';
import type { NativeModule } from 'react-native-cross-native';
import TcpSocket from 'react-native-tcp-socket';
import { base64ToBytes } from '../lib/base64';
import { receiveTransfer } from '../lib/receiver';
import type { Peer } from '../types';
import { socketWire } from './socketWire';

export interface Receiving {
  done: number;
  total: number;
  finished: boolean;
  error?: string;
}

// Connect to a peer, pull the file it's serving, and verify each chunk with the
// Rust core. Reports progress for the receiving screen.
export function useReceiver(peer: Peer, core: NativeModule | null): Receiving {
  const [state, setState] = useState<Receiving>({ done: 0, total: 0, finished: false });

  useEffect(() => {
    if (!core) {
      return;
    }
    const verify = async (data: string, hash: string) =>
      (await core.call('verify_chunk', [
        Array.from(base64ToBytes(data)),
        hash,
      ])) as boolean;

    const socket = TcpSocket.createConnection(
      { host: peer.host, port: peer.port },
      () => {},
    );
    receiveTransfer(socketWire(socket), verify, (done, total) =>
      setState((s) => ({ ...s, done, total })),
    )
      .then(() => setState((s) => ({ ...s, finished: true })))
      .catch((e: unknown) => setState((s) => ({ ...s, error: String(e) })));
    socket.on('error', (e: unknown) => setState((s) => ({ ...s, error: String(e) })));

    return () => socket.destroy();
  }, [peer.host, peer.port, core]);

  return state;
}
