export interface ReceivingProps {
  peerName: string;
  fileName?: string;
  savedPath?: string;
  done: number;
  total: number;
  finished: boolean;
  error?: string;
  onClose: () => void;
}
