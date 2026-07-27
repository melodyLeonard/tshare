import type { Peer } from '../../../types';

export interface NearbyProps {
  peers: Peer[];
  onSend: () => void;
  onReceive: () => void;
  onPeer: (peer: Peer) => void;
}
