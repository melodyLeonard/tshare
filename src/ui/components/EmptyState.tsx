import { StyleSheet, Text, View } from 'react-native';
import { color, space, type as t } from '../../constants/theme';
import { Radar } from '../icons';

// Shown while nothing has been found yet, so the screen never looks broken.
export function EmptyState({ title, hint }: { title: string; hint: string }) {
  return (
    <View style={styles.wrap}>
      <Radar size={26} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.hint}>{hint}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', paddingVertical: space.lg, gap: 6 },
  title: { color: color.ink, fontSize: t.body, fontWeight: '600' },
  hint: { color: color.muted, fontSize: t.small, textAlign: 'center' },
});
