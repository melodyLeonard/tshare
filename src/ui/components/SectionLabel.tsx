import { StyleSheet, Text } from 'react-native';
import { color, type as t } from '../../constants/theme';

// The small uppercase caption that titles a group.
export function SectionLabel({ children }: { children: string }) {
  return <Text style={styles.label}>{children}</Text>;
}

const styles = StyleSheet.create({
  label: {
    color: color.muted,
    fontSize: t.small,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
});
