import { useReceiver } from '../../native/useReceiver';
import { useTransferCore } from '../../native/useTransferCore';
import type { Peer } from '../../types';
import { ReceivingScreen } from './ReceivingScreen';

// Connects to the tapped peer and drives the receive, feeding progress to the
// screen. Verification runs on the Rust core.
export function ReceivingContainer({
  peer,
  onClose,
}: {
  peer: Peer;
  onClose: () => void;
}) {
  const core = useTransferCore();
  const r = useReceiver(peer, core);
  return (
    <ReceivingScreen
      peerName={peer.name}
      done={r.done}
      total={r.total}
      finished={r.finished}
      error={r.error}
      onClose={onClose}
    />
  );
}
