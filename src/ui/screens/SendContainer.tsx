import { useState } from 'react';
import { sampleFile } from '../../lib/sampleFile';
import { shareCode } from '../../lib/shareCode';
import { usePrepareShare } from '../../native/usePrepareShare';
import { useTransferCore } from '../../native/useTransferCore';
import { SendScreen } from './SendScreen';

// Wires the Send screen to the Rust core: picking a file hashes it and turns the
// resulting manifest root into a share code.
export function SendContainer({ onClose }: { onClose: () => void }) {
  const core = useTransferCore();
  const prep = usePrepareShare(core);
  const [file, setFile] = useState<{ name: string; size: number }>();

  const onPick = () => {
    const picked = sampleFile();
    setFile({ name: picked.name, size: picked.bytes.length });
    prep.prepare(picked.name, picked.bytes, picked.chunkSize);
  };

  return (
    <SendScreen
      phase={prep.phase}
      file={file}
      progress={prep.total ? prep.done / prep.total : 0}
      chunks={{ total: prep.total, done: prep.done }}
      code={prep.manifest ? shareCode(prep.manifest.root) : undefined}
      onPick={onPick}
      onClose={onClose}
    />
  );
}
