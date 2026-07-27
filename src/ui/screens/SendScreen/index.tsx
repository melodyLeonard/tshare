import { Text, View } from 'react-native';
import * as UI from '../../components';
import { styles } from './styles';
import type { SendProps } from './types';

export type { SendPhase } from './types';

// Send: choose a file, watch it hash off the JS thread, then share the code.
export function SendScreen(p: SendProps) {
  return (
    <UI.Screen>
      <UI.Header title="Send" onClose={p.onClose} />
      {p.file && <UI.FileCard name={p.file.name} size={p.file.size} />}
      <View style={styles.body}>
        {p.phase === 'idle' && (
          <UI.ActionButton label="Choose a file" onPress={p.onPick} />
        )}
        {p.phase === 'hashing' && (
          <>
            <UI.ProgressBar value={p.progress} />
            <Text style={styles.note}>
              Hashing chunks · Rust · {p.chunks.done}/{p.chunks.total}
            </Text>
            <UI.ChunkGrid total={p.chunks.total} verified={p.chunks.done} />
          </>
        )}
        {p.phase === 'ready' && p.code && (
          <>
            <UI.ShareCode code={p.code} />
            <Text style={styles.waiting}>Waiting for a peer to connect…</Text>
          </>
        )}
      </View>
    </UI.Screen>
  );
}
