import { StyleSheet, View } from 'react-native';
import { color, radius } from '../../constants/theme';

// A horizontal progress track. `value` is 0..1; the tint distinguishes sending
// (warm) from receiving/verified (cool).
export function ProgressBar({
  value,
  tint = color.send,
}: {
  value: number;
  tint?: string;
}) {
  const pct = `${Math.max(0, Math.min(1, value)) * 100}%` as const;
  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: pct, backgroundColor: tint }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 8,
    borderRadius: radius.sm,
    backgroundColor: color.elevated,
    overflow: 'hidden',
  },
  fill: { height: '100%', borderRadius: radius.sm },
});
