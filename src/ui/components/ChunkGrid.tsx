import { StyleSheet, View } from 'react-native';
import { color } from '../../constants/theme';

// One cell per chunk; verified cells fill in, so a transfer's integrity and
// progress are visible at a glance.
export function ChunkGrid({ total, verified }: { total: number; verified: number }) {
  return (
    <View style={styles.grid}>
      {Array.from({ length: total }, (_, i) => {
        const done = i < verified;
        const id = done ? 'chunk-verified' : 'chunk-pending';
        const style = [styles.cell, done && styles.done];
        // biome-ignore lint/suspicious/noArrayIndexKey: fixed static grid; index is stable
        return <View key={i} testID={id} style={style} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 3 },
  cell: { width: 12, height: 12, borderRadius: 2, backgroundColor: color.elevated },
  done: { backgroundColor: color.link },
});
