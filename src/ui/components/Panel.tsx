import type { ReactNode } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import { color, radius, space } from '../../constants/theme';

// A raised card that groups related rows.
export function Panel({ children, style }: { children: ReactNode; style?: ViewStyle }) {
  return <View style={[styles.panel, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: color.panel,
    borderColor: color.line,
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: space.md,
  },
});
