import { Pressable, StyleSheet, Text, View } from 'react-native';
import { color, radius, space, type as t } from '../../constants/theme';
import type { Peer } from '../../types';
import { ArrowDown, Phone } from '../icons';

// One discovered device. Tap it to pull whatever it's currently sharing.
export function PeerRow({
  peer,
  onPress,
}: {
  peer: Peer;
  onPress: (peer: Peer) => void;
}) {
  return (
    <Pressable
      style={styles.row}
      accessibilityRole="button"
      onPress={() => onPress(peer)}
    >
      <View style={styles.avatar}>
        <Phone size={18} color={color.link} />
      </View>
      <Text style={styles.name}>{peer.name}</Text>
      <ArrowDown size={18} color={color.muted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: space.sm, paddingVertical: 8 },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: radius.sm,
    backgroundColor: color.elevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { flex: 1, color: color.ink, fontSize: t.body, fontWeight: '600' },
});
