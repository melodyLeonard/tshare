import { Text, View } from 'react-native';
import { color } from '../../../constants/theme';
import * as UI from '../../components';
import { styles } from './styles';
import type { ReceivingProps } from './types';

// Receiving: connect to a peer, pull the file, verify each chunk on arrival,
// and save it to disk.
export function ReceivingScreen(p: ReceivingProps) {
  return (
    <UI.Screen>
      <UI.Header title="Receiving" onClose={p.onClose} />
      <Text style={styles.from}>from {p.peerName}</Text>
      <View style={styles.body}>
        {p.error ? (
          <Text style={styles.error}>{p.error}</Text>
        ) : p.finished ? (
          <>
            <Text style={styles.note}>Received &amp; verified · {p.fileName}</Text>
            <Text style={styles.path}>Saved to {p.savedPath}</Text>
          </>
        ) : p.total === 0 ? (
          <Text style={styles.note}>Connecting…</Text>
        ) : (
          <>
            <UI.ProgressBar value={p.done / p.total} tint={color.link} />
            <Text style={styles.note}>
              {p.done}/{p.total} chunks · BLAKE3
            </Text>
            <UI.ChunkGrid total={p.total} verified={p.done} />
          </>
        )}
      </View>
    </UI.Screen>
  );
}
