import { StyleSheet, Text, View } from 'react-native';
import { color, radius, space, type as t } from '../../constants/theme';
import type { Peer } from '../../types';
import { Phone } from '../icons';

// One discovered device you can send to or receive from.
export function PeerRow({ peer }: { peer: Peer }) {
  return (
    <View style={styles.row}>
      <View style={styles.avatar}>
        <Phone size={18} color={color.link} />
      </View>
      <Text style={styles.name}>{peer.name}</Text>
      <Text style={styles.meta}>on your network</Text>
    </View>
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
  meta: { color: color.muted, fontSize: t.small },
});
