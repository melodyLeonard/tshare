export interface ReceivingProps {
  peerName: string;
  done: number;
  total: number;
  finished: boolean;
  error?: string;
  onClose: () => void;
}
