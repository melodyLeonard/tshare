export type SendPhase = 'idle' | 'hashing' | 'ready';

export interface SendProps {
  phase: SendPhase;
  file?: { name: string; size: number };
  progress: number;
  chunks: { total: number; done: number };
  code?: string;
  onPick: () => void;
  onClose: () => void;
}
