import { StyleSheet, Text, View } from 'react-native';
import { color, radius, space, type as t } from '../../constants/theme';

// The content code a peer types (or scans) to pull this file. Mono, so the
// characters are unambiguous.
export function ShareCode({ code }: { code: string }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>Share code</Text>
      <Text style={styles.code} selectable>
        {code}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    backgroundColor: color.panel,
    borderColor: color.line,
    borderWidth: 1,
    borderRadius: radius.lg,
    paddingVertical: space.lg,
    gap: 8,
  },
  label: {
    color: color.muted,
    fontSize: t.small,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  code: { color: color.ink, fontFamily: t.mono, fontSize: 22, letterSpacing: 2 },
});
