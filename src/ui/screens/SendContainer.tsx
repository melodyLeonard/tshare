import { useCallback, useRef, useState } from 'react';
import { BASE_PORT } from '../../constants';
import { bytesToBase64 } from '../../lib/base64';
import { planChunks } from '../../lib/chunking';
import { sampleFile } from '../../lib/sampleFile';
import { shareCode } from '../../lib/shareCode';
import { usePrepareShare } from '../../native/usePrepareShare';
import { useServer } from '../../native/useServer';
import { useTransferCore } from '../../native/useTransferCore';
import { SendScreen } from './SendScreen';

// Picks a file, hashes it through the Rust core, and serves its chunks over TCP
// to any peer that connects while this screen is open.
export function SendContainer({ onClose }: { onClose: () => void }) {
  const core = useTransferCore();
  const prep = usePrepareShare(core);
  const [file, setFile] = useState<{ name: string; size: number }>();
  const src = useRef<{ bytes: Uint8Array; chunkSize: number }>();

  const onPick = () => {
    const picked = sampleFile();
    src.current = { bytes: picked.bytes, chunkSize: picked.chunkSize };
    setFile({ name: picked.name, size: picked.bytes.length });
    prep.prepare(picked.name, picked.bytes, picked.chunkSize);
  };

  const chunkAt = useCallback((i: number) => {
    const s = src.current;
    if (!s) {
      return '';
    }
    const c = planChunks(s.bytes.length, s.chunkSize)[i];
    return bytesToBase64(s.bytes.subarray(c.offset, c.offset + c.size));
  }, []);

  useServer(BASE_PORT, prep.manifest, chunkAt);

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
