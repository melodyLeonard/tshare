// A file is described by its content, not by who holds it. `root` is the
// content address of the whole file; peers request chunks by hash and verify
// each one on arrival, so chunks can come from any seeder.
export interface ChunkRef {
  hash: string;
  size: number;
}

export interface Manifest {
  root: string;
  name: string;
  size: number;
  chunkSize: number;
  chunks: ChunkRef[];
}

// A device on the network that can seed or receive.
export interface Peer {
  id: string;
  name: string;
  host: string;
  port: number;
}

export type TransferKind = 'send' | 'receive';
export type TransferState = 'preparing' | 'active' | 'paused' | 'done' | 'error';

// `have` is the set of verified chunk indexes, persisted against the manifest
// root. An interrupted transfer resumes the missing chunks instead of starting
// over, and a receiver can pull those chunks from several seeders at once.
export interface Transfer {
  id: string;
  kind: TransferKind;
  manifest: Manifest;
  have: number[];
  bytesPerSec: number;
  state: TransferState;
  peerId?: string;
}
