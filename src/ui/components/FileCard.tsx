import { StyleSheet, Text, View } from 'react-native';
import { color, radius, space, type as t } from '../../constants/theme';
import { formatBytes } from '../../lib/format';
import { FileIcon } from '../icons';

// The file a flow is about: a glyph, its name, and a human-readable size.
export function FileCard({ name, size }: { name: string; size: number }) {
  return (
    <View style={styles.row}>
      <View style={styles.thumb}>
        <FileIcon color={color.link} />
      </View>
      <View style={styles.meta}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.sub}>{formatBytes(size)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: space.md },
  thumb: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: color.elevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  meta: { flex: 1 },
  name: { color: color.ink, fontSize: t.body, fontWeight: '700' },
  sub: { color: color.muted, fontSize: t.small, marginTop: 2 },
});
